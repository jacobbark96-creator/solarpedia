const fs = require('fs');
const path = require('path');

const terms = [
  { term: 'Alternating Current (AC)', definition: 'The standard type of electricity used in homes and supplied by the National Grid. Solar panels generate Direct Current (DC), which an inverter converts into AC.' },
  { term: 'Amorphous Silicon', definition: 'A type of solar cell made from non-crystalline silicon. Less efficient than mono or poly crystalline cells, but often cheaper and flexible.' },
  { term: 'Ampere (Amp or A)', definition: 'The standard unit used to measure the rate of flow of an electric current.' },
  { term: 'Anti-Islanding', definition: 'A mandatory safety feature in grid-tied inverters that instantly shuts down the solar system during a power cut, preventing electricity from flowing back into the grid and injuring engineers.' },
  { term: 'Array', definition: 'A complete collection of interconnected solar panels functioning as a single unit.' },
  { term: 'Azimuth', definition: 'The compass angle or orientation of a roof relative to due North (which is 0° or 360°). In the UK, a South-facing roof has an azimuth of 180°.' },
  { term: 'Balance of System (BOS)', definition: 'All the components of a solar PV system other than the panels themselves. This includes the inverter, mounting hardware, wiring, switches, and batteries.' },
  { term: 'Battery Energy Storage System (BESS)', definition: 'The formal industry term for a home or commercial battery setup used to store excess solar energy.' },
  { term: 'Building Integrated Photovoltaics (BIPV)', definition: 'Solar materials that replace conventional building materials, such as solar roof tiles or solar glass windows, rather than being mounted on top of them.' },
  { term: 'Bypass Diode', definition: 'A component built into solar panels that allows current to "bypass" shaded or damaged cells, preventing a small amount of shade from crippling the output of the entire panel.' },
  { term: 'Capacity Factor', definition: 'The ratio of the actual energy produced by a solar system over a year compared to its maximum possible output if it operated at 100% capacity 24/7.' },
  { term: 'Charge Controller', definition: 'A device used in off-grid or battery systems that regulates the voltage and current coming from the solar panels to prevent the battery from overcharging.' },
  { term: 'Clipping', definition: 'When a solar array generates more DC power than the inverter can convert into AC power. The inverter "clips" the excess, capping the output at its maximum rating.' },
  { term: 'DNO (Distribution Network Operator)', definition: 'The company that owns and operates the power lines and infrastructure connecting your home to the National Grid. You or your installer must notify them (via G98 or G99 applications) when installing solar.' },
  { term: 'Direct Current (DC)', definition: 'Electricity that flows in one continuous direction. Solar panels and batteries operate on DC, which must be converted to AC for household use.' },
  { term: 'Degradation', definition: 'The gradual loss of efficiency in solar panels or capacity in batteries over time. Tier 1 solar panels typically degrade by about 0.4% to 0.5% per year.' },
  { term: 'Depth of Discharge (DoD)', definition: 'The percentage of a battery\'s capacity that has been used relative to its total capacity. Many modern LFP batteries allow 100% DoD.' },
  { term: 'Efficiency', definition: 'The percentage of sunlight hitting a solar panel that is converted into usable electricity. Modern panels typically have an efficiency of 20% to 23%.' },
  { term: 'Export Tariff', definition: 'The rate you are paid by an energy supplier for sending your excess generated electricity back to the grid.' },
  { term: 'Feed-in Tariff (FiT)', definition: 'A legacy UK government scheme (closed to new applicants in 2019) that paid homeowners for all the electricity they generated, plus an export rate. It has been replaced by the Smart Export Guarantee (SEG).' },
  { term: 'Flexi-Orb', definition: 'An alternative certification scheme to MCS in the UK, increasingly recognized by energy suppliers for export tariff eligibility.' },
  { term: 'Generation Meter', definition: 'A specific meter installed alongside a solar system to measure the exact amount of electricity the panels produce.' },
  { term: 'Grid-Tied System', definition: 'A solar setup that is connected to the National Grid, allowing you to draw power when the sun isn\'t shining and export power when you generate a surplus.' },
  { term: 'Ground Fault Protection', definition: 'A safety mechanism in the inverter that detects stray electrical currents leaking to the ground and shuts down the system to prevent electric shocks or fires.' },
  { term: 'G98 Application', definition: 'The DNO notification process for smaller UK solar installations (typically up to 3.68kW per phase, or 16 Amps). It is usually a "notify and fit" process.' },
  { term: 'G99 Application', definition: 'The DNO application required for larger UK solar installations (over 3.68kW per phase). You must apply and wait for permission before installation.' },
  { term: 'Half-Cut Cells', definition: 'A manufacturing technique where standard solar cells are cut in half. This reduces electrical resistance, improves efficiency, and makes the panel perform better in partial shade.' },
  { term: 'Hybrid Inverter', definition: 'An inverter that can simultaneously manage inputs from solar panels and inputs/outputs from a battery storage system. It acts as the central brain for a modern solar-plus-storage setup.' },
  { term: 'Insolation', definition: 'A measure of solar radiation energy received on a given surface area in a given time. Often expressed in kWh/m²/day.' },
  { term: 'Inverter', definition: 'The core component that converts the Direct Current (DC) electricity generated by solar panels into Alternating Current (AC) electricity used by home appliances.' },
  { term: 'Irradiance', definition: 'The instantaneous power of solar radiation per unit area, usually measured in Watts per square meter (W/m²).' },
  { term: 'Kilowatt (kW)', definition: 'A unit of electrical power equal to 1,000 Watts. Used to describe the instantaneous output of a solar system or the power draw of an appliance.' },
  { term: 'Kilowatt-hour (kWh)', definition: 'A unit of energy representing 1 kW of power sustained for 1 hour. Your energy bills and solar generation are measured in kWh.' },
  { term: 'Kilowatt Peak (kWp)', definition: 'The theoretical maximum power output of a solar panel or array under standard laboratory test conditions. A 4kWp system will rarely produce exactly 4kW in real-world UK conditions.' },
  { term: 'Levelized Cost of Energy (LCOE)', definition: 'A metric used to calculate the average total cost to build and operate a power-generating asset over its lifetime, divided by the total energy output. It helps compare solar to other energy sources.' },
  { term: 'LFP (Lithium Iron Phosphate)', definition: 'The safest and longest-lasting lithium-ion battery chemistry currently used in home solar storage, offering thousands of cycles with minimal degradation.' },
  { term: 'Load', definition: 'The electrical demand placed on a system by appliances, lights, and other devices.' },
  { term: 'Microgeneration Certification Scheme (MCS)', definition: 'The UK\'s primary quality assurance scheme for renewable energy installations. Using an MCS-certified installer is usually required to access export tariffs.' },
  { term: 'Microinverter', definition: 'A small inverter attached to the back of a single solar panel. Instead of sending DC power to a central string inverter, it converts it to AC on the roof. Excellent for heavily shaded roofs.' },
  { term: 'Monocrystalline', definition: 'Solar panels made from a single, continuous crystal structure of silicon. They are black in appearance, highly efficient, and the current industry standard.' },
  { term: 'MPPT (Maximum Power Point Tracking)', definition: 'Technology built into inverters and charge controllers that constantly adjusts the voltage and current to extract the absolute maximum power from the solar panels in changing weather.' },
  { term: 'Net Metering', definition: 'A billing mechanism used in some countries where exported solar power spins the electricity meter backward. The UK does not use net metering; instead, we use the Smart Export Guarantee (SEG).' },
  { term: 'NMC (Nickel Manganese Cobalt)', definition: 'A lithium-ion battery chemistry common in electric vehicles due to its high energy density, but increasingly being replaced by LFP in stationary home batteries due to lifespan and safety factors.' },
  { term: 'Off-Grid System', definition: 'A solar setup completely disconnected from the National Grid, requiring significant battery storage to provide power 24/7.' },
  { term: 'Oversizing (Inverter)', definition: 'Installing a solar array with a higher kWp rating than the inverter\'s maximum AC output. This is a common and safe practice that maximizes energy yield during lower-light winter months.' },
  { term: 'Passivated Emitter and Rear Cell (PERC)', definition: 'An architecture used in modern solar cells that adds a reflective layer to the back of the cell, bouncing unabsorbed light back through the silicon for a second chance at absorption.' },
  { term: 'Payback Period', definition: 'The amount of time it takes for the savings and export income generated by a solar system to equal the initial cost of installation. In the UK, this is typically 7 to 10 years.' },
  { term: 'Photovoltaic (PV)', definition: 'The technology and physical process of converting light (photons) directly into electricity (voltage).' },
  { term: 'Polycrystalline', definition: 'Solar panels made from multiple silicon fragments melted together. They have a blue, speckled appearance and are cheaper but less efficient than monocrystalline panels. Rarely used in new UK domestic installs today.' },
  { term: 'Power Purchase Agreement (PPA)', definition: 'A financial arrangement usually seen in commercial solar, where a third party installs and owns the panels on a roof, and the building owner buys the generated electricity at a reduced, locked-in rate.' },
  { term: 'Retrofit Battery', definition: 'Adding a battery storage system to a home that already has an existing solar panel array.' },
  { term: 'Return on Investment (ROI)', definition: 'A percentage that measures the financial gain of a solar system relative to its initial cost over its lifetime.' },
  { term: 'Shading', definition: 'When shadows from trees, chimneys, or neighboring buildings fall on solar panels, significantly reducing their power output.' },
  { term: 'Smart Export Guarantee (SEG)', definition: 'The current UK scheme requiring large energy suppliers to pay homeowners for the solar electricity they export to the grid.' },
  { term: 'Smart Meter', definition: 'A modern digital electricity meter that automatically sends half-hourly usage and export readings to your energy supplier. Required to access SEG tariffs.' },
  { term: 'Standard Test Conditions (STC)', definition: 'The laboratory conditions under which solar panels are tested and rated (1000 W/m² irradiance, 25°C cell temperature). Real-world performance is usually lower.' },
  { term: 'String', definition: 'A series of solar panels wired together in a single row, functioning like a chain of batteries. If one panel is heavily shaded without optimizers, the entire string\'s performance drops.' },
  { term: 'String Inverter', definition: 'A central inverter that manages the DC power from one or more "strings" of solar panels. It is the most common and cost-effective inverter setup.' },
  { term: 'Thermal Runaway', definition: 'A dangerous chain reaction in battery cells where an increase in temperature causes a further increase in temperature, potentially leading to a fire. LFP batteries are highly resistant to this.' },
  { term: 'Tier 1', definition: 'A financial rating given to solar panel manufacturers by Bloomberg New Energy Finance, indicating the company is financially stable and "bankable". It is widely used as a proxy for product reliability.' },
  { term: 'Tilt Angle', definition: 'The vertical angle at which solar panels are mounted relative to the horizontal ground. The optimal tilt in the UK is roughly 35 to 40 degrees.' },
  { term: 'Time of Use (ToU) Tariff', definition: 'An electricity tariff where the price of energy changes depending on the time of day (e.g., Octopus Flux or Intelligent Go). Crucial for maximizing battery storage ROI.' },
  { term: 'Volt (V)', definition: 'The standard unit of electrical potential or pressure. If electricity is water in a pipe, voltage is the water pressure.' },
  { term: 'Watt (W)', definition: 'The standard unit of electrical power, calculated by multiplying Volts by Amps.' },
  { term: 'Yield', definition: 'The total amount of electrical energy (kWh) generated by a solar PV system over a specific period, usually a year.' },
  { term: 'Zero Export', definition: 'A setting configured on an inverter that prevents the solar system from sending any excess power to the National Grid, usually required by the DNO in areas with severe grid congestion.' }
];

// Sort alphabetically
terms.sort((a, b) => a.term.localeCompare(b.term));

const fileContent = `export type GlossaryTerm = {
  term: string;
  definition: string;
};

export const glossaryData: GlossaryTerm[] = ${JSON.stringify(terms, null, 2)};
`;

fs.mkdirSync(path.join(__dirname, '../src/data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../src/data/glossary.ts'), fileContent);
console.log('Glossary data generated with ' + terms.length + ' terms.');
