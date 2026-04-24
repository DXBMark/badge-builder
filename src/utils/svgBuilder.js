/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: SVG Generation Logic
 * Notes: Follow TS conventions.
 */

import { escapeXml, sanitize } from './sanitize';
import { ICON_MAP } from '../constants/icons';

/**
 * [TS] Builds the SVG string based on the provided configuration.
 * @param {Object} config
 * @returns {Object} { svg, width, height }
 */
export const buildSVG = (config) => {
  const {
    width, height, leftWidth, borderRadius, leftBg, rightBg, 
    useGradient, gradStart, gradEnd, leftText, rightText,
    leftTextColor, rightTextColor, leftFontSize, rightFontSize,
    leftFontWeight, rightFontWeight, fontFamily,
    leftAlign, leftAlignY, rightAlign, rightAlignY, 
    iconType, iconScale, iconX, iconY, outlineWidth, outlineColor,
    iconMode, customIconUrl, customSvgContent
  } = config;

  const safeWidth = sanitize(width, 40, 2000);
  const safeHeight = sanitize(height, 16, 500);
  const safeLeftWidth = sanitize(leftWidth, 0, safeWidth);
  const rightWidth = Math.max(0, safeWidth - safeLeftWidth);
  const r = sanitize(borderRadius, 0, safeHeight / 2);
  const iY = iconY !== undefined ? sanitize(iconY, -500, 500) : (safeHeight / 2) - (12 * sanitize(iconScale, 0.1, 5));

  const renderIcon = () => {
    if (iconMode === 'custom-svg' && customSvgContent) {
      return `<g data-drag="icon" style="cursor: grab;" transform="translate(${sanitize(iconX, -500, 500)}, ${iY}) scale(${sanitize(iconScale, 0.1, 5)})" fill="${escapeXml(leftTextColor)}">${customSvgContent}</g>`;
    }
    if (iconMode === 'custom' && customIconUrl) {
      return `<image data-drag="icon" style="cursor: grab;" href="${escapeXml(customIconUrl)}" x="${sanitize(iconX, -500, 500)}" y="${iY}" height="${24 * sanitize(iconScale, 0.1, 5)}" width="${24 * sanitize(iconScale, 0.1, 5)}" />`;
    }
    if (iconMode === 'preset' && iconType !== 'none' && ICON_MAP[iconType]) {
      return `<g data-drag="icon" style="cursor: grab;" transform="translate(${sanitize(iconX, -500, 500)}, ${iY}) scale(${sanitize(iconScale, 0.1, 5)})" stroke="${escapeXml(leftTextColor)}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">${ICON_MAP[iconType]}</g>`;
    }
    return '';
  };

  const leftFinalX = (safeLeftWidth / 2) + ((iconMode !== 'preset' || iconType !== 'none') ? 10 : 0) + Number(leftAlign || 0);
  const leftFinalY = (safeHeight / 2) + (leftFontSize / 2) - (leftFontSize * 0.12) + Number(leftAlignY || 0);
  
  const rightFinalX = safeLeftWidth + (rightWidth / 2) + Number(rightAlign || 0);
  const rightFinalY = (safeHeight / 2) + (rightFontSize / 2) - (rightFontSize * 0.12) + Number(rightAlignY || 0);

  const svgString = `
<svg width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="round-corner"><rect width="${safeWidth}" height="${safeHeight}" rx="${r}" /></clipPath>
    ${useGradient ? `
    <linearGradient id="grad-fin" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${escapeXml(gradStart)};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${escapeXml(gradEnd)};stop-opacity:1" />
    </linearGradient>` : ''}
  </defs>
  <g clip-path="url(#round-corner)">
    <rect width="${safeLeftWidth}" height="${safeHeight}" fill="${escapeXml(leftBg)}" />
    <rect x="${safeLeftWidth}" width="${rightWidth}" height="${safeHeight}" fill="${useGradient ? 'url(#grad-fin)' : escapeXml(rightBg)}" />
    ${outlineWidth > 0 ? `<rect width="${safeWidth}" height="${safeHeight}" fill="none" stroke="${escapeXml(outlineColor)}" stroke-width="${sanitize(outlineWidth, 0, 20) * 2}" rx="${r}" />` : ''}
  </g>
  ${renderIcon()}
  <g text-anchor="middle" font-family="${escapeXml(fontFamily)}">
    <text data-drag="leftText" style="cursor: grab;" x="${leftFinalX}" y="${leftFinalY}" fill="${escapeXml(leftTextColor)}" font-size="${sanitize(leftFontSize, 1, 100)}" font-weight="${escapeXml(leftFontWeight)}">${escapeXml(leftText)}</text>
    <text data-drag="rightText" style="cursor: grab;" x="${rightFinalX}" y="${rightFinalY}" fill="${escapeXml(rightTextColor)}" font-size="${sanitize(rightFontSize, 1, 100)}" font-weight="${escapeXml(rightFontWeight)}">${escapeXml(rightText)}</text>
  </g>
</svg>`.trim();

  return { svg: svgString, width: safeWidth, height: safeHeight };
};
