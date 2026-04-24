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
const LivePreview = ({ svg, onDragStart, dragState, statusMsg }) => {
  const isDragging = !!dragState;

  return (
  <Paper sx={{ overflow: 'hidden', borderRadius: 4, border: isDragging ? '2px solid' : '2px solid transparent', borderColor: isDragging ? 'primary.main' : 'transparent', transition: 'border-color 0.2s' }}>
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
      <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 900, color: isDragging ? 'primary.main' : 'text.secondary' }}>
        <Icon name="layout" size={12}/> Live Preview {isDragging ? '(Dragging...)' : '(Drag Elements)'}
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
        cursor: isDragging ? 'grabbing' : 'default',
        position: 'relative'
      }} 
      onMouseDown={onDragStart}
    >
      <Box sx={{ 
        filter: isDragging ? 'drop-shadow(0 30px 50px rgba(0,0,0,0.2))' : 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))', 
        transition: 'filter 0.3s',
        position: 'relative'
      }}>
        {/* Overlay grid when dragging to indicate bounds */}
        {isDragging && (
          <Box sx={{ 
            position: 'absolute', inset: -40, 
            border: '1px dashed', borderColor: 'primary.main', 
            borderRadius: 2, pointerEvents: 'none', opacity: 0.3,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)'
          }} />
        )}
        <div dangerouslySetInnerHTML={{ __html: svg }} style={{ pointerEvents: isDragging ? 'none' : 'auto' }} />
      </Box>
    </Box>
  </Paper>
)};

export default LivePreview;
