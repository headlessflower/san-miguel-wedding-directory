// app/data/listings/vendors/transport.seed.ts
import type { VendorListing } from "../types";

export const TRANSPORT: VendorListing[] = [
    {
        id: "vendor_transport_bajio_executive",
        type: "vendor",
        categoryKey: "transport",
        slug: "bajio-executive-transfers",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Bajío Executive Transfers",
            es: "Bajío Executive Transfers"
        },
        description: {
            en: "Private airport transfers and wedding guest transportation between BJX Airport and San Miguel de Allende.",
            es: "Traslados privados desde el Aeropuerto BJX y transporte para invitados de boda en San Miguel de Allende."
        },

        website: "https://bajioexecutivetransfers.com",
        instagram: "https://www.instagram.com/bajioexecutivetransfers/",
        phone: "+52 415 000 7001",
        email: "reservations@bajioexecutivetransfers.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "BJX Airport", "Querétaro Airport"],
            es: ["San Miguel de Allende", "Aeropuerto BJX", "Aeropuerto de Querétaro"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/transport/bajio-executive-hero.jpg",
                alt: {
                    en: "Private van transfer service for wedding guests",
                    es: "Servicio de transporte privado para invitados de boda"
                },
                credit: "Courtesy of Bajío Executive Transfers",
                sourceUrl: "https://bajioexecutivetransfers.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_transport_sma_luxury",
        type: "vendor",
        categoryKey: "transport",
        slug: "sma-luxury-wedding-transport",
        featured: true,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "SMA Luxury Wedding Transport",
            es: "SMA Luxury Wedding Transport"
        },
        description: {
            en: "Luxury SUVs and chauffeur services for wedding couples and VIP guests.",
            es: "SUVs de lujo y servicio de chofer para novios e invitados VIP."
        },

        website: "https://smaluxurytransport.com",
        instagram: "https://www.instagram.com/smaluxurytransport/",
        phone: "+52 415 000 7002",
        email: "info@smaluxurytransport.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/transport/sma-luxury-hero.jpg",
                alt: {
                    en: "Luxury black SUV wedding transportation",
                    es: "SUV negro de lujo para transporte de boda"
                },
                credit: "Courtesy of SMA Luxury Wedding Transport",
                sourceUrl: "https://smaluxurytransport.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_transport_shuttle_solutions",
        type: "vendor",
        categoryKey: "transport",
        slug: "shuttle-solutions-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Shuttle Solutions SMA",
            es: "Shuttle Solutions SMA"
        },
        description: {
            en: "Group shuttle services for wedding guests staying in Centro and nearby hotels.",
            es: "Servicio de transporte colectivo para invitados hospedados en Centro y hoteles cercanos."
        },

        website: "https://shuttlesolutionssma.com",
        instagram: "https://www.instagram.com/shuttlesolutionssma/",
        phone: "+52 415 000 7003",
        email: "hello@shuttlesolutionssma.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/transport/shuttle-hero.jpg",
                alt: {
                    en: "Wedding guest shuttle bus outside hacienda venue",
                    es: "Autobús para invitados de boda frente a hacienda"
                },
                credit: "Courtesy of Shuttle Solutions SMA",
                sourceUrl: "https://shuttlesolutionssma.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_transport_classic_car",
        type: "vendor",
        categoryKey: "transport",
        slug: "classic-car-weddings-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Classic Car Weddings SMA",
            es: "Classic Car Weddings SMA"
        },
        description: {
            en: "Vintage car rentals for grand wedding entrances and romantic photo sessions.",
            es: "Renta de autos clásicos para entradas espectaculares y sesiones románticas."
        },

        website: "https://classiccarweddingssma.com",
        instagram: "https://www.instagram.com/classiccarweddingssma/",
        phone: "+52 415 000 7004",
        email: "reservations@classiccarweddingssma.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/transport/classic-car-hero.jpg",
                alt: {
                    en: "Vintage wedding car parked in San Miguel de Allende",
                    es: "Auto clásico para boda en San Miguel de Allende"
                },
                credit: "Courtesy of Classic Car Weddings SMA",
                sourceUrl: "https://classiccarweddingssma.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_transport_destination_logistics",
        type: "vendor",
        categoryKey: "transport",
        slug: "destination-wedding-logistics-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Destination Wedding Logistics SMA",
            es: "Destination Wedding Logistics SMA"
        },
        description: {
            en: "Comprehensive guest transportation coordination including airport pickups, rehearsal dinner transfers, and wedding day shuttles.",
            es: "Coordinación integral de transporte para invitados incluyendo traslados de aeropuerto, cena de ensayo y transporte el día de la boda."
        },

        website: "https://destinationweddinglogisticssma.com",
        instagram: "https://www.instagram.com/destinationweddinglogisticssma/",
        phone: "+52 415 000 7005",
        email: "info@destinationweddinglogisticssma.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Central Mexico"],
            es: ["San Miguel de Allende", "Centro de México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/transport/destination-logistics-hero.jpg",
                alt: {
                    en: "Wedding shuttle coordination for destination guests",
                    es: "Coordinación de transporte para invitados de boda destino"
                },
                credit: "Courtesy of Destination Wedding Logistics SMA",
                sourceUrl: "https://destinationweddinglogisticssma.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    }
];
