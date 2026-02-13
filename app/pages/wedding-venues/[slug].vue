<template>
    <main class="venue">
        <section class="venue__hero">
            <div class="container">
                <div class="venue__heroTop">
                    <NuxtLink
                        :to="localePath('/wedding-venues')"
                        class="venue__back"
                    >
                        ← {{ locale === "es" ? "Regresar" : "Back" }}
                    </NuxtLink>

                    <span v-if="venue.featured" class="badge badge--featured">
                        {{ t("directory.featured") }}
                    </span>
                </div>

                <h1 class="venue__title">{{ venue.name[locale] }}</h1>
                <p class="venue__subtitle">{{ venue.description[locale] }}</p>

                <div class="venue__chips">
                    <span v-if="venue.capacitySeated" class="venue__chip">
                        {{ locale === "es" ? "Capacidad" : "Capacity" }}:
                        {{ venue.capacitySeated }}
                    </span>
                    <span v-if="venue.priceRange" class="venue__chip">
                        {{ locale === "es" ? "Rango" : "Range" }}:
                        {{ venue.priceRange }}
                    </span>
                </div>
            </div>
        </section>

        <section class="venue__content">
            <div class="container venue__contentInner">
                <div class="venue__heroImage" v-if="heroImage">
                    <img
                        :src="heroImage.src"
                        :alt="heroImage.alt[L] || ''"
                        class="venue__img"
                        loading="lazy"
                        decoding="async"
                    />
                    <p v-if="heroImage.credit" class="venue__credit">
                        {{ heroImage.credit }}
                    </p>
                </div>

                <aside class="venue__sidebar card">
                    <div class="venue__sidebarBody">
                        <h2 class="venue__sideTitle">
                            {{ locale === "es" ? "Contacto" : "Contact" }}
                        </h2>

                        <a
                            v-if="venue.website"
                            :href="venue.website"
                            target="_blank"
                            rel="noreferrer"
                            class="venue__link"
                        >
                            {{ t("directory.website") }} →
                        </a>
                        <a
                            v-if="venue.instagram"
                            :href="venue.instagram"
                            target="_blank"
                            rel="noreferrer"
                            class="venue__link"
                        >
                            {{ t("directory.instagram") }} →
                        </a>

                        <p
                            v-if="!venue.website && !venue.instagram"
                            class="venue__muted"
                        >
                            {{
                                locale === "es"
                                    ? "Agrega enlaces de sitio e Instagram cuando cargues datos reales."
                                    : "Add website/Instagram links once real data is added."
                            }}
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
type Locale = "en" | "es";

const { t, locale } = useI18n();
const L = computed(() => (locale.value as Locale) || "en");
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const { getVenueBySlug } = useListings();
const seoTitle = computed(
    () => `${venue.value.name[L.value]} • ${t("seo.siteTitle")}`,
);
const seoDescription = computed(() => venue.value.description[L.value]);

const venue = computed(() => {
    const slug = String(route.params.slug || "");
    const found = getVenueBySlug(slug);
    if (!found)
        throw createError({
            statusCode: 404,
            statusMessage: "Venue not found",
        });
    return found;
});
const heroImage = computed(() => {
    const v = venue.value; // if `venue` is computed/ref
    const imgs = v?.images ?? [];
    return imgs.find((i) => i.type === "hero") ?? imgs[0] ?? null;
});

// Simple SEO per venue (good enough for now; we’ll improve later)

useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
});
</script>

<style scoped>
.venue__header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(242, 242, 240, 0.85);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
}

.venue__headerInner {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
}

.venue__brandName {
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 12px;
}

.venue__nav {
    display: flex;
    align-items: center;
    gap: var(--s-4);
}

.venue__navLink {
    font-size: 13px;
    font-weight: 800;
    color: rgba(20, 20, 20, 0.72);
    text-decoration: none;
}

.venue__lang {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 6px 10px;
    background: var(--surface);
}

.venue__langLink {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.75);
    text-decoration: none;
}

.venue__langSep {
    color: rgba(20, 20, 20, 0.35);
}

.venue__hero {
    padding: var(--s-7) 0 var(--s-5);
}

.venue__heroTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
}

.venue__back {
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.7);
    text-decoration: none;
}

.venue__title {
    margin-top: var(--s-4);
    font-size: 40px;
}

.venue__subtitle {
    margin-top: var(--s-3);
    max-width: 75ch;
}

.venue__chips {
    margin-top: var(--s-4);
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
}

.venue__chip {
    font-size: 12px;
    font-weight: 800;
    color: rgba(20, 20, 20, 0.65);
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.7);
    padding: 0.35rem 0.55rem;
    border-radius: 999px;
}

.venue__content {
    padding: var(--s-5) 0 var(--s-9);
}

.venue__contentInner {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: var(--s-5);
    align-items: start;
}

@media (max-width: 900px) {
    .venue__contentInner {
        grid-template-columns: 1fr;
    }
}

.venue__gallery {
    height: 420px;
    background: linear-gradient(
        135deg,
        rgba(20, 20, 20, 0.06),
        rgba(20, 20, 20, 0.02)
    );
}

.venue__sidebar {
    padding: var(--s-5);
}

.venue__sideTitle {
    font-size: 18px;
    color: var(--ink);
}

.venue__link {
    display: block;
    margin-top: var(--s-3);
    font-weight: 900;
    font-size: 13px;
    color: rgba(20, 20, 20, 0.82);
    text-decoration: none;
}

.venue__muted {
    margin-top: var(--s-4);
}
.venue__img {
    width: 100%;
    height: 420px;
    object-fit: cover;
    border-radius: var(--radius);
}

.venue__credit {
    margin-top: 6px;
    font-size: 11px;
    color: rgba(20, 20, 20, 0.5);
}
</style>
