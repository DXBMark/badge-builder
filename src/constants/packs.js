/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Built-in Badge Packs definitions
 * Notes: items use kind:'local' (has config) or kind:'external' (has markdownTemplate + tokens).
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Resolves {{token}} placeholders in a markdownTemplate string */
export const resolveTemplate = (template, inputs = {}) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => inputs[key] || `{{${key}}}`);

// ─── Data ─────────────────────────────────────────────────────────────────────

export const BUILT_IN_PACKS = [
  {
    id: 'developer-profile',
    name: 'Developer Profile Pack',
    description: 'Essential badging for your GitHub profile README.',
    requiredInputs: [],
    items: [
      { id: 'i1', kind: 'local', config: { leftText: 'Followers', rightText: '1.2k', rightBg: '#0f172a', leftBg: '#f8fafc', leftTextColor: '#0f172a', iconType: 'GitHub', iconMode: 'preset' } },
      { id: 'i2', kind: 'local', config: { leftText: 'Stars', rightText: '45', rightBg: '#eab308', leftBg: '#27272a', leftTextColor: '#fff', iconType: 'GitHub', iconMode: 'preset' } },
      { id: 'i3', kind: 'local', config: { leftText: 'Profile Views', rightText: '5,000+', rightBg: '#10b981', leftBg: '#18181b', leftTextColor: '#fff', iconType: 'none', iconMode: 'preset' } },
    ]
  },
  {
    id: 'react-project',
    name: 'React Project Pack',
    description: 'Standard tech stack and framework badges for a React app.',
    requiredInputs: ['owner', 'repo', 'branch', 'workflow'],
    items: [
      { id: 'i1', kind: 'local', config: { leftText: 'React', rightText: 'v19.0.0', rightBg: '#61dafb', leftBg: '#20232a', leftTextColor: '#fff', rightTextColor: '#000', iconType: 'React', iconMode: 'preset' } },
      { id: 'i2', kind: 'local', config: { leftText: 'Vite', rightText: 'v8.0', rightBg: '#646cff', leftBg: '#1e1e20', leftTextColor: '#fff', iconType: 'Vite', iconMode: 'preset' } },
      { id: 'i3', kind: 'local', config: { leftText: 'TypeScript', rightText: '5.x', rightBg: '#3178c6', leftBg: '#1e1e20', leftTextColor: '#fff', iconType: 'TypeScript', iconMode: 'preset' } },
      { id: 'i4', kind: 'external', label: 'Build', markdownTemplate: '![Build](https://github.com/{{owner}}/{{repo}}/actions/workflows/{{workflow}}/badge.svg?branch={{branch}})' },
      { id: 'i5', kind: 'external', label: 'License', markdownTemplate: '![License](https://img.shields.io/github/license/{{owner}}/{{repo}})' },
    ]
  },
  {
    id: 'python-package',
    name: 'Python Package Pack',
    description: 'Badges specific to Python packages (PyPI, Python versions, tests).',
    requiredInputs: ['owner', 'repo', 'pypiPackage'],
    items: [
      { id: 'i1', kind: 'local', config: { leftText: 'Python', rightText: '3.10 | 3.12', rightBg: '#3776ab', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'Python', iconMode: 'preset' } },
      { id: 'i2', kind: 'external', label: 'PyPI Version', markdownTemplate: '![PyPI](https://img.shields.io/pypi/v/{{pypiPackage}})' },
      { id: 'i3', kind: 'external', label: 'Tests', markdownTemplate: '![Tests](https://github.com/{{owner}}/{{repo}}/actions/workflows/tests.yml/badge.svg)' },
      { id: 'i4', kind: 'external', label: 'Coverage', markdownTemplate: '![Coverage](https://codecov.io/gh/{{owner}}/{{repo}}/branch/main/graph/badge.svg)' },
      { id: 'i5', kind: 'external', label: 'License', markdownTemplate: '![License](https://img.shields.io/github/license/{{owner}}/{{repo}})' },
    ]
  },
  {
    id: 'django-project',
    name: 'Django Project Pack',
    description: 'Tech stack badges for Python/Django projects.',
    requiredInputs: ['owner', 'repo'],
    items: [
      { id: 'i1', kind: 'local', config: { leftText: 'Django', rightText: 'v5.0', rightBg: '#092e20', leftBg: '#388e3c', leftTextColor: '#fff', rightTextColor: '#fff', iconType: 'Django', iconMode: 'preset' } },
      { id: 'i2', kind: 'local', config: { leftText: 'PostgreSQL', rightText: 'v16', rightBg: '#336791', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'PostgreSQL', iconMode: 'preset' } },
      { id: 'i3', kind: 'local', config: { leftText: 'Docker', rightText: 'Ready', rightBg: '#2496ed', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'Docker', iconMode: 'preset' } },
      { id: 'i4', kind: 'external', label: 'Tests', markdownTemplate: '![Tests](https://github.com/{{owner}}/{{repo}}/actions/workflows/tests.yml/badge.svg)' },
      { id: 'i5', kind: 'external', label: 'Coverage', markdownTemplate: '![Coverage](https://codecov.io/gh/{{owner}}/{{repo}}/branch/main/graph/badge.svg)' },
    ]
  },
  {
    id: 'docker-project',
    name: 'Docker Project Pack',
    description: 'Ideal for containerized deployments and images.',
    requiredInputs: ['dockerUser', 'dockerImage'],
    items: [
      { id: 'i1', kind: 'local', config: { leftText: 'Docker', rightText: 'Ready', rightBg: '#2496ed', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'Docker', iconMode: 'preset' } },
      { id: 'i2', kind: 'external', label: 'Image Size', markdownTemplate: '![Docker Image Size](https://img.shields.io/docker/image-size/{{dockerUser}}/{{dockerImage}})' },
      { id: 'i3', kind: 'external', label: 'Docker Pulls', markdownTemplate: '![Docker Pulls](https://img.shields.io/docker/pulls/{{dockerUser}}/{{dockerImage}})' },
      { id: 'i4', kind: 'local', config: { leftText: 'Compose', rightText: 'Supported', rightBg: '#2496ed', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'none', iconMode: 'preset' } },
    ]
  },
  {
    id: 'cicd',
    name: 'CI/CD Pack',
    description: 'Badges indicating build, test, and release statuses.',
    requiredInputs: ['owner', 'repo', 'branch', 'workflow'],
    items: [
      { id: 'i1', kind: 'external', label: 'Build', markdownTemplate: '![Build](https://github.com/{{owner}}/{{repo}}/actions/workflows/{{workflow}}/badge.svg?branch={{branch}})' },
      { id: 'i2', kind: 'external', label: 'Coverage', markdownTemplate: '![Coverage](https://codecov.io/gh/{{owner}}/{{repo}}/branch/{{branch}}/graph/badge.svg)' },
      { id: 'i3', kind: 'external', label: 'Release', markdownTemplate: '![Release](https://img.shields.io/github/v/release/{{owner}}/{{repo}})' },
      { id: 'i4', kind: 'external', label: 'Last Commit', markdownTemplate: '![Last Commit](https://img.shields.io/github/last-commit/{{owner}}/{{repo}}/{{branch}})' },
    ]
  },
  {
    id: 'open-source',
    name: 'Open Source Pack',
    description: 'Social and license badges for OSS repositories.',
    requiredInputs: ['owner', 'repo'],
    items: [
      { id: 'i1', kind: 'external', label: 'Stars', markdownTemplate: '![Stars](https://img.shields.io/github/stars/{{owner}}/{{repo}}?style=social)' },
      { id: 'i2', kind: 'external', label: 'Forks', markdownTemplate: '![Forks](https://img.shields.io/github/forks/{{owner}}/{{repo}}?style=social)' },
      { id: 'i3', kind: 'external', label: 'Issues', markdownTemplate: '![Issues](https://img.shields.io/github/issues/{{owner}}/{{repo}})' },
      { id: 'i4', kind: 'external', label: 'License', markdownTemplate: '![License](https://img.shields.io/github/license/{{owner}}/{{repo}})' },
      { id: 'i5', kind: 'local', config: { leftText: 'PRs', rightText: 'welcome', rightBg: '#10b981', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'GitHub', iconMode: 'preset' } },
    ]
  },
  {
    id: 'npm-package',
    name: 'NPM Package Pack',
    description: 'Badges specific to frontend/Node.js NPM packages.',
    requiredInputs: ['npmPackage'],
    items: [
      { id: 'i1', kind: 'external', label: 'npm version', markdownTemplate: '![npm](https://img.shields.io/npm/v/{{npmPackage}})' },
      { id: 'i2', kind: 'external', label: 'Downloads', markdownTemplate: '![Downloads](https://img.shields.io/npm/dm/{{npmPackage}})' },
      { id: 'i3', kind: 'external', label: 'Bundle Size', markdownTemplate: '![Bundle Size](https://img.shields.io/bundlephobia/min/{{npmPackage}})' },
      { id: 'i4', kind: 'local', config: { leftText: 'Node.js', rightText: 'Compatible', rightBg: '#4c1', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'Node.js', iconMode: 'preset' } },
    ]
  },
  {
    id: 'documentation',
    name: 'Documentation Pack',
    description: 'Showcase your docs, API status, and style guides.',
    requiredInputs: [],
    items: [
      { id: 'i1', kind: 'local', config: { leftText: 'Docs', rightText: 'passing', rightBg: '#4c1', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'Read the Docs', iconMode: 'preset' } },
      { id: 'i2', kind: 'local', config: { leftText: 'Storybook', rightText: 'deployed', rightBg: '#ff4785', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'Storybook', iconMode: 'preset' } },
      { id: 'i3', kind: 'local', config: { leftText: 'Style', rightText: 'Prettier', rightBg: '#f7b93e', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'Prettier', iconMode: 'preset' } },
      { id: 'i4', kind: 'local', config: { leftText: 'Maintained', rightText: 'yes', rightBg: '#4c1', leftBg: '#5a5a5a', leftTextColor: '#fff', iconType: 'none', iconMode: 'preset' } },
    ]
  },
  {
    id: 'portfolio',
    name: 'Portfolio Pack',
    description: 'Quickly display your personal social and contact links.',
    requiredInputs: [],
    items: [
      { id: 'i1', kind: 'local', config: { autoWidth: true, leftText: '', rightText: 'Twitter', rightBg: '#1da1f2', rightTextColor: '#fff', leftBg: '#1da1f2', leftWidth: 0, iconType: 'Twitter', iconMode: 'preset' } },
      { id: 'i2', kind: 'local', config: { autoWidth: true, leftText: '', rightText: 'LinkedIn', rightBg: '#0a66c2', rightTextColor: '#fff', leftBg: '#0a66c2', leftWidth: 0, iconType: 'LinkedIn', iconMode: 'preset' } },
      { id: 'i3', kind: 'local', config: { autoWidth: true, leftText: '', rightText: 'Email Me', rightBg: '#d14836', rightTextColor: '#fff', leftBg: '#d14836', leftWidth: 0, iconType: 'Gmail', iconMode: 'preset' } },
    ]
  },
];

/** Input field labels for requiredInputs keys */
export const INPUT_LABELS = {
  owner: 'GitHub Owner / Username',
  repo: 'Repository Name',
  branch: 'Branch (e.g. main)',
  workflow: 'Workflow file (e.g. ci.yml)',
  pypiPackage: 'PyPI Package Name',
  npmPackage: 'npm Package Name',
  dockerUser: 'Docker Hub Username',
  dockerImage: 'Docker Image Name',
};

