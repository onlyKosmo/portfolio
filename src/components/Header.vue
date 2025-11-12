<template>
  <header class="header" :class="{ zoomed: zoomed }">
    <RouterLink to="/" class="top-left">
      <h3 class="portfolio">KOSMO.</h3>
      <h1 class="name">by BASILE FERRAND-RICHARTE</h1>
    </RouterLink>

    <RouterLink to="/" v-if="showLogo" class="top-center">
      <img src="../assets/logo/logo_b.png" alt="Logo" class="logo" />
    </RouterLink>

    <div class="top-right">
      <RouterLink to="/about" class="about">À PROPOS</RouterLink>
      <button @click="isModalOpen = true" class="btn-contact">ME CONTACTER</button>
    </div>

    <!-- Modale -->
    <transition name="fade">
      <div
          v-if="isModalOpen"
          class="modal-overlay"
          @click.self="isModalOpen = false"
      >
        <ContactModal @close="isModalOpen = false" />
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import ContactModal from './ContactModal.vue';

const props = defineProps({
  showLogo: { type: Boolean, default: false }
})

const isModalOpen = ref(false);
</script>

<style>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  z-index: 10;
  pointer-events: auto;
  transition: all 0.5s ease;
}

.header.hidden {
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
  transition: all 0.5s ease;
}

.top-left { display: flex; flex-direction: column; color: white; }
.top-left .portfolio { font-size: 1.4rem; margin:0; }
.top-left .name { font-size: 1rem; margin:0; }

.top-center { display: flex; justify-content: center; flex:1; }
.top-center .logo { height: 40px; object-fit: contain; }

.top-right { display: flex; gap: 0.5rem; }

/* Modale */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  overflow-y: auto;
  padding: 2rem;
}

/* To avoid ugly hover effect */

.header a,
.header a:link,
.header a:visited,
.header a:hover,
.header a:active,
.header a:focus,
.top-left,
.top-center,
.top-right {
  background: transparent;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .header { flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; }
  .top-left, .top-right { flex-direction: column; align-items: center; }
}
</style>
