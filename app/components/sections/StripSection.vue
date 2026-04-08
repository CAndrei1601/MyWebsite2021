<!-- app/components/sections/StripSection.vue -->
<template>
  <div class="strip">
    <div class="container strip-inner">
      <span class="strip-badge strip-badge--accent">Open to Work</span>
      <span class="strip-item">Vue 3</span>
      <span class="strip-item">React</span>
      <span class="strip-item">TypeScript</span>
      <span class="strip-item">Nuxt</span>
      <span class="strip-item">Design Systems</span>
      <span class="strip-item">GSAP</span>
      <span class="strip-item">Component Architecture</span>
      <span class="strip-item">UI / UX Engineering</span>
      <span class="strip-item">AI Tools</span>
      <span class="strip-item">API Integration</span>
      <span class="strip-item">Cluj, Romania</span>
    </div>
  </div>
</template>

<style scoped>
/* Border spans full width; content is constrained by .container */
.strip {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.strip-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
}

.strip-item {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 5px 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.strip-item:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

.strip-badge--accent {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: 2px;
  padding: 5px 10px;
}

@media (max-width: 600px) {
  .strip-inner {
    gap: 6px;
  }
}
</style>
