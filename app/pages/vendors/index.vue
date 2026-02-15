<template>
    <main class="vendors">
        <section class="vendors__hero">
            <div class="container">
                <h1 class="vendors__title">{{ t("nav.vendors") }}</h1>
                <p class="vendors__subtitle">
                    {{
                        locale === "es"
                            ? "Explora categorías de proveedores para bodas y eventos."
                            : "Browse categories of wedding and event vendors."
                    }}
                </p>
            </div>
        </section>

        <section class="vendors__section">
            <div class="container">
                <div class="vendors__grid">
                    <NuxtLink
                        v-for="c in categories"
                        :key="c.slug[locale]"
                        :to="localePath(`/vendors/${c.slug[locale]}`)"
                        class="vendors__card card"
                    >
                        <h2 class="vendors__cardTitle">
                            {{ c.label[locale] }}
                        </h2>
                        <p class="vendors__cardText">
                            {{
                                locale === "es"
                                    ? "Ver listados"
                                    : "View listings"
                            }}
                        </p>
                        <span class="vendors__cardCta"
                            >{{
                                locale === "es" ? "Explorar" : "Browse"
                            }}
                            →</span
                        >
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { VENDOR_CATEGORIES } from "../../data/taxonomies";
import type { Locale } from "~/types/i18n";

const localePath = useLocalePath();


const { t, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const categories = computed(() => VENDOR_CATEGORIES);
</script>

<style scoped>
.vendors__header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(242, 242, 240, 0.85);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
}

.vendors__headerInner {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
}

.vendors__brandName {
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 12px;
}

.vendors__nav {
    display: flex;
    align-items: center;
    gap: var(--s-4);
}

.vendors__navLink {
    font-size: 13px;
    font-weight: 800;
    color: rgba(20, 20, 20, 0.72);
    text-decoration: none;
}

.vendors__navLink--active {
    color: rgba(20, 20, 20, 0.92);
    text-decoration: underline;
    text-underline-offset: 4px;
}

.vendors__lang {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 6px 10px;
    background: var(--surface);
}

.vendors__langLink {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.75);
    text-decoration: none;
}

.vendors__langSep {
    color: rgba(20, 20, 20, 0.35);
}

.vendors__hero {
    padding: var(--s-7) 0 var(--s-5);
}

.vendors__title {
    font-size: 40px;
}

.vendors__subtitle {
    margin-top: var(--s-3);
    max-width: 70ch;
}

.vendors__section {
    padding: var(--s-5) 0 var(--s-9);
}

.vendors__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--s-4);
}

@media (max-width: 900px) {
    .vendors__grid {
        grid-template-columns: 1fr;
    }
}

.vendors__card {
    padding: var(--s-5);
    text-decoration: none;
}

.vendors__cardTitle {
    font-size: 18px;
    color: var(--ink);
}

.vendors__cardText {
    margin-top: var(--s-2);
}

.vendors__cardCta {
    display: inline-block;
    margin-top: var(--s-4);
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.8);
}
</style>
