import React, { useState } from 'react';
import { PoundSterling, Clock } from 'lucide-react';

const BatteryROIWidget: React.FC = () => {
  const [batterySize, setBatterySize] = useState<number>(5.2);
  const [batteryCost, setBatteryCost] = useState<number>(3500);
  const [cyclesPerYear, setCyclesPerYear] = useState<number>(300);

  const gridRate = 0.245; 
  const offPeakRate = 0.07; 
  const exportRate = 0.12; 
  const roundTripEfficiency = 0.90; 

  const avgMarginPerKwh = (gridRate * roundTripEfficiency) - ((exportRate + offPeakRate) / 2);
  const usableKwhPerCycle = batterySize * 0.95; 
  const savingsPerCycle = usableKwhPerCycle * avgMarginPerKwh;
  const annualSavings = savingsPerCycle * cyclesPerYear;
  const paybackYears = batteryCost / annualSavings;

  return (
    <div className="my-8">
      <div className="bg-white border border-brand-accent rounded-[2.5rem] p-6 md:p-10 shadow-sm mb-6">
        <h3 className="text-2xl font-serif font-bold text-brand-navy mb-6 text-center">Interactive Battery ROI Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
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
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
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

          <div className="md:col-span-2 pt-4 border-t border-brand-accent">
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-navy text-white p-6 rounded-[2rem] shadow-lg flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-6 w-6 text-brand-yellow" />
            <h4 className="text-xl font-serif font-bold">Payback Period</h4>
          </div>
          <div className="text-4xl font-bold font-serif text-brand-yellow mb-2">
            {paybackYears.toFixed(1)} <span className="text-xl">Years</span>
          </div>
        </div>

        <div className="bg-white border border-brand-accent p-6 rounded-[2rem] flex flex-col justify-center">
          <h4 className="text-lg font-bold text-brand-navy mb-1">Annual Savings</h4>
          <div className="text-3xl font-bold font-serif text-brand-green flex items-center mb-2">
            <PoundSterling className="h-6 w-6 stroke-[3]" />
            {annualSavings.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryROIWidget;
