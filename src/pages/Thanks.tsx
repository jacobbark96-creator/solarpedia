import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { createBreadcrumbSchema } from '../lib/seo';

const Thanks: React.FC = () => {
  usePageMetadata({
    title: 'Thanks',
    description: 'We’ve received your details. We’ll be in touch with your solar quotes shortly.',
    path: '/thanks',
    noindex: true,
    robots: 'noindex, nofollow',
    schema: createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Thanks', path: '/thanks' },
    ]),
  });

  return (
    <div className="bg-brand-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-brand-accent rounded-[2.5rem] p-10 md:p-14 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-4">
            Submission received
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-6">
            Thanks — we’ll be in touch
          </h1>
          <p className="text-brand-muted text-lg leading-relaxed mb-10">
            We’ve received your details. A local installer partner will contact you with up to 3 quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              Back to Home
            </Link>
            <Link
              to="/installers"
              className="bg-white border border-brand-accent text-brand-navy px-8 py-4 rounded-full font-bold text-base hover:border-brand-navy transition-all"
            >
              Browse Installers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
