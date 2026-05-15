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

      <div class="homeHero__card card">
        <AdSlot placement="home_hero" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AdSlot from "~/components/AdSlot.vue";
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
  padding: clamp(3rem, 7vw, 6.5rem) 0 var(--s-8);
}

.homeHero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.78fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
  min-width: 0;
}

@media (max-width: 900px) {
  .homeHero__inner {
    grid-template-columns: 1fr;
  }
}

.homeHero__copy {
  min-width: 0;
}

.homeHero__copy::before {
  content: "San Miguel de Allende";
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: var(--s-5);
  padding: 0.48rem 1rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
  color: var(--ink);
  font-size: 0.94rem;
  font-weight: 500;
}

.homeHero__title {
  max-width: 14ch;
  font-size: clamp(2.8rem, 5.6vw, 4.6rem);
  letter-spacing: 0;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .homeHero__title {
    font-size: 2.65rem;
  }
}

.homeHero__subtitle {
  margin-top: var(--s-5);
  max-width: 58ch;
  color: var(--muted);
  font-size: 1.12rem;
  line-height: 1.55;
}

.homeHero__ctas {
  margin-top: var(--s-6);
  display: flex;
  gap: var(--s-3);
  flex-wrap: wrap;
}

.homeHero__card {
  padding: var(--s-7);
  min-width: 0;
  background:
    linear-gradient(135deg, rgba(110, 139, 121, 0.16), rgba(180, 87, 55, 0.08)),
    var(--surface);
  border-color: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow-lg);
}
</style>
