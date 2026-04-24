/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Preset and Template Types
 * Notes: Follow TS conventions.
 */

import { BadgeConfig } from './badge';

export type BadgePreset = {
  id: string;
  name: string;
  description?: string;
  config: Partial<BadgeConfig>;
  category: 'system' | 'custom' | 'featured';
};
