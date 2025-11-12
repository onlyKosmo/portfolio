<template>
  <div class="about-page">
    <Header :show-logo="true" />

    <main class="content">
      <h1>À propos de moi</h1>
      <p>
        Développeur créatif passionné par l’interactivité, le design et la performance.
        J’aime concevoir des expériences visuelles uniques entre art et technologie.
      </p>
      <a href="/cv-basile-ferrand.pdf" download class="btn-cv">
        Télécharger mon CV
      </a>
    </main>

    <Marquee/>

    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Marquee from "@/components/Marquee.vue";
</script>

<style scoped>
.about-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  color: white;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5rem;
  padding: 4rem 2rem;
}

.btn-cv {
  background-color: #fff;
  color: #000;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}
.btn-cv:hover {
  transform: scale(1.05);
}
</style>
