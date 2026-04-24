/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: Badge Presets
 * Notes: Follow TS conventions.
 */

export const BASE_PRESETS = {
  waqtor: {
    leftText: 'CHAOSS', rightText: 'DEI Bronze', width: 240, height: 48, leftWidth: 120, borderRadius: 8,
    leftBg: '#000000', rightBg: '#802050', useGradient: true, gradStart: '#a03060', gradEnd: '#601030',
    leftTextColor: '#FFFFFF', rightTextColor: '#FFFFFF', leftFontSize: 16, rightFontSize: 16,
    leftFontWeight: '700', rightFontWeight: '700', fontFamily: 'sans-serif',
    leftAlign: 0, leftAlignY: 0, rightAlign: 0, rightAlignY: 0,
    iconType: 'none', iconMode: 'preset', customIconUrl: '', customSvgContent: '',
    iconScale: 1, iconX: 8, iconY: 12, outlineWidth: 0, outlineColor: '#000000'
  },
  github: {
    leftText: 'build', rightText: 'passing', width: 120, height: 20, leftWidth: 50, borderRadius: 3,
    leftBg: '#555555', rightBg: '#44cc11', useGradient: false, gradStart: '#ffffff', gradEnd: '#000000',
    leftTextColor: '#FFFFFF', rightTextColor: '#FFFFFF', leftFontSize: 11, rightFontSize: 11,
    leftFontWeight: '400', rightFontWeight: '400', fontFamily: 'sans-serif',
    leftAlign: 0, leftAlignY: 0, rightAlign: 0, rightAlignY: 0,
    iconType: 'none', iconMode: 'preset', customIconUrl: '', customSvgContent: '',
    iconScale: 1, iconX: 8, iconY: 4, outlineWidth: 0, outlineColor: '#000000'
  },
  shields: {
    leftText: 'status', rightText: 'active', width: 100, height: 20, leftWidth: 50, borderRadius: 3,
    leftBg: '#555555', rightBg: '#007ec6', useGradient: false, gradStart: '#ffffff', gradEnd: '#000000',
    leftTextColor: '#FFFFFF', rightTextColor: '#FFFFFF', leftFontSize: 11, rightFontSize: 11,
    leftFontWeight: '400', rightFontWeight: '400', fontFamily: 'sans-serif',
    leftAlign: 0, leftAlignY: 0, rightAlign: 0, rightAlignY: 0,
    iconType: 'none', iconMode: 'preset', customIconUrl: '', customSvgContent: '',
    iconScale: 1, iconX: 8, iconY: 4, outlineWidth: 0, outlineColor: '#000000'
  },
  minimal: {
    leftText: 'v1.0.0', rightText: 'stable', width: 140, height: 32, leftWidth: 70, borderRadius: 16,
    leftBg: '#f1f5f9', rightBg: '#1e293b', useGradient: true, gradStart: '#1e293b', gradEnd: '#0f172a',
    leftTextColor: '#64748b', rightTextColor: '#FFFFFF', leftFontSize: 12, rightFontSize: 12,
    leftFontWeight: '600', rightFontWeight: '700', fontFamily: 'sans-serif',
    leftAlign: 0, leftAlignY: 0, rightAlign: 0, rightAlignY: 0,
    iconType: 'none', iconMode: 'preset', customIconUrl: '', customSvgContent: '',
    iconScale: 1, iconX: 8, iconY: 8, outlineWidth: 1, outlineColor: '#e2e8f0'
  }
};
