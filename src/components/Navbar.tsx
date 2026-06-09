import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-brand-white border-b border-brand-accent sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Solarpedia Logo" className="h-9 w-auto" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/education" className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Education</Link>
            <Link to="/business" className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Business</Link>
            <Link to="/installers" className="text-brand-navy hover:text-brand-green text-sm font-medium transition-colors">Installers</Link>
            <Link to="/wizard" className="bg-brand-navy text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-sm">
              Check Savings
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-navy">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-white border-b border-brand-accent py-4 px-4 space-y-4 shadow-lg">
          <Link to="/education" className="block text-brand-navy font-medium" onClick={() => setIsOpen(false)}>Education</Link>
          <Link to="/business" className="block text-brand-navy font-medium" onClick={() => setIsOpen(false)}>Business</Link>
          <Link to="/installers" className="block text-brand-navy font-medium" onClick={() => setIsOpen(false)}>Installers</Link>
          <Link to="/wizard" className="block bg-brand-navy text-white px-6 py-2 rounded-full text-center font-semibold" onClick={() => setIsOpen(false)}>
            Check Savings
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
