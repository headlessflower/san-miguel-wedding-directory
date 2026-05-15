import type { Locale } from "~/types/i18n";
import type { FeaturedTier, Promotion } from "~/types/monetization";
import { getActiveTier } from "~/utils/monetization/activeTier";

type HasPromoFields = {
    featured?: boolean;
    featuredTier?: FeaturedTier;
    featuredUntil?: string;
    promotions?: Promotion[];
};

export type InterleaveOptions = {
    every?: number;
    startAfter?: number;
    maxSponsored?: number;
    appendRemainder?: boolean; // optional: whether to tack leftover sponsored to the end
};

export function interleaveSponsored<T extends HasPromoFields>(
    list: T[],
    locale: Locale,
    opts: InterleaveOptions = {},
): T[] {
    const every = opts.every ?? 5;
    const startAfter = opts.startAfter ?? 2;
    const maxSponsored = opts.maxSponsored ?? Infinity;
    const appendRemainder = opts.appendRemainder ?? true;

    const now = new Date();

    const sponsored: T[] = [];
    const others: T[] = [];

    for (const item of list) {
        const tier = getActiveTier(
            item.featuredTier ?? (item.featured ? "featured" : "standard"),
            item.promotions,
            item.featuredUntil,
            now,
        );
        if (tier === "sponsored") sponsored.push(item);
        else others.push(item);
    }

    if (!sponsored.length) return list;

    const out: T[] = [];
    let nonSponsoredCount = 0;
    let sIdx = 0;

    for (const item of others) {
        out.push(item);
        nonSponsoredCount += 1;

        const canInsert =
            nonSponsoredCount >= startAfter &&
            nonSponsoredCount % every === 0 &&
            sIdx < sponsored.length &&
            sIdx < maxSponsored;

        if (canInsert) {
            const s = sponsored[sIdx];
            if (s) {
                out.push(s);
                sIdx += 1;
            }
        }
    }

    if (appendRemainder) {
        while (sIdx < sponsored.length && sIdx < maxSponsored) {
            const s = sponsored[sIdx];
            if (!s) break;
            out.push(s);
            sIdx += 1;
        }
    }

    return out;
}
