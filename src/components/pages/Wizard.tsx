import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '../hooks/useWizardStore';
import { 
  Home as HomeIcon, 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  Battery,
  Compass,
  Search,
  Home
} from 'lucide-react';

import { lookupPropertyRoofEstimate } from '../lib/propertyLookup';
import { createBreadcrumbSchema, createSoftwareApplicationSchema } from '../lib/seo';

const steps = [
  { id: 1, title: 'Property Type' },
  { id: 2, title: 'Location' },
  { id: 3, title: 'Energy Usage' },
  { id: 4, title: 'Roof Details' },
  { id: 5, title: 'Contact' },
  { id: 6, title: 'Review' }
];

const Wizard: React.FC = () => {
  const { step, data, setStep, updateData } = useWizardStore();
  const [lookupLoading, setLookupLoading] = React.useState(false);
  const [lookupError, setLookupError] = React.useState('');
  const isContactStepValid =
    data.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(data.email.trim()) &&
    data.phone.trim().length >= 7;

  const [submitting, setSubmitting] = React.useState(false);

  const handleNext = async () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      setSubmitting(true);
      try {
        await fetch('https://formsubmit.co/ajax/solarpedia@openlead.co.uk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: 'New Solar Savings Calculator Lead',
            Name: data.name,
            Email: data.email,
            Phone: data.phone,
            'Property Type': data.propertyType,
            Postcode: data.postcode,
            'House Number': data.houseNumber,
            'Energy Bill': `£${data.energyBill}/month`,
            'Usage Pattern': data.usagePattern,
            'Roof Size': `${data.roofSize} sqm`,
            'Roof Direction': data.roofDirection,
            'Has Battery': data.hasBattery ? 'Yes' : 'No',
            'Consent Shared': data.consentShared ? 'Yes' : 'No',
            'Matched Address': data.matchedAddress || 'N/A',
            'Roof Estimate Method': data.roofEstimateMethod || 'N/A',
          })
        });
      } catch (error) {
        console.error('Failed to submit lead', error);
      } finally {
        setSubmitting(false);
        window.location.href = '/results';
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleEstimateRoof = async () => {
    setLookupError('');
    setLookupLoading(true);

    try {
      const result = await lookupPropertyRoofEstimate(data.houseNumber, data.postcode, data.propertyType);

      updateData({
        postcode: data.postcode.toUpperCase().trim(),
        roofSize: Math.round(result.estimatedRoofAreaSqm),
        roofSizeSource: 'estimated',
        roofSizeConfidence: result.confidence,
        matchedAddress: result.matchedAddress,
        propertyLat: result.latitude,
        propertyLon: result.longitude,
        footprintArea: Math.round(result.footprintAreaSqm),
        roofEstimateMethod: result.method,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to estimate roof size right now.';
      setLookupError(message);
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-white pt-16 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Landing Page Hero & Hook */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-6">
            Solar Savings Calculator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Find out exactly how much you could save on your energy bills and how quickly a solar system could pay for itself.
          </p>
          
          <div className="bg-brand-navy rounded-3xl p-6 md:p-8 shadow-xl inline-block text-left border border-brand-accent w-full max-w-2xl">
             <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
               <Zap className="h-5 w-5 text-brand-yellow" />
               Did you know?
             </h2>
             <p className="text-white/90 text-base md:text-lg leading-relaxed">
               "UK homeowners are wiping out over £1,200 a year from their energy bills with solar and battery systems. Stop overpaying the grid."
             </p>
          </div>
        </div>

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
                      aria-pressed={data.propertyType === 'residential'}
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
                      aria-pressed={data.propertyType === 'commercial'}
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
                    <p className="text-sm text-brand-muted">Enter the postcode and house number so we can estimate the roof size automatically.</p>
                  </div>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label htmlFor="house-number" className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">House Number</label>
                        <input
                          id="house-number"
                          type="text"
                          placeholder="e.g. 18"
                          value={data.houseNumber}
                          onChange={(e) => updateData({ houseNumber: e.target.value })}
                          className="w-full p-3 rounded-lg border-2 border-brand-accent focus:border-brand-navy outline-none text-lg font-bold transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="postcode" className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Postcode</label>
                        <input
                          id="postcode"
                          type="text"
                          placeholder="e.g. SW1A 1AA"
                          value={data.postcode}
                          onChange={(e) => updateData({ postcode: e.target.value.toUpperCase() })}
                          className="w-full p-3 rounded-lg border-2 border-brand-accent focus:border-brand-navy outline-none text-lg font-bold transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleEstimateRoof}
                        disabled={lookupLoading || !data.houseNumber || !data.postcode}
                        className="bg-brand-navy text-white px-6 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Search className="h-4 w-4" />
                        {lookupLoading ? 'Estimating roof size...' : 'Estimate Roof Size'}
                      </button>
                      <div className="text-[10px] text-brand-muted flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-brand-green" />
                        Uses open address and building footprint data. You can override the result manually.
                      </div>
                    </div>

                    {lookupError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {lookupError}
                      </div>
                    )}

                    {data.matchedAddress && (
                      <div className="rounded-xl border border-brand-accent bg-brand-accent/20 p-4 space-y-2">
                        <div className="flex items-start gap-3">
                          <Home className="h-4 w-4 text-brand-green mt-0.5" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">Matched property</p>
                            <p className="text-sm font-semibold text-brand-navy">{data.matchedAddress}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">Roof estimate</p>
                            <p className="font-bold text-brand-navy">{Math.round(data.roofSize)} sqm</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">Footprint</p>
                            <p className="font-bold text-brand-navy">{data.footprintArea || '—'} sqm</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">Confidence</p>
                            <p className="font-bold capitalize text-brand-navy">{data.roofSizeConfidence || '—'}</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                        <label htmlFor="energy-bill" className="text-[10px] font-bold text-brand-navy uppercase">Average Monthly Bill</label>
                        <span className="text-lg font-bold text-brand-navy">£{data.energyBill}</span>
                      </div>
                      <input
                        id="energy-bill"
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
                          aria-pressed={data.usagePattern === pattern}
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
                  <div className="rounded-xl border border-brand-accent bg-brand-accent/20 p-5">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
                      <div>
                        <label htmlFor="roof-size-range" className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">Usable roof area</label>
                        <p className="text-2xl font-serif font-bold text-brand-navy">{Math.round(data.roofSize)} sqm</p>
                      </div>
                      <div className="text-xs text-brand-muted">
                        {data.roofSizeSource === 'estimated'
                          ? `Estimated from building footprint data (${data.roofSizeConfidence || 'medium'} confidence).`
                          : data.roofSizeSource === 'manual'
                            ? 'Entered manually.'
                            : 'Default estimate. Use the location step to auto-fill this.'}
                      </div>
                    </div>
                    <input
                      id="roof-size-range"
                      type="range"
                      min="10"
                      max={data.propertyType === 'commercial' ? '2000' : '250'}
                      step="1"
                      value={data.roofSize}
                      onChange={(e) =>
                        updateData({
                          roofSize: parseInt(e.target.value, 10),
                          roofSizeSource: 'manual',
                        })
                      }
                      className="w-full h-1.5 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
                    />
                    <div className="mt-3">
                      <label htmlFor="roof-size-manual" className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Manual roof area override (sqm)</label>
                      <input
                        id="roof-size-manual"
                        type="number"
                        min="10"
                        max={data.propertyType === 'commercial' ? '2000' : '250'}
                        value={data.roofSize}
                        onChange={(e) =>
                          updateData({
                            roofSize: Math.max(10, parseInt(e.target.value || '10', 10)),
                            roofSizeSource: 'manual',
                          })
                        }
                        className="w-full md:w-48 p-3 rounded-lg border-2 border-brand-accent focus:border-brand-navy outline-none text-lg font-bold transition-all"
                      />
                    </div>
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
                            aria-pressed={data.roofDirection === dir}
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
                            aria-pressed={data.hasBattery === val}
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
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-1.5">Who should we send the results to?</h2>
                    <p className="text-sm text-brand-muted">Enter your details before we show your solar forecast.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Full Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your full name"
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                        className="w-full p-3 rounded-lg border-2 border-brand-accent focus:border-brand-navy outline-none text-base font-medium transition-all"
                        autoComplete="name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="you@example.com"
                          value={data.email}
                          onChange={(e) => updateData({ email: e.target.value })}
                          className="w-full p-3 rounded-lg border-2 border-brand-accent focus:border-brand-navy outline-none text-base font-medium transition-all"
                          autoComplete="email"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Contact Number</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="07xxx xxx xxx"
                          value={data.phone}
                          onChange={(e) => updateData({ phone: e.target.value })}
                          className="w-full p-3 rounded-lg border-2 border-brand-accent focus:border-brand-navy outline-none text-base font-medium transition-all"
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-brand-accent bg-brand-accent/20 px-4 py-3 text-xs text-brand-muted">
                    We’ll use these details to personalise your quote journey and pre-fill the installer request form after your results.
                  </div>
                </div>
              )}

              {step === 6 && (
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
              disabled={(step === 2 && (!data.postcode || !data.houseNumber)) || (step === 5 && !isContactStepValid) || submitting}
              className={`bg-brand-navy text-white px-7 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {submitting ? 'Submitting...' : step === steps.length ? 'See Results' : 'Continue'}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-brand-muted">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> 100% Free</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> No Obligation</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Secure</span>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-brand-accent">
          <p className="text-[10px] text-brand-muted uppercase tracking-wider">
            Source: Energy Saving Trust (2025/2026 data projections based on typical usage)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
