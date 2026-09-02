<template>
  <main class="venues">
    <section class="venues__hero">
      <NuxtImg
          class="venues__heroImage"
          src="/images/venues-hero-san-miguel.jpg"
          alt=""
          width="1672"
          height="941"
          sizes="100vw"
          format="webp"
          preload
          loading="eager"
          fetchpriority="high"
          aria-hidden="true"
      />
      <div class="container venues__heroInner">
        <div class="venues__heroCopy">
          <h1 class="venues__title">{{ t("nav.venues") }}</h1>
          <p class="venues__subtitle">
            {{
              locale === "es"
                  ? "Explora lugares para bodas y eventos."
                  : "Browse wedding and event venues."
            }}
          </p>
        </div>
      </div>
    </section>

    <section class="venues__section">
      <div class="container">
        <div class="venues__grid">
          <article
              v-for="v in venues"
              :key="v.slug"
              class="venues__card card"
          >
            <NuxtLink
                :to="localePath({ name: 'wedding-venues-slug', params: { slug: v.slug } })"
                class="venues__cardLink"
            >
              <div class="venues__media">
                <NuxtImg
                    v-if="getListingCardImage(v)"
                    :src="getListingCardImage(v)!.src"
                    :alt="getListingCardImage(v)!.alt?.[L] || v.name[L]"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                    sizes="100vw sm:50vw lg:33vw"
                    format="webp"
                    @error="useListingImageFallback"
                />
              </div>
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
            <button
                class="venues__save"
                :class="{ 'venues__save--active': isSaved(v.id) }"
                type="button"
                :aria-pressed="isSaved(v.id)"
                @click="saveVenue(v)"
            >
              <span aria-hidden="true">{{ isSaved(v.id) ? "♥" : "♡" }}</span>
              {{ isSaved(v.id) ? (L === "es" ? "Guardado" : "Saved") : (L === "es" ? "Guardar" : "Save") }}
            </button>
          </article>
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
const { initialize, isSaved, toggleVenue } = useQuicklist();

function saveVenue(v: any) {
  toggleVenue({
    id: v.id,
    slug: v.slug,
    name: v.name[L.value],
    email: v.email,
    website: v.website,
  });
}

onMounted(initialize);

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
    position: relative;
    isolation: isolate;
    display: flex;
    align-items: center;
    min-height: clamp(25rem, 54svh, 38rem);
    padding: clamp(4rem, 7vw, 6.5rem) 0;
    overflow: hidden;
    background-image: linear-gradient(
            90deg,
            rgba(17, 13, 10, 0.72) 0%,
            rgba(17, 13, 10, 0.54) 38%,
            rgba(17, 13, 10, 0.22) 70%,
            rgba(17, 13, 10, 0.08) 100%
        );
}

.venues__heroImage {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center right;
}

.venues__heroInner {
    width: 100%;
}

.venues__heroCopy {
    max-width: min(44rem, 100%);
}

.venues__heroCopy::before {
    content: "San Miguel de Allende";
    display: inline-flex;
    align-items: center;
    margin-bottom: var(--s-5);
    padding: 0.48rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.36);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(12px);
    font-size: 0.94rem;
    font-weight: 500;
}

.venues__title {
    font-size: clamp(2.7rem, 6vw, 4.6rem);
    font-weight: 500;
    color: #fff;
    text-wrap: balance;
}

.venues__subtitle {
    margin-top: var(--s-4);
    max-width: 52ch;
    color: rgba(255, 255, 255, 0.84);
    font-size: 1.08rem;
    line-height: 1.55;
}

.venues__section {
    padding: var(--s-8) 0 var(--s-9);
}

@media (max-width: 760px) {
    .venues__hero {
        min-height: clamp(27rem, 62svh, 34rem);
        background-image: linear-gradient(
                180deg,
                rgba(17, 13, 10, 0.76) 0%,
                rgba(17, 13, 10, 0.58) 52%,
                rgba(17, 13, 10, 0.22) 100%
            );
    }

    .venues__heroImage {
        object-position: 60% center;
    }
}

@media (max-width: 640px) {
    .venues__hero {
        min-height: clamp(24rem, 60svh, 32rem);
    }

    .venues__title {
        font-size: clamp(2.3rem, 12vw, 3.4rem);
    }

    .venues__section {
        padding: var(--s-5) 0 var(--s-8);
    }
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

@media (max-width: 640px) {
    .venues__grid {
        gap: var(--s-4);
    }

    .venues__card {
        padding: var(--s-4);
    }

    .venues__media {
        height: clamp(13rem, 58vw, 19rem);
        border-radius: var(--radius-sm);
    }

    .venues__top,
    .venues__meta {
        align-items: flex-start;
        flex-wrap: wrap;
    }
}

.venues__card {
    position: relative;
    overflow: hidden;
    padding: var(--s-6);
    border-color: rgba(255, 255, 255, 0.7);
    transition:
        transform 180ms var(--ease),
        box-shadow 180ms var(--ease);
}

.venues__cardLink {
    display: block;
    color: inherit;
    text-decoration: none;
}

.venues__save {
    position: absolute;
    top: calc(var(--s-6) + 0.75rem);
    right: calc(var(--s-6) + 0.75rem);
    display: inline-flex;
    align-items: center;
    gap: 0.42rem;
    padding: 0.55rem 0.78rem;
    border: 1px solid rgba(255, 255, 255, 0.72);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.9);
    color: var(--ink);
    box-shadow: var(--shadow-sm);
    backdrop-filter: blur(10px);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 750;
    cursor: pointer;
}

.venues__save span { color: var(--accent); font-size: 1.05rem; }
.venues__save--active { background: var(--accent); color: white; }
.venues__save--active span { color: white; }

.venues__card:hover {
    transform: translateY(-3px);
}

.venues__media {
    height: clamp(210px, 26vw, 320px);
    overflow: hidden;
    border-radius: var(--radius);
    background:
        linear-gradient(135deg, rgba(110, 139, 121, 0.22), rgba(216, 199, 173, 0.22)),
        var(--surface-soft);
}

.venues__media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
