<!-- app/components/ui/SectionHeader.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useGsap } from '~/composables/useGsap'

defineProps<{
  number: string
  title: string
  count?: string
}>()

const headerRef = ref<HTMLElement | null>(null)

useGsap((gsap, ScrollTrigger) => {
  if (!headerRef.value) return
  gsap.fromTo(
    headerRef.value,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 90%',
      },
    }
  )
  return () => ScrollTrigger.getAll().forEach((t: any) => t.kill())
})
</script>

<template>
  <div ref="headerRef" class="section-header border-editorial-top border-editorial">
    <span class="section-number text-label">{{ number }} —</span>
    <h2 class="section-title text-section-title">{{ title }}</h2>
    <span v-if="count" class="section-count text-label">{{ count }}</span>
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 48px 0 32px;
  gap: 16px;
}

.section-number {
  flex-shrink: 0;
}

.section-title {
  flex: 1;
}

.section-count {
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .section-header {
    flex-direction: column;
    gap: 6px;
    padding: 36px 0 24px;
  }
}
</style>
