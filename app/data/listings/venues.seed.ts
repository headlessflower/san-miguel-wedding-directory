// app/data/listings/venues.seed.ts
import type { VenueListing } from "../listings/types";

export const SEED_VENUES: VenueListing[] = [
    {
        id: "venue_rosewood_sma",
        type: "venue",
        slug: "rosewood-san-miguel-de-allende",
        featured: true,
        featuredTier: "sponsored",
        isVerified: false,
        isClaimed: false,
        name: { en: "Rosewood San Miguel de Allende", es: "Rosewood San Miguel de Allende" },
        description: {
            en: "Luxury hotel venue with multiple event settings and iconic San Miguel views. Confirm availability and minimums with the events team.",
            es: "Hotel de lujo con varios espacios para eventos y vistas icónicas de San Miguel. Confirma disponibilidad y mínimos con su equipo de eventos.",
        },
        venueType: "hotel_luxury",
        website: "https://www.rosewoodhotels.com/en/san-miguel-de-allende/events",
        images: [
            {
                type: "hero",
                src: "/images/venues/rosewood-hero.jpg",
                alt: {
                    en: "Event space at Rosewood San Miguel de Allende",
                    es: "Espacio para eventos en Rosewood San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "venue_live_aqua_sma",
        type: "venue",
        slug: "live-aqua-san-miguel-de-allende",
        featured: true,
        featuredTier: "featured",
        name: { en: "Live Aqua San Miguel de Allende", es: "Live Aqua San Miguel de Allende" },
        description: {
            en: "Modern luxury resort positioned for weddings and celebrations in San Miguel de Allende.",
            es: "Resort moderno de lujo con enfoque en bodas y celebraciones en San Miguel de Allende.",
        },
        venueType: "hotel_luxury",
        // Put official site URL here once you confirm the canonical page you want
        website: "",
        images: [
            {
                type: "hero",
                src: "/images/venues/live-aqua-hero.jpg",
                alt: {
                    en: "Live Aqua San Miguel de Allende exterior view",
                    es: "Vista exterior de Live Aqua San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "venue_casa_de_sierra_nevada_belmond",
        type: "venue",
        slug: "casa-de-sierra-nevada-belmond",
        featured: true,
        featuredTier: "featured",
        name: { en: "Casa de Sierra Nevada (Belmond)", es: "Casa de Sierra Nevada (Belmond)" },
        description: {
            en: "Historic luxury property in San Miguel de Allende—ideal for intimate celebrations and curated guest experiences.",
            es: "Propiedad histórica de lujo en San Miguel de Allende—ideal para celebraciones íntimas y experiencias cuidadas para invitados.",
        },
        venueType: "hotel_luxury",
        website: "",
        images: [
            {
                type: "hero",
                src: "/images/venues/casa-de-sierra-nevada-hero.jpg",
                alt: {
                    en: "Courtyard-style venue ambiance in San Miguel de Allende",
                    es: "Ambiente de patio estilo colonial en San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "venue_hotel_matilda",
        type: "venue",
        slug: "hotel-matilda",
        featured: true,
        featuredTier: "featured",
        name: { en: "Hotel Matilda", es: "Hotel Matilda" },
        description: {
            en: "Contemporary boutique hotel known for design and art programming—verify event formats, buyouts, and guest flow.",
            es: "Hotel boutique contemporáneo con enfoque en diseño y arte—confirma formatos de evento, buyouts y logística de invitados.",
        },
        venueType: "hotel_boutique",
        website: "https://hotelmatilda.com/blog/",
        images: [
            {
                type: "hero",
                src: "/images/venues/hotel-matilda-hero.jpg",
                alt: {
                    en: "Hotel Matilda modern architecture and event vibe",
                    es: "Arquitectura moderna y ambiente de eventos en Hotel Matilda",
                },
            },
        ],
    },

    {
        id: "venue_casa_1810",
        type: "venue",
        slug: "casa-1810",
        featured: true,
        featuredTier: "standard",
        name: { en: "Casa 1810 (Terrace / Rooftop)", es: "Casa 1810 (Terraza / Rooftop)" },
        description: {
            en: "Terrace venue option designed for stylish, intimate weddings. Confirm guest count ranges and noise rules.",
            es: "Opción de terraza pensada para bodas íntimas con estilo. Confirma rangos de invitados y reglas de ruido.",
        },
        venueType: "rooftop",
        website: "https://casa1810.com/",
        images: [
            {
                type: "hero",
                src: "/images/venues/casa-1810-hero.jpg",
                alt: {
                    en: "Rooftop/terrace setting in San Miguel de Allende",
                    es: "Terraza/rooftop en San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "venue_hotel_nena",
        type: "venue",
        slug: "hotel-nena",
        featured: true,
        featuredTier: "standard",
        name: { en: "Hotel Nena", es: "Hotel Nena" },
        description: {
            en: "Boutique hotel option for intimate weddings with multiple small spaces—verify layout by event type.",
            es: "Hotel boutique para bodas íntimas con varios espacios—confirma la distribución según tipo de evento.",
        },
        venueType: "hotel_boutique",
        website: "https://www.hotelnenasanmigueldeallende.mx/",
        images: [
            {
                type: "hero",
                src: "/images/venues/hotel-nena-hero.jpg",
                alt: {
                    en: "Hotel Nena venue atmosphere in San Miguel de Allende",
                    es: "Ambiente del Hotel Nena en San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "venue_hacienda_santa_ana",
        type: "venue",
        slug: "hacienda-santa-ana",
        featured: true,
        featuredTier: "featured",
        name: { en: "Hacienda Santa Ana", es: "Hacienda Santa Ana" },
        description: {
            en: "Large-format hacienda venue with multiple event zones. Confirm catering policy and curfew details.",
            es: "Hacienda de gran formato con varias zonas para eventos. Confirma política de banquete y horario límite.",
        },
        venueType: "hacienda",
        website: "",
        images: [
            {
                type: "hero",
                src: "/images/venues/hacienda-santa-ana-hero.jpg",
                alt: {
                    en: "Hacienda-style wedding venue setting near San Miguel de Allende",
                    es: "Escenario tipo hacienda para boda cerca de San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "venue_hacienda_los_arcangeles",
        type: "venue",
        slug: "hacienda-los-arcangeles",
        featured: true,
        featuredTier: "featured",
        name: { en: "Hacienda Los Arcángeles", es: "Hacienda Los Arcángeles" },
        description: {
            en: "Classic San Miguel-area hacienda venue popular for weddings. Verify ceremony options and indoor backup.",
            es: "Hacienda clásica popular para bodas en el área de San Miguel. Confirma opciones de ceremonia y plan B interior.",
        },
        venueType: "hacienda",
        website: "",
        images: [
            {
                type: "hero",
                src: "/images/venues/hacienda-los-arcangeles-hero.jpg",
                alt: {
                    en: "Wedding-ready hacienda grounds near San Miguel de Allende",
                    es: "Jardines de hacienda listos para boda cerca de San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "venue_hacienda_el_santuario",
        type: "venue",
        slug: "hacienda-el-santuario",
        featured: true,
        featuredTier: "featured",
        name: { en: "Hacienda El Santuario", es: "Hacienda El Santuario" },
        description: {
            en: "Hacienda venue suited for full wedding weekends—confirm vendor policies and guest flow.",
            es: "Hacienda ideal para fines de semana de boda—confirma políticas de proveedores y flujo de invitados.",
        },
        venueType: "hacienda",
        website: "",
        images: [
            {
                type: "hero",
                src: "/images/venues/hacienda-el-santuario-hero.jpg",
                alt: {
                    en: "Hacienda venue exterior and event ambiance",
                    es: "Exterior de hacienda y ambiente para eventos",
                },
            },
        ],
    },

    {
        id: "venue_hacienda_agualuna",
        type: "venue",
        slug: "hacienda-agualuna",
        featured: true,
        featuredTier: "standard",
        name: { en: "Hacienda Agualuna", es: "Hacienda Agualuna" },
        description: {
            en: "Architectural hacienda venue listing in San Miguel de Allende—confirm exact location logistics and services included.",
            es: "Hacienda con enfoque arquitectónico—confirma logística de ubicación y servicios incluidos.",
        },
        venueType: "hacienda",
        website: "",
        images: [
            {
                type: "hero",
                src: "/images/venues/hacienda-agualuna-hero.jpg",
                alt: {
                    en: "Hacienda Agualuna-style venue setting for weddings",
                    es: "Escenario tipo Hacienda Agualuna para bodas",
                },
            },
        ],
    },
];
