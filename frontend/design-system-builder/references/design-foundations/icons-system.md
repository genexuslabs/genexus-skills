# Icons System

How to define an icon system for a design system

## Icon Library Selection

Choose a consistent icon library for the DS. Options:
- **Material Symbols** — Large, consistent set for general-purpose UIs
- **Custom SVG set** — Brand-specific icons, full control over style
- **Hybrid** — Base library + custom icons for brand-specific needs

The icon library is loaded via the `base/base` bundle (icons stylesheet)

## Icon Size Tokens

Define semantic icon size tokens in `base/base`. Always use these tokens or corresponding CSS classes — never hardcode icon dimensions

| Token | Typical value | Size label |
|-------|---------------|------------|
| `--icon-xs` | 12px | Extra small |
| `--icon-s` | 14px | Small |
| `--icon-m` | 16px | Medium |
| `--icon-l` | 20px | Large |
| `--icon-xl` | 24px | Extra large |
| `--icon-xxl` | 32px | Extra extra large |

These tokens are global (defined in base), no bundle import required to use as CSS custom properties

## Icon Size Classes (bundle: `components/icon`)

Two class families for sizing icons:

### `icon-{size}` — For `ch-image` components

Sets `--ch-image-size` on Chameleon image components

| Class | Size | Use case |
|-------|------|----------|
| `icon-xs` | 12px | Inline small icons, indicators |
| `icon-s` | 14px | Compact component icons |
| `icon-m` | 16px | Standard component icons, buttons |
| `icon-l` | 20px | Navigation, medium emphasis |
| `icon-xl` | 24px | Primary actions, standalone icons |
| `icon-xxl` | 32px | Feature icons, onboarding |

```html
<ch-image class="icon-m" src="icon.svg" alt="Settings"></ch-image>
```

### `icon-size-{size}` — For standalone icon elements

Sets explicit `inline-size` and `block-size` and renders the icon via `background` using `--icon-path`

| Class | Size |
|-------|------|
| `icon-size-xs` | 12px |
| `icon-size-s` | 14px |
| `icon-size-m` | 16px |
| `icon-size-l` | 20px |
| `icon-size-xl` | 24px |
| `icon-size-xxl` | 32px |

```html
<span class="icon-size-m" style="--icon-path: url('icon.svg')"></span>
```

### `icon-and-text` — Icon + text layout

Creates an inline grid layout with icon and text side by side, with `gap: var(--spacing-gap-m)` between them

```html
<div class="icon-and-text">
  <ch-image class="icon-m" src="icon.svg" alt=""></ch-image>
  <span>Settings</span>
</div>
```

## Reconstructing Icon Sizes from Figma

When a design specifies a raw px icon size, find the closest token:

| px from design | Token | Class |
|---------------|-------|-------|
| 12px | `--icon-xs` | `icon-xs` |
| 14px | `--icon-s` | `icon-s` |
| 16px | `--icon-m` | `icon-m` |
| 20px | `--icon-l` | `icon-l` |
| 24px | `--icon-xl` | `icon-xl` |
| 32px | `--icon-xxl` | `icon-xxl` |

## Touch Areas

For accessible and usable experiences, respect minimum touch areas when using icons as interactive elements:

- **Minimum touch area:** 24px x 24px (WCAG 2.2 Level AA)
- **Recommended touch area:** 44px x 44px (especially for mobile)
- Even if the visual icon is 16px or 20px, its clickable area should be at least 24px

## Icon Color Tokens

Icons use a dedicated token category (`--color-icon-*`) to ensure visual consistency. **Never use text or accent tokens for icon colors.**

### Primary Icons

| Token | Usage |
|-------|-------|
| `--color-icon-primary-default` | Primary accent icon |
| `--color-icon-primary-hover` | Primary icon on hover |
| `--color-icon-primary-pressed` | Primary icon when pressed |
| `--color-icon-primary-on-default` | Icon on primary surface |
| `--color-icon-primary-on-hover` | Icon on primary hover surface |
| `--color-icon-primary-on-pressed` | Icon on primary pressed surface |

### Neutral Icons

| Token | Usage |
|-------|-------|
| `--color-icon-neutral-default` | **Standard icon color** |
| `--color-icon-neutral-hover` | Icon on hover |
| `--color-icon-neutral-pressed` | Icon when pressed |
| `--color-icon-neutral-disabled` | Disabled icon |
| `--color-icon-neutral-white` | Always white icon (optional) |
| `--color-icon-neutral-black` | Always black icon (optional) |
| `--color-icon-neutral-neutral` | Mid-gray icon (optional) |

### Feedback Icons

| Token | Usage |
|-------|-------|
| `--color-icon-error-default` | Error state icon |
| `--color-icon-success-default` | Success state icon |
| `--color-icon-warning-default` | Warning state icon |

## Usage Rules

- Always use `--color-icon-*` tokens for icon colors — never `--color-text-*`
- Use `button-icon-only` class for icon-only buttons (must have accessible name)
- Use `button-icon-and-text` class when combining icon + text in a button
- Ensure all interactive icons have accessible names (via `aria-label` or `accessible-name`)

## Icon Implementation Patterns

Most icons in a DS are decorative (they embellish the UI but don't carry meaning that would be lost without them). The implementation technique depends on whether the icon is decorative or semantic, and whether it needs dynamic color

- **Decorative monochrome icons** — Use `ch-image` with `type="mask"`. The icon renders via CSS `mask-image` with `background-color: currentColor`, so the color adapts automatically to the theme, pseudo-states, and inherited text color. This is the standard approach for most DS icons
- **Decorative multicolor icons** — Use `ch-image` with `type="background"` (default). The icon renders via `background-image` with its original colors intact
- **Decorative icons via CSS** — For icons that don't need Chameleon's multi-state support, use CSS pseudo-elements (`::before`/`::after`) with `mask-image` (monochrome) or `background-image` (multicolor). This is the lightest approach — no DOM node created
- **Semantic images** — Use `<img>` with a descriptive `alt` attribute. Examples: company logos, product photos, charts

> **You MUST read the chameleon-controls-library skill** — specifically `references/icons-and-images.md` — before implementing any icon or image in the DS. It covers semantic vs decorative decisions, `mask-image` techniques, responsive images, `ch-image` usage, and `startImgSrc`/`endImgSrc` in component models. The summary above is not a substitute for the full guide

## Global Icon Resolution

Every DS built on Chameleon should register a global icon resolver so that consumers can reference icons by short keys (e.g., `"settings"`) instead of full file paths. This is done via Chameleon's Registry Property System

### Implementing a resolver

The resolver maps icon keys to `GxImageMultiState` objects (with paths for base, hover, active, disabled states). When a key doesn't match any DS icon, fall back to `{ base: src }` so custom icons outside the DS still work:

```typescript
import { registryProperty } from "@genexus/chameleon-controls-library/dist/collection";

const dsIcons: Record<string, GxImageMultiState> = {
  "settings": {
    base: "assets/icons/settings.svg",
    hover: "assets/icons/settings-hover.svg",
    disabled: "assets/icons/settings-disabled.svg"
  }
  // ... more icons
};

const resolve = (src: string): GxImageMultiState =>
  dsIcons[src] ?? { base: src };

// Register globally for all Chameleon components
registryProperty("getImagePathCallback", {
  "ch-image": resolve,
  "ch-accordion-render": resolve,
  "ch-combo-box-render": (item, direction) =>
    resolve(item[direction === "start" ? "startImgSrc" : "endImgSrc"]),
  "ch-tree-view-render": (item, iconDirection) =>
    resolve(item[iconDirection === "start" ? "startImgSrc" : "endImgSrc"])
  // ... other components as needed
});
```

This registration should happen once during the DS's installation/bootstrap step. After registration, every Chameleon component that supports `getImagePathCallback` automatically resolves icon paths — no per-instance prop binding needed

> **You MUST read the chameleon-controls-library skill** — specifically `references/registry.md` — before implementing icon resolution. It documents the full Registry Property System: per-component callback signatures, supported components, and the `GxImageMultiState` type. The example above is a starting point, not the complete picture

## Icons in Component Models

Many Chameleon components render icons in their item models through `startImgSrc`/`endImgSrc` properties:

```typescript
const items = [
  {
    caption: "Settings",
    startImgSrc: "settings",       // Resolved by the global icon resolver
    startImgType: "mask",          // "mask" for monochrome, "background" for multicolor
    endImgSrc: "chevron-right",
    endImgType: "mask"
  }
];
```

- **`startImgSrc`** — Icon at the leading edge (left in LTR)
- **`endImgSrc`** — Icon at the trailing edge (right in LTR)
- **`startImgType` / `endImgType`** — `"mask"` for monochrome themeable icons, `"background"` for multicolor icons

When the global resolver is registered, consumers pass short icon keys. The DS classes for icon sizing (`icon-m`, `icon-l`, etc.) apply to `ch-image` instances, while icons inside component item models are sized by the component's own CSS
