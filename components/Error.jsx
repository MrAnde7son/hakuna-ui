/**
 * @hakuna/ui — Error handling components
 *
 * ErrorBanner — inline dismissable error bar with retry
 * ErrorBoundary — React error boundary that catches render errors
 */
import React, { Component } from 'react'

export function ErrorBanner({ error, onRetry, onDismiss, className }) {
  if (!error) return null
  return (
    <div className={className} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 16px', borderRadius: 'var(--hk-radius-sm)', marginBottom: 12,
      background: 'var(--hk-danger-subtle)',
      border: '1px solid var(--hk-danger)',
      borderColor: 'color-mix(in srgb, var(--hk-danger) 30%, transparent)',
      color: 'var(--hk-danger)', fontSize: 13,
    }}>
      <span style={{ fontSize: 16, flexShrink: 0 }}>&#9888;</span>
      <span style={{ flex: 1 }}>
        {typeof error === 'string' ? error : error?.message || 'Failed to load data. Please try again.'}
      </span>
      {onRetry && (
        <button onClick={onRetry} style={{
          padding: '4px 12px', borderRadius: 'var(--hk-radius-sm)',
          border: '1px solid currentColor', borderColor: 'color-mix(in srgb, var(--hk-danger) 40%, transparent)',
          background: 'transparent', color: 'var(--hk-danger)',
          cursor: 'pointer', fontSize: 12, fontWeight: 600,
          fontFamily: 'var(--hk-font-sans)', whiteSpace: 'nowrap',
        }}>
          Retry
        </button>
      )}
      {onDismiss && (
        <button onClick={onDismiss} style={{
          padding: '2px 6px', borderRadius: 4, border: 'none',
          background: 'transparent', color: 'var(--hk-danger)',
          cursor: 'pointer', fontSize: 16, lineHeight: 1,
        }}>
          &times;
        </button>
      )}
    </div>
  )
}

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.props.onError?.(error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '48px 24px', gap: 12,
        }}>
          <div style={{ fontSize: 32 }}>&#9888;</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--hk-text)' }}>
            Something went wrong
          </div>
          <div style={{
            fontSize: 13, color: 'var(--hk-text-muted)',
            textAlign: 'center', maxWidth: 400,
          }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: 8, padding: '8px 16px',
              borderRadius: 'var(--hk-radius-sm)',
              border: 'none', background: 'var(--hk-primary)',
              color: 'var(--hk-primary-fg)',
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
              fontFamily: 'var(--hk-font-sans)',
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
