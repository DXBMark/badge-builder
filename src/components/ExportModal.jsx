/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI Export Dialog Component
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  Box, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VectorIcon from '@mui/icons-material/Gesture';
import ImageIcon from '@mui/icons-material/Image';

/**
 * [TS] MUI Dialog for export options.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const ExportModal = ({ show, onClose, onExportSVG, onExportPNG, onCopyCode }) => (
  <Dialog 
    open={show} 
    onClose={onClose}
    fullWidth
    maxWidth="xs"
    PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
  >
    <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary' }}>Export Asset</Typography>
      <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
    </DialogTitle>
    <DialogContent sx={{ px: 2, pb: 3 }}>
      <List sx={{ pt: 0 }}>
        <ListItemButton 
          onClick={onExportSVG}
          sx={{ borderRadius: 2, mb: 1, py: 1.5, border: '1px solid', borderColor: 'divider' }}
        >
          <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
            <VectorIcon />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Download SVG</Typography>} 
            secondary={<Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled' }}>VECTOR • SCALABLE</Typography>} 
          />
          <GetAppIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
        </ListItemButton>

        <ListItemButton 
          onClick={onExportPNG}
          sx={{ borderRadius: 2, mb: 1, py: 1.5, border: '1px solid', borderColor: 'divider' }}
        >
          <ListItemIcon sx={{ color: 'secondary.main', minWidth: 40 }}>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Download PNG</Typography>} 
            secondary={<Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled' }}>RASTER • 2X SCALE</Typography>} 
          />
          <GetAppIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
        </ListItemButton>

        <Divider sx={{ my: 2 }} />

        <ListItemButton 
          onClick={onCopyCode}
          sx={{ borderRadius: 2, py: 1.5, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Copy SVG Code</Typography>} 
            secondary={<Typography variant="caption" sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>TO CLIPBOARD</Typography>} 
          />
        </ListItemButton>
      </List>
    </DialogContent>
  </Dialog>
);

export default ExportModal;
