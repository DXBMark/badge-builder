/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Presets Management Tab
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { Box, Typography, Button, Divider, List, ListItem, ListItemText, IconButton, Paper, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BASE_PRESETS } from '../../constants/presets';

/**
 * [TS] Controls for saving and loading presets.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const PresetsTab = ({ setConfig, customPresets, savePreset, deletePreset }) => (
  <Box sx={{ p: 1 }}>
    <Button
      fullWidth
      variant="contained"
      size="large"
      startIcon={<SaveIcon />}
      onClick={() => {
        const name = prompt("Enter preset name:");
        if (name) savePreset(name);
      }}
      sx={{ mb: 4, py: 1.5, borderRadius: 2 }}
    >
      Save Current Badge
    </Button>

    <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', display: 'block', mb: 1.5, borderBottom: '1px solid', borderColor: 'divider', pb: 0.5 }}>
      Standard Presets
    </Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5, mb: 4 }}>
      {Object.keys(BASE_PRESETS).map(p => (
        <Button
          key={p}
          variant="outlined"
          size="small"
          onClick={() => setConfig(BASE_PRESETS[p])}
          sx={{ 
            textTransform: 'uppercase', 
            fontSize: '0.625rem', 
            fontWeight: 800,
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'background.neutral' }
          }}
        >
          {p}
        </Button>
      ))}
    </Box>

    {Object.keys(customPresets).length > 0 && (
      <Box>
        <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', display: 'block', mb: 1.5, borderBottom: '1px solid', borderColor: 'divider', pb: 0.5 }}>
          My Library
        </Typography>
        <Stack spacing={1}>
          {Object.keys(customPresets).map(p => (
            <Paper 
              key={p}
              variant="outlined"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                p: 1,
                pl: 2,
                '&:hover': { borderColor: 'primary.main' }
              }}
            >
              <Box 
                component="button"
                onClick={() => setConfig(customPresets[p])}
                sx={{ 
                  flex: 1, 
                  textAlign: 'left', 
                  border: 'none', 
                  bgcolor: 'transparent', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{p}</Typography>
                <ArrowForwardIosIcon sx={{ fontSize: 10, color: 'text.disabled' }} />
              </Box>
              <IconButton size="small" color="error" onClick={() => deletePreset(p)}>
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      </Box>
    )}
  </Box>
);

export default PresetsTab;
