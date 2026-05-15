<template>
    <header class="blogHeader">
        <div class="container blogHeader__inner">
            <div class="blogHeader__left">
              <NuxtLink :to="localePath({ name: 'index' })" class="blogHeader__brand">
                <span class="blogHeader__brandName">{{ t("brand.name") }}</span>
              </NuxtLink>

              <button
                class="blogHeader__toggle"
                type="button"
                :aria-expanded="isMenuOpen"
                aria-controls="blog-navigation"
                :aria-label="isMenuOpen ? (isEs ? 'Cerrar menu' : 'Close menu') : (isEs ? 'Abrir menu' : 'Open menu')"
                @click="isMenuOpen = !isMenuOpen"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </button>

              <nav
                id="blog-navigation"
                class="blogHeader__nav"
                :class="{ 'blogHeader__nav--open': isMenuOpen }"
                aria-label="Blog"
              >
                    <NuxtLink
                        :to="blog"
                        class="blogHeader__link"
                        @click="closeMenu"
                    >
                        {{ t("nav.blog") }}
                    </NuxtLink>
                    <NuxtLink
                        :to="venues"
                        class="blogHeader__link"
                        @click="closeMenu"
                    >
                        {{ t("nav.venues") }}
                    </NuxtLink>
                    <NuxtLink
                        :to="vendors"
                        class="blogHeader__link"
                        @click="closeMenu"
                    >
                        {{ t("nav.vendors") }}
                    </NuxtLink>
                </nav>
            </div>

            <div class="blogHeader__right" :class="{ 'blogHeader__right--open': isMenuOpen }">
                <div class="blogHeader__lang">
                    <NuxtLink
                        :to="englishPath"
                        class="blogHeader__langLink"
                        @click="closeMenu"
                        >EN</NuxtLink
                    >
                    <span class="blogHeader__langSep">/</span>
                    <NuxtLink
                        :to="spanishPath"
                        class="blogHeader__langLink"
                        @click="closeMenu"
                        >ES</NuxtLink
                    >
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">

const { t, locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const blogLocaleSlugs = useState<Record<string, string>>("blogLocaleSlugs", () => ({}));
const BLOG_SLUG_TRANSLATIONS: Record<string, { en: string; es: string }> = {
    "best-wedding-venues-sma-2026": {
        en: "best-wedding-venues-sma-2026",
        es: "mejores-lugares-para-boda-sma-2026",
    },
    "mejores-lugares-para-boda-sma-2026": {
        en: "best-wedding-venues-sma-2026",
        es: "mejores-lugares-para-boda-sma-2026",
    },
};

const isMenuOpen = ref(false);
const isEs = computed(() => locale.value === "es");

function closeMenu() {
    isMenuOpen.value = false;
}

function localizedCurrentPath(targetLocale: "en" | "es") {
    const routeName = String(route.name || "");
    const isBlogPost =
        routeName.includes("blog-slug") ||
        (route.path.includes("/blog/") && Boolean(route.params.slug));
    const currentSlug = String(route.params.slug || "");
    const translatedSlug =
        blogLocaleSlugs.value[targetLocale] ||
        BLOG_SLUG_TRANSLATIONS[currentSlug]?.[targetLocale];

    if (isBlogPost && translatedSlug) {
        return localePath(
            { name: "blog-slug", params: { slug: translatedSlug } },
            targetLocale
        );
    }

    return switchLocalePath(targetLocale);
}

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

const englishPath = computed(() => localizedCurrentPath("en"));
const spanishPath = computed(() => localizedCurrentPath("es"));

const search = computed(() =>
    localePath({ name: "search" })
);
</script>


<style scoped>
.blogHeader {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(242, 242, 240, 0.85);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
}

.blogHeader__inner {
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
    min-width: 0;
}

.blogHeader__left {
    display: flex;
    align-items: center;
    gap: var(--s-4);
    min-width: 0;
    flex: 1 1 auto;
}

.blogHeader__brand {
    text-decoration: none;
    min-width: 0;
}

.blogHeader__brandName {
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.blogHeader__toggle {
    display: none;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 0 0 auto;
    width: 42px;
    height: 42px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    color: var(--ink);
    cursor: pointer;
}

.blogHeader__toggle span {
    position: absolute;
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    transition:
        transform 160ms var(--ease),
        opacity 160ms var(--ease);
}

.blogHeader__toggle span:nth-child(1) {
    transform: translateY(-6px);
}

.blogHeader__toggle span:nth-child(3) {
    transform: translateY(6px);
}

.blogHeader__toggle[aria-expanded="true"] span:nth-child(1) {
    transform: rotate(45deg);
}

.blogHeader__toggle[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
}

.blogHeader__toggle[aria-expanded="true"] span:nth-child(3) {
    transform: rotate(-45deg);
}

.blogHeader__nav {
    display: flex;
    align-items: center;
    gap: var(--s-4);
}

.blogHeader__link {
    font-size: 13px;
    font-weight: 800;
    color: rgba(20, 20, 20, 0.72);
    text-decoration: none;
    white-space: nowrap;
}

.blogHeader__link:hover {
    color: rgba(20, 20, 20, 0.92);
}

.blogHeader__lang {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 6px 10px;
    background: var(--surface);
}

.blogHeader__langLink {
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(20, 20, 20, 0.75);
    text-decoration: none;
}

.blogHeader__langSep {
    color: rgba(20, 20, 20, 0.35);
}

@media (max-width: 760px) {
    .blogHeader__inner {
        min-height: auto;
        padding-block: 10px;
        align-items: center;
        flex-wrap: wrap;
    }

    .blogHeader__left {
        justify-content: space-between;
        flex: 1 0 100%;
        gap: var(--s-3);
    }

    .blogHeader__brand {
        max-width: calc(100% - 54px);
    }

    .blogHeader__toggle {
        display: inline-flex;
    }

    .blogHeader__nav {
        display: none;
        flex: 1 0 100%;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
        order: 3;
    }

    .blogHeader__nav--open {
        display: flex;
    }

    .blogHeader__link {
        min-height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background: rgba(20, 20, 20, 0.04);
        color: var(--ink);
    }

    .blogHeader__right {
        flex: 1 0 100%;
        order: 4;
        display: none;
    }

    .blogHeader__right--open {
        display: block;
    }

    .blogHeader__lang {
        justify-content: center;
        width: 100%;
    }
}
</style>
