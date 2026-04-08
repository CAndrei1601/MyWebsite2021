<!-- app/components/layout/AppFooter.vue -->
<template>
  <footer class="site-footer border-editorial-top">
    <div class="container footer-inner">
      <span class="footer-left font-mono">
        © 2026 Andrei Chiorean — Built with Nuxt 3 · TypeScript · GSAP
      </span>
      <span class="footer-right font-serif">
        Cluj, Romania
      </span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 24px 0;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.footer-left {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.footer-right {
  font-style: italic;
  font-size: 13px;
  color: var(--text-muted);
}

@media (max-width: 600px) {
  .footer-inner { flex-direction: column; align-items: flex-start; gap: 6px; }
  .footer-left { font-size: 10px; }
}
</style>
