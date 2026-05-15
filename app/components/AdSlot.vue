<template>
  <aside
      v-if="ad"
      class="ad card"
      :class="`ad--${placement}`"
      aria-label="Sponsored"
  >
    <div class="ad__inner">
      <p class="ad__kicker">{{ isEs ? "Patrocinado" : "Sponsored" }}</p>
      <h3 class="ad__title">{{ ad.creative.title }}</h3>
      <p v-if="ad.creative.body" class="ad__body">{{ ad.creative.body }}</p>

      <!-- ✅ External links use <a> -->
      <a
          v-if="cta && cta.kind === 'external'"
          :href="cta.href"
          class="ad__cta"
          target="_blank"
          rel="noreferrer"
      >
        {{ ad.creative.ctaLabel }} →
      </a>

      <!-- ✅ Internal links use NuxtLink + normalized localized route -->
      <NuxtLink
          v-else-if="cta && cta.kind === 'internal'"
          :to="cta.to"
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
import type { Locale } from "~/types/i18n";

const props = defineProps<{ placement: AdPlacement }>();

const { locale } = useI18n();
const localePath = useLocalePath();

const L = computed<Locale>(() => (locale.value as Locale) || "en");
const isEs = computed(() => L.value === "es");

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url) || /^mailto:/i.test(url) || /^tel:/i.test(url);
}

function baseSegment(l: Locale, section: "vendors" | "venues") {
  if (section === "vendors") return l === "es" ? "proveedores" : "vendors";
  return l === "es" ? "lugares-para-bodas" : "wedding-venues";
}

/**
 * ✅ Convert internal CTA urls into safe localized routes.
 * Supports:
 *  - route keys: "advertise" | "vendors" | "wedding-venues" | "index" | "blog" | "contact" | "about"
 *  - paths: "/advertise", "/vendors", "/wedding-venues", etc.
 */
function internalCtaTo(input: string) {
  const l = L.value;

  const trimmed = String(input || "").trim();
  if (!trimmed) return localePath({ name: "index" }, l);

  // 1) If the seed stores route NAMES, prefer them
  const routeKey = trimmed.replace(/^\//, ""); // "advertise" from "/advertise"
  const routeNameAllowlist = new Set([
    "index",
    "advertise",
    "vendors",
    "wedding-venues",
    "blog",
    "contact",
    "about",
  ]);

  if (routeNameAllowlist.has(routeKey)) {
    try {
      return localePath({ name: routeKey as any }, l);
    } catch {
      // fall through to path fallback
    }
  }

  // 2) Path fallback — but enforce localized base paths for known sections
  //    (prevents "/advertise" and "/vendors" leaking without "/es" prefix)
  if (routeKey === "advertise") return `/${l}/advertise`;
  if (routeKey === "vendors") return `/${l}/${baseSegment(l, "vendors")}`;
  if (routeKey === "wedding-venues") return `/${l}/${baseSegment(l, "venues")}`;
  if (routeKey === "blog") return `/${l}/blog`;
  if (routeKey === "contact") return `/${l}/contacto`; // your i18n maps this; but contact is same path in config. adjust if needed
  if (routeKey === "about") return `/${l}/acerca`;

  // 3) Generic internal path: always prefix locale if missing
  //    If it already begins with /en or /es, keep it.
  if (/^\/(en|es)(\/|$)/.test(trimmed)) return trimmed;

  return `/${l}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}

type CtaResolved =
    | { kind: "external"; href: string }
    | { kind: "internal"; to: any };

const ad = computed(() => {
  const l = (locale.value as "en" | "es") || "en";
  const matches = SEED_ADS.filter((a: any) => {
    if (!a.active) return false;
    if (a.placement !== props.placement) return false;
    if (!a.locale || a.locale === "all") return true;
    return a.locale === l;
  });

  if (!matches.length) return null;

  // simple weighted pick
  const pool = matches.flatMap((m: any) =>
      Array.from({ length: Math.max(1, m.weight ?? 1) }, () => m)
  );
  return pool[Math.floor(Math.random() * pool.length)];
});

const cta = computed<CtaResolved | null>(() => {
  if (!ad.value?.creative?.ctaUrl || !ad.value?.creative?.ctaLabel) return null;

  const url = String(ad.value.creative.ctaUrl);

  if (isExternalUrl(url)) return { kind: "external", href: url };

  return { kind: "internal", to: internalCtaTo(url) };
});
</script>


<style scoped>
.ad {
  padding: var(--s-6);
  text-decoration: none;
  border-color: rgba(255, 255, 255, 0.7);
  background:
      linear-gradient(135deg, rgba(216, 199, 173, 0.28), rgba(110, 139, 121, 0.1)),
      var(--surface);
}
.ad__kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.65;
}
.ad__title { margin-top: var(--s-2); font-size: 1.35rem; font-weight: 500; color: var(--ink); }
.ad__body { margin-top: var(--s-2); }
.ad__cta {
  display: inline-block;
  margin-top: var(--s-4);
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--accent-strong);
}
</style>
