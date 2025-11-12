<template>
  <div class="project-page">
    <Header :show="true" :show-logo="true" />
    <button class="back" @click="goBack">← Retour</button>

    <!-- Hero banner -->
    <header class="hero-banner" v-if="project">
      <img :src="project.image" :alt="project.title" />
    </header>

    <section class="breadcrumb">
      <Breadcrumb v-if="project" :current="project.title" />
    </section>


    <main class="container" v-if="project">
      <h1 class="title">{{ project.title }}</h1>
      <h2 v-if="project.subtitle" class="subtitle">{{ project.subtitle }}</h2>

      <div class="description" v-html="project.description"></div>

      <!-- Galerie média -->
      <div class="media" v-if="project.media">
        <img v-for="(img, i) in project.media" :key="i" :src="img" :alt="project.title + ' image ' + (i+1)" />
      </div>

      <!-- Bouton vers le projet en ligne -->
      <a v-if="project.link" :href="project.link" target="_blank" class="external-link">
        Voir en ligne
      </a>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import projects from '@/data/projects.js';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const project = ref(null);

onMounted(() => {
  project.value = projects.find(p => p.slug === slug) || null;
  if (!project.value) {
    router.replace('/'); // projet introuvable -> accueil
  } else {
    window.scrollTo(0, 0);
  }
  // scroll autorisé
  document.documentElement.style.overflowY = 'auto';
  document.body.style.overflowY = 'auto';

  // forcer #app à hauteur auto pour scroll
  const app = document.getElementById('app');
  if (app) app.style.height = 'auto';

  window.scrollTo(0, 0);
});

onUnmounted(() => {
  document.documentElement.style.overflowY = 'hidden';
  document.body.style.overflowY = 'hidden';
  const app = document.getElementById('app');
  if (app) app.style.height = '100%';
})

function goBack() {
  router.back();
}
</script>

<style scoped>
.project-page {
  width: 100vw;
  min-height: auto;
  background: #06101a;
  color: #fff;
  font-family: "Source Code Pro", monospace;
}

.header {
  margin-top: 3rem;
}

/* Bouton retour */
.back {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 50;
  padding: 0.5rem 1rem;
  border: 1px solid #00ffea;
  color: #00ffea;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.back:hover {
  background: #00ffea;
  color: #000;
}

/* Hero banner */
.hero-banner img {
  width: 100%;
  height: 50vh;
  object-fit: cover;
  display: block;
}

/* Contenu principal */
.container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.title {
  font-size: 2.5rem;
  margin: 1rem 0;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #00ffee;
}

.description {
  color: #ddd;
  line-height: 1.8;
  margin-bottom: 2rem;
}

/* Galerie média */
.media {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.media img {
  width: 100%;
  border-radius: 12px;
}

/* Bouton externe */
.external-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #00ffea;
  color: #000;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}
.external-link:hover {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-banner img {
    height: 35vh;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .description {
    font-size: 0.95rem;
  }

  .media {
    grid-template-columns: 1fr;
  }
}
</style>
