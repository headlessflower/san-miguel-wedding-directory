<template>
    <footer class="appFooter">
        <div class="container appFooter__inner">
            <p class="appFooter__text">© {{ year }} {{ t("brand.name") }}</p>

            <nav class="appFooter__nav" aria-label="Footer">
                <NuxtLink
                    :to="localePath('/wedding-venues')"
                    class="appFooter__link"
                >
                    {{ t("nav.venues") }}
                </NuxtLink>
                <NuxtLink :to="localePath('/vendors')" class="appFooter__link">
                    {{ t("nav.vendors") }}
                </NuxtLink>
                <NuxtLink :to="localePath('/blog')" class="appFooter__link">
                    {{ t("nav.blog") }}
                </NuxtLink>
            </nav>
        </div>
    </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const year = new Date().getFullYear();
</script>

<style scoped>
.appFooter {
    padding: var(--s-6) 0;
    border-top: 1px solid var(--border);
}

.appFooter__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
    min-width: 0;
}

.appFooter__text {
    font-size: 13px;
    color: rgba(20, 20, 20, 0.75);
}

.appFooter__nav {
    display: flex;
    align-items: center;
    gap: var(--s-4);
    flex-wrap: wrap;
    justify-content: flex-end;
}

.appFooter__link {
    font-size: 13px;
    font-weight: 800;
    color: rgba(20, 20, 20, 0.65);
    text-decoration: none;
    white-space: nowrap;
}

.appFooter__link:hover {
    color: rgba(20, 20, 20, 0.9);
}

@media (max-width: 720px) {
    .appFooter__inner {
        flex-direction: column;
        align-items: flex-start;
    }

    .appFooter__nav {
        justify-content: flex-start;
    }
}
</style>
