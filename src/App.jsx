/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: Main Application Entry
 * Notes: Full MUI integration. Production ready.
 */

import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  AppBar, 
  Toolbar, 
  Snackbar, 
  Alert, 
  IconButton, 
  Link,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import DownloadIcon from '@mui/icons-material/Download';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Context
import { ColorModeContext } from './main';

// Constants & Tools
import { BASE_PRESETS } from './constants/presets';
import { buildSVG } from './utils/svgBuilder';
import { downloadSVG, downloadPNG } from './utils/export';
import { useDrag } from './hooks/useDrag';

// Components
import LivePreview from './components/Preview/LivePreview';
import SvgSource from './components/Preview/SvgSource';
import TabBar from './components/Tabs/TabBar';
import ContentTab from './components/Tabs/ContentTab';
import LayoutTab from './components/Tabs/LayoutTab';
import StyleTab from './components/Tabs/StyleTab';
import IconTab from './components/Tabs/IconTab';
import PresetsTab from './components/Tabs/PresetsTab';
import GitHubTab from './components/Tabs/GitHubTab';
import ExportModal from './components/ExportModal';
import DiagnosticsPanel from './components/DiagnosticsPanel';

/**
 * [TS] Main Application Component
 */
const App = ({ mode }) => {
  const colorMode = useContext(ColorModeContext);

  /*
   * [TS] Application State
   */
  const [config, setConfig] = useState(BASE_PRESETS.waqtor);
  const [customPresets, setCustomPresets] = useState({});
  const [activeTab, setActiveTab] = useState('content');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const [showExport, setShowExport] = useState(false);
  const [gitHubContext, setGitHubContext] = useState({ 
    user: 'tariqsaidofficial', 
    repo: 'badge-builder', 
    branch: 'main', 
    path: 'badge.svg' 
  });

  const { handleDragStart, handleDragMove, handleDragEnd, dragState } = useDrag(config, setConfig);

  /*
   * [TS] Persist Custom Presets
   */
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ts_badge_presets_mui');
      if (stored) setCustomPresets(JSON.parse(stored));
    } catch(e) {
      console.error("[TS Error] Failed to load presets", e);
    }
  }, []);

  const savePreset = useCallback((name) => {
    const newPresets = { ...customPresets, [name]: config };
    setCustomPresets(newPresets);
    try { 
      localStorage.setItem('ts_badge_presets_mui', JSON.stringify(newPresets));
      setToast({ open: true, message: `Preset "${name}" Saved!`, severity: 'success' });
    } catch(e) {}
  }, [config, customPresets]);

  const deletePreset = useCallback((name) => {
    const newPresets = { ...customPresets };
    delete newPresets[name];
    setCustomPresets(newPresets);
    try { localStorage.setItem('ts_badge_presets_mui', JSON.stringify(newPresets)); } catch(e) {}
  }, [customPresets]);

  /*
   * [TS] Computed Badge Data
   */
  const badgeData = useMemo(() => buildSVG(config), [config]);

  const diagnostics = useMemo(() => [
    // ✅ Core: SVG engine produces valid output
    { name: 'Vector Engine', pass: !!badgeData.svg && badgeData.svg.length > 10 },
    // ✅ Shields.io: badge height must be at least 20px
    { name: 'Min Height (20px)', pass: Number(config.height) >= 20 },
    // ✅ Shields.io: badge must have label text
    { name: 'Label Present', pass: !!(config.leftText && config.leftText.trim().length > 0) },
    // ✅ Shields.io: value text should exist  
    { name: 'Value Present', pass: !!(config.rightText && config.rightText.trim().length > 0) },
    // ✅ Export: badge meets minimum width for readability
    { name: 'Export Ready', pass: Number(config.width) >= 40 && Number(config.height) >= 16 },
  ], [badgeData, config]);

  /*
   * [TS] Event Handlers
   */
  const handleCopy = useCallback((text, label) => {
    try {
      navigator.clipboard.writeText(text);
      setToast({ open: true, message: `${label} Copied to Clipboard!`, severity: 'success' });
    } catch (e) {
      setToast({ open: true, message: 'Failed to copy', severity: 'error' });
    }
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (file.type === 'image/svg+xml') {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(event.target.result, 'image/svg+xml');
          const svgEl = doc.querySelector('svg');
          if (svgEl) {
            const scripts = svgEl.querySelectorAll('script');
            scripts.forEach(s => s.remove());
            setConfig(prev => ({ ...prev, customSvgContent: svgEl.innerHTML, iconMode: 'custom-svg' }));
            setToast({ open: true, message: 'SVG Icon Loaded', severity: 'success' });
            return;
          }
        } catch(err) {}
      }
      setConfig(prev => ({ ...prev, customIconUrl: event.target.result, iconMode: 'custom' }));
      setToast({ open: true, message: 'Image Icon Loaded', severity: 'success' });
    };
    reader.readAsDataURL(file);
  }, []);

  const update = useCallback((key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  }, []);

  const handleExportSVG = () => {
    downloadSVG(badgeData.svg, 'badge.svg');
    setToast({ open: true, message: 'SVG Downloaded', severity: 'success' });
    setShowExport(false);
  };

  const handleExportPNG = () => {
    downloadPNG(badgeData.svg, badgeData.width, badgeData.height, 'badge.png');
    setToast({ open: true, message: 'PNG Downloaded', severity: 'success' });
    setShowExport(false);
  };

  return (
    <Box 
      sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10, transition: 'background-color 0.3s ease' }}
      onMouseMove={handleDragMove} 
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 5, bgcolor: 'background.paper', transition: 'background-color 0.3s ease' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1, bgcolor: mode === 'dark' ? 'primary.main' : 'primary.main', color: mode === 'dark' ? 'primary.contrastText' : 'white', borderRadius: 1.5, display: 'flex', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <PaletteIcon />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 900, letterSpacing: '-0.02em', color: 'text.primary' }}>
                  Badge Builder Pro
                </Typography>
                <Chip label="v1" size="small" sx={{ fontWeight: 900, bgcolor: 'primary.main', color: 'background.paper', height: 20, fontSize: '0.65rem' }} />
              </Box>
            </Box>
            
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IconButton 
                onClick={colorMode.toggleColorMode} 
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'action.hover' } }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton 
                component={Link} 
                href="https://github.com/tariqsaidofficial/badge-builder.git" 
                target="_blank"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'action.hover' } }}
              >
                <GitHubIcon />
              </IconButton>
              <Button 
                variant="contained" 
                startIcon={<DownloadIcon />}
                onClick={() => setShowExport(true)}
                sx={{ borderRadius: 2, px: 3, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                EXPORT ASSET
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 4 }}>
          {/* Main workspace area */}
          <Box>
            <Stack spacing={4}>
              <LivePreview 
                svg={badgeData.svg} 
                onDragStart={handleDragStart} 
                dragState={dragState}
                statusMsg={toast.open ? toast.message : ''} 
              />
              <SvgSource 
                svg={badgeData.svg} 
                onCopy={handleCopy} 
              />
              <DiagnosticsPanel results={diagnostics} />
            </Stack>
          </Box>

          {/* Configuration sidebar */}
          <Box>
            <Paper sx={{ borderRadius: 4, overflow: 'hidden', position: 'sticky', top: 32 }}>
              <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
              
              <Box sx={{ p: 4, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                {activeTab === 'content' && <ContentTab config={config} update={update} />}
                {activeTab === 'layout' && <LayoutTab config={config} update={update} />}
                {activeTab === 'style' && <StyleTab config={config} update={update} />}
                {activeTab === 'icon' && <IconTab config={config} update={update} onFileUpload={handleFileUpload} />}
                {activeTab === 'presets' && (
                   <PresetsTab 
                    setConfig={setConfig} 
                    customPresets={customPresets} 
                    savePreset={savePreset}
                    deletePreset={deletePreset}
                   />
                )}
                {activeTab === 'github' && (
                  <GitHubTab 
                    context={gitHubContext} 
                    setContext={setGitHubContext} 
                    onCopy={handleCopy} 
                  />
                )}
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* [TS] Footer Fix */}
        <Box sx={{ mt: 10, pt: 8, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              © 2026 SVG Badge Builder. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
              <Link 
                href="https://portfolio.dxbmark.com/" 
                target="_blank" 
                underline="hover" 
                sx={{ color: 'text.primary', fontWeight: 800, fontSize: '0.875rem' }}
              >
                Built with ❤️ by [Tariq Said]
              </Link>
              <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
              <Link 
                href="https://github.com/tariqsaidofficial/badge-builder.git" 
                target="_blank" 
                sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary', fontWeight: 700, underline: 'none' }}
              >
                <GitHubIcon fontSize="small" /> Source Code
              </Link>
            </Box>
          </Stack>
        </Box>
      </Container>

      <ExportModal 
        show={showExport} 
        onClose={() => setShowExport(false)} 
        onExportSVG={handleExportSVG}
        onExportPNG={handleExportPNG}
        onCopyCode={() => handleCopy(badgeData.svg, 'SVG Code')}
      />

      <Snackbar 
        open={toast.open} 
        autoHideDuration={3000} 
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%', fontWeight: 700, borderRadius: 2 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
