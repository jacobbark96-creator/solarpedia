import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Zap } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';
import RoofSuitabilityWidget from '../../components/widgets/RoofSuitabilityWidget';

const RoofSuitabilityChecker: React.FC = () => {
  usePageMetadata({
    title: 'Solar Roof Suitability Checker UK',
    description: 'Check if your UK roof is suitable for solar panels based on direction, pitch, and shading.',
    path: '/tools/roof-suitability',
    keywords: 'solar roof checker, roof suitability solar panels, east west roof solar uk, flat roof solar',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'Roof Suitability Checker', path: '/tools/roof-suitability' },
      ]),
    ],
  });

  return (
    <div className="bg-brand-white min-h-screen pt-16 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/tools" 
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-green transition-colors mb-8 bg-white border border-brand-accent px-4 py-2 rounded-full shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to all tools
        </Link>

        {/* Landing Page Hero & Hook */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-6">
            Roof Suitability Checker
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Not all roofs are created equal. Discover how your roof's direction, pitch, and shading impact your solar energy potential.
          </p>
          
          <div className="bg-brand-navy rounded-3xl p-6 md:p-8 shadow-xl inline-block text-left border border-brand-accent w-full max-w-2xl">
             <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <Zap className="h-5 w-5 text-brand-yellow" />
               Did you know?
             </h2>
             <p className="text-white/90 text-base md:text-lg leading-relaxed">
               "Even an east or west-facing roof in the UK can still generate up to 86% of the energy produced by a perfectly south-facing roof."
             </p>
          </div>
        </div>

        <RoofSuitabilityWidget />

        <div className="text-center mt-16 pt-8 border-t border-brand-accent">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider">
            Source: Energy Saving Trust / MCS
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoofSuitabilityChecker;
