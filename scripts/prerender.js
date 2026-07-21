import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.resolve(DIST_DIR, 'index.html');

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('❌ dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

// Data for prerendering
const cities = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/ukCities.json'), 'utf-8'));
const articlesContent = fs.readFileSync(path.resolve(__dirname, '../src/data/articles.ts'), 'utf-8');

// Simple regex-based extraction of ARTICLES_DB for prerendering
const articleMatch = articlesContent.match(/const ARTICLES_DB.*= {([\s\S]*?)};\n/);
const articleKeys = articleMatch ? [...articleMatch[1].matchAll(/'([^']+)'\s*:/g)].map(m => m[1]) : [];

const SITE_NAME = 'Solarpedia UK';
const SITE_URL = 'https://solarpedia.co.uk';

const OG_IMAGES = {
  home: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
  commercial: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  education: 'https://images.unsplash.com/photo-1454165833767-131f72a1003c?auto=format&fit=crop&w=1200&q=80',
  city: 'https://images.unsplash.com/photo-1449156001437-3a166aefbb0a?auto=format&fit=crop&w=1200&q=80',
};

function getMetadata(route) {
  let title = `${SITE_NAME} | Impartial UK Solar Advice`;
  let description = 'Independent UK solar insights, cost estimates and savings forecasts powered by real energy and regional data.';
  let image = OG_IMAGES.home;
  let canonical = `${SITE_URL}${route === '/' ? '' : route}`;
  let h1 = 'Impartial UK Solar Advice';
  let intro = 'Independent UK solar insights, cost estimates and savings forecasts powered by real energy and regional data.';

  if (route.startsWith('/solar-panel-quotes/')) {
    const slug = route.replace('/solar-panel-quotes/', '');
    const city = cities.find(c => c.slug === slug);
    if (city) {
      title = `Solar Panel Quotes ${city.name} | Compare 3 Free Quotes | ${SITE_NAME}`;
      description = `Compare solar panel quotes in ${city.name}. Get up to 3 free quotes, review local installer availability, and estimate likely installation costs for your postcode.`;
      image = OG_IMAGES.city;
      h1 = `Solar panel quotes in ${city.name}`;
      intro = `Request up to 3 solar panel quotes from vetted installers covering ${city.name}. See how local coverage affects pricing and get a postcode-matched response today.`;
    }
  } else if (route.startsWith('/best-solar-installers/')) {
    const slug = route.replace('/best-solar-installers/', '');
    const city = cities.find(c => c.slug === slug);
    if (city) {
      title = `Local Solar Installers ${city.name} | Compare Local Companies | ${SITE_NAME}`;
      description = `Find local solar installers in ${city.name}. Compare local companies, review MCS-certified options, and request quotes matched to your postcode.`;
      image = OG_IMAGES.city;
      h1 = `Local solar installers in ${city.name}`;
      intro = `Use this ${city.name} solar installer guide to compare local companies, check credentials, and move into quote requests with stronger shortlist criteria.`;
    }
  } else if (route === '/solar-panel-quotes') {
    title = `Solar Panel Quotes by City | ${SITE_NAME}`;
    description = 'Compare solar panel quotes by UK city, review installer availability, and request up to 3 free quotes tailored to your postcode.';
    image = OG_IMAGES.city;
    h1 = 'Solar panel quotes by UK city';
    intro = 'Choose your city to compare solar panel quotes, check local installer coverage, and start a postcode-matched enquiry.';
  } else if (route === '/best-solar-installers') {
    title = `Local Solar Installers by City | ${SITE_NAME}`;
    description = 'Find local solar installers by UK city, compare MCS-certified providers, and request quotes from companies covering your area.';
    image = OG_IMAGES.city;
    h1 = 'Local solar installers by UK city';
    intro = 'Browse UK city pages to compare local solar installers, shortlist MCS-certified companies, and move into quote collection faster.';
  } else if (route === '/commercial-solar-quotes-uk') {
    title = `Commercial Solar Quotes UK | Compare 3 Free Quotes | ${SITE_NAME}`;
    description = 'Compare commercial solar quotes across the UK for warehouses, offices, schools, farms, and retail sites. Request 3 free postcode-routed quotes.';
    image = OG_IMAGES.commercial;
    h1 = 'Commercial solar quotes UK';
    intro = 'Request commercial solar quotes for UK business premises, compare installer responses, and speed up supplier selection with postcode-led routing.';
  } else if (route === '/education') {
    title = `Solar Education & Guides | ${SITE_NAME}`;
    description = 'Impartial UK solar guides, myth-busting, and technical explainers to help you decide if solar is worth it.';
    image = OG_IMAGES.education;
    h1 = 'Solar education & guides';
    intro = 'Impartial UK solar guides, myth-busting, and technical explainers to help you decide if solar is worth it.';
  } else if (route.startsWith('/education/article/')) {
    const slug = route.replace('/education/article/', '');
    title = `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | ${SITE_NAME}`;
    description = 'Read our latest UK solar guide and analysis.';
    image = OG_IMAGES.education;
    h1 = title;
    intro = description;
  }

  return { title, description, image, canonical, h1, intro };
}

const routes = [
  '/',
  '/wizard',
  '/education',
  '/business',
  '/installers',
  '/solar-panel-quotes',
  '/best-solar-installers',
  '/commercial-solar-quotes-uk',
  ...cities.map(c => `/solar-panel-quotes/${c.slug}`),
  ...cities.map(c => `/best-solar-installers/${c.slug}`),
  ...articleKeys.map(slug => `/education/article/${slug}`)
];

console.log(`🚀 Prerendering ${routes.length} routes...`);

routes.forEach(route => {
  const { title, description, image, canonical, h1, intro } = getMetadata(route);
  
  let content = indexHtml;
  
  // Replace Title
  content = content.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  content = content.replace(/<meta name="title" content=".*?">/g, `<meta name="title" content="${title}">`);
  
  // Replace Description
  content = content.replace(/<meta name="description" content=".*?">/g, `<meta name="description" content="${description}">`);
  
  // Replace OG tags
  content = content.replace(/<meta property="og:title" content=".*?">/g, `<meta property="og:title" content="${title}">`);
  content = content.replace(/<meta property="og:description" content=".*?">/g, `<meta property="og:description" content="${description}">`);
  content = content.replace(/<meta property="og:url" content=".*?">/g, `<meta property="og:url" content="${canonical}">`);
  content = content.replace(/<meta property="og:image" content=".*?">/g, `<meta property="og:image" content="${image}">`);
  
  // Replace Twitter tags
  content = content.replace(/<meta name="twitter:title" content=".*?">/g, `<meta name="twitter:title" content="${title}">`);
  content = content.replace(/<meta name="twitter:description" content=".*?">/g, `<meta name="twitter:description" content="${description}">`);
  content = content.replace(/<meta name="twitter:image" content=".*?">/g, `<meta name="twitter:image" content="${image}">`);
  
  // Replace Canonical
  content = content.replace(/<link rel="canonical" href=".*?">/g, `<link rel="canonical" href="${canonical}">`);

  // Inject basic body content for SEO
  const bodyContent = `<div id="root"><header><h1>${h1}</h1><p>${intro}</p></header><main><p>Loading Solarpedia UK insights...</p></main></div>`;
  content = content.replace(/<div id="root"><\/div>/, bodyContent);

  // Write the file
  const routePath = route === '/' ? '' : route;
  const targetDir = path.join(DIST_DIR, routePath);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(targetDir, 'index.html'), content);
});

console.log('✅ Prerendering complete.');
