/**
 * @hakuna/ui — Badge components
 *
 * SeverityBadge — Critical/High/Medium/Low/Info (uses CSS var severity tokens)
 * StatusBadge   — General-purpose status pill with dot indicator
 * Pill          — Colored capsule for tags, labels, etc.
 */
import React from 'react'

/* ── Severity Badge ─────────────────────────────────────────── */

const SEV_MAP = {
  4:          'critical', critical: 'critical',
  3:          'high',     high: 'high',
  2:          'medium',   medium: 'medium',
  1:          'low',      low: 'low',
  0:          'info',     info: 'info',
}

const SEV_LABELS = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low', info: 'Info' }

export function SeverityBadge({ severity, label }) {
  const key = SEV_MAP[severity] || SEV_MAP[String(severity)?.toLowerCase()] || 'info'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: `var(--hk-sev-${key}-bg)`,
      color: `var(--hk-sev-${key}-text)`,
      border: `1px solid var(--hk-sev-${key}-border)`,
      borderRadius: 4, padding: '2px 8px',
      fontSize: 11, fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
    }}>
      {label || SEV_LABELS[key]}
    </span>
  )
}

/* ── Status Badge ───────────────────────────────────────────── */

const DEFAULT_STATUS_STYLES = {
  pending:    { bg: 'var(--hk-neutral-100)', text: 'var(--hk-neutral-600)', dot: 'var(--hk-neutral-400)' },
  running:    { bg: 'var(--hk-primary-50)',  text: 'var(--hk-primary-700)', dot: 'var(--hk-primary-500)', pulse: true },
  active:     { bg: 'var(--hk-success-subtle)', text: '#065f46', dot: 'var(--hk-success)' },
  done:       { bg: 'var(--hk-success-subtle)', text: '#065f46', dot: 'var(--hk-success)' },
  completed:  { bg: 'var(--hk-success-subtle)', text: '#065f46', dot: 'var(--hk-success)' },
  closed:     { bg: 'var(--hk-success-subtle)', text: '#065f46', dot: 'var(--hk-success)' },
  failed:     { bg: 'var(--hk-danger-subtle)', text: '#991b1b', dot: 'var(--hk-danger)' },
  error:      { bg: 'var(--hk-danger-subtle)', text: '#991b1b', dot: 'var(--hk-danger)' },
  paused:     { bg: 'var(--hk-warning-subtle)', text: '#92400e', dot: 'var(--hk-warning)' },
  draft:      { bg: 'var(--hk-neutral-50)',  text: 'var(--hk-neutral-500)', dot: 'var(--hk-neutral-300)' },
  skipped:    { bg: 'var(--hk-neutral-50)',  text: 'var(--hk-neutral-400)', dot: 'var(--hk-neutral-300)' },
  target:     { bg: 'var(--hk-accent-50)',   text: 'var(--hk-accent-800)', dot: 'var(--hk-accent-500)' },
  contacted:  { bg: 'var(--hk-primary-50)',  text: 'var(--hk-primary-700)', dot: 'var(--hk-primary-500)' },
  meeting:    { bg: '#f5f3ff',               text: '#5b21b6', dot: '#7c3aed' },
}

export function StatusBadge({ status, styles: customStyles, className }) {
  const mergedStyles = { ...DEFAULT_STATUS_STYLES, ...customStyles }
  const s = mergedStyles[status] || mergedStyles.pending

  return (
    <span className={className} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '2px 10px', borderRadius: 'var(--hk-radius-full)',
      fontSize: 11, fontWeight: 600,
      background: s.bg, color: s.text,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: s.dot, flexShrink: 0,
        ...(s.pulse && { animation: 'hk-pulse-dot 1.2s infinite ease-in-out' }),
      }} />
      {status}
    </span>
  )
}

/* ── Pill ───────────────────────────────────────────────────── */

export function Pill({ label, color = 'var(--hk-text-muted)', children, className }) {
  return (
    <span className={className} style={{
      display: 'inline-block', padding: '2px 8px',
      borderRadius: 'var(--hk-radius-full)',
      background: `${color}22`, color,
      border: `1px solid ${color}44`,
      fontSize: 11, fontWeight: 600,
    }}>
      {label || children}
    </span>
  )
}

export default SeverityBadge
