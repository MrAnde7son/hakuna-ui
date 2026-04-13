/**
 * @hakuna/ui — Layout primitives
 *
 * Responsive: PageHeader stacks vertically on mobile,
 * FilterBar scrolls horizontally, Grid auto-adapts columns.
 */
import React from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

export function PageHeader({ title, subtitle, action, className }) {
  const bp = useBreakpoint()
  return (
    <div className={className} style={{
      display: 'flex',
      flexDirection: bp.md ? 'row' : 'column',
      justifyContent: 'space-between',
      alignItems: bp.md ? 'flex-start' : 'stretch',
      gap: bp.md ? 16 : 12,
      marginBottom: bp.md ? 24 : 16,
    }}>
      <div>
        <h1 style={{ fontSize: bp.md ? 22 : 18, fontWeight: 700, color: 'var(--hk-text)' }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 13, color: 'var(--hk-text-muted)', marginTop: 4 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, sub, children, className }) {
  const bp = useBreakpoint()
  return (
    <div className={className} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: bp.md ? '64px 24px' : '40px 16px', gap: 12,
    }}>
      {Icon && <Icon size={bp.md ? 40 : 32} color="var(--hk-text-muted)" />}
      <div style={{ fontSize: bp.md ? 16 : 14, fontWeight: 600, color: 'var(--hk-text-secondary)' }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: 'var(--hk-text-muted)', textAlign: 'center', maxWidth: 320 }}>{sub}</div>}
      {children}
    </div>
  )
}

export function Spinner({ size = 32, className }) {
  return (
    <div className={className} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 48 }}>
      <div style={{
        width: size, height: size,
        border: '3px solid var(--hk-border)',
        borderTop: '3px solid var(--hk-primary)',
        borderRadius: '50%',
        animation: 'hk-spin 0.8s linear infinite',
      }} />
    </div>
  )
}

export function InlineSpinner({ size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: '1.2em' }}>
      <div style={{
        width: size, height: size,
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid #fff',
        borderRadius: '50%',
        animation: 'hk-spin 0.8s linear infinite', flexShrink: 0,
      }} />
    </span>
  )
}

export function FilterBar({ children, className }) {
  const bp = useBreakpoint()
  return (
    <div className={className} style={{
      display: 'flex',
      flexWrap: bp.md ? 'wrap' : 'nowrap',
      gap: 8,
      alignItems: 'center',
      marginBottom: 16,
      ...(bp.isMobile && {
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        paddingBottom: 4,
      }),
    }}>
      {children}
    </div>
  )
}

/**
 * ResponsiveGrid — auto-fill grid that adapts to screen size.
 *
 * Usage:
 *   <ResponsiveGrid min={280} gap={16}>
 *     <StatCard ... />
 *     <StatCard ... />
 *   </ResponsiveGrid>
 */
export function ResponsiveGrid({ children, min = 280, gap = 16, className, style = {} }) {
  return (
    <div className={className} style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(min(${min}px, 100%), 1fr))`,
      gap,
      ...style,
    }}>
      {children}
    </div>
  )
}

/**
 * Stack — vertical on mobile, horizontal on md+.
 *
 * Usage:
 *   <Stack gap={16}>
 *     <Card ... />
 *     <Card ... />
 *   </Stack>
 */
export function Stack({
  children, gap = 16, align = 'stretch',
  reverse = false, className, style = {},
}) {
  const bp = useBreakpoint()
  const horizontal = bp.md
  return (
    <div className={className} style={{
      display: 'flex',
      flexDirection: horizontal
        ? (reverse ? 'row-reverse' : 'row')
        : (reverse ? 'column-reverse' : 'column'),
      gap,
      alignItems: horizontal ? align : 'stretch',
      ...style,
    }}>
      {children}
    </div>
  )
}
