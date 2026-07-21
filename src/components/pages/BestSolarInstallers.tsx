import React from 'react';
import { Link } from '../Link';
import cities from '../data/ukCities.json';
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createServiceSchema,
  getInstallerHubSeo,
} from '../lib/seo';

type City = { name: string; slug: string };

const BestSolarInstallers: React.FC = () => {
  const seo = getInstallerHubSeo();

  return (
    <div className="bg-brand-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
            Commercial intent pages
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-5">
            {seo.h1}
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            {seo.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(cities as City[]).map((city) => (
            <Link
              key={city.slug}
              to={`/best-solar-installers/${city.slug}`}
              className="bg-white border border-brand-accent rounded-[2rem] p-6 hover:border-brand-navy hover:-translate-y-0.5 transition-all"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                Local solar installers
              </div>
              <div className="text-xl font-serif font-bold text-brand-navy">{city.name}</div>
            </Link>
          ))}
        </div>

        <div className="mt-14 bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
          <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">Need quotes instead?</h2>
          <p className="text-brand-muted mb-6">
            Go straight to the quote pages and request pricing from local installer partners.
          </p>
          <Link
            to="/solar-panel-quotes"
            className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all inline-block"
          >
            Get solar panel quotes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSolarInstallers;
