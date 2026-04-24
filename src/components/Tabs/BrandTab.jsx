/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Brand Kit Management Tab
 * Notes: Placeholder for future brand features.
 */

import React from 'react';
import { Box, Typography, Button, Stack, Paper, Grid, IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { BUILT_IN_BRANDS } from '../../constants/brands';

import { getContrastColor } from '../../utils/sanitize';

const BrandCard = ({ brand, onApply, onDelete, isCustom }) => {
  const applyBrand = () => {
    onApply({
      leftBg: brand.colors.primary,
      rightBg: brand.colors.secondary,
      leftTextColor: getContrastColor(brand.colors.primary),
      rightTextColor: getContrastColor(brand.colors.secondary),
      gradStart: brand.colors.gradientStart,
      gradEnd: brand.colors.gradientEnd,
      fontFamily: brand.typography.fontFamily,
      borderRadius: brand.geometry.radius,
      outlineWidth: brand.geometry.borderWidth,
      outlineColor: brand.colors.border,
      useGradient: brand.useGradient || false
    });
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{brand.name}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6rem' }}>{brand.typography.fontFamily}</Typography>
        </Box>
        {isCustom && (
          <IconButton size="small" color="error" onClick={() => onDelete(brand.id)} sx={{ p: 0.5 }}>
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Stack>

      {/* Color Palette Display */}
      <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
        {[brand.colors.primary, brand.colors.secondary, brand.colors.textLight, brand.colors.gradientEnd].map((color, i) => (
          <Box key={i} sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: color, border: '1px solid', borderColor: 'divider' }} />
        ))}
      </Stack>

      <Button fullWidth variant="contained" size="small" startIcon={<ColorLensIcon />} onClick={applyBrand} sx={{ py: 0.5, borderRadius: 1.5, fontWeight: 700 }}>
        Apply Brand
      </Button>
    </Paper>
  );
};

const BrandTab = ({ config, update, customBrands = {}, saveBrand, deleteBrand }) => {
  
  const handleSaveBrand = () => {
    const name = prompt("Enter a name for this Brand Kit:");
    if (!name) return;
    
    const newBrand = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      colors: {
        primary: config.leftBg,
        secondary: config.rightBg,
        textLight: config.rightTextColor,
        textDark: config.leftTextColor,
        gradientStart: config.gradStart,
        gradientEnd: config.gradEnd,
        border: config.outlineColor
      },
      typography: { fontFamily: config.fontFamily },
      geometry: { radius: config.borderRadius, borderWidth: config.outlineWidth },
      useGradient: config.useGradient
    };
    saveBrand(newBrand);
  };

  const handleApply = (brandUpdates) => {
    Object.entries(brandUpdates).forEach(([k, v]) => update(k, v));
  };

  const customList = Object.values(customBrands);

  return (
    <Box sx={{ p: 1 }}>
      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<SaveIcon />}
        onClick={handleSaveBrand}
        sx={{ mb: 4, py: 1.5, borderRadius: 3, boxShadow: '0 8px 16px rgba(0,171,85,0.24)' }}
      >
        Save Current as Brand Kit
      </Button>

      {customList.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', display: 'block', mb: 1.5 }}>
            My Brand Kits
          </Typography>
          <Grid container spacing={2}>
            {customList.map(brand => (
              <Grid item xs={12} sm={6} key={brand.id}>
                <BrandCard brand={brand} onApply={handleApply} onDelete={deleteBrand} isCustom />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', display: 'block', mb: 1.5 }}>
        Built-in Brand Kits
      </Typography>
      <Grid container spacing={2}>
        {BUILT_IN_BRANDS.map(brand => (
          <Grid item xs={12} sm={6} key={brand.id}>
            <BrandCard brand={brand} onApply={handleApply} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BrandTab;
