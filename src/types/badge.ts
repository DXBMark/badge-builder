/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Core Badge Configuration Type
 * Notes: Follow TS conventions.
 */

import type { BadgeIconConfig } from './icon';

export interface BadgeConfig {
  id: string;
  name: string;

  content: {
    label: string;
    value: string;
  };

  geometry: {
    width: number;
    height: number;
    splitRatio: number;
    radius: number;
    paddingX: number;
    paddingY: number;
  };

  typography: {
    fontFamily: string;
    labelSize: number;
    valueSize: number;
    labelWeight: string;
    valueWeight: string;
    letterSpacing: number;
  };

  colors: {
    labelBg: string;
    valueBg: string;
    labelText: string;
    valueText: string;
    borderColor: string;
    gradientEnabled: boolean;
    gradientStart: string;
    gradientEnd: string;
  };

  border: {
    width: number;
    enabled: boolean;
  };

  icon: BadgeIconConfig;

  positioning: {
    labelX: number;
    labelY: number;
    valueX: number;
    valueY: number;
    iconX: number;
    iconY: number;
  };

  meta: {
    createdAt: string;
    updatedAt: string;
    version: string;
  };
};
