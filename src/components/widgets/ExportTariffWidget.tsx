import React, { useState } from 'react';
import { PoundSterling, TrendingUp } from 'lucide-react';

const TARIFFS = [
  { name: 'Octopus Flux', provider: 'Octopus Energy', type: 'Dynamic / ToU', avgRate: 0.22, peakRate: 0.30, offPeakRate: 0.15, requiresBattery: true },
  { name: 'Outgoing Octopus (Fixed)', provider: 'Octopus Energy', type: 'Fixed', avgRate: 0.15, peakRate: 0.15, offPeakRate: 0.15, requiresBattery: false },
  { name: 'E.ON Next Export', provider: 'E.ON Next', type: 'Fixed', avgRate: 0.165, peakRate: 0.165, offPeakRate: 0.165, requiresBattery: false },
  { name: 'OVO SEG', provider: 'OVO Energy', type: 'Fixed', avgRate: 0.15, peakRate: 0.15, offPeakRate: 0.15, requiresBattery: false },
  { name: 'ScottishPower SEG', provider: 'ScottishPower', type: 'Fixed', avgRate: 0.12, peakRate: 0.12, offPeakRate: 0.12, requiresBattery: false },
  { name: 'Standard SEG (Lowest)', provider: 'Various', type: 'Fixed', avgRate: 0.04, peakRate: 0.04, offPeakRate: 0.04, requiresBattery: false },
];

const ExportTariffWidget: React.FC = () => {
  const [exportVolume, setExportVolume] = useState<number>(2000);
  const [hasBattery, setHasBattery] = useState<boolean>(true);

  const availableTariffs = TARIFFS.filter(t => hasBattery ? true : !t.requiresBattery)
    .map(t => ({
      ...t,
      annualIncome: exportVolume * t.avgRate,
    }))
    .sort((a, b) => b.annualIncome - a.annualIncome);

  return (
    <div className="my-8">
      <div className="bg-white border border-brand-accent rounded-[2.5rem] p-6 md:p-10 shadow-sm mb-6">
        <h3 className="text-2xl font-serif font-bold text-brand-navy mb-6 text-center">Interactive Export Tariff Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
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
            />
            <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
              <span>500 kWh</span>
              <span className="text-brand-navy text-lg">{exportVolume} kWh</span>
              <span>6000 kWh</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
              Do you have a home battery?
            </label>
            <div className="flex bg-brand-white p-1 rounded-xl">
              <button
                onClick={() => setHasBattery(true)}
                className={`flex-1 py-2 px-2 rounded-lg font-bold text-xs transition-all ${
                  hasBattery ? 'bg-white shadow-sm text-brand-navy' : 'text-brand-muted hover:text-brand-navy'
                }`}
              >
                Yes, I have a battery
              </button>
              <button
                onClick={() => setHasBattery(false)}
                className={`flex-1 py-2 px-2 rounded-lg font-bold text-xs transition-all ${
                  !hasBattery ? 'bg-white shadow-sm text-brand-navy' : 'text-brand-muted hover:text-brand-navy'
                }`}
              >
                No battery
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-serif font-bold text-brand-navy flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-brand-green" />
          Estimated Annual Earnings
        </h4>
        
        <div className="grid gap-3">
          {availableTariffs.slice(0, 4).map((tariff, index) => (
            <div 
              key={tariff.name} 
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border ${
                index === 0 ? 'bg-brand-navy text-white border-brand-navy shadow-lg' : 'bg-white border-brand-accent'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h5 className={`font-bold ${index === 0 ? 'text-white' : 'text-brand-navy'}`}>
                    {tariff.name}
                  </h5>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                    index === 0 ? 'bg-white/20 text-white' : 'bg-brand-white text-brand-muted'
                  }`}>
                    {tariff.type}
                  </span>
                </div>
                <p className={`text-xs ${index === 0 ? 'text-white/80' : 'text-brand-muted'}`}>
                  {tariff.provider} • Avg: {(tariff.avgRate * 100).toFixed(1)}p / kWh
                </p>
              </div>
              <div className="mt-2 sm:mt-0 sm:text-right">
                <div className={`text-2xl font-bold font-serif flex items-center sm:justify-end ${
                  index === 0 ? 'text-brand-yellow' : 'text-brand-green'
                }`}>
                  <PoundSterling className="h-5 w-5 stroke-[3]" />
                  {tariff.annualIncome.toFixed(2)}
                </div>
                <p className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${
                  index === 0 ? 'text-white/60' : 'text-brand-muted'
                }`}>
                  Per Year
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportTariffWidget;
