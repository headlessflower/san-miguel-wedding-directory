// app/utils/seo/organization.ts
export type BuildOrganizationJsonLdInput = {
    baseUrl: string;          // required, e.g. "https://example.com"
    orgName: string;          // e.g. "Lugares para Bodas en San Miguel"
    logoPath?: string;        // e.g. "/images/logo.png" (optional)
    sameAs?: string[];        // socials (optional)
    email?: string;           // optional
    phone?: string;           // optional
    areaServed?: string[];    // optional
};

function absUrl(baseUrl: string, pathOrUrl: string) {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.startsWith("/")) return `${baseUrl}${pathOrUrl}`;
    return `${baseUrl}/${pathOrUrl}`;
}

export function buildOrganizationJsonLd(input: BuildOrganizationJsonLdInput) {
    const { baseUrl, orgName, logoPath, sameAs, email, phone, areaServed } = input;

    const orgId = `${baseUrl}#organization`;

    const jsonLd: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": orgId,
        name: orgName,
        url: baseUrl,
    };

    if (logoPath) {
        jsonLd.logo = {
            "@type": "ImageObject",
            url: absUrl(baseUrl, logoPath),
        };
    }

    const links = (sameAs ?? []).filter(Boolean);
    if (links.length) jsonLd.sameAs = links;

    if (phone || email) {
        jsonLd.contactPoint = [
            {
                "@type": "ContactPoint",
                contactType: "customer support",
                ...(phone ? { telephone: phone } : {}),
                ...(email ? { email } : {}),
            },
        ];
    }

    const areas = (areaServed ?? []).filter(Boolean);
    if (areas.length) {
        jsonLd.areaServed = areas.map((name) => ({
            "@type": "AdministrativeArea",
            name,
        }));
    }

    return jsonLd;
}
