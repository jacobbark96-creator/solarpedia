import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ShieldCheck, BadgeCheck, Phone, ExternalLink } from 'lucide-react';
import installerDataset from '../data/certifiedInstallers.json';
import { usePageMetadata } from '../hooks/usePageMetadata';

type InstallerRecord = {
  slug: string;
  name: string;
  detailUrl: string;
  sourceCity: string;
  sourceCitySlug: string;
  distanceMiles: number | null;
  address: string;
  certificationNumber: string;
  certificationBody: string;
  tags: string[];
  phone: string;
  website: string;
  rating: number | null;
  reviews: number | null;
  sourceUrl: string;
  cities: string[];
  citySlugs: string[];
};

const dataset = installerDataset as {
  generatedAt: string;
  source: string;
  disclaimer: string;
  installers: InstallerRecord[];
};

const Installers: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [locationTerm, setLocationTerm] = React.useState('');

  usePageMetadata(
    'MCS-Certified Solar Installers',
    'Browse publicly sourced MCS-certified solar installers by city, certification body, technology, and rating.'
  );

  const sortedInstallers = React.useMemo(() => {
    return [...dataset.installers].sort((a, b) => {
      const ratingA = a.rating ?? -1;
      const ratingB = b.rating ?? -1;
      if (ratingA !== ratingB) return ratingB - ratingA;

      const reviewsA = a.reviews ?? -1;
      const reviewsB = b.reviews ?? -1;
      if (reviewsA !== reviewsB) return reviewsB - reviewsA;

      return a.name.localeCompare(b.name);
    });
  }, []);

  const filteredInstallers = React.useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const location = locationTerm.trim().toLowerCase();

    return sortedInstallers.filter((installer) => {
      const matchesQuery =
        !query ||
        installer.name.toLowerCase().includes(query) ||
        installer.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        installer.certificationBody.toLowerCase().includes(query);

      const matchesLocation =
        !location ||
        installer.cities.some((city) => city.toLowerCase().includes(location)) ||
        installer.address.toLowerCase().includes(location);

      return matchesQuery && matchesLocation;
    });
  }, [locationTerm, searchTerm, sortedInstallers]);

  const visibleInstallers = filteredInstallers.slice(0, 60);
  const installersWithRatings = dataset.installers.filter((installer) => installer.rating !== null).length;
  const batteryQualified = dataset.installers.filter((installer) => installer.tags.includes('Battery Storage')).length;

  return (
    <div className="bg-brand-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif font-bold text-brand-navy mb-4">MCS-Certified Solar Installers</h1>
            <p className="text-brand-muted text-lg">
              Search our imported directory of publicly listed MCS-certified solar installers. These records are sourced from a public directory and are not automatically Solarpedia-vetted partners.
            </p>
          </div>
          <div className="bg-brand-green/10 px-6 py-3 rounded-2xl flex items-center gap-3 text-brand-green font-bold border border-brand-green/20">
            <ShieldCheck className="h-6 w-6" />
            <span>{dataset.installers.length.toLocaleString()} MCS-Certified Installers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-brand-accent">
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Imported Listings</p>
            <p className="text-2xl font-serif font-bold text-brand-navy">{dataset.installers.length.toLocaleString()}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-accent">
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">With Public Ratings</p>
            <p className="text-2xl font-serif font-bold text-brand-navy">{installersWithRatings.toLocaleString()}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-accent">
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Battery Qualified</p>
            <p className="text-2xl font-serif font-bold text-brand-navy">{batteryQualified.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-brand-accent flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
            <input
              type="text"
              placeholder="Search by installer, certification body, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-white border border-brand-accent outline-none focus:border-brand-navy transition-all"
            />
          </div>
          <div className="flex-grow relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
            <input
              type="text"
              placeholder="City or address keyword"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-white border border-brand-accent outline-none focus:border-brand-navy transition-all"
            />
          </div>
          <div className="bg-brand-navy text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center min-w-44">
            {filteredInstallers.length.toLocaleString()} Matches
          </div>
        </div>

        <div className="bg-white p-5 rounded-[2rem] border border-brand-accent mb-16">
          <p className="text-sm text-brand-muted leading-relaxed">
            Source:{' '}
            <a href={dataset.source} target="_blank" rel="noopener noreferrer" className="text-brand-navy font-bold hover:underline">
              {dataset.source}
            </a>
            . Data refreshed on{' '}
            {new Date(dataset.generatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. {dataset.disclaimer}
          </p>
        </div>

        <div className="space-y-6">
          {visibleInstallers.map((installer) => (
            <motion.div
              key={installer.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-brand-accent shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="h-24 w-24 rounded-3xl bg-brand-navy text-white flex items-center justify-center text-2xl font-serif font-bold shadow-inner flex-shrink-0">
                {installer.name.slice(0, 1)}
              </div>

              <div className="flex-grow text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h3 className="text-2xl font-serif font-bold text-brand-navy">{installer.name}</h3>
                  <BadgeCheck className="h-6 w-6 text-brand-green" />
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4 text-sm font-medium text-brand-muted">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {installer.cities.join(', ')}
                  </span>
                  {installer.rating !== null && installer.reviews !== null && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-brand-yellow fill-brand-yellow" /> {installer.rating} ({installer.reviews} reviews)
                    </span>
                  )}
                  {installer.distanceMiles !== null && <span>{installer.distanceMiles.toFixed(1)} mi from source city</span>}
                </div>
                <p className="text-sm text-brand-muted mb-4">{installer.address}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <span className="bg-brand-green/10 text-brand-green text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    MCS Certified
                  </span>
                  <span className="bg-brand-accent/30 text-brand-navy text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {installer.certificationNumber} · {installer.certificationBody}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {installer.tags.map((tag) => (
                    <span key={tag} className="bg-brand-accent/30 text-brand-navy text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {tag}
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
                  {installer.phone ? (
                    <a href={`tel:${installer.phone}`} className="flex-1 p-3 rounded-full border border-brand-accent hover:border-brand-navy transition-all flex justify-center">
                      <Phone className="h-5 w-5 text-brand-navy" />
                    </a>
                  ) : (
                    <div className="flex-1 p-3 rounded-full border border-brand-accent/50 flex justify-center opacity-40">
                      <Phone className="h-5 w-5 text-brand-navy" />
                    </div>
                  )}
                  <a href={installer.detailUrl} target="_blank" rel="noopener noreferrer" className="flex-1 p-3 rounded-full border border-brand-accent hover:border-brand-navy transition-all flex justify-center">
                    <ExternalLink className="h-5 w-5 text-brand-navy" />
                  </a>
                  {installer.website ? (
                    <a href={installer.website} target="_blank" rel="noopener noreferrer" className="flex-1 p-3 rounded-full border border-brand-accent hover:border-brand-navy transition-all flex justify-center">
                      <BadgeCheck className="h-5 w-5 text-brand-navy" />
                    </a>
                  ) : (
                    <div className="flex-1 p-3 rounded-full border border-brand-accent/50 flex justify-center opacity-40">
                      <BadgeCheck className="h-5 w-5 text-brand-navy" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {!visibleInstallers.length && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-brand-accent text-center">
              <h3 className="text-2xl font-serif font-bold text-brand-navy mb-3">No installers found</h3>
              <p className="text-brand-muted">Try a broader city or remove some search terms.</p>
            </div>
          )}
        </div>

        {filteredInstallers.length > visibleInstallers.length && (
          <div className="mt-8 text-center text-sm text-brand-muted">
            Showing the first {visibleInstallers.length} installers of {filteredInstallers.length.toLocaleString()} matches.
          </div>
        )}

        <div className="mt-24 bg-brand-navy rounded-[3rem] p-12 text-white overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-8">How Solarpedia Uses This Directory</h2>
              <div className="space-y-6">
                {[
                  { title: 'Verified MCS Status', desc: 'Every listing shown here comes from a public MCS-certified installer directory focused on Solar PV.' },
                  { title: 'Not Automatically Vetted', desc: 'A listing here does not mean Solarpedia has completed its own financial, workmanship, or customer-service review.' },
                  { title: 'Best Used As A Starting Point', desc: 'Use the directory to shortlist local certified installers, then request quotes and carry out your own due diligence.' },
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
                  <p className="font-bold">Public MCS Data</p>
                </div>
                <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8 text-center">
                  <Star className="h-12 w-12 text-brand-yellow mb-4" />
                  <p className="font-bold">Use With Care</p>
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
