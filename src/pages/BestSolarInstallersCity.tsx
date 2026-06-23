import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import cities from '../data/ukCities.json';

type City = { name: string; slug: string };

const BestSolarInstallersCity: React.FC = () => {
  const { citySlug } = useParams();

  const city = useMemo(() => {
    return (cities as City[]).find((c) => c.slug === citySlug) || null;
  }, [citySlug]);

  usePageMetadata(
    city ? `Best Solar Installers ${city.name} | Compare Local Companies` : 'Best Solar Installers | Solarpedia',
    city
      ? `Find the best solar installers in ${city.name}. Compare local companies, ask the right questions, and request up to 3 free quotes.`
      : 'Find the best solar installers near you and request up to 3 free quotes.'
  );

  if (!city) {
    return (
      <div className="bg-brand-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-brand-accent rounded-[2.5rem] p-10 text-center">
            <h1 className="text-3xl font-serif font-bold text-brand-navy mb-4">City not found</h1>
            <p className="text-brand-muted mb-8">Choose a city from the list to get started.</p>
            <Link
              to="/best-solar-installers"
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
            Best solar installers {city.name}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-5">
            Best solar installers in {city.name}
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            Use this checklist to compare companies, then request quotes routed to your postcode.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">What to look for</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Accreditations', text: 'MCS certification, NICEIC, RECC membership.' },
                  { title: 'Warranties', text: 'Panel, inverter, and workmanship terms in writing.' },
                  { title: 'Site survey', text: 'A proper roof survey before final pricing.' },
                  { title: 'Performance estimate', text: 'Yield forecast and assumptions you can review.' },
                  { title: 'Finance options', text: 'Clear APR, terms, and total repayment costs.' },
                  { title: 'Aftercare', text: 'Monitoring, support, and call-out policy.' },
                ].map((item) => (
                  <div key={item.title} className="bg-brand-white border border-brand-accent rounded-[2rem] p-6">
                    <div className="text-lg font-serif font-bold text-brand-navy mb-2">{item.title}</div>
                    <p className="text-sm text-brand-muted leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">Get quotes in {city.name}</h2>
              <p className="text-brand-muted leading-relaxed mb-6">
                Compare pricing from vetted partners covering your postcode.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/solar-panel-quotes/${city.slug}`}
                  className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all text-center"
                >
                  Solar panel quotes {city.name}
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

          <aside className="space-y-6">
            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                Other cities
              </div>
              <div className="space-y-3">
                {(cities as City[])
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 6)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      to={`/best-solar-installers/${c.slug}`}
                      className="block bg-brand-white border border-brand-accent rounded-2xl px-4 py-3 hover:border-brand-navy transition-colors"
                    >
                      <div className="text-sm font-bold text-brand-navy">Best installers {c.name}</div>
                    </Link>
                  ))}
              </div>
              <Link
                to="/best-solar-installers"
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

export default BestSolarInstallersCity;

