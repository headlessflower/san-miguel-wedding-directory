<template>
    <main class="post">
        <section class="post__content">
            <div class="container post__contentInner">
                <ContentRenderer v-if="doc" :value="doc" />
                <BlogRelatedLinks
                    :related-venues="doc?.relatedVenues"
                    :related-vendor-categories="doc?.relatedVendorCategories"
                />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "blog" });

type Locale = "en" | "es";

const { t, locale } = useI18n();
const route = useRoute();
const config = useRuntimeConfig();
const siteUrlRaw = (config.public?.siteUrl as string) || "";
const siteUrl = siteUrlRaw.replace(/\/$/, "");

const L = computed<Locale>(() => (locale.value as Locale) || "en");
const langTag = computed(() => (L.value === "es" ? "es-MX" : "en-US"));

const seoTitle = computed(() => {
  if (!doc.value) return `${t("nav.blog")} • ${t("seo.siteTitle")}`;
  return `${doc.value.title} • ${t("seo.siteTitle")}`;
});

const seoDescription = computed(() => {
  if (!doc.value) return t("seo.siteDescription");
  return doc.value.description || t("seo.siteDescription");
});

function formatDate(input?: string) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(langTag.value, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

const slug = computed(() => String(route.params.slug || ""));

const { data: doc } = await useAsyncData(
    () => `blogDoc:${L.value}:${slug.value}`,
    async () => {
      const l = L.value;
      const s = slug.value;

      // ✅ Content v3: documents have `path` like /blog/en/<slug>
      const found = await queryCollection("blog")
          .where("path", "=", `/blog/${l}/${s}`)
          .first();

      if (!found) {
        throw createError({
          statusCode: 404,
          statusMessage: "Post not found",
        });
      }

      return found;
    },
    { watch: [locale, slug] }
);

// JSON-LD
useHead(() => {
  if (!doc.value) return {};

  const siteName = t("seo.siteTitle");
  const l = L.value;
  const s = slug.value;
  const url = `${siteUrl}/${l}/blog/${s}`;

  const title = doc.value.title || "Blog";
  const description = doc.value.description || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: doc.value.date,
    mainEntityOfPage: url,
    publisher: { "@type": "Organization", name: siteName },
  };

  return {
    script: [
      {
        key: `jsonld-article-${l}-${s}`,
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  };
});

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});
</script>

<style scoped>
.post__hero {
    padding: var(--s-7) 0 var(--s-5);
}

.post__back {
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.7);
    text-decoration: none;
}

.post__title {
    margin-top: var(--s-4);
    font-size: 42px;
}

.post__subtitle {
    margin-top: var(--s-3);
    max-width: 75ch;
}

.post__meta {
    margin-top: var(--s-4);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.55);
}

.post__content {
    padding: var(--s-5) 0 var(--s-9);
}

.post__contentInner :deep(h2) {
    margin-top: var(--s-7);
    font-size: 22px;
    color: var(--ink);
}

.post__contentInner :deep(p) {
    margin-top: var(--s-4);
    max-width: 75ch;
}

.post__contentInner :deep(ul) {
    margin-top: var(--s-4);
    padding-left: 1.25rem;
    color: var(--muted);
}

.post__contentInner :deep(li) {
    margin-top: 0.5rem;
}
</style>
