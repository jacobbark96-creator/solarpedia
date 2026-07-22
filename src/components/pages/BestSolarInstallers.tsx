import React from 'react';
import { Link } from '../Link';
import cities from '../../data/ukCities.json';
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createServiceSchema,
  getBestInstallersHubSeo,
  buildAbsoluteUrl,
} from '../../lib/seo';
import { INSTALLERS_DB } from '../../data/installers';
import { Star, ShieldCheck, ArrowRight, Award } from 'lucide-react';

type City = { name: string; slug: string };

const BestSolarInstallers: React.FC = () => {
  const seo = getBestInstallersHubSeo();

  return (
    <div className="bg-brand-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
            Commercial intent pages
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-5">
            {seo.h1}
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            {seo.intro}
          </p>
        </div>

        {/* Featured Installers Summary */}
        <div className="bg-brand-navy rounded-[2.5rem] p-8 md:p-12 mb-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-brand-yellow text-[10px] font-bold uppercase tracking-wider mb-6">
                <Award className="h-4 w-4" />
                Vetted National Network
              </div>
              <h2 className="text-3xl font-serif font-bold mb-6">Top-rated installers by region</h2>
              <p className="text-brand-accent text-base leading-relaxed mb-8 opacity-90">
                We maintain a database of MCS-certified installers who have passed our internal survey and workmanship audit. Choose a city below to see providers covering your specific postcode.
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-2xl font-serif font-bold text-white">4.8+</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Avg Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-white">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">MCS Certified</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-white">250+</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Vetted Partners</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 gap-4">
              {INSTALLERS_DB.slice(0, 2).map(inst => (
                <div key={inst.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{inst.name}</h3>
                    <div className="flex items-center gap-1 text-brand-yellow">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-bold">{inst.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-brand-accent opacity-70 line-clamp-1 mb-3">{inst.description}</p>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3 text-brand-green" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">MCS #0000{inst.id.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(cities as City[]).map((city) => (
            <Link
              key={city.slug}
              to={`/best-solar-installers/${city.slug}`}
              className="bg-white border border-brand-accent rounded-[2rem] p-6 hover:border-brand-navy hover:-translate-y-0.5 transition-all"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">
                Local solar installers
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
