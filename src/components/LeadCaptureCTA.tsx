import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useWizardStore } from '../hooks/useWizardStore';

type LeadCaptureValues = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  propertyType: string;
  botField: string;
};

const FORM_NAME = 'get-3-free-solar-quotes';

function encode(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

const LeadCaptureCTA: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useWizardStore();

  const hidden = location.pathname === '/thanks';

  const defaultPropertyType = useMemo(() => {
    if (location.pathname.startsWith('/commercial')) return 'Commercial';
    return 'Residential';
  }, [location.pathname]);

  const [values, setValues] = useState<LeadCaptureValues>({
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    postcode: data.postcode || '',
    propertyType: data.propertyType === 'commercial' ? 'Commercial' : defaultPropertyType,
    botField: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (key: keyof LeadCaptureValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload: Record<string, string> = {
        'form-name': FORM_NAME,
        name: values.name,
        email: values.email,
        phone: values.phone,
        postcode: values.postcode,
        propertyType: values.propertyType,
        'bot-field': values.botField,
        page: location.pathname,
      };

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });

      navigate('/thanks');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (hidden) return null;

  return (
    <section className="py-20 bg-white border-t border-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy rounded-[3rem] p-10 md:p-14 text-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-4">
                Get quotes from vetted installers
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-5">
                Get 3 free solar quotes for your property
              </h2>
              <p className="text-white/80 text-base leading-relaxed max-w-xl">
                Tell us your postcode and property type so we can match you with the right local installer partners.
              </p>
            </div>

            <form
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={onSubmit}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8"
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <div className="hidden">
                <label htmlFor="bot-field">
                  Don’t fill this out:
                  <input id="bot-field" name="bot-field" value={values.botField} onChange={onChange('botField')} />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="lead-name" className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Name
                  </label>
                  <input
                    id="lead-name"
                    required
                    name="name"
                    value={values.name}
                    onChange={onChange('name')}
                    className="w-full bg-white text-brand-navy rounded-2xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="lead-email" className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Email
                  </label>
                  <input
                    id="lead-email"
                    required
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange('email')}
                    className="w-full bg-white text-brand-navy rounded-2xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Phone
                  </label>
                  <input
                    id="lead-phone"
                    required
                    name="phone"
                    value={values.phone}
                    onChange={onChange('phone')}
                    className="w-full bg-white text-brand-navy rounded-2xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="07xxx xxx xxx"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label htmlFor="lead-postcode" className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Postcode
                  </label>
                  <input
                    id="lead-postcode"
                    required
                    name="postcode"
                    value={values.postcode}
                    onChange={onChange('postcode')}
                    className="w-full bg-white text-brand-navy rounded-2xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="e.g., M1 1AE"
                    autoComplete="postal-code"
                  />
                </div>

                <div>
                  <label htmlFor="lead-property-type" className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Property Type
                  </label>
                  <select
                    id="lead-property-type"
                    required
                    name="propertyType"
                    value={values.propertyType}
                    onChange={onChange('propertyType')}
                    className="w-full bg-white text-brand-navy rounded-2xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              {error && <div className="mt-4 text-sm font-semibold text-brand-yellow">{error}</div>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full bg-brand-yellow text-brand-navy px-6 py-4 rounded-2xl font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? 'Submitting…' : 'Get 3 Free Quotes'}
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-white/70">
                <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> 100% Free</span>
                <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> No Obligation</span>
                <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Secure</span>
              </div>

              <p className="mt-4 text-[11px] text-white/60 leading-relaxed text-center">
                By submitting, you agree we can contact you and share your details with local installer partners.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureCTA;
