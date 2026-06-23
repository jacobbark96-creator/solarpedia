export type RoofEstimateConfidence = 'low' | 'medium' | 'high';
export type RoofEstimateSource = 'default' | 'manual' | 'estimated';

type PropertyType = 'residential' | 'commercial';

type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    house_number?: string;
    postcode?: string;
  };
};

type OverpassWay = {
  type: 'way';
  id: number;
  geometry?: Array<{ lat: number; lon: number }>;
};

type OverpassResponse = {
  elements: OverpassWay[];
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

function escapeOverpassString(value: string) {
  return value.replace(/"/g, '\\"');
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

async function lookupAddress(houseNumber: string, postcode: string) {
  const normalizedPostcode = normalizePostcode(postcode);
  const query = `${houseNumber.trim()} ${normalizedPostcode}, United Kingdom`;
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', query);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('limit', '5');
  url.searchParams.set('countrycodes', 'gb');

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Address lookup failed.');
  }

  const candidates = (await response.json()) as NominatimResult[];
  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new Error('No address match found for that postcode and house number.');
  }

  const exactHouse = candidates.find((candidate) => {
    const candidateHouse = candidate.address?.house_number?.trim();
    return candidateHouse === houseNumber.trim();
  });

  return exactHouse || candidates[0];
}

async function lookupBuilding(lat: number, lon: number, postcode: string) {
  const overpassQuery = `
[out:json][timeout:25];
(
  way["building"](around:40,${lat},${lon});
  way["building"]["addr:postcode"="${escapeOverpassString(normalizePostcode(postcode))}"](around:120,${lat},${lon});
);
out geom;
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
    throw new Error('Building footprint lookup failed.');
  }

  const data = (await response.json()) as OverpassResponse;
  const buildings = (data.elements || []).filter((element) => Array.isArray(element.geometry) && element.geometry.length >= 3);

  if (!buildings.length) {
    throw new Error('No nearby building footprint found.');
  }

  const containingBuilding = buildings.find((building) => pointInPolygon({ lat, lon }, building.geometry || []));
  if (containingBuilding) {
    return { building: containingBuilding, confidence: 'high' as RoofEstimateConfidence };
  }

  const nearest = buildings
    .map((building) => ({
      building,
      distance: distanceMeters({ lat, lon }, centroid(building.geometry || [])),
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

  const address = await lookupAddress(houseNumber, postcode);
  const latitude = Number(address.lat);
  const longitude = Number(address.lon);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error('Address lookup returned invalid coordinates.');
  }

  const { building, confidence } = await lookupBuilding(latitude, longitude, postcode);
  const footprintAreaSqm = polygonAreaSqm(building.geometry || []);
  const estimatedRoofAreaSqm = estimateUsableRoofAreaSqm(footprintAreaSqm, propertyType);

  if (!footprintAreaSqm || !Number.isFinite(footprintAreaSqm)) {
    throw new Error('Could not calculate building footprint area.');
  }

  return {
    matchedAddress: address.display_name,
    latitude,
    longitude,
    footprintAreaSqm,
    estimatedRoofAreaSqm,
    confidence,
    method: 'OpenStreetMap address + building footprint estimate',
  };
}

