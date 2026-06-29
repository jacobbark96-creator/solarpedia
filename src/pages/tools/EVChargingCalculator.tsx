import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';
import EVChargingWidget from '../../components/widgets/EVChargingWidget';

const EVChargingCalculator: React.FC = () => {
  usePageMetadata({
    title: 'EV Charging Solar Calculator UK',
    description: 'Calculate how much you can save by charging your electric vehicle from solar panels versus the grid on standard and EV tariffs.',
    path: '/tools/ev-charging',
    keywords: 'ev solar calculator, electric car solar charging cost, EV tariff compare, charge EV with solar',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'EV Charging Calculator', path: '/tools/ev-charging' },
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
        <EVChargingWidget />
      </div>
    </div>
  );
};

export default EVChargingCalculator;
