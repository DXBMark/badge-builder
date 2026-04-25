/*
 * Project: SVG Badge Builder
 * Author: DXBMark Ltd.
 * Purpose: Pack Builder Tab (Badge Collections)
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Stack, IconButton, Tooltip, Divider, Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { BUILT_IN_PACKS } from '../../constants/packs';
import { normalizePresetConfig } from '../../constants/presets';
import { buildSVG } from '../../utils/svgBuilder';

const PackTab = ({ currentConfig, onApplyConfig, onCopyText }) => {
  const [pack, setPack] = useState([]);
  const [packName, setPackName] = useState('My Custom Pack');

  const addToPack = () => {
    // Deep clone the current config and add an internal id for list rendering
    const newBadge = { ...JSON.parse(JSON.stringify(currentConfig)), _packId: Date.now() };
    setPack([...pack, newBadge]);
  };

  const removeFromPack = (id) => {
    setPack(pack.filter(b => b._packId !== id));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newPack = [...pack];
    [newPack[index - 1], newPack[index]] = [newPack[index], newPack[index - 1]];
    setPack(newPack);
  };

  const moveDown = (index) => {
    if (index === pack.length - 1) return;
    const newPack = [...pack];
    [newPack[index], newPack[index + 1]] = [newPack[index + 1], newPack[index]];
    setPack(newPack);
  };

  const clearPack = () => setPack([]);

  const copyMarkdown = () => {
    if (!pack.length) return;
    const mds = pack.map(config => {
      const label = config.leftText || 'Badge';
      const value = config.rightText || 'Value';
      const color = (config.rightBg || '#4c1').replace('#', '');
      return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color})`;
    });
    onCopyText(mds.join(' '), 'Pack Markdown');
  };

  const loadBuiltIn = (presetPack) => {
    const hydrated = presetPack.badges.map((b, i) => ({
      ...normalizePresetConfig(b),
      _packId: Date.now() + i
    }));
    setPack(hydrated);
    setPackName(presetPack.name);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Pack Builder Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5, fontSize: '1rem' }}>
            Pack Builder
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Combine multiple badges into a single block to export together.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={addToPack}
          sx={{ fontWeight: 800 }}
        >
          + Add Current Badge
        </Button>
      </Box>

      {/* Current Pack List */}
      <Paper variant="outlined" sx={{ p: 2, minHeight: 120, bgcolor: 'background.neutral', borderRadius: 3 }}>
        {pack.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.disabled', textAlign: 'center', mt: 3, fontWeight: 700 }}>
            Your pack is empty. Add the current badge or select a predefined pack below.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {pack.map((badge, idx) => {
              const svgData = buildSVG(badge);
              return (
                <Box 
                  key={badge._packId} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 1.5, 
                    bgcolor: 'background.paper', 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', width: 20 }}>
                      #{idx + 1}
                    </Typography>
                    <Box 
                      dangerouslySetInnerHTML={{ __html: svgData.svg }} 
                      sx={{ '& svg': { maxHeight: 28, width: 'auto' }, display: 'flex', alignItems: 'center' }} 
                    />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Edit this badge"><IconButton size="small" onClick={() => onApplyConfig(badge)}><PlayArrowIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Move Up"><IconButton size="small" disabled={idx === 0} onClick={() => moveUp(idx)}><ArrowUpwardIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Move Down"><IconButton size="small" disabled={idx === pack.length - 1} onClick={() => moveDown(idx)}><ArrowDownwardIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Remove"><IconButton size="small" color="error" onClick={() => removeFromPack(badge._packId)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        )}
      </Paper>

      {/* Tally & Actions */}
      {pack.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main' }}>
            {pack.length} {pack.length === 1 ? 'badge' : 'badges'} in pack
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button size="small" color="error" onClick={clearPack} sx={{ fontWeight: 800 }}>Clear</Button>
            <Button size="small" variant="outlined" startIcon={<ContentCopyIcon />} onClick={copyMarkdown} sx={{ fontWeight: 800 }}>
              Copy Markdown
            </Button>
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 1 }} />

      {/* Built-in Packs */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
          Built-in Packs
        </Typography>
        <Grid container spacing={2}>
          {BUILT_IN_PACKS.map(builtin => (
            <Grid item xs={12} sm={6} key={builtin.id}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  cursor: 'pointer', 
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' }
                }}
                onClick={() => loadBuiltIn(builtin)}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: 'primary.main' }}>
                  {builtin.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5, lineHeight: 1.3 }}>
                  {builtin.description}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.5}>
                  {builtin.badges.slice(0, 3).map((b, i) => {
                    const norm = normalizePresetConfig(b);
                    const svgData = buildSVG(norm);
                    return (
                      <Box 
                        key={i} 
                        dangerouslySetInnerHTML={{ __html: svgData.svg }} 
                        sx={{ '& svg': { maxHeight: 18, width: 'auto' }, opacity: 0.8 }} 
                      />
                    );
                  })}
                  {builtin.badges.length > 3 && (
                    <Typography variant="caption" sx={{ color: 'text.disabled', ml: 1, alignSelf: 'center' }}>
                      +{builtin.badges.length - 3}
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PackTab;