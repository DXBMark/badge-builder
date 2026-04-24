/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Layout Customization Tab
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { Box } from '@mui/material';
import InputField from '../ui/InputField';

/**
 * [TS] Controls for dimensions and geometry.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const LayoutTab = ({ config, update }) => (
  <Box sx={{ p: 1 }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
      <Box>
        <InputField label="Total Width" type="number" value={config.width} onChange={v => update('width', v)} />
      </Box>
      <Box>
        <InputField label="Total Height" type="number" value={config.height} onChange={v => update('height', v)} />
      </Box>
      <Box>
        <InputField label="Split Ratio" type="number" value={config.leftWidth} onChange={v => update('leftWidth', v)} />
      </Box>
      <Box>
        <InputField label="Corner Radius" type="number" value={config.borderRadius} onChange={v => update('borderRadius', v)} />
      </Box>
    </Box>
  </Box>
);

export default LayoutTab;
