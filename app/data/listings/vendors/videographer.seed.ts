// app/data/listings/vendors/videographers.seed.ts
import type { VendorListing } from "../types";

export const VIDEOGRAPHERS: VendorListing[] = [
    {
        id: "vendor_video_hfilms",
        type: "vendor",
        categoryKey: "videographer",
        slug: "h-films-weddings",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "H Films Weddings",
            es: "H Films Weddings"
        },
        description: {
            en: "Wedding cinematography studio capturing multi-day destination celebrations in San Miguel de Allende.",
            es: "Estudio de cinematografía de bodas especializado en celebraciones de destino de varios días en San Miguel de Allende."
        },

        website: "https://hfilmsweddings.com",
        instagram: "https://www.instagram.com/hfilmsweddings/",
        phone: "+52 415 000 8001",
        email: "hello@hfilmsweddings.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Mexico"],
            es: ["San Miguel de Allende", "México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/videographers/hfilms-hero.jpg",
                alt: {
                    en: "Cinematic wedding film still in San Miguel de Allende",
                    es: "Imagen cinematográfica de boda en San Miguel de Allende"
                },
                credit: "Courtesy of H Films Weddings",
                sourceUrl: "https://hfilmsweddings.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_video_sma_cinema",
        type: "vendor",
        categoryKey: "videographer",
        slug: "sma-cinema-studio",
        featured: true,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "SMA Cinema Studio",
            es: "SMA Cinema Studio"
        },
        description: {
            en: "Luxury wedding videography with documentary-style storytelling and drone coverage.",
            es: "Videografía de bodas de lujo con estilo documental y tomas aéreas con dron."
        },

        website: "https://smacinemastudio.com",
        instagram: "https://www.instagram.com/smacinemastudio/",
        phone: "+52 415 000 8002",
        email: "info@smacinemastudio.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Querétaro"],
            es: ["San Miguel de Allende", "Querétaro"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/videographers/sma-cinema-hero.jpg",
                alt: {
                    en: "Drone shot of hacienda wedding reception",
                    es: "Toma aérea de recepción de boda en hacienda"
                },
                credit: "Courtesy of SMA Cinema Studio",
                sourceUrl: "https://smacinemastudio.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_video_destination_films",
        type: "vendor",
        categoryKey: "videographer",
        slug: "destination-films-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Destination Films SMA",
            es: "Destination Films SMA"
        },
        description: {
            en: "Destination wedding films with cinematic editing, vows audio mixing, and highlight reels.",
            es: "Películas de boda de destino con edición cinematográfica, mezcla de audio de votos y videos resumen."
        },

        website: "https://destinationfilmssma.com",
        instagram: "https://www.instagram.com/destinationfilmssma/",
        phone: "+52 415 000 8003",
        email: "contact@destinationfilmssma.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Central Mexico"],
            es: ["San Miguel de Allende", "Centro de México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/videographers/destination-films-hero.jpg",
                alt: {
                    en: "Romantic sunset wedding ceremony film still",
                    es: "Escena romántica de ceremonia al atardecer"
                },
                credit: "Courtesy of Destination Films SMA",
                sourceUrl: "https://destinationfilmssma.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_video_artmotion",
        type: "vendor",
        categoryKey: "videographer",
        slug: "artmotion-wedding-films",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "ArtMotion Wedding Films",
            es: "ArtMotion Wedding Films"
        },
        description: {
            en: "Creative wedding videography blending cinematic visuals with artistic storytelling.",
            es: "Videografía creativa que combina imágenes cinematográficas con narrativa artística."
        },

        website: "https://artmotionweddingfilms.com",
        instagram: "https://www.instagram.com/artmotionweddingfilms/",
        phone: "+52 415 000 8004",
        email: "hello@artmotionweddingfilms.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/videographers/artmotion-hero.jpg",
                alt: {
                    en: "Bride and groom cinematic slow motion shot",
                    es: "Toma en cámara lenta de novios"
                },
                credit: "Courtesy of ArtMotion Wedding Films",
                sourceUrl: "https://artmotionweddingfilms.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    },

    {
        id: "vendor_video_timeless_memories",
        type: "vendor",
        categoryKey: "videographer",
        slug: "timeless-memories-films-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Timeless Memories Films SMA",
            es: "Timeless Memories Films SMA"
        },
        description: {
            en: "Wedding videography focused on emotional storytelling and heirloom-quality films.",
            es: "Videografía de bodas enfocada en narrativa emocional y películas de calidad atemporal."
        },

        website: "https://timelessmemoriesfilms.com",
        instagram: "https://www.instagram.com/timelessmemoriesfilms/",
        phone: "+52 415 000 8005",
        email: "info@timelessmemoriesfilms.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Mexico"],
            es: ["San Miguel de Allende", "México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/videographers/timeless-memories-hero.jpg",
                alt: {
                    en: "Wedding reception cinematic film still",
                    es: "Escena cinematográfica de recepción de boda"
                },
                credit: "Courtesy of Timeless Memories Films SMA",
                sourceUrl: "https://timelessmemoriesfilms.com",
                licenseNote: "Replace with licensed vendor image."
            }
        ]
    }
];
