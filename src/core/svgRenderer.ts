/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Core SVG Rendering Engine
 * Notes: Decoupled from React, pure function.
 */

import type { BadgeConfig } from '../types/badge';
import { ICON_MAP } from '../constants/icons';
import { escapeXml, sanitize } from '../utils/sanitize';

/**
 * [TS] Renders a BadgeConfig into a clean SVG string.
 */
export function renderBadgeSvg(config: BadgeConfig): string {
  const {
    geometry: g,
    typography: t,
    colors: c,
    border: b,
    icon: i,
    positioning: p,
    content: cnt
  } = config;

  const safeWidth = sanitize(g.width, 40, 2000);
  const safeHeight = sanitize(g.height, 16, 500);
  const leftWidth = sanitize(g.width * (g.splitRatio / 100), 0, safeWidth);
  const rightWidth = Math.max(0, safeWidth - leftWidth);
  const r = sanitize(g.radius, 0, safeHeight / 2);

  const renderIcon = () => {
    if (i.mode === 'none') return '';
    
    let content = '';
    let transform = `translate(${p.iconX}, ${p.iconY}) scale(${i.scale})`;
    
    if (i.mode === 'custom-svg' && i.content) {
      content = i.content;
    } else if (i.mode === 'custom' && i.url) {
      return `<image data-drag="icon" href="${escapeXml(i.url)}" x="${p.iconX}" y="${p.iconY}" height="${24 * i.scale}" width="${24 * i.scale}" style="cursor: grab;" />`;
    } else if (i.mode === 'preset' && (ICON_MAP as any)[i.type]) {
      content = (ICON_MAP as any)[i.type];
    }

    if (!content) return '';

    return `
    <g data-drag="icon" transform="${transform}" fill="${escapeXml(i.color || c.labelText)}" style="cursor: grab;">
      ${content}
    </g>`.trim();
  };

  const svg = `
<svg width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="round-corner">
      <rect width="${safeWidth}" height="${safeHeight}" rx="${r}" />
    </clipPath>
    ${c.gradientEnabled ? `
    <linearGradient id="grad-fin" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${escapeXml(c.gradientStart)};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${escapeXml(c.gradientEnd)};stop-opacity:1" />
    </linearGradient>` : ''}
  </defs>
  
  <g clip-path="url(#round-corner)">
    <rect width="${leftWidth}" height="${safeHeight}" fill="${escapeXml(c.labelBg)}" />
    <rect x="${leftWidth}" width="${rightWidth}" height="${safeHeight}" fill="${c.gradientEnabled ? 'url(#grad-fin)' : escapeXml(c.valueBg)}" />
    ${b.enabled ? `
    <rect width="${safeWidth}" height="${safeHeight}" fill="none" stroke="${escapeXml(c.borderColor)}" stroke-width="${b.width * 2}" rx="${r}" />
    ` : ''}
  </g>

  ${renderIcon()}

  <g text-anchor="middle" font-family="${escapeXml(t.fontFamily)}">
    <text data-drag="leftText" x="${p.labelX}" y="${p.labelY}" fill="${escapeXml(c.labelText)}" font-size="${t.labelSize}" font-weight="${t.labelWeight}" style="cursor: grab;">
      ${escapeXml(cnt.label)}
    </text>
    <text data-drag="rightText" x="${p.valueX}" y="${p.valueY}" fill="${escapeXml(c.valueText)}" font-size="${t.valueSize}" font-weight="${t.valueWeight}" style="cursor: grab;">
      ${escapeXml(cnt.value)}
    </text>
  </g>
</svg>`.trim();

  return svg;
}
