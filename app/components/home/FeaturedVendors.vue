<template>
  <section class="feat">
    <div class="container">
      <div class="feat__head">
        <h2 class="feat__title">{{ title }}</h2>

        <!-- ✅ named route (no /vendors leaks) -->
        <NuxtLink :to="vendorsIndexTo" class="feat__link">
          {{ L === "es" ? "Ver todos" : "View all" }}
        </NuxtLink>
      </div>

      <div class="feat__grid">
        <article
            v-for="v in vendors"
            :key="v.id"
            class="feat__card card"
        >
          <NuxtLink :to="vendorTo(v)" class="feat__cardLink">
            <div class="feat__media">
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

          <div class="feat__body">
            <div class="feat__top">
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

              <span class="feat__pill">
                {{ labelForCategory(v.categoryKey) }}
              </span>
            </div>

            <h3 class="feat__name">{{ v.name[L] }}</h3>
            <p class="feat__desc">{{ v.description[L] }}</p>

            <span class="feat__cta">{{ t("directory.viewDetails") }} →</span>
            </div>
          </NuxtLink>
          <button class="feat__save" :class="{ 'feat__save--active': isVendorSaved(v.id) }" type="button" :aria-pressed="isVendorSaved(v.id)" @click="saveVendor(v)">
            <span aria-hidden="true">{{ isVendorSaved(v.id) ? "♥" : "♡" }}</span>
            {{ isVendorSaved(v.id) ? (L === "es" ? "Guardado" : "Saved") : (L === "es" ? "Guardar" : "Save") }}
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/i18n";
import type { VendorListing } from "~/data/listings.seed";
import { VENDOR_CATEGORIES } from "~/data/taxonomies";
import { sortListings } from "~/utils/monetization/sortFeatured";
import { getActiveTier } from "~/utils/monetization/activeTier";
import { getVendorCategorySlug } from "~/utils/search/vendorCategorySlug";

const props = defineProps<{ title?: string; limit?: number }>();

const { t, locale } = useI18n();
const localePath = useLocalePath();

const L = computed<Locale>(() => (locale.value as Locale) || "en");

const { getVendorsByCategoryKey } = useListings();
const { initialize, isVendorSaved, toggleVendor } = useQuicklist();

function saveVendor(v: VendorCard) {
  toggleVendor({ id: v.id, slug: v.slug, categorySlug: categorySlug(v.categoryKey), name: v.name[L.value], email: v.email, website: v.website });
}

onMounted(initialize);

type VendorCard = VendorListing & {
  displayTier?: "standard" | "featured" | "sponsored";
};

/** ✅ Localized paths (named routes + safe fallback) */
const vendorsIndexTo = computed(() => {
  const l = L.value;
  try {
    return localePath({ name: "vendors" }, l);
  } catch {
    return `/${l}/${l === "es" ? "proveedores" : "vendors"}`;
  }
});

function vendorTo(v: VendorCard) {
  const l = L.value;
  const catSlug = categorySlug(v.categoryKey);

  try {
    return localePath(
        { name: "vendors-category-slug", params: { category: catSlug, slug: v.slug } },
        l
    );
  } catch {
    const base = l === "es" ? "proveedores" : "vendors";
    return `/${l}/${base}/${catSlug}/${v.slug}`;
  }
}

const allVendors = computed<VendorListing[]>(() => {
  const keys = VENDOR_CATEGORIES.map((c) => c.key);
  const lists = keys.flatMap((k) => getVendorsByCategoryKey(k));
  return lists;
});

const vendors = computed<VendorCard[]>(() => {
  const base = allVendors.value;
  const sorted = sortListings(base, L.value);

  const now = new Date();
  const withTier = sorted.map((v: any) => ({
    ...v,
    displayTier: getActiveTier(
        v.featuredTier ?? (v.featured ? "featured" : "standard"),
        v.promotions,
        v.featuredUntil,
        now
    ),
  }));

  const chosen = withTier
      .filter((v: any) => v.displayTier === "featured")
      .slice(0, props.limit ?? 6);

  return chosen as VendorCard[];
});

const title = computed(() =>
    props.title ?? (L.value === "es" ? "Proveedores destacados" : "Featured vendors")
);

function labelForCategory(key: VendorListing["categoryKey"]) {
  const found = VENDOR_CATEGORIES.find((c) => c.key === key);
  return found ? found.label[L.value] : String(key);
}

function categorySlug(key: VendorListing["categoryKey"]) {
  // returns localized category slug (ex: "papeleria" in es, "stationery" in en)
  return getVendorCategorySlug(key, L.value) || "";
}

</script>


<style scoped>
/* reuse the same styles as FeaturedVenues */
.feat {
  padding: var(--s-8) 0;
}

.feat__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: var(--s-6);
  min-width: 0;
}

.feat__title {
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 500;
  min-width: 0;
}

.feat__link {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  color: var(--accent-strong);
  text-decoration: none;
  white-space: nowrap;
}

.feat__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s-5);
}

@media (max-width: 900px) {
  .feat__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.feat__card {
  position: relative;
  overflow: hidden;
  display: block;
  min-width: 0;
  padding: var(--s-5);
  border-color: rgba(255, 255, 255, 0.7);
  transition:
    transform 180ms var(--ease),
    box-shadow 180ms var(--ease);
}

.feat__cardLink { display:block;color:inherit;text-decoration:none }
.feat__save { position:absolute;top:calc(var(--s-5) + .7rem);right:calc(var(--s-5) + .7rem);display:inline-flex;align-items:center;gap:.42rem;padding:.52rem .72rem;border:1px solid rgba(255,255,255,.72);border-radius:999px;background:rgba(255,255,255,.9);color:var(--ink);backdrop-filter:blur(10px);font:inherit;font-size:.8rem;font-weight:750;cursor:pointer }
.feat__save span{color:var(--accent)}.feat__save--active{background:var(--accent);color:#fff}.feat__save--active span{color:#fff}

.feat__card:hover {
  transform: translateY(-3px);
}

.feat__media {
  height: 220px;
  overflow: hidden;
  border-radius: var(--radius);
  background:
      linear-gradient(135deg, rgba(110, 139, 121, 0.2), rgba(216, 199, 173, 0.24)),
      var(--surface-soft);
}

.feat__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feat__body {
  padding: var(--s-5) 0 0;
  min-width: 0;
}

.feat__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--s-3);
  min-width: 0;
}

.feat__pill {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.75);
  color: var(--agave);
  white-space: nowrap;
}

.feat__name {
  margin-top: var(--s-4);
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--ink);
  overflow-wrap: anywhere;
}

.feat__desc {
  margin-top: var(--s-2);
  color: var(--muted);
  overflow-wrap: anywhere;
}

.feat__cta {
  display: inline-block;
  margin-top: var(--s-4);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent-strong);
}

/* if not already global */
.badge--sponsored {
  background: rgba(202, 137, 95, 0.22);
  border: 1px solid var(--border);
  color: rgba(20, 20, 20, 0.82);
}

@media (max-width: 640px) {
  .feat {
    padding: var(--s-7) 0;
  }

  .feat__head {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--s-3);
  }

  .feat__grid {
    grid-template-columns: 1fr;
    gap: var(--s-4);
  }

  .feat__card {
    padding: var(--s-4);
  }

  .feat__save { top:calc(var(--s-4) + .6rem);right:calc(var(--s-4) + .6rem) }

  .feat__media {
    height: clamp(13rem, 56vw, 18rem);
    border-radius: var(--radius-sm);
  }

  .feat__top {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .feat__pill {
    white-space: normal;
  }
}
</style>

<style scoped>
.feat { padding: clamp(3.5rem, 7vw, 6.5rem) 0; background: #ebe4d8; }
.feat__head { padding-top: 0.8rem; border-top: 1px solid var(--ink); }
.feat__title { font-size: clamp(2.35rem, 4.5vw, 4rem); }
.feat__link { color: var(--ink); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
.feat__card { padding: 0; border: 0; background: transparent; }
.feat__card:hover { transform: none; }
.feat__media { height: auto; aspect-ratio: 1 / 1; border-radius: 0; }
.feat__media img { transition: transform 400ms var(--ease); }
.feat__card:hover .feat__media img { transform: scale(1.015); }
.feat__body { padding-top: 1rem; }
.feat__pill { border: 0; border-radius: 0; padding: 0; background: transparent; font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; }
.feat__name { font-family: var(--font-serif); font-size: clamp(1.55rem, 2.3vw, 2.15rem); font-weight: 400; letter-spacing: -0.025em; }
.feat__desc { color: var(--muted-strong); font-size: 0.92rem; line-height: 1.5; }
.feat__cta { font-size: 0.67rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.feat__save { border-radius: 0; box-shadow: none; }
@media (max-width: 640px) { .feat__grid { grid-template-columns: 1fr; } }
</style>
