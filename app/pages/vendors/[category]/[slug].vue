<template>
    <main class="vendor">
        <section class="vendor__gallerySection">
            <div class="container">
                <NuxtLink
                    :to="localePath({ name: 'vendors-category', params: { category: category.slug[L] } })"
                    class="vendor__back"
                >
                    ← {{ locale === "es" ? "Regresar" : "Back" }}
                </NuxtLink>

                <div class="detailGallery" aria-label="Vendor media">
                    <div
                        v-for="slot in gallerySlots"
                        :key="slot.key"
                        class="detailGallery__item"
                        :class="`detailGallery__item--${slot.key}`"
                    >
                        <img
                            v-if="slot.image"
                            :src="slot.image.src"
                            :alt="slot.image.alt?.[L] || ''"
                            class="detailGallery__img"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section class="vendor__content">
            <div class="container vendor__contentInner">
              <article class="vendor__panel card">
                <div class="vendor__panelHead">
                  <span class="badge">
                    {{ vendor.featured ? t("directory.featured") : categoryLabel }}
                  </span>

                  <span class="vendor__categoryPill">{{ categoryLabel }}</span>
                </div>

                <h1 class="vendor__title">{{ vendor.name[L] }}</h1>
                <p class="vendor__subtitle">{{ vendor.description[L] }}</p>

                <div class="vendor__facts">
                  <span v-if="primaryLocation" class="vendor__fact">
                    <span class="vendor__factIcon">⌖</span>
                    {{ primaryLocation }}
                  </span>
                  <span v-if="vendor.email" class="vendor__fact">
                    <span class="vendor__factIcon">✉</span>
                    {{ vendor.email }}
                  </span>
                  <span v-if="vendor.phone" class="vendor__fact">
                    <span class="vendor__factIcon">☎</span>
                    {{ vendor.phone }}
                  </span>
                  <span class="vendor__fact">
                    <span class="vendor__factIcon">◇</span>
                    {{ categoryLabel }}
                  </span>
                </div>

                <section class="vendor__about">
                  <h2 class="vendor__sectionTitle">
                    {{ L === "es" ? "Sobre el proveedor" : "About the vendor" }}
                  </h2>
                  <p class="vendor__bodyText">{{ vendor.description[L] }}</p>
                </section>

                <section v-if="serviceAreas.length" class="vendor__about">
                  <h2 class="vendor__sectionTitle">
                    {{ L === "es" ? "Zonas de servicio" : "Service areas" }}
                  </h2>
                  <div class="vendor__areas">
                    <span v-for="area in serviceAreas" :key="area" class="vendor__area">
                      {{ area }}
                    </span>
                  </div>
                </section>
              </article>

                <aside class="vendor__side">
                  <div class="vendor__priceCard">
                    <span class="badge">{{ L === "es" ? "Categoría" : "Category" }}</span>
                    <strong>{{ categoryLabel }}</strong>
                  </div>

                  <form class="vendor__form card" @submit.prevent>
                    <h2 class="vendor__sideTitle">
                      {{ L === "es" ? "Solicita disponibilidad" : "Schedule a consultation" }}
                    </h2>
                    <p class="vendor__sideText">
                      {{
                        L === "es"
                            ? "Comparte tu fecha y estilo de boda para confirmar disponibilidad y próximos pasos."
                            : "Share your wedding date and style to confirm availability and next steps."
                      }}
                    </p>

                    <label class="vendor__label">
                      {{ L === "es" ? "Tu nombre" : "Your Name" }}
                      <input :placeholder="L === 'es' ? 'Nombre completo' : 'Full Name'" />
                    </label>
                    <input :placeholder="L === 'es' ? 'Tu correo' : 'Your Mail'" type="email" />
                    <input :placeholder="L === 'es' ? 'Teléfono' : 'Phone Number'" type="tel" />
                    <textarea :placeholder="L === 'es' ? 'Mensaje' : 'Your Message'"></textarea>
                    <button class="btn btn--primary vendor__submit" type="submit">
                      {{ L === "es" ? "Enviar" : "Submit" }}
                    </button>
                  </form>

                  <div class="vendor__contact card">
                    <span class="badge">
                      {{ locale === "es" ? "Contacto" : "Contact Information" }}
                    </span>

                    <div class="vendor__contactName">
                      <span class="vendor__avatar" aria-hidden="true"></span>
                      <h2 class="vendor__sideTitle">
                        {{ vendor.name[L] }}
                        </h2>
                    </div>

                        <a
                            v-if="vendor.website"
                            :href="vendor.website"
                            target="_blank"
                            rel="noreferrer"
                            class="vendor__link"
                        >
                            {{ t("directory.website") }} →
                        </a>
                        <a
                            v-if="vendor.instagram"
                            :href="vendor.instagram"
                            target="_blank"
                            rel="noreferrer"
                            class="vendor__link"
                        >
                            {{ t("directory.instagram") }} →
                        </a>
                    <a
                        v-if="vendor.email"
                        :href="`mailto:${vendor.email}`"
                        class="vendor__link"
                    >
                      {{ vendor.email }}
                    </a>
                    <a
                        v-if="vendor.phone"
                        :href="`tel:${vendor.phone}`"
                        class="vendor__link"
                    >
                      {{ vendor.phone }}
                    </a>

                        <p
                            v-if="!vendor.website && !vendor.instagram"
                            class="vendor__muted"
                        >
                            {{
                                locale === "es"
                                    ? "Agrega enlaces cuando cargues datos reales."
                                    : "Add links once real data is added."
                            }}
                        </p>
                  </div>

              <div class="vendor__claim card">
                <template v-if="!vendor.isClaimed">
                  <h3 class="vendor__claimTitle">
                    {{ L === "es" ? "¿Eres el dueño?" : "Own this business?" }}
                  </h3>
                  <p class="vendor__claimText">
                    {{
                      L === "es"
                          ? "Reclama este perfil para editar información y destacar tu negocio."
                          : "Claim this listing to update information and upgrade visibility."
                    }}
                  </p>

                  <NuxtLink
                      :to="localePath({ name: 'advertise' })"
                      class="btn btn--primary vendor__claimBtn"
                  >
                    {{ L === "es" ? "Reclamar perfil" : "Claim listing" }}
                  </NuxtLink>
                </template>

                <template v-else>
                  <h3 class="vendor__claimTitle">
                    {{ L === "es" ? "Mejora tu visibilidad" : "Boost your visibility" }}
                  </h3>
                  <p class="vendor__claimText">
                    {{
                      L === "es"
                          ? "Destaca tu negocio en los primeros lugares del directorio."
                          : "Upgrade to Featured or Sponsored placement."
                    }}
                  </p>

                  <NuxtLink
                      :to="localePath({ name: 'advertise' })"
                      class="btn vendor__claimBtn"
                  >
                    {{ L === "es" ? "Ver opciones" : "View options" }}
                  </NuxtLink>
                </template>
              </div>
                </aside>

            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
// pages/vendors/[category]/[slug].vue (script setup)
// DROP-IN replacement (fixes /es/vendors/* links + prerender-safe 404s)
// pages/vendors/[category]/[slug].vue (script setup)
// Definitive version: localized links, prerender-safe, canonical redirects, no /es/vendors leaks

import { getVendorCategoryBySlug, normalizeSlug } from "~/data/taxonomies";
import { buildBreadcrumbListJsonLd } from "~/utils/seo/breadcrumbs";
import AdSlot from "~/components/AdSlot.vue";
import type { Locale } from "~/types/i18n";

const localePath = useLocalePath();

const { t, locale } = useI18n();
const route = useRoute();

const siteUrl = (useRuntimeConfig().public?.siteUrl as string) || "";
const L = computed<Locale>(() => (locale.value as Locale) || "en");

const { getVendorByCategoryKeyAndSlug } = useListings();

// ---------- Path fallbacks (guarantee correct base in es/en) ----------
function vendorsBase(l: Locale) {
  return l === "es" ? "proveedores" : "vendors";
}
function vendorsIndexFallback(l: Locale) {
  return `/${l}/${vendorsBase(l)}`;
}
function categoryFallback(l: Locale, categorySlug: string) {
  return `/${l}/${vendorsBase(l)}/${categorySlug}`;
}
function vendorFallback(l: Locale, categorySlug: string, vendorSlug: string) {
  return `/${l}/${vendorsBase(l)}/${categorySlug}/${vendorSlug}`;
}

// ---------- Resolve category once ----------
const categoryParam = computed(() => String(route.params.category || ""));
const vendorParam = computed(() => String(route.params.slug || ""));

const resolvedCategory = computed(() => {
  const found = getVendorCategoryBySlug(L.value, categoryParam.value);
  return found ?? null;
});

// Expose for template
const category = resolvedCategory;

// ---------- Resolve vendor once (depends on category) ----------
const resolvedVendor = computed(() => {
  if (!resolvedCategory.value) return null;
  const found = getVendorByCategoryKeyAndSlug(resolvedCategory.value.key, vendorParam.value);
  return found ?? null;
});

// Expose for template
const vendor = resolvedVendor;

const displayImages = computed(() => {
  return (vendor.value?.images ?? []).filter((image: any) => {
    return image?.src && !String(image.src).startsWith("/images/");
  });
});

const gallerySlots = computed(() => {
  const slots = ["hero", "wide", "topA", "topB", "bottomA", "bottomB"];
  return slots.map((key, index) => ({
    key,
    image: displayImages.value[index] ?? null,
  }));
});

const categoryLabel = computed(() => {
  return category.value?.label?.[L.value] ?? "";
});

const serviceAreas = computed(() => vendor.value?.serviceAreas?.[L.value] ?? []);

const primaryLocation = computed(() => {
  const address = vendor.value?.address;
  if (address?.city) return [address.city, address.region].filter(Boolean).join(", ");
  return serviceAreas.value[0] ?? "San Miguel de Allende";
});

// ---------- Canonical redirects + runtime 404 (never during prerender) ----------
if (!import.meta.prerender) {
  // Category must exist at runtime/SSR
  if (!category.value) {
    throw createError({ statusCode: 404, statusMessage: "Category not found" });
  }

  // Vendor must exist at runtime/SSR
  if (!vendor.value) {
    throw createError({ statusCode: 404, statusMessage: "Vendor not found" });
  }

  // Redirect if incoming category slug doesn't match the canonical slug for this locale
  const incomingCat = categoryParam.value;
  const canonicalCat = category.value.slug[L.value];

  // NOTE: vendor slugs aren't localized in your seed currently; we still normalize for safety.
  const incomingVendor = vendorParam.value;
  const canonicalVendor = vendor.value.slug;

  const needsCatRedirect = normalizeSlug(incomingCat) !== normalizeSlug(canonicalCat);
  const needsVendorRedirect = normalizeSlug(incomingVendor) !== normalizeSlug(canonicalVendor);

  if (needsCatRedirect || needsVendorRedirect) {
    const to = (() => {
      try {
        return localePath(
            {
              name: "vendors-category-slug",
              params: { category: canonicalCat, slug: canonicalVendor },
            },
            L.value
        );
      } catch {
        return vendorFallback(L.value, canonicalCat, canonicalVendor);
      }
    })();

    await navigateTo(to, { redirectCode: 301 });
  }
}
// During prerender, do not throw; template must guard v-if="category && vendor".

// ---------- Link helpers (for template/breadcrumbs/json-ld) ----------
const vendorsIndexTo = computed(() => {
  const l = L.value;
  try {
    return localePath({ name: "vendors" }, l);
  } catch {
    return vendorsIndexFallback(l);
  }
});

const categoryTo = computed(() => {
  const l = L.value;
  if (!category.value) return vendorsIndexTo.value;

  const catSlug = category.value.slug[l];
  try {
    return localePath({ name: "vendors-category", params: { category: catSlug } }, l);
  } catch {
    return categoryFallback(l, catSlug);
  }
});

const vendorTo = computed(() => {
  const l = L.value;
  if (!category.value || !vendor.value) return vendorsIndexTo.value;

  const catSlug = category.value.slug[l];
  const vSlug = vendor.value.slug;

  try {
    return localePath(
        { name: "vendors-category-slug", params: { category: catSlug, slug: vSlug } },
        l
    );
  } catch {
    return vendorFallback(l, catSlug, vSlug);
  }
});

// ---------- SEO meta (guard nulls for prerender) ----------
const seoTitle = computed(() => {
  if (!vendor.value) return t("seo.siteTitle");
  return `${vendor.value.name[L.value]} • ${t("seo.siteTitle")}`;
});

const seoDescription = computed(() => {
  if (!vendor.value) {
    return L.value === "es"
        ? "Proveedor de bodas en San Miguel de Allende."
        : "Wedding vendor in San Miguel de Allende.";
  }
  return vendor.value.description?.[L.value] ?? "";
});

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});

// ---------- JSON-LD: breadcrumbs + LocalBusiness ----------
useHead(() => {
  if (!category.value || !vendor.value) return {};

  const baseUrl = siteUrl || undefined;
  const l = L.value;

  const v = vendor.value;
  const c = category.value;

  const idxPath = vendorsIndexTo.value;
  const cPath = categoryTo.value;
  const vPath = vendorTo.value;

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd({
    baseUrl,
    items: [
      { name: l === "es" ? "Inicio" : "Home", urlPath: `/${l}/` },
      { name: l === "es" ? "Proveedores" : "Vendors", urlPath: idxPath },
      { name: c.label[l], urlPath: cPath },
      { name: v.name[l], urlPath: vPath },
    ],
  });

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: v.name[l],
    description: v.description[l],
    ...(baseUrl ? { url: `${baseUrl}${vPath}` } : {}),
    ...(v.phone ? { telephone: v.phone } : {}),
    ...(v.email ? { email: v.email } : {}),
    ...(v.website || v.instagram
        ? { sameAs: [v.website, v.instagram].filter(Boolean) }
        : {}),
  };

  return {
    script: [
      {
        key: `jsonld-breadcrumbs-vendor-${v.id}-${l}`,
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd),
      },
      {
        key: `jsonld-localbusiness-${v.id}-${l}`,
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
    ],
  };
});

</script>

<style scoped>
.vendor {
    padding-top: var(--s-7);
}

.vendor__gallerySection {
    padding: var(--s-7) 0 var(--s-8);
}

.vendor__back {
    display: inline-flex;
    margin-bottom: var(--s-5);
    color: var(--accent-strong);
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
}

.detailGallery {
    display: grid;
    grid-template-columns: 1.45fr 0.58fr 0.58fr;
    grid-template-rows: 220px 220px;
    gap: var(--s-5);
}

.detailGallery__item {
    overflow: hidden;
    border-radius: 24px;
    background:
        linear-gradient(135deg, rgba(110, 139, 121, 0.18), rgba(216, 199, 173, 0.22)),
        var(--surface-soft);
}

.detailGallery__item--hero {
    grid-column: 1;
    grid-row: 1;
}

.detailGallery__item--wide {
    grid-column: 1;
    grid-row: 2;
}

.detailGallery__item--topA {
    grid-column: 2;
    grid-row: 1;
}

.detailGallery__item--topB {
    grid-column: 3;
    grid-row: 1;
}

.detailGallery__item--bottomA {
    grid-column: 2;
    grid-row: 2;
}

.detailGallery__item--bottomB {
    grid-column: 3;
    grid-row: 2;
}

.detailGallery__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.vendor__content {
    padding: 0 0 var(--s-9);
}

.vendor__contentInner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
    gap: var(--s-5);
    align-items: start;
}

.vendor__panel,
.vendor__form,
.vendor__contact,
.vendor__claim {
    border-color: rgba(255, 255, 255, 0.72);
}

.vendor__panel {
    padding: clamp(1.5rem, 4vw, 3rem);
}

.vendor__panelHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
}

.vendor__categoryPill {
    padding: 0.45rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--agave);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.vendor__title {
    margin-top: var(--s-5);
    font-size: clamp(2rem, 4vw, 3.35rem);
    font-weight: 500;
}

.vendor__subtitle {
    margin-top: var(--s-4);
    color: var(--muted);
    font-size: 1.1rem;
    line-height: 1.55;
}

.vendor__facts {
    margin-top: var(--s-6);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--s-4);
}

.vendor__fact {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
    color: var(--muted);
    font-size: 1.02rem;
    overflow-wrap: anywhere;
}

.vendor__factIcon {
    color: var(--agave);
    font-weight: 700;
}

.vendor__about {
    margin-top: clamp(2.5rem, 6vw, 5rem);
}

.vendor__sectionTitle,
.vendor__sideTitle {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 500;
}

.vendor__bodyText {
    margin-top: var(--s-5);
    color: var(--ink);
    font-size: 1.05rem;
    line-height: 1.5;
}

.vendor__areas {
    margin-top: var(--s-5);
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-3);
}

.vendor__area {
    padding: 0.45rem 0.7rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--muted-strong);
}

.vendor__side {
    display: grid;
    gap: var(--s-5);
}

.vendor__priceCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
    padding: var(--s-6);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.54);
}

.vendor__priceCard strong {
    color: var(--ink);
    font-size: clamp(1.2rem, 2.2vw, 1.65rem);
    font-weight: 500;
    text-align: right;
}

.vendor__form,
.vendor__contact,
.vendor__claim {
    padding: clamp(1.5rem, 4vw, 2.5rem);
}

.vendor__sideText,
.vendor__claimText {
    margin-top: var(--s-4);
    color: var(--muted);
    font-size: 1.05rem;
    line-height: 1.5;
}

.vendor__label {
    margin-top: var(--s-5);
    display: grid;
    gap: var(--s-3);
    color: var(--muted);
    font-size: 1rem;
}

.vendor__form input,
.vendor__form textarea {
    width: 100%;
    margin-top: var(--s-3);
    border: 1px solid var(--border);
    border-radius: 14px;
    background: rgba(247, 245, 241, 0.72);
    padding: 0.95rem 1rem;
    color: var(--ink);
}

.vendor__label input {
    margin-top: 0;
}

.vendor__form textarea {
    min-height: 180px;
    resize: vertical;
}

.vendor__submit,
.vendor__claimBtn {
    width: 100%;
    margin-top: var(--s-4);
}

.vendor__contactName {
    margin-top: var(--s-6);
    display: flex;
    align-items: center;
    gap: var(--s-4);
}

.vendor__avatar {
    width: 48px;
    height: 48px;
    flex: 0 0 auto;
    border-radius: 999px;
    background:
        linear-gradient(135deg, rgba(180, 87, 55, 0.24), rgba(110, 139, 121, 0.28)),
        var(--surface-soft);
}

.vendor__link {
    display: block;
    margin-top: var(--s-4);
    color: var(--accent-strong);
    font-weight: 700;
    text-decoration: none;
    overflow-wrap: anywhere;
}

.vendor__muted {
    margin-top: var(--s-4);
}

.vendor__claimTitle {
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--ink);
}

@media (max-width: 900px) {
    .detailGallery {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 220px 160px 160px;
    }

    .detailGallery__item--hero {
        grid-column: 1 / -1;
        grid-row: 1;
    }

    .detailGallery__item--wide {
        display: none;
    }

    .detailGallery__item--topA,
    .detailGallery__item--topB,
    .detailGallery__item--bottomA,
    .detailGallery__item--bottomB {
        grid-column: auto;
        grid-row: auto;
    }

    .vendor__contentInner,
    .vendor__facts {
        grid-template-columns: 1fr;
    }
}
</style>
