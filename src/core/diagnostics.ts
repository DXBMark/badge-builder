/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Diagnostics Engine for Badge Quality
 * Notes: Implements Shields.io and accessibility checks.
 */

import { BadgeConfig } from '../types/badge';

export type DiagnosticResult = 'PASS' | 'WARNING' | 'FAIL';

export interface DiagnosticCheck {
  id: string;
  name: string;
  status: DiagnosticResult;
  message: string;
  suggestion?: string;
}

/**
 * [TS] Runs full diagnostics on a badge configuration.
 */
export function runDiagnostics(config: BadgeConfig): DiagnosticCheck[] {
  const checks: DiagnosticCheck[] = [];

  // 1. Label Content
  if (!config.content.label.trim()) {
    checks.push({
      id: 'label-empty',
      name: 'Label Content',
      status: 'FAIL',
      message: 'Label text is empty.',
      suggestion: 'Add a descriptive label (e.g., "status" or "version").'
    });
  } else {
    checks.push({ id: 'label-ok', name: 'Label Content', status: 'PASS', message: 'Label is present.' });
  }

  // 2. Value Content
  if (!config.content.value.trim()) {
    checks.push({
      id: 'value-empty',
      name: 'Value Content',
      status: 'FAIL',
      message: 'Value text is empty.',
      suggestion: 'Add a value (e.g., "active" or "v1.0.0").'
    });
  } else {
    checks.push({ id: 'value-ok', name: 'Value Content', status: 'PASS', message: 'Value is present.' });
  }

  // 3. Minimum Height (Shields.io standard)
  if (config.geometry.height < 20) {
    checks.push({
      id: 'height-small',
      name: 'Badge Height',
      status: 'WARNING',
      message: 'Height is below standard 20px.',
      suggestion: 'Increase height to 20px for better readability on GitHub.'
    });
  } else {
    checks.push({ id: 'height-ok', name: 'Badge Height', status: 'PASS', message: 'Height meets standard.' });
  }

  // 4. Color Validation
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\(/;
  if (!colorRegex.test(config.colors.labelBg) || !colorRegex.test(config.colors.valueBg)) {
    checks.push({
      id: 'color-invalid',
      name: 'Color Format',
      status: 'FAIL',
      message: 'Invalid color format detected.',
      suggestion: 'Use HEX (#FFFFFF) or RGB/RGBA formats.'
    });
  }

  // 5. Overflow Check (Simple heuristic)
  const estimatedTextWidth = (config.content.label.length + config.content.value.length) * 7;
  if (estimatedTextWidth > config.geometry.width) {
    checks.push({
      id: 'text-overflow',
      name: 'Text Fit',
      status: 'WARNING',
      message: 'Text might overflow badge width.',
      suggestion: 'Increase badge width or decrease font size.'
    });
  }

  return checks;
}
