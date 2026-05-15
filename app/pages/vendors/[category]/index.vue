<template>
  <main class="vendorCat" v-if="category">
    <section class="vendorCat__hero">
      <AdSlot placement="vendors_category_top" />
      <div class="container">
        <NuxtLink :to="vendorsIndexTo" class="vendorCat__back">
          ←
          {{ locale === "es" ? "Todas las categorías" : "All categories" }}
        </NuxtLink>

        <h1 class="vendorCat__title">{{ category.label[locale] }}</h1>

      </div>
    </section>

    <section class="vendorCat__section">
      <div class="container">
        <div v-if="category.intro?.[L]?.length" class="vendorCat__intro">
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
              :to="vendorTo(v.slug)"
              class="vendorCat__card card"
          >
            <div class="vendorCat__media" aria-hidden="true"></div>
            <div class="vendorCat__body">
              <div class="vendorCat__top">
                <span
                    v-if="v.displayTier && v.displayTier !== 'standard'"
                    class="badge"
                    :class="v.displayTier === 'sponsored' ? 'badge--sponsored' : 'badge--featured'"
                >
                  {{
                    v.displayTier === "sponsored"
                        ? (L === "es" ? "Patrocinado" : "Sponsored")
                        : t("directory.featured")
                  }}
                </span>
              </div>

              <h2 class="vendorCat__name">{{ v.name[locale] }}</h2>
              <p class="vendorCat__desc">{{ v.description[locale] }}</p>
              <span class="vendorCat__cta">
                {{ t("directory.viewDetails") }} →
              </span>
            </div>
          </NuxtLink>
        </div>

        <CategoryFaq
            :title="L === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'"
            :items="category.faq?.[L]"
        />
      </div>
    </section>
  </main>

  <!-- prerender/runtime-safe fallback (prevents null crashes) -->
  <main class="vendorCat" v-else>
    <section class="vendorCat__hero">
      <div class="container">
        <NuxtLink :to="vendorsIndexTo" class="vendorCat__back">←</NuxtLink>
        <h1 class="vendorCat__title">
          {{ locale === "es" ? "Categoría no encontrada" : "Category not found" }}
        </h1>
      </div>
    </section>
  </main>
</template>


<script setup lang="ts">
// pages/vendors/[category]/index.vue (script setup)
// Definitive version: localized links, prerender-safe, canonical redirect, no /es/vendors leaks

import { getVendorCategoryBySlug, normalizeSlug } from "~/data/taxonomies";
import { buildItemListJsonLd, type ItemListEntry } from "~/utils/seo/itemList";
import { buildFaqPageJsonLd } from "~/utils/seo/faqPage";
import type { Locale } from "~/types/i18n";
import AdSlot from "~/components/AdSlot.vue";
import { sortListings } from "~/utils/monetization/sortFeatured";
import { interleaveSponsored } from "~/utils/monetization/interleaveSponsored";
import { getActiveTier } from "~/utils/monetization/activeTier";

const localePath = useLocalePath();

const config = useRuntimeConfig();
const siteUrl = (config.public?.siteUrl as string) || "";

const { t, locale } = useI18n();
const route = useRoute();

const L = computed<Locale>(() => (locale.value as Locale) || "en");
const categoryParam = computed(() => String(route.params.category || ""));

const { getVendorsByCategoryKey } = useListings();

// ---------- Path fallbacks (guarantee correct base in es/en) ----------
function vendorsBase(l: Locale) {
  return l === "es" ? "proveedores" : "vendors";
}
function vendorsIndexFallback(l: Locale) {
  return `/${l}/${vendorsBase(l)}`;
}
function categoryFallback(l: Locale, categorySlug: string) {
  return `/${l}/${vendorsBase(l)}/${categorySlug}`;
}
function vendorFallback(l: Locale, categorySlug: string, vendorSlug: string) {
  return `/${l}/${vendorsBase(l)}/${categorySlug}/${vendorSlug}`;
}

// ---------- Resolve category once ----------
const resolvedCategory = computed(() => {
  const found = getVendorCategoryBySlug(L.value, categoryParam.value);
  return found ?? null;
});

// Expose for template
const category = resolvedCategory;

// ---------- Canonical redirect (only when NOT prerendering) ----------
// If someone hits /es/proveedores/<english-slug>, redirect to /es/proveedores/<spanish-slug> (301)
if (!import.meta.prerender) {
  const found = resolvedCategory.value;
  if (found) {
    const incoming = categoryParam.value;
    const canonical = found.slug[L.value];

    if (normalizeSlug(incoming) !== normalizeSlug(canonical)) {
      // Use named route if available, fall back to localized string
      const to = (() => {
        try {
          return localePath(
              { name: "vendors-category", params: { category: canonical } },
              L.value
          );
        } catch {
          return categoryFallback(L.value, canonical);
        }
      })();

      await navigateTo(to, { redirectCode: 301 });
    }
  } else {
    // Not found at runtime/SSR
    throw createError({ statusCode: 404, statusMessage: "Category not found" });
  }
}

// During prerender, don't throw. Template must guard `v-if="category"`.

// ---------- Links for template ----------
const vendorsIndexTo = computed(() => {
  const l = L.value;
  try {
    return localePath({ name: "vendors" }, l);
  } catch {
    return vendorsIndexFallback(l);
  }
});

const categoryTo = computed(() => {
  const l = L.value;
  if (!category.value) return vendorsIndexTo.value;

  const catSlug = category.value.slug[l];
  try {
    return localePath({ name: "vendors-category", params: { category: catSlug } }, l);
  } catch {
    return categoryFallback(l, catSlug);
  }
});

function vendorTo(vSlug: string) {
  const l = L.value;
  if (!category.value) return vendorsIndexTo.value;

  const catSlug = category.value.slug[l];
  try {
    return localePath(
        { name: "vendors-category-slug", params: { category: catSlug, slug: vSlug } },
        l
    );
  } catch {
    return vendorFallback(l, catSlug, vSlug);
  }
}

// ---------- Listings ----------
const vendorsSorted = computed(() => {
  if (!category.value) return [];
  const key = category.value.key;
  const list = getVendorsByCategoryKey(key);
  return sortListings(list, L.value);
});

const vendors = computed(() => {
  if (!category.value) return [];
  const mixed = interleaveSponsored(vendorsSorted.value, L.value, {
    every: 5,
    startAfter: 2,
    maxSponsored: 6,
  });

  const now = new Date();

  return mixed.map((v: any) => ({
    ...v,
    displayTier: getActiveTier(
        v.featuredTier ?? (v.featured ? "featured" : "standard"),
        v.promotions,
        v.featuredUntil,
        now
    ),
  }));
});

// ---------- SEO meta ----------
const seoTitle = computed(() => {
  if (!category.value) return t("seo.siteTitle");
  return `${category.value.label[L.value]} • ${t("seo.siteTitle")}`;
});

const seoDescription = computed(() => {
  if (!category.value) {
    return L.value === "es"
        ? "Directorio de proveedores de bodas en San Miguel de Allende."
        : "Directory of wedding vendors in San Miguel de Allende.";
  }

  const label = category.value.label[L.value].toLowerCase();
  return L.value === "es"
      ? `Encuentra ${label} para bodas en San Miguel de Allende.`
      : `Find ${label} for weddings in San Miguel de Allende.`;
});

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});

// ---------- JSON-LD: ItemList ----------
useHead(() => {
  if (!category.value) return {};

  const baseUrl = siteUrl || undefined;
  const l = L.value;

  const listName =
      l === "es"
          ? `${category.value.label[l]} en San Miguel de Allende`
          : `${category.value.label[l]} in San Miguel de Allende`;

  const items: ItemListEntry[] = vendors.value.map((v: any) => {
    const hero =
        (v.images ?? []).find((i: any) => i.type === "hero") ??
        (v.images ?? [])[0] ??
        null;

    return {
      name: v.name[l],
      urlPath: vendorTo(v.slug),
      imageUrl: hero?.src,
    };
  });

  const itemListJsonLd = buildItemListJsonLd({
    locale: l,
    baseUrl,
    listName,
    pagePath: categoryTo.value,
    items,
    ordered: true,
  });

  return {
    script: [
      {
        key: `jsonld-itemlist-vendors-${category.value.key}-${l}`,
        type: "application/ld+json",
        children: JSON.stringify(itemListJsonLd),
      },
    ],
  };
});

// ---------- JSON-LD: FAQPage ----------
useHead(() => {
  if (!category.value) return {};

  const baseUrl = siteUrl || undefined;
  const l = L.value;

  const faqItems = category.value.faq?.[l] ?? [];
  if (!faqItems.length) return {};

  const title =
      l === "es"
          ? `Preguntas frecuentes: ${category.value.label[l]}`
          : `FAQ: ${category.value.label[l]}`;

  const faqJsonLd = buildFaqPageJsonLd({
    baseUrl,
    pagePath: categoryTo.value,
    title,
    items: faqItems,
  });

  return {
    script: [
      {
        key: `jsonld-faq-vendors-${category.value.key}-${l}`,
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd),
      },
    ],
  };
});



</script>


<style scoped>
.vendorCat__hero {
    padding: var(--s-8) 0 var(--s-6);
}

.vendorCat__back {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--accent-strong);
    text-decoration: none;
}

.vendorCat__title {
    margin-top: var(--s-4);
    font-size: clamp(2.7rem, 6vw, 4.4rem);
    font-weight: 500;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--s-5);
}

@media (max-width: 900px) {
    .vendorCat__grid {
        grid-template-columns: 1fr;
    }
}

.vendorCat__card {
    overflow: hidden;
    text-decoration: none;
    padding: var(--s-6);
    border-color: rgba(255, 255, 255, 0.7);
    transition:
        transform 180ms var(--ease),
        box-shadow 180ms var(--ease);
}

.vendorCat__card:hover {
    transform: translateY(-3px);
}

.vendorCat__media {
    height: clamp(210px, 26vw, 320px);
    overflow: hidden;
    border-radius: 20px;
    background:
        linear-gradient(135deg, rgba(110, 139, 121, 0.22), rgba(216, 199, 173, 0.22)),
        var(--surface-soft);
}

.vendorCat__body {
    padding: var(--s-5) 0 0;
}

.vendorCat__top {
    display: flex;
    justify-content: space-between;
    gap: var(--s-3);
}

.vendorCat__name {
    margin-top: var(--s-4);
    font-size: 1.45rem;
    font-weight: 500;
    color: var(--ink);
}

.vendorCat__desc {
    margin-top: var(--s-2);
}

.vendorCat__cta {
    display: inline-block;
    margin-top: var(--s-4);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--accent-strong);
}
.badge--sponsored {
    background: rgba(202, 137, 95, 0.22);
    border: 1px solid var(--border);
    color: rgba(20, 20, 20, 0.82);
}
.vendorCat__intro {
    margin-top: var(--s-4);
    max-width: 75ch;
}
.vendorCat__introP {
    margin-top: var(--s-3);
}

@media (max-width: 640px) {
    .vendorCat__hero {
        padding: var(--s-7) 0 var(--s-5);
    }

    .vendorCat__title {
        font-size: clamp(2.2rem, 12vw, 3.2rem);
    }

    .vendorCat__section {
        padding: var(--s-4) 0 var(--s-8);
    }

    .vendorCat__grid {
        gap: var(--s-4);
    }

    .vendorCat__card {
        padding: var(--s-4);
    }

    .vendorCat__media {
        height: clamp(13rem, 58vw, 19rem);
        border-radius: var(--radius-sm);
    }

    .vendorCat__top {
        align-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
