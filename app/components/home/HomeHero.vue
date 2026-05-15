<template>
  <section class="homeHero">
    <div class="container homeHero__inner">
      <div class="homeHero__copy">
        <h1 class="homeHero__title">{{ t("home.heroTitle") }}</h1>
        <p class="homeHero__subtitle">{{ t("home.heroSubtitle") }}</p>

        <div class="homeHero__ctas">
          <NuxtLink :to="venuesTo" class="btn btn--primary">
            {{ t("home.primaryCta") }}
          </NuxtLink>

          <NuxtLink :to="vendorsTo" class="btn">
            {{ t("home.secondaryCta") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/i18n";

const { t, locale } = useI18n();
const localePath = useLocalePath();

const L = computed<Locale>(() => (locale.value as Locale) || "en");

const venuesTo = computed(() => {
  const l = L.value;
  try {
    return localePath({ name: "wedding-venues" }, l);
  } catch {
    return `/${l}/${l === "es" ? "lugares-para-bodas" : "wedding-venues"}`;
  }
});

const vendorsTo = computed(() => {
  const l = L.value;
  try {
    return localePath({ name: "vendors" }, l);
  } catch {
    return `/${l}/${l === "es" ? "proveedores" : "vendors"}`;
  }
});
</script>


<style scoped>
.homeHero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  min-height: clamp(34rem, 78svh, 50rem);
  padding: clamp(4.5rem, 8vw, 7.5rem) 0 clamp(3.5rem, 7vw, 6.5rem);
  overflow: hidden;
  background-image:
    linear-gradient(
      90deg,
      rgba(17, 13, 10, 0.76) 0%,
      rgba(17, 13, 10, 0.58) 38%,
      rgba(17, 13, 10, 0.24) 68%,
      rgba(17, 13, 10, 0.08) 100%
    ),
    url("/images/home-hero-san-miguel.jpg");
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
}

.homeHero__inner {
  width: 100%;
  min-width: 0;
}

.homeHero__copy {
  max-width: min(46rem, 100%);
  min-width: 0;
}

.homeHero__copy::before {
  content: "San Miguel de Allende";
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
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

.homeHero__title {
  max-width: 14ch;
  font-size: clamp(2.8rem, 5.6vw, 4.6rem);
  color: #fff;
  letter-spacing: 0;
  line-height: 1.05;
  text-wrap: balance;
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .homeHero__title {
    font-size: 2.55rem;
  }
}

.homeHero__subtitle {
  margin-top: var(--s-5);
  max-width: 58ch;
  color: rgba(255, 255, 255, 0.84);
  font-size: 1.12rem;
  line-height: 1.55;
}

.homeHero__ctas {
  margin-top: var(--s-6);
  display: flex;
  gap: var(--s-3);
  flex-wrap: wrap;
}

.homeHero__ctas :deep(.btn:not(.btn--primary)) {
  border-color: rgba(255, 255, 255, 0.44);
  background: rgba(255, 255, 255, 0.9);
  color: var(--ink);
}

@media (max-width: 760px) {
  .homeHero {
    min-height: clamp(38rem, 86svh, 46rem);
    padding-top: clamp(4rem, 14vw, 6rem);
    background-image:
      linear-gradient(
        180deg,
        rgba(17, 13, 10, 0.78) 0%,
        rgba(17, 13, 10, 0.62) 48%,
        rgba(17, 13, 10, 0.28) 100%
      ),
      url("/images/home-hero-san-miguel.jpg");
    background-position: 62% center;
  }

  .homeHero__subtitle {
    font-size: 1.04rem;
  }
}

@media (max-width: 420px) {
  .homeHero {
    min-height: 40rem;
    background-position: 66% center;
  }

  .homeHero__ctas {
    flex-direction: column;
    align-items: stretch;
  }

  .homeHero__ctas :deep(.btn) {
    justify-content: center;
    width: 100%;
  }
}
</style>
