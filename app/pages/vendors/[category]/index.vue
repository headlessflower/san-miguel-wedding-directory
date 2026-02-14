<template>
    <main class="vendorCat">
        <section class="vendorCat__hero">
            <div class="container">
                <NuxtLink :to="localePath('/vendors')" class="vendorCat__back">
                    ←
                    {{
                        locale === "es"
                            ? "Todas las categorías"
                            : "All categories"
                    }}
                </NuxtLink>

                <h1 class="vendorCat__title">{{ category.label[locale] }}</h1>
                <p class="vendorCat__subtitle">
                    {{
                        locale === "es"
                            ? "Listados de ejemplo por ahora. Pronto cargaremos datos reales."
                            : "Sample listings for now. We’ll load real data soon."
                    }}
                </p>
            </div>
        </section>

        <section class="vendorCat__section">
            <div class="container">
                <div
                    v-if="category.intro?.[L]?.length"
                    class="vendorCat__intro"
                >
                    <p
                        v-for="(p, i) in category.intro[L]"
                        :key="i"
                        class="vendorCat__introP"
                    >
                        {{ p }}
                    </p>
                </div>

                <div class="vendorCat__grid">
                    <NuxtLink
                        v-for="v in vendors"
                        :key="v.slug"
                        :to="
                            localePath(`/vendors/${category.slug[L]}/${v.slug}`)
                        "
                        class="vendorCat__card card"
                    >
                        <div class="vendorCat__media" aria-hidden="true"></div>
                        <div class="vendorCat__body">
                            <div class="vendorCat__top">
                                <span
                                    v-if="v.featured"
                                    class="badge badge--featured"
                                    >{{ t("directory.featured") }}</span
                                >
                            </div>
                            <h2 class="vendorCat__name">
                                {{ v.name[locale] }}
                            </h2>
                            <p class="vendorCat__desc">
                                {{ v.description[locale] }}
                            </p>
                            <span class="vendorCat__cta"
                                >{{ t("directory.viewDetails") }} →</span
                            >
                        </div>
                    </NuxtLink>
                </div>
                <CategoryFaq
                    :title="
                        L === 'es'
                            ? 'Preguntas frecuentes'
                            : 'Frequently asked questions'
                    "
                    :items="category.faq?.[L]"
                />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { getVendorCategoryBySlug } from "~/data/taxonomies";

const config = useRuntimeConfig();
const siteUrl = (config.public?.siteUrl as string) || "";

type Locale = "en" | "es";

const { t, locale } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const L = computed<Locale>(() => (locale.value as Locale) || "en");

const category = computed(() => {
    const slug = String(route.params.category || "");
    const found = getVendorCategoryBySlug(L.value, slug);

    if (!found) {
        throw createError({
            statusCode: 404,
            statusMessage: "Category not found",
        });
    }

    return found;
});

const { getVendorsByCategoryKey } = useListings();

const vendors = computed(() => {
    const key = category.value.key;
    const list = getVendorsByCategoryKey(category.value.key);
    return [...list].sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured),
    );
});

const heroImage = computed(() => null);

const seoTitle = computed(() => {
    return `${category.value.label[L.value]} • ${t("seo.siteTitle")}`;
});

const seoDescription = computed(() => {
    return L.value === "es"
        ? `Encuentra ${category.value.label[L.value].toLowerCase()} para bodas en San Miguel de Allende.`
        : `Find ${category.value.label[L.value].toLowerCase()} for weddings in San Miguel de Allende.`;
});

useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
});

useHead(() => {
    const isEs = L.value === "es";
    const prefix = isEs ? "/es" : "/en";
    const catUrl = siteUrl
        ? `${siteUrl}${prefix}/vendors/${category.value.slug[L.value]}`
        : undefined;

    const jsonLd: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: category.value.label[L.value],
        ...(catUrl ? { url: catUrl } : {}),
        itemListElement: vendors.value.map((v, idx) => {
            const loc = `${prefix}/vendors/${category.value.slug[L.value]}/${v.slug}`;
            return {
                "@type": "ListItem",
                position: idx + 1,
                name: v.name[L.value],
                ...(siteUrl ? { url: `${siteUrl}${loc}` } : { url: loc }),
            };
        }),
    };

    return {
        script: [
            { type: "application/ld+json", children: JSON.stringify(jsonLd) },
        ],
    };
});

const faqItems = computed(() => category.value.faq?.[L.value] ?? []);

useHead(() => {
    if (!faqItems.value.length) return {};

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.value.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
    };

    return {
        script: [
            {
                type: "application/ld+json",
                children: JSON.stringify(faqJsonLd),
            },
        ],
    };
});
</script>

<style scoped>
.vendorCat__hero {
    padding: var(--s-7) 0 var(--s-5);
}

.vendorCat__back {
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.7);
    text-decoration: none;
}

.vendorCat__title {
    margin-top: var(--s-4);
    font-size: 40px;
}

.vendorCat__subtitle {
    margin-top: var(--s-3);
    max-width: 75ch;
}

.vendorCat__section {
    padding: var(--s-5) 0 var(--s-9);
}

.vendorCat__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--s-4);
}

@media (max-width: 900px) {
    .vendorCat__grid {
        grid-template-columns: 1fr;
    }
}

.vendorCat__card {
    overflow: hidden;
    text-decoration: none;
}

.vendorCat__media {
    height: 160px;
    background: linear-gradient(
        135deg,
        rgba(20, 20, 20, 0.06),
        rgba(20, 20, 20, 0.02)
    );
    border-bottom: 1px solid var(--border);
}

.vendorCat__body {
    padding: var(--s-5);
}

.vendorCat__top {
    display: flex;
    justify-content: space-between;
    gap: var(--s-3);
}

.vendorCat__name {
    margin-top: var(--s-3);
    font-size: 18px;
    color: var(--ink);
}

.vendorCat__desc {
    margin-top: var(--s-2);
}

.vendorCat__cta {
    display: inline-block;
    margin-top: var(--s-4);
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.8);
}
.vendorCat__intro {
    margin-top: var(--s-4);
    max-width: 75ch;
}
.vendorCat__introP {
    margin-top: var(--s-3);
}
</style>
