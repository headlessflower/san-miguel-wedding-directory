// app/utils/seo/website.ts
export type BuildWebSiteJsonLdInput = {
    baseUrl: string;
    siteName: string;
    searchTargetPath: string;
    publisherId?: string; // e.g. "https://example.com#organization"
};

function absUrl(baseUrl: string, pathOrUrl: string) {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.startsWith("/")) return `${baseUrl}${pathOrUrl}`;
    return `${baseUrl}/${pathOrUrl}`;
}

export function buildWebSiteJsonLd(input: BuildWebSiteJsonLdInput) {
    const { baseUrl, siteName, searchTargetPath, publisherId } = input;

    const target = absUrl(baseUrl, searchTargetPath);

    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: baseUrl,
        ...(publisherId ? { publisher: { "@id": publisherId } } : {}),
        potentialAction: {
            "@type": "SearchAction",
            target,
            "query-input": "required name=search_term_string",
        },
    };
}
