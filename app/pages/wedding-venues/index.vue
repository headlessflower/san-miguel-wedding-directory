<template>
    <main class="venues">
        <section class="venues__hero">
            <div class="container">
                <h1 class="venues__title">{{ t("nav.venues") }}</h1>
                <p class="venues__subtitle">
                    {{
                        locale === "es"
                            ? "Explora lugares para bodas y eventos. (Datos de ejemplo por ahora.)"
                            : "Browse wedding and event venues. (Sample data for now.)"
                    }}
                </p>
            </div>
        </section>

        <section class="venues__section">
            <div class="container">
                <div class="venues__grid">
                    <NuxtLink
                        v-for="v in venues"
                        :key="v.slug"
                        :to="localePath(`/wedding-venues/${v.slug}`)"
                        class="venues__card card"
                    >
                        <div class="venues__media" aria-hidden="true"></div>
                        <div class="venues__body">
                            <div class="venues__top">
                                <span
                                    v-if="v.featured"
                                    class="badge badge--featured"
                                    >{{ t("directory.featured") }}</span
                                >
                            </div>
                            <h2 class="venues__name">{{ v.name[locale] }}</h2>
                            <p class="venues__desc">
                                {{ v.description[locale] }}
                            </p>
                            <div class="venues__meta">
                                <span
                                    v-if="v.capacitySeated"
                                    class="venues__metaItem"
                                >
                                    {{
                                        locale === "es"
                                            ? "Capacidad"
                                            : "Capacity"
                                    }}: {{ v.capacitySeated }}
                                </span>
                                <span
                                    v-if="v.priceRange"
                                    class="venues__metaItem"
                                >
                                    {{ locale === "es" ? "Rango" : "Range" }}:
                                    {{ v.priceRange }}
                                </span>
                            </div>
                            <span class="venues__cta"
                                >{{ t("directory.viewDetails") }} →</span
                            >
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { buildBreadcrumbListJsonLd } from "~/utils/seo/breadcrumbs";
import { buildItemListJsonLd, type ItemListEntry } from "~/utils/seo/itemList";
import type { Locale } from "~/types/i18n";
const localePath = useLocalePath();


const siteUrl = (useRuntimeConfig().public?.siteUrl as string) || "";
const { t, locale } = useI18n();
const L = computed<Locale>(() => (locale.value as Locale) || "en");

const { getVenues } = useListings();
const venues = computed(() => getVenues());

// SEO meta (your existing pattern)
const seoTitle = computed(() => `${t("nav.venues")} • ${t("seo.siteTitle")}`);
const seoDescription = computed(() =>
    L.value === "es"
        ? "Explora lugares para bodas en San Miguel de Allende: haciendas, hoteles boutique, terrazas y jardines."
        : "Explore wedding venues in San Miguel de Allende: haciendas, boutique hotels, rooftops, and gardens."
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});

useHead(() => {
  const l = L.value;
  const baseUrl = siteUrl || undefined;

  const pagePath = `/${l}/wedding-venues`;

  // Breadcrumbs
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd({
    baseUrl,
    items: [
      { name: l === "es" ? "Inicio" : "Home", urlPath: `/${l}/` },
      { name: l === "es" ? "Lugares para bodas" : "Wedding venues", urlPath: pagePath },
    ],
  });

  // ItemList of venues
  const items: ItemListEntry[] = venues.value.map((v) => {
    const imgs = v.images ?? [];
    const hero = imgs.find((i) => i.type === "hero") ?? imgs[0] ?? null;

    return {
      name: v.name[l],
      urlPath: `/${l}/wedding-venues/${v.slug}`,
      imageUrl: hero?.src,
    };
  });

  const itemListJsonLd = buildItemListJsonLd({
    locale: l,
    baseUrl,
    listName:
        l === "es"
            ? "Lugares para bodas en San Miguel de Allende"
            : "Wedding venues in San Miguel de Allende",
    pagePath,
    items,
    ordered: true,
  });

  return {
    script: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(itemListJsonLd) },
    ],
  };
});
</script>

<style scoped>
.venues__hero {
    padding: var(--s-7) 0 var(--s-5);
}

.venues__title {
    font-size: 40px;
}

.venues__subtitle {
    margin-top: var(--s-3);
    max-width: 70ch;
}

.venues__section {
    padding: var(--s-5) 0 var(--s-8);
}

.venues__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--s-4);
}

@media (max-width: 900px) {
    .venues__grid {
        grid-template-columns: 1fr;
    }
}

.venues__card {
    overflow: hidden;
    text-decoration: none;
}

.venues__media {
    height: 160px;
    background: linear-gradient(
        135deg,
        rgba(20, 20, 20, 0.06),
        rgba(20, 20, 20, 0.02)
    );
    border-bottom: 1px solid var(--border);
}

.venues__body {
    padding: var(--s-5);
}

.venues__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-3);
}

.venues__name {
    margin-top: var(--s-3);
    font-size: 18px;
    color: var(--ink);
}

.venues__desc {
    margin-top: var(--s-2);
}

.venues__meta {
    margin-top: var(--s-3);
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
}

.venues__metaItem {
    font-size: 12px;
    font-weight: 800;
    color: rgba(20, 20, 20, 0.65);
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.7);
    padding: 0.35rem 0.55rem;
    border-radius: 999px;
}

.venues__cta {
    display: inline-block;
    margin-top: var(--s-4);
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.8);
}
</style>
