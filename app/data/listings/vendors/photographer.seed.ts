// app/data/listings/vendors/photographers.seed.ts
import type { VendorListing } from "~/data/listings/types";

export const PHOTOGRAPHERS: VendorListing[] = [
    {
        id: "vendor_photographer_anna_sauza",
        type: "vendor",
        categoryKey: "photographer",
        slug: "anna-sauza-photography",
        featured: true,
        featuredTier: "featured",

        name: { en: "Anna Sauza Photography", es: "Anna Sauza Photography" },
        description: {
            en: "Award-winning wedding photographer based in San Miguel de Allende, known for film-forward, editorial storytelling.",
            es: "Fotógrafa de bodas basada en San Miguel de Allende, con un estilo editorial y enfoque en película."
        },

        website: "https://annasauza.com",
        instagram: "https://www.instagram.com/annasauzaphotography/",
        phone: "+52 000 000 0000",
        email: "hello@annasauza.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato", "Querétaro", "Mexico (nationwide)"],
            es: ["San Miguel de Allende", "Guanajuato", "Querétaro", "México (nacional)"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/photographers/anna-sauza-hero.jpg",
                alt: {
                    en: "Wedding portraits in San Miguel de Allende captured in an editorial style",
                    es: "Retratos de boda en San Miguel de Allende con estilo editorial"
                },
                credit: "Courtesy of Anna Sauza Photography",
                sourceUrl: "https://annasauza.com",
                licenseNote: "Replace with press kit or your own licensed image."
            }
        ],

        isVerified: false,
        isClaimed: false
    },

    {
        id: "vendor_photographer_nahuel_aseff",
        type: "vendor",
        categoryKey: "photographer",
        slug: "nahuel-aseff-photography",
        featured: true,
        featuredTier: "featured",

        name: { en: "Nahuel Aseff Photography", es: "Nahuel Aseff Photography" },
        description: {
            en: "Destination wedding photographer based in San Miguel de Allende with cinematic, documentary + editorial coverage.",
            es: "Fotógrafo de bodas de destino en San Miguel de Allende con cobertura cinematográfica, documental y editorial."
        },

        website: "https://nahuelaseff.com",
        instagram: "https://www.instagram.com/nahuelaseffphotography/",
        phone: "+52 000 000 0000",
        email: "hello@nahuelaseff.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato", "Mexico (nationwide)", "Worldwide"],
            es: ["San Miguel de Allende", "Guanajuato", "México (nacional)", "Internacional"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/photographers/nahuel-aseff-hero.jpg",
                alt: {
                    en: "Cinematic wedding moment photographed in San Miguel de Allende",
                    es: "Momento de boda cinematográfico fotografiado en San Miguel de Allende"
                },
                credit: "Courtesy of Nahuel Aseff Photography",
                sourceUrl: "https://nahuelaseff.com",
                licenseNote: "Replace with press kit or your own licensed image."
            }
        ],

        isVerified: false,
        isClaimed: false
    },

    {
        id: "vendor_photographer_ritrae_studio",
        type: "vendor",
        categoryKey: "photographer",
        slug: "ritrae-studio",
        featured: false,
        featuredTier: "standard",

        name: { en: "Ritrae Studio", es: "Ritrae Studio" },
        description: {
            en: "San Miguel de Allende wedding photography studio capturing candid emotion, honest details, and full-day storytelling.",
            es: "Estudio de fotografía de bodas en San Miguel de Allende enfocado en emoción real, detalles honestos y narrativa completa."
        },

        website: "https://www.ritraestudio.com",
        instagram: "https://www.instagram.com/ritraestudio/",
        phone: "+52 000 000 0000",
        email: "info@ritraestudio.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato", "Querétaro", "CDMX"],
            es: ["San Miguel de Allende", "Guanajuato", "Querétaro", "CDMX"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/photographers/ritrae-studio-hero.jpg",
                alt: {
                    en: "Wedding celebration photographed with documentary-style storytelling",
                    es: "Celebración de boda fotografiada con narrativa estilo documental"
                },
                credit: "Courtesy of Ritrae Studio",
                sourceUrl: "https://www.ritraestudio.com",
                licenseNote: "Replace with press kit or your own licensed image."
            }
        ],

        isVerified: false,
        isClaimed: false
    },

    {
        id: "vendor_photographer_dinorah_avila",
        type: "vendor",
        categoryKey: "photographer",
        slug: "dinorah-avila-fotografa",
        featured: false,
        featuredTier: "standard",

        name: { en: "Dinorah Ávila", es: "Dinorah Ávila" },
        description: {
            en: "Destination wedding photographer based in San Miguel de Allende with an expressive, modern approach.",
            es: "Fotógrafa de bodas de destino basada en San Miguel de Allende con un enfoque expresivo y moderno."
        },

        website: "https://dinorahavilafotografa.com",
        instagram: "https://www.instagram.com/dinorahavilaphoto/",
        phone: "+52 000 000 0000",
        email: "hello@dinorahavilafotografa.com",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato", "Mexico (nationwide)"],
            es: ["San Miguel de Allende", "Guanajuato", "México (nacional)"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/photographers/dinorah-avila-hero.jpg",
                alt: {
                    en: "Wedding couple portraits with natural light in San Miguel de Allende",
                    es: "Retratos de pareja con luz natural en San Miguel de Allende"
                },
                credit: "Courtesy of Dinorah Ávila",
                sourceUrl: "https://dinorahavilafotografa.com",
                licenseNote: "Replace with press kit or your own licensed image."
            }
        ],

        isVerified: false,
        isClaimed: false
    },

    {
        id: "vendor_photographer_la_celestina",
        type: "vendor",
        categoryKey: "photographer",
        slug: "la-celestina-photography",
        featured: false,
        featuredTier: "standard",

        name: { en: "La Celestina Photography", es: "La Celestina Photography" },
        description: {
            en: "Destination wedding photography serving San Miguel de Allende and beyond, focused on timeless romantic storytelling.",
            es: "Fotografía de bodas de destino en San Miguel de Allende y más allá, con una narrativa romántica y atemporal."
        },

        website: "https://lacelestina.net",
        instagram: "https://www.instagram.com/lacelestinaphotography/",
        phone: "+52 000 000 0000",
        email: "hello@lacelestina.net",

        serviceAreas: {
            en: ["San Miguel de Allende", "Guanajuato", "Oaxaca", "Mexico (nationwide)"],
            es: ["San Miguel de Allende", "Guanajuato", "Oaxaca", "México (nacional)"]
        },

        images: [
            {
                type: "hero",
                src: "/images/vendors/photographers/la-celestina-hero.jpg",
                alt: {
                    en: "Elegant destination wedding photography in San Miguel de Allende",
                    es: "Fotografía elegante de boda de destino en San Miguel de Allende"
                },
                credit: "Courtesy of La Celestina Photography",
                sourceUrl: "https://lacelestina.net",
                licenseNote: "Replace with press kit or your own licensed image."
            }
        ],

        isVerified: false,
        isClaimed: false
    }
];
