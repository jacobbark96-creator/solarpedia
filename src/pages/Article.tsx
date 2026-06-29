import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, User, Clock } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { createArticleSchema, createBreadcrumbSchema, createFAQSchema } from '../lib/seo';
import { ARTICLES_DB, nextStepsBySlug } from '../data/articles';

// Import Widgets
import BatteryROIWidget from '../components/widgets/BatteryROIWidget';
import SystemSizeWidget from '../components/widgets/SystemSizeWidget';
import RoofSuitabilityWidget from '../components/widgets/RoofSuitabilityWidget';
import EVChargingWidget from '../components/widgets/EVChargingWidget';
import ExportTariffWidget from '../components/widgets/ExportTariffWidget';

const WidgetMap: Record<string, React.FC> = {
  BatteryROI: BatteryROIWidget,
  SystemSize: SystemSizeWidget,
  RoofSuitability: RoofSuitabilityWidget,
  EVCharging: EVChargingWidget,
  ExportTariff: ExportTariffWidget,
};

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? ARTICLES_DB[slug] : null;
  const articlePath = slug ? `/education/article/${slug}` : '/education';
  const articleDescription = article
    ? `Read Solarpedia's guide to ${article.title.toLowerCase()} with UK-focused analysis, practical context, and buying guidance.`
    : 'Read the full analysis and expert breakdown on Solarpedia.';
  const relatedArticles = Object.entries(ARTICLES_DB)
    .filter(([entrySlug, entry]) => entrySlug !== slug && entry.category === article?.category)
    .slice(0, 3)
    .map(([entrySlug, entry]) => ({
      slug: entrySlug,
      title: entry.title,
      category: entry.category,
    }));

  const nextSteps = nextStepsBySlug[slug || ''] || [
    { title: 'Check your solar savings', description: 'Use the wizard to move from research into a tailored property estimate.', link: '/wizard', cta: 'Run the wizard' },
    { title: 'Compare solar quotes', description: 'Browse city quote pages and move closer to live installer proposals.', link: '/solar-panel-quotes', cta: 'Compare quotes' },
    { title: 'Browse installers', description: 'Review MCS-certified installers and shortlist providers to contact.', link: '/installers', cta: 'Browse installers' },
  ];

  const articleFaqs = article ? [
    {
      question: `How should I use this ${article.category.toLowerCase()} guide?`,
      answer: 'Use it as a decision-support page, then move into the savings wizard, quote pages, or installer directory depending on how close you are to buying.',
    },
    {
      question: 'Should I compare quotes before speaking to installers?',
      answer: 'Yes. Shortlisting installers, understanding likely costs, and knowing your roof and usage assumptions will usually lead to stronger and more comparable proposals.',
    },
    {
      question: 'What is the next best step after reading this article?',
      answer: 'If you are still researching, continue through the education hub. If you are moving toward purchase, use the wizard or city quote pages so you can compare real options.',
    },
  ] : [];

  usePageMetadata({
    title: article?.title || 'Article Not Found',
    description: articleDescription,
    path: articlePath,
    keywords: article ? `${article.title}, solar education UK, solar advice UK` : 'solar education UK',
    noindex: !article,
    schema: article
      ? [
          createArticleSchema({
            headline: article.title,
            description: articleDescription,
            path: articlePath,
            authorName: article.author,
            datePublished: article.date,
            dateModified: article.date,
          }),
          createFAQSchema(articleFaqs),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Education', path: '/education' },
            { name: article.title, path: articlePath },
          ]),
        ]
      : createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Education', path: '/education' },
        ]),
  });

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-white">
        <h1 className="text-3xl font-serif font-bold text-brand-navy mb-4">Article Not Found</h1>
        <Link to="/education" className="text-brand-green font-bold hover:underline">Return to Education Hub</Link>
      </div>
    );
  }

  // Handle widget injection
  const WidgetComponent = article.widget ? WidgetMap[article.widget] : null;
  const contentParts = article.content.split(/(<h2.*?>)/i);
  
  // If there's an h2, contentParts will be [beforeH2, h2Tag, afterH2, ...]
  // We inject the widget right before the first h2.
  const contentBeforeWidget = contentParts[0];
  const contentAfterWidget = contentParts.length > 1 ? contentParts.slice(1).join('') : '';

  return (
    <div className="bg-brand-white min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-brand-muted mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-brand-navy transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <Link to="/education" className="hover:text-brand-navy transition-colors">Education Hub</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-brand-navy font-medium truncate">{article.category}</span>
        </div>

        <Link 
          to="/education" 
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-green transition-colors mb-6 bg-white border border-brand-accent px-4 py-2 rounded-full shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {article.category} guides
        </Link>

        <article className="bg-white rounded-[2rem] p-10 md:p-16 border border-brand-accent shadow-sm">
          <div className="mb-10">
            <span className="px-3 py-1 bg-brand-green/10 text-brand-green font-bold text-[10px] uppercase tracking-widest rounded-full mb-6 inline-block">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
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
          >
            {article.aiSummary && (
              <div className="bg-brand-green/10 border-l-4 border-brand-green p-6 rounded-r-2xl mb-8 not-prose">
                <h2 className="text-xl font-bold text-brand-navy mb-2">Key Takeaways</h2>
                <p className="text-brand-muted leading-relaxed m-0">{article.aiSummary}</p>
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: contentBeforeWidget }} />
            
            {WidgetComponent && (
              <div className="my-12 not-prose">
                <WidgetComponent />
              </div>
            )}

            {contentAfterWidget && (
              <div dangerouslySetInnerHTML={{ __html: contentAfterWidget }} />
            )}
          </div>

          <div className="mt-12 rounded-[2rem] border border-brand-accent bg-brand-accent/20 p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-3">Next steps</p>
            <h2 className="text-3xl font-serif font-bold text-brand-navy mb-6">Move from research to action</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextSteps.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-brand-accent bg-white p-5">
                  <h3 className="text-xl font-serif font-bold text-brand-navy mb-3">{item.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-4">{item.description}</p>
                  <Link to={item.link} className="text-sm font-bold text-brand-navy hover:text-brand-green transition-colors">
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {relatedArticles.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl font-serif font-bold text-brand-navy mb-6">Related reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/education/article/${related.slug}`}
                    className="rounded-[1.5rem] border border-brand-accent bg-white p-5 hover:border-brand-navy transition-colors"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-2">{related.category}</p>
                    <h3 className="text-lg font-serif font-bold text-brand-navy">{related.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="text-3xl font-serif font-bold text-brand-navy mb-6">Related tools & resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/wizard" className="rounded-[1.5rem] border border-brand-accent bg-brand-white p-6 hover:border-brand-navy transition-colors flex items-center justify-between group">
                <div>
                  <h3 className="text-lg font-serif font-bold text-brand-navy mb-1">Solar Savings Wizard</h3>
                  <p className="text-sm text-brand-muted">Calculate your property's payback period and ROI.</p>
                </div>
                <ChevronRight className="h-5 w-5 text-brand-muted group-hover:text-brand-navy transition-colors" />
              </Link>
              <Link to="/solar-panel-quotes" className="rounded-[1.5rem] border border-brand-accent bg-brand-white p-6 hover:border-brand-navy transition-colors flex items-center justify-between group">
                <div>
                  <h3 className="text-lg font-serif font-bold text-brand-navy mb-1">Quote Comparison</h3>
                  <p className="text-sm text-brand-muted">Find local installers and compare live installation costs.</p>
                </div>
                <ChevronRight className="h-5 w-5 text-brand-muted group-hover:text-brand-navy transition-colors" />
              </Link>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-brand-accent bg-white p-8">
            <h2 className="text-3xl font-serif font-bold text-brand-navy mb-6">Common questions</h2>
            <div className="space-y-5">
              {articleFaqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-xl font-serif font-bold text-brand-navy mb-2">{faq.question}</h3>
                  <p className="text-brand-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Article;
