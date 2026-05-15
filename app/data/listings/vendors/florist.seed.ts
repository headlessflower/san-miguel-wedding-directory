// app/data/listings/vendors/florists.seed.ts
import type { VendorListing } from "../types";

export const FLORISTS: VendorListing[] = [
    {
        id: "vendor_florist_artemisia",
        type: "vendor",
        categoryKey: "florist",
        slug: "artemisia-floreria",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Artemisia Florería",
            es: "Artemisia Florería"
        },
        description: {
            en: "Luxury floral design studio specializing in organic installations, ceremony arches, and large-scale wedding florals.",
            es: "Estudio de diseño floral de lujo especializado en instalaciones orgánicas, arcos ceremoniales y florales de gran formato."
        },

        website: "https://artemisiafloreria.com",
        instagram: "https://www.instagram.com/artemisiafloreria/",
        phone: "+52 415 000 3001",
        email: "info@artemisiafloreria.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/florists/artemisia-hero.jpg",
                alt: {
                    en: "Luxury wedding floral installation in San Miguel de Allende",
                    es: "Instalación floral de lujo para boda en San Miguel de Allende"
                },
                credit: "Courtesy of Artemisia Florería",
                sourceUrl: "https://artemisiafloreria.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_florist_flores_sma",
        type: "vendor",
        categoryKey: "florist",
        slug: "flores-san-miguel",
        featured: true,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Flores San Miguel",
            es: "Flores San Miguel"
        },
        description: {
            en: "Wedding and event florist creating classic and romantic floral arrangements for haciendas and rooftop venues.",
            es: "Florería para bodas y eventos que crea arreglos clásicos y románticos para haciendas y terrazas."
        },

        website: "https://floressanmiguel.com",
        instagram: "https://www.instagram.com/floressanmiguel/",
        phone: "+52 415 000 3002",
        email: "contacto@floressanmiguel.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/florists/flores-sma-hero.jpg",
                alt: {
                    en: "Romantic wedding bouquet in San Miguel de Allende",
                    es: "Ramo de novia romántico en San Miguel de Allende"
                },
                credit: "Courtesy of Flores San Miguel",
                sourceUrl: "https://floressanmiguel.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_florist_verde_event_design",
        type: "vendor",
        categoryKey: "florist",
        slug: "verde-event-design",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Verde Event Design",
            es: "Verde Event Design"
        },
        description: {
            en: "Modern floral and event styling studio focused on bold color palettes and immersive wedding environments.",
            es: "Estudio floral y de estilismo moderno enfocado en paletas vibrantes y ambientes inmersivos para bodas."
        },

        website: "https://verdeeventdesign.com",
        instagram: "https://www.instagram.com/verdeeventdesign/",
        phone: "+52 415 000 3003",
        email: "hello@verdeeventdesign.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Central Mexico"],
            es: ["San Miguel de Allende", "Centro de México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/florists/verde-hero.jpg",
                alt: {
                    en: "Colorful wedding floral installation in hacienda venue",
                    es: "Instalación floral colorida en hacienda"
                },
                credit: "Courtesy of Verde Event Design",
                sourceUrl: "https://verdeeventdesign.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_florist_jardin_floral",
        type: "vendor",
        categoryKey: "florist",
        slug: "jardin-floral-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Jardín Floral SMA",
            es: "Jardín Floral SMA"
        },
        description: {
            en: "Floral studio offering seasonal blooms and sustainable wedding arrangements in San Miguel de Allende.",
            es: "Estudio floral que trabaja con flores de temporada y arreglos sostenibles para bodas."
        },

        website: "https://jardinfloralsma.com",
        instagram: "https://www.instagram.com/jardinfloralsma/",
        phone: "+52 415 000 3004",
        email: "info@jardinfloralsma.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/florists/jardin-hero.jpg",
                alt: {
                    en: "Wedding ceremony floral arch in San Miguel",
                    es: "Arco floral para ceremonia en San Miguel"
                },
                credit: "Courtesy of Jardín Floral SMA",
                sourceUrl: "https://jardinfloralsma.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_florist_casa_bloom",
        type: "vendor",
        categoryKey: "florist",
        slug: "casa-bloom-floral",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Casa Bloom Floral Studio",
            es: "Casa Bloom Floral Studio"
        },
        description: {
            en: "Boutique floral design studio creating intimate and elegant wedding arrangements for destination couples.",
            es: "Estudio floral boutique que crea arreglos íntimos y elegantes para parejas de destino."
        },

        website: "https://casabloomfloral.com",
        instagram: "https://www.instagram.com/casabloomfloral/",
        phone: "+52 415 000 3005",
        email: "hello@casabloomfloral.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/florists/casa-bloom-hero.jpg",
                alt: {
                    en: "Elegant wedding floral centerpiece in San Miguel de Allende",
                    es: "Centro de mesa elegante para boda en San Miguel de Allende"
                },
                credit: "Courtesy of Casa Bloom Floral Studio",
                sourceUrl: "https://casabloomfloral.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    }
];
