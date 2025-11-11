<template>
  <section class="hero" :class="{ zoomed: isZoomed }">
    <canvas id="bgCanvas"></canvas>
    <div class="film-grain"></div>

    <!-- 🔗 Projects Navigation (Desktop only) -->
    <nav
        v-if="isZoomed"
        class="projects-nav"
    >
      <ul>
        <li
            v-for="project in projectsData"
            :key="project.title"
            @mouseenter="showPreview(project)"
            @mouseleave="clearPreview()"
            @click="openProject(project.slug)"
        >
          {{ project.title }}
        </li>
      </ul>
    </nav>


    <div class="content">
      <h1 class="headline">Bienvenue</h1>
      <h2 class="subtitle">DANS MON ESPACE</h2>
      <button class="cta retro-btn" @click="handleClick">Mes projets</button>

    </div>


    <!-- Bottom-left -->
    <div class="bottom-left">
      <p class="location">Grenoble, France</p>
      <p class="profession">Développeur Web</p>
    </div>

    <!-- Bottom-right -->
    <div class="bottom-right">
      <p class="quick-desc">Artiste 3D et Motion Designer à Paris, je conçois avec grande précision des univers aux visuels soignés et percutants au service des marques, agences et artistes.</p>
    </div>




    <!-- 🔙 Floating retro back button -->
    <button
        v-if="isZoomed"
        class="retro-btn back-btn"
        @click="handleBack"
    >
      Retour
    </button>
    <ProjectsGrid v-if="isZoomed && isMobile" />

  </section>
</template>


<script setup>
import ProjectsGrid from './ProjectsGrid.vue'
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import initThreeBackground from '../threeBackground.js';
import projectsData from '../data/projects.js';
import createProjectWindow from '../three/projectWindow.js';
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';
import { defineEmits } from 'vue'
const emit = defineEmits(['hide-header'])

function handleClick() {
  emit('hide-header')  // déclenche juste la disparition du header
  toggleProjects()     // ton animation GSAP continue normalement
}
function handleBack() {
  emit('show-header')  // fait réapparaître le header
  toggleProjects()     // animation GSAP continue
}
const router = useRouter();

const isMobile = ref(window.innerWidth <= 768)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

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

    // desktop only
    if (!isMobile.value) {
      if (!projectWindow) {
        projectWindow = createProjectWindow(
            three.scene,
            3.5,
            2.5,
            { x: -0.2, y: 0.1 },
            projectsData
        );
      }
      projectWindow.open();
    }

    // === Zoom In animation ===
    tl.to(three.camera.position, {
      z: 2.5,
      duration: 1.5,
      ease: "power2.inOut"
    })
        .to(three.grainPass.uniforms.intensity, { value: 0.05, duration: 1, ease: "power1.inOut" }, 0)
        .to(three.scanlinePass.uniforms.intensity, { value: 0.25, duration: 1, ease: "power1.inOut" }, 0)
        .to(three.vignettePass.uniforms.darkness, { value: 0.4, duration: 1.2, ease: "power2.out" }, 0)
        .to(".content", { opacity: 0, scale: 0.9, duration: 1, ease: "power2.inOut" }, "<");

  } else {
    isZoomed.value = false;

    if (!isMobile.value && projectWindow) projectWindow.close();

    // === Zoom Out animation ===
    tl.to(three.camera.position, { z: 6, duration: 1.5, ease: "power2.inOut" })
        .to(three.grainPass.uniforms.intensity, { value: 0.07, duration: 1, ease: "power1.inOut" }, 0)
        .to(three.scanlinePass.uniforms.intensity, { value: 0.12, duration: 1, ease: "power1.inOut" }, 0)
        .to(three.vignettePass.uniforms.darkness, { value: 1.2, duration: 1.2, ease: "power2.inOut" }, 0)
        .to(".content", { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "<");
  }
};

function showPreview(project) {
  if (projectWindow) {
    projectWindow.hidePlaceholder(); // hide the default screen
    projectWindow.updatePreview(project.preview);
  }
}

function clearPreview() {
  if (projectWindow) projectWindow.clearPreview(); // shows placeholder
}

function openProject(linkOrSlug) {
  if (!linkOrSlug) return;
  // si c'est un slug (pas de http), on navigue en SPA
  if (typeof linkOrSlug === 'string' && !linkOrSlug.startsWith('http')) {
    router.push({ name: 'project', params: { slug: linkOrSlug } });
  } else {
    // lien externe
    window.open(linkOrSlug, '_blank');
  }
}

// écoute l'événement custom dispatché par three.js (optionnel mais utile)
function onOpenProjectEvent(e) {
  const slug = e?.detail?.slug;
  if (slug) openProject(slug);
}


// ---- Mounted Hook ----
onMounted(() => {
  window.addEventListener('openProject', onOpenProjectEvent);
  three = initThreeBackground();
  if (!three) return;

  // wait for fonts
  document.fonts.ready.then(() => {
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
});
onUnmounted(() => {
  window.removeEventListener('openProject', onOpenProjectEvent);
});
</script>

<style scoped>
.top-left {
  position: absolute;
  top: 3rem;
  left: 3rem;
  z-index: 5;
  text-align: left;
  color: white;
}

.top-left .portfolio {
  font-size: 1.4rem;
  margin: 0;
}

.top-left .name {
  font-size: 1rem;
  margin: 0;
}

.top-right {
  position: absolute;
  top: 3rem;
  right: 3rem;
  z-index: 5;
  display: flex;
  gap: 0.5rem;
}

.bottom-left, .bottom-right {
  position: absolute;
  z-index: 5;
  transition: all 0.3s ease;
}

.bottom-left {
  left: 3rem;
  bottom: 3rem;
  color: white;
}

.bottom-right {
  right: 3rem;
  bottom: 3rem;
  color: white;
  max-width: 40%;
}

@media (max-width: 1024px) {
  .bottom-left {
    left: 1.5rem;
    bottom: 2rem;
    font-size: 0.8rem;
  }
  .bottom-right {
    right: 1.5rem;
    bottom: 2rem;
    font-size: 0.8rem;
    max-width: 60%;
  }
}

@media (max-width: 768px) {
  .bottom-left {
    left: 1rem;
    bottom: 1.5rem;
    font-size: 0.7rem;
  }
  .bottom-right {
    right: 1rem;
    bottom: 1.5rem;
    font-size: 0.7rem;
    max-width: 70%;
  }
  .bottom-right .quick-desc {
    font-size: 0.65rem;
    line-height: 1rem;
  }
}

.hero.zoomed .bottom-left,
.hero.zoomed .bottom-right {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);
  transition: all 0.5s ease;
}

.hero .bottom-left,
.hero .bottom-right {
  transition: all 0.5s ease; /* smooth transition in/out */
}

@media (max-width: 768px) {
  .headline {
    font-size: 2.4rem;
    font-weight: 800;
    font-family: "Modern No. 20", monospace;
    letter-spacing: 1px;
    color: #00ffee;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 400;
    font-family: "Source Code Pro", monospace;
    opacity: 0.8;
    margin-top: 0.5rem;
  }

  .cta, .top-right .contact-btn {
    font-family: "Press Start 2P", monospace;
    background: linear-gradient(90deg, #00ffee, #0072ff);
    color: black;
    border: 2px solid #00ffee;
    box-shadow: 0 0 15px #00ffee, inset 0 0 10px #00ffee;
    transition: all 0.3s ease;
  }

  .cta:hover, .top-right .contact-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px #00ffee, inset 0 0 15px #00ffee;
  }

  .hero.zoomed .content {
    display: none; /* hide text when grid is shown */
  }
}


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
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

.projects-nav {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 9999; /* must be higher than Three.js panel */
  pointer-events: auto;
}

.projects-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.projects-nav li {
  margin-bottom: 1rem;
  cursor: pointer;
  color: #00ffee;
  font-family: monospace;
  transition: transform 0.2s;
}

.projects-nav li:hover {
  transform: scale(1.05);
}


@media (max-width: 768px) {
  .projects-nav {
    display: none;
  }
}

.profession {
  font-size: 2rem;
}


</style>
