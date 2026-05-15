import type { FeaturedTier } from "~/types/monetization";
import { getActiveTier } from "~/utils/monetization/activeTier";

const rank: Record<FeaturedTier, number> = { standard: 1, featured: 2, sponsored: 3 };

export function sortListings<T extends {
    featured?: boolean;
    featuredTier?: FeaturedTier;
    featuredUntil?: string;
    promotions?: any[];
    isVerified?: boolean;
    isClaimed?: boolean;
    name: Record<"en" | "es", string>;
}>(list: T[], locale: "en" | "es") {
    const now = new Date();

    return [...list].sort((a, b) => {
        const at = getActiveTier(
            a.featuredTier ?? (a.featured ? "featured" : "standard"),
            a.promotions,
            a.featuredUntil,
            now
        );
        const bt = getActiveTier(
            b.featuredTier ?? (b.featured ? "featured" : "standard"),
            b.promotions,
            b.featuredUntil,
            now
        );

        // 1) Tier rank
        const dTier = rank[bt] - rank[at];
        if (dTier) return dTier;

        // 2) Verified
        const dVer = Number(!!b.isVerified) - Number(!!a.isVerified);
        if (dVer) return dVer;

        // 3) Claimed
        const dClaim = Number(!!b.isClaimed) - Number(!!a.isClaimed);
        if (dClaim) return dClaim;

        // 4) Alpha
        return a.name[locale].localeCompare(b.name[locale]);
    });
}
