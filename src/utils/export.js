/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: Export Utilities
 * Notes: Follow TS conventions.
 */

/**
 * [TS] Downloads a string as an SVG file.
 * @param {string} svgContent
 * @param {string} fileName
 */
export const downloadSVG = (svgContent, fileName = 'badge.svg') => {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * [TS] Converts SVG to PNG and downloads it.
 * @param {string} svgContent
 * @param {number} width
 * @param {number} height
 * @param {string} fileName
 */
export const downloadPNG = (svgContent, width, height, fileName = 'badge.png') => {
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const img = new Image();
  const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.drawImage(img, 0, 0, width, height);
    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  img.src = url;
};
