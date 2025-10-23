<template>
  <div class="projects-grid">
    <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-card"
        @click="openLink(project.link)"
        ref="cards"
    >
      <img :src="project.preview" :alt="project.title" />
      <h3>{{ project.title }}</h3>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import projects from '@/data/projects.js'

const cards = ref([])

const openLink = (url) => window.open(url, '_blank')

onMounted(() => {
  gsap.from(cards.value, {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: 'bounce.out',
    duration: 0.8,
  })
})
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  z-index: 2;
}

.project-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease;
}

.project-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.project-card h3 {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #00ffee;
}

.project-card:active {
  transform: scale(0.95);
}
</style>
