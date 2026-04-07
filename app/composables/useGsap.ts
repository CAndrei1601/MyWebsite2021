// app/composables/useGsap.ts
import { onMounted, onUnmounted } from 'vue'

/**
 * Returns true if the user prefers reduced motion.
 * Must only be called on the client side.
 */
export function usePrefersReducedMotion(): boolean {
  if (!import.meta.client) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Lazily loads GSAP + ScrollTrigger + SplitText.
 * Always call inside onMounted to guarantee client-side execution.
 */
export async function loadGsap() {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  const { SplitText } = await import('gsap/SplitText')
  gsap.registerPlugin(ScrollTrigger, SplitText)
  return { gsap, ScrollTrigger, SplitText }
}

/**
 * Composable that loads GSAP on mount and cleans up on unmount.
 *
 * Usage in a component:
 *   useGsap((gsap, ScrollTrigger, SplitText) => {
 *     // set up animations
 *     return () => { // optional cleanup }
 *   })
 */
export function useGsap(
  callback: (gsap: any, ScrollTrigger: any, SplitText: any) => (() => void) | void
) {
  let cleanup: (() => void) | void

  onMounted(async () => {
    if (usePrefersReducedMotion()) return

    const { gsap, ScrollTrigger, SplitText } = await loadGsap()
    cleanup = callback(gsap, ScrollTrigger, SplitText)
  })

  onUnmounted(() => {
    if (cleanup) cleanup()
  })
}
