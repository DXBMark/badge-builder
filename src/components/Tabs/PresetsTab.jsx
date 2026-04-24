/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Presets Management Tab
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { 
  Box, Typography, Button, Divider, IconButton, Paper, Stack, 
  Grid, Tooltip, TextField, InputAdornment, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_PRESETS, PRESET_CATEGORIES } from '../../constants/presets';
import { buildSVG } from '../../utils/svgBuilder';

const PresetCard = ({ preset, onApply, onDelete, isCustom = false }) => {
  // Responsive preview: replace fixed width with 100% and drop height
  // The SVG viewBox ensures correct aspect ratio scaling.
  const svgPreview = React.useMemo(() => {
    const raw = buildSVG(preset.config).svg;
    return raw
      .replace(/width="[0-9.]+"/, 'width="100%"')
      .replace(/\s*height="[0-9.]+"/, '');
  }, [preset.config]);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        borderRadius: 2,
        transition: 'all 0.15s',
        '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
      }}
    >
      {/* Preview — native SVG scaling via viewBox */}
      <Box sx={{
        bgcolor: 'background.neutral',
        borderRadius: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        px: 1.5,
        py: 0.75,
        lineHeight: 0,
        overflow: 'hidden',
      }}>
        <Box sx={{ width: '100%', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: svgPreview }} />
      </Box>

      {/* Name & category */}
      <Box sx={{ px: 0.25 }}>
        <Typography sx={{ fontWeight: 900, color: 'primary.main', textTransform: 'uppercase', fontSize: '0.5rem', letterSpacing: '0.07em', lineHeight: 1.4 }}>
          {preset.category}
        </Typography>
        <Typography sx={{ fontWeight: 800, color: 'text.primary', fontSize: '0.68rem', lineHeight: 1.2 }}>
          {preset.name || preset.id}
        </Typography>
      </Box>

      {/* Apply (+ Delete for custom) */}
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={() => onApply(preset.config)}
          sx={{ py: 0.35, fontSize: '0.6rem', fontWeight: 800, borderRadius: 1.5, minHeight: 0, lineHeight: 1.4 }}
        >
          Apply
        </Button>
        {isCustom && (
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(preset.id)}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, p: 0.4 }}
          >
            <DeleteIcon sx={{ fontSize: 13 }} />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

const PresetsTab = ({ setConfig, customPresets, savePreset, deletePreset }) => {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');

  const filteredPresets = React.useMemo(() => {
    return BASE_PRESETS.filter(p => {
      const matchFilter = filter === 'all' || p.category === filter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const customList = React.useMemo(() => {
    return Object.keys(customPresets).map(name => ({
      id: name,
      name,
      category: 'custom',
      config: customPresets[name]
    }));
  }, [customPresets]);

  return (
    <Box sx={{ p: 1 }}>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          startIcon={<SaveIcon />}
          onClick={() => {
            const name = prompt("Enter preset name:");
            if (name) savePreset(name);
          }}
          sx={{ py: 1, borderRadius: 2.5, fontWeight: 800, boxShadow: '0 4px 12px rgba(0,171,85,0.2)' }}
        >
          Save Current as Preset
        </Button>

        <TextField 
          fullWidth
          size="small"
          placeholder="Search presets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 3, bgcolor: 'background.neutral' }
          }}
        />

        <Box sx={{ overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { height: 3 } }}>
          <ToggleButtonGroup
            size="small"
            value={filter}
            exclusive
            onChange={(_, val) => val && setFilter(val)}
            sx={{ 
              display: 'flex', 
              gap: 0.75, 
              '& .MuiToggleButtonGroup-grouped': { border: '1px solid !important', borderColor: 'divider !important', borderRadius: '10px !important' } 
            }}
          >
            {PRESET_CATEGORIES.map(cat => (
              <ToggleButton key={cat.id} value={cat.id} sx={{ whiteSpace: 'nowrap', px: 1.5, py: 0.4, fontSize: '0.6rem', fontWeight: 700 }}>
                {cat.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Stack>

      {customList.length > 0 && (
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', mb: 1, display: 'block', fontSize: '0.6rem' }}>
            My Library ({customList.length})
          </Typography>
          <Grid container spacing={1.5}>
            {customList.map(p => (
              <Grid item xs={6} key={p.id}>
                <PresetCard preset={p} onApply={setConfig} onDelete={deletePreset} isCustom />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}

      <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', mb: 1, display: 'block', fontSize: '0.6rem' }}>
        Standard Library ({filteredPresets.length})
      </Typography>
      <Grid container spacing={1.5}>
        {filteredPresets.map(p => (
          <Grid item xs={6} key={p.id}>
            <PresetCard preset={p} onApply={setConfig} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PresetsTab;
