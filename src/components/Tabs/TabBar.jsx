/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Tab Bar Component
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import GitHubIcon from '@mui/icons-material/GitHub';

const TABS = [
  { id: 'content', icon: <TextFieldsIcon />, label: 'Typo' },
  { id: 'layout', icon: <AspectRatioIcon />, label: 'Geo' },
  { id: 'style', icon: <PaletteIcon />, label: 'Style' },
  { id: 'icon', icon: <SettingsIcon />, label: 'Asset' },
  { id: 'presets', icon: <SaveIcon />, label: 'Presets' },
  { id: 'github', icon: <GitHubIcon />, label: 'GitHub' }
];

/**
 * [TS] MUI-based tab navigation.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const TabBar = ({ activeTab, onTabChange }) => {
  const currentIdx = TABS.findIndex(t => t.id === activeTab);
  
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs 
        value={currentIdx >= 0 ? currentIdx : 0} 
        onChange={(_, newValue) => onTabChange(TABS[newValue].id)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            minWidth: 80,
            fontSize: '0.625rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            py: 2
          }
        }}
      >
        {TABS.map(t => (
          <Tab 
            key={t.id} 
            icon={t.icon} 
            label={t.label} 
            iconPosition="top"
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabBar;
