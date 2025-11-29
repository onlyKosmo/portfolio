<template>
  <div class="about-page">
    <Header :show-logo="true" />

    <section class="breadcrumb">
      <Breadcrumb current="À propos" />
    </section>
    <main class="content">

      <h1 class="presentation">Bonjour, je m'appelle Basile</h1>
      <h1 class="kosmo">Kosmo ?</h1>

      <div class="name">
        <img src="@/assets/logo/logo_b.png" alt="Logo" class="logo" />
      </div>

      <h1>À propos de moi</h1>
      <p>
        Développeur créatif par les technologies du web, j’apprend à concevoir des expériences visuelles originales, en découvrant sans cesses de nouveaux procédé techniques. En ce moment, je m'entraîne à utiliser la bibliothèques Three.js et GSAP, comme vous pouvez le voir avec ce site.
      </p>
      <animated-button @click="downloadCV" download class="btn-cv">
        Mon CV <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
      </svg>

      </animated-button>

      <Marquee/>

    </main>


    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Marquee from "@/components/Marquee.vue";
import Breadcrumb from '@/components/Breadcrumb.vue'
import AnimatedButton from "@/components/AnimatedButton.vue";
import cvFile from '@/assets/CV_FERRAND-RICHARTE_Basile.pdf'

function downloadCV() {
  const link = document.createElement("a");
  link.href = cvFile;
  link.download = "CV_FERRAND-RICHARTE_Basile.pdf";
  link.click();
}



</script>

<style scoped>
.about-page {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: var(--color-bg);
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
}

.breadcrumb {
  margin-top: 4rem;
}

.btn-cv {
}

.name .logo { height: 5rem;}

.name {
  display: flex;
  align-items: center;

}

h1 {
  font-size: 2rem;
  text-align: left;
}
</style>
