import { useEffect } from 'react';
import { buildAbsoluteUrl, DEFAULT_OG_IMAGE, JsonLd, SITE_NAME } from '../lib/seo';

const DEFAULT_KEYWORDS =
  'solar quotes UK, solar installers UK, solar savings calculator UK, commercial solar UK';

type MetadataOptions = {
  title: string;
  description: string;
  image?: string;
  path?: string;
  canonicalUrl?: string;
  type?: string;
  keywords?: string;
  robots?: string;
  noindex?: boolean;
  twitterCard?: string;
  schema?: JsonLd | JsonLd[];
};

function upsertMeta(selector: string, attrName: string, attrValue: string, content: string) {
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function normalizeOptions(
  titleOrOptions: string | MetadataOptions,
  description?: string,
  image?: string
): MetadataOptions {
  if (typeof titleOrOptions === 'string') {
    return {
      title: titleOrOptions,
      description: description || '',
      image: image || DEFAULT_OG_IMAGE,
    };
  }

  return {
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    twitterCard: 'summary_large_image',
    ...titleOrOptions,
  };
}

export const usePageMetadata = (
  titleOrOptions: string | MetadataOptions,
  description?: string,
  image?: string
) => {
  const options = normalizeOptions(titleOrOptions, description, image);
  const schemaKey = JSON.stringify(options.schema || null);

  useEffect(() => {
    const fullTitle = options.title.includes(SITE_NAME) ? options.title : `${options.title} | ${SITE_NAME}`;
    const resolvedUrl = options.canonicalUrl
      ? buildAbsoluteUrl(options.canonicalUrl)
      : buildAbsoluteUrl(options.path || window.location.pathname);
    const robotsValue = options.noindex ? 'noindex, nofollow' : options.robots || 'index, follow';

    document.title = fullTitle;

    upsertMeta('meta[name="title"]', 'name', 'title', fullTitle);
    upsertMeta('meta[name="description"]', 'name', 'description', options.description);

    upsertMeta('meta[name="keywords"]', 'name', 'keywords', options.keywords || DEFAULT_KEYWORDS);

    upsertMeta('meta[name="robots"]', 'name', 'robots', robotsValue);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', options.type || 'website');
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', options.description);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', options.image || DEFAULT_OG_IMAGE);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', resolvedUrl);

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', options.twitterCard || 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', options.description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', options.image || DEFAULT_OG_IMAGE);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', resolvedUrl);

    document.querySelectorAll('script[data-solarpedia-schema="true"]').forEach((node) => node.remove());
    const schemaList = options.schema ? (Array.isArray(options.schema) ? options.schema : [options.schema]) : [];
    schemaList.forEach((entry) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-solarpedia-schema', 'true');
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }, [
    options.canonicalUrl,
    options.description,
    options.image,
    options.keywords,
    options.noindex,
    options.path,
    options.robots,
    schemaKey,
    options.title,
    options.twitterCard,
    options.type,
  ]);
};
