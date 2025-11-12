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

<script setup>
const icons = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phpstorm/phpstorm-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
]
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  padding: 3rem 0;
  background: #f0f0f0;
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
