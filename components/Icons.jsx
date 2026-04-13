/**
 * @hakuna/ui — Icon re-exports
 *
 * Curated set of the most-used icons across all Hakuna products.
 * All come from Lucide React. This ensures every project imports
 * icons from one place with consistent naming.
 *
 * Usage:
 *   import { IconShield, IconPlus, IconSearch } from '@hakuna/ui'
 *
 * Why re-export? So projects that don't use lucide-react directly
 * (fundraiser, outbound, signal) can adopt the same icon set
 * without custom SVGs or unicode hacks.
 *
 * NOTE: lucide-react must be installed in the consuming project.
 * Add to peerDependencies if not already present.
 */

export {
  // ── Navigation & UI ───────────────────────────────────
  ChevronDown as IconChevronDown,
  ChevronRight as IconChevronRight,
  ChevronLeft as IconChevronLeft,
  ChevronUp as IconChevronUp,
  ArrowLeft as IconArrowLeft,
  ArrowRight as IconArrowRight,
  Menu as IconMenu,
  X as IconX,
  Search as IconSearch,
  Filter as IconFilter,
  SlidersHorizontal as IconSliders,
  MoreHorizontal as IconMore,
  ExternalLink as IconExternalLink,
  Download as IconDownload,
  Upload as IconUpload,
  Copy as IconCopy,

  // ── Actions ───────────────────────────────────────────
  Plus as IconPlus,
  Trash2 as IconTrash,
  Edit2 as IconEdit,
  Save as IconSave,
  RefreshCw as IconRefresh,
  Play as IconPlay,
  Pause as IconPause,
  ToggleLeft as IconToggleOff,
  ToggleRight as IconToggleOn,
  Send as IconSend,
  Zap as IconZap,

  // ── Status & Feedback ─────────────────────────────────
  CheckCircle as IconCheckCircle,
  AlertTriangle as IconAlertTriangle,
  AlertCircle as IconAlertCircle,
  Info as IconInfo,
  Clock as IconClock,
  Loader2 as IconLoader,
  Ban as IconBan,

  // ── Security (hakuna-specific) ────────────────────────
  Shield as IconShield,
  ShieldAlert as IconShieldAlert,
  ShieldCheck as IconShieldCheck,
  Bug as IconBug,
  Lock as IconLock,
  Unlock as IconUnlock,
  Eye as IconEye,
  EyeOff as IconEyeOff,
  Fingerprint as IconFingerprint,
  Scan as IconScan,

  // ── Data & Content ────────────────────────────────────
  BarChart3 as IconBarChart,
  TrendingUp as IconTrendingUp,
  TrendingDown as IconTrendingDown,
  FileText as IconFileText,
  FolderOpen as IconFolder,
  Database as IconDatabase,
  Tag as IconTag,
  Tags as IconTags,
  Hash as IconHash,
  Globe as IconGlobe,
  Server as IconServer,
  Network as IconNetwork,
  Workflow as IconWorkflow,
  GitBranch as IconGitBranch,

  // ── People & Communication ────────────────────────────
  User as IconUser,
  Users as IconUsers,
  UserPlus as IconUserPlus,
  Mail as IconMail,
  MessageSquare as IconMessage,
  Bell as IconBell,
  Calendar as IconCalendar,
  Building2 as IconBuilding,

  // ── Misc ──────────────────────────────────────────────
  Settings as IconSettings,
  HelpCircle as IconHelp,
  Star as IconStar,
  Bookmark as IconBookmark,
  Link as IconLink,
  Target as IconTarget,
  Crosshair as IconCrosshair,
  Bot as IconBot,
  Sparkles as IconSparkles,
} from 'lucide-react'
