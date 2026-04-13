/**
 * @hakuna/ui — Toast Notification System
 *
 * Usage:
 *   Wrap your app with <ToastProvider>
 *   const toast = useToast()
 *   toast.success('Saved!')
 *   toast.error('Something went wrong')
 */
import React, { useState, useCallback, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'

const ToastContext = createContext(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const add = useCallback((type, message, duration = 4000) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, type, message }])
    if (duration > 0) setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
    return id
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = useCallback(Object.assign(
    (message) => add('info', message),
    {
      success: (message, duration) => add('success', message, duration),
      error:   (message, duration) => add('error', message, duration ?? 6000),
      info:    (message, duration) => add('info', message, duration),
      warning: (message, duration) => add('warning', message, duration),
      dismiss,
    }
  ), [add, dismiss])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {createPortal(<ToastContainer toasts={toasts} onDismiss={dismiss} />, document.body)}
    </ToastContext.Provider>
  )
}

const TOAST_STYLES = {
  success: { bg: 'var(--hk-success-subtle)', border: 'var(--hk-success)', icon: '✓', color: 'var(--hk-success)' },
  error:   { bg: 'var(--hk-danger-subtle)',  border: 'var(--hk-danger)',  icon: '✖', color: 'var(--hk-danger)' },
  warning: { bg: 'var(--hk-warning-subtle)', border: 'var(--hk-warning)', icon: '⚠', color: 'var(--hk-warning)' },
  info:    { bg: 'var(--hk-bg-subtle)',      border: 'var(--hk-primary)', icon: 'ℹ', color: 'var(--hk-primary)' },
}

function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null
  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, zIndex: 99999,
      display: 'flex', flexDirection: 'column-reverse', gap: 8,
      maxWidth: 400, pointerEvents: 'none',
    }}>
      {toasts.map(t => {
        const s = TOAST_STYLES[t.type] || TOAST_STYLES.info
        return (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 14px', borderRadius: 'var(--hk-radius-sm)',
            background: s.bg, border: `1px solid ${s.border}`,
            color: 'var(--hk-text)', fontSize: 13, lineHeight: 1.5,
            boxShadow: 'var(--hk-shadow-md)', pointerEvents: 'auto',
            animation: 'hk-toast-in 0.2s ease-out',
          }}>
            <span style={{ color: s.color, fontSize: 14, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
            <span style={{ flex: 1, wordBreak: 'break-word' }}>{t.message}</span>
            <button onClick={() => onDismiss(t.id)} style={{
              background: 'none', border: 'none', color: 'var(--hk-text-muted)',
              cursor: 'pointer', fontSize: 15, lineHeight: 1, padding: 0, flexShrink: 0,
            }}>&times;</button>
          </div>
        )
      })}
    </div>
  )
}
