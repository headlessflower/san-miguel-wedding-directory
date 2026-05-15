// app/data/listings/vendors/stationery.seed.ts
import type { VendorListing } from "../types";

export const STATIONERY: VendorListing[] = [
    {
        id: "vendor_stationery_amatl",
        type: "vendor",
        categoryKey: "stationery",
        slug: "amatl-handmade-paper-studio",
        featured: true,
        featuredTier: "sponsored",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Amatl Handmade Paper Studio",
            es: "Amatl Taller de Papel Hecho a Mano"
        },
        description: {
            en: "Boutique handmade paper studio creating wedding invitations, menus, place cards, and custom stationery with natural fibers and botanical inclusions.",
            es: "Taller boutique de papel hecho a mano para invitaciones, menús, tarjetas de lugar y papelería personalizada con fibras naturales e inclusiones botánicas."
        },

        website: "https://amatlpaper.studio",
        instagram: "https://www.instagram.com/amatlpaper/",
        phone: "+52 415 000 5001",
        email: "hello@amatlpaper.studio",

        serviceAreas: {
            en: ["San Miguel de Allende", "Mexico", "International shipping"],
            es: ["San Miguel de Allende", "México", "Envíos internacionales"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/stationery/amatl-hero.jpg",
                alt: {
                    en: "Handmade wedding invitation suite on textured paper with botanicals",
                    es: "Suite de invitación de boda en papel artesanal con botánicos"
                },
                credit: "Courtesy of Amatl Handmade Paper Studio",
                sourceUrl: "https://amatlpaper.studio",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_stationery_letterpress_sma",
        type: "vendor",
        categoryKey: "stationery",
        slug: "san-miguel-letterpress-studio",
        featured: true,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "San Miguel Letterpress Studio",
            es: "San Miguel Letterpress Studio"
        },
        description: {
            en: "Letterpress wedding stationery with classic typography, thick cotton stock, and premium finishes for destination weddings.",
            es: "Papelería de boda en letterpress con tipografía clásica, papel algodón grueso y acabados premium."
        },

        website: "https://sanmiguellletterpress.com",
        instagram: "https://www.instagram.com/sanmiguellletterpress/",
        phone: "+52 415 000 5002",
        email: "info@sanmiguellletterpress.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/stationery/letterpress-hero.jpg",
                alt: {
                    en: "Letterpress wedding invitation with classic serif typography",
                    es: "Invitación de boda en letterpress con tipografía clásica"
                },
                credit: "Courtesy of San Miguel Letterpress Studio",
                sourceUrl: "https://sanmiguellletterpress.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_stationery_calligraphy_house",
        type: "vendor",
        categoryKey: "stationery",
        slug: "calligraphy-house-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Calligraphy House SMA",
            es: "Calligraphy House SMA"
        },
        description: {
            en: "Modern calligraphy and wedding day-of paper goods: escort cards, seating charts, place cards, and signage.",
            es: "Caligrafía moderna y papelería del día: tarjetas de ubicación, seating charts, place cards y señalética."
        },

        website: "https://calligraphyhousesma.com",
        instagram: "https://www.instagram.com/calligraphyhousesma/",
        phone: "+52 415 000 5003",
        email: "hello@calligraphyhousesma.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Querétaro"],
            es: ["San Miguel de Allende", "Querétaro"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/stationery/calligraphy-hero.jpg",
                alt: {
                    en: "Hand-lettered escort cards for a wedding table setting",
                    es: "Tarjetas caligrafiadas para mesa de boda"
                },
                credit: "Courtesy of Calligraphy House SMA",
                sourceUrl: "https://calligraphyhousesma.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_stationery_illustrated_invites",
        type: "vendor",
        categoryKey: "stationery",
        slug: "illustrated-invites-san-miguel",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Illustrated Invites San Miguel",
            es: "Illustrated Invites San Miguel"
        },
        description: {
            en: "Custom illustrated wedding invitations inspired by San Miguel architecture—arches, courtyards, and street scenes.",
            es: "Invitaciones ilustradas inspiradas en la arquitectura de San Miguel—arcos, patios y escenas de calles."
        },

        website: "https://illustratedinvites.mx/san-miguel",
        instagram: "https://www.instagram.com/illustratedinvitesmx/",
        phone: "+52 415 000 5004",
        email: "hola@illustratedinvites.mx",

        serviceAreas: {
            en: ["San Miguel de Allende", "Mexico"],
            es: ["San Miguel de Allende", "México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/stationery/illustrated-invites-hero.jpg",
                alt: {
                    en: "Illustrated San Miguel wedding invitation with a courtyard scene",
                    es: "Invitación ilustrada con escena de patio de San Miguel"
                },
                credit: "Courtesy of Illustrated Invites",
                sourceUrl: "https://illustratedinvites.mx/san-miguel",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_stationery_print_shop_sma",
        type: "vendor",
        categoryKey: "stationery",
        slug: "print-shop-san-miguel",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Print Shop San Miguel",
            es: "Print Shop San Miguel"
        },
        description: {
            en: "Fast local printing for wedding day paper goods: menus, programs, table numbers, welcome cards, and last-minute reprints.",
            es: "Impresión local rápida para papelería del día: menús, programas, números de mesa, tarjetas de bienvenida y reimpresiones urgentes."
        },

        website: "https://printshopsanmiguel.com",
        instagram: "https://www.instagram.com/printshopsanmiguel/",
        phone: "+52 415 000 5005",
        email: "orders@printshopsanmiguel.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/stationery/print-shop-hero.jpg",
                alt: {
                    en: "Wedding menus and place cards printed for a reception",
                    es: "Menús y tarjetas de lugar impresas para recepción"
                },
                credit: "Courtesy of Print Shop San Miguel",
                sourceUrl: "https://printshopsanmiguel.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    }
];
