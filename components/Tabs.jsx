/**
 * @hakuna/ui — Tabs
 *
 * Responsive: scrolls horizontally on mobile instead of wrapping.
 *
 * Usage:
 *   <Tabs tabs={[
 *     { key: 'overview', label: 'Overview' },
 *     { key: 'details',  label: 'Details', count: 12 },
 *   ]} active="overview" onChange={setTab} />
 */
import React from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

export function Tabs({ tabs = [], active, onChange, variant = 'underline', className }) {
  const bp = useBreakpoint()

  const scrollStyle = bp.isMobile ? {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
  } : {}

  if (variant === 'pill') {
    return (
      <div className={className} style={{
        display: 'inline-flex', gap: 4, padding: 3,
        background: 'var(--hk-bg-muted)', borderRadius: 'var(--hk-radius-sm)',
        ...scrollStyle,
      }}>
        {tabs.map(tab => {
          const isActive = active === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => onChange?.(tab.key)}
              style={{
                padding: bp.md ? '6px 14px' : '6px 10px',
                borderRadius: 'var(--hk-radius-sm)',
                fontSize: 13, fontWeight: 600, border: 'none',
                fontFamily: 'var(--hk-font-sans)',
                cursor: 'pointer', transition: 'all 0.15s',
                background: isActive ? 'var(--hk-card)' : 'transparent',
                color: isActive ? 'var(--hk-text)' : 'var(--hk-text-muted)',
                boxShadow: isActive ? 'var(--hk-shadow-sm)' : 'none',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              {tab.label}
              {tab.count != null && (
                <span style={{
                  marginLeft: 6, fontSize: 11,
                  color: isActive ? 'var(--hk-text-secondary)' : 'var(--hk-text-muted)',
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

  // Default: underline variant
  return (
    <div className={className} style={{
      display: 'flex', gap: 0, borderBottom: '1px solid var(--hk-border)',
      ...scrollStyle,
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onChange?.(tab.key)}
            style={{
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
            }}
          >
            {tab.icon && <span style={{ display: 'flex' }}>{tab.icon}</span>}
            {tab.label}
            {tab.count != null && (
              <span style={{
                fontSize: 10, fontWeight: 700,
                padding: '1px 6px', borderRadius: 'var(--hk-radius-full)',
                background: isActive ? 'var(--hk-primary-50)' : 'var(--hk-bg-muted)',
                color: isActive ? 'var(--hk-primary)' : 'var(--hk-text-muted)',
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
