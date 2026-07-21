import React, { useMemo } from 'react';
import { Link } from '../Link';
import cities from '../data/ukCities.json';
import {
  createBreadcrumbSchema,
  createServiceSchema,
  getInstallerCitySeo,
  createFAQSchema,
} from '../lib/seo';

type City = { name: string; slug: string };

const installerContext: Record<string, { market: string; shortlist: string; timing: string }> = {
  london: {
    market: 'London has a large solar installer market, but service coverage and survey speed can differ materially from borough to borough.',
    shortlist: 'It is especially important to compare survey quality, scaffolding assumptions, and system design rather than just the top-line price.',
    timing: 'Installers covering central and outer London may have different lead times, so postcode routing and follow-up speed matter.',
  },
  manchester: {
    market: 'Manchester usually offers a healthy mix of local and regional installers, which can make comparison shopping more competitive.',
    shortlist: 'Buyers should focus on projected generation, workmanship terms, and whether battery storage is genuinely well specified.',
    timing: 'Shorter travel distances can help survey timing, but busy installers may still prioritise the clearest enquiries.',
  },
  birmingham: {
    market: 'Birmingham benefits from a broad installer catchment, but not every provider covers every postcode equally well.',
    shortlist: 'Check whether the company has experience with your roof type, access constraints, and any required electrical upgrades.',
    timing: 'Good local comparison is possible, but quote speed still improves when roof size, energy usage, and contact details are complete.',
  },
};

const BestSolarInstallersCity: React.FC<{ citySlug?: string }> = ({ citySlug }) => {

  const cityList = cities as City[];
  const city = useMemo(() => {
    return cityList.find((c) => c.slug === citySlug) || null;
  }, [cityList, citySlug]);
  const nearbyCities = useMemo(() => {
    if (!city) return [];
    const index = cityList.findIndex((c) => c.slug === city.slug);
    const offsets = [-2, -1, 1, 2];
    return offsets
      .map((offset) => cityList[index + offset])
      .filter(Boolean)
      .slice(0, 4);
  }, [city, cityList]);
  const seo = city ? getInstallerCitySeo(city) : null;
  const localInstallerContext = city ? installerContext[city.slug] || {
    market: `${city.name} has a mixed local installer market, so you should check exactly which postcodes each company covers before comparing proposals.`,
    shortlist: `In ${city.name}, the best shortlist usually balances credentials, survey quality, generation assumptions, and aftercare, not just price.`,
    timing: `Installer response times in ${city.name} improve when users provide postcode, roof detail, and a clear project scope from the start.`,
  } : null;

  const cityFaqs = useMemo(() => {
    if (!city) return [];
    return [
      {
        question: `How do I compare solar installers in ${city.name}?`,
        answer: 'Start with MCS status, then compare survey quality, projected output, workmanship cover, component choice, and how clearly the proposal explains assumptions.',
      },
      {
        question: `Should I choose the cheapest installer in ${city.name}?`,
        answer: 'Not automatically. The cheapest quote can omit monitoring, warranty detail, roof accessories, or realistic generation assumptions.',
      },
      {
        question: `What should I ask before accepting a quote in ${city.name}?`,
        answer: 'Ask who is doing the survey, what system size is recommended, what export assumptions are used, how long installation takes, and what aftercare is included.',
      },
    ];
  }, [city]);

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
            Local Installer Guide
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

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">{city.name} installer comparison notes</h2>
              <div className="space-y-5 text-brand-muted leading-relaxed">
                <p>{localInstallerContext?.market}</p>
                <p>{localInstallerContext?.shortlist}</p>
                <p>{localInstallerContext?.timing}</p>
              </div>
            </div>

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">FAQs for choosing solar installers in {city.name}</h2>
              <div className="space-y-5">
                {cityFaqs.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-xl font-serif font-bold text-brand-navy mb-2">{item.question}</h3>
                    <p className="text-brand-muted leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                Other cities
              </div>
              <div className="space-y-3">
                {nearbyCities.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/best-solar-installers/${c.slug}`}
                      className="block bg-brand-white border border-brand-accent rounded-2xl px-4 py-3 hover:border-brand-navy transition-colors"
                    >
                      <div className="text-sm font-bold text-brand-navy">Local installers {c.name}</div>
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

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                Related pages
              </div>
              <div className="space-y-3">
                <Link to={`/solar-panel-quotes/${city.slug}`} className="block text-sm font-bold text-brand-navy hover:text-brand-green transition-colors">
                  Solar panel quotes {city.name}
                </Link>
                <Link to="/education/article/solar-panel-installation-cost-uk" className="block text-sm font-bold text-brand-navy hover:text-brand-green transition-colors">
                  Solar installation cost guide
                </Link>
                <Link to="/installers" className="block text-sm font-bold text-brand-navy hover:text-brand-green transition-colors">
                  Full installer directory
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BestSolarInstallersCity;
