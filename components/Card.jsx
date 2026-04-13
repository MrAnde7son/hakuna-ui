/**
 * @hakuna/ui — Card & StatCard
 */
import React from 'react'

export function Card({ children, style = {}, onClick, active, activeColor, className, ...props }) {
  const borderColor = active ? (activeColor || 'var(--hk-primary)') : 'var(--hk-border)'
  const bgTint = active && activeColor ? activeColor + '12' : undefined

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: bgTint || 'var(--hk-card)',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--hk-radius-md)',
        padding: 20,
        boxShadow: 'var(--hk-shadow-sm)',
        ...(onClick && { cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s' }),
        ...(active && { boxShadow: `var(--hk-shadow-sm), 0 0 0 1px ${activeColor || 'var(--hk-primary)'}30` }),
        ...style,
      }}
      onMouseEnter={onClick ? e => { e.currentTarget.style.boxShadow = 'var(--hk-shadow-md)' } : undefined}
      onMouseLeave={onClick ? e => {
        e.currentTarget.style.boxShadow = active
          ? `var(--hk-shadow-sm), 0 0 0 1px ${activeColor || 'var(--hk-primary)'}30`
          : 'var(--hk-shadow-sm)'
      } : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

export function StatCard({ label, value, sub, color, icon: Icon, onClick, active, className }) {
  return (
    <Card
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      onClick={onClick}
      active={active}
      activeColor={color}
      className={className}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          fontSize: 10, color: 'var(--hk-text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600,
        }}>
          {label}
        </div>
        {Icon && <Icon size={16} color={color || 'var(--hk-text-muted)'} />}
      </div>
      <div style={{
        fontSize: 32, fontWeight: 700,
        fontFamily: 'var(--hk-font-display)',
        color: color || 'var(--hk-text)',
      }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: 'var(--hk-text-muted)' }}>{sub}</div>}
    </Card>
  )
}

export default Card
