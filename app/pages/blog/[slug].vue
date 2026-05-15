<template>
    <main class="post">
        <section v-if="doc" class="post__hero">
            <div class="container post__heroInner">
                <div class="post__heroCopy">
                    <NuxtLink :to="blogPath" class="post__back">
                        {{ L === "es" ? "Volver al blog" : "Back to blog" }}
                    </NuxtLink>

                    <p v-if="postMeta" class="post__meta">{{ postMeta }}</p>
                    <h1 class="post__title">{{ postTitle }}</h1>
                    <p v-if="postDescription" class="post__subtitle">
                        {{ postDescription }}
                    </p>

                    <div v-if="tagList.length" class="post__tags" aria-label="Article tags">
                        <span v-for="tag in tagList" :key="tag" class="post__tag">
                            {{ tag }}
                        </span>
                    </div>
                </div>

                <figure class="post__heroMedia">
                    <img :src="heroImage" :alt="heroImageAlt" />
                </figure>
            </div>
        </section>

        <section class="post__content">
            <div class="container post__contentShell">
                <article class="post__contentInner">
                    <ContentRenderer v-if="doc" :value="doc" />
                </article>

                <aside v-if="doc" class="post__mediaRail" aria-label="Article images">
                    <figure
                        v-for="image in articleImages"
                        :key="image.src"
                        class="post__railFigure"
                    >
                        <img :src="image.src" :alt="image.alt" />
                        <figcaption>{{ image.caption }}</figcaption>
                    </figure>
                </aside>

                <BlogRelatedLinks
                    class="post__related"
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
const localePath = useLocalePath();
const setI18nParams = useSetI18nParams();
const config = useRuntimeConfig();
const siteUrlRaw = (config.public?.siteUrl as string) || "";
const siteUrl = siteUrlRaw.replace(/\/$/, "");

const L = computed<Locale>(() => (locale.value as Locale) || "en");
const langTag = computed(() => (L.value === "es" ? "es-MX" : "en-US"));
const blogPath = computed(() => localePath({ name: "blog" }));
const blogLocaleSlugsState = useState<Partial<Record<Locale, string>>>("blogLocaleSlugs", () => ({}));

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
  const dateOnly = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const d = dateOnly
      ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
      : new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(langTag.value, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

const postTitle = computed(() => doc.value?.title || "Blog");
const postDescription = computed(() => doc.value?.description || "");
const postMeta = computed(() => {
  const date = formatDate(doc.value?.date);
  if (!date) return "";

  return L.value === "es" ? `Guia publicada el ${date}` : `Guide published ${date}`;
});
const tagList = computed(() => (doc.value?.tags ?? []).slice(0, 3));

const heroImage = computed(
    () => (doc.value as any)?.heroImage || "/images/venues-hero-san-miguel.jpg"
);
const heroImageAlt = computed(
    () =>
        (doc.value as any)?.heroImageAlt ||
        (L.value === "es"
            ? "Vista arquitectonica de San Miguel de Allende para una boda destino"
            : "Architectural view of San Miguel de Allende for a destination wedding")
);

const articleImages = computed(() => {
  const images = ((doc.value as any)?.articleImages ?? []) as Array<{
    src?: string;
    alt?: string;
    caption?: string;
  }>;

  if (images.length) {
    return images
        .filter((image) => image.src)
        .slice(0, 2)
        .map((image) => ({
          src: image.src || "",
          alt: image.alt || "",
          caption: image.caption || "",
        }));
  }

  return [
    {
      src: "/images/home-hero-san-miguel.jpg",
      alt:
          L.value === "es"
              ? "Calles historicas de San Miguel de Allende"
              : "Historic streets of San Miguel de Allende",
      caption: L.value === "es" ? "Centro historico" : "Historic center",
    },
    {
      src: "/images/vendors-hero-san-miguel.jpg",
      alt:
          L.value === "es"
              ? "Detalles de proveedores para una boda en San Miguel"
              : "Vendor details for a San Miguel wedding",
      caption: L.value === "es" ? "Detalles y proveedores" : "Details and vendors",
    },
  ];
});

const slug = computed(() => String(route.params.slug || ""));
const canonicalSlug = computed(() => {
  const rawPath = String(doc.value?.path || "");
  return rawPath.split("/").pop() || "";
});
const localizedSlugs = computed(() => ((doc.value as any)?.localizedSlugs ?? {}) as Partial<Record<Locale, string>>);

const { data: doc } = await useAsyncData(
    () => `blogDoc:${L.value}:${slug.value}`,
    async () => {
      const l = L.value;
      const s = slug.value;

      // Content v3 documents have `path` like /blog/en/<slug>.
      let found = await queryCollection("blog")
          .where("path", "=", `/blog/${l}/${s}`)
          .first();

      if (!found) {
        const alternateLocaleDoc = await queryCollection("blog")
            .where("path", "LIKE", `/blog/%/${s}`)
            .first();

        if ((alternateLocaleDoc as any)?.translationKey) {
          found = await queryCollection("blog")
              .where("locale", "=", l)
              .where("translationKey", "=", (alternateLocaleDoc as any).translationKey)
              .first();
        }

        if (!found) {
          throw createError({
            statusCode: 404,
            statusMessage: "Post not found",
          });
        }
      }

      const localizedSlugs: Partial<Record<Locale, string>> = {};
      if ((found as any).translationKey) {
        const siblingDocs = await queryCollection("blog")
            .where("translationKey", "=", (found as any).translationKey)
            .select("path", "locale")
            .all();

        for (const sibling of siblingDocs as any[]) {
          const siblingLocale = sibling.locale as Locale | undefined;
          const siblingSlug = String(sibling.path || "").split("/").pop() || "";
          if (siblingLocale && siblingSlug) localizedSlugs[siblingLocale] = siblingSlug;
        }
      }

      return { ...found, localizedSlugs };
    },
    { watch: [locale, slug] }
);

if (doc.value && canonicalSlug.value && canonicalSlug.value !== slug.value) {
  await navigateTo(
      localePath({ name: "blog-slug", params: { slug: canonicalSlug.value } }),
      { redirectCode: 301 }
  );
}

watchEffect(() => {
  const params = localizedSlugs.value;
  if (!params.en && !params.es) return;

  blogLocaleSlugsState.value = { ...params };

  setI18nParams({
    en: params.en ? { slug: params.en } : false,
    es: params.es ? { slug: params.es } : false,
  });
});

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
    padding: var(--s-7) 0 var(--s-8);
    background:
        linear-gradient(180deg, rgba(216, 199, 173, 0.24), rgba(247, 245, 241, 0)),
        var(--bg);
}

.post__heroInner {
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.78fr);
    gap: clamp(1.5rem, 4vw, 4rem);
    align-items: center;
}

.post__heroCopy {
    max-width: 760px;
}

.post__back {
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.7);
    text-decoration: none;
}

.post__back::before {
    content: "←";
    font-size: 16px;
    line-height: 1;
}

.post__title {
    margin-top: var(--s-4);
    max-width: 13ch;
    font-size: clamp(2.65rem, 6vw, 5.65rem);
    letter-spacing: 0;
}

.post__subtitle {
    margin-top: var(--s-5);
    max-width: 66ch;
    color: var(--muted-strong);
    font-size: clamp(1.02rem, 1.4vw, 1.2rem);
    line-height: 1.65;
}

.post__meta {
    margin-top: var(--s-6);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent-strong);
}

.post__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
    margin-top: var(--s-6);
}

.post__tag {
    border: 1px solid rgba(180, 87, 55, 0.2);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.54);
    color: var(--muted-strong);
    padding: 0.45rem 0.75rem;
    font-size: 12px;
    font-weight: 800;
}

.post__heroMedia {
    position: relative;
    min-height: 420px;
    overflow: hidden;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-lg);
}

.post__heroMedia::after {
    position: absolute;
    inset: 0;
    content: "";
    background: linear-gradient(180deg, rgba(21, 18, 16, 0), rgba(21, 18, 16, 0.14));
    pointer-events: none;
}

.post__heroMedia img {
    width: 100%;
    height: 100%;
    min-height: 420px;
    object-fit: cover;
}

.post__content {
    padding: var(--s-7) 0 var(--s-9);
}

.post__contentShell {
    display: grid;
    grid-template-columns: minmax(0, 760px) minmax(220px, 320px);
    gap: clamp(2rem, 5vw, 5rem);
    align-items: start;
}

.post__contentInner {
    min-width: 0;
}

.post__contentInner :deep(h1) {
    display: none;
}

.post__contentInner :deep(h2) {
    margin-top: var(--s-9);
    padding-top: var(--s-6);
    border-top: 1px solid var(--border);
    font-size: clamp(1.55rem, 2.4vw, 2.25rem);
    color: var(--ink);
}

.post__contentInner :deep(h2:first-child) {
    margin-top: 0;
    padding-top: 0;
    border-top: 0;
}

.post__contentInner :deep(h3) {
    margin-top: var(--s-6);
    font-size: 1.25rem;
    color: var(--ink);
}

.post__contentInner :deep(p) {
    margin-top: var(--s-4);
    max-width: 72ch;
    color: var(--muted-strong);
    font-size: 1.04rem;
    line-height: 1.78;
}

.post__contentInner :deep(p:first-of-type) {
    margin-top: 0;
    color: var(--ink);
    font-size: clamp(1.18rem, 1.8vw, 1.45rem);
    line-height: 1.68;
}

.post__contentInner :deep(ul) {
    margin-top: var(--s-4);
    margin-bottom: var(--s-5);
    padding: var(--s-4) var(--s-5) var(--s-4) 2.4rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xs);
    background: var(--surface-soft);
    color: var(--muted-strong);
}

.post__contentInner :deep(li) {
    margin-top: 0.65rem;
    line-height: 1.65;
}

.post__mediaRail {
    position: sticky;
    top: 92px;
    display: grid;
    gap: var(--s-5);
}

.post__railFigure {
    overflow: hidden;
    border-radius: var(--radius-xs);
    background: var(--surface);
    box-shadow: var(--shadow-md);
}

.post__railFigure img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
}

.post__railFigure figcaption {
    padding: var(--s-3) var(--s-4);
    color: var(--muted-strong);
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.post__related {
    grid-column: 1 / -1;
    margin-top: var(--s-7);
}

@media (max-width: 920px) {
    .post__heroInner,
    .post__contentShell {
        grid-template-columns: 1fr;
    }

    .post__title {
        max-width: 14ch;
    }

    .post__heroMedia {
        min-height: 320px;
    }

    .post__heroMedia img {
        min-height: 320px;
    }

    .post__mediaRail {
        position: static;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .post__hero {
        padding: var(--s-6) 0 var(--s-5);
    }

    .post__title {
        max-width: none;
        font-size: clamp(2.3rem, 13vw, 3.45rem);
    }

    .post__heroMedia,
    .post__heroMedia img {
        min-height: 260px;
    }

    .post__content {
        padding: var(--s-5) 0 var(--s-8);
    }

    .post__contentInner :deep(h2) {
        margin-top: var(--s-8);
    }

    .post__contentInner :deep(ul) {
        padding-right: var(--s-4);
    }

    .post__mediaRail {
        grid-template-columns: 1fr;
    }
}
</style>
