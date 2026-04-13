/**
 * @hakuna/ui — Button
 *
 * Works in both Tailwind and inline-style projects.
 * Uses CSS variables from @hakuna/ui/tokens/colors.css
 */
import React from 'react'

const SIZE = {
  sm: { fontSize: 12, padding: '5px 10px', gap: 4 },
  md: { fontSize: 13, padding: '8px 16px', gap: 6 },
  lg: { fontSize: 14, padding: '10px 20px', gap: 8 },
}

const VARIANT = {
  primary:   { background: 'var(--hk-primary)',  color: 'var(--hk-primary-fg)' },
  secondary: { background: 'var(--hk-surface)',   color: 'var(--hk-text-secondary)', border: '1px solid var(--hk-border)' },
  ghost:     { background: 'transparent',          color: 'var(--hk-text-secondary)', border: '1px solid var(--hk-border)' },
  danger:    { background: 'var(--hk-danger)',     color: '#fff' },
  success:   { background: 'var(--hk-success)',    color: '#fff' },
  warning:   { background: 'var(--hk-warning)',    color: '#fff' },
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  style = {},
  ...props
}) {
  const s = SIZE[size] || SIZE.md
  const v = VARIANT[variant] || VARIANT.primary

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, border: 'none', borderRadius: 'var(--hk-radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 600, fontFamily: 'var(--hk-font-sans)',
        transition: 'all 0.15s',
        fontSize: s.fontSize, padding: s.padding,
        opacity: disabled ? 0.5 : 1,
        ...v, ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
