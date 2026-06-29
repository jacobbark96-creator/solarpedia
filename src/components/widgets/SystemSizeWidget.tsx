import React, { useState } from 'react';
import { Sun, Home } from 'lucide-react';

const SystemSizeWidget: React.FC = () => {
  const [annualUsageKwh, setAnnualUsageKwh] = useState<number>(3500);
  const [targetOffset, setTargetOffset] = useState<number>(100);

  const ukGenerationFactor = 900; 
  const panelWattage = 430; 
  const panelSqm = 2.0; 

  const targetGeneration = annualUsageKwh * (targetOffset / 100);
  const requiredKwp = targetGeneration / ukGenerationFactor;
  const numPanels = Math.ceil((requiredKwp * 1000) / panelWattage);
  const actualKwp = (numPanels * panelWattage) / 1000;
  const roofSpaceNeeded = numPanels * panelSqm;

  return (
    <div className="my-8">
      <div className="bg-white border border-brand-accent rounded-[2.5rem] p-6 md:p-10 shadow-sm mb-6">
        <h3 className="text-2xl font-serif font-bold text-brand-navy mb-6 text-center">Interactive System Size Estimator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
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
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-navy text-white p-6 rounded-[2rem] shadow-lg flex flex-col justify-center col-span-1 md:col-span-2">
          <h4 className="text-lg font-bold mb-1">Recommended System Size</h4>
          <div className="text-4xl font-bold font-serif text-brand-yellow mb-2">
            {actualKwp.toFixed(1)} <span className="text-xl">kWp</span>
          </div>
          <p className="text-white/80 text-sm">
            Based on {numPanels} panels. Should generate ~{Math.round(actualKwp * ukGenerationFactor).toLocaleString()} kWh/yr.
          </p>
        </div>

        <div className="bg-white border border-brand-accent p-6 rounded-[2rem] flex flex-col justify-center space-y-4">
          <div>
            <div className="flex items-center gap-2 text-brand-navy mb-1">
              <Sun className="h-4 w-4" />
              <h4 className="font-bold text-sm">Panel Count</h4>
            </div>
            <p className="text-2xl font-serif font-bold text-brand-green">{numPanels}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-brand-navy mb-1">
              <Home className="h-4 w-4" />
              <h4 className="font-bold text-sm">Roof Space</h4>
            </div>
            <p className="text-2xl font-serif font-bold text-brand-green">{roofSpaceNeeded} m²</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSizeWidget;
