<template>
  <div class="quicklist">
    <Transition name="quicklist-panel">
      <section v-if="open" id="quicklist-panel" class="quicklist__panel" role="dialog" :aria-label="copy.title">
        <header class="quicklist__header">
          <div><span>{{ copy.planning }}</span><h2>{{ copy.title }}</h2></div>
          <button type="button" :aria-label="copy.close" @click="open = false">×</button>
        </header>

        <div class="quicklist__body">
          <section>
            <div class="quicklist__sectionHead"><h3>{{ copy.saved }}</h3><span>{{ venues.length }}</span></div>
            <p v-if="!venues.length" class="quicklist__empty">{{ copy.empty }}</p>
            <ul v-else class="quicklist__list">
              <li v-for="venue in venues" :key="venue.id">
                <NuxtLink :to="localePath({ name: 'wedding-venues-slug', params: { slug: venue.slug } })" @click="open = false">
                  <b>♥</b><span>{{ venue.name }}</span>
                </NuxtLink>
                <button type="button" :aria-label="`${copy.remove} ${venue.name}`" @click="removeVenue(venue.id)">×</button>
              </li>
            </ul>
          </section>

          <section class="quicklist__savedSection">
            <div class="quicklist__sectionHead"><h3>{{ copy.savedVendors }}</h3><span>{{ vendors.length }}</span></div>
            <p v-if="!vendors.length" class="quicklist__empty">{{ copy.emptyVendors }}</p>
            <ul v-else class="quicklist__list">
              <li v-for="vendor in vendors" :key="vendor.id">
                <NuxtLink :to="vendorPath(vendor)" @click="open = false">
                  <b>♥</b><span>{{ vendor.name }}</span>
                </NuxtLink>
                <button type="button" :aria-label="`${copy.remove} ${vendor.name}`" @click="removeVendor(vendor.id)">×</button>
              </li>
            </ul>
          </section>

          <section class="quicklist__tasks">
            <div class="quicklist__sectionHead"><h3>{{ copy.checklist }}</h3><span>{{ completedCount }}/{{ tasks.length }}</span></div>
            <form class="quicklist__add" @submit.prevent="submitTask">
              <input v-model="newTask" :placeholder="copy.placeholder" :aria-label="copy.placeholder" />
              <button type="submit" :aria-label="copy.add">+</button>
            </form>
            <ul v-if="tasks.length" class="quicklist__list">
              <li v-for="task in tasks" :key="task.id">
                <label>
                  <input :checked="task.done" type="checkbox" @change="toggleTask(task.id)" />
                  <span :class="{ done: task.done }">{{ task.label }}</span>
                </label>
                <button type="button" :aria-label="`${copy.remove} ${task.label}`" @click="removeTask(task.id)">×</button>
              </li>
            </ul>
          </section>
        </div>

        <footer class="quicklist__footer">
          <button type="button" :disabled="!contactableListings.length" @click="contactAll">✉ {{ copy.contact }}</button>
          <p>{{ contactNote }}</p>
        </footer>
      </section>
    </Transition>

    <button class="quicklist__trigger" type="button" aria-controls="quicklist-panel" :aria-expanded="open" @click="open = !open">
      <span>♥</span><span>{{ copy.title }}</span><b v-if="totalCount">{{ totalCount }}</b>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();
const { venues, vendors, tasks, initialize, removeVenue, removeVendor, addTask, toggleTask, removeTask } = useQuicklist();
const open = ref(false);
const newTask = ref("");
const isEs = computed(() => locale.value === "es");
const totalCount = computed(() => venues.value.length + vendors.value.length + tasks.value.filter((task) => !task.done).length);
const completedCount = computed(() => tasks.value.filter((task) => task.done).length);
const contactableListings = computed(() => [...venues.value, ...vendors.value].filter((listing) => listing.email));
const copy = computed(() => isEs.value ? {
  planning: "Tu planeación", title: "Lista rápida", saved: "Lugares guardados", savedVendors: "Proveedores guardados", checklist: "Pendientes",
  empty: "Guarda lugares para compararlos aquí.", emptyVendors: "Guarda proveedores para encontrarlos aquí.", placeholder: "Agregar un pendiente…", add: "Agregar pendiente",
  remove: "Eliminar", close: "Cerrar lista rápida", contact: "Contactar seleccionados",
} : {
  planning: "Your planning", title: "Quicklist", saved: "Saved venues", savedVendors: "Saved vendors", checklist: "Checklist",
  empty: "Save venues to compare them here.", emptyVendors: "Save vendors to find them here.", placeholder: "Add a to-do…", add: "Add task",
  remove: "Remove", close: "Close quicklist", contact: "Contact selected venues",
});
const contactNote = computed(() => {
  if (!venues.value.length && !vendors.value.length) return isEs.value ? "Guarda un lugar o proveedor para comenzar." : "Save a venue or vendor to get started.";
  if (!contactableListings.value.length) return isEs.value ? "Tus selecciones aún no publican un correo." : "Your saved selections do not publish an email yet.";
  return isEs.value ? `Se abrirá un correo para ${contactableListings.value.length} selecciones.` : `Opens one email draft for ${contactableListings.value.length} selections.`;
});
function vendorPath(vendor: { categorySlug: string; slug: string }) {
  const base = isEs.value ? "proveedores" : "vendors";
  return `/${locale.value}/${base}/${vendor.categorySlug}/${vendor.slug}`;
}
function submitTask() { addTask(newTask.value); newTask.value = ""; }
function contactAll() {
  const emails = contactableListings.value.map((listing) => listing.email).filter(Boolean).join(",");
  const names = contactableListings.value.map((listing) => listing.name).join(", ");
  const subject = isEs.value ? "Consulta para boda en San Miguel de Allende" : "Wedding inquiry in San Miguel de Allende";
  const body = isEs.value
    ? `Hola,\n\nNos interesa conocer disponibilidad y precios para nuestra boda.\n\nSelecciones: ${names}\n\nGracias.`
    : `Hello,\n\nWe're interested in availability and pricing for our wedding.\n\nSelections: ${names}\n\nThank you.`;
  window.location.href = `mailto:?bcc=${encodeURIComponent(emails)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
onMounted(initialize);
</script>

<style scoped>
.quicklist{position:fixed;right:clamp(1rem,3vw,2rem);bottom:clamp(1rem,3vw,2rem);z-index:80}.quicklist__trigger{display:flex;align-items:center;gap:.65rem;min-height:3.25rem;padding:.6rem .75rem .6rem 1rem;border:1px solid #ffffff40;border-radius:999px;background:var(--ink);color:#fff;box-shadow:0 16px 45px #1512103d;font:inherit;font-weight:700;cursor:pointer}.quicklist__trigger>span:first-child{color:#e5a58f}.quicklist__trigger b{display:grid;place-items:center;min-width:1.9rem;height:1.9rem;padding:0 .4rem;border-radius:999px;background:var(--accent);font-size:.82rem}.quicklist__panel{position:absolute;right:0;bottom:calc(100% + .75rem);width:min(25rem,calc(100vw - 2rem));max-height:min(42rem,calc(100svh - 6rem));overflow:hidden;border:1px solid #53483b1f;border-radius:var(--radius);background:#fffffff9;box-shadow:0 28px 80px #241c1638;backdrop-filter:blur(18px)}.quicklist__header{display:flex;align-items:flex-start;justify-content:space-between;padding:1.35rem 1.35rem 1rem;border-bottom:1px solid var(--border)}.quicklist__header span{color:var(--accent-strong);font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.quicklist__header h2{margin-top:.18rem;font-size:1.55rem;font-weight:600}.quicklist__header button,.quicklist__list>li>button{border:0;background:transparent;color:var(--muted-strong);font:inherit;font-size:1.25rem;cursor:pointer}.quicklist__body{display:grid;gap:1.35rem;max-height:25rem;padding:1.1rem 1.35rem;overflow-y:auto}.quicklist__sectionHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:.7rem}.quicklist__sectionHead h3{font-size:.96rem}.quicklist__sectionHead span{padding:.18rem .48rem;border-radius:999px;background:var(--surface-soft);color:var(--muted-strong);font-size:.74rem}.quicklist__empty{padding:.9rem;border:1px dashed #53483b2e;border-radius:var(--radius);color:var(--muted-strong);font-size:.86rem;text-align:center}.quicklist__list{display:grid;gap:.45rem;margin:0;padding:0;list-style:none}.quicklist__list li{display:flex;align-items:center;justify-content:space-between;gap:.6rem;min-height:2.55rem;padding:.5rem .65rem;border-radius:var(--radius-sm);background:var(--surface-soft);font-size:.86rem}.quicklist__list a,.quicklist__list label{display:flex;align-items:center;gap:.55rem;min-width:0;color:var(--ink);text-decoration:none}.quicklist__list b{color:var(--accent)}.quicklist__tasks{padding-top:.1rem;border-top:1px solid var(--border)}.quicklist__add{display:grid;grid-template-columns:1fr 2.5rem;gap:.45rem;margin-bottom:.65rem}.quicklist__add input{min-width:0;padding:.7rem .8rem;border:1px solid var(--border);border-radius:var(--radius-sm);background:#fff;font:inherit;font-size:.86rem}.quicklist__add button{border:0;border-radius:var(--radius-sm);background:var(--agave);color:#fff;font-size:1.2rem;cursor:pointer}.quicklist__list input{accent-color:var(--accent)}.done{color:var(--muted);text-decoration:line-through}.quicklist__footer{padding:1rem 1.35rem 1.2rem;border-top:1px solid var(--border)}.quicklist__footer>button{width:100%;min-height:2.85rem;border:0;border-radius:var(--radius-sm);background:var(--accent);color:#fff;font:inherit;font-weight:750;cursor:pointer}.quicklist__footer>button:disabled{background:#d8d2cc;cursor:not-allowed}.quicklist__footer p{margin-top:.55rem;color:var(--muted-strong);font-size:.74rem;text-align:center}.quicklist-panel-enter-active,.quicklist-panel-leave-active{transition:opacity 160ms var(--ease),transform 160ms var(--ease)}.quicklist-panel-enter-from,.quicklist-panel-leave-to{opacity:0;transform:translateY(8px) scale(.98)}@media(max-width:520px){.quicklist{right:.75rem;bottom:.75rem}.quicklist__panel{width:calc(100vw - 1.5rem)}.quicklist__body{max-height:calc(100svh - 23rem)}}@media(prefers-reduced-motion:reduce){.quicklist-panel-enter-active,.quicklist-panel-leave-active{transition:none}}
</style>
