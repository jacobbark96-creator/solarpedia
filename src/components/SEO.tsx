import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical, ogType = 'website' }) => {
  return (
    <head>
      <title>{title} | Solarpedia UK</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Solarpedia" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Solarpedia UK",
          "url": "https://solarpedia.co.uk",
          "logo": "https://solarpedia.co.uk/logo.png",
          "description": "Independent UK solar insights, cost estimates and savings forecasts.",
          "sameAs": [
            "https://twitter.com/solarpediauk",
            "https://facebook.com/solarpediauk"
          ]
        })}
      </script>
    </head>
  );
};

export default SEO;
