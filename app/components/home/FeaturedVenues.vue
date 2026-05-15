<template>
  <section class="feat">
    <div class="container">
      <div class="feat__head">
        <h2 class="feat__title">{{ title }}</h2>

        <!-- ✅ named route (no /wedding-venues leaks) -->
        <NuxtLink :to="venuesIndexTo" class="feat__link">
          {{ L === "es" ? "Ver todos" : "View all" }}
        </NuxtLink>
      </div>

      <div class="feat__grid">
        <NuxtLink
            v-for="v in venues"
            :key="v.id"
            :to="venueTo(v.slug)"
            class="feat__card card"
        >
          <div class="feat__media" aria-hidden="true"></div>

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

              <span v-if="v.luxuryTier" class="feat__tier">
                {{ v.luxuryTier.toUpperCase() }}
              </span>
            </div>

            <h3 class="feat__name">{{ v.name[L] }}</h3>
            <p class="feat__desc">{{ v.description[L] }}</p>

            <div class="feat__meta">
              <span v-if="v.capacitySeated" class="feat__metaItem">
                {{ L === "es" ? "Capacidad" : "Capacity" }}: {{ v.capacitySeated }}
              </span>
              <span v-if="v.venueType" class="feat__metaItem">
                {{ v.venueType.replace("_", " ") }}
              </span>
            </div>

            <span class="feat__cta">{{ t("directory.viewDetails") }} →</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/i18n";
import type { VenueListing } from "~/data/listings.seed";
import { sortListings } from "~/utils/monetization/sortFeatured";
import { getActiveTier } from "~/utils/monetization/activeTier";

const props = defineProps<{
  title?: string;
  limit?: number;
}>();

const { t, locale } = useI18n();
const localePath = useLocalePath();

const L = computed<Locale>(() => (locale.value as Locale) || "en");
const { getVenues } = useListings();

type VenueCard = VenueListing & {
  displayTier?: "standard" | "featured" | "sponsored";
};

/** ✅ Localized paths (named routes + safe fallback) */
const venuesIndexTo = computed(() => {
  const l = L.value;
  try {
    return localePath({ name: "wedding-venues" }, l);
  } catch {
    return `/${l}/${l === "es" ? "lugares-para-bodas" : "wedding-venues"}`;
  }
});

function venueTo(vSlug: string) {
  const l = L.value;
  try {
    return localePath({ name: "wedding-venues-slug", params: { slug: vSlug } }, l);
  } catch {
    const base = l === "es" ? "lugares-para-bodas" : "wedding-venues";
    return `/${l}/${base}/${vSlug}`;
  }
}

const venues = computed<VenueCard[]>(() => {
  const base = Array.isArray(getVenues()) ? getVenues() : [];
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
      .filter((v: any) => v.displayTier !== "standard" || v.featured)
      .slice(0, props.limit ?? 3);

  return chosen as VenueCard[];
});

const title = computed(() => props.title ?? t("home.featuredVenues"));
</script>


<style scoped>
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
    grid-template-columns: 1fr;
  }
}

.feat__card {
  overflow: hidden;
  text-decoration: none;
  display: block;
  min-width: 0;
  padding: var(--s-5);
  border-color: rgba(255, 255, 255, 0.7);
  transition:
    transform 180ms var(--ease),
    box-shadow 180ms var(--ease);
}

.feat__card:hover {
  transform: translateY(-3px);
}

.feat__media {
  height: 220px;
  overflow: hidden;
  border-radius: 20px;
  background:
      linear-gradient(135deg, rgba(110, 139, 121, 0.22), rgba(216, 199, 173, 0.22)),
      var(--surface-soft);
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

.feat__tier {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 8px;
  border-radius: 999px;
  background: var(--agave-soft);
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

.feat__meta {
  margin-top: var(--s-3);
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

.feat__metaItem {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.75);
  color: var(--muted-strong);
  white-space: nowrap;
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
</style>
