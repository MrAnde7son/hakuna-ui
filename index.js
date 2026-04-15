/**
 * @hakunahq/ui — Unified Design System
 *
 * Shared tokens and components for the Hakuna product family:
 *   hakuna, hakuna-signal, hakuna-fundraiser, hakuna-outbound
 *
 * Quick start:
 *   import '@hakunahq/ui/tokens/colors.css'
 *   import '@hakunahq/ui/tokens/base.css'
 *   import { Button, Card, StatCard, SeverityBadge, LogoSymbol } from '@hakunahq/ui'
 *
 * Icons (opt-in, requires lucide-react peer):
 *   import { IconShield, IconPlus } from '@hakunahq/ui/icons'
 *
 * Security-specific components (hakuna/hakuna-signal only):
 *   import { BlastNode, VendorLogo } from '@hakunahq/ui/security'
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
export { Checkbox } from './components/Checkbox.jsx'
export { Dropdown, Popover } from './components/Dropdown.jsx'

// ── Feedback ────────────────────────────────────────────────
export { ToastProvider, useToast } from './components/Toast.jsx'
export { ErrorBanner, ErrorBoundary } from './components/Error.jsx'
export { SkeletonRow, SkeletonTable, SkeletonCard, SkeletonDetail } from './components/Skeleton.jsx'

// ── Responsive ──────────────────────────────────────────────
export { useBreakpoint, useResponsiveValue } from './hooks/useBreakpoint.js'
export { BREAKPOINTS, mq, mqMax } from './tokens/breakpoints.js'

// NOTE: Icons (lucide-react re-exports) are no longer part of the main
// entry point to keep the base bundle free of the lucide-react peer dep.
// Import them from the `/icons` subpath instead:
//   import { IconShield, IconPlus } from '@hakunahq/ui/icons'
