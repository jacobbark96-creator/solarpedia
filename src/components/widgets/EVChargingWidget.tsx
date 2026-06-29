import React, { useState } from 'react';
import { PoundSterling, BatteryCharging } from 'lucide-react';

const EVChargingWidget: React.FC = () => {
  const [annualMileage, setAnnualMileage] = useState<number>(10000);
  const [efficiency, setEfficiency] = useState<number>(3.5);
  const [solarChargePercent, setSolarChargePercent] = useState<number>(30);
  
  const gridRate = 0.245; 
  const evTariffOffPeak = 0.07; 
  const solarOpportunityCost = 0.12; 

  const totalKwhNeeded = annualMileage / efficiency;
  const standardGridCost = totalKwhNeeded * gridRate;
  const evTariffCost = totalKwhNeeded * evTariffOffPeak;
  const solarKwh = totalKwhNeeded * (solarChargePercent / 100);
  const gridKwh = totalKwhNeeded - solarKwh;
  const solarCost = solarKwh * solarOpportunityCost; 
  const gridMixCost = gridKwh * evTariffOffPeak;
  const solarMixTotalCost = solarCost + gridMixCost;

  return (
    <div className="my-8">
      <div className="bg-white border border-brand-accent rounded-[2.5rem] p-6 md:p-10 shadow-sm mb-6">
        <h3 className="text-2xl font-serif font-bold text-brand-navy mb-6 text-center">Interactive EV Charging Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
              Annual Mileage
            </label>
            <input
              type="range"
              min="2000"
              max="30000"
              step="1000"
              value={annualMileage}
              onChange={(e) => setAnnualMileage(Number(e.target.value))}
              className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
            />
            <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
              <span>2k</span>
              <span className="text-brand-navy text-lg">{annualMileage.toLocaleString()} miles</span>
              <span>30k</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
              EV Efficiency (mi/kWh)
            </label>
            <input
              type="range"
              min="2.0"
              max="5.0"
              step="0.1"
              value={efficiency}
              onChange={(e) => setEfficiency(Number(e.target.value))}
              className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
            />
            <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
              <span>2.0</span>
              <span className="text-brand-navy text-lg">{efficiency.toFixed(1)}</span>
              <span>5.0</span>
            </div>
          </div>

          <div className="md:col-span-2 pt-4 border-t border-brand-accent">
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
              % Charged directly from Solar
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={solarChargePercent}
              onChange={(e) => setSolarChargePercent(Number(e.target.value))}
              className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-green"
            />
            <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
              <span>0% (Grid only)</span>
              <span className="text-brand-green text-lg">{solarChargePercent}% Solar</span>
              <span>100% (Pure Solar)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border bg-white border-brand-accent">
          <div>
            <h4 className="font-bold text-brand-navy">Standard Variable Tariff</h4>
            <p className="text-sm text-brand-muted">Charging at ~24.5p / kWh</p>
          </div>
          <div className="mt-2 sm:mt-0 sm:text-right">
            <div className="text-2xl font-bold font-serif text-brand-navy flex items-center sm:justify-end">
              <PoundSterling className="h-5 w-5 stroke-[3]" />
              {standardGridCost.toFixed(2)}
            </div>
            <p className="text-[10px] uppercase tracking-wider font-bold mt-1 text-brand-muted">Per Year</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border bg-white border-brand-accent">
          <div>
            <h4 className="font-bold text-brand-navy">EV Smart Tariff (Grid Only)</h4>
            <p className="text-sm text-brand-muted">Charging overnight at ~7p / kWh</p>
          </div>
          <div className="mt-2 sm:mt-0 sm:text-right">
            <div className="text-2xl font-bold font-serif text-brand-navy flex items-center sm:justify-end">
              <PoundSterling className="h-5 w-5 stroke-[3]" />
              {evTariffCost.toFixed(2)}
            </div>
            <p className="text-[10px] uppercase tracking-wider font-bold mt-1 text-brand-muted">Per Year</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border bg-brand-navy text-white border-brand-navy shadow-lg">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h4 className="font-bold text-white">Solar + EV Tariff Mix</h4>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold bg-brand-green text-brand-navy">
                Best Value
              </span>
            </div>
            <p className="text-sm text-white/80">
              {solarChargePercent}% Solar, {100 - solarChargePercent}% Grid
            </p>
          </div>
          <div className="mt-2 sm:mt-0 sm:text-right">
            <div className="text-3xl font-bold font-serif text-brand-green flex items-center sm:justify-end">
              <PoundSterling className="h-6 w-6 stroke-[3]" />
              {solarMixTotalCost.toFixed(2)}
            </div>
            <p className="text-[10px] uppercase tracking-wider font-bold mt-1 text-white/60">Per Year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingWidget;
