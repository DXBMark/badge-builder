/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Style Customization Tab
 * Notes: Fixed Outline & Border section design. Shields.io compliant colors.
 */

import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Divider, Slider, Paper } from '@mui/material';
import InputField from '../ui/InputField';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';

/**
 * [TS] Helper to render a color field with a visible label and swatch.
 */
const ColorField = ({ label, value, onChange }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
      {label}
    </Typography>
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {/* 🎨 Color swatch that opens the native picker */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1.5,
          background: value,
          border: '2px solid',
          borderColor: 'divider',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
          '&:hover': { borderColor: 'primary.main', boxShadow: '0 0 0 3px rgba(33,43,54,0.08)' },
          transition: 'all 0.2s',
        }}
      >
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ position: 'absolute', opacity: 0, inset: 0, cursor: 'pointer', width: '100%', height: '100%' }}
        />
      </Box>
      {/* Hex code text input */}
      <InputField
        label=""
        value={value}
        onChange={onChange}
        sx={{ mb: 0, flex: 1, '& .MuiInputBase-root': { height: 40, fontSize: '0.8rem', fontFamily: '"Fira Code", monospace', letterSpacing: '0.05em' } }}
      />
    </Box>
  </Box>
);

/**
 * [TS] Section header component.
 */
const SectionHeader = ({ title, icon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
    {icon && <Box sx={{ color: 'text.disabled', display: 'flex' }}>{icon}</Box>}
    <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '0.1em', lineHeight: 1 }}>
      {title}
    </Typography>
  </Box>
);

/**
 * [TS] Controls for colors, gradients, and aesthetic effects.
 * Follows Shields.io badge color standards.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const StyleTab = ({ config, update }) => (
  <Box sx={{ p: 1 }}>

    {/* ── Background & Text ─────────────────── */}
    <SectionHeader title="Background & Text" />
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
      <ColorField label="Label BG" value={config.leftBg} onChange={v => update('leftBg', v)} />
      <ColorField label="Value BG" value={config.rightBg} onChange={v => update('rightBg', v)} />
      <ColorField label="Label Text" value={config.leftTextColor} onChange={v => update('leftTextColor', v)} />
      <ColorField label="Value Text" value={config.rightTextColor} onChange={v => update('rightTextColor', v)} />
    </Box>

    <Divider sx={{ my: 3 }} />

    {/* ── Gradient – Shields.io style ───────── */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
      <SectionHeader title="Gradient Effect" />
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={config.useGradient}
            onChange={e => update('useGradient', e.target.checked)}
          />
        }
        label={<Typography variant="caption" sx={{ fontWeight: 800, color: config.useGradient ? 'primary.main' : 'text.disabled' }}>ENABLE</Typography>}
        labelPlacement="start"
        sx={{ m: 0 }}
      />
    </Box>

    {config.useGradient && (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 0.5 }}>
        <ColorField label="Start Color" value={config.gradStart} onChange={v => update('gradStart', v)} />
        <ColorField label="End Color" value={config.gradEnd} onChange={v => update('gradEnd', v)} />
      </Box>
    )}

    <Divider sx={{ my: 3 }} />

    {/* ── Outline & Border (FIXED DESIGN) ───── */}
    <SectionHeader title="Outline & Border" icon={<BorderStyleIcon sx={{ fontSize: 16 }} />} />

    {/* Outline Color – full width */}
    <ColorField label="Outline Color" value={config.outlineColor} onChange={v => update('outlineColor', v)} />

    {/* Outline Width – slider with live label */}
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
          Outline Width
        </Typography>
        <Paper
          variant="outlined"
          sx={{ px: 1.2, py: 0.3, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          <Typography variant="caption" sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 800, color: 'primary.main', fontSize: '0.75rem' }}>
            {Number(config.outlineWidth).toFixed(1)}px
          </Typography>
        </Paper>
      </Box>
      <Slider
        size="small"
        min={0}
        max={10}
        step={0.5}
        value={Number(config.outlineWidth) || 0}
        onChange={(_, v) => update('outlineWidth', v)}
        valueLabelDisplay="auto"
        valueLabelFormat={v => `${v}px`}
        marks={[{ value: 0, label: '0' }, { value: 5, label: '5' }, { value: 10, label: '10px' }]}
        sx={{
          '& .MuiSlider-markLabel': { fontSize: '0.65rem', color: 'text.disabled' },
          '& .MuiSlider-rail': { bgcolor: 'divider' },
          color: config.outlineWidth > 0 ? 'primary.main' : 'text.disabled'
        }}
      />
    </Box>

    {/* Live outline preview */}
    {config.outlineWidth > 0 && (
      <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: 'background.neutral', textAlign: 'center' }}>
        <Box sx={{
          display: 'inline-block',
          width: 80,
          height: 20,
          borderRadius: Number(config.borderRadius || 3) * 0.5,
          border: `${config.outlineWidth}px solid ${config.outlineColor}`,
          bgcolor: config.leftBg,
        }} />
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled', fontWeight: 700 }}>
          outline preview
        </Typography>
      </Box>
    )}
  </Box>
);

export default StyleTab;
