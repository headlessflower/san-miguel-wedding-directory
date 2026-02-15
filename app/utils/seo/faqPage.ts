// app/utils/seo/faqPage.ts
export type Locale = "en" | "es";

export type FaqItem = {
    q: string;
    a: string;
};

export type BuildFaqPageInput = {
    baseUrl?: string; // "https://example.com"
    pagePath?: string; // "/en/vendors/wedding-photographers" (optional but nice)
    title?: string; // optional
    items: FaqItem[];
};

function absUrl(baseUrl: string | undefined, pathOrUrl: string) {
    if (!baseUrl) return pathOrUrl;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.startsWith("/")) return `${baseUrl}${pathOrUrl}`;
    return `${baseUrl}/${pathOrUrl}`;
}

function stripHtml(input: string) {
    // Keep answers clean if you ever allow basic markup later
    return input.replace(/<[^>]*>/g, "").trim();
}

export function buildFaqPageJsonLd(input: BuildFaqPageInput) {
    const { baseUrl, pagePath, title, items } = input;

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        ...(title ? { name: title } : {}),
        ...(pagePath ? { url: absUrl(baseUrl, pagePath) } : {}),
        mainEntity: items.map((it) => ({
            "@type": "Question",
            name: stripHtml(it.q),
            acceptedAnswer: {
                "@type": "Answer",
                text: stripHtml(it.a),
            },
        })),
    };
}
