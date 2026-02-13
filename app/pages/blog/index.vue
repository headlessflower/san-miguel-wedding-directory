<template>
    <main class="blog">
        <section class="blog__section">
            <div class="container">
                <div v-if="pending" class="blog__loading">
                    {{ locale === "es" ? "Cargando…" : "Loading…" }}
                </div>

                <div v-else-if="posts.length === 0" class="blog__empty card">
                    <p class="blog__emptyTitle">
                        {{
                            locale === "es"
                                ? "Aún no hay artículos."
                                : "No posts yet."
                        }}
                    </p>
                    <p class="blog__emptyText">
                        {{
                            locale === "es"
                                ? 'Verifica que tus archivos existan en /content/blog/es y tengan frontmatter con locale: "es".'
                                : 'Check that files exist in /content/blog/en and include frontmatter locale: "en".'
                        }}
                    </p>
                </div>

                <div v-else class="blog__grid">
                    <NuxtLink
                        v-for="p in posts"
                        :key="p._path"
                        :to="localePath(`/blog/${p.slug}`)"
                        class="blog__card card"
                    >
                        <p class="blog__meta">
                            <span class="blog__date">{{
                                formatDate(p.date)
                            }}</span>
                            <span v-if="p.tags?.length" class="blog__tags">
                                • {{ p.tags.slice(0, 2).join(", ") }}
                            </span>
                        </p>

                        <h2 class="blog__cardTitle">{{ p.title }}</h2>
                        <p class="blog__cardDesc">{{ p.description }}</p>

                        <span class="blog__cta">
                            {{ locale === "es" ? "Leer" : "Read" }} →
                        </span>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "blog" });
type Locale = "en" | "es";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const L = computed(() => (locale.value as Locale) || "en");

const seoTitle = computed(() => `${t("nav.blog")} • ${t("seo.siteTitle")}`);
const seoDescription = computed(() =>
    L.value === "es"
        ? "Guías y recursos para bodas en San Miguel de Allende."
        : "Guides and resources for weddings in San Miguel de Allende.",
);

function formatDate(input?: string) {
    if (!input) return "";
    try {
        const d = new Date(input);
        return d.toLocaleDateString(locale.value === "es" ? "es-MX" : "en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    } catch {
        return input;
    }
}

const { data, pending } = await useAsyncData(
    "blogIndex",
    async () => {
        const l = (locale.value as Locale) || "en";

        const docs = await queryCollection("blog")
            .where("locale", "=", l)
            .select("path", "title", "description", "date", "tags", "locale")
            .order("date", "DESC")
            .all();

        // slug = last segment of path
        return docs.map((d: any) => ({
            ...d,
            slug: String(d.path).split("/").pop(),
        }));
    },
    { watch: [locale] },
);

const posts = computed(() => data.value ?? []);

useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
});
</script>

<style scoped>
.blog__hero {
    padding: var(--s-7) 0 var(--s-5);
}
.blog__title {
    font-size: 40px;
}
.blog__subtitle {
    margin-top: var(--s-3);
    max-width: 75ch;
}

.blog__section {
    padding: var(--s-5) 0 var(--s-9);
}

.blog__loading {
    font-weight: 900;
    color: rgba(20, 20, 20, 0.6);
}

.blog__empty {
    padding: var(--s-5);
}
.blog__emptyTitle {
    font-weight: 900;
    color: var(--ink);
}
.blog__emptyText {
    margin-top: var(--s-2);
}

.blog__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--s-4);
}
@media (max-width: 900px) {
    .blog__grid {
        grid-template-columns: 1fr;
    }
}

.blog__card {
    text-decoration: none;
    padding: var(--s-5);
}

.blog__meta {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.55);
}

.blog__cardTitle {
    margin-top: var(--s-3);
    font-size: 18px;
    color: var(--ink);
}
.blog__cardDesc {
    margin-top: var(--s-2);
}

.blog__cta {
    display: inline-block;
    margin-top: var(--s-4);
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.8);
}
</style>
