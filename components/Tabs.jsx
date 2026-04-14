/**
 * @hakunahq/ui — Tabs
 *
 * Accessibility:
 *  - role="tablist" wrapper, role="tab" buttons, aria-selected
 *  - Roving tabindex: only the active tab is in the tab order
 *  - ← / → cycle focus; Home / End jump
 *
 * Responsive: scrolls horizontally on mobile instead of wrapping.
 *
 * Usage:
 *   <Tabs tabs={[
 *     { key: 'overview', label: 'Overview' },
 *     { key: 'details',  label: 'Details', count: 12 },
 *   ]} active="overview" onChange={setTab} />
 */
import React, { useRef } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

export function Tabs({ tabs = [], active, onChange, variant = 'underline', className, ariaLabel = 'Tabs' }) {
  const bp = useBreakpoint()
  const btnRefs = useRef([])

  const activeIdx = Math.max(0, tabs.findIndex(t => t.key === active))

  const onKeyDown = (e) => {
    if (tabs.length === 0) return
    let next = activeIdx
    switch (e.key) {
      case 'ArrowRight': next = (activeIdx + 1) % tabs.length; break
      case 'ArrowLeft':  next = (activeIdx - 1 + tabs.length) % tabs.length; break
      case 'Home':       next = 0; break
      case 'End':        next = tabs.length - 1; break
      default: return
    }
    e.preventDefault()
    onChange?.(tabs[next].key)
    // Defer so roving tabindex updates before focus moves.
    queueMicrotask(() => btnRefs.current[next]?.focus())
  }

  const scrollStyle = bp.isMobile ? {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
  } : {}

  const isPill = variant === 'pill'

  const wrapperStyle = isPill ? {
    display: 'inline-flex', gap: 4, padding: 3,
    background: 'var(--hk-bg-muted)', borderRadius: 'var(--hk-radius-sm)',
    ...scrollStyle,
  } : {
    display: 'flex', gap: 0, borderBottom: '1px solid var(--hk-border)',
    ...scrollStyle,
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={className}
      style={wrapperStyle}
      onKeyDown={onKeyDown}
    >
      {tabs.map((tab, i) => {
        const isActive = active === tab.key
        const tabStyle = isPill ? {
          padding: bp.md ? '6px 14px' : '6px 10px',
          borderRadius: 'var(--hk-radius-sm)',
          fontSize: 13, fontWeight: 600, border: 'none',
          fontFamily: 'var(--hk-font-sans)',
          cursor: 'pointer', transition: 'all 0.15s',
          background: isActive ? 'var(--hk-card)' : 'transparent',
          color: isActive ? 'var(--hk-text)' : 'var(--hk-text-muted)',
          boxShadow: isActive ? 'var(--hk-shadow-sm)' : 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
        } : {
          padding: bp.md ? '10px 20px' : '8px 12px',
          cursor: 'pointer',
          color: isActive ? 'var(--hk-primary)' : 'var(--hk-text-secondary)',
          fontSize: 13, fontWeight: 600, border: 'none',
          fontFamily: 'var(--hk-font-sans)',
          background: 'transparent',
          borderBottom: `2px solid ${isActive ? 'var(--hk-primary)' : 'transparent'}`,
          transition: 'all 0.15s',
          display: 'flex', alignItems: 'center', gap: 6,
          whiteSpace: 'nowrap', flexShrink: 0,
        }
        return (
          <button
            key={tab.key}
            ref={el => (btnRefs.current[i] = el)}
            role="tab"
            type="button"
            id={tab.id || `hk-tab-${tab.key}`}
            aria-selected={isActive}
            aria-controls={tab.panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange?.(tab.key)}
            style={tabStyle}
          >
            {tab.icon && <span style={{ display: 'flex' }}>{tab.icon}</span>}
            {tab.label}
            {tab.count != null && (
              <span style={{
                marginLeft: isPill ? 6 : 0,
                fontSize: isPill ? 11 : 10,
                fontWeight: isPill ? 400 : 700,
                padding: isPill ? 0 : '1px 6px',
                borderRadius: isPill ? 0 : 'var(--hk-radius-full)',
                background: isPill ? 'transparent' : (isActive ? 'var(--hk-primary-50)' : 'var(--hk-bg-muted)'),
                color: isPill
                  ? (isActive ? 'var(--hk-text-secondary)' : 'var(--hk-text-muted)')
                  : (isActive ? 'var(--hk-primary)' : 'var(--hk-text-muted)'),
              }}>
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
