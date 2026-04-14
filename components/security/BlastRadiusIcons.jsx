/**
 * @hakuna/ui — Blast Radius Node Icons
 *
 * Circular icon badges representing the node types used in
 * hakuna's blast radius / attack path visualization.
 *
 * Usage:
 *   import { BlastNode, BLAST_NODE_TYPES, BLAST_EDGE_TYPES } from '@hakuna/ui'
 *
 *   <BlastNode type="server" size={44} />
 *   <BlastNode type="domain_controller" size={44} />
 *   <BlastNode type="vulnerability" severity="critical" />
 */
import React from 'react'

// ── Node type registry ────────────────────────────────────────

export const BLAST_NODE_TYPES = {
  server:            { label: 'Server',            color: '#475569', icon: 'server' },
  domain_controller: { label: 'Domain Controller', color: '#ea580c', icon: 'server' },
  cloud:             { label: 'Cloud Instance',    color: '#4f46e5', icon: 'cloud' },
  database:          { label: 'Database',          color: '#0891b2', icon: 'database' },
  workstation:       { label: 'Workstation',       color: '#6b7280', icon: 'monitor' },
  user:              { label: 'Domain User',       color: '#2563eb', icon: 'user' },
  service_account:   { label: 'Service Account',   color: '#7c3aed', icon: 'user_cog' },
  computer_account:  { label: 'Computer Account',  color: '#0d9488', icon: 'monitor' },
  group:             { label: 'Group',             color: '#059669', icon: 'users' },
  vulnerability:     { label: 'Vulnerability',     color: '#ef4444', icon: 'shield_alert' },
  internet:          { label: 'Internet',          color: '#7c3aed', icon: 'globe' },
  start:             { label: 'Start Node',        color: '#16a34a', icon: 'crosshair' },
}

// ── Edge type registry ────────────────────────────────────────

export const BLAST_EDGE_TYPES = {
  domain_admin:           { label: 'Domain Admin',           color: '#ef4444', dashed: false },
  local_admin:            { label: 'Local Admin',            color: '#f59e0b', dashed: false },
  credential_exposure:    { label: 'Credential Exposure',    color: '#a855f7', dashed: false },
  rdp_access:             { label: 'RDP Access',             color: '#0ea5e9', dashed: false },
  ssh_access:             { label: 'SSH Access',             color: '#10b981', dashed: false },
  sudo_access:            { label: 'Sudo Access',            color: '#dc2626', dashed: false },
  network_connection:     { label: 'Network Connection',     color: '#3b82f6', dashed: false },
  domain_trust:           { label: 'Domain Trust',           color: '#f97316', dashed: false },
  group_membership:       { label: 'Group Membership',       color: '#6366f1', dashed: true },
  service_principal:      { label: 'Service Principal',      color: '#8b5cf6', dashed: true },
  vulnerability:          { label: 'Vulnerability',          color: '#ef4444', dashed: true },
  internet_vulnerability: { label: 'Internet Vulnerability', color: '#dc2626', dashed: true },
  kerberoast:             { label: 'Kerberoast',             color: '#d946ef', dashed: false },
  dcom_access:            { label: 'DCOM Access',            color: '#0d9488', dashed: false },
  wmi_access:             { label: 'WMI Access',             color: '#0284c7', dashed: false },
  smb_share:              { label: 'SMB Share',              color: '#ca8a04', dashed: true },
  database_link:          { label: 'Database Link',          color: '#0891b2', dashed: true },
  weak_credential:        { label: 'Weak Credential',        color: '#e11d48', dashed: false },
}

// ── Mini SVG icon paths (20x20 viewBox) ───────────────────────

const ICON_PATHS = {
  server: (
    <>
      <rect x="4" y="3" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="4" y="12" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="7" cy="5.5" r="0.8" fill="currentColor"/>
      <circle cx="7" cy="14.5" r="0.8" fill="currentColor"/>
      <line x1="10" y1="8" x2="10" y2="12" stroke="currentColor" strokeWidth="1.5"/>
    </>
  ),
  cloud: (
    <path d="M6 15h8a4 4 0 1 0-1-7.9A5 5 0 0 0 4 9a3 3 0 0 0 2 6z"
      stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
  ),
  database: (
    <>
      <ellipse cx="10" cy="5" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M4 5v10c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M4 10c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="7" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="13" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5"/>
    </>
  ),
  user: (
    <>
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M4 17c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </>
  ),
  user_cog: (
    <>
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M3 17c0-3 2.5-5 6-5s4.5 1.2 5.2 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="16" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M16 11v1m0 4v1m-2.6-1.5l.87-.5m3.46-2l.87-.5m-5.2 0l.87.5m3.46 2l.87.5" stroke="currentColor" strokeWidth="1"/>
    </>
  ),
  users: (
    <>
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="14" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M2 17c0-2.5 2.2-4 6-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M12 13c3.8 0 6 1.5 6 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </>
  ),
  shield_alert: (
    <>
      <path d="M10 2L3 6v4c0 4.5 3 8.5 7 9.5 4-1 7-5 7-9.5V6L10 2z"
        stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <line x1="10" y1="7" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="13.5" r="0.8" fill="currentColor"/>
    </>
  ),
  globe: (
    <>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <ellipse cx="10" cy="10" rx="3" ry="7" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.2"/>
    </>
  ),
  crosshair: (
    <>
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="10" y1="2" x2="10" y2="5" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="10" y1="15" x2="10" y2="18" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="2" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="15" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5"/>
    </>
  ),
}

// ── Severity glow colors ──────────────────────────────────────

const SEV_GLOW = {
  critical: 'rgba(239, 68, 68, 0.4)',
  high:     'rgba(245, 158, 11, 0.35)',
  medium:   'rgba(234, 169, 58, 0.3)',
  low:      'rgba(16, 185, 129, 0.3)',
}

// ── BlastNode component ───────────────────────────────────────

export function BlastNode({ type = 'server', size = 44, severity, label: customLabel, className }) {
  const config = BLAST_NODE_TYPES[type] || BLAST_NODE_TYPES.server
  const iconKey = config.icon
  const icon = ICON_PATHS[iconKey]
  const glowColor = severity ? SEV_GLOW[severity] : null

  return (
    <div className={className} style={{
      display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    }}>
      <div style={{
        width: size, height: size,
        borderRadius: '50%', background: config.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', flexShrink: 0,
        boxShadow: glowColor
          ? `0 0 0 3px ${glowColor}, 0 0 12px ${glowColor}`
          : '0 1px 3px rgba(0,0,0,0.2)',
      }}>
        <svg viewBox="0 0 20 20" width={size * 0.45} height={size * 0.45} fill="none">
          {icon}
        </svg>
      </div>
      {customLabel !== false && (
        <span style={{
          fontSize: 9, fontWeight: 600, color: 'var(--hk-text-muted)',
          textAlign: 'center', maxWidth: size + 16, lineHeight: 1.2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {customLabel || config.label}
        </span>
      )}
    </div>
  )
}

// ── EdgeLine component (for legends) ──────────────────────────

export function BlastEdge({ type, width = 40, className }) {
  const config = BLAST_EDGE_TYPES[type] || { color: '#94a3b8', dashed: false, label: type }
  return (
    <div className={className} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      <svg width={width} height="8" viewBox={`0 0 ${width} 8`}>
        <line x1="0" y1="4" x2={width} y2="4"
          stroke={config.color} strokeWidth="2.5"
          strokeDasharray={config.dashed ? '4 3' : 'none'}
          strokeLinecap="round"
        />
        <polygon
          points={`${width},4 ${width - 6},1 ${width - 6},7`}
          fill={config.color}
        />
      </svg>
      <span style={{ fontSize: 11, color: 'var(--hk-text-secondary)' }}>
        {config.label}
      </span>
    </div>
  )
}

export default BlastNode
