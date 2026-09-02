<template>
    <header class="appHeader">
        <div class="container appHeader__inner">
            <NuxtLink :to="home" class="appHeader__brand">
                <span class="appHeader__brandKicker">The San Miguel edit</span>
                <span class="appHeader__brandName">San Miguel Wedding Venues</span>
            </NuxtLink>

            <button
                class="appHeader__toggle"
                type="button"
                :aria-expanded="isMenuOpen"
                aria-controls="primary-navigation"
                :aria-label="isMenuOpen ? (isEs ? 'Cerrar menu' : 'Close menu') : (isEs ? 'Abrir menu' : 'Open menu')"
                @click="isMenuOpen = !isMenuOpen"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>

            <nav
                id="primary-navigation"
                class="appHeader__nav"
                :class="{ 'appHeader__nav--open': isMenuOpen }"
                aria-label="Primary"
            >
                <NuxtLink
                    :to="venues"
                    class="appHeader__link"
                    @click="closeMenu"
                >
                    {{ t("nav.venues") }}
                </NuxtLink>
                <NuxtLink :to="vendors" class="appHeader__link" @click="closeMenu">
                    {{ t("nav.vendors") }}
                </NuxtLink>
                <NuxtLink :to="blog" class="appHeader__link" @click="closeMenu">
                    {{ t("nav.blog") }}
                </NuxtLink>
                <NuxtLink :to="about" class="appHeader__link" @click="closeMenu">
                    {{ isEs ? "Por qué SMWC" : "Why SMWC" }}
                </NuxtLink>

                <div class="appHeader__lang">
                    <NuxtLink
                        :to="switchLocalePath('en')"
                        class="appHeader__langLink"
                        @click="closeMenu"
                        >EN</NuxtLink
                    >
                    <span class="appHeader__langSep">/</span>
                    <NuxtLink
                        :to="switchLocalePath('es')"
                        class="appHeader__langLink"
                        @click="closeMenu"
                        >ES</NuxtLink
                    >


                </div>
              <NuxtLink :to="search" class="appHeader__navLink" @click="closeMenu">
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

const isMenuOpen = ref(false);
const isEs = computed(() => locale.value === "es");

function closeMenu() {
    isMenuOpen.value = false;
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

const about = computed(() =>
    localePath({ name: "about" })
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
    position: relative;
    min-height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
    min-width: 0;
    border: 1px solid rgba(255, 255, 255, 0.75);
    border-radius: var(--radius);
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

.appHeader__toggle {
    display: none;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    color: var(--ink);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
}

.appHeader__toggle span {
    position: absolute;
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    transition:
        transform 160ms var(--ease),
        opacity 160ms var(--ease);
}

.appHeader__toggle span:nth-child(1) {
    transform: translateY(-6px);
}

.appHeader__toggle span:nth-child(3) {
    transform: translateY(6px);
}

.appHeader__toggle[aria-expanded="true"] span:nth-child(1) {
    transform: rotate(45deg);
}

.appHeader__toggle[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
}

.appHeader__toggle[aria-expanded="true"] span:nth-child(3) {
    transform: rotate(-45deg);
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

@media (max-width: 820px) {
    .appHeader {
        top: 0;
        padding: var(--s-3);
    }

    .appHeader__inner {
        min-height: auto;
        padding-block: 10px;
        align-items: center;
        border-radius: var(--radius);
        flex-wrap: wrap;
    }

    .appHeader__brand {
        flex: 1 1 auto;
        max-width: calc(100% - 56px);
    }

    .appHeader__brandName {
        font-size: 0.96rem;
    }

    .appHeader__toggle {
        position: relative;
        display: inline-flex;
    }

    .appHeader__nav {
        display: none;
        flex: 1 0 100%;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
        padding-top: var(--s-3);
    }

    .appHeader__nav--open {
        display: flex;
    }

    .appHeader__link,
    .appHeader__navLink {
        width: 100%;
        min-height: 44px;
        justify-content: center;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        background: rgba(20, 20, 20, 0.04);
        color: var(--ink);
        text-align: center;
    }

    .appHeader__navLink {
        background: var(--accent);
        color: #fff;
    }

    .appHeader__lang {
        justify-content: center;
        width: 100%;
    }
}
</style>

<style scoped>
.appHeader { top: 0; padding: 0; background: #fff; backdrop-filter: none; border-bottom: 1px solid var(--ink); }
.appHeader__inner { min-height: 98px; border: 0; border-radius: 0; background: #fff; box-shadow: none; padding-block: 0.9rem; }
.appHeader__brand { flex-direction: column; align-items: flex-start; gap: 0.1rem; }
.appHeader__brandKicker { color: var(--accent-strong); font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
.appHeader__brandName { font-family: var(--font-serif); font-size: clamp(1.35rem, 2.2vw, 2.05rem); font-weight: 400; letter-spacing: -0.035em; }
.appHeader__nav { align-self: stretch; }
.appHeader__link { display: flex; align-items: center; height: 100%; color: var(--ink); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; }
.appHeader__link:hover { color: var(--accent-strong); }
.appHeader__lang { gap: 4px; border: 0; border-left: 1px solid var(--border); border-radius: 0; padding-left: 1rem; }
.appHeader__navLink { min-height: 36px; padding: 0 0 0 1rem; border-radius: 0; background: transparent; color: var(--ink); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; }
.appHeader__navLink:hover { background: transparent; color: var(--accent-strong); }
.appHeader__toggle { border-radius: 0; box-shadow: none; }
@media (max-width: 820px) {
  .appHeader__inner { min-height: 80px; }
  .appHeader__nav { top: calc(100% + 1px); border: 0; border-radius: 0; box-shadow: none; }
  .appHeader__link { min-height: 48px; border-bottom: 1px solid var(--border); }
  .appHeader__lang { border-left: 0; padding-left: 0; }
  .appHeader__navLink { justify-content: flex-start; padding-left: 0; }
}
</style>
