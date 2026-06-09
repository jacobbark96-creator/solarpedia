import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, PoundSterling, ShieldCheck, Info, Database } from 'lucide-react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { UK_REGIONS_DATA, DATA_SOURCES } from '../data/mockData';

const NAME_TO_ID: Record<string, string> = {
  'Scotland': 'SCO',
  'North East': 'NE',
  'North West': 'NW',
  'Yorkshire and The Humber': 'YOR',
  'Wales': 'WAL',
  'West Midlands': 'WM',
  'East Midlands': 'EM',
  'East of England': 'EE',
  'South West': 'SW',
  'South East': 'SE',
  'London': 'LON',
  'Northern Ireland': 'NI'
};

const UKMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState(UK_REGIONS_DATA['SW']);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Map Side */}
      <div className="lg:col-span-7 bg-white rounded-[3rem] p-8 border border-brand-accent shadow-sm overflow-hidden relative min-h-[600px] flex items-center justify-center">
        <div className="w-full h-full max-h-[600px] relative" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))' }}>
          <ComposableMap
            projection="geoAlbers"
            projectionConfig={{
              rotate: [4.4, 0.0],
              center: [2.5, 54.5],
              scale: 3200
            }}
            className="w-full h-full"
          >
            <Geographies geography="/uk-regions.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const regionName = geo.properties.areanm;
                  const regionId = NAME_TO_ID[regionName];
                  if (!regionId) return null;
                  
                  const isSelected = selectedRegion.postcode === regionId;
                  const isHovered = hoveredRegion === regionId;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredRegion(regionId)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => setSelectedRegion(UK_REGIONS_DATA[regionId])}
                      style={{
                        default: {
                          fill: isSelected ? '#1A2B44' : '#F3F4F6',
                          stroke: '#D1D5DB',
                          strokeWidth: 0.5,
                          outline: 'none',
                          transition: 'all 250ms'
                        },
                        hover: {
                          fill: isSelected ? '#1A2B44' : '#E5E7EB',
                          stroke: '#9CA3AF',
                          strokeWidth: 1,
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'all 250ms'
                        },
                        pressed: {
                          fill: '#1A2B44',
                          stroke: '#1A2B44',
                          strokeWidth: 1,
                          outline: 'none'
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

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

export default UKMap;
