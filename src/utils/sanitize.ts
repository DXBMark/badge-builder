/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Sanitization and Constraint Helpers
 * Notes: Follow TS conventions.
 */

/**
 * [TS] Escapes XML special characters.
 */
export const escapeXml = (unsafe: string | number = ''): string => {
  return unsafe.toString().replace(/[<>&"']/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'
  }[c as '<' | '>' | '&' | '"' | "'"] || c));
};

/**
 * [TS] Sanitizes a numeric value within min/max bounds.
 */
export const sanitize = (val: number | string, min: number, max: number): number => {
  const num = typeof val === 'number' ? val : parseFloat(val);
  return isNaN(num) ? min : Math.min(Math.max(num, min), max);
};
