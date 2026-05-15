<template>
  <main class="home">
    <HomeHero />

    <FeaturedVenues :limit="3" />
    <FeaturedVendors :limit="3" />

    <section class="home__section">
      <div class="container">
        <div class="home__sectionHead">
          <h2 class="home__sectionTitle">{{ t("home.browseByCategory") }}</h2>

          <!-- ✅ named route (no /vendors leaks) -->
          <NuxtLink :to="vendorsIndexTo" class="home__sectionLink">
            {{ L === "es" ? "Explorar" : "Browse" }}
          </NuxtLink>
        </div>

        <div class="home__cats">
          <NuxtLink
              v-for="c in vendorCategoryCards"
              :key="c.key"
              :to="vendorCategoryTo(c)"
              class="home__cat card"
          >
            <h3 class="home__catTitle">{{ c.label[L] }}</h3>
            <p class="home__catText">
              {{ L === "es" ? "Ver proveedores" : "Browse vendors" }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { VENDOR_CATEGORIES } from "~/data/taxonomies";
import HomeHero from "~/components/home/HomeHero.vue";
import FeaturedVenues from "~/components/home/FeaturedVenues.vue";
import FeaturedVendors from "~/components/home/FeaturedVendors.vue";
import type { Locale } from "~/types/i18n";

const { t, locale } = useI18n();
const localePath = useLocalePath();

const L = computed<Locale>(() => (locale.value as Locale) || "en");

const vendorCategoryCards = computed(() => VENDOR_CATEGORIES.slice(0, 6));

/** ✅ Safe, localized links (named routes) */
const vendorsIndexTo = computed(() => {
  const l = L.value;
  try {
    return localePath({ name: "vendors" }, l);
  } catch {
    return `/${l}/${l === "es" ? "proveedores" : "vendors"}`;
  }
});

function vendorCategoryTo(c: any) {
  const l = L.value;
  const catSlug = c.slug?.[l] ?? c.slug?.en ?? "";
  try {
    return localePath(
        { name: "vendors-category", params: { category: catSlug } },
        l
    );
  } catch {
    return `/${l}/${l === "es" ? "proveedores" : "vendors"}/${catSlug}`;
  }
}
</script>


<style scoped>
.home {
    min-height: 100vh;
}

/* Hero */
.home__hero {
    padding: var(--s-9) 0 var(--s-7);
}

.home__heroInner {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: var(--s-7);
    align-items: start;
    min-width: 0;
}

@media (max-width: 900px) {
    .home__heroInner {
        grid-template-columns: 1fr;
    }
}

.home__heroCopy {
    min-width: 0;
}

.home__heroTitle {
    font-size: 44px;
    letter-spacing: -0.02em;
    line-height: 1.05;
    overflow-wrap: anywhere;
}

@media (max-width: 640px) {
    .home__heroTitle {
        font-size: 36px;
    }
}

.home__heroSubtitle {
    margin-top: var(--s-4);
    max-width: 60ch;
}

.home__heroCtas {
    margin-top: var(--s-6);
    display: flex;
    gap: var(--s-3);
    flex-wrap: wrap;
}

.home__heroCard {
    padding: var(--s-5);
    min-width: 0;
}

.home__heroCardTop {
    display: flex;
    justify-content: flex-end;
}

.home__heroCardBody {
    margin-top: var(--s-4);
    min-width: 0;
}

.home__heroCardKicker {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.55);
}

.home__heroCardTitle {
    margin-top: var(--s-2);
    font-family: var(--font-serif);
    font-size: 20px;
    color: var(--ink);
    overflow-wrap: anywhere;
}

.home__heroCardText {
    margin-top: var(--s-2);
    overflow-wrap: anywhere;
}

/* Sections */
.home__section {
    padding: var(--s-8) 0;
}

.home__sectionHead {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--s-4);
    margin-bottom: var(--s-6);
    min-width: 0;
}

.home__sectionTitle {
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 500;
    min-width: 0;
}

.home__sectionLink {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: none;
    color: var(--accent-strong);
    text-decoration: none;
    white-space: nowrap;
}

.home__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--s-4);
}

@media (max-width: 900px) {
    .home__grid {
        grid-template-columns: 1fr;
    }
}

.home__card {
    overflow: hidden;
    text-decoration: none;
    display: block; /* important: NuxtLink is inline by default sometimes */
    min-width: 0;
}

.home__cardMedia {
    height: 160px;
    background: linear-gradient(
        135deg,
        rgba(20, 20, 20, 0.06),
        rgba(20, 20, 20, 0.02)
    );
    border-bottom: 1px solid var(--border);
}

.home__cardBody {
    padding: var(--s-5);
    min-width: 0;
}

.home__cardTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--s-3);
    min-width: 0;
}

.home__cardTitle {
    margin-top: var(--s-3);
    font-size: 18px;
    color: var(--ink);
    overflow-wrap: anywhere;
}

.home__cardText {
    margin-top: var(--s-2);
    overflow-wrap: anywhere;
}

.home__cardCta {
    display: inline-block;
    margin-top: var(--s-4);
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.8);
}

.home__tier {
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.08em;
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(20, 20, 20, 0.08);
    color: rgba(20, 20, 20, 0.75);
    flex: 0 0 auto;
    white-space: nowrap;
}

.home__cardMeta {
    margin-top: var(--s-3);
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
}

.home__metaItem {
    font-size: 12px;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.75);
    color: rgba(20, 20, 20, 0.7);
    white-space: nowrap;
}

/* Categories */
.home__cats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--s-5);
}

@media (max-width: 900px) {
    .home__cats {
        grid-template-columns: 1fr;
    }
}

.home__cat {
    padding: var(--s-7);
    text-decoration: none;
    display: block;
    min-width: 0;
    border-color: rgba(255, 255, 255, 0.7);
    transition:
        transform 180ms var(--ease),
        box-shadow 180ms var(--ease);
}

.home__cat:hover {
    transform: translateY(-3px);
}

.home__catTitle {
    font-size: 1.45rem;
    font-weight: 500;
    color: var(--ink);
    overflow-wrap: anywhere;
}

.home__catText {
    margin-top: var(--s-3);
    color: var(--muted);
}

/* Footer */
.home__footer {
    padding: var(--s-6) 0;
    border-top: 1px solid var(--border);
}

.home__footerText {
    font-size: 13px;
}

.home__footerInner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
}
</style>
