<template>
  <main class="vendors">
    <section class="vendors__hero">
      <div class="container vendors__heroInner">
        <div class="vendors__heroCopy">
          <h1 class="vendors__title">{{ t("nav.vendors") }}</h1>
          <p class="vendors__subtitle">
            {{
              locale === "es"
                  ? "Explora categorías de proveedores para bodas y eventos."
                  : "Browse categories of wedding and event vendors."
            }}
          </p>
        </div>
      </div>
    </section>

    <section class="vendors__section">
      <div class="container">
        <div class="vendors__grid">
          <NuxtLink
              v-for="c in categories"
              :key="c.key"
              :to="localePath({ name: 'vendors-category', params: { category: c.slug[L] } })"
              class="vendors__card card"
          >
            <h2 class="vendors__cardTitle">
              {{ c.label[L] }}
            </h2>

            <p class="vendors__cardText">
              {{ L === "es" ? "Ver listados" : "View listings" }}
            </p>

            <span class="vendors__cardCta">
              {{ L === "es" ? "Explorar" : "Browse" }} →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { VENDOR_CATEGORIES } from "~/data/taxonomies";
import type { Locale } from "~/types/i18n";

const localePath = useLocalePath();
const { t, locale } = useI18n();

const L = computed<Locale>(() => (locale.value as Locale) || "en");

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
    position: relative;
    isolation: isolate;
    display: flex;
    align-items: center;
    min-height: clamp(25rem, 54svh, 38rem);
    padding: clamp(4rem, 7vw, 6.5rem) 0;
    overflow: hidden;
    background-image:
        linear-gradient(
            90deg,
            rgba(17, 13, 10, 0.72) 0%,
            rgba(17, 13, 10, 0.54) 38%,
            rgba(17, 13, 10, 0.22) 70%,
            rgba(17, 13, 10, 0.08) 100%
        ),
        url("/images/vendors-hero-san-miguel.jpg");
    background-size: cover;
    background-position: center right;
    background-repeat: no-repeat;
}

.vendors__heroInner {
    width: 100%;
}

.vendors__heroCopy {
    max-width: min(44rem, 100%);
}

.vendors__heroCopy::before {
    content: "San Miguel de Allende";
    display: inline-flex;
    align-items: center;
    margin-bottom: var(--s-5);
    padding: 0.48rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.36);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(12px);
    font-size: 0.94rem;
    font-weight: 500;
}

.vendors__title {
    font-size: clamp(2.7rem, 6vw, 4.6rem);
    font-weight: 500;
    color: #fff;
    text-wrap: balance;
}

.vendors__subtitle {
    margin-top: var(--s-4);
    max-width: 52ch;
    color: rgba(255, 255, 255, 0.84);
    font-size: 1.08rem;
    line-height: 1.55;
}

.vendors__section {
    padding: var(--s-8) 0 var(--s-9);
}

@media (max-width: 760px) {
    .vendors__hero {
        min-height: clamp(27rem, 62svh, 34rem);
        background-image:
            linear-gradient(
                180deg,
                rgba(17, 13, 10, 0.76) 0%,
                rgba(17, 13, 10, 0.58) 52%,
                rgba(17, 13, 10, 0.22) 100%
            ),
            url("/images/vendors-hero-san-miguel.jpg");
        background-position: 58% center;
    }
}

@media (max-width: 640px) {
    .vendors__hero {
        min-height: clamp(24rem, 60svh, 32rem);
    }

    .vendors__title {
        font-size: clamp(2.3rem, 12vw, 3.4rem);
    }

    .vendors__section {
        padding: var(--s-5) 0 var(--s-8);
    }
}

.vendors__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--s-5);
}

@media (max-width: 900px) {
    .vendors__grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .vendors__grid {
        gap: var(--s-4);
    }

    .vendors__card {
        padding: var(--s-5);
    }
}

.vendors__card {
    padding: var(--s-7);
    text-decoration: none;
    border-color: rgba(255, 255, 255, 0.7);
    transition:
        transform 180ms var(--ease),
        box-shadow 180ms var(--ease);
}

.vendors__card:hover {
    transform: translateY(-3px);
}

.vendors__cardTitle {
    font-size: 1.45rem;
    font-weight: 500;
    color: var(--ink);
}

.vendors__cardText {
    margin-top: var(--s-2);
}

.vendors__cardCta {
    display: inline-block;
    margin-top: var(--s-4);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--accent-strong);
}
</style>
