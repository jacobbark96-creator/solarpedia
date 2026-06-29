export type GlossaryTerm = {
  term: string;
  definition: string;
};

export const glossaryData: GlossaryTerm[] = [
  {
    "term": "AC Coupled Battery",
    "definition": "A battery system that connects to the alternating current (AC) side of your home wiring, requiring its own separate inverter. Often used when retrofitting batteries to existing solar arrays."
  },
  {
    "term": "Active Power",
    "definition": "The actual power (measured in Watts) that does useful work in an electrical circuit, as opposed to reactive power."
  },
  {
    "term": "Aerosol Soiling",
    "definition": "The accumulation of airborne particles (like dust, smog, or pollen) on solar panels, which can reduce their efficiency over time."
  },
  {
    "term": "Agrivoltaics",
    "definition": "The co-development of land for both solar photovoltaic power and agriculture, such as raising crops or grazing sheep beneath raised solar panels."
  },
  {
    "term": "Albedo",
    "definition": "The measure of how much sunlight is reflected by a surface. High albedo surfaces (like snow or white roofs) reflect more light, which can boost the output of bifacial solar panels."
  },
  {
    "term": "Alternating Current (AC)",
    "definition": "The standard type of electricity used in homes and supplied by the National Grid. Solar panels generate Direct Current (DC), which an inverter converts into AC."
  },
  {
    "term": "Amorphous Silicon",
    "definition": "A type of solar cell made from non-crystalline silicon. Less efficient than mono or poly crystalline cells, but often cheaper and flexible."
  },
  {
    "term": "Ampere (Amp or A)",
    "definition": "The standard unit used to measure the rate of flow of an electric current."
  },
  {
    "term": "Ampere-hour (Ah)",
    "definition": "A unit of electrical charge capacity. Often used alongside kWh to describe battery storage capacity."
  },
  {
    "term": "Anti-Islanding",
    "definition": "A mandatory safety feature in grid-tied inverters that instantly shuts down the solar system during a power cut, preventing electricity from flowing back into the grid and injuring engineers."
  },
  {
    "term": "Anti-reflective Coating (ARC)",
    "definition": "A thin layer applied to the surface of solar cells or the glass covering them to reduce light reflection and increase light absorption."
  },
  {
    "term": "Array",
    "definition": "A complete collection of interconnected solar panels functioning as a single unit."
  },
  {
    "term": "Availability",
    "definition": "The percentage of time a solar PV system is fully operational and capable of generating power when sunlight is present."
  },
  {
    "term": "Azimuth",
    "definition": "The compass angle or orientation of a roof relative to due North (which is 0° or 360°). In the UK, a South-facing roof has an azimuth of 180°."
  },
  {
    "term": "Backup Gateway",
    "definition": "A specialized electrical component installed with a home battery system that physically disconnects the house from the grid during a power cut, allowing the battery to power the home safely."
  },
  {
    "term": "Balance of System (BOS)",
    "definition": "All the components of a solar PV system other than the panels themselves. This includes the inverter, mounting hardware, wiring, switches, and batteries."
  },
  {
    "term": "Base Load",
    "definition": "The minimum level of electricity demand required continuously over a 24-hour period to keep essential appliances running (e.g., fridge, router, standby devices)."
  },
  {
    "term": "Battery Energy Storage System (BESS)",
    "definition": "The formal industry term for a home or commercial battery setup used to store excess solar energy."
  },
  {
    "term": "Battery Management System (BMS)",
    "definition": "The electronic brain inside a battery pack that monitors cell temperature, voltage, and state of charge to ensure safe operation and maximize lifespan."
  },
  {
    "term": "Bifacial Panels",
    "definition": "Solar panels designed with solar cells on both the front and back, allowing them to capture direct sunlight from above and reflected sunlight from below. Mostly used in ground-mounted or commercial setups."
  },
  {
    "term": "Blackout Protection (EPS)",
    "definition": "An Emergency Power Supply (EPS) feature that allows a solar battery system to continue powering essential circuits in the house during a grid power cut."
  },
  {
    "term": "Brownout",
    "definition": "A temporary drop in electrical voltage from the grid, which can cause lights to dim. Advanced solar inverters can protect home appliances from brownouts."
  },
  {
    "term": "Building Integrated Photovoltaics (BIPV)",
    "definition": "Solar materials that replace conventional building materials, such as solar roof tiles or solar glass windows, rather than being mounted on top of them."
  },
  {
    "term": "Busbar",
    "definition": "The metallic strips printed on the front of a solar cell that conduct the electrical current generated by the cell."
  },
  {
    "term": "Bypass Diode",
    "definition": "A component built into solar panels that allows current to \"bypass\" shaded or damaged cells, preventing a small amount of shade from crippling the output of the entire panel."
  },
  {
    "term": "Capacitor",
    "definition": "An electronic component inside an inverter that stores and releases electrical energy quickly, helping to smooth out the conversion from DC to AC."
  },
  {
    "term": "Capacity Factor",
    "definition": "The ratio of the actual energy produced by a solar system over a year compared to its maximum possible output if it operated at 100% capacity 24/7."
  },
  {
    "term": "Cell",
    "definition": "The basic building block of a solar panel. Most residential solar panels consist of 54, 60, or 72 individual solar cells wired together."
  },
  {
    "term": "Cell Efficiency",
    "definition": "The percentage of light hitting a single, bare solar cell that is converted into electricity. This is always slightly higher than the overall \"Panel Efficiency\"."
  },
  {
    "term": "Charge Controller",
    "definition": "A device used in off-grid or battery systems that regulates the voltage and current coming from the solar panels to prevent the battery from overcharging."
  },
  {
    "term": "Charge Rate (C-Rate)",
    "definition": "A measure of the rate at which a battery is charged or discharged relative to its maximum capacity. A 1C rate means fully charging or discharging the battery in exactly one hour."
  },
  {
    "term": "Clipping",
    "definition": "When a solar array generates more DC power than the inverter can convert into AC power. The inverter \"clips\" the excess, capping the output at its maximum rating."
  },
  {
    "term": "Combiner Box",
    "definition": "An electrical enclosure where multiple strings of solar panels are wired together in parallel before the combined current is sent down to the inverter."
  },
  {
    "term": "Conduit",
    "definition": "The protective tubing (usually PVC or metal) used to safely route electrical wiring from the solar panels on the roof down to the inverter."
  },
  {
    "term": "Current",
    "definition": "The flow of electrical charge through a conductor, measured in Amperes (Amps)."
  },
  {
    "term": "Current Transformer (CT) Clamp",
    "definition": "A small sensor clipped around the main incoming power cable of a house. It measures how much electricity is flowing to or from the grid, which is essential for battery and export control."
  },
  {
    "term": "Curtailment",
    "definition": "When a solar inverter is forced to reduce its power output below what the panels are capable of generating, usually due to grid voltage limits or export caps set by the DNO."
  },
  {
    "term": "Cycle Life",
    "definition": "The number of complete charge and discharge cycles a battery can perform before its capacity degrades to a specified percentage (usually 80% or 70% of its original capacity)."
  },
  {
    "term": "Data Logger",
    "definition": "A device, often built into the inverter, that records generation, usage, and export data, sending it to the cloud so you can view it on a smartphone app."
  },
  {
    "term": "DC Coupled Battery",
    "definition": "A battery system that connects directly to the direct current (DC) side of your solar panels, sharing a single hybrid inverter. Generally more efficient than AC coupled systems."
  },
  {
    "term": "Degradation",
    "definition": "The gradual loss of efficiency in solar panels or capacity in batteries over time. Tier 1 solar panels typically degrade by about 0.4% to 0.5% per year."
  },
  {
    "term": "Demand Side Response (DSR)",
    "definition": "A scheme where consumers are incentivized financially to lower or shift their electricity usage during peak times to help balance the National Grid."
  },
  {
    "term": "Depth of Discharge (DoD)",
    "definition": "The percentage of a battery's capacity that has been used relative to its total capacity. Many modern LFP batteries allow 100% DoD."
  },
  {
    "term": "Design Life",
    "definition": "The expected operating lifetime of a component under normal conditions. Tier 1 solar panels usually have a design life of 25-30 years."
  },
  {
    "term": "Diffuse Irradiance",
    "definition": "Sunlight that has been scattered by clouds or the atmosphere before reaching the solar panels. UK solar systems rely heavily on diffuse irradiance in winter."
  },
  {
    "term": "Diode",
    "definition": "An electronic component that allows current to flow in only one direction. Crucial for preventing batteries from discharging back into the solar panels at night."
  },
  {
    "term": "Direct Current (DC)",
    "definition": "Electricity that flows in one continuous direction. Solar panels and batteries operate on DC, which must be converted to AC for household use."
  },
  {
    "term": "Direct Irradiance",
    "definition": "Sunlight that reaches the solar panels in a straight line from the sun without being scattered by clouds or atmospheric particles."
  },
  {
    "term": "Disconnect Switch (Isolator)",
    "definition": "A safety switch used to manually cut off the flow of electricity between the solar panels, the inverter, or the grid. Required by UK electrical regulations."
  },
  {
    "term": "DNO (Distribution Network Operator)",
    "definition": "The company that owns and operates the power lines and infrastructure connecting your home to the National Grid. You or your installer must notify them (via G98 or G99 applications) when installing solar."
  },
  {
    "term": "Dynamic Pricing",
    "definition": "Electricity tariffs where the price changes frequently (sometimes every 30 minutes) based on wholesale energy costs. Ideal for homes with smart batteries."
  },
  {
    "term": "Efficiency",
    "definition": "The percentage of sunlight hitting a solar panel that is converted into usable electricity. Modern panels typically have an efficiency of 20% to 23%."
  },
  {
    "term": "Energy Density",
    "definition": "The amount of energy stored in a given system or region of space per unit volume. NMC batteries have higher energy density than LFP, making them smaller and lighter."
  },
  {
    "term": "Energy Performance Certificate (EPC)",
    "definition": "A rating (A-G) of a property's energy efficiency. Previously, a grade of D or above was strictly required to claim the UK Feed-in Tariff."
  },
  {
    "term": "Export Cap",
    "definition": "A strict limit set by the DNO on the maximum amount of kW a solar system is legally allowed to send to the National Grid at any one time."
  },
  {
    "term": "Export Limitation",
    "definition": "A system setup that actively monitors home energy use and restricts the amount of solar power sent to the grid to comply with strict DNO limits."
  },
  {
    "term": "Export Tariff",
    "definition": "The rate you are paid by an energy supplier for sending your excess generated electricity back to the grid."
  },
  {
    "term": "Fault Ride Through (FRT)",
    "definition": "The capability of an inverter to remain connected to the grid during short periods of grid voltage instability or faults, rather than tripping off immediately."
  },
  {
    "term": "Feed-in Tariff (FiT)",
    "definition": "A legacy UK government scheme (closed to new applicants in 2019) that paid homeowners for all the electricity they generated, plus an export rate. It has been replaced by the Smart Export Guarantee (SEG)."
  },
  {
    "term": "Flexi-Orb",
    "definition": "An alternative certification scheme to MCS in the UK, increasingly recognized by energy suppliers for export tariff eligibility."
  },
  {
    "term": "G98 Application",
    "definition": "The DNO notification process for smaller UK solar installations (typically up to 3.68kW per phase, or 16 Amps). It is usually a \"notify and fit\" process."
  },
  {
    "term": "G99 Application",
    "definition": "The DNO application required for larger UK solar installations (over 3.68kW per phase). You must apply and wait for permission before installation."
  },
  {
    "term": "Generation Meter",
    "definition": "A specific meter installed alongside a solar system to measure the exact amount of electricity the panels produce."
  },
  {
    "term": "Grid Congestion",
    "definition": "When the local electrical grid reaches its physical capacity to transmit electricity. High congestion often leads DNOs to reject large solar applications or impose strict export limits."
  },
  {
    "term": "Grid Edge",
    "definition": "The point where the local electricity distribution network connects to a consumer’s property (e.g., the smart meter)."
  },
  {
    "term": "Grid Parity",
    "definition": "The point at which the cost of generating electricity from solar panels is equal to or cheaper than buying power from the National Grid."
  },
  {
    "term": "Grid-Tied System",
    "definition": "A solar setup that is connected to the National Grid, allowing you to draw power when the sun isn't shining and export power when you generate a surplus."
  },
  {
    "term": "Ground Fault Protection",
    "definition": "A safety mechanism in the inverter that detects stray electrical currents leaking to the ground and shuts down the system to prevent electric shocks or fires."
  },
  {
    "term": "Half-Cut Cells",
    "definition": "A manufacturing technique where standard solar cells are cut in half. This reduces electrical resistance, improves efficiency, and makes the panel perform better in partial shade."
  },
  {
    "term": "Half-Hourly Settlement",
    "definition": "A mechanism where electricity usage and generation are recorded and priced in 30-minute blocks. Essential for dynamic ToU tariffs like Octopus Flux."
  },
  {
    "term": "Heat Pump",
    "definition": "A highly efficient electrical heating system that extracts heat from the air or ground. Pairing a heat pump with solar panels drastically reduces home heating costs."
  },
  {
    "term": "Hertz (Hz)",
    "definition": "The unit of frequency. In the UK, the standard AC electrical grid operates at a frequency of 50 Hz."
  },
  {
    "term": "Hot Spot",
    "definition": "A localized area on a solar panel that becomes excessively hot due to shading or cell damage, which can lead to permanent damage if bypass diodes fail."
  },
  {
    "term": "Hybrid Inverter",
    "definition": "An inverter that can simultaneously manage inputs from solar panels and inputs/outputs from a battery storage system. It acts as the central brain for a modern solar-plus-storage setup."
  },
  {
    "term": "Infrared Thermography",
    "definition": "A technique using thermal cameras to inspect solar arrays for hot spots, faulty cells, or loose connections during maintenance."
  },
  {
    "term": "Initial Charge",
    "definition": "The very first charging cycle of a new home battery system, usually managed carefully by the installer to calibrate the Battery Management System."
  },
  {
    "term": "Insolation",
    "definition": "A measure of solar radiation energy received on a given surface area in a given time. Often expressed in kWh/m²/day."
  },
  {
    "term": "Interconnection",
    "definition": "The physical and legal process of connecting a home solar PV system to the National Grid."
  },
  {
    "term": "Inverter",
    "definition": "The core component that converts the Direct Current (DC) electricity generated by solar panels into Alternating Current (AC) electricity used by home appliances."
  },
  {
    "term": "Inverter Efficiency",
    "definition": "The ratio of usable AC output power to DC input power. High-quality string inverters typically operate at 97% to 98% efficiency."
  },
  {
    "term": "Irradiance",
    "definition": "The instantaneous power of solar radiation per unit area, usually measured in Watts per square meter (W/m²)."
  },
  {
    "term": "Islanding",
    "definition": "A dangerous condition where a grid-tied solar system continues to supply power to the local grid during a wider power outage."
  },
  {
    "term": "Junction Box",
    "definition": "An enclosure attached to the back of a solar panel that houses the electrical connections and bypass diodes."
  },
  {
    "term": "Kilowatt (kW)",
    "definition": "A unit of electrical power equal to 1,000 Watts. Used to describe the instantaneous output of a solar system or the power draw of an appliance."
  },
  {
    "term": "Kilowatt Peak (kWp)",
    "definition": "The theoretical maximum power output of a solar panel or array under standard laboratory test conditions. A 4kWp system will rarely produce exactly 4kW in real-world UK conditions."
  },
  {
    "term": "Kilowatt-hour (kWh)",
    "definition": "A unit of energy representing 1 kW of power sustained for 1 hour. Your energy bills and solar generation are measured in kWh."
  },
  {
    "term": "Levelized Cost of Energy (LCOE)",
    "definition": "A metric used to calculate the average total cost to build and operate a power-generating asset over its lifetime, divided by the total energy output. It helps compare solar to other energy sources."
  },
  {
    "term": "Levelized Cost of Storage (LCOS)",
    "definition": "A metric used to calculate the lifetime cost of a battery storage system per unit of energy discharged. It helps compare different battery chemistries."
  },
  {
    "term": "LFP (Lithium Iron Phosphate)",
    "definition": "The safest and longest-lasting lithium-ion battery chemistry currently used in home solar storage, offering thousands of cycles with minimal degradation."
  },
  {
    "term": "Lifecycle Assessment (LCA)",
    "definition": "The evaluation of the environmental impacts associated with all stages of a solar panel’s life, from raw material extraction through materials processing, manufacture, distribution, use, and recycling."
  },
  {
    "term": "Load",
    "definition": "The electrical demand placed on a system by appliances, lights, and other devices."
  },
  {
    "term": "Load Shifting",
    "definition": "The practice of moving heavy electricity usage (like running a washing machine or charging an EV) to times when solar generation is high or grid tariffs are cheapest."
  },
  {
    "term": "Low Voltage Directive (LVD)",
    "definition": "A set of European/UK regulations ensuring that electrical equipment within certain voltage limits provides a high level of protection for European citizens."
  },
  {
    "term": "Main Panel Upgrade (MPU)",
    "definition": "The process of upgrading a home’s main consumer unit (fuse box) to handle the additional electrical load and complexity of solar, batteries, and EV chargers."
  },
  {
    "term": "Maximum Power Point (MPP)",
    "definition": "The exact point on a solar panel's voltage-current curve where it produces the absolute maximum electrical power."
  },
  {
    "term": "Microgeneration Certification Scheme (MCS)",
    "definition": "The UK's primary quality assurance scheme for renewable energy installations. Using an MCS-certified installer is usually required to access export tariffs."
  },
  {
    "term": "Microgrid",
    "definition": "A localized group of electricity sources and loads that normally operates connected to the traditional wide area synchronous grid, but can also disconnect to \"island\" autonomously."
  },
  {
    "term": "Microinverter",
    "definition": "A small inverter attached to the back of a single solar panel. Instead of sending DC power to a central string inverter, it converts it to AC on the roof. Excellent for heavily shaded roofs."
  },
  {
    "term": "Monocrystalline",
    "definition": "Solar panels made from a single, continuous crystal structure of silicon. They are black in appearance, highly efficient, and the current industry standard."
  },
  {
    "term": "MPPT (Maximum Power Point Tracking)",
    "definition": "Technology built into inverters and charge controllers that constantly adjusts the voltage and current to extract the absolute maximum power from the solar panels in changing weather."
  },
  {
    "term": "N-Type Silicon",
    "definition": "A newer, more advanced type of silicon wafer manufacturing that treats the silicon with phosphorus. N-type panels degrade slower and perform better in high heat than older P-type panels."
  },
  {
    "term": "National Grid",
    "definition": "The high-voltage electric power transmission network in Great Britain, connecting power stations and major substations."
  },
  {
    "term": "Net Metering",
    "definition": "A billing mechanism used in some countries where exported solar power spins the electricity meter backward. The UK does not use net metering; instead, we use the Smart Export Guarantee (SEG)."
  },
  {
    "term": "Night Time Consumption",
    "definition": "The total amount of electricity a household uses between sunset and sunrise. This metric is critical for correctly sizing a home solar battery."
  },
  {
    "term": "NMC (Nickel Manganese Cobalt)",
    "definition": "A lithium-ion battery chemistry common in electric vehicles due to its high energy density, but increasingly being replaced by LFP in stationary home batteries due to lifespan and safety factors."
  },
  {
    "term": "Nominal Capacity",
    "definition": "The total theoretical energy capacity of a battery. The \"usable capacity\" is usually lower to protect the battery from degrading."
  },
  {
    "term": "O&M (Operations and Maintenance)",
    "definition": "The ongoing process of monitoring, cleaning, and repairing a solar PV system to ensure it continues to operate at peak efficiency."
  },
  {
    "term": "Off-Grid System",
    "definition": "A solar setup completely disconnected from the National Grid, requiring significant battery storage to provide power 24/7."
  },
  {
    "term": "Optimizer",
    "definition": "A small device attached to individual solar panels that performs MPPT at the panel level, mitigating the effects of shade without converting the DC power to AC on the roof."
  },
  {
    "term": "Orientation",
    "definition": "The compass direction that the solar panels face (Azimuth)."
  },
  {
    "term": "Oversizing (Inverter)",
    "definition": "Installing a solar array with a higher kWp rating than the inverter's maximum AC output. This is a common and safe practice that maximizes energy yield during lower-light winter months."
  },
  {
    "term": "P-Type Silicon",
    "definition": "The traditional method of manufacturing silicon wafers by treating them with boron. They are cheaper to produce but degrade slightly faster than N-type panels."
  },
  {
    "term": "Part L Building Regulations",
    "definition": "UK building regulations concerning the conservation of fuel and power. Installing solar panels often helps new builds or extensions comply with Part L."
  },
  {
    "term": "Passivated Emitter and Rear Cell (PERC)",
    "definition": "An architecture used in modern solar cells that adds a reflective layer to the back of the cell, bouncing unabsorbed light back through the silicon for a second chance at absorption."
  },
  {
    "term": "Payback Period",
    "definition": "The amount of time it takes for the savings and export income generated by a solar system to equal the initial cost of installation. In the UK, this is typically 7 to 10 years."
  },
  {
    "term": "Peak Demand",
    "definition": "The time of day when electricity consumption on the National Grid is at its highest, typically between 4pm and 7pm in the UK."
  },
  {
    "term": "Peak Power",
    "definition": "The maximum power output that a solar panel, inverter, or battery can sustain for a short period (usually seconds) without sustaining damage."
  },
  {
    "term": "Phantom Load",
    "definition": "The electricity consumed by appliances and electronics while they are switched off or in standby mode."
  },
  {
    "term": "Phase (Single-Phase vs Three-Phase)",
    "definition": "The method of AC power distribution. Most UK homes are single-phase (limited to ~100 Amps total), while large commercial sites are three-phase."
  },
  {
    "term": "Photovoltaic (PV)",
    "definition": "The technology and physical process of converting light (photons) directly into electricity (voltage)."
  },
  {
    "term": "Photovoltaic Effect",
    "definition": "The physical and chemical phenomenon where light (photons) strikes a semiconductor material (like silicon) and knocks electrons loose, creating an electrical current."
  },
  {
    "term": "Pitch",
    "definition": "The angle or steepness of a roof. In the UK, a pitch between 30° and 40° is considered optimal for solar generation."
  },
  {
    "term": "Polycrystalline",
    "definition": "Solar panels made from multiple silicon fragments melted together. They have a blue, speckled appearance and are cheaper but less efficient than monocrystalline panels. Rarely used in new UK domestic installs today."
  },
  {
    "term": "Power Conditioner",
    "definition": "A device intended to improve the quality of the power that is delivered to electrical load equipment."
  },
  {
    "term": "Power Factor",
    "definition": "The ratio of working power (Active Power) to apparent power in an AC circuit. Inverters must manage power factor to keep the grid stable."
  },
  {
    "term": "Power Purchase Agreement (PPA)",
    "definition": "A financial arrangement usually seen in commercial solar, where a third party installs and owns the panels on a roof, and the building owner buys the generated electricity at a reduced, locked-in rate."
  },
  {
    "term": "Radiant Energy",
    "definition": "Energy transmitted in wave motion, especially electromagnetic wave motion (like sunlight)."
  },
  {
    "term": "Reactive Power",
    "definition": "Power that flows back and forth in an AC circuit without doing useful work. Inverters are sometimes required by the DNO to inject or absorb reactive power to stabilize grid voltage."
  },
  {
    "term": "Retrofit Battery",
    "definition": "Adding a battery storage system to a home that already has an existing solar panel array."
  },
  {
    "term": "Return on Investment (ROI)",
    "definition": "A percentage that measures the financial gain of a solar system relative to its initial cost over its lifetime."
  },
  {
    "term": "Self-Consumption",
    "definition": "The percentage of the solar energy generated by your system that is actually used inside your home, rather than being exported to the grid."
  },
  {
    "term": "Self-Discharge",
    "definition": "The natural loss of charge that occurs in a battery even when it is not connected to any load. Modern LFP batteries have a very low self-discharge rate."
  },
  {
    "term": "Shading",
    "definition": "When shadows from trees, chimneys, or neighboring buildings fall on solar panels, significantly reducing their power output."
  },
  {
    "term": "Smart Export Guarantee (SEG)",
    "definition": "The current UK scheme requiring large energy suppliers to pay homeowners for the solar electricity they export to the grid."
  },
  {
    "term": "Smart Grid",
    "definition": "An electricity supply network that uses digital communications technology to detect and react to local changes in usage."
  },
  {
    "term": "Smart Meter",
    "definition": "A modern digital electricity meter that automatically sends half-hourly usage and export readings to your energy supplier. Required to access SEG tariffs."
  },
  {
    "term": "Smart Tariff",
    "definition": "An electricity tariff that requires a smart meter and offers rates that vary depending on the time of day, overall grid demand, or wholesale energy prices."
  },
  {
    "term": "Solar Fraction",
    "definition": "The percentage of a building’s total energy demand that is supplied by solar power."
  },
  {
    "term": "Solar Keymark",
    "definition": "A voluntary third-party certification mark for solar thermal products, demonstrating to end-users that a product conforms to the relevant European standards."
  },
  {
    "term": "Solar Window",
    "definition": "The period of the day when the sun is unshaded and high enough in the sky to produce significant solar power."
  },
  {
    "term": "Standard Test Conditions (STC)",
    "definition": "The laboratory conditions under which solar panels are tested and rated (1000 W/m² irradiance, 25°C cell temperature). Real-world performance is usually lower."
  },
  {
    "term": "State of Charge (SoC)",
    "definition": "The current level of charge in a battery, expressed as a percentage of its total capacity (e.g., your phone battery is at 80% SoC)."
  },
  {
    "term": "State of Health (SoH)",
    "definition": "A percentage indicating the current maximum capacity of a battery compared to its original maximum capacity when it was brand new."
  },
  {
    "term": "String",
    "definition": "A series of solar panels wired together in a single row, functioning like a chain of batteries. If one panel is heavily shaded without optimizers, the entire string's performance drops."
  },
  {
    "term": "String Inverter",
    "definition": "A central inverter that manages the DC power from one or more \"strings\" of solar panels. It is the most common and cost-effective inverter setup."
  },
  {
    "term": "String Sizing",
    "definition": "The careful calculation required to ensure that the total voltage of a series of connected solar panels falls within the safe operating range of the chosen inverter."
  },
  {
    "term": "Substation",
    "definition": "A part of the electrical generation, transmission, and distribution system where voltage is transformed from high to low, or the reverse."
  },
  {
    "term": "Surge Capacity",
    "definition": "The maximum amount of short-term power an inverter or battery can provide to start up heavy appliances (like a heat pump or air conditioner) that require a sudden spike in electricity."
  },
  {
    "term": "Temperature Coefficient",
    "definition": "A rating that shows how much a solar panel's efficiency drops for every 1°C increase in temperature above 25°C. Lower is better, as panels lose efficiency when they get hot."
  },
  {
    "term": "Thermal Runaway",
    "definition": "A dangerous chain reaction in battery cells where an increase in temperature causes a further increase in temperature, potentially leading to a fire. LFP batteries are highly resistant to this."
  },
  {
    "term": "Tier 1",
    "definition": "A financial rating given to solar panel manufacturers by Bloomberg New Energy Finance, indicating the company is financially stable and \"bankable\". It is widely used as a proxy for product reliability."
  },
  {
    "term": "Tilt Angle",
    "definition": "The vertical angle at which solar panels are mounted relative to the horizontal ground. The optimal tilt in the UK is roughly 35 to 40 degrees."
  },
  {
    "term": "Time of Use (ToU) Tariff",
    "definition": "An electricity tariff where the price of energy changes depending on the time of day (e.g., Octopus Flux or Intelligent Go). Crucial for maximizing battery storage ROI."
  },
  {
    "term": "Tracking Array",
    "definition": "A solar panel mounting system that physically moves throughout the day to follow the sun’s path, maximizing generation. Very rare in UK domestic settings."
  },
  {
    "term": "Utility-Scale Solar",
    "definition": "Massive solar farms that generate electricity directly for the National Grid, rather than for a specific building or home."
  },
  {
    "term": "V2G (Vehicle-to-Grid)",
    "definition": "Technology that allows an electric vehicle to not only draw power from the grid but also discharge the energy stored in its battery back to the National Grid to balance demand."
  },
  {
    "term": "V2H (Vehicle-to-Home)",
    "definition": "A system where an electric vehicle's battery is used to power the owner's house during a power cut or peak pricing period, functioning like a massive home battery."
  },
  {
    "term": "Volt (V)",
    "definition": "The standard unit of electrical potential or pressure. If electricity is water in a pipe, voltage is the water pressure."
  },
  {
    "term": "Voltage (V)",
    "definition": "The measure of electrical potential difference between two points. It is the \"pressure\" that pushes electrons through a wire."
  },
  {
    "term": "Voltage Drop",
    "definition": "The loss of electrical voltage caused by the resistance of the cables between the solar panels and the inverter. Installers must use thick enough cables to minimize this."
  },
  {
    "term": "Watt (W)",
    "definition": "The standard unit of electrical power, calculated by multiplying Volts by Amps."
  },
  {
    "term": "Watt-hour (Wh)",
    "definition": "A unit of energy equivalent to one Watt of power expended for one hour."
  },
  {
    "term": "Yield",
    "definition": "The total amount of electrical energy (kWh) generated by a solar PV system over a specific period, usually a year."
  },
  {
    "term": "Yield Curve",
    "definition": "A graph showing the energy production of a solar system over a specific period, usually rising in the morning, peaking at midday, and falling in the evening."
  },
  {
    "term": "Zero Export",
    "definition": "A setting configured on an inverter that prevents the solar system from sending any excess power to the National Grid, usually required by the DNO in areas with severe grid congestion."
  }
];
