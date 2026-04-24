/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: Drag and Drop Hook
 * Notes: Follow TS conventions.
 */

import { useState, useCallback } from 'react';

/**
 * [TS] Manages drag state for badge elements.
 * @param {Object} config - Current badge configuration.
 * @param {Function} setConfig - Dispatch function to update configuration.
 * @returns {Object} { handleDragStart, handleDragMove, handleDragEnd, dragState }
 */
export const useDrag = (config, setConfig) => {
  const [dragState, setDragState] = useState(null);

  const handleDragStart = useCallback((e) => {
    const el = e.target.closest('[data-drag]');
    if (!el) return;
    const target = el.getAttribute('data-drag');
    
    let keyX, keyY;
    if (target === 'leftText') { keyX = 'leftAlign'; keyY = 'leftAlignY'; }
    if (target === 'rightText') { keyX = 'rightAlign'; keyY = 'rightAlignY'; }
    if (target === 'icon') { keyX = 'iconX'; keyY = 'iconY'; }

    setDragState({
      target, keyX, keyY,
      startX: e.clientX, startY: e.clientY,
      initX: Number(config[keyX]) || 0,
      initY: Number(config[keyY]) || 0
    });
  }, [config]);

  const handleDragMove = useCallback((e) => {
    if (!dragState) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;

    // Clamp coordinates to stay roughly within badge limits (-500 to +500)
    const clamp = (val) => Math.max(-1000, Math.min(1000, val));

    setConfig(prev => ({
      ...prev,
      [dragState.keyX]: clamp(dragState.initX + dx),
      [dragState.keyY]: clamp(dragState.initY + dy)
    }));
  }, [dragState, setConfig]);

  const handleDragEnd = useCallback(() => {
    setDragState(null);
  }, []);

  return { handleDragStart, handleDragMove, handleDragEnd, dragState };
};
