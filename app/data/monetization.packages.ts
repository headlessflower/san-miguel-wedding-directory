// app/data/monetization.packages.ts
import type { Locale } from "~/types/i18n";
import type { FeaturedTier, BillingCadence } from "~/types/monetization";

export interface Package {
    key: string;
    tier: FeaturedTier;
    cadence: BillingCadence;
    priceUsd: number;

    label: Record<Locale, string>;
    blurb: Record<Locale, string>;
    bullets: Record<Locale, string[]>;

    recommended?: boolean;
}

export const PACKAGES: Package[] = [
    {
        key: "featured_monthly",
        tier: "featured",
        cadence: "monthly",
        priceUsd: 79,
        label: { en: "Featured (Monthly)", es: "Destacado (Mensual)" },
        blurb: {
            en: "Steady visibility for consistent inquiries.",
            es: "Visibilidad constante para consultas recurrentes.",
        },
        bullets: {
            en: ["Priority placement in category lists", "Featured badge", "Enhanced card"],
            es: ["Prioridad en listados", "Insignia destacado", "Tarjeta mejorada"],
        },
        recommended: true,
    },
    {
        key: "featured_boost_90d",
        tier: "featured",
        cadence: "boost_90d",
        priceUsd: 199,
        label: { en: "Featured Boost (90 days)", es: "Impulso Destacado (90 días)" },
        blurb: {
            en: "Perfect for seasonal demand or a short campaign.",
            es: "Ideal para temporadas o campañas cortas.",
        },
        bullets: {
            en: ["90-day boost on your listing", "Ideal for seasonal demand", "No long-term commitment"],
            es: ["Impulso por 90 días", "Ideal para temporadas", "Sin compromiso a largo plazo"],
        },
    },
    {
        key: "sponsored_monthly",
        tier: "sponsored",
        cadence: "monthly",
        priceUsd: 199,
        label: { en: "Sponsored (Monthly)", es: "Patrocinado (Mensual)" },
        blurb: {
            en: "Maximum visibility with premium placement.",
            es: "Máxima visibilidad con colocación premium.",
        },
        bullets: {
            en: ["Top placement in category", "Sponsored badge", "Optional ad slot inclusion"],
            es: ["Top placement en categoría", "Insignia patrocinado", "Incluye slot publicitario (opcional)"],
        },
    },
    {
        key: "sponsored_boost_90d",
        tier: "sponsored",
        cadence: "boost_90d",
        priceUsd: 499,
        label: { en: "Sponsored Boost (90 days)", es: "Impulso Patrocinado (90 días)" },
        blurb: {
            en: "Best for launches, promos, and high-visibility windows.",
            es: "Ideal para lanzamientos, promociones y ventanas de alta visibilidad.",
        },
        bullets: {
            en: ["90-day top placement", "Great for launches/promos", "Optional homepage slot"],
            es: ["Top placement por 90 días", "Ideal para lanzamientos/promos", "Slot en home (opcional)"],
        },
    },
];

export function groupPackagesByCadence(locale: Locale) {
    const monthly = PACKAGES.filter((p) => p.cadence === "monthly");
    const boost90 = PACKAGES.filter((p) => p.cadence === "boost_90d");

    const sortRecommended = (a: Package, b: Package) =>
        Number(!!b.recommended) - Number(!!a.recommended) || a.priceUsd - b.priceUsd;

    return {
        monthly: [...monthly].sort(sortRecommended),
        boost90: [...boost90].sort(sortRecommended),
        headings: {
            monthly: locale === "es" ? "Planes mensuales" : "Monthly plans",
            boost90: locale === "es" ? "Impulsos de 90 días" : "90-day boosts",
        },
    };
}
