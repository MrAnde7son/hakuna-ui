/**
 * @hakunahq/ui — Checkbox
 *
 * Accessible tri-state checkbox with tokenized styling. Keeps the
 * native <input type="checkbox"> as the source of truth so it works
 * inside <form>, with react-hook-form, and with the browser's own
 * a11y tree (VoiceOver announces "checked/not checked/mixed").
 *
 * Props:
 *   checked        — boolean
 *   indeterminate  — boolean; renders the "mixed" state
 *   onChange       — (checked, event) => void
 *   disabled       — boolean
 *   label          — optional text rendered next to the box
 *   size           — 'sm' | 'md' (default 'md')
 *   ariaLabel      — for checkboxes without a visible label
 *
 * Forwards a ref to the underlying <input>.
 */
import React, { forwardRef, useEffect, useRef } from 'react'

const SIZES = {
  sm: { box: 14, check: 10, radius: 3, borderWidth: 1.5 },
  md: { box: 16, check: 12, radius: 4, borderWidth: 1.5 },
}

export const Checkbox = forwardRef(function Checkbox(
  {
    checked = false,
    indeterminate = false,
    onChange,
    disabled = false,
    label,
    size = 'md',
    ariaLabel,
    id,
    className,
    style = {},
    ...props
  },
  ref
) {
  const localRef = useRef(null)
  const s = SIZES[size] || SIZES.md

  // Forward ref merge
  const setRef = (el) => {
    localRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }

  useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = !!indeterminate
  }, [indeterminate])

  const isActive = checked || indeterminate

  return (
    <label
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: label ? 8 : 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
        ...style,
      }}
    >
      {/* Visually-hidden real input — carries a11y + form semantics */}
      <input
        ref={setRef}
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked, e)}
        aria-label={!label ? ariaLabel : undefined}
        aria-checked={indeterminate ? 'mixed' : checked}
        style={{
          position: 'absolute',
          width: 1, height: 1, padding: 0, margin: -1,
          overflow: 'hidden', clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap', border: 0,
        }}
        {...props}
      />
      {/* Painted box */}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: s.box,
          height: s.box,
          flexShrink: 0,
          borderRadius: s.radius,
          border: `${s.borderWidth}px solid ${isActive ? 'var(--hk-primary)' : 'var(--hk-border-strong)'}`,
          background: isActive ? 'var(--hk-primary)' : 'var(--hk-card)',
          transition: 'background 0.12s, border-color 0.12s, box-shadow 0.12s',
          boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {indeterminate ? (
          <span
            style={{
              width: s.check - 2,
              height: 2,
              background: 'var(--hk-primary-fg, #fff)',
              borderRadius: 1,
            }}
          />
        ) : checked ? (
          <svg
            viewBox="0 0 12 12"
            width={s.check}
            height={s.check}
            fill="none"
            stroke="var(--hk-primary-fg, #fff)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2.5,6.5 5,9 9.5,3.5" />
          </svg>
        ) : null}
      </span>
      {label && (
        <span
          style={{
            fontSize: 13,
            color: 'var(--hk-text)',
            fontFamily: 'var(--hk-font-sans)',
          }}
        >
          {label}
        </span>
      )}
    </label>
  )
})

export default Checkbox
