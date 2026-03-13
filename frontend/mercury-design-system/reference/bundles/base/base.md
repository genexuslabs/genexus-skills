# Base

Bundle name: `"base/base"`

Implementation: [base.css](./base.css), [base-globant.css](./base-globant.css), [icons.css](./icons.css)

The base bundle is **required for every Mercury application**. It provides:

- **CSS custom properties (design tokens):** All `--color-*`, `--font-*`, `--line-height-*`, and spacing tokens used by other bundles
- **Icon font:** Material Symbols loaded via `icons.css`
- **Theme tokens:** Default values for the Mercury theme (or Globant theme via `base-globant.css`)
- **Font loading:** Inter typeface configuration

## Classes

### `dark`

Applies to the components: `html`

Sets the dark color mode. Apply this class to the `<html>` element to activate dark mode tokens. All `--color-*` tokens automatically switch to their dark-mode values. Mercury components and utility classes adapt automatically — no additional code needed

```html
<html class="dark">
```

### `light`

Applies to the components: `html`

Sets the light color mode. Apply this class to the `<html>` element to activate light mode tokens. This is the default mode — if neither `dark` nor `light` is set, light mode is used

```html
<html class="light">
```

## Theme Variants

- **Mercury theme:** Use `base.css` (default). Loaded automatically by `getBundles`
- **Globant theme:** Use `base-globant.css` instead. Set via Vite plugin `theme: "globant"` or CLI `--globant` flag

## What the base bundle provides

| Feature | Description |
|---------|-------------|
| Color tokens | `--color-text-*`, `--color-accent-*`, `--color-border-*`, `--color-icon-*`, `--color-component-*` |
| Typography tokens | `--font-family-header`, `--font-family-body`, `--font-size-*`, `--font-style-*`, `--line-height-*` |
| Icon font | Material Symbols via `icons.css` |
| Dark/light mode | Automatic token switching via `dark`/`light` classes |
