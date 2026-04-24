/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Local Storage Service Layer
 * Notes: Centralized storage management.
 */

import { BadgeConfig } from '../types/badge';
import { BadgePreset } from '../types/preset';
import { BrandKit } from '../types/brand';

const STORAGE_KEYS = {
  CURRENT_BADGE: 'bbp.currentBadge',
  SAVED_PRESETS: 'bbp.savedPresets',
  BRAND_KITS: 'bbp.brandKits',
  RECENT_ICONS: 'bbp.recentIcons',
  SETTINGS: 'bbp.settings',
};

export const storage = {
  /**
   * [TS] Current Badge Operations
   */
  saveCurrentBadge: (config: BadgeConfig) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_BADGE, JSON.stringify(config));
  },
  
  loadCurrentBadge: (): BadgeConfig | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_BADGE);
    return data ? JSON.parse(data) : null;
  },

  /**
   * [TS] Presets Operations
   */
  savePresets: (presets: BadgePreset[]) => {
    localStorage.setItem(STORAGE_KEYS.SAVED_PRESETS, JSON.stringify(presets));
  },

  loadPresets: (): BadgePreset[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_PRESETS);
    return data ? JSON.parse(data) : [];
  },

  /**
   * [TS] Brand Kit Operations
   */
  saveBrandKits: (kits: BrandKit[]) => {
    localStorage.setItem(STORAGE_KEYS.BRAND_KITS, JSON.stringify(kits));
  },

  loadBrandKits: (): BrandKit[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BRAND_KITS);
    return data ? JSON.parse(data) : [];
  },

  /**
   * [TS] Utility
   */
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
};
