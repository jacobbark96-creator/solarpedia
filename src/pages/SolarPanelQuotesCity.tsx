import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import cities from '../data/ukCities.json';
import {
  createBreadcrumbSchema,
  createServiceSchema,
  getSolarQuotesCitySeo,
  createFAQSchema,
} from '../lib/seo';

type City = { name: string; slug: string };

const marketNotes: Record<string, { coverage: string; stock: string; turnaround: string }> = {
  london: {
    coverage: 'London usually has strong installer coverage, but lead volumes and travel times can make survey scheduling and quote turnaround more variable by postcode.',
    stock: 'Roof complexity, scaffolding access, and mixed housing stock can all affect quote totals in London boroughs.',
    turnaround: 'Busy installers often prioritise enquiries with clear roof and contact details, so complete lead information matters more in high-demand areas.',
  },
  manchester: {
    coverage: 'Manchester tends to have good installer availability, especially across suburban postcodes where access and survey logistics are simpler.',
    stock: 'Semi-detached and terraced housing often means roof shape, party-wall access, and available panel count need careful review.',
    turnaround: 'Quote turnaround is usually helped by strong local competition, but installer capacity can tighten during peak demand periods.',
  },
  birmingham: {
    coverage: 'Birmingham combines strong installer presence with a broad suburban catchment, which can help users compare several providers quickly.',
    stock: 'Property type varies widely, so roof area, orientation, and meter setup can all change quote quality and recommended system size.',
    turnaround: 'Postcode-led routing is useful here because installers may cover only part of the wider West Midlands area.',
  },
};

const SolarPanelQuotesCity: React.FC = () => {
  const { citySlug } = useParams();

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
  const seo = city ? getSolarQuotesCitySeo(city) : null;
  const localContext = city ? marketNotes[city.slug] || {
    coverage: `${city.name} has varying installer coverage by postcode, so local routing can affect how many quotes you receive and how quickly installers respond.`,
    stock: `Roof size, housing stock, and property access in ${city.name} can all influence system design, scaffolding requirements, and final quote totals.`,
    turnaround: `Well-qualified enquiries in ${city.name} usually get faster responses, especially when postcode, roof details, and energy usage are supplied up front.`,
  } : null;

  const cityFaqs = useMemo(() => {
    if (!city) return [];
    return [
      {
        question: `How many solar quotes should I compare in ${city.name}?`,
        answer: `Three is usually enough to compare price, equipment, installation approach, and warranty terms without creating unnecessary noise in the buying process.`,
      },
      {
        question: `Does postcode matter when requesting quotes in ${city.name}?`,
        answer: `Yes. Postcode helps route your enquiry to installers who actually cover your part of ${city.name} and influences travel, survey speed, and installer availability.`,
      },
      {
        question: `What should I prepare before asking for solar quotes in ${city.name}?`,
        answer: 'Have your postcode, roof details, approximate bill size, and any battery or EV plans ready so installers can scope the project more accurately.',
      },
    ];
  }, [city]);

  usePageMetadata({
    title: seo?.title || 'Solar Panel Quotes',
    description:
      seo?.description || 'Get free solar panel installation quotes from local installers in your area.',
    path: seo?.path || '/solar-panel-quotes',
    image: seo?.image,
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
          createFAQSchema(cityFaqs),
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
            UK Regional Guide
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
                  Local installers {city.name}
                </Link>
              </div>
            </div>

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">{city.name} solar quote considerations</h2>
              <div className="space-y-5 text-brand-muted leading-relaxed">
                <p>{localContext?.coverage}</p>
                <p>{localContext?.stock}</p>
                <p>{localContext?.turnaround}</p>
              </div>
            </div>

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">FAQs for solar quotes in {city.name}</h2>
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
                Nearby pages
              </div>
              <div className="space-y-3">
                {nearbyCities.map((c) => (
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

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                Also explore
              </div>
              <div className="space-y-3">
                <Link to="/installers" className="block text-sm font-bold text-brand-navy hover:text-brand-green transition-colors">
                  Browse MCS-certified installers
                </Link>
                <Link to="/education/article/solar-panel-installation-cost-uk" className="block text-sm font-bold text-brand-navy hover:text-brand-green transition-colors">
                  Read UK solar cost guide
                </Link>
                <Link to="/education/article/is-solar-worth-it-uk" className="block text-sm font-bold text-brand-navy hover:text-brand-green transition-colors">
                  Is solar worth it in the UK?
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SolarPanelQuotesCity;
