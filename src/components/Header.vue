<template>
  <header class="header" :class="{ hidden: hiddenHeader }">
    <!-- left always visible (logo-link to home) -->
    <RouterLink to="/" class="top-left" @click="closeMenu">
      <h3 class="portfolio">KOSMO.</h3>
      <h1 class="name">by BASILE FERRAND-RICHARTE</h1>
    </RouterLink>

    <div
        class="hamburger"
        :class="{ open: menuOpen }"
        @click="menuOpen = !menuOpen"
    >
      <div class="line top"></div>
      <div class="line bottom"></div>
    </div>

    <!-- Overlay pour fermer le menu en cliquant à l’extérieur -->
    <div
        v-if="menuOpen"
        class="menu-overlay"
        @click="menuOpen = false"
    ></div>



    <!-- center logo + right buttons only when not mobile -->
    <RouterLink to="/" v-if="!isMobile && showLogo" class="top-center" @click="closeMenu">
      <img src="../assets/logo/logo_b.png" alt="Logo" class="logo" />
    </RouterLink>

    <div class="top-right" v-if="!isMobile">
      <RouterLink to="/about" class="about">À PROPOS</RouterLink>
      <button @click="openContact" class="btn-contact">ME CONTACTER</button>
    </div>

    <!-- mobile menu (hamburger) -->
    <nav class="menu" v-if="menuOpen && isMobile" @click.self="menuOpen = false">
      <RouterLink to="/about" class="menu-link" @click="onMenuLinkClick">À PROPOS</RouterLink>
      <button class="menu-link" @click="openContact">ME CONTACTER</button>
    </nav>

    <!-- modal -->
    <transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
        <ContactModal @close="isModalOpen = false" />
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import ContactModal from './ContactModal.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  showLogo: { type: Boolean, default: false },
  hiddenHeader: { type: Boolean, default: false } // optionnel si tu veux contrôler via prop
})

const menuOpen = ref(false)
const isModalOpen = ref(false)
const isMobile = ref(window.innerWidth <= 768)

const router = useRouter()

watch(
    () => router.currentRoute.value.fullPath,
    () => {
      menuOpen.value = false
    }
)

function handleResize() {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) menuOpen.value = false // close mobile menu when switching to desktop
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// helpers
function openContact() {
  isModalOpen.value = true
  menuOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

function onMenuLinkClick() {
  // close menu then navigate (RouterLink handles navigation)
  menuOpen.value = false
}
</script>

<style>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
  z-index: 50;
  pointer-events: auto;
  gap: 1rem;
  box-sizing: border-box;
  transition: all 0.5s ease;
}

/* hide header via prop/class when zoom */
.header.hidden {
  opacity: 0;
  transform: translateY(-12px);
  pointer-events: none;
}

/* left */
.top-left {
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  text-decoration: none;
}
.top-left .portfolio { font-size: 1.4rem; margin:0; }
.top-left .name { font-size: 1rem; margin:0; }

/* center */
.top-center {
  flex: 1;
  display: flex;
  justify-content: center;
}
.top-center .logo { height: 40px; object-fit: contain; }

/* right (desktop) */
.top-right { display: flex; gap: 0.5rem; margin-left: auto; }
.top-right .about,
.top-right .btn-contact { cursor: pointer; }

/* HAMBURGER */
.hamburger {
  /* shown only on mobile by JS v-if, but keep CSS fallback */
  background: transparent;
  border: 0;
  padding: 0;
  margin-left: auto;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;
}
.hamburger .line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-text);
  transition: transform .25s ease, opacity .25s ease;
}
.hamburger .short { width: 70%; }
.hamburger .shorter { width: 50%; }

/* MOBILE MENU */
.menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 1rem;
  background: var(--color-bg);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-radius: 8px;
  z-index: 60;
}
.menu .menu-link {
  color: var(--color-text);
  background: transparent;
  border: 1px solid rgba(0,255,238,0.12);
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  text-decoration: none;
  text-align: left;
}
.menu .menu-link:hover { background: rgba(0,255,238,0.12); }

/* modal overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  padding: 2rem;
  box-sizing: border-box;
}

/* small-screen behavior */
@media (max-width: 768px) {
  /* hide desktop groups via JS-controlled v-if, leave CSS safe fallback */
  .top-center, .top-right { display: none !important; }
  .hamburger { display: flex !important; }
  .top-left { align-items: flex-start; }
}

/* accessibility / pointer reset for links inside header */
.header a, .header button { background: transparent; border: none; color: inherit; }

/* HAMBURGER */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 6px;
  cursor: pointer;
  width: 26px;
  height: 26px;
  position: relative;
  z-index: 30;
}

.hamburger .line {
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger .line.top {
  width: 100%;
}

.hamburger .line.bottom {
  width: 70%;
}

/* Animation hamburger → croix */
.hamburger.open .line.top {
  transform: rotate(45deg) translateY(5px);
  width: 100%;
}

.hamburger.open .line.bottom {
  transform: rotate(-45deg) translateY(-5px);
  width: 100%;
}

/* MENU OVERLAY (clic extérieur) */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 20;
}


</style>
