<template>
  <footer class="footer">
    <p>&copy; {{ new Date().getFullYear() }} Basile Ferrand-Richarte</p>
    <div class="social-links">
      <a href="https://github.com/onlyKosmo" target="_blank">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
      </a>
      <a href="https://linkedin.com/in/basileferi" target="_blank">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
      </a>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #06101a;
  color: #fff;
  position: relative;
  width: 100%;
  z-index: 10;
}

.social-links { display: flex; gap: 0.5rem; }
.social-links img { width: 2rem; height: 2rem; }

@media (max-width: 768px) {
  .footer { flex-direction: column; gap: 0.5rem; }
}
</style>
