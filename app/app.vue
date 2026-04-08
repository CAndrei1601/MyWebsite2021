<!-- app/app.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import '~/assets/styles/main.css'

onMounted(() => {
  // Prevent browser from restoring scroll position on refresh
  if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)
})
</script>

<template>
  <div>
    <AppNav />
    <NuxtPage />
    <AppFooter />
  </div>
</template>
