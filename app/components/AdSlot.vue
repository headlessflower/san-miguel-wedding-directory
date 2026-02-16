<template>
  <aside v-if="ad" class="ad card" :class="`ad--${placement}`" aria-label="Sponsored">
    <div class="ad__inner">
      <p class="ad__kicker">{{ isEs ? "Patrocinado" : "Sponsored" }}</p>
      <h3 class="ad__title">{{ ad.creative.title }}</h3>
      <p v-if="ad.creative.body" class="ad__body">{{ ad.creative.body }}</p>

      <NuxtLink
          v-if="ad.creative.ctaUrl && ad.creative.ctaLabel"
          :to="localePath(ad.creative.ctaUrl)"
          class="ad__cta"
      >
        {{ ad.creative.ctaLabel }} →
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { SEED_ADS } from "~/data/ads.seed";
import type { AdPlacement } from "~/types/monetization";

const props = defineProps<{ placement: AdPlacement }>();

const { locale } = useI18n();
const localePath = useLocalePath();

const isEs = computed(() => locale.value === "es");

const ad = computed(() => {
  const l = (locale.value as "en" | "es") || "en";
  const matches = SEED_ADS.filter((a) => {
    if (!a.active) return false;
    if (a.placement !== props.placement) return false;
    if (!a.locale || a.locale === "all") return true;
    return a.locale === l;
  });

  if (!matches.length) return null;

  // simple weighted pick
  const pool = matches.flatMap((m) => Array.from({ length: Math.max(1, m.weight ?? 1) }, () => m));
  return pool[Math.floor(Math.random() * pool.length)];
});
</script>

<style scoped>
.ad { padding: var(--s-5); text-decoration: none; }
.ad__kicker {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.65;
}
.ad__title { margin-top: var(--s-2); font-size: 16px; color: var(--ink); }
.ad__body { margin-top: var(--s-2); }
.ad__cta {
  display: inline-block;
  margin-top: var(--s-4);
  font-size: 13px;
  font-weight: 900;
  text-decoration: none;
  color: rgba(20,20,20,0.82);
}
</style>
