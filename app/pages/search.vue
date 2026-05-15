<template>
  <main class="search">
    <section class="search__hero">
      <div class="container">
        <h1 class="search__title">{{ L === "es" ? "Buscar" : "Search" }}</h1>
        <p class="search__subtitle">
          {{
            L === "es"
                ? "Busca lugares, proveedores y artículos del blog."
                : "Search venues, vendors, and blog posts."
          }}
        </p>

        <form class="search__form" @submit.prevent>
          <input
              v-model="q"
              class="search__input"
              :placeholder="L === 'es'
              ? 'Buscar: hacienda, fotógrafo, DJ…'
              : 'Search: hacienda, photographer, DJ…'"
              type="search"
              autocomplete="off"
          />
        </form>
      </div>
    </section>

    <section class="search__results">
      <div class="container">
        <p v-if="!q" class="search__muted">
          {{ L === "es" ? "Escribe para ver resultados." : "Type to see results." }}
        </p>

        <p v-else-if="pending" class="search__muted">
          {{ L === "es" ? "Buscando…" : "Searching…" }}
        </p>

        <p v-else-if="resultsUnified.length === 0" class="search__muted">
          {{ L === "es" ? "Sin resultados." : "No results found." }}
        </p>

        <div v-else class="search__groups">
          <div v-if="grouped.venue.length" class="search__group">
            <h2 class="search__groupTitle">{{ L === "es" ? "Lugares" : "Venues" }}</h2>
            <div class="search__grid">
              <NuxtLink
                  v-for="r in grouped.venue"
                  :key="r.urlPath"
                  :to="r.urlPath"
                  class="search__card card"
              >
                <div class="search__cardBody">
                  <p class="search__kicker">{{ L === "es" ? "Lugar" : "Venue" }}</p>
                  <h3 class="search__cardTitle">{{ r.title }}</h3>
                  <p v-if="r.description" class="search__cardText">{{ r.description }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div v-if="grouped.vendor.length" class="search__group">
            <h2 class="search__groupTitle">{{ L === "es" ? "Proveedores" : "Vendors" }}</h2>
            <div class="search__grid">
              <NuxtLink
                  v-for="r in grouped.vendor"
                  :key="r.urlPath"
                  :to="r.urlPath"
                  class="search__card card"
              >
                <div class="search__cardBody">
                  <p class="search__kicker">{{ L === "es" ? "Proveedor" : "Vendor" }}</p>
                  <h3 class="search__cardTitle">{{ r.title }}</h3>
                  <p v-if="r.description" class="search__cardText">{{ r.description }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div v-if="grouped.post.length" class="search__group">
            <h2 class="search__groupTitle">Blog</h2>
            <div class="search__grid">
              <NuxtLink
                  v-for="r in grouped.post"
                  :key="r.urlPath"
                  :to="r.urlPath"
                  class="search__card card"
              >
                <div class="search__cardBody">
                  <p class="search__kicker">{{ L === "es" ? "Artículo" : "Post" }}</p>
                  <h3 class="search__cardTitle">{{ r.title }}</h3>
                  <p v-if="r.description" class="search__cardText">{{ r.description }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <p v-if="error" class="search__muted" style="margin-top: var(--s-5)">
          {{ L === "es" ? "Error al buscar." : "Search error." }}
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/i18n";
import { VENDOR_CATEGORIES } from "~/data/taxonomies";
import { buildSearchIndex, createSearchIndex, searchIndex } from "~/utils/search/buildSearchIndex";

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const L = computed<Locale>(() => (locale.value as Locale) || "en");

// local, editable input model
const q = ref(String(route.query.q || "").trim());

// keep URL query in sync (so search is shareable)
watch(
    q,
    (val) => {
      const next = val.trim();
      router.replace({
        query: {
          ...route.query,
          q: next || undefined,
        },
      });
    },
    { flush: "post" }
);

// also update input if user navigates via back/forward
watch(
    () => route.query.q,
    (val) => {
      const next = String(val || "").trim();
      if (next !== q.value) q.value = next;
    }
);

type SearchHit = {
  type: "venue" | "vendor" | "post";
  title: string;
  description?: string;
  urlPath: string;
};

type BlogDoc = {
  title?: string;
  description?: string;
  path?: string;
  tags?: string[];
  locale?: "en" | "es";
};

const { getVenues, getVendorsByCategoryKey } = useListings();

/**
 * Load blog docs for the current locale (reactive to locale changes).
 * We fetch minimal fields, then map into the shape buildSearchIndex expects.
 */
const { data: blogDocs, pending, error } = await useAsyncData(
    () => `search:blog:${L.value}`,
    async () => {
      const list = await queryCollection("blog")
          .where("locale", "=", L.value)
          .select("title", "description", "path", "tags")
          .all();

      return (list as BlogDoc[]).map((p) => ({
        title: p.title,
        description: p.description,
        path: p.path,
        tags: p.tags ?? [],
      }));
    }
);

/**
 * Seed data (venues + vendors).
 * Keep these computed so they react if you change seed data.
 */
const venues = computed(() => getVenues());

const vendors = computed(() => {
  return VENDOR_CATEGORIES.flatMap((c) => getVendorsByCategoryKey(c.key));
});

/**
 * Build the unified search index.
 */
const docs = computed(() => {
  return buildSearchIndex(
      L.value,
      venues.value,
      vendors.value,
      blogDocs.value ?? []
  );
});

/**
 * Build the token index once per document set, then query it as the user types.
 */
const searchIndexData = computed(() => createSearchIndex(docs.value));

const resultsUnified = computed<SearchHit[]>(() => {
  const needle = q.value.trim();
  if (!needle) return [];
  return searchIndex(searchIndexData.value, needle) as SearchHit[];
});

const grouped = computed(() => {
  const venue: SearchHit[] = [];
  const vendor: SearchHit[] = [];
  const post: SearchHit[] = [];

  for (const r of resultsUnified.value) {
    if (r.type === "venue") venue.push(r);
    else if (r.type === "vendor") vendor.push(r);
    else post.push(r);
  }

  return { venue, vendor, post };
});
</script>


<style scoped>
.search__hero { padding: var(--s-9) 0 var(--s-6); text-align: center; }
.search__title { font-size: clamp(2.7rem, 6vw, 4.6rem); font-weight: 500; }
.search__subtitle { margin: var(--s-3) auto 0; max-width: 52ch; font-size: 1.08rem; line-height: 1.55; }
.search__form { margin-top: var(--s-5); }
.search__input {
  width: min(740px, 100%);
  font-size: 16px;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.search__results { padding: var(--s-6) 0 var(--s-9); }
.search__muted { opacity: 0.7; }
.search__group { margin-top: var(--s-6); }
.search__groupTitle { font-size: 18px; }
.search__grid {
  margin-top: var(--s-4);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s-4);
}
@media (max-width: 900px) {
  .search__grid { grid-template-columns: 1fr; }
}
.search__card { display: block; text-decoration: none; }
.search__cardBody { padding: var(--s-6); }
.search__kicker {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.65;
}
.search__cardTitle { margin-top: var(--s-2); font-size: 1.35rem; font-weight: 500; color: var(--ink); }
.search__cardText { margin-top: var(--s-2); }
</style>
