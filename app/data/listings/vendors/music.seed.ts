// app/data/listings/vendors/music.seed.ts
import type { VendorListing } from "../types";

export const MUSIC: VendorListing[] = [
    {
        id: "vendor_music_dj_gus",
        type: "vendor",
        categoryKey: "music",
        slug: "dj-gus-san-miguel",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "DJ Gus San Miguel",
            es: "DJ Gus San Miguel"
        },
        description: {
            en: "Wedding DJ and lighting services specializing in bilingual celebrations and multi-day destination events.",
            es: "DJ y servicios de iluminación para bodas bilingües y celebraciones de varios días."
        },

        website: "https://djgussanmiguel.com",
        instagram: "https://www.instagram.com/djgussma/",
        phone: "+52 415 000 2001",
        email: "hello@djgussanmiguel.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/music/dj-gus-hero.jpg",
                alt: {
                    en: "Wedding dance floor with DJ in San Miguel de Allende",
                    es: "Pista de baile con DJ en San Miguel de Allende"
                },
                credit: "Courtesy of DJ Gus San Miguel",
                sourceUrl: "https://djgussanmiguel.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_music_sma_live_band",
        type: "vendor",
        categoryKey: "music",
        slug: "sma-live-band",
        featured: true,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "SMA Live Band",
            es: "SMA Live Band"
        },
        description: {
            en: "Live wedding band offering pop, soul, Latin, and classic hits for destination celebrations.",
            es: "Banda en vivo para bodas con repertorio pop, soul, latino y clásicos para celebraciones de destino."
        },

        website: "https://smaliveband.com",
        instagram: "https://www.instagram.com/smaliveband/",
        phone: "+52 415 000 2002",
        email: "info@smaliveband.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Querétaro"],
            es: ["San Miguel de Allende", "Querétaro"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/music/sma-live-band-hero.jpg",
                alt: {
                    en: "Live wedding band performing at hacienda venue",
                    es: "Banda en vivo tocando en hacienda"
                },
                credit: "Courtesy of SMA Live Band",
                sourceUrl: "https://smaliveband.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_music_mariachi_real",
        type: "vendor",
        categoryKey: "music",
        slug: "mariachi-real-san-miguel",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Mariachi Real San Miguel",
            es: "Mariachi Real San Miguel"
        },
        description: {
            en: "Traditional mariachi ensemble for ceremony entrances, cocktail hour, and late-night wedding surprises.",
            es: "Ensamble tradicional de mariachi para entradas ceremoniales, coctel y sorpresas nocturnas."
        },

        website: "https://mariachirealsma.com",
        instagram: "https://www.instagram.com/mariachirealsma/",
        phone: "+52 415 000 2003",
        email: "contact@mariachirealsma.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/music/mariachi-real-hero.jpg",
                alt: {
                    en: "Mariachi band performing at wedding in San Miguel",
                    es: "Mariachi tocando en boda en San Miguel"
                },
                credit: "Courtesy of Mariachi Real San Miguel",
                sourceUrl: "https://mariachirealsma.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_music_sma_sax_dj",
        type: "vendor",
        categoryKey: "music",
        slug: "sma-sax-dj-collective",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "SMA Sax & DJ Collective",
            es: "SMA Sax & DJ Collective"
        },
        description: {
            en: "DJ and live saxophone fusion experience for upscale destination weddings.",
            es: "Experiencia de DJ con saxofón en vivo para bodas de destino de alto nivel."
        },

        website: "https://smasaxdj.com",
        instagram: "https://www.instagram.com/smasaxdj/",
        phone: "+52 415 000 2004",
        email: "hello@smasaxdj.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Central Mexico"],
            es: ["San Miguel de Allende", "Centro de México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/music/sax-dj-hero.jpg",
                alt: {
                    en: "Saxophonist performing at wedding reception",
                    es: "Saxofonista tocando en recepción de boda"
                },
                credit: "Courtesy of SMA Sax & DJ Collective",
                sourceUrl: "https://smasaxdj.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_music_lux_lighting_audio",
        type: "vendor",
        categoryKey: "music",
        slug: "lux-lighting-audio",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "LUX Lighting & Audio",
            es: "LUX Lighting & Audio"
        },
        description: {
            en: "Wedding sound, lighting, and stage production specialists for large-scale events and hacienda venues.",
            es: "Especialistas en sonido, iluminación y producción escénica para bodas de gran formato y haciendas."
        },

        website: "https://luxlightingaudio.com",
        instagram: "https://www.instagram.com/luxlightingaudio/",
        phone: "+52 415 000 2005",
        email: "info@luxlightingaudio.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/music/lux-lighting-hero.jpg",
                alt: {
                    en: "Wedding reception lighting and stage production setup",
                    es: "Montaje de iluminación y producción para recepción de boda"
                },
                credit: "Courtesy of LUX Lighting & Audio",
                sourceUrl: "https://luxlightingaudio.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    }
];
