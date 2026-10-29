export interface IndustryItem {
  name: string;
  desc: string;
  image: string; // drop a relevant photo at this path in /public
}

// Images live in /public/images/industries. Final list = 16 segments (client to confirm wording).
// Every industry must point to its own, different photo (no file used twice).
// Replace each still with a photo that shows the supplied products (cables, connectors, breakers) in use.
export const INDUSTRIES: IndustryItem[] = [
  { name: 'Automobile & Rail Transport', desc: 'Flexible control and power cables, connectors and glands for assembly lines, robotic cells and vehicle manufacturing plants.', image: '/images/industries/automobile-rail-transport.jpg' },
  { name: 'Automation & Robotics', desc: 'Robot-grade flexible servo, data and Ethernet cables, connectors and motor protection used inside robotic cells and conveyor systems.', image: '/images/industries/automation-robotics.jpg' },
  { name: 'Mechanical & Plant Engineering', desc: 'Cables, connectors, circuit breakers and contactors installed on machines and in plant control panels.', image: '/images/industries/mechanical-plant-engineering.jpg' },
  { name: 'OEM & Machine Manufacturers', desc: 'Custom harness, motor circuit breakers and flexible cables for machine builders.', image: '/images/industries/oem-machines.jpg' },
  { name: 'Panel Builders & System Integrators', desc: 'Contactors, pilot devices, wire marking and DIN-rail components for control panels.', image: '/images/industries/panel-builders.jpg' },
  { name: 'Renewable Energy (Solar & Wind)', desc: 'UV-resistant cables, connectors and protection for solar and wind installations.', image: '/images/industries/renewable-energy.jpg' },
  { name: 'Food & Beverage', desc: 'Washdown-rated pilot devices and cables for hygienic production lines.', image: '/images/industries/food-beverage-production.jpg' },
  { name: 'Oil, Gas, Chemical & Paint', desc: 'Chemical-resistant cables, glands and plugs for process plants.', image: '/images/industries/oil-gas-chemical.jpg' },
  { name: 'Steel & Cement', desc: 'Heavy-duty contactors, glands and conduit for demanding plant conditions.', image: '/images/industries/steel-cement.jpg' },
  { name: 'Packaging Machinery', desc: 'Drag-chain cables, industrial Ethernet and connectors for high-speed machines.', image: '/images/industries/packaging.jpg' },
  { name: 'Pharmaceutical & Bio Tech', desc: 'Washdown pilot switches, cables and marking for cleanroom and process areas.', image: '/images/industries/pharmaceutical-cleanroom.jpg' },
  { name: 'Research & Development', desc: 'Data and control cables and switchgear for laboratories and test setups.', image: '/images/industries/research-laboratory.jpg' },
  { name: 'Garment & Textile', desc: 'Control cables, plugs and motor protection for textile machinery.', image: '/images/industries/garment-textile.jpg' },
  { name: 'Construction & Contract Projects', desc: 'Site power distribution units, CEE plugs and sockets, cables and switchgear supplied project-wise with documentation.', image: '/images/industries/construction.jpg' },
  { name: 'Marine Engineering', desc: 'Approved cables, glands and plugs for marine and offshore use.', image: '/images/industries/marine-offshore-engineering.jpg' },
  { name: 'Defense', desc: 'Fire-retardant wiring and precision connectors for defense electronics.', image: '/images/industries/defense-electronics.jpg' },
];

/**
 * Which industries each authorised brand serves (keyed by brand id in BRANDS_DATA).
 * Edit these lists to change what shows under each brand.
 */
export const BRAND_INDUSTRIES: Record<string, string[]> = {
  lapp: [
    'Automobile & Rail Transport', 'Automation & Robotics', 'Marine Engineering', 'Defense',
  ],
  eaton: [
    'Panel Builders & System Integrators', 'Pharmaceutical & Bio Tech', 'Food & Beverage', 'Research & Development',
  ],
  partex: [
    'Panel Builders & System Integrators', 'OEM & Machine Manufacturers', 'Marine Engineering', 'Defense',
  ],
  mennekes: [
    'Construction & Contract Projects', 'Oil, Gas, Chemical & Paint', 'Steel & Cement', 'Mechanical & Plant Engineering',
  ],
};

export const getIndustriesForBrand = (brandId: string): IndustryItem[] =>
  (BRAND_INDUSTRIES[brandId] ?? [])
    .slice(0, 4)
    .map((name) => INDUSTRIES.find((i) => i.name === name))
    .filter((i): i is IndustryItem => Boolean(i));