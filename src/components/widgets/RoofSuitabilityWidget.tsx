import React, { useState } from 'react';
import { Compass, CheckCircle2, XCircle } from 'lucide-react';

type Direction = 'S' | 'SE' | 'SW' | 'E' | 'W' | 'NE' | 'NW' | 'N';
type Shading = 'None' | 'Partial' | 'Heavy';

const RoofSuitabilityWidget: React.FC = () => {
  const [direction, setDirection] = useState<Direction>('S');
  const [pitch, setPitch] = useState<number>(35);
  const [shading, setShading] = useState<Shading>('None');

  let directionScore = 100;
  if (direction === 'SE' || direction === 'SW') directionScore = 95;
  if (direction === 'E' || direction === 'W') directionScore = 80;
  if (direction === 'NE' || direction === 'NW') directionScore = 65;
  if (direction === 'N') directionScore = 55;

  let pitchScore = 100;
  if (pitch < 20) pitchScore = 95; 
  if (pitch > 45) pitchScore = 90; 

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
    recommendation = 'Perfect for solar. Maximum generation and fastest payback.';
  } else if (totalEfficiency >= 70) {
    suitability = 'Good';
    recommendation = 'Well-suited for solar. Strong financial case.';
  } else if (totalEfficiency >= 50) {
    suitability = 'Fair';
    iconColor = 'text-brand-yellow';
    recommendation = 'Can support solar, but payback times will be longer. Consider optimizers.';
  } else {
    suitability = 'Poor';
    SuitabilityIcon = XCircle;
    iconColor = 'text-red-500';
    recommendation = 'Not ideal for standard solar. Consider ground-mounted options.';
  }

  return (
    <div className="my-8">
      <div className="bg-white border border-brand-accent rounded-[2.5rem] p-6 md:p-10 shadow-sm mb-6">
        <h3 className="text-2xl font-serif font-bold text-brand-navy mb-6 text-center">Interactive Roof Checker</h3>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-4 w-4" /> Which way does your main roof face?
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {(['S', 'SE', 'SW', 'E', 'W', 'NE', 'NW', 'N'] as Direction[]).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setDirection(dir)}
                  className={`py-2 px-2 rounded-xl font-bold text-xs transition-all border ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-brand-accent">
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
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
                <span>0°</span>
                <span className="text-brand-navy text-lg">{pitch}°</span>
                <span>60°</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
                Shading
              </label>
              <div className="flex bg-brand-white p-1 rounded-xl">
                {(['None', 'Partial', 'Heavy'] as Shading[]).map((shadeOption) => (
                  <button
                    key={shadeOption}
                    onClick={() => setShading(shadeOption)}
                    className={`flex-1 py-2 px-2 rounded-lg font-bold text-xs transition-all ${
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
      </div>

      <div className="bg-brand-navy text-white p-6 md:p-8 rounded-[2rem] shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-shrink-0 text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/20" />
                <circle 
                  cx="48" cy="48" r="44" 
                  stroke="currentColor" 
                  strokeWidth="6" 
                  fill="transparent" 
                  strokeDasharray="276.4" 
                  strokeDashoffset={276.4 - (276.4 * totalEfficiency) / 100}
                  className="text-brand-yellow transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-serif font-bold text-brand-yellow">{totalEfficiency}%</span>
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold mt-2 text-white/60">Efficiency</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SuitabilityIcon className={`h-6 w-6 ${iconColor}`} />
              <h4 className="text-2xl font-serif font-bold">{suitability}</h4>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoofSuitabilityWidget;
