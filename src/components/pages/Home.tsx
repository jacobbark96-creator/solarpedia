import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, TrendingUp, Shield, Zap, ShieldCheck, Scale,
  Database, Newspaper, ChevronRight, Info, Calendar
} from 'lucide-react';
import { Link } from '../Link';
import { NATIONAL_AVERAGES } from '../../data/mockData';
import UKMap from '../UKMap';
import { useLiveNews } from '../../hooks/useLiveNews';
import cities from '../../data/ukCities.json';
import { createBreadcrumbSchema, createWebsiteSchema, createFAQSchema, OG_IMAGES } from '../../lib/seo';

const homeFaqs = [
  {
    question: 'Is solar worth it in the UK?',
    answer:
      'For many homes and businesses, yes. The answer depends on roof area, direction, daytime electricity use, battery plans, and local installation costs.',
  },
  {
    question: 'How much do solar panels cost in the UK?',
    answer:
      'Costs vary by system size, roof complexity, battery storage, scaffolding, and electrical upgrades. That is why city quote pages and the savings wizard are useful starting points.',
  },
  {
    question: 'How do I compare solar installers properly?',
    answer:
      'Check MCS certification, survey quality, workmanship warranties, projected generation, battery specification, monitoring, and aftercare support rather than comparing only the headline price.',
  },
];

const Home: React.FC = () => {
  const { news: liveNews, loading: newsLoading } = useLiveNews();
  const topCityPages = (cities as { name: string; slug: string }[]).slice(0, 6);

  return (
    <div className="bg-brand-white">
      {/* Live Ticker */}
      <div className="bg-brand-navy border-b border-brand-accent py-2.5 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="inline-flex gap-16 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80"
        >
          {[1,2,3].map(i => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-brand-yellow" />
                OFGEM PRICE CAP (Q2 2026): <span className="text-white">{(NATIONAL_AVERAGES.energyPrice * 100).toFixed(2)}p/kWh</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-brand-accent" />
                NEXT REVIEW (JULY): <span className="text-brand-yellow">~{(NATIONAL_AVERAGES.nextEnergyPrice * 100).toFixed(2)}p/kWh (+13%)</span>
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-brand-green" />
                AVG. ANNUAL SAVINGS: <span className="text-white">£{NATIONAL_AVERAGES.annualSavings}</span>
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-brand-navy leading-[1.1] mb-8">
                Find out if solar is <span className="text-brand-green italic">actually</span> worth it for your property.
              </h1>
              <p className="text-xl text-brand-muted leading-relaxed mb-10 max-w-xl">
                Independent UK solar insights, cost estimates and savings forecasts powered by real energy data. We are not installers—just data-driven guidance for your home or business.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/wizard" className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                  Check Your Potential Savings
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/education" className="bg-white border border-brand-accent text-brand-navy px-8 py-4 rounded-full font-bold text-lg hover:border-brand-navy transition-all flex items-center justify-center">
                  Explore Solar Costs
                </Link>
              </div>
              
              <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
                {[
                  { label: 'Independent advice', icon: ShieldCheck },
                  { label: 'UK data driven', icon: Database },
                  { label: 'Vetted network', icon: Scale }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 text-xs text-brand-muted font-bold uppercase tracking-widest">
                    <item.icon className="h-4 w-4 text-brand-yellow" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 border border-brand-accent">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-2">Regional Benchmark</p>
                    <h2 className="text-3xl font-serif font-bold text-brand-navy">South West England</h2>
                  </div>
                  <div className="bg-brand-green/10 px-4 py-2 rounded-2xl text-brand-green font-bold text-sm">
                    +15.2% ROI
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="p-6 bg-brand-white rounded-3xl border border-brand-accent">
                    <Zap className="h-6 w-6 text-brand-yellow mb-4" />
                    <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Annual Savings</p>
                    <p className="text-2xl font-serif font-bold">£1,240</p>
                  </div>
                  <div className="p-6 bg-brand-white rounded-3xl border border-brand-accent">
                    <TrendingUp className="h-6 w-6 text-brand-green mb-4" />
                    <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Payback</p>
                    <p className="text-2xl font-serif font-bold">7.2 Years</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-brand-muted">Suitability Score</span>
                    <span className="text-brand-navy">92%</span>
                  </div>
                  <div className="h-3 bg-brand-accent/30 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1, delay: 1 }}
                      className="h-full bg-brand-navy"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative images */}
              <div className="absolute -top-12 -right-12 w-64 h-64 rounded-[2rem] overflow-hidden shadow-2xl -z-0 rotate-6 border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80" 
                  alt="Solar Roof"
                  width="600"
                  height="600"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-[2rem] overflow-hidden shadow-2xl -z-0 -rotate-6 border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=400&q=80" 
                  alt="Solar Installation"
                  width="400"
                  height="400"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry News & Grants Carousel */}
      <section className="py-20 bg-white border-y border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-widest mb-3">
                <Newspaper className="h-4 w-4" />
                Latest Grant Updates & News
              </div>
              <h2 className="text-3xl font-serif font-bold text-brand-navy">Renewable Energy Intelligence</h2>
            </div>
            <Link to="/education" className="text-brand-navy font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Insights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsLoading ? (
              // Skeleton Loaders
              [1, 2, 3, 4].map(i => (
                <div key={i} className="bg-brand-white p-6 rounded-[2rem] border border-brand-accent h-full flex flex-col animate-pulse">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-6 w-full bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-6"></div>
                  <div className="h-16 w-full bg-gray-100 rounded mb-6 flex-grow"></div>
                </div>
              ))
            ) : (
              liveNews.map((news) => (
                <a key={news.id} href={news.link} target="_blank" rel="noopener noreferrer">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-brand-white p-6 rounded-[2rem] border border-brand-accent h-full flex flex-col group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2.5 py-1 rounded-full text-brand-muted border border-brand-accent">
                        {news.category}
                      </span>
                      <span className="text-[10px] font-bold text-brand-muted uppercase">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-brand-navy mb-3 leading-tight group-hover:text-brand-green transition-colors line-clamp-3">
                      {news.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed mb-6 flex-grow line-clamp-3">
                      {news.summary}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-navy group-hover:gap-3 transition-all">
                      Read Source Article <ChevronRight className="h-4 w-4" />
                    </div>
                  </motion.div>
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-serif font-bold text-brand-navy mb-4">Interactive UK Solar Map</h2>
            <p className="text-lg text-brand-muted">Click a region to see actual installation benchmarks, ROI estimates, and local energy price variations based on Q2 2026 data.</p>
          </div>
          <UKMap />
        </div>
      </section>

      {/* SEO Hub Section */}
      <section className="py-24 bg-white border-y border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
              Popular solar searches
            </p>
            <h2 className="text-4xl font-serif font-bold text-brand-navy mb-5">
              Explore solar quotes, installers, and business solar in one place
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed">
              Solarpedia is built to answer both research-stage and buyer-stage searches. Whether you want to understand solar costs, compare installers, or request commercial solar quotes, start from the hub that matches your intent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: 'Solar panel quotes by city',
                desc: 'Compare local quote pages, postcode-led routing, and installer availability in the UK cities we cover.',
                link: '/solar-panel-quotes',
                cta: 'Browse quote pages',
              },
              {
                title: 'Local solar installers by city',
                desc: 'Use city installer pages and directory content to compare providers, credentials, and next-step actions.',
                link: '/best-solar-installers',
                cta: 'Compare installers',
              },
              {
                title: 'Commercial solar quotes UK',
                desc: 'Find commercial solar guidance for warehouses, offices, schools, farms, retail sites, and industrial premises.',
                link: '/commercial-solar-quotes-uk',
                cta: 'View commercial quotes',
              },
            ].map((item) => (
              <div key={item.title} className="bg-brand-white rounded-[2rem] border border-brand-accent p-8">
                <h3 className="text-2xl font-serif font-bold text-brand-navy mb-4">{item.title}</h3>
                <p className="text-brand-muted leading-relaxed mb-6">{item.desc}</p>
                <Link to={item.link} className="inline-flex items-center gap-2 text-brand-navy font-bold hover:text-brand-green transition-colors">
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-brand-accent/20 rounded-[2rem] p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-brand-navy mb-3">Top city quote searches</h3>
                <p className="text-brand-muted">These city pages help users looking for local solar panel quotes and installer comparisons.</p>
              </div>
              <Link to="/solar-panel-quotes" className="text-brand-navy font-bold hover:text-brand-green transition-colors">
                View all city quote pages
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {topCityPages.map((city) => (
                <Link
                  key={city.slug}
                  to={`/solar-panel-quotes/${city.slug}`}
                  className="rounded-full border border-brand-accent bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:border-brand-navy transition-colors"
                >
                  Solar panel quotes {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif font-bold text-brand-navy mb-4">Frequently asked solar questions</h2>
            <p className="text-lg text-brand-muted">
              These are some of the most common questions people ask before comparing quotes or speaking to installers.
            </p>
          </div>
          <div className="space-y-5">
            {homeFaqs.map((item) => (
              <div key={item.question} className="rounded-[2rem] border border-brand-accent bg-white p-8">
                <h3 className="text-2xl font-serif font-bold text-brand-navy mb-3">{item.question}</h3>
                <p className="text-brand-muted leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-navy rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-brand-yellow text-[10px] font-bold uppercase tracking-wider mb-8">
                  <ShieldCheck className="h-4 w-4" />
                  Our Neutrality Commitment
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                  Impartial advice. <br/>
                  <span className="text-brand-yellow">Zero sales pressure.</span>
                </h2>
                <p className="text-brand-accent text-lg mb-12 leading-relaxed opacity-90">
                  Solarpedia exists to help you make an intelligent financial decision. We are funded by the industry to provide data, not to sell you panels.
                </p>
                <div className="space-y-8">
                  {[
                    { icon: ShieldCheck, title: 'No Commission Bias', desc: 'We do not take cuts from installer sales. Our data remains untainted by financial incentives.' },
                    { icon: Scale, title: 'Suitability Focused', desc: 'If solar isn\'t right for your roof, we will tell you. We care about accuracy over conversions.' },
                    { icon: Database, title: 'Verified Methodology', desc: 'Every calculation uses official Ofgem price caps and Met Office regional irradiance data.' },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                        <item.icon className="h-6 w-6 text-brand-yellow" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                        <p className="text-brand-accent text-sm leading-relaxed opacity-70">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Independent', desc: 'No rankings for sale' },
                    { label: 'Transparent', desc: 'Open data policy' },
                    { label: 'Vetted', desc: 'Strict MCS audit' },
                    { label: 'Consumer-First', desc: 'Which? inspired UX' },
                  ].map((stat) => (
                    <motion.div 
                      key={stat.label} 
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/5 p-8 rounded-[2rem] border border-white/10 text-center"
                    >
                      <Info className="h-6 w-6 text-brand-yellow mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">{stat.label}</h3>
                      <p className="text-xs text-brand-accent leading-relaxed opacity-60">{stat.desc}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Decorative blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-yellow/10 rounded-full blur-[120px] -z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="data" className="py-24 bg-white border-t border-brand-accent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[3rem] border border-brand-accent bg-brand-accent/20 p-10 md:p-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">Data methodology</p>
            <h2 className="text-4xl font-serif font-bold text-brand-navy mb-6">How Solarpedia builds its solar estimates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Energy assumptions',
                  desc: 'We model savings using current UK electricity pricing benchmarks, tariff assumptions, and estimated self-consumption behaviour.',
                },
                {
                  title: 'Property inputs',
                  desc: 'Postcode, roof area, orientation, usage pattern, and battery preference all shape the estimate you see on the results page.',
                },
                {
                  title: 'Commercial intent routing',
                  desc: 'Quote and installer pages are organised to help users move from research into city-level and commercial quote journeys quickly.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-brand-accent bg-white p-6">
                  <h3 className="text-xl font-serif font-bold text-brand-navy mb-3">{item.title}</h3>
                  <p className="text-brand-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/education" className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-xl transition-all text-center">
                Explore solar guides
              </Link>
              <Link to="/wizard" className="bg-white border border-brand-accent text-brand-navy px-8 py-4 rounded-full font-bold text-base hover:border-brand-navy transition-all text-center">
                Run the savings wizard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-brand-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-6">Ready for a data-driven forecast?</h2>
          <p className="text-brand-muted text-xl mb-12 max-w-2xl mx-auto">Join thousands of UK homeowners using Solarpedia to bypass the sales pitch and see real numbers.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/wizard" className="inline-flex items-center gap-2 bg-brand-navy text-white px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:-translate-y-1 transition-all group">
              Start Your Free Estimate
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-8 text-xs font-bold text-brand-muted uppercase tracking-widest">
            <span className="flex items-center gap-2"><Database className="h-4 w-4 text-brand-yellow" /> Verified Data</span>
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-brand-navy" /> GDPR Compliant</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
