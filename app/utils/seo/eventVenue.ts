// app/utils/seo/eventVenue.ts
import type { Locale } from "~/types/i18n";

export type Localized<T> = Record<Locale, T>;

export type VenueImage = {
    src: string;
    alt: Localized<string>;
    type?: "hero" | "ceremony" | "reception" | "exterior" | "detail";
    credit?: string;
    sourceUrl?: string;
    licenseNote?: string;
};

export type VenueAddress = {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
};

export type VenueListingLike = {
    slug: string;
    name: Localized<string>;
    description: Localized<string>;
    website?: string;
    instagram?: string;
    phone?: string;
    email?: string;
    address?: VenueAddress;
    images?: VenueImage[];
    // optional fields if you have them
    capacitySeated?: number;
    capacityStanding?: number;
    venueType?: string;
};

export type BuildEventVenueInput = {
    baseUrl?: string; // "https://example.com"
    locale: Locale;
    venue: VenueListingLike;
    pagePath: string; // "/en/wedding-venues/rosewood-san-miguel"
};

function absUrl(baseUrl: string | undefined, pathOrUrl: string) {
    if (!baseUrl) return pathOrUrl;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.startsWith("/")) return `${baseUrl}${pathOrUrl}`;
    return `${baseUrl}/${pathOrUrl}`;
}

export function buildEventVenueJsonLd(input: BuildEventVenueInput) {
    const { baseUrl, locale, venue, pagePath } = input;

    const name = venue.name[locale];
    const description = venue.description[locale];

    const sameAs = [venue.website, venue.instagram].filter(Boolean) as string[];

    const imgs = venue.images ?? [];
    const hero = imgs.find((i) => i.type === "hero") ?? imgs[0] ?? null;

    const jsonLd: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "EventVenue",
        name,
        description,
        url: absUrl(baseUrl, pagePath),
        ...(sameAs.length ? { sameAs } : {}),
        ...(venue.phone ? { telephone: venue.phone } : {}),
        ...(venue.email ? { email: venue.email } : {}),
    };

    if (hero?.src) jsonLd.image = absUrl(baseUrl, hero.src);

    // Address if available
    if (venue.address?.city || venue.address?.country) {
        jsonLd.address = {
            "@type": "PostalAddress",
            ...(venue.address.street ? { streetAddress: venue.address.street } : {}),
            ...(venue.address.city ? { addressLocality: venue.address.city } : {}),
            ...(venue.address.region ? { addressRegion: venue.address.region } : {}),
            ...(venue.address.postalCode ? { postalCode: venue.address.postalCode } : {}),
            ...(venue.address.country ? { addressCountry: venue.address.country } : {}),
        };
    }

    // Capacity if present (schema supports maximumAttendeeCapacity)
    const cap =
        venue.capacityStanding ??
        venue.capacitySeated ??
        undefined;

    if (typeof cap === "number") {
        jsonLd.maximumAttendeeCapacity = cap;
    }

    return jsonLd;
}
