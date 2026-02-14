// app/data/listings.seed.ts (type upgrades)

export type VenueType =
  | "hacienda"
  | "hotel_boutique"
  | "hotel_luxury"
  | "rooftop"
  | "garden"
  | "estate"
  | "historic_home"
  | "industrial"
  | "restaurant"
  | "other";

export type Locale = "en" | "es";

export type LuxuryTier = "budget" | "mid" | "upper" | "luxury";

export type CeremonyType = "civil" | "religious" | "symbolic";

export type PriceRange = "$" | "$$" | "$$$" | "$$$$";

export interface ListingBase {
  id: string;
  slug: string;
  featured: boolean;

  name: Record<Locale, string>;
  description: Record<Locale, string>;

  website?: string;
  instagram?: string;
  phone?: string;
  email?: string;

  images?: Array<{
    src: string;
    alt: Record<Locale, string>;
    type?: "hero" | "ceremony" | "reception" | "exterior" | "detail";
    credit?: string;
    sourceUrl?: string;
    licenseNote?: string;
  }>;
}

export interface VenueRules {
  // if unknown, leave undefined (don’t guess)
  noiseCurfewTime?: string; // "23:00", "01:00", etc.
  requiresInHouseCatering?: boolean;
  allowsOutsideCatering?: boolean;
  allowsLiveMusic?: boolean;
  alcoholAllowed?: boolean;
}

export interface VenueLogistics {
  indoorBackup?: boolean;
  parkingOnSite?: boolean;
  wheelchairAccessible?: boolean;
  lodgingOnSite?: boolean;
}

export interface LocationHints {
  // not precise address; just helpful SEO/geography cues
  area?: string; // "Centro", "Salida a Celaya", "Atotonilco area", etc.
  withinCentro?: boolean;
  approximateDriveMinsFromCentro?: number;
}

export interface VenueListing extends ListingBase {
  type: "venue";
  venueType: VenueType;

  capacitySeated?: number;
  capacityStanding?: number;

  luxuryTier?: LuxuryTier;
  priceRange?: PriceRange;

  ceremonyTypes?: CeremonyType[]; // what they can host
  rules?: VenueRules;
  logistics?: VenueLogistics;
  location?: LocationHints;

  // SEO extras (optional)
  highlights?: {
    en: string[];
    es: string[];
  };

  images?: Array<{
    src: string; // local path or external
    alt: { en: string; es: string };
    type?: "hero" | "ceremony" | "reception" | "exterior" | "detail";
    credit?: string; // "Courtesy of Rosewood..."
    sourceUrl?: string; // press kit URL
    licenseNote?: string; // optional internal note
  }>;

  // For future “verified” badge / monetization
  isVerified?: boolean;
  isClaimed?: boolean;
}

export interface VendorListing extends ListingBase {
  type: "vendor";
  categoryKey:
    | "planner"
    | "caterer"
    | "florist"
    | "photographer"
    | "videographer"
    | "rentals"
    | "music"
    | "beauty"
    | "officiant"
    | "transport"
    | "stationery";

  serviceAreas?: {
    en: string[];
    es: string[];
  };

  address?: {
    street?: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
  };
  // Monetization hooks
  isVerified?: boolean;
  isClaimed?: boolean;
}

export type Listing = VenueListing | VendorListing;

/**
 * Seed: Venues
 */
export const SEED_VENUES: VenueListing[] = [
  {
    id: "venue_rosewood_sma",
    type: "venue",
    slug: "rosewood-san-miguel-de-allende",
    featured: true,
    venueType: "hotel_luxury",
    luxuryTier: "luxury",
    priceRange: "$$$$",
    capacitySeated: 250,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: {
      indoorBackup: true,
      lodgingOnSite: true,
      wheelchairAccessible: true,
    },
    location: { withinCentro: true, area: "Centro" },
    highlights: {
      en: ["Rooftop views", "Courtyards", "Luxury service"],
      es: ["Vistas en terraza", "Patios", "Servicio de lujo"],
    },
    name: {
      en: "Rosewood San Miguel de Allende",
      es: "Rosewood San Miguel de Allende",
    },
    description: {
      en: "Luxury hotel venue known for rooftop views, courtyards, and destination wedding production.",
      es: "Hotel de lujo reconocido por terrazas, patios y producción de bodas de destino.",
    },
    website: "https://www.rosewoodhotels.com",
    instagram: "https://www.instagram.com/rosewoodsanmiguel",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_belmond_casa_sierra_nevada",
    type: "venue",
    slug: "belmond-casa-de-sierra-nevada",
    featured: true,
    venueType: "hotel_luxury",
    luxuryTier: "luxury",
    priceRange: "$$$$",
    capacitySeated: 180,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: { indoorBackup: true, lodgingOnSite: true },
    location: { withinCentro: true, area: "Centro" },
    highlights: {
      en: ["Colonial courtyards", "Historic feel", "Intimate events"],
      es: ["Patios coloniales", "Ambiente histórico", "Eventos íntimos"],
    },
    name: {
      en: "Belmond Casa de Sierra Nevada",
      es: "Belmond Casa de Sierra Nevada",
    },
    description: {
      en: "Historic luxury property with colonial courtyards suited to intimate celebrations.",
      es: "Propiedad histórica de lujo con patios coloniales ideal para celebraciones íntimas.",
    },
    website: "https://www.belmond.com",
    instagram: "https://www.instagram.com/belmondcasasierra",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_hacienda_san_jose_lavista",
    type: "venue",
    slug: "hacienda-san-jose-lavista",
    featured: true,
    venueType: "hacienda",
    luxuryTier: "upper",
    priceRange: "$$$",
    capacitySeated: 300,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: {
      indoorBackup: undefined,
      lodgingOnSite: undefined,
      parkingOnSite: true,
    },
    location: { withinCentro: false, area: "Outskirts" },
    highlights: {
      en: ["Large garden capacity", "Countryside setting"],
      es: ["Gran capacidad en jardín", "Entorno campestre"],
    },
    name: { en: "Hacienda San José Lavista", es: "Hacienda San José Lavista" },
    description: {
      en: "Large countryside hacienda-style venue with expansive outdoor space for big events.",
      es: "Hacienda campestre con amplios espacios al aire libre para eventos grandes.",
    },
    website: "",
    instagram: "",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_numu_boutique_hotel",
    type: "venue",
    slug: "numu-boutique-hotel",
    featured: false,
    venueType: "hotel_boutique",
    luxuryTier: "upper",
    priceRange: "$$$",
    capacitySeated: 200,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: { indoorBackup: true, lodgingOnSite: true },
    location: { withinCentro: true, area: "Centro" },
    highlights: {
      en: ["Modern boutique vibe", "Rooftop potential"],
      es: ["Ambiente boutique moderno", "Posible terraza"],
    },
    name: { en: "NUMU Boutique Hotel", es: "NUMU Boutique Hotel" },
    description: {
      en: "Modern boutique property with flexible event spaces for ceremonies and receptions.",
      es: "Hotel boutique moderno con espacios flexibles para ceremonia y recepción.",
    },
    website: "",
    instagram: "",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_casa_adela",
    type: "venue",
    slug: "casa-adela",
    featured: false,
    venueType: "estate",
    luxuryTier: "upper",
    priceRange: "$$$",
    capacitySeated: 150,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: { indoorBackup: undefined, lodgingOnSite: undefined },
    location: { withinCentro: false, area: "Outskirts" },
    highlights: {
      en: ["Private estate feel", "Good for buyouts"],
      es: ["Ambiente de propiedad privada", "Ideal para eventos exclusivos"],
    },
    name: { en: "Casa Adela", es: "Casa Adela" },
    description: {
      en: "Private estate venue often used for destination wedding weekends and buyouts.",
      es: "Propiedad privada utilizada para fines de semana de boda y eventos exclusivos.",
    },
    website: "",
    instagram: "",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_hacienda_los_arcangeles",
    type: "venue",
    slug: "hacienda-los-arcangeles",
    featured: false,
    venueType: "hacienda",
    luxuryTier: "upper",
    priceRange: "$$$",
    capacitySeated: 250,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: { indoorBackup: undefined, parkingOnSite: true },
    location: { withinCentro: false, area: "Outskirts" },
    highlights: {
      en: ["Rustic elegance", "Open-air reception possibilities"],
      es: ["Elegancia rústica", "Posibilidades al aire libre"],
    },
    name: { en: "Hacienda Los Arcángeles", es: "Hacienda Los Arcángeles" },
    description: {
      en: "Traditional hacienda-style venue with open-air layouts suited to larger receptions.",
      es: "Hacienda tradicional con espacios al aire libre ideal para recepciones grandes.",
    },
    website: "",
    instagram: "",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_casa_del_chorro",
    type: "venue",
    slug: "casa-del-chorro",
    featured: false,
    venueType: "historic_home",
    luxuryTier: "mid",
    priceRange: "$$",
    capacitySeated: 120,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: { indoorBackup: true },
    location: { withinCentro: true, area: "El Chorro / Centro" },
    highlights: {
      en: ["Historic character", "Great for smaller gatherings"],
      es: ["Carácter histórico", "Ideal para eventos pequeños"],
    },
    name: { en: "Casa del Chorro", es: "Casa del Chorro" },
    description: {
      en: "Historic property near the El Chorro area, suitable for smaller weddings and events.",
      es: "Propiedad histórica cerca de la zona del Chorro, ideal para bodas y eventos pequeños.",
    },
    website: "",
    instagram: "",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_casa_hoyos",
    type: "venue",
    slug: "casa-hoyos",
    featured: false,
    venueType: "hotel_boutique",
    luxuryTier: "upper",
    priceRange: "$$$",
    capacitySeated: 140,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: { indoorBackup: true, lodgingOnSite: true },
    location: { withinCentro: true, area: "Centro" },
    highlights: {
      en: ["Boutique design", "Courtyard/rooftop options"],
      es: ["Diseño boutique", "Opciones de patio/terraza"],
    },
    name: { en: "Casa Hoyos", es: "Casa Hoyos" },
    description: {
      en: "Contemporary boutique hotel offering elegant spaces for ceremonies and receptions.",
      es: "Hotel boutique contemporáneo con espacios elegantes para ceremonia y recepción.",
    },
    website: "",
    instagram: "",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_fabrica_la_aurora",
    type: "venue",
    slug: "fabrica-la-aurora",
    featured: false,
    venueType: "industrial",
    luxuryTier: "mid",
    priceRange: "$$$",
    capacitySeated: 300,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: {
      indoorBackup: true,
      wheelchairAccessible: true,
      parkingOnSite: true,
    },
    location: { withinCentro: false, area: "La Aurora district" },
    highlights: {
      en: ["Industrial-chic", "Art complex setting", "Large-scale events"],
      es: ["Estilo industrial", "Complejo artístico", "Eventos grandes"],
    },
    name: { en: "Fábrica La Aurora", es: "Fábrica La Aurora" },
    description: {
      en: "Industrial-style art complex offering unique event spaces for large celebrations.",
      es: "Complejo artístico de estilo industrial con espacios únicos para celebraciones grandes.",
    },
    website: "",
    instagram: "",
    images: [],
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "venue_casa_xochitl",
    type: "venue",
    slug: "casa-xochitl",
    featured: false,
    venueType: "garden",
    luxuryTier: "mid",
    priceRange: "$$",
    capacitySeated: 100,
    ceremonyTypes: ["civil", "symbolic"],
    logistics: { indoorBackup: undefined, parkingOnSite: undefined },
    location: { withinCentro: false, area: "Outskirts" },
    highlights: {
      en: ["Garden-focused", "Intimate outdoor weddings"],
      es: ["Enfoque en jardín", "Bodas íntimas al aire libre"],
    },
    name: { en: "Casa Xochitl", es: "Casa Xochitl" },
    description: {
      en: "Garden-forward venue ideal for smaller outdoor weddings and receptions.",
      es: "Espacio con jardín ideal para bodas íntimas al aire libre y recepciones.",
    },
    website: "",
    instagram: "",
    images: [],
    isVerified: false,
    isClaimed: false,
  },
];

/**
 * Seed: Vendors
 * These slugs are vendor detail slugs; category routing is handled by taxonomies.ts slugs.
 */
export const SEED_VENDORS: VendorListing[] = [
  {
    id: "vendor_planner_1",
    type: "vendor",
    categoryKey: "planner",
    slug: "atelier-planner-demo",
    featured: true,
    name: {
      en: "Atelier Wedding Planning (Demo)",
      es: "Atelier Wedding Planning (Demo)",
    },
    description: {
      en: "Full-service destination wedding planning with timeline, vendor coordination, and design support in San Miguel de Allende.",
      es: "Planificación completa de bodas de destino con cronograma, coordinación de proveedores y apoyo de diseño en San Miguel de Allende.",
    },
    website: "",
    instagram: "",
    images: [],
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "vendor_planner_2",
    type: "vendor",
    categoryKey: "planner",
    slug: "centro-celebrations-demo",
    featured: false,
    name: {
      en: "Centro Celebrations (Demo)",
      es: "Centro Celebrations (Demo)",
    },
    description: {
      en: "Planning + coordination focused on intimate weddings, rooftop receptions, and multi-day guest experiences.",
      es: "Planificación y coordinación enfocada en bodas íntimas, recepciones en terraza y experiencias de varios días.",
    },
    website: "",
    instagram: "",
    images: [],
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "vendor_planner_3",
    type: "vendor",
    categoryKey: "planner",
    slug: "garden-to-candlelight-demo",
    featured: false,
    name: {
      en: "Garden to Candlelight Events (Demo)",
      es: "Garden to Candlelight Events (Demo)",
    },
    description: {
      en: "Design-forward planning with vendor curation, styling, and on-site production for weekend weddings.",
      es: "Planificación con enfoque en diseño, curaduría de proveedores, styling y producción en sitio para bodas de fin de semana.",
    },
    website: "",
    instagram: "",
    images: [],
    serviceAreas: {
      en: ["San Miguel de Allende", "Querétaro"],
      es: ["San Miguel de Allende", "Querétaro"],
    },
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "vendor_planner_4",
    type: "vendor",
    categoryKey: "planner",
    slug: "hacienda-weekend-coordinator-demo",
    featured: false,
    name: {
      en: "Hacienda Weekend Coordinator (Demo)",
      es: "Coordinación Hacienda Weekend (Demo)",
    },
    description: {
      en: "Practical planning for larger guest counts: logistics, transportation, load-in schedules, and vendor management.",
      es: "Planificación práctica para bodas grandes: logística, transporte, horarios de montaje y manejo de proveedores.",
    },
    website: "",
    instagram: "",
    images: [],
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    isVerified: false,
    isClaimed: false,
  },

  {
    id: "vendor_planner_5",
    type: "vendor",
    categoryKey: "planner",
    slug: "minimal-modern-weddings-demo",
    featured: false,
    name: {
      en: "Minimal Modern Weddings (Demo)",
      es: "Bodas Minimal Modern (Demo)",
    },
    description: {
      en: "Planning and coordination for modern couples: clean design, efficient timelines, and bilingual communication.",
      es: "Planificación y coordinación para parejas modernas: diseño limpio, cronogramas eficientes y comunicación bilingüe.",
    },
    website: "",
    instagram: "",
    images: [],
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    isVerified: false,
    isClaimed: false,
  },
  {
    id: "vendor_florist_1",
    type: "vendor",
    categoryKey: "florist",
    slug: "flor-de-castilla",
    featured: true,
    name: {
      en: "Flor de Castilla",
      es: "Flor de Castilla",
    },
    description: {
      en: "Luxury floral design studio known for romantic arches and organic installations.",
      es: "Estudio de diseño floral de lujo conocido por arcos románticos e instalaciones orgánicas.",
    },
    website: "https://example.com",
    instagram: "https://instagram.com/example",
    serviceAreas: {
      en: ["San Miguel de Allende", "Dolores Hidalgo"],
      es: ["San Miguel de Allende", "Dolores Hidalgo"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/flor-de-castilla-hero.jpg",
        alt: {
          en: "Floral wedding arch installation in San Miguel de Allende",
          es: "Arco floral para boda en San Miguel de Allende",
        },
      },
    ],
  },
];

export const SEED_LISTINGS: Listing[] = [...SEED_VENUES, ...SEED_VENDORS];
