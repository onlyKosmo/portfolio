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
      <a href="/cv-basile-ferrand.pdf" download class="btn-cv">
        Télécharger mon CV
      </a>

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
  gap: 1.5rem;
  padding: 1rem 2rem;
}

.breadcrumb {
  margin-top: 4rem;
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

#currently {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  min-height: 10vh; /* take full screen height */
  padding: 2rem;
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
