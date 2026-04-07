<!-- app/components/sections/WorkSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { projects } from '~~/data/projects'
import { useGsap } from '~/composables/useGsap'

const sectionRef = ref<HTMLElement | null>(null)

useGsap((gsap, ScrollTrigger) => {
  const spreads = sectionRef.value?.querySelectorAll('.project-info')
  const visuals  = sectionRef.value?.querySelectorAll('.project-visual')

  spreads?.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    )
  })

  visuals?.forEach((el) => {
    const reversed = el.closest('.project-spread--reversed')
    const xFrom = reversed ? -40 : 40
    gsap.fromTo(
      el,
      { x: xFrom, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    )
  })

  return () => ScrollTrigger.getAll().forEach((t: any) => t.kill())
})
</script>

<template>
  <section id="work" ref="sectionRef" class="work-section">
    <div class="container">
      <SectionHeader number="01" title="Selected Work" count="5 projects" />
      <ProjectSpread
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<style scoped>
.work-section {
  padding-bottom: 0;
}
</style>
