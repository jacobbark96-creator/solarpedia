import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, MapPin, Zap, ShieldCheck, Scale, Database, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NATIONAL_AVERAGES } from '../data/mockData';
import UKMap from '../components/UKMap';

import { usePageMetadata } from '../hooks/usePageMetadata';

const Home: React.FC = () => {
  usePageMetadata(
    'Find out if solar is actually worth it',
    'Independent UK solar insights, cost estimates and savings forecasts powered by real energy and regional data.'
  );
  const [energyPrice, setEnergyPrice] = useState(NATIONAL_AVERAGES.energyPrice);

  // Live energy price ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyPrice(prev => prev + (Math.random() - 0.5) * 0.01);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-white">
      {/* Live Ticker */}
      <div className="bg-brand-navy/5 border-b border-brand-accent py-2 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="inline-flex gap-12 text-[10px] font-bold uppercase tracking-widest text-brand-navy/60"
        >
          {[1,2,3,4,5].map(i => (
            <span key={i} className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-brand-yellow" />
              UK ENERGY PRICE INDEX: <span className="text-brand-navy">{(energyPrice * 100).toFixed(2)}p/kWh</span>
              <span className={Math.random() > 0.5 ? 'text-brand-green' : 'text-red-500'}>
                {Math.random() > 0.5 ? '▲' : '▼'} 0.2%
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold mb-6">
                <Shield className="h-3.5 w-3.5" />
                <span>100% Independent & Data-Driven</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy leading-tight mb-6">
                Find out if solar is <span className="text-brand-green underline decoration-brand-yellow/30">actually</span> worth it for your property.
              </h1>
              <p className="text-lg text-brand-muted leading-relaxed mb-8 max-w-lg">
                Independent UK solar insights, cost estimates and savings forecasts powered by real energy and regional data. No sales pressure, just facts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/wizard" className="bg-brand-navy text-white px-7 py-3.5 rounded-full font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  Check Your Potential Savings
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/education" className="bg-white border-2 border-brand-accent text-brand-navy px-7 py-3.5 rounded-full font-bold text-base hover:border-brand-navy transition-all flex items-center justify-center">
                  Explore UK Solar Costs
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {['Independent advice', 'UK data driven', 'No obligation', 'Vetted network'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                    {item}
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
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-brand-accent">
                {/* Mock Dashboard Visual */}
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-sm font-semibold text-brand-muted uppercase tracking-wider mb-1">Estimated Annual Savings</p>
                    <p className="text-4xl font-serif font-bold text-brand-navy">£1,240.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-brand-green">+15.2% ROI</p>
                    <p className="text-xs text-brand-muted">Above UK Average</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-40 bg-brand-accent/30 rounded-xl flex items-end justify-between px-6 pb-4">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className="w-8 bg-brand-navy rounded-t-md relative group"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          £{h * 10}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-brand-white border border-brand-accent rounded-2xl">
                      <TrendingUp className="h-5 w-5 text-brand-green mb-2" />
                      <p className="text-xs font-bold text-brand-muted uppercase">Payback Period</p>
                      <p className="text-lg font-serif font-bold">7.2 Years</p>
                    </div>
                    <div className="p-4 bg-brand-white border border-brand-accent rounded-2xl">
                      <Zap className="h-5 w-5 text-brand-yellow mb-2" />
                      <p className="text-xs font-bold text-brand-muted uppercase">System Size</p>
                      <p className="text-lg font-serif font-bold">4.2 kWp</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating regional badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-brand-yellow text-brand-navy p-4 rounded-2xl shadow-xl font-bold flex items-center gap-3"
              >
                <MapPin className="h-5 w-5" />
                <div>
                  <p className="text-[10px] uppercase tracking-tighter opacity-70">Best Region for ROI</p>
                  <p>South West England</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -z-0" />
      </section>

      {/* Quick Value Bar */}
      <section className="bg-brand-navy py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center md:text-left">
              <p className="text-brand-accent text-[10px] font-bold uppercase mb-1 tracking-widest">Avg. Install Cost</p>
              <p className="text-white text-xl font-serif font-bold">£{NATIONAL_AVERAGES.installCost.toLocaleString()}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-brand-accent text-[10px] font-bold uppercase mb-1 tracking-widest">Avg. Annual Savings</p>
              <p className="text-white text-xl font-serif font-bold">£{NATIONAL_AVERAGES.annualSavings.toLocaleString()}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-brand-accent text-[10px] font-bold uppercase mb-1 tracking-widest">ROI Speed</p>
              <p className="text-white text-xl font-serif font-bold">8.5 Years</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-brand-accent text-[10px] font-bold uppercase mb-1 tracking-widest">CO2 Reduction</p>
              <p className="text-white text-xl font-serif font-bold">{NATIONAL_AVERAGES.co2Reduction} Tonnes</p>
            </div>
            <div className="text-center md:text-left hidden md:block">
              <p className="text-brand-accent text-[10px] font-bold uppercase mb-1 tracking-widest">Energy Price</p>
              <p className="text-white text-xl font-serif font-bold">{(energyPrice * 100).toFixed(1)}p/kWh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-brand-white border-b border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-brand-navy mb-3">Interactive UK Solar Map</h2>
            <p className="text-sm text-brand-muted max-w-xl mx-auto">Explore regional solar data, efficiency ratings, and ROI benchmarks by postcode.</p>
          </div>
          <UKMap />
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20 bg-brand-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-navy rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight">
                  How we stay <span className="text-brand-yellow">100% impartial</span> in a complex market.
                </h2>
                <p className="text-brand-accent text-base mb-10 leading-relaxed opacity-90">
                  Unlike many comparison sites, Solarpedia is not a hidden lead-generation funnel for installers. We exist to provide genuine, data-driven consumer advice.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: ShieldCheck, title: 'We do not install solar', desc: 'We have zero financial interest in whether you choose to install solar or not.' },
                    { icon: Scale, title: 'Unbiased Algorithms', desc: 'Our recommendations are based purely on your property suitability and UK regional data.' },
                    { icon: Database, title: 'Verified Datasets', desc: 'We use official irradiance data and actual energy price indices for all calculations.' },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5"
                    >
                      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-brand-yellow" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-brand-accent text-xs leading-relaxed opacity-80">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Independent', desc: 'No commission-based rankings' },
                  { label: 'Transparent', desc: 'Full methodology disclosed' },
                  { label: 'Qualified', desc: 'Vetted installer network' },
                  { label: 'Data-First', desc: 'Real-world performance data' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                    <Search className="h-5 w-5 text-brand-yellow mx-auto mb-3" />
                    <h3 className="font-bold text-base mb-1">{stat.label}</h3>
                    <p className="text-[10px] text-brand-accent leading-relaxed opacity-70">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-navy mb-4">Ready to see your property's potential?</h2>
          <p className="text-brand-muted text-base mb-10">Join 12,000+ UK property owners who used Solarpedia to make a smarter energy decision this year.</p>
          <Link to="/wizard" className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all">
            Get Your Free Estimate
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-6 text-xs text-brand-muted font-medium flex items-center justify-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-green" />
            No obligation. No pressure. Just data.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
