import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const handleFooterClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <img src="/logo.png" alt="Solarpedia Logo" className="h-40 w-auto brightness-0 invert" />
            </Link>
            <p className="text-brand-accent text-sm leading-relaxed mb-6">
              Independent UK solar insights, cost estimates and savings forecasts powered by real energy and regional data.
            </p>
            <div className="flex items-center gap-2 text-brand-yellow text-sm font-semibold">
              <ShieldCheck className="h-5 w-5" />
              <span>Impartial advice you can trust</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-brand-accent text-sm">
              <li><Link to="/solar-panel-quotes" onClick={handleFooterClick} className="hover:text-white transition-colors">Get Solar Quotes</Link></li>
              <li><Link to="/best-solar-installers" onClick={handleFooterClick} className="hover:text-white transition-colors">Best Solar Installers</Link></li>
              <li><Link to="/education" onClick={handleFooterClick} className="hover:text-white transition-colors">Education Hub</Link></li>
              <li><Link to="/business" onClick={handleFooterClick} className="hover:text-white transition-colors">Solar for Business</Link></li>
              <li><Link to="/commercial-solar-quotes-uk" onClick={handleFooterClick} className="hover:text-white transition-colors">Commercial Quotes UK</Link></li>
              <li><Link to="/installers" onClick={handleFooterClick} className="hover:text-white transition-colors">Vetted Installers</Link></li>
              <li><Link to="/wizard" onClick={handleFooterClick} className="hover:text-white transition-colors">Savings Wizard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-brand-accent text-sm">
              <li><Link to="/education#impartiality" onClick={handleFooterClick} className="hover:text-white transition-colors">How we stay impartial</Link></li>
              <li><Link to="/education" onClick={handleFooterClick} className="hover:text-white transition-colors">Data methodology</Link></li>
              <li><Link to="/education/article/solar-myths-explained" onClick={handleFooterClick} className="hover:text-white transition-colors">Solar myths explained</Link></li>
              <li><Link to="/legal/privacy" onClick={handleFooterClick} className="hover:text-white transition-colors">Privacy & GDPR</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-brand-accent text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>hello@solarpedia.co.uk</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>0800 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between text-sm text-brand-accent">
          <div className="flex flex-col gap-4 lg:max-w-2xl">
            <p>© {new Date().getFullYear()} Solarpedia UK. All rights reserved. Registered in England & Wales.</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link to="/legal/terms" onClick={handleFooterClick} className="hover:text-white transition-colors">Terms</Link>
              <Link to="/legal/privacy" onClick={handleFooterClick} className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/legal/cookies" onClick={handleFooterClick} className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:justify-end">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent/80">Proudly built by</span>
            <img
              src="/kairo-studio-logo.png"
              alt="Kairo Studio"
              className="h-12 w-auto brightness-0 invert opacity-90"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
