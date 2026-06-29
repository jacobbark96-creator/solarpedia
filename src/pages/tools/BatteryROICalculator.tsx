import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Battery, ChevronLeft, PoundSterling, Clock } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';

const BatteryROICalculator: React.FC = () => {
  const [batterySize, setBatterySize] = useState<number>(5.2);
  const [batteryCost, setBatteryCost] = useState<number>(3500);
  const [cyclesPerYear, setCyclesPerYear] = useState<number>(300);

  // Assumptions
  const gridRate = 0.245; // Avoided import cost
  const offPeakRate = 0.07; // Cost to charge in winter
  const exportRate = 0.12; // Opportunity cost (SEG)
  const roundTripEfficiency = 0.90; // 10% lost in conversion

  // Calculation: Value of 1 full cycle
  // Summer cycle: charge from free solar (opportunity cost 12p), discharge offsetting 24.5p
  // Winter cycle: charge from off-peak grid (7p), discharge offsetting 24.5p
  // We blend this: Average margin per kWh = (24.5p) - (Avg charge cost ~ 9.5p) * efficiency
  
  const avgMarginPerKwh = (gridRate * roundTripEfficiency) - ((exportRate + offPeakRate) / 2);
  
  const usableKwhPerCycle = batterySize * 0.95; // 95% DoD
  const savingsPerCycle = usableKwhPerCycle * avgMarginPerKwh;
  const annualSavings = savingsPerCycle * cyclesPerYear;
  
  const paybackYears = batteryCost / annualSavings;

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

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-6 border border-brand-accent">
            <Battery className="h-8 w-8 text-brand-navy" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-4">
            Battery ROI Calculator
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            Find out exactly how long it takes for a home battery to pay for itself through stored solar energy and off-peak grid charging.
          </p>
        </div>

        <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Battery Size (kWh)
              </label>
              <input
                type="range"
                min="2.5"
                max="15.0"
                step="0.1"
                value={batterySize}
                onChange={(e) => setBatterySize(Number(e.target.value))}
                className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>2.5</span>
                <span className="text-brand-navy text-lg">{batterySize.toFixed(1)} kWh</span>
                <span>15.0</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Installation Cost (£)
              </label>
              <input
                type="range"
                min="1500"
                max="8000"
                step="100"
                value={batteryCost}
                onChange={(e) => setBatteryCost(Number(e.target.value))}
                className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>£1,500</span>
                <span className="text-brand-navy text-lg">£{batteryCost.toLocaleString()}</span>
                <span>£8,000</span>
              </div>
            </div>

            <div className="md:col-span-2 pt-6 border-t border-brand-accent">
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Estimated Cycles per Year
              </label>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={cyclesPerYear}
                onChange={(e) => setCyclesPerYear(Number(e.target.value))}
                className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-green"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>100 (Low usage)</span>
                <span className="text-brand-green text-lg">{cyclesPerYear} cycles</span>
                <span>500 (Heavy usage)</span>
              </div>
              <p className="text-xs text-brand-muted mt-4">
                * A typical UK home cycles their battery around 250-300 times a year (charging from solar in summer, off-peak grid in winter).
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-brand-navy text-white p-8 rounded-[2rem] shadow-lg flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-8 w-8 text-brand-yellow" />
              <h2 className="text-2xl font-serif font-bold">Payback Period</h2>
            </div>
            <div className="text-5xl font-bold font-serif text-brand-yellow mb-2">
              {paybackYears.toFixed(1)} <span className="text-2xl">Years</span>
            </div>
            <p className="text-white/80">
              Assuming {(roundTripEfficiency * 100).toFixed(0)}% round-trip efficiency and {cyclesPerYear} full cycles per year.
            </p>
          </div>

          <div className="bg-white border border-brand-accent p-8 rounded-[2rem] flex flex-col justify-center">
            <h2 className="text-xl font-bold text-brand-navy mb-2">Annual Savings</h2>
            <div className="text-4xl font-bold font-serif text-brand-green flex items-center mb-4">
              <PoundSterling className="h-8 w-8 stroke-[3]" />
              {annualSavings.toFixed(2)}
            </div>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li className="flex justify-between">
                <span>Usable capacity (95% DoD):</span>
                <span className="font-bold">{usableKwhPerCycle.toFixed(1)} kWh</span>
              </li>
              <li className="flex justify-between">
                <span>Est. savings per cycle:</span>
                <span className="font-bold">£{savingsPerCycle.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryROICalculator;