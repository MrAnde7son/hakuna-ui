/**
 * @hakuna/ui — Breakpoint Tokens
 *
 * Shared breakpoints for all Hakuna projects.
 * Aligns main hakuna (768px JS detection) with Tailwind defaults
 * used by fundraiser & outbound.
 *
 * Usage:
 *   import { BREAKPOINTS, mq } from '@hakuna/ui/tokens/breakpoints'
 *   const style = { [mq.md]: { flexDirection: 'row' } }  // CSS-in-JS (not inline)
 *   // For inline styles, use the useBreakpoint() hook instead.
 */

export const BREAKPOINTS = {
  sm:  480,   // Large phone → small tablet
  md:  768,   // Tablet → matches main hakuna's MOBILE_BREAKPOINT
  lg:  1024,  // Desktop
  xl:  1280,  // Wide desktop
  xxl: 1536,  // Ultra-wide
}

/** CSS media query strings for CSS-in-JS libraries (styled-components, emotion, etc.) */
export const mq = {
  sm:  `@media (min-width: ${BREAKPOINTS.sm}px)`,
  md:  `@media (min-width: ${BREAKPOINTS.md}px)`,
  lg:  `@media (min-width: ${BREAKPOINTS.lg}px)`,
  xl:  `@media (min-width: ${BREAKPOINTS.xl}px)`,
  xxl: `@media (min-width: ${BREAKPOINTS.xxl}px)`,
}

/** Max-width queries for "mobile-first with exceptions" patterns */
export const mqMax = {
  sm:  `@media (max-width: ${BREAKPOINTS.sm - 1}px)`,
  md:  `@media (max-width: ${BREAKPOINTS.md - 1}px)`,
  lg:  `@media (max-width: ${BREAKPOINTS.lg - 1}px)`,
  xl:  `@media (max-width: ${BREAKPOINTS.xl - 1}px)`,
}

export default BREAKPOINTS
