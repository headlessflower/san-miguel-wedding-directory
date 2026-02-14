// data/taxonomies.ts
export type LocaleCode = "en" | "es";

export type Localized<T> = Record<LocaleCode, T>;
export type VendorCategory =
  | "planner"
  | "caterer"
  | "florist"
  | "photographer"
  | "videographer"
  | "rentals"
  | "music"
  | "beauty"
  | "officiant"
  | "transport"
  | "stationery";

export type ListingType = "venue" | "vendor";

export interface TaxonomyCategory {
  key: VendorCategory;
  label: Localized<string>;
  // category slug used in the URL
  slug: Localized<string>;
  // optional SEO intro text for category landing pages
  intro?: Localized<string[]>;
  faq?: Localized<Array<{ q: string; a: string }>>;
}

export const VENDOR_CATEGORIES: TaxonomyCategory[] = [
  {
    key: "planner",
    label: { en: "Wedding planners", es: "Organizadores de bodas" },
    slug: { en: "wedding-planners", es: "organizadores-de-bodas" },
    intro: {
      en: [
        "Planning a destination wedding in San Miguel de Allende comes with moving parts: venue coordination, vendor contracts, design, timelines, and guest logistics. A local wedding planner helps you navigate the city’s best options while protecting your time and budget.",
        "Use this directory to compare planners by style and service level. Start with a consultation, ask about availability for your date, and confirm what’s included (full planning, partial planning, or day-of coordination).",
      ],
      es: [
        "Organizar una boda de destino en San Miguel de Allende implica muchas piezas: coordinación con el lugar, contratos con proveedores, diseño, cronograma y logística para invitados. Un organizador local te ayuda a tomar mejores decisiones y a proteger tu tiempo y presupuesto.",
        "Usa este directorio para comparar organizadores por estilo y nivel de servicio. Comienza con una consulta, pregunta por disponibilidad y confirma qué incluye (planificación completa, parcial o coordinación del día).",
      ],
    },
    faq: {
      en: [
        {
          q: "How far in advance should we book a wedding planner in San Miguel?",
          a: "For peak dates, start 9–12 months ahead. For smaller weddings or off-season dates, 3–6 months can work if your venue and key vendors are available.",
        },
        {
          q: "What’s the difference between full planning and day-of coordination?",
          a: "Full planning covers vendor sourcing, contracts, design direction, and timeline management. Day-of coordination focuses on executing an existing plan and managing vendors on the wedding day.",
        },
        {
          q: "Do planners work with bilingual guests and vendors?",
          a: "Many planners in San Miguel work bilingually. Confirm English/Spanish support during your consultation and ask who will be onsite on the wedding weekend.",
        },
      ],
      es: [
        {
          q: "¿Con cuánta anticipación debemos contratar un organizador en San Miguel?",
          a: "Para fechas altas, comienza 9–12 meses antes. Para bodas pequeñas o temporada baja, 3–6 meses puede funcionar si el lugar y proveedores clave tienen disponibilidad.",
        },
        {
          q: "¿Cuál es la diferencia entre planificación completa y coordinación del día?",
          a: "La planificación completa incluye búsqueda de proveedores, contratos, dirección de diseño y manejo de cronograma. La coordinación del día se enfoca en ejecutar un plan existente y coordinar proveedores durante el evento.",
        },
        {
          q: "¿Los organizadores trabajan con invitados y proveedores bilingües?",
          a: "Muchos organizadores en San Miguel trabajan de forma bilingüe. Confírmalo en la consulta y pregunta quién estará presente durante el fin de semana de la boda.",
        },
      ],
    },
  },
  {
    key: "caterer",
    label: { en: "Wedding caterers", es: "Banquetes" },
    slug: { en: "wedding-caterers", es: "banquetes-bodas" },
    intro: {
      en: [
        "Caterers in San Miguel blend regional Mexican cuisine with international menus.",
        "Ask about tasting sessions, staffing, and rental coordination.",
      ],
      es: [
        "Los banquetes en San Miguel combinan cocina mexicana regional con menús internacionales.",
        "Pregunta por degustaciones, personal y coordinación de renta.",
      ],
    },
  },
  {
    key: "florist",
    label: { en: "Florists", es: "Floristas" },
    slug: { en: "florists", es: "floristas" },
    intro: {
      en: [
        "Florists in San Miguel de Allende specialize in seasonal, locally sourced arrangements that complement haciendas, rooftops, gardens, and churches.",
        "Whether you want modern minimalist installations or lush romantic arches, work with a florist familiar with venue logistics, heat considerations, and ceremony timing.",
      ],
      es: [
        "Los floristas en San Miguel de Allende trabajan con flores de temporada y arreglos adaptados a haciendas, terrazas, jardines e iglesias.",
        "Ya sea que busques instalaciones modernas o arcos románticos y exuberantes, elige un florista con experiencia en logística local y clima.",
      ],
    },
    faq: {
      en: [
        {
          q: "How far in advance should I book a florist?",
          a: "For peak season (October–April), book 6–12 months in advance.",
        },
        {
          q: "Do florists handle installation and breakdown?",
          a: "Most full-service florists manage delivery, setup, and removal after the event.",
        },
      ],
      es: [
        {
          q: "¿Con cuánta anticipación debo contratar un florista?",
          a: "Para temporada alta (octubre–abril), reserva con 6–12 meses de anticipación.",
        },
        {
          q: "¿El florista incluye montaje y desmontaje?",
          a: "La mayoría de los floristas de servicio completo incluyen entrega, instalación y retiro.",
        },
      ],
    },
  },
  {
    key: "photographer",
    label: { en: "Wedding photographers", es: "Fotógrafos de bodas" },
    slug: { en: "wedding-photographers", es: "fotografos-de-bodas" },
    intro: {
      en: [
        "San Miguel de Allende offers golden-hour rooftops, cobblestone streets, and dramatic church backdrops.",
        "Choose a photographer experienced in destination weddings and multi-day coverage.",
      ],
      es: [
        "San Miguel de Allende ofrece terrazas al atardecer, calles empedradas y templos icónicos.",
        "Elige un fotógrafo con experiencia en bodas de destino y cobertura de varios días.",
      ],
    },
  },
  {
    key: "videographer",
    label: { en: "Videographers", es: "Videógrafos" },
    slug: { en: "videographers", es: "videografos" },
  },
  {
    key: "rentals",
    label: { en: "Rentals", es: "Renta de mobiliario" },
    slug: { en: "rentals", es: "renta-de-mobiliario" },
  },
  {
    key: "music",
    label: { en: "DJs & bands", es: "DJ y grupos" },
    slug: { en: "djs-and-bands", es: "dj-y-grupos" },
  },
  {
    key: "beauty",
    label: { en: "Hair & makeup", es: "Peinado y maquillaje" },
    slug: { en: "hair-and-makeup", es: "peinado-y-maquillaje" },
  },
  {
    key: "officiant",
    label: { en: "Officiants", es: "Oficiantes" },
    slug: { en: "officiants", es: "oficiantes" },
  },
  {
    key: "transport",
    label: { en: "Transportation", es: "Transporte" },
    slug: { en: "transportation", es: "transporte" },
  },
  {
    key: "stationery",
    label: { en: "Stationery", es: "Papelería" },
    slug: { en: "stationery", es: "papeleria" },
  },
];

export function getVendorCategoryBySlug(
  locale: LocaleCode,
  slug: string,
): TaxonomyCategory | undefined {
  return VENDOR_CATEGORIES.find((c) => c.slug[locale] === slug);
}

export function getVendorCategoryByKey(
  key: VendorCategory,
): TaxonomyCategory | undefined {
  return VENDOR_CATEGORIES.find((c) => c.key === key);
}
