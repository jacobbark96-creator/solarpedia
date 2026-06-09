import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, PoundSterling, ShieldCheck, Info } from 'lucide-react';
import { UK_REGIONS_DATA, DATA_SOURCES } from '../data/mockData';

const REGIONS = [
  { id: 'SCO', name: 'Scotland', path: 'M 145 20 L 165 25 L 180 50 L 195 80 L 185 110 L 160 130 L 130 115 L 110 80 L 120 40 Z' },
  { id: 'NE', name: 'North East', path: 'M 185 110 L 205 120 L 210 150 L 195 170 L 175 155 L 160 130 Z' },
  { id: 'NW', name: 'North West', path: 'M 160 130 L 175 155 L 165 190 L 140 200 L 130 170 L 130 145 Z' },
  { id: 'YOR', name: 'Yorkshire', path: 'M 195 170 L 215 180 L 210 210 L 185 220 L 165 190 L 175 155 Z' },
  { id: 'WAL', name: 'Wales', path: 'M 130 200 L 145 220 L 140 260 L 115 270 L 105 240 L 115 210 Z' },
  { id: 'WM', name: 'West Midlands', path: 'M 165 190 L 185 220 L 175 250 L 145 250 L 145 220 L 140 200 Z' },
  { id: 'EM', name: 'East Midlands', path: 'M 185 220 L 210 210 L 220 240 L 200 260 L 175 250 Z' },
  { id: 'EE', name: 'East of England', path: 'M 210 210 L 240 220 L 250 260 L 230 280 L 210 270 L 220 240 Z' },
  { id: 'SW', name: 'South West', path: 'M 115 270 L 140 260 L 155 300 L 140 330 L 80 340 L 90 300 Z' },
  { id: 'SE', name: 'South East', path: 'M 175 250 L 200 260 L 210 270 L 230 280 L 220 310 L 180 320 L 155 300 L 165 270 Z' },
  { id: 'LON', name: 'London', path: 'M 200 270 L 215 275 L 210 290 L 195 285 Z' },
  { id: 'NI', name: 'Northern Ireland', path: 'M 50 120 L 80 125 L 90 150 L 70 170 L 40 160 Z' },
];

const UKMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState(UK_REGIONS_DATA['SW']);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Map Side */}
      <div className="lg:col-span-7 bg-white rounded-[3rem] p-8 border border-brand-accent shadow-sm overflow-hidden relative min-h-[600px] flex items-center justify-center">
        <svg 
          viewBox="0 0 300 400" 
          className="w-full h-full max-h-[500px] drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))' }}
        >
          {REGIONS.map((region) => (
            <motion.path
              key={region.id}
              d={region.path}
              fill={selectedRegion.postcode === region.id ? '#1A2B44' : hoveredRegion === region.id ? '#E5E7EB' : '#F3F4F6'}
              stroke="#D1D5DB"
              strokeWidth="1"
              initial={false}
              animate={{
                fill: selectedRegion.postcode === region.id ? '#1A2B44' : hoveredRegion === region.id ? '#E5E7EB' : '#F3F4F6',
                scale: hoveredRegion === region.id ? 1.02 : 1,
              }}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(UK_REGIONS_DATA[region.id])}
              className="cursor-pointer transition-colors duration-200"
            />
          ))}
        </svg>

        <div className="absolute bottom-6 left-8 flex items-center gap-2 text-[10px] font-bold text-brand-muted uppercase tracking-widest">
          <Info className="h-3.5 w-3.5" />
          Select a region to explore data
        </div>
      </div>

      {/* Data Side */}
      <div className="lg:col-span-5 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRegion.postcode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-brand-navy rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-2">Regional Benchmark</p>
                  <h3 className="text-4xl font-serif font-bold">{selectedRegion.region}</h3>
                </div>
                <div className="bg-brand-yellow text-brand-navy px-4 py-2 rounded-2xl font-bold text-sm">
                  {selectedRegion.roiPercentage}% ROI
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <Zap className="h-6 w-6 text-brand-yellow mb-4" />
                  <p className="text-[10px] font-bold text-brand-accent uppercase mb-1">Efficiency Score</p>
                  <p className="text-3xl font-serif font-bold">{selectedRegion.efficiencyScore}%</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <TrendingUp className="h-6 w-6 text-brand-green mb-4" />
                  <p className="text-[10px] font-bold text-brand-accent uppercase mb-1">Payback Period</p>
                  <p className="text-3xl font-serif font-bold">{selectedRegion.paybackPeriodYears}y</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <PoundSterling className="h-5 w-5 text-brand-accent" />
                    <span className="text-sm font-medium">Avg. Install Cost</span>
                  </div>
                  <span className="font-bold">£{selectedRegion.avgInstallCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-brand-accent" />
                    <span className="text-sm font-medium">Avg. Annual Savings</span>
                  </div>
                  <span className="font-bold">£{selectedRegion.avgBillSavings.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 text-brand-yellow mb-3">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Impartial Data Check</span>
                </div>
                <p className="text-xs text-brand-accent leading-relaxed">
                  Based on a standard 4.2kWp system using MCS-certified installation benchmarks for {selectedRegion.region}.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Data Sources Attribution */}
        <div className="bg-white rounded-[2rem] p-8 border border-brand-accent">
          <h4 className="text-xs font-bold text-brand-navy uppercase tracking-widest mb-4 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Sources & Transparency
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between text-[11px]">
              <span className="text-brand-muted">Market Pricing</span>
              <span className="text-brand-navy font-bold">{DATA_SOURCES.pricing}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-brand-muted">Solar Irradiance</span>
              <span className="text-brand-navy font-bold">{DATA_SOURCES.irradiance}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-brand-muted">Calculations</span>
              <span className="text-brand-navy font-bold">{DATA_SOURCES.savings}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Database } from 'lucide-react';

export default UKMap;
