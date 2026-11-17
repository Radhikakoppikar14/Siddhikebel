export interface BrandInfo {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  logo: string;
  featuredImg: string;
  categories: string[];
  productCount: string;
  origin: string;
  color: string;      // official brand colour
  colorDark: string;  // darker shade for text on light backgrounds
  colorTint: string;  // very light wash for card backgrounds
}

export interface ProductItem {
  id: string;
  brandId: string;
  brandName: string;
  name: string;
  category: string;
  code?: string;
  shortDesc: string;
  details: string;
  specifications: { label: string; value: string }[];
  image?: string;          // leave out until a real product photo is available (a clean placeholder is shown)
  imagePosition?: string;  // CSS object-position, e.g. 'left center' when one photo shows two products
  standards: string[];
  isFeatured?: boolean;
}

export interface ClientPartner {
  name: string;
  logo: string;
  industry: string;
  /** Optional zoom for logo files that have a lot of empty space around them (1 = normal). */
  scale?: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  /** Optional: leave out when no client names are to be shown */
  clients?: string;
  summary: string;
  highlights: string[];
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
}

export interface SpecialOfferItem {
  partNo: string;
  description: string;
  category: string;
  brand: string;
  status: string;
  unit: string;
}

export const COMPANY_INFO = {
  name: "Siddhi Kabel Corporation Private Limited",
  shortName: "Siddhi Kabel",
  tagline: "Dependable Electrical Solutions for your Industrial Requirements",
  headline: "Transforming Indian Industry With Innovative Engineering Products",
  description:
    "Siddhi Kabel Corporation Private Limited supplies industrial electrical, automation and safety products. 33+ years of industry experience.",
  establishedYear: "2008",
  experienceYears: "33+",
  segmentsServed: "16+",
  customersServed: "1,800+",
  contacts: {
    primaryPhone: "+91 96200 00947",
    secondaryPhone: "+91 98860 58511",
    salesEmail: "sales@siddhikabel.com",
    infoEmail: "enquiry@siddhikabel.com",
    address: {
      line1: "No.3, 1st Main Road, 1st Block",
      line2: "Banashankari 3rd Stage",
      city: "Bangalore",
      pincode: "560085",
      state: "Karnataka",
      country: "India",
    },
    hours: [
      { days: "Monday – Friday", time: "9:30 AM – 6:30 PM" },
      { days: "Saturday", time: "9:30 AM – 5:00 PM" },
    ],
  },
  socials: {
    facebook: "https://www.facebook.com/siddhikabel/",
    twitter: "https://twitter.com/siddhikabel",
    linkedin: "https://www.linkedin.com/in/siddhikabel/",
  },
};

export const BRANDS_DATA: BrandInfo[] = [
  {
    id: "lapp",
    name: "LAPP",
    shortDesc: "Power, control, data and communication cables, single-core wires, cable glands, conduit systems and domestic wiring solutions for industrial and commercial applications.",
    fullDesc:
      "LAPP is a global leader in integrated solutions and branded products for cable and connection technology. Headquartered in Stuttgart, Germany, it has over 65 years of experience, 5,500+ employees and a presence in 152 countries.\n\nLAPP India began operations in 1996, serves 12,000+ customers and manufactures at Bengaluru, Bhopal and Dharuhera. We supply ÖLFLEX® control cables, UNITRONIC® data cables, ETHERLINE® Ethernet cables, SKINTOP® cable glands, EPIC® connectors and SILVYN® conduits.",
    logo: "/images/clients/lapp.png",
    featuredImg: "/images/brands/lapp.jpg",
    categories: ["Power & Control Cables", "Data and Communication Cables", "Control Cabinet Single Core", "Cable Glands & Counter Nuts", "Rill, Conduit & Klick", "Domestic / House Wiring"],
    productCount: "40,000+ Items",
    origin: "Germany",
    color: "#FF6A00",
    colorDark: "#B34700",
    colorTint: "#FFF0E3",
  },
  {
    id: "eaton",
    name: "EATON",
    shortDesc: "Complete switchgear and electrical control solutions, including circuit protection, motor protection, contactors, vacuum circuit breakers and UPS systems for industrial and commercial applications.",
    fullDesc:
      "Eaton makes power and control products: contactors, MCCB, MPCB, ACB and VCB circuit breakers, Bussmann fuses and UPS systems.",
    logo: "/images/clients/eaton.png",
    featuredImg: "/images/brands/eaton.jpg",
    categories: ["Contactors", "MCCB", "MPCB", "ACB", "VCB", "Bussmann Fuses", "UPS: Single Phase / Three Phase"],
    productCount: "Full Industrial Line",
    origin: "Germany / USA",
    color: "#2F7BFF",
    colorDark: "#1B3CB0",
    colorTint: "#E6F0FF",
  },
  {
    id: "partex",
    name: "PARTEX",
    shortDesc: "Professional cable and wire identification solutions, marking machines, labels, cable ties, tools and accessories for electrical panels and industrial applications.",
    fullDesc:
      "Partex Marking Systems makes wire, cable and component identification: marking machines, labels, cable ties and tools, and profile accessories.",
    logo: "/images/clients/partex.png",
    featuredImg: "/images/brands/partex.jpg",
    categories: ["Marking Machines", "Labels", "Cable Ties and Tools", "Accessories: CAS, MD / MDH, PLD"],
    productCount: "Marking Systems",
    origin: "Sweden",
    color: "#16A34A",
    colorDark: "#166534",
    colorTint: "#ECFDF3",
  },
  {
    id: "mennekes",
    name: "MENNEKES",
    shortDesc: "Industrial electrical plugs, sockets, panel-mounted receptacles, inlets and fused, switched and interlocked power connection solutions.",
    fullDesc:
      "MENNEKES makes CEE industrial plugs, receptacles, connectors, interlocked units and panel mounted inlets for harsh industrial environments.",
    logo: "/images/clients/mennekes.png",
    featuredImg: "/images/brands/mennekes.jpg",
    categories: ["CEE Panel Mounted Receptacles", "CEE Plugs", "CEE Plugs and Connectors", "CEE Receptacles: Fused, Switched and Interlocked", "CEE Panel Mounted Inlets"],
    productCount: "IP44 / IP67 Rated",
    origin: "Germany",
    color: "#F0283A",
    colorDark: "#A8001A",
    colorTint: "#FDE8EA",
  },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  // Lapp products
  {
    id: "lapp-power-control",
    brandId: "lapp",
    brandName: "LAPP",
    name: "Power and Control Cables",
    category: "Power & Control Cables",
    shortDesc: "Flexible, oil-resistant ÖLFLEX® cables for machines, control panels and power connections.",
    details: "Flexible, oil-resistant ÖLFLEX® cables for machines, control panels and power connections.",
    specifications: [],
    image: "/images/lapp/power-control-cables.jpg",
    standards: [],
    isFeatured: true,
  },
  {
    id: "lapp-data-communication",
    brandId: "lapp",
    brandName: "LAPP",
    name: "Data and Communication Cables",
    category: "Data Communication",
    shortDesc: "Shielded UNITRONIC® data and bus cables for reliable signal transmission.",
    details: "Shielded UNITRONIC® data and bus cables for reliable signal transmission.",
    specifications: [],
    image: "/images/lapp/data-communication-cables.jpg",
    standards: [],
    isFeatured: true,
  },
  {
    id: "lapp-control-cabinet",
    brandId: "lapp",
    brandName: "LAPP",
    name: "Control Cabinet Single Core",
    category: "Power & Control Cables",
    shortDesc: "ÖLFLEX® UNIPLUS single-core wires for wiring inside control cabinets, panels and distribution boards.",
    details: "ÖLFLEX® UNIPLUS single-core wires, including flame-retardant and halogen-free options, for wiring inside control cabinets, panels and distribution boards.",
    specifications: [],
    image: "/images/lapp/control-cabinet-single-cores.webp",
    standards: [],
    isFeatured: true,
  },
  {
    id: "lapp-glands",
    brandId: "lapp",
    brandName: "LAPP",
    name: "Cable Glands & Counter Nuts",
    category: "Cable Glands & Connectors",
    shortDesc: "SKINTOP® cable glands, counter nuts and entry plates for secure, sealed cable entries.",
    details: "SKINTOP® cable glands, counter nuts and entry plates for secure, sealed cable entries.",
    specifications: [],
    image: "/images/lapp/cable-glands-counter-nuts.jpg",
    standards: [],
    isFeatured: true,
  },
  {
    id: "lapp-conduit",
    brandId: "lapp",
    brandName: "LAPP",
    name: "Rill, Conduit & Klick",
    category: "Cable Glands & Connectors",
    shortDesc: "Flexible conduits, fittings and cable chains that guide and protect cables.",
    details: "Flexible conduits, fittings and cable chains that guide and protect cables.",
    specifications: [],
    image: "/images/lapp/rill-conduit-klick.jpg",
    standards: [],
    isFeatured: true,
  },
  {
    id: "lapp-domestic",
    brandId: "lapp",
    brandName: "LAPP",
    name: "Domestic / House Wiring",
    category: "Power & Control Cables",
    shortDesc: "ÖLFLEX® INFRA single-core wires in ready-to-use boxes for domestic, building and infrastructure wiring.",
    details: "ÖLFLEX® INFRA single-core wires, including flame-retardant and halogen-free options, supplied in boxes for domestic, building and infrastructure wiring, with cable end sleeves for neat terminations.",
    specifications: [],
    image: "/images/lapp/domestic-house-wiring.webp",
    standards: [],
    isFeatured: true,
  },
  // Eaton Moeller products
  {
    id: "eaton-contactors",
    brandId: "eaton",
    brandName: "EATON",
    name: "Contactors",
    category: "Industrial Switchgear",
    code: "DILM-XT",
    shortDesc: "Compact power contactors and contactor relays with low coil consumption and long electrical lifespan.",
    details:
      "Engineered for heavy inductive duty (AC-3) in pump panels, motor control centers (MCC), and automated machinery. Features dual-box terminals for secure wiring.",
    specifications: [
      { label: "Rated Power", value: "Up to 2600 A / 900 kW" },
      { label: "Control Voltage", value: "24V DC to 230V AC" },
      { label: "Auxiliary Contacts", value: "Integrated 1NO + 1NC" },
      { label: "Mechanical Lifespan", value: "10 million operating cycles" },
    ],
    image: "/images/eaton/contactor.png",
    standards: ["IEC/EN 60947", "UL", "CCC"],
    isFeatured: true,
  },
  {
    id: "eaton-mccb",
    brandId: "eaton",
    brandName: "EATON",
    name: "MCCB: Molded Case Circuit Breakers (up to 1600 A)",
    category: "Industrial Switchgear",
    code: "NZM",
    shortDesc: "NZM series molded case circuit breakers up to 1600 A with accessories and remote operators.",
    details:
      "Molded case circuit breakers and compact switch disconnectors for panel builders, EPCs and heavy industrial facilities. Door-coupling rotary handles and remote operators are available.",
    specifications: [
      { label: "Series", value: "NZM1 to NZM4" },
      { label: "Rated Current", value: "Up to 1600 A" },
      { label: "Accessories", value: "Door-coupling handles, remote operators" },
    ],
    image: "/images/eaton/mccb-nzm.png",
    standards: ["IEC/EN 60947-2"],
  },
  {
    id: "eaton-pkz",
    brandId: "eaton",
    brandName: "EATON",
    name: "MPCB: PKZ & PKE Motor-Protective Circuit Breakers",
    category: "Industrial Switchgear",
    code: "PKZM0-25",
    shortDesc: "Fuseless motor protection up to 65 A with short-circuit breaking capacity up to 150 kA.",
    details:
      "The global standard for motor isolation, overload protection, and phase failure detection. Integrates smoothly with contactors and SmartWire-DT communication modules.",
    specifications: [
      { label: "Current Range", value: "0.1 A to 65 A" },
      { label: "Short Circuit Capacity", value: "150 kA / 50 kA at 400V" },
      { label: "Tripping Class", value: "Class 10 adjustable" },
      { label: "Mounting", value: "Top-hat rail DIN EN 60715" },
    ],
    image: "/images/eaton/mpcb-pkz.png",
    standards: ["IEC/EN 60947-4-1", "UL 508", "CSA"],
    isFeatured: true,
  },
  {
    id: "eaton-acb",
    brandId: "eaton",
    brandName: "EATON",
    name: "ACB: IZMX Air Circuit Breakers",
    category: "Industrial Switchgear",
    code: "IZMX16 / IZMX40",
    shortDesc: "IZMX16 and IZMX40 open air circuit breakers for main and distribution incomers.",
    details:
      "Air circuit breakers for low-voltage main distribution boards in industrial plants and large buildings.",
    specifications: [
      { label: "Series", value: "IZMX16, IZMX40" },
      { label: "Type", value: "Open air circuit breaker (ACB)" },
    ],
    image: "/images/eaton/acb-izmx.png",
    imagePosition: "center",
    standards: ["IEC/EN 60947-2"],
  },
  {
    id: "eaton-vcb",
    brandId: "eaton",
    brandName: "EATON",
    name: "VCB: Medium Voltage Vacuum Circuit Breakers",
    category: "Medium Voltage Switchgear",
    shortDesc: "Medium voltage vacuum circuit breakers for substations and industrial power distribution.",
    details:
      "Vacuum circuit breakers for medium voltage switchgear in industrial plants, substations and utilities.",
    specifications: [
      { label: "Type", value: "Vacuum circuit breaker (medium voltage)" },
    ],
    image: "/images/eaton/vcb-medium-voltage.png",
    standards: ["IEC 62271-100"],
  },
  {
    id: "eaton-bussmann",
    brandId: "eaton",
    brandName: "EATON",
    name: "Bussmann Series Fuses",
    category: "Fuses & Protection",
    shortDesc: "Bussmann fuses, including semiconductor high-speed fuses, for industrial equipment and drives.",
    details:
      "Bussmann series fuses for short-circuit protection of power electronics, drives, panels and industrial equipment.",
    specifications: [
      { label: "Range", value: "Semiconductor high-speed fuses and industrial fuse links" },
    ],
    image: "/images/eaton/bussmann-fuses.png",
    standards: ["IEC 60269"],
  },
  {
    id: "eaton-ups",
    brandId: "eaton",
    brandName: "EATON",
    name: "UPS: Single & 3-Phase Systems",
    category: "Power Quality",
    code: "9PX / 93E / 93PR",
    shortDesc: "Eaton 9PX, 93E and 93PR enterprise uninterruptible power supply systems.",
    details:
      "Single-phase and three-phase UPS systems that protect critical loads, control rooms and IT infrastructure from power disturbances and outages.",
    specifications: [
      { label: "Models", value: "9PX, 93E, 93PR" },
      { label: "Phases", value: "Single-phase and 3-phase" },
    ],
    image: "/images/eaton/ups.png",
    standards: ["IEC 62040"],
  },

  // Mennekes products
  {
    id: "mennekes-receptacles",
    brandId: "mennekes",
    brandName: "MENNEKES",
    name: "CEE Panel Mounted Receptacles",
    category: "Industrial Sockets & Receptacles",
    shortDesc: "Straight and angled panel sockets for machines, control panels and distribution boards.",
    details:
      "Heat-resistant contact carriers and nickel-plated contacts for safe, dust and moisture tight connections on machinery and panels.",
    specifications: [
      { label: "Current Ratings", value: "16A, 32A, 63A, 125A" },
      { label: "Types", value: "Straight and angled panel sockets" },
      { label: "Enclosure Ingress", value: "IP44 / IP67" },
    ],
    image: "/images/mennekes/panel-receptacle.png",
    standards: ["IEC 60309-1/-2", "EN 60309", "VDE"],
    isFeatured: true,
  },
  {
    id: "mennekes-plugs",
    brandId: "mennekes",
    brandName: "MENNEKES",
    name: "CEE Plugs",
    category: "Industrial Plugs",
    code: "MENNEKES-POWERTOP-XTRA",
    shortDesc: "PowerTOP Xtra industrial plugs for tough site operations.",
    details:
      "Features rubberized grip zones, highly heat-resistant contact carriers, and nickel-plated contacts. Guarantees moisture and dust tight connections up to IP67.",
    specifications: [
      { label: "Current Ratings", value: "16A, 32A, 63A, 125A" },
      { label: "Pin Configurations", value: "3-pin, 4-pin, 5-pin (230V / 400V)" },
      { label: "Enclosure Ingress", value: "IP44 / IP67 watertight" },
      { label: "Housing Material", value: "Impact-proof Polyamide (AM-TOP)" },
    ],
    image: "/images/mennekes/plugs-couplers.png",
    standards: ["IEC 60309-1/-2", "EN 60309", "VDE"],
  },
  {
    id: "mennekes-connectors",
    brandId: "mennekes",
    brandName: "MENNEKES",
    name: "CEE Plugs & Connectors",
    category: "Industrial Plugs",
    shortDesc: "Cable-mounted inline couplers and connectors for extension and portable power.",
    details:
      "Cable-mounted inline couplers for portable equipment, generators and temporary site power.",
    specifications: [
      { label: "Type", value: "Cable-mounted inline couplers and connectors" },
      { label: "Enclosure Ingress", value: "IP44 / IP67" },
    ],
    image: "/images/mennekes/plug-connector.png",
    standards: ["IEC 60309-1/-2", "EN 60309"],
  },
  {
    id: "mennekes-interlocked",
    brandId: "mennekes",
    brandName: "MENNEKES",
    name: "CEE Receptacles: Fused, Switched & Interlocked (DUO / AMAXX)",
    category: "Industrial Sockets & Receptacles",
    code: "MENNEKES-AMAXX-DB",
    shortDesc: "DUO switched and mechanically interlocked receptacles, and AMAXX combinations with MCBs and RCDs.",
    details:
      "Made of solid rubber (EverGUM) or high-grade thermoplastic (AMAXX) resisting chemicals, oils, and heavy physical shocks on construction and industrial workshop floors. Safety interlocking prevents plugging or unplugging under load.",
    specifications: [
      { label: "Protection", value: "Integrated MCBs & RCDs" },
      { label: "Ingress Rating", value: "IP44 / IP67" },
      { label: "Impact Resistance", value: "IK08 / IK10" },
      { label: "Modular Design", value: "Up to 5 segment rows" },
    ],
    image: "/images/mennekes/interlocked-duo.png",
    standards: ["DIN EN 61439", "CE", "DNV-GL"],
  },
  {
    id: "mennekes-inlets",
    brandId: "mennekes",
    brandName: "MENNEKES",
    name: "CEE Panel Mounted Inlets",
    category: "Industrial Inlets",
    shortDesc: "Reverse-pin panel mounted appliance inlets for machines and mobile equipment.",
    details:
      "Panel mounted inlets that bring power into machines, generators and mobile equipment through a standard CEE plug.",
    specifications: [
      { label: "Type", value: "Reverse-pin panel mounted appliance inlets" },
      { label: "Enclosure Ingress", value: "IP44 / IP67" },
    ],
    image: "/images/mennekes/panel-inlet.jpg",
    standards: ["IEC 60309-1/-2", "EN 60309"],
  },

  // Partex products
  {
    id: "partex-machines",
    brandId: "partex",
    brandName: "PARTEX",
    name: "Marking Machines & Printers (Promark T-1000 / EOS)",
    category: "Marking Machines",
    code: "PROMARK-T-1000 / EOS",
    shortDesc: "Promark T-1000 thermal transfer printers and EOS marking machines for in-house marking.",
    details:
      "Produce sleeves and labels on site with the sequence and legend your drawings call for, so panel shops spend less time on manual marking.",
    specifications: [
      { label: "Models", value: "Promark T-1000, EOS" },
      { label: "Output", value: "Sleeves, labels, tags" },
      { label: "Use", value: "Panel building, maintenance, projects" },
    ],
    image: "/images/partex/marking-machine.png",
    standards: ["CE"],
    isFeatured: true,
  },
  {
    id: "partex-labels",
    brandId: "partex",
    brandName: "PARTEX",
    name: "Labels (Heat Shrink / Vinyl)",
    category: "Wire & Cable Marking",
    code: "PARTEX-PS-SLEEVE",
    shortDesc: "Heat shrink printable sleeves and vinyl wrap-around labels for clear, lasting identification.",
    details:
      "Wire and cable markers for control panels, machine wiring and plant installations. Legible numbering that stays put through heat, oil and handling.",
    specifications: [
      { label: "Application", value: "Wire & cable identification" },
      { label: "Formats", value: "Heat shrink sleeves, vinyl wrap-around labels, clip-on markers" },
      { label: "Marking", value: "Pre-printed or printed on demand" },
    ],
    image: "/images/partex/heat-shrink-labels.png",
    standards: ["CE", "RoHS"],
  },
  {
    id: "partex-ties",
    brandId: "partex",
    brandName: "PARTEX",
    name: "Cable Ties & Tools",
    category: "Cable Fasteners",
    shortDesc: "Industrial nylon 6.6 cable ties, UV-resistant options and installation tools.",
    details:
      "Cable ties and tensioning tools for bundling and fixing cables in panels, machines and plant installations.",
    specifications: [
      { label: "Material", value: "Nylon 6.6 (UV-resistant options)" },
    ],
    image: "/images/partex/cable-ties.png",
    standards: ["CE", "RoHS"],
  },
  {
    id: "partex-profile",
    brandId: "partex",
    brandName: "PARTEX",
    name: "Profile Accessories (CAS, MD / MDH, PLD)",
    category: "Profile Accessories",
    shortDesc: "CAS strip holders, MD/MDH stainless steel embossed markers and PLD push-in terminal block markers.",
    details:
      "Profile accessories for marking components, cables and terminal blocks in control panels and machines.",
    specifications: [
      { label: "CAS", value: "Strip holders for multiple markers" },
      { label: "MD / MDH", value: "Stainless steel embossed markers" },
      { label: "PLD", value: "Push-in terminal block markers" },
    ],
    image: "/images/partex/profile-accessories.png",
    standards: ["CE"],
  },
];


export const CLIENTS_LIST: ClientPartner[] = [
  { name: "Toyota Kirloskar", logo: "/images/clients/toyota.png", industry: "Automotive" },
  { name: "Tata Motors", logo: "/images/clients/tata-motors.png", industry: "Commercial Vehicles" },
  { name: "Tata Advanced Materials", logo: "/images/clients/tata-advanced-materials.png", industry: "Aerospace" },
  { name: "Bharat Electronics (BEL)", logo: "/images/clients/bel.png", industry: "Defense Electronics" },
  { name: "BEML Limited", logo: "/images/clients/beml.png", industry: "Heavy Engineering & Metro" },
  { name: "GE Transportation", logo: "/images/clients/ge-transportation.png", industry: "Locomotives & Energy" },
  { name: "Kennametal", logo: "/images/clients/kennametal.png", industry: "Precision Tooling" },
  { name: "SKF Bearings", logo: "/images/clients/skf.png", industry: "Industrial Engineering" },
  { name: "Ace Designers Ltd", logo: "/images/clients/ace-designers.png", industry: "CNC Machine Tools" },
  { name: "AMS (Ace Micromatic)", logo: "/images/clients/ams.png", industry: "Machining Systems" },
  { name: "Biesse India", logo: "/images/clients/biesse.png", industry: "Wood & Glass Machinery" },
  { name: "DISA India", logo: "/images/clients/disa.png", industry: "Foundry Machinery" },
  { name: "Rittal India", logo: "/images/clients/rittal.png", industry: "Enclosures & IT Infra" },
  { name: "TVS Motor Company", logo: "/images/clients/tvs.png", industry: "Automobile" },
  { name: "TEAL (Titan Engineering)", logo: "/images/clients/teal.png", industry: "Automation & Aerospace" },
  { name: "Orb Energy", logo: "/images/clients/orb-energy.png", industry: "Solar Power Systems" },
  { name: "Saint-Gobain Gyproc", logo: "/images/clients/gyproc.png", industry: "Building Materials" },
  { name: "Faiveley Transport", logo: "/images/clients/faiveley.png", industry: "Railway Systems" },
  { name: "Nordson", logo: "/images/clients/nordson.png", industry: "Dispensing Systems" },
  { name: "Saint-Gobain Norton", logo: "/images/clients/norton.png", industry: "Abrasives & Refractories" },
  { name: "Steer Engineering", logo: "/images/clients/steer.png", industry: "Extrusion Technology" },
  { name: "TD Power Systems (TDPS)", logo: "/images/clients/tdps.png", industry: "Generators & Turbines" },
  { name: "EFD Induction", logo: "/images/clients/efd.png", industry: "Induction Heating" },
  { name: "Gabriel India", logo: "/images/clients/gabriel.png", industry: "Ride Control Products" },
  { name: "Aplcom Technologies", logo: "/images/clients/aplcom.png", industry: "Automation Systems" },
  { name: "ETA Technology", logo: "/images/clients/eta.png", industry: "Welding & Test Benches" },
  { name: "Vee Vee Controls", logo: "/images/clients/vee-vee-controls.png", industry: "Control Panels" },
];

export const SERVICES_DATA = [
  {
    id: "grounding",
    title: "Grounding or Earthing Solutions",
    subtitle: "Safety for People & Assets",
    description:
      "Auditing and installation of earth pits and maintenance-free chemical grounding for plants, laboratories and commercial buildings, keeping people and equipment safe.",
    features: [
      "Auditing and testing of existing electrical earth pits",
      "Maintenance-free chemical grounding installation",
      "Earth resistance testing with certified test reports",
      "Exothermic welding for low-impedance permanent bonding",
    ],
    image: "/images/gallery/grounding.jpg",
  },
  {
    id: "energy",
    title: "Industrial LED Retrofits",
    subtitle: "Energy-Saving Lighting",
    description:
      "Supply and installation of LED light fittings for retrofits and new establishments.",
    features: [
      "Factory & shop floor high-bay LED retrofit projects",
      "Commercial office and cleanroom luminaires",
      "Lighting lux level auditing & ROI payback simulation",
      "Heavy duty surge protected luminaires for harsh plants",
    ],
    image: "/images/resource/ind3.jpg",
  },
  {
    id: "cables",
    title: "LT & HT Armoured and Unarmoured Cables",
    subtitle: "Supply, Laying & Termination",
    description:
      "Supply, laying and termination of LT and HT armoured and unarmoured cables for industrial plants, control panels and buildings.",
    features: [
      "LT & HT armoured and unarmoured cable supply",
      "Authorized Lapp Olflex & Uniplus bulk supply",
      "Cable laying and termination at site",
      "Cable glanding & conduit protection systems",
    ],
    image: "/images/gallery/lt-ht-cables.jpg",
  },
  {
    id: "consumables",
    title: "Industrial Consumables & Equipments",
    subtitle: "MRO & Allied Supplies",
    description:
      "Glands, lugs, sleeves and other consumables and equipment for MRO (Maintenance, Repair, and Overhaul) of industrial plants.",
    features: [
      "Cable glands & counter nuts",
      "Cable lugs and terminations",
      "Marking sleeves & wire markers",
      "MRO (Maintenance, Repair, and Overhaul) supplies for plant upkeep",
    ],
    image: "/images/gallery/consumables-warehouse.jpg",
  },
];

// Recent projects: the 4 core industrial pillars (audit point A4)
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-grounding",
    title: "Grounding or Earthing Solutions",
    category: "Safety & Earthing",
    summary: "Chemical grounding and earthing solutions for plants, laboratories and buildings.",
    highlights: [],
    image: "/images/resource/ind1.jpg",
  },
  {
    id: "cs-led",
    title: "Industrial LED Retrofits",
    category: "Energy Efficiency",
    summary: "Industrial LED retrofits for factories, shop floors, cleanrooms and offices.",
    highlights: [],
    image: "/images/resource/ind3.jpg",
  },
  {
    id: "cs-cables",
    title: "LT & HT Armoured and Unarmoured Cables",
    category: "Power Distribution",
    summary: "Supply, laying and termination of LT & HT armoured and unarmoured cables.",
    highlights: [],
    image: "/images/gallery/lt-ht-cables.jpg",
  },
  {
    id: "cs-consumables",
    title: "Industrial Consumables & Equipments",
    category: "MRO & Allied",
    summary: "Glands, lugs, sleeves and MRO (Maintenance, Repair, and Overhaul) supplies.",
    highlights: [],
    image: "/images/lapp/cable-glands-counter-nuts.jpg",
  },
];

export const INDUSTRIES_SERVED = [
  { name: "OEM & Machine Manufacturers", icon: "Cog", desc: "Custom harness, motor circuit breakers, and flexible cables." },
  { name: "Panel Builders & System Integrators", icon: "Cpu", desc: "Modular switchgears, pilot devices, and DIN-rail terminals." },
  { name: "Renewable Energy (Solar & Wind)", icon: "Sun", desc: "Chemical grounding, UV-resistant cables, and surge protection." },
  { name: "Automobile & Rail Transport", icon: "Car", desc: "Vibration-proof connectors, CEE receptacles, and high-temp cables." },
  { name: "Pharmaceutical & Biotech", icon: "Shield", desc: "IP69K washdown pilot switches, cleanroom LEDs, and earthing." },
  { name: "Packaging & Bottling Machinery", icon: "Box", desc: "Continuous drag-chain cables, high-speed ethernet, and sensors." },
  { name: "Steel, Cement & Heavy Industry", icon: "Layers", desc: "Robust metal glands, heavy-duty contactors, and cable conduits." },
  { name: "Defense & Aerospace", icon: "Compass", desc: "UL/CSA certified fire-retardant wiring and precision connectors." },
];

export const SPECIAL_OFFERS: SpecialOfferItem[] = [
  {
    partNo: "OLFLEX-110-3G1.5",
    description: "Lapp Olflex Classic 110 3 Core 1.5 sq.mm Flexible Control Cable",
    category: "Control Cable",
    brand: "Lapp",
    status: "In Stock - Special Lot",
    unit: "100m Coils / Reels",
  },
  {
    partNo: "PKZM0-16",
    description: "Eaton Moeller Motor Protective Circuit Breaker 10A - 16A",
    category: "Switchgear",
    brand: "Eaton",
    status: "Limited Stock",
    unit: "Units",
  },
  {
    partNo: "MENN-13A-32A-4P",
    description: "Mennekes 32A 4P 400V IP44 CEE Panel Mounted Socket",
    category: "Industrial Socket",
    brand: "Mennekes",
    status: "Ready for Dispatch",
    unit: "Pack of 5",
  },
  {
    partNo: "SKIN-MS-M25",
    description: "Lapp Skintop MS-M Nickel Plated Brass Cable Glands M25",
    category: "Cable Glands",
    brand: "Lapp",
    status: "Special Clearance",
    unit: "Box of 25",
  },
  {
    partNo: "PARTEX-PS-SLEEVE",
    description: "Partex Wire Marking Sleeves, pre-printed numbering sets",
    category: "Wire Marking",
    brand: "Partex",
    status: "Ready for Dispatch",
    unit: "Packs",
  },
];