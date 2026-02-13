<template>
    <aside v-if="hasAny" class="related card">
        <div class="related__inner">
            <h2 class="related__title">
                {{ locale === "es" ? "En el directorio" : "In the directory" }}
            </h2>

            <div v-if="venueLinks.length" class="related__group">
                <p class="related__label">
                    {{ locale === "es" ? "Lugares" : "Venues" }}
                </p>
                <ul class="related__list">
                    <li
                        v-for="v in venueLinks"
                        :key="v.slug"
                        class="related__item"
                    >
                        <NuxtLink
                            :to="localePath(`/wedding-venues/${v.slug}`)"
                            class="related__link"
                        >
                            {{ v.name[locale] }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div v-if="categoryLinks.length" class="related__group">
                <p class="related__label">
                    {{ locale === "es" ? "Proveedores" : "Vendors" }}
                </p>
                <ul class="related__list">
                    <li
                        v-for="c in categoryLinks"
                        :key="c.slug[locale]"
                        class="related__item"
                    >
                        <NuxtLink
                            :to="localePath(`/vendors/${c.slug[locale]}`)"
                            class="related__link"
                        >
                            {{ c.label[locale] }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
type Locale = "en" | "es";

const props = defineProps<{
    relatedVenues?: string[];
    relatedVendorCategories?: string[];
}>();

const { locale } = useI18n();
const localePath = useLocalePath();

import { SEED_VENUES } from "~/data/listings.seed";
import { VENDOR_CATEGORIES } from "~/data/taxonomies";

const l = computed(() => (locale.value as Locale) || "en");

const venueLinks = computed(() => {
    const slugs = props.relatedVenues ?? [];
    return SEED_VENUES.filter((v) => slugs.includes(v.slug));
});

const categoryLinks = computed(() => {
    const keys = props.relatedVendorCategories ?? [];
    return VENDOR_CATEGORIES.filter((c) => keys.includes(c.key));
});

const hasAny = computed(
    () => venueLinks.value.length || categoryLinks.value.length,
);
</script>

<style scoped>
.related {
    padding: var(--s-5);
    margin-top: var(--s-7);
}
.related__title {
    font-size: 18px;
    color: var(--ink);
}
.related__group {
    margin-top: var(--s-4);
}
.related__label {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.55);
}
.related__list {
    margin-top: var(--s-2);
    padding-left: 1.1rem;
}
.related__item {
    margin-top: 0.5rem;
}
.related__link {
    font-weight: 900;
    text-decoration: none;
    color: rgba(20, 20, 20, 0.8);
}
.related__link:hover {
    color: rgba(20, 20, 20, 0.95);
}
</style>
