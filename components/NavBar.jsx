/**
 * @hakuna/ui — NavBar
 *
 * Vertical sidebar nav for desktop, slide-out drawer on mobile.
 * Supports collapsible mode, grouped sections, badges, user menu,
 * and footer slots.
 *
 * Usage:
 *   import { NavBar } from '@hakuna/ui'
 *
 *   <NavBar
 *     logo={<LogoWordmark size={24} />}
 *     logoCollapsed={<LogoSymbol size={18} />}
 *     items={[
 *       { key: 'dash', label: 'Dashboard', icon: IconBarChart, path: '/' },
 *       { type: 'group', label: 'Exposure' },
 *       { key: 'findings', label: 'Findings', icon: IconShieldAlert, path: '/findings', badge: 42 },
 *       { key: 'assets', label: 'Assets', icon: IconServer, path: '/assets' },
 *       { type: 'divider' },
 *       { key: 'settings', label: 'Settings', icon: IconSettings, path: '/settings' },
 *     ]}
 *     activeKey="findings"
 *     onNavigate={(item) => navigate(item.path)}
 *     collapsible
 *     footer={<UserMenu />}
 *   />
 */
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

// ── Defaults ──────────────────────────────────────────────────
const WIDTH_EXPANDED = 220
const WIDTH_COLLAPSED = 56
const WIDTH_MOBILE = 280
const TRANSITION = 'width 0.2s ease, transform 0.25s ease'

// ── NavItem ───────────────────────────────────────────────────
function NavItem({ item, active, collapsed, onNavigate }) {
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  return (
    <button
      onClick={() => onNavigate?.(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={collapsed ? item.label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: collapsed ? '8px 0' : '7px 10px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 'var(--hk-radius-sm)',
        border: 'none',
        width: '100%',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: active ? 600 : 500,
        fontFamily: 'var(--hk-font-sans)',
        color: active ? 'var(--hk-primary)' : hovered ? 'var(--hk-text)' : 'var(--hk-text-muted)',
        background: active
          ? 'var(--hk-primary-50)'
          : hovered ? 'var(--hk-bg-muted)' : 'transparent',
        boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
        transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
        position: 'relative',
        textAlign: 'left',
      }}
    >
      {/* Active indicator bar */}
      {active && !collapsed && (
        <span style={{
          position: 'absolute', left: -2, top: '50%', transform: 'translateY(-50%)',
          width: 3, height: 18, borderRadius: 2,
          background: 'var(--hk-primary)',
        }} />
      )}

      {Icon && (
        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 20, height: 20, flexShrink: 0,
        }}>
          {typeof Icon === 'function'
            ? <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
            : Icon
          }
        </span>
      )}

      {!collapsed && (
        <>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.label}
          </span>

          {item.badge != null && (
            <span style={{
              fontSize: 10, fontWeight: 700,
              padding: '1px 6px', borderRadius: 'var(--hk-radius-full)',
              background: active ? 'var(--hk-primary)' : 'var(--hk-bg-subtle)',
              color: active ? '#fff' : 'var(--hk-text-muted)',
              fontFamily: 'var(--hk-font-mono)',
              lineHeight: '16px',
            }}>
              {item.badge}
            </span>
          )}

          {item.locked && (
            <span style={{ fontSize: 11, opacity: 0.4 }}>🔒</span>
          )}
        </>
      )}
    </button>
  )
}

// ── Group header ──────────────────────────────────────────────
function GroupHeader({ label, collapsed }) {
  if (collapsed) {
    return (
      <div style={{
        width: '100%', height: 1, background: 'var(--hk-border)',
        margin: '8px 0',
      }} />
    )
  }
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--hk-text-muted)',
      textTransform: 'uppercase', letterSpacing: '0.08em',
      padding: '12px 10px 4px',
    }}>
      {label}
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      height: 1, background: 'var(--hk-border)',
      margin: '8px 0',
    }} />
  )
}

// ── Mobile overlay drawer ─────────────────────────────────────
function MobileDrawer({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 199,
        background: 'rgba(0,0,0,0.4)',
        animation: 'hk-toast-in 0.15s ease-out',
      }} />
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: WIDTH_MOBILE, zIndex: 200,
        background: 'var(--hk-bg)',
        borderRight: '1px solid var(--hk-border)',
        boxShadow: '8px 0 32px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        animation: 'hk-slide-in-left 0.25s ease',
      }}>
        {children}
      </div>
    </>,
    document.body
  )
}

// ── Hamburger button (for mobile) ─────────────────────────────
export function NavHamburger({ onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={className}
      aria-label="Open menu"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: 'var(--hk-radius-sm)',
        border: '1px solid var(--hk-border)', background: 'var(--hk-card)',
        cursor: 'pointer', transition: 'background 0.1s',
        color: 'var(--hk-text)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="3" y1="5" x2="15" y2="5" />
        <line x1="3" y1="9" x2="15" y2="9" />
        <line x1="3" y1="13" x2="15" y2="13" />
      </svg>
    </button>
  )
}

// ── MobileTopBar ──────────────────────────────────────────────
export function MobileTopBar({ logo, onMenuClick, actions, className }) {
  return (
    <div className={className} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 12px', height: 52,
      background: 'var(--hk-bg)',
      borderBottom: '1px solid var(--hk-border)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <NavHamburger onClick={onMenuClick} />
        {logo && <div style={{ display: 'flex', alignItems: 'center' }}>{logo}</div>}
      </div>
      {actions && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {actions}
        </div>
      )}
    </div>
  )
}

// ── Main NavBar ───────────────────────────────────────────────
export function NavBar({
  items = [],
  activeKey,
  onNavigate,
  logo,
  logoCollapsed,
  subtitle,
  collapsible = false,
  defaultCollapsed = false,
  footer,
  header,
  className,
  variant = 'default', // 'default' | 'dark'
}) {
  const bp = useBreakpoint()
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile drawer when switching to desktop
  useEffect(() => {
    if (bp.md) setMobileOpen(false)
  }, [bp.md])

  const isCollapsed = collapsible && collapsed && bp.md
  const width = isCollapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED

  // Dark variant styles
  const isDark = variant === 'dark'
  const bgStyle = isDark
    ? {
        background: 'linear-gradient(to bottom, var(--hk-primary-900), var(--hk-primary-950), var(--hk-neutral-950))',
        color: '#fff',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }
    : {
        background: 'var(--hk-bg)',
        borderRight: '1px solid var(--hk-border)',
      }

  // ── Build nav content ────────────────────────────────────
  function renderContent(inDrawer = false) {
    const isCol = isCollapsed && !inDrawer
    return (
      <>
        {/* Logo */}
        <div style={{
          padding: isCol ? '16px 8px 12px' : '16px 16px 12px',
          display: 'flex', alignItems: 'center',
          justifyContent: isCol ? 'center' : 'flex-start',
          gap: 8, flexShrink: 0,
          borderBottom: '1px solid ' + (isDark ? 'rgba(255,255,255,0.06)' : 'var(--hk-border)'),
          marginBottom: 8,
        }}>
          {isCol
            ? (logoCollapsed || logo)
            : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {logo}
                </div>
                {subtitle && (
                  <div style={{
                    fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.14em', marginTop: 2,
                    color: isDark ? 'rgba(255,255,255,0.45)' : 'var(--hk-text-muted)',
                  }}>
                    {subtitle}
                  </div>
                )}
              </div>
            )
          }
        </div>

        {/* Custom header slot */}
        {header && !isCol && (
          <div style={{ padding: '0 12px 8px', flexShrink: 0 }}>
            {header}
          </div>
        )}

        {/* Nav items */}
        <div style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          padding: isCol ? '0 8px' : '0 8px',
          display: 'flex', flexDirection: 'column', gap: 1,
        }}>
          {items.map((item, i) => {
            if (item.type === 'group') {
              return <GroupHeader key={item.label || i} label={item.label} collapsed={isCol} />
            }
            if (item.type === 'divider') {
              return <Divider key={`div-${i}`} />
            }
            return (
              <NavItem
                key={item.key}
                item={item}
                active={activeKey === item.key}
                collapsed={isCol}
                onNavigate={(it) => {
                  onNavigate?.(it)
                  if (inDrawer) setMobileOpen(false)
                }}
              />
            )
          })}
        </div>

        {/* Collapse toggle (desktop only) */}
        {collapsible && bp.md && !inDrawer && (
          <div style={{ padding: '4px 8px', flexShrink: 0 }}>
            <button
              onClick={() => setCollapsed(c => !c)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', padding: 6, borderRadius: 'var(--hk-radius-sm)',
                border: 'none', background: 'transparent', cursor: 'pointer',
                color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--hk-text-muted)',
                transition: 'background 0.1s',
                fontSize: 14,
              }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'var(--hk-bg-muted)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              title={isCol ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCol ? '»' : '«'}
            </button>
          </div>
        )}

        {/* Footer slot */}
        {footer && !isCol && (
          <div style={{
            padding: '8px 12px 12px',
            borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.06)' : 'var(--hk-border)'),
            flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </>
    )
  }

  // ── Mobile: render hamburger trigger + drawer ────────────
  if (bp.isMobile) {
    return (
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div style={{
          display: 'flex', flexDirection: 'column', height: '100%',
          ...bgStyle,
        }}>
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute', top: 12, right: 12, zIndex: 1,
              background: 'none', border: 'none', cursor: 'pointer',
              color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--hk-text-muted)',
              padding: 4, fontSize: 18, lineHeight: 1,
            }}
          >
            ✕
          </button>
          {renderContent(true)}
        </div>
      </MobileDrawer>
    )
  }

  // ── Desktop: fixed sidebar ──────────────────────────────
  return (
    <nav className={className} style={{
      position: 'fixed', top: 0, left: 0, bottom: 0,
      width, zIndex: 50,
      display: 'flex', flexDirection: 'column',
      transition: TRANSITION,
      overflow: 'hidden',
      ...bgStyle,
    }}>
      {renderContent(false)}
    </nav>
  )
}

// Expose the mobile helpers
NavBar.Hamburger = NavHamburger
NavBar.MobileTopBar = MobileTopBar

export default NavBar
