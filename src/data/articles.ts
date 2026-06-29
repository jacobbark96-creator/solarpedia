export const currentMonth = new Date().toLocaleString('default', { month: 'long' });
export const currentYear = new Date().getFullYear();

export interface ArticleData {
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  aiSummary: string;
  content: string;
  widget?: 'BatteryROI' | 'SystemSize' | 'RoofSuitability' | 'EVCharging' | 'ExportTariff';
  nextSteps?: Array<{
    title: string;
    description: string;
    link: string;
    cta: string;
  }>;
}

export const ARTICLES_DB: Record<string, ArticleData> = {
  'solar-myths-explained': {
    title: 'Solar Myths Explained: Separating Fact from Fiction',
    category: 'Myths & Facts',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '5 min read',
    aiSummary: 'Solar panels work on cloudy days (they need light, not heat). The average UK payback is 7-9 years, and most residential properties do not require planning permission under Permitted Development rights.',
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
    aiSummary: 'Yes, for most unshaded South, East, or West-facing roofs. High energy prices (around 24.67p/kWh) and export tariffs (up to 15p/kWh) make it viable. Pairing with a battery can increase self-consumption from 40% to 75%.',
    widget: 'RoofSuitability',
    content: `
      <p>The short answer is: for most homeowners with an unshaded South, East, or West-facing roof, yes.</p>
      
      <div class="my-8 bg-brand-white border border-brand-accent p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="!mt-0 !mb-1 text-lg font-bold text-brand-navy">Want to see your own numbers?</h3>
          <p class="!my-0 text-sm text-brand-muted">Use our free tool to estimate your roof's savings.</p>
        </div>
        <a href="/wizard" class="bg-brand-navy text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">Check Savings</a>
      </div>

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
    aiSummary: 'The SEG requires large energy suppliers to pay you for exported solar energy. Rates vary from 1p to 15p/kWh, so shopping around is essential. You need an MCS-certified installation and a smart meter to qualify.',
    widget: 'ExportTariff',
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
    aiSummary: `System size and battery storage are the biggest drivers of UK solar costs. A standard 4kWp system typically costs £5,500 - £7,000, while adding a 5kWh battery pushes the price to £8,500 - £10,000. Scaffolding, bird protection, and inverter upgrades also affect the final quote. Always compare the expected generation and warranty terms, not just the headline price.`,
    widget: 'SystemSize',
    content: `
      <p>Solar pricing in the UK varies more than many homeowners expect. The headline figure you see online is rarely the amount you will actually pay once system size, scaffolding, inverter choice, and battery storage are factored in.</p>

      <p>For a typical residential installation, the biggest price drivers are usable roof space, the amount of electricity you want to offset, and whether you want battery storage included from day one.</p>

      <div class="my-8 bg-brand-white border border-brand-accent p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="!mt-0 !mb-1 text-lg font-bold text-brand-navy">Compare live installation prices</h3>
          <p class="!my-0 text-sm text-brand-muted">Get up to 3 local quotes tailored to your postcode.</p>
        </div>
        <a href="/solar-panel-quotes" class="bg-brand-navy text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">Compare Quotes</a>
      </div>

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
    aiSummary: 'Batteries are best for homes with high evening electricity demand, allowing you to store daytime solar. They improve self-consumption and work well with time-of-use tariffs or EVs. They are less compelling if you are home using energy during the day.',
    widget: 'BatteryROI',
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
    aiSummary: 'Commercial solar offers strong ROI due to high daytime energy use (strong self-consumption). Key complexities include structural surveys, landlord permissions, and export constraints. Warehouses, offices, and factories are prime candidates.',
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
    aiSummary: 'Rooftop solar usually falls under Permitted Development in the UK, requiring no formal planning permission. Exceptions include listed buildings, conservation areas, and flat or ground-mount systems. Checking early prevents project delays.',
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
  },
  'solar-battery-sizing-guide': {
    title: 'How to Size a Solar Battery for Your UK Home',
    category: 'Solar Batteries',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '8 min read',
    aiSummary: 'The ideal solar battery size depends on your evening electricity usage and solar array size. For a typical UK home with a 4kWp array, a 5kWh battery is standard. Avoid oversizing, as it extends the payback period unnecessarily.',
    widget: 'BatteryROI',
    content: `
      <p>Sizing a solar battery correctly is the most important decision you will make when adding storage to your system. Buy one that is too small, and you will still rely heavily on expensive grid electricity during the evening peak. Buy one that is too large, and you will never fully utilize it, ruining your return on investment.</p>
      
      <h2>The golden rule of battery sizing</h2>
      <p>Your battery should be sized to cover your <strong>evening and overnight electricity consumption</strong>. It should not be sized to power your home for days at a time. The goal is to store your excess daytime solar generation and discharge it between sunset and sunrise.</p>

      <div class="my-8 bg-brand-white border border-brand-accent p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="!mt-0 !mb-1 text-lg font-bold text-brand-navy">Calculate your ideal battery size</h3>
          <p class="!my-0 text-sm text-brand-muted">Use our wizard to model different battery capacities against your bills.</p>
        </div>
        <a href="/wizard" class="bg-brand-navy text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">Model Battery Savings</a>
      </div>

      <h2>Standard sizing recommendations for UK homes</h2>
      <p>While every home is different, here is how battery sizes typically align with solar arrays and household usage in the UK:</p>
      
      <div class="overflow-x-auto my-8">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-brand-navy text-white">
              <th class="p-4 rounded-tl-xl font-bold">Household Profile</th>
              <th class="p-4 font-bold">Typical Solar Array</th>
              <th class="p-4 rounded-tr-xl font-bold">Recommended Battery Size</th>
            </tr>
          </thead>
          <tbody class="text-brand-muted">
            <tr class="border-b border-brand-accent">
              <td class="p-4 font-medium text-brand-navy">Small home (1-2 people), low evening use</td>
              <td class="p-4">3 kWp - 4 kWp</td>
              <td class="p-4">3 kWh - 5 kWh</td>
            </tr>
            <tr class="border-b border-brand-accent bg-brand-white">
              <td class="p-4 font-medium text-brand-navy">Average family home (3-4 people)</td>
              <td class="p-4">4 kWp - 6 kWp</td>
              <td class="p-4">5 kWh - 8 kWh</td>
            </tr>
            <tr class="border-b border-brand-accent">
              <td class="p-4 font-medium text-brand-navy">Large home with EV or Heat Pump</td>
              <td class="p-4">6 kWp - 8+ kWp</td>
              <td class="p-4">10 kWh - 13.5 kWh</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Key factors to consider</h2>
      <ul>
        <li><strong>Winter generation limits:</strong> In December and January, your solar panels will generate far less electricity. A massive 13.5kWh battery might never reach 100% charge from solar alone in winter.</li>
        <li><strong>Time-of-use tariffs:</strong> If you use a tariff like Octopus Intelligent Go, a larger battery can make sense because you can charge it from the grid overnight at ultra-low rates (e.g., 7p/kWh) to use during the day.</li>
        <li><strong>Inverter capacity:</strong> The battery's charge and discharge rate is limited by your inverter. A 5kWh battery paired with a 3kW inverter can power up to 3kW of appliances simultaneously.</li>
      </ul>
    `
  },
  'lfp-vs-nmc-solar-batteries': {
    title: 'LFP vs NMC: Which Solar Battery Chemistry is Best?',
    category: 'Solar Batteries',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '7 min read',
    aiSummary: 'LFP (Lithium Iron Phosphate) is the dominant and recommended home battery chemistry. It offers 6,000+ cycles, 15-20 years of life, and is highly safe against thermal runaway. NMC batteries are denser but have shorter lifespans and tighter safety margins.',
    content: `
      <p>Two battery chemistries dominate the UK home solar storage market: LFP (lithium iron phosphate) and NMC (nickel manganese cobalt). A few years ago, both were common. Today, the balance has shifted dramatically.</p>

      <p>Understanding the difference helps you make sense of product specifications and safety claims when choosing a home battery.</p>

      <h2>LFP: The Default</h2>
      <p>LFP (Lithium Iron Phosphate or LiFePO₄) cells now power the vast majority of new home batteries. The reasons are simple: they last longer, degrade slower, and are inherently safer than alternative chemistries.</p>
      
      <ul>
        <li><strong>Cycle Life:</strong> 6,000 to 10,000 cycles (roughly 15-20 years of daily cycling).</li>
        <li><strong>Safety:</strong> Extremely low risk of thermal runaway. They do not release oxygen when heated, making fires incredibly rare under normal fault conditions.</li>
        <li><strong>Depth of Discharge:</strong> Can be discharged to 0% with minimal damage to long-term health.</li>
      </ul>

      <h2>NMC: The High-Density Alternative</h2>
      <p>NMC (Nickel Manganese Cobalt) uses a combination of metals to pack more energy into a smaller space. While excellent for electric vehicles where weight matters, the trade-offs are rarely worth it for a stationary home battery.</p>

      <ul>
        <li><strong>Cycle Life:</strong> 2,500 to 4,000 cycles (roughly 7-10 years of daily cycling).</li>
        <li><strong>Safety:</strong> A tighter safety envelope. While modern NMC batteries are highly regulated, the chemistry is more susceptible to thermal runaway than LFP.</li>
        <li><strong>Size:</strong> Smaller and lighter per kWh than LFP.</li>
      </ul>

      <div class="overflow-x-auto my-8">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-brand-navy text-white">
              <th class="p-4 rounded-tl-xl font-bold">Metric</th>
              <th class="p-4 font-bold">LFP (LiFePO₄)</th>
              <th class="p-4 rounded-tr-xl font-bold">NMC</th>
            </tr>
          </thead>
          <tbody class="text-brand-muted">
            <tr class="border-b border-brand-accent">
              <td class="p-4 font-bold text-brand-navy">Typical Cycle Life</td>
              <td class="p-4">6,000 - 10,000 cycles</td>
              <td class="p-4">2,500 - 4,000 cycles</td>
            </tr>
            <tr class="border-b border-brand-accent bg-brand-white">
              <td class="p-4 font-bold text-brand-navy">Expected Lifespan</td>
              <td class="p-4">15 - 20+ years</td>
              <td class="p-4">7 - 12 years</td>
            </tr>
            <tr class="border-b border-brand-accent">
              <td class="p-4 font-bold text-brand-navy">Thermal Runaway Risk</td>
              <td class="p-4">Very Low</td>
              <td class="p-4">Moderate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The Verdict</h2>
      <p>Unless you have a severe space constraint (e.g., fitting a battery into a tiny apartment utility cupboard), <strong>LFP is the superior choice for home solar storage</strong>. It offers a lower total cost of ownership over its 15+ year lifespan and provides peace of mind regarding indoor fire safety.</p>
    `
  },
  'best-export-tariffs-uk': {
    title: 'Best UK Solar Export Tariffs Guide',
    category: 'Export Tariffs',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '9 min read',
    aiSummary: 'Octopus Energy dominates the UK export market. Outgoing Octopus offers a flat 12p/kWh, while Octopus Flux offers peak rates of ~30p/kWh between 4pm-7pm. You must have an MCS-certified installation and a smart meter to access these rates.',
    widget: 'ExportTariff',
    content: `
      <p>Generating your own electricity is great, but getting paid handsomely for the excess energy you send back to the grid transforms the economics of a solar installation. The Smart Export Guarantee (SEG) mandates that large suppliers pay you for exports, but the rates vary wildly from a token 1p to over 30p per kWh.</p>

      <h2>The Market Leaders</h2>
      <p>While E.ON Next, OVO, and ScottishPower offer competitive standard rates, Octopus Energy continues to dominate the export tariff landscape with dynamic, time-of-use options.</p>

      <div class="my-8 bg-brand-white border border-brand-accent p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="!mt-0 !mb-1 text-lg font-bold text-brand-navy">Ready to calculate your export income?</h3>
          <p class="!my-0 text-sm text-brand-muted">Model how different tariffs impact your payback period.</p>
        </div>
        <a href="/wizard" class="bg-brand-navy text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">Calculate Payback</a>
      </div>

      <h3>1. Outgoing Octopus (Fixed)</h3>
      <p>The simplest and most popular choice for homes without a battery. It pays a flat <strong>12p per kWh</strong> for every unit you export, regardless of the time of day. It provides predictable, steady income.</p>

      <h3>2. Octopus Flux</h3>
      <p>Designed specifically for homes with solar <em>and</em> battery storage. It offers three distinct rate bands. During the 4pm to 7pm evening peak, the export rate jumps to roughly <strong>27p - 30p per kWh</strong>. If you charge your battery from solar during the day and dump the excess to the grid at 5pm, the returns are exceptionally strong.</p>

      <h3>3. Intelligent Octopus Flux</h3>
      <p>The automated version of Flux. Octopus directly integrates with compatible batteries (like GivEnergy) and automatically charges and discharges your system based on weather forecasts and grid pricing to maximize your profit without you lifting a finger.</p>

      <h2>Eligibility Requirements</h2>
      <ul>
        <li><strong>MCS Certification:</strong> Your solar panels and battery must be installed by an MCS (or Flexi-Orb) certified installer.</li>
        <li><strong>Smart Meter:</strong> You must have a SMETS2 (or compatible SMETS1) smart meter capable of taking half-hourly export readings.</li>
        <li><strong>DNO Notification:</strong> Your installer must have notified your local District Network Operator (DNO) of your installation.</li>
      </ul>
    `
  },
  'solar-panel-bird-proofing': {
    title: 'Bird Proofing Solar Panels: Costs, Options & Is It Worth It?',
    category: 'Solar Panels',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '6 min read',
    aiSummary: 'Bird proofing prevents pigeons from nesting under solar panels, which can cause cable damage, noise, and severe guano buildup. Installing mesh during the initial panel installation costs £300-£500. Retrofitting costs significantly more due to scaffolding.',
    content: `
      <p>The warm, sheltered gap between your roof tiles and your solar panels is prime real estate for pigeons and other nesting birds. While a single bird might seem harmless, a full infestation can cause serious damage to your solar investment.</p>

      <h2>Why do birds nest under solar panels?</h2>
      <p>Solar panels provide protection from wind, rain, and predators, while the heat generated by the panels creates a warm microclimate. Once pigeons establish a nest, they are notoriously stubborn about leaving.</p>

      <h2>The risks of an infestation</h2>
      <ul>
        <li><strong>Cable Damage:</strong> Birds and pests can peck at exposed DC cables, creating fire risks or causing your inverter to trip offline.</li>
        <li><strong>Guano Buildup:</strong> Pigeon droppings are highly acidic. They can degrade roof tiles, block gutters, and create severe localized hygiene issues. If guano builds up on the panels themselves, it creates "hard shading" which drastically reduces energy generation.</li>
        <li><strong>Noise:</strong> The sound of pigeons cooing and scratching directly above a bedroom ceiling from 4:30 AM in summer is a common complaint.</li>
      </ul>

      <div class="overflow-x-auto my-8">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-brand-navy text-white">
              <th class="p-4 rounded-tl-xl font-bold">Proofing Method</th>
              <th class="p-4 font-bold">Effectiveness</th>
              <th class="p-4 rounded-tr-xl font-bold">Estimated Cost (with install)</th>
            </tr>
          </thead>
          <tbody class="text-brand-muted">
            <tr class="border-b border-brand-accent">
              <td class="p-4 font-bold text-brand-navy">PVC Coated Wire Mesh</td>
              <td class="p-4">Excellent (Industry Standard)</td>
              <td class="p-4">£300 - £500</td>
            </tr>
            <tr class="border-b border-brand-accent bg-brand-white">
              <td class="p-4 font-bold text-brand-navy">Solar Skirts / Spikes</td>
              <td class="p-4">Good</td>
              <td class="p-4">£250 - £400</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>When to install bird proofing</h2>
      <p><strong>Always install bird proofing at the same time as your solar panels.</strong></p>
      <p>When the installation team is already on-site with scaffolding erected, adding a PVC mesh barrier around the array is a quick, cheap job. If you wait until an infestation occurs two years later, you will have to pay £500+ just to re-erect the scaffolding, plus the cost of professional guano cleaning and the mesh installation.</p>
    `
  },
  'solar-panel-cleaning-maintenance': {
    title: 'Solar Panel Cleaning & Maintenance: A Complete UK Guide',
    category: 'Solar Panels',
    date: `${currentMonth} ${currentYear}`,
    author: 'Solarpedia Analysis Team',
    readTime: '6 min read',
    aiSummary: 'In the UK, natural rainfall cleans most residential solar panels effectively. Manual cleaning is only necessary every 2-3 years, or if panels are mounted flat (under 10 degrees pitch) or near heavy pollution. Never use abrasive chemicals or pressure washers.',
    content: `
      <p>One of the biggest selling points of solar panels is their lack of moving parts. Because they are entirely static, they require very little ongoing maintenance. However, "low maintenance" does not mean "zero maintenance".</p>

      <h2>Do solar panels actually need cleaning?</h2>
      <p>In the UK, the answer is usually: <strong>Not very often.</strong></p>
      <p>Modern tier-1 solar panels have a hydrophobic glass coating. Because most UK roofs are pitched at between 30 and 40 degrees, regular rainfall is highly effective at washing away surface dust, pollen, and light debris.</p>
      
      <p>You generally only need to arrange professional cleaning if:</p>
      <ul>
        <li>Your panels are mounted on a flat roof (under 10 degrees pitch) where water pools and leaves dirty residue.</li>
        <li>You live next to a busy road, active farmland, or an industrial site with heavy airborne particulates.</li>
        <li>You notice a sudden, unexplained drop in your generation app data.</li>
      </ul>

      <h2>How much efficiency is lost to dirt?</h2>
      <p>For a standard pitched roof in a UK suburb, "soiling losses" (the industry term for dirt buildup) typically account for just 1% to 3% of annual generation loss. Spending £150 on a professional cleaner to recover £15 worth of electricity is a false economy. Cleaning every 2 to 3 years is usually the sweet spot.</p>

      <h2>How to safely clean solar panels</h2>
      <p>If you have accessible ground-mount panels or a safe flat roof, you can clean them yourself. If they are on a two-storey roof, hire a professional window cleaner who uses a water-fed pole system.</p>
      
      <div class="bg-brand-accent/20 border-l-4 border-brand-navy p-6 my-8">
        <h3 class="text-xl font-bold text-brand-navy mb-2">Golden rules for cleaning:</h3>
        <ul class="mb-0">
          <li><strong>Never use cold water on hot panels:</strong> The thermal shock can shatter the glass. Clean them early in the morning.</li>
          <li><strong>Never use abrasive sponges or pressure washers:</strong> High pressure can force water under the seals, and abrasives will strip the hydrophobic coating.</li>
          <li><strong>Use purified/deionized water:</strong> Tap water leaves calcium and hard water stains on the glass.</li>
        </ul>
      </div>

      <h2>Inverter Maintenance</h2>
      <p>While the panels are robust, your inverter is the workhorse of the system. Keep the inverter free of dust, ensure its cooling fins/fans are unobstructed, and check the indicator lights once a month. Most string inverters will need replacing after 10 to 12 years.</p>
    `
  }
};


export const nextStepsBySlug: Record<string, { title: string; description: string; link: string; cta: string }[]> = {
    'solar-myths-explained': [
      { title: 'Check your savings', description: 'Turn solar theory into a real property-level estimate using the savings wizard.', link: '/wizard', cta: 'Run the wizard' },
      { title: 'Compare solar quotes', description: 'Move from myth-busting into buyer intent with city quote pages.', link: '/solar-panel-quotes', cta: 'Browse quote pages' },
      { title: 'Check roof suitability', description: 'See how direction and pitch affect efficiency.', link: '/tools/roof-suitability', cta: 'Check Roof' },
    ],
    'is-solar-worth-it-uk': [
      { title: 'Check roof suitability', description: 'See how direction and pitch affect efficiency.', link: '/tools/roof-suitability', cta: 'Check Roof' },
      { title: 'Get a tailored estimate', description: 'Use your postcode, roof details, and usage pattern to assess likely savings.', link: '/wizard', cta: 'Check your savings' },
      { title: 'Get solar panel quotes', description: 'Compare local quote pages and installer availability by city.', link: '/solar-panel-quotes', cta: 'Compare quotes' },
    ],
    'seg-explained': [
      { title: 'Compare Export Tariffs', description: 'See how much you could earn with Octopus Flux vs standard SEG.', link: '/tools/export-tariffs', cta: 'Compare Tariffs' },
      { title: 'Review installation costs', description: 'Understand how export income fits into full installation economics.', link: '/education/article/solar-panel-installation-cost-uk', cta: 'Read cost guide' },
      { title: 'Check your likely savings', description: 'Estimate self-consumption and export assumptions for your own property.', link: '/wizard', cta: 'Run the wizard' },
    ],
    'solar-panel-installation-cost-uk': [
      { title: 'System Size Estimator', description: 'Work backwards from your energy bill to find out exactly how many kWp you need.', link: '/tools/system-size', cta: 'Estimate Size' },
      { title: 'Compare solar quotes', description: 'Use city quote pages to move from rough budget expectations to live quote collection.', link: '/solar-panel-quotes', cta: 'Compare quotes' },
      { title: 'Check your likely payback', description: 'Use your own bill, roof size, and usage pattern to model annual savings.', link: '/wizard', cta: 'Check payback' },
    ],
    'battery-storage-worth-it-uk': [
      { title: 'Battery ROI Calculator', description: 'See how adding a 5kWh or 10kWh battery changes your self-consumption and payback period.', link: '/tools/battery-roi', cta: 'Calculate ROI' },
      { title: 'Compare Export Tariffs', description: 'See how much you could earn with Octopus Flux vs standard SEG.', link: '/tools/export-tariffs', cta: 'Compare Tariffs' },
      { title: 'Get solar and battery quotes', description: 'Request quotes that include modular or hybrid battery setups.', link: '/solar-panel-quotes', cta: 'Get quotes' },
    ],
    'commercial-solar-for-business-uk': [
      { title: 'Get commercial solar quotes', description: 'Move directly into a business-focused quote flow for UK sites.', link: '/commercial-solar-quotes-uk', cta: 'Get commercial quotes' },
      { title: 'Explore business solar', description: 'Read the commercial overview page covering ROI, sectors, and buying factors.', link: '/business', cta: 'Explore business solar' },
      { title: 'Browse installers', description: 'Shortlist MCS-certified providers before requesting commercial proposals.', link: '/installers', cta: 'Browse installers' },
    ],
    'planning-permission-for-solar-uk': [
      { title: 'Find local installers', description: 'Speak to installers who can advise on surveys, compliance, and design constraints.', link: '/installers', cta: 'View installers' },
      { title: 'Compare city quote pages', description: 'Move into the quote journey once you understand likely restrictions.', link: '/solar-panel-quotes', cta: 'Compare quotes' },
      { title: 'Read business solar guidance', description: 'Commercial sites often face added landlord, structural, and planning complexity.', link: '/business', cta: 'Read business solar guidance' },
    ],
    'solar-battery-sizing-guide': [
      { title: 'Battery ROI Calculator', description: 'See how adding a 5kWh or 10kWh battery changes your self-consumption and payback period.', link: '/tools/battery-roi', cta: 'Calculate ROI' },
      { title: 'Check your savings', description: 'Run the full financial model for a solar + battery system.', link: '/wizard', cta: 'Run the wizard' },
      { title: 'Compare quotes', description: 'Get accurate battery sizing recommendations from local installers.', link: '/solar-panel-quotes', cta: 'Get quotes' },
    ],
    'lfp-vs-nmc-solar-batteries': [
      { title: 'Get battery quotes', description: 'Request quotes and ask installers specifically about their LFP options.', link: '/solar-panel-quotes', cta: 'Compare quotes' },
      { title: 'Read battery sizing guide', description: 'Learn how to properly size an LFP battery for your home.', link: '/education/article/solar-battery-sizing-guide', cta: 'Read sizing guide' },
      { title: 'Check your ROI', description: 'Calculate the financial return of adding a 15-year lifespan LFP battery.', link: '/wizard', cta: 'Check ROI' },
    ],
    'best-export-tariffs-uk': [
      { title: 'Check your likely savings', description: 'Estimate self-consumption and export assumptions for your own property.', link: '/wizard', cta: 'Run the wizard' },
      { title: 'Find local installers', description: 'You need an MCS-certified installation to claim these tariffs. Find an installer today.', link: '/installers', cta: 'View installers' },
      { title: 'Compare installation quotes', description: 'Move from research to live quote collection.', link: '/solar-panel-quotes', cta: 'Compare quotes' },
    ],
    'solar-panel-bird-proofing': [
      { title: 'Request installation quotes', description: 'Ensure you ask your chosen installers to include bird proofing in the initial quote.', link: '/solar-panel-quotes', cta: 'Get quotes' },
      { title: 'Find vetted installers', description: 'Browse our directory to find reputable MCS-certified companies.', link: '/installers', cta: 'Browse installers' },
      { title: 'Check installation costs', description: 'Understand how bird proofing fits into the total cost of a system.', link: '/education/article/solar-panel-installation-cost-uk', cta: 'Read cost guide' },
    ],
    'solar-panel-cleaning-maintenance': [
      { title: 'Calculate your ROI', description: 'Factor in long-term maintenance when calculating your payback period.', link: '/wizard', cta: 'Calculate payback' },
      { title: 'Review installation costs', description: 'Learn what drives the upfront cost of your solar investment.', link: '/education/article/solar-panel-installation-cost-uk', cta: 'Read cost guide' },
      { title: 'Find trusted installers', description: 'A good installer provides excellent aftercare and warranty support.', link: '/installers', cta: 'View installers' },
    ],
  };
