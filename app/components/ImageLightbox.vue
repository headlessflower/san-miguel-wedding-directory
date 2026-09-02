<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen && currentImage"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="locale === 'es' ? 'Galería de imágenes' : 'Image gallery'"
        @click.self="close"
      >
        <button ref="closeButton" class="lightbox__close" type="button" :aria-label="closeLabel" @click="close">
          ×
        </button>

        <button
          v-if="images.length > 1"
          class="lightbox__nav lightbox__nav--previous"
          type="button"
          :aria-label="previousLabel"
          @click="previous"
        >
          ‹
        </button>

        <figure class="lightbox__figure">
          <NuxtImg
            :src="currentImage.src"
            :alt="currentImage.alt?.[localeKey] || ''"
            width="1600"
            height="1067"
            sizes="100vw xl:1400px"
            format="webp"
            loading="eager"
            decoding="async"
            @error="useListingImageFallback"
          />
          <figcaption>
            <span v-if="currentImage.alt?.[localeKey]">{{ currentImage.alt[localeKey] }}</span>
            <span v-if="images.length > 1">{{ activeIndex + 1 }} / {{ images.length }}</span>
          </figcaption>
        </figure>

        <button
          v-if="images.length > 1"
          class="lightbox__nav lightbox__nav--next"
          type="button"
          :aria-label="nextLabel"
          @click="next"
        >
          ›
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
type LightboxImage = {
  src: string;
  alt?: Partial<Record<"en" | "es", string>>;
};

const props = defineProps<{ images: LightboxImage[] }>();
const { locale } = useI18n();
const isOpen = ref(false);
const activeIndex = ref(0);
const closeButton = ref<HTMLButtonElement | null>(null);
const localeKey = computed<"en" | "es">(() => locale.value === "es" ? "es" : "en");
const currentImage = computed(() => props.images[activeIndex.value]);
const closeLabel = computed(() => locale.value === "es" ? "Cerrar galería" : "Close gallery");
const previousLabel = computed(() => locale.value === "es" ? "Imagen anterior" : "Previous image");
const nextLabel = computed(() => locale.value === "es" ? "Imagen siguiente" : "Next image");

function openAt(index: number) {
  if (!props.images[index]) return;
  activeIndex.value = index;
  isOpen.value = true;
  nextTick(() => closeButton.value?.focus());
}

function close() {
  isOpen.value = false;
}

function previous() {
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length;
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % props.images.length;
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return;
  if (event.key === "Escape") close();
  if (event.key === "ArrowLeft") previous();
  if (event.key === "ArrowRight") next();
}

watch(isOpen, (open) => {
  if (import.meta.client) document.documentElement.style.overflow = open ? "hidden" : "";
});

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.documentElement.style.overflow = "";
});

defineExpose({ openAt });
</script>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 3rem);
  background: rgba(15, 13, 12, 0.94);
}

.lightbox__figure {
  display: grid;
  gap: 0.75rem;
  max-width: min(92vw, 90rem);
  max-height: 90vh;
  margin: 0;
}

.lightbox__figure img {
  display: block;
  max-width: 100%;
  max-height: calc(90vh - 2.5rem);
  margin: auto;
  border-radius: 4px;
  object-fit: contain;
}

.lightbox__figure figcaption {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.82rem;
}

.lightbox__close,
.lightbox__nav {
  position: fixed;
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.09);
  color: white;
  font: inherit;
  cursor: pointer;
}

.lightbox__close {
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1.8rem;
}

.lightbox__nav {
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
}

.lightbox__nav--previous { left: 1.25rem; }
.lightbox__nav--next { right: 1.25rem; }
.lightbox-enter-active, .lightbox-leave-active { transition: opacity 180ms ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .lightbox { padding: 4.75rem 0.75rem 5rem; }
  .lightbox__nav { top: auto; bottom: 1rem; transform: none; }
  .lightbox__nav--previous { left: calc(50% - 3.4rem); }
  .lightbox__nav--next { right: calc(50% - 3.4rem); }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-enter-active, .lightbox-leave-active { transition: none; }
}
</style>
