# Icons System

> For the complete catalog of Mercury built-in icons, how to use `getIconPath`/`getIconPathExpanded`, and colorType references per category, see **[Mercury Icons](../icons/README.md)**

Mercury uses **Material Symbols** as its icon foundation, loaded via the `base/base` bundle (icons.css)

## Icon Library

Material Symbols is a consistent, scalable icon family designed for digital interfaces. It provides a clear and familiar visual language across Mercury products

## Icon Size Tokens

Mercury provides semantic icon size tokens defined in `base/base`. Always use these tokens or the corresponding CSS classes — never hardcode icon dimensions

| Token | Value | Size label |
|-------|-------|------------|
| `--icon-xs` | 12px | Extra small |
| `--icon-s` | 14px | Small |
| `--icon-m` | 16px | Medium |
| `--icon-l` | 20px | Large |
| `--icon-xl` | 24px | Extra large |
| `--icon-xxl` | 32px | Extra extra large |

## Icon Size Classes (bundle: `components/icon`)

Two class families are available for sizing icons:

### `icon-{size}` — For `ch-image` components

Sets `--ch-image-size` on Chameleon image components. Use when rendering icons via `ch-image`

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

Sets explicit `inline-size` and `block-size` on the element and renders the icon via `background` using `--icon-path`. Use for non-`ch-image` icon containers

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

Creates an inline grid layout with icon and text side by side, with `gap: var(--spacing-gap-m)` (8px) between them

```html
<div class="icon-and-text">
  <ch-image class="icon-m" src="icon.svg" alt=""></ch-image>
  <span>Settings</span>
</div>
```

## Reconstructing Icon Sizes from Figma

When a Figma design specifies a raw px icon size, find the closest token:

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

- **Minimum touch area:** 24px × 24px
- **Recommended touch area:** 44px × 44px (especially for mobile)
- Even if the visual icon is 16px or 20px, its clickable area should be at least 24px

## Icon Colors

Icons use a dedicated token category (`--color-icon-*`) to ensure visual consistency. Never use text or accent tokens for icon colors

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
| `--color-icon-neutral-white` | Always white icon |
| `--color-icon-neutral-black` | Always black icon |
| `--color-icon-neutral-neutral` | Mid-gray icon |

### Feedback Icons

| Token | Usage |
|-------|-------|
| `--color-icon-error-default` | Error state icon |
| `--color-icon-success-default` | Success state icon |
| `--color-icon-warning-default` | Warning state icon |

## Mercury Icon Bundle

Bundle: `components/icon`

The icon bundle provides styling for icon containers. Use it when placing standalone icons or icons within Mercury components

## Usage Rules

- Always use `--color-icon-*` tokens for icon colors — never `--color-text-*`
- Use `button-icon-only` class for icon-only buttons (with accessible name)
- Use `button-icon-and-text` class when combining icon + text in a button
- Ensure all interactive icons have accessible names (via `aria-label` or `accessible-name`)
