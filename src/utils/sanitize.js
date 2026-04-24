/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: Sanitization and Constraint Helpers
 * Notes: Follow TS conventions.
 */

/**
 * [TS] Escapes XML special characters.
 * @param {string} unsafe
 * @returns {string}
 */
export const escapeXml = (unsafe = '') => {
  return unsafe.toString().replace(/[<>&"']/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'
  }[c] || c));
};

/**
 * [TS] Sanitizes a numeric value within min/max bounds.
 * @param {number|string} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const sanitize = (val, min, max) => {
  const num = parseFloat(val);
  return isNaN(num) ? min : Math.min(Math.max(num, min), max);
};
/**
 * [TS] Calculates contrast color (black or white) for a given hex color.
 * @param {string} hex
 * @returns {string}
 */
export const getContrastColor = (hex) => {
  if (!hex || hex.length < 6) return '#FFFFFF';
  const color = hex.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
};
