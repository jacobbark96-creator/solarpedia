import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the base URL
const BASE_URL = 'https://solarpedia.co.uk';

// Define static routes
const staticRoutes = [
  '/',
  '/wizard',
  '/education',
  '/business',
  '/installers',
  '/solar-panel-quotes',
  '/best-solar-installers',
  '/commercial-solar-quotes-uk',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies'
];

// Extract article slugs dynamically from Article.tsx
const articleFilePath = path.resolve(__dirname, '../src/pages/Article.tsx');
let articleSlugs = [];
let citySlugs = [];

try {
  if (fs.existsSync(articleFilePath)) {
    const content = fs.readFileSync(articleFilePath, 'utf-8');
    
    // Extract keys from ARTICLES_DB object
    const match = content.match(/const ARTICLES_DB\s*:\s*Record<string,\s*any>\s*=\s*{([\s\S]*?)};\n/);
    if (match && match[1]) {
      // Find all the string keys, e.g., 'solar-myths-explained':
      const keys = [...match[1].matchAll(/'([^']+)'\s*:/g)].map(m => m[1]);
      articleSlugs = keys;
    }
  }
} catch (e) {
  console.warn("Could not read articles for sitemap generation:", e.message);
}

try {
  const citiesFilePath = path.resolve(__dirname, '../src/data/ukCities.json');
  if (fs.existsSync(citiesFilePath)) {
    const content = fs.readFileSync(citiesFilePath, 'utf-8');
    const cities = JSON.parse(content);
    if (Array.isArray(cities)) {
      citySlugs = cities.map((c) => c.slug).filter(Boolean);
    }
  }
} catch (e) {
  console.warn("Could not read cities for sitemap generation:", e.message);
}

const cityRoutes = citySlugs.flatMap((slug) => [
  `/solar-panel-quotes/${slug}`,
  `/best-solar-installers/${slug}`
]);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>
    <changefreq>${route === '/' || route === '/education' ? 'daily' : route.startsWith('/legal') ? 'yearly' : route === '/commercial-solar-quotes-uk' || route === '/solar-panel-quotes' || route === '/best-solar-installers' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route === '/wizard' ? '0.9' : route === '/commercial-solar-quotes-uk' || route === '/solar-panel-quotes' || route === '/best-solar-installers' ? '0.9' : route.startsWith('/legal') ? '0.3' : '0.8'}</priority>
  </url>`).join('\n')}
${cityRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
${articleSlugs.map(slug => `  <url>
    <loc>${BASE_URL}/education/article/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

// Write to the public folder
const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Sitemap generated successfully with ${staticRoutes.length + cityRoutes.length + articleSlugs.length} URLs (including ${cityRoutes.length} city pages and ${articleSlugs.length} articles).`);
