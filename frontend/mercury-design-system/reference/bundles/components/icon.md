# Icon

Bundle name: `"components/icon"`

Implementation: [icon.css](./icon.css)

Provides icon sizing classes and an icon-with-text layout utility. Two class families exist: `icon-{size}` for `ch-image` components (sets `--ch-image-size`), and `icon-size-{size}` for standalone elements (sets explicit dimensions with `--icon-path` background)

## Classes

### `icon-xs`

Applies to the components: `ch-image`

Extra small icon (12px). Sets `--ch-image-size: var(--icon-xs)`. Use for inline indicators, status dots, and compact UI elements

### `icon-s`

Applies to the components: `ch-image`

Small icon (14px). Sets `--ch-image-size: var(--icon-s)`. Use for compact component icons within dense layouts

### `icon-m`

Applies to the components: `ch-image`

Medium icon (16px). Sets `--ch-image-size: var(--icon-m)`. Standard size for component icons, buttons, and form elements

### `icon-l`

Applies to the components: `ch-image`

Large icon (20px). Sets `--ch-image-size: var(--icon-l)`. Use for navigation items, medium-emphasis standalone icons

### `icon-xl`

Applies to the components: `ch-image`

Extra large icon (24px). Sets `--ch-image-size: var(--icon-xl)`. Use for primary actions, standalone interactive icons

### `icon-xxl`

Applies to the components: `ch-image`

Extra extra large icon (32px). Sets `--ch-image-size: var(--icon-xxl)`. Use for feature icons, onboarding illustrations, empty states

### `icon-size-xs`

Applies to the components: Any element (standalone icon via background)

Extra small standalone icon (12px). Sets explicit `inline-size` and `block-size` to `var(--icon-xs)` and renders the icon from the `--icon-path` CSS custom property as a background image

### `icon-size-s`

Applies to the components: Any element (standalone icon via background)

Small standalone icon (14px). Sets dimensions to `var(--icon-s)` with `--icon-path` background

### `icon-size-m`

Applies to the components: Any element (standalone icon via background)

Medium standalone icon (16px). Sets dimensions to `var(--icon-m)` with `--icon-path` background

### `icon-size-l`

Applies to the components: Any element (standalone icon via background)

Large standalone icon (20px). Sets dimensions to `var(--icon-l)` with `--icon-path` background

### `icon-size-xl`

Applies to the components: Any element (standalone icon via background)

Extra large standalone icon (24px). Sets dimensions to `var(--icon-xl)` with `--icon-path` background

### `icon-size-xxl`

Applies to the components: Any element (standalone icon via background)

Extra extra large standalone icon (32px). Sets dimensions to `var(--icon-xxl)` with `--icon-path` background

### `icon-and-text`

Applies to the components: Container elements (`div`, `span`, `a`, `button`)

Inline grid layout that places an icon and text side by side with `gap: var(--spacing-gap-m)` (8px). Use to pair any icon with a text label

```html
<div class="icon-and-text">
  <ch-image class="icon-m" src="settings.svg"></ch-image>
  <span>Settings</span>
</div>
```
