import type { FeaturedTier, Promotion } from "~/types/monetization";

export function getActiveTier(
    baseTier: FeaturedTier | undefined,
    promotions: Promotion[] | undefined,
    featuredUntil: string | undefined,
    now = new Date(),
): FeaturedTier {
    // If you’re using legacy boolean featured, handle it elsewhere in sorting.
    const defaultTier: FeaturedTier = baseTier ?? "standard";

    // featuredUntil support (simple one-off legacy)
    if (featuredUntil) {
        const until = new Date(featuredUntil);
        if (!Number.isNaN(until.getTime()) && until > now) return defaultTier;
    }

    const promos = (promotions ?? []).filter(Boolean);
    if (!promos.length) return defaultTier;

    // Highest tier among active promotions wins
    const active = promos.filter((p) => {
        const s = new Date(p.startsAt);
        const e = new Date(p.endsAt);
        return s <= now && now <= e;
    });

    if (!active.length) return defaultTier;

    const rank: Record<FeaturedTier, number> = {
        standard: 1,
        featured: 2,
        sponsored: 3,
    };

    return active.reduce((best, p) => (rank[p.tier] > rank[best] ? p.tier : best), defaultTier);
}
