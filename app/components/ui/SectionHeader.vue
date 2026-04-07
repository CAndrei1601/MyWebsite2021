<!-- app/components/ui/SectionHeader.vue -->
<script setup lang="ts">
defineProps<{
  number: string
  title: string
  count?: string
}>()
</script>

<template>
  <div class="section-header border-editorial-top border-editorial">
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
