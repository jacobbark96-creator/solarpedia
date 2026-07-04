import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Zap } from 'lucide-react';
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
            Battery ROI Calculator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Find out exactly how long it takes for a home battery to pay for itself by storing your free solar energy for the evening.
          </p>
          
          <div className="bg-brand-navy rounded-3xl p-6 md:p-8 shadow-xl inline-block text-left border border-brand-accent w-full max-w-2xl">
             <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <Zap className="h-5 w-5 text-brand-yellow" />
               Did you know?
             </h2>
             <p className="text-white/90 text-base md:text-lg leading-relaxed">
                "Don't let your free solar energy slip away. A home battery can boost your self-reliance to 80%—meaning you use what you generate, instead of buying it back."
              </p>
          </div>
        </div>

        <BatteryROIWidget />

        <div className="text-center mt-16 pt-8 border-t border-brand-accent">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider">
            Source: Energy Saving Trust / Solar Energy UK
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatteryROICalculator;
