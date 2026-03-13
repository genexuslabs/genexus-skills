# Performance & CSS Loading Strategy

## 3-Tier CSS Loading

```
┌──────────────────────────────────────────────────────────────┐
│ Tier 1: CRITICAL (inlined in <head> as <style>)              │
│   - resets/box-sizing.css                                    │
│   - base/base.css (tokens + @font-face)                      │
│   Goal: Render first paint without network fetch              │
├──────────────────────────────────────────────────────────────┤
│ Tier 2: EARLY (loaded when ch-theme mounts)                  │
│   - scope/theme-{brand}.css                                  │
│   - base/icons.css (body-end, fetchPriority: "low")          │
│   Goal: Semantic tokens available before component render     │
├──────────────────────────────────────────────────────────────┤
│ Tier 3: ON-DEMAND (loaded per component via ch-theme)        │
│   - components/button.css, dialog.css, etc.                  │
│   - utils/typography.css, spacing.css, etc.                  │
│   Goal: Zero unnecessary CSS. Only what the DOM needs.       │
└──────────────────────────────────────────────────────────────┘
```

## Performance Budgets

| Resource | Budget |
|---|---|
| Component CSS | ≤10 KB minified / ≤5 KB gzipped |
| Base bundle | ≤50 KB |
| Scope bundle | ≤25 KB |
| Critical CSS (inlined) | ≤15 KB ideal |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |

## CSS Performance Patterns

| Pattern | Implementation | Benefit |
|---|---|---|
| Flat selectors | `.button-primary` (single class) | O(1) matching |
| Zero specificity wrappers | `:where(button, a)` | No cascade conflicts |
| Compositor-only animations | `transform`, `opacity` | 60fps, zero layout/paint |
| Logical properties | `padding-block`, `inline-start` | RTL for free |
| Zero `!important` | `:where()` + CSS layers | Predictable cascade |
| `round()` CSS function | `round(1em * var(--line-height), 1px)` | Pixel-perfect line-height |
| `touch-action: manipulation` | On all interactives | Eliminates 300ms tap delay |
| `content-visibility: auto` | On heavy components | Skip rendering off-screen |

## Build Pipeline

```
SCSS source
  │
  ├─→ Dart Sass compile
  ├─→ PostCSS (autoprefixer, cssnano)
  ├─→ Hashed output files (button-abc123.css → immutable cache)
  │
  └─→ Distribution by tier:
        ├─→ Inline <style>   → base, resets (FCP optimization)
        ├─→ Preload <link>   → icons, scope
        └─→ On-demand        → components, utils (via ch-theme)
```

## Additional Optimizations

- Extract shared `@keyframes` into `resets/` or `base/` to avoid duplication
- Use `content-visibility: auto` on heavy components (`tabular-grid`, `tree-view`, `list-box`)
- Use hashed filenames for immutable cache headers
