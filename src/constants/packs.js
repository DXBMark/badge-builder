/*
 * Project: SVG Badge Builder
 * Author: DXBMark Ltd.
 * Purpose: Built-in Badge Packs definitions
 */

export const BUILT_IN_PACKS = [
  {
    id: 'developer-profile',
    name: 'Developer Profile Pack',
    description: 'Essential badging for your GitHub profile README.',
    badges: [
      { leftText: 'Followers', rightText: '1.2k', rightBg: '#0f172a', leftBg: '#f8fafc', leftTextColor: '#0f172a', iconType: 'GitHub', iconMode: 'preset' },
      { leftText: 'Stars', rightText: '45', rightBg: '#eab308', leftBg: '#27272a', iconType: 'GitHub', iconMode: 'preset' },
      { leftText: 'Profile Views', rightText: '5,000+', rightBg: '#10b981', leftBg: '#18181b', iconType: 'none', iconMode: 'preset' },
    ]
  },
  {
    id: 'react-project',
    name: 'React Project Pack',
    description: 'Standard tech stack and framework badges for a React app.',
    badges: [
      { leftText: 'React', rightText: 'v19.0.0', rightBg: '#61dafb', leftBg: '#20232a', leftTextColor: '#fff', rightTextColor: '#000', iconType: 'React', iconMode: 'preset' },
      { leftText: 'Material UI', rightText: 'v9.0', rightBg: '#007fff', leftBg: '#212121', iconType: 'MUI', iconMode: 'preset' },
      { leftText: 'Vite', rightText: 'v8.0', rightBg: '#646cff', leftBg: '#1e1e20', iconType: 'Vite', iconMode: 'preset' }
    ]
  },
  {
    id: 'python-package',
    name: 'Python Package Pack',
    description: 'Badges specific to Python packages (PyPI, Python versions, tests).',
    badges: [
      { leftText: 'Python', rightText: '3.10 | 3.11 | 3.12', rightBg: '#3776ab', leftBg: '#5a5a5a', iconType: 'Python', iconMode: 'preset' },
      { leftText: 'PyPI', rightText: 'v1.0.0', rightBg: '#0073b7', leftBg: '#5a5a5a', iconType: 'PyPI', iconMode: 'preset' },
      { leftText: 'Tests', rightText: 'passing', rightBg: '#4c1', leftBg: '#5a5a5a', iconType: 'Pytest', iconMode: 'preset' }
    ]
  },
  {
    id: 'django-project',
    name: 'Django Project Pack',
    description: 'Tech stack badges for Python/Django projects.',
    badges: [
      { leftText: 'Django', rightText: 'v5.0', rightBg: '#092e20', leftBg: '#5a5a5a', iconType: 'Django', iconMode: 'preset' },
      { leftText: 'PostgreSQL', rightText: 'v16', rightBg: '#336791', leftBg: '#5a5a5a', iconType: 'PostgreSQL', iconMode: 'preset' },
      { leftText: 'Celery', rightText: 'v5.3', rightBg: '#37814a', leftBg: '#5a5a5a', iconType: 'Celery', iconMode: 'preset' }
    ]
  },
  {
    id: 'docker-project',
    name: 'Docker Project Pack',
    description: 'Ideal for containerized deployments and images.',
    badges: [
      { leftText: 'Docker', rightText: 'Ready', rightBg: '#2496ed', leftBg: '#5a5a5a', iconType: 'Docker', iconMode: 'preset' },
      { leftText: 'Image Size', rightText: '112 MB', rightBg: '#4c1', leftBg: '#5a5a5a', iconType: 'none', iconMode: 'preset' },
      { leftText: 'Compose', rightText: 'Supported', rightBg: '#2496ed', leftBg: '#5a5a5a', iconType: 'none', iconMode: 'preset' }
    ]
  },
  {
    id: 'cicd',
    name: 'CI/CD Pack',
    description: 'Badges indicating build, test, and release statuses.',
    badges: [
      { leftText: 'Build', rightText: 'passing', rightBg: '#4c1', leftBg: '#5a5a5a', iconType: 'GitHub Actions', iconMode: 'preset' },
      { leftText: 'Coverage', rightText: '95%', rightBg: '#97ca00', leftBg: '#5a5a5a', iconType: 'Codecov', iconMode: 'preset' },
      { leftText: 'Release', rightText: 'automated', rightBg: '#007ec6', leftBg: '#5a5a5a', iconType: 'none', iconMode: 'preset' }
    ]
  },
  {
    id: 'open-source',
    name: 'Open Source Pack',
    description: 'Social and license badges for OSS repositories.',
    badges: [
      { leftText: 'License', rightText: 'MIT', rightBg: '#0284c7', leftBg: '#5a5a5a', iconType: 'Open Source Initiative', iconMode: 'preset' },
      { leftText: 'PRs', rightText: 'welcome', rightBg: '#10b981', leftBg: '#5a5a5a', iconType: 'GitHub', iconMode: 'preset' },
      { leftText: 'Contributors', rightText: '24', rightBg: '#f59e0b', leftBg: '#5a5a5a', iconType: 'none', iconMode: 'preset' }
    ]
  },
  {
    id: 'npm-package',
    name: 'NPM Package Pack',
    description: 'Badges specific to frontend/Node.js NPM packages.',
    badges: [
      { leftText: 'npm', rightText: 'v2.1.0', rightBg: '#cb3837', leftBg: '#5a5a5a', iconType: 'npm', iconMode: 'preset' },
      { leftText: 'Downloads', rightText: '10k/month', rightBg: '#4c1', leftBg: '#5a5a5a', iconType: 'none', iconMode: 'preset' },
      { leftText: 'Dependencies', rightText: 'up to date', rightBg: '#4c1', leftBg: '#5a5a5a', iconType: 'Node.js', iconMode: 'preset' }
    ]
  },
  {
    id: 'documentation',
    name: 'Documentation Pack',
    description: 'Showcase your docs and style guides.',
    badges: [
      { leftText: 'Docs', rightText: 'passing', rightBg: '#4c1', leftBg: '#5a5a5a', iconType: 'Read the Docs', iconMode: 'preset' },
      { leftText: 'Storybook', rightText: 'deployed', rightBg: '#ff4785', leftBg: '#5a5a5a', iconType: 'Storybook', iconMode: 'preset' },
      { leftText: 'Style', rightText: 'Prettier', rightBg: '#f7b93e', leftBg: '#5a5a5a', iconType: 'Prettier', iconMode: 'preset' }
    ]
  },
  {
    id: 'portfolio',
    name: 'Portfolio Pack',
    description: 'Quickly display your personal social and contact links.',
    badges: [
      { autoWidth: true, rightText: 'Twitter', rightBg: '#1da1f2', rightTextColor: '#fff', leftWidth: 0, iconType: 'Twitter', iconMode: 'preset' },
      { autoWidth: true, rightText: 'LinkedIn', rightBg: '#0a66c2', rightTextColor: '#fff', leftWidth: 0, iconType: 'LinkedIn', iconMode: 'preset' },
      { autoWidth: true, rightText: 'Email Me', rightBg: '#d14836', rightTextColor: '#fff', leftWidth: 0, iconType: 'Gmail', iconMode: 'preset' }
    ]
  }
];
