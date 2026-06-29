import React from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, ShieldCheck, Factory, Warehouse, Building, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { usePageMetadata } from '../hooks/usePageMetadata';
import { createBreadcrumbSchema, createServiceSchema } from '../lib/seo';

const Business: React.FC = () => {
  usePageMetadata({
    title: 'Commercial Solar Solutions',
    description:
      'Independent ROI analysis for warehouses, factories, and office blocks. Lock in energy costs and meet ESG targets.',
    path: '/business',
    keywords:
      'commercial solar UK, business solar solutions, warehouse solar UK, factory solar panels, office solar ROI',
    schema: [
      createServiceSchema({
        name: 'Commercial Solar Solutions',
        description:
          'Independent commercial solar guidance for UK warehouses, factories, offices, and other business premises.',
        path: '/business',
        serviceType: 'Commercial solar guidance',
      }),
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Business Solar', path: '/business' },
      ]),
    ],
  });
  return (
    <div className="bg-brand-white min-h-screen">
      {/* Hero */}
      <section className="bg-brand-navy text-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-sm font-semibold mb-6">
                <Building2 className="h-4 w-4" />
                <span>Commercial Solar Solutions</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
                Decarbonise your business with <span className="text-brand-yellow">data-driven</span> solar insights.
              </h1>
              <p className="text-xl text-brand-accent leading-relaxed mb-10 max-w-xl">
                Independent ROI analysis for warehouses, factories, and office blocks. Lock in energy costs and meet ESG targets without the sales pitch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/wizard" className="bg-brand-yellow text-brand-navy px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  Get Commercial Estimate
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/commercial-solar-quotes-uk" className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center">
                  Get Commercial Quotes
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" 
                alt="Commercial Solar"
                width="1200"
                height="800"
                className="rounded-[2.5rem] shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-brand-accent text-brand-navy">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-10 w-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-muted uppercase">Typical ROI</p>
                    <p className="text-xl font-serif font-bold">18.5% - 24%</p>
                  </div>
                </div>
                <p className="text-[10px] text-brand-muted">Based on current UK commercial energy prices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-brand-accent bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Commercial Solar Quotes UK',
                desc: 'Move from research to supplier outreach with postcode-routed commercial quote pages.',
                link: '/commercial-solar-quotes-uk',
                cta: 'View quote page',
              },
              {
                title: 'Commercial Solar Article',
                desc: 'Read what matters most for UK business solar procurement, forecasting, and operational fit.',
                link: '/education/article/commercial-solar-for-business-uk',
                cta: 'Read the guide',
              },
              {
                title: 'Installer Discovery',
                desc: 'Search the installer directory and shortlist MCS-certified providers before requesting proposals.',
                link: '/installers',
                cta: 'Browse installers',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-brand-accent bg-brand-white p-6">
                <h2 className="text-2xl font-serif font-bold text-brand-navy mb-3">{item.title}</h2>
                <p className="text-brand-muted leading-relaxed mb-5">{item.desc}</p>
                <Link to={item.link} className="inline-flex items-center gap-2 text-brand-navy font-bold hover:text-brand-green transition-colors">
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Types */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-brand-navy mb-4">Tailored for your industry</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">We use specific usage patterns for different business types to ensure estimate accuracy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Warehouse, name: 'Warehousing', roi: '3.5 - 5 Years', feature: 'Large roof area optimization' },
            { icon: Factory, name: 'Manufacturing', roi: '4 - 6 Years', feature: 'High daytime usage matching' },
            { icon: Building, name: 'Office Blocks', roi: '5 - 8 Years', feature: 'ESG compliance reporting' },
          ].map((type) => (
            <div key={type.name} className="bg-white p-8 rounded-[2rem] border border-brand-accent shadow-sm hover:shadow-md transition-all">
              <type.icon className="h-10 w-10 text-brand-navy mb-6" />
              <h3 className="text-xl font-serif font-bold text-brand-navy mb-2">{type.name}</h3>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-brand-accent">
                <span className="text-sm text-brand-muted">Est. Payback</span>
                <span className="font-bold text-brand-green">{type.roi}</span>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">{type.feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-brand-white border-t border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl font-serif font-bold text-brand-navy mb-4">What commercial buyers need to evaluate</h2>
            <p className="text-brand-muted text-lg leading-relaxed">
              Business buyers usually care about more than generation alone. Procurement readiness, export constraints, site access, and installation phasing all influence whether a commercial solar project gets approved quickly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Load profile',
                desc: 'Daytime demand is one of the biggest drivers of value because it determines how much solar power you can use on site.',
              },
              {
                title: 'Roof condition',
                desc: 'Age, structure, waterproofing, and access can change project design, cost, and programme risk.',
              },
              {
                title: 'Export limits',
                desc: 'DNO constraints and metering arrangements can materially affect final system size and commercial returns.',
              },
              {
                title: 'Procurement route',
                desc: 'CAPEX, finance, or PPA structures each create different approval pathways and risk considerations.',
              },
              {
                title: 'Operational disruption',
                desc: 'Installers should explain crane access, working hours, electrical shutdown windows, and health-and-safety sequencing.',
              },
              {
                title: 'Aftercare and monitoring',
                desc: 'Commercial systems need reporting, fault visibility, and maintenance expectations agreed up front.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-brand-accent bg-white p-6">
                <h3 className="text-xl font-serif font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="text-brand-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax & Benefits */}
      <section className="bg-brand-white py-24 border-t border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-12 border border-brand-accent flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-serif font-bold text-brand-navy mb-8">Financial & Tax Efficiency</h2>
              <div className="space-y-6">
                {[
                  { title: 'Super-deduction Capital Allowance', desc: 'Claim up to 130% capital allowance on solar plant and machinery.' },
                  { title: 'VAT for Businesses', desc: 'Understanding VAT recovery on installation and maintenance costs.' },
                  { title: 'Smart Export Guarantee (SEG)', desc: 'Generate revenue by selling excess energy back to the grid.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy">{item.title}</h4>
                      <p className="text-sm text-brand-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-brand-navy rounded-3xl p-8 text-white">
              <h3 className="text-xl font-serif font-bold mb-6">Commercial Savings Calculator</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span>Annual Energy Bill</span>
                  <span className="font-bold">£25,000+</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-yellow w-3/4" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Potential Annual Savings</span>
                  <span className="font-bold text-brand-yellow">£18,750</span>
                </div>
              </div>
              <Link to="/wizard" className="w-full bg-white text-brand-navy py-4 rounded-full font-bold hover:bg-brand-accent transition-all flex items-center justify-center">
                Run Detailed ROI Simulation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;
