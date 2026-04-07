<!-- app/components/sections/StripSection.vue -->
<template>
  <div class="strip border-editorial" aria-hidden="true">
    <div class="strip-track">
      <!-- Duplicated for seamless loop -->
      <template v-for="i in 2" :key="i">
        <span class="strip-item strip-item--highlight">Open to Work</span>
        <span class="strip-item">Design Systems</span>
        <span class="strip-sep">·</span>
        <span class="strip-item">Vue 3 · React · TypeScript</span>
        <span class="strip-sep">·</span>
        <span class="strip-item">GSAP · Motion Design</span>
        <span class="strip-sep">·</span>
        <span class="strip-item">Production Platforms</span>
        <span class="strip-sep">·</span>
        <span class="strip-item">Cluj, Romania</span>
        <span class="strip-sep">·</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.strip {
  overflow: hidden;
  padding: 0;
}

.strip-track {
  display: flex;
  align-items: center;
  animation: marquee 30s linear infinite;
  width: max-content;
}

.strip-item {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  white-space: nowrap;
  padding: 18px 20px;
}

.strip-item--highlight { color: var(--accent); }

.strip-sep {
  color: var(--border);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 0 4px;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .strip-track { animation: none; }
}
</style>
