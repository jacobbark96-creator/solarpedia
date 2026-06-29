import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronLeft, Sun, Home } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';

const SystemSizeEstimator: React.FC = () => {
  const [annualUsageKwh, setAnnualUsageKwh] = useState<number>(3500);
  const [targetOffset, setTargetOffset] = useState<number>(100);

  // Assumptions
  const ukGenerationFactor = 900; // 1 kWp generates ~900 kWh/year in the UK
  const panelWattage = 430; // standard modern panel wattage
  const panelSqm = 2.0; // roughly 2 square meters per panel

  const targetGeneration = annualUsageKwh * (targetOffset / 100);
  const requiredKwp = targetGeneration / ukGenerationFactor;
  const numPanels = Math.ceil((requiredKwp * 1000) / panelWattage);
  const actualKwp = (numPanels * panelWattage) / 1000;
  const roofSpaceNeeded = numPanels * panelSqm;

  usePageMetadata({
    title: 'Solar Panel System Size Calculator UK',
    description: 'Calculate exactly how many solar panels you need for your UK home based on your annual electricity usage and target offset.',
    path: '/tools/system-size',
    keywords: 'solar panel size calculator, how many solar panels do i need, kWp calculator, solar roof space calculator',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'System Size Estimator', path: '/tools/system-size' },
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
            <TrendingUp className="h-8 w-8 text-brand-navy" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-4">
            System Size Estimator
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            Work backwards from your energy bill. Find out exactly how many kWp and how many panels you need to hit your energy goals.
          </p>
        </div>

        <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Annual Electricity Usage (kWh)
              </label>
              <input
                type="range"
                min="1500"
                max="10000"
                step="100"
                value={annualUsageKwh}
                onChange={(e) => setAnnualUsageKwh(Number(e.target.value))}
                className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>1.5k</span>
                <span className="text-brand-navy text-lg">{annualUsageKwh.toLocaleString()} kWh</span>
                <span>10k</span>
              </div>
              <p className="text-xs text-brand-muted mt-4">
                * An average 3-bedroom UK home uses around 2,700 - 3,500 kWh per year (without an EV or heat pump).
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Target Energy Offset (%)
              </label>
              <input
                type="range"
                min="50"
                max="150"
                step="10"
                value={targetOffset}
                onChange={(e) => setTargetOffset(Number(e.target.value))}
                className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-green"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>50%</span>
                <span className="text-brand-green text-lg">{targetOffset}%</span>
                <span>150%</span>
              </div>
              <p className="text-xs text-brand-muted mt-4">
                * 100% means you want to generate as much as you use. &gt;100% is good if you plan to add an EV or heat pump soon.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-navy text-white p-8 rounded-[2rem] shadow-lg flex flex-col justify-center col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-2">Recommended System Size</h2>
            <div className="text-5xl font-bold font-serif text-brand-yellow mb-4">
              {actualKwp.toFixed(1)} <span className="text-2xl">kWp</span>
            </div>
            <p className="text-white/80">
              Based on {numPanels} x {panelWattage}W modern solar panels. This system should generate ~{Math.round(actualKwp * ukGenerationFactor).toLocaleString()} kWh per year in average UK conditions.
            </p>
          </div>

          <div className="bg-white border border-brand-accent p-8 rounded-[2rem] flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center gap-2 text-brand-navy mb-1">
                <Sun className="h-5 w-5" />
                <h3 className="font-bold">Panel Count</h3>
              </div>
              <p className="text-3xl font-serif font-bold text-brand-green">{numPanels}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-brand-navy mb-1">
                <Home className="h-5 w-5" />
                <h3 className="font-bold">Roof Space Needed</h3>
              </div>
              <p className="text-3xl font-serif font-bold text-brand-green">{roofSpaceNeeded} m²</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSizeEstimator;
