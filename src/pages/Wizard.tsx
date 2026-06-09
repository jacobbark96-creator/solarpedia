import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '../hooks/useWizardStore';
import { useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  Battery,
  Compass
} from 'lucide-react';

import { usePageMetadata } from '../hooks/usePageMetadata';

const steps = [
  { id: 1, title: 'Property Type' },
  { id: 2, title: 'Location' },
  { id: 3, title: 'Energy Usage' },
  { id: 4, title: 'Roof Details' },
  { id: 5, title: 'Review' }
];

const Wizard: React.FC = () => {
  usePageMetadata(
    'Solar Savings Wizard',
    'Calculate your potential solar savings with our impartial UK-wide data-driven tool.'
  );
  const { step, data, setStep, updateData } = useWizardStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-brand-white pt-10 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-1.5">
                <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= s.id ? 'bg-brand-navy' : 'bg-brand-accent'}`} />
                <span className={`text-[9px] font-bold uppercase tracking-wider ${step >= s.id ? 'text-brand-navy' : 'text-brand-muted'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-brand-accent p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-1.5">What type of property is this for?</h2>
                    <p className="text-sm text-brand-muted">Select the property type to help us tailor our estimates.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => updateData({ propertyType: 'residential' })}
                      className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${data.propertyType === 'residential' ? 'border-brand-navy bg-brand-navy/5' : 'border-brand-accent hover:border-brand-navy/30'}`}
                    >
                      <HomeIcon className={`h-10 w-10 ${data.propertyType === 'residential' ? 'text-brand-navy' : 'text-brand-muted'}`} />
                      <div className="text-center">
                        <p className="font-bold text-brand-navy">Residential</p>
                        <p className="text-xs text-brand-muted">Home or personal property</p>
                      </div>
                    </button>
                    <button
                      onClick={() => updateData({ propertyType: 'commercial' })}
                      className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${data.propertyType === 'commercial' ? 'border-brand-navy bg-brand-navy/5' : 'border-brand-accent hover:border-brand-navy/30'}`}
                    >
                      <Building2 className={`h-10 w-10 ${data.propertyType === 'commercial' ? 'text-brand-navy' : 'text-brand-muted'}`} />
                      <div className="text-center">
                        <p className="font-bold text-brand-navy">Commercial</p>
                        <p className="text-xs text-brand-muted">Business or industrial premises</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-1.5">Where is the property located?</h2>
                    <p className="text-sm text-brand-muted">Solar efficiency varies significantly across the UK.</p>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Postcode Area</label>
                    <input
                      type="text"
                      placeholder="e.g. SW1, EH3, M1"
                      value={data.postcode}
                      onChange={(e) => updateData({ postcode: e.target.value.toUpperCase() })}
                      className="w-full p-3 rounded-lg border-2 border-brand-accent focus:border-brand-navy outline-none text-lg font-bold transition-all"
                    />
                    <p className="mt-3 text-[10px] text-brand-muted flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand-green" />
                      Your location data is used for irradiance calculations only.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-1.5">Energy & Bills</h2>
                    <p className="text-sm text-brand-muted">Tell us about your current energy usage.</p>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-3">
                        <label className="text-[10px] font-bold text-brand-navy uppercase">Average Monthly Bill</label>
                        <span className="text-lg font-bold text-brand-navy">£{data.energyBill}</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="1000"
                        step="10"
                        value={data.energyBill}
                        onChange={(e) => updateData({ energyBill: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['day', 'evening', 'balanced'].map((pattern) => (
                        <button
                          key={pattern}
                          onClick={() => updateData({ usagePattern: pattern as any })}
                          className={`p-3 rounded-lg border-2 text-xs font-bold capitalize transition-all ${data.usagePattern === pattern ? 'border-brand-navy bg-brand-navy text-white' : 'border-brand-accent hover:border-brand-navy/30'}`}
                        >
                          {pattern} Usage
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-1.5">Roof Suitability</h2>
                    <p className="text-sm text-brand-muted">These details significantly impact solar production.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-brand-navy uppercase flex items-center gap-2">
                        <Compass className="h-3.5 w-3.5" /> Roof Direction
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['south', 'east', 'west', 'north'].map((dir) => (
                          <button
                            key={dir}
                            onClick={() => updateData({ roofDirection: dir as any })}
                            className={`p-2.5 rounded-lg border-2 text-xs font-bold capitalize transition-all ${data.roofDirection === dir ? 'border-brand-navy bg-brand-navy text-white' : 'border-brand-accent hover:border-brand-navy/30'}`}
                          >
                            {dir}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-brand-navy uppercase flex items-center gap-2">
                        <Battery className="h-3.5 w-3.5" /> Battery Storage?
                      </label>
                      <div className="flex gap-2">
                        {[true, false].map((val) => (
                          <button
                            key={val ? 'yes' : 'no'}
                            onClick={() => updateData({ hasBattery: val })}
                            className={`flex-1 p-2.5 rounded-lg border-2 text-xs font-bold capitalize transition-all ${data.hasBattery === val ? 'border-brand-navy bg-brand-navy text-white' : 'border-brand-accent hover:border-brand-navy/30'}`}
                          >
                            {val ? 'Include' : 'Exclude'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-1.5">Consent & Accuracy</h2>
                    <p className="text-sm text-brand-muted">Choose your level of insight detail.</p>
                  </div>
                  <div className="bg-brand-accent/20 p-5 rounded-xl border border-brand-accent">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={data.consentShared}
                        onChange={(e) => updateData({ consentShared: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-brand-accent text-brand-navy focus:ring-brand-navy"
                      />
                      <label htmlFor="consent" className="text-xs text-brand-navy leading-relaxed opacity-90">
                        I consent to my submitted information being shared with one carefully selected qualified installer partner for the purpose of improving estimate accuracy and optionally providing a no-obligation quotation.
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className={`p-3.5 rounded-xl border-2 transition-all ${data.consentShared ? 'border-brand-green bg-brand-green/5' : 'border-brand-accent opacity-50'}`}>
                      <CheckCircle2 className={`h-4 w-4 mb-1.5 ${data.consentShared ? 'text-brand-green' : 'text-brand-muted'}`} />
                      <p className="text-sm font-bold text-brand-navy">Enhanced Accuracy</p>
                      <p className="text-[10px] text-brand-muted">Personalized data from local installers included.</p>
                    </div>
                    <div className={`p-3.5 rounded-xl border-2 transition-all ${!data.consentShared ? 'border-brand-yellow bg-brand-yellow/5' : 'border-brand-accent opacity-50'}`}>
                      <Zap className={`h-4 w-4 mb-1.5 ${!data.consentShared ? 'text-brand-yellow' : 'text-brand-muted'}`} />
                      <p className="text-sm font-bold text-brand-navy">Generic Estimate</p>
                      <p className="text-[10px] text-brand-muted">Using UK national and regional averages only.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex justify-between items-center border-t border-brand-accent pt-6">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 text-sm font-bold transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'text-brand-navy hover:translate-x-[-4px]'}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={step === 2 && !data.postcode}
              className={`bg-brand-navy text-white px-7 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {step === steps.length ? 'See Results' : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
