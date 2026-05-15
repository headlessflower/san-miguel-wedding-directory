<template>
  <main class="salesPage">
    <section class="salesPage__hero">
      <div class="container salesPage__heroGrid">
        <div>
          <p class="salesPage__kicker">{{ isEs ? "Para lugares y proveedores" : "For venues and vendors" }}</p>
          <h1>
            {{
              isEs
                ? "Pon tu negocio frente a parejas que ya estan planeando"
                : "Put your business in front of couples already planning"
            }}
          </h1>
          <p class="salesPage__intro">
            {{
              isEs
                ? "San Miguel Wedding Venues ayuda a parejas bilingues y de destino a comparar lugares, proveedores y recursos locales en un solo lugar."
                : "San Miguel Wedding Venues helps bilingual and destination couples compare venues, vendors, and local planning resources in one place."
            }}
          </p>
          <div class="salesPage__actions">
            <NuxtLink :to="advertise" class="btn btn--primary">
              {{ isEs ? "Ver planes" : "View plans" }}
            </NuxtLink>
            <NuxtLink :to="`${advertise}#lead`" class="btn">
              {{ isEs ? "Solicitar informacion" : "Request information" }}
            </NuxtLink>
          </div>
        </div>

        <aside class="salesPage__proof">
          <p class="salesPage__proofNumber">3</p>
          <p>{{ isEs ? "formas de visibilidad: destacado, patrocinado e impulso de 90 dias." : "visibility options: featured, sponsored, and 90-day boosts." }}</p>
        </aside>
      </div>
    </section>

    <section class="salesPage__section">
      <div class="container">
        <div class="salesPage__reasons">
          <article v-for="reason in reasons" :key="reason.title" class="salesPage__reason">
            <p class="salesPage__reasonStep">{{ reason.step }}</p>
            <h2>{{ reason.title }}</h2>
            <p>{{ reason.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="salesPage__section salesPage__section--cta">
      <div class="container salesPage__cta">
        <h2>{{ isEs ? "Listo para aparecer donde las parejas buscan?" : "Ready to show up where couples are searching?" }}</h2>
        <NuxtLink :to="advertise" class="btn btn--primary">
          {{ isEs ? "Comparar paquetes" : "Compare packages" }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();

const isEs = computed(() => locale.value === "es");
const advertise = computed(() => localePath({ name: "advertise" }));

const reasons = computed(() =>
  isEs.value
    ? [
        {
          step: "01",
          title: "Llegas a parejas con intencion",
          text: "Las personas que visitan el directorio ya estan buscando lugares, fotografos, banquetes, planners y otros servicios para San Miguel.",
        },
        {
          step: "02",
          title: "Tu perfil vive en contexto",
          text: "Apareces junto a categorias, guias y busquedas relevantes, no como un anuncio aislado fuera del proceso de decision.",
        },
        {
          step: "03",
          title: "Puedes subir visibilidad cuando importa",
          text: "Usa planes mensuales o impulsos de 90 dias para fechas clave, temporada alta, lanzamientos o disponibilidad que quieres llenar.",
        },
      ]
    : [
        {
          step: "01",
          title: "Reach couples with intent",
          text: "Visitors are already searching for San Miguel venues, photographers, catering, planners, rentals, and wedding services.",
        },
        {
          step: "02",
          title: "Show up in the planning context",
          text: "Your profile appears alongside relevant categories, guides, and searches instead of sitting apart from the decision process.",
        },
        {
          step: "03",
          title: "Increase visibility when it matters",
          text: "Use monthly plans or 90-day boosts for peak season, launch moments, open dates, or services you want to promote.",
        },
      ],
);

useSeoMeta(() => {
  const title = isEs.value ? "Por que anunciarte | Directorio de bodas" : "Why advertise | Wedding directory";
  const description = isEs.value
    ? "Razones para anunciar tu lugar o negocio de bodas en el directorio de San Miguel de Allende."
    : "Reasons to advertise your wedding venue or vendor business in the San Miguel de Allende directory.";

  return { title, description, ogTitle: title, ogDescription: description };
});
</script>

<style scoped>
.salesPage__hero {
  padding: var(--s-9) 0 var(--s-7);
}

.salesPage__heroGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.35fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: end;
}

.salesPage__kicker,
.salesPage__reasonStep {
  color: var(--accent-strong);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.salesPage h1 {
  margin-top: var(--s-3);
  max-width: 58rem;
  font-size: clamp(2.5rem, 6vw, 4.8rem);
}

.salesPage__intro {
  margin-top: var(--s-4);
  max-width: 50rem;
  font-size: 1.12rem;
  line-height: 1.6;
}

.salesPage__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
  margin-top: var(--s-6);
}

.salesPage__proof {
  padding: var(--s-6);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.salesPage__proofNumber {
  color: var(--ink);
  font-size: 4rem;
  font-weight: 900;
  line-height: 1;
}

.salesPage__proof p + p {
  margin-top: var(--s-3);
  line-height: 1.55;
}

.salesPage__section {
  padding: var(--s-7) 0;
}

.salesPage__reasons {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s-4);
}

.salesPage__reason {
  min-width: 0;
  padding: var(--s-6);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
}

.salesPage__reason h2 {
  margin-top: var(--s-5);
  font-size: 1.45rem;
}

.salesPage__reason p:last-child {
  margin-top: var(--s-3);
  line-height: 1.6;
}

.salesPage__section--cta {
  padding-bottom: var(--s-9);
}

.salesPage__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-5);
  padding: var(--s-7);
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
}

.salesPage__cta h2 {
  max-width: 48rem;
  font-size: clamp(1.8rem, 4vw, 3rem);
}

@media (max-width: 880px) {
  .salesPage__heroGrid,
  .salesPage__reasons {
    grid-template-columns: 1fr;
  }

  .salesPage__cta {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
