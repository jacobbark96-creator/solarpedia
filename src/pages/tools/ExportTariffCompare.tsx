import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronLeft, PoundSterling, TrendingUp } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';

const TARIFFS = [
  { name: 'Octopus Flux', provider: 'Octopus Energy', type: 'Dynamic / ToU', avgRate: 0.22, peakRate: 0.30, offPeakRate: 0.15, requiresBattery: true },
  { name: 'Outgoing Octopus (Fixed)', provider: 'Octopus Energy', type: 'Fixed', avgRate: 0.15, peakRate: 0.15, offPeakRate: 0.15, requiresBattery: false },
  { name: 'E.ON Next Export', provider: 'E.ON Next', type: 'Fixed', avgRate: 0.165, peakRate: 0.165, offPeakRate: 0.165, requiresBattery: false },
  { name: 'OVO SEG', provider: 'OVO Energy', type: 'Fixed', avgRate: 0.15, peakRate: 0.15, offPeakRate: 0.15, requiresBattery: false },
  { name: 'ScottishPower SEG', provider: 'ScottishPower', type: 'Fixed', avgRate: 0.12, peakRate: 0.12, offPeakRate: 0.12, requiresBattery: false },
  { name: 'Standard SEG (Lowest)', provider: 'Various', type: 'Fixed', avgRate: 0.04, peakRate: 0.04, offPeakRate: 0.04, requiresBattery: false },
];

const ExportTariffCompare: React.FC = () => {
  const [exportVolume, setExportVolume] = useState<number>(2000);
  const [hasBattery, setHasBattery] = useState<boolean>(true);

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

  const availableTariffs = TARIFFS.filter(t => hasBattery ? true : !t.requiresBattery)
    .map(t => ({
      ...t,
      annualIncome: exportVolume * t.avgRate,
    }))
    .sort((a, b) => b.annualIncome - a.annualIncome);

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
            <Zap className="h-8 w-8 text-brand-navy" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-4">
            Export Tariff Comparison
          </h1>
          <p className="text-lg text-brand-muted">
            See how much you could earn annually by selling your excess solar power back to the grid.
          </p>
        </div>

        <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Estimated Annual Export (kWh)
              </label>
              <input
                type="range"
                min="500"
                max="6000"
                step="100"
                value={exportVolume}
                onChange={(e) => setExportVolume(Number(e.target.value))}
                className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
                aria-label="Annual export volume"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2">
                <span>500 kWh</span>
                <span className="font-bold text-brand-navy text-lg">{exportVolume} kWh</span>
                <span>6000 kWh</span>
              </div>
              <p className="text-xs text-brand-muted mt-4">
                * An average 4kWp UK system without a battery exports roughly 2,000 kWh per year.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Do you have a home battery?
              </label>
              <div className="flex bg-brand-white p-1 rounded-xl">
                <button
                  onClick={() => setHasBattery(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                    hasBattery ? 'bg-white shadow-sm text-brand-navy' : 'text-brand-muted hover:text-brand-navy'
                  }`}
                >
                  Yes, I have a battery
                </button>
                <button
                  onClick={() => setHasBattery(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                    !hasBattery ? 'bg-white shadow-sm text-brand-navy' : 'text-brand-muted hover:text-brand-navy'
                  }`}
                >
                  No battery
                </button>
              </div>
              <p className="text-xs text-brand-muted mt-4">
                * Dynamic tariffs like Octopus Flux require a battery to shift export into the high-paying 4pm-7pm peak window.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-brand-navy flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-brand-green" />
            Estimated Annual Earnings
          </h2>
          
          <div className="grid gap-4">
            {availableTariffs.map((tariff, index) => (
              <div 
                key={tariff.name} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border ${
                  index === 0 ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white border-brand-accent'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`font-bold text-lg ${index === 0 ? 'text-white' : 'text-brand-navy'}`}>
                      {tariff.name}
                    </h3>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                      index === 0 ? 'bg-white/20 text-white' : 'bg-brand-white text-brand-muted'
                    }`}>
                      {tariff.type}
                    </span>
                  </div>
                  <p className={`text-sm ${index === 0 ? 'text-white/80' : 'text-brand-muted'}`}>
                    {tariff.provider} • Avg: {(tariff.avgRate * 100).toFixed(1)}p / kWh
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right">
                  <div className={`text-3xl font-bold font-serif flex items-center sm:justify-end ${
                    index === 0 ? 'text-brand-yellow' : 'text-brand-green'
                  }`}>
                    <PoundSterling className="h-6 w-6 stroke-[3]" />
                    {tariff.annualIncome.toFixed(2)}
                  </div>
                  <p className={`text-xs uppercase tracking-wider font-bold mt-1 ${
                    index === 0 ? 'text-white/60' : 'text-brand-muted'
                  }`}>
                    Per Year
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-brand-white border border-brand-accent rounded-[2rem] p-8 text-center">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Want to improve your export rates?</h3>
          <p className="text-brand-muted mb-6">To access the best tariffs, you need an MCS-certified installation and a smart meter.</p>
          <Link 
            to="/solar-panel-quotes"
            className="inline-block bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
          >
            Compare MCS Installers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExportTariffCompare;