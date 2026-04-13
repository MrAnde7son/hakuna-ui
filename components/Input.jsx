/**
 * @hakuna/ui — Input & Select
 */
import React from 'react'

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

export function Input({ value, onChange, placeholder, className, style = {}, ...props }) {
  return (
    <input
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={className}
      style={{ ...INPUT_BASE, ...style }}
      onFocus={e => {
        e.currentTarget.style.borderColor = 'var(--hk-primary)'
        e.currentTarget.style.boxShadow = '0 0 0 3px var(--hk-ring)'
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'var(--hk-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      {...props}
    />
  )
}

export function Select({ value, onChange, options = [], placeholder, className, style = {} }) {
  return (
    <select
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className={className}
      style={{ ...INPUT_BASE, cursor: 'pointer', ...style }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => {
        const val = typeof o === 'string' ? o : o.value
        const label = typeof o === 'string' ? o : o.label
        return <option key={val} value={val}>{label}</option>
      })}
    </select>
  )
}

export default Input
