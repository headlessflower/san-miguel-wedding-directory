// data/taxonomies.ts

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

export type LocaleCode = "en" | "es";

export interface TaxonomyCategory {
  key: VendorCategory;
  label: { en: string; es: string };
  // category slug used in the URL
  slug: { en: string; es: string };
  // optional SEO intro text for category landing pages
  intro?: { en: string; es: string };
}

export const VENDOR_CATEGORIES: TaxonomyCategory[] = [
  {
    key: "planner",
    label: { en: "Wedding planners", es: "Organizadores de bodas" },
    slug: { en: "wedding-planners", es: "organizadores-de-bodas" },
  },
  {
    key: "caterer",
    label: { en: "Caterers", es: "Banquetes" },
    slug: { en: "caterers", es: "banquetes" },
  },
  {
    key: "florist",
    label: { en: "Florists", es: "Floristas" },
    slug: { en: "florists", es: "floristas" },
  },
  {
    key: "photographer",
    label: { en: "Photographers", es: "Fotógrafos" },
    slug: { en: "photographers", es: "fotografos" },
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
