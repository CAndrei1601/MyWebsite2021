<!-- app/components/sections/HeroSection.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useGsap } from '~/composables/useGsap'

const headlineRef = ref<HTMLElement | null>(null)
const eyebrowRef  = ref<HTMLElement | null>(null)
const bioRef      = ref<HTMLElement | null>(null)
const actionsRef  = ref<HTMLElement | null>(null)

useGsap((gsap, _ST, SplitText) => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
  const split = new SplitText(headlineRef.value, { type: 'words' })

  // Set initial states
  gsap.set(split.words, { y: 30, opacity: 0 })
  gsap.set([eyebrowRef.value, bioRef.value, actionsRef.value], { y: 20, opacity: 0 })

  tl.to(eyebrowRef.value,  { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
    .to(split.words,       { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, '-=0.1')
    .to(bioRef.value,      { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
    .to(actionsRef.value,  { y: 0, opacity: 1, duration: 0.4 }, '-=0.25')

  return () => split.revert()
})

function copyEmail() {
  navigator.clipboard.writeText('chioreanandrei92@gmail.com')
}
</script>

<template>
  <section id="home" class="hero border-editorial">
    <div class="container hero-inner">
      <p ref="eyebrowRef" class="hero-eyebrow text-eyebrow">
        Frontend Engineer — Cluj, Romania
      </p>

      <h1 ref="headlineRef" class="hero-headline text-display">
        The frontend layer is where<br>
        design becomes <span class="hero-accent">real.</span>
      </h1>

      <div class="hero-bottom">
        <p ref="bioRef" class="hero-bio">
          I'm a frontend engineer who builds the space between a designer's vision
          and a user's experience — through design systems, polished interactions,
          and code that scales. 4+ years shipping production interfaces at
          product-focused companies.
        </p>

        <div ref="actionsRef" class="hero-actions">
          <a href="#work" class="btn-primary">View Work</a>
          <button class="btn-secondary font-mono" @click="copyEmail">
            chioreanandrei92@gmail.com
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 140px;
  padding-bottom: 56px;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hero-eyebrow {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero-eyebrow::after {
  content: '';
  display: inline-block;
  width: 32px;
  height: 1px;
  background: var(--accent);
}

.hero-headline {
  max-width: 820px;
  margin-bottom: 40px;
  color: var(--text);
}

.hero-accent {
  font-style: normal;
  color: var(--accent);
}

.hero-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: end;
}

.hero-bio {
  font-size: 16px;
  color: #5A4A35;
  line-height: 1.7;
  max-width: 440px;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.btn-primary {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--text);
  color: var(--bg);
  padding: 12px 22px;
  border-radius: 2px;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: opacity 0.15s;
}
.btn-primary:hover { opacity: 0.85; }

.btn-secondary {
  background: none;
  border: none;
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.02em;
  cursor: pointer;
  padding: 0;
  border-bottom: 1px solid var(--border);
  padding-bottom: 2px;
  transition: color 0.15s, border-color 0.15s;
}
.btn-secondary:hover {
  color: var(--text);
  border-color: var(--text-muted);
}

@media (max-width: 768px) {
  .hero { padding-top: 110px; }
  .hero-bottom {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .hero-bio { max-width: 100%; }
}

@media (max-width: 480px) {
  .hero-actions {
    width: 100%;
  }
  .btn-secondary {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
