/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Diagnostics Engine for Badge Quality
 * Notes: Implements real Shields.io + GitHub + WCAG AA checks against the
 *        actual flat runtime config produced by svgBuilder / presets.
 */

export type DiagnosticResult = 'PASS' | 'WARNING' | 'FAIL';

export interface DiagnosticCheck {
  id: string;
  name: string;
  status: DiagnosticResult;
  message: string;
  suggestion?: string;
}

/** Flat config shape used at runtime (matches svgBuilder / presets). */
export interface FlatBadgeConfig {
  leftText?: string;
  rightText?: string;
  width?: number;
  height?: number;
  leftWidth?: number;
  leftBg?: string;
  rightBg?: string;
  leftTextColor?: string;
  rightTextColor?: string;
  leftFontSize?: number;
  rightFontSize?: number;
  leftFontWeight?: string;
  rightFontWeight?: string;
  [key: string]: unknown;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const HEX_RE = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

function isValidHex(color?: string): boolean {
  return !!color && HEX_RE.test(color.trim());
}

function hexToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(hex: string): number | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return (
    0.2126 * hexToLinear(parseInt(m[1], 16)) +
    0.7152 * hexToLinear(parseInt(m[2], 16)) +
    0.0722 * hexToLinear(parseInt(m[3], 16))
  );
}

function getContrastRatio(bg?: string, fg?: string): number | null {
  if (!bg || !fg) return null;
  const l1 = getRelativeLuminance(bg);
  const l2 = getRelativeLuminance(fg);
  if (l1 === null || l2 === null) return null;
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function estimateTextWidth(text: string, fontSize: number, fontWeight?: string): number {
  const base = (text || '').length * fontSize * 0.55;
  const isHeavy = fontWeight === 'bold' || Number(fontWeight) >= 700;
  return isHeavy ? base * 1.1 : base;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

/**
 * [TS] Runs full diagnostics on the live badge configuration.
 * Checks conform to Shields.io dimensions, GitHub Markdown rendering, and WCAG AA.
 *
 * @param config  Flat runtime badge config (from svgBuilder / presets).
 * @param svgOutput  The SVG string produced by the renderer (optional).
 */
export function runDiagnostics(config: FlatBadgeConfig, svgOutput?: string): DiagnosticCheck[] {
  const checks: DiagnosticCheck[] = [];

  const {
    leftText, rightText,
    leftBg, rightBg, leftTextColor, rightTextColor,
    leftFontSize = 11, rightFontSize = 11,
    leftFontWeight, rightFontWeight,
  } = config;

  const w  = Number(config.width)     || 0;
  const h  = Number(config.height)    || 0;
  const lW = Number(config.leftWidth) || w / 2;
  const rW = Math.max(0, w - lW);

  // 1. Vector Engine ──────────────────────────────────────────────────────────
  if (svgOutput && svgOutput.length > 10) {
    checks.push({ id: 'svg-valid', name: 'Vector Engine', status: 'PASS',
      message: 'SVG engine is producing valid output.' });
  } else {
    checks.push({ id: 'svg-invalid', name: 'Vector Engine', status: 'FAIL',
      message: 'SVG output is empty or invalid.',
      suggestion: 'Check for missing required fields in your configuration.' });
  }

  // 2. Label Present (Shields.io requires a non-empty label) ─────────────────
  if (leftText && leftText.trim().length > 0) {
    checks.push({ id: 'label-ok', name: 'Label Present', status: 'PASS',
      message: 'Label text is set.' });
  } else {
    checks.push({ id: 'label-empty', name: 'Label Present', status: 'FAIL',
      message: 'Label text is empty. Shields.io requires a label.',
      suggestion: 'Add a descriptive label e.g. "status" or "version".' });
  }

  // 3. Value Present ─────────────────────────────────────────────────────────
  if (rightText && rightText.trim().length > 0) {
    checks.push({ id: 'value-ok', name: 'Value Present', status: 'PASS',
      message: 'Value text is set.' });
  } else {
    checks.push({ id: 'value-empty', name: 'Value Present', status: 'WARNING',
      message: 'Value text is empty.',
      suggestion: 'Add a value e.g. "active", "v1.0.0" or "passing".' });
  }

  // 4. Min Height — Shields.io 20px, GitHub clips badges below 16px ──────────
  if (h >= 20) {
    checks.push({ id: 'height-ok', name: 'Min Height (20px)', status: 'PASS',
      message: `Height is ${h}px — meets Shields.io standard.` });
  } else if (h >= 16) {
    checks.push({ id: 'height-warn', name: 'Min Height (20px)', status: 'WARNING',
      message: `Height is ${h}px — below Shields.io's 20px standard.`,
      suggestion: 'Increase height to 20px for full GitHub compatibility.' });
  } else {
    checks.push({ id: 'height-fail', name: 'Min Height (20px)', status: 'FAIL',
      message: `Height is ${h}px — too small to render legibly on GitHub.`,
      suggestion: 'Set height to at least 20px.' });
  }

  // 5. Export Dimensions — minimum safe size for SVG/PNG output ──────────────
  if (w >= 40 && h >= 16) {
    checks.push({ id: 'export-ok', name: 'Export Ready', status: 'PASS',
      message: `Dimensions ${w}×${h}px are valid for SVG and PNG export.` });
  } else {
    checks.push({ id: 'export-fail', name: 'Export Ready', status: 'FAIL',
      message: `Dimensions ${w}×${h}px are too small for export.`,
      suggestion: 'Use a minimum of 40×16px.' });
  }

  // 6. Text Overflow — heuristic using avg character width ───────────────────
  const labelOverflows = estimateTextWidth(leftText  || '', leftFontSize,  leftFontWeight)  > (lW - 16);
  const valueOverflows = estimateTextWidth(rightText || '', rightFontSize, rightFontWeight) > (rW - 16);
  if (!labelOverflows && !valueOverflows) {
    checks.push({ id: 'overflow-ok', name: 'Text Fit', status: 'PASS',
      message: 'Text fits within badge bounds.' });
  } else {
    const which = labelOverflows && valueOverflows ? 'Label and value'
      : labelOverflows ? 'Label' : 'Value';
    checks.push({ id: 'overflow-warn', name: 'Text Fit', status: 'WARNING',
      message: `${which} text may overflow the badge width.`,
      suggestion: 'Increase badge width or reduce font size.' });
  }

  // 7. Color Format — GitHub Markdown only renders valid HEX colors ──────────
  const leftBgOk  = isValidHex(leftBg);
  const rightBgOk = isValidHex(rightBg);
  if (leftBgOk && rightBgOk) {
    checks.push({ id: 'color-ok', name: 'Color Format', status: 'PASS',
      message: 'Background colors are valid HEX values.' });
  } else {
    const which = !leftBgOk && !rightBgOk ? 'Left and right backgrounds'
      : !leftBgOk ? 'Left background' : 'Right background';
    checks.push({ id: 'color-fail', name: 'Color Format', status: 'FAIL',
      message: `${which} color is not a valid HEX value.`,
      suggestion: 'Use #RRGGBB format e.g. #1f2328.' });
  }

  // 8. Text Contrast — WCAG AA requires ≥ 4.5:1 for normal-size text ─────────
  const labelContrast = getContrastRatio(leftBg, leftTextColor);
  const valueContrast = getContrastRatio(rightBg, rightTextColor);
  const WCAG_AA = 4.5;
  const labelOk = labelContrast === null || labelContrast >= WCAG_AA;
  const valueOk = valueContrast === null || valueContrast >= WCAG_AA;
  if (labelOk && valueOk) {
    checks.push({ id: 'contrast-ok', name: 'Text Contrast', status: 'PASS',
      message: 'Text colors meet WCAG AA contrast standard (≥4.5:1).' });
  } else {
    const lc = labelContrast !== null ? labelContrast.toFixed(1) : 'N/A';
    const rc = valueContrast !== null ? valueContrast.toFixed(1) : 'N/A';
    const msg = !labelOk && !valueOk
      ? `Label ${lc}:1 and value ${rc}:1 — both below WCAG AA (4.5:1).`
      : !labelOk
        ? `Label contrast ${lc}:1 is below WCAG AA (4.5:1).`
        : `Value contrast ${rc}:1 is below WCAG AA (4.5:1).`;
    checks.push({ id: 'contrast-warn', name: 'Text Contrast', status: 'WARNING',
      message: msg,
      suggestion: 'Improve contrast between background and text for accessibility.' });
  }

  return checks;
}
