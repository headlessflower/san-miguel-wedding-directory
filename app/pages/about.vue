<template>
  <main class="whyPage">
    <section class="whyPage__hero">
      <div class="container whyPage__heroGrid">
        <div class="whyPage__heroCopy">
          <p class="whyPage__eyebrow">{{ copy.eyebrow }}</p>
          <h1>{{ copy.title }}</h1>
          <p class="whyPage__lede">{{ copy.lede }}</p>
          <div class="whyPage__actions">
            <NuxtLink :to="venuesTo" class="whyPage__button whyPage__button--primary">
              {{ copy.browseVenues }} <span aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink :to="vendorsTo" class="whyPage__button whyPage__button--secondary">
              {{ copy.browseVendors }}
            </NuxtLink>
          </div>
        </div>

        <figure class="whyPage__preview">
          <NuxtImg
            src="/images/about/quicklist-planning.png"
            :alt="isEs ? 'Quicklist con lugares, proveedores y tareas guardadas' : 'Quicklist with saved venues, vendors, and planning tasks'"
            width="898"
            height="1260"
            sizes="100vw md:50vw lg:560px"
            format="webp"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>

    <section class="whyPage__proof">
      <div class="container whyPage__proofGrid">
        <div v-for="item in copy.proof" :key="item.label" class="whyPage__proofItem">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </section>

    <section class="whyPage__section">
      <div class="container">
        <div class="whyPage__sectionHead">
          <p class="whyPage__eyebrow">{{ copy.featuresEyebrow }}</p>
          <h2>{{ copy.featuresTitle }}</h2>
          <p>{{ copy.featuresIntro }}</p>
        </div>
        <div class="whyPage__featureGrid">
          <article v-for="(feature, index) in copy.features" :key="feature.title" class="whyPage__feature">
            <span class="whyPage__featureNumber">0{{ index + 1 }}</span>
            <span class="whyPage__featureIcon" aria-hidden="true">{{ feature.icon }}</span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="whyPage__compare">
      <div class="container">
        <div class="whyPage__sectionHead whyPage__sectionHead--light">
          <p class="whyPage__eyebrow">{{ copy.compareEyebrow }}</p>
          <h2>{{ copy.compareTitle }}</h2>
          <p>{{ copy.compareIntro }}</p>
        </div>
        <div class="whyPage__compareGrid">
          <div class="whyPage__compareCard whyPage__compareCard--manual">
            <p class="whyPage__compareLabel">{{ copy.manualTitle }}</p>
            <ul>
              <li v-for="item in copy.manualItems" :key="item"><span>×</span>{{ item }}</li>
            </ul>
          </div>
          <div class="whyPage__compareCard whyPage__compareCard--smwc">
            <p class="whyPage__compareLabel">{{ copy.smwcTitle }}</p>
            <ul>
              <li v-for="item in copy.smwcItems" :key="item"><span>✓</span>{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="whyPage__steps">
      <div class="container whyPage__stepsGrid">
        <div class="whyPage__stepsCopy">
          <p class="whyPage__eyebrow">{{ copy.stepsEyebrow }}</p>
          <h2>{{ copy.stepsTitle }}</h2>
          <p>{{ copy.stepsIntro }}</p>
        </div>
        <ol class="whyPage__stepList">
          <li v-for="(step, index) in copy.steps" :key="step.title">
            <span>{{ index + 1 }}</span>
            <div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div>
          </li>
        </ol>
      </div>
    </section>

    <section class="whyPage__cta">
      <div class="container">
        <div class="whyPage__ctaPanel">
          <p class="whyPage__eyebrow">{{ copy.ctaEyebrow }}</p>
          <h2>{{ copy.ctaTitle }}</h2>
          <p>{{ copy.ctaText }}</p>
          <div class="whyPage__actions whyPage__actions--center">
            <NuxtLink :to="venuesTo" class="whyPage__button whyPage__button--light">{{ copy.browseVenues }} →</NuxtLink>
            <NuxtLink :to="searchTo" class="whyPage__textLink">{{ copy.searchAll }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();
const isEs = computed(() => locale.value === "es");

const venuesTo = computed(() => localePath({ name: "wedding-venues" }));
const vendorsTo = computed(() => localePath({ name: "vendors" }));
const searchTo = computed(() => localePath({ name: "search" }));

const copy = computed(() => isEs.value ? {
  eyebrow: "Planea con claridad",
  title: "Menos pestañas. Mejores decisiones para tu boda.",
  lede: "SMWC reúne lugares, proveedores y conocimiento local de San Miguel de Allende en un directorio bilingüe hecho para comparar, descubrir y avanzar con confianza.",
  browseVenues: "Explorar lugares", browseVendors: "Ver proveedores", directory: "Directorio SMWC", onePlace: "Todo en un lugar", searchPrompt: "Buscar lugares y proveedores", bilingualNote: "Perfiles disponibles en inglés y español",
  previewItems: [{ icon: "⌂", title: "Lugares", detail: "Encuentra el espacio ideal" }, { icon: "✦", title: "Proveedores", detail: "Talento local por categoría" }, { icon: "♡", title: "Tu selección", detail: "Guarda tus favoritos" }],
  proof: [{ value: "1", label: "destino, investigado a fondo" }, { value: "12+", label: "categorías esenciales" }, { value: "EN / ES", label: "información bilingüe" }, { value: "Directo", label: "contacto con cada negocio" }],
  featuresEyebrow: "Hecho para parejas ocupadas", featuresTitle: "De la inspiración a una lista real", featuresIntro: "No necesitas convertirte en experta local para empezar a planear como una.",
  features: [{ icon: "⌕", title: "Descubrimiento enfocado", text: "Explora únicamente negocios que trabajan bodas en San Miguel, sin filtrar resultados irrelevantes de otras ciudades." }, { icon: "▤", title: "Detalles en contexto", text: "Consulta descripciones, servicios, fotos y datos útiles en perfiles consistentes que facilitan la comparación." }, { icon: "↗", title: "Contacto sin rodeos", text: "Pasa del perfil al sitio, Instagram, teléfono o correo del negocio para confirmar disponibilidad y cotizar." }, { icon: "♡", title: "Una selección personal", text: "Guarda lugares y proveedores prometedores mientras exploras para volver a tu lista cuando estés lista." }, { icon: "A/Ñ", title: "Bilingüe por diseño", text: "Planea en inglés o español y comparte opciones con familia, pareja y proveedores sin fricción." }, { icon: "☼", title: "Conocimiento del destino", text: "Complementa tu búsqueda con guías locales sobre temporadas, clima, estilos y decisiones propias de San Miguel." }],
  compareEyebrow: "Una mejor forma de investigar", compareTitle: "Tu tiempo merece algo mejor que una hoja de cálculo vacía", compareIntro: "La investigación manual dispersa la información. SMWC te da un punto de partida organizado y local.",
  manualTitle: "Hacerlo todo manualmente", manualItems: ["Saltar entre mapas, redes sociales y blogs", "Descifrar si un negocio realmente trabaja en San Miguel", "Comparar información en formatos distintos", "Perder favoritos entre pestañas y capturas", "Buscar contactos uno por uno"],
  smwcTitle: "Planear con SMWC", smwcItems: ["Explorar un directorio enfocado en el destino", "Filtrar por el tipo de servicio que necesitas", "Revisar perfiles claros y consistentes", "Guardar una selección en un solo lugar", "Contactar directamente desde cada perfil"],
  stepsEyebrow: "Simple desde el inicio", stepsTitle: "Tres pasos para tomar impulso", stepsIntro: "Empieza amplio, reduce tus opciones y conecta cuando estés lista. SMWC organiza el camino sin interponerse en tus decisiones.",
  steps: [{ title: "Explora", text: "Conoce lugares y profesionales por categoría." }, { title: "Compara y guarda", text: "Revisa los detalles y crea una selección corta." }, { title: "Conecta", text: "Contacta directamente para cotizar, confirmar y reservar." }],
  ctaEyebrow: "Tu boda en San Miguel empieza aquí", ctaTitle: "Convierte horas de búsqueda en una lista que sí te emocione.", ctaText: "Descubre los espacios y el equipo local que pueden dar vida a tu celebración.", searchAll: "Buscar en todo el directorio"
} : {
  eyebrow: "Plan with clarity",
  title: "Fewer tabs. Better wedding decisions.",
  lede: "SMWC brings San Miguel de Allende venues, vendors, and local knowledge into one bilingual directory built to help you compare, discover, and move forward with confidence.",
  browseVenues: "Explore venues", browseVendors: "Browse vendors", directory: "SMWC Directory", onePlace: "All in one place", searchPrompt: "Search venues and vendors", bilingualNote: "Profiles available in English and Spanish",
  previewItems: [{ icon: "⌂", title: "Venues", detail: "Find the right setting" }, { icon: "✦", title: "Vendors", detail: "Local talent by category" }, { icon: "♡", title: "Your shortlist", detail: "Keep favorites together" }],
  proof: [{ value: "1", label: "destination, deeply explored" }, { value: "12+", label: "essential categories" }, { value: "EN / ES", label: "bilingual information" }, { value: "Direct", label: "contact with every business" }],
  featuresEyebrow: "Built for busy couples", featuresTitle: "From inspiration to a real shortlist", featuresIntro: "You should not have to become a local expert before you can start planning like one.",
  features: [{ icon: "⌕", title: "Focused discovery", text: "Browse businesses serving San Miguel weddings without sorting through irrelevant results from everywhere else." }, { icon: "▤", title: "Details in context", text: "See descriptions, services, imagery, and useful details in consistent profiles that are easier to compare." }, { icon: "↗", title: "Direct contact", text: "Go from a profile to the business website, Instagram, phone, or email to check availability and request pricing." }, { icon: "♡", title: "A personal shortlist", text: "Save promising venues and vendors as you browse, so your strongest options are easy to return to." }, { icon: "A/Ñ", title: "Bilingual by design", text: "Plan in English or Spanish and share options with family, your partner, and local vendors more easily." }, { icon: "☼", title: "Destination insight", text: "Pair your search with local guides on seasons, weather, styles, and the decisions unique to a San Miguel wedding." }],
  compareEyebrow: "A better way to research", compareTitle: "Your time deserves better than a blank spreadsheet", compareIntro: "Manual research scatters the information. SMWC gives you an organized, local starting point.",
  manualTitle: "Doing it all manually", manualItems: ["Jump between maps, social media, and blogs", "Work out who actually serves San Miguel", "Compare information in different formats", "Lose favorites across tabs and screenshots", "Hunt down contact details one by one"],
  smwcTitle: "Planning with SMWC", smwcItems: ["Explore a destination-focused directory", "Filter by the service you need", "Review clear, consistent profiles", "Keep your shortlist in one place", "Contact businesses directly from each profile"],
  stepsEyebrow: "Simple from the start", stepsTitle: "Three steps to build momentum", stepsIntro: "Start broad, narrow the field, and connect when you are ready. SMWC organizes the path without getting between you and your decisions.",
  steps: [{ title: "Explore", text: "Discover venues and professionals by category." }, { title: "Compare & save", text: "Review the details and build a focused shortlist." }, { title: "Connect", text: "Reach out directly to price, confirm, and book." }],
  ctaEyebrow: "Your San Miguel wedding starts here", ctaTitle: "Turn hours of searching into a shortlist you love.", ctaText: "Discover the spaces and local team that can bring your celebration to life.", searchAll: "Search the full directory"
});

useSeoMeta(() => ({
  title: isEs.value ? "Por qué usar SMWC | Planea tu boda en San Miguel" : "Why use SMWC | Plan a San Miguel wedding",
  description: isEs.value ? "Descubre cómo el directorio bilingüe SMWC facilita encontrar, comparar y contactar lugares y proveedores de bodas en San Miguel de Allende." : "See how SMWC makes it easier to find, compare, shortlist, and contact wedding venues and vendors in San Miguel de Allende.",
}));
</script>

<style scoped>
.whyPage { overflow: hidden; }
.whyPage__hero { padding: clamp(4.5rem, 9vw, 8rem) 0 clamp(4rem, 8vw, 7rem); background: radial-gradient(circle at 80% 20%, rgba(110,139,121,.17), transparent 34%), linear-gradient(180deg, #fbfaf7, var(--bg)); }
.whyPage__heroGrid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(21rem, .8fr); gap: clamp(3rem, 8vw, 7rem); align-items: center; }
.whyPage__eyebrow { color: var(--accent-strong); font-size: .76rem; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }
.whyPage h1 { max-width: 11ch; margin-top: 1rem; font-size: clamp(3.2rem, 7vw, 6.5rem); letter-spacing: -.055em; }
.whyPage__lede { max-width: 42rem; margin-top: 1.5rem; color: var(--muted-strong); font-size: clamp(1.08rem, 2vw, 1.28rem); line-height: 1.65; }
.whyPage__actions { display: flex; flex-wrap: wrap; align-items: center; gap: .85rem; margin-top: 2rem; }
.whyPage__button { display: inline-flex; align-items: center; justify-content: center; gap: .8rem; min-height: 3.25rem; padding: 0 1.35rem; border: 1px solid var(--border); border-radius: var(--radius-sm); font-weight: 700; transition: transform 160ms var(--ease), background 160ms var(--ease); }
.whyPage__button:hover { transform: translateY(-2px); }
.whyPage__button--primary { border-color: var(--accent); background: var(--accent); color: #fff; }
.whyPage__button--primary:hover { background: var(--accent-strong); }
.whyPage__button--secondary { background: rgba(255,255,255,.72); }
.whyPage__preview { position: relative; margin: 0; overflow: hidden; border: 1px solid rgba(83,72,59,.12); border-radius: 1rem; background: rgba(255,255,255,.83); box-shadow: 0 36px 80px rgba(83,72,59,.13); transform: rotate(1.5deg); }
.whyPage__preview::before { content: ""; position: absolute; z-index: -1; inset: 8% -10% -8% 12%; border-radius: 50%; background: var(--accent-soft); filter: blur(30px); }
.whyPage__preview img { width: 100%; height: auto; }
.whyPage__proof { border-block: 1px solid var(--border); background: var(--surface); }.whyPage__proofGrid { display: grid; grid-template-columns: repeat(4, 1fr); }
.whyPage__proofItem { display: flex; flex-direction: column; gap: .45rem; min-width: 0; padding: 2rem clamp(1rem,3vw,2.5rem); border-left: 1px solid var(--border); }.whyPage__proofItem:last-child { border-right: 1px solid var(--border); }.whyPage__proofItem strong { color: var(--accent-strong); font-size: 1.45rem; }.whyPage__proofItem span { color: var(--muted); font-size: .86rem; }
.whyPage__section { padding: clamp(5rem,10vw,9rem) 0; }.whyPage__sectionHead { max-width: 48rem; }.whyPage__sectionHead h2, .whyPage__steps h2, .whyPage__cta h2 { margin-top: 1rem; font-size: clamp(2.35rem,5vw,4.5rem); letter-spacing: -.04em; }.whyPage__sectionHead > p:last-child, .whyPage__stepsCopy > p:last-child { margin-top: 1.2rem; max-width: 40rem; color: var(--muted-strong); font-size: 1.08rem; line-height: 1.65; }
.whyPage__featureGrid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 1px; margin-top: 4rem; overflow: hidden; border: 1px solid var(--border); border-radius: var(--radius); background: var(--border); }
.whyPage__feature { position: relative; min-height: 19rem; padding: clamp(1.5rem,3vw,2.4rem); background: var(--surface); }.whyPage__featureNumber { position: absolute; top: 1.2rem; right: 1.2rem; color: #c7c1b8; font-size: .72rem; font-weight: 800; letter-spacing: .1em; }.whyPage__featureIcon { display: grid; place-items: center; width: 3.25rem; height: 3.25rem; border-radius: 50%; background: var(--accent-soft); color: var(--accent-strong); font-weight: 800; }.whyPage__feature h3 { margin-top: 2.8rem; font-size: 1.35rem; }.whyPage__feature p { margin-top: .85rem; line-height: 1.65; }
.whyPage__compare { padding: clamp(5rem,10vw,9rem) 0; color: #fff; background: #1d2420; }.whyPage__sectionHead--light .whyPage__eyebrow { color: #dca48f; }.whyPage__sectionHead--light > p:last-child { color: rgba(255,255,255,.6); }
.whyPage__compareGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 3.5rem; }.whyPage__compareCard { padding: clamp(1.5rem,4vw,3rem); border-radius: var(--radius); }.whyPage__compareCard--manual { border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.045); }.whyPage__compareCard--smwc { background: #f2eee6; color: var(--ink); }.whyPage__compareLabel { color: inherit; font-size: 1.15rem; font-weight: 800; }.whyPage__compareCard ul { display: grid; gap: 1.2rem; margin: 2rem 0 0; padding: 0; list-style: none; }.whyPage__compareCard li { display: grid; grid-template-columns: 1.5rem 1fr; gap: .7rem; align-items: start; line-height: 1.5; }.whyPage__compareCard--manual li { color: rgba(255,255,255,.62); }.whyPage__compareCard--manual li span { color: #d58d76; }.whyPage__compareCard--smwc li span { color: var(--agave); font-weight: 900; }
.whyPage__steps { padding: clamp(5rem,10vw,9rem) 0; }.whyPage__stepsGrid { display: grid; grid-template-columns: .85fr 1fr; gap: clamp(3rem,8vw,8rem); }.whyPage__stepList { margin: 0; padding: 0; list-style: none; }.whyPage__stepList li { display: grid; grid-template-columns: 3.5rem 1fr; gap: 1.25rem; padding: 1.6rem 0; border-top: 1px solid var(--border); }.whyPage__stepList li:last-child { border-bottom: 1px solid var(--border); }.whyPage__stepList li > span { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: 50%; background: var(--agave-soft); color: var(--agave); font-weight: 800; }.whyPage__stepList h3 { font-size: 1.3rem; }.whyPage__stepList p { margin-top: .5rem; line-height: 1.55; }
.whyPage__cta { padding: 0 0 clamp(5rem,9vw,8rem); }.whyPage__ctaPanel { padding: clamp(3rem,8vw,7rem) 1.5rem; border-radius: var(--radius); background: var(--accent); color: #fff; text-align: center; }.whyPage__ctaPanel .whyPage__eyebrow { color: rgba(255,255,255,.68); }.whyPage__ctaPanel h2 { max-width: 14ch; margin-inline: auto; }.whyPage__ctaPanel > p:not(.whyPage__eyebrow) { max-width: 38rem; margin: 1.25rem auto 0; color: rgba(255,255,255,.75); font-size: 1.08rem; }.whyPage__actions--center { justify-content: center; }.whyPage__button--light { border-color: #fff; background: #fff; color: var(--accent-strong); }.whyPage__textLink { padding: .7rem; color: #fff; font-weight: 700; text-decoration: underline; text-underline-offset: .28rem; }
@media (max-width: 900px) { .whyPage__heroGrid, .whyPage__stepsGrid { grid-template-columns: 1fr; }.whyPage__heroCopy { max-width: 48rem; }.whyPage__preview { max-width: 34rem; transform: none; }.whyPage__featureGrid { grid-template-columns: repeat(2,1fr); }.whyPage__proofGrid { grid-template-columns: repeat(2,1fr); }.whyPage__proofItem:nth-child(3) { border-top: 1px solid var(--border); } }
@media (max-width: 640px) { .whyPage__hero { padding-top: 3.5rem; }.whyPage h1 { font-size: clamp(2.9rem,14vw,4.2rem); }.whyPage__proofGrid, .whyPage__featureGrid, .whyPage__compareGrid { grid-template-columns: 1fr; }.whyPage__proofItem { border-top: 1px solid var(--border); }.whyPage__proofItem:first-child { border-top: 0; }.whyPage__feature { min-height: auto; }.whyPage__stepsGrid { gap: 2.5rem; }.whyPage__button { width: 100%; }.whyPage__textLink { width: 100%; text-align: center; } }
</style>
