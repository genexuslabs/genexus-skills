# Usage & Consumption

How applications consume the Design System built with this skill

## Architecture

```
Application code
  │
  ├── <ch-theme [model]="bundles">   ← Injects CSS into shadow DOM
  │     │
  │     getBundles(bundleNames, basePath)   ← Returns ThemeModel
  │     │
  │     fetch CSS → CSSStyleSheet → adoptedStyleSheets
  │     │
  │     └── N component instances share 1 CSSStyleSheet in memory
  │
  ├── CSS classes on Chameleon host elements
  │     <ch-edit class="input">
  │     <button class="button-primary button-icon-and-text">
  │
  └── Theme class on <html>
        <html class="theme-{brand}-light">
```

## Step 1 — Install the DS Package

```bash
npm install @{ds-name}/design-system
```

Or copy the DS directory into the application

## Step 2 — Load Critical CSS (Tier 1)

Inline resets and base tokens in `<head>` for first paint:

```html
<head>
  <style>
    /* resets/box-sizing.css */
    *, *::before, *::after { box-sizing: border-box; }
  </style>
  <link rel="stylesheet" href="/ds/base/base.css" />
</head>
```

## Step 3 — Apply Theme Class

Set the theme on the root element:

```html
<html class="theme-{brand}-light">
```

For dark mode:

```html
<html class="theme-{brand}-dark">
```

Load the scope CSS early (Tier 2), before components render:

```html
<link rel="stylesheet" href="/ds/scope/theme-{brand}.css" />
```

## Step 4 — Use `ch-theme` + `getBundles` for Component CSS

`ch-theme` is a Chameleon component that delivers CSS bundles to web components via `adoptedStyleSheets`. This is the primary mechanism for loading component and utility CSS (Tier 3 — on-demand)

### Creating a getBundles function

Each DS must provide a `getBundles` function (or equivalent) that returns a `ThemeModel` for `ch-theme`:

```ts
// ds/bundles.js
export function getBundles(bundleNames, basePath = "/ds/") {
  return bundleNames.map(name => ({
    name,
    url: `${basePath}${name}.css`
  }));
}
```

### Using in the application

```ts
import { getBundles } from "@{ds-name}/design-system/bundles.js";

const bundles = getBundles(
  ["components/button", "components/edit", "utils/form", "utils/spacing"],
  "/assets/ds/"
);
```

Template:

```html
<ch-theme model={bundles}>
  <!-- Components here use the DS styles -->
  <button class="button-primary">Save</button>
  <ch-edit class="input" accessible-name="Name"></ch-edit>
</ch-theme>
```

### Bundle naming convention

Bundles follow the directory structure:

| Bundle name | File path |
|---|---|
| `components/button` | `components/button.css` |
| `components/dialog` | `components/dialog.css` |
| `utils/spacing` | `utils/spacing.css` |
| `utils/typography` | `utils/typography.css` |
| `chameleon/scrollbar` | `chameleon/scrollbar.css` |

## Step 5 — Apply CSS Classes

DS classes are applied directly to Chameleon host elements and native HTML elements:

```html
<!-- Chameleon components with DS classes -->
<ch-dialog class="dialog">
  <div slot="header" class="heading-3">Title</div>
  <div class="spacing-body">Content</div>
</ch-dialog>

<ch-accordion-render class="accordion-filled" model={items}>
</ch-accordion-render>

<ch-edit class="input" accessible-name="Email"></ch-edit>

<!-- Native elements with DS classes -->
<button class="button-primary button-icon-and-text">
  <span class="body-regular-m">Action</span>
</button>

<div class="elevation-1 spacing-body">
  <p class="body-regular-m">Card content</p>
</div>
```

## Step 6 — Framework Integration

### React

```tsx
import { getBundles } from "@{ds-name}/design-system/bundles.js";

function App() {
  const bundles = getBundles(
    ["components/button", "utils/form"],
    "/ds/"
  );

  return (
    <ch-theme model={bundles}>
      <button className="button-primary">Click</button>
    </ch-theme>
  );
}
```

### Angular

```ts
import { getBundles } from "@{ds-name}/design-system/bundles.js";

@Component({
  template: `
    <ch-theme [model]="bundles">
      <button class="button-primary">Click</button>
    </ch-theme>
  `
})
export class AppComponent {
  bundles = getBundles(["components/button", "utils/form"], "/ds/");
}
```

### Vanilla / Kasstor / Lit

```ts
import { getBundles } from "@{ds-name}/design-system/bundles.js";

const theme = document.querySelector("ch-theme");
theme.model = getBundles(
  ["components/button", "utils/form"],
  "/ds/"
);
```

## Anti-Patterns

- DO NOT load all component CSS upfront. Use `getBundles` to load only what the page needs
- DO NOT duplicate CSS. `ch-theme` shares `CSSStyleSheet` objects across component instances
- DO NOT use inline styles for values that have tokens. Always use CSS classes
- DO NOT mix theme scope classes. One theme class per root element at a time
