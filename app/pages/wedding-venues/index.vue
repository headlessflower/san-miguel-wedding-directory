<template>
  <main class="venues">
    <section class="venues__hero">
      <div class="container">
        <h1 class="venues__title">{{ t("nav.venues") }}</h1>
        <p class="venues__subtitle">
          {{
            locale === "es"
                ? "Explora lugares para bodas y eventos. "
                : "Browse wedding and event venues."
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
              :to="localePath({ name: 'wedding-venues-slug', params: { slug: v.slug } })"
              class="venues__card card"
          >
            <div class="venues__media" aria-hidden="true"></div>
            <div class="venues__body">
              <div class="venues__top">
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

              <h2 class="venues__name">{{ v.name[L] }}</h2>
              <p class="venues__desc">
                {{ v.description[L] }}
              </p>

              <div class="venues__meta">
                <span v-if="v.capacitySeated" class="venues__metaItem">
                  {{ locale === "es" ? "Capacidad" : "Capacity" }}:
                  {{ v.capacitySeated }}
                </span>
                <span v-if="v.priceRange" class="venues__metaItem">
                  {{ locale === "es" ? "Rango" : "Range" }}:
                  {{ v.priceRange }}
                </span>
              </div>

              <span class="venues__cta">{{ t("directory.viewDetails") }} →</span>
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
import { sortListings } from "~/utils/monetization/sortFeatured";
import { interleaveSponsored } from "~/utils/monetization/interleaveSponsored";
import { getActiveTier } from "~/utils/monetization/activeTier";

const localePath = useLocalePath();

const config = useRuntimeConfig();
const siteUrl = (config.public?.siteUrl as string) || "";

const { t, locale } = useI18n();
const L = computed<Locale>(() => (locale.value as Locale) || "en");

const { getVenues } = useListings();

/** ------- Helpers: localized paths (respects i18n custom routes) ------- */
const venuesIndexPath = computed(() => {
  const l = L.value;
  try {
    return localePath({ name: "wedding-venues" }, l);
  } catch {
    const base = l === "es" ? "lugares-para-bodas" : "wedding-venues";
    return `/${l}/${base}`;
  }
});

function venuePath(vSlug: string) {
  const l = L.value;
  try {
    return localePath({ name: "wedding-venues-slug", params: { slug: vSlug } }, l);
  } catch {
    const base = l === "es" ? "lugares-para-bodas" : "wedding-venues";
    return `/${l}/${base}/${vSlug}`;
  }
}

/** ------- Data: venues (sorted + mid-grid sponsored) ------- */
const venuesBase = computed(() => {
  const list = getVenues();
  return Array.isArray(list) ? list : [];
});

const venuesSorted = computed(() => {
  return sortListings(venuesBase.value, L.value);
});

const venues = computed(() => {
  const mixed = interleaveSponsored(venuesSorted.value, L.value, {
    every: 6,
    startAfter: 2,
    maxSponsored: 4,
    appendRemainder: true,
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

/** ------- SEO meta ------- */
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

/** ------- JSON-LD (Breadcrumbs + ItemList) ------- */
useHead(() => {
  const l = L.value;
  const baseUrl = siteUrl || undefined;

  const pagePath = venuesIndexPath.value;

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd({
    baseUrl,
    items: [
      { name: l === "es" ? "Inicio" : "Home", urlPath: `/${l}/` },
      {
        name: l === "es" ? "Lugares para bodas" : "Wedding venues",
        urlPath: pagePath,
      },
    ],
  });

  const items: ItemListEntry[] = venues.value.map((v: any) => {
    const imgs = v.images ?? [];
    const hero = imgs.find((i: any) => i.type === "hero") ?? imgs[0] ?? null;

    return {
      name: v.name[l],
      urlPath: venuePath(v.slug),
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
      {
        key: `jsonld-breadcrumbs-venues-${l}`,
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd),
      },
      {
        key: `jsonld-itemlist-venues-${l}`,
        type: "application/ld+json",
        children: JSON.stringify(itemListJsonLd),
      },
    ],
  };
});

</script>

<style scoped>
.venues__hero {
    padding: var(--s-9) 0 var(--s-6);
    text-align: center;
}

.venues__title {
    font-size: clamp(2.7rem, 6vw, 4.6rem);
    font-weight: 500;
}

.venues__subtitle {
    margin-top: var(--s-3);
    max-width: 52ch;
    margin-inline: auto;
    font-size: 1.08rem;
    line-height: 1.55;
}

.venues__section {
    padding: var(--s-5) 0 var(--s-9);
}

.venues__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--s-5);
}

@media (max-width: 900px) {
    .venues__grid {
        grid-template-columns: 1fr;
    }
}

.venues__card {
    overflow: hidden;
    text-decoration: none;
    padding: var(--s-6);
    border-color: rgba(255, 255, 255, 0.7);
    transition:
        transform 180ms var(--ease),
        box-shadow 180ms var(--ease);
}

.venues__card:hover {
    transform: translateY(-3px);
}

.venues__media {
    height: clamp(210px, 26vw, 320px);
    overflow: hidden;
    border-radius: 20px;
    background:
        linear-gradient(135deg, rgba(110, 139, 121, 0.22), rgba(216, 199, 173, 0.22)),
        var(--surface-soft);
}

.venues__body {
    padding: var(--s-5) 0 0;
}

.venues__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-3);
}

.venues__name {
    margin-top: var(--s-4);
    font-size: 1.45rem;
    font-weight: 500;
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
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--muted-strong);
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.7);
    padding: 0.35rem 0.55rem;
    border-radius: 999px;
}

.venues__cta {
    display: inline-block;
    margin-top: var(--s-4);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--accent-strong);
}
.badge--sponsored {
  background: rgba(202, 137, 95, 0.22);
  border: 1px solid var(--border);
  color: rgba(20,20,20,0.82);
}

</style>
