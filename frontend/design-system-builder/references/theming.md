# Theming (Multi-Brand, Dark/Light)

## Default: single-variant DS

When the DS has only one color variant, **there is no `scope/` directory**. Both light and dark semantic tokens live directly in `base/base.css`:

```css
:root.light { /* semantic tokens */ }
:root.dark  { /* semantic tokens */ }
```

## Multi-Brand / Multi-Variant Strategy

Use `scope/` **only** when the DS has more than one color variant (brands, white-labels, etc.)

- Each brand gets its own `scope/theme-{brand}.css` file containing `:root.light` + `:root.dark`
- Each brand may get a `base/base-{brand}.css` file that overrides primitives
- Components remain identical across all brands — they only consume semantic tokens

## Scope Layer (multi-variant only)

File: `scope/theme-{brand}.css`

Each scope file overrides Tier 2 semantic tokens for a specific brand and mode

```css
/* Both modes live in the same file — scope/theme-brand-a.css */

:root.light {
  --color-bg-primary: var(--color-blue-500);
  --color-text-default: var(--color-gray-900);
  --color-border-default: var(--color-gray-300);
}

:root.dark {
  --color-bg-primary: var(--color-blue-400);
  --color-text-default: var(--color-gray-50);
  --color-border-default: var(--color-gray-600);
}
```

## Dark / Light Mode

- **Primary mechanism:** CSS class on `:root` — `:root.light` or `:root.dark`
- **Both modes live in the same `scope/theme-{brand}.css` file** — never split into separate files
- **Fallback for auto-detect:** `@media (prefers-color-scheme: dark)`

```css
:root.light {
  --color-surface: #ffffff;
  --color-text-default: #111827;
}

:root.dark {
  --color-surface: #111827;
  --color-text-default: #f9fafb;
}
```

## Theme Delivery via `ch-theme`

Use `ch-theme` + `adoptedStyleSheets` for shared-memory CSS delivery:

```
ch-theme
  │
  getBundles() → ThemeModel
  │
  fetch CSS → new CSSStyleSheet() → sheet.replaceSync(css)
  │
  ├── component-1.shadowRoot.adoptedStyleSheets = [sheet]
  ├── component-2.shadowRoot.adoptedStyleSheets = [sheet]
  └── component-3.shadowRoot.adoptedStyleSheets = [sheet]
```

One fetch per bundle, one `CSSStyleSheet` object, N component instances share it in memory. Zero CSS duplication at runtime

## Anti-Patterns

- DO NOT put theme logic (`.dark & { ... }`) inside component CSS
- DO NOT reference primitive tokens directly from component CSS
- DO NOT use JavaScript for theme switching when CSS classes suffice
- ALL theme logic lives exclusively in `scope/`

## Rules

- Components NEVER reference primitives directly. They consume ONLY semantic tokens
- Target size per scope file: ≤25 KB
