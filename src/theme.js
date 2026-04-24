/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Theme Configuration
 * Notes: Minimal Dashboard inspiration with Dark Mode support.
 */

import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#212B36', contrastText: '#FFFFFF' },
          secondary: { main: '#00AB55', contrastText: '#FFFFFF' },
          background: { default: '#F9FAFB', paper: '#FFFFFF', neutral: '#F4F6F8' },
          text: { primary: '#212B36', secondary: '#637381', disabled: '#919EAB' },
          divider: 'rgba(145, 158, 171, 0.2)',
          success: { main: '#00AB55', lighter: '#C8FACD', dark: '#007B55' },
          error: { main: '#FF4842', lighter: '#FFE7D9', dark: '#B71D18' },
        }
      : {
          primary: { main: '#FFFFFF', contrastText: '#212B36' },
          secondary: { main: '#00AB55', contrastText: '#FFFFFF' },
          background: { default: '#161C24', paper: '#212B36', neutral: '#28323D' },
          text: { primary: '#FFFFFF', secondary: '#919EAB', disabled: '#637381' },
          divider: 'rgba(145, 158, 171, 0.24)',
          success: { main: '#00AB55', lighter: 'rgba(0, 171, 85, 0.16)', dark: '#5BE584' },
          error: { main: '#FF4842', lighter: 'rgba(255, 72, 66, 0.16)', dark: '#FFA48D' },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Public Sans", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
        containedPrimary: {
          backgroundColor: mode === 'light' ? '#212B36' : '#FFFFFF',
          color: mode === 'light' ? '#FFFFFF' : '#212B36',
          '&:hover': { backgroundColor: mode === 'light' ? '#454F5B' : '#DFE3E8' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: mode === 'light' 
            ? '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'
            : '0 0 2px 0 rgba(0, 0, 0, 0.2), 0 12px 24px -4px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
    },
    MuiSelect: {
      defaultProps: { size: 'small' },
    },
  },
});

export const getTheme = (mode) => createTheme(getDesignTokens(mode));
export default getTheme('light');
