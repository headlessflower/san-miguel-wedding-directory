<template>
  <section class="homeHero">
    <NuxtImg
      class="homeHero__image"
      src="/images/home-hero-san-miguel.jpg"
      alt=""
      width="1672"
      height="941"
      sizes="100vw"
      format="webp"
      preload
      loading="eager"
      fetchpriority="high"
      aria-hidden="true"
    />
    <div class="container homeHero__inner">
      <div class="homeHero__copy">
        <p class="homeHero__eyebrow">
          {{ L === "es" ? "San Miguel de Allende · La edición de bodas" : "San Miguel de Allende · The wedding edit" }}
        </p>
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
  align-items: flex-end;
  min-height: clamp(38rem, 76svh, 53rem);
  padding: clamp(6rem, 10vw, 9rem) 0 clamp(3rem, 6vw, 5rem);
  overflow: hidden;
  background-image: linear-gradient(
      90deg,
      rgba(17, 13, 10, 0.82) 0%,
      rgba(17, 13, 10, 0.65) 38%,
      rgba(17, 13, 10, 0.28) 68%,
      rgba(17, 13, 10, 0.08) 82%,
      rgba(17, 13, 10, 0.06) 100%
    );
}

.homeHero__image {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center right;
}

.homeHero__inner {
  width: 100%;
  min-width: 0;
}

.homeHero__copy {
  max-width: min(50rem, 100%);
  min-width: 0;
}

.homeHero__eyebrow {
  margin-bottom: var(--s-5);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.homeHero__title {
  max-width: 13ch;
  font-size: clamp(3.2rem, 6.5vw, 6.2rem);
  color: #fff;
  letter-spacing: -0.035em;
  line-height: 0.94;
  text-wrap: balance;
  overflow-wrap: anywhere;
  text-shadow: none;
}

@media (max-width: 640px) {
  .homeHero__title {
    font-size: 2.55rem;
  }
}

.homeHero__subtitle {
  margin-top: var(--s-5);
  max-width: 50ch;
  color: rgba(255, 255, 255, 0.84);
  font-size: 1.06rem;
  line-height: 1.55;
  text-shadow: none;
}

.homeHero__ctas {
  margin-top: var(--s-6);
  display: flex;
  gap: var(--s-3);
  flex-wrap: wrap;
}

.homeHero__ctas :deep(.btn:not(.btn--primary)) {
  border-color: rgba(255, 255, 255, 0.72);
  background: transparent;
  color: #fff;
}

@media (max-width: 760px) {
  .homeHero {
    min-height: clamp(38rem, 86svh, 46rem);
    padding-top: clamp(4rem, 14vw, 6rem);
    background-image: linear-gradient(
        180deg,
        rgba(17, 13, 10, 0.84) 0%,
        rgba(17, 13, 10, 0.72) 48%,
        rgba(17, 13, 10, 0.42) 100%
      );
  }

  .homeHero__image {
    object-position: 62% center;
  }

  .homeHero__subtitle {
    font-size: 1.04rem;
  }
}

@media (max-width: 420px) {
  .homeHero {
    min-height: 40rem;
  }

  .homeHero__image {
    object-position: 66% center;
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
