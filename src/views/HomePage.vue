<template>
  <div id="app">
    <Header :class="{ hidden: headerHidden }" />
    <HeroSection @hide-header="headerHidden = true"
                 @show-header="headerHidden = false"
    />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import HeroSection from '@/components/HeroSection.vue'
import { ref } from 'vue'

const headerHidden = ref(false)
</script>
