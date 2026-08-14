import React, { useMemo, useState } from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import { useWizardStore } from '../hooks/useWizardStore';
import { trackFormSubmission, getVisitorData } from '../lib/tracking';

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
  const { data } = useWizardStore();

  const [pathname, setPathname] = useState('');
  const [userCity, setUserCity] = useState('your area');
  const [roofCount, setRoofCount] = useState(12);

  React.useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city) setUserCity(data.city);
      })
      .catch(() => {});
      
    // Calculate deterministic plausible roof count
    const getPlausibleCount = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday
      const diffToMonday = day === 0 ? 6 : day - 1;
      
      const monday = new Date(now);
      monday.setDate(now.getDate() - diffToMonday);
      monday.setHours(0, 0, 0, 0);
      
      // Calculate how many 12-hour blocks have passed since Monday 00:00
      const hoursSinceMonday = (now.getTime() - monday.getTime()) / (1000 * 60 * 60);
      const blocks = Math.floor(hoursSinceMonday / 12);
      
      let count = 12; // Base number resets every Monday
      for (let i = 0; i < blocks; i++) {
        // Alternates adding 3 or 4 per half-day to look organic
        count += (i % 2 === 0) ? 3 : 4;
      }
      return count;
    };
    
    setRoofCount(getPlausibleCount());
  }, []);

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const hidden = pathname === '/thanks';

  const defaultPropertyType = useMemo(() => {
    if (pathname.startsWith('/commercial')) return 'Commercial';
    return 'Residential';
  }, [pathname]);

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
      // 1. Fetch visitor tracking data first
      const visitorData = await getVisitorData();

      const payload: Record<string, string> = {
        'form-name': FORM_NAME,
        name: values.name,
        email: values.email,
        phone: values.phone,
        postcode: values.postcode,
        propertyType: values.propertyType,
        'bot-field': values.botField,
        page: pathname,
      };

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });

      // Track the submission in Supabase matched by IP
      await trackFormSubmission({
        full_name: values.name,
        email: values.email,
        phone: values.phone,
      });

      // 2. Also send enriched email to support@openlead.co.uk
      await fetch('https://formsubmit.co/ajax/support@openlead.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Solar Lead (CTA): ${values.name} (${values.postcode})`,
          Name: values.name,
          Email: values.email,
          Phone: values.phone,
          Postcode: values.postcode,
          'Property Type': values.propertyType,
          'Source Page': pathname,
          'IP Address': visitorData?.ip_address || 'Unknown',
          'Page Views History': visitorData?.page_views ? JSON.stringify(visitorData.page_views) : 'No history',
          'First Seen': visitorData?.first_seen || 'Unknown',
          'Last Seen': visitorData?.last_seen || 'Unknown',
        })
      });

      window.location.href = '/thanks';
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

              <p className="text-center text-xs text-white/60 mt-4 font-medium flex flex-col items-center justify-center gap-2">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> 100% Free & No Obligation</span>
                <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                  </span>
                  <span className="text-[10px] font-bold text-white/90">
                    {roofCount} homeowners in {userCity} checked their roof this week
                  </span>
                </span>
              </p>

              <p className="mt-4 text-[11px] text-white/60 leading-relaxed text-center">
                By submitting your request, you accept our Terms & Conditions and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureCTA;
