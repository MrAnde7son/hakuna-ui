/**
 * @hakuna/ui — ScoreBar
 *
 * Horizontal score visualization with color-coded thresholds.
 * Supports two modes:
 *   - 0–10 scale (hakuna platform: CVSS-like risk scores)
 *   - 0–100 scale (outbound/fundraiser: ICP fit scores)
 */
import React, { useState, useRef } from 'react'
import { createPortal } from 'react-dom'

function defaultColor(score, max) {
  const pct = (score / max) * 100
  if (max <= 10) {
    // Risk scale: higher = worse
    if (pct >= 80) return 'var(--hk-danger)'
    if (pct >= 60) return 'var(--hk-warning)'
    if (pct >= 40) return '#d97706'
    return 'var(--hk-success)'
  }
  // Fit scale: higher = better
  if (pct >= 85) return 'var(--hk-success)'
  if (pct >= 70) return 'var(--hk-primary)'
  return 'var(--hk-neutral-300)'
}

export function ScoreBar({ score, max = 10, color, breakdown, className }) {
  const pct = Math.min((score / max) * 100, 100)
  const c = color || defaultColor(score, max)
  const [tipOpen, setTipOpen] = useState(false)
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 })
  const barRef = useRef(null)

  const showTip = () => {
    if (!breakdown) return
    const rect = barRef.current?.getBoundingClientRect()
    if (rect) setTipPos({ x: rect.left, y: rect.bottom + 6 })
    setTipOpen(true)
  }

  const displayValue = max <= 10 ? score?.toFixed?.(1) ?? score : Math.round(score)

  return (
    <div
      ref={barRef}
      className={className}
      onMouseEnter={showTip}
      onMouseLeave={() => setTipOpen(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: breakdown ? 'help' : 'default', minWidth: 100 }}
    >
      <div style={{
        flex: 1, height: 6,
        background: 'var(--hk-border)', borderRadius: 3, overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: c, borderRadius: 3,
          transition: 'width 0.3s',
          animation: 'hk-fill-bar 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>
      <span style={{
        fontSize: 12, color: c, fontWeight: 600, minWidth: 28,
        fontFamily: 'var(--hk-font-mono)', textAlign: 'right',
      }}>
        {displayValue}
      </span>

      {tipOpen && breakdown && createPortal(
        <ScoreBreakdownTooltip breakdown={breakdown} pos={tipPos} />,
        document.body
      )}
    </div>
  )
}

function ScoreBreakdownTooltip({ breakdown, pos }) {
  const factors = breakdown.factors || []
  return (
    <div style={{
      position: 'fixed', left: Math.min(pos.x, window.innerWidth - 310), top: pos.y,
      zIndex: 99996, width: 290, padding: '10px 12px',
      background: 'var(--hk-card)', border: '1px solid var(--hk-border)',
      borderRadius: 'var(--hk-radius-sm)',
      boxShadow: 'var(--hk-shadow-lg)',
      animation: 'hk-toast-in 0.15s ease-out',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: 'var(--hk-text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8,
      }}>
        {breakdown.title || 'Score Breakdown'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {factors.map(f => (
          <div key={f.label} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr 70px',
            gap: 6, alignItems: 'center',
          }}>
            <div style={{ fontSize: 11, color: 'var(--hk-text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{f.label}</span>
              <span style={{ color: 'var(--hk-text-muted)' }}>{Math.round(f.weight * 100)}%</span>
            </div>
            <div style={{ height: 4, background: 'var(--hk-border)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min(f.value * 100, 100)}%`,
                height: '100%', background: f.color, borderRadius: 2,
              }} />
            </div>
            <div style={{
              fontSize: 10, color: 'var(--hk-text-muted)', textAlign: 'right',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }} title={f.detail}>
              {f.detail}
            </div>
          </div>
        ))}
      </div>
      {breakdown.total != null && (
        <div style={{
          marginTop: 6, paddingTop: 6, borderTop: '1px solid var(--hk-border)',
          display: 'flex', justifyContent: 'space-between',
          fontSize: 11, color: 'var(--hk-text-muted)',
        }}>
          <span>Weighted total</span>
          <span style={{ fontWeight: 600, color: 'var(--hk-text)' }}>{breakdown.total.toFixed(1)} / {max}</span>
        </div>
      )}
    </div>
  )
}

export default ScoreBar
