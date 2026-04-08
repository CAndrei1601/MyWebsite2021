<!-- app/components/sections/AboutSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useGsap } from '~/composables/useGsap'

const sectionRef = ref<HTMLElement | null>(null)

useGsap((gsap, ScrollTrigger) => {
  const targets = sectionRef.value?.querySelectorAll('.gsap-about')

  if (targets?.length) {
    gsap.fromTo(
      Array.from(targets),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
        },
      }
    )
  }

  return () => ScrollTrigger.getAll().forEach((t: any) => t.kill())
})

const facts = [
  { key: 'Location',    value: 'Cluj-Napoca, Romania' },
  { key: 'Experience',  value: '4+ years, production-scale' },
  { key: 'Focus',       value: 'Design Systems · UI Engineering · GSAP', mono: true },
  { key: 'Background',  value: 'Product Platforms · Open Source' },
  { key: 'Looking for', value: 'Senior Frontend role at product-focused company', highlight: true },
]
</script>

<template>
  <section id="about" ref="sectionRef" class="about-section">
    <div class="container">
      <SectionHeader number="02" title="About" />

      <div class="about-grid">
        <!-- Left: editorial bio -->
        <div class="about-left">
          <blockquote class="about-pull gsap-about">
            "I care more about the seam between design and engineering
            than either discipline alone."
          </blockquote>

          <p class="about-body gsap-about">
            I'm a frontend engineer based in Cluj, Romania. Over the last 4+ years
            I've worked on production-scale web platforms while deepening my
            understanding of design systems, component architecture, and interaction
            engineering.
          </p>

          <p class="about-body gsap-about">
            I build with Vue 3 and React, think in tokens and component APIs, and
            reach for GSAP when motion needs to feel considered. I'm the kind of
            engineer who notices when a transition is 20ms too slow.
          </p>

          <div class="about-links gsap-about">
            <a
              href="/Andrei-CV.pdf"
              download
              class="project-link font-mono"
            >Download CV ↓</a>
            <a
              href="https://github.com/CAndrei1601"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link font-mono"
            >GitHub →</a>
            <a
              href="https://www.linkedin.com/in/andrei-chiorean-03a5541b1/"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link font-mono"
            >LinkedIn →</a>
          </div>
        </div>

        <!-- Right: structured facts -->
        <div class="about-right">
          <dl class="facts-list">
            <div
              v-for="fact in facts"
              :key="fact.key"
              class="fact-row gsap-about"
            >
              <dt class="fact-key text-label">{{ fact.key }}</dt>
              <dd
                :class="[
                  'fact-value',
                  { 'fact-value--mono': fact.mono, 'fact-value--highlight': fact.highlight }
                ]"
              >{{ fact.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section { padding-bottom: 0; }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  border-bottom: 1px solid var(--border);
}

.about-left {
  padding: 48px 48px 48px 0;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-pull {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 20px;
  color: var(--text);
  line-height: 1.45;
  letter-spacing: -0.01em;
  border-left: 3px solid var(--accent);
  padding-left: 18px;
  margin: 0;
}

.about-body {
  font-size: 15px;
  color: #5A4A35;
  line-height: 1.75;
}

.about-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.project-link {
  font-size: 11px;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: opacity 0.15s;
}
.project-link:hover { opacity: 0.7; }

.about-right {
  padding: 48px 0 48px 48px;
}

.facts-list {
  display: flex;
  flex-direction: column;
}

.fact-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.fact-row:last-child { border-bottom: none; }

.fact-key {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.fact-value {
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
}

.fact-value--mono {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
}

.fact-value--highlight { color: var(--accent); }

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-left {
    padding: 36px 0;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .about-right { padding: 36px 0; }
}

@media (max-width: 480px) {
  .about-pull {
    font-size: 17px;
  }
  .about-links {
    gap: 16px;
  }
  .fact-value--mono {
    font-size: 11px;
    word-break: break-word;
  }
}
</style>
