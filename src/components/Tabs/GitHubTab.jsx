/*
 * Project: SVG Badge Builder
 * Author: [TS]
 * Purpose: MUI GitHub URL Generator Tab
 * Notes: Follow TS conventions.
 */

import React from 'react';
import { Box, Typography, Paper, IconButton, Tooltip, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputField from '../ui/InputField';

/**
 * [TS] Generates links for GitHub integration.
 * @param {Object} props
 * @returns {JSX.Element}
 */
const GitHubTab = ({ context, setContext, onCopy }) => {
  const links = [
    { label: "Local Markdown", url: `![badge](./${context.path})` },
    { label: "Raw GitHub URL", url: `https://raw.githubusercontent.com/${context.user}/${context.repo}/${context.branch}/${context.path}` },
    { label: "jsDelivr CDN", url: `https://cdn.jsdelivr.net/gh/${context.user}/${context.repo}@${context.branch}/${context.path}` },
    { label: "GitHub Pages", url: `https://${context.user}.github.io/${context.repo}/${context.path}` }
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 4 }}>
         <Box>
          <InputField label="User/Org" value={context.user} onChange={v => setContext(p => ({...p, user: v}))} />
         </Box>
         <Box>
          <InputField label="Repo" value={context.repo} onChange={v => setContext(p => ({...p, repo: v}))} />
         </Box>
         <Box>
          <InputField label="Branch" value={context.branch} onChange={v => setContext(p => ({...p, branch: v}))} />
         </Box>
         <Box>
          <InputField label="File Path" value={context.path} onChange={v => setContext(p => ({...p, path: v}))} />
         </Box>
      </Box>

      <Stack spacing={2}>
        {links.map(link => (
          <Paper 
            key={link.label} 
            variant="outlined" 
            sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              bgcolor: 'background.neutral',
              borderColor: 'divider',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'background.paper' },
              transition: 'all 0.2s'
            }}
          >
            <Box sx={{ overflow: 'hidden', mr: 2 }}>
               <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.disabled', lineHeight: 1 }}>
                {link.label}
               </Typography>
               <Typography variant="body2" sx={{ 
                 fontFamily: '"Fira Code", monospace', 
                 fontSize: '0.7rem', 
                 color: 'text.secondary',
                 whiteSpace: 'nowrap',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis'
               }}>
                {link.url}
               </Typography>
            </Box>
            <Tooltip title="Copy Link">
              <IconButton 
                size="small" 
                onClick={() => onCopy(link.url, link.label)}
                sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
              >
                <ContentCopyIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default GitHubTab;
