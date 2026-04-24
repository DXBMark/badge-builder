/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Icon Asset Library — 100 curated tech & programming icons
 * Notes: Simple Icons (v16) for branded logos. Inline SVG for generic/UI icons
 *        (replaces Lucide dependency which had runtime format issues).
 *        Brand paths for icons removed from simple-icons by corporate request.
 */

import * as si from 'simple-icons';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extracts SVG from a simple-icons v16 icon object. */
const si_ = (icon) => {
  if (!icon) return '';
  return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${icon.path}"/></svg>`;
};

/** Inline brand SVG for icons removed from simple-icons by company request. */
const brand_ = (path, hex = '000000') => ({
  svg: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${path}"/></svg>`,
  defaultColor: `#${hex}`,
});

/** Inline stroke/fill SVG for generic UI icons (no external dep). */
const generic_ = (svgBody, hex) => ({
  svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgBody}</svg>`,
  defaultColor: `#${hex}`,
});

const si_c = (icon, hex) => ({
  svg: si_(icon),
  defaultColor: icon ? `#${icon.hex}` : `#${hex}`,
});

// ─── Inline paths: brands removed from simple-icons ──────────────────────────
const BRAND_PATHS = {
  // LinkedIn (removed v14)
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  // Windows (removed v14)
  windows: 'M0 0v11h11V0zm13 0v11h11V0zm0 13v11h11V13zM0 13v11h11V13z',
  // AWS (removed v14) — simplified cloud-arrow shape
  aws: 'M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.072.056.144.056.208 0 .096-.056.192-.176.288l-.583.39a.443.443 0 0 1-.24.08c-.096 0-.192-.048-.288-.136a2.965 2.965 0 0 1-.344-.45 7.365 7.365 0 0 1-.296-.569c-.744.879-1.68 1.319-2.808 1.319-.8 0-1.44-.229-1.904-.687-.464-.457-.704-1.066-.704-1.824 0-.808.288-1.464.872-1.96.584-.496 1.36-.744 2.336-.744.32 0 .656.024 1.008.08.352.056.712.136 1.088.232v-.688c0-.72-.152-1.224-.448-1.52-.304-.296-.816-.44-1.544-.44-.336 0-.68.04-1.032.128a7.624 7.624 0 0 0-1.032.336 2.73 2.73 0 0 1-.336.128.59.59 0 0 1-.16.024c-.144 0-.216-.104-.216-.32v-.504c0-.168.024-.296.08-.368a.83.83 0 0 1 .32-.224c.336-.176.744-.32 1.224-.44A6.01 6.01 0 0 1 4 4.8c1.12 0 1.944.256 2.472.768.52.512.784 1.288.784 2.328v3.14zm-3.88 1.452c.312 0 .632-.056.968-.168.336-.112.636-.32.888-.608.152-.184.264-.384.32-.616.056-.232.088-.512.088-.84v-.408a8.12 8.12 0 0 0-.872-.16 7.2 7.2 0 0 0-.888-.056c-.632 0-1.096.128-1.408.392-.312.264-.464.632-.464 1.112 0 .456.12.8.352 1.04.232.232.568.352 1.016.312zm7.585.24c-.184 0-.304-.032-.384-.104-.08-.064-.152-.208-.216-.408L7.64 5.816a1.869 1.869 0 0 1-.096-.424c0-.168.08-.256.24-.256h.984c.192 0 .32.032.392.104.08.064.144.208.208.408l1.728 6.816 1.6-6.816c.056-.208.12-.344.2-.408.08-.064.216-.104.4-.104h.8c.192 0 .32.032.4.104.072.064.144.208.192.408l1.624 6.904 1.784-6.904c.064-.208.136-.344.208-.408.08-.064.208-.104.392-.104h.936c.16 0 .248.08.248.256 0 .048-.008.096-.016.152a1.47 1.47 0 0 1-.08.28l-2.232 7.408c-.064.208-.136.344-.216.408-.08.064-.208.104-.384.104h-.864c-.192 0-.32-.032-.4-.104-.072-.072-.144-.208-.2-.416L13.8 6.64l-1.592 6.52c-.064.208-.128.344-.2.416-.072.064-.208.104-.4.104zm11.88.288c-.528 0-1.056-.064-1.568-.192-.512-.128-.912-.264-1.184-.424-.168-.096-.288-.2-.328-.296a.744.744 0 0 1-.064-.288v-.528c0-.216.08-.32.232-.32.064 0 .128.008.192.032.064.024.16.064.264.112.352.16.736.288 1.144.376.416.088.824.136 1.24.136.656 0 1.168-.12 1.52-.352.352-.232.536-.576.536-1.016 0-.304-.096-.552-.288-.76-.192-.208-.552-.392-1.072-.56l-1.536-.48c-.776-.24-1.352-.6-1.712-1.072-.36-.464-.544-1-.544-1.584 0-.464.104-.872.312-1.224.208-.352.488-.664.832-.912.344-.256.736-.448 1.192-.584A4.871 4.871 0 0 1 21.4 4.8c.24 0 .488.016.728.048.248.032.472.08.688.136.208.056.408.12.592.192.184.072.328.144.432.216a.9.9 0 0 1 .304.288.664.664 0 0 1 .088.352v.488c0 .216-.08.328-.232.328a1.05 1.05 0 0 1-.384-.128 4.643 4.643 0 0 0-1.944-.408c-.6 0-1.072.104-1.4.32-.328.216-.496.544-.496.992 0 .304.104.568.312.776.208.208.6.408 1.168.592l1.504.48c.76.24 1.312.576 1.648 1.016.336.44.504.944.504 1.504 0 .472-.096.896-.288 1.264-.2.368-.472.688-.824.944-.352.264-.76.456-1.24.592-.496.144-1.024.208-1.6.208z',
  // Azure simplified
  azure: 'M13.05 4.24 6.56 18.05l5.78-.87-3.25-3.56 5.26-9.38zm-2.1-.24L3 16.66l2.95.52L14.56 4z',
};

// ─── Icon Library (100 icons) ────────────────────────────────────────────────
export const ICON_LIBRARY = {

  // ── Languages ──────────────────────────────────────────────────────────────
  'javascript':  si_c(si.siJavascript),
  'typescript':  si_c(si.siTypescript),
  'python':      si_c(si.siPython),
  'go':          si_c(si.siGo),
  'rust':        si_c(si.siRust),
  'php':         si_c(si.siPhp),
  'ruby':        si_c(si.siRuby),
  'java':        si_c(si.siOpenjdk),
  'kotlin':      si_c(si.siKotlin),
  'swift':       si_c(si.siSwift),
  'cpp':         si_c(si.siCplusplus),
  'c':           si_c(si.siC),
  'scala':       si_c(si.siScala),
  'dart':        si_c(si.siDart),
  'elixir':      si_c(si.siElixir),
  'haskell':     si_c(si.siHaskell),
  'lua':         si_c(si.siLua),
  'perl':        si_c(si.siPerl),
  'clojure':     si_c(si.siClojure),
  'solidity':    si_c(si.siSolidity),
  'bash':        si_c(si.siGnubash),

  // ── Frameworks & Libraries ─────────────────────────────────────────────────
  'react':       si_c(si.siReact),
  'vue':         si_c(si.siVuedotjs),
  'angular':     si_c(si.siAngular),
  'svelte':      si_c(si.siSvelte),
  'nextjs':      si_c(si.siNextdotjs),
  'nuxt':        si_c(si.siNuxt),
  'gatsby':      si_c(si.siGatsby),
  'remix':       si_c(si.siRemix),
  'astro':       si_c(si.siAstro),
  'flutter':     si_c(si.siFlutter),
  'express':     si_c(si.siExpress),
  'flask':       si_c(si.siFlask),
  'fastapi':     si_c(si.siFastapi),
  'nestjs':      si_c(si.siNestjs),
  'rails':       si_c(si.siRubyonrails),
  'django':      si_c(si.siDjango),
  'laravel':     si_c(si.siLaravel),
  'spring':      si_c(si.siSpring),
  'tailwind':    si_c(si.siTailwindcss),
  'bootstrap':   si_c(si.siBootstrap),
  'sass':        si_c(si.siSass),
  'graphql':     si_c(si.siGraphql),

  // ── DevTools & Editors ─────────────────────────────────────────────────────
  'git':         si_c(si.siGit),
  'github':      si_c(si.siGithub),
  'gitlab':      si_c(si.siGitlab),
  'bitbucket':   si_c(si.siBitbucket),
  'docker':      si_c(si.siDocker),
  'kubernetes':  si_c(si.siKubernetes),
  'terraform':   si_c(si.siTerraform),
  'ansible':     si_c(si.siAnsible),
  'vscode':      si_c(si.siVscodium),
  'intellij':    si_c(si.siIntellijidea),
  'webstorm':    si_c(si.siWebstorm),
  'jetbrains':   si_c(si.siJetbrains),
  'vim':         si_c(si.siVim),
  'neovim':      si_c(si.siNeovim),
  'vite':        si_c(si.siVite),
  'webpack':     si_c(si.siWebpack),
  'babel':       si_c(si.siBabel),
  'eslint':      si_c(si.siEslint),
  'prettier':    si_c(si.siPrettier),
  'postman':     si_c(si.siPostman),
  'insomnia':    si_c(si.siInsomnia),
  'figma':       si_c(si.siFigma),
  'nodejs':      si_c(si.siNodedotjs),
  'bun':         si_c(si.siBun),
  'deno':        si_c(si.siDeno),
  'nginx':       si_c(si.siNginx),

  // ── Databases ──────────────────────────────────────────────────────────────
  'postgres':    si_c(si.siPostgresql),
  'mysql':       si_c(si.siMysql),
  'mongodb':     si_c(si.siMongodb),
  'redis':       si_c(si.siRedis),
  'sqlite':      si_c(si.siSqlite),
  'elasticsearch': si_c(si.siElasticsearch),
  'firebase':    si_c(si.siFirebase),
  'supabase':    si_c(si.siSupabase),
  'neo4j':       si_c(si.siNeo4j),
  'mariadb':     si_c(si.siMariadb),
  'planetscale': si_c(si.siPlanetscale),
  'kafka':       si_c(si.siApachekafka),

  // ── Cloud & Hosting ────────────────────────────────────────────────────────
  'aws':         brand_('M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.072.056.144.056.208 0 .096-.056.192-.176.288l-.583.39a.443.443 0 0 1-.24.08c-.096 0-.192-.048-.288-.136a2.965 2.965 0 0 1-.344-.45 7.365 7.365 0 0 1-.296-.569c-.744.879-1.68 1.319-2.808 1.319-.8 0-1.44-.229-1.904-.687-.464-.457-.704-1.066-.704-1.824 0-.808.288-1.464.872-1.96.584-.496 1.36-.744 2.336-.744.32 0 .656.024 1.008.08.352.056.712.136 1.088.232v-.688c0-.72-.152-1.224-.448-1.52-.304-.296-.816-.44-1.544-.44-.336 0-.68.04-1.032.128a7.624 7.624 0 0 0-1.032.336 2.73 2.73 0 0 1-.336.128.59.59 0 0 1-.16.024c-.144 0-.216-.104-.216-.32v-.504c0-.168.024-.296.08-.368a.83.83 0 0 1 .32-.224c.336-.176.744-.32 1.224-.44A6.01 6.01 0 0 1 4 4.8c1.12 0 1.944.256 2.472.768.52.512.784 1.288.784 2.328v3.14zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', 'FF9900'),
  'gcp':         si_c(si.siGooglecloud),
  'azure':       brand_(BRAND_PATHS.azure, '0078D4'),
  'vercel':      si_c(si.siVercel),
  'netlify':     si_c(si.siNetlify),
  'cloudflare':  si_c(si.siCloudflare),
  'digitalocean': si_c(si.siDigitalocean),
  'flyio':       si_c(si.siFlydotio),

  // ── CI/CD ──────────────────────────────────────────────────────────────────
  'githubactions': si_c(si.siGithubactions),
  'jenkins':     si_c(si.siJenkins),
  'circleci':    si_c(si.siCircleci),
  'travisci':    si_c(si.siTravisci),

  // ── OS & Platform ──────────────────────────────────────────────────────────
  'linux':       si_c(si.siLinux),
  'ubuntu':      si_c(si.siUbuntu),
  'debian':      si_c(si.siDebian),
  'fedora':      si_c(si.siFedora),
  'apple':       si_c(si.siApple),
  'windows':     brand_(BRAND_PATHS.windows, '0078D4'),

  // ── Package Managers ───────────────────────────────────────────────────────
  'npm':         si_c(si.siNpm),
  'yarn':        si_c(si.siYarn),
  'pnpm':        si_c(si.siPnpm),
  'homebrew':    si_c(si.siHomebrew),

  // ── Social & Community ─────────────────────────────────────────────────────
  'twitter':     si_c(si.siX),
  'linkedin':    brand_(BRAND_PATHS.linkedin, '0A66C2'),
  'youtube':     si_c(si.siYoutube),
  'discord':     si_c(si.siDiscord),
  'stackoverflow': si_c(si.siStackoverflow),
  'devdotto':    si_c(si.siDevdotto),
  'hashnode':    si_c(si.siHashnode),
  'medium':      si_c(si.siMedium),
  'reddit':      si_c(si.siReddit),
  'telegram':    si_c(si.siTelegram),

  // ── Generic / UI (inline stroke SVG) ──────────────────────────────────────
  'star':    generic_('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>', 'FFD700'),
  'heart':   generic_('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>', 'FF5A5F'),
  'zap':     generic_('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', 'F5A623'),
  'shield':  generic_('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', '4A90E2'),
  'terminal':generic_('<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>', '4A4A4A'),
  'code':    generic_('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>', '9B9B9B'),
  'box':     generic_('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>', '8B572A'),
  'check':   generic_('<polyline points="20 6 9 17 4 12"/>', '7ED321'),
  'alert':   generic_('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', 'F8E71C'),
};

// ─── Legacy fallback ─────────────────────────────────────────────────────────
export const LEGACY_ICON_MAP = {
  'github':   ICON_LIBRARY['github']?.svg   || '',
  'terminal': ICON_LIBRARY['terminal']?.svg || '',
  'code':     ICON_LIBRARY['code']?.svg     || '',
  'bolt':     ICON_LIBRARY['zap']?.svg      || '',
  'react':    ICON_LIBRARY['react']?.svg    || '',
};

export const ICON_MAP = LEGACY_ICON_MAP;

export const ICON_CATEGORIES = [
  { id: 'languages',   label: 'Languages'   },
  { id: 'frameworks',  label: 'Frameworks'  },
  { id: 'devtools',    label: 'Dev Tools'   },
  { id: 'databases',   label: 'Databases'   },
  { id: 'cloud',       label: 'Cloud'       },
  { id: 'ci',          label: 'CI/CD'       },
  { id: 'os',          label: 'OS'          },
  { id: 'package',     label: 'Package Mgr' },
  { id: 'social',      label: 'Social'      },
  { id: 'generic',     label: 'Generic'     },
];

export const UI_ICONS = {
  'save':     'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8',
  'delete':   'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  'upload':   'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
  'download': 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  'copy':     'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2',
};
