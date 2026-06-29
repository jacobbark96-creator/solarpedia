import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../../lib/seo';
import SystemSizeWidget from '../../components/widgets/SystemSizeWidget';

const SystemSizeEstimator: React.FC = () => {
  usePageMetadata({
    title: 'Solar Panel System Size Calculator UK',
    description: 'Calculate exactly how many solar panels you need for your UK home based on your annual electricity usage and target offset.',
    path: '/tools/system-size',
    keywords: 'solar panel size calculator, how many solar panels do i need, kWp calculator, solar roof space calculator',
    schema: [
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools' },
        { name: 'System Size Estimator', path: '/tools/system-size' },
      ]),
    ],
  });

  return (
    <div className="bg-brand-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/tools" 
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-green transition-colors mb-8 bg-white border border-brand-accent px-4 py-2 rounded-full shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to all tools
        </Link>
        <SystemSizeWidget />
      </div>
    </div>
  );
};

export default SystemSizeEstimator;
