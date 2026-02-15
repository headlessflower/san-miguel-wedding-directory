<template>
    <main class="vendor">
        <section class="vendor__hero">
            <div class="container">
                <NuxtLink
                    :to="localePath(`/vendors/${category.slug[locale]}`)"
                    class="vendor__back"
                >
                    ← {{ locale === "es" ? "Regresar" : "Back" }}
                </NuxtLink>
                <nav class="crumbs" aria-label="Breadcrumb">
                    <ol class="crumbs__list">
                        <li class="crumbs__item">
                            <NuxtLink
                                :to="localePath('/')"
                                class="crumbs__link"
                            >
                                {{ L === "es" ? "Inicio" : "Home" }}
                            </NuxtLink>
                        </li>
                        <li class="crumbs__sep">/</li>
                        <li class="crumbs__item">
                            <NuxtLink
                                :to="localePath('/vendors')"
                                class="crumbs__link"
                            >
                                {{ L === "es" ? "Proveedores" : "Vendors" }}
                            </NuxtLink>
                        </li>
                        <li class="crumbs__sep">/</li>
                        <li class="crumbs__item">
                            <NuxtLink
                                :to="localePath(`/vendors/${category.slug[L]}`)"
                                class="crumbs__link"
                            >
                                {{ category.label[L] }}
                            </NuxtLink>
                        </li>
                        <li class="crumbs__sep">/</li>
                        <li
                            class="crumbs__item crumbs__item--current"
                            aria-current="page"
                        >
                            {{ vendor.name[L] }}
                        </li>
                    </ol>
                </nav>
                <div class="vendor__heroTop">
                    <h1 class="vendor__title">{{ vendor.name[locale] }}</h1>
                    <span
                        v-if="vendor.featured"
                        class="badge badge--featured"
                        >{{ t("directory.featured") }}</span
                    >
                </div>

                <p class="vendor__subtitle">{{ vendor.description[locale] }}</p>
            </div>
        </section>

        <section class="vendor__content">
            <div class="container vendor__contentInner">
                <div class="vendor__main card" aria-hidden="true"></div>

                <aside class="vendor__sidebar card">
                    <div class="vendor__sidebarBody">
                        <h2 class="vendor__sideTitle">
                            {{ locale === "es" ? "Contacto" : "Contact" }}
                        </h2>

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
                </aside>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { getVendorCategoryBySlug } from "~/data/taxonomies";
const localePath = useLocalePath();

import type { Locale } from "~/types/i18n";

const { t, locale } = useI18n();
const route = useRoute();

const siteUrl = (useRuntimeConfig().public?.siteUrl as string) || "";
const L = computed<Locale>(() => (locale.value as Locale) || "en");

const category = computed(() => {
    const slug = String(route.params.category || "");
    const found = getVendorCategoryBySlug(L.value, slug);

    if (!found) {
        throw createError({
            statusCode: 404,
            statusMessage: "Category not found",
        });
    }

    return found;
});

const { getVendorByCategoryKeyAndSlug } = useListings();

const vendor = computed(() => {
    const slug = String(route.params.slug || "");
    const found = getVendorByCategoryKeyAndSlug(category.value.key, slug);

    if (!found) {
        throw createError({
            statusCode: 404,
            statusMessage: "Vendor not found",
        });
    }

    return found;
});

const seoTitle = computed(
    () => `${vendor.value.name[L.value]} • ${t("seo.siteTitle")}`,
);
const seoDescription = computed(() => vendor.value.description[L.value]);

useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
});

useHead(() => {
    const v = vendor.value;
    const base = siteUrl;

    // ---------- LocalBusiness ----------
    const url = base
        ? `${base}/${L.value}/vendors/${category.value.slug[L.value]}/${v.slug}`
        : undefined;

    const sameAs = [v.website, v.instagram].filter(Boolean) as string[];
    const areas = (v.serviceAreas?.[L.value] ?? []).filter(Boolean);

    const localBusiness: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: v.name[L.value],
        description: v.description[L.value],
        ...(url ? { url } : {}),
        ...(sameAs.length ? { sameAs } : {}),
        ...(v.phone ? { telephone: v.phone } : {}),
        ...(v.email ? { email: v.email } : {}),
        ...(areas.length
            ? {
                  areaServed: areas.map((x) => ({
                      "@type": "AdministrativeArea",
                      name: x,
                  })),
              }
            : {}),
    };

    if (v.address?.city || v.address?.country) {
        localBusiness.address = {
            "@type": "PostalAddress",
            ...(v.address.street ? { streetAddress: v.address.street } : {}),
            ...(v.address.city ? { addressLocality: v.address.city } : {}),
            ...(v.address.region ? { addressRegion: v.address.region } : {}),
            ...(v.address.country ? { addressCountry: v.address.country } : {}),
            ...(v.address.postalCode
                ? { postalCode: v.address.postalCode }
                : {}),
        };
    }

    const imgs = v.images ?? [];
    const hero = imgs.find((i) => i.type === "hero") ?? imgs[0] ?? null;
    if (hero?.src) {
        localBusiness.image =
            base && hero.src.startsWith("/") ? `${base}${hero.src}` : hero.src;
    }

    // ---------- BreadcrumbList ----------
    const prefix = `/${L.value}`;
    const crumbs = [
        { name: L.value === "es" ? "Inicio" : "Home", path: `${prefix}/` },
        {
            name: L.value === "es" ? "Proveedores" : "Vendors",
            path: `${prefix}/vendors`,
        },
        {
            name: category.value.label[L.value],
            path: `${prefix}/vendors/${category.value.slug[L.value]}`,
        },
        {
            name: v.name[L.value],
            path: `${prefix}/vendors/${category.value.slug[L.value]}/${v.slug}`,
        },
    ];

    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: c.name,
            item: base ? `${base}${c.path}` : c.path,
        })),
    };

    return {
        script: [
            {
                type: "application/ld+json",
                children: JSON.stringify(localBusiness),
            },
            {
                type: "application/ld+json",
                children: JSON.stringify(breadcrumbList),
            },
        ],
    };
});
</script>

<style scoped>
.vendor__header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(242, 242, 240, 0.85);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
}

.vendor__headerInner {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
}

.vendor__brandName {
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 12px;
}

.vendor__nav {
    display: flex;
    align-items: center;
    gap: var(--s-4);
}

.vendor__navLink {
    font-size: 13px;
    font-weight: 800;
    color: rgba(20, 20, 20, 0.72);
    text-decoration: none;
}

.vendor__lang {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 6px 10px;
    background: var(--surface);
}

.vendor__langLink {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.75);
    text-decoration: none;
}

.vendor__langSep {
    color: rgba(20, 20, 20, 0.35);
}

.vendor__hero {
    padding: var(--s-7) 0 var(--s-5);
}

.vendor__back {
    font-size: 13px;
    font-weight: 900;
    color: rgba(20, 20, 20, 0.7);
    text-decoration: none;
}

.vendor__heroTop {
    margin-top: var(--s-4);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--s-4);
}

.vendor__title {
    font-size: 40px;
}

.vendor__subtitle {
    margin-top: var(--s-3);
    max-width: 75ch;
}

.vendor__content {
    padding: var(--s-5) 0 var(--s-9);
}

.vendor__contentInner {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: var(--s-5);
    align-items: start;
}

@media (max-width: 900px) {
    .vendor__contentInner {
        grid-template-columns: 1fr;
    }
}

.vendor__main {
    height: 420px;
    background: linear-gradient(
        135deg,
        rgba(20, 20, 20, 0.06),
        rgba(20, 20, 20, 0.02)
    );
}

.vendor__sidebar {
    padding: var(--s-5);
}

.vendor__sideTitle {
    font-size: 18px;
    color: var(--ink);
}

.vendor__link {
    display: block;
    margin-top: var(--s-3);
    font-weight: 900;
    font-size: 13px;
    color: rgba(20, 20, 20, 0.82);
    text-decoration: none;
}

.vendor__muted {
    margin-top: var(--s-4);
}
.crumbs {
    margin-top: var(--s-4);
}
.crumbs__list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
}
.crumbs__link {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.65);
    text-decoration: none;
}
.crumbs__link:hover {
    color: rgba(20, 20, 20, 0.9);
}
.crumbs__sep {
    color: rgba(20, 20, 20, 0.25);
    font-size: 12px;
}
.crumbs__item--current {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.9);
}
</style>
