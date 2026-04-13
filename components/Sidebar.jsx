/**
 * @hakuna/ui — Sidebar / Detail Panel
 *
 * Right-anchored slide-out drawer, matching the pattern used in
 * hakuna's blast radius / asset detail panels.
 *
 * Responsive: full-screen on mobile (< 768px), fixed 520px on desktop.
 *
 * Usage:
 *   <Sidebar open={showDetail} onClose={() => setShowDetail(false)} title="Asset Detail">
 *     <Sidebar.Section label="Overview">
 *       <Sidebar.Row label="IP Address" value="10.0.1.42" />
 *       <Sidebar.Row label="OS" value="Ubuntu 22.04" />
 *     </Sidebar.Section>
 *     <Sidebar.Section label="Vulnerabilities">
 *       <SeverityBadge severity="critical" /> ...
 *     </Sidebar.Section>
 *   </Sidebar>
 */
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

// ── Sub-components ────────────────────────────────────────────

function Section({ label, children }) {
  return (
    <div style={{ marginTop: 16 }}>
      {label && (
        <div style={{
          fontSize: 11, fontWeight: 700, color: 'var(--hk-text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8,
        }}>
          {label}
        </div>
      )}
      <div style={{ display: 'grid', gap: 6 }}>
        {children}
      </div>
    </div>
  )
}

function Row({ label, value, mono = false }) {
  if (value == null || value === '') return null
  return (
    <div style={{ display: 'flex', fontSize: 13, gap: 8 }}>
      <span style={{
        color: 'var(--hk-text-muted)', minWidth: 140, flexShrink: 0,
      }}>
        {label}
      </span>
      <span style={{
        color: 'var(--hk-text)', wordBreak: 'break-all',
        fontFamily: mono ? 'var(--hk-font-mono)' : 'inherit',
      }}>
        {value}
      </span>
    </div>
  )
}

function Tags({ children }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {children}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────

export function Sidebar({
  open, onClose, title, subtitle, badges,
  children, width = 520, footer, className,
}) {
  const bp = useBreakpoint()
  const fullScreen = bp.isMobile

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 99998,
          background: 'rgba(0,0,0,0.35)',
          animation: 'hk-toast-in 0.1s ease-out',
        }}
      />

      {/* Panel */}
      <div
        className={className}
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: fullScreen ? '100%' : width,
          zIndex: 99999,
          background: 'var(--hk-card)',
          borderLeft: fullScreen ? 'none' : '1px solid var(--hk-border)',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.25)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'hk-slide-in-right 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div style={{
          padding: fullScreen ? '16px 16px 12px' : '20px 24px 16px',
          borderBottom: '1px solid var(--hk-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && (
              <div style={{
                fontSize: 16, fontWeight: 700, color: 'var(--hk-text)',
                marginBottom: badges || subtitle ? 6 : 0,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {title}
              </div>
            )}
            {subtitle && (
              <div style={{ fontSize: 12, color: 'var(--hk-text-muted)', marginBottom: badges ? 6 : 0 }}>
                {subtitle}
              </div>
            )}
            {badges && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                {badges}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--hk-text-muted)', padding: 4,
              fontSize: 18, lineHeight: 1,
              borderRadius: 'var(--hk-radius-sm)',
              transition: 'background 0.1s',
              flexShrink: 0, marginLeft: 8,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--hk-bg-muted)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{
          padding: fullScreen ? '8px 16px 24px' : '8px 24px 24px',
          overflowY: 'auto', flex: 1,
        }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '12px 24px',
            borderTop: '1px solid var(--hk-border)',
            display: 'flex', justifyContent: 'flex-end', gap: 8,
            flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  )
}

// Attach sub-components
Sidebar.Section = Section
Sidebar.Row = Row
Sidebar.Tags = Tags

export default Sidebar
