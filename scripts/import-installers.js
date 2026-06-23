import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ROOT = 'https://findcertifiedinstallers.co.uk';
const CITIES_PATH = path.resolve(__dirname, '../src/data/ukCities.json');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/certifiedInstallers.json');
const CITY_SLUG_OVERRIDES = {
  newcastle: 'newcastle-upon-tyne',
};

function decodeHtml(value = '') {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, '·')
    .replace(/&ndash;/g, '–')
    .replace(/&pound;/g, '£')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMatch(block, regex, index = 1) {
  const match = block.match(regex);
  return match ? decodeHtml(match[index]) : '';
}

function extractTags(block) {
  return [...block.matchAll(/<span class="tag [^"]*">([\s\S]*?)<\/span>/g)]
    .map((match) => decodeHtml(match[1]))
    .filter(Boolean);
}

function extractCards(html) {
  const gridStart = html.indexOf('<div class="card-grid mb-40" id="installer-grid">');
  if (gridStart === -1) {
    return [];
  }

  const gridHtml = html.slice(gridStart);

  return gridHtml
    .split('<div class="installer-card">')
    .slice(1)
    .map((chunk) => chunk.split('<div class="installer-card">')[0]);
}

function parseCard(block, city) {
  const detailPath = extractMatch(block, /<div class="installer-card__name"><a href="([^"]+)">/);
  const name = extractMatch(block, /<div class="installer-card__name"><a href="[^"]+">([\s\S]*?)<\/a>/);

  if (!detailPath || !name) return null;

  const certText = extractMatch(block, /<div class="installer-card__cert">([\s\S]*?)<\/div>/);
  const [certNumber = '', certBody = ''] = certText.split('·').map((item) => item.trim());
  const ratingValue = extractMatch(block, /<div class="installer-card__rating"><span class="rating-star">★<\/span>\s*([\d.]+)/);
  const reviewsValue = extractMatch(block, /<span class="rating-count">\((\d+)\)<\/span>/);
  const phoneMatch = block.match(/<a href="tel:([^"]+)">Call<\/a>/);
  const websiteMatch = block.match(/<a href="(https?:\/\/[^"]+)"[^>]*>Website<\/a>/);

  return {
    slug: detailPath.replace(/^\/installer\//, '').replace(/\/$/, ''),
    name,
    detailUrl: `${SITE_ROOT}${detailPath}`,
    sourceCity: city.name,
    sourceCitySlug: city.slug,
    distanceMiles: Number.parseFloat(extractMatch(block, /<span class="installer-card__distance">([\d.]+)\s*mi<\/span>/)) || null,
    address: extractMatch(block, /<div class="installer-card__address">([\s\S]*?)<\/div>/),
    certificationNumber: certNumber,
    certificationBody: certBody,
    tags: extractTags(block),
    phone: phoneMatch ? decodeHtml(phoneMatch[1]) : '',
    website: websiteMatch ? decodeHtml(websiteMatch[1]) : '',
    rating: ratingValue ? Number.parseFloat(ratingValue) : null,
    reviews: reviewsValue ? Number.parseInt(reviewsValue, 10) : null,
    sourceUrl: `${SITE_ROOT}/solar-pv/${city.slug}/`,
  };
}

async function fetchCity(city) {
  const sourceSlug = CITY_SLUG_OVERRIDES[city.slug] || city.slug;
  const url = `${SITE_ROOT}/solar-pv/${sourceSlug}/`;
  const response = await fetch(url, {
    headers: {
      Accept: 'text/html',
      'User-Agent': 'Solarpedia Installer Importer/1.0 (+https://solarpedia.co.uk)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${city.slug}: ${response.status}`);
  }

  const html = await response.text();
  return extractCards(html)
    .map((card) => parseCard(card, city))
    .filter(Boolean);
}

function dedupeInstallers(records) {
  const map = new Map();

  for (const installer of records) {
    const existing = map.get(installer.slug);

    if (!existing) {
      map.set(installer.slug, {
        ...installer,
        cities: [installer.sourceCity],
        citySlugs: [installer.sourceCitySlug],
      });
      continue;
    }

    existing.cities = [...new Set([...existing.cities, installer.sourceCity])];
    existing.citySlugs = [...new Set([...existing.citySlugs, installer.sourceCitySlug])];
    existing.tags = [...new Set([...existing.tags, ...installer.tags])];
    existing.rating = existing.rating ?? installer.rating;
    existing.reviews = existing.reviews ?? installer.reviews;
    existing.phone = existing.phone || installer.phone;
    existing.website = existing.website || installer.website;
    existing.distanceMiles =
      existing.distanceMiles == null
        ? installer.distanceMiles
        : installer.distanceMiles == null
          ? existing.distanceMiles
          : Math.min(existing.distanceMiles, installer.distanceMiles);
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

async function main() {
  const cities = JSON.parse(fs.readFileSync(CITIES_PATH, 'utf-8'));
  const allRecords = [];

  for (const city of cities) {
    try {
      const installers = await fetchCity(city);
      console.log(`Imported ${installers.length} solar installers for ${city.name}`);
      allRecords.push(...installers);
    } catch (error) {
      console.warn(`Skipping ${city.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const installers = dedupeInstallers(allRecords);
  const payload = {
    generatedAt: new Date().toISOString(),
    source: 'https://findcertifiedinstallers.co.uk/solar-pv/',
    disclaimer:
      'Publicly sourced MCS-certified solar installers. Not automatically vetted by Solarpedia. Verify suitability before partnership or referral.',
    installers,
  };

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Saved ${installers.length} unique installers to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
