<template>
  <span v-if="label" class="feat" :class="cls">{{ label }}</span>
</template>

<script setup lang="ts">
import type { FeaturedTier } from "~/types/monetization";
import type { Locale } from "~/types/i18n";

const props = defineProps<{
  tier?: FeaturedTier;
  locale: Locale;
}>();

const label = computed(() => {
  if (!props.tier || props.tier === "standard") return "";
  if (props.tier === "featured") return props.locale === "es" ? "Destacado" : "Featured";
  return props.locale === "es" ? "Patrocinado" : "Sponsored";
});

const cls = computed(() => {
  if (!props.tier) return "";
  return `feat--${props.tier}`;
});
</script>

<style scoped>
.feat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.75);
  color: rgba(20,20,20,0.8);
}
.feat--featured {
  background: rgba(227, 210, 111, 0.28);
}
.feat--sponsored {
  background: rgba(202, 137, 95, 0.22);
}
</style>
