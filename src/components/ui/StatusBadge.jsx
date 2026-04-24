/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Status Badge Component
 * Notes: Fixed palette — lighter tokens not in default MUI theme.
 */

import React from 'react';
import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * [TS] MUI-based status chip with valid palette tokens.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const StatusBadge = ({ label, pass }) => (
  <Chip
    label={`${label}: ${pass ? 'PASS' : 'FAIL'}`}
    size="small"
    icon={pass ? <CheckCircleIcon sx={{ fontSize: '14px !important', color: pass ? '#00AB55 !important' : '#FF4842 !important' }} /> : <ErrorIcon sx={{ fontSize: '14px !important', color: '#FF4842 !important' }} />}
    sx={{
      fontWeight: 700,
      fontSize: '0.625rem',
      letterSpacing: '0.04em',
      bgcolor: pass ? 'rgba(0, 171, 85, 0.08)' : 'rgba(255, 72, 66, 0.08)',
      color: pass ? '#007B55' : '#B71D18',
      border: '1px solid',
      borderColor: pass ? 'rgba(0, 171, 85, 0.24)' : 'rgba(255, 72, 66, 0.24)',
      borderRadius: 1,
      '& .MuiChip-icon': { color: 'inherit' }
    }}
  />
);

export default StatusBadge;
