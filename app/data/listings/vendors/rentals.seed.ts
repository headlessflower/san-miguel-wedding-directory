// app/data/listings/vendors/rentals.seed.ts
import type { VendorListing } from "../types";

export const RENTALS: VendorListing[] = [
    {
        id: "vendor_rentals_mah",
        type: "vendor",
        categoryKey: "rentals",
        slug: "mah-rentals",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "MAH Rentals",
            es: "MAH Rentals"
        },
        description: {
            en: "Event furniture and décor rentals for weddings in San Miguel de Allende, including lounge setups, tables, bars, and specialty pieces.",
            es: "Renta de mobiliario y decoración para bodas en San Miguel de Allende, incluyendo salas lounge, mesas, barras y piezas especiales."
        },

        website: "https://mahrentals.com",
        instagram: "https://www.instagram.com/mahrentals/",
        phone: "+52 415 000 6001",
        email: "info@mahrentals.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/rentals/mah-rentals-hero.jpg",
                alt: {
                    en: "Wedding lounge furniture rental setup in San Miguel de Allende",
                    es: "Montaje de mobiliario lounge para boda en San Miguel de Allende"
                },
                credit: "Courtesy of MAH Rentals",
                sourceUrl: "https://mahrentals.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_rentals_sma_event_group",
        type: "vendor",
        categoryKey: "rentals",
        slug: "sma-event-rentals-group",
        featured: true,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "SMA Event Rentals Group",
            es: "SMA Event Rentals Group"
        },
        description: {
            en: "Full-service wedding rental company providing tables, chairs, glassware, lighting, and tent structures.",
            es: "Empresa integral de renta para bodas que ofrece mesas, sillas, cristalería, iluminación y carpas."
        },

        website: "https://smaeventrentals.com",
        instagram: "https://www.instagram.com/smaeventrentals/",
        phone: "+52 415 000 6002",
        email: "hello@smaeventrentals.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Querétaro"],
            es: ["San Miguel de Allende", "Querétaro"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/rentals/sma-event-group-hero.jpg",
                alt: {
                    en: "Wedding reception setup with tables and chairs in hacienda venue",
                    es: "Montaje de recepción de boda con mesas y sillas en hacienda"
                },
                credit: "Courtesy of SMA Event Rentals Group",
                sourceUrl: "https://smaeventrentals.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_rentals_lux_event_design",
        type: "vendor",
        categoryKey: "rentals",
        slug: "lux-event-design-rentals",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "LUX Event Design Rentals",
            es: "LUX Event Design Rentals"
        },
        description: {
            en: "Premium wedding rental inventory including modern lounge furniture, statement bars, and designer décor.",
            es: "Inventario premium para bodas que incluye mobiliario lounge moderno, barras de diseño y decoración especial."
        },

        website: "https://luxeventdesignrentals.com",
        instagram: "https://www.instagram.com/luxeventdesignrentals/",
        phone: "+52 415 000 6003",
        email: "contact@luxeventdesignrentals.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Central Mexico"],
            es: ["San Miguel de Allende", "Centro de México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/rentals/lux-event-hero.jpg",
                alt: {
                    en: "Luxury wedding lounge area setup",
                    es: "Área lounge de lujo para boda"
                },
                credit: "Courtesy of LUX Event Design Rentals",
                sourceUrl: "https://luxeventdesignrentals.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_rentals_classic_party_sma",
        type: "vendor",
        categoryKey: "rentals",
        slug: "classic-party-rentals-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Classic Party Rentals SMA",
            es: "Classic Party Rentals SMA"
        },
        description: {
            en: "Wedding and event rental provider offering traditional banquet furniture, linens, and reception essentials.",
            es: "Proveedor de renta para bodas y eventos que ofrece mobiliario de banquete tradicional, mantelería y esenciales de recepción."
        },

        website: "https://classicpartyrentalssma.com",
        instagram: "https://www.instagram.com/classicpartyrentalssma/",
        phone: "+52 415 000 6004",
        email: "info@classicpartyrentalssma.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/rentals/classic-party-hero.jpg",
                alt: {
                    en: "Classic banquet-style wedding reception setup",
                    es: "Montaje clásico de recepción de boda"
                },
                credit: "Courtesy of Classic Party Rentals SMA",
                sourceUrl: "https://classicpartyrentalssma.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_rentals_tent_solutions_sma",
        type: "vendor",
        categoryKey: "rentals",
        slug: "tent-solutions-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Tent Solutions SMA",
            es: "Tent Solutions SMA"
        },
        description: {
            en: "Specialized tent and structure rental company for outdoor weddings and large-scale hacienda events.",
            es: "Empresa especializada en renta de carpas y estructuras para bodas al aire libre y eventos de gran formato."
        },

        website: "https://tentsolutionssma.com",
        instagram: "https://www.instagram.com/tentsolutionssma/",
        phone: "+52 415 000 6005",
        email: "hello@tentsolutionssma.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/rentals/tent-solutions-hero.jpg",
                alt: {
                    en: "Large outdoor wedding tent setup in San Miguel",
                    es: "Gran carpa para boda al aire libre en San Miguel"
                },
                credit: "Courtesy of Tent Solutions SMA",
                sourceUrl: "https://tentsolutionssma.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    }
];
