import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import cities from '../data/ukCities.json';

type City = { name: string; slug: string };

const SolarPanelQuotes: React.FC = () => {
  usePageMetadata(
    'Solar Panel Quotes by City',
    'Get 3 free solar panel quotes from vetted local installers. Choose your city to compare prices and availability near you.'
  );

  return (
    <div className="bg-brand-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
            Commercial intent pages
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-5">
            Solar panel quotes in your city
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            Select your city to get matched with installer partners and receive up to 3 free quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(cities as City[]).map((city) => (
            <Link
              key={city.slug}
              to={`/solar-panel-quotes/${city.slug}`}
              className="bg-white border border-brand-accent rounded-[2rem] p-6 hover:border-brand-navy hover:-translate-y-0.5 transition-all"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                Solar panel quotes
              </div>
              <div className="text-xl font-serif font-bold text-brand-navy">{city.name}</div>
            </Link>
          ))}
        </div>

        <div className="mt-14 bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
          <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">Prefer to start now?</h2>
          <p className="text-brand-muted mb-6">
            Use the savings wizard to estimate your ROI first, then request quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/wizard"
              className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all text-center"
            >
              Check your savings
            </Link>
            <Link
              to="/installers"
              className="bg-white border border-brand-accent text-brand-navy px-8 py-4 rounded-full font-bold text-base hover:border-brand-navy transition-all text-center"
            >
              Browse installers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarPanelQuotes;
