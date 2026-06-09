import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Clock } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';

const currentMonth = new Date().toLocaleString('default', { month: 'long' });
const currentYear = new Date().getFullYear();

const ARTICLES_DB: Record<string, any> = {
  'solar-myths-explained': {
    title: 'Solar Myths Explained: Separating Fact from Fiction',
    category: 'Myths & Facts',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '5 min read',
    content: `
      <h2>Myth 1: Solar panels don't work in the UK because it's always cloudy</h2>
      <p>This is perhaps the most common misconception. Solar panels require light, not heat, to generate electricity. Modern Tier-1 solar panels are highly efficient at converting diffuse light (the light you get on a cloudy day) into energy. While production is highest on sunny summer days, a properly sized system will still generate significant energy throughout the British winter.</p>
      
      <h2>Myth 2: Solar panels are too expensive to ever pay for themselves</h2>
      <p>With the current Ofgem price cap and the falling wholesale cost of solar hardware, the average payback period in the UK is now between 7 and 9 years. After this period, the electricity generated is essentially free, providing a strong return on investment over the 25+ year lifespan of the panels.</p>
      
      <h2>Myth 3: I need planning permission</h2>
      <p>For the vast majority of residential properties in the UK, solar panel installation falls under "Permitted Development" rights, meaning no planning permission is required. Exceptions include listed buildings, properties in conservation areas, and some flat roofs.</p>
    `
  },
  'is-solar-worth-it-uk': {
    title: `Is Solar Actually Worth it in the UK? (${currentYear} Edition)`,
    category: 'Analysis',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '8 min read',
    content: `
      <p>The short answer is: for most homeowners with an unshaded South, East, or West-facing roof, yes.</p>
      <h2>The Financial Reality of ${currentYear}</h2>
      <p>Energy prices remain historically high. With the latest Ofgem price cap at ~24.67p/kWh, every unit of electricity you generate and use yourself is a direct saving. Additionally, the Smart Export Guarantee (SEG) allows you to sell excess energy back to the grid, often at rates around 15p/kWh.</p>
      <h2>The Role of Battery Storage</h2>
      <p>In ${currentYear}, pairing solar with a battery is more popular than ever. It allows you to store the energy generated during the day for use during peak evening hours, pushing self-consumption rates from around 40% to over 75%.</p>
    `
  },
  'seg-explained': {
    title: 'The Smart Export Guarantee (SEG) Explained',
    category: 'Finance',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '10 min read',
    content: `
      <h2>What is the SEG?</h2>
      <p>The Smart Export Guarantee (SEG) is a government-backed initiative that requires large energy suppliers to pay you for the renewable electricity you export to the National Grid.</p>
      
      <h2>How much can you earn?</h2>
      <p>Tariffs vary wildly between suppliers. In 2026, the best rates offer up to 15p per kWh, while the lowest offer barely 1p. It is crucial to shop around. If you combine your solar with a specific energy provider's EV or battery tariff, you might even secure higher export rates during specific times of the day.</p>
      
      <h2>How to apply</h2>
      <p>To qualify, your installation must be MCS certified, and you must have a smart meter capable of taking half-hourly readings. You do not have to buy your electricity from the same company that pays your SEG, though some companies offer better rates if you do.</p>
    `
  }
};

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? ARTICLES_DB[slug] : null;

  usePageMetadata(
    article?.title || 'Article Not Found',
    article ? 'Read the full analysis and expert breakdown on Solarpedia.' : ''
  );

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-white">
        <h1 className="text-3xl font-serif font-bold text-brand-navy mb-4">Article Not Found</h1>
        <Link to="/education" className="text-brand-green font-bold hover:underline">Return to Education Hub</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-white min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/education" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-navy transition-colors mb-10 font-medium text-sm">
          <ChevronLeft className="h-4 w-4" />
          Back to Education Hub
        </Link>

        <article className="bg-white rounded-[2rem] p-10 md:p-16 border border-brand-accent shadow-sm">
          <div className="mb-10">
            <span className="px-3 py-1 bg-brand-green/10 text-brand-green font-bold text-[10px] uppercase tracking-widest rounded-full mb-6 inline-block">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy leading-tight mb-8">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-brand-muted font-medium border-y border-brand-accent py-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>
          </div>

          <div 
            className="prose prose-brand max-w-none text-brand-muted prose-headings:text-brand-navy prose-headings:font-serif prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default Article;