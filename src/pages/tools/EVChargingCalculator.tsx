import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, ChevronLeft, PoundSterling, BatteryCharging } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';

const EVChargingCalculator: React.FC = () => {
  const [annualMileage, setAnnualMileage] = useState<number>(10000);
  const [efficiency, setEfficiency] = useState<number>(3.5); // miles per kWh
  const [solarChargePercent, setSolarChargePercent] = useState<number>(30); // % charged directly from solar
  
  // Standard rates
  const gridRate = 0.245; // standard SVT grid rate
  const evTariffOffPeak = 0.07; // e.g. Octopus Intelligent Go
  const solarOpportunityCost = 0.12; // What you'd get if you exported instead (SEG)

  const totalKwhNeeded = annualMileage / efficiency;
  
  // Scenario 1: Standard Grid (SVT)
  const standardGridCost = totalKwhNeeded * gridRate;

  // Scenario 2: EV Off-Peak Tariff (Grid only)
  const evTariffCost = totalKwhNeeded * evTariffOffPeak;

  // Scenario 3: Solar + Off-Peak Mix
  const solarKwh = totalKwhNeeded * (solarChargePercent / 100);
  const gridKwh = totalKwhNeeded - solarKwh;
  const solarCost = solarKwh * solarOpportunityCost; // You lose the export income
  const gridMixCost = gridKwh * evTariffOffPeak;
  const solarMixTotalCost = solarCost + gridMixCost;

  usePageMetadata({
    title: 'EV Charging Solar Calculator UK',
    description: 'Calculate how much you can save by charging your electric vehicle from solar panels versus the grid on standard and EV tariffs.',
    path: '/tools/ev-charging',
    keywords: 'ev solar calculator, electric car solar charging cost, EV tariff compare, charge EV with solar',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'EV Charging Calculator', path: '/tools/ev-charging' },
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
            <Car className="h-8 w-8 text-brand-navy" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-4">
            EV Charging Calculator
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            Compare the annual cost of charging your EV on a standard tariff, a dedicated EV tariff, and using a mix of home solar.
          </p>
        </div>

        <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
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
                aria-label="Annual mileage"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>2k</span>
                <span className="text-brand-navy text-lg">{annualMileage.toLocaleString()} miles</span>
                <span>30k</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                EV Efficiency (miles/kWh)
              </label>
              <input
                type="range"
                min="2.0"
                max="5.0"
                step="0.1"
                value={efficiency}
                onChange={(e) => setEfficiency(Number(e.target.value))}
                className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
                aria-label="EV Efficiency"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>2.0</span>
                <span className="text-brand-navy text-lg">{efficiency.toFixed(1)} mi/kWh</span>
                <span>5.0</span>
              </div>
            </div>

            <div className="md:col-span-2 pt-6 border-t border-brand-accent">
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
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
                aria-label="Solar charging percentage"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>0% (Grid only)</span>
                <span className="text-brand-green text-lg">{solarChargePercent}% Solar</span>
                <span>100% (Pure Solar)</span>
              </div>
              <p className="text-xs text-brand-muted mt-4">
                * Note: Even "free" solar has an opportunity cost of ~12p/kWh because you could have exported it instead.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-brand-navy flex items-center gap-2">
            <BatteryCharging className="h-6 w-6 text-brand-green" />
            Annual Charging Cost Comparison
          </h2>
          
          <div className="grid gap-4">
            {/* Standard Grid */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border bg-white border-brand-accent">
              <div>
                <h3 className="font-bold text-lg text-brand-navy">Standard Variable Tariff</h3>
                <p className="text-sm text-brand-muted">Charging at ~24.5p / kWh all day</p>
              </div>
              <div className="mt-4 sm:mt-0 sm:text-right">
                <div className="text-3xl font-bold font-serif text-brand-navy flex items-center sm:justify-end">
                  <PoundSterling className="h-6 w-6 stroke-[3]" />
                  {standardGridCost.toFixed(2)}
                </div>
                <p className="text-xs uppercase tracking-wider font-bold mt-1 text-brand-muted">Per Year</p>
              </div>
            </div>

            {/* EV Tariff Only */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border bg-white border-brand-accent">
              <div>
                <h3 className="font-bold text-lg text-brand-navy">EV Smart Tariff (Grid Only)</h3>
                <p className="text-sm text-brand-muted">Charging overnight at ~7p / kWh</p>
              </div>
              <div className="mt-4 sm:mt-0 sm:text-right">
                <div className="text-3xl font-bold font-serif text-brand-navy flex items-center sm:justify-end">
                  <PoundSterling className="h-6 w-6 stroke-[3]" />
                  {evTariffCost.toFixed(2)}
                </div>
                <p className="text-xs uppercase tracking-wider font-bold mt-1 text-brand-muted">Per Year</p>
              </div>
            </div>

            {/* Solar + EV Tariff */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border bg-brand-navy text-white border-brand-navy shadow-lg transform sm:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-white">Solar + EV Tariff Mix</h3>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold bg-brand-green text-brand-navy">
                    Best Value
                  </span>
                </div>
                <p className="text-sm text-white/80">
                  {solarChargePercent}% from Solar (opportunity cost 12p), {100 - solarChargePercent}% from overnight grid (7p)
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:text-right">
                <div className="text-4xl font-bold font-serif text-brand-green flex items-center sm:justify-end">
                  <PoundSterling className="h-8 w-8 stroke-[3]" />
                  {solarMixTotalCost.toFixed(2)}
                </div>
                <p className="text-xs uppercase tracking-wider font-bold mt-1 text-white/60">Per Year</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-brand-white border border-brand-accent rounded-[2rem] p-8 text-center">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Thinking about an EV Charger?</h3>
          <p className="text-brand-muted mb-6">Install a solar-compatible EV charger alongside your panels to automate smart charging.</p>
          <Link 
            to="/solar-panel-quotes"
            className="inline-block bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
          >
            Get Solar & EV Quotes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EVChargingCalculator;
