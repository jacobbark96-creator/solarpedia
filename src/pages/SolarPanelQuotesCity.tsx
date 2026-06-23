import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import cities from '../data/ukCities.json';
import {
  createBreadcrumbSchema,
  createServiceSchema,
  getSolarQuotesCitySeo,
} from '../lib/seo';

type City = { name: string; slug: string };

const SolarPanelQuotesCity: React.FC = () => {
  const { citySlug } = useParams();

  const city = useMemo(() => {
    return (cities as City[]).find((c) => c.slug === citySlug) || null;
  }, [citySlug]);
  const seo = city ? getSolarQuotesCitySeo(city) : null;

  usePageMetadata({
    title: seo?.title || 'Solar Panel Quotes',
    description:
      seo?.description || 'Get free solar panel installation quotes from local installers in your area.',
    path: seo?.path || '/solar-panel-quotes',
    keywords: seo?.keywords || 'solar panel quotes UK',
    noindex: !city,
    schema: city
      ? [
          createServiceSchema({
            name: seo.title,
            description: seo.description,
            path: seo.path,
            serviceType: 'Solar panel quote comparison',
            areaServed: city.name,
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Solar Panel Quotes', path: '/solar-panel-quotes' },
            { name: city.name, path: seo.path },
          ]),
        ]
      : createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Solar Panel Quotes', path: '/solar-panel-quotes' },
        ]),
  });

  if (!city) {
    return (
      <div className="bg-brand-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-brand-accent rounded-[2.5rem] p-10 text-center">
            <h1 className="text-3xl font-serif font-bold text-brand-navy mb-4">City not found</h1>
            <p className="text-brand-muted mb-8">Choose a city from the list to get started.</p>
            <Link
              to="/solar-panel-quotes"
              className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all inline-block"
            >
              View cities
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
            Solar panel quotes {city.name}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-5">
            {seo?.h1}
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            {seo?.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">How quotes work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Tell us your postcode', text: 'So we can match you with nearby installers.' },
                  { title: 'We route locally', text: `We send your lead to partners covering ${city.name}.` },
                  { title: 'Compare up to 3 quotes', text: 'Review price, timelines, and warranties.' },
                ].map((item) => (
                  <div key={item.title} className="bg-brand-white border border-brand-accent rounded-[2rem] p-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                      Step
                    </div>
                    <div className="text-lg font-serif font-bold text-brand-navy mb-2">{item.title}</div>
                    <p className="text-sm text-brand-muted leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">What affects your quote in {city.name}</h2>
              <ul className="space-y-4 text-brand-muted text-base leading-relaxed">
                <li>Roof size, shading, and orientation</li>
                <li>Scaffolding access and property height</li>
                <li>System size (kWp) and battery add-ons</li>
                <li>Grid connection needs and meter upgrades</li>
                <li>Your exact postcode (installer travel + scheduling)</li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/wizard"
                  className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all text-center"
                >
                  Estimate savings first
                </Link>
                <Link
                  to={`/best-solar-installers/${city.slug}`}
                  className="bg-white border border-brand-accent text-brand-navy px-8 py-4 rounded-full font-bold text-base hover:border-brand-navy transition-all text-center"
                >
                  Best installers {city.name}
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                Nearby pages
              </div>
              <div className="space-y-3">
                {(cities as City[])
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 6)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      to={`/solar-panel-quotes/${c.slug}`}
                      className="block bg-brand-white border border-brand-accent rounded-2xl px-4 py-3 hover:border-brand-navy transition-colors"
                    >
                      <div className="text-sm font-bold text-brand-navy">Solar panel quotes {c.name}</div>
                    </Link>
                  ))}
              </div>
              <Link
                to="/solar-panel-quotes"
                className="mt-5 inline-block text-sm font-bold text-brand-navy hover:text-brand-green transition-colors"
              >
                View all cities
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SolarPanelQuotesCity;
