<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import { gsap } from "gsap";

const wrapper = ref(null);
const svg = ref(null);
const rect = ref(null);

const emit = defineEmits(["click"]);

// --- Couleur du glow (modifiable facilement) ---
const glowColor = "255,255,255"; // format R,G,B
const strokeWidth = 3; // épaisseur de la bordure

let resizeObserver;

onMounted(async () => {
  await nextTick();
  updateSize();
  animateStroke();

  // Observer les changements de taille du bouton
  resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(wrapper.value);
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
});

function updateSize() {
  const b = wrapper.value.getBoundingClientRect();
  const radius = b.height / 2;

  svg.value.setAttribute("width", b.width);
  svg.value.setAttribute("height", b.height);

  rect.value.setAttribute("width", b.width);
  rect.value.setAttribute("height", b.height);
  rect.value.setAttribute("rx", radius);
  rect.value.setAttribute("stroke-width", strokeWidth);
}

function animateStroke() {
  const length = rect.value.getTotalLength();

  // partie visible et invisible pour créer l'effet de mouvement continu
  const visible = length * 0.3;  // 30% visible
  const invisible = length - visible;

  rect.value.style.strokeDasharray = `${visible} ${invisible}`;
  rect.value.style.strokeDashoffset = 0;

  gsap.to(rect.value, {
    strokeDashoffset: -length,
    duration: 10,        // vitesse ajustable
    ease: "linear",
    repeat: -1
  });
}

// expose la fonction pour que le parent puisse l'appeler
defineExpose({
  updateSize
});

</script>

<template>
  <div class="btn-animated" ref="wrapper">
    <button class="btn-inner" :class="$attrs.class" @click="emit('click')">
      <slot />
    </button>

    <svg ref="svg" class="svg-border">
      <defs>
        <linearGradient id="border-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="`rgba(${glowColor},0.05)`" />
          <stop offset="40%" :stop-color="`rgba(${glowColor},0.7)`" />
          <stop offset="60%" :stop-color="`rgba(${glowColor},0.7)`" />
          <stop offset="100%" :stop-color="`rgba(${glowColor},0.05)`" />
        </linearGradient>
      </defs>

      <rect ref="rect" fill="none" stroke="url(#border-glow)" class="glowing-line" />
    </svg>
  </div>
</template>

<style scoped>
.btn-animated {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 999px;
  transition: transform 0.3s ease;

}

.btn-animated:hover {
  transform: scale(1.1);
}

.btn-inner {
  position: relative;
  z-index: 1;
  border-radius: 999px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1rem;
  padding: 1rem 2.5rem; /* padding définit la zone cliquable */
  background: var(--color-accent);
  color: var(--color-text);
  border: none;
}

.svg-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none; /* clic passe au bouton */
}

.glowing-line {
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(255,255,255,0.5));
}
</style>
