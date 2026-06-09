import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { UK_REGIONS_DATA } from '../data/mockData';
import { Info, TrendingUp, Zap, Clock, MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const UKMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    { id: 'SCO', name: 'Scotland', coords: [56.4907, -4.2026] as [number, number] },
    { id: 'NI', name: 'Northern Ireland', coords: [54.7877, -6.4923] as [number, number] },
    { id: 'NE', name: 'North East', coords: [54.9783, -1.6178] as [number, number] },
    { id: 'NW', name: 'North West', coords: [53.4808, -2.2426] as [number, number] },
    { id: 'YOR', name: 'Yorkshire', coords: [53.9591, -1.0815] as [number, number] },
    { id: 'WAL', name: 'Wales', coords: [52.1307, -3.7837] as [number, number] },
    { id: 'WM', name: 'West Midlands', coords: [52.4862, -1.8904] as [number, number] },
    { id: 'EM', name: 'East Midlands', coords: [52.9548, -1.1581] as [number, number] },
    { id: 'EE', name: 'East of England', coords: [52.2053, 0.1218] as [number, number] },
    { id: 'LON', name: 'London', coords: [51.5074, -0.1278] as [number, number] },
    { id: 'SE', name: 'South East', coords: [51.2777, 0.5297] as [number, number] },
    { id: 'SW', name: 'South West', coords: [50.7192, -3.5297] as [number, number] },
  ];

  const activeData = selectedRegion ? UK_REGIONS_DATA[selectedRegion] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="relative bg-brand-white rounded-3xl p-4 border border-brand-accent shadow-inner h-[600px] overflow-hidden">
        <MapContainer 
          center={[54.5, -3.5]} 
          zoom={5.5} 
          style={{ height: '100%', width: '100%', borderRadius: '1.5rem' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {regions.map((region) => (
            <Marker 
              key={region.id} 
              position={region.coords}
              eventHandlers={{
                click: () => setSelectedRegion(region.id),
              }}
            >
              <Popup>
                <div className="p-2 font-serif font-bold text-brand-navy">
                  {region.name}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-brand-accent shadow-sm">
          <p className="text-[10px] font-bold text-brand-navy uppercase tracking-widest">
            Click a marker to see regional data
          </p>
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
              className="h-[600px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-brand-accent rounded-3xl"
            >
              <div className="h-16 w-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-brand-muted" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-navy mb-2">Select a region on the map</h3>
              <p className="text-brand-muted max-w-xs">
                Explore real UK regional data by clicking the markers on the map. Each marker provides localized solar benchmarks.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UKMap;
