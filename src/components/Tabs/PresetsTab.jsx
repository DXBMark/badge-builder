/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Presets Management Tab
 * Notes: 3-column grid, BrandTab-matching style, search inline with Save button.
 */

import React from 'react';
import { 
  Box, Typography, Button, Divider, IconButton, Paper,
  Grid, TextField, InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_PRESETS } from '../../constants/presets';
import { buildSVG } from '../../utils/svgBuilder';

const PresetCard = ({ preset, onApply, onDelete, isCustom = false }) => {
  // Scale SVG to fill container width, preserve viewBox aspect ratio
  const svgPreview = React.useMemo(() => {
    const raw = buildSVG(preset.config).svg;
    return raw
      .replace(/width="[0-9.]+"/, 'width="100%"')
      .replace(/height="[0-9.]+"/, 'height="100%"')
      .replace(/<svg /, '<svg preserveAspectRatio="xMidYMid meet" ');
  }, [preset.config]);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2.5,
        transition: 'all 0.15s',
        '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
      }}
    >
      {/* SVG Preview — fixed 28px height container, SVG scales inside */}
      <Box sx={{
        height: 28,
        bgcolor: 'background.neutral',
        borderRadius: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 0.5,
        '& svg': { display: 'block', maxWidth: '100%', height: '100%' },
      }}>
        <Box sx={{ width: '100%', height: '100%', lineHeight: 0 }}
          dangerouslySetInnerHTML={{ __html: svgPreview }}
        />
      </Box>

      {/* Name & category — matching BrandCard typography */}
      <Box>
        <Typography sx={{ fontWeight: 900, color: 'primary.main', textTransform: 'uppercase', fontSize: '0.5rem', letterSpacing: '0.07em', lineHeight: 1.4 }}>
          {preset.category}
        </Typography>
        <Typography sx={{ fontWeight: 800, color: 'text.primary', fontSize: '0.65rem', lineHeight: 1.2 }}>
          {preset.name || preset.id}
        </Typography>
      </Box>

      {/* Apply button — identical style to BrandCard's Apply Brand */}
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={() => onApply(preset.config)}
          sx={{ py: 0.35, fontSize: '0.6rem', fontWeight: 700, borderRadius: 1.5, lineHeight: 1.4 }}
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
  const [search, setSearch] = React.useState('');

  const filteredPresets = React.useMemo(() =>
    BASE_PRESETS.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const customList = React.useMemo(() =>
    Object.keys(customPresets).map(name => ({
      id: name, name, category: 'custom', config: customPresets[name]
    })),
    [customPresets]
  );

  return (
    <Box sx={{ p: 1 }}>
      {/* Top row: Save button + Search inline */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
          onClick={() => {
            const name = prompt("Enter preset name:");
            if (name) savePreset(name);
          }}
          sx={{ py: 0.9, px: 1.5, borderRadius: 2.5, fontWeight: 800, flexShrink: 0, fontSize: '0.6rem', boxShadow: '0 4px 12px rgba(0,171,85,0.2)', whiteSpace: 'nowrap' }}
        >
          Save Preset
        </Button>
        <TextField
          fullWidth
          size="small"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled', fontSize: 16 }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 2.5, bgcolor: 'background.neutral', fontSize: '0.75rem' },
          }}
        />
      </Box>

      {/* Custom presets */}
      {customList.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', display: 'block', mb: 1, fontSize: '0.6rem' }}>
            My Library ({customList.length})
          </Typography>
          <Grid container spacing={1.5}>
            {customList.map(p => (
              <Grid item xs={4} key={p.id}>
                <PresetCard preset={p} onApply={setConfig} onDelete={deletePreset} isCustom />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}

      {/* Standard Library */}
      <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', display: 'block', mb: 1, fontSize: '0.6rem' }}>
        Standard Library ({filteredPresets.length})
      </Typography>
      <Grid container spacing={1.5}>
        {filteredPresets.map(p => (
          <Grid item xs={4} key={p.id}>
            <PresetCard preset={p} onApply={setConfig} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PresetsTab;
