import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import cities from '../data/ukCities.json';

type City = { name: string; slug: string };

const BestSolarInstallers: React.FC = () => {
  usePageMetadata(
    'Best Solar Installers by City',
    'Find the best solar installers in your city. Compare local companies and request up to 3 free quotes.'
  );

  return (
    <div className="bg-brand-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
            Commercial intent pages
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-5">
            Best solar installers near you
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            Browse city pages to compare local installers and request quotes in your area.
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
                Best solar installers
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
