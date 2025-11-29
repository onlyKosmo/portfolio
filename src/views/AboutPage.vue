<template>
  <div class="about-page">
    <Header :show-logo="true" />

    <section class="breadcrumb">
      <Breadcrumb current="À propos" />
    </section>

    <main class="content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-text">
            <h1 class="hero-title split-text">
              Votre futur<span class="accent-text"> développeur</span>
            </h1>
            <p class="hero-subtitle split-text">
              Je suis Basile, futur développeur Front-End passionné par les expériences numériques immersives.
            </p>
            <animated-button @click="downloadCV" >
              Télécharger mon CV
              <svg class="icon-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0 0l-4-4m4 4l4-4"/>
              </svg>
            </animated-button>
          </div>
          <div class="hero-visual">
            <div class="hero-graphic">
              <svg class="hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- Sections dynamiques alternées -->
      <section class="dynamic-sections">
        <div v-for="(item, index) in dynamicContent" :key="index" class="dynamic-row">
          <!-- badge -->
          <div :class="['badge-number', { 'order-left': index % 2 === 0, 'order-right': index % 2 !== 0 }]">
            {{ String(index + 1).padStart(2, '0') }}
          </div>

          <!-- Colonne texte (alternée) -->
          <div :class="['left-column', { 'order-2': index % 2 !== 0, 'order-1': index % 2 === 0 }]">
            <h2 class="section-title split-text">{{ item.title }}</h2>
            <p class="section-text split-text">{{ item.text }}</p>
            <p class="section-accent">→ {{ item.accent }}</p>
          </div>

          <!-- Colonne visuelle (alternée) -->
          <div :class="['right-column', { 'order-1': index % 2 !== 0, 'order-2': index % 2 === 0 }]">
            <div class="section-graphic">
              <div class="graphic-emoji">{{ item.emoji }}</div>
              <p class="graphic-label">{{ item.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Compétences -->
      <section class="skills-section">
        <h2 class="section-title-center split-text">Mes compétences techniques</h2>
        <div class="skills-grid">
          <div v-for="(skill, index) in skillsData" :key="index" class="skill-card">
            <div class="skill-icon">{{ skill.icon }}</div>
            <h3 class="skill-label">{{ skill.label }}</h3>
            <p class="skill-items">{{ skill.items }}</p>
          </div>
        </div>
      </section>
      <Marquee />

      <!-- Partie Kosmo en bas -->
      <section class="kosmo-section">
        <h2 class="kosmo-title scramble-text">Kosmo ?</h2>
        <p class="kosmo-explanation split-text">
          Qu'est ce que Kosmo ? Kosmo est un pseudonyme que j'utilise parfois sur internet. J'ai choisi de nommer mon portfolio comme ceci car il s'agit de ma personne mais sur le Web, comme ce portfolio. Ce portfolio est mon tout premier site utilisant les bibliothèques GSAP et Three.js, j'ai adoré apprendre les bases de ces bibliothèques JavaScript tout au long du développement.
        </p>
        <p class="kosmo-accent">→ Mon portfolio de futur développeur web</p>
      </section>

      <!-- CTA Final -->
      <section class="cta-final">
        <h3 class="cta-title split-text">Prêt à discuter ?</h3>
        <p class="cta-subtitle">Contactez-moi ou explorez mon portfolio complet pour découvrir mes derniers projets</p>
        <animated-button @click="downloadCV" >
          Télécharger mon CV
          <svg class="icon-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0 0l-4-4m4 4l4-4"/>
          </svg>
        </animated-button>
      </section>

      <Marquee />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Marquee from "@/components/Marquee.vue"
import Breadcrumb from '@/components/Breadcrumb.vue'
import cvFile from '@/assets/CV_FERRAND-RICHARTE_Basile.pdf'
import { onMounted } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import AnimatedButton from "@/components/AnimatedButton.vue";

gsap.registerPlugin(SplitText)

// Fonction pour télécharger le CV
function downloadCV() {
  const link = document.createElement("a")
  link.href = cvFile
  link.download = "CV_FERRAND-RICHARTE_Basile.pdf"
  link.click()
}

// Contenu des sections dynamiques alternées
const dynamicContent = [
  {
    title: "Bonjour, je m'appelle Basile",
    text: "Je suis étudiant en 2e année de BUT MMI avec une spécialisation en développement Web. En parallèle de mes études, je me forme continuellement à de nouveaux langages, frameworks et technologie pour créer des expériences web captivante, performante et immersive.",
    accent: "Développeur créatif",
    emoji: "📖",
    label: "Apprentissage"
  },
  {
    title: "Mes projets en MMI",
    text: "Dans mes projets de groupe à l’IUT, j’ai souvent été la personne qui fait le lien entre le design et la technique. J’aime imaginer une interface, puis lui donner vie dans le navigateur. Même si ces projets n’étaient pas tous orientés web, ils m’ont permis d’apprendre à travailler efficacement en équipe, à défendre des choix UX/UI, et à traduire des idées en solutions concrètes.",
    accent: "La Technologie au service du design",
    emoji: "🧑‍💻👨‍💻👩‍💻",
    label: "Travail d'équipe"
  },
  {
    title: "Impact et résultats",
    text: "Je développe des interfaces accessibles, structurées et responsives. Mon but est simple : rendre l’expérience agréable pour l’utilisateur. J’accorde autant d’importance à la qualité du code qu’à l’esthétique du résultat.",
    accent: "Qualité",
    emoji: "✨",
    label: "Impact"
  },
  {
    title: "Ce que je veux construire demain",
    text: "Je veux continuer à progresser en développement web, tout particulièrement en front-end, explorer de nouveaux frameworks et créer des sites plus rapides, plus immersifs, plus utiles. J’apprends un peu chaque jour, dans mes projets d'études comme dans mes projets personnels.",
    accent: "Gagner de l'expérience",
    emoji: "🌄",
    label: "Devenir développeur confirmé"
  }
]

// Données des compétences techniques
const skillsData = [
  {
    icon: "💻",
    label: "Front-End",
    items: "Vue.js, GSAP, Three.js, CSS"
  },
  {
    icon: "⚙️",
    label: "Back-end",
    items: "PHP, Node.js"
  },
  {
    icon: "🗃️",
    label: "Base de données",
    items: "SQL, MariaDB"
  },
  {
    icon: "⚡",
    label: "Déploiement",
    items: "Amazon Web Services, Infomaniak"
  },
  {
    icon: "👁️",
    label: "UI/UX Design",
    items: "User Flow, Maquettes Figma animées, Design d'expérience"
  }
]

// Animations GSAP au montage du composant
onMounted(() => {
  // Animation SplitText pour tous les éléments .split-text
  const splitEls = document.querySelectorAll('.split-text')
  splitEls.forEach(el => {
    const split = new SplitText(el, { type: "lines, words, chars" })
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.6,
      scrollTrigger: {
        trigger: el,
        start: "top 90%"
      }
    })
  })

  // Animation ScrambleText pour "Kosmo ?"
  const kosmo = document.querySelector('.scramble-text')
  if (kosmo) {
    gsap.fromTo(kosmo, { textContent: "K____o ?" }, {
      duration: 2,
      textContent: "Kosmo ?",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: kosmo,
        start: "top 90%"
      }
    })
  }

  // Animation des cartes de compétences au scroll
  const skillCards = document.querySelectorAll('.skill-card')
  skillCards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 90%"
      }
    })
  })

  // Animation des sections dynamiques
  const dynamicRows = document.querySelectorAll('.dynamic-row')
  dynamicRows.forEach((row, i) => {
    gsap.from(row, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: i * 0.15,
      scrollTrigger: {
        trigger: row,
        start: "top 85%"
      }
    })
  })
})
</script>

<style scoped>
.about-page {
  padding: 8rem 3rem 1rem 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: var(--color-bg);
  height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 3rem 2rem;
  text-align: center;
}

/* Hero Section */
.hero-section {
  width: 100%;
  margin-bottom: 4rem;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.accent-text {
  color: var(--color-accent);
}

.hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-subtitle);
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-graphic {
  width: 250px;
  height: 250px;
  border-radius: 1rem;
  border: 2px solid var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 92, 246, 0.05);
  backdrop-filter: blur(10px);
}

.hero-icon {
  width: 120px;
  height: 120px;
  stroke: var(--color-accent);
  stroke-width: 1.5;
}

.icon-download {
  width: 1.25rem;
  height: 1.25rem;
}

/* Sections dynamiques alternées */
.dynamic-sections {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 5rem;
}

.dynamic-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  padding: 2rem 0;
}

.badge-number {
  position: absolute;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-accent);
  opacity: 0.15;
  top: 0;
  z-index: 0;
}

.order-left {
  left: -2rem;
}

.order-right {
  right: -2rem;
}

.order-1 {
  order: 1;
}

.order-2 {
  order: 2;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
}

.section-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-subtitle);
}

.section-accent {
  font-size: 0.875rem;
  color: var(--color-accent);
  font-weight: 600;
  font-style: italic;
  margin-top: 0.5rem;
}

.right-column {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.section-graphic {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1;
  border-radius: 1rem;
  border: 2px solid var(--color-accent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(139, 92, 246, 0.05);
  backdrop-filter: blur(10px);
}

.graphic-emoji {
  font-size: 3.5rem;
}

.graphic-label {
  font-size: 0.875rem;
  color: var(--color-subtitle);
  font-weight: 600;
}

/* Section Compétences */
.skills-section {
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto 0;
  padding: 3rem 0;
}

.section-title-center {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 3rem;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-card {
  padding: 2rem;
  border: 1px solid var(--color-accent);
  border-radius: 0.75rem;
  background: rgba(139, 92, 246, 0.08);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.3s ease;
}

.skill-card:hover {
  border-color: var(--color-accent);
  background: rgba(139, 92, 246, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.2);
}

.skill-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.skill-label {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.skill-items {
  font-size: 0.875rem;
  color: var(--color-subtitle);
  line-height: 1.6;
}

/* Section Kosmo */
.kosmo-section {
  width: 100%;
  max-width: 1200px;
  margin: 5rem auto 0;
  padding: 4rem 3rem;
  text-align: center;
  border-top: 1px solid var(--color-accent);
  border-top-opacity: 0.3;
}

.kosmo-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-accent), #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
}

.kosmo-explanation {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-subtitle);
  max-width: 700px;
  margin: 0 auto 1rem;
}

.kosmo-accent {
  font-size: 0.875rem;
  color: var(--color-accent);
  font-weight: 600;
  font-style: italic;
  margin-top: 1rem;
}

/* CTA Final */
.cta-final {
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 3rem;
  border: 1px solid var(--color-accent);
  border-radius: 1rem;
  background: rgba(139, 92, 246, 0.08);
  backdrop-filter: blur(10px);
  text-align: center;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1rem;
  color: var(--color-subtitle);
  margin-bottom: 2rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-visual {
    display: none;
  }

  .dynamic-row {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem 0;
  }

  .right-column {
    display: none;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .kosmo-title {
    font-size: 2rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}
</style>