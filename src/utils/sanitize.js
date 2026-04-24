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
