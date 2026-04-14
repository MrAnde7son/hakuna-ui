/**
 * @hakunahq/ui — Input & Select
 *
 * Accessibility:
 *  - Pass `label` to auto-render a <label> linked by `htmlFor`.
 *  - Pass `hint` for help text; it is linked via aria-describedby.
 *  - Pass `error` for a validation message; aria-invalid is set automatically.
 *  - Both components forward refs to the underlying input/select element.
 */
import React, { forwardRef, useId } from 'react'

const INPUT_BASE = {
  background: 'var(--hk-card)',
  border: '1px solid var(--hk-border)',
  color: 'var(--hk-text)',
  borderRadius: 'var(--hk-radius-sm)',
  padding: '7px 12px',
  fontSize: 13,
  fontFamily: 'var(--hk-font-sans)',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  width: '100%',
}

const LABEL_STYLE = {
  display: 'block',
  fontSize: 12, fontWeight: 600,
  color: 'var(--hk-text-secondary)',
  marginBottom: 4,
  fontFamily: 'var(--hk-font-sans)',
}
const HINT_STYLE = {
  fontSize: 11, color: 'var(--hk-text-muted)',
  marginTop: 4, fontFamily: 'var(--hk-font-sans)',
}
const ERROR_STYLE = {
  fontSize: 11, color: 'var(--hk-danger)',
  marginTop: 4, fontFamily: 'var(--hk-font-sans)',
}

function useFieldIds(providedId) {
  const auto = useId()
  const base = providedId || auto
  return { id: base, hintId: `${base}-hint`, errorId: `${base}-error` }
}

export const Input = forwardRef(function Input(
  { value, onChange, placeholder, label, hint, error, id, className, style = {}, ...props },
  ref
) {
  const { id: fieldId, hintId, errorId } = useFieldIds(id)
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      {label && <label htmlFor={fieldId} style={LABEL_STYLE}>{label}</label>}
      <input
        ref={ref}
        id={fieldId}
        value={value}
        onChange={e => onChange?.(e.target.value, e)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        style={{ ...INPUT_BASE, ...(error && { borderColor: 'var(--hk-danger)' }), ...style }}
        onFocus={e => {
          e.currentTarget.style.borderColor = error ? 'var(--hk-danger)' : 'var(--hk-primary)'
          e.currentTarget.style.boxShadow = '0 0 0 3px var(--hk-ring)'
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = error ? 'var(--hk-danger)' : 'var(--hk-border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
        {...props}
      />
      {hint && !error && <div id={hintId} style={HINT_STYLE}>{hint}</div>}
      {error && <div id={errorId} role="alert" style={ERROR_STYLE}>{error}</div>}
    </div>
  )
})

export const Select = forwardRef(function Select(
  { value, onChange, options = [], placeholder, label, hint, error, id, className, style = {}, ...props },
  ref
) {
  const { id: fieldId, hintId, errorId } = useFieldIds(id)
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      {label && <label htmlFor={fieldId} style={LABEL_STYLE}>{label}</label>}
      <select
        ref={ref}
        id={fieldId}
        value={value}
        onChange={e => onChange?.(e.target.value, e)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        style={{ ...INPUT_BASE, cursor: 'pointer', ...(error && { borderColor: 'var(--hk-danger)' }), ...style }}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => {
          const val = typeof o === 'string' ? o : o.value
          const lbl = typeof o === 'string' ? o : o.label
          return <option key={val} value={val}>{lbl}</option>
        })}
      </select>
      {hint && !error && <div id={hintId} style={HINT_STYLE}>{hint}</div>}
      {error && <div id={errorId} role="alert" style={ERROR_STYLE}>{error}</div>}
    </div>
  )
})

export default Input
