/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI SVG Source Code Component
 * Notes: Fixed dark theme, icon colors, and code readability.
 */

import React, { useMemo, useState } from 'react';
import { Paper, Box, Typography, IconButton, Tooltip, Chip, Tabs, Tab, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SvgSource = ({ svg, config, onCopy }) => {
  const [activeTab, setActiveTab] = React.useState('svg');
  const [expanded, setExpanded] = useState(false);

  const snippets = useMemo(() => {
    const md = `![${config.leftText}](https://img.shields.io/badge/${encodeURIComponent(config.leftText)}-${encodeURIComponent(config.rightText)}-${config.rightBg.replace('#', '')})`;
    let htmlSnippet = '';
    try {
      const bytes = new TextEncoder().encode(svg);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
      const safeB64 = btoa(binString);
      htmlSnippet = `<img src="data:image/svg+xml;base64,${safeB64}" alt="${config.leftText}" />`;
    } catch (e) {
      console.error("[TS Error] SvgSource encoding failed:", e);
      htmlSnippet = '<!-- Error: Unable to encode SVG to Base64 -->';
    }
    const json = JSON.stringify(config, null, 2);
    const github = `[![${config.leftText}](https://raw.githubusercontent.com/DXBMark/badge-builder/main/badge.svg)](https://github.com/DXBMark/badge-builder)`;

    return {
      svg,
      markdown: md,
      html: htmlSnippet,
      json,
      github
    };
  }, [svg, config]);

  const activeContent = snippets[activeTab];

  return (
    <Paper sx={{ bgcolor: '#161C24', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
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

      {/* Code area — collapsed or expanded */}
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            p: 2,
            maxHeight: expanded ? 'none' : 130,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}
        >
          <Box component="pre" sx={{ m: 0, fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', lineHeight: 1.6, color: '#919EAB', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {activeContent}
          </Box>
        </Box>

        {/* Gradient fade + View More / Collapse */}
        {!expanded && (
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(transparent, #161C24)', pointerEvents: 'none' }} />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.5, bgcolor: '#161C24' }}>
          <Button
            size="small"
            onClick={() => setExpanded(v => !v)}
            endIcon={<ExpandMoreIcon sx={{ fontSize: 14, transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />}
            sx={{ fontSize: '0.6rem', fontWeight: 800, color: '#4D5F70', textTransform: 'uppercase', letterSpacing: '0.08em', '&:hover': { color: 'primary.main' } }}
          >
            {expanded ? 'Collapse' : 'View Full'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SvgSource;
