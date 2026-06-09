import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UK_REGIONS_DATA } from '../data/mockData';
import { Info, TrendingUp, Zap, Clock } from 'lucide-react';

const UKMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regions = [
    { id: 'SW', name: 'South West', path: 'M 100 450 L 150 480 L 120 520 L 50 500 Z' }, // Mock paths for simplicity
    { id: 'SE', name: 'South East', path: 'M 160 450 L 220 440 L 240 480 L 180 500 Z' },
    { id: 'B', name: 'Midlands', path: 'M 130 350 L 180 340 L 200 420 L 140 430 Z' },
    { id: 'M', name: 'North West', path: 'M 110 250 L 150 240 L 160 330 L 120 340 Z' },
    { id: 'EH', name: 'Scotland', path: 'M 100 50 L 180 60 L 170 200 L 90 180 Z' },
    { id: 'CF', name: 'Wales', path: 'M 80 380 L 120 370 L 110 440 L 70 430 Z' },
  ];

  const activeData = selectedRegion ? UK_REGIONS_DATA[selectedRegion] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="relative bg-brand-white rounded-3xl p-8 border border-brand-accent shadow-inner h-[600px] flex items-center justify-center overflow-hidden">
        {/* Simplified SVG Map of UK Regions */}
        <svg viewBox="0 0 300 600" className="h-full w-auto drop-shadow-2xl">
          {regions.map((region) => (
            <motion.path
              key={region.id}
              d={region.path}
              role="button"
              aria-label={`Select ${region.name}`}
              fill={selectedRegion === region.id ? '#0A1B3D' : hoveredRegion === region.id ? '#FFD700' : '#E5E7EB'}
              stroke="#fff"
              strokeWidth="2"
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(region.id)}
              className="cursor-pointer transition-colors duration-200"
            />
          ))}
          
          {/* Legend/Annotation */}
          <text x="10" y="580" className="text-[10px] fill-brand-muted font-bold uppercase tracking-widest">
            Click a region to see local data
          </text>
        </svg>

        {/* Heatmap Toggle (Visual Only) */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {['Install Costs', 'ROI Speed', 'Sunlight'].map((layer) => (
            <button key={layer} className="px-3 py-1.5 rounded-full bg-white border border-brand-accent text-[10px] font-bold uppercase tracking-wider hover:border-brand-navy transition-all">
              {layer}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {selectedRegion ? (
            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-3xl border border-brand-accent shadow-sm"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-brand-navy">{activeData?.region}</h3>
                  <p className="text-sm text-brand-muted font-medium">Regional Solar Benchmark</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold">
                  {activeData?.efficiencyScore}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-brand-white border border-brand-accent rounded-2xl">
                  <Zap className="h-5 w-5 text-brand-yellow mb-2" />
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Avg. Cost</p>
                  <p className="text-xl font-serif font-bold">£{activeData?.avgInstallCost.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-brand-white border border-brand-accent rounded-2xl">
                  <TrendingUp className="h-5 w-5 text-brand-green mb-2" />
                  <p className="text-[10px] font-bold text-brand-muted uppercase">ROI</p>
                  <p className="text-xl font-serif font-bold">{activeData?.roiPercentage}%</p>
                </div>
                <div className="p-4 bg-brand-white border border-brand-accent rounded-2xl">
                  <Clock className="h-5 w-5 text-brand-navy mb-2" />
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Payback</p>
                  <p className="text-xl font-serif font-bold">{activeData?.paybackPeriodYears} Years</p>
                </div>
                <div className="p-4 bg-brand-white border border-brand-accent rounded-2xl">
                  <Info className="h-5 w-5 text-brand-muted mb-2" />
                  <p className="text-[10px] font-bold text-brand-muted uppercase">Suitability</p>
                  <p className="text-xl font-serif font-bold">High</p>
                </div>
              </div>

              <div className="p-4 bg-brand-green/5 border border-brand-green/20 rounded-2xl flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-brand-green" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-navy">Regional Export Opportunity</p>
                  <p className="text-[10px] text-brand-muted">Above average smart export tariffs available in this area.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-brand-accent rounded-3xl"
            >
              <div className="h-16 w-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6">
                <MapPinIcon className="h-8 w-8 text-brand-muted" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-navy mb-2">Select a region to begin</h3>
              <p className="text-brand-muted max-w-xs">
                Hover over the map to explore UK regional data, or click a specific area for detailed solar benchmarks.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default UKMap;
