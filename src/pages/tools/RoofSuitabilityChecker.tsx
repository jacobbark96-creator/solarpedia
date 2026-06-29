import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';
import RoofSuitabilityWidget from '../../components/widgets/RoofSuitabilityWidget';

const RoofSuitabilityChecker: React.FC = () => {
  usePageMetadata({
    title: 'Solar Roof Suitability Checker UK',
    description: 'Check if your UK roof is suitable for solar panels. Calculate how direction, pitch, and shading affect your solar panel efficiency.',
    path: '/tools/roof-suitability',
    keywords: 'solar roof checker, roof suitability solar, solar panel direction UK, solar shading calculator',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'Roof Suitability Checker', path: '/tools/roof-suitability' },
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
        <RoofSuitabilityWidget />
      </div>
    </div>
  );
};

export default RoofSuitabilityChecker;
