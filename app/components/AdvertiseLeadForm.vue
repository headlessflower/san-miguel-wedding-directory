<template>
  <form class="lead" @submit.prevent="onSubmit">
    <div class="lead__head">
      <h2 class="lead__title">{{ isEs ? "Solicita información" : "Request info" }}</h2>
      <p class="lead__sub">
        {{
          isEs
              ? "Cuéntanos sobre tu negocio y el tipo de promoción que te interesa."
              : "Tell us about your business and the promotion you want."
        }}
      </p>
    </div>

    <div class="lead__grid">
      <label class="lead__field">
        <span class="lead__label">{{ isEs ? "Nombre" : "Name" }}</span>
        <input v-model="form.name" class="lead__input" type="text" autocomplete="name" required />
      </label>

      <label class="lead__field">
        <span class="lead__label">{{ isEs ? "Correo" : "Email" }}</span>
        <input v-model="form.email" class="lead__input" type="email" autocomplete="email" required />
      </label>

      <label class="lead__field">
        <span class="lead__label">{{ isEs ? "Negocio" : "Business" }}</span>
        <input v-model="form.business" class="lead__input" type="text" />
      </label>

      <label class="lead__field">
        <span class="lead__label">{{ isEs ? "Categoría" : "Category" }}</span>
        <input v-model="form.category" class="lead__input" type="text" placeholder="planner / venue / florist..." />
      </label>

      <label class="lead__field lead__field--full">
        <span class="lead__label">{{ isEs ? "Mensaje" : "Message" }}</span>
        <textarea v-model="form.message" class="lead__textarea" rows="5"></textarea>
      </label>
    </div>

    <div class="lead__actions">
      <button class="btn btn--primary" type="submit" :disabled="busy">
        {{ busy ? (isEs ? "Enviando..." : "Sending...") : (isEs ? "Enviar" : "Send") }}
      </button>

      <p v-if="status === 'ok'" class="lead__ok">
        {{ isEs ? "Listo. Te contactaremos pronto." : "Sent. We'll get back to you soon." }}
      </p>

      <p v-if="status === 'error'" class="lead__err">
        {{ isEs ? "Hubo un error. Intenta de nuevo." : "Something went wrong. Try again." }}
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/i18n";

const props = defineProps<{
  locale: Locale;
  preset?: {
    listingType?: "venue" | "vendor";
    listingId?: string;
    listingSlug?: string;
  };
}>();

const isEs = computed(() => props.locale === "es");

const form = reactive({
  name: "",
  email: "",
  business: "",
  category: "",
  message: "",
  listingType: props.preset?.listingType || "",
  listingId: props.preset?.listingId || "",
  listingSlug: props.preset?.listingSlug || "",
});

const busy = ref(false);
const status = ref<"idle" | "ok" | "error">("idle");

async function onSubmit() {
  status.value = "idle";
  busy.value = true;

  try {
    const res = await $fetch("/api/advertise-lead", {
      method: "POST",
      body: { ...form, locale: props.locale },
    });

    if ((res as any)?.ok) {
      status.value = "ok";
      // keep business/category; clear personal message
      form.message = "";
    } else {
      status.value = "error";
    }
  } catch {
    status.value = "error";
  } finally {
    busy.value = false;
  }
}
</script>

<style scoped>
.lead {
  padding: var(--s-6);
}

.lead__title {
  font-size: 20px;
  color: var(--ink);
}

.lead__sub {
  margin-top: var(--s-2);
  max-width: 70ch;
}

.lead__grid {
  margin-top: var(--s-5);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s-4);
}

@media (max-width: 900px) {
  .lead__grid {
    grid-template-columns: 1fr;
  }
}

.lead__field {
  display: grid;
  gap: 8px;
}

.lead__field--full {
  grid-column: 1 / -1;
}

.lead__label {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.65);
}

.lead__input,
.lead__textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.85);
  padding: 10px 12px;
  color: var(--ink);
}

.lead__actions {
  margin-top: var(--s-5);
  display: flex;
  align-items: center;
  gap: var(--s-4);
  flex-wrap: wrap;
}

.lead__ok {
  font-weight: 800;
}

.lead__err {
  font-weight: 800;
}

@media (max-width: 640px) {
  .lead {
    padding: var(--s-5);
  }

  .lead__input,
  .lead__textarea {
    border-radius: var(--radius-xs);
  }

  .lead__actions {
    align-items: stretch;
    flex-direction: column;
  }

  .lead__actions .btn {
    width: 100%;
  }
}
</style>
