import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-brand-white border-b border-brand-accent sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" aria-label="Solarpedia Home">
              <img src="/logo.png" alt="Solarpedia Logo" width="192" height="48" className="h-48 w-auto max-h-none" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/solar-panel-quotes" onClick={handleNavClick} className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Quotes</Link>
            <Link to="/best-solar-installers" onClick={handleNavClick} className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Local Installers</Link>
            <Link to="/education" onClick={handleNavClick} className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Education</Link>
            <Link to="/tools" onClick={handleNavClick} className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Tools</Link>
            <Link to="/business" onClick={handleNavClick} className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Business</Link>
            <Link to="/commercial-solar-quotes-uk" onClick={handleNavClick} className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Commercial</Link>
            <Link to="/wizard" className="bg-brand-navy text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-sm">
              Check Savings
            </Link>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-brand-navy"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-white border-b border-brand-accent py-4 px-4 space-y-4 shadow-lg">
          <Link to="/solar-panel-quotes" className="block text-brand-navy font-medium" onClick={handleNavClick}>Solar Quotes</Link>
          <Link to="/best-solar-installers" className="block text-brand-navy font-medium" onClick={handleNavClick}>Local Installers</Link>
          <Link to="/education" className="block text-brand-navy font-medium" onClick={handleNavClick}>Education</Link>
          <Link to="/tools" className="block text-brand-navy font-medium" onClick={handleNavClick}>Calculators & Tools</Link>
          <Link to="/business" className="block text-brand-navy font-medium" onClick={handleNavClick}>Business</Link>
          <Link to="/commercial-solar-quotes-uk" className="block text-brand-navy font-medium" onClick={handleNavClick}>Commercial Quotes</Link>
          <Link to="/wizard" className="block bg-brand-navy text-white px-6 py-2 rounded-full text-center font-semibold" onClick={handleNavClick}>
            Check Savings
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
