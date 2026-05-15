export type FeaturedTier = "standard" | "featured" | "sponsored";
export type BillingCadence = "monthly" | "boost_90d";


export type AdPlacement =
    | "home_hero"
    | "home_featured_grid"
    | "venues_index_top"
    | "venues_detail_sidebar"
    | "vendors_category_top"
    | "vendors_detail_sidebar"
    | "blog_index_inline"
    | "blog_post_inline";

export type AdCreativeType = "image" | "html" | "text";

export interface AdCreative {
    type: AdCreativeType;
    title: string;
    body?: string;
    imageSrc?: string;
    imageAlt?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    sponsorName?: string;
    sponsorUrl?: string;
}

export interface AdCampaign {
    id: string;
    placement: AdPlacement;
    active: boolean;
    locale?: "en" | "es" | "all";
    weight?: number; // higher = more likely to show
    creative: AdCreative;
}

export interface Promotion {
    tier: FeaturedTier;         // featured or sponsored
    cadence: BillingCadence;    // monthly or boost_90d
    startsAt: string;           // ISO date
    endsAt: string;             // ISO date
    note?: string;              // internal note ("paid via invoice", etc.)
}

