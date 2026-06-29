import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, BookOpen, MessageCircle, FileText, ChevronRight, Newspaper, Battery, Sun, Zap } from 'lucide-react';
import { useLiveNews } from '../hooks/useLiveNews';

import { usePageMetadata } from '../hooks/usePageMetadata';
import { buildAbsoluteUrl, createBreadcrumbSchema, createCollectionPageSchema } from '../lib/seo';
import { ARTICLES_DB } from '../data/articles';

const categories = [
  { name: 'Solar Panels', icon: Sun, count: 2 },
  { name: 'Solar Batteries', icon: Battery, count: 2 },
  { name: 'Export Tariffs', icon: Zap, count: 2 },
  { name: 'Costs & Financing', icon: FileText, count: 2 },
  { name: 'Analysis', icon: Search, count: 2 },
  { name: 'Myths & Facts', icon: MessageCircle, count: 1 },
  { name: 'Technical Guides', icon: BookOpen, count: 1 },
];

const articles = [
  {
    title: ARTICLES_DB['is-solar-worth-it-uk'].title,
    slug: 'is-solar-worth-it-uk',
    excerpt: 'An impartial look at the current energy landscape, installation costs, and smart export guarantees.',
    category: 'Analysis',
    readTime: ARTICLES_DB['is-solar-worth-it-uk'].readTime,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80' // Solar panels on roof
  },
  {
    title: ARTICLES_DB['solar-myths-explained'].title,
    slug: 'solar-myths-explained',
    excerpt: 'We debunk the most common misconceptions about solar panels in the UK climate.',
    category: 'Myths & Facts',
    readTime: ARTICLES_DB['solar-myths-explained'].readTime,
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=800&q=80' // High tech battery/energy
  },
  {
    title: ARTICLES_DB['best-export-tariffs-uk'].title,
    slug: 'best-export-tariffs-uk',
    excerpt: 'Octopus Energy dominates the UK export market in 2026. Compare the best export tariffs available today.',
    category: 'Export Tariffs',
    readTime: ARTICLES_DB['best-export-tariffs-uk'].readTime,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' // Charts/Finance
  },
  {
    title: ARTICLES_DB['solar-panel-installation-cost-uk'].title,
    slug: 'solar-panel-installation-cost-uk',
    excerpt: 'A practical breakdown of what actually drives install cost, from system size to batteries and roof complexity.',
    category: 'Costs & Financing',
    readTime: ARTICLES_DB['solar-panel-installation-cost-uk'].readTime,
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: ARTICLES_DB['lfp-vs-nmc-solar-batteries'].title,
    slug: 'lfp-vs-nmc-solar-batteries',
    excerpt: 'LFP is the dominant and recommended home battery chemistry. It offers 6,000+ cycles and 15-20 years of life.',
    category: 'Solar Batteries',
    readTime: ARTICLES_DB['lfp-vs-nmc-solar-batteries'].readTime,
    image: 'https://images.unsplash.com/photo-1592833159117-ac790d406391?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: ARTICLES_DB['solar-battery-sizing-guide'].title,
    slug: 'solar-battery-sizing-guide',
    excerpt: 'The ideal solar battery size depends on your evening electricity usage and solar array size.',
    category: 'Solar Batteries',
    readTime: ARTICLES_DB['solar-battery-sizing-guide'].readTime,
    image: 'https://images.unsplash.com/photo-1620800632597-9e0d16568eb2?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: ARTICLES_DB['solar-panel-bird-proofing'].title,
    slug: 'solar-panel-bird-proofing',
    excerpt: 'Bird proofing prevents pigeons from nesting under solar panels, which can cause cable damage and noise.',
    category: 'Solar Panels',
    readTime: ARTICLES_DB['solar-panel-bird-proofing'].readTime,
    image: 'https://images.unsplash.com/photo-1592833159057-6dd15bd0b852?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: ARTICLES_DB['solar-panel-cleaning-maintenance'].title,
    slug: 'solar-panel-cleaning-maintenance',
    excerpt: 'In the UK, natural rainfall cleans most residential solar panels effectively. Learn when manual cleaning is needed.',
    category: 'Solar Panels',
    readTime: ARTICLES_DB['solar-panel-cleaning-maintenance'].readTime,
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: ARTICLES_DB['commercial-solar-for-business-uk'].title,
    slug: 'commercial-solar-for-business-uk',
    excerpt: 'A buyer-focused guide to commercial solar economics, procurement, and what to compare in an installer proposal.',
    category: 'Commercial',
    readTime: ARTICLES_DB['commercial-solar-for-business-uk'].readTime,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: ARTICLES_DB['planning-permission-for-solar-uk'].title,
    slug: 'planning-permission-for-solar-uk',
    excerpt: 'What usually falls under permitted development, what can trigger extra checks, and why it pays to confirm early.',
    category: 'Technical Guides',
    readTime: ARTICLES_DB['planning-permission-for-solar-uk'].readTime,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80'
  }
];

const Education: React.FC = () => {
  usePageMetadata({
    title: 'Solar Education Hub',
    description:
      'Expert guidance, data-driven analysis, and unbiased advice to help you navigate the UK solar market.',
    path: '/education',
    keywords:
      'solar education UK, solar guides UK, solar panel costs UK, battery storage UK, commercial solar UK',
    schema: [
      createCollectionPageSchema({
        name: 'Solar Education Hub',
        description:
          'A collection of UK solar guides, explainers, and commercial intent content from Solarpedia.',
        path: '/education',
        about: 'Solar energy in the United Kingdom',
      }),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Solar education articles',
        itemListElement: articles.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: article.title,
          url: buildAbsoluteUrl(`/education/article/${article.slug}`),
        })),
      },
      createBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Education', path: '/education' },
      ]),
    ],
  });

  const { news: liveNews, loading: newsLoading } = useLiveNews();

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
              <h2 className="font-bold text-brand-navy text-lg">{cat.name}</h2>
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
                width="800"
                height="600"
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
              <Link to={`/education/article/${articles[0].slug}`} className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-brand-yellow pb-1 hover:text-brand-yellow transition-colors w-fit">
                Read Full Analysis
                <ChevronRight className="h-5 w-5" />
              </Link>
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
              <img src={article.image} alt={article.title} width="800" height="600" className="h-48 w-full object-cover" />
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
                <Link to={`/education/article/${article.slug}`} className="text-brand-navy font-bold flex items-center gap-1 hover:gap-2 transition-all w-fit">
                  Read More <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Latest Updates & News Section */}
        <div className="mt-24 pt-24 border-t border-brand-accent">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-12 w-12 rounded-2xl bg-brand-navy flex items-center justify-center">
              <Newspaper className="h-6 w-6 text-brand-yellow" />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-navy">Latest Market Updates</h2>
              <p className="text-brand-muted">Real-time solar news, grant changes, and policy updates.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsLoading ? (
              // Skeleton Loaders
              [1, 2].map(i => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-brand-accent shadow-sm animate-pulse">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 w-full bg-gray-200 rounded mb-8"></div>
                  <div className="h-20 w-full bg-gray-100 rounded"></div>
                </div>
              ))
            ) : (
              liveNews.map((news) => (
                <a key={news.id} href={news.link} target="_blank" rel="noopener noreferrer">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-[2.5rem] border border-brand-accent shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-4 py-1.5 rounded-full bg-brand-navy text-white text-[10px] font-bold uppercase tracking-widest">
                        {news.category}
                      </span>
                      <span className="text-xs font-bold text-brand-muted">{news.date}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-navy mb-4">{news.title}</h3>
                    <p className="text-brand-muted leading-relaxed mb-8 text-lg flex-grow">
                      {news.summary}
                    </p>
                    <div className="prose prose-sm text-brand-muted">
                      <p>
                        This update reflects the latest developments in the UK renewable sector as of {news.date}. 
                        Read more on the source article to ensure your solar journey is guided by the most accurate intelligence available.
                      </p>
                    </div>
                  </motion.div>
                </a>
              ))
            )}
          </div>
        </div>

        {/* Impartiality Section */}
        <div id="impartiality" className="mt-24 bg-brand-navy rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-green/10 blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <ShieldCheckIcon className="h-16 w-16 text-brand-yellow mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-4">Our Impartiality Promise</h2>
            <p className="text-brand-accent text-lg mb-8 opacity-80">
              We never accept payments for editorial rankings or content placement. 
              Our advice is based solely on data, consumer interests, and technical feasibility.
            </p>
            <Link to="/legal/privacy" className="inline-block bg-white text-brand-navy px-8 py-3 rounded-full font-bold hover:bg-brand-yellow transition-colors">
              Read Our Transparency Policy
            </Link>
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
