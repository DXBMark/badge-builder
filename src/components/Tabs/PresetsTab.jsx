/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Presets Management Tab
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { 
  Box, Typography, Button, Divider, IconButton, Paper, Stack, 
  Grid, Chip, Tooltip, TextField, InputAdornment, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { BASE_PRESETS, PRESET_CATEGORIES } from '../../constants/presets';
import { renderBadgeSvg } from '../../core/svgRenderer';

const PresetCard = ({ preset, onApply, onDelete, isCustom = false }) => {
  const [isFav, setIsFav] = React.useState(false);
  const svg = React.useMemo(() => renderBadgeSvg(preset.config), [preset.config]);

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 1.5, 
        borderRadius: 3, 
        transition: 'all 0.2s',
        '&:hover': { 
          borderColor: 'primary.main', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)'
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5
      }}
    >
      <Box sx={{ 
        height: 60, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: 'background.neutral', 
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        p: 1
      }}>
        <Box sx={{ transform: 'scale(0.5)', transformOrigin: 'center' }}>
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </Box>
      </Box>

      <Box>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main', textTransform: 'uppercase', fontSize: '0.6rem' }}>
              {preset.category}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}>
              {preset.name || preset.id}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setIsFav(!isFav)}>
            {isFav ? <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} /> : <FavoriteBorderIcon sx={{ fontSize: 16 }} />}
          </IconButton>
        </Stack>
      </Box>

      <Stack direction="row" spacing={0.5}>
        <Button 
          fullWidth 
          size="small" 
          variant="contained" 
          startIcon={<PlayArrowIcon />}
          onClick={() => onApply(preset.config)}
          sx={{ py: 0.5, fontSize: '0.65rem', fontWeight: 800, borderRadius: 1.5 }}
        >
          Apply
        </Button>
        {isCustom ? (
          <IconButton size="small" color="error" onClick={() => onDelete(preset.id)} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}>
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        ) : (
          <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}>
            <ContentCopyIcon sx={{ fontSize: 14 }} />
          </IconButton>
        )}
      </Stack>
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
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => {
            const name = prompt("Enter preset name:");
            if (name) savePreset(name);
          }}
          sx={{ py: 1.5, borderRadius: 3, boxShadow: '0 8px 16px rgba(0,171,85,0.24)' }}
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
                <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 3, bgcolor: 'background.neutral' }
          }}
        />

        <Box sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 } }}>
          <ToggleButtonGroup
            size="small"
            value={filter}
            exclusive
            onChange={(_, val) => val && setFilter(val)}
            sx={{ 
              display: 'flex', 
              gap: 1, 
              '& .MuiToggleButtonGroup-grouped': { border: '1px solid !important', borderColor: 'divider !important', borderRadius: '12px !important' } 
            }}
          >
            {PRESET_CATEGORIES.map(cat => (
              <ToggleButton key={cat.id} value={cat.id} sx={{ whiteSpace: 'nowrap', px: 2, py: 0.5, fontSize: '0.65rem', fontWeight: 700 }}>
                {cat.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Stack>

      {customList.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', mb: 2, display: 'block' }}>
            My Library ({customList.length})
          </Typography>
          <Grid container spacing={2}>
            {customList.map(p => (
              <Grid item xs={12} sm={6} key={p.id}>
                <PresetCard preset={p} onApply={setConfig} onDelete={deletePreset} isCustom />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 4 }} />
        </Box>
      )}

      <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', mb: 2, display: 'block' }}>
        Standard Library ({filteredPresets.length})
      </Typography>
      <Grid container spacing={2}>
        {filteredPresets.map(p => (
          <Grid item xs={12} sm={6} key={p.id}>
            <PresetCard preset={p} onApply={setConfig} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PresetsTab;
