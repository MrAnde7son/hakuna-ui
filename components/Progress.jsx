/**
 * @hakuna/ui — Progress Bar
 *
 * Usage:
 *   <ProgressBar value={72} />
 *   <ProgressBar value={45} max={100} label="Remediation" color="var(--hk-success)" />
 *   <ProgressBar value={30} striped />
 */
import React from 'react'

export function ProgressBar({
  value = 0, max = 100, label, color, size = 'md',
  striped = false, showValue = true, className,
}) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)
  const barColor = color || (
    pct >= 80 ? 'var(--hk-success)' :
    pct >= 50 ? 'var(--hk-primary)' :
    pct >= 25 ? 'var(--hk-warning)' :
    'var(--hk-danger)'
  )
  const height = size === 'sm' ? 4 : size === 'lg' ? 10 : 6

  return (
    <div className={className}>
      {(label || showValue) && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 4,
        }}>
          {label && (
            <span style={{ fontSize: 12, color: 'var(--hk-text-secondary)', fontWeight: 500 }}>
              {label}
            </span>
          )}
          {showValue && (
            <span style={{
              fontSize: 11, fontWeight: 600,
              fontFamily: 'var(--hk-font-mono)', color: barColor,
            }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div style={{
        height, background: 'var(--hk-border)',
        borderRadius: height, overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: barColor, borderRadius: height,
          transition: 'width 0.4s ease-out',
          ...(striped && {
            backgroundImage: `linear-gradient(45deg,
              rgba(255,255,255,0.3) 25%, transparent 25%,
              transparent 50%, rgba(255,255,255,0.3) 50%,
              rgba(255,255,255,0.3) 75%, transparent 75%)`,
            backgroundSize: '20px 20px',
            animation: 'hk-progress-stripe 0.8s linear infinite',
          }),
        }} />
      </div>
      <style>{`@keyframes hk-progress-stripe {
        0% { background-position: 0 0; }
        100% { background-position: 40px 0; }
      }`}</style>
    </div>
  )
}

export default ProgressBar
