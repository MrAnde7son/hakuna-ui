/**
 * @hakuna/ui — Avatar
 *
 * Renders user/company initials with a deterministic color.
 *
 * Usage:
 *   <Avatar name="Itamar Mizrahi" />
 *   <Avatar name="Fiserv" size={40} />
 *   <Avatar name="S" src="/avatars/user.png" />
 */
import React from 'react'

const AVATAR_COLORS = [
  { bg: 'var(--hk-primary-100)', text: 'var(--hk-primary-700)' },
  { bg: 'var(--hk-accent-100)',  text: 'var(--hk-accent-700)' },
  { bg: '#dbeafe',               text: '#1d4ed8' },
  { bg: '#d1fae5',               text: '#065f46' },
  { bg: '#fef3c7',               text: '#92400e' },
  { bg: '#ede9fe',               text: '#5b21b6' },
  { bg: '#fce7f3',               text: '#9d174d' },
  { bg: '#e0e7ff',               text: '#3730a3' },
]

function hashName(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = name.charCodeAt(i) + ((h << 5) - h)
  }
  return Math.abs(h)
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?'
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function Avatar({ name = '', src, size = 32, className, style, ...props }) {
  const initials = getInitials(name)
  const palette = AVATAR_COLORS[hashName(name) % AVATAR_COLORS.length]
  const fontSize = Math.max(10, Math.round(size * 0.38))

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={className}
        style={{
          width: size, height: size, borderRadius: 'var(--hk-radius-full)',
          objectFit: 'cover', flexShrink: 0, ...style,
        }}
        {...props}
      />
    )
  }

  return (
    <div
      className={className}
      title={name}
      style={{
        width: size, height: size, borderRadius: 'var(--hk-radius-full)',
        background: palette.bg, color: palette.text,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize, fontWeight: 700, fontFamily: 'var(--hk-font-sans)',
        flexShrink: 0, lineHeight: 1,
        ...style,
      }}
      {...props}
    >
      {initials}
    </div>
  )
}

export default Avatar
