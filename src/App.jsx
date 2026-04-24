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
import { downloadSVG, downloadPNG, downloadJSON } from './utils/export';
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
import BulkTab from './components/Tabs/BulkTab';
import ExportModal from './components/ExportModal';
import DiagnosticsPanel from './components/DiagnosticsPanel';
import { runDiagnostics } from './core/diagnostics';
import BrandTab from './components/Tabs/BrandTab';

const cloneConfig = (value) => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
};

const getBadgeLabel = (config) => config.leftText || 'Badge';
const getBadgeValue = (config) => config.rightText || 'Value';
const getBadgeColor = (config) => (config.rightBg || '#4c1').replace('#', '');

const createMarkdownSnippet = (config) => {
  const label = getBadgeLabel(config);
  const value = getBadgeValue(config);
  const color = getBadgeColor(config);

  return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color})`;
};

const createHtmlSnippet = (svg, config) => {
  const label = getBadgeLabel(config);
  const bytes = new TextEncoder().encode(svg);
  const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
  const safeB64 = btoa(binString);

  return `<img src="data:image/svg+xml;base64,${safeB64}" alt="${label}" />`;
};

/**
 * [TS] Main Application Component
 */
const App = ({ mode }) => {
  const colorMode = useContext(ColorModeContext);

  /*
   * [TS] Application State
   */
  const [config, setConfig] = useState(BASE_PRESETS[0].config);
  const [customPresets, setCustomPresets] = useState({});
  const [customBrands, setCustomBrands] = useState({});
  const [activeTab, setActiveTab] = useState('content');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const [showExport, setShowExport] = useState(false);
  const [gitHubContext, setGitHubContext] = useState({ 
    user: 'DXBMark', 
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
      
      const storedBrands = localStorage.getItem('ts_badge_brands_mui');
      if (storedBrands) setCustomBrands(JSON.parse(storedBrands));
    } catch(e) {
      console.error("[TS Error] Failed to load presets/brands", e);
    }
  }, []);

  const savePreset = useCallback((name) => {
    const newPresets = {
      ...customPresets,
      [name]: cloneConfig(config),
    };

    setCustomPresets(newPresets);

    try {
      localStorage.setItem('ts_badge_presets_mui', JSON.stringify(newPresets));
      setToast({
        open: true,
        message: `Preset "${name}" Saved!`,
        severity: 'success',
      });
    } catch (e) {
      setToast({
        open: true,
        message: 'Failed to save preset',
        severity: 'error',
      });
    }
  }, [config, customPresets]);

  const deletePreset = useCallback((name) => {
    const newPresets = { ...customPresets };
    delete newPresets[name];
    setCustomPresets(newPresets);
    try { localStorage.setItem('ts_badge_presets_mui', JSON.stringify(newPresets)); } catch(e) {}
  }, [customPresets]);

  const saveBrand = useCallback((brand) => {
    const newBrands = { ...customBrands, [brand.id]: brand };
    setCustomBrands(newBrands);
    try {
      localStorage.setItem('ts_badge_brands_mui', JSON.stringify(newBrands));
      setToast({ open: true, message: `Brand Kit "${brand.name}" Saved!`, severity: 'success' });
    } catch(e) {}
  }, [customBrands]);

  const deleteBrand = useCallback((id) => {
    const newBrands = { ...customBrands };
    delete newBrands[id];
    setCustomBrands(newBrands);
    try { localStorage.setItem('ts_badge_brands_mui', JSON.stringify(newBrands)); } catch(e) {}
  }, [customBrands]);

  /*
   * [TS] Computed Badge Data
   */
  const badgeData = useMemo(() => buildSVG(config), [config]);

  const diagnostics = useMemo(
    () => runDiagnostics(config, badgeData.svg),
    [config, badgeData.svg]
  );

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

    // [TS] Limit size to 500KB
    if (file.size > 500 * 1024) {
      setToast({ open: true, message: '[TS Error] File too large! Max 500KB allowed.', severity: 'error' });
      return;
    }

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

    if (file.type === 'image/svg+xml') {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  }, []);

  const update = useCallback((key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  }, []);

  const handleExportSVG = () => {
    downloadSVG(badgeData.svg, 'badge.svg');
    setToast({ open: true, message: 'SVG Downloaded', severity: 'success' });
    setShowExport(false);
  };

  const handleExportPNG = (scale = 2) => {
    downloadPNG(badgeData.svg, badgeData.width, badgeData.height, 'badge.png', scale);
    setToast({ open: true, message: `PNG (${scale}x) Downloaded`, severity: 'success' });
    setShowExport(false);
  };

  const handleCopySnippet = (type) => {
    let text = '';
    if (type === 'MARKDOWN') {
      text = createMarkdownSnippet(config);
    } else if (type === 'HTML') {
      text = createHtmlSnippet(badgeData.svg, config);
    } else if (type === 'JSON') {
      text = JSON.stringify(config, null, 2);
    }

    handleCopy(text, type);
    setShowExport(false);
  };

  const handleExportConfig = () => {
    downloadJSON(config, 'badge-config.json');
    setToast({ open: true, message: 'Config JSON Downloaded', severity: 'success' });
    setShowExport(false);
  };

  return (
    <Box 
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', transition: 'background-color 0.3s ease' }}
      onMouseMove={handleDragMove} 
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <AppBar position="static" color="inherit" elevation={0} sx={{ flexShrink: 0, borderBottom: '1px solid', borderColor: 'divider', mb: 1, bgcolor: 'background.paper', transition: 'background-color 0.3s ease' }}>
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
                href="https://github.com/DXBMark/badge-builder.git" 
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

      {/* Main content — natural page scroll */}
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 4, alignItems: 'start' }}>

            {/* Left column — Preview + Source */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <LivePreview 
                svg={badgeData.svg} 
                config={config}
                onDragStart={handleDragStart} 
                dragState={dragState}
                statusMsg={toast.open ? toast.message : ''} 
                onCopy={handleCopy}
              />
              <SvgSource 
                svg={badgeData.svg} 
                config={config}
                onCopy={handleCopy} 
              />
            </Box>

            {/* Right column — Editor + Diagnostics */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}>
                <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
                <Box sx={{ p: 3, maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
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
                  {activeTab === 'brand' && <BrandTab config={config} update={update} customBrands={customBrands} saveBrand={saveBrand} deleteBrand={deleteBrand} />}
                  {activeTab === 'github' && (
                    <GitHubTab 
                      context={gitHubContext} 
                      setContext={setGitHubContext} 
                      onCopy={handleCopy} 
                    />
                  )}
                  {activeTab === 'bulk' && (
                    <BulkTab 
                      config={config} 
                      onCopy={handleCopy} 
                    />
                  )}
                </Box>
              </Paper>
              <DiagnosticsPanel results={diagnostics} />
            </Box>

          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ mt: 'auto', py: 3, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
              © 2026 Badge Builder Pro by DXBMark Ltd. All rights reserved.
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Built with React 19 + Material UI v9
            </Typography>
          </Box>
        </Container>
      </Box>

      <ExportModal 
        show={showExport} 
        onClose={() => setShowExport(false)} 
        onExportSVG={handleExportSVG}
        onExportPNG={handleExportPNG}
        onCopyCode={() => handleCopy(badgeData.svg, 'SVG Code')}
        onCopyMarkdown={() => handleCopySnippet('MARKDOWN')}
        onCopyHTML={() => handleCopySnippet('HTML')}
        onCopyJSON={() => handleCopySnippet('JSON')}
        onExportConfig={handleExportConfig}
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
