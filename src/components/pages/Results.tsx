import React from 'react';
import { motion } from 'framer-motion';
import { useWizardStore } from '../../hooks/useWizardStore';
import { NATIONAL_AVERAGES, UK_REGIONS_DATA } from '../../data/mockData';
import { 
  TrendingUp, 
  Zap, 
  Clock, 
  Leaf, 
  Download, 
  Share2,
  Info,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

import { buildAbsoluteUrl, createBreadcrumbSchema } from '../../lib/seo';

const Results: React.FC = () => {
  const { data } = useWizardStore();

  // Advanced calculation logic based on energy usage and property constraints
  const annualConsumptionKwh = (data.energyBill * 12) / NATIONAL_AVERAGES.energyPrice;
  
  // Get regional data or fallback to national average
  const regionCode = data.postcode?.toUpperCase().slice(0, 3) || 'SW';
  const regionData = UK_REGIONS_DATA[regionCode] || UK_REGIONS_DATA['SW'];
  const regionalYield = regionData.avgSunlightHours / 1000; // Efficiency factor
  const roofDirectionFactor =
    {
      south: 1,
      east: 0.9,
      west: 0.88,
      north: 0.72,
    }[data.roofDirection] || 1;

  // Estimate required system size (kWp) to cover usage
  // UK average solar production is approx 850-1000 kWh per 1 kWp installed
  const targetSystemSize = annualConsumptionKwh / (900 * regionalYield * roofDirectionFactor);
  
  // Cap system size by roof area (Assuming 1kWp requires ~4.5sqm of roof space)
  const maxPossibleSize = data.roofSize / 4.5;
  const systemSize = Math.min(targetSystemSize, maxPossibleSize);

  // Dynamic cost per kWp (Smaller systems are more expensive per unit)
  let costPerKwp = data.propertyType === 'residential' ? 1800 : 1300;
  if (systemSize > 4) costPerKwp -= 200;
  if (systemSize > 8) costPerKwp -= 100;
  if (systemSize > 20) costPerKwp -= 200;

  const estimatedCost = systemSize * costPerKwp + (data.hasBattery ? 5000 : 0);
  
  // Savings calculation
  const annualGenerationKwh = systemSize * 900 * regionalYield * roofDirectionFactor;
  const baseSelfConsumptionRate =
    data.propertyType === 'commercial'
      ? { day: 0.82, balanced: 0.72, evening: 0.55 }[data.usagePattern]
      : { day: 0.55, balanced: 0.42, evening: 0.3 }[data.usagePattern];
  const selfConsumptionRate = Math.min(
    data.hasBattery
      ? baseSelfConsumptionRate + (data.propertyType === 'commercial' ? 0.12 : 0.2)
      : baseSelfConsumptionRate,
    0.92
  );
  const exportRate = data.propertyType === 'commercial' ? 0.12 : 0.15;
  const annualSavings = (annualGenerationKwh * selfConsumptionRate * NATIONAL_AVERAGES.energyPrice) + 
                        (annualGenerationKwh * (1 - selfConsumptionRate) * exportRate);

  const paybackPeriod = estimatedCost / annualSavings;
  const tenYearSavings = (annualSavings * 10) - estimatedCost;
  const co2Reduction = annualGenerationKwh * 0.0002; // Tonnes per year (approx 200g per kWh in UK)
  const estimateConfidence =
    data.roofSizeSource === 'estimated' ? data.roofSizeConfidence || 'medium' : data.roofSizeSource === 'manual' ? 'medium' : 'low';
  const confidenceClass =
    estimateConfidence === 'high'
      ? 'bg-brand-green/10 text-brand-green'
      : estimateConfidence === 'medium'
        ? 'bg-brand-yellow/15 text-brand-navy'
        : 'bg-brand-accent text-brand-muted';

  const chartData = Array.from({ length: 11 }, (_, i) => ({
    year: i,
    savings: Math.round(i === 0 ? -estimatedCost : annualSavings * i - estimatedCost),
  }));

  const monthlyProduction = [
    { name: 'Jan', prod: Math.round(annualGenerationKwh * 0.03) },
    { name: 'Feb', prod: Math.round(annualGenerationKwh * 0.05) },
    { name: 'Mar', prod: Math.round(annualGenerationKwh * 0.08) },
    { name: 'Apr', prod: Math.round(annualGenerationKwh * 0.11) },
    { name: 'May', prod: Math.round(annualGenerationKwh * 0.14) },
    { name: 'Jun', prod: Math.round(annualGenerationKwh * 0.15) },
    { name: 'Jul', prod: Math.round(annualGenerationKwh * 0.14) },
    { name: 'Aug', prod: Math.round(annualGenerationKwh * 0.12) },
    { name: 'Sep', prod: Math.round(annualGenerationKwh * 0.09) },
    { name: 'Oct', prod: Math.round(annualGenerationKwh * 0.06) },
    { name: 'Nov', prod: Math.round(annualGenerationKwh * 0.03) },
    { name: 'Dec', prod: Math.round(annualGenerationKwh * 0.01) },
  ];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="bg-brand-white min-h-screen pt-10 pb-20 print:bg-white print:pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 print:mb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-green font-bold text-xs mb-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Impartial Estimate Generated</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-brand-navy">Your Solar Forecast</h1>
            <p className="text-sm text-brand-muted">
              Estimated <span className="text-brand-navy font-bold">{systemSize.toFixed(1)}kWp system</span> for {data.matchedAddress || `postcode ${data.postcode || 'SW'}`} based on £{data.energyBill}/mo usage and {Math.round(data.roofSize)} sqm roof area.
            </p>
            <p className="text-[11px] text-brand-muted mt-1">
              Roof area source: {data.roofSizeSource === 'estimated' ? `${data.roofEstimateMethod || 'Property data lookup'} (${data.roofSizeConfidence || 'medium'} confidence)` : data.roofSizeSource === 'manual' ? 'Manual override by user' : 'Default estimate'}.
            </p>
            <div className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${confidenceClass}`}>
              {estimateConfidence} Confidence Estimate
            </div>
          </div>
          <div className="flex gap-3 print:hidden">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-brand-accent hover:border-brand-navy transition-all text-sm font-semibold"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-brand-accent hover:border-brand-navy transition-all text-sm font-semibold">
              <Share2 className="h-3.5 w-3.5" />
              Share link
            </button>
          </div>
        </div>

        {/* Core Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Est. Install Cost', value: `£${Math.round(estimatedCost).toLocaleString()}`, icon: Zap, color: 'text-brand-yellow' },
            { label: 'Annual Savings', value: `£${Math.round(annualSavings).toLocaleString()}`, icon: TrendingUp, color: 'text-brand-green' },
            { label: 'Payback Period', value: `${paybackPeriod.toFixed(1)} Years`, icon: Clock, color: 'text-brand-navy' },
            { label: 'CO2 Reduction', value: `${co2Reduction.toFixed(1)} Tonnes`, icon: Leaf, color: 'text-brand-green' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl border border-brand-accent shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${confidenceClass}`}>
                  {estimateConfidence}
                </span>
              </div>
              <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-0.5">{stat.label}</p>
              <p className="text-xl font-serif font-bold text-brand-navy">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* ROI Projection */}
          <div className="bg-white p-6 rounded-2xl border border-brand-accent shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-navy">10-Year ROI Projection</h3>
                <p className="text-xs text-brand-muted">Estimated cumulative net position</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-serif font-bold text-brand-green">
                  +£{Math.round(tenYearSavings).toLocaleString()}
                </p>
                <p className="text-[9px] font-bold text-brand-muted uppercase">10yr Profit</p>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                    tickFormatter={(val) => `£${val / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    formatter={(val: number) => [`£${val.toLocaleString()}`, 'Net Position']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#0A1B3D" 
                    strokeWidth={2} 
                    dot={{ r: 3, fill: '#0A1B3D', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Seasonal Production */}
          <div className="bg-white p-6 rounded-2xl border border-brand-accent shadow-sm">
            <h3 className="text-lg font-serif font-bold text-brand-navy mb-1.5">Seasonal Production</h3>
            <p className="text-xs text-brand-muted mb-6">Estimated monthly energy generation (kWh)</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProduction}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 9, fill: '#6B7280' }}
                  />
                  <YAxis axisLine={false} tickLine={false} hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
                  />
                  <Bar dataKey="prod" radius={[3, 3, 0, 0]}>
                    {monthlyProduction.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.prod > 600 ? '#FFD700' : '#0A1B3D'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-brand-accent shadow-sm">
              <h3 className="text-lg font-serif font-bold text-brand-navy mb-4">What affects this estimate?</h3>
              <div className="space-y-3">
                {[
                  { title: 'Roof Direction', desc: `Your ${data.roofDirection}-facing roof applies a ${Math.round(roofDirectionFactor * 100)}% generation factor in the forecast.`, impact: 'High' },
                  { title: 'Roof Area', desc: `We used ${Math.round(data.roofSize)} sqm of usable roof area based on a ${data.roofSizeSource === 'estimated' ? 'property footprint estimate' : data.roofSizeSource === 'manual' ? 'manual input' : 'default assumption'}.`, impact: 'High' },
                  { title: 'Usage Pattern', desc: `Your ${data.usagePattern} usage pattern sets self-consumption at ${Math.round(selfConsumptionRate * 100)}%, which directly changes annual savings.`, impact: 'High' },
                  { title: 'Electricity Tariffs', desc: `Current UK average of ${(NATIONAL_AVERAGES.energyPrice * 100).toFixed(1)}p/kWh used, with export income modelled at ${(exportRate * 100).toFixed(0)}p/kWh.`, impact: 'Medium' },
                  { title: 'Shading & Obstructions', desc: 'We assume a clear roof. Shading from trees or chimneys can reduce yield by 10-25%.', impact: 'Medium' },
                ].map((item) => (
                  <div key={item.title} className="flex justify-between items-start p-3 bg-brand-white rounded-xl border border-brand-accent">
                    <div>
                      <h4 className="font-bold text-sm text-brand-navy mb-0.5">{item.title}</h4>
                      <p className="text-xs text-brand-muted">{item.desc}</p>
                    </div>
                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${item.impact === 'High' ? 'bg-brand-navy text-white' : 'bg-brand-accent text-brand-muted'}`}>
                      {item.impact} Impact
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-brand-navy text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-serif font-bold mb-3">Next Steps</h3>
                <p className="text-brand-accent text-xs mb-6 leading-relaxed opacity-90">
                  Your estimate shows high suitability. We recommend exploring vetted installers to get a technical survey.
                </p>
                <button className="w-full bg-brand-yellow text-brand-navy py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                  Find Vetted Installers
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <SunIcon className="absolute -bottom-6 -right-6 h-24 w-24 text-white/5" />
            </div>
            
            <div className="p-4 border border-brand-accent rounded-2xl flex items-center gap-3 bg-white">
              <div className="h-10 w-10 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-brand-green" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-brand-muted uppercase">Impartiality Note</p>
                <p className="text-xs text-brand-navy">This report is for advice only. We do not sell panels.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
);

export default Results;
