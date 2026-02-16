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
              :placeholder="L === 'es' ? 'Buscar: hacienda, fotógrafo, DJ…' : 'Search: hacienda, photographer, DJ…'"
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

        <p v-else-if="results.length === 0" class="search__muted">
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
            <h2 class="search__groupTitle">{{ L === "es" ? "Blog" : "Blog" }}</h2>
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
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/i18n";
import { searchDocs, type SearchDoc } from "~/utils/search/buildSearchIndex";
import { SEED_VENUES, SEED_VENDORS } from "~/data/listings.seed";
import { getVendorCategorySlug } from "~/utils/search/vendorCategorySlug";

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();

const L = computed<Locale>(() => (locale.value as Locale) || "en");

const q = ref(String(route.query.query || ""));

watch(q, (val) => {
  router.replace({ query: { ...route.query, query: val || undefined } });
});

// Fetch posts for current locale
const { data: posts } = await useAsyncData(`search-posts-${L.value}`, async () => {
  // This assumes you store posts at /blog/<locale>/...
  // and you already route /blog properly.
  // Adjust if your content paths differ.
  const whereLocale = L.value;

  const list = await queryContent("/blog")
      .where({ locale: whereLocale })
      .only(["title", "description", "_path", "tags"])
      .find();

  return list as Array<{ title?: string; description?: string; _path?: string; tags?: string[] }>;
});

// Build docs. NOTE: vendor URL needs category slug.
// If your VendorListing already has categorySlug, great.
// If not, we can compute vendor URL with taxonomies — but easiest is to add categorySlug to your seed objects.
// For now, we’ll fall back to /vendors (category omitted) if missing.
const docs = computed<SearchDoc[]>(() => {
  const l = L.value;

  const venueDocs: SearchDoc[] = SEED_VENUES.map((v) => ({
    type: "venue",
    title: v.name[l],
    description: v.description[l],
    urlPath: `/${l}/wedding-venues/${v.slug}`,
  }));

  const vendorDocs: SearchDoc[] = SEED_VENDORS.map((v) => {
    const catSlug = getVendorCategorySlug(v.categoryKey, l);
    const url = catSlug
        ? `/${l}/vendors/${catSlug}/${v.slug}`
        : `/${l}/vendors`;

    return {
      type: "vendor",
      title: v.name[l],
      description: v.description[l],
      urlPath: url,
    };
  });


  const postDocs: SearchDoc[] = (posts.value ?? [])
      .filter((p) => p._path)
      .map((p) => ({
        type: "post",
        title: p.title || (l === "es" ? "Artículo" : "Post"),
        description: p.description || "",
        urlPath: `/${l}${p._path}`.replace(/\/+/g, "/"),
      }));

  return [...venueDocs, ...vendorDocs, ...postDocs];
});

const results = computed(() => searchDocs(docs.value, q.value));

const grouped = computed(() => ({
  venue: results.value.filter((r) => r.type === "venue").slice(0, 12),
  vendor: results.value.filter((r) => r.type === "vendor").slice(0, 12),
  post: results.value.filter((r) => r.type === "post").slice(0, 12),
}));

useSeoMeta(() => {
  const title = L.value === "es" ? "Buscar • " : "Search • ";
  return {
    title: `${title}${"San Miguel"}`,
    description:
        L.value === "es"
            ? "Busca lugares, proveedores y artículos para bodas en San Miguel de Allende."
            : "Search wedding venues, vendors, and blog posts in San Miguel de Allende.",
  };
});
</script>

<style scoped>
.search__hero { padding: var(--s-8) 0 var(--s-5); }
.search__title { font-size: 40px; }
.search__subtitle { margin-top: var(--s-3); max-width: 70ch; }
.search__form { margin-top: var(--s-5); }
.search__input {
  width: min(740px, 100%);
  font-size: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
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
.search__cardBody { padding: var(--s-5); }
.search__kicker {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.65;
}
.search__cardTitle { margin-top: var(--s-2); font-size: 18px; color: var(--ink); }
.search__cardText { margin-top: var(--s-2); }
</style>
