<template>
  <section class="hero" :class="{ zoomed: isZoomed }">
    <canvas id="bgCanvas"></canvas>
    <div class="film-grain"></div>

    <div class="content">
      <h1 class="headline">Basile</h1>
      <h2 class="subtitle">Développeur web</h2>
      <button class="cta retro-btn" @click="toggleProjects">Mes projets</button>
    </div>


    <!-- 🔙 Floating retro back button -->
    <button
        v-if="isZoomed"
        class="retro-btn back-btn"
        @click="toggleProjects"
    >
      Retour
    </button>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import initThreeBackground from '../threeBackground.js';
import projectsData from '../data/projects.js';
import createProjectWindow from '../three/projectWindow.js';

gsap.registerPlugin(SplitText);

const isZoomed = ref(false);
let three = null;
let projectWindow = null;


// ---- Toggle Projects Function ----
const toggleProjects = () => {
  if (!three) return;
  const tl = gsap.timeline();

  if (!isZoomed.value) {
    isZoomed.value = true;

    // Initialize the project window if it doesn't exist yet
    if (!projectWindow) {
      projectWindow = createProjectWindow(
          three.scene,
          4,          // width
          2.5,        // height
          { x: -0.2, y: 0.1 }, // tilt
          projectsData
      );
    }

    // Always open it
    projectWindow.open();

    // Timeline animations
    tl.to(three.camera.position, {
      z: 2.5,
      duration: 1.5,
      ease: "power2.inOut"
    })
        .to(three.grainPass.uniforms.intensity, { value: 0.2, duration: 1, ease: "power1.inOut" }, 0)
        .to(three.scanlinePass.uniforms.intensity, { value: 0.3, duration: 1, ease: "power1.inOut" }, 0)
        .to(".content", { opacity: 0, scale: 0.9, duration: 1, ease: "power2.inOut" }, "<");
  }
  else {
    isZoomed.value = false;

    if (projectWindow) projectWindow.close();

    tl.to(three.camera.position, { z: 6, duration: 1.5, ease: "power2.inOut" })
        .to(three.grainPass.uniforms.intensity, { value: 0.07, duration: 1, ease: "power1.inOut" }, 0)
        .to(three.scanlinePass.uniforms.intensity, { value: 0.12, duration: 1, ease: "power1.inOut" }, 0)
        .to(".content", { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "<");
  }

};

// ---- Mounted Hook ----
onMounted(() => {
  // Initialize Three.js background
  three = initThreeBackground();

  // SplitText animation for headline
  if (!three) return;
  const split = new SplitText(".headline", { type: "chars" });
  const tl = gsap.timeline();

  tl.from(split.chars, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    ease: "power4.out"
  })
      .from(".subtitle", {
        y: 30,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.5")
      .from(".cta", {
        scale: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.3");
});
</script>

<style scoped>
.retro-btn {
  position: relative;
  background: black;
  color: #00ffea;
  border: 2px solid #00ffea;
  font-family: "Press Start 2P", monospace;
  text-transform: uppercase;
  box-shadow: 0 0 5px #00ffea, inset 0 0 10px #00ffea;
  text-shadow: 0 0 5px #00ffea;
  transition: all 0.2s ease;
}

.retro-btn:hover {
  background: #00ffea;
  color: black;
  box-shadow: 0 0 15px #00ffea, inset 0 0 10px #00ffea;
  transform: scale(1.05);
}

.retro-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
      to bottom,
      rgba(0, 255, 234, 0.2),
      rgba(0, 255, 234, 0.1) 2px,
      transparent 2px,
      transparent 4px
  );
  opacity: 0.1;
  pointer-events: none;
}

.back-btn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.6rem 1.2rem;
  pointer-events: auto;
  z-index: 5;
  font-size: 0.8rem;
  opacity: 0;
  animation: fadeIn 0.8s 0.8s forwards;
  transition: opacity 0.25s ease, transform 0.25s ease;
}


/* fade/slide in when shown */
.back-btn.show {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.hero.zoomed .back-btn:hover {
  transform: scale(1.1);
}


/* disable the main CTA inside the content when zoomed */
.hero.zoomed .content .retro-btn {
  pointer-events: none;
  opacity: 0.6;
}


.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas#bgCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content {
  position: relative;
  text-align: center;
  z-index: 1;
  color: white;
}

.headline {
  font-size: 4rem;
  font-weight: 700;
  font-family: "Modern No. 20", monospace;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.5rem;
  font-family: "Source Code Pro", monospace;
  font-weight: 400;
  opacity: 0.8;
  margin-top: 0.5rem;
}

.cta {
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  color: white;
  background: radial-gradient(#00c6ff, #0072ff);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta:hover {
  background: linear-gradient(90deg, #0072ff, #00c6ff);
  transform: scale(1.05);
}

.film-grain {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: multiply;
  opacity: 0.12;
  background: repeating-radial-gradient(
      circle at 0 0,
      rgba(0, 0, 0, 0.04) 0,
      rgba(0, 0, 0, 0.04) 1px,
      transparent 1px,
      transparent 2px
  );
  animation: grainShift 0.5s steps(6) infinite;
}

@keyframes grainShift {
  0%, 100% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-1%, 1%);
  }
  40% {
    transform: translate(1%, -1%);
  }
  60% {
    transform: translate(-1%, -1%);
  }
  80% {
    transform: translate(1%, 1%);
  }
}

</style>
