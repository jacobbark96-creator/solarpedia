import React from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, MessageCircle, FileText, ChevronRight } from 'lucide-react';

import { usePageMetadata } from '../hooks/usePageMetadata';

const categories = [
  { name: 'Solar Basics', icon: BookOpen, count: 12 },
  { name: 'Costs & Financing', icon: FileText, count: 8 },
  { name: 'Myths & Facts', icon: MessageCircle, count: 15 },
  { name: 'Technical Guides', icon: Search, count: 10 },
];

const articles = [
  {
    title: 'Is Solar Actually Worth it in the UK? (2026 Edition)',
    excerpt: 'An impartial look at the current energy landscape, installation costs, and smart export guarantees.',
    category: 'Analysis',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80' // Solar panels on roof
  },
  {
    title: 'Battery Storage: Do You Really Need It?',
    excerpt: 'Comparing the ROI of solar-only vs solar + battery systems for typical UK households.',
    category: 'Guide',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=800&q=80' // High tech battery/energy
  },
  {
    title: 'The Smart Export Guarantee (SEG) Explained',
    excerpt: 'How much can you actually earn back from the grid? We compare the best export tariffs available today.',
    category: 'Finance',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' // Charts/Finance
  }
];

const Education: React.FC = () => {
  usePageMetadata(
    'Solar Education Hub',
    'Expert guidance, data-driven analysis, and unbiased advice to help you navigate the UK solar market.'
  );
  return (
    <div className="bg-brand-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-brand-navy mb-4">Solar Education Hub</h1>
          <p className="text-brand-muted max-w-2xl mx-auto">Expert guidance, data-driven analysis, and unbiased advice to help you navigate the UK solar market.</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {categories.map((cat) => (
            <button key={cat.name} className="bg-white p-6 rounded-3xl border border-brand-accent hover:border-brand-navy transition-all text-left group">
              <cat.icon className="h-8 w-8 text-brand-navy mb-4 group-hover:text-brand-green transition-colors" />
              <h3 className="font-bold text-brand-navy">{cat.name}</h3>
              <p className="text-xs text-brand-muted uppercase font-bold tracking-wider">{cat.count} Articles</p>
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <div className="bg-brand-navy rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2">
              <img 
                src={articles[0].image} 
                alt="Featured" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs mb-4">Featured Analysis</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                {articles[0].title}
              </h2>
              <p className="text-brand-accent text-lg mb-8 leading-relaxed">
                {articles[0].excerpt}
              </p>
              <button className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-brand-yellow pb-1 hover:text-brand-yellow transition-colors w-fit">
                Read Full Analysis
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <motion.div 
              key={article.title}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden border border-brand-accent shadow-sm flex flex-col"
            >
              <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-brand-muted">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-navy mb-4 leading-snug">
                  {article.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                <button className="text-brand-navy font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
          
          {/* Impartiality Card */}
          <div className="bg-brand-green/5 border-2 border-dashed border-brand-green/30 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
            <ShieldCheckIcon className="h-12 w-12 text-brand-green mb-4" />
            <h3 className="text-xl font-serif font-bold text-brand-navy mb-2">Our Impartiality Promise</h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-6">
              We never accept payments for editorial rankings. Our advice is based solely on data and consumer interests.
            </p>
            <button className="font-bold text-brand-green underline">Learn how we stay neutral</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default Education;
