// app/utils/seo/itemList.ts
import type { Locale } from "~/types/i18n";

export type ItemListEntry = {
    name: string;
    urlPath: string; // locale-prefixed path, e.g. "/en/vendors/wedding-photographers/penzi-weddings"
    imageUrl?: string; // absolute preferred; we can build from base + src
};

export type BuildItemListInput = {
    locale: Locale;
    baseUrl?: string; // "https://example.com" (no trailing slash)
    listName: string; // e.g. "Wedding photographers in San Miguel de Allende"
    pagePath: string; // e.g. "/en/vendors/wedding-photographers"
    items: ItemListEntry[];
    ordered?: boolean; // default true
};

function absUrl(baseUrl: string | undefined, pathOrUrl: string) {
    if (!baseUrl) return pathOrUrl;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.startsWith("/")) return `${baseUrl}${pathOrUrl}`;
    return `${baseUrl}/${pathOrUrl}`;
}

export function buildItemListJsonLd(input: BuildItemListInput) {
    const { baseUrl, listName, pagePath, items, ordered = true } = input;

    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: listName,
        url: absUrl(baseUrl, pagePath),
        itemListOrder: ordered
            ? "https://schema.org/ItemListOrderAscending"
            : "https://schema.org/ItemListUnordered",
        numberOfItems: items.length,
        itemListElement: items.map((it, idx) => {
            const out: Record<string, unknown> = {
                "@type": "ListItem",
                position: idx + 1,
                name: it.name,
                url: absUrl(baseUrl, it.urlPath),
            };

            if (it.imageUrl) out.image = absUrl(baseUrl, it.imageUrl);

            return out;
        }),
    };
}
