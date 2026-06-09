import React from 'react';
import { useParams } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';

const Legal: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  
  const getTitle = () => {
    switch (documentId) {
      case 'privacy': return 'Privacy Policy & GDPR';
      case 'terms': return 'Terms & Conditions';
      case 'cookies': return 'Cookie Policy';
      default: return 'Legal Information';
    }
  };

  usePageMetadata(
    getTitle(),
    'Read our legal documentation, privacy policy, and terms of service to understand how Solarpedia protects your data.'
  );

  return (
    <div className="bg-brand-white min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] p-10 md:p-16 border border-brand-accent shadow-sm">
          <h1 className="text-4xl font-serif font-bold text-brand-navy mb-8">{getTitle()}</h1>
          <div className="prose prose-brand max-w-none text-brand-muted">
            <p className="lead text-lg mb-8">
              Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </p>
            
            <p>
              At Solarpedia, we are committed to protecting your privacy and ensuring transparency in how we handle your data. 
              This document outlines our practices and your rights under UK law.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">1. Data Collection</h2>
            <p>
              We only collect data that is strictly necessary to provide you with accurate solar forecasts. 
              This includes anonymized property details and general location data (postcode sectors). 
              We do not sell your personal data to third parties.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">2. Our Impartiality</h2>
            <p>
              Solarpedia operates independently of any specific solar manufacturer or installer. 
              Our recommendations are algorithmically generated based on official MCS benchmarks and Ofgem price caps.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">3. Your Rights</h2>
            <p>
              Under GDPR, you have the right to request access to, correction of, or deletion of your personal data. 
              If you have consented to share your details with an installer partner, you may withdraw this consent at any time.
            </p>

            <p className="mt-12 text-sm">
              For full legal inquiries, please contact our data protection officer at <a href="mailto:legal@solarpedia.org.uk" className="text-brand-green font-bold hover:underline">legal@solarpedia.org.uk</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;