<template>
  <section ref="ctaRef" class="cta-final">
    <!-- Slot pour contenu custom OU contenu par défaut -->
    <slot>
      <h3 ref="titleRef" class="cta-title">{{ title }}</h3>
      <p v-if="subtitle" ref="subtitleRef" class="cta-subtitle">{{ subtitle }}</p>

      <animated-button ref="buttonRef" @click="handleClick">
        {{ buttonText }}
        <svg class="icon-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0 0l-4-4m4 4l4-4"/>
        </svg>
      </animated-button>
    </slot>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedButton from '@/components/AnimatedButton.vue';
import cvFile from '@/assets/CV_FERRAND-RICHARTE_Basile.pdf';

gsap.registerPlugin(SplitText, ScrollTrigger);

// ===================================
// REFS
// ===================================
const ctaRef = ref(null);
const titleRef = ref(null);
const subtitleRef = ref(null);
const buttonRef = ref(null);

// ===================================
// PROPS
// ===================================
const props = defineProps({
  title: {
    type: String,
    default: 'Prêt à discuter ?'
  },
  subtitle: {
    type: String,
    default: 'Contactez-moi ou explorez mon portfolio complet pour découvrir mes derniers projets'
  },
  buttonText: {
    type: String,
    default: 'Télécharger mon CV'
  },
  buttonAction: {
    type: Function,
    default: null
  }
});

// ===================================
// ÉMITS
// ===================================
const emit = defineEmits(['button-click']);

// ===================================
// GESTION DU CLIC
// ===================================
function handleClick() {
  if (props.buttonAction) {
    props.buttonAction();
  } else {
    downloadCV();
  }
  emit('button-click');
}

function downloadCV() {
  const link = document.createElement('a');
  link.href = cvFile;
  link.download = 'CV_FERRAND-RICHARTE_Basile.pdf';
  link.click();
}

// ===================================
// ANIMATIONS GSAP
// ===================================
let scrollTriggerInstances = [];

onMounted(() => {
  // Petit délai pour s'assurer que le DOM est monté
  setTimeout(() => {
    document.fonts.ready.then(() => {
      console.log('🎬 CTA Component: Initialisation animations');

      // Animation du titre (SplitText)
      if (titleRef.value) {
        console.log('📋 Titre CTA trouvé');

        const split = new SplitText(titleRef.value, {
          type: 'lines',
          linesClass: 'split-line'
        });

        new SplitText(titleRef.value, {
          type: 'lines',
          linesClass: 'split-parent'
        });

        gsap.from(split.lines, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: ctaRef.value,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => console.log('✅ Animation titre CTA déclenchée')
          }
        });
      }

      // Animation du sous-titre
      if (subtitleRef.value) {
        console.log('📄 Sous-titre CTA trouvé');

        gsap.from(subtitleRef.value, {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.value,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => console.log('✅ Animation sous-titre CTA déclenchée')
          }
        });
      }

      // Animation du bouton
      if (buttonRef.value && buttonRef.value.$el) {
        console.log('🔘 Bouton CTA trouvé');

        gsap.from(buttonRef.value.$el, {
          opacity: 0,
          y: 10,
          duration: 0.5,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.value,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => console.log('✅ Animation bouton CTA déclenchée')
          }
        });
      }

      // Recalculer ScrollTrigger
      ScrollTrigger.refresh();
    });
  }, 100);
});

// Nettoyage au démontage
onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars && trigger.vars.trigger === ctaRef.value) {
      trigger.kill();
    }
  });
});
</script>

<style scoped>
/* ===================================
   MASQUAGE AVANT ANIMATION
   =================================== */
.cta-title {
  opacity: 0;
}

.cta-subtitle {
  opacity: 0;
}

.cta-final :deep(button) {
  opacity: 0;
}

:deep(.split-parent) {
  overflow: hidden;
}

:deep(.split-line) {
  overflow: hidden;
}

/* ===================================
   STYLES DU CTA
   =================================== */
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
  line-height: 1.3;
}

.cta-subtitle {
  font-size: 1rem;
  color: var(--color-subtitle);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.icon-download {
  width: 1.25rem;
  height: 1.25rem;
}

/* ===================================
   RESPONSIVE
   =================================== */
@media (max-width: 768px) {
  .cta-final {
    padding: 2rem 1.5rem;
    margin: 3rem auto 0;
  }

  .cta-title {
    font-size: 1.5rem;
  }

  .cta-subtitle {
    font-size: 0.9rem;
  }
}
</style>