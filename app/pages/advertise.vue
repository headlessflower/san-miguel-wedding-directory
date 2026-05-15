<template>
  <main class="ad">
    <section class="ad__hero">
      <div class="container">
        <h1 class="ad__title">{{ isEs ? "Publicidad y promoción" : "Advertising & promotion" }}</h1>
        <p class="ad__subtitle">
          {{
            isEs
                ? "Destaca tu negocio en el directorio: planes mensuales o impulsos por 90 días."
                : "Boost your listing in the directory with monthly plans or 90-day boosts."
          }}
        </p>
      </div>
    </section>

    <section class="ad__section">
      <div class="container">
        <h2 class="ad__sectionTitle">{{ groups.headings.monthly }}</h2>

        <div class="ad__grid">
          <article v-for="p in groups.monthly" :key="p.key" class="ad__card card" :class="p.recommended ? 'ad__card--rec' : ''">
            <div class="ad__cardTop">
              <span v-if="p.tier === 'sponsored'" class="badge badge--sponsored">{{ isEs ? "Patrocinado" : "Sponsored" }}</span>
              <span v-else class="badge badge--featured">{{ isEs ? "Destacado" : "Featured" }}</span>

              <span v-if="p.recommended" class="ad__rec">
                {{ isEs ? "Recomendado" : "Recommended" }}
              </span>
            </div>

            <h3 class="ad__cardTitle">{{ p.label[L] }}</h3>
            <p class="ad__cardBlurb">{{ p.blurb[L] }}</p>

            <div class="ad__price">
              <span class="ad__priceNum">${{ p.priceUsd }}</span>
              <span class="ad__priceUnit">{{ isEs ? "/ mes" : "/ month" }}</span>
            </div>

            <ul class="ad__bullets">
              <li v-for="(b, i) in p.bullets[L]" :key="i">{{ b }}</li>
            </ul>

            <a class="ad__cta btn btn--primary" href="#lead">
              {{ isEs ? "Solicitar" : "Request" }}
            </a>
          </article>
        </div>
      </div>
    </section>

    <section class="ad__section">
      <div class="container">
        <h2 class="ad__sectionTitle">{{ groups.headings.boost90 }}</h2>

        <div class="ad__grid">
          <article v-for="p in groups.boost90" :key="p.key" class="ad__card card">
            <div class="ad__cardTop">
              <span v-if="p.tier === 'sponsored'" class="badge badge--sponsored">{{ isEs ? "Patrocinado" : "Sponsored" }}</span>
              <span v-else class="badge badge--featured">{{ isEs ? "Destacado" : "Featured" }}</span>
            </div>

            <h3 class="ad__cardTitle">{{ p.label[L] }}</h3>
            <p class="ad__cardBlurb">{{ p.blurb[L] }}</p>

            <div class="ad__price">
              <span class="ad__priceNum">${{ p.priceUsd }}</span>
              <span class="ad__priceUnit">{{ isEs ? "/ 90 días" : "/ 90 days" }}</span>
            </div>

            <ul class="ad__bullets">
              <li v-for="(b, i) in p.bullets[L]" :key="i">{{ b }}</li>
            </ul>

            <a class="ad__cta btn" href="#lead">
              {{ isEs ? "Solicitar" : "Request" }}
            </a>
          </article>
        </div>
      </div>
    </section>

    <section id="lead" class="ad__section">
      <div class="container">
        <div class="ad__lead card">
          <AdvertiseLeadForm :locale="L" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/i18n";
import { groupPackagesByCadence } from "~/data/monetization.packages";

const { locale } = useI18n();
const L = computed<Locale>(() => (locale.value as Locale) || "en");
const isEs = computed(() => L.value === "es");

const groups = computed(() => groupPackagesByCadence(L.value));

useSeoMeta(() => {
  const title = isEs.value ? "Publicidad • Directorio de bodas" : "Advertise • Wedding directory";
  const description = isEs.value
      ? "Planes mensuales e impulsos de 90 días para destacar tu negocio en el directorio."
      : "Monthly plans and 90-day boosts to promote your business in the directory.";

  return { title, description, ogTitle: title, ogDescription: description };
});
</script>

<style scoped>
.ad__hero {
  padding: var(--s-9) 0 var(--s-6);
}

.ad__title {
  font-size: 44px;
  letter-spacing: -0.02em;
}

@media (max-width: 640px) {
  .ad__title {
    font-size: 36px;
  }
}

.ad__subtitle {
  margin-top: var(--s-3);
  max-width: 75ch;
}

.ad__section {
  padding: var(--s-7) 0;
}

.ad__sectionTitle {
  font-size: 22px;
  color: var(--ink);
}

.ad__grid {
  margin-top: var(--s-5);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s-4);
}

@media (max-width: 900px) {
  .ad__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.ad__card {
  padding: var(--s-6);
}

.ad__card--rec {
  outline: 2px solid rgba(20, 20, 20, 0.12);
}

.ad__cardTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
}

.ad__rec {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.7);
}

.ad__cardTitle {
  margin-top: var(--s-4);
  font-size: 18px;
  color: var(--ink);
}

.ad__cardBlurb {
  margin-top: var(--s-2);
}

.ad__price {
  margin-top: var(--s-4);
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.ad__priceNum {
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.ad__priceUnit {
  font-size: 13px;
  font-weight: 900;
  color: rgba(20, 20, 20, 0.6);
}

.ad__bullets {
  margin-top: var(--s-4);
  padding-left: 18px;
  display: grid;
  gap: 8px;
}

.ad__cta {
  margin-top: var(--s-5);
  width: 100%;
  text-align: center;
}

.ad__lead {
  padding: 0;
}

/* sponsored badge (if not already global) */
.badge--sponsored {
  background: rgba(202, 137, 95, 0.22);
  border: 1px solid var(--border);
  color: rgba(20, 20, 20, 0.82);
}

@media (max-width: 640px) {
  .ad__hero {
    padding: var(--s-7) 0 var(--s-5);
  }

  .ad__title {
    font-size: clamp(2.2rem, 12vw, 3.2rem);
    letter-spacing: 0;
  }

  .ad__section {
    padding: var(--s-6) 0;
  }

  .ad__grid {
    grid-template-columns: 1fr;
  }

  .ad__card {
    padding: var(--s-5);
  }

  .ad__cardTop,
  .ad__price {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
