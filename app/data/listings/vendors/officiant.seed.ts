// app/data/listings/vendors/officiants.seed.ts
import type { VendorListing } from "../types";

export const OFFICIANTS: VendorListing[] = [
    {
        id: "vendor_officiant_sma",
        type: "vendor",
        categoryKey: "officiant",
        slug: "san-miguel-wedding-officiant",
        featured: true,
        featuredTier: "featured",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "San Miguel Wedding Officiant",
            es: "Oficiante de Bodas en San Miguel"
        },
        description: {
            en: "Bilingual officiant specializing in civil and symbolic wedding ceremonies for destination couples.",
            es: "Oficiante bilingüe especializado en ceremonias civiles y simbólicas para bodas de destino."
        },

        website: "https://sanmiguelweddingofficiant.com",
        instagram: "https://www.instagram.com/sanmiguelweddingofficiant/",
        phone: "+52 415 000 4001",
        email: "hello@sanmiguelweddingofficiant.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/officiants/sma-officiant-hero.jpg",
                alt: {
                    en: "Symbolic wedding ceremony in San Miguel de Allende",
                    es: "Ceremonia simbólica de boda en San Miguel de Allende"
                },
                credit: "Courtesy of San Miguel Wedding Officiant",
                sourceUrl: "https://sanmiguelweddingofficiant.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_officiant_ceremonias_bajio",
        type: "vendor",
        categoryKey: "officiant",
        slug: "ceremonias-bajio",
        featured: true,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Ceremonias Bajío",
            es: "Ceremonias Bajío"
        },
        description: {
            en: "Professional officiant team providing customized symbolic ceremonies in English and Spanish.",
            es: "Equipo profesional que ofrece ceremonias simbólicas personalizadas en inglés y español."
        },

        website: "https://ceremoniasbajio.com",
        instagram: "https://www.instagram.com/ceremoniasbajio/",
        phone: "+52 415 000 4002",
        email: "info@ceremoniasbajio.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Querétaro"],
            es: ["San Miguel de Allende", "Querétaro"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/officiants/ceremonias-bajio-hero.jpg",
                alt: {
                    en: "Outdoor wedding ceremony at hacienda venue",
                    es: "Ceremonia al aire libre en hacienda"
                },
                credit: "Courtesy of Ceremonias Bajío",
                sourceUrl: "https://ceremoniasbajio.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_officiant_reverend_ana",
        type: "vendor",
        categoryKey: "officiant",
        slug: "reverend-ana-san-miguel",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Reverend Ana San Miguel",
            es: "Reverenda Ana San Miguel"
        },
        description: {
            en: "Inclusive wedding officiant offering spiritual, interfaith, and non-religious ceremonies.",
            es: "Oficiante inclusiva que ofrece ceremonias espirituales, interreligiosas y no religiosas."
        },

        website: "https://reverendanasanmiguel.com",
        instagram: "https://www.instagram.com/reverendanasa/",
        phone: "+52 415 000 4003",
        email: "contact@reverendanasanmiguel.com",

        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/officiants/reverend-ana-hero.jpg",
                alt: {
                    en: "Romantic wedding vow exchange ceremony",
                    es: "Intercambio de votos en ceremonia romántica"
                },
                credit: "Courtesy of Reverend Ana San Miguel",
                sourceUrl: "https://reverendanasanmiguel.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_officiant_civil_services_sma",
        type: "vendor",
        categoryKey: "officiant",
        slug: "civil-wedding-services-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Civil Wedding Services SMA",
            es: "Servicios Civiles de Boda SMA"
        },
        description: {
            en: "Guidance and coordination for legally binding civil wedding ceremonies in San Miguel de Allende.",
            es: "Asesoría y coordinación para ceremonias civiles legalmente válidas en San Miguel de Allende."
        },

        website: "https://civilweddingsma.com",
        instagram: "https://www.instagram.com/civilweddingsma/",
        phone: "+52 415 000 4004",
        email: "info@civilweddingsma.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato"],
            es: ["San Miguel de Allende", "Guanajuato"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/officiants/civil-services-hero.jpg",
                alt: {
                    en: "Civil wedding ceremony signing in San Miguel",
                    es: "Firma de ceremonia civil en San Miguel"
                },
                credit: "Courtesy of Civil Wedding Services SMA",
                sourceUrl: "https://civilweddingsma.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    },

    {
        id: "vendor_officiant_destination_ceremonies",
        type: "vendor",
        categoryKey: "officiant",
        slug: "destination-ceremonies-sma",
        featured: false,
        featuredTier: "standard",
        isVerified: false,
        isClaimed: false,

        name: {
            en: "Destination Ceremonies SMA",
            es: "Destination Ceremonies SMA"
        },
        description: {
            en: "Ceremony design and officiant services for luxury destination weddings in San Miguel de Allende.",
            es: "Diseño de ceremonias y servicios de oficiante para bodas de destino de lujo."
        },

        website: "https://destinationceremoniessma.com",
        instagram: "https://www.instagram.com/destinationceremoniessma/",
        phone: "+52 415 000 4005",
        email: "hello@destinationceremoniessma.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Central Mexico"],
            es: ["San Miguel de Allende", "Centro de México"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/officiants/destination-ceremonies-hero.jpg",
                alt: {
                    en: "Luxury symbolic wedding ceremony setup",
                    es: "Montaje de ceremonia simbólica de lujo"
                },
                credit: "Courtesy of Destination Ceremonies SMA",
                sourceUrl: "https://destinationceremoniessma.com",
                licenseNote: "Replace with licensed press image."
            }
        ]
    }
];
