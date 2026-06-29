import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronLeft, Compass, CheckCircle2, XCircle } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';

type Direction = 'S' | 'SE' | 'SW' | 'E' | 'W' | 'NE' | 'NW' | 'N';
type Shading = 'None' | 'Partial' | 'Heavy';

const RoofSuitabilityChecker: React.FC = () => {
  const [direction, setDirection] = useState<Direction>('S');
  const [pitch, setPitch] = useState<number>(35);
  const [shading, setShading] = useState<Shading>('None');

  // Logic for efficiency score
  let directionScore = 100;
  if (direction === 'SE' || direction === 'SW') directionScore = 95;
  if (direction === 'E' || direction === 'W') directionScore = 80;
  if (direction === 'NE' || direction === 'NW') directionScore = 65;
  if (direction === 'N') directionScore = 55;

  let pitchScore = 100;
  if (pitch < 20) pitchScore = 95; // Flatter roof loses some winter generation
  if (pitch > 45) pitchScore = 90; // Steeper roof loses summer peak

  let shadingScore = 100;
  if (shading === 'Partial') shadingScore = 80;
  if (shading === 'Heavy') shadingScore = 50;

  const totalEfficiency = Math.round((directionScore / 100) * (pitchScore / 100) * (shadingScore / 100) * 100);

  let recommendation = '';
  let suitability = '';
  let SuitabilityIcon = CheckCircle2;
  let iconColor = 'text-brand-green';

  if (totalEfficiency >= 85) {
    suitability = 'Excellent';
    recommendation = 'Your roof is perfect for solar. You will get maximum generation and the fastest possible payback time.';
  } else if (totalEfficiency >= 70) {
    suitability = 'Good';
    recommendation = 'Your roof is well-suited for solar. You may generate slightly less than a perfect South-facing roof, but the financial case is still very strong.';
  } else if (totalEfficiency >= 50) {
    suitability = 'Fair';
    iconColor = 'text-brand-yellow';
    recommendation = 'Your roof can support solar, but payback times will be longer. Consider microinverters or optimizers to deal with shading or split arrays.';
  } else {
    suitability = 'Poor';
    SuitabilityIcon = XCircle;
    iconColor = 'text-red-500';
    recommendation = 'Your roof is not ideal for standard solar. Heavy shading or a North-facing aspect means generation will be low. Consider ground-mounted solar if you have the space.';
  }

  usePageMetadata({
    title: 'Solar Roof Suitability Checker UK',
    description: 'Check if your UK roof is suitable for solar panels. Calculate how direction, pitch, and shading affect your solar panel efficiency.',
    path: '/tools/roof-suitability',
    keywords: 'solar roof checker, roof suitability solar, solar panel direction UK, solar shading calculator',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'Roof Suitability Checker', path: '/tools/roof-suitability' },
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
            <Home className="h-8 w-8 text-brand-navy" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-4">
            Roof Suitability Checker
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            Not all roofs are created equal. Select your roof's direction, pitch, and shading to see how efficiently panels will perform on your property.
          </p>
        </div>

        <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 gap-12">
            
            {/* Direction */}
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider flex items-center gap-2">
                <Compass className="h-4 w-4" /> Which way does your main roof face?
              </label>
              <div className="grid grid-cols-4 gap-3">
                {(['S', 'SE', 'SW', 'E', 'W', 'NE', 'NW', 'N'] as Direction[]).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setDirection(dir)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border ${
                      direction === dir 
                        ? 'bg-brand-navy text-white border-brand-navy' 
                        : 'bg-brand-white text-brand-muted border-transparent hover:border-brand-accent'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* Pitch */}
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Roof Pitch (Degrees)
              </label>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
              />
              <div className="flex justify-between text-brand-muted text-sm mt-2 font-bold">
                <span>Flat (0°)</span>
                <span className="text-brand-navy text-lg">{pitch}°</span>
                <span>Steep (60°)</span>
              </div>
              <p className="text-xs text-brand-muted mt-2">
                * The optimal pitch in the UK is between 35° and 40°.
              </p>
            </div>

            {/* Shading */}
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">
                Shading from trees or buildings
              </label>
              <div className="flex bg-brand-white p-1 rounded-xl">
                {(['None', 'Partial', 'Heavy'] as Shading[]).map((shadeOption) => (
                  <button
                    key={shadeOption}
                    onClick={() => setShading(shadeOption)}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                      shading === shadeOption ? 'bg-white shadow-sm text-brand-navy' : 'text-brand-muted hover:text-brand-navy'
                    }`}
                  >
                    {shadeOption}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="bg-brand-navy text-white p-8 md:p-12 rounded-[2.5rem] shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0 text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/20" />
                  <circle 
                    cx="64" cy="64" r="58" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="364.4" 
                    strokeDashoffset={364.4 - (364.4 * totalEfficiency) / 100}
                    className="text-brand-yellow transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-serif font-bold text-brand-yellow">{totalEfficiency}%</span>
                </div>
              </div>
              <p className="text-xs uppercase tracking-widest font-bold mt-4 text-white/60">Efficiency Score</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <SuitabilityIcon className={`h-8 w-8 ${iconColor}`} />
                <h2 className="text-3xl font-serif font-bold">{suitability}</h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                {recommendation}
              </p>
              
              <Link 
                to="/wizard"
                className="inline-block bg-brand-green text-brand-navy px-8 py-3 rounded-full font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Calculate Financial Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoofSuitabilityChecker;