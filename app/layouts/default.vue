<script setup lang="ts">
import { buildWebSiteJsonLd } from "~/utils/seo/website";
import { buildOrganizationJsonLd } from "~/utils/seo/organization";
import type { Locale } from "~/types/i18n";
const config = useRuntimeConfig();
const siteUrlRaw = (config.public?.siteUrl as string) || "";
const siteUrl = siteUrlRaw.replace(/\/$/, "");



const { t, locale } = useI18n();
const L = computed<Locale>(() => (locale.value as Locale) || "en");

useHead(() => {
  if (!siteUrl) return {};

  const l = L.value;

  // If you want one stable org name regardless of locale, hardcode it here.
  // If you want it localized, this is fine too.
  const orgName = t("seo.siteTitle");

  const orgId = `${siteUrl}#organization`;

  const organizationJsonLd = buildOrganizationJsonLd({
    baseUrl: siteUrl,
    orgName,
    // Optional: add these when you have them
    logoPath: "/images/logo.png",
    sameAs: [
      // "https://instagram.com/yourhandle",
      // "https://www.facebook.com/yourpage",
    ],
    areaServed: ["San Miguel de Allende", "Guanajuato", "Mexico"],
  });

  const websiteJsonLd = buildWebSiteJsonLd({
    baseUrl: siteUrl,
    siteName: t("seo.siteTitle"),
    searchTargetPath: `/${l}/search?query={search_term_string}`,
    publisherId: orgId,
  });

  return {
    script: [
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
    ],
  };
});
</script>


<template>
    <div class="layout layout--default">
        <AppHeader />
        <main class="layout__main">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>

<style scoped>
.layout__main {
    min-width: 0;
}
</style>
