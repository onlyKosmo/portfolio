<template>
  <footer class="footer">
    <p>&copy; {{ new Date().getFullYear() }} Basile Ferrand-Richarte</p>
    <div class="social-links flex items-center gap-4 sm:gap-5">

      <!-- LinkedIn -->
      <a href="https://linkedin.com/in/basileferi"
         target="_blank"
         rel="noopener noreferrer"
         class="flex items-center gap-1.5 text-white hover:text-gray-300 transition-colors"
         aria-label="LinkedIn">

        <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg"
            class="w-2.5 h-2.5 invert opacity-90"
            alt="LinkedIn">

        <span class="text-[0.65rem] font-nord font-thin leading-none">LinkedIn</span>
      </a>

      <!-- GitHub -->
      <a href="https://github.com/onlyKosmo"
         target="_blank"
         rel="noopener noreferrer"
         class="flex items-center gap-1.5 text-white hover:text-gray-300 transition-colors"
         aria-label="GitHub">

        <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg"
            class="w-2.5 h-2.5 invert opacity-90"
            alt="GitHub">

        <span class="text-[0.65rem] font-nord font-thin leading-none">GitHub</span>
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
  background: var(--color-bg);
  color: var(--color-text);
  position: relative;
  width: 100%;
  z-index: 10;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 130px; /* empêche la compression */
  flex-shrink: 0;   /* interdit d’écraser les icônes */
}

.social-links a {
  display: flex;
  align-items: center;
  gap: 4px;
}

.social-links img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  filter: invert(1);
  opacity: 0.9;
}


.social-links a {
  margin-right: 1rem;
  font-size: 0.75rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s;
}

.social-links a:hover {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .footer { flex-direction: column; gap: 0.5rem; }
}
</style>
