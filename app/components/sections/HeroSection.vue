<!-- app/components/sections/HeroSection.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGsap } from '~/composables/useGsap'

/* ── GSAP text animation ──────────────────────────── */
const headlineRef = ref<HTMLElement | null>(null)
const eyebrowRef  = ref<HTMLElement | null>(null)
const bioRef      = ref<HTMLElement | null>(null)
const actionsRef  = ref<HTMLElement | null>(null)

useGsap((gsap, _ST, SplitText) => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
  const split = new SplitText(headlineRef.value, { type: 'words' })
  gsap.set(split.words, { y: 30, opacity: 0 })
  gsap.set([eyebrowRef.value, bioRef.value, actionsRef.value], { y: 20, opacity: 0 })
  tl.to(eyebrowRef.value,  { y: 0, opacity: 1, duration: 0.4 })
    .to(split.words,       { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, '-=0.1')
    .to(bioRef.value,      { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
    .to(actionsRef.value,  { y: 0, opacity: 1, duration: 0.4 }, '-=0.25')
  return () => split.revert()
})

function copyEmail() {
  navigator.clipboard.writeText('chioreanandrei92@gmail.com')
}

/* ── Canvas particle system ───────────────────────── */
const sectionRef = ref<HTMLElement | null>(null)
const canvasRef  = ref<HTMLCanvasElement | null>(null)

// Top-level vars — safe because canvas only initialises inside onMounted
const COLORS = ['#C7622A','#C7622A','#DDD8CE','#DDD8CE','#DDD8CE','#8A7A65','#8A7A65','#1A1208']

type Shape = 'circle' | 'diamond'
interface Particle {
  x: number; y: number
  vx: number; vy: number; baseVy: number
  size: number; color: string
  alpha: number; z: number
  shape: Shape; phase: number
  burst: boolean; decay: number
}

let ctx: CanvasRenderingContext2D | null = null
let W = 0, H = 0, animId = 0, frame = 0
let particles: Particle[] = []
const mouse = { x: -9999, y: -9999 }

function mkParticle(x?: number, y?: number, burst = false): Particle {
  const z = Math.random()
  const speed = 0.12 + z * 0.28
  const angle = Math.random() * Math.PI * 2
  const bSpeed = Math.random() * 3.5 + 1
  return {
    x: x ?? Math.random() * W,
    y: y ?? Math.random() * H,
    vx:     burst ? Math.cos(angle) * bSpeed : (Math.random() - 0.5) * 0.25,
    vy:     burst ? Math.sin(angle) * bSpeed : -speed,
    baseVy: burst ? 0 : -speed,
    size:   burst ? Math.random() * 5 + 2 : 1.5 + z * 3.5,
    color:  burst ? '#C7622A' : COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha:  burst ? 0.85 : 0.15 + z * 0.55,
    z, shape: Math.random() > 0.72 ? 'diamond' : 'circle',
    phase: Math.random() * Math.PI * 2,
    burst, decay: burst ? 0.018 + Math.random() * 0.01 : 0,
  }
}

function initParticles() {
  particles = []
  const count = Math.min(90, Math.floor((W * H) / 5500))
  for (let i = 0; i < count; i++) particles.push(mkParticle())
}

function drawParticle(p: Particle) {
  if (!ctx) return
  ctx.save()
  ctx.globalAlpha = Math.max(0, p.alpha)
  ctx.fillStyle   = p.color
  if (p.shape === 'diamond') {
    const s = p.size * 0.75
    ctx.translate(p.x, p.y)
    ctx.rotate(Math.PI / 4 + p.phase * 0.3)
    ctx.fillRect(-s / 2, -s / 2, s, s)
  } else {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

function tick() {
  if (!ctx) return
  ctx.clearRect(0, 0, W, H)
  frame++
  particles = particles.filter(p => p.alpha > 0.005)
  for (const p of particles) {
    p.x += p.vx + Math.sin(frame * 0.008 + p.phase) * 0.18
    p.y += p.vy
    const dx = p.x - mouse.x, dy = p.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 100 && dist > 0) {
      const f = ((100 - dist) / 100) * 0.55
      p.vx += (dx / dist) * f
      p.vy += (dy / dist) * f
    }
    p.vx += (0 - p.vx) * 0.04
    p.vy += (p.baseVy - p.vy) * 0.04
    if (p.burst) p.alpha -= p.decay
    if (!p.burst) {
      if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W }
      if (p.x < -8) p.x = W + 8
      if (p.x > W + 8) p.x = -8
    }
    drawParticle(p)
  }
  animId = requestAnimationFrame(tick)
}

function resize() {
  if (!canvasRef.value) return
  const wrap = canvasRef.value.parentElement!
  W = canvasRef.value.width  = wrap.offsetWidth
  H = canvasRef.value.height = wrap.offsetHeight
  initParticles()
}

function getWrapPos(e: MouseEvent) {
  const wrap = canvasRef.value!.parentElement!
  const r = wrap.getBoundingClientRect()
  return { x: e.clientX - r.left, y: e.clientY - r.top }
}

// Event handlers — defined at top level so Vue can reference them
function handleMouseMove(e: MouseEvent) {
  const p = getWrapPos(e)
  mouse.x = p.x; mouse.y = p.y
}
function handleMouseLeave() { mouse.x = mouse.y = -9999 }
function handleClick(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('a, button')) return
  const { x, y } = getWrapPos(e)
  if (x < 0 || x > W || y < 0 || y > H) return
  for (let i = 0; i < 22; i++) particles.push(mkParticle(x, y, true))
}

onMounted(() => {
  if (!canvasRef.value || !sectionRef.value) return
  ctx = canvasRef.value.getContext('2d')
  resize()
  tick()
  // Attach to section so events fire even when cursor is over text
  sectionRef.value.addEventListener('mousemove',  handleMouseMove)
  sectionRef.value.addEventListener('mouseleave', handleMouseLeave)
  sectionRef.value.addEventListener('click',      handleClick)
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  sectionRef.value?.removeEventListener('mousemove',  handleMouseMove)
  sectionRef.value?.removeEventListener('mouseleave', handleMouseLeave)
  sectionRef.value?.removeEventListener('click',      handleClick)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <section
    id="home"
    ref="sectionRef"
    class="hero border-editorial"
  >
    <div class="container hero-inner">

      <!-- Left: text content -->
      <div class="hero-text">
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
            <button class="btn-secondary font-mono" @click.stop="copyEmail">
              chioreanandrei92@gmail.com
            </button>
          </div>
        </div>
      </div>

      <!-- Right col on desktop / absolute background on mobile -->
      <div class="hero-canvas-wrap" aria-hidden="true">
        <canvas ref="canvasRef" class="hero-canvas" />
        <p class="canvas-hint font-mono">click to interact</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: 140px;
  padding-bottom: 56px;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

/* ── Left: text ──────────────────────────────────── */
.hero-text {
  display: flex;
  flex-direction: column;
}

/* ── Right: canvas (desktop grid item) ───────────── */
.hero-canvas-wrap {
  position: relative;
  height: 420px;
  overflow: hidden;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.canvas-hint {
  position: absolute;
  bottom: 14px;
  right: 16px;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--border);
  pointer-events: none;
  user-select: none;
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
  gap: 32px;
  align-items: end;
}

.hero-bio {
  font-size: 15px;
  color: #5A4A35;
  line-height: 1.7;
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

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 900px) {
  /* Collapse to single column; canvas-wrap leaves the flow */
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 0;
  }

  /* Canvas becomes a full-hero background layer */
  .hero-canvas-wrap {
    position: absolute;
    inset: 0;
    height: auto;
    z-index: 0;
  }

  /* Text stays readable above the canvas */
  .hero-text {
    position: relative;
    z-index: 1;
  }
}

@media (max-width: 768px) {
  .hero { padding-top: 110px; }
  .hero-bottom {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .btn-secondary {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
