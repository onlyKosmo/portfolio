<template>
  <div class="about-page">
    <Header :show-logo="true" />

    <section class="breadcrumb">
      <Breadcrumb current="À propos" />
    </section>
    <main class="content">
      <h1>À propos de moi</h1>
      <p>
        Développeur créatif passionné par l’interactivité, le design et la performance.
        J’aime concevoir des expériences visuelles uniques entre art et technologie.
      </p>
      <animated-button href="/cv-basile-ferrand.pdf" @click="downloadCV" download class="btn-cv">
        Mon CV <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
      </svg>

      </animated-button>

      <Marquee/>

      <section id="currently">
        <h1>Étudiant à l'</h1>
        <div class="one">
          <a href="https://www.linkedin.com/school/universit%C3%A9-grenoble-alpes/posts/?feedView=all">
            <img src="../assets/logo/IUT1.png" alt="Logo UGA" class="logo" />
          </a>
        </div>
        <h1>en</h1>
        <div class="two">
          <a href="https://www.linkedin.com/school/mmi-grenoble/posts/?feedView=all">
            <img src="../assets/logo/mmi.png" alt="Logo MMI" class="logo" />
          </a>
        </div>
      </section>
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

function downloadCV() {
  const link = document.createElement("a");
  link.href = "/cv-basile-ferrand.pdf";
  link.download = "cv-basile-ferrand.pdf";
  link.click();
}

</script>

<style scoped>
.about-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  color: white;
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

#currently {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 10vh;
  padding: 0.5rem;
}

#currently .logo {
  max-width: 180px;
  height: auto;
  transition: transform 0.3s ease;
}

#currently .logo:hover {
  transform: scale(1.05);
}
</style>
