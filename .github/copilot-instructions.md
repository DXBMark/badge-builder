# Project Guidelines

## Code Style
- **Stack**: React 19, Material UI v9, TypeScript, Tailwind, PostCSS.
- **File Extensions**: Use `.jsx` for React components and `.ts` for core logic/types. Avoid `.js` where `.ts` can be used.
- **Centralized Styling**: Do not use ad-hoc hex values in components. All styling flows through `src/constants/brands.js` and `src/constants/presets.js`.
- **Headers**: Maintain the file header comment pattern (e.g., `// Purpose: ...`) if present.

## Architecture
- **Decoupled SVG Renderer**: The core renderer (`src/core/svgRenderer.ts`) is pure TypeScript. It must **never** contain React or MUI dependencies.
- **Component Isolation**: UI Tabs (`src/components/Tabs/`) are responsible only for state updates—they do not calculate SVG geometry.
- **Data Immutability**: Complex state mutations (like applying brand kits) must use deep copies.
- For more details on architectural principles, refer to `docs/GOVERNANCE.md`.

## Build and Diagnostics
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Tests**: Currently unprotected by tests. Exercise extreme caution when modifying `src/core/svgRenderer.ts` or sanitization logic.

## Conventions
- **SVG Sanitization**: All custom SVG uploads MUST be sanitized before rendering (script tag removal is non-negotiable). See `src/utils/sanitize.js`.
- **Limits**: Max custom SVG upload size is 500KB. Icon scaling must be clamped to 0.1–3.0.
