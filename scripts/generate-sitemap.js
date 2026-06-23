import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://solarpedia.co.uk';
const LASTMOD = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/wizard', changefreq: 'weekly', priority: '0.9' },
  { path: '/education', changefreq: 'weekly', priority: '0.9' },
  { path: '/business', changefreq: 'monthly', priority: '0.8' },
  { path: '/installers', changefreq: 'weekly', priority: '0.9' },
  { path: '/solar-panel-quotes', changefreq: 'weekly', priority: '0.9' },
  { path: '/best-solar-installers', changefreq: 'weekly', priority: '0.9' },
  { path: '/commercial-solar-quotes-uk', changefreq: 'weekly', priority: '0.9' },
  { path: '/legal/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/legal/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/legal/cookies', changefreq: 'yearly', priority: '0.3' },
];

const articleFilePath = path.resolve(__dirname, '../src/pages/Article.tsx');
let articleSlugs = [];
let citySlugs = [];

try {
  if (fs.existsSync(articleFilePath)) {
    const content = fs.readFileSync(articleFilePath, 'utf-8');
    
    const match = content.match(/const ARTICLES_DB\s*:\s*Record<string,\s*any>\s*=\s*{([\s\S]*?)};\n/);
    if (match && match[1]) {
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
  { path: `/solar-panel-quotes/${slug}`, changefreq: 'weekly', priority: '0.8' },
  { path: `/best-solar-installers/${slug}`, changefreq: 'weekly', priority: '0.8' },
]);

const articleRoutes = articleSlugs.map((slug) => ({
  path: `/education/article/${slug}`,
  changefreq: 'monthly',
  priority: '0.7',
}));

function renderUrl(route) {
  return `  <url>
    <loc>${BASE_URL}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(renderUrl).join('\n')}
${cityRoutes.map(renderUrl).join('\n')}
${articleRoutes.map(renderUrl).join('\n')}
</urlset>`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(
  `✅ Sitemap generated successfully with ${staticRoutes.length + cityRoutes.length + articleRoutes.length} URLs (including ${cityRoutes.length} city pages and ${articleRoutes.length} articles).`
);
