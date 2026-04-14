/**
 * @hakunahq/ui — Dropdown Menu & Popover
 *
 * Keyboard: ↑/↓ move focus, Home/End jump, Enter/Space activates, Esc closes.
 * ARIA: the trigger gets aria-haspopup + aria-expanded; the menu is role="menu"
 * with role="menuitem" children.
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
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

export function Dropdown({ trigger, items = [], align = 'left', className, label = 'Menu' }) {
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const ref = useRef(null)
  const triggerRef = useRef(null)
  const itemRefs = useRef([])

  // Indices of interactive (non-divider, non-disabled) items.
  const interactiveIndices = items.reduce((acc, it, i) => {
    if (!it.divider && !it.disabled) acc.push(i)
    return acc
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // When opening, focus the first interactive item.
  useEffect(() => {
    if (open && interactiveIndices.length > 0) {
      const idx = interactiveIndices[0]
      setActiveIdx(idx)
      // Defer so the DOM node exists before we focus.
      queueMicrotask(() => itemRefs.current[idx]?.focus())
    } else if (!open) {
      setActiveIdx(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const moveFocus = useCallback((delta) => {
    if (interactiveIndices.length === 0) return
    const currentPos = interactiveIndices.indexOf(activeIdx)
    const nextPos = currentPos === -1
      ? (delta > 0 ? 0 : interactiveIndices.length - 1)
      : (currentPos + delta + interactiveIndices.length) % interactiveIndices.length
    const idx = interactiveIndices[nextPos]
    setActiveIdx(idx)
    itemRefs.current[idx]?.focus()
  }, [activeIdx, interactiveIndices])

  const onTriggerKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
    }
  }

  const onMenuKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':    e.preventDefault(); moveFocus(1); break
      case 'ArrowUp':      e.preventDefault(); moveFocus(-1); break
      case 'Home':         e.preventDefault(); setActiveIdx(interactiveIndices[0]); itemRefs.current[interactiveIndices[0]]?.focus(); break
      case 'End':          e.preventDefault(); setActiveIdx(interactiveIndices.at(-1)); itemRefs.current[interactiveIndices.at(-1)]?.focus(); break
      case 'Escape':
      case 'Tab':
        setOpen(false)
        triggerRef.current?.focus()
        break
    }
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} className={className}>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={onTriggerKeyDown}
        style={{ cursor: 'pointer' }}
      >
        {trigger}
      </div>
      {open && (
        <div
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          style={{
            position: 'absolute', top: '100%', marginTop: 4,
            [align === 'right' ? 'right' : 'left']: 0,
            minWidth: 180, zIndex: 99990,
            background: 'var(--hk-popover)',
            border: '1px solid var(--hk-border)',
            borderRadius: 'var(--hk-radius-sm)',
            boxShadow: 'var(--hk-shadow-lg)',
            padding: '4px 0',
            animation: 'hk-toast-in 0.1s ease-out',
          }}
        >
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} role="separator" style={{
                height: 1, background: 'var(--hk-border)', margin: '4px 0',
              }} />
            }
            return (
              <button
                key={i}
                ref={el => (itemRefs.current[i] = el)}
                role="menuitem"
                tabIndex={activeIdx === i ? 0 : -1}
                onClick={() => { item.onClick?.(); setOpen(false); triggerRef.current?.focus() }}
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
                onFocus={e => e.currentTarget.style.background = 'var(--hk-bg-muted)'}
                onBlur={e => e.currentTarget.style.background = 'transparent'}
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
    const keyHandler = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [open, anchorRef, align, onClose])

  if (!open) return null

  return createPortal(
    <div
      ref={popRef}
      role="dialog"
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
