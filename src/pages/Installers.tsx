import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ShieldCheck, BadgeCheck, Phone, Mail, ExternalLink } from 'lucide-react';

import { usePageMetadata } from '../hooks/usePageMetadata';

const installers = [
  {
    name: 'EcoEnergy Systems',
    location: 'London & South East',
    rating: 4.9,
    reviews: 128,
    specialism: 'Residential & Battery',
    verified: true,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'NorthStar Solar',
    location: 'Manchester & Midlands',
    rating: 4.8,
    reviews: 94,
    specialism: 'Commercial & Industrial',
    verified: true,
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'GreenFuture UK',
    location: 'Scotland & Borders',
    rating: 4.7,
    reviews: 215,
    specialism: 'Bespoke Residential',
    verified: true,
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=400&q=80'
  }
];

const Installers: React.FC = () => {
  usePageMetadata(
    'Vetted Installer Network',
    'Browse our directory of MCS-certified solar installers who pass our internal 50-point quality check.'
  );
  return (
    <div className="bg-brand-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-serif font-bold text-brand-navy mb-4">Vetted Installer Network</h1>
            <p className="text-brand-muted text-lg">We only partner with MCS-certified installers who pass our internal 50-point quality check. No sales pressure, just quality craft.</p>
          </div>
          <div className="bg-brand-green/10 px-6 py-3 rounded-2xl flex items-center gap-3 text-brand-green font-bold border border-brand-green/20">
            <ShieldCheck className="h-6 w-6" />
            <span>MCS Certified Only</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-brand-accent flex flex-col md:flex-row gap-4 mb-16">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
            <input 
              type="text" 
              placeholder="Search by name or specialty..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-white border border-brand-accent outline-none focus:border-brand-navy transition-all"
            />
          </div>
          <div className="flex-grow relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
            <input 
              type="text" 
              placeholder="Postcode or City" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-white border border-brand-accent outline-none focus:border-brand-navy transition-all"
            />
          </div>
          <button className="bg-brand-navy text-white px-12 py-4 rounded-2xl font-bold hover:shadow-lg transition-all">
            Filter Results
          </button>
        </div>

        {/* Installer Grid */}
        <div className="space-y-6">
          {installers.map((installer) => (
            <motion.div 
              key={installer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-brand-accent shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8 items-center"
            >
              <img src={installer.image} alt={installer.name} className="h-40 w-40 rounded-3xl object-cover shadow-inner" />
              
              <div className="flex-grow text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h3 className="text-2xl font-serif font-bold text-brand-navy">{installer.name}</h3>
                  {installer.verified && <BadgeCheck className="h-6 w-6 text-brand-green" />}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4 text-sm font-medium text-brand-muted">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {installer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-brand-yellow fill-brand-yellow" /> {installer.rating} ({installer.reviews} reviews)
                  </span>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {installer.specialism.split('&').map(tag => (
                    <span key={tag} className="bg-brand-accent/30 text-brand-navy text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link to="/wizard" className="bg-brand-navy text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                  Request Quote
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <div className="flex gap-2">
                  <button className="flex-1 p-3 rounded-full border border-brand-accent hover:border-brand-navy transition-all flex justify-center">
                    <Phone className="h-5 w-5 text-brand-navy" />
                  </button>
                  <button className="flex-1 p-3 rounded-full border border-brand-accent hover:border-brand-navy transition-all flex justify-center">
                    <Mail className="h-5 w-5 text-brand-navy" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Vetted? */}
        <div className="mt-24 bg-brand-navy rounded-[3rem] p-12 text-white overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-8">The Solarpedia Quality Standard</h2>
              <div className="space-y-6">
                {[
                  { title: 'Verified MCS Certification', desc: 'All installers must maintain active MCS certification for equipment and workmanship.' },
                  { title: 'Financial Stability Check', desc: 'We verify the company accounts to ensure they will be around for your long-term warranty.' },
                  { title: 'Real Customer Audit', desc: 'We independently verify at least 10 recent installations for every partner.' },
                ].map((item) => (
                  <div key={item.title}>
                    <h4 className="font-bold text-brand-yellow mb-1">{item.title}</h4>
                    <p className="text-brand-accent text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8 text-center">
                  <ShieldCheck className="h-12 w-12 text-brand-yellow mb-4" />
                  <p className="font-bold">Consumer Protection</p>
                </div>
                <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8 text-center">
                  <Star className="h-12 w-12 text-brand-yellow mb-4" />
                  <p className="font-bold">Premium Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Installers;
