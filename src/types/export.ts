/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Export and Output Configuration Types
 * Notes: Follow TS conventions.
 */

export type ExportFormat = 'svg' | 'png' | 'markdown' | 'html';

export type ExportOptions = {
  fileName: string;
  format: ExportFormat;
  includeLink?: boolean;
  linkUrl?: string;
  scale?: number; // For PNG export
};

export type BadgeSnippet = {
  label: string;
  content: string;
  format: ExportFormat;
};
