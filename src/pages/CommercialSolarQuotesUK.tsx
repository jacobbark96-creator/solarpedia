import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';

const CommercialSolarQuotesUK: React.FC = () => {
  usePageMetadata(
    'Commercial Solar Quotes UK | Get 3 Free Quotes',
    'Get 3 free commercial solar quotes across the UK. Compare vetted installers for warehouses, offices, schools, farms and retail sites.'
  );

  return (
    <div className="bg-brand-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
            Commercial solar quotes UK
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-5">
            Get 3 free commercial solar quotes
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            For warehouses, offices, schools, farms, retail and industrial sites. Share your postcode and we’ll route your enquiry to
            installers that cover your area and property type.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">What affects commercial pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Site size & roof condition', text: 'Usable area, structural condition, access and safety.' },
                  { title: 'Export limits', text: 'DNO rules, metering, and whether export is required.' },
                  { title: 'Load profile', text: 'Daytime usage drives savings and ROI.' },
                  { title: 'Battery & EV charging', text: 'Storage and EV load shifting can improve self-consumption.' },
                  { title: 'Procurement & finance', text: 'CAPEX vs lease/PPA options and project approvals.' },
                  { title: 'Grid & electrical works', text: 'Switchgear upgrades and connection complexity.' },
                ].map((item) => (
                  <div key={item.title} className="bg-brand-white border border-brand-accent rounded-[2rem] p-6">
                    <div className="text-lg font-serif font-bold text-brand-navy mb-2">{item.title}</div>
                    <p className="text-sm text-brand-muted leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">Get ready for a faster quote</h2>
              <ul className="space-y-4 text-brand-muted text-base leading-relaxed">
                <li>Site address + postcode (for routing)</li>
                <li>Rooftop vs ground-mount preference</li>
                <li>Approx. annual electricity usage (kWh) or bills</li>
                <li>Available roof area and any known restrictions</li>
                <li>Target start date and decision timeline</li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/business"
                  className="bg-white border border-brand-accent text-brand-navy px-8 py-4 rounded-full font-bold text-base hover:border-brand-navy transition-all text-center"
                >
                  Learn about business solar
                </Link>
                <Link
                  to="/wizard"
                  className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all text-center"
                >
                  Run savings estimates
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-brand-accent rounded-[2.5rem] p-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
                Also explore
              </div>
              <div className="space-y-3">
                <Link
                  to="/solar-panel-quotes"
                  className="block bg-brand-white border border-brand-accent rounded-2xl px-4 py-3 hover:border-brand-navy transition-colors"
                >
                  <div className="text-sm font-bold text-brand-navy">Solar panel quotes by city</div>
                </Link>
                <Link
                  to="/best-solar-installers"
                  className="block bg-brand-white border border-brand-accent rounded-2xl px-4 py-3 hover:border-brand-navy transition-colors"
                >
                  <div className="text-sm font-bold text-brand-navy">Best solar installers by city</div>
                </Link>
                <Link
                  to="/installers"
                  className="block bg-brand-white border border-brand-accent rounded-2xl px-4 py-3 hover:border-brand-navy transition-colors"
                >
                  <div className="text-sm font-bold text-brand-navy">Vetted installers directory</div>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CommercialSolarQuotesUK;

