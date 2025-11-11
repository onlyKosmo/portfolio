<template>
  <header class="header" :class="{ zoomed: zoomed }">
    <div class="top-left">
      <h3 class="portfolio">KOSMO.</h3>
      <h1 class="name">by BASILE FERRAND-RICHARTE</h1>
    </div>

    <div class="top-center">
      <img src="../assets/logo/logo_b.png" alt="Logo" class="logo" />
    </div>

    <div class="top-right">
      <button class="about">À PROPOS</button>
      <button class="contact-btn">ME CONTACTER</button>
    </div>
  </header>
</template>



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
  transform: translateY(-20px); /* ou scale(0.9) si tu préfères */
  pointer-events: none;
  transition: all 0.5s ease;
}

.top-left { display: flex; flex-direction: column; color: white; }
.top-left .portfolio { font-size: 1.4rem; margin:0; }
.top-left .name { font-size: 1rem; margin:0; }

.top-center { display: flex; justify-content: center; flex:1; }
.top-center .logo { height: 40px; object-fit: contain; }

.top-right { display: flex; gap: 0.5rem; }

@media (max-width: 768px) {
  .header { flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; }
  .top-left, .top-right { flex-direction: column; align-items: center; }
}
</style>
