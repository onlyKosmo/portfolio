<template>
  <div class="modal-content">
    <div class="modal-header">
      <p class="modal-subtitle">
        Parlez moi de votre projet, je le déclinerai en site web
      </p>
      <button class="close-btn" @click="$emit('close')" aria-label="Close modal">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <form
        class="modal-form"
        action="https://formspree.io/f/mqaqaabz"
        method="POST"
    >
      <div class="grid-form">
        <div>
          <label for="firstName">Prénom</label>
          <input id="firstName" type="text" name="firstName" placeholder="Prénom" required />
        </div>
        <div>
          <label for="lastName">Nom</label>
          <input id="lastName" type="text" name="lastName" placeholder="Nom" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input id="email" type="email" name="email" placeholder="Email" required />
        </div>
        <div>
          <label for="telephone">Téléphone</label>
          <input id="telephone" type="tel" name="telephone" placeholder="Téléphone" />
        </div>
      </div>

      <div class="message-field">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="3" placeholder="Votre message..." required></textarea>
      </div>

      <div class="modal-footer">
        <div class="social-links">
          <a href="https://linkedin.com/in/basileferi" target="_blank" aria-label="LinkedIn">LinkedIn</a>
          <a href="https://github.com/onlyKosmo" target="_blank" aria-label="GitHub">GitHub</a>
        </div>
        <button type="submit" class="submit-btn">Envoyer</button>
      </div>
    </form>
  </div>
</template>

<script setup>
</script>

<style scoped>
.modal-content {
  position: relative;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  background: var(--color-bg);
  color: var(--color-text);
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  font-family: 'NeueMontreal', sans-serif;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-subtitle {
  font-size: 0.9rem;
  font-style: italic;
  flex: 1;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.25rem;
}

.modal-form label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
}

.modal-form input,
.modal-form textarea {
  width: 100%;
  padding: 0.5rem;
  background-color: rgba(38, 38, 38, 0.3);
  border: 1px solid var(--color-subtitle);
  border-radius: 8px;
  color: var(--color-text);
  font-family: 'NeueMontreal', sans-serif;
  font-weight: 400;
  backdrop-filter: blur(4px);
  margin-bottom: 1rem;
}

.message-field textarea {
  resize: none;
  background-color: rgba(38,38,38,0.15);
  border-color: var(--color-subtitle);
}

.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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

.submit-btn {
  background: transparent;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  padding: 0.5rem 1.5rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: var(--color-text);
  color: var(--color-bg);
}

@media (max-width: 640px) {
  .grid-form {
    grid-template-columns: 1fr;
  }
}
</style>
