<!-- app/components/layout/AppNav.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 80
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header :class="['site-nav', { 'is-scrolled': isScrolled, 'menu-is-open': menuOpen }]" role="banner">
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
        <a href="#contact" class="nav-cta" aria-label="Say hello — go to contact">say hello →</a>
      </nav>

      <!-- Hamburger button -->
      <button
        class="nav-mobile-btn"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        aria-controls="mobile-menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="bar bar--top" />
        <span class="bar bar--mid" />
        <span class="bar bar--bot" />
      </button>
    </div>

    <!-- Mobile dropdown -->
    <Transition name="menu">
      <div
        v-show="menuOpen"
        id="mobile-menu"
        class="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div class="container mobile-menu-inner">
          <a href="#work"    class="mobile-link" @click="closeMenu">work</a>
          <a href="#about"   class="mobile-link" @click="closeMenu">about</a>
          <a href="#contact" class="mobile-link" @click="closeMenu">contact</a>
          <a href="#contact" class="mobile-link mobile-link--cta" @click="closeMenu">say hello →</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ── Nav shell ───────────────────────────────────────── */
.site-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
  border-bottom: 1px solid transparent;
}

.site-nav.is-scrolled {
  background: rgba(250, 248, 243, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--border);
}

/* when menu is open, always show the solid background */
.site-nav.menu-is-open {
  background: var(--bg);
  border-bottom-color: transparent;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  transition: height 0.3s ease;
}
.site-nav.is-scrolled .nav-inner { height: 56px; }

/* ── Logo ────────────────────────────────────────────── */
.nav-logo {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 18px;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.01em;
}

/* ── Desktop nav ─────────────────────────────────────── */
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

/* ── Hamburger button ────────────────────────────────── */
.nav-mobile-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.bar {
  display: block;
  height: 1.5px;
  background: var(--text);
  border-radius: 1px;
  transform-origin: center;
  transition: transform 0.35s cubic-bezier(0.77, 0, 0.175, 1),
              opacity   0.2s ease,
              width     0.35s cubic-bezier(0.77, 0, 0.175, 1);
}

/* Staggered widths give it personality */
.bar--top { width: 22px; }
.bar--mid { width: 16px; }
.bar--bot { width: 22px; }

/* Open state: morph into × */
.menu-is-open .bar--top {
  width: 22px;
  transform: translateY(6.5px) rotate(45deg);
}
.menu-is-open .bar--mid {
  opacity: 0;
  transform: scaleX(0);
}
.menu-is-open .bar--bot {
  width: 22px;
  transform: translateY(-6.5px) rotate(-45deg);
}

/* ── Mobile dropdown ─────────────────────────────────── */
.mobile-menu {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.mobile-menu-inner {
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
}

.mobile-link {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
  letter-spacing: 0.04em;
  transition: color 0.15s ease;
}
.mobile-link:hover { color: var(--text); }
.mobile-link--cta  { color: var(--accent); border-bottom: none; padding-top: 20px; }

/* ── Menu slide transition ───────────────────────────── */
.menu-enter-active {
  animation: menuIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.menu-leave-active {
  animation: menuOut 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes menuIn {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes menuOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

/* Stagger links inside on open */
.menu-enter-active .mobile-link:nth-child(1) { animation: linkFade 0.3s 0.05s both; }
.menu-enter-active .mobile-link:nth-child(2) { animation: linkFade 0.3s 0.10s both; }
.menu-enter-active .mobile-link:nth-child(3) { animation: linkFade 0.3s 0.15s both; }
.menu-enter-active .mobile-link:nth-child(4) { animation: linkFade 0.3s 0.20s both; }

@keyframes linkFade {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Breakpoint ──────────────────────────────────────── */
@media (max-width: 768px) {
  .nav-links      { display: none; }
  .nav-mobile-btn { display: flex; }
}
</style>
