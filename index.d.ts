/**
 * Type definitions for @hakunahq/ui
 * These are hand-written shapes describing the public API. The runtime is JS;
 * this file gives consumers IDE autocomplete and type checking.
 */
import * as React from 'react'

// ── Common ───────────────────────────────────────────────────
export type Size = 'sm' | 'md' | 'lg'
export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info' | 0 | 1 | 2 | 3 | 4

interface WithClassName { className?: string }
interface WithStyle { style?: React.CSSProperties }
type DivProps = React.HTMLAttributes<HTMLDivElement>

// ── Brand ────────────────────────────────────────────────────
export interface LogoProps extends WithClassName, WithStyle {
  color?: string
  size?: number
  height?: number
}
export const LogoSymbol: React.FC<LogoProps>
export const LogoWordmark: React.FC<LogoProps>
export const LogoStacked: React.FC<LogoProps>

// ── Layout ───────────────────────────────────────────────────
export interface PageHeaderProps extends WithClassName {
  title: React.ReactNode
  subtitle?: React.ReactNode
  action?: React.ReactNode
}
export const PageHeader: React.FC<PageHeaderProps>

export interface EmptyStateProps extends WithClassName {
  icon?: React.ComponentType<any>
  title: React.ReactNode
  sub?: React.ReactNode
  children?: React.ReactNode
}
export const EmptyState: React.FC<EmptyStateProps>

export const Spinner: React.FC<{ size?: number; className?: string }>
export const InlineSpinner: React.FC<{ size?: number }>
export const FilterBar: React.FC<React.PropsWithChildren<WithClassName>>

export interface ResponsiveGridProps extends WithClassName, WithStyle {
  children?: React.ReactNode
  min?: number
  gap?: number
}
export const ResponsiveGrid: React.FC<ResponsiveGridProps>

export interface StackProps extends WithClassName, WithStyle {
  children?: React.ReactNode
  direction?: 'row' | 'column'
  gap?: number
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  wrap?: boolean
}
export const Stack: React.FC<StackProps>

// ── Tabs ─────────────────────────────────────────────────────
export interface TabItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  count?: number
  id?: string
  panelId?: string
}
export interface TabsProps extends WithClassName {
  tabs: TabItem[]
  active: string
  onChange?: (key: string) => void
  variant?: 'underline' | 'pill'
  ariaLabel?: string
}
export const Tabs: React.FC<TabsProps>

// ── Modal ────────────────────────────────────────────────────
export interface ModalProps extends WithClassName {
  open: boolean
  onClose?: () => void
  title?: React.ReactNode
  children?: React.ReactNode
  size?: Size | 'xl'
  footer?: React.ReactNode
  ariaLabel?: string
}
export const Modal: React.FC<ModalProps>

// ── Sidebar (right-side detail drawer) ───────────────────────
export interface SidebarProps extends WithClassName {
  open: boolean
  onClose?: () => void
  title?: React.ReactNode
  subtitle?: React.ReactNode
  badges?: React.ReactNode
  children?: React.ReactNode
  width?: number
  footer?: React.ReactNode
}
export const Sidebar: React.FC<SidebarProps>

// ── Pagination ───────────────────────────────────────────────
export interface PaginationProps extends WithClassName {
  page?: number
  pageSize?: number
  total?: number
  onChange?: (page: number) => void
}
export const Pagination: React.FC<PaginationProps>

// ── NavBar ───────────────────────────────────────────────────
export interface NavItem {
  key: string
  label: React.ReactNode
  icon?: React.ComponentType<any>
  href?: string
  badge?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}
export interface NavBarProps extends WithClassName {
  items?: NavItem[]
  activeKey?: string
  onNavigate?: (item: NavItem) => void
  logo?: React.ReactNode
  logoCollapsed?: React.ReactNode
  subtitle?: React.ReactNode
  collapsible?: boolean
  defaultCollapsed?: boolean
  footer?: React.ReactNode
  header?: React.ReactNode
  variant?: 'default' | 'dark'
  /**
   * Controlled mobile-drawer state. When provided, the parent owns
   * whether the mobile drawer is open and must update the value in
   * response to `onMobileOpenChange`. Leave undefined for the default
   * uncontrolled behaviour.
   */
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
}
export const NavBar: React.FC<NavBarProps>

export const NavHamburger: React.FC<{ onClick?: () => void; className?: string }>
export const MobileTopBar: React.FC<{
  logo?: React.ReactNode
  onMenuClick?: () => void
  actions?: React.ReactNode
  className?: string
}>

// ── Card / StatCard ──────────────────────────────────────────
export interface CardProps extends WithClassName, WithStyle {
  children?: React.ReactNode
  onClick?: DivProps['onClick']
  active?: boolean
  activeColor?: string
}
export const Card: React.FC<CardProps>

export interface StatCardProps extends WithClassName {
  label: React.ReactNode
  value: React.ReactNode
  sub?: React.ReactNode
  color?: string
  icon?: React.ComponentType<any>
  onClick?: () => void
  active?: boolean
}
export const StatCard: React.FC<StatCardProps>

// ── Table ────────────────────────────────────────────────────
export interface TableColumn<Row = any> {
  key: string
  label: React.ReactNode
  sortable?: boolean
  width?: number | string
  align?: 'left' | 'center' | 'right'
  render?: (row: Row) => React.ReactNode
}
export interface TableProps<Row = any> extends WithClassName {
  columns: TableColumn<Row>[]
  rows: Row[]
  onRowClick?: (row: Row) => void
  onSort?: (key: string) => void
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  emptyMessage?: React.ReactNode
  emptyState?: React.ReactNode
  renderRowExtra?: (row: Row) => React.ReactNode
  mobileCard?: boolean
  resizable?: boolean
  draggable?: boolean
  onColumnsReorder?: (columns: TableColumn<Row>[]) => void
}
export function Table<Row = any>(props: TableProps<Row>): React.ReactElement

// ── Badge ────────────────────────────────────────────────────
export interface SeverityBadgeProps {
  severity: Severity
  label?: React.ReactNode
}
export const SeverityBadge: React.FC<SeverityBadgeProps>

export interface StatusStyle {
  bg: string
  text: string
  dot: string
  pulse?: boolean
}
export interface StatusBadgeProps extends WithClassName {
  status: string
  styles?: Record<string, StatusStyle>
}
export const StatusBadge: React.FC<StatusBadgeProps>

export interface PillProps extends WithClassName {
  label?: React.ReactNode
  color?: string
  children?: React.ReactNode
}
export const Pill: React.FC<PillProps>

// ── ScoreBar / ProgressBar ───────────────────────────────────
export interface ScoreBarProps extends WithClassName {
  score: number
  max?: number
  color?: string
  breakdown?: Array<{ label: string; value: number; color?: string }>
}
export const ScoreBar: React.FC<ScoreBarProps>

export interface ProgressBarProps extends WithClassName {
  value?: number
  max?: number
  label?: React.ReactNode
  color?: string
  size?: Size
  striped?: boolean
  showValue?: boolean
}
export const ProgressBar: React.FC<ProgressBarProps>

// ── Avatar ───────────────────────────────────────────────────
export interface AvatarProps extends WithClassName, WithStyle {
  name?: string
  src?: string
  size?: number
}
export const Avatar: React.FC<AvatarProps>

// ── Form Controls ────────────────────────────────────────────
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning'
  size?: Size
  loading?: boolean
}
export const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Render a <textarea> instead of <input>. */
  multiline?: boolean
  /** Initial visible rows when `multiline` is true. */
  rows?: number
  label?: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}
export const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>

export type SelectOption = string | { value: string; label: React.ReactNode }
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options?: SelectOption[]
  label?: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  placeholder?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void
}
export const Select: React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLSelectElement>
>

// ── Checkbox ─────────────────────────────────────────────────
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'type'> {
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  label?: React.ReactNode
  size?: 'sm' | 'md'
  ariaLabel?: string
}
export const Checkbox: React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLInputElement>
>

// ── Dropdown / Popover ───────────────────────────────────────
export interface DropdownItem {
  label?: React.ReactNode
  onClick?: () => void
  icon?: React.ReactNode
  shortcut?: React.ReactNode
  danger?: boolean
  disabled?: boolean
  divider?: boolean
}
export interface DropdownProps extends WithClassName {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  label?: string
}
export const Dropdown: React.FC<DropdownProps>

export interface PopoverProps extends WithClassName {
  open: boolean
  onClose?: () => void
  anchorRef: React.RefObject<HTMLElement>
  align?: 'left' | 'right'
  children?: React.ReactNode
}
export const Popover: React.FC<PopoverProps>

// ── Toast ────────────────────────────────────────────────────
export interface ToastApi {
  (message: React.ReactNode): number
  success: (message: React.ReactNode, duration?: number) => number
  error: (message: React.ReactNode, duration?: number) => number
  warning: (message: React.ReactNode, duration?: number) => number
  info: (message: React.ReactNode, duration?: number) => number
  dismiss: (id: number) => void
}
export function useToast(): ToastApi
export const ToastProvider: React.FC<{ children?: React.ReactNode }>

// ── Error / Skeleton ─────────────────────────────────────────
export interface ErrorBannerProps extends WithClassName {
  error: unknown
  onRetry?: () => void
  onDismiss?: () => void
}
export const ErrorBanner: React.FC<ErrorBannerProps>

export interface ErrorBoundaryProps {
  children?: React.ReactNode
  fallback?: React.ReactNode | ((err: Error) => React.ReactNode)
  onError?: (err: Error, info: React.ErrorInfo) => void
}
export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {}

export const SkeletonRow: React.FC<{ columns?: number }>
export const SkeletonTable: React.FC<{ rows?: number; columns?: number }>
export const SkeletonCard: React.FC<{ lines?: number }>
export const SkeletonDetail: React.FC<{}>

// ── Responsive ───────────────────────────────────────────────
export interface Breakpoint {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  xxl: boolean
  isMobile: boolean
  width: number
}
export function useBreakpoint(): Breakpoint
export function useResponsiveValue<T>(values: Partial<Record<keyof Breakpoint, T>> & { base: T }): T

export const BREAKPOINTS: {
  sm: number; md: number; lg: number; xl: number; xxl: number
}
export function mq(bp: keyof typeof BREAKPOINTS): string
export function mqMax(bp: keyof typeof BREAKPOINTS): string
