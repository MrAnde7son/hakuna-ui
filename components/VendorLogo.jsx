/**
 * @hakuna/ui — VendorLogo
 *
 * Renders a vendor/integration logo from the design system's
 * bundled SVG collection, with fallback to initial-letter avatar.
 *
 * Usage:
 *   import { VendorLogo, VENDOR_CATALOG } from '@hakuna/ui'
 *
 *   <VendorLogo vendor="jira" size={32} />
 *   <VendorLogo vendor="slack" size={24} />
 *   <VendorLogo src="/custom/logo.svg" name="Custom" size={32} />
 */
import React, { useState } from 'react'

// ── Vendor catalog ────────────────────────────────────────────
// Maps vendor keys to display names and categories.
// The SVG files live at @hakuna/ui/assets/vendors/{key}.svg

export const VENDOR_CATALOG = {
  // Ticketing & Project Management
  jira:           { name: 'Jira',            category: 'ticketing' },
  servicenow:     { name: 'ServiceNow',      category: 'ticketing' },
  linear:         { name: 'Linear',          category: 'ticketing' },
  freshservice:   { name: 'Freshservice',    category: 'ticketing' },

  // Communication
  slack:          { name: 'Slack',           category: 'communication' },
  microsoft:      { name: 'Microsoft Teams', category: 'communication' },

  // Cloud & Infrastructure
  aws:            { name: 'AWS',             category: 'cloud' },
  azure:          { name: 'Azure',           category: 'cloud' },
  gcp:            { name: 'Google Cloud',    category: 'cloud' },
  cloudflare:     { name: 'Cloudflare',      category: 'cloud' },

  // Identity & Access
  okta:           { name: 'Okta',            category: 'identity' },
  cyberark:       { name: 'CyberArk',        category: 'identity' },
  sailpoint:      { name: 'SailPoint',       category: 'identity' },
  beyondtrust:    { name: 'BeyondTrust',     category: 'identity' },

  // Vulnerability Scanners
  tenable:        { name: 'Tenable',         category: 'scanner' },
  nessus:         { name: 'Nessus',          category: 'scanner' },
  qualys:         { name: 'Qualys',          category: 'scanner' },
  rapid7:         { name: 'Rapid7',          category: 'scanner' },
  burp:           { name: 'Burp Suite',      category: 'scanner' },
  invicti:        { name: 'Invicti',         category: 'scanner' },
  checkmarx:      { name: 'Checkmarx',       category: 'scanner' },
  snyk:           { name: 'Snyk',            category: 'scanner' },
  veracode:       { name: 'Veracode',        category: 'scanner' },
  stackhawk:      { name: 'StackHawk',       category: 'scanner' },
  zap:            { name: 'OWASP ZAP',       category: 'scanner' },

  // SIEM & Logging
  splunk:         { name: 'Splunk',          category: 'siem' },
  elastic:        { name: 'Elastic',         category: 'siem' },
  sumologic:      { name: 'Sumo Logic',      category: 'siem' },

  // EDR & Endpoint
  crowdstrike:    { name: 'CrowdStrike',     category: 'edr' },
  sentinelone:    { name: 'SentinelOne',     category: 'edr' },
  carbonblack:    { name: 'Carbon Black',    category: 'edr' },
  tanium:         { name: 'Tanium',          category: 'edr' },

  // CSPM & Cloud Security
  wiz:            { name: 'Wiz',             category: 'cspm' },
  orca:           { name: 'Orca Security',   category: 'cspm' },
  prisma_cloud:   { name: 'Prisma Cloud',    category: 'cspm' },
  lacework:       { name: 'Lacework',        category: 'cspm' },

  // Network Security
  palo_alto:      { name: 'Palo Alto',       category: 'network' },
  fortinet:       { name: 'Fortinet',        category: 'network' },
  checkpoint:     { name: 'Check Point',     category: 'network' },
  zscaler:        { name: 'Zscaler',         category: 'network' },
  netskope:       { name: 'Netskope',        category: 'network' },

  // Threat Intel
  mandiant:       { name: 'Mandiant',        category: 'threat_intel' },
  recorded_future:{ name: 'Recorded Future', category: 'threat_intel' },
  shodan:         { name: 'Shodan',          category: 'threat_intel' },
  censys:         { name: 'Censys',          category: 'threat_intel' },
  virustotal:     { name: 'VirusTotal',      category: 'threat_intel' },
  misp:           { name: 'MISP',            category: 'threat_intel' },

  // EASM & Attack Surface
  runzero:        { name: 'runZero',         category: 'easm' },
  censys:         { name: 'Censys',          category: 'easm' },
  cycognito:      { name: 'CyCognito',       category: 'easm' },
  hadrian:        { name: 'Hadrian',         category: 'easm' },
  detectify:      { name: 'Detectify',       category: 'easm' },

  // BAS & Validation
  attackiq:       { name: 'AttackIQ',        category: 'bas' },
  cymulate:       { name: 'Cymulate',        category: 'bas' },
  safebreach:     { name: 'SafeBreach',      category: 'bas' },
  picus:          { name: 'Picus',           category: 'bas' },
  pentera:        { name: 'Pentera',         category: 'bas' },

  // Bug Bounty
  hackerone:      { name: 'HackerOne',       category: 'bug_bounty' },
  bugcrowd:       { name: 'Bugcrowd',        category: 'bug_bounty' },
  cobalt:         { name: 'Cobalt',          category: 'bug_bounty' },
  synack:         { name: 'Synack',          category: 'bug_bounty' },
  intigriti:      { name: 'Intigriti',       category: 'bug_bounty' },

  // Data Security
  varonis:        { name: 'Varonis',         category: 'data_security' },
  bigid:          { name: 'BigID',           category: 'data_security' },
  cyera:          { name: 'Cyera',           category: 'data_security' },
  securiti:       { name: 'Securiti',        category: 'data_security' },

  // OT / ICS
  claroty:        { name: 'Claroty',         category: 'ot' },
  dragos:         { name: 'Dragos',          category: 'ot' },
  nozomi:         { name: 'Nozomi',          category: 'ot' },
  armis:          { name: 'Armis',           category: 'ot' },

  // SaaS Security
  adaptive_shield:{ name: 'Adaptive Shield', category: 'saas_security' },
  appomni:        { name: 'AppOmni',         category: 'saas_security' },
  obsidian:       { name: 'Obsidian',        category: 'saas_security' },

  // Patch Management
  automox:        { name: 'Automox',         category: 'patch_mgmt' },
  ivanti:         { name: 'Ivanti',          category: 'patch_mgmt' },

  // DevOps & Source
  github:         { name: 'GitHub',          category: 'devops' },
  gitlab:         { name: 'GitLab',          category: 'devops' },

  // Collaboration & Storage
  confluence:     { name: 'Confluence',      category: 'collaboration' },
  sharepoint:     { name: 'SharePoint',      category: 'collaboration' },
  notion:         { name: 'Notion',          category: 'collaboration' },
  google_drive:   { name: 'Google Drive',    category: 'collaboration' },

  // HRIS
  bamboohr:       { name: 'BambooHR',        category: 'hris' },
  hibob:          { name: 'HiBob',           category: 'hris' },
  rippling:       { name: 'Rippling',        category: 'hris' },
  workday:        { name: 'Workday',         category: 'hris' },

  // CRM
  salesforce:     { name: 'Salesforce',      category: 'crm' },

  // Incident & On-call
  pagerduty:      { name: 'PagerDuty',       category: 'incident' },

  // DNS & Domains
  godaddy:        { name: 'GoDaddy',         category: 'dns' },

  // Pen Testing
  pentest:        { name: 'Pentest Tools',   category: 'pentest' },
  bright:         { name: 'Bright',          category: 'pentest' },

  // Risk
  xm_cyber:       { name: 'XM Cyber',        category: 'risk' },
}

// ── Category metadata ─────────────────────────────────────────

export const VENDOR_CATEGORIES = {
  ticketing:      { label: 'Ticketing',           color: '#0052CC' },
  communication:  { label: 'Communication',       color: '#2C1338' },
  cloud:          { label: 'Cloud',               color: '#FF9900' },
  identity:       { label: 'Identity & Access',   color: '#1662DD' },
  scanner:        { label: 'Vulnerability Scanners', color: '#00C4CC' },
  siem:           { label: 'SIEM & Logging',      color: '#65A637' },
  edr:            { label: 'EDR & Endpoint',      color: '#FF4438' },
  cspm:           { label: 'Cloud Security',      color: '#00D4AA' },
  network:        { label: 'Network Security',    color: '#FA582D' },
  threat_intel:   { label: 'Threat Intelligence', color: '#E8552D' },
  easm:           { label: 'Attack Surface',      color: '#7C3AED' },
  bas:            { label: 'BAS & Validation',    color: '#1E40AF' },
  bug_bounty:     { label: 'Bug Bounty',          color: '#9333EA' },
  data_security:  { label: 'Data Security',       color: '#059669' },
  ot:             { label: 'OT / ICS',            color: '#0891B2' },
  saas_security:  { label: 'SaaS Security',       color: '#4F46E5' },
  patch_mgmt:     { label: 'Patch Management',    color: '#DC2626' },
  devops:         { label: 'DevOps & Source',      color: '#24292E' },
  collaboration:  { label: 'Collaboration',       color: '#0052CC' },
  hris:           { label: 'HRIS',                color: '#73C41D' },
  crm:            { label: 'CRM',                 color: '#00A1E0' },
  incident:       { label: 'Incident',            color: '#06AC38' },
  dns:            { label: 'DNS & Domains',       color: '#1BDBDB' },
  pentest:        { label: 'Pen Testing',         color: '#EF4444' },
  risk:           { label: 'Risk',                color: '#6D28D9' },
}

// ── VendorLogo component ──────────────────────────────────────

export function VendorLogo({ vendor, src, name, size = 32, className }) {
  const [error, setError] = useState(false)

  // Resolve the image source
  const catalogEntry = vendor ? VENDOR_CATALOG[vendor] : null
  const displayName = name || (catalogEntry?.name) || vendor || '?'
  const imgSrc = src || (vendor ? new URL(`../assets/vendors/${vendor}.svg`, import.meta.url).href : null)

  // Fallback: initial letter avatar
  if (!imgSrc || error) {
    const letter = displayName[0].toUpperCase()
    const hue = displayName.split('').reduce((h, c) => h + c.charCodeAt(0), 0) % 360
    return (
      <div className={className} style={{
        width: size, height: size, borderRadius: size > 28 ? 8 : 4,
        flexShrink: 0,
        background: `hsl(${hue}, 45%, 55%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: size * 0.45, fontWeight: 700,
        fontFamily: 'var(--hk-font-sans)',
      }}>
        {letter}
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={displayName}
      onError={() => setError(true)}
      className={className}
      style={{
        width: size, height: size, borderRadius: size > 28 ? 8 : 4,
        flexShrink: 0, objectFit: 'contain',
        background: 'var(--hk-bg-subtle)',
      }}
    />
  )
}

export default VendorLogo
