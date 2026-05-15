// app/data/listings/vendors/beauty.seed.ts
import type { VendorListing } from "../types";

export const BEAUTY: VendorListing[] = [
    {
        id: "vendor_beauty_cristina",
        type: "vendor",
        categoryKey: "beauty",
        slug: "cristina-makeup-artist",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Cristina Makeup Artist",
            es: "Cristina Makeup Artist"
        },
        description: {
            en: "Professional bridal hair and makeup artist specializing in destination weddings in San Miguel de Allende.",
            es: "Maquillista y estilista profesional especializada en bodas de destino en San Miguel de Allende."
        },

        website: "https://cristinamakeupartist.com",
        instagram: "https://www.instagram.com/cristinamakeupartist/",
        phone: "+52 415 000 1001",
        email: "hello@cristinamakeupartist.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/beauty/cristina-hero.jpg",
                alt: {
                    en: "Bridal makeup styling in San Miguel de Allende",
                    es: "Maquillaje nupcial en San Miguel de Allende"
                },
                credit: "Courtesy of Cristina Makeup Artist",
                sourceUrl: "https://cristinamakeupartist.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_beauty_mayte_sma",
        type: "vendor",
        categoryKey: "beauty",
        slug: "mayte-bridal-beauty",
        featured: true,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Mayte Bridal Beauty",
            es: "Mayte Bridal Beauty"
        },
        description: {
            en: "Bridal beauty studio offering soft glam and natural wedding styling for international couples.",
            es: "Estudio de belleza nupcial especializado en estilos suaves y naturales para bodas internacionales."
        },

        website: "https://maytebridalbeauty.com",
        instagram: "https://www.instagram.com/maytebridalbeauty/",
        phone: "+52 415 000 1002",
        email: "info@maytebridalbeauty.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/beauty/mayte-hero.jpg",
                alt: {
                    en: "Soft glam bridal makeup in San Miguel",
                    es: "Maquillaje nupcial estilo soft glam en San Miguel"
                },
                credit: "Courtesy of Mayte Bridal Beauty",
                sourceUrl: "https://maytebridalbeauty.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_beauty_gabriela_makeup",
        type: "vendor",
        categoryKey: "beauty",
        slug: "gabriela-makeup-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Gabriela Makeup SMA",
            es: "Gabriela Makeup SMA"
        },
        description: {
            en: "On-location wedding makeup services for brides, bridal parties, and multi-day destination events.",
            es: "Servicios de maquillaje a domicilio para novias, damas y eventos de varios días."
        },

        website: "https://gabrielamakeupsma.com",
        instagram: "https://www.instagram.com/gabrielamakeupsma/",
        phone: "+52 415 000 1003",
        email: "contact@gabrielamakeupsma.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Querétaro"],
            es: ["San Miguel de Allende", "Querétaro"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/beauty/gabriela-hero.jpg",
                alt: {
                    en: "Bridal beauty styling for outdoor hacienda wedding",
                    es: "Maquillaje nupcial para boda en hacienda"
                },
                credit: "Courtesy of Gabriela Makeup SMA",
                sourceUrl: "https://gabrielamakeupsma.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_beauty_sma_hair_team",
        type: "vendor",
        categoryKey: "beauty",
        slug: "sma-hair-team",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "SMA Hair Team",
            es: "SMA Hair Team"
        },
        description: {
            en: "Bridal hairstyling team offering classic updos, modern waves, and full bridal party styling.",
            es: "Equipo de peinado nupcial que ofrece recogidos clásicos, ondas modernas y estilismo completo para el cortejo."
        },

        website: "https://smahairteam.com",
        instagram: "https://www.instagram.com/smahairteam/",
        phone: "+52 415 000 1004",
        email: "hello@smahairteam.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/beauty/sma-hair-team-hero.jpg",
                alt: {
                    en: "Wedding hairstyle for bride in San Miguel de Allende",
                    es: "Peinado de novia en San Miguel de Allende"
                },
                credit: "Courtesy of SMA Hair Team",
                sourceUrl: "https://smahairteam.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_beauty_luna_bridal",
        type: "vendor",
        categoryKey: "beauty",
        slug: "luna-bridal-styling",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Luna Bridal Styling",
            es: "Luna Bridal Styling"
        },
        description: {
            en: "Destination bridal beauty artist specializing in radiant skin-focused makeup and romantic hairstyling.",
            es: "Artista de belleza nupcial especializada en maquillaje luminoso y peinados románticos."
        },

        website: "https://lunabridalstyling.com",
        instagram: "https://www.instagram.com/lunabridalstyling/",
        phone: "+52 415 000 1005",
        email: "info@lunabridalstyling.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Central Mexico"],
            es: ["San Miguel de Allende", "Centro de México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/beauty/luna-hero.jpg",
                alt: {
                    en: "Romantic bridal makeup styling in San Miguel",
                    es: "Maquillaje nupcial romántico en San Miguel"
                },
                credit: "Courtesy of Luna Bridal Styling",
                sourceUrl: "https://lunabridalstyling.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    }
];

