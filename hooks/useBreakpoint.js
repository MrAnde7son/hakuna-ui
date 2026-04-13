/**
 * @hakuna/ui — useBreakpoint hook
 *
 * Reactive breakpoint detection for inline-style components.
 * Since inline styles can't use @media queries, this hook
 * provides a clean way to adapt layouts at runtime.
 *
 * Usage:
 *   import { useBreakpoint } from '@hakuna/ui/hooks/useBreakpoint'
 *
 *   function MyComponent() {
 *     const bp = useBreakpoint()
 *     return (
 *       <div style={{
 *         flexDirection: bp.md ? 'row' : 'column',
 *         padding: bp.lg ? 24 : 12,
 *       }}>
 *         {bp.isMobile && <MobileNav />}
 *       </div>
 *     )
 *   }
 *
 * Returns:
 *   {
 *     sm: boolean,    // >= 480px
 *     md: boolean,    // >= 768px
 *     lg: boolean,    // >= 1024px
 *     xl: boolean,    // >= 1280px
 *     xxl: boolean,   // >= 1536px
 *     isMobile: boolean,  // < 768px (convenience)
 *     isTablet: boolean,  // >= 768px && < 1024px
 *     isDesktop: boolean, // >= 1024px
 *     width: number,      // current viewport width
 *   }
 */
import { useState, useEffect, useMemo } from 'react'
import { BREAKPOINTS } from '../tokens/breakpoints.js'

function getMatches(width) {
  return {
    sm:  width >= BREAKPOINTS.sm,
    md:  width >= BREAKPOINTS.md,
    lg:  width >= BREAKPOINTS.lg,
    xl:  width >= BREAKPOINTS.xl,
    xxl: width >= BREAKPOINTS.xxl,
    isMobile:  width < BREAKPOINTS.md,
    isTablet:  width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
    width,
  }
}

// Shared listener to avoid N matchMedia listeners per component
let listeners = new Set()
let cached = typeof window !== 'undefined' ? getMatches(window.innerWidth) : getMatches(1024)

if (typeof window !== 'undefined') {
  let rafId = null
  window.addEventListener('resize', () => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      rafId = null
      const next = getMatches(window.innerWidth)
      // Only notify if a breakpoint boundary actually changed
      if (
        next.sm !== cached.sm || next.md !== cached.md ||
        next.lg !== cached.lg || next.xl !== cached.xl ||
        next.xxl !== cached.xxl
      ) {
        cached = next
        listeners.forEach(fn => fn(next))
      } else {
        cached = next
      }
    })
  })
}

export function useBreakpoint() {
  const [bp, setBp] = useState(cached)

  useEffect(() => {
    // Sync in case window resized between render and effect
    const current = getMatches(window.innerWidth)
    if (
      current.sm !== bp.sm || current.md !== bp.md ||
      current.lg !== bp.lg || current.xl !== bp.xl
    ) {
      setBp(current)
    }

    listeners.add(setBp)
    return () => listeners.delete(setBp)
  }, [])

  return bp
}

/**
 * useResponsiveValue — pick a value based on current breakpoint.
 *
 * Usage:
 *   const cols = useResponsiveValue({ base: 1, sm: 2, lg: 3 })
 *   const gap = useResponsiveValue({ base: 8, md: 16, xl: 24 })
 */
export function useResponsiveValue(values) {
  const bp = useBreakpoint()
  return useMemo(() => {
    // Walk breakpoints from largest to smallest, pick first match
    if (bp.xxl && values.xxl !== undefined) return values.xxl
    if (bp.xl  && values.xl  !== undefined) return values.xl
    if (bp.lg  && values.lg  !== undefined) return values.lg
    if (bp.md  && values.md  !== undefined) return values.md
    if (bp.sm  && values.sm  !== undefined) return values.sm
    return values.base
  }, [bp.sm, bp.md, bp.lg, bp.xl, bp.xxl, values])
}

export default useBreakpoint
