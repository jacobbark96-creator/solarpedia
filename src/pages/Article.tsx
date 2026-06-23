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
  },
  'solar-panel-installation-cost-uk': {
    title: `Solar Panel Installation Cost in the UK (${currentYear})`,
    category: 'Costs & Financing',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '7 min read',
    content: `
      <p>Solar pricing in the UK varies more than many homeowners expect. The headline figure you see online is rarely the amount you will actually pay once system size, scaffolding, inverter choice, and battery storage are factored in.</p>

      <p>For a typical residential installation, the biggest price drivers are usable roof space, the amount of electricity you want to offset, and whether you want battery storage included from day one.</p>

      <h2>What actually drives system cost?</h2>
      <p>The main variables are panel count, inverter specification, roof complexity, and labour. A simple two-storey roof with good access is almost always cheaper per kWp than a smaller or more awkward site.</p>

      <p>Battery storage can materially improve self-consumption, but it also increases the upfront spend. That means the lowest-cost system is not always the best long-term value, and the highest-spec system is not always the fastest payback.</p>

      <h2>Why quotes can differ so much</h2>
      <p>Installer quotes often differ because one includes extras that another leaves out. Bird protection, monitoring upgrades, EV charger integration, and warranty cover can all move the final price. Always compare the full scope, not just the headline total.</p>

      <p>The best way to judge value is to compare the expected annual generation, warranty terms, workmanship cover, and installation timeline alongside the quote total.</p>
    `
  },
  'battery-storage-worth-it-uk': {
    title: `Is Battery Storage Worth It in the UK? (${currentYear})`,
    category: 'Analysis',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '6 min read',
    content: `
      <p>Battery storage is one of the fastest-growing add-ons in UK solar, but it is not automatically the right answer for every property. The value of a battery depends on when you use electricity, how much solar you export, and what tariff you are on.</p>

      <p>Homes with strong evening demand often benefit the most. Without a battery, a large share of midday solar generation may be exported to the grid. With a battery, more of that energy can be shifted into the evening when imported electricity is more valuable.</p>

      <h2>When a battery makes the most sense</h2>
      <p>A battery tends to perform better when your household uses a lot of electricity after the sun goes down, or when you are pairing solar with time-of-use tariffs, an EV, or home heating loads that can be shifted intelligently.</p>

      <p>It can be less compelling if you are at home during the day and already self-consume a large proportion of your solar generation without storage.</p>

      <h2>What to compare before buying</h2>
      <p>Do not just compare headline battery size. Check usable capacity, warranty cycles, round-trip efficiency, backup functionality, and how well the battery integrates with the inverter and your tariff strategy.</p>

      <p>The right battery can improve self-consumption significantly, but the financial case should still be judged against its added cost and expected lifespan.</p>
    `
  },
  'commercial-solar-for-business-uk': {
    title: 'Commercial Solar for UK Businesses: What Matters Most',
    category: 'Commercial',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '9 min read',
    content: `
      <p>Commercial solar is a different proposition from domestic solar. The roof area is usually larger, the daytime demand profile is often stronger, and the project economics can be significantly better when the electricity is consumed on-site.</p>

      <p>That said, commercial projects also introduce extra layers of complexity. Structural surveys, landlord permissions, export constraints, metering arrangements, and procurement approvals can all affect the timeline and final design.</p>

      <h2>Why business solar can stack up well</h2>
      <p>Many businesses consume the most electricity during the day, which means they naturally self-consume a high proportion of solar generation. That improves the value of every kWh produced and often shortens payback periods.</p>

      <p>Warehouses, schools, offices, farms, and retail premises can all be strong candidates if roof condition, access, and electrical infrastructure are suitable.</p>

      <h2>Questions every business should ask</h2>
      <p>Before moving ahead, ask for a clear generation forecast, export assumptions, maintenance expectations, and a breakdown of any switchgear or grid-connection work. A good proposal should also explain downtime risk, installation phasing, and ongoing monitoring.</p>

      <p>The best commercial quote is rarely just the cheapest. It is the one that aligns with your load profile, procurement goals, and operational constraints.</p>
    `
  },
  'planning-permission-for-solar-uk': {
    title: 'Do You Need Planning Permission for Solar Panels in the UK?',
    category: 'Technical Guides',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '5 min read',
    content: `
      <p>For many properties in the UK, rooftop solar falls under permitted development. That means formal planning permission is often not required, but there are important exceptions and edge cases to check before installation.</p>

      <p>Listed buildings, conservation areas, and some flat-roof or ground-mount projects may need more careful review. Commercial buildings can also face landlord, planning, or structural constraints depending on the site.</p>

      <h2>When solar is usually straightforward</h2>
      <p>Standard pitched residential roofs are often the most straightforward case. If the panels do not project excessively and the property is not subject to special protections, the process is usually simpler than many homeowners expect.</p>

      <p>Even so, installers should still assess roof condition, fire-safety considerations, and DNO requirements before work starts.</p>

      <h2>Why it is worth checking early</h2>
      <p>Planning uncertainty can delay a project late in the process if it is not addressed up front. Checking early helps you understand whether you need approval, whether visual restrictions apply, and whether any design changes are likely to be required.</p>

      <p>It is much easier to adjust the proposal at quote stage than after ordering equipment or scheduling scaffolding.</p>
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
            className="prose prose-brand max-w-none text-brand-muted prose-headings:text-brand-navy prose-headings:font-serif prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-5 prose-p:leading-8 prose-p:my-7 prose-ul:my-7 prose-li:my-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default Article;
