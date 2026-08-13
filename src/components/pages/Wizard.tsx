import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from '../../hooks/useWizardStore';
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
  Home,
  UploadCloud,
  FileText,
  User,
  Phone,
  Mail
} from 'lucide-react';

import { lookupPropertyRoofEstimate } from '../../lib/propertyLookup';
import { trackFormSubmission, getVisitorData, trackWizardStep } from '../../lib/tracking';
import { NATIONAL_AVERAGES, UK_REGIONS_DATA } from '../../data/mockData';

const steps = [
  { id: 1, title: 'Location' },
  { id: 2, title: 'Property' },
  { id: 3, title: 'Ownership' },
  { id: 4, title: 'Costs' },
  { id: 5, title: 'Usage' },
  { id: 6, title: 'Roof' },
  { id: 7, title: 'Battery' },
  { id: 8, title: 'Timeframe' },
  { id: 9, title: 'Result' },
  { id: 10, title: 'Upload' },
  { id: 11, title: 'Contact' },
  { id: 12, title: 'Next Steps' }
];

const Wizard: React.FC = () => {
  const { step, data, setStep, updateData } = useWizardStore();
  const [lookupLoading, setLookupLoading] = React.useState(false);
  const [lookupError, setLookupError] = React.useState('');
  
  const [submitting, setSubmitting] = React.useState(false);
  const [userCity, setUserCity] = React.useState('your area');
  const [billFile, setBillFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const isContactStepValid =
    data.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(data.email.trim()) &&
    data.phone.trim().length >= 7;

  React.useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(d => {
        if (d.city) setUserCity(d.city);
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    trackWizardStep(step);
  }, [step]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBillFile(file);
      setUploading(true);
      
      // Phase 2 placeholder: Here we would process the bill via API
      setTimeout(() => {
        setUploading(false);
        updateData({ billUploaded: true });
        setStep(11);
      }, 1500);
    }
  };

  const calculateLeadScore = () => {
    let score = 10; // Completed wizard
    if (data.knowsUsage && data.annualUsageKwh) score += 10;
    if (data.energyBill > (data.propertyType === 'commercial' ? 500 : 200)) score += 10;
    if (data.billUploaded) score += 30;
    
    if (data.timeframe === 'ready') score += 30;
    else if (data.timeframe === '3_months') score += 20;
    else if (data.timeframe === '6_months') score += 10;
    else if (data.timeframe === '12_months') score += 5;

    if (data.name && data.email && data.phone) score += 10;
    
    if (data.intent === 'installer') score += 25;
    else if (data.intent === 'advice') score += 10;
    
    return score;
  };

  const handleSubmitLead = async (intentValue: string) => {
    setSubmitting(true);
    updateData({ intent: intentValue as any });
    
    try {
      const visitorData = await getVisitorData();
      const finalScore = calculateLeadScore();

      await trackFormSubmission({
        full_name: data.name,
        email: data.email,
        phone: data.phone,
      });

      await fetch('https://formsubmit.co/ajax/support@openlead.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Solar Lead (Score: ${finalScore}): ${data.name} (${data.postcode})`,
          Name: data.name,
          Email: data.email,
          Phone: data.phone,
          'Property Type': data.propertyType,
          Ownership: data.ownership,
          Postcode: data.postcode,
          'Energy Bill': `£${data.energyBill}/month`,
          'Annual Usage (kWh)': data.knowsUsage ? data.annualUsageKwh : 'Estimated',
          'Usage Pattern': data.usagePattern,
          'Roof Size': `${data.roofSize} sqm`,
          'Roof Direction': data.roofDirection,
          'Battery Interest': data.batteryInterest,
          'Timeframe': data.timeframe,
          'Bill Uploaded': data.billUploaded ? 'Yes' : 'No',
          'Intent': intentValue,
          'Lead Score': finalScore,
          'Consent Shared': data.consentShared ? 'Yes' : 'No',
          'Matched Address': data.matchedAddress || 'N/A',
          'IP Address': visitorData?.ip_address || 'Unknown',
          'Visitor ID': visitorData?.visitor_id || 'Unknown',
          'Page Views History': visitorData?.page_views ? JSON.stringify(visitorData.page_views) : 'No history',
          'First Seen': visitorData?.first_seen || 'Unknown',
        })
      });
    } catch (error) {
      console.error('Failed to submit lead', error);
    } finally {
      setSubmitting(false);
      window.location.href = '/results';
    }
  };

  const handleNext = async () => {
    if (step < steps.length) {
      setStep(step + 1);
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

  const getSavingsEstimate = () => {
    let annualConsumptionKwh = data.annualUsageKwh || 0;
    
    if (!annualConsumptionKwh || !data.knowsUsage) {
      const annualBill = data.energyBill * 12;
      const annualStandingCharge = 0.60 * 365;
      const energySpend = Math.max(0, annualBill - annualStandingCharge);
      annualConsumptionKwh = energySpend / NATIONAL_AVERAGES.energyPrice;
    }
    
    const regionCode = data.postcode?.toUpperCase().slice(0, 3) || 'SW';
    const regionData = UK_REGIONS_DATA[regionCode] || UK_REGIONS_DATA['SW'];
    const regionalYield = regionData.avgSunlightHours / 1000;
    const roofDirectionFactor = { south: 1, east: 0.9, west: 0.88, north: 0.72, not_sure: 0.85 }[data.roofDirection as string] || 0.85;

    const targetSystemSize = annualConsumptionKwh / (900 * regionalYield * roofDirectionFactor);
    const usableRoofSpace = data.roofSize * 0.75;
    const maxPossibleSize = usableRoofSpace / 4.5;
    const systemSize = Math.max(1, Math.min(targetSystemSize, maxPossibleSize));

    const annualGenerationKwh = systemSize * 900 * regionalYield * roofDirectionFactor;
    const baseSelfConsumptionRate = data.propertyType === 'commercial'
        ? { day: 0.82, balanced: 0.72, evening: 0.55 }[data.usagePattern as string] || 0.72
        : { day: 0.55, balanced: 0.42, evening: 0.3 }[data.usagePattern as string] || 0.42;
        
    const hasBatteryBool = data.batteryInterest === 'yes' || data.hasBattery;
    const selfConsumptionRate = Math.min(
      hasBatteryBool ? baseSelfConsumptionRate + (data.propertyType === 'commercial' ? 0.12 : 0.2) : baseSelfConsumptionRate,
      0.92
    );
    const exportRate = data.propertyType === 'commercial' ? 0.12 : 0.15;
    const annualSavings = (annualGenerationKwh * selfConsumptionRate * NATIONAL_AVERAGES.energyPrice) + 
                          (annualGenerationKwh * (1 - selfConsumptionRate) * exportRate);
    
    const systemCost = (systemSize * 1100) + (hasBatteryBool ? 3500 : 0);
    const payback = systemCost / annualSavings;

    return {
      size: systemSize.toFixed(1),
      generation: Math.round(annualGenerationKwh),
      savings: Math.round(annualSavings),
      payback: payback.toFixed(1),
      suitability: Math.min(Math.round((systemSize / targetSystemSize) * 100), 100)
    };
  };

  const estimate = React.useMemo(getSavingsEstimate, [data]);

  return (
    <div className="min-h-screen bg-brand-white pt-16 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        
        {step === 1 && (
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif font-bold text-brand-navy mb-4">
              Personalised Solar Assessment
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              Get a personalised estimate of your solar potential, potential savings and payback period.
            </p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex gap-1 h-1.5 bg-brand-accent rounded-full overflow-hidden">
            {steps.map((s) => (
              <div 
                key={s.id} 
                className={`flex-1 transition-all duration-500 ${step >= s.id ? 'bg-brand-navy' : 'bg-transparent'}`} 
              />
            ))}
          </div>
          <div className="mt-2 text-xs font-bold text-brand-muted uppercase tracking-wider text-right">
            Step {step} of {steps.length}
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
              {/* Step 1: Location */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Where is the property?</h2>
                    <p className="text-sm text-brand-muted">We use your postcode to fetch local solar generation data.</p>
                  </div>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">House Name / Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 18"
                          value={data.houseNumber}
                          onChange={(e) => updateData({ houseNumber: e.target.value })}
                          className="w-full p-4 rounded-xl border-2 border-brand-accent focus:border-brand-navy outline-none text-lg font-bold transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Postcode</label>
                        <input
                          type="text"
                          placeholder="e.g. SW1A 1AA"
                          value={data.postcode}
                          onChange={(e) => updateData({ postcode: e.target.value.toUpperCase() })}
                          className="w-full p-4 rounded-xl border-2 border-brand-accent focus:border-brand-navy outline-none text-lg font-bold transition-all"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { handleEstimateRoof(); handleNext(); }}
                      disabled={!data.postcode}
                      className="w-full bg-brand-navy text-white px-6 py-4 rounded-xl text-base font-bold transition-all hover:bg-brand-navy/90 disabled:opacity-50"
                    >
                      Check Location
                    </button>
                    <p className="text-[10px] text-center text-brand-muted uppercase tracking-wider">Independent solar information</p>
                  </div>
                </div>
              )}

              {/* Step 2: Property Type */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">What type of property are you looking to install solar on?</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'residential', label: 'Home', icon: HomeIcon },
                      { id: 'commercial', label: 'Business', icon: Building2 },
                      { id: 'farm', label: 'Farm / Agricultural', icon: Compass },
                      { id: 'other', label: 'Other', icon: Search }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => { updateData({ propertyType: type.id as any }); handleNext(); }}
                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 ${data.propertyType === type.id ? 'border-brand-navy bg-brand-navy/5' : 'border-brand-accent hover:border-brand-navy/30'}`}
                      >
                        <type.icon className={`h-8 w-8 ${data.propertyType === type.id ? 'text-brand-navy' : 'text-brand-muted'}`} />
                        <span className="font-bold text-brand-navy text-lg">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Ownership */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Do you own the property?</h2>
                    <p className="text-sm text-brand-muted">Ownership and lease terms can affect solar installation options.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'yes', label: 'Yes' },
                      { id: 'no', label: 'No' },
                      { id: 'not_sure', label: 'I\'m not sure' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { updateData({ ownership: opt.id as any }); handleNext(); }}
                        className={`p-5 rounded-xl border-2 text-left font-bold text-lg transition-all ${data.ownership === opt.id ? 'border-brand-navy bg-brand-navy/5 text-brand-navy' : 'border-brand-accent text-brand-navy hover:border-brand-navy/30'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Costs */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Roughly how much do you spend on electricity each month?</h2>
                  </div>
                  <div className="space-y-6 pt-4">
                    <div className="flex justify-center mb-6">
                      <span className="text-4xl font-serif font-bold text-brand-navy bg-brand-accent/30 px-8 py-4 rounded-2xl">£{data.energyBill}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max={data.propertyType === 'commercial' ? '5000' : '1000'}
                      step={data.propertyType === 'commercial' ? '50' : '10'}
                      value={data.energyBill}
                      onChange={(e) => updateData({ energyBill: parseInt(e.target.value) })}
                      className="w-full h-2 bg-brand-accent rounded-lg appearance-none cursor-pointer accent-brand-navy"
                    />
                    <div className="flex justify-between text-xs font-bold text-brand-muted uppercase">
                      <span>£50</span>
                      <span>£{data.propertyType === 'commercial' ? '5000+' : '1000+'}</span>
                    </div>
                    <button onClick={handleNext} className="w-full bg-brand-navy text-white px-6 py-4 rounded-xl text-base font-bold transition-all hover:bg-brand-navy/90">
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Usage */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Do you know your annual electricity usage?</h2>
                    <p className="text-sm text-brand-muted">If not, we can estimate it based on your monthly spend.</p>
                  </div>
                  {!data.knowsUsage ? (
                    <div className="flex flex-col gap-3">
                      <button onClick={() => updateData({ knowsUsage: true })} className="p-5 rounded-xl border-2 border-brand-accent text-brand-navy font-bold text-lg text-left hover:border-brand-navy/30">
                        Yes, I know my annual kWh
                      </button>
                      <button onClick={() => { updateData({ knowsUsage: false }); handleNext(); }} className="p-5 rounded-xl border-2 border-brand-accent text-brand-navy font-bold text-lg text-left hover:border-brand-navy/30">
                        No, use my estimated usage
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Annual Usage (kWh)</label>
                      <input
                        type="number"
                        placeholder="e.g. 4500"
                        value={data.annualUsageKwh || ''}
                        onChange={(e) => updateData({ annualUsageKwh: parseInt(e.target.value) || undefined })}
                        className="w-full p-4 rounded-xl border-2 border-brand-accent focus:border-brand-navy outline-none text-lg font-bold transition-all"
                      />
                      <button onClick={handleNext} disabled={!data.annualUsageKwh} className="w-full bg-brand-navy text-white px-6 py-4 rounded-xl text-base font-bold transition-all hover:bg-brand-navy/90 disabled:opacity-50">
                        Continue
                      </button>
                      <button onClick={() => updateData({ knowsUsage: false })} className="w-full text-sm font-bold text-brand-muted hover:text-brand-navy mt-2">
                        I don't know my exact usage
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: Roof */}
              {step === 6 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Roof Information</h2>
                    <p className="text-sm text-brand-muted">This helps us calculate your generation potential.</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Estimated Roof Area (sqm)</label>
                      <input
                        type="number"
                        value={data.roofSize}
                        onChange={(e) => updateData({ roofSize: Math.max(10, parseInt(e.target.value || '10', 10)), roofSizeSource: 'manual' })}
                        className="w-full p-4 rounded-xl border-2 border-brand-accent focus:border-brand-navy outline-none text-lg font-bold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Main Roof Direction</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['south', 'east', 'west', 'north', 'not_sure'].map((dir) => (
                          <button
                            key={dir}
                            onClick={() => updateData({ roofDirection: dir as any })}
                            className={`p-3 rounded-xl border-2 text-sm font-bold capitalize transition-all ${data.roofDirection === dir ? 'border-brand-navy bg-brand-navy/5 text-brand-navy' : 'border-brand-accent text-brand-muted hover:border-brand-navy/30'}`}
                          >
                            {dir.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={handleNext} className="w-full bg-brand-navy text-white px-6 py-4 rounded-xl text-base font-bold transition-all hover:bg-brand-navy/90">
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 7: Battery */}
              {step === 7 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Would you like to consider battery storage?</h2>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'yes', label: 'Yes' },
                      { id: 'no', label: 'No' },
                      { id: 'not_sure', label: 'I\'m not sure' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { updateData({ batteryInterest: opt.id as any }); handleNext(); }}
                        className={`p-5 rounded-xl border-2 text-left font-bold text-lg transition-all ${data.batteryInterest === opt.id ? 'border-brand-navy bg-brand-navy/5 text-brand-navy' : 'border-brand-accent text-brand-navy hover:border-brand-navy/30'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Timeframe */}
              {step === 8 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">When are you considering installing solar?</h2>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'researching', label: 'I\'m just researching' },
                      { id: '12_months', label: 'Within 12 months' },
                      { id: '6_months', label: 'Within 6 months' },
                      { id: '3_months', label: 'Within 3 months' },
                      { id: 'ready', label: 'I\'m ready to get started' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { updateData({ timeframe: opt.id as any }); handleNext(); }}
                        className={`p-5 rounded-xl border-2 text-left font-bold text-lg transition-all ${data.timeframe === opt.id ? 'border-brand-navy bg-brand-navy/5 text-brand-navy' : 'border-brand-accent text-brand-navy hover:border-brand-navy/30'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 9: Result Screen */}
              {step === 9 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold text-brand-navy mb-2">Your Solar Potential</h2>
                    <p className="text-sm text-brand-muted max-w-md mx-auto">
                      Based on the information you've provided and available solar data, your preliminary estimate is:
                    </p>
                  </div>

                  <div className="bg-brand-navy rounded-3xl p-6 md:p-8 text-white shadow-xl grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] text-brand-yellow font-bold uppercase tracking-wider mb-1">Estimated system size</p>
                      <p className="text-3xl font-serif font-bold">{estimate.size} kWp</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-yellow font-bold uppercase tracking-wider mb-1">Annual generation</p>
                      <p className="text-3xl font-serif font-bold">{estimate.generation.toLocaleString()} kWh</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-yellow font-bold uppercase tracking-wider mb-1">Annual saving</p>
                      <p className="text-3xl font-serif font-bold text-brand-green">£{estimate.savings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-yellow font-bold uppercase tracking-wider mb-1">Payback period</p>
                      <p className="text-3xl font-serif font-bold">{estimate.payback} years</p>
                    </div>
                    <div className="col-span-2 border-t border-white/20 pt-4 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-80">Solar Suitability</span>
                        <span className="font-bold text-xl">{estimate.suitability}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-brand-green" style={{ width: `${estimate.suitability}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <button onClick={handleNext} className="w-full bg-brand-navy text-white px-6 py-4 rounded-xl text-base font-bold transition-all hover:bg-brand-navy/90 shadow-md">
                    Continue
                  </button>
                </div>
              )}

              {/* Step 10: Bill Upload */}
              {step === 10 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Want a more accurate assessment?</h2>
                    <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                      Your estimate is based on the information you've provided and standard assumptions. Upload your latest electricity bill and we can use your actual energy usage to improve the assessment.
                    </p>
                  </div>
                  
                  <div className="border-2 border-dashed border-brand-accent rounded-2xl p-8 text-center hover:bg-brand-white transition-colors relative bg-brand-accent/10">
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    {uploading ? (
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-navy mb-4"></div>
                        <p className="text-brand-navy font-bold">Uploading securely...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-brand-accent">
                          <UploadCloud className="h-8 w-8 text-brand-navy" />
                        </div>
                        <p className="text-lg font-bold text-brand-navy mb-1">Upload My Electricity Bill</p>
                        <p className="text-xs text-brand-muted mb-4 max-w-sm">PDF, JPG, PNG allowed.</p>
                        <button className="bg-brand-navy text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md pointer-events-none">
                          Browse Files
                        </button>
                      </div>
                    )}
                  </div>

                  <button onClick={handleNext} className="w-full text-sm font-bold text-brand-muted hover:text-brand-navy text-center">
                    Continue Without a Bill
                  </button>
                </div>
              )}

              {/* Step 11: Contact */}
              {step === 11 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Where should we send your assessment?</h2>
                    <p className="text-sm text-brand-muted">
                      We'll use these details to send your assessment and, if requested, arrange further information about your solar options.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-brand-accent focus:border-brand-navy outline-none text-base font-bold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => updateData({ email: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-brand-accent focus:border-brand-navy outline-none text-base font-bold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-brand-navy uppercase mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-brand-accent focus:border-brand-navy outline-none text-base font-bold transition-all"
                      />
                    </div>
                    
                    <button 
                      onClick={handleNext} 
                      disabled={!isContactStepValid}
                      className="w-full bg-brand-navy text-white px-6 py-4 rounded-xl text-base font-bold transition-all hover:bg-brand-navy/90 disabled:opacity-50 mt-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 12: Intent / Submit */}
              {step === 12 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-navy mb-2">Would you like help taking the next step?</h2>
                    <p className="text-sm text-brand-muted">Select an option to complete your assessment.</p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'installer', label: 'Yes, I\'d like to speak to a solar professional' },
                      { id: 'advice', label: 'I\'d like some advice first' },
                      { id: 'researching', label: 'I\'m just researching' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSubmitLead(opt.id)}
                        disabled={submitting}
                        className="p-5 rounded-xl border-2 border-brand-accent text-left font-bold text-lg text-brand-navy hover:border-brand-navy/30 transition-all disabled:opacity-50"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 text-[10px] text-brand-muted leading-relaxed text-center px-4">
                    By submitting, you agree to our privacy policy. If you request to speak to a professional, we will share your details with a carefully selected qualified installer partner.
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {step > 1 && step < 9 && (
            <div className="mt-8 pt-6 border-t border-brand-accent">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-bold text-brand-navy hover:translate-x-[-4px] transition-all"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            </div>
          )}
          {step > 9 && step < 12 && (
            <div className="mt-8 pt-6 border-t border-brand-accent">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-bold text-brand-navy hover:translate-x-[-4px] transition-all"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Wizard;
EOF