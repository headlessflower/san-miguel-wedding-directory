// app/data/listings.seed.ts (cleaned types)

export type Locale = "en" | "es";
export type Localized<T> = Record<Locale, T>;

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

export type LuxuryTier = "budget" | "mid" | "upper" | "luxury";
export type CeremonyType = "civil" | "religious" | "symbolic";
export type PriceRange = "$" | "$$" | "$$$" | "$$$$";

export type FeaturedTier = "standard" | "featured" | "sponsored";

export type ListingImageType = "hero" | "ceremony" | "reception" | "exterior" | "detail";

export interface ListingImage {
  src: string; // local path or external
  alt: Localized<string>;
  type?: ListingImageType;
  credit?: string;     // "Courtesy of..."
  sourceUrl?: string;  // press kit URL
  licenseNote?: string;// internal note
}

export interface ContactFields {
  website?: string;
  instagram?: string;
  phone?: string;
  email?: string;
}

export interface MonetizationFields {
  /**
   * Back-compat hook: if you still use `featured: true` in older seeds,
   * treat it as "featured" in sorting.
   */
  featured: boolean;

  isVerified?: boolean;
  isClaimed?: boolean;

  featuredTier?: FeaturedTier; // default to "standard" if missing
  featuredUntil?: string;      // ISO date, optional
}

export interface ListingBase extends ContactFields, MonetizationFields {
  id: string;
  slug: string;

  name: Localized<string>;
  description: Localized<string>;

  images?: ListingImage[];
}

/** Venue-specific */

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

  ceremonyTypes?: CeremonyType[];

  rules?: VenueRules;
  logistics?: VenueLogistics;
  location?: LocationHints;

  // SEO extras (optional)
  highlights?: Localized<string[]>;
}

/** Vendor-specific */

export type VendorCategoryKey =
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

export interface VendorListing extends ListingBase {
  type: "vendor";
  categoryKey: VendorCategoryKey;

  serviceAreas?: Localized<string[]>;

  address?: {
    street?: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
  };
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
  {
    id: "vendor_caterer_1",
    type: "vendor",
    categoryKey: "caterer",
    slug: "aromo-catering",
    featured: true,
    name: { en: "AROMO Catering", es: "AROMO Catering" },
    description: {
      en: "Catering service in San Miguel de Allende for weddings and private events, with customizable menus and full event service.",
      es: "Servicio de catering en San Miguel de Allende para bodas y eventos privados, con menús personalizables y servicio integral.",
    },
    website: "",
    instagram: "https://www.instagram.com/aromo_sma/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/aromo-catering-hero.jpg",
        alt: {
          en: "Catering setup for a wedding event in San Miguel de Allende",
          es: "Montaje de catering para boda en San Miguel de Allende",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_caterer_2",
    type: "vendor",
    categoryKey: "caterer",
    slug: "marionnis-catering",
    featured: false,
    name: { en: "Marionnis Catering", es: "Marionnis Catering" },
    description: {
      en: "Event catering for weddings and celebrations, serving San Miguel de Allende and surrounding regions.",
      es: "Catering para bodas y celebraciones, con servicio en San Miguel de Allende y regiones cercanas.",
    },
    website: "",
    instagram: "https://www.instagram.com/marionniscatering/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Querétaro", "CDMX"],
      es: ["San Miguel de Allende", "Querétaro", "CDMX"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/marionnis-catering-hero.jpg",
        alt: {
          en: "Wedding banquet table setting and catering presentation",
          es: "Banquete de boda con montaje de mesa y presentación de catering",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_caterer_3",
    type: "vendor",
    categoryKey: "caterer",
    slug: "rubyjoys-catering",
    featured: false,
    name: {
      en: "RubyJoy’s Catering & Event Services",
      es: "RubyJoy’s Catering & Event Services",
    },
    description: {
      en: "Catering and event services offering international cuisine and tailored menus for weddings and private events.",
      es: "Catering y servicios para eventos con cocina internacional y menús a medida para bodas y eventos privados.",
    },
    website: "",
    instagram: "https://www.instagram.com/rubyjoys_catering/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/rubyjoys-catering-hero.jpg",
        alt: {
          en: "Catering spread for a wedding reception",
          es: "Mesa de catering para recepción de boda",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_caterer_4",
    type: "vendor",
    categoryKey: "caterer",
    slug: "jase-catering",
    featured: false,
    name: { en: "JASE Catering", es: "JASE Catering" },
    description: {
      en: "Conceptual catering and culinary experiences for weddings and events in San Miguel de Allende.",
      es: "Catering conceptual y experiencias culinarias para bodas y eventos en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/jasecatering/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/jase-catering-hero.jpg",
        alt: {
          en: "Conceptual catering station at an event",
          es: "Estación de catering conceptual en un evento",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_caterer_5",
    type: "vendor",
    categoryKey: "caterer",
    slug: "maharaja-banquetes",
    featured: false,
    name: {
      en: "Maharaja Banquetes & Catering",
      es: "Maharaja Banquetes & Catering",
    },
    description: {
      en: "Wedding catering and banquet service with experience in large celebrations and multicultural events.",
      es: "Servicio de banquetes y catering para bodas, con experiencia en celebraciones grandes y eventos multiculturales.",
    },
    website: "",
    instagram: "https://www.instagram.com/maharajabanquetes/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/maharaja-banquetes-hero.jpg",
        alt: {
          en: "Banquet service setup for a wedding celebration",
          es: "Montaje de banquete para celebración de boda",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },
  {
    id: "vendor_photographer_1",
    type: "vendor",
    categoryKey: "photographer",
    slug: "fer-juaristi",
    featured: true,
    name: {
      en: "Fer Juaristi",
      es: "Fer Juaristi",
    },
    description: {
      en: "Destination wedding photographer known for editorial storytelling and international wedding coverage, frequently working in San Miguel de Allende.",
      es: "Fotógrafo de bodas de destino reconocido por su estilo editorial y cobertura internacional, con experiencia en San Miguel de Allende.",
    },
    website: "https://ferjuaristi.com",
    instagram: "https://www.instagram.com/ferjuaristi/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico", "International"],
      es: ["San Miguel de Allende", "México", "Internacional"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/fer-juaristi-hero.jpg",
        alt: {
          en: "Luxury wedding portrait in San Miguel de Allende",
          es: "Retrato de boda de lujo en San Miguel de Allende",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_photographer_2",
    type: "vendor",
    categoryKey: "photographer",
    slug: "penzi-weddings",
    featured: true,
    name: {
      en: "Penzi Weddings",
      es: "Penzi Weddings",
    },
    description: {
      en: "Wedding photography studio specializing in destination celebrations with a documentary and romantic style.",
      es: "Estudio de fotografía especializado en bodas de destino con estilo documental y romántico.",
    },
    website: "",
    instagram: "https://www.instagram.com/penziweddings/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico"],
      es: ["San Miguel de Allende", "México"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/penzi-weddings-hero.jpg",
        alt: {
          en: "Destination wedding ceremony captured in San Miguel de Allende",
          es: "Ceremonia de boda de destino capturada en San Miguel de Allende",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_photographer_3",
    type: "vendor",
    categoryKey: "photographer",
    slug: "javier-mota-photography",
    featured: false,
    name: {
      en: "Javier Mota Photography",
      es: "Javier Mota Photography",
    },
    description: {
      en: "Wedding photographer offering natural light and candid coverage for celebrations in San Miguel de Allende.",
      es: "Fotógrafo de bodas con enfoque en luz natural y momentos espontáneos en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/javiermota_photography/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/javier-mota-hero.jpg",
        alt: {
          en: "Wedding couple portrait in colonial San Miguel streets",
          es: "Retrato de pareja de boda en calles coloniales de San Miguel",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_photographer_4",
    type: "vendor",
    categoryKey: "photographer",
    slug: "diego-moura-photography",
    featured: false,
    name: {
      en: "Diego Moura Photography",
      es: "Diego Moura Photography",
    },
    description: {
      en: "Destination wedding photographer covering multicultural and luxury weddings in San Miguel de Allende.",
      es: "Fotógrafo de bodas de destino con experiencia en bodas multiculturales y de lujo en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/diegomouraphoto/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico"],
      es: ["San Miguel de Allende", "México"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/diego-moura-hero.jpg",
        alt: {
          en: "Wedding reception photography in a San Miguel hacienda",
          es: "Fotografía de recepción de boda en una hacienda de San Miguel",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_photographer_5",
    type: "vendor",
    categoryKey: "photographer",
    slug: "monica-legorreta",
    featured: false,
    name: {
      en: "Mónica Legorreta Photography",
      es: "Mónica Legorreta Fotografía",
    },
    description: {
      en: "Fine-art wedding photographer documenting intimate and large-scale celebrations in San Miguel de Allende.",
      es: "Fotógrafa de bodas estilo fine-art documentando celebraciones íntimas y grandes en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/monicalegorreta/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/monica-legorreta-hero.jpg",
        alt: {
          en: "Fine art wedding portrait in San Miguel de Allende",
          es: "Retrato de boda estilo fine art en San Miguel de Allende",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },
  // DJs / Music (San Miguel de Allende + region)

  {
    id: "vendor_music_1",
    type: "vendor",
    categoryKey: "music",
    slug: "bgolden-productions",
    featured: true,
    name: { en: "BGolden Productions", es: "BGolden Productions" },
    description: {
      en: "Wedding and event DJ + production team offering sound, lighting, and event production services in San Miguel de Allende.",
      es: "Equipo de DJ y producción para bodas y eventos con audio, iluminación y producción en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/bgoldenproductions/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/bgolden-productions-hero.jpg",
        alt: {
          en: "Wedding DJ booth and lighting setup in San Miguel de Allende",
          es: "Cabina de DJ e iluminación para boda en San Miguel de Allende",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_music_2",
    type: "vendor",
    categoryKey: "music",
    slug: "omar-colunga-dj",
    featured: false,
    name: { en: "Omar Colunga DJ", es: "Omar Colunga DJ" },
    description: {
      en: "Wedding DJ serving San Miguel de Allende and nearby cities; ideal for receptions and late-night dance floors.",
      es: "DJ para bodas en San Miguel de Allende y ciudades cercanas; ideal para recepciones y pista de baile.",
    },
    website: "",
    instagram: "https://www.instagram.com/omarcolungadj/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Querétaro", "CDMX"],
      es: ["San Miguel de Allende", "Querétaro", "CDMX"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/omar-colunga-dj-hero.jpg",
        alt: {
          en: "DJ performing at a wedding reception in San Miguel de Allende",
          es: "DJ tocando en una recepción de boda en San Miguel de Allende",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_music_3",
    type: "vendor",
    categoryKey: "music",
    slug: "dj-esli-cano",
    featured: false,
    name: { en: "DJ Esli Cano", es: "DJ Esli Cano" },
    description: {
      en: "DJ based in San Miguel de Allende for weddings and private events; supports curated playlists and high-energy sets.",
      es: "DJ en San Miguel de Allende para bodas y eventos privados; playlists curadas y sets con mucha energía.",
    },
    website: "https://www.djeslicano.com",
    instagram: "https://www.instagram.com/djeslicano/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/dj-esli-cano-hero.jpg",
        alt: {
          en: "Wedding DJ setup with speakers and lighting",
          es: "Montaje de DJ para boda con bocinas e iluminación",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_music_4",
    type: "vendor",
    categoryKey: "music",
    slug: "foxdjs",
    featured: true,
    name: { en: "foxDJs", es: "foxDJs" },
    description: {
      en: "Wedding DJ team offering sound + lighting services for destination weddings and events.",
      es: "Equipo de DJs para bodas con servicios de audio e iluminación para bodas de destino y eventos.",
    },
    website: "",
    instagram: "https://www.instagram.com/foxdjs.official/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico"],
      es: ["San Miguel de Allende", "México"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/foxdjs-hero.jpg",
        alt: {
          en: "Dance floor lighting and DJ booth at a wedding",
          es: "Iluminación de pista y cabina de DJ en una boda",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_music_5",
    type: "vendor",
    categoryKey: "music",
    slug: "vedette-mx",
    featured: false,
    name: {
      en: "Vedette MX (Wedding Band)",
      es: "Vedette MX (Banda para Bodas)",
    },
    description: {
      en: "Live wedding band option for receptions and party sets; suitable for couples wanting a full-band dance floor.",
      es: "Opción de banda en vivo para recepciones y sets de fiesta; ideal si quieres pista con música en vivo.",
    },
    website: "",
    instagram: "https://www.instagram.com/vedettemx/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato", "Mexico"],
      es: ["San Miguel de Allende", "Guanajuato", "México"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/vedette-mx-hero.jpg",
        alt: {
          en: "Live band performing at a wedding reception",
          es: "Banda en vivo tocando en una recepción de boda",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_music_6",
    type: "vendor",
    categoryKey: "music",
    slug: "tr-music-dj",
    featured: false,
    name: { en: "TR Music DJs", es: "TR Music DJs" },
    description: {
      en: "Wedding DJ service focused on high-energy dance floors and event flow across key moments (entrance, dinner, party).",
      es: "Servicio de DJ para bodas enfocado en pista con energía y flujo del evento (entrada, cena, fiesta).",
    },
    website: "",
    instagram: "https://www.instagram.com/trmusicdj/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico"],
      es: ["San Miguel de Allende", "México"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/tr-music-dj-hero.jpg",
        alt: {
          en: "Wedding DJ performing with dance floor crowd",
          es: "DJ en boda tocando con invitados en la pista",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },
  {
    id: "vendor_beauty_1",
    type: "vendor",
    categoryKey: "beauty",
    slug: "makeup-by-itza",
    featured: true,
    name: { en: "Makeup by Itza Márquez", es: "Makeup by Itza Márquez" },
    description: {
      en: "Bridal makeup artist offering luxury bridal and editorial looks in San Miguel de Allende and Querétaro.",
      es: "Maquillista para novias con enfoque en looks de lujo y editorial en San Miguel de Allende y Querétaro.",
    },
    website: "",
    instagram: "https://www.instagram.com/makeupbyitza/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Querétaro"],
      es: ["San Miguel de Allende", "Querétaro"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/makeup-by-itza-hero.jpg",
        alt: {
          en: "Bridal makeup look for a destination wedding in San Miguel de Allende",
          es: "Maquillaje de novia para boda de destino en San Miguel de Allende",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },
  // Source: :contentReference[oaicite:0]{index=0}

  {
    id: "vendor_beauty_2",
    type: "vendor",
    categoryKey: "beauty",
    slug: "danipal-makeup-hair",
    featured: true,
    name: { en: "DaniPal Makeup & Hair", es: "DaniPal Makeup & Hair" },
    description: {
      en: "Bridal hair and makeup services in San Miguel de Allende, with natural and editorial styling options.",
      es: "Servicios de peinado y maquillaje para novias en San Miguel de Allende, con estilos naturales y editoriales.",
    },
    website: "",
    instagram: "https://www.instagram.com/danipalmakeup.hair/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/danipal-makeup-hair-hero.jpg",
        alt: {
          en: "Bridal hair and makeup styling in San Miguel de Allende",
          es: "Peinado y maquillaje de novia en San Miguel de Allende",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },
  // Source: :contentReference[oaicite:1]{index=1}

  {
    id: "vendor_beauty_3",
    type: "vendor",
    categoryKey: "beauty",
    slug: "team-danipal-makeup-hair",
    featured: false,
    name: {
      en: "TEAM by DaniPal (Makeup & Hair)",
      es: "TEAM by DaniPal (Maquillaje y Peinado)",
    },
    description: {
      en: "Bridal and social hair + makeup team based in San Miguel de Allende for weddings and events.",
      es: "Equipo de maquillaje y peinado para novias y eventos sociales en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/team_danipalmakeup.hair/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/team-danipal-hero.jpg",
        alt: {
          en: "Bridal makeup and hair team preparing a wedding party",
          es: "Equipo de maquillaje y peinado preparando a un grupo para boda",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },
  // Source: :contentReference[oaicite:2]{index=2}

  {
    id: "vendor_beauty_4",
    type: "vendor",
    categoryKey: "beauty",
    slug: "alexa-barrera-makeup",
    featured: false,
    name: { en: "Alexa Barrera Makeup", es: "Alexa Barrera Makeup" },
    description: {
      en: "Makeup artist in San Miguel de Allende for bridal makeup and event looks.",
      es: "Maquillista en San Miguel de Allende para novias y eventos sociales.",
    },
    website: "",
    instagram: "https://www.instagram.com/alexabarrera_makeup/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/alexa-barrera-makeup-hero.jpg",
        alt: {
          en: "Bridal makeup application for a wedding in San Miguel de Allende",
          es: "Aplicación de maquillaje de novia para una boda en San Miguel de Allende",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },
  // Source: :contentReference[oaicite:3]{index=3}

  {
    id: "vendor_beauty_5",
    type: "vendor",
    categoryKey: "beauty",
    slug: "angie-mendoza-bridal",
    featured: false,
    name: { en: "Angie Mendoza Bridal", es: "Angie Mendoza Bridal" },
    description: {
      en: "Bridal hair and makeup team serving San Miguel de Allende and Querétaro, focused on natural and modern styles.",
      es: "Equipo de peinado y maquillaje para novias en San Miguel de Allende y Querétaro, con estilos naturales y modernos.",
    },
    website: "",
    instagram: "https://www.instagram.com/angie.mendoza.bridal/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Querétaro"],
      es: ["San Miguel de Allende", "Querétaro"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/angie-mendoza-bridal-hero.jpg",
        alt: {
          en: "Natural bridal hair and makeup look for a destination wedding",
          es: "Look natural de peinado y maquillaje de novia para boda de destino",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own image or vendor press kit.",
      },
    ],
  },
  {
    id: "vendor_videographer_1",
    type: "vendor",
    categoryKey: "videographer",
    slug: "cinemotion-films",
    featured: true,
    name: { en: "Cinemotion Films", es: "Cinemotion Films" },
    description: {
      en: "Destination wedding videography studio creating cinematic highlight films and full-day coverage in San Miguel de Allende.",
      es: "Estudio de videografía para bodas de destino que crea películas cinematográficas y cobertura completa en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/cinemotionfilms/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico"],
      es: ["San Miguel de Allende", "México"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/cinemotion-films-hero.jpg",
        alt: {
          en: "Cinematic wedding film capture in San Miguel de Allende",
          es: "Captura cinematográfica de boda en San Miguel de Allende",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_videographer_2",
    type: "vendor",
    categoryKey: "videographer",
    slug: "memento-wedding-films",
    featured: true,
    name: { en: "Memento Wedding Films", es: "Memento Wedding Films" },
    description: {
      en: "Wedding videography team specializing in emotional storytelling and documentary-style coverage for destination weddings.",
      es: "Equipo de videografía especializado en narrativas emotivas y estilo documental para bodas de destino.",
    },
    website: "",
    instagram: "https://www.instagram.com/mementoweddingfilms/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico", "International"],
      es: ["San Miguel de Allende", "México", "Internacional"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/memento-wedding-films-hero.jpg",
        alt: {
          en: "Wedding videographer filming ceremony in a hacienda",
          es: "Videógrafo grabando ceremonia en una hacienda",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_videographer_3",
    type: "vendor",
    categoryKey: "videographer",
    slug: "aura-films-mx",
    featured: false,
    name: { en: "Aura Films MX", es: "Aura Films MX" },
    description: {
      en: "Luxury wedding videography focused on cinematic visuals and modern editing for San Miguel celebrations.",
      es: "Videografía de bodas de lujo con enfoque cinematográfico y edición moderna para celebraciones en San Miguel.",
    },
    website: "",
    instagram: "https://www.instagram.com/aurafilms.mx/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/aura-films-hero.jpg",
        alt: {
          en: "Wedding reception cinematic video coverage",
          es: "Cobertura cinematográfica de recepción de boda",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_videographer_4",
    type: "vendor",
    categoryKey: "videographer",
    slug: "diego-barragan-films",
    featured: false,
    name: { en: "Diego Barragán Films", es: "Diego Barragán Films" },
    description: {
      en: "Wedding filmmaker capturing multicultural and destination weddings in San Miguel de Allende.",
      es: "Cineasta de bodas que documenta bodas multiculturales y de destino en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/diegobarraganfilms/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico"],
      es: ["San Miguel de Allende", "México"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/diego-barragan-hero.jpg",
        alt: {
          en: "Wedding filmmaker capturing bride and groom in colonial San Miguel",
          es: "Videógrafo capturando a los novios en el centro colonial de San Miguel",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },

  {
    id: "vendor_videographer_5",
    type: "vendor",
    categoryKey: "videographer",
    slug: "soul-story-weddings",
    featured: false,
    name: { en: "Soul Story Weddings", es: "Soul Story Weddings" },
    description: {
      en: "Wedding videography studio focused on storytelling and emotional highlight films for destination weddings.",
      es: "Estudio de videografía enfocado en narrativa emocional y películas resumen para bodas de destino.",
    },
    website: "",
    instagram: "https://www.instagram.com/soulstoryweddings/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "International"],
      es: ["San Miguel de Allende", "Internacional"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/soul-story-weddings-hero.jpg",
        alt: {
          en: "Cinematic wedding video capture at sunset in San Miguel",
          es: "Captura de video cinematográfica al atardecer en San Miguel",
        },
        credit: "Replace with press image or licensed photo",
        licenseNote: "Use authorized media from vendor press kit.",
      },
    ],
  },
  {
    id: "vendor_rentals_1",
    type: "vendor",
    categoryKey: "rentals",
    slug: "maharentals",
    featured: true,
    name: { en: "MAH Rentals", es: "MAH Rentals" },
    description: {
      en: "Event furniture and decor rentals for weddings in San Miguel de Allende, including lounge setups, tables, and specialty pieces.",
      es: "Renta de mobiliario y decoración para bodas en San Miguel de Allende, incluyendo salas lounge, mesas y piezas especiales.",
    },
    website: "",
    instagram: "https://www.instagram.com/mahrentals/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/mah-rentals-hero.jpg",
        alt: {
          en: "Wedding lounge furniture rental setup in San Miguel de Allende",
          es: "Montaje de mobiliario lounge para boda en San Miguel de Allende",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },

  {
    id: "vendor_rentals_2",
    type: "vendor",
    categoryKey: "rentals",
    slug: "concepto-evento",
    featured: true,
    name: { en: "Concepto Evento", es: "Concepto Evento" },
    description: {
      en: "Event design and rental company providing staging, lighting, and decor for destination weddings.",
      es: "Empresa de diseño y renta para eventos con iluminación, escenografía y decoración para bodas de destino.",
    },
    website: "",
    instagram: "https://www.instagram.com/conceptoevento/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Querétaro"],
      es: ["San Miguel de Allende", "Querétaro"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/concepto-evento-hero.jpg",
        alt: {
          en: "Wedding reception decor and lighting installation",
          es: "Instalación de iluminación y decoración para recepción de boda",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },

  {
    id: "vendor_rentals_3",
    type: "vendor",
    categoryKey: "rentals",
    slug: "ambienta-rentals",
    featured: false,
    name: { en: "Ambienta Rentals", es: "Ambienta Rentals" },
    description: {
      en: "Furniture and decor rentals for weddings and private events across San Miguel de Allende.",
      es: "Renta de mobiliario y decoración para bodas y eventos privados en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/ambientarentals/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/ambienta-rentals-hero.jpg",
        alt: {
          en: "Wedding reception table setup with rental decor",
          es: "Montaje de mesa de boda con decoración en renta",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },

  {
    id: "vendor_rentals_4",
    type: "vendor",
    categoryKey: "rentals",
    slug: "vintage-rentals-sma",
    featured: false,
    name: { en: "Vintage Rentals SMA", es: "Vintage Rentals SMA" },
    description: {
      en: "Specialty vintage furniture and decorative pieces for wedding styling in San Miguel de Allende.",
      es: "Renta de mobiliario vintage y piezas decorativas especiales para bodas en San Miguel de Allende.",
    },
    website: "",
    instagram: "https://www.instagram.com/vintagerentals.sma/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/vintage-rentals-sma-hero.jpg",
        alt: {
          en: "Vintage furniture rental for outdoor wedding ceremony",
          es: "Mobiliario vintage en renta para ceremonia al aire libre",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },

  {
    id: "vendor_rentals_5",
    type: "vendor",
    categoryKey: "rentals",
    slug: "casa-eventos-rentals",
    featured: false,
    name: { en: "Casa Eventos Rentals", es: "Casa Eventos Rentals" },
    description: {
      en: "Comprehensive wedding rental services including tents, tables, chairs, and lighting solutions.",
      es: "Servicios integrales de renta para bodas incluyendo carpas, mesas, sillas e iluminación.",
    },
    website: "",
    instagram: "https://www.instagram.com/casaeventosrentals/",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/casa-eventos-rentals-hero.jpg",
        alt: {
          en: "Tent and lighting installation for wedding reception",
          es: "Instalación de carpa e iluminación para recepción de boda",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },
  {
    id: "vendor_transport_1",
    type: "vendor",
    categoryKey: "transport",
    slug: "bajio-go",
    featured: true,
    name: { en: "BajioGo", es: "BajioGo" },
    description: {
      en: "Private airport transfers and wedding guest shuttle services between León (BJX), Querétaro (QRO), and San Miguel de Allende.",
      es: "Traslados privados desde aeropuertos y servicio de transporte para invitados entre León (BJX), Querétaro (QRO) y San Miguel de Allende.",
    },
    website: "https://bajiogo.com",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "León", "Querétaro"],
      es: ["San Miguel de Allende", "León", "Querétaro"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/bajio-go-hero.jpg",
        alt: {
          en: "Private wedding guest shuttle in San Miguel de Allende",
          es: "Transporte privado para invitados de boda en San Miguel de Allende",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },

  {
    id: "vendor_transport_2",
    type: "vendor",
    categoryKey: "transport",
    slug: "san-miguel-luxury-drivers",
    featured: true,
    name: { en: "San Miguel Luxury Drivers", es: "San Miguel Luxury Drivers" },
    description: {
      en: "Luxury private drivers and executive vehicles for wedding weekends and VIP transportation.",
      es: "Choferes privados y vehículos ejecutivos para fines de semana de boda y transporte VIP.",
    },
    website: "",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/sma-luxury-drivers-hero.jpg",
        alt: {
          en: "Luxury black SUV wedding transport in San Miguel",
          es: "SUV de lujo para transporte de boda en San Miguel",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },

  {
    id: "vendor_transport_3",
    type: "vendor",
    categoryKey: "transport",
    slug: "vintage-car-sma",
    featured: false,
    name: { en: "Vintage Car SMA", es: "Auto Vintage SMA" },
    description: {
      en: "Classic and vintage car rentals for wedding ceremonies and photography sessions.",
      es: "Renta de autos clásicos y vintage para ceremonias y sesiones fotográficas de boda.",
    },
    website: "",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/vintage-car-sma-hero.jpg",
        alt: {
          en: "Classic vintage wedding car in colonial San Miguel",
          es: "Auto clásico para boda en el centro colonial de San Miguel",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },

  {
    id: "vendor_transport_4",
    type: "vendor",
    categoryKey: "transport",
    slug: "queretaro-airport-shuttle",
    featured: false,
    name: { en: "Querétaro Airport Shuttle", es: "Shuttle Aeropuerto Querétaro" },
    description: {
      en: "Group shuttle transportation for wedding guests arriving via Querétaro International Airport.",
      es: "Servicio de transporte grupal para invitados que llegan al Aeropuerto Internacional de Querétaro.",
    },
    website: "",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Querétaro"],
      es: ["San Miguel de Allende", "Querétaro"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/queretaro-shuttle-hero.jpg",
        alt: {
          en: "Wedding guest airport shuttle service",
          es: "Servicio de transporte para invitados desde aeropuerto",
        },
        credit: "Replace with licensed or press image",
        licenseNote: "Use authorized vendor media.",
      },
    ],
  },
  {
    id: "vendor_stationery_1",
    type: "vendor",
    categoryKey: "stationery",
    slug: "amatl-handmade-paper-studio",
    featured: true,
    name: { en: "Amatl Handmade Paper Studio", es: "Amatl Estudio de Papel Hecho a Mano" },
    description: {
      en: "Handmade paper studio for wedding stationery: invitations, menus, place cards, and custom paper with natural inclusions.",
      es: "Estudio de papel artesanal para papelería de boda: invitaciones, menús, tarjetas de lugar y papel personalizado con inclusiones naturales.",
    },
    website: "https://www.amatlstudio.shop",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Los Angeles"],
      es: ["San Miguel de Allende", "Los Ángeles"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/amatl-stationery-hero.jpg",
        alt: {
          en: "Handmade paper wedding stationery suite with invitations and menus",
          es: "Set de papelería de boda en papel artesanal con invitaciones y menús",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with your own images.",
      },
    ],
  },

  {
    id: "vendor_stationery_2",
    type: "vendor",
    categoryKey: "stationery",
    slug: "letterpress-studio-sma",
    featured: true,
    name: { en: "Letterpress Studio SMA", es: "Estudio Letterpress SMA" },
    description: {
      en: "Letterpress-style wedding invitations and day-of paper goods with custom typography and premium finishes.",
      es: "Invitaciones en estilo letterpress y papelería del día con tipografía personalizada y acabados premium.",
    },
    website: "",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Guanajuato"],
      es: ["San Miguel de Allende", "Guanajuato"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/letterpress-studio-sma-hero.jpg",
        alt: {
          en: "Letterpress wedding invitation suite on textured paper",
          es: "Set de invitaciones letterpress sobre papel texturizado",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with vendor press kit or your own photos.",
      },
    ],
  },

  {
    id: "vendor_stationery_3",
    type: "vendor",
    categoryKey: "stationery",
    slug: "day-of-signage-co",
    featured: false,
    name: { en: "Day-Of Signage Co.", es: "Señalética para Bodas" },
    description: {
      en: "Wedding day signage: seating charts, welcome signs, bar menus, and table numbers—designed to match your venue aesthetic.",
      es: "Señalética para bodas: seating charts, letreros de bienvenida, menús de bar y números de mesa—diseño alineado con la estética del lugar.",
    },
    website: "",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende"],
      es: ["San Miguel de Allende"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/day-of-signage-hero.jpg",
        alt: {
          en: "Wedding seating chart and welcome sign display in a courtyard",
          es: "Seating chart y letrero de bienvenida en un patio",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with licensed or approved imagery.",
      },
    ],
  },

  {
    id: "vendor_stationery_4",
    type: "vendor",
    categoryKey: "stationery",
    slug: "calligraphy-placecards-studio",
    featured: false,
    name: { en: "Calligraphy & Place Cards Studio", es: "Estudio de Caligrafía y Place Cards" },
    description: {
      en: "Modern calligraphy for escort cards, place cards, envelopes, and custom signage for destination weddings.",
      es: "Caligrafía moderna para escort cards, place cards, sobres y señalética personalizada para bodas de destino.",
    },
    website: "",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Querétaro"],
      es: ["San Miguel de Allende", "Querétaro"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/calligraphy-placecards-hero.jpg",
        alt: {
          en: "Hand-lettered wedding place cards and envelope calligraphy",
          es: "Place cards con lettering y caligrafía en sobres",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with press kit or your own photos.",
      },
    ],
  },

  {
    id: "vendor_stationery_5",
    type: "vendor",
    categoryKey: "stationery",
    slug: "wedding-invitations-design-studio",
    featured: false,
    name: { en: "Wedding Invitations Design Studio", es: "Estudio de Diseño de Invitaciones" },
    description: {
      en: "Custom wedding invitations and print design: bilingual suites, maps, weekend itineraries, and RSVP cards.",
      es: "Invitaciones personalizadas y diseño impreso: suites bilingües, mapas, itinerarios de fin de semana y tarjetas RSVP.",
    },
    website: "",
    instagram: "",
    phone: "",
    email: "",
    serviceAreas: {
      en: ["San Miguel de Allende", "Mexico"],
      es: ["San Miguel de Allende", "México"],
    },
    images: [
      {
        type: "hero",
        src: "/images/vendors/wedding-invitations-design-studio-hero.jpg",
        alt: {
          en: "Bilingual wedding invitation suite with map and itinerary card",
          es: "Suite de invitaciones bilingüe con mapa y tarjeta de itinerario",
        },
        credit: "Your photo / placeholder",
        licenseNote: "Replace with licensed or approved imagery.",
      },
    ],
  },

];

export const SEED_LISTINGS: Listing[] = [...SEED_VENUES, ...SEED_VENDORS];
