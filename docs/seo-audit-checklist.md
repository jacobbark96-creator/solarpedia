# Solarpedia SEO Audit Checklist

Use this checklist before publishing or updating any page. It mirrors the practical checks people usually rely on in tools like Yoast, but is tailored to Solarpedia's route structure and lead-generation goals.

## Core Metadata

- Title includes the primary keyword near the start and stays under roughly 60 characters where possible.
- Meta description includes the primary intent, a location or audience qualifier where relevant, and a CTA-style benefit.
- Canonical URL matches the live route and strips query strings or temporary parameters.
- Open Graph tags use the final page title, description, image, and canonical URL.
- Twitter tags match the Open Graph title, description, and image.
- Robots directives are correct:
  - Indexable for hub, article, city, commercial, and installer pages.
  - `noindex` for private calculator results and thank-you pages.

## Content Quality

- Page has exactly one clear H1 that matches the main keyword intent.
- Intro paragraph repeats the target topic naturally in the first 1-2 sentences.
- Subheadings break up content with buyer-focused questions or comparison angles.
- Copy is unique for the page and not just a city-name swap with no added value.
- Main CTA appears above the fold or within the first major content block.
- At least one internal link points deeper into the site and one supports the next step in the funnel.

## Keyword Checks

- Primary keyword is present in the title, H1, meta description, and URL slug.
- Secondary modifiers appear naturally in body copy:
  - `quotes`
  - `installers`
  - `cost`
  - `postcode`
  - `commercial`
  - `battery`
- Keyword usage sounds natural and avoids obvious repetition.

## Structured Data

- Articles use `Article` schema.
- Calculator pages use `SoftwareApplication` or `WebPage` schema as appropriate.
- City and commercial lead pages use `Service` schema.
- Installer directory pages use `CollectionPage` and `ItemList` schema.
- Breadcrumb schema reflects the route hierarchy shown to users.

## Internal Linking

- Every city quotes page links to:
  - the main quotes hub
  - the matching installers city page
  - the calculator
- Every city installers page links to:
  - the main installers hub
  - the matching quotes city page
  - the installer directory
- Commercial pages link to:
  - the calculator
  - the business solar page
  - the installer discovery pages
- Articles link to at least one commercial-intent page where relevant.

## City Page Rules

- Use the city name in:
  - title
  - meta description
  - H1
  - opening paragraph
- Mention the city naturally in at least one subheading and one CTA.
- Explain what changes locally:
  - installer coverage
  - postcode routing
  - quote turnaround
  - common roof/property constraints
- Include links to nearby or related city pages.

## Commercial Page Rules

- Make the audience explicit:
  - warehouses
  - offices
  - schools
  - farms
  - retail
  - industrial sites
- Emphasise commercial buyer concerns:
  - load profile
  - roof condition
  - export limits
  - procurement
  - payback
  - finance options
- Keep CTA language commercial, not homeowner-oriented.

## Crawler Hygiene

- Indexable pages are present in `sitemap.xml`.
- Non-indexable pages are excluded from the sitemap and blocked with `robots` meta where needed.
- `robots.txt` points to the live sitemap URL.
- Broken or placeholder canonicals are not present.

## Final Review

- Read the page out loud once to catch awkward phrasing or keyword stuffing.
- Check that the page still serves the user first, not just the crawler.
- Confirm the CTA, metadata, schema, and internal links all align with the page's search intent.
