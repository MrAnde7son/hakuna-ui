/**
 * @hakuna/ui — Pagination
 *
 * Responsive: compact mode on mobile (hides range text, shorter buttons).
 *
 * Usage:
 *   <Pagination page={1} pageSize={50} total={142} onChange={setPage} />
 */
import React from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

export function Pagination({ page = 1, pageSize = 50, total = 0, onChange, className }) {
  const bp = useBreakpoint()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = Math.min((page - 1) * pageSize + 1, total)
  const end = Math.min(page * pageSize, total)

  const btnStyle = (disabled) => ({
    padding: bp.md ? '5px 12px' : '6px 10px',
    borderRadius: 'var(--hk-radius-sm)',
    border: '1px solid var(--hk-border)', background: 'var(--hk-card)',
    color: disabled ? 'var(--hk-text-muted)' : 'var(--hk-text)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 12, fontWeight: 600, fontFamily: 'var(--hk-font-sans)',
    opacity: disabled ? 0.5 : 1, transition: 'all 0.1s',
  })

  return (
    <div className={className} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0', gap: 8,
    }}>
      {bp.md ? (
        <div style={{ fontSize: 12, color: 'var(--hk-text-muted)' }}>
          <span style={{ fontFamily: 'var(--hk-font-mono)', fontWeight: 600, color: 'var(--hk-text-secondary)' }}>
            {start}–{end}
          </span>
          {' '}of{' '}
          <span style={{ fontFamily: 'var(--hk-font-mono)', fontWeight: 600, color: 'var(--hk-text-secondary)' }}>
            {total.toLocaleString()}
          </span>
        </div>
      ) : (
        <span style={{
          fontSize: 12, fontWeight: 600, color: 'var(--hk-text-secondary)',
          fontFamily: 'var(--hk-font-mono)',
        }}>
          {page}/{totalPages}
        </span>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          onClick={() => onChange?.(page - 1)}
          disabled={page <= 1}
          style={btnStyle(page <= 1)}
        >
          {bp.md ? '← Prev' : '←'}
        </button>

        {bp.md && (
          <span style={{
            fontSize: 12, fontWeight: 600, color: 'var(--hk-text-secondary)',
            padding: '0 8px', fontFamily: 'var(--hk-font-mono)',
          }}>
            {page} / {totalPages}
          </span>
        )}

        <button
          onClick={() => onChange?.(page + 1)}
          disabled={page >= totalPages}
          style={btnStyle(page >= totalPages)}
        >
          {bp.md ? 'Next →' : '→'}
        </button>
      </div>
    </div>
  )
}

export default Pagination
