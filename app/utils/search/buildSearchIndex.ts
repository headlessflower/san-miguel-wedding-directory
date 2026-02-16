// app/utils/search/buildSearchIndex.ts
import type { Locale } from "~/types/i18n";
import type { VenueListing, VendorListing } from "~/data/listings.seed";
import { getVendorCategorySlug } from "~/utils/search/vendorCategorySlug";

export type SearchDocType = "venue" | "vendor" | "post";

export type SearchDoc = {
    type: SearchDocType;
    title: string;
    description?: string;
    urlPath: string; // locale-prefixed path
    tags?: string[];
};

function norm(s: string) {
    return s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function buildSearchIndex(
    locale: Locale,
    venues: VenueListing[],
    vendors: VendorListing[],
    posts: Array<{ title?: string; description?: string; _path?: string; tags?: string[] }> = [],
): SearchDoc[] {
    const l = locale;

    const venueDocs: SearchDoc[] = venues.map((v) => ({
        type: "venue",
        title: v.name[l],
        description: v.description[l],
        urlPath: `/${l}/wedding-venues/${v.slug}`,
        tags: [
            "venue",
            v.venueType ? String(v.venueType) : "",
            v.capacitySeated ? `capacity:${v.capacitySeated}` : "",
        ].filter(Boolean),
    }));

    const vendorDocs: SearchDoc[] = vendors.map((v) => {

        const catSlug = getVendorCategorySlug(v.categoryKey, locale);

        const urlPath = catSlug
            ? `/${locale}/vendors/${catSlug}/${v.slug}`
            : `/${locale}/vendors`;

        return {
            type: "vendor",
            title: v.name[locale],
            description: v.description[locale],
            urlPath,
        };
    });


    const postDocs: SearchDoc[] = posts
        .filter((p) => p._path)
        .map((p) => ({
            type: "post",
            title: p.title || (l === "es" ? "Artículo" : "Post"),
            description: p.description || "",
            urlPath: `/${l}${p._path}`.replace(/\/+/g, "/"),
            tags: p.tags ?? [],
        }));

    return [...venueDocs, ...vendorDocs, ...postDocs];
}

export function searchDocs(docs: SearchDoc[], query: string) {
    const q = norm(query);
    if (!q) return [];

    // super simple scoring: title hits > desc hits > tag hits
    const scored = docs
        .map((d) => {
            const t = norm(d.title);
            const desc = norm(d.description ?? "");
            const tags = (d.tags ?? []).map(norm).join(" ");

            let score = 0;
            if (t.includes(q)) score += 6;
            if (desc.includes(q)) score += 3;
            if (tags.includes(q)) score += 1;

            // bonus for exact-ish starts
            if (t.startsWith(q)) score += 2;

            return { d, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score);

    return scored.map((x) => x.d);
}
