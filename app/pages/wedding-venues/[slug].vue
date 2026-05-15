<template>
  <main class="venue">
    <section class="venue__gallerySection">
      <div class="container">
        <NuxtLink :to="localePath({ name: 'wedding-venues' })" class="venue__back">
          ← {{ locale === "es" ? "Regresar" : "Back" }}
        </NuxtLink>

        <div class="detailGallery" aria-label="Venue media">
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

    <section class="venue__content">
      <div class="container venue__contentInner">
        <article class="venue__panel card">
          <div class="venue__panelHead">
            <span class="badge">
              {{ venue.featured ? t("directory.featured") : venueTypeLabel }}
            </span>
          </div>

          <h1 class="venue__title">{{ venue.name[L] }}</h1>
          <p class="venue__subtitle">{{ venue.description[L] }}</p>

          <div class="venue__facts">
            <span v-if="venue.location?.area" class="venue__fact">
              <span class="venue__factIcon">⌖</span>
              {{ venue.location.area }}
            </span>
            <span v-if="venue.capacitySeated" class="venue__fact">
              <span class="venue__factIcon">◱</span>
              {{ locale === "es" ? "Capacidad" : "Capacity" }} {{ venue.capacitySeated }}
            </span>
            <span class="venue__fact">
              <span class="venue__factIcon">◇</span>
              {{ venueTypeLabel }}
            </span>
            <span v-if="venue.luxuryTier" class="venue__fact">
              <span class="venue__factIcon">✦</span>
              {{ luxuryTierLabel }}
            </span>
          </div>

          <section class="venue__about">
            <h2 class="venue__sectionTitle">
              {{ locale === "es" ? "Sobre el lugar" : "About the venue" }}
            </h2>
            <p class="venue__bodyText">{{ venue.description[L] }}</p>

            <ul v-if="highlights.length" class="venue__list">
              <li v-for="item in highlights" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section v-if="amenities.length" class="venue__about">
            <h2 class="venue__sectionTitle">
              {{ locale === "es" ? "Detalles" : "Details" }}
            </h2>
            <div class="venue__amenities">
              <span v-for="item in amenities" :key="item" class="venue__amenity">
                {{ item }}
              </span>
            </div>
          </section>
        </article>

        <aside class="venue__side">
          <div class="venue__priceCard">
            <span class="badge">{{ locale === "es" ? "Rango" : "Range" }}</span>
            <strong>{{ venue.priceRange || (locale === "es" ? "Consultar" : "Inquire") }}</strong>
          </div>

          <form class="venue__form card" @submit.prevent>
            <h2 class="venue__sideTitle">
              {{ locale === "es" ? "Solicita información" : "Schedule a viewing" }}
            </h2>
            <p class="venue__sideText">
              {{
                locale === "es"
                    ? "Contacta al equipo del lugar para confirmar disponibilidad, capacidades y mínimos."
                    : "Contact the venue team to confirm availability, capacities, and event minimums."
              }}
            </p>

            <label class="venue__label">
              {{ locale === "es" ? "Tu nombre" : "Your Name" }}
              <input :placeholder="locale === 'es' ? 'Nombre completo' : 'Full Name'" />
            </label>
            <input :placeholder="locale === 'es' ? 'Tu correo' : 'Your Mail'" type="email" />
            <input :placeholder="locale === 'es' ? 'Teléfono' : 'Phone Number'" type="tel" />
            <textarea :placeholder="locale === 'es' ? 'Mensaje' : 'Your Message'"></textarea>
            <button class="btn btn--primary venue__submit" type="submit">
              {{ locale === "es" ? "Enviar" : "Submit" }}
            </button>
          </form>

          <div class="venue__contact card">
            <span class="badge">{{ locale === "es" ? "Contacto" : "Contact Information" }}</span>
            <a
                v-if="venue.website"
                :href="venue.website"
                target="_blank"
                rel="noreferrer"
                class="venue__link"
            >
              {{ t("directory.website") }} →
            </a>
            <a
                v-if="venue.instagram"
                :href="venue.instagram"
                target="_blank"
                rel="noreferrer"
                class="venue__link"
            >
              {{ t("directory.instagram") }} →
            </a>
            <p v-if="!venue.website && !venue.instagram" class="venue__muted">
              {{
                locale === "es"
                    ? "Los enlaces de contacto se agregarán cuando el perfil sea reclamado."
                    : "Contact links will be added once this listing is claimed."
              }}
            </p>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { buildBreadcrumbListJsonLd } from "~/utils/seo/breadcrumbs";
import { buildEventVenueJsonLd } from "~/utils/seo/eventVenue";
import type { Locale } from "~/types/i18n";

const siteUrl = (useRuntimeConfig().public?.siteUrl as string) || "";
const { t, locale } = useI18n();
const route = useRoute();

const localePath = useLocalePath();
const L = computed<Locale>(() => (locale.value as Locale) || "en");

const { getVenueBySlug } = useListings();

const venue = computed(() => {
  const slug = String(route.params.slug || "");
  const found = getVenueBySlug(slug);

  if (!found) {
    throw createError({ statusCode: 404, statusMessage: "Venue not found" });
  }

  return found;
});

const heroImage = computed(() => {
  const imgs = venue.value.images ?? [];
  return imgs.find((i: any) => i.type === "hero") ?? imgs[0] ?? null;
});

const displayImages = computed(() => {
  return (venue.value.images ?? []).filter((image: any) => {
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

const highlights = computed(() => venue.value.highlights?.[L.value] ?? []);

const venueTypeLabel = computed(() => {
  return venue.value.venueType.replaceAll("_", " ");
});

const luxuryTierLabel = computed(() => {
  return venue.value.luxuryTier ? venue.value.luxuryTier.replaceAll("_", " ") : "";
});

const amenities = computed(() => {
  const items: string[] = [];
  const l = L.value;
  const logistics = venue.value.logistics;
  const rules = venue.value.rules;

  if (venue.value.capacityStanding) {
    items.push(`${l === "es" ? "Capacidad de pie" : "Standing capacity"} ${venue.value.capacityStanding}`);
  }
  if (venue.value.ceremonyTypes?.length) {
    items.push(venue.value.ceremonyTypes.join(", "));
  }
  if (logistics?.indoorBackup) items.push(l === "es" ? "Plan B interior" : "Indoor backup");
  if (logistics?.parkingOnSite) items.push(l === "es" ? "Estacionamiento" : "On-site parking");
  if (logistics?.lodgingOnSite) items.push(l === "es" ? "Hospedaje en sitio" : "On-site lodging");
  if (logistics?.wheelchairAccessible) items.push(l === "es" ? "Accesible" : "Accessible");
  if (rules?.allowsLiveMusic) items.push(l === "es" ? "Música en vivo" : "Live music");
  if (rules?.alcoholAllowed) items.push(l === "es" ? "Alcohol permitido" : "Alcohol allowed");
  if (rules?.noiseCurfewTime) items.push(`${l === "es" ? "Horario de ruido" : "Noise curfew"} ${rules.noiseCurfewTime}`);

  return items;
});

const seoTitle = computed(() => `${venue.value.name[L.value]} • ${t("seo.siteTitle")}`);
const seoDescription = computed(() => venue.value.description[L.value]);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
});

useHead(() => {
  const l = L.value;
  const baseUrl = siteUrl || undefined;

  // ✅ localized paths (respects i18n custom routes)
  const venuePath = (() => {
    try {
      // pages/wedding-venues/[slug].vue => "wedding-venues-slug" (typical)
      return localePath({ name: "wedding-venues-slug", params: { slug: venue.value.slug } }, l);
    } catch {
      const base = l === "es" ? "lugares-para-bodas" : "wedding-venues";
      return `/${l}/${base}/${venue.value.slug}`;
    }
  })();

  const venuesIndexPath = (() => {
    try {
      // pages/wedding-venues/index.vue => "wedding-venues" (typical)
      return localePath({ name: "wedding-venues" }, l);
    } catch {
      const base = l === "es" ? "lugares-para-bodas" : "wedding-venues";
      return `/${l}/${base}`;
    }
  })();

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd({
    baseUrl,
    items: [
      { name: l === "es" ? "Inicio" : "Home", urlPath: `/${l}/` },
      {
        name: l === "es" ? "Lugares para bodas" : "Wedding venues",
        urlPath: venuesIndexPath,
      },
      { name: venue.value.name[l], urlPath: venuePath },
    ],
  });

  const eventVenueJsonLd = buildEventVenueJsonLd({
    baseUrl,
    locale: l,
    venue: venue.value,
    pagePath: venuePath,
  });

  return {
    script: [
      {
        key: `jsonld-breadcrumbs-venue-${venue.value.id}-${l}`,
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd),
      },
      {
        key: `jsonld-eventvenue-${venue.value.id}-${l}`,
        type: "application/ld+json",
        children: JSON.stringify(eventVenueJsonLd),
      },
    ],
  };
});
</script>


<style scoped>
.venue {
    padding-top: var(--s-7);
}

.venue__gallerySection {
    padding: var(--s-7) 0 var(--s-8);
}

.venue__back {
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

.venue__content {
    padding: 0 0 var(--s-9);
}

.venue__contentInner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
    gap: var(--s-5);
    align-items: start;
}

.venue__panel {
    padding: clamp(1.5rem, 4vw, 3rem);
    border-color: rgba(255, 255, 255, 0.72);
}

.venue__panelHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
}

.venue__title {
    margin-top: var(--s-5);
    font-size: clamp(2rem, 4vw, 3.35rem);
    font-weight: 500;
}

.venue__subtitle {
    margin-top: var(--s-4);
    color: var(--muted);
    font-size: 1.1rem;
    line-height: 1.55;
}

.venue__facts {
    margin-top: var(--s-6);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--s-4);
}

.venue__fact {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--muted);
    font-size: 1.02rem;
    text-transform: capitalize;
}

.venue__factIcon {
    color: var(--agave);
    font-weight: 700;
}

.venue__about {
    margin-top: clamp(2.5rem, 6vw, 5rem);
}

.venue__sectionTitle,
.venue__sideTitle {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 500;
}

.venue__bodyText {
    margin-top: var(--s-5);
    color: var(--ink);
    font-size: 1.05rem;
    line-height: 1.5;
}

.venue__list {
    margin: var(--s-5) 0 0;
    padding-left: 1.25rem;
    color: var(--muted-strong);
    line-height: 1.55;
}

.venue__amenities {
    margin-top: var(--s-5);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--s-4);
}

.venue__amenity {
    color: var(--muted-strong);
}

.venue__side {
    display: grid;
    gap: var(--s-5);
}

.venue__priceCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
    padding: var(--s-6);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.54);
}

.venue__priceCard strong {
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 500;
}

.venue__form,
.venue__contact {
    padding: clamp(1.5rem, 4vw, 2.5rem);
    border-color: rgba(255, 255, 255, 0.72);
}

.venue__sideText {
    margin-top: var(--s-4);
    color: var(--muted);
    font-size: 1.08rem;
    line-height: 1.5;
}

.venue__label {
    margin-top: var(--s-5);
    display: grid;
    gap: var(--s-3);
    color: var(--muted);
    font-size: 1rem;
}

.venue__form input,
.venue__form textarea {
    width: 100%;
    margin-top: var(--s-3);
    border: 1px solid var(--border);
    border-radius: 14px;
    background: rgba(247, 245, 241, 0.72);
    padding: 0.95rem 1rem;
    color: var(--ink);
}

.venue__label input {
    margin-top: 0;
}

.venue__form textarea {
    min-height: 180px;
    resize: vertical;
}

.venue__submit {
    width: 100%;
    margin-top: var(--s-4);
}

.venue__link {
    display: block;
    margin-top: var(--s-4);
    color: var(--accent-strong);
    font-weight: 700;
    text-decoration: none;
}

.venue__muted {
    margin-top: var(--s-4);
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

    .venue__contentInner,
    .venue__facts,
    .venue__amenities {
        grid-template-columns: 1fr;
    }
}
</style>
