/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Live Preview Component
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { 
  Paper, Box, Typography, Fade, IconButton, 
  Tooltip, ToggleButtonGroup, ToggleButton, Stack,
  Divider
} from '@mui/material';
import ZoomIn from '@mui/icons-material/ZoomIn';
import ZoomOut from '@mui/icons-material/ZoomOut';
import RestartAlt from '@mui/icons-material/RestartAlt';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Visibility from '@mui/icons-material/Visibility';
import GridView from '@mui/icons-material/GridView';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Icon from '../ui/Icon';

const BACKGROUNDS = {
  transparent: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3MvLywXyWcmSEApQhoGBgYHBvLy8XECqhJkgCHCCsIEVCgAsjBBSBAA9XQAAAABJRU5ErkJggg==")',
  light: '#ffffff',
  dark: '#0d1117',
  readme: '#ffffff'
};

const LivePreview = ({ svg, onDragStart, dragState, statusMsg, onCopy }) => {
  const [zoom, setZoom] = React.useState(1);
  const [bgMode, setBgMode] = React.useState('transparent');
  const [previewMode, setPreviewMode] = React.useState('single'); // 'single', 'readme', 'profile'
  
  const isDragging = !!dragState;

  const handleZoom = (delta) => setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));

  return (
  <Paper sx={{ overflow: 'hidden', borderRadius: 4, border: isDragging ? '2px solid' : '2px solid transparent', borderColor: isDragging ? 'primary.main' : 'transparent', transition: 'border-color 0.2s' }}>
    <Box sx={{ 
      px: 2, 
      py: 1, 
      borderBottom: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      bgcolor: 'background.neutral'
    }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 900, color: isDragging ? 'primary.main' : 'text.secondary', mr: 2 }}>
          <Icon name="layout" size={12}/> {isDragging ? 'DRAGGING...' : 'LIVE PREVIEW'}
        </Typography>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20, my: 'auto' }} />
        
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Zoom Out"><IconButton size="small" onClick={() => handleZoom(-0.2)}><ZoomOut fontSize="inherit" /></IconButton></Tooltip>
          <Typography variant="caption" sx={{ minWidth: 30, textAlign: 'center', lineHeight: '28px', fontWeight: 800 }}>{Math.round(zoom * 100)}%</Typography>
          <Tooltip title="Zoom In"><IconButton size="small" onClick={() => handleZoom(0.2)}><ZoomIn fontSize="inherit" /></IconButton></Tooltip>
          <Tooltip title="Reset Zoom"><IconButton size="small" onClick={() => setZoom(1)}><RestartAlt fontSize="inherit" /></IconButton></Tooltip>
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20, my: 'auto' }} />

        <ToggleButtonGroup
          size="small"
          value={bgMode}
          exclusive
          onChange={(_, val) => val && setBgMode(val)}
          sx={{ height: 28 }}
        >
          <Tooltip title="Transparent"><ToggleButton value="transparent" sx={{ px: 1 }}>TR</ToggleButton></Tooltip>
          <Tooltip title="Light"><ToggleButton value="light" sx={{ px: 1 }}>LT</ToggleButton></Tooltip>
          <Tooltip title="Dark"><ToggleButton value="dark" sx={{ px: 1 }}>DK</ToggleButton></Tooltip>
          <Tooltip title="GitHub README"><ToggleButton value="readme" sx={{ px: 1 }}>GH</ToggleButton></Tooltip>
        </ToggleButtonGroup>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Fade in={!!statusMsg}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main' }}>
            {statusMsg}
          </Typography>
        </Fade>
        <ToggleButtonGroup
          size="small"
          value={previewMode}
          exclusive
          onChange={(_, val) => val && setPreviewMode(val)}
          sx={{ height: 28 }}
        >
          <Tooltip title="Single Badge"><ToggleButton value="single"><Visibility fontSize="inherit" /></ToggleButton></Tooltip>
          <Tooltip title="README Context"><ToggleButton value="readme"><MenuBookIcon fontSize="inherit" /></ToggleButton></Tooltip>
          <Tooltip title="Profile Context"><ToggleButton value="profile"><GridView fontSize="inherit" /></ToggleButton></Tooltip>
        </ToggleButtonGroup>
      </Stack>
    </Box>

    <Box 
      sx={{ 
        p: 4, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: BACKGROUNDS[bgMode],
        minHeight: 300,
        cursor: isDragging ? 'grabbing' : 'default',
        position: 'relative',
        transition: 'background 0.3s ease',
        overflow: 'auto'
      }} 
      onMouseDown={onDragStart}
    >
      <Box sx={{ 
        transform: `scale(${zoom})`,
        transition: 'transform 0.2s ease, filter 0.3s',
        filter: isDragging ? 'drop-shadow(0 30px 50px rgba(0,0,0,0.2))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
        position: 'relative',
        p: previewMode === 'single' ? 0 : 4,
        bgcolor: previewMode === 'readme' ? '#ffffff' : 'transparent',
        borderRadius: previewMode === 'readme' ? 2 : 0,
        boxShadow: previewMode === 'readme' ? '0 0 20px rgba(0,0,0,0.05)' : 'none',
        maxWidth: '100%'
      }}>
        {/* Overlay grid when dragging */}
        {isDragging && (
          <Box sx={{ 
            position: 'absolute', inset: -20, 
            border: '1px dashed', borderColor: 'primary.main', 
            borderRadius: 2, pointerEvents: 'none', opacity: 0.3,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.01) 10px, rgba(0,0,0,0.01) 20px)'
          }} />
        )}
        
        {previewMode === 'readme' && (
          <Box sx={{ mb: 2, borderBottom: '1px solid #e1e4e8', pb: 1, width: 400 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#0366d6' }}>README.md</Typography>
          </Box>
        )}

        <div dangerouslySetInnerHTML={{ __html: svg }} style={{ pointerEvents: isDragging ? 'none' : 'auto' }} />
      </Box>

      {/* Quick Actions Overlay */}
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ 
          position: 'absolute', 
          bottom: 16, 
          right: 16, 
          bgcolor: 'rgba(255,255,255,0.8)', 
          backdropFilter: 'blur(4px)',
          p: 0.5, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Tooltip title="Copy SVG Code"><IconButton size="small" onClick={() => onCopy(svg, 'SVG')}><ContentCopy fontSize="inherit" /></IconButton></Tooltip>
        <Tooltip title="Preview Fullscreen"><IconButton size="small"><Visibility fontSize="inherit" /></IconButton></Tooltip>
      </Stack>
    </Box>
  </Paper>
)};

export default LivePreview;
