/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: Build Diagnostics Panel
 * Notes: Shows real-time build health for the badge configuration.
 *
 * PURPOSE EXPLANATION:
 * This panel acts as a real-time "build health" monitor, equivalent to CI/CD
 * status badges on GitHub READMEs. It validates:
 *  - That the SVG engine produces valid output
 *  - That Shields.io-compatible dimensions are met (min 20px height)
 *  - That text contrast is sufficient for readability
 *  - That exported files are production-ready
 */

import React from 'react';
import { Paper, Box, Typography, Tooltip } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import StatusBadge from './ui/StatusBadge';

const DIAGNOSTIC_DESCRIPTIONS = {
  'Vector Engine': 'The SVG generator is producing valid, non-empty XML output.',
  'Min Height (20px)': 'Shields.io standard: badge height must be ≥ 20px to be legible.',
  'Label Present': 'Shields.io requires a label (left text) for a valid badge.',
  'Value Present': 'Shields.io requires a value (right text) to complete the badge.',
  'Export Ready': 'Width ≥ 40px and Height ≥ 16px — safe to export as SVG or PNG.',
};

/**
 * [TS] Real-time build health panel.
 * Mirrors CI/CD status indicators used in GitHub Shields-style badges.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const DiagnosticsPanel = ({ results }) => (
  <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
    {/* Header */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TroubleshootIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.primary', lineHeight: 1, letterSpacing: '0.1em' }}>
          Build Diagnostics
        </Typography>
      </Box>
      <Tooltip
        title="Real-time health checks for your badge configuration. Think of these as CI/CD status indicators — all PASS means your badge is production-ready and compatible with Shields.io standards."
        placement="top"
        arrow
      >
        <HelpOutlineIcon sx={{ fontSize: 16, color: 'text.disabled', cursor: 'help' }} />
      </Tooltip>
    </Box>

    {/* Status chips */}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {results.map((t, i) => (
        <Tooltip
          key={i}
          title={DIAGNOSTIC_DESCRIPTIONS[t.name] || t.name}
          placement="top"
          arrow
        >
          <span>
            <StatusBadge label={t.name} pass={t.pass} />
          </span>
        </Tooltip>
      ))}
    </Box>

    {/* Footer hint */}
    <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.disabled', fontSize: '0.65rem', fontStyle: 'italic' }}>
      Hover each indicator for details. All checks must pass for a production-ready badge.
    </Typography>
  </Paper>
);

export default DiagnosticsPanel;
