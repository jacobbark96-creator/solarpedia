import React from 'react';
import { motion } from 'framer-motion';
import { useWizardStore } from '../hooks/useWizardStore';
import { NATIONAL_AVERAGES } from '../data/mockData';
import { 
  TrendingUp, 
  Zap, 
  Clock, 
  Leaf, 
  Download, 
  Share2,
  Info,
  ChevronDown,
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

import { usePageMetadata } from '../hooks/usePageMetadata';

const Results: React.FC = () => {
  usePageMetadata(
    'Your Solar Forecast',
    'View your personalized solar savings estimate, ROI projection, and system recommendations.'
  );
  const { data } = useWizardStore();

  // Simple calculation logic for the mock
  const systemSize = data.propertyType === 'residential' ? 4.2 : 50;
  const estimatedCost = systemSize * (data.propertyType === 'residential' ? 1500 : 1200);
  const annualSavings = (data.energyBill * 12) * 0.7; // Assume 70% savings
  const paybackPeriod = estimatedCost / annualSavings;
  const tenYearSavings = annualSavings * 10 - estimatedCost;
  const co2Reduction = systemSize * 0.3; // Tonnes per year

  const chartData = Array.from({ length: 11 }, (_, i) => ({
    year: i,
    savings: Math.round(i === 0 ? -estimatedCost : annualSavings * i - estimatedCost),
  }));

  const monthlyProduction = [
    { name: 'Jan', prod: 150 },
    { name: 'Feb', prod: 250 },
    { name: 'Mar', prod: 450 },
    { name: 'Apr', prod: 600 },
    { name: 'May', prod: 850 },
    { name: 'Jun', prod: 950 },
    { name: 'Jul', prod: 900 },
    { name: 'Aug', prod: 750 },
    { name: 'Sep', prod: 550 },
    { name: 'Oct', prod: 350 },
    { name: 'Nov', prod: 200 },
    { name: 'Dec', prod: 120 },
  ];

  return (
    <div className="bg-brand-white min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-brand-green font-bold text-xs mb-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Impartial Estimate Generated</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-brand-navy">Your Solar Forecast</h1>
            <p className="text-sm text-brand-muted">Based on postcode {data.postcode || 'SW'} and a £{data.energyBill}/mo energy bill.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-brand-accent hover:border-brand-navy transition-all text-sm font-semibold">
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
              <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
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
                  { title: 'Roof Direction', desc: `Your ${data.roofDirection}-facing roof is ${data.roofDirection === 'south' ? 'ideal' : 'good'} for solar capture.`, impact: 'High' },
                  { title: 'Electricity Tariffs', desc: `Current UK average of ${(NATIONAL_AVERAGES.energyPrice * 100).toFixed(1)}p/kWh used. Smart export tariffs could increase ROI.`, impact: 'Medium' },
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
