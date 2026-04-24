/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI SVG Source Code Component
 * Notes: Fixed dark theme, icon colors, and code readability.
 */

import React from 'react';
import { Paper, Box, Typography, IconButton, Tooltip, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';

/**
 * [TS] Colorizes SVG source code tokens for readability.
 */
const buildColorizedLines = (svg) => {
  if (!svg) return [];
  
  // Split into lines and apply simple color rules
  return svg.split('\n').map((line, i) => {
    let color = '#919EAB'; // default grey

    if (line.trim().startsWith('<!--')) color = '#637381'; // comments
    else if (line.trim().startsWith('<svg') || line.trim().startsWith('</svg')) color = '#00AB55'; // root tag
    else if (line.trim().startsWith('<defs') || line.trim().startsWith('</defs')) color = '#1CCAFF';
    else if (line.trim().startsWith('<rect') || line.trim().startsWith('<text') || line.trim().startsWith('<g') || line.trim().startsWith('</g')) color = '#69D2FF';
    else if (line.trim().startsWith('<linearGradient') || line.trim().startsWith('</linearGradient') || line.trim().startsWith('<stop')) color = '#FFD666';
    else if (line.trim().startsWith('<clipPath') || line.trim().startsWith('</clipPath')) color = '#FF8080';

    return { text: line, color, key: i };
  });
};

/**
 * [TS] Dark-themed code viewer for SVG source with improved readability.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const SvgSource = ({ svg, onCopy }) => {
  const lines = buildColorizedLines(svg);

  return (
    <Paper sx={{ bgcolor: '#161C24', borderRadius: 4, overflow: 'hidden' }}>
      {/* Header bar */}
      <Box sx={{
        px: 3,
        py: 1.5,
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#0D1117'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Mac-style window dots */}
          <Box sx={{ display: 'flex', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF5F57' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FEBC2E' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28C840' }} />
          </Box>
          <Typography
            variant="overline"
            sx={{ color: '#4D5F70', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 900, fontSize: '0.625rem' }}
          >
            <CodeIcon sx={{ fontSize: 14, color: '#4D5F70' }} /> badge.svg
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label="SVG"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.55rem',
              fontWeight: 900,
              bgcolor: 'rgba(0, 171, 85, 0.12)',
              color: '#00AB55',
              border: '1px solid rgba(0,171,85,0.3)',
              borderRadius: 0.75
            }}
          />
          <Tooltip title="Copy SVG Code" placement="top">
            <IconButton
              size="small"
              onClick={() => onCopy(svg, 'SVG')}
              sx={{
                color: '#637381',
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 1,
                width: 28,
                height: 28,
                '&:hover': { color: '#FFFFFF', bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Code area with line numbers */}
      <Box sx={{ p: 2.5, maxHeight: 240, overflowY: 'auto' }}>
        <Box component="pre" sx={{ m: 0, fontFamily: '"Fira Code", monospace', fontSize: '0.72rem', lineHeight: 1.7 }}>
          {lines.map(({ text, color, key }) => (
            <Box key={key} component="span" sx={{ display: 'block', color, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              <Box component="span" sx={{ color: '#2A3441', userSelect: 'none', mr: 2, minWidth: 20, display: 'inline-block', textAlign: 'right', fontSize: '0.65rem' }}>
                {key + 1}
              </Box>
              {text}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer: byte count */}
      <Box sx={{ px: 3, py: 1, borderTop: '1px solid rgba(255,255,255,0.04)', bgcolor: '#0D1117', display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="caption" sx={{ color: '#2A3441', fontFamily: 'monospace', fontSize: '0.6rem' }}>
          {new Blob([svg]).size} bytes
        </Typography>
      </Box>
    </Paper>
  );
};

export default SvgSource;
