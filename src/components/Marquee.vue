<template>
  <div class="marquee-container">
    <div class="marquee-track">
      <div class="marquee-content">
        <img
            v-for="(icon, i) in icons"
            :key="`a-${i}`"
            :src="icon"
            alt=""
        />
        <!-- Duplicate -->
        <img
            v-for="(icon, i) in icons"
            :key="`b-${i}`"
            :src="icon"
            alt=""
        />
      </div>
    </div>
  </div>
</template>

<script type="module">
import wordpressicons from 'https://cdn.jsdelivr.net/npm/@wordpress/icons@11.3.0/+esm'
</script>

<script setup>

const icons = [
  'src/assets/logo/Figma_logo.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg',
  'src/assets/logo/vue.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'src/assets/logo/k-icon-blue-background.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  'src/assets/logo/WordPress_blue_logo.svg',
  'src/assets/logo/adobe-creative-cloud.svg'
]
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  padding: 3rem 0;
  mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
  /* webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
   */
}

.marquee-track {
  width: 100%;
  display: flex;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  gap: 4rem;
  animation: scroll-left 25s linear infinite;
  align-items: center;
}

.marquee-content img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  flex-shrink: 0;
  display: block;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
