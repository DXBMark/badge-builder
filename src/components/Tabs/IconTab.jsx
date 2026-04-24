/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Icon/Asset Customization Tab
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { 
  Box, Typography, ToggleButtonGroup, ToggleButton, Slider, Paper, Button, Stack, Tooltip, IconButton,
  TextField, InputAdornment, Grid
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { ICON_LIBRARY, ICON_CATEGORIES, LEGACY_ICON_MAP } from '../../constants/icons';

const IconTab = ({ config, update, onFileUpload }) => {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');
  
  // Backwards compatibility for old config keys
  const activeIconKey = config.iconType;

  const filteredIcons = React.useMemo(() => {
    return Object.entries(ICON_LIBRARY).filter(([key, data]) => {
      const matchCat = category === 'all' || data.category === category;
      const matchSearch = key.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <Box sx={{ p: 1 }}>
      <ToggleButtonGroup
        fullWidth
        value={config.iconMode === 'preset' ? 'preset' : 'custom'}
        exclusive
        onChange={(_, mode) => mode && update('iconMode', mode === 'preset' ? 'preset' : 'custom-svg')}
        size="small"
        sx={{ mb: 3 }}
      >
        <ToggleButton value="preset" sx={{ fontWeight: 800, fontSize: '0.625rem' }}>ICON LIBRARY</ToggleButton>
        <ToggleButton value="custom" sx={{ fontWeight: 800, fontSize: '0.625rem' }}>CUSTOM ASSETS</ToggleButton>
      </ToggleButtonGroup>

      {config.iconMode === 'preset' ? (
        <Stack spacing={2}>
          <TextField 
            fullWidth
            size="small"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 20 }} /></InputAdornment>,
              sx: { borderRadius: 3, bgcolor: 'background.neutral' }
            }}
          />

          <Box sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 } }}>
            <ToggleButtonGroup
              size="small"
              value={category}
              exclusive
              onChange={(_, val) => val && setCategory(val)}
              sx={{ display: 'flex', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid !important', borderRadius: '12px !important' } }}
            >
              <ToggleButton value="all" sx={{ px: 2, py: 0.5, fontSize: '0.65rem' }}>All</ToggleButton>
              {ICON_CATEGORIES.map(cat => (
                <ToggleButton key={cat.id} value={cat.id} sx={{ whiteSpace: 'nowrap', px: 2, py: 0.5, fontSize: '0.65rem' }}>
                  {cat.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: 'background.default', maxHeight: 400, overflowY: 'auto' }}>
            <Grid container spacing={1.5}>
              <Grid item xs={3}>
                <Paper
                  component="button"
                  onClick={() => update('iconType', 'none')}
                  sx={{
                    width: '100%', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', border: '2px solid', borderColor: activeIconKey === 'none' ? 'primary.main' : 'divider',
                    bgcolor: 'background.paper', '&:hover': { borderColor: 'primary.main' }
                  }}
                >
                  <Typography variant="h6" color="text.secondary">×</Typography>
                </Paper>
              </Grid>

              {filteredIcons.map(([k, data]) => (
                <Grid item xs={3} key={k}>
                  <Paper
                    component="button"
                    onClick={() => update('iconType', k)}
                    sx={{
                      width: '100%', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: 0.5, cursor: 'pointer', border: '2px solid', borderColor: activeIconKey === k ? 'primary.main' : 'divider',
                      bgcolor: 'background.paper', transition: 'all 0.1s', '&:hover': { borderColor: 'primary.main', transform: 'scale(1.05)' }
                    }}
                  >
                    <Box sx={{ width: 24, height: 24, color: activeIconKey === k ? 'primary.main' : 'text.secondary', display: 'flex' }} dangerouslySetInnerHTML={{ __html: data.svg }} />
                    <Typography variant="caption" sx={{ fontSize: '0.55rem', fontWeight: 700, color: 'text.secondary', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', px: 0.5, textAlign: 'center' }}>
                      {k}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Paper
            variant="outlined"
            sx={{
              p: 4, borderStyle: 'dashed', borderColor: 'divider', display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 1, position: 'relative', '&:hover': { bgcolor: 'background.neutral', borderColor: 'primary.main' }
            }}
          >
            <input 
              type="file" 
              accept=".svg,.png" 
              onChange={onFileUpload} 
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
            <CloudUploadIcon color="disabled" sx={{ fontSize: 32 }} />
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>
              UPLOAD ASSET (SVG/PNG)
            </Typography>
          </Paper>

          {(config.customIconUrl || config.customSvgContent) && (
            <Paper sx={{ p: 1, pl: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light' }}>
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
};

export default IconTab;
