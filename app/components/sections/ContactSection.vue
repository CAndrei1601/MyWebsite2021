<!-- app/components/sections/ContactSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useGsap } from '~/composables/useGsap'

const sectionRef = ref<HTMLElement | null>(null)

useGsap((gsap, ScrollTrigger) => {
  gsap.fromTo(
    sectionRef.value?.querySelectorAll('.gsap-contact'),
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 85%' },
    }
  )
  return () => ScrollTrigger.getAll().forEach((t: any) => t.kill())
})
</script>

<template>
  <section id="contact" ref="sectionRef" class="contact-section">
    <div class="container">
      <SectionHeader number="03" title="Contact" />

      <div class="contact-grid">
        <div class="contact-left">
          <p class="text-eyebrow gsap-contact">Get in touch</p>
          <h3 class="contact-headline text-section-title gsap-contact">
            Let's build<br>something precise.
          </h3>
          <p class="contact-body gsap-contact">
            Open to senior frontend roles at product companies. Also happy to
            discuss freelance work, design system consultancy, or just a good
            conversation about frontend craft.
          </p>
        </div>

        <div class="contact-right gsap-contact">
          <a
            href="mailto:chioreanandrei92@gmail.com"
            class="contact-email font-mono link-underline"
          >
            chioreanandrei92@gmail.com
          </a>

          <div class="contact-links">
            <a
              href="https://github.com/CAndrei1601"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link font-mono link-underline"
            >GitHub</a>
            <a
              href="https://www.linkedin.com/in/andrei-chiorean-03a5541b1/"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link font-mono link-underline"
            >LinkedIn</a>
            <a
              href="/CV- Chiorean Andrei 2026.pdf"
              download
              class="contact-link font-mono link-underline"
            >Resume ↓</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section { padding-bottom: 0; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 48px 0 64px;
  border-bottom: 1px solid var(--border);
}

.contact-headline { margin: 12px 0 16px; }

.contact-body {
  font-size: 14px;
  color: #5A4A35;
  line-height: 1.7;
}

.contact-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
}

.contact-email {
  font-size: 15px;
  color: var(--text);
  text-decoration: none;
  letter-spacing: 0.01em;
}

.contact-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.contact-link {
  font-size: 11px;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: color 0.15s;
}
.contact-link:hover { color: var(--text); }

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 36px 0 48px;
  }
}

@media (max-width: 480px) {
  .contact-email {
    font-size: 13px;
    word-break: break-all;
  }
  .contact-links {
    gap: 16px;
  }
}
</style>
