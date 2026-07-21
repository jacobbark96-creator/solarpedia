import React from 'react';
import { Link } from '../../Link';
import { ChevronLeft, Zap } from 'lucide-react';
import EVChargingWidget from '../../widgets/EVChargingWidget';

const EVChargingCalculator: React.FC = () => {
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
            EV Charging Cost Calculator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            See exactly how much you can save by fueling your electric vehicle with free solar energy rather than expensive grid electricity.
          </p>
          
          <div className="bg-brand-navy rounded-3xl p-6 md:p-8 shadow-xl inline-block text-left border border-brand-accent w-full max-w-2xl">
             <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <Zap className="h-5 w-5 text-brand-yellow" />
               Did you know?
             </h2>
             <p className="text-white/90 text-base md:text-lg leading-relaxed">
                "Slash your driving costs to just 2p per mile. Charging your EV with free solar energy is up to 75% cheaper than using standard grid electricity."
              </p>
          </div>
        </div>

        <EVChargingWidget />

        <div className="text-center mt-16 pt-8 border-t border-brand-accent">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider">
            Source: RAC / Energy Saving Trust
          </p>
        </div>
      </div>
    </div>
  );
};

export default EVChargingCalculator;
