import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, TrendingUp, Shield, MapPin, Zap, ShieldCheck, Scale, 
  Database, Search, Newspaper, ChevronRight, Info, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NATIONAL_AVERAGES, GRANTS_NEWS } from '../data/mockData';
import UKMap from '../components/UKMap';

import { usePageMetadata } from '../hooks/usePageMetadata';

const Home: React.FC = () => {
  usePageMetadata(
    'Find out if solar is actually worth it',
    'Independent UK solar insights, cost estimates and savings forecasts powered by real energy and regional data.'
  );
  const [energyPrice, setEnergyPrice] = useState(NATIONAL_AVERAGES.energyPrice);

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
                    <h3 className="text-3xl font-serif font-bold text-brand-navy">South West England</h3>
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
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-[2rem] overflow-hidden shadow-2xl -z-0 -rotate-6 border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=400&q=80" 
                  alt="Solar Installation" 
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
            {GRANTS_NEWS.map((news) => (
              <Link key={news.id} to={news.link}>
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
                  <h3 className="text-lg font-serif font-bold text-brand-navy mb-3 leading-tight group-hover:text-brand-green transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-6 flex-grow">
                    {news.summary}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-navy group-hover:gap-3 transition-all">
                    Read Update <ChevronRight className="h-4 w-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
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
                        <h4 className="font-bold text-xl mb-1">{item.title}</h4>
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
                  ].map((stat, i) => (
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
