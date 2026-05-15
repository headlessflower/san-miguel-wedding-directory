<template>
  <section v-if="sponsoredVendor" class="sponsored">
    <div class="container">
      <NuxtLink :to="vendorTo(sponsoredVendor)" class="sponsored__card">
        <div class="sponsored__media" aria-hidden="true"></div>

        <div class="sponsored__body">
          <div class="sponsored__top">
            <span class="badge badge--sponsored">
              {{ L === "es" ? "Patrocinado" : "Sponsored" }}
            </span>
            <span class="sponsored__category">
              {{ labelForCategory(sponsoredVendor.categoryKey) }}
            </span>
          </div>

          <h2 class="sponsored__title">{{ sponsoredVendor.name[L] }}</h2>
          <p class="sponsored__text">{{ sponsoredVendor.description[L] }}</p>

          <span class="sponsored__cta">
            {{ L === "es" ? "Ver proveedor" : "View vendor" }} →
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SEED_VENDORS, type VendorListing } from "~/data/listings.seed";
import { VENDOR_CATEGORIES } from "~/data/taxonomies";
import type { Locale } from "~/types/i18n";
import { getActiveTier } from "~/utils/monetization/activeTier";
import { getVendorCategorySlug } from "~/utils/search/vendorCategorySlug";

const { locale } = useI18n();
const localePath = useLocalePath();

const L = computed<Locale>(() => (locale.value as Locale) || "en");

const sponsoredVendor = computed(() => {
  const now = new Date();

  return SEED_VENDORS.find((vendor) => {
    const tier = getActiveTier(
      vendor.featuredTier ?? (vendor.featured ? "featured" : "standard"),
      vendor.promotions,
      vendor.featuredUntil,
      now,
    );

    return tier === "sponsored";
  });
});

function labelForCategory(key: VendorListing["categoryKey"]) {
  const found = VENDOR_CATEGORIES.find((c) => c.key === key);
  return found ? found.label[L.value] : String(key);
}

function vendorTo(vendor: VendorListing) {
  const l = L.value;
  const category = getVendorCategorySlug(vendor.categoryKey, l) || "";

  try {
    return localePath(
      { name: "vendors-category-slug", params: { category, slug: vendor.slug } },
      l,
    );
  } catch {
    return `/${l}/${l === "es" ? "proveedores" : "vendors"}/${category}/${vendor.slug}`;
  }
}
</script>

<style scoped>
.sponsored {
  padding: var(--s-8) 0 0;
}

.sponsored__card {
  display: grid;
  grid-template-columns: minmax(18rem, 0.52fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: stretch;
  min-width: 0;
  padding: var(--s-5);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition:
    transform 180ms var(--ease),
    box-shadow 180ms var(--ease);
}

.sponsored__card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.sponsored__media {
  min-height: clamp(13rem, 22vw, 18rem);
  border-radius: var(--radius-sm);
  background:
    linear-gradient(135deg, rgba(180, 87, 55, 0.16), rgba(110, 139, 121, 0.22)),
    url("/images/vendors-hero-san-miguel.jpg");
  background-size: cover;
  background-position: center;
}

.sponsored__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: var(--s-4) var(--s-3);
}

.sponsored__top {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  flex-wrap: wrap;
}

.sponsored__category {
  color: var(--agave);
  font-size: 0.82rem;
  font-weight: 700;
}

.sponsored__title {
  margin-top: var(--s-4);
  color: var(--ink);
  font-size: clamp(1.7rem, 3vw, 2.7rem);
  font-weight: 500;
  overflow-wrap: anywhere;
}

.sponsored__text {
  margin-top: var(--s-3);
  max-width: 64ch;
  color: var(--muted);
  line-height: 1.6;
}

.sponsored__cta {
  display: inline-block;
  margin-top: var(--s-5);
  color: var(--accent-strong);
  font-size: 0.95rem;
  font-weight: 700;
}

.badge--sponsored {
  background: rgba(202, 137, 95, 0.22);
  border: 1px solid var(--border);
  color: rgba(20, 20, 20, 0.82);
}

@media (max-width: 760px) {
  .sponsored {
    padding-top: var(--s-6);
  }

  .sponsored__card {
    grid-template-columns: 1fr;
    padding: var(--s-4);
  }

  .sponsored__body {
    padding: 0;
  }
}
</style>
