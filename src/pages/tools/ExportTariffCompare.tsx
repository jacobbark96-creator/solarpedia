import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
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
    <div className="bg-brand-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/tools" 
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-green transition-colors mb-8 bg-white border border-brand-accent px-4 py-2 rounded-full shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to all tools
        </Link>
        <ExportTariffWidget />
      </div>
    </div>
  );
};

export default ExportTariffCompare;
