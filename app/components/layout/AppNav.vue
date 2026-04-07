<!-- app/components/layout/AppNav.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 80
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header :class="['site-nav', { 'is-scrolled': isScrolled }]" role="banner">
    <div class="container nav-inner">
      <!-- Logo -->
      <a href="#home" class="nav-logo" aria-label="Andrei Chiorean — Home">
        Andrei Chiorean
      </a>

      <!-- Desktop links -->
      <nav class="nav-links" aria-label="Main navigation">
        <a href="#work"    class="nav-link link-underline">work</a>
        <a href="#about"   class="nav-link link-underline">about</a>
        <a href="#contact" class="nav-link link-underline">contact</a>
        <a
          href="#contact"
          class="nav-cta"
          aria-label="Say hello — go to contact"
        >say hello →</a>
      </nav>

      <!-- Mobile menu button -->
      <button
        class="nav-mobile-btn font-mono"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'close' : 'menu' }}
      </button>
    </div>

    <!-- Mobile dropdown -->
    <div
      v-if="menuOpen"
      id="mobile-menu"
      class="mobile-menu container"
      @click="menuOpen = false"
    >
      <a href="#work"    class="mobile-link">work</a>
      <a href="#about"   class="mobile-link">about</a>
      <a href="#contact" class="mobile-link">contact</a>
      <a href="#contact" class="mobile-link mobile-link--cta">say hello →</a>
    </div>
  </header>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: padding 0.3s ease, backdrop-filter 0.3s ease, background 0.3s ease;
  border-bottom: 1px solid transparent;
}

.site-nav.is-scrolled {
  background: rgba(250, 248, 243, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  transition: height 0.3s ease;
}

.site-nav.is-scrolled .nav-inner { height: 56px; }

.nav-logo {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 18px;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.15s;
}
.nav-link:hover { color: var(--text); }

.nav-cta {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 6px 14px;
  border-radius: 2px;
  text-decoration: none;
  letter-spacing: 0.04em;
  position: relative;
  overflow: hidden;
  transition: color 0.3s;
  z-index: 0;
}

.nav-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  z-index: -1;
}

.nav-cta:hover { color: var(--bg); }
.nav-cta:hover::before { transform: scaleX(1); }

/* Mobile */
.nav-mobile-btn {
  display: none;
  background: none;
  border: none;
  font-size: 12px;
  color: var(--text-muted);
  cursor: pointer;
  letter-spacing: 0.06em;
  padding: 8px;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 20px;
  background: var(--bg);
  border-top: 1px solid var(--border);
}

.mobile-link {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  letter-spacing: 0.04em;
}

.mobile-link--cta { color: var(--accent); border-bottom: none; }

@media (max-width: 768px) {
  .nav-links      { display: none; }
  .nav-mobile-btn { display: block; }
}
</style>
