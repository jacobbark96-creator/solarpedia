# Solarpedia Improvement Roadmap

This document outlines the prioritised roadmap for incrementally improving Solarpedia's SEO, accessibility, schema, internal linking, and conversion without altering its existing architecture or visual identity.

## 1. Critical Improvements (Immediate Action)

### Accessibility (Goal: 100/100)
- **Fix Form Labels**: In `LeadCaptureCTA.tsx` and `Wizard.tsx`, existing `<label>` elements are separated from their `<input>` fields without `htmlFor` and `id` attributes. These must be linked to ensure screen readers can announce them.
- **Keyboard Navigation & ARIA**: Add `aria-label` to icon-only buttons and ensure interactive elements (like the range sliders in the Wizard) have explicit accessible names and focus states.
- **Heading Hierarchy**: Ensure `h1` through `h6` flow sequentially on all pages (e.g., check `Education.tsx` and `Home.tsx` for skipped heading levels).

### Best Practices (Goal: 100/100)
- **Image Dimensions**: Add explicit `width` and `height` attributes to all `<img>` tags (`Navbar.tsx`, `Footer.tsx`, `Home.tsx`, `Education.tsx`, `Business.tsx`) to eliminate Cumulative Layout Shift (CLS).
- **External Links**: Audit external links (like news articles in `Home.tsx`) and ensure they use `rel="noopener noreferrer"`.

## 2. High Impact Improvements

### AI Search Visibility & Content (Existing Articles)
- **Quick Answers & Definitions**: Inject a "Quick Answer" or "Key Takeaways" block at the top of each article in `Article.tsx`. This structures the content for AI scrapers (like Google AI Overviews and Perplexity).
- **Comparison Tables**: Enhance articles like *Is Battery Storage Worth It* and *Solar Panel Installation Cost* with markdown/HTML comparison tables (e.g., Battery vs No Battery, System Size Costs).
- **Expert Tips & FAQs**: Add an explicit FAQ section and "Expert Tip" callouts to existing articles to increase topical authority.

### SEO & Schema
- **FAQ Schema**: Existing pages (`Home.tsx`, `SolarPanelQuotesCity.tsx`, `BestSolarInstallersCity.tsx`) contain visible FAQ accordions/lists but lack `FAQPage` JSON-LD schema. Add this schema using the existing `src/lib/seo.ts` structure.
- **HowTo/Review Schema**: Expand schema support in `seo.ts` to include `HowTo` for guides and `Dataset` or `Review` where installer data is shown.

### Conversion Optimization
- **Trust Indicators**: Add trust badges (e.g., "100% Free", "No Obligation", "Data Secured") near the submit buttons in `LeadCaptureCTA.tsx` and the `Wizard.tsx` contact step.
- **Inline Contextual CTAs**: Instead of only having CTAs at the bottom of articles, inject subtle, contextual CTA buttons within the article body (e.g., after a paragraph about cost, add a "Check your property's cost" button).

## 3. Nice to Have (Evolutionary Improvements)

### Internal Linking Architecture
- **Automated Related Content**: Enhance `Article.tsx` to automatically append "Related Glossary Terms" and "Related Calculators" blocks based on the article's category, preventing isolated content silos.
- **Breadcrumb Visibility**: Ensure breadcrumbs are not just in the Schema but visibly accessible on deeper pages to aid navigation and internal link flow.

### Content Gap Analysis (Recommended New Pages)
Based on the existing categories, here are logical missing pages to strengthen topic clusters in the future:
* **Solar Panels:**
  - *Solar Panel Cleaning & Maintenance Guide*
  - *Bird Proofing Solar Panels: Costs & Options*
* **Batteries:**
  - *Solar Battery Lifespan & Warranties*
  - *How to Size a Solar Battery for Your Home*
* **Inverters:**
  - *String Inverters vs Microinverters (Comparison)*

## Implementation Strategy
1. **Phase 1**: Execute Critical Improvements (Accessibility labels, Image dimensions).
2. **Phase 2**: Execute High Impact (FAQ Schema, Trust Indicators, AI Content Blocks).
3. **Phase 3**: Execute Nice to Have (Internal Linking automation).
