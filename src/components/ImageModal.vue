<template>
  <div class="backdrop" @click="closeModal">
    <div
        class="modal"
        ref="modalEl"
        @click.stop
        role="dialog"
        aria-modal="true"
    >
      <img
          :src="images[currentIndex]"
          class="modal-image"
          alt="Image du projet"
      />

      <!-- Navigation -->
      <button class="nav left" @click.stop="prevImage">‹</button>
      <button class="nav right" @click.stop="nextImage">›</button>

      <!-- Close -->
      <button class="close" @click.stop="closeModal">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  images: { type: Array, default: () => [] },
  startIndex: { type: Number, default: 0 },
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(["update:modelValue"]);

const currentIndex = ref(props.startIndex || 0);
const modalEl = ref(null);

function closeModal() {
  // animation de fermeture puis on met à false
  animateHide(() => emit("update:modelValue", false));
}

function nextImage() {
  if (!props.images || props.images.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function prevImage() {
  if (!props.images || props.images.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
}

function onKey(e) {
  if (!props.modelValue) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
}

/* GSAP animations */
function animateShow() {
  if (!modalEl.value) return;
  // initial state (assure-toi que modal a opacity:0 dans CSS pour éviter flash)
  gsap.fromTo(
      modalEl.value,
      { scale: 0.9, rotate: -2, opacity: 0, filter: "blur(6px)" },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out"
      }
  );
}

function animateHide(onComplete) {
  if (!modalEl.value) {
    if (onComplete) onComplete();
    return;
  }
  gsap.to(modalEl.value, {
    scale: 0.9,
    rotate: -2,
    opacity: 0,
    filter: "blur(6px)",
    duration: 0.35,
    ease: "power2.in",
    onComplete
  });
}

/* Watch modelValue pour animer après montage du DOM */
watch(
    () => props.modelValue,
    async (isVisible) => {
      if (isVisible) {
        // écoute clavier
        document.addEventListener("keydown", onKey);

        // attend que Vue rende le DOM (v-if crée la modale)
        await nextTick();

        // give the browser one frame to layout (optionnel mais fiable)
        await new Promise((r) => requestAnimationFrame(r));

        // s'assurer que modalEl existe
        if (modalEl.value) {
          animateShow();
        } else {
          // fallback si modalEl non disponible
          setTimeout(() => {
            if (modalEl.value) animateShow();
          }, 50);
        }
      } else {
        document.removeEventListener("keydown", onKey);
      }
    }
);

/* Si le composant est monté et modelValue déjà true, lancer l'animation */
onMounted(async () => {
  if (props.modelValue) {
    document.addEventListener("keydown", onKey);
    await nextTick();
    await new Promise((r) => requestAnimationFrame(r));
    if (modalEl.value) animateShow();
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKey);
});
</script>
<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  max-width: 70vw;
  max-height: 85vh;
  border-radius: 12px;
  background: #111;
  padding: 1rem;
  position: relative;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
}

.modal-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  touch-action: pinch-zoom;
}

/* Navigation */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 0.5rem;
  mix-blend-mode: difference;
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}

/* Close button */
.close {
  position: absolute;
  top: -1rem;
  right: -1rem;
  background: #222;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .modal {
    max-width: 95vw;
    .nav {
      top: auto;        /* on annule centré vertical */
      bottom: 10px;     /* placer en bas */
      font-size: 2.5rem;
    }
  }

  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0 0.5rem;
    z-index: 10;
    mix-blend-mode: difference; /* adapte la couleur automatiquement selon le fond */

  }
}


</style>
