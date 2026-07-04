import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Zap } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';
import SystemSizeWidget from '../../components/widgets/SystemSizeWidget';

const SystemSizeEstimator: React.FC = () => {
  usePageMetadata({
    title: 'Solar System Size Estimator UK',
    description: 'Calculate how many solar panels you need based on your electricity bill, roof space, and energy usage in the UK.',
    path: '/tools/system-size',
    keywords: 'how many solar panels do i need, solar system size calculator, kwp calculator uk, roof space solar',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'System Size Estimator', path: '/tools/system-size' },
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
            System Size Estimator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Not sure how many panels you need? Use our calculator to find the ideal system size based on your energy consumption.
          </p>
          
          <div className="bg-brand-navy rounded-3xl p-6 md:p-8 shadow-xl inline-block text-left border border-brand-accent w-full max-w-2xl">
             <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <Zap className="h-5 w-5 text-brand-yellow" />
               Did you know?
             </h2>
             <p className="text-white/90 text-base md:text-lg leading-relaxed">
                "You don't need a massive roof to go solar. Just 25 square metres is enough space for a 12-panel system that churns out 4,200 kWh of free electricity every year."
              </p>
          </div>
        </div>

        <SystemSizeWidget />

        <div className="text-center mt-16 pt-8 border-t border-brand-accent">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider">
            Source: Which? / Solar Energy UK
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemSizeEstimator;
