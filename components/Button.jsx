/**
 * @hakunahq/ui — Button
 *
 * Works in both Tailwind and inline-style projects.
 * Uses CSS variables from @hakunahq/ui/tokens/colors.css
 *
 * Forwards refs to the underlying <button>.
 */
import React, { forwardRef } from 'react'

const SIZE = {
  sm: { fontSize: 12, padding: '5px 10px', gap: 4 },
  md: { fontSize: 13, padding: '8px 16px', gap: 6 },
  lg: { fontSize: 14, padding: '10px 20px', gap: 8 },
}

const VARIANT = {
  primary:   { background: 'var(--hk-primary)',  color: 'var(--hk-primary-fg)' },
  secondary: { background: 'var(--hk-surface)',   color: 'var(--hk-text-secondary)', border: '1px solid var(--hk-border)' },
  ghost:     { background: 'transparent',          color: 'var(--hk-text-secondary)', border: '1px solid var(--hk-border)' },
  danger:    { background: 'var(--hk-danger)',     color: 'var(--hk-on-bright)' },
  success:   { background: 'var(--hk-success)',    color: 'var(--hk-on-bright)' },
  warning:   { background: 'var(--hk-warning)',    color: 'var(--hk-on-bright)' },
}

export const Button = forwardRef(function Button(
  {
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className,
    style = {},
    ...props
  },
  ref
) {
  const s = SIZE[size] || SIZE.md
  const v = VARIANT[variant] || VARIANT.primary
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, border: 'none', borderRadius: 'var(--hk-radius-sm)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        fontWeight: 600, fontFamily: 'var(--hk-font-sans)',
        transition: 'all 0.15s',
        fontSize: s.fontSize, padding: s.padding,
        opacity: isDisabled ? 0.5 : 1,
        ...v, ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
