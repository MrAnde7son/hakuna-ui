/**
 * @hakuna/ui — Modal
 *
 * Responsive: goes full-screen on mobile (< 768px).
 *
 * Usage:
 *   <Modal open={isOpen} onClose={() => setOpen(false)} title="Edit Finding">
 *     <p>Content here</p>
 *   </Modal>
 */
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

const SIZES = {
  sm: 400,
  md: 520,
  lg: 680,
  xl: 840,
}

export function Modal({
  open, onClose, title, children,
  size = 'md', footer, className,
}) {
  const bp = useBreakpoint()

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

  const width = SIZES[size] || SIZES.md
  const fullScreen = bp.isMobile

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99998,
        background: fullScreen ? 'var(--hk-bg)' : 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: fullScreen ? 'stretch' : 'center',
        justifyContent: 'center',
        padding: fullScreen ? 0 : 24,
        animation: 'hk-toast-in 0.15s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={className}
        style={{
          background: 'var(--hk-card)',
          border: fullScreen ? 'none' : '1px solid var(--hk-border)',
          borderRadius: fullScreen ? 0 : 'var(--hk-radius-lg)',
          boxShadow: fullScreen ? 'none' : 'var(--hk-shadow-lg)',
          width: '100%',
          maxWidth: fullScreen ? '100%' : width,
          maxHeight: fullScreen ? '100%' : 'calc(100vh - 48px)',
          height: fullScreen ? '100%' : 'auto',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        {title && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: bp.md ? '16px 20px' : '12px 16px',
            borderBottom: '1px solid var(--hk-border)',
            flexShrink: 0,
          }}>
            <h2 style={{ fontSize: bp.md ? 16 : 15, fontWeight: 700, color: 'var(--hk-text)', margin: 0 }}>{title}</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--hk-text-muted)', fontSize: 20, lineHeight: 1,
                padding: '4px 8px', borderRadius: 'var(--hk-radius-sm)',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--hk-bg-muted)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              &times;
            </button>
          </div>
        )}

        {/* Body */}
        <div style={{ padding: bp.md ? 20 : 16, overflow: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            display: 'flex', justifyContent: 'flex-end', gap: 8,
            padding: bp.md ? '12px 20px' : '12px 16px',
            borderTop: '1px solid var(--hk-border)',
            flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default Modal
