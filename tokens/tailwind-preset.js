/**
 * @hakuna/ui — Tailwind CSS Preset
 *
 * Usage in any project's tailwind.config.js:
 *
 *   import hakunaPreset from '@hakuna/ui/tokens/tailwind-preset'
 *   export default {
 *     presets: [hakunaPreset],
 *     content: ['./src/**\/*.{js,jsx}'],
 *   }
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    screens: {
      sm:  '480px',   // Large phone → small tablet
      md:  '768px',   // Tablet (matches hakuna's MOBILE_BREAKPOINT)
      lg:  '1024px',  // Desktop
      xl:  '1280px',  // Wide desktop
      xxl: '1536px',  // Ultra-wide
    },
    extend: {
      colors: {
        // ── Brand palette ──────────────────────────────
        hakuna: {
          50:  'var(--hk-primary-50)',
          100: 'var(--hk-primary-100)',
          200: 'var(--hk-primary-200)',
          300: 'var(--hk-primary-300)',
          400: 'var(--hk-primary-400)',
          500: 'var(--hk-primary-500)',
          600: 'var(--hk-primary-600)',
          700: 'var(--hk-primary-700)',
          800: 'var(--hk-primary-800)',
          900: 'var(--hk-primary-900)',
          950: 'var(--hk-primary-950)',
        },
        savanna: {
          50:  'var(--hk-accent-50)',
          100: 'var(--hk-accent-100)',
          200: 'var(--hk-accent-200)',
          300: 'var(--hk-accent-300)',
          400: 'var(--hk-accent-400)',
          500: 'var(--hk-accent-500)',
          600: 'var(--hk-accent-600)',
          700: 'var(--hk-accent-700)',
          800: 'var(--hk-accent-800)',
          900: 'var(--hk-accent-900)',
          950: 'var(--hk-accent-950)',
        },
        ink: {
          50:  'var(--hk-neutral-50)',
          100: 'var(--hk-neutral-100)',
          200: 'var(--hk-neutral-200)',
          300: 'var(--hk-neutral-300)',
          400: 'var(--hk-neutral-400)',
          500: 'var(--hk-neutral-500)',
          600: 'var(--hk-neutral-600)',
          700: 'var(--hk-neutral-700)',
          800: 'var(--hk-neutral-800)',
          900: 'var(--hk-neutral-900)',
          950: 'var(--hk-neutral-950)',
        },

        // ── Semantic aliases ───────────────────────────
        bg:               'var(--hk-bg)',
        'bg-muted':       'var(--hk-bg-muted)',
        'bg-subtle':      'var(--hk-bg-subtle)',
        surface:          'var(--hk-surface)',
        card:             'var(--hk-card)',
        fill:             'var(--hk-fill)',
        'fill-hover':     'var(--hk-fill-hover)',
        'fill-active':    'var(--hk-fill-active)',
        'border-subtle':  'var(--hk-border-subtle)',
        border:           'var(--hk-border)',
        'border-strong':  'var(--hk-border-strong)',
        input:            'var(--hk-input)',
        ring:             'var(--hk-ring)',
        muted:            'var(--hk-text-muted)',
        'text-primary':   'var(--hk-text)',
        'text-secondary': 'var(--hk-text-secondary)',

        accent: {
          DEFAULT: 'var(--hk-primary)',
          green:   'var(--hk-success)',
          'green-soft': 'var(--hk-success-subtle)',
          blue:    'var(--hk-primary)',
          'blue-soft': 'var(--hk-info-subtle)',
        },
      },

      fontFamily: {
        sans:    ['var(--hk-font-sans)'],
        mono:    ['var(--hk-font-mono)'],
        display: ['var(--hk-font-display)'],
      },

      borderRadius: {
        sm:   'var(--hk-radius-sm)',
        DEFAULT: 'var(--hk-radius-md)',
        md:   'var(--hk-radius-md)',
        lg:   'var(--hk-radius-lg)',
        full: 'var(--hk-radius-full)',
      },

      boxShadow: {
        xs:   'var(--hk-shadow-xs)',
        sm:   'var(--hk-shadow-sm)',
        card: 'var(--hk-shadow-sm)',
        md:   'var(--hk-shadow-md)',
        'card-hover': 'var(--hk-shadow-md)',
        lift: 'var(--hk-shadow-md)',
        lg:   'var(--hk-shadow-lg)',
        pop:  'var(--hk-shadow-lg)',
        xl:   'var(--hk-shadow-xl)',
        glow: 'var(--hk-shadow-glow)',
        focus:'var(--hk-shadow-focus)',
        soft: 'var(--hk-shadow-sm)',
      },

      backgroundImage: {
        'hakuna-radial': 'radial-gradient(circle at 0% 0%, rgba(0,111,223,0.08), transparent 50%), radial-gradient(circle at 100% 100%, rgba(234,169,58,0.06), transparent 45%)',
        'grid-ink': 'linear-gradient(var(--hk-neutral-100) 1px, transparent 1px), linear-gradient(90deg, var(--hk-neutral-100) 1px, transparent 1px)',
      },

      backgroundSize: {
        'grid-sm': '24px 24px',
        'grid-md': '32px 32px',
      },

      keyframes: {
        'toast-in':      { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'spin':          { to: { transform: 'rotate(360deg)' } },
        'pulse-dot':     { '0%, 80%, 100%': { opacity: 0.3, transform: 'scale(0.8)' }, '40%': { opacity: 1, transform: 'scale(1)' } },
        'fill-bar':      { from: { width: '0%' } },
        'progress-stripe': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '40px 0' } },
      },

      animation: {
        'toast-in':      'toast-in 0.2s ease-out',
        'spin':          'spin 0.8s linear infinite',
        'pulse-dot':     'pulse-dot 1.2s infinite ease-in-out',
        'fill-bar':      'fill-bar 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        'progress-stripe': 'progress-stripe 0.8s linear infinite',
      },
    },
  },
}
