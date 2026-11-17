export interface AlliedService {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  intro: string;
  features: string[];
  usedIn: string[];
  /** Optional key-specification chips shown on the service page */
  highlights?: string[];
  image: string;
}

/** The five allied products & services. Each one has its own page at /services/<slug>. */
export const ALLIED_SERVICES: AlliedService[] = [
  {
    slug: 'grounding-earthing',
    tag: 'Safety & Earthing',
    title: 'Grounding or Earthing Solutions',
    subtitle: 'Safety for people and assets',
    intro:
      'We audit and install earth pits, including maintenance-free chemical grounding, for plants, laboratories and commercial buildings. A good earth keeps people safe and protects equipment from fault and surge currents.',
    features: [
      'Auditing and testing of existing electrical earth pits',
      'Maintenance-free chemical grounding installation',
      'Earth resistance testing with certified test reports',
      'Exothermic welding for low-impedance permanent bonding',
    ],
    usedIn: ['Industrial plants', 'Laboratories', 'Commercial buildings'],
    image: '/images/gallery/grounding.jpg',
  },
  {
    slug: 'led-retrofits',
    tag: 'Energy Efficiency',
    title: 'Industrial LED Retrofits',
    subtitle: 'Energy-saving lighting',
    intro:
      'Supply and installation of LED light fittings for retrofits and new establishments. We look at your current lux levels first, so you can see the likely payback before you commit.',
    features: [
      'Factory and shop-floor high-bay LED retrofit projects',
      'Commercial office and cleanroom luminaires',
      'Lighting lux level auditing and ROI payback simulation',
      'Heavy-duty, surge-protected luminaires for harsh plants',
    ],
    usedIn: ['Factories and shop floors', 'Cleanrooms', 'Commercial offices'],
    image: '/images/resource/ind3.jpg',
  },
  {
    slug: 'lt-ht-cables',
    tag: 'Power Distribution',
    title: 'LT & HT Armoured and Unarmoured Cables',
    subtitle: 'Supply, laying and termination',
    intro:
      'Comprehensive Low-Tension (LT) and High-Tension (HT) cable solutions engineered for industrial power distribution. Available in heavy-duty armoured configurations (steel wire/tape armoured for harsh buried routes) and flexible unarmoured designs for plant machinery, switchgear and panel wiring. We supply them, lay them and terminate them.',
    features: [
      'LT and HT armoured and unarmoured cable supply',
      'Authorized Lapp Olflex and Uniplus bulk supply',
      'Cable laying and termination at site',
      'Cable glanding and conduit protection systems',
    ],
    usedIn: ['Industrial plants', 'Control panels', 'Buildings and utilities'],
    highlights: [
      'LT Cables (Up to 1.1 kV)',
      'HT Cables (3.3 kV - 33 kV)',
      'Steel Wire / Tape Armoured',
      'Flexible Unarmoured',
      'LAPP & Polycab Alliances',
      'IS 1554 / IS 7098 Compliant',
    ],
    image: '/images/gallery/lt-ht-cables.jpg',
  },
  {
    slug: 'mro-services',
    tag: 'Lifecycle',
    title: 'MRO Services',
    subtitle: 'Maintenance, Repair, and Overhaul',
    intro:
      'MRO (Maintenance, Repair, and Overhaul) support for plant equipment and day-to-day operations. Tell us what you need to keep running and we will help you source it.',
    features: [
      'Support for maintenance, repair and overhaul requirements',
      'Spares and replacement parts from our authorised brands',
      'Help with urgent and breakdown requirements',
      'One team for products, sourcing and follow-up',
    ],
    usedIn: ['Plant maintenance teams', 'OEMs and machine builders', 'Project sites'],
    image: '/images/gallery/mro-services.jpg',
  },
  {
    slug: 'consumables-equipment',
    tag: 'Consumables',
    title: 'Industrial Electrical Consumables & Equipment',
    subtitle: 'MRO and allied supplies',
    intro:
      'Glands, lugs, sleeves and other electrical consumables and equipment for plants, panels and projects. The small parts that every installation and shutdown needs.',
    features: [
      'Cable glands and counter nuts',
      'Cable lugs and terminations',
      'Marking sleeves and wire markers',
      'MRO supplies for plant upkeep',
    ],
    usedIn: ['Panel builders', 'Plants and projects', 'Maintenance stores'],
    image: '/images/gallery/consumables-warehouse.jpg',
  },
];