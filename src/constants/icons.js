/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Icon Asset Library (Phase 4)
 * Notes: Combines Simple Icons and Lucide for a robust local icon system.
 */

import * as si from 'simple-icons';
import { icons as lucideIcons } from 'lucide';

// --- HELPER TO EXTRACT SVG FROM SIMPLE ICONS ---
// SimpleIcons objects have { title, slug, hex, source, svg, path }
const createSimpleIcon = (icon) => {
  if (!icon) return '';
  return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${icon.path}"/></svg>`;
};

// --- HELPER FOR INLINE BRAND ICONS ---
// Used as stable fallback for brands removed from simple-icons by company request.
const createBrandIcon = (path) => {
  if (!path) return '';
  return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${path}"/></svg>`;
};

// Stable inline paths for brands no longer in simple-icons v14+
const BRAND_PATHS = {
  // LinkedIn requested removal from simple-icons in v14
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  // Windows four-pane flag logo
  windows: 'M0 0v11h11V0zm13 0v11h11V0zm0 13v11h11V13zM0 13v11h11V13z',
};

// --- HELPER TO EXTRACT SVG FROM LUCIDE ---
// Lucide icons have a string representation if we convert them, or we can just use the SVG node.
// Actually, lucide exports icons as objects. Let's create a builder.
const createLucideIcon = (name) => {
  const icon = lucideIcons[name];
  if (!icon) return '';
  // Convert Lucide node tree to SVG string
  const attrs = Object.entries(icon[1] || {}).map(([k, v]) => `${k}="${v}"`).join(' ');
  const children = (icon[2] || []).map(child => {
    const childAttrs = Object.entries(child[1] || {}).map(([k, v]) => `${k}="${v}"`).join(' ');
    return `<${child[0]} ${childAttrs}></${child[0]}>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${name}" ${attrs}>${children}</svg>`;
};

export const ICON_CATEGORIES = [
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'devtools', label: 'DevTools' },
  { id: 'databases', label: 'Databases' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'os', label: 'OS' },
  { id: 'social', label: 'Social' },
  { id: 'generic', label: 'Generic' },
  { id: 'ci', label: 'CI/CD' },
  { id: 'package', label: 'Package Mgr' }
];

// Curated list of mapped icons
export const ICON_LIBRARY = {
  // Languages
  'javascript': { category: 'languages', svg: createSimpleIcon(si.siJavascript), defaultColor: `#${si.siJavascript?.hex}` },
  'typescript': { category: 'languages', svg: createSimpleIcon(si.siTypescript), defaultColor: `#${si.siTypescript?.hex}` },
  'python': { category: 'languages', svg: createSimpleIcon(si.siPython), defaultColor: `#${si.siPython?.hex}` },
  'go': { category: 'languages', svg: createSimpleIcon(si.siGo), defaultColor: `#${si.siGo?.hex}` },
  'rust': { category: 'languages', svg: createSimpleIcon(si.siRust), defaultColor: `#${si.siRust?.hex}` },
  'php': { category: 'languages', svg: createSimpleIcon(si.siPhp), defaultColor: `#${si.siPhp?.hex}` },
  'ruby': { category: 'languages', svg: createSimpleIcon(si.siRuby), defaultColor: `#${si.siRuby?.hex}` },
  'java': { category: 'languages', svg: createSimpleIcon(si.siOpenjdk), defaultColor: `#${si.siOpenjdk?.hex}` },

  // Frameworks
  'react': { category: 'frameworks', svg: createSimpleIcon(si.siReact), defaultColor: `#${si.siReact?.hex}` },
  'vue': { category: 'frameworks', svg: createSimpleIcon(si.siVuedotjs), defaultColor: `#${si.siVuedotjs?.hex}` },
  'angular': { category: 'frameworks', svg: createSimpleIcon(si.siAngular), defaultColor: `#${si.siAngular?.hex}` },
  'svelte': { category: 'frameworks', svg: createSimpleIcon(si.siSvelte), defaultColor: `#${si.siSvelte?.hex}` },
  'nextjs': { category: 'frameworks', svg: createSimpleIcon(si.siNextdotjs), defaultColor: `#${si.siNextdotjs?.hex}` },
  'django': { category: 'frameworks', svg: createSimpleIcon(si.siDjango), defaultColor: `#${si.siDjango?.hex}` },
  'laravel': { category: 'frameworks', svg: createSimpleIcon(si.siLaravel), defaultColor: `#${si.siLaravel?.hex}` },
  'spring': { category: 'frameworks', svg: createSimpleIcon(si.siSpring), defaultColor: `#${si.siSpring?.hex}` },

  // DevTools
  'git': { category: 'devtools', svg: createSimpleIcon(si.siGit), defaultColor: `#${si.siGit?.hex}` },
  'github': { category: 'devtools', svg: createSimpleIcon(si.siGithub), defaultColor: `#${si.siGithub?.hex}` },
  'gitlab': { category: 'devtools', svg: createSimpleIcon(si.siGitlab), defaultColor: `#${si.siGitlab?.hex}` },
  'docker': { category: 'devtools', svg: createSimpleIcon(si.siDocker), defaultColor: `#${si.siDocker?.hex}` },
  // siVisualstudiocode removed in simple-icons v14 — using VSCodium (same shield logo, FOSS twin)
  'vscode': { category: 'devtools', svg: createSimpleIcon(si.siVscodium), defaultColor: `#${si.siVscodium?.hex}` },
  'vim': { category: 'devtools', svg: createSimpleIcon(si.siVim), defaultColor: `#${si.siVim?.hex}` },

  // Databases
  'postgres': { category: 'databases', svg: createSimpleIcon(si.siPostgresql), defaultColor: `#${si.siPostgresql?.hex}` },
  'mysql': { category: 'databases', svg: createSimpleIcon(si.siMysql), defaultColor: `#${si.siMysql?.hex}` },
  'mongodb': { category: 'databases', svg: createSimpleIcon(si.siMongodb), defaultColor: `#${si.siMongodb?.hex}` },
  'redis': { category: 'databases', svg: createSimpleIcon(si.siRedis), defaultColor: `#${si.siRedis?.hex}` },
  'sqlite': { category: 'databases', svg: createSimpleIcon(si.siSqlite), defaultColor: `#${si.siSqlite?.hex}` },

  // Cloud
  // siAmazonwebservices removed in simple-icons v14 — Lucide Cloud with official AWS orange
  'aws': { category: 'cloud', svg: createLucideIcon('Cloud'), defaultColor: '#FF9900' },
  'gcp': { category: 'cloud', svg: createSimpleIcon(si.siGooglecloud), defaultColor: `#${si.siGooglecloud?.hex}` },
  // siMicrosoftazure removed in simple-icons v14 — Lucide CloudCog with official Azure blue
  'azure': { category: 'cloud', svg: createLucideIcon('CloudCog'), defaultColor: '#0078D4' },
  'vercel': { category: 'cloud', svg: createSimpleIcon(si.siVercel), defaultColor: `#${si.siVercel?.hex}` },
  'cloudflare': { category: 'cloud', svg: createSimpleIcon(si.siCloudflare), defaultColor: `#${si.siCloudflare?.hex}` },

  // OS
  'linux': { category: 'os', svg: createSimpleIcon(si.siLinux), defaultColor: `#${si.siLinux?.hex}` },
  'apple': { category: 'os', svg: createSimpleIcon(si.siApple), defaultColor: `#${si.siApple?.hex}` },
  // siWindows removed in simple-icons v14 — inline four-pane Windows flag path
  'windows': { category: 'os', svg: createBrandIcon(BRAND_PATHS.windows), defaultColor: '#0078D4' },
  'ubuntu': { category: 'os', svg: createSimpleIcon(si.siUbuntu), defaultColor: `#${si.siUbuntu?.hex}` },

  // Social
  'twitter': { category: 'social', svg: createSimpleIcon(si.siX), defaultColor: `#${si.siX?.hex}` },
  // siLinkedin removed in simple-icons v14 — stable inline brand path
  'linkedin': { category: 'social', svg: createBrandIcon(BRAND_PATHS.linkedin), defaultColor: '#0A66C2' },
  'youtube': { category: 'social', svg: createSimpleIcon(si.siYoutube), defaultColor: `#${si.siYoutube?.hex}` },
  'discord': { category: 'social', svg: createSimpleIcon(si.siDiscord), defaultColor: `#${si.siDiscord?.hex}` },

  // Package Mgr
  'npm': { category: 'package', svg: createSimpleIcon(si.siNpm), defaultColor: `#${si.siNpm?.hex}` },
  'yarn': { category: 'package', svg: createSimpleIcon(si.siYarn), defaultColor: `#${si.siYarn?.hex}` },
  'pnpm': { category: 'package', svg: createSimpleIcon(si.siPnpm), defaultColor: `#${si.siPnpm?.hex}` },
  'homebrew': { category: 'package', svg: createSimpleIcon(si.siHomebrew), defaultColor: `#${si.siHomebrew?.hex}` },

  // Generic (Lucide)
  'star': { category: 'generic', svg: createLucideIcon('Star'), defaultColor: '#FFD700' },
  'heart': { category: 'generic', svg: createLucideIcon('Heart'), defaultColor: '#FF5A5F' },
  'zap': { category: 'generic', svg: createLucideIcon('Zap'), defaultColor: '#F5A623' },
  'shield': { category: 'generic', svg: createLucideIcon('Shield'), defaultColor: '#4A90E2' },
  'terminal': { category: 'generic', svg: createLucideIcon('Terminal'), defaultColor: '#4A4A4A' },
  'code': { category: 'generic', svg: createLucideIcon('Code'), defaultColor: '#9B9B9B' },
  'box': { category: 'generic', svg: createLucideIcon('Box'), defaultColor: '#8B572A' },
  'check': { category: 'generic', svg: createLucideIcon('CheckCircle'), defaultColor: '#7ED321' },
  'alert': { category: 'generic', svg: createLucideIcon('AlertTriangle'), defaultColor: '#F8E71C' }
};

// Legacy fallback for old icon keys (maps to new keys)
export const LEGACY_ICON_MAP = {
  'github': ICON_LIBRARY['github']?.svg || '',
  'terminal': ICON_LIBRARY['terminal']?.svg || '',
  'code': ICON_LIBRARY['code']?.svg || '',
  'bolt': ICON_LIBRARY['zap']?.svg || '',
  'react': ICON_LIBRARY['react']?.svg || ''
};

export const ICON_MAP = LEGACY_ICON_MAP;

export const UI_ICONS = {
  'save': "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8",
  'delete': "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  'upload': "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  'download': "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  'copy': "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
};
