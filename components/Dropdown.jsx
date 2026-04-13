/**
 * @hakuna/ui — Dropdown Menu & Popover
 *
 * Usage:
 *   <Dropdown
 *     trigger={<Button>Actions</Button>}
 *     items={[
 *       { label: 'Edit', onClick: handleEdit },
 *       { label: 'Delete', onClick: handleDelete, danger: true },
 *       { divider: true },
 *       { label: 'Export CSV', onClick: handleExport },
 *     ]}
 *   />
 *
 *   <Popover open={isOpen} onClose={() => setOpen(false)} anchorRef={buttonRef}>
 *     <p>Custom popover content</p>
 *   </Popover>
 */
import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Dropdown({ trigger, items = [], align = 'left', className }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} className={className}>
      <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', marginTop: 4,
          [align === 'right' ? 'right' : 'left']: 0,
          minWidth: 180, zIndex: 99990,
          background: 'var(--hk-popover)',
          border: '1px solid var(--hk-border)',
          borderRadius: 'var(--hk-radius-sm)',
          boxShadow: 'var(--hk-shadow-lg)',
          padding: '4px 0',
          animation: 'hk-toast-in 0.1s ease-out',
        }}>
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} style={{
                height: 1, background: 'var(--hk-border)', margin: '4px 0',
              }} />
            }
            return (
              <button
                key={i}
                onClick={() => { item.onClick?.(); setOpen(false) }}
                disabled={item.disabled}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  width: '100%', padding: '7px 12px',
                  border: 'none', background: 'transparent',
                  color: item.danger ? 'var(--hk-danger)' : 'var(--hk-text)',
                  fontSize: 13, fontFamily: 'var(--hk-font-sans)',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.5 : 1,
                  textAlign: 'left', transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--hk-bg-muted)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {item.icon && <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && (
                  <span style={{
                    fontSize: 11, color: 'var(--hk-text-muted)',
                    fontFamily: 'var(--hk-font-mono)',
                  }}>
                    {item.shortcut}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function Popover({ open, onClose, anchorRef, children, align = 'left', className }) {
  const popRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!open || !anchorRef?.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    setPos({
      top: rect.bottom + 6,
      left: align === 'right' ? rect.right : rect.left,
    })
    const handler = (e) => {
      if (popRef.current && !popRef.current.contains(e.target) &&
          anchorRef.current && !anchorRef.current.contains(e.target)) {
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, anchorRef, align, onClose])

  if (!open) return null

  return createPortal(
    <div
      ref={popRef}
      className={className}
      style={{
        position: 'fixed', top: pos.top,
        ...(align === 'right' ? { right: window.innerWidth - pos.left } : { left: pos.left }),
        zIndex: 99990,
        background: 'var(--hk-popover)',
        border: '1px solid var(--hk-border)',
        borderRadius: 'var(--hk-radius-sm)',
        boxShadow: 'var(--hk-shadow-lg)',
        padding: 12,
        animation: 'hk-toast-in 0.1s ease-out',
      }}
    >
      {children}
    </div>,
    document.body
  )
}
