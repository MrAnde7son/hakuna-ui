/**
 * @hakuna/ui — Table
 *
 * Features:
 *   - Sortable columns (onSort / sortBy / sortOrder)
 *   - Resizable columns (resizable prop — drag column borders)
 *   - Draggable columns (draggable prop — reorder by drag-and-drop)
 *   - Mobile card layout (< 768px, opt-out with mobileCard={false})
 *   - Expandable rows (renderRowExtra)
 *   - Empty state (emptyMessage or emptyState node)
 *
 * Usage:
 *   <Table
 *     columns={cols}
 *     rows={data}
 *     resizable
 *     draggable
 *     onColumnsReorder={(newCols) => setCols(newCols)}
 *     onSort={handleSort}
 *     sortBy="score"
 *     sortOrder="desc"
 *   />
 */
import React, { Fragment, useState, useRef, useCallback, useEffect } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

// ── Resize hook ──────────────────────────────────────────────
function useColumnResize(columns, enabled) {
  const [widths, setWidths] = useState(() => {
    const w = {}
    columns.forEach(col => { if (col.width) w[col.key] = col.width })
    return w
  })

  useEffect(() => {
    setWidths(prev => {
      const next = { ...prev }
      columns.forEach(col => {
        if (col.width && !(col.key in next)) next[col.key] = col.width
      })
      return next
    })
  }, [columns])

  const onResizeDown = useCallback((colKey, e) => {
    if (!enabled) return
    e.preventDefault()
    const startX = e.clientX
    const startW = widths[colKey] || 120

    const onMove = (ev) => {
      const newW = Math.max(60, startW + ev.clientX - startX)
      setWidths(prev => ({ ...prev, [colKey]: newW }))
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [enabled, widths])

  return { widths, onResizeDown }
}

// ── Drag-to-reorder hook ─────────────────────────────────────
function useColumnDrag(columns, enabled, onColumnsReorder) {
  const [dragKey, setDragKey] = useState(null)
  const [overKey, setOverKey] = useState(null)

  const onDragStart = useCallback((key, e) => {
    if (!enabled) return
    setDragKey(key)
    e.dataTransfer.effectAllowed = 'move'
    // Ghost image: use the header cell itself
    e.dataTransfer.setData('text/plain', key)
  }, [enabled])

  const onDragOver = useCallback((key, e) => {
    if (!enabled || !dragKey || key === dragKey) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverKey(key)
  }, [enabled, dragKey])

  const onDragLeave = useCallback(() => {
    setOverKey(null)
  }, [])

  const onDrop = useCallback((targetKey, e) => {
    e.preventDefault()
    if (!dragKey || dragKey === targetKey) { setDragKey(null); setOverKey(null); return }

    const fromIdx = columns.findIndex(c => c.key === dragKey)
    const toIdx = columns.findIndex(c => c.key === targetKey)
    if (fromIdx < 0 || toIdx < 0) { setDragKey(null); setOverKey(null); return }

    const next = [...columns]
    const [moved] = next.splice(fromIdx, 1)
    next.splice(toIdx, 0, moved)
    onColumnsReorder?.(next)

    setDragKey(null)
    setOverKey(null)
  }, [columns, dragKey, onColumnsReorder])

  const onDragEnd = useCallback(() => {
    setDragKey(null)
    setOverKey(null)
  }, [])

  return { dragKey, overKey, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd }
}

// ── Table component ──────────────────────────────────────────
export function Table({
  columns,
  rows,
  onRowClick,
  onSort,
  sortBy,
  sortOrder,
  emptyMessage = 'No data',
  emptyState,
  renderRowExtra,
  mobileCard = true,
  resizable = false,
  draggable = false,
  onColumnsReorder,
  className,
}) {
  const bp = useBreakpoint()
  const useMobileCards = bp.isMobile && mobileCard
  const { widths, onResizeDown } = useColumnResize(columns, resizable && !useMobileCards)
  const drag = useColumnDrag(columns, draggable && !useMobileCards, onColumnsReorder)

  // ── Mobile card view ─────────────────────────────────────
  if (useMobileCards) {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.length === 0 ? (
          emptyState || (
            <div style={{
              padding: '32px 12px', textAlign: 'center',
              color: 'var(--hk-text-muted)', fontSize: 13,
            }}>
              {emptyMessage}
            </div>
          )
        ) : rows.map((row, i) => (
          <div
            key={row.id ?? i}
            onClick={() => onRowClick?.(row)}
            style={{
              background: 'var(--hk-card)',
              border: '1px solid var(--hk-border)',
              borderRadius: 'var(--hk-radius-md)',
              padding: 14,
              cursor: onRowClick ? 'pointer' : 'default',
              transition: 'box-shadow 0.1s',
            }}
          >
            {columns.map(col => {
              const value = col.render ? col.render(row[col.key], row) : row[col.key]
              if (value == null || value === '') return null
              return (
                <div key={col.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '4px 0', gap: 12,
                  borderBottom: '1px solid var(--hk-bg-muted)',
                }}>
                  <span style={{
                    fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: 'var(--hk-text-muted)', fontWeight: 600, flexShrink: 0,
                  }}>
                    {col.label}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--hk-text)', textAlign: 'right' }}>
                    {value}
                  </span>
                </div>
              )
            })}
            {renderRowExtra?.(row, i)}
          </div>
        ))}
      </div>
    )
  }

  // ── Desktop table ────────────────────────────────────────
  return (
    <div style={{ overflowX: 'auto' }} className={className}>
      <table style={{
        width: resizable ? 'max-content' : '100%',
        minWidth: '100%',
        borderCollapse: 'collapse',
        fontSize: 13,
        fontFamily: 'var(--hk-font-sans)',
        tableLayout: resizable ? 'fixed' : 'auto',
      }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--hk-border)' }}>
            {columns.map((col, ci) => {
              const isSorted = sortBy === col.key
              const canSort = col.sortable && onSort
              const colResizable = resizable && col.resizable !== false
              const isDragging = drag.dragKey === col.key
              const isDropTarget = drag.overKey === col.key
              const w = widths[col.key]

              return (
                <th
                  key={col.key}
                  draggable={draggable && col.draggable !== false}
                  onDragStart={(e) => drag.onDragStart(col.key, e)}
                  onDragOver={(e) => drag.onDragOver(col.key, e)}
                  onDragLeave={drag.onDragLeave}
                  onDrop={(e) => drag.onDrop(col.key, e)}
                  onDragEnd={drag.onDragEnd}
                  onClick={canSort ? () => onSort(col.key) : undefined}
                  style={{
                    padding: '10px 12px', textAlign: 'left', fontWeight: 600,
                    color: isSorted ? 'var(--hk-text)' : 'var(--hk-text-muted)',
                    fontSize: 11, textTransform: 'uppercase',
                    letterSpacing: '0.05em', whiteSpace: 'nowrap',
                    width: w || col.width,
                    cursor: draggable ? 'grab' : canSort ? 'pointer' : 'default',
                    userSelect: 'none',
                    position: 'relative',
                    opacity: isDragging ? 0.4 : 1,
                    // Drop target indicator
                    ...(isDropTarget && {
                      borderLeft: '2px solid var(--hk-primary)',
                    }),
                    transition: 'opacity 0.15s',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {/* Drag grip icon */}
                    {draggable && col.draggable !== false && (
                      <span style={{
                        display: 'inline-flex', opacity: 0.3, marginRight: 2,
                        fontSize: 10, lineHeight: 1, letterSpacing: '0.02em',
                      }} title="Drag to reorder">
                        ⠿
                      </span>
                    )}
                    {col.label}
                    {canSort && (
                      <span style={{ fontSize: 10, opacity: isSorted ? 1 : 0.3 }}>
                        {isSorted ? (sortOrder === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                    )}
                  </span>

                  {/* Resize handle */}
                  {colResizable && ci < columns.length - 1 && (
                    <span
                      onMouseDown={(e) => { e.stopPropagation(); onResizeDown(col.key, e) }}
                      style={{
                        position: 'absolute', right: 0, top: 0, bottom: 0,
                        width: 6, cursor: 'col-resize',
                        background: 'transparent', zIndex: 1,
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--hk-primary-200)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    />
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{
                padding: 0, textAlign: 'center', color: 'var(--hk-text-muted)',
              }}>
                {emptyState || (
                  <div style={{ padding: '32px 12px' }}>{emptyMessage}</div>
                )}
              </td>
            </tr>
          ) : rows.map((row, i) => {
            const extra = renderRowExtra?.(row, i)
            return (
              <Fragment key={row.id ?? i}>
                <tr
                  onClick={() => onRowClick?.(row)}
                  style={{
                    borderBottom: extra ? 'none' : '1px solid var(--hk-border)',
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => onRowClick && (e.currentTarget.style.background = 'var(--hk-bg-muted)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {columns.map(col => (
                    <td key={col.key} style={{
                      padding: '10px 12px', color: 'var(--hk-text)', verticalAlign: 'middle',
                      overflow: resizable ? 'hidden' : undefined,
                      textOverflow: resizable ? 'ellipsis' : undefined,
                      whiteSpace: resizable ? 'nowrap' : undefined,
                    }}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
                {extra && (
                  <tr style={{ borderBottom: '1px solid var(--hk-border)' }}>
                    <td colSpan={columns.length} style={{ padding: 0 }}>{extra}</td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
