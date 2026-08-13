# Solarpedia Strategic SEO & Content Architecture Report

## A. Current SEO Audit (What Solarpedia already has)
*   **Existing Core Pages:** `/` (Home), `/about`, `/business`, `/installers`, `/glossary`, `/thanks`.
*   **Conversion Tools:** `/wizard` (Personalised Assessment), `/results`.
*   **Micro-Tools:** `/tools/system-size`, `/tools/roof-suitability`, `/tools/export-tariffs`, `/tools/ev-charging`, `/tools/battery-roi`.
*   **Location Pages:** Dynamic routes at `/solar-panel-quotes/[city]` and `/best-solar-installers/[city]`.
*   **Education Hub:** `/education/` and dynamic article slugs `/education/article/[slug]`.
*   **SEO Infrastructure:** Solid foundation using `BaseLayout.astro`. Generates `canonical` URLs automatically. Uses `schema.org` (Website, FAQ, Breadcrumb). Implements dynamic meta titles and descriptions. Contains a `sitemap.xml` and `robots.txt`.

## B. Keyword Master Map
Keywords are categorised by intent (Informational, Commercial Investigation, Transactional, Local) and lead value (1-5).

### 1. Commercial Solar Cluster
| Keyword | Search Intent | Lead Value | Target Conversion |
| :--- | :--- | :--- | :--- |
| commercial solar panels UK | Commercial (Investigation) | 5 | Wizard (Commercial flow) |
| commercial solar calculator | Transactional | 5 | Wizard (Commercial flow) |
| commercial solar ROI | Commercial | 4 | Wizard (Commercial flow) |
| solar panels for warehouses | Commercial | 4 | Wizard (Commercial flow) |
| commercial battery storage | Commercial | 3 | Wizard (Commercial flow) |
| solar PPA | Informational / Commercial | 4 | Wizard (Commercial flow) |

### 2. Residential Solar Cluster
| Keyword | Search Intent | Lead Value | Target Conversion |
| :--- | :--- | :--- | :--- |
| solar panel calculator UK | Transactional | 5 | Wizard (Residential flow) |
| solar panels cost UK | Commercial | 4 | Wizard (Residential flow) |
| solar savings calculator | Transactional | 5 | Wizard (Residential flow) |
| solar battery calculator | Transactional | 4 | Battery ROI Tool → Wizard |
| solar panels for homes | Informational | 3 | Wizard (Residential flow) |

### 3. Finance & Economics Cluster
| Keyword | Search Intent | Lead Value | Target Conversion |
| :--- | :--- | :--- | :--- |
| solar payback calculator | Transactional | 4 | Wizard (Residential flow) |
| solar finance UK | Commercial | 3 | Wizard (Residential flow) |
| solar cost per kW | Informational | 3 | Wizard (Residential flow) |

### 4. Buying & Comparison Cluster
| Keyword | Search Intent | Lead Value | Target Conversion |
| :--- | :--- | :--- | :--- |
| compare solar quotes | Transactional | 5 | Wizard (Lead intent: Installer) |
| best solar installers UK | Commercial | 4 | Wizard (Lead intent: Installer) |
| how to choose a solar installer | Informational | 3 | Wizard (Lead intent: Advice) |
| solar panel brands comparison | Commercial | 3 | Wizard (Lead intent: Advice) |

### 5. Local / Location Cluster
| Keyword | Search Intent | Lead Value | Target Conversion |
| :--- | :--- | :--- | :--- |
| solar installers [City] | Local / Transactional | 5 | Location Page → Wizard |
| solar panels [City] | Local / Commercial | 4 | Location Page → Wizard |
| commercial solar [City] | Local / Transactional | 5 | Location Page → Wizard |

### 6. Educational Cluster (Supporting Pages)
| Keyword | Search Intent | Lead Value | Target Conversion |
| :--- | :--- | :--- | :--- |
| what is a G99 application | Informational | 2 | Internal Link to Commercial |
| kW vs kWh | Informational | 1 | Glossary / Internal Links |
| how solar works | Informational | 1 | Internal Link to Residential |

---

## C. Top 30 Priorities (Tier 1 - First 90 Days)
These 30 pages possess the highest combination of lead value (4-5) and purchase intent. 

**Existing Pages to Improve (10):**
1.  `/wizard` (Completed in Phase 1 engineering, needs SEO metadata refinement)
2.  `/commercial-solar-quotes-uk` (Needs to transition to the main commercial pillar)
3.  `/tools/battery-roi` (High intent, link aggressively to Wizard)
4.  `/tools/system-size` (High intent, link aggressively to Wizard)
5.  `/solar-panel-quotes/london` (Highest volume local)
6.  `/solar-panel-quotes/manchester`
7.  `/solar-panel-quotes/birmingham`
8.  `/best-solar-installers/london`
9.  `/best-solar-installers/manchester`
10. `/business` (Needs expansion into full Commercial Guide)

**New Pages to Create (20):**
11. `/commercial-solar/cost` (Pillar supporting page)
12. `/commercial-solar/calculator` (Dedicated landing page for commercial wizard)
13. `/commercial-solar/warehouses` (Industry specific)
14. `/commercial-solar/farms` (Industry specific)
15. `/solar-calculator` (Dedicated landing page for the assessment)
16. `/solar-panels-cost` (Core pricing pillar)
17. `/solar-payback-calculator` (Transactional landing page)
18. `/compare-solar-quotes` (High intent conversion page)
19. `/best-solar-installers-uk` (National comparison)
20. `/solar-battery-cost` (High search volume, strong intent)
21. `/solar-finance` (Financing options)
22. `/commercial-solar/ppa` (Power Purchase Agreements)
23. `/solar-panel-quotes/leeds` (Local rollout)
24. `/solar-panel-quotes/glasgow` (Local rollout)
25. `/best-solar-installers/birmingham` (Local rollout)
26. `/best-solar-installers/leeds` (Local rollout)
27. `/best-solar-installers/glasgow` (Local rollout)
28. `/commercial-solar/birmingham` (Local commercial rollout)
29. `/commercial-solar/manchester` (Local commercial rollout)
30. `/commercial-solar/london` (Local commercial rollout)

---

## D. Topic Clusters & Architecture Recommendation
Your current architecture is mostly sound, but the Commercial section is flat (`/business` and `/commercial-solar-quotes-uk`). I recommend adopting this hierarchy:

*   **Pillar:** `/commercial-solar/` (Replaces or merges with `/business`)
    *   `/commercial-solar/cost/`
    *   `/commercial-solar/calculator/`
    *   `/commercial-solar/[industry]/` (e.g., warehouses, farms)
    *   `/commercial-solar/[city]/`
*   **Pillar:** `/solar-cost/`
    *   `/solar-cost/panels/`
    *   `/solar-cost/battery/`
*   **Pillar:** `/installers/`
    *   `/installers/compare/`
    *   `/installers/[city]/` (Merge `/best-solar-installers/` and `/solar-panel-quotes/` into a single, stronger local entity to prevent cannibalisation).
*   **Tools (Existing):** `/tools/`
*   **Education (Existing):** `/education/`

---

## E. 90-Day Roadmap

*   **Month 1 (Foundation & High Intent):** 
    *   Merge and redirect `/business` and `/commercial-solar-quotes-uk` into the new `/commercial-solar/` pillar.
    *   Build dedicated landing pages for the Assessment (`/solar-calculator`, `/solar-payback-calculator`, `/commercial-solar/calculator`). These pages will contain SEO copy but feature the Wizard component prominently at the top.
    *   Create the core cost guides (`/solar-panels-cost`, `/solar-battery-cost`).
*   **Month 2 (Commercial Expansion & Local Rollout):** 
    *   Build industry-specific commercial pages (warehouses, farms).
    *   Build the top 5 city location pages for Commercial Solar.
    *   Merge the duplicate intent local pages (see Section I).
*   **Month 3 (Buying & Comparison):** 
    *   Publish `/compare-solar-quotes` and `/best-solar-installers-uk`.
    *   Publish `/solar-finance` and `/commercial-solar/ppa`.
    *   Execute internal linking sweep from `/education` articles to these new transactional pages.

---

## F. Conversion Map
How traffic flows into the Assessment tool:

*   **Cost Pages (`/solar-panels-cost`)** → Primary CTA: "See exact costs for your roof" → **Wizard**
*   **Comparison Pages (`/compare-solar-quotes`)** → Primary CTA: "Analyse your property before comparing quotes" → **Wizard**
*   **Local Pages (`/installers/london`)** → Primary CTA: "Check London solar data for your postcode" → **Wizard**
*   **Commercial Pages (`/commercial-solar/warehouses`)** → Primary CTA: "Calculate your business payback period" → **Wizard (Commercial flow)**
*   **Micro-Tools (`/tools/battery-roi`)** → Primary CTA: "Get a full system assessment" → **Wizard**

---

## G. SEO Gaps (Competitor Blind Spots)
1.  **G99/G100 Grid Connection Guides:** Competitors fail to explain commercial grid connection limits clearly. This is a huge barrier for commercial solar.
2.  **Export Tariff (SEG) Comparisons:** Real-time or frequently updated comparisons of the best export tariffs.
3.  **Battery-Only Economics:** Explaining if a battery is worth it *without* solar (charging on cheap overnight tariffs).

---

## H. Data Opportunities (Solarpedia Original Research)
Topics where Solarpedia can create proprietary data to generate backlinks:
*   **[DATA OPPORTUNITY] The UK Solar Payback Index:** Use the data submitted through the Wizard to publish a quarterly report on average payback times by UK region.
*   **[DATA OPPORTUNITY] Real vs. Estimated Roof Yields:** Anonymised data showing the difference between theoretical capacity and actual installed capacity.
*   **[DATA OPPORTUNITY] Commercial Solar Benchmarks:** Average cost per kWp for UK businesses based on system size.

---

## I. Cannibalisation Risks
1.  **Local Page Duplication:** You currently have `/solar-panel-quotes/[citySlug]` AND `/best-solar-installers/[citySlug]`. These target the exact same local search intent (someone looking for solar in a specific city). 
    *   **Recommendation:** Merge these. Use a single `/installers/[city]` or `/solar-panels/[city]` URL. Redirect the other.
2.  **Commercial Duplication:** You have `/business` and `/commercial-solar-quotes-uk`.
    *   **Recommendation:** Consolidate into a single `/commercial-solar/` pillar page to consolidate authority.
3.  **Tool vs. Landing Page:** You have `/wizard`, but people search for "Solar Calculator". 
    *   **Recommendation:** Keep `/wizard` as the application URL, but build `/solar-calculator` as an SEO-rich landing page that embeds or links directly into `/wizard`.

---

### Example Brief for Tier 1 Page
*   **Target keyword:** commercial solar calculator
*   **Secondary keywords:** business solar calculator, commercial solar ROI, solar payback for business
*   **Search intent:** Transactional (Ready to calculate & convert)
*   **Estimated lead value:** 5 (Extremely valuable)
*   **Recommended URL:** `/commercial-solar/calculator`
*   **Suggested Title/H1:** Commercial Solar Calculator: Free Business ROI Assessment
*   **Suggested Meta Description:** Calculate your commercial solar ROI, payback period, and generation potential. Free independent assessment for UK businesses, factories and farms.
*   **Main questions to answer:** How much does commercial solar cost? What is the average payback period for businesses? What size system do I need?
*   **Primary CTA:** The embedded Solarpedia Savings Wizard (locked to `propertyType: 'commercial'`).
*   **Schema recommendation:** `SoftwareApplication` (Calculator) and `FAQPage`.
