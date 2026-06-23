export type RoofEstimateConfidence = 'low' | 'medium' | 'high';
export type RoofEstimateSource = 'default' | 'manual' | 'estimated';

type PropertyType = 'residential' | 'commercial';

type PostcodesIoResponse = {
  status: number;
  result?: {
    postcode: string;
    latitude: number;
    longitude: number;
    admin_district?: string;
    region?: string;
  };
};

type OverpassElement = {
  type: 'way' | 'relation';
  id: number;
  tags?: Record<string, string>;
  center?: { lat: number; lon: number };
  geometry?: Array<{ lat: number; lon: number }>;
};

type OverpassResponse = {
  elements: OverpassElement[];
};

export type PropertyLookupResult = {
  matchedAddress: string;
  latitude: number;
  longitude: number;
  footprintAreaSqm: number;
  estimatedRoofAreaSqm: number;
  confidence: RoofEstimateConfidence;
  method: string;
};

function normalizePostcode(postcode: string) {
  return postcode.trim().toUpperCase().replace(/\s+/g, ' ');
}

function compactPostcode(postcode: string) {
  return normalizePostcode(postcode).replace(/\s+/g, '');
}

function normalizeHouseNumber(houseNumber: string) {
  return houseNumber.trim().toUpperCase().replace(/\s+/g, '');
}

function matchesPostcode(candidate: string | undefined, postcode: string) {
  if (!candidate) return false;
  return compactPostcode(candidate) === compactPostcode(postcode);
}

function matchesHouseNumber(candidate: string | undefined, houseNumber: string) {
  if (!candidate) return false;

  const normalizedCandidate = normalizeHouseNumber(candidate);
  const normalizedTarget = normalizeHouseNumber(houseNumber);

  return (
    normalizedCandidate === normalizedTarget ||
    normalizedCandidate.startsWith(`${normalizedTarget}-`) ||
    normalizedCandidate.startsWith(`${normalizedTarget}/`)
  );
}

function degToRad(value: number) {
  return (value * Math.PI) / 180;
}

function toLocalPoint(lat: number, lon: number, refLat: number, refLon: number) {
  const earthRadius = 6378137;
  const x = degToRad(lon - refLon) * earthRadius * Math.cos(degToRad(refLat));
  const y = degToRad(lat - refLat) * earthRadius;
  return { x, y };
}

function polygonAreaSqm(points: Array<{ lat: number; lon: number }>) {
  if (points.length < 3) return 0;

  const refLat = points.reduce((sum, point) => sum + point.lat, 0) / points.length;
  const refLon = points.reduce((sum, point) => sum + point.lon, 0) / points.length;
  const projected = points.map((point) => toLocalPoint(point.lat, point.lon, refLat, refLon));

  let area = 0;
  for (let i = 0; i < projected.length; i += 1) {
    const current = projected[i];
    const next = projected[(i + 1) % projected.length];
    area += current.x * next.y - next.x * current.y;
  }

  return Math.abs(area / 2);
}

function pointInPolygon(point: { lat: number; lon: number }, polygon: Array<{ lat: number; lon: number }>) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lon;
    const yi = polygon[i].lat;
    const xj = polygon[j].lon;
    const yj = polygon[j].lat;

    const intersects =
      yi > point.lat !== yj > point.lat &&
      point.lon < ((xj - xi) * (point.lat - yi)) / ((yj - yi) || 1e-12) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
}

function distanceMeters(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const refLat = (a.lat + b.lat) / 2;
  const pointA = toLocalPoint(a.lat, a.lon, refLat, a.lon);
  const pointB = toLocalPoint(b.lat, b.lon, refLat, a.lon);
  return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
}

function centroid(points: Array<{ lat: number; lon: number }>) {
  const total = points.reduce(
    (acc, point) => ({ lat: acc.lat + point.lat, lon: acc.lon + point.lon }),
    { lat: 0, lon: 0 }
  );

  return {
    lat: total.lat / points.length,
    lon: total.lon / points.length,
  };
}

function estimateUsableRoofAreaSqm(footprintAreaSqm: number, propertyType: PropertyType) {
  if (propertyType === 'commercial') {
    return footprintAreaSqm * 0.72;
  }

  if (footprintAreaSqm < 60) return footprintAreaSqm * 0.5;
  if (footprintAreaSqm < 120) return footprintAreaSqm * 0.58;
  return footprintAreaSqm * 0.65;
}

function defaultFootprintAreaSqm(propertyType: PropertyType) {
  return propertyType === 'commercial' ? 450 : 70;
}

async function lookupPostcode(postcode: string) {
  const normalizedPostcode = normalizePostcode(postcode);
  const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(compactPostcode(normalizedPostcode))}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Postcode lookup failed.');
  }

  const payload = (await response.json()) as PostcodesIoResponse;
  if (!payload.result) {
    throw new Error('We could not find that postcode.');
  }

  return payload.result;
}

async function lookupBuildings(lat: number, lon: number) {
  const radii = [250, 600, 1200];

  for (const radius of radii) {
    const overpassQuery = `
[out:json][timeout:25];
(
  way["building"](around:${radius},${lat},${lon});
  relation["building"](around:${radius},${lat},${lon});
);
out center tags geom;
    `.trim();

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
        Accept: 'application/json',
      },
      body: overpassQuery,
    });

    if (!response.ok) {
      continue;
    }

    const data = (await response.json()) as OverpassResponse;
    const buildings = (data.elements || []).filter((element) => Array.isArray(element.geometry) && element.geometry.length >= 3);

    if (buildings.length) {
      return buildings;
    }
  }

  return [];
}

function chooseBuilding(
  buildings: OverpassElement[],
  lat: number,
  lon: number,
  postcode: string,
  houseNumber: string
) {
  const exactAddressMatch = buildings.find((building) => {
    const tags = building.tags || {};
    return matchesPostcode(tags['addr:postcode'], postcode) && matchesHouseNumber(tags['addr:housenumber'], houseNumber);
  });

  if (exactAddressMatch) {
    return { building: exactAddressMatch, confidence: 'high' as RoofEstimateConfidence };
  }

  const containingBuilding = buildings.find((building) => pointInPolygon({ lat, lon }, building.geometry || []));
  if (containingBuilding) {
    const tags = containingBuilding.tags || {};
    const hasMatchingPostcode = matchesPostcode(tags['addr:postcode'], postcode);
    return {
      building: containingBuilding,
      confidence: hasMatchingPostcode ? ('medium' as RoofEstimateConfidence) : ('low' as RoofEstimateConfidence),
    };
  }

  const nearest = buildings
    .map((building) => ({
      building,
      distance: distanceMeters({ lat, lon }, building.center || centroid(building.geometry || [])),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  return {
    building: nearest.building,
    confidence: nearest.distance <= 15 ? ('medium' as RoofEstimateConfidence) : ('low' as RoofEstimateConfidence),
  };
}

export async function lookupPropertyRoofEstimate(
  houseNumber: string,
  postcode: string,
  propertyType: PropertyType
): Promise<PropertyLookupResult> {
  if (!houseNumber.trim() || !postcode.trim()) {
    throw new Error('Enter both house number and postcode.');
  }

  const postcodeResult = await lookupPostcode(postcode);
  const latitude = Number(postcodeResult.latitude);
  const longitude = Number(postcodeResult.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error('Postcode lookup returned invalid coordinates.');
  }

  const buildings = await lookupBuildings(latitude, longitude);
  if (!buildings.length) {
    const footprintAreaSqm = defaultFootprintAreaSqm(propertyType);
    return {
      matchedAddress: `${houseNumber.trim()} ${normalizePostcode(postcode)}${postcodeResult.admin_district ? `, ${postcodeResult.admin_district}` : ''}`,
      latitude,
      longitude,
      footprintAreaSqm,
      estimatedRoofAreaSqm: estimateUsableRoofAreaSqm(footprintAreaSqm, propertyType),
      confidence: 'low',
      method: 'Postcodes.io postcode lookup with fallback roof-size heuristic (no nearby building footprint found)',
    };
  }

  const { building, confidence } = chooseBuilding(buildings, latitude, longitude, postcode, houseNumber);
  const footprintAreaSqm = polygonAreaSqm(building.geometry || []);
  const estimatedRoofAreaSqm = estimateUsableRoofAreaSqm(footprintAreaSqm, propertyType);

  if (!footprintAreaSqm || !Number.isFinite(footprintAreaSqm)) {
    const fallbackFootprintAreaSqm = defaultFootprintAreaSqm(propertyType);
    return {
      matchedAddress: `${houseNumber.trim()} ${normalizePostcode(postcode)}${postcodeResult.admin_district ? `, ${postcodeResult.admin_district}` : ''}`,
      latitude,
      longitude,
      footprintAreaSqm: fallbackFootprintAreaSqm,
      estimatedRoofAreaSqm: estimateUsableRoofAreaSqm(fallbackFootprintAreaSqm, propertyType),
      confidence: 'low',
      method: 'Postcodes.io postcode lookup with fallback roof-size heuristic (invalid building geometry)',
    };
  }

  return {
    matchedAddress: `${houseNumber.trim()} ${normalizePostcode(postcode)}${postcodeResult.admin_district ? `, ${postcodeResult.admin_district}` : ''}`,
    latitude,
    longitude,
    footprintAreaSqm,
    estimatedRoofAreaSqm,
    confidence,
    method: 'Postcodes.io postcode lookup + OpenStreetMap building footprint estimate',
  };
}
