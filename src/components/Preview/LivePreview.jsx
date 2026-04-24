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
  Divider, Button
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
  <Paper sx={{ overflow: 'hidden', borderRadius: 4, border: isDragging ? '2px solid' : '1px solid', borderColor: isDragging ? 'primary.main' : 'divider', transition: 'all 0.2s' }}>
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
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 900, color: isDragging ? 'primary.main' : 'text.secondary', mr: 2 }}>
          {isDragging ? 'DRAGGING...' : 'PREVIEW'}
        </Typography>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20, my: 'auto' }} />
        
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Zoom Out"><IconButton size="small" onClick={() => handleZoom(-0.2)}><ZoomOut fontSize="inherit" /></IconButton></Tooltip>
          <Typography variant="caption" sx={{ minWidth: 35, textAlign: 'center', lineHeight: '28px', fontWeight: 900, color: 'primary.main' }}>{Math.round(zoom * 100)}%</Typography>
          <Tooltip title="Zoom In"><IconButton size="small" onClick={() => handleZoom(0.2)}><ZoomIn fontSize="inherit" /></IconButton></Tooltip>
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20, my: 'auto' }} />

        <ToggleButtonGroup
          size="small"
          value={bgMode}
          exclusive
          onChange={(_, val) => val && setBgMode(val)}
          sx={{ height: 28, '& .MuiToggleButton-root': { px: 1.5, fontSize: '0.65rem', fontWeight: 800 } }}
        >
          <ToggleButton value="transparent">GRID</ToggleButton>
          <ToggleButton value="light">LIGHT</ToggleButton>
          <ToggleButton value="dark">DARK</ToggleButton>
          <ToggleButton value="readme">GITHUB</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Fade in={!!statusMsg}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', mr: 2 }}>
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
        p: 0, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: BACKGROUNDS[bgMode],
        minHeight: 200,
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
        filter: isDragging ? 'drop-shadow(0 30px 50px rgba(0,0,0,0.3))' : 'none',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: previewMode === 'single' ? 0 : 6,
        bgcolor: previewMode === 'readme' ? '#ffffff' : 'transparent',
        borderRadius: previewMode === 'readme' ? 2 : 0,
        boxShadow: previewMode === 'readme' ? '0 0 40px rgba(0,0,0,0.1)' : 'none',
        border: previewMode === 'readme' ? '1px solid #e1e4e8' : 'none',
        maxWidth: '90%'
      }}>
        {/* Overlay grid when dragging */}
        {isDragging && (
          <Box sx={{ 
            position: 'absolute', inset: -20, 
            border: '2px dashed', borderColor: 'primary.main', 
            borderRadius: 2, pointerEvents: 'none', opacity: 0.5,
            background: 'rgba(0,171,85,0.02)'
          }} />
        )}
        
        {previewMode === 'readme' && (
          <Box sx={{ mb: 2, borderBottom: '1px solid #e1e4e8', pb: 1, width: '100%', minWidth: 300 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#0366d6', display: 'flex', alignItems: 'center', gap: 1 }}>
              <MenuBookIcon sx={{ fontSize: 16 }} /> README.md
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div dangerouslySetInnerHTML={{ __html: svg }} style={{ pointerEvents: isDragging ? 'none' : 'auto' }} />
        </Box>

        {previewMode === 'profile' && (
           <Box sx={{ mt: 3, width: '100%', display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', opacity: 0.5 }}>
             <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'divider' }} />
             <Box sx={{ width: 100, height: 10, borderRadius: 1, bgcolor: 'divider', mt: 1.5 }} />
           </Box>
        )}
      </Box>
    </Box>

    <Box sx={{ px: 3, py: 1.5, bgcolor: 'background.neutral', borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 2 }}>
      <Button 
        size="small" 
        variant="outlined" 
        startIcon={<ContentCopy fontSize="inherit" />}
        onClick={() => onCopy(svg, 'SVG Code')}
        sx={{ fontWeight: 800, fontSize: '0.65rem' }}
      >
        Copy SVG
      </Button>
      <Button 
        size="small" 
        variant="outlined" 
        startIcon={<ContentCopy fontSize="inherit" />}
        onClick={() => {
           // Basic MD copy for single badge
           const md = `![Badge](https://img.shields.io/badge/Preview-Badge-green)`;
           onCopy(md, 'Markdown Link');
        }}
        sx={{ fontWeight: 800, fontSize: '0.65rem' }}
      >
        Copy Markdown
      </Button>
      <Divider orientation="vertical" flexItem />
      <IconButton size="small" onClick={() => setZoom(1)} sx={{ ml: 'auto' }}><RestartAlt fontSize="small" /></IconButton>
    </Box>
  </Paper>
  );
};

export default LivePreview;
