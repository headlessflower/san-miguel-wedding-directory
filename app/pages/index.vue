<template>
    <main class="home">
        <section class="home__hero">
            <div class="container home__heroInner">
                <div class="home__heroCopy">
                    <h1 class="home__heroTitle">{{ t("home.heroTitle") }}</h1>
                    <p class="home__heroSubtitle">
                        {{ t("home.heroSubtitle") }}
                    </p>

                    <div class="home__heroCtas">
                        <NuxtLink
                            :to="localePath('/wedding-venues')"
                            class="btn btn--primary"
                        >
                            {{ t("home.primaryCta") }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('/vendors')" class="btn">
                            {{ t("home.secondaryCta") }}
                        </NuxtLink>
                    </div>
                </div>

                <div class="home__heroCard card">
                    <div class="home__heroCardTop">
                        <span class="badge badge--featured">{{
                            t("directory.featured")
                        }}</span>
                    </div>
                    <div class="home__heroCardBody">
                        <p class="home__heroCardKicker">
                            {{
                                locale === "es"
                                    ? "Ejemplo de listado"
                                    : "Example listing"
                            }}
                        </p>
                        <p class="home__heroCardTitle">
                            {{
                                locale === "es"
                                    ? "Hacienda (Demo)"
                                    : "Hacienda (Demo)"
                            }}
                        </p>
                        <p class="home__heroCardText">
                            {{
                                locale === "es"
                                    ? "Aquí irá una descripción breve del lugar."
                                    : "A short venue description will live here."
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="home__section">
            <div class="container">
                <div class="home__sectionHead">
                    <h2 class="home__sectionTitle">
                        {{ t("home.featuredVenues") }}
                    </h2>
                    <NuxtLink
                        :to="localePath('/wedding-venues')"
                        class="home__sectionLink"
                    >
                        {{ locale === "es" ? "Ver todos" : "View all" }}
                    </NuxtLink>
                </div>
                <div class="home__grid">
                    <NuxtLink
                        v-for="v in featuredVenues"
                        :key="v.slug"
                        :to="localePath(`/wedding-venues/${v.slug}`)"
                        class="home__card card"
                    >
                        <div class="home__cardMedia" aria-hidden="true"></div>

                        <div class="home__cardBody">
                            <div class="home__cardTop">
                                <span class="badge badge--featured">
                                    {{ t("directory.featured") }}
                                </span>

                                <span v-if="v.luxuryTier" class="home__tier">
                                    {{ v.luxuryTier.toUpperCase() }}
                                </span>
                            </div>

                            <h3 class="home__cardTitle">
                                {{ v.name[locale] }}
                            </h3>

                            <p class="home__cardText">
                                {{ v.description[locale] }}
                            </p>

                            <div class="home__cardMeta">
                                <span
                                    v-if="v.capacitySeated"
                                    class="home__metaItem"
                                >
                                    {{
                                        locale === "es"
                                            ? "Capacidad"
                                            : "Capacity"
                                    }}:
                                    {{ v.capacitySeated }}
                                </span>

                                <span v-if="v.venueType" class="home__metaItem">
                                    {{ v.venueType.replace("_", " ") }}
                                </span>
                            </div>

                            <span class="home__cardCta">
                                {{ t("directory.viewDetails") }} →
                            </span>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <section class="home__section">
            <div class="container">
                <div class="home__sectionHead">
                    <h2 class="home__sectionTitle">
                        {{ t("home.browseByCategory") }}
                    </h2>
                    <NuxtLink
                        :to="localePath('/vendors')"
                        class="home__sectionLink"
                    >
                        {{ locale === "es" ? "Explorar" : "Browse" }}
                    </NuxtLink>
                </div>

                <div class="home__cats">
                    <NuxtLink
                        v-for="c in vendorCategoryCards"
                        :key="c.slug[locale]"
                        :to="localePath(`/vendors/${c.slug[locale]}`)"
                        class="home__cat card"
                    >
                        <h3 class="home__catTitle">{{ c.label[locale] }}</h3>
                        <p class="home__catText">
                            {{
                                locale === "es"
                                    ? "Ver proveedores"
                                    : "Browse vendors"
                            }}
                        </p>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { VENDOR_CATEGORIES } from "~/data/taxonomies";

type Locale = "en" | "es";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const { getVenues } = useListings();

const featuredVenues = computed(() => {
    return getVenues()
        .filter((v) => v.featured)
        .sort((a, b) => {
            // luxury tier priority
            const order = { luxury: 4, upper: 3, mid: 2, budget: 1 };
            return (
                (order[b.luxuryTier ?? "mid"] || 0) -
                (order[a.luxuryTier ?? "mid"] || 0)
            );
        })
        .slice(0, 3);
});

const vendorCategoryCards = computed(() => VENDOR_CATEGORIES.slice(0, 6));
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
    padding: var(--s-7) 0;
}

.home__sectionHead {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--s-4);
    margin-bottom: var(--s-4);
    min-width: 0;
}

.home__sectionTitle {
    font-size: 24px;
    min-width: 0;
}

.home__sectionLink {
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.65);
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
    gap: var(--s-4);
}

@media (max-width: 900px) {
    .home__cats {
        grid-template-columns: 1fr;
    }
}

.home__cat {
    padding: var(--s-5);
    text-decoration: none;
    display: block;
    min-width: 0;
}

.home__catTitle {
    font-size: 18px;
    color: var(--ink);
    overflow-wrap: anywhere;
}

.home__catText {
    margin-top: var(--s-2);
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
