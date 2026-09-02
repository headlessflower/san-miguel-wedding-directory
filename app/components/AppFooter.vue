<template>
    <footer class="appFooter">
        <div class="container">
            <div class="appFooter__panel">
                <div class="appFooter__brandCol">
                    <NuxtLink
                        :to="home"
                        class="appFooter__brand"
                        :aria-label="t('brand.name')"
                    >
                        <span class="appFooter__mark">SM</span>
                        <span class="appFooter__brandName">{{
                            t("brand.name")
                        }}</span>
                    </NuxtLink>

                    <p class="appFooter__summary">
                        {{
                            isEs
                                ? "Directorio para parejas que planean bodas en San Miguel de Allende y para proveedores que quieren llega a ellas."
                                : "A directory for couples planning San Miguel de Allende weddings and the vendors ready to serve them."
                        }}
                    </p>
                </div>

                <nav
                    v-for="group in linkGroups"
                    :key="group.title"
                    class="appFooter__group"
                    :aria-label="group.title"
                >
                    <h2 class="appFooter__heading">{{ group.title }}</h2>
                    <NuxtLink
                        v-for="link in group.links"
                        :key="link.label"
                        :to="link.to"
                        class="appFooter__link"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </nav>

                <div class="appFooter__bottom">
                    <p>
                        {{
                            isEs
                                ? "Todos los derechos reservados."
                                : "All rights reserved."
                        }}
                        © {{ year }}
                    </p>
                    <NuxtLink :to="newsletter" class="appFooter__newsletter">
                        {{
                            isEs
                                ? "Recibir ideas para bodas"
                                : "Get wedding planning ideas"
                        }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
const { t, locale } = useI18n();
const localePath = useLocalePath();

const isEs = computed(() => locale.value === "es");

const to = (name: string) => localePath({ name });

const home = computed(() => to("index"));
const venues = computed(() => to("wedding-venues"));
const vendors = computed(() => to("vendors"));
const blog = computed(() => to("blog"));
const search = computed(() => to("search"));
const advertise = computed(() => to("advertise"));
const whyAdvertise = computed(() => to("advertise-with-us"));
const faq = computed(() => to("faq"));
const about = computed(() => to("about"));
const newsletter = computed(() => to("newsletter"));

const socials = [
    { label: "Instagram", short: "Ig", href: "https://www.instagram.com/" },
    { label: "TikTok", short: "Tk", href: "https://www.tiktok.com/" },
    { label: "Pinterest", short: "Pi", href: "https://www.pinterest.com/" },
];

const linkGroups = computed(() => [
    {
        title: isEs.value ? "Explorar" : "Explore",
        links: [
            { label: isEs.value ? "Inicio" : "Home", to: home.value },
            { label: t("nav.venues"), to: venues.value },
            { label: t("nav.vendors"), to: vendors.value },
            { label: isEs.value ? "Buscar" : "Search", to: search.value },
        ],
    },
    {
        title: isEs.value ? "Recursos" : "Resources",
        links: [
            { label: t("nav.blog"), to: blog.value },
            { label: isEs.value ? "FAQ" : "FAQ", to: faq.value },
            {
                label: isEs.value ? "Por qué SMWC" : "Why SMWC",
                to: about.value,
            },
            {
                label: isEs.value
                    ? "Newsletter de bodas"
                    : "Wedding newsletter",
                to: newsletter.value,
            },
            {
                label: isEs.value ? "Guia de lugares" : "Venue guide",
                to: venues.value,
            },
        ],
    },
    {
        title: isEs.value ? "Para negocios" : "For Businesses",
        links: [
            { label: t("nav.advertise"), to: advertise.value },
            {
                label: isEs.value ? "Por que anunciarte" : "Why advertise",
                to: whyAdvertise.value,
            },
            {
                label: isEs.value ? "Planes y precios" : "Plans and pricing",
                to: advertise.value,
            },
            {
                label: isEs.value
                    ? "Solicitar informacion"
                    : "Request information",
                to: `${advertise.value}#lead`,
            },
        ],
    },
]);
</script>

<style scoped>
.appFooter {
    padding: clamp(3rem, 7vw, 6rem) 0 var(--s-7);
    background: #f7f7f6;
}

.appFooter__panel {
    display: grid;
    grid-template-columns: minmax(0, 1.55fr) repeat(3, minmax(8.5rem, 1fr));
    gap: clamp(2rem, 5vw, 5rem);
    padding: clamp(2rem, 5vw, 4rem);
    border: 1px solid rgba(20, 20, 20, 0.04);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 24px 70px rgba(20, 20, 20, 0.04);
}

.appFooter__brandCol,
.appFooter__group {
    min-width: 0;
}

.appFooter__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    color: var(--ink);
}

.appFooter__mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.55rem;
    background: var(--ink);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0;
}

.appFooter__brandName {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0;
}

.appFooter__summary {
    margin-top: var(--s-6);
    max-width: 31rem;
    color: #9694ad;
    font-size: clamp(1rem, 1.7vw, 1.18rem);
    line-height: 1.55;
}

.appFooter__socials {
    display: flex;
    gap: 0.75rem;
    margin-top: var(--s-6);
}

.appFooter__social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.8rem;
    height: 2.8rem;
    border: 1px solid #ececf2;
    border-radius: 0.85rem;
    color: #a7a6b7;
    background: #fff;
    font-weight: 800;
    transition:
        border-color 160ms var(--ease),
        color 160ms var(--ease),
        transform 160ms var(--ease);
}

.appFooter__social:hover {
    border-color: rgba(180, 87, 55, 0.3);
    color: var(--accent-strong);
    transform: translateY(-1px);
}

.appFooter__heading {
    margin: 0 0 var(--s-5);
    font-size: clamp(1.15rem, 1.8vw, 1.35rem);
    font-weight: 500;
    color: #070707;
}

.appFooter__link {
    display: block;
    width: fit-content;
    color: #9897b0;
    font-size: 1rem;
    line-height: 1.35;
    text-decoration: none;
}

.appFooter__link + .appFooter__link {
    margin-top: var(--s-5);
}

.appFooter__link:hover {
    color: var(--ink);
}

.appFooter__bottom {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--s-5);
    margin-top: var(--s-5);
    padding-top: var(--s-6);
    border-top: 1px solid #eeeeef;
    color: #9897b0;
}

.appFooter__bottom p {
    color: inherit;
}

.appFooter__newsletter {
    color: var(--accent-strong);
    font-weight: 700;
}

@media (max-width: 960px) {
    .appFooter__panel {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .appFooter__brandCol {
        grid-column: 1 / -1;
    }
}

@media (max-width: 640px) {
    .appFooter {
        padding-top: var(--s-8);
    }

    .appFooter__panel {
        grid-template-columns: 1fr;
        gap: var(--s-7);
        border-radius: 2rem;
    }

    .appFooter__bottom {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>

<style scoped>
.appFooter {
    padding: 0;
    background: #10100f;
    border-top: 1px solid #2e2e2b;
}

.appFooter__panel {
    grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(9rem, 1fr));
    gap: clamp(2rem, 5vw, 5rem);
    padding: clamp(3rem, 7vw, 6rem) 0 2rem;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
}

.appFooter__brand,
.appFooter__heading {
    color: #fff;
}

.appFooter__mark {
    border: 1px solid #777;
    border-radius: 0;
    background: transparent;
}

.appFooter__brandName {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 400;
}

.appFooter__summary {
    color: #aaa7a0;
    font-size: 0.95rem;
}

.appFooter__heading {
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.appFooter__link {
    color: #c8c6c0;
    font-size: 0.84rem;
}

.appFooter__link + .appFooter__link {
    margin-top: 0.85rem;
}

.appFooter__link:hover {
    color: #fff;
}

.appFooter__bottom {
    justify-content: space-between;
    border-top-color: #33322f;
    color: #7f7d77;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.appFooter__newsletter {
    color: #d2a38e;
}

@media (max-width: 960px) {
    .appFooter__panel {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .appFooter__panel {
        grid-template-columns: 1fr;
        border-radius: 0;
        padding-inline: 0;
    }
}
</style>
