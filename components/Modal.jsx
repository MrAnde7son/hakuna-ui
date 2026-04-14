/**
 * @hakunahq/ui — Modal
 *
 * Accessible dialog with:
 *  - role="dialog", aria-modal="true"
 *  - aria-labelledby (when `title` is provided)
 *  - ESC key to close, focus trap on Tab/Shift+Tab
 *  - Focus returns to the previously-focused element on close
 *
 * Responsive: goes full-screen on mobile (< 768px).
 *
 * Usage:
 *   <Modal open={isOpen} onClose={() => setOpen(false)} title="Edit Finding">
 *     <p>Content here</p>
 *   </Modal>
 */
import React, { useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

const SIZES = {
  sm: 400,
  md: 520,
  lg: 680,
  xl: 840,
}

const FOCUSABLE = [
  'a[href]', 'area[href]',
  'input:not([disabled])', 'select:not([disabled])',
  'textarea:not([disabled])', 'button:not([disabled])',
  'iframe', 'object', 'embed',
  '[tabindex]:not([tabindex="-1"])', '[contenteditable="true"]',
].join(',')

export function Modal({
  open, onClose, title, children,
  size = 'md', footer, className,
  ariaLabel,
}) {
  const bp = useBreakpoint()
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement

    // Focus the first focusable element inside the dialog (or the dialog itself).
    const node = dialogRef.current
    if (node) {
      const first = node.querySelector(FOCUSABLE)
      ;(first || node).focus()
    }

    const handler = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose?.()
        return
      }
      if (e.key === 'Tab' && node) {
        const items = node.querySelectorAll(FOCUSABLE)
        if (items.length === 0) {
          e.preventDefault()
          node.focus()
          return
        }
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
      // Restore focus to the element that opened the modal.
      const el = previouslyFocused.current
      if (el && typeof el.focus === 'function') el.focus()
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
        background: fullScreen ? 'var(--hk-bg)' : 'var(--hk-overlay)',
        display: 'flex', alignItems: fullScreen ? 'stretch' : 'center',
        justifyContent: 'center',
        padding: fullScreen ? 0 : 24,
        animation: 'hk-toast-in 0.15s ease-out',
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
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
          outline: 'none',
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
            <h2 id={titleId} style={{ fontSize: bp.md ? 16 : 15, fontWeight: 700, color: 'var(--hk-text)', margin: 0 }}>{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--hk-text-muted)', fontSize: 20, lineHeight: 1,
                padding: '4px 8px', borderRadius: 'var(--hk-radius-sm)',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--hk-bg-muted)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <span aria-hidden="true">&times;</span>
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
