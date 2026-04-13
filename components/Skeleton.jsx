/**
 * @hakuna/ui — Skeleton Loaders
 *
 * Shimmer-animated placeholders for loading states.
 * SkeletonRow, SkeletonTable, SkeletonCard, SkeletonDetail
 */
import React from 'react'

const SHIMMER_CSS = `@keyframes hk-shimmer {
  0% { background-position: -400px 0 }
  100% { background-position: 400px 0 }
}`

function SkeletonBase({ width, height, borderRadius = 4, style = {} }) {
  return (
    <>
      <div style={{
        width, height, borderRadius,
        background: 'linear-gradient(90deg, var(--hk-border) 25%, var(--hk-bg-muted) 50%, var(--hk-border) 75%)',
        backgroundSize: '800px 100%',
        animation: 'hk-shimmer 1.5s infinite linear',
        ...style,
      }} />
      <style>{SHIMMER_CSS}</style>
    </>
  )
}

export function SkeletonRow({ columns = 5 }) {
  return (
    <div style={{
      display: 'flex', gap: 16, padding: '12px 16px',
      borderBottom: '1px solid var(--hk-border)',
    }}>
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonBase
          key={i}
          width={i === 0 ? '30%' : `${Math.floor(70 / (columns - 1))}%`}
          height={14}
        />
      ))}
    </div>
  )
}

export function SkeletonTable({ rows = 8, columns = 5 }) {
  return (
    <div style={{
      border: '1px solid var(--hk-border)',
      borderRadius: 'var(--hk-radius-sm)', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', gap: 16, padding: '12px 16px',
        background: 'var(--hk-bg-muted)',
      }}>
        {Array.from({ length: columns }).map((_, i) => (
          <SkeletonBase
            key={i}
            width={i === 0 ? '30%' : `${Math.floor(70 / (columns - 1))}%`}
            height={12}
            borderRadius={3}
          />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} columns={columns} />
      ))}
    </div>
  )
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div style={{
      padding: 20, borderRadius: 'var(--hk-radius-sm)',
      border: '1px solid var(--hk-border)',
      background: 'var(--hk-card)',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <SkeletonBase width="40%" height={16} />
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase key={i} width={`${60 + (i * 7) % 30}%`} height={12} />
      ))}
    </div>
  )
}

export function SkeletonDetail() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 4 }}>
      <SkeletonBase width="50%" height={22} />
      <div style={{ display: 'flex', gap: 12 }}>
        <SkeletonBase width={80} height={24} borderRadius={12} />
        <SkeletonBase width={100} height={24} borderRadius={12} />
        <SkeletonBase width={60} height={24} borderRadius={12} />
      </div>
      <SkeletonCard lines={5} />
      <SkeletonCard lines={3} />
    </div>
  )
}
