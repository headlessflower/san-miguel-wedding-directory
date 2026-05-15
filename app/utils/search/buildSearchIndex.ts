// app/utils/search/buildSearchIndex.ts
import type { Locale } from "~/types/i18n";
import type { VenueListing, VendorListing } from "~/data/listings.seed";
import { getVendorCategoryByKey } from "~/data/taxonomies";
import { getVendorCategorySlug } from "~/utils/search/vendorCategorySlug";

export type SearchDocType = "venue" | "vendor" | "post";

export type SearchDoc = {
    type: SearchDocType;
    title: string;
    description?: string;
    urlPath: string; // locale-prefixed path
    tags?: string[];
};

type SearchField = "title" | "description" | "tags";

type IndexedSearchDoc = {
    doc: SearchDoc;
    titleNorm: string;
    titleTokens: Set<string>;
};

export type SearchIndex = {
    docs: IndexedSearchDoc[];
    terms: Map<string, Map<number, number>>;
    prefixes: Map<string, Set<string>>;
};

const FIELD_WEIGHTS: Record<SearchField, number> = {
    title: 8,
    description: 3,
    tags: 5,
};

const STOP_WORDS = new Set([
    "a",
    "an",
    "and",
    "are",
    "at",
    "de",
    "del",
    "el",
    "en",
    "for",
    "in",
    "la",
    "las",
    "los",
    "of",
    "para",
    "the",
    "to",
    "un",
    "una",
    "with",
    "y",
]);

function norm(s: string) {
    return s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function tokenize(s: string) {
    return norm(s)
        .split(" ")
        .filter(Boolean);
}

function queryTokens(query: string) {
    const tokens = tokenize(query);
    const meaningful = tokens.filter((token) => !STOP_WORDS.has(token));
    return meaningful.length ? meaningful : tokens;
}

function addPosting(
    terms: SearchIndex["terms"],
    term: string,
    docId: number,
    weight: number,
) {
    const postings = terms.get(term) ?? new Map<number, number>();
    postings.set(docId, (postings.get(docId) ?? 0) + weight);
    terms.set(term, postings);
}

function addPrefixes(prefixes: SearchIndex["prefixes"], term: string) {
    const max = Math.min(term.length, 24);

    for (let size = 2; size <= max; size += 1) {
        const prefix = term.slice(0, size);
        const matches = prefixes.get(prefix) ?? new Set<string>();
        matches.add(term);
        prefixes.set(prefix, matches);
    }
}

export function buildSearchIndex(
    locale: Locale,
    venues: VenueListing[],
    vendors: VendorListing[],
    posts: Array<{ title?: string; description?: string; path?: string; tags?: string[] }> = [],
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
            v.luxuryTier ?? "",
            v.priceRange ?? "",
            v.location?.area ?? "",
            ...(v.ceremonyTypes ?? []),
            ...(v.highlights?.[l] ?? []),
        ].filter(Boolean),
    }));

    const vendorDocs: SearchDoc[] = vendors.map((v) => {
        const catSlug = getVendorCategorySlug(v.categoryKey, locale);
        const category = getVendorCategoryByKey(v.categoryKey);

        const urlPath = catSlug
            ? `/${locale}/vendors/${catSlug}/${v.slug}`
            : `/${locale}/vendors`;

        return {
            type: "vendor",
            title: v.name[locale],
            description: v.description[locale],
            urlPath,
            tags: [
                "vendor",
                v.categoryKey,
                category?.label[locale] ?? "",
                category?.label.en ?? "",
                category?.label.es ?? "",
                ...(v.serviceAreas?.[locale] ?? []),
                v.address?.city ?? "",
                v.address?.region ?? "",
            ].filter(Boolean),
        };
    });


    const postDocs: SearchDoc[] = posts
        .filter((p) => p.path)
        .map((p) => ({
            type: "post",
            title: p.title || (l === "es" ? "Artículo" : "Post"),
            description: p.description || "",
            urlPath: `/${l}${p.path}`.replace(/\/+/g, "/"),
            tags: p.tags ?? [],
        }));

    return [...venueDocs, ...vendorDocs, ...postDocs];
}

export function createSearchIndex(docs: SearchDoc[]): SearchIndex {
    const terms: SearchIndex["terms"] = new Map();
    const prefixes: SearchIndex["prefixes"] = new Map();

    const indexedDocs = docs.map((doc, docId) => {
        const titleTokens = new Set(tokenize(doc.title));
        const fields: Array<[SearchField, string]> = [
            ["title", doc.title],
            ["description", doc.description ?? ""],
            ["tags", (doc.tags ?? []).join(" ")],
        ];

        for (const [field, value] of fields) {
            for (const token of tokenize(value)) {
                addPosting(terms, token, docId, FIELD_WEIGHTS[field]);
                addPrefixes(prefixes, token);
            }
        }

        return {
            doc,
            titleNorm: norm(doc.title),
            titleTokens,
        };
    });

    return {
        docs: indexedDocs,
        terms,
        prefixes,
    };
}

export function searchIndex(index: SearchIndex, query: string) {
    const tokens = queryTokens(query);
    if (!tokens.length) return [];

    const scores = new Map<number, number>();
    const matchedQueryTerms = new Map<number, Set<string>>();

    for (const queryToken of tokens) {
        const exactMatches = new Set<string>([queryToken]);
        const prefixMatches = index.prefixes.get(queryToken) ?? new Set<string>();

        for (const term of new Set([...exactMatches, ...prefixMatches])) {
            const postings = index.terms.get(term);
            if (!postings) continue;

            for (const [docId, weight] of postings) {
                const indexedDoc = index.docs[docId];
                const exact = term === queryToken;
                const titleHit = indexedDoc.titleTokens.has(term);
                const titlePrefixHit = [...indexedDoc.titleTokens].some((token) =>
                    token.startsWith(queryToken),
                );

                let score = weight;
                if (exact) score *= 1.35;
                if (!exact) score *= 0.65;
                if (titleHit || titlePrefixHit) score += 4;
                if (indexedDoc.titleNorm.startsWith(norm(query))) score += 8;

                scores.set(docId, (scores.get(docId) ?? 0) + score);

                const matches = matchedQueryTerms.get(docId) ?? new Set<string>();
                matches.add(queryToken);
                matchedQueryTerms.set(docId, matches);
            }
        }
    }

    const scored = [...scores.entries()].map(([docId, score]) => ({
        docId,
        score,
        matchedCount: matchedQueryTerms.get(docId)?.size ?? 0,
    }));

    const completeMatches = scored.filter((hit) => hit.matchedCount === tokens.length);
    const resultSet = completeMatches.length ? completeMatches : scored;

    return resultSet
        .sort((a, b) => {
            if (b.matchedCount !== a.matchedCount) return b.matchedCount - a.matchedCount;
            if (b.score !== a.score) return b.score - a.score;
            return index.docs[a.docId].doc.title.localeCompare(index.docs[b.docId].doc.title);
        })
        .map((hit) => index.docs[hit.docId].doc);
}

export function searchDocs(docs: SearchDoc[], query: string) {
    return searchIndex(createSearchIndex(docs), query);
}
