<template>
  <main class="adv">
    <section class="adv__hero">
      <div class="container">
        <h1 class="adv__title">{{ isEs ? "Publicidad" : "Advertise" }}</h1>
        <p class="adv__subtitle">
          {{ isEs
            ? "Promociona tu negocio frente a parejas planeando bodas en San Miguel de Allende."
            : "Put your business in front of couples planning weddings in San Miguel de Allende." }}
        </p>
      </div>
    </section>

    <section class="adv__section">
      <div class="container adv__grid">
        <div class="adv__card card">
          <h2 class="adv__plan">{{ isEs ? "Estándar" : "Standard" }}</h2>
          <p class="adv__price">$0</p>
          <ul class="adv__list">
            <li>{{ isEs ? "Listado básico" : "Basic listing" }}</li>
            <li>{{ isEs ? "Aparece en resultados" : "Appears in results" }}</li>
          </ul>
        </div>

        <div class="adv__card card">
          <h2 class="adv__plan">{{ isEs ? "Destacado" : "Featured" }}</h2>
          <p class="adv__price">$79<span class="adv__per">/mo</span></p>
          <ul class="adv__list">
            <li>{{ isEs ? "Prioridad en listados" : "Priority in category lists" }}</li>
            <li>{{ isEs ? "Badge destacado" : "Featured badge" }}</li>
            <li>{{ isEs ? "Mejor tarjeta" : "Enhanced card" }}</li>
          </ul>
        </div>

        <div class="adv__card card">
          <h2 class="adv__plan">{{ isEs ? "Patrocinado" : "Sponsored" }}</h2>
          <p class="adv__price">$199<span class="adv__per">/mo</span></p>
          <ul class="adv__list">
            <li>{{ isEs ? "Top placement" : "Top placement" }}</li>
            <li>{{ isEs ? "Badge patrocinado" : "Sponsored badge" }}</li>
            <li>{{ isEs ? "Slot publicitario" : "Ad slot placement" }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="adv__section">
      <div class="container adv__cta card">
        <h2 class="adv__ctaTitle">{{ isEs ? "¿Quieres anunciarte?" : "Want to advertise?" }}</h2>
        <p class="adv__ctaText">
          {{ isEs
            ? "Envíanos tu info y te respondemos con disponibilidad y opciones."
            : "Send your details and we’ll reply with availability and options." }}
        </p>

        <a class="btn btn--primary" :href="mailto">
          {{ isEs ? "Contactar" : "Contact" }}
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const isEs = computed(() => locale.value === "es");

const mailto = computed(() => {
  const subject = encodeURIComponent(isEs.value ? "Publicidad / Directorio SMA" : "Advertising / SMA Directory");
  const body = encodeURIComponent(
      isEs.value
          ? "Hola, me interesa anunciarme. Mi negocio es:\nSitio web:\nInstagram:\nCategoría:\n"
          : "Hi, I'm interested in advertising. My business is:\nWebsite:\nInstagram:\nCategory:\n"
  );
  return `mailto:solarsustain@gmail.com?subject=${subject}&body=${body}`;
});

useSeoMeta(() => ({
  title: isEs.value ? "Publicidad • San Miguel" : "Advertise • San Miguel",
  description: isEs.value
      ? "Paquetes de publicidad y listados destacados para negocios de bodas en San Miguel de Allende."
      : "Advertising and featured listing packages for wedding businesses in San Miguel de Allende.",
}));
</script>

<style scoped>
.adv__hero { padding: var(--s-8) 0 var(--s-5); }
.adv__title { font-size: 40px; }
.adv__subtitle { margin-top: var(--s-3); max-width: 70ch; }

.adv__section { padding: var(--s-6) 0; }
.adv__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s-4);
}
@media (max-width: 900px) { .adv__grid { grid-template-columns: 1fr; } }

.adv__card { padding: var(--s-5); }
.adv__plan { font-size: 18px; color: var(--ink); }
.adv__price { margin-top: var(--s-3); font-size: 28px; font-weight: 900; }
.adv__per { font-size: 14px; font-weight: 700; opacity: 0.65; margin-left: 6px; }
.adv__list { margin-top: var(--s-4); padding-left: 18px; }

.adv__cta { padding: var(--s-6); }
.adv__ctaTitle { font-size: 20px; color: var(--ink); }
.adv__ctaText { margin-top: var(--s-2); }
</style>
