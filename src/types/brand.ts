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
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  logoUrl?: string;
};
