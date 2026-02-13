<template>
    <header class="blogHeader">
        <div class="container blogHeader__inner">
            <div class="blogHeader__left">
                <NuxtLink :to="localePath('/')" class="blogHeader__brand">
                    <span class="blogHeader__brandName">{{
                        t("brand.name")
                    }}</span>
                </NuxtLink>

                <nav class="blogHeader__nav" aria-label="Blog">
                    <NuxtLink
                        :to="localePath('/blog')"
                        class="blogHeader__link"
                    >
                        {{ t("nav.blog") }}
                    </NuxtLink>
                    <NuxtLink
                        :to="localePath('/wedding-venues')"
                        class="blogHeader__link"
                    >
                        {{ t("nav.venues") }}
                    </NuxtLink>
                    <NuxtLink
                        :to="localePath('/vendors')"
                        class="blogHeader__link"
                    >
                        {{ t("nav.vendors") }}
                    </NuxtLink>
                </nav>
            </div>

            <div class="blogHeader__right">
                <div class="blogHeader__lang">
                    <NuxtLink
                        :to="switchLocalePath('en')"
                        class="blogHeader__langLink"
                        >EN</NuxtLink
                    >
                    <span class="blogHeader__langSep">/</span>
                    <NuxtLink
                        :to="switchLocalePath('es')"
                        class="blogHeader__langLink"
                        >ES</NuxtLink
                    >
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
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

@media (max-width: 720px) {
    .blogHeader__inner {
        min-height: auto;
        padding-block: 10px;
        align-items: flex-start;
    }

    .blogHeader__left {
        flex-wrap: wrap;
        gap: 10px 12px;
    }

    .blogHeader__nav {
        flex-wrap: wrap;
        gap: 10px 12px;
    }
}
</style>
