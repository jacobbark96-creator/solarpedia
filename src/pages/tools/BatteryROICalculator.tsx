import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';
import BatteryROIWidget from '../../components/widgets/BatteryROIWidget';

const BatteryROICalculator: React.FC = () => {
  usePageMetadata({
    title: 'Solar Battery ROI Calculator UK',
    description: 'Calculate the return on investment and payback period for adding a solar battery to your UK home.',
    path: '/tools/battery-roi',
    keywords: 'solar battery calculator, battery roi uk, solar storage payback, lfp battery calculator',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'Battery ROI Calculator', path: '/tools/battery-roi' },
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
        <BatteryROIWidget />
      </div>
    </div>
  );
};

export default BatteryROICalculator;
