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
  { bg: 'var(--hk-avatar-1-bg)', text: 'var(--hk-avatar-1-fg)' },
  { bg: 'var(--hk-avatar-2-bg)', text: 'var(--hk-avatar-2-fg)' },
  { bg: 'var(--hk-avatar-3-bg)', text: 'var(--hk-avatar-3-fg)' },
  { bg: 'var(--hk-avatar-4-bg)', text: 'var(--hk-avatar-4-fg)' },
  { bg: 'var(--hk-avatar-5-bg)', text: 'var(--hk-avatar-5-fg)' },
  { bg: 'var(--hk-avatar-6-bg)', text: 'var(--hk-avatar-6-fg)' },
  { bg: 'var(--hk-avatar-7-bg)', text: 'var(--hk-avatar-7-fg)' },
  { bg: 'var(--hk-avatar-8-bg)', text: 'var(--hk-avatar-8-fg)' },
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
