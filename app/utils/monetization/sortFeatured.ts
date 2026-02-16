import type { FeaturedTier } from "~/types/monetization";

const rank: Record<FeaturedTier, number> = {
    sponsored: 3,
    featured: 2,
    standard: 1,
};

export function featuredRank(t?: FeaturedTier) {
    return t ? rank[t] : 1;
}

export function sortByFeaturedTier<T extends { featuredTier?: FeaturedTier; featured?: boolean }>(list: T[]) {
    return [...list].sort((a, b) => {
        // Back-compat: if you used `featured: true` earlier, treat as "featured"
        const at: FeaturedTier =
            a.featuredTier ?? (a.featured ? "featured" : "standard");
        const bt: FeaturedTier =
            b.featuredTier ?? (b.featured ? "featured" : "standard");

        return featuredRank(bt) - featuredRank(at);
    });
}
