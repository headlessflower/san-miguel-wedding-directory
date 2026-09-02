<template>
  <section v-if="article" class="article">
    <div class="container">
      <div class="article__heading">
        <p class="article__eyebrow">{{ L === "es" ? "Del diario" : "From the journal" }}</p>
        <NuxtLink :to="blogTo" class="article__all">
          {{ L === "es" ? "Todos los artículos" : "All articles" }} →
        </NuxtLink>
      </div>

      <NuxtLink :to="articleTo" class="article__card">
        <div class="article__media">
          <NuxtImg
            v-if="article.heroImage"
            :src="article.heroImage"
            :alt="article.heroImageAlt || article.title"
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
            sizes="100vw lg:56vw"
            format="webp"
          />
        </div>

        <div class="article__body">
          <p class="article__label">{{ L === "es" ? "Artículo destacado" : "Featured article" }}</p>
          <h2 class="article__title">{{ article.title }}</h2>
          <p v-if="article.description" class="article__description">{{ article.description }}</p>
          <span class="article__cta">{{ L === "es" ? "Leer artículo" : "Read article" }} →</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/i18n";

type FeaturedBlogArticle = {
  path: string;
  title: string;
  description?: string;
  heroImage?: string;
  heroImageAlt?: string;
  slug: string;
};

const { locale } = useI18n();
const localePath = useLocalePath();
const L = computed<Locale>(() => (locale.value as Locale) || "en");

const { data } = await useAsyncData(
  () => `homeFeaturedArticle:${L.value}`,
  async () => {
    const docs = await queryCollection("blog")
      .where("path", "LIKE", `/blog/${L.value}/%`)
      .select("path", "title", "description", "date", "heroImage", "heroImageAlt")
      .order("date", "DESC")
      .limit(1)
      .all();
    const doc = docs[0];
    if (!doc) return null;
    return { ...doc, slug: String(doc.path).split("/").pop() || "" } as FeaturedBlogArticle;
  },
  { watch: [locale] },
);

const article = computed(() => data.value);
const articleTo = computed(() => {
  if (!article.value) return blogTo.value;
  try {
    return localePath({ name: "blog-slug", params: { slug: article.value.slug } }, L.value);
  } catch {
    return `/${L.value}/blog/${article.value.slug}`;
  }
});
const blogTo = computed(() => {
  try {
    return localePath({ name: "blog" }, L.value);
  } catch {
    return `/${L.value}/blog`;
  }
});
</script>

<style scoped>
.article { padding: clamp(3.5rem, 7vw, 6.5rem) 0; }
.article__heading { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding-top: 0.8rem; margin-bottom: 1.5rem; border-top: 1px solid var(--ink); }
.article__eyebrow, .article__all, .article__label, .article__cta { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.11em; text-transform: uppercase; }
.article__eyebrow { color: var(--ink); }
.article__all { color: var(--ink); text-decoration: none; }
.article__card { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr); min-width: 0; color: inherit; text-decoration: none; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.article__media { min-height: clamp(20rem, 37vw, 32rem); overflow: hidden; background: var(--surface-soft); }
.article__media img { display: block; width: 100%; height: 100%; min-height: inherit; object-fit: cover; transition: transform 500ms var(--ease); }
.article__card:hover .article__media img { transform: scale(1.02); }
.article__body { display: flex; flex-direction: column; justify-content: center; padding: clamp(2rem, 5vw, 5rem); border-left: 1px solid var(--border); }
.article__label { color: var(--accent-strong); }
.article__title { margin-top: 1rem; font-family: var(--font-serif); font-size: clamp(2.25rem, 4vw, 4rem); font-weight: 400; line-height: 1.02; }
.article__description { margin-top: 1.25rem; color: var(--muted-strong); line-height: 1.65; }
.article__cta { align-self: flex-start; margin-top: 2rem; padding-bottom: 0.25rem; color: var(--ink); border-bottom: 1px solid var(--ink); }
@media (max-width: 760px) { .article__card { grid-template-columns: 1fr; } .article__media { min-height: 15rem; } .article__body { padding: 2rem 1.25rem; border-top: 1px solid var(--border); border-left: 0; } .article__heading { align-items: flex-end; } }
</style>
