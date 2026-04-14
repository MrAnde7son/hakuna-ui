# @hakunahq/ui

Unified design system for the Hakuna product platform and products

## What's Inside

```
@hakuna/ui/
├── tokens/
│   ├── colors.css           ← CSS custom properties (single source of truth)
│   ├── base.css             ← Global resets, scrollbar, animations, utilities
│   └── tailwind-preset.js   ← Tailwind theme consuming the CSS vars
├── components/
│   ├── Badge.jsx            ← SeverityBadge, StatusBadge, Pill
│   ├── Button.jsx           ← primary/secondary/ghost/danger variants
│   ├── Card.jsx             ← Card, StatCard
│   ├── Input.jsx            ← Input, Select
│   ├── Layout.jsx           ← PageHeader, EmptyState, Spinner, FilterBar
│   ├── ScoreBar.jsx         ← Score visualization (0–10 or 0–100)
│   ├── Table.jsx            ← Sortable data table
│   └── Toast.jsx            ← ToastProvider + useToast hook
└── index.js                 ← Barrel export
```

## Installation

### Option A: npm workspaces (monorepo)

In your root `package.json`:
```json
{
  "workspaces": ["hakuna-ui", "hakuna/frontend", "hakuna-outbound/frontend", ...]
}
```

### Option B: Local link
```bash
cd hakuna-ui && npm link
cd ../hakuna/frontend && npm link @hakuna/ui
```

## Usage

### 1. Import tokens (every project)

```js
// main.jsx or index.js
import '@hakuna/ui/tokens/colors.css'
import '@hakuna/ui/tokens/base.css'
```

### 2. For Tailwind projects (fundraiser, outbound)

```js
// tailwind.config.js
import hakunaPreset from '@hakuna/ui/tokens/tailwind-preset'

export default {
  presets: [hakunaPreset],
  content: [
    './src/**/*.{js,jsx}',
    './node_modules/@hakuna/ui/components/**/*.jsx',  // scan shared components
  ],
}
```

### 3. For CSS-variable projects (hakuna, signal)

Just import the CSS files — components use `var(--hk-*)` directly.

### 4. Use components

```jsx
import { Button, Card, StatCard, SeverityBadge, StatusBadge, ScoreBar, Table } from '@hakuna/ui'

<Button variant="primary" size="md" onClick={handleSave}>Save</Button>
<SeverityBadge severity="critical" />
<StatusBadge status="running" />
<StatCard label="Open Findings" value={142} color="var(--hk-danger)" />
<ScoreBar score={7.8} max={10} />
```

## Migration Guide

### hakuna (main platform)

The main app currently uses `--bg`, `--text`, `--primary`, etc. The new tokens are prefixed with `--hk-` to avoid collisions. Migration strategy:

1. Import `colors.css` and `base.css` alongside existing styles
2. Add backward-compat aliases in your `index.html`:
   ```css
   :root {
     --bg: var(--hk-bg);
     --text: var(--hk-text);
     --primary: var(--hk-primary);
     /* ... etc */
   }
   ```
3. Gradually replace old `--var` references with `--hk-var` as you touch files
4. Swap individual components from `shared/ui.jsx` to `@hakuna/ui` imports one at a time

## Design Decisions

- **CSS variables as the foundation** — works in plain HTML (signal), React with inline styles (hakuna), and Tailwind (fundraiser, outbound)
- **`--hk-` prefix** — avoids collisions with existing tokens during migration; drop the prefix later if desired
- **Tailwind preset consumes CSS vars** — not hardcoded hex values, so dark mode works automatically
- **No build step** — just JSX + CSS, consumed directly by Vite/bundlers
- **Inter** as the body font across all projects (consistent, professional, great OpenType features)
- **Syne** as the display font (bold, distinctive for hero numbers and headings)
- **DM Mono** for data/code display
