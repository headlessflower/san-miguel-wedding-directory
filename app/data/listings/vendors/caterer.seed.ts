// app/data/listings/vendors/caterers.seed.ts
import type { VendorListing } from "../types";

export const CATERERS: VendorListing[] = [
    {
        id: "vendor_caterer_rubyjoys",
        type: "vendor",
        categoryKey: "caterer",
        slug: "rubyjoys-catering",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: false,
        name: {
            en: "RubyJoy's Catering",
            es: "RubyJoy's Catering",
        },
        description: {
            en: "Full-service gourmet catering for weddings and private events in San Miguel de Allende, offering curated menus and staffed service.",
            es: "Catering gourmet de servicio completo para bodas y eventos privados en San Miguel de Allende, con menús curados y servicio profesional.",
        },
        website: "https://www.rubyjoys.com.mx/",
        instagram: "https://www.instagram.com/rubyjoys_catering/",
        phone: "+52 415 000 0000",
        email: "info@rubyjoys.com.mx",
        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"],
        },
        images: [
            {
                type: "hero",
                src: "/images/vendors/caterers/rubyjoys-hero.jpg",
                alt: {
                    en: "Wedding catering setup in San Miguel de Allende",
                    es: "Montaje de catering para boda en San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "vendor_caterer_the_restaurant",
        type: "vendor",
        categoryKey: "caterer",
        slug: "the-restaurant-catering",
        featured: true,
        featuredTier: "standard",
        isVerified: true,
        isClaimed: false,
        name: {
            en: "The Restaurant (Catering)",
            es: "The Restaurant (Catering)",
        },
        description: {
            en: "Restaurant-led catering services offering refined cuisine and full event coordination support for weddings.",
            es: "Servicios de catering liderados por restaurante que ofrecen cocina refinada y apoyo integral para eventos de boda.",
        },
        website: "https://therestaurantsanmiguel.com/catering-and-events/",
        instagram: "https://www.instagram.com/therestaurantsma/",
        phone: "+52 415 000 0001",
        email: "events@therestaurantsanmiguel.com",
        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"],
        },
        images: [
            {
                type: "hero",
                src: "/images/vendors/caterers/the-restaurant-hero.jpg",
                alt: {
                    en: "Plated wedding dinner in San Miguel de Allende",
                    es: "Cena de boda servida en San Miguel de Allende",
                },
            },
        ],
    },

    {
        id: "vendor_caterer_zumo",
        type: "vendor",
        categoryKey: "caterer",
        slug: "zumo-catering-events",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: true ,
        name: {
            en: "ZUMO Catering & Events",
            es: "ZUMO Catering & Events",
        },
        description: {
            en: "Creative catering studio designing contemporary wedding menus and custom event experiences.",
            es: "Estudio creativo de catering que diseña menús contemporáneos y experiencias personalizadas para bodas.",
        },
        website: "https://zumo-events.com/",
        instagram: "https://www.instagram.com/zumo.events/",
        phone: "+52 415 000 0002",
        email: "hello@zumo-events.com",
        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato region"],
            es: ["San Miguel de Allende", "Región Guanajuato"],
        },
        images: [
            {
                type: "hero",
                src: "/images/vendors/caterers/zumo-hero.jpg",
                alt: {
                    en: "Modern wedding catering display in San Miguel",
                    es: "Montaje moderno de catering para boda en San Miguel",
                },
            },
        ],
    },

    {
        id: "vendor_caterer_nextia",
        type: "vendor",
        categoryKey: "caterer",
        slug: "nextia-catering",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,
        name: {
            en: "neXtia Catering",
            es: "neXtia Catering",
        },
        description: {
            en: "Seasonally inspired catering team crafting elevated culinary experiences for destination weddings.",
            es: "Equipo de catering inspirado en ingredientes de temporada que crea experiencias culinarias elevadas para bodas de destino.",
        },
        website: "https://nextiasma.com/",
        instagram: "https://www.instagram.com/nextiasma/",
        phone: "+52 415 000 0003",
        email: "info@nextiasma.com",
        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"],
        },
        images: [
            {
                type: "hero",
                src: "/images/vendors/caterers/nextia-hero.jpg",
                alt: {
                    en: "Elegant plated wedding cuisine",
                    es: "Platillos elegantes para boda",
                },
            },
        ],
    },

    {
        id: "vendor_caterer_massieu",
        type: "vendor",
        categoryKey: "caterer",
        slug: "massieu-banquetes",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,
        name: {
            en: "Massieu Banquetes",
            es: "Massieu Banquetes",
        },
        description: {
            en: "Banquetes and large-format wedding catering services with experience in haciendas and outdoor venues.",
            es: "Servicios de banquetes y catering para bodas de gran formato con experiencia en haciendas y recintos al aire libre.",
        },
        website: "https://massieubanquetes.com/",
        instagram: "https://www.instagram.com/massieu_banquetes/",
        phone: "+52 415 000 0004",
        email: "contacto@massieubanquetes.com",
        serviceAreas: {
            en: ["San Miguel de Allende", "Bajío"],
            es: ["San Miguel de Allende", "Bajío"],
        },
        images: [
            {
                type: "hero",
                src: "/images/vendors/caterers/massieu-hero.jpg",
                alt: {
                    en: "Large wedding catering service in hacienda setting",
                    es: "Servicio de catering para boda en hacienda",
                },
            },
        ],
    },
];
