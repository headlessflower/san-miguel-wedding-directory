// planner.seed.ts
import type { VendorListing } from "../types";

export const PLANNERS: VendorListing[] = [
    {
        id: "vendor_planner_penzi",
        type: "vendor",
        categoryKey: "planner",
        slug: "penzi-weddings",
        featured: true,
        featuredTier: "featured",
        name: { en: "Penzi Weddings", es: "Penzi Weddings" },
        description: {
            en: "Destination wedding planning studio based in San Miguel de Allende, known for colorful, design-forward celebrations.",
            es: "Estudio de planeación de bodas de destino en San Miguel de Allende, reconocido por celebraciones vibrantes y de alto diseño.",
        },
        website: "https://www.penziweddings.com/",
        instagram: "https://www.instagram.com/penziweddings/",
        serviceAreas: {
            en: ["San Miguel de Allende", "Central Mexico"],
            es: ["San Miguel de Allende", "Centro de México"],
        },
    },

    {
        id: "vendor_planner_guadalupe_alvarez",
        type: "vendor",
        categoryKey: "planner",
        slug: "guadalupe-alvarez-wedding-planner",
        featured: true,
        featuredTier: "standard",
        name: { en: "Guadalupe Álvarez Wedding Planner", es: "Guadalupe Álvarez Wedding Planner" },
        description: {
            en: "Full-service bilingual wedding planner specializing in destination celebrations in San Miguel de Allende.",
            es: "Planeadora bilingüe de servicio completo especializada en bodas de destino en San Miguel de Allende.",
        },
        website: "https://www.guadalupealvarezwp.com/",
        instagram: "https://www.instagram.com/guadalupealvarezwp/",
        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"],
        },
    },

    {
        id: "vendor_planner_lavenda",
        type: "vendor",
        categoryKey: "planner",
        slug: "lavenda-weddings",
        featured: true,
        featuredTier: "featured",
        name: { en: "Lavenda Weddings", es: "Lavenda Weddings" },
        description: {
            en: "Luxury wedding planning and event design studio curating refined celebrations in San Miguel de Allende.",
            es: "Estudio de planeación y diseño de bodas de lujo que crea celebraciones elegantes en San Miguel de Allende.",
        },
        website: "https://lavendaweddings.com/",
        instagram: "https://www.instagram.com/lavendaweddings/",
        serviceAreas: {
            en: ["San Miguel de Allende", "Mexico"],
            es: ["San Miguel de Allende", "México"],
        },
    },

    {
        id: "vendor_planner_marcela_mansergas",
        type: "vendor",
        categoryKey: "planner",
        slug: "marcela-mansergas-events",
        featured: true,
        featuredTier: "standard",
        name: { en: "Marcela Mansergas Events", es: "Marcela Mansergas Events" },
        description: {
            en: "Wedding and event planner with experience coordinating destination weddings in San Miguel de Allende.",
            es: "Planeadora de bodas y eventos con experiencia en la coordinación de bodas de destino en San Miguel de Allende.",
        },
        instagram: "https://www.instagram.com/marcelamansergasevents/",
        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"],
        },
    },

    {
        id: "vendor_planner_romantic_wedding_sma",
        type: "vendor",
        categoryKey: "planner",
        slug: "romantic-wedding-san-miguel",
        featured: true,
        featuredTier: "standard",
        name: { en: "Romantic Wedding San Miguel", es: "Romantic Wedding San Miguel" },
        description: {
            en: "Destination wedding coordination team helping international couples plan celebrations in San Miguel de Allende.",
            es: "Equipo de coordinación de bodas de destino que ayuda a parejas internacionales a planear celebraciones en San Miguel de Allende.",
        },
        website: "https://www.romanticweddingsanmiguel.com/",
        instagram: "https://www.instagram.com/romanticweddingsanmiguel/",
        serviceAreas: {
            en: ["San Miguel de Allende"],
            es: ["San Miguel de Allende"],
        },
    },
];
