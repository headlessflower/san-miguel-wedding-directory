// app/utils/seo/breadcrumbs.ts
export type Breadcrumb = {
    name: string;
    urlPath: string; // locale-prefixed path, e.g. "/en/vendors"
};

export type BuildBreadcrumbListInput = {
    baseUrl?: string; // "https://example.com"
    items: Breadcrumb[];
};

function absUrl(baseUrl: string | undefined, pathOrUrl: string) {
    if (!baseUrl) return pathOrUrl;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.startsWith("/")) return `${baseUrl}${pathOrUrl}`;
    return `${baseUrl}/${pathOrUrl}`;
}

export function buildBreadcrumbListJsonLd(input: BuildBreadcrumbListInput) {
    const { baseUrl, items } = input;

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((c, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: c.name,
            item: absUrl(baseUrl, c.urlPath),
        })),
    };
}
