/*
 * Project: Badge Builder Pro
 * Author: [TS]
 * Purpose: Brand Kit Management Tab
 * Notes: Placeholder for future brand features.
 */

import React from 'react';
import { Box, Typography, Button, Alert, Stack } from '@mui/material';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';

const BrandTab = () => (
  <Box sx={{ p: 2 }}>
    <Stack spacing={3} alignItems="center" sx={{ textAlign: 'center', py: 4 }}>
      <BrandingWatermarkIcon sx={{ fontSize: 48, color: 'text.disabled', opacity: 0.5 }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Brand Kits</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Maintain consistency across all your badges with saved brand kits.
        </Typography>
      </Box>
      <Alert severity="info" sx={{ width: '100%', textAlign: 'left' }}>
        This feature is coming soon in Phase 3. You will be able to save color palettes and typography sets.
      </Alert>
      <Button variant="outlined" disabled fullWidth>
        Create New Brand Kit
      </Button>
    </Stack>
  </Box>
);

export default BrandTab;
