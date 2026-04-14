/**
 * @hakuna/ui — Unified Design System
 *
 * Shared tokens and components for the Hakuna product family:
 *   hakuna, hakuna-signal, hakuna-fundraiser, hakuna-outbound
 *
 * Quick start:
 *   import '@hakuna/ui/tokens/colors.css'
 *   import '@hakuna/ui/tokens/base.css'
 *   import { Button, Card, StatCard, SeverityBadge, LogoSymbol } from '@hakuna/ui'
 */

// ── Brand ───────────────────────────────────────────────────
export { LogoSymbol, LogoWordmark, LogoStacked } from './components/Logo.jsx'

// ── Layout ──────────────────────────────────────────────────
export { PageHeader, EmptyState, Spinner, InlineSpinner, FilterBar, ResponsiveGrid, Stack } from './components/Layout.jsx'
export { Tabs } from './components/Tabs.jsx'
export { Modal } from './components/Modal.jsx'
export { Sidebar } from './components/Sidebar.jsx'
export { Pagination } from './components/Pagination.jsx'

// ── Navigation ─────────────────────────────────────────────
export { NavBar, NavHamburger, MobileTopBar } from './components/NavBar.jsx'

// ── Data Display ────────────────────────────────────────────
export { Card, StatCard } from './components/Card.jsx'
export { Table } from './components/Table.jsx'
export { SeverityBadge, StatusBadge, Pill } from './components/Badge.jsx'
export { ScoreBar } from './components/ScoreBar.jsx'
export { ProgressBar } from './components/Progress.jsx'
export { Avatar } from './components/Avatar.jsx'

// ── Form Controls ───────────────────────────────────────────
export { Button } from './components/Button.jsx'
export { Input, Select } from './components/Input.jsx'
export { Dropdown, Popover } from './components/Dropdown.jsx'

// ── Feedback ────────────────────────────────────────────────
export { ToastProvider, useToast } from './components/Toast.jsx'
export { ErrorBanner, ErrorBoundary } from './components/Error.jsx'
export { SkeletonRow, SkeletonTable, SkeletonCard, SkeletonDetail } from './components/Skeleton.jsx'

// ── Blast Radius ────────────────────────────────────────────
export { BlastNode, BlastEdge, BLAST_NODE_TYPES, BLAST_EDGE_TYPES } from './components/BlastRadiusIcons.jsx'

// ── Vendor / Integration Icons ──────────────────────────────
export { VendorLogo, VENDOR_CATALOG, VENDOR_CATEGORIES } from './components/VendorLogo.jsx'

// ── Responsive ──────────────────────────────────────────────
export { useBreakpoint, useResponsiveValue } from './hooks/useBreakpoint.js'
export { BREAKPOINTS, mq, mqMax } from './tokens/breakpoints.js'

// ── Icons (re-exported from lucide-react) ───────────────────
// Import individually: import { IconShield, IconPlus } from '@hakuna/ui'
// NOTE: requires lucide-react as peer dependency
export * from './components/Icons.jsx'
