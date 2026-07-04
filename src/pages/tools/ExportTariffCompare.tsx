import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Zap } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';
import ExportTariffWidget from '../../components/widgets/ExportTariffWidget';

const ExportTariffCompare: React.FC = () => {
  usePageMetadata({
    title: 'Solar Export Tariff Comparison Calculator UK',
    description: 'Compare Octopus Flux, E.ON Next, and standard SEG rates to see how much you could earn by exporting solar energy to the UK grid.',
    path: '/tools/export-tariffs',
    keywords: 'export tariff calculator, SEG calculator, Octopus Flux compare, solar export income UK',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'Export Tariff Comparison', path: '/tools/export-tariffs' },
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
            Export Tariff Comparison
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Don't let your excess solar energy go to waste. Compare the best Smart Export Guarantee (SEG) tariffs and see your potential earnings.
          </p>
          
          <div className="bg-brand-navy rounded-3xl p-6 md:p-8 shadow-xl inline-block text-left border border-brand-accent w-full max-w-2xl">
             <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <Zap className="h-5 w-5 text-brand-yellow" />
               Did you know?
             </h2>
             <p className="text-white/90 text-base md:text-lg leading-relaxed">
                "Your roof could be making you money. Top export tariffs are paying households over £250 a year just for selling their leftover solar energy back to the grid."
              </p>
          </div>
        </div>

        <ExportTariffWidget />

        <div className="text-center mt-16 pt-8 border-t border-brand-accent">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider">
            Source: Ofgem / Energy Saving Trust
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportTariffCompare;
