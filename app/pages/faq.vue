<template>
  <main class="faqPage">
    <section class="faqPage__hero">
      <div class="container faqPage__heroInner">
        <p class="faqPage__kicker">{{ isEs ? "Ayuda" : "Help" }}</p>
        <h1>{{ isEs ? "Preguntas frecuentes" : "Frequently asked questions" }}</h1>
        <p class="faqPage__intro">
          {{
            isEs
              ? "Respuestas rapidas para parejas, lugares y proveedores que usan el directorio."
              : "Quick answers for couples, venues, and vendors using the directory."
          }}
        </p>
      </div>
    </section>

    <section class="faqPage__section">
      <div class="container faqPage__grid">
        <article v-for="item in faqs" :key="item.q" class="faqPage__item">
          <h2>{{ item.q }}</h2>
          <p>{{ item.a }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const isEs = computed(() => locale.value === "es");

const faqs = computed(() =>
  isEs.value
    ? [
        {
          q: "¿El directorio es solo para San Miguel de Allende?",
          a: "Si. Nos enfocamos en lugares y proveedores que trabajan bodas en San Miguel de Allende y zonas cercanas.",
        },
        {
          q: "¿Como contacto a un lugar o proveedor?",
          a: "Cada perfil puede incluir sitio web, Instagram, telefono o correo. Recomendamos confirmar disponibilidad, precios y condiciones directamente.",
        },
        {
          q: "¿Puedo anunciar mi negocio?",
          a: "Si. Los lugares y proveedores pueden solicitar un plan destacado, patrocinado o impulso de 90 dias desde la pagina de publicidad.",
        },
        {
          q: "¿El directorio verifica todos los datos?",
          a: "Trabajamos para mantener la informacion clara, pero los detalles de disponibilidad, precios y contratos deben confirmarse con cada negocio.",
        },
        {
          q: "¿La newsletter es para parejas o proveedores?",
          a: "Principalmente para parejas que planean boda, con ideas, guias y recomendaciones locales. Tambien puede ser util para negocios que quieren entender la demanda.",
        },
        {
          q: "¿Puedo sugerir un lugar o proveedor?",
          a: "Si. Envia los detalles desde la pagina de publicidad o contacto y revisaremos si encaja con el directorio.",
        },
      ]
    : [
        {
          q: "Is the directory only for San Miguel de Allende?",
          a: "Yes. We focus on venues and vendors serving weddings in San Miguel de Allende and nearby areas.",
        },
        {
          q: "How do I contact a venue or vendor?",
          a: "Each profile can include a website, Instagram, phone, or email. Confirm availability, pricing, and terms directly with the business.",
        },
        {
          q: "Can I advertise my business?",
          a: "Yes. Venues and vendors can request featured, sponsored, or 90-day boost placements from the advertising page.",
        },
        {
          q: "Does the directory verify every detail?",
          a: "We work to keep information clear, but availability, pricing, policies, and contracts should be confirmed with each business.",
        },
        {
          q: "Who is the newsletter for?",
          a: "It is mainly for couples planning a wedding, with local ideas, guides, and recommendations. Vendors can use it to understand what couples are looking for too.",
        },
        {
          q: "Can I suggest a venue or vendor?",
          a: "Yes. Send details through the advertising or contact flow and we will review whether it fits the directory.",
        },
      ],
);

useSeoMeta(() => {
  const title = isEs.value ? "FAQ | Directorio de bodas" : "FAQ | Wedding directory";
  const description = isEs.value
    ? "Preguntas frecuentes sobre el directorio de bodas en San Miguel de Allende."
    : "Frequently asked questions about the San Miguel de Allende wedding directory.";

  return { title, description, ogTitle: title, ogDescription: description };
});
</script>

<style scoped>
.faqPage__hero {
  padding: var(--s-9) 0 var(--s-6);
}

.faqPage__heroInner {
  max-width: 58rem;
}

.faqPage__kicker {
  margin-bottom: var(--s-3);
  color: var(--accent-strong);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.faqPage h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
}

.faqPage__intro {
  margin-top: var(--s-4);
  max-width: 48rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.faqPage__section {
  padding: var(--s-6) 0 var(--s-9);
}

.faqPage__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s-4);
}

.faqPage__item {
  min-width: 0;
  padding: var(--s-6);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
}

.faqPage__item h2 {
  font-size: 1.2rem;
}

.faqPage__item p {
  margin-top: var(--s-3);
  line-height: 1.6;
}

@media (max-width: 760px) {
  .faqPage__grid {
    grid-template-columns: 1fr;
  }
}
</style>
