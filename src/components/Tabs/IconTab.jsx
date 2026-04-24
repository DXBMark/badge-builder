/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Icon/Asset Customization Tab
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Slider, Paper, Button, Stack, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICON_MAP } from '../../constants/icons';

/**
 * [TS] Controls for icons and custom assets.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const IconTab = ({ config, update, onFileUpload }) => (
  <Box sx={{ p: 1 }}>
    <ToggleButtonGroup
      fullWidth
      value={config.iconMode === 'preset' ? 'preset' : 'custom'}
      exclusive
      onChange={(_, mode) => update('iconMode', mode === 'preset' ? 'preset' : 'custom-svg')}
      size="small"
      sx={{ mb: 3 }}
    >
      <ToggleButton value="preset" sx={{ fontWeight: 800, fontSize: '0.625rem' }}>LIBRARY</ToggleButton>
      <ToggleButton value="custom" sx={{ fontWeight: 800, fontSize: '0.625rem' }}>UPLOAD</ToggleButton>
    </ToggleButtonGroup>

    {config.iconMode === 'preset' ? (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
        {Object.keys(ICON_MAP).map(k => (
          <Paper
            key={k}
            component="button"
            onClick={() => update('iconType', k)}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              border: '2px solid',
              borderColor: config.iconType === k ? 'primary.main' : 'transparent',
              bgcolor: 'background.paper',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: 'background.neutral' }
            }}
          >
            <Box sx={{ 
              width: 24, 
              height: 24, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: config.iconType === k ? 'primary.main' : 'text.secondary'
            }}>
              {k === 'none' ? (
                <Typography variant="caption" sx={{ fontWeight: 900 }}>×</Typography>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: ICON_MAP[k] }} />
              )}
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.6rem', textTransform: 'uppercase', color: 'text.secondary' }}>
              {k}
            </Typography>
          </Paper>
        ))}
      </Box>
    ) : (
      <Stack spacing={2}>
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            borderStyle: 'dashed',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            position: 'relative',
            '&:hover': { bgcolor: 'background.neutral', borderColor: 'primary.main' }
          }}
        >
          <input 
            type="file" 
            accept=".svg,image/*" 
            onChange={onFileUpload} 
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
          />
          <CloudUploadIcon color="disabled" sx={{ fontSize: 32 }} />
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>
            UPLOAD SVG OR IMAGE
          </Typography>
        </Paper>

        {(config.customIconUrl || config.customSvgContent) && (
          <Paper sx={{ p: 1, pl: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'success.lighter' }}>
            <Typography variant="caption" sx={{ color: 'success.dark', fontWeight: 800 }}>
              ✓ ASSET LOADED
            </Typography>
            <IconButton size="small" color="error" onClick={() => { update('customIconUrl', ''); update('customSvgContent', ''); }}>
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Paper>
        )}
      </Stack>
    )}

    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary' }}>Icon Scale</Typography>
        <Typography variant="overline" sx={{ fontWeight: 900, color: 'primary.main' }}>{config.iconScale}x</Typography>
      </Box>
      <Slider
        size="small"
        min={0.1}
        max={3}
        step={0.1}
        value={Number(config.iconScale)}
        onChange={(_, v) => update('iconScale', v)}
        valueLabelDisplay="auto"
      />
    </Box>
  </Box>
);

export default IconTab;
