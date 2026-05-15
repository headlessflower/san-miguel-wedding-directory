<template>
    <header class="appHeader">
        <div class="container appHeader__inner">
            <NuxtLink :to="home" class="appHeader__brand">
                <span class="appHeader__brandName">{{ t("brand.name") }}</span>
            </NuxtLink>

            <nav class="appHeader__nav" aria-label="Primary">
                <NuxtLink
                    :to="venues"
                    class="appHeader__link"
                >
                    {{ t("nav.venues") }}
                </NuxtLink>
                <NuxtLink :to="vendors" class="appHeader__link">
                    {{ t("nav.vendors") }}
                </NuxtLink>
                <NuxtLink :to="blog" class="appHeader__link">
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
              <NuxtLink :to="search" class="appHeader__navLink">
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

const home = computed(() =>
    localePath({ name: "index" })
);

const venues = computed(() =>
    localePath({ name: "wedding-venues" })
);

const vendors = computed(() =>
    localePath({ name: "vendors" })
);

const blog = computed(() =>
    localePath({ name: "blog" })
);

const search = computed(() =>
    localePath({ name: "search" })
);
</script>


<style scoped>
.appHeader {
    position: sticky;
    top: 12px;
    z-index: 50;
    padding: 0 var(--s-5);
    background: transparent;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.appHeader__inner {
    min-height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
    min-width: 0;
    border: 1px solid rgba(255, 255, 255, 0.75);
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.88);
    box-shadow: var(--shadow-sm);
    padding-inline: clamp(1rem, 3vw, 2rem);
}

.appHeader__brand {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    text-decoration: none;
}

.appHeader__brandName {
    font-weight: 700;
    letter-spacing: 0;
    text-transform: none;
    font-size: 1.02rem;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.appHeader__nav {
    display: flex;
    align-items: center;
    gap: clamp(0.85rem, 2.5vw, 2rem);
    min-width: 0;
}

.appHeader__link {
    font-size: 0.98rem;
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    white-space: nowrap;
}

.appHeader__link:hover {
    color: var(--accent-strong);
}

.appHeader__lang {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 7px 11px;
    background: var(--surface);
    flex: 0 0 auto;
}

.appHeader__langLink {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.75);
    text-decoration: none;
    white-space: nowrap;
}

.appHeader__langSep {
    color: rgba(20, 20, 20, 0.35);
}

.appHeader__navLink {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0 1rem;
    border-radius: 12px;
    background: var(--accent);
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
}

.appHeader__navLink:hover {
    background: var(--accent-strong);
}

@media (max-width: 720px) {
    .appHeader__inner {
        min-height: auto;
        padding-block: 10px;
        align-items: flex-start;
        border-radius: 18px;
    }

    .appHeader__nav {
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 10px 12px;
    }
}
</style>
