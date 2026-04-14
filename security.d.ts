/**
 * Security-specific components (hakuna / hakuna-signal only).
 * Not part of the main @hakunahq/ui entry.
 */
import * as React from 'react'

export interface BlastNodeType {
  label: string
  color: string
  icon: string
}
export interface BlastEdgeType {
  label: string
  color: string
  dashed?: boolean
}
export const BLAST_NODE_TYPES: Record<string, BlastNodeType>
export const BLAST_EDGE_TYPES: Record<string, BlastEdgeType>

export interface BlastNodeProps {
  type: keyof typeof BLAST_NODE_TYPES | string
  label?: React.ReactNode
  size?: number
  highlighted?: boolean
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}
export const BlastNode: React.FC<BlastNodeProps>

export interface BlastEdgeProps {
  type: keyof typeof BLAST_EDGE_TYPES | string
  label?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
export const BlastEdge: React.FC<BlastEdgeProps>

export interface VendorEntry {
  name: string
  category: string
  logo?: string
  color?: string
}
export const VENDOR_CATALOG: Record<string, VendorEntry>
export const VENDOR_CATEGORIES: Record<string, { label: string; color: string }>

export interface VendorLogoProps {
  vendor: string
  size?: number
  showName?: boolean
  className?: string
  style?: React.CSSProperties
}
export const VendorLogo: React.FC<VendorLogoProps>
