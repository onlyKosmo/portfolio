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
</script>

<script setup>
import figmaLogo from '@/assets/logo/Figma_logo.svg'
import vueLogo from '@/assets/logo/vue.svg'
import kIcon from '@/assets/logo/k-icon-blue-background.svg'
import wpLogo from '@/assets/logo/WordPress_blue_logo.svg'
import adobeLogo from '@/assets/logo/adobe-creative-cloud.svg'

const icons = [
  figmaLogo,
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg',
  vueLogo,
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  kIcon,
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  wpLogo,
  adobeLogo,
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
