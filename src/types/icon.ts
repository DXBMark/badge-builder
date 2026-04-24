/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Icon Configuration Types
 * Notes: Follow TS conventions.
 */

export type IconMode = 'preset' | 'custom' | 'custom-svg' | 'none';

export type BadgeIconConfig = {
  type: string;
  mode: IconMode;
  url?: string;
  content?: string; // For raw SVG content
  scale: number;
  x: number;
  y: number;
  color?: string;
};
