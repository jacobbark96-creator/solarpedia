import React from 'react';
import { Link } from '../Link';
import { Calculator, Zap, Battery, Home, Car, TrendingUp, ChevronRight } from 'lucide-react';

const toolsList = [
  {
    title: 'Solar Savings & Payback Calculator',
    description: 'Our core wizard. Enter your postcode and bill to calculate roof suitability, generation, and payback time.',
    icon: Calculator,
    link: '/wizard',
    ready: true,
  },
  {
    title: 'Export Tariff Comparison',
    description: 'Compare Octopus Flux, Intelligent Go, and standard SEG rates based on your estimated export volume.',
    icon: Zap,
    link: '/tools/export-tariffs',
    ready: true,
  },
  {
    title: 'Battery ROI Calculator',
    description: 'See how adding a 5kWh or 10kWh battery changes your self-consumption and payback period.',
    icon: Battery,
    link: '/tools/battery-roi',
    ready: true,
  },
  {
    title: 'EV Charging Cost Calculator',
    description: 'Calculate how much you can save by charging your EV from solar vs the grid on standard and ToU tariffs.',
    icon: Car,
    link: '/tools/ev-charging',
    ready: true,
  },
  {
    title: 'Roof Suitability Checker',
    description: 'Instantly check your roof azimuth, pitch, and estimated square meterage using satellite data.',
    icon: Home,
    link: '/tools/roof-suitability',
    ready: true,
  },
  {
    title: 'System Size Estimator',
    description: 'Work backwards from your target energy offset to find the exact kWp system you need to install.',
    icon: TrendingUp,
    link: '/tools/system-size',
    ready: true,
  },
];

const Tools: React.FC = () => {
  return (
    <div className="bg-brand-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
            Interactive Tools
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-6">
            Solar Calculators & Tools
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            Take the guesswork out of your solar project. Use our free interactive calculators to model payback, compare export tariffs, and right-size your battery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsList.map((tool) => (
            tool.ready ? (
              <Link 
                key={tool.title}
                to={tool.link}
                className="bg-white border border-brand-accent rounded-[2rem] p-8 hover:shadow-xl hover:border-brand-navy transition-all group flex flex-col h-full"
              >
                <div className="p-4 bg-brand-white rounded-2xl w-fit mb-6 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <tool.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{tool.title}</h3>
                <p className="text-brand-muted mb-8 flex-grow">{tool.description}</p>
                <div className="flex items-center gap-2 text-sm font-bold text-brand-navy group-hover:text-brand-green transition-colors mt-auto">
                  Open tool <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ) : (
              <div 
                key={tool.title}
                className="bg-white/50 border border-brand-accent/50 rounded-[2rem] p-8 flex flex-col h-full opacity-70"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-brand-white rounded-2xl w-fit text-brand-muted">
                    <tool.icon className="h-8 w-8" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-white px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-muted mb-3">{tool.title}</h3>
                <p className="text-brand-muted/70 flex-grow">{tool.description}</p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;