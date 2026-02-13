<template>
    <main class="post">
        <section class="post__content">
            <div class="container post__contentInner">
                <ContentRenderer v-if="doc" :value="doc" />
                <BlogRelatedLinks
                    :related-venues="doc?.relatedVenues"
                    :related-vendor-categories="doc?.relatedVendorCategories"
                />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "blog" });
type Locale = "en" | "es";
const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const L = computed(() => (locale.value as Locale) || "en");
const { getVenueBySlug } = useListings();
const seoTitle = computed(() => {
    if (!doc.value) return `${t("nav.blog")} • ${t("seo.siteTitle")}`;
    return `${doc.value.title} • ${t("seo.siteTitle")}`;
});

const seoDescription = computed(() => {
    if (!doc.value) return t("seo.siteDescription");
    return doc.value.description || t("seo.siteDescription");
});

function formatDate(input?: string) {
    if (!input) return "";
    try {
        const d = new Date(input);
        return d.toLocaleDateString(locale.value === "es" ? "es-MX" : "en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        });
    } catch {
        return input;
    }
}

const { data: doc } = await useAsyncData(
    "blogDoc",
    async () => {
        const l = (locale.value as Locale) || "en";
        const slug = String(route.params.slug || "");

        // In Content v3, each document has a `path` like: /blog/en/<slug>
        const found = await queryCollection("blog")
            .where("locale", "=", l)
            .where("path", "LIKE", `%/${slug}`)
            .first();

        if (!found)
            throw createError({
                statusCode: 404,
                statusMessage: "Post not found",
            });
        return found;
    },
    { watch: [locale] },
);

useHead(() => {
    if (!doc.value) return {};

    const siteName = "San Miguel Wedding Directory";
    const isEs = locale.value === "es";
    const slug = String(route.params.slug || "");
    const url = `https://example.com/${isEs ? "es" : "en"}/blog/${slug}`;

    const title = doc.value.title || "Blog";
    const description = doc.value.description || "";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: doc.value.date,
        mainEntityOfPage: url,
        publisher: { "@type": "Organization", name: siteName },
    };

    return {
        script: [
            { type: "application/ld+json", children: JSON.stringify(jsonLd) },
        ],
    };
});
useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
});
</script>

<style scoped>
.post__hero {
    padding: var(--s-7) 0 var(--s-5);
}

.post__back {
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.7);
    text-decoration: none;
}

.post__title {
    margin-top: var(--s-4);
    font-size: 42px;
}

.post__subtitle {
    margin-top: var(--s-3);
    max-width: 75ch;
}

.post__meta {
    margin-top: var(--s-4);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.55);
}

.post__content {
    padding: var(--s-5) 0 var(--s-9);
}

.post__contentInner :deep(h2) {
    margin-top: var(--s-7);
    font-size: 22px;
    color: var(--ink);
}

.post__contentInner :deep(p) {
    margin-top: var(--s-4);
    max-width: 75ch;
}

.post__contentInner :deep(ul) {
    margin-top: var(--s-4);
    padding-left: 1.25rem;
    color: var(--muted);
}

.post__contentInner :deep(li) {
    margin-top: 0.5rem;
}
</style>
