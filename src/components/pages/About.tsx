import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, Database, Info, Building2, Users, Handshake, ChevronRight } from 'lucide-react';
import { Link } from '../Link';
import { AUTHORS } from '../../data/articles';

const About: React.FC = () => {
  return (
    <div className="bg-brand-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-white border-b border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">
              About Solarpedia
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-navy mb-8 leading-tight">
              Impartial UK solar intelligence, <span className="text-brand-green italic">democratized.</span>
            </h1>
            <p className="text-xl text-brand-muted leading-relaxed">
              Solarpedia was built to solve a single problem: the lack of unbiased, data-driven financial guidance in the UK solar market. We are not installers—we are a central hub for research, cost-modeling, and vetted installer discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Business Model & Transparency */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 text-brand-navy text-[10px] font-bold uppercase tracking-wider mb-6">
                <Handshake className="h-4 w-4" />
                Transparency Report
              </div>
              <h2 className="text-4xl font-serif font-bold text-brand-navy mb-6">How we fund this platform</h2>
              <p className="text-lg text-brand-muted leading-relaxed mb-8">
                To keep Solarpedia free for homeowners and businesses, we operate on a <strong>referral-fee model</strong>. When you request a quote through our platform, we route your enquiry to vetted local installers who pay us a small fixed fee for the lead.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-brand-accent shadow-sm">
                  <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-brand-green" />
                    No Commission Bias
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    Unlike traditional sales agents, we do not take a percentage cut of the final installation price. This means we have no financial incentive to push you toward more expensive systems or specific brands.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-brand-accent shadow-sm">
                  <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center gap-2">
                    <Scale className="h-5 w-5 text-brand-yellow" />
                    Neutrality First
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    Our data methodology remains strictly separate from our commercial partnerships. If our models show that solar isn't a good investment for your property, we will tell you—even if it means losing a potential referral.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-brand-navy rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold mb-8">Corporate Details</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Building2 className="h-6 w-6 text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white">Company Registration</h3>
                      <p className="text-brand-accent text-sm leading-relaxed opacity-70">
                        Solarpedia UK is a trading name of [Your Company Name Ltd]. <br/>
                        Registered in England & Wales. <br/>
                        Companies House Number: <span className="text-white font-mono">[00000000]</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Database className="h-6 w-6 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white">Data Protection</h3>
                      <p className="text-brand-accent text-sm leading-relaxed opacity-70">
                        We are fully GDPR compliant and registered with the Information Commissioner's Office (ICO). Your data is only shared with the specific installers you choose to hear from.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10">
                  <p className="text-xs text-brand-accent leading-relaxed opacity-60 mb-6">
                    "Our goal is to be the most trusted starting point for any UK solar journey. By combining Met Office irradiance data with real-time Ofgem price caps, we provide the clarity that the industry has lacked for too long."
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={AUTHORS['solarpedia-team'].image} 
                      alt="Team Lead" 
                      className="h-10 w-10 rounded-full border border-white/20"
                    />
                    <div>
                      <div className="text-sm font-bold">Solarpedia Analysis Team</div>
                      <div className="text-[10px] uppercase tracking-wider opacity-60">Lead Researchers</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Experts */}
      <section className="py-24 bg-white border-y border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-widest mb-3">
              <Users className="h-4 w-4" />
              The Analysis Team
            </div>
            <h2 className="text-4xl font-serif font-bold text-brand-navy">Meet the experts behind the data</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Object.values(AUTHORS).map((author) => (
              <div key={author.id} className="bg-brand-white rounded-[2.5rem] p-8 border border-brand-accent flex flex-col md:flex-row gap-8 items-start">
                {author.image && (
                  <img 
                    src={author.image} 
                    alt={author.name} 
                    className="h-32 w-32 rounded-3xl object-cover border-4 border-white shadow-sm flex-shrink-0"
                  />
                )}
                <div>
                  <div className="flex flex-col gap-1 mb-4">
                    <h3 className="text-2xl font-serif font-bold text-brand-navy">{author.name}</h3>
                    <p className="text-sm font-bold text-brand-green uppercase tracking-wider">{author.role}</p>
                    <p className="text-[10px] font-bold text-brand-muted">{author.credentials}</p>
                  </div>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-brand-navy mb-6">Ready to see your own data?</h2>
          <p className="text-brand-muted text-lg mb-10 max-w-xl mx-auto">
            Our savings wizard uses the same methodology described above to generate a tailored estimate for your specific property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/wizard" className="bg-brand-navy text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Start Free Estimate
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link to="/education" className="bg-white border border-brand-accent text-brand-navy px-10 py-5 rounded-full font-bold text-lg hover:border-brand-navy transition-all">
              Explore Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
