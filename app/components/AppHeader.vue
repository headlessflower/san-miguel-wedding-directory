<template>
    <header class="appHeader">
        <div class="container appHeader__inner">
            <NuxtLink :to="localePath('/')" class="appHeader__brand">
                <span class="appHeader__brandName">{{ t("brand.name") }}</span>
            </NuxtLink>

            <nav class="appHeader__nav" aria-label="Primary">
                <NuxtLink
                    :to="localePath('/wedding-venues')"
                    class="appHeader__link"
                >
                    {{ t("nav.venues") }}
                </NuxtLink>
                <NuxtLink :to="localePath('/vendors')" class="appHeader__link">
                    {{ t("nav.vendors") }}
                </NuxtLink>
                <NuxtLink :to="localePath('/blog')" class="appHeader__link">
                    {{ t("nav.blog") }}
                </NuxtLink>

                <div class="appHeader__lang">
                    <NuxtLink
                        :to="switchLocalePath('en')"
                        class="appHeader__langLink"
                        >EN</NuxtLink
                    >
                    <span class="appHeader__langSep">/</span>
                    <NuxtLink
                        :to="switchLocalePath('es')"
                        class="appHeader__langLink"
                        >ES</NuxtLink
                    >


                </div>
              <NuxtLink :to="localePath(`/search`)" class="appHeader__navLink">
                {{ isEs  ? "Buscar" : "Search" }}
              </NuxtLink>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const isEs = computed(() => locale.value === "es");
</script>

<style scoped>
.appHeader {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(242, 242, 240, 0.85);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
}

.appHeader__inner {
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
    min-width: 0;
}

.appHeader__brand {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    text-decoration: none;
}

.appHeader__brandName {
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.appHeader__nav {
    display: flex;
    align-items: center;
    gap: var(--s-4);
    min-width: 0;
}

.appHeader__link {
    font-size: 13px;
    font-weight: 800;
    color: rgba(20, 20, 20, 0.72);
    text-decoration: none;
    white-space: nowrap;
}

.appHeader__link:hover {
    color: rgba(20, 20, 20, 0.92);
}

.appHeader__lang {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 6px 10px;
    background: var(--surface);
    flex: 0 0 auto;
}

.appHeader__langLink {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.75);
    text-decoration: none;
    white-space: nowrap;
}

.appHeader__langSep {
    color: rgba(20, 20, 20, 0.35);
}

@media (max-width: 720px) {
    .appHeader__inner {
        min-height: auto;
        padding-block: 10px;
        align-items: flex-start;
    }

    .appHeader__nav {
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 10px 12px;
    }
}
</style>
