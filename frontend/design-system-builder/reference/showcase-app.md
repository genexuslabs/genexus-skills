# Showcase App

> A navigable mini-application to browse all components, tokens, and design guidelines
> of the Design System. Built with Kasstor + Chameleon, styled by the DS itself

## Purpose

The showcase is the **first consumer** of the Design System. It serves as:
- Live documentation for designers and developers
- Visual regression baseline
- Proof that the DS works end-to-end with Chameleon components
- Demo for stakeholders

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Web components** | Kasstor (Lit-based, `.lit.ts` files, `@Component` decorator) |
| **UI library** | Chameleon web components (`ch-*`) |
| **Styling** | The DS itself via `ch-theme` + `getBundles` |
| **Build** | Vite with `kasstor()` plugin |
| **Language** | TypeScript with experimental decorators |

## Directory Structure

```
showcase/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── src/
│   ├── main.ts                         # Entry point — imports all page components
│   ├── app.lit.ts                      # Shell: sidebar navigation + content area
│   ├── pages/
│   │   ├── overview.lit.ts             # DS overview and quick start
│   │   ├── foundations/
│   │   │   ├── colors.lit.ts           # Color palette display (all categories)
│   │   │   ├── typography.lit.ts       # Typography scale samples
│   │   │   ├── spacing.lit.ts          # Spacing scale visual guide
│   │   │   └── icons.lit.ts            # Icon gallery with sizes
│   │   ├── components/
│   │   │   ├── button.lit.ts           # Button variants and states
│   │   │   ├── accordion.lit.ts        # Accordion demos
│   │   │   ├── dialog.lit.ts           # Dialog demos
│   │   │   ├── checkbox.lit.ts         # Checkbox demos
│   │   │   ├── switch.lit.ts           # Switch demos
│   │   │   ├── tabs.lit.ts             # Tab demos
│   │   │   └── ...                     # One page per DS component
│   │   └── guidelines/
│   │       ├── accessibility.lit.ts    # A11y guidelines and demos
│   │       └── patterns.lit.ts         # Design patterns (forms, buttons, etc.)
│   ├── styles/
│   │   └── showcase-overrides.scss     # Temporary styles for unstyled components
│   └── utils/
│       └── bundles.ts                  # getBundles wrapper configured for the DS
```

## Kasstor Quick Reference

### Component Pattern

```typescript
import { Component, KasstorElement } from "@genexus/kasstor-core";
import { html } from "lit";
import styles from "./button-page.scss?inline";

@Component({
  tag: "showcase-button-page",
  styles: styles
})
export class ButtonPage extends KasstorElement {
  render() {
    return html`
      <section>
        <h2 class="heading-2">Button</h2>
        <p class="body-regular-m">Primary actions and interactions.</p>

        <div class="showcase-grid">
          <button class="button-primary">Primary</button>
          <button class="button-secondary">Secondary</button>
          <button class="button-tertiary">Tertiary</button>
          <button class="button-primary" disabled>Disabled</button>
        </div>
      </section>
    `;
  }
}
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { kasstor } from "@genexus/vite-plugin-kasstor";

export default defineConfig({
  plugins: [kasstor()]
});
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "lib": ["ES2021", "DOM", "DOM.Iterable"]
  },
  "include": ["src"]
}
```

### Entry Point

```typescript
// src/main.ts
import "./app.lit";
import "./pages/overview.lit";
import "./pages/foundations/colors.lit";
import "./pages/foundations/typography.lit";
import "./pages/foundations/spacing.lit";
import "./pages/foundations/icons.lit";
import "./pages/components/button.lit";
// ... import all page components to register their tags
```

### HTML Shell

```html
<!-- index.html -->
<!DOCTYPE html>
<html class="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{DS Name} Showcase</title>
  <!-- Tier 1: Critical CSS (inlined) -->
  <style>/* Contents of resets/box-sizing.css + base/base.css */</style>
</head>
<body>
  <!-- Tier 2+3: DS bundles via ch-theme -->
  <ch-theme model=""></ch-theme>
  <showcase-app></showcase-app>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

## App Shell Pattern

The shell uses `ch-sidebar` + `ch-navigation-list-render` for navigation:

```typescript
@Component({
  tag: "showcase-app",
  styles: styles
})
export class ShowcaseApp extends KasstorElement {
  render() {
    return html`
      <ch-sidebar>
        <ch-navigation-list-render
          slot="navigation"
          .model=${this.navigationModel}
          @itemClick=${this.handleNavigation}
        ></ch-navigation-list-render>

        <main>
          <!-- Dynamic page rendering based on route -->
        </main>
      </ch-sidebar>
    `;
  }
}
```

Navigation sections:
1. **Overview** — DS summary, quick start
2. **Foundations** — Colors, Typography, Spacing, Icons
3. **Components** — One entry per DS component
4. **Guidelines** — Accessibility, Design Patterns

## Temporary Styles Workflow

> **CRITICAL FLOW**: This workflow ensures the showcase always looks complete, even when
> the DS is still under construction

### How It Works

1. When a Chameleon component is used in the showcase but **not yet styled** in the DS (no corresponding `.css` in `components/`), add temporary styles in `showcase-overrides.scss`

2. Each temporary block MUST be marked with a clear comment:

```scss
// =========================================================
// TEMP: ch-dialog — Remove when DS adds components/dialog.css
// =========================================================
.dialog::part(dialog) {
  border-radius: 8px;
  background-color: var(--color-accent-surface-elevation-2);
}
.dialog::part(header) {
  padding: var(--spacing-padding-xl);
  border-block-end: 1px solid var(--color-border-neutral-default);
}
// =========================================================
// END TEMP: ch-dialog
// =========================================================
```

3. When the DS adds the component's `.css` file (e.g., `components/dialog.css`):
   - **Remove** the entire temporary block from `showcase-overrides.scss`
   - **Add** the new DS bundle to the showcase's `getBundles` call
   - The component now uses the real DS styles

### Rules for Temporary Styles

- Use ONLY design tokens (same tokens the DS uses) — never hardcode values
- Follow the same 5-section structure as real component CSS
- Follow the same `::part()` rules (only valid parts from the component's `styling.md` — consult the **chameleon-controls-library** skill)
- Keep temporary styles minimal — just enough to make the showcase look presentable
- Mark start AND end of each temporary block clearly
- One component per temporary block, never mix components

### Tracking Unstyled Components

The showcase should display a visual indicator (e.g., a subtle badge or border) on components that are still using temporary styles. This helps the team track DS completion progress

## Scaffold Script

Generate the showcase structure using the separate scaffold script:

```bash
node <path-to-skill>/scripts/scaffold-showcase.mjs \
  --ds-dir <path-to-ds> \
  --ds-name <ds-name> \
  --components button,dialog,accordion,checkbox,switch,tabs
```

The script creates the full directory structure, `package.json`, config files, shell component, page stubs for each component + foundations, and `showcase-overrides.scss` with temporary block markers for all listed components

## Running the Showcase

```bash
cd showcase
npm install
npm run dev    # Starts Vite dev server with HMR
```

Changes to `.lit.ts` files hot-reload instantly via Kasstor's HMR support
