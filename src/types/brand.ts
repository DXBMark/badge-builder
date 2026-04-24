/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Brand Kit Configuration Types
 * Notes: Follow TS conventions.
 */

export type BrandKit = {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    textLight: string;
    textDark: string;
    gradientStart: string;
    gradientEnd: string;
    border: string;
  };
  typography: {
    fontFamily: string;
  };
  geometry: {
    radius: number;
    borderWidth: number;
  };
  useGradient: boolean;
};
