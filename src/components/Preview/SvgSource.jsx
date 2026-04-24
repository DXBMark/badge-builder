/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI SVG Source Code Component
 * Notes: Fixed dark theme, icon colors, and code readability.
 */

import React, { useMemo } from 'react';
import { Paper, Box, Typography, IconButton, Tooltip, Chip, Tabs, Tab } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SvgSource = ({ svg, config, onCopy }) => {
  const [activeTab, setActiveTab] = React.useState('svg');

  const snippets = useMemo(() => {
    const md = `![${config.content.label}](https://img.shields.io/badge/${encodeURIComponent(config.content.label)}-${encodeURIComponent(config.content.value)}-${config.colors.valueBg.replace('#', '')})`;
    const html = `<img src="data:image/svg+xml;base64,${btoa(svg)}" alt="${config.content.label}" />`;
    const json = JSON.stringify(config, null, 2);
    const github = `[![${config.content.label}](https://raw.githubusercontent.com/DXBMark/badge-builder/main/badge.svg)](https://github.com/DXBMark/badge-builder)`;

    return {
      svg,
      markdown: md,
      html,
      json,
      github
    };
  }, [svg, config]);

  const activeContent = snippets[activeTab];

  return (
    <Paper sx={{ bgcolor: '#161C24', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Tab Navigation */}
      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.06)', bgcolor: '#0D1117' }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, val) => setActiveTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              minHeight: 40,
              fontSize: '0.6rem',
              color: '#4D5F70',
              fontWeight: 800,
              '&.Mui-selected': { color: 'primary.main' }
            },
            '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' }
          }}
        >
          <Tab value="svg" label="SVG" icon={<CodeIcon sx={{ fontSize: 14 }} />} iconPosition="start" />
          <Tab value="markdown" label="MARKDOWN" icon={<DescriptionIcon sx={{ fontSize: 14 }} />} iconPosition="start" />
          <Tab value="html" label="HTML" icon={<CodeIcon sx={{ fontSize: 14 }} />} iconPosition="start" />
          <Tab value="json" label="JSON" icon={<StorageIcon sx={{ fontSize: 14 }} />} iconPosition="start" />
          <Tab value="github" label="GH README" icon={<MenuBookIcon sx={{ fontSize: 14 }} />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Header bar with meta info */}
      <Box sx={{
        px: 3,
        py: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FF5F57' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FEBC2E' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#28C840' }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#4D5F70', fontWeight: 800, textTransform: 'uppercase', ml: 1 }}>
            output.{activeTab === 'json' ? 'json' : activeTab === 'markdown' ? 'md' : activeTab}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`${new Blob([activeContent]).size} B`}
            size="small"
            sx={{ height: 18, fontSize: '0.5rem', fontWeight: 900, bgcolor: 'rgba(255,255,255,0.05)', color: '#4D5F70', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <Tooltip title={`Copy ${activeTab.toUpperCase()}`} placement="top">
            <IconButton
              size="small"
              onClick={() => onCopy(activeContent, activeTab.toUpperCase())}
              sx={{ color: 'primary.main', bgcolor: 'rgba(0,171,85,0.1)', '&:hover': { bgcolor: 'rgba(0,171,85,0.2)' }, width: 24, height: 24 }}
            >
              <ContentCopyIcon sx={{ fontSize: 12 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Code area */}
      <Box sx={{ p: 2, maxHeight: 200, overflowY: 'auto' }}>
        <Box component="pre" sx={{ m: 0, fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', lineHeight: 1.6, color: '#919EAB', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {activeContent}
        </Box>
      </Box>
    </Paper>
  );
};

export default SvgSource;
