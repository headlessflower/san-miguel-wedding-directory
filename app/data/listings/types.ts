// app/data/listings/types.ts

export type Locale = "en" | "es";
export type Localized<T> = Record<Locale, T>;

/** Venues */

export type VenueType =
    | "hacienda"
    | "hotel_boutique"
    | "hotel_luxury"
    | "rooftop"
    | "garden"
    | "estate"
    | "historic_home"
    | "industrial"
    | "restaurant"
    | "other";

export type LuxuryTier = "budget" | "mid" | "upper" | "luxury";
export type CeremonyType = "civil" | "religious" | "symbolic";
export type PriceRange = "$" | "$$" | "$$$" | "$$$$";

/** Monetization */

export type FeaturedTier = "standard" | "featured" | "sponsored";

export type Promotion = {
    tier: FeaturedTier;
    startsAt: string; // ISO
    endsAt: string; // ISO
};

/** Shared listing types */

export type ListingImageType = "hero" | "ceremony" | "reception" | "exterior" | "detail";

export interface ListingImage {
    src: string;
    alt: Localized<string>;
    type?: ListingImageType;
    credit?: string;
    sourceUrl?: string;
    licenseNote?: string;
}

export interface ListingBase {
    id: string;
    slug: string;

    /**
     * Back-compat / quick flag. Your sorting logic can treat:
     * - featuredTier if present
     * - otherwise featured=true => "featured"
     */
    featured: boolean;

    name: Localized<string>;
    description: Localized<string>;

    // Contact
    website?: string;
    instagram?: string;
    phone?: string;
    email?: string;

    // Media
    images?: ListingImage[];

    // Monetization hooks (keep)
    isVerified?: boolean;
    isClaimed?: boolean;
    featuredTier?: FeaturedTier;
    featuredUntil?: string; // ISO date
    promotions?: Promotion[];
}

/** Venue-specific */

export interface VenueRules {
    noiseCurfewTime?: string;
    requiresInHouseCatering?: boolean;
    allowsOutsideCatering?: boolean;
    allowsLiveMusic?: boolean;
    alcoholAllowed?: boolean;
}

export interface VenueLogistics {
    indoorBackup?: boolean;
    parkingOnSite?: boolean;
    wheelchairAccessible?: boolean;
    lodgingOnSite?: boolean;
}

export interface LocationHints {
    area?: string;
    withinCentro?: boolean;
    approximateDriveMinsFromCentro?: number;
}

export interface VenueListing extends ListingBase {
    type: "venue";
    venueType: VenueType;

    capacitySeated?: number;
    capacityStanding?: number;

    luxuryTier?: LuxuryTier;
    priceRange?: PriceRange;

    ceremonyTypes?: CeremonyType[];
    rules?: VenueRules;
    logistics?: VenueLogistics;
    location?: LocationHints;

    highlights?: Localized<string[]>;
}

/** Vendor-specific */

export type VendorCategoryKey =
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

export interface VendorListing extends ListingBase {
    type: "vendor";
    categoryKey: VendorCategoryKey;

    serviceAreas?: Localized<string[]>;

    address?: {
        street?: string;
        city?: string;
        region?: string;
        country?: string;
        postalCode?: string;
    };
}

export type Listing = VenueListing | VendorListing;
export type VendorCategory = VendorCategoryKey;
