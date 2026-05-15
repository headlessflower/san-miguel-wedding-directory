<template>
  <main class="newsletterPage">
    <section class="newsletterPage__hero">
      <div class="container newsletterPage__layout">
        <div class="newsletterPage__copy">
          <p class="newsletterPage__kicker">{{ isEs ? "Newsletter" : "Newsletter" }}</p>
          <h1>
            {{
              isEs
                ? "Ideas locales para planear una boda en San Miguel"
                : "Local ideas for planning a San Miguel wedding"
            }}
          </h1>
          <p class="newsletterPage__intro">
            {{
              isEs
                ? "Recibe guias, lugares destacados, proveedores recomendados y consejos para organizar una boda destino con menos friccion."
                : "Get guides, featured venues, vendor recommendations, and practical notes for planning a destination wedding with less friction."
            }}
          </p>
        </div>

        <form class="newsletterPage__form" @submit.prevent="submitted = true">
          <label>
            <span>{{ isEs ? "Correo electronico" : "Email address" }}</span>
            <input
              v-model="email"
              type="email"
              required
              :placeholder="isEs ? 'tu@email.com' : 'you@example.com'"
            />
          </label>

          <label>
            <span>{{ isEs ? "Fecha tentativa" : "Approximate wedding date" }}</span>
            <input v-model="date" type="text" :placeholder="isEs ? 'Primavera 2027' : 'Spring 2027'" />
          </label>

          <button class="btn btn--primary" type="submit">
            {{ isEs ? "Unirme" : "Sign up" }}
          </button>

          <p v-if="submitted" class="newsletterPage__thanks">
            {{
              isEs
                ? "Gracias. Ya tenemos tus datos para la lista de bodas."
                : "Thanks. You are on the wedding planning list."
            }}
          </p>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const isEs = computed(() => locale.value === "es");

const email = ref("");
const date = ref("");
const submitted = ref(false);

useSeoMeta(() => {
  const title = isEs.value ? "Newsletter de bodas en San Miguel" : "San Miguel wedding newsletter";
  const description = isEs.value
    ? "Ideas, guias y recomendaciones para planear una boda en San Miguel de Allende."
    : "Ideas, guides, and recommendations for planning a wedding in San Miguel de Allende.";

  return { title, description, ogTitle: title, ogDescription: description };
});
</script>

<style scoped>
.newsletterPage__hero {
  padding: var(--s-9) 0;
}

.newsletterPage__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(20rem, 0.72fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
}

.newsletterPage__kicker {
  margin-bottom: var(--s-3);
  color: var(--accent-strong);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.newsletterPage h1 {
  max-width: 52rem;
  font-size: clamp(2.5rem, 6vw, 4.7rem);
}

.newsletterPage__intro {
  margin-top: var(--s-4);
  max-width: 45rem;
  font-size: 1.12rem;
  line-height: 1.6;
}

.newsletterPage__form {
  display: grid;
  gap: var(--s-4);
  padding: var(--s-6);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}

.newsletterPage__form label {
  display: grid;
  gap: var(--s-2);
  color: var(--muted-strong);
  font-weight: 700;
}

.newsletterPage__form input {
  min-height: 3.2rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  padding: 0 var(--s-4);
  color: var(--ink);
  background: var(--surface-soft);
}

.newsletterPage__thanks {
  color: var(--accent-strong);
  font-weight: 700;
}

@media (max-width: 860px) {
  .newsletterPage__layout {
    grid-template-columns: 1fr;
  }
}
</style>
