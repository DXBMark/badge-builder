/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Live Preview Component
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { Paper, Box, Typography, Fade } from '@mui/material';
import Icon from '../ui/Icon';

/**
 * [TS] MUI-styled live SVG badge preview.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const LivePreview = ({ svg, onDragStart, statusMsg }) => (
  <Paper sx={{ overflow: 'hidden', borderRadius: 4 }}>
    <Box sx={{ 
      px: 3, 
      py: 1.5, 
      borderBottom: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      bgcolor: 'background.neutral'
    }}>
      <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 900, color: 'text.secondary' }}>
        <Icon name="layout" size={12}/> Live Preview (Drag Elements)
      </Typography>
      <Fade in={!!statusMsg}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main' }}>
          {statusMsg}
        </Typography>
      </Fade>
    </Box>
    <Box 
      sx={{ 
        p: 10, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3MvLywXyWcmSEApQhoGBgYHBvLy8XECqhJkgCHCCsIEVCgAsjBBSBAA9XQAAAABJRU5ErkJggg==")',
        minHeight: 200,
        cursor: 'default'
      }} 
      onMouseDown={onDragStart}
    >
      <Box sx={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))', transition: 'transform 0.3s' }}>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </Box>
    </Box>
  </Paper>
);

export default LivePreview;
