export const SITE_NAME = 'Solarpedia UK';
export const SITE_URL = 'https://solarpedia.co.uk';
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80';

export type JsonLd = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ArticleSchemaInput = {
  headline: string;
  description: string;
  path: string;
  image?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
};

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: string | string[];
};

type CollectionSchemaInput = {
  name: string;
  description: string;
  path: string;
  about?: string;
};

type SoftwareApplicationSchemaInput = {
  name: string;
  description: string;
  path: string;
};

type City = {
  name: string;
  slug: string;
};

function normalizePath(path: string) {
  if (!path || path === '/') {
    return '/';
  }

  const trimmed = path.startsWith('/') ? path : `/${path}`;
  return trimmed.length > 1 ? trimmed.replace(/\/+$/, '') : trimmed;
}

export function buildAbsoluteUrl(pathOrUrl: string = '/') {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${SITE_URL}${normalizePath(pathOrUrl)}`;
}

function safeIsoDate(dateValue?: string) {
  if (!dateValue) {
    return undefined;
  }

  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export function createOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: buildAbsoluteUrl('/vite.svg'),
  };
}

export function createWebsiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    publisher: createOrganizationSchema(),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}

export function createArticleSchema({
  headline,
  description,
  path,
  image,
  authorName = 'Solarpedia Analysis Team',
  datePublished,
  dateModified,
}: ArticleSchemaInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: buildAbsoluteUrl(image || DEFAULT_OG_IMAGE),
    mainEntityOfPage: buildAbsoluteUrl(path),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: createOrganizationSchema(),
    datePublished: safeIsoDate(datePublished) || new Date().toISOString(),
    dateModified: safeIsoDate(dateModified || datePublished) || new Date().toISOString(),
  };
}

export function createServiceSchema({
  name,
  description,
  path,
  serviceType,
  areaServed = 'United Kingdom',
}: ServiceSchemaInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: createOrganizationSchema(),
    areaServed: Array.isArray(areaServed)
      ? areaServed.map((item) => ({ '@type': 'AdministrativeArea', name: item }))
      : { '@type': 'Country', name: areaServed },
    url: buildAbsoluteUrl(path),
  };
}

export function createCollectionPageSchema({
  name,
  description,
  path,
  about,
}: CollectionSchemaInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: buildAbsoluteUrl(path),
    about,
    isPartOf: buildAbsoluteUrl('/'),
  };
}

export function createSoftwareApplicationSchema({
  name,
  description,
  path,
}: SoftwareApplicationSchemaInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: buildAbsoluteUrl(path),
    publisher: createOrganizationSchema(),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
    },
  };
}

export function getSolarQuotesHubSeo() {
  return {
    title: 'Solar Panel Quotes by City',
    description:
      'Compare solar panel quotes by UK city, review installer availability, and request up to 3 free quotes tailored to your postcode.',
    path: '/solar-panel-quotes',
    h1: 'Solar panel quotes by UK city',
    intro:
      'Choose your city to compare solar panel quotes, check local installer coverage, and start a postcode-matched enquiry.',
    keywords:
      'solar panel quotes UK, solar panel quotes by city, compare solar quotes, free solar quotes',
  };
}

export function getSolarQuotesCitySeo(city: City) {
  return {
    title: `Solar Panel Quotes ${city.name} | Compare 3 Free Quotes`,
    description: `Compare solar panel quotes in ${city.name}. Get up to 3 free quotes, review local installer availability, and estimate likely installation costs for your postcode.`,
    path: `/solar-panel-quotes/${city.slug}`,
    h1: `Solar panel quotes in ${city.name}`,
    intro: `Compare up to 3 solar panel quotes in ${city.name}, see how local installer availability can affect pricing, and start with a postcode-matched enquiry.`,
    keywords: `solar panel quotes ${city.name}, solar installation quotes ${city.name}, compare solar quotes ${city.name}`,
  };
}

export function getInstallerHubSeo() {
  return {
    title: 'Best Solar Installers by City',
    description:
      'Find the best solar installers by UK city, compare MCS-certified providers, and request quotes from companies covering your area.',
    path: '/best-solar-installers',
    h1: 'Best solar installers by UK city',
    intro:
      'Browse UK city pages to compare local solar installers, shortlist MCS-certified companies, and move into quote collection faster.',
    keywords:
      'best solar installers UK, best solar installers by city, compare solar installers, local solar installers',
  };
}

export function getInstallerCitySeo(city: City) {
  return {
    title: `Best Solar Installers ${city.name} | Compare Local Companies`,
    description: `Find the best solar installers in ${city.name}. Compare local companies, review MCS-certified options, and request quotes matched to your postcode.`,
    path: `/best-solar-installers/${city.slug}`,
    h1: `Best solar installers in ${city.name}`,
    intro: `Use this ${city.name} solar installer guide to compare local companies, check credentials, and move into quote requests with stronger shortlist criteria.`,
    keywords: `best solar installers ${city.name}, solar installers ${city.name}, local solar companies ${city.name}`,
  };
}

export function getCommercialQuotesSeo() {
  return {
    title: 'Commercial Solar Quotes UK | Compare 3 Free Quotes',
    description:
      'Compare commercial solar quotes across the UK for warehouses, offices, schools, farms, and retail sites. Request 3 free postcode-routed quotes.',
    path: '/commercial-solar-quotes-uk',
    h1: 'Commercial solar quotes UK',
    intro:
      'Request commercial solar quotes for UK business premises, compare installer responses, and speed up supplier selection with postcode-led routing.',
    keywords:
      'commercial solar quotes UK, business solar quotes UK, commercial solar installers UK, commercial solar panel quotes',
  };
}
