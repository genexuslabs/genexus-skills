# Directory Structure

Every DS built with this skill MUST follow this structure. All files and folders listed are mandatory

```
{ds-name}/
├── tokens/
│   ├── primitive.json          # Tier 1 raw values (DTCG format)
│   ├── semantic.json           # Tier 2 intent-based aliases (DTCG format)
│   └── component.json          # Tier 3 per-component aliases (DTCG format)
├── resets/
│   └── box-sizing.css          # Universal reset
├── base/
│   ├── base.css                # Tier 1 primitives + Tier 2 semantic tokens (:root.light / :root.dark)
│   └── base-{variant}.css      # Brand-variant override of primitives (one per brand)
├── scope/                      # OPTIONAL — only when the DS has multiple color variants
│   ├── theme-{brand-a}.css     # Overrides semantic tokens for brand A — :root.light + :root.dark in one file
│   └── theme-{brand-b}.css     # Overrides semantic tokens for brand B — :root.light + :root.dark in one file
├── chameleon/
│   └── scrollbar.css           # Web component-level overrides (e.g., scrollbar styling)
├── components/
│   ├── button.css
│   ├── button.md
│   ├── edit.css
│   ├── edit.md
│   └── ...                     # One .css + one .md per component (co-located)
├── utils/
│   ├── spacing.css
│   ├── typography.css
│   ├── elevation.css
│   ├── layout.css
│   ├── form.css
│   └── link.css
├── docs/
│   ├── SKILL.md                # Entry-point for humans and AI agents
│   └── references/
│       ├── component-bundles-table.md
│       ├── bundles-index.md
│       ├── themes-and-variants.md
│       ├── api/
│       └── installation/
├── architecture.md             # Auto-generated Mermaid architecture diagram
├── CHANGELOG.md
└── package.json
```

## ITCSS Layer Order

Maintain six ITCSS-inspired layers in **strict order**:

1. `resets/` — Universal resets (box-sizing)
2. `base/` — Tier 1 primitive tokens as CSS custom properties + `@font-face`
3. `scope/` — Tier 2 semantic tokens per brand/theme
4. `chameleon/` — Web component-level overrides (scrollbar, etc.)
5. `utils/` — Utility classes (spacing, typography, elevation, layout, form, link)
6. `components/` — Component-specific CSS + documentation

## Rules

- Co-locate each component's `.css` and `.md` in the same directory (`components/`)
- Never place theme logic inside `components/` or `utils/`
- Every brand gets its own `scope/theme-{brand}.css` file
- Every brand may get a `base/base-{brand}.css` that overrides primitives
- The `docs/` directory follows a 3-level navigation: `SKILL.md` → index → detail

## Resets Layer

File: `resets/box-sizing.css`

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Target size: ≤200 B

## Base Layer

File: `base/base.css`

Contains:
1. Tier 1 primitive tokens as CSS custom properties on `:root`
2. Tier 2 semantic tokens on `:root.light` and `:root.dark` — both in this same file
3. `@font-face` declarations with `unicode-range` subsetting (woff2 format)
4. Body defaults

```css
/* Tier 1 — Primitives */
:root {
  --color-blue-500: #3b82f6;
  --color-gray-900: #111827;

  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
}

/* Tier 2 — Semantic tokens — Light */
:root.light {
  --color-surface: #ffffff;
  --color-text: var(--color-gray-900);
  --color-primary: var(--color-blue-500);
}

/* Tier 2 — Semantic tokens — Dark */
:root.dark {
  --color-surface: var(--color-gray-900);
  --color-text: #f9fafb;
  --color-primary: var(--color-blue-400);
}

@font-face {
  font-family: "DSFont";
  src: url("../fonts/dsfont.woff2") format("woff2");
  font-display: swap;
  unicode-range: U+0000-00FF;
}
```

Rules:
- Every `@font-face` MUST include `font-display: swap` to prevent FOIT
- All sizing tokens MUST use `rem` (never `px` for font sizes)
- Target size: ≤50 KB
- The `scope/` layer is **optional** — only create it when the DS has multiple color variants (brands). A single-variant DS needs no `scope/` directory
- Generate `base-{variant}.css` files for each brand that override primitives
