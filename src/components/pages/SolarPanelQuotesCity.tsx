import React, { useMemo } from 'react';
import { Link } from '../Link';
import { Zap, TrendingUp, ShieldCheck, Database, ArrowRight } from 'lucide-react';
import cities from '../../data/ukCities.json';
import { UK_REGIONS_DATA } from '../../data/mockData';
import { 
  getSolarQuotesCitySeo, 
} from '../../lib/seo';

type City = { name: string; slug: string; regionCode: string };

const SolarPanelQuotesCity: React.FC<{ citySlug?: string }> = ({ citySlug }) => {

  const cityList = cities as City[];
  const city = useMemo(() => {
    return cityList.find((c) => c.slug === citySlug) || null;
  }, [cityList, citySlug]);

  const regionData = useMemo(() => {
    if (!city) return null;
    return UK_REGIONS_DATA[city.regionCode] || null;
  }, [city]);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
              UK Regional Guide
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-5">
              {seo?.h1}
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed max-w-2xl">
              {seo?.intro}
            </p>
          </div>

          {regionData && (
            <div className="bg-white rounded-3xl p-8 border border-brand-accent shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-1">{regionData.region} Benchmark</p>
                  <h2 className="text-2xl font-serif font-bold text-brand-navy">{city.name}</h2>
                </div>
                <div className="bg-brand-green/10 px-3 py-1.5 rounded-xl text-brand-green font-bold text-xs">
                  +{regionData.roiPercentage}% ROI
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-brand-white rounded-2xl border border-brand-accent">
                  <Zap className="h-5 w-5 text-brand-yellow mb-2" />
                  <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Avg. Saving</p>
                  <p className="text-xl font-serif font-bold">£{regionData.avgBillSavings}</p>
                </div>
                <div className="p-4 bg-brand-white rounded-2xl border border-brand-accent">
                  <TrendingUp className="h-5 w-5 text-brand-green mb-2" />
                  <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Payback</p>
                  <p className="text-xl font-serif font-bold">{regionData.paybackPeriodYears} Years</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">How solar quotes work in {city.name}</h2>
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
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">Local installation factors for {city.name}</h2>
              <p className="text-brand-muted leading-relaxed mb-6">
                In {city.name}, an average 4kWp solar installation costs roughly <strong className="text-brand-navy">£{regionData?.avgInstallCost}</strong>. 
                However, your final quote will depend on several local variables including:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-brand-muted text-sm leading-relaxed mb-8">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  </div>
                  <span>Roof size, shading, and orientation (South-facing is best)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  </div>
                  <span>Scaffolding access and property height in {city.name}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  </div>
                  <span>System size (kWp) and whether you add battery storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  </div>
                  <span>Grid connection (DNO) requirements for your specific postcode</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/wizard"
                  className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all text-center"
                >
                  Estimate savings for my roof
                </Link>
                <Link
                  to={`/best-solar-installers/${city.slug}`}
                  className="bg-white border border-brand-accent text-brand-navy px-8 py-4 rounded-full font-bold text-base hover:border-brand-navy transition-all text-center"
                >
                  View installers in {city.name}
                </Link>
              </div>
            </div>

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">Why compare quotes through Solarpedia?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-brand-white border border-brand-accent flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">Vetted local network</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">We only route leads to installers covering {city.name} who maintain high survey standards and workmanship warranties.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-brand-white border border-brand-accent flex items-center justify-center flex-shrink-0">
                    <Database className="h-5 w-5 text-brand-yellow" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">Data-backed assumptions</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">Our benchmarks for {city.name} use current {regionData?.region} energy prices and regional sunlight data.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">Common questions in {city.name}</h2>
              <div className="space-y-6">
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
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-4">
                Nearby city pages
              </div>
              <div className="space-y-3">
                {nearbyCities.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/solar-panel-quotes/${c.slug}`}
                      className="group block bg-brand-white border border-brand-accent rounded-2xl px-5 py-4 hover:border-brand-navy transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-brand-navy">Quotes {c.name}</div>
                        <ArrowRight className="h-4 w-4 text-brand-muted group-hover:text-brand-navy group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
              </div>
              <Link
                to="/solar-panel-quotes"
                className="mt-6 inline-block text-sm font-bold text-brand-navy hover:text-brand-green transition-colors"
              >
                View all cities
              </Link>
            </div>

            <div className="bg-brand-navy rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-serif font-bold mb-3">Solar for business</h3>
                <p className="text-brand-accent text-sm mb-6 leading-relaxed opacity-80">
                  Own a commercial property in {city.name}? Solar ROI is often higher for business premises.
                </p>
                <Link to="/commercial-solar-quotes-uk" className="inline-flex items-center gap-2 text-brand-yellow font-bold text-sm hover:gap-3 transition-all">
                  Commercial quotes <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SolarPanelQuotesCity;
