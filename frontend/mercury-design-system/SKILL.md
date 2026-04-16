---
name: mercury-design-system
description: Applies Mercury Design System styling to UIs built with Chameleon. Use when the user mentions Mercury, @genexus/mercury, getBundles, ch-theme, Mercury tokens, or Globant theme — or when styling Chameleon components with a design system.
metadata:
  version: "0.3.0"
  dependencies: "skill:chameleon-controls-library@~0.3.0"
---

# Mercury Design System

Apply Mercury Design System styling to UIs built with Chameleon web components. This skill covers Mercury-specific usage: `ch-theme`, `getBundles`, CSS bundles, CSS classes, design tokens, typography, color, spacing, and design patterns. Use the Chameleon skill to build the component tree; then use this skill to add Mercury styling

## Workflow

> **CRITICAL — Chameleon skill required:** Before writing any component code, you **MUST** invoke the **chameleon-controls-library** skill (via the `Skill` tool). Mercury only handles styling (CSS bundles, classes, tokens) — component APIs (properties, events, slots, model shapes) are documented exclusively in the Chameleon skill. Skipping it leads to wrong prop names, missing events, and broken component wiring

Choose the path that matches the user's request:

### Path A: Implement from a Figma design (image or frame provided)

1. **Detect the theme variant (FIRST)** — Look at the primary action color in the design (buttons, links, focus indicators). Blue → Mercury (default). Green → Globant (`theme: "globant"`). See [How to detect the variant](#how-to-detect-the-variant-from-a-figma-design-or-image). **This determines the `theme` value in `vite-plugin-mercury` and must be resolved before writing any code**
2. **Set up the project with the correct theme** — If scaffolding a new project or the project doesn't exist yet, configure `vite-plugin-mercury` with the detected theme: `mercury({ theme: "mercury" })` or `mercury({ theme: "globant" })`. If the project already exists, verify the theme in `vite.config.ts` matches the design
3. **Analyze the design** — Identify components, layout structure, colors, typography, spacing, and interaction states
4. **Map Figma values to Mercury tokens** — Use [Figma token mapping](references/design-foundations/figma-token-mapping.md) to translate Figma variables, hex values, and font specs into Mercury tokens and classes. **Critical:** Figma font-weights are +100 higher than real — always subtract 100

Then continue with [Common steps](#common-steps-both-paths)

### Path B: Vibe code an unknown UI (no design provided)

1. **Understand intent** — Clarify the UI's purpose and key interactions
2. **Determine the theme** — Ask the user if not specified. Default to Mercury. Configure `vite-plugin-mercury` with the correct `theme` value before writing any component code
3. **Choose design patterns** — Consult [Design patterns](references/design-foundations/design-patterns.md) for Mercury-idiomatic layouts, forms, buttons, and typography hierarchy
4. **Apply design foundations** — Use Mercury [typography](references/design-foundations/typography-system.md), [color](references/design-foundations/color-system.md), and [spacing](references/design-foundations/spacing-system.md) systems

Then continue with [Common steps](#common-steps-both-paths)

### Common steps (both paths)

5. **Load the Chameleon skill** — Invoke `Skill: chameleon-controls-library`. Then use its component references to select the right `ch-*` components and read their exact APIs (props, events, slots, models) for every component you plan to use
6. **Build UI with Chameleon** — Assemble the component tree using the APIs loaded in step 5. Use native `<button>` and `<a>` for buttons and links
7. **Apply Mercury styling** — Import `getBundles`, load required bundles, place `<ch-theme>`, apply CSS classes and design tokens
8. **Use Mercury icons** — For any icon in the UI, use `getIconPath` or `getIconPathExpanded` from `@genexus/mercury/assets-manager.js`. Never hardcode icon paths. See [Mercury Icons](references/icons/README.md) for the full catalog, colorType reference, and usage examples
9. **Validate package versions** — If you installed or updated packages in this session, check that all installed versions are mutually compatible. Read [Compatibility table](references/installation/compatibility.md) and run `npm ls @genexus/mercury @genexus/chameleon-controls-library @genexus/vite-plugin-mercury @genexus/mercury-cli 2>/dev/null`. Always prefer the latest versions
10. **Validate** — Run through the [Do's and Don'ts](#dos-and-donts) checklist below

## Mercury Fundamentals

These rules are non-negotiable. Violating them produces broken or inconsistent UIs

- **Mercury styling = CSS bundles + classes on Chameleon components.** Mercury does not use JS styling or CSS-in-JS — it's pure CSS loaded via `getBundles` and applied via class names
- **Bundle name ≠ CSS class.** The bundle identifier (e.g., `"components/edit"`) does not match the CSS class (e.g., `input`). Always check the bundle's `.md` doc for exact class names
- **`ch-theme` is always a sibling**, never a wrapper. It has `hidden` — any children inside it disappear
- **NEVER invent CSS** when Mercury provides a class or token. Mercury classes handle hover, focus, disabled, dark/light mode automatically
- **Mercury's `base/base` already styles `body`** — it sets `background-color`, `color`, `font-family`, `font-size`, `line-height`, `font-weight`, `display: grid`, `min-block-size: 100dvh`, and `margin: 0`. Never duplicate these in custom CSS. See [Body and root container styles](#body-and-root-container-styles) for the full list
- **ALWAYS use semantic design tokens** (`--color-text-*`, `--color-accent-*`, etc.), never hardcoded hex values. **Never use primitive tokens** (`--color-azure-*`, `--color-neutral-*`, `--color-avocado-*`, `--size-*`, etc.) — these are internal to the design system. If a Figma design or user input references a primitive token, translate it to the corresponding semantic token
- **NEVER write CSS fallback values when using tokens.** Always write `var(--token-name)` — never `var(--token-name, fallback)`. Fallbacks hide missing tokens, bypass dark/light mode switching, and break design system customization. If a token is correct, it will always resolve at runtime
- **Match token category to CSS property:** `color:` → `--color-text-*`, `background:` → `--color-accent-*`, `border:` → `--color-border-*`, icon color → `--color-icon-*`. Never cross categories

## Do's and Don'ts

**This section is a mandatory checklist.** Verify every item before delivering code

### MUST DO

- **Detect and configure the correct theme before writing any code.** Blue accents → `mercury({ theme: "mercury" })`. Green accents → `mercury({ theme: "globant" })`. The theme determines which `base/base` CSS is injected (color palette, tokens). Getting this wrong means all colors will be incorrect
- Load ALL required bundles for every component used (consult [Component → bundles table](references/component-bundles-table.md))
- Apply Mercury CSS classes on every Chameleon component that has a corresponding bundle
- Use design tokens (`--color-*`, typography classes) — never raw hex/px values
- Use form utilities (`field`, `field-block`, `field-inline`, `field-group`, `label`, `input`) for every form (bundle: `utils/form`)
- Use button classes (`button-primary`, `button-secondary`, `button-tertiary`) for ALL button/link variants (bundle: `components/button`)
- Use Mercury spacing tokens (`--spacing-padding-*`, `--spacing-gap-*`) for all spacing — these are the primary way to apply spacing. Padding tokens work for margin and `calc()` too. Fall back to `px` from the 4pt grid only when no token matches. Never use `em`/`rem`. **These tokens are global — no bundle import required**
- Use `--border-radius-*` tokens for all `border-radius` — never hardcode `px` values. Map the Figma radius value to the closest token. **These tokens are also global.** See the [Border radius tokens table](#border-radius-tokens) below
- Use typography classes (`heading-1`..`heading-6`, `subtitle-*`, `body-*`, `caption-*`) instead of manual font styling (bundle: `utils/typography`). Typography classes already set `font-size`, `line-height`, `font-weight`, and `letter-spacing` — never set these properties manually when a typography class applies
- Use font-size tokens (`--font-size-body-*`, `--font-size-header-*`, `--font-size-subtitle-*`, `--font-size-caption-*`) and line-height tokens (`--line-height-tight`, `--line-height-regular`, `--line-height-relaxed`, `--line-height-loose`) when a typography class doesn't fit. Never hardcode `px` values for font-size or numeric values for line-height
- Set `dark` or `light` class on `<html>` for theme mode

### MUST NOT DO

- Never wrap children inside `<ch-theme>` — they will be hidden
- Never write custom CSS for buttons, links, or elements Mercury already styles
- Never substitute native `<input>`, `<select>`, `<checkbox>` when Chameleon components exist (`ch-edit`, `ch-combo-box-render`, `ch-checkbox`)
- Never use hex color values when a Mercury token exists
- Never use `--color-text-*` tokens for borders, or `--color-border-*` for backgrounds — respect token categories
- Never skip loading a bundle — every component needs its CSS
- Never trust Figma font-weight at face value — always subtract 100 (Figma Regular 400 → Mercury Light 300, Figma SemiBold 600 → Mercury Medium 500)
- Never use `heading-h1`..`heading-h6` — the real classes are `heading-1`..`heading-6`
- Never use more than one primary button per page/view
- Never write custom hover/focus/disabled styles — Mercury handles all interaction states
- Never use `em` or `rem` units — Mercury provides semantic tokens for all sizing/spacing needs. Hardcoded `em`/`rem` values break when the design system scale changes or when users customize tokens
- Never use primitive tokens (`--color-azure-600`, `--color-neutral-1400`, `--size-16`, etc.) in code — always translate to their semantic equivalent (`--color-accent-primary-default`, `--color-text-neutral-default`, `--icon-m`, etc.). Primitives are internal to the design system and may change between versions or variants
- Never write CSS fallback values on tokens — `var(--spacing-gap-m)` ✓, `var(--spacing-gap-m, 12px)` ✗. Fallbacks hide missing tokens, bypass dark/light mode switching, and break design system customization
- Never pass `base/base`, `base/icons`, or `resets/box-sizing` to `getBundles` — these are injected automatically by `vite-plugin-mercury`
- Never import `utils/spacing` just to use spacing tokens (`--spacing-padding-*`, `--spacing-gap-*`) — those tokens are global. Only import `utils/spacing` when you need its CSS classes (`spacing-body`, `spacing-body-block`, etc.), which apply component-level padding driven by custom properties set on a parent container
- Never hardcode `border-radius` in `px` — always use `--border-radius-*` tokens
- Never style `body` with `background-color`, `color`, `font-family`, `font-size`, `line-height`, `font-weight`, `margin`, `min-height`/`min-block-size`, or `display` — Mercury's `base/base` already sets all of these. Writing them again overrides or duplicates the design system
- Never hardcode `font-size` (e.g. `18px`) or `line-height` (e.g. `1.2`) — always use a typography class or the corresponding tokens (`--font-size-*`, `--line-height-*`)
- Never set `min-height: 100vh` or `min-block-size` on a root wrapper (`#root`, `#app`, etc.) — Mercury's `body` already provides `min-block-size: 100dvh` with `display: grid`. Instead, apply `display: contents` on the wrapper so it becomes transparent to the grid layout

## ch-theme and getBundles

- **`getBundles(bundleNames, basePath)`** — Returns the theme model for those CSS bundles. See full signature and types in [references/api/bundles.md](references/api/bundles.md).
  - `bundleNames` accepts only **`MercuryBundleFull`** identifiers — component, scope, and util bundles (e.g. `["components/button", "components/edit", "utils/form"]`).
  - **`base/base`, `base/icons`, and `resets/box-sizing` must NOT be passed to `getBundles`.** These are injected automatically by `vite-plugin-mercury` (or the Mercury CLI). Passing them manually causes duplicate injection and broken styles.
  - `basePath` is the public path where Mercury CSS files are served (e.g. `/assets/css/`).

- **`ch-theme`** — Chameleon component that injects CSS from the model. **It always has the `hidden` attribute — never place child elements inside it.** Place it as a sibling before the UI tree

  ```ts
  import { getBundles } from "@genexus/mercury/bundles.js";

  const bundles = getBundles(
    ["components/button", "components/edit", "utils/form"],
    "/assets/css/"
  );
  ```

  Correct:

  ```html
  <ch-theme model="{bundles}"></ch-theme>
  <form class="field-group">
    <div class="field field-block">
      <label class="label" for="name-input">Name</label>
      <ch-edit class="input" id="name-input" type="text"></ch-edit>
    </div>
    <button class="button-primary" type="submit">Save</button>
  </form>
  ```

  **Wrong** — never wrap children inside ch-theme:

  ```html
  <!-- WRONG -->
  <ch-theme model="{bundles}"> <div>…</div> </ch-theme>
  ```

  > **CSS class ≠ bundle name.** Example: `ch-edit` uses bundle `"components/edit"` but the CSS class is `input`, not `edit`. Always check the bundle's `.md` doc. See [Bundles index](references/bundles-index.md)

## Which bundles to request

Use the **[Component → bundles table](references/component-bundles-table.md)** to find which bundles apply to each Chameleon component or native element. Request every bundle listed for the components in your view

Mercury has **39 bundles** across 6 categories:

| Category   | Count | What it provides                                                                                                                                                                                                                                                                                                                  |
| ---------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base       | 1     | Core tokens, typography, spacing, icons (`base/base`)                                                                                                                                                                                                                                                                             |
| Chameleon  | 1     | Scrollbar styling (`chameleon/scrollbar`)                                                                                                                                                                                                                                                                                         |
| Components | 28    | Per-component CSS classes (accordion, button, chat, checkbox, code, combo-box, dialog, dropdown, edit, flexible-layout, icon, layout-splitter, list-box, markdown-viewer, navigation-list, paginator, pills, radio-group, segmented-control, sidebar, slider, switch, tab, tabular-grid, ticket-list, tooltip, tree-view, widget) |
| Resets     | 1     | Box-sizing reset (`resets/box-sizing`)                                                                                                                                                                                                                                                                                            |
| Scope      | 2     | Theme tokens for multi-theme apps only (`scope/theme-mercury`, `scope/theme-globant`)                                                                                                                                                                                                                                             |
| Utils      | 6     | Cross-component utilities: elevation, form, layout, link, spacing, typography                                                                                                                                                                                                                                                     |

For the full list: **[Bundles index](references/bundles-index.md)**

## Buttons and links

Mercury's `components/button` bundle provides **all necessary classes**. Never write custom CSS for buttons or `<a>`

| Variant                     | Class                                                                            |
| --------------------------- | -------------------------------------------------------------------------------- |
| Primary                     | `button-primary`                                                                 |
| Secondary                   | `button-secondary`                                                               |
| Tertiary (no border, no bg) | `button-tertiary`                                                                |
| Destructive                 | `button-primary-destructive`                                                     |
| Success                     | `button-primary-success`                                                         |
| With icon + text            | add `button-icon-and-text`                                                       |
| Icon only                   | add `button-icon-only`                                                           |
| Text link                   | `link-primary`, `link-secondary`, `link-tertiary` (requires `utils/link` bundle) |

**Important:** Only one primary button per page or view

```html
<button class="button-primary button-icon-and-text">
  <img src="{icon}" alt="" width="16" height="16" />
  Save
</button>
<button class="button-tertiary">Cancel</button>
```

## Chameleon components — never native substitutes

When a Chameleon component exists, always use it:

| Pattern      | Correct                                                    | Wrong                        |
| ------------ | ---------------------------------------------------------- | ---------------------------- |
| Text input   | `ch-edit` + `input` class                                  | `<input>` with custom styles |
| Dropdown     | `ch-action-menu-render` + `components/dropdown`            | `<button>` with CSS          |
| Toggle group | `ch-segmented-control-render` + `segmented-control-filled` | custom tabs                  |
| Checkbox     | `ch-checkbox` + `checkbox` class                           | `<input type="checkbox">`    |
| Select       | `ch-combo-box-render` + `combo-box` class                  | `<select>`                   |

## Dark / light mode

Set the class on `<html>` to `dark` or `light`. Mercury handles all color adjustments automatically

## Themes: mercury and globant

Two theme variants: **mercury** (default) and **globant**

- **Base:** `base/base.css` (mercury) or `base/base-globant.css` (globant)
- **Scope:** `scope/theme-mercury.css` and `scope/theme-globant.css` — only needed for multi-theme apps
- **How to choose:** Vite plugin: `theme: "mercury" | "globant"`. CLI: `--globant` flag

### How to detect the variant from a Figma design or image

Use **multiple signals** to determine the theme — do not rely on a single check. Evaluate them in order of reliability:

#### Signal 1: Primary action color (strongest signal)

Look at **buttons, links, focus rings, and accent elements**:

| Variant     | Mode  | Primary hex         | Visual                                               |
| ----------- | ----- | ------------------- | ---------------------------------------------------- |
| **Mercury** | Light | `#0072f8` (azure)   | Blue buttons, blue links, blue focus rings           |
| **Mercury** | Dark  | `#5ba7ff` (azure)   | Blue buttons, blue links, blue focus rings           |
| **Globant** | Light | `#749519` (avocado) | Green buttons, green links, green focus rings        |
| **Globant** | Dark  | `#c3e01a` (olive)   | Yellow-green buttons, green links, green focus rings |

If you see any blue in the range `#0072f8`–`#5ba7ff` on interactive elements → **Mercury**. If you see green/yellow-green in the range `#749519`–`#c3e01a` → **Globant**

#### Signal 2: Surface and elevation colors (confirms the theme)

The elevation backgrounds differ between variants. Compare any card, panel, or page background against these tables:

**Light mode surfaces:**

| Token                     | Mercury hex             | Globant hex           |
| ------------------------- | ----------------------- | --------------------- |
| `surface` (page bg)       | `#f9fafa` (blue-tinted) | `#fcfcfc` (pure gray) |
| `elevation-1` (cards)     | `#edf0f8` (blue-tinted) | `#ededed` (pure gray) |
| `elevation-2` (dropdowns) | `#e2e7f4` (blue-tinted) | `#fafafa` (pure gray) |
| `elevation-3` (dialogs)   | `#d5daeb` (blue-tinted) | `#e8e8e8` (pure gray) |

**Dark mode surfaces:**

| Token                     | Mercury hex                  | Globant hex           |
| ------------------------- | ---------------------------- | --------------------- |
| `surface` (page bg)       | `#11151c` (blue-tinted dark) | `#171717` (pure dark) |
| `elevation-1` (cards)     | `#181f2a` (blue-tinted dark) | `#212121` (pure dark) |
| `elevation-2` (dropdowns) | `#242d3c` (blue-tinted dark) | `#303030` (pure dark) |
| `elevation-3` (dialogs)   | `#2d3a48` (blue-tinted dark) | `#3b3b3b` (pure dark) |

**Key pattern:** Mercury surfaces have a **blue tint** (lilac-based in light, blue-gray in dark). Globant surfaces are **pure neutral grays**. If the backgrounds look warm/neutral gray → Globant. If they have a cool/blue undertone → Mercury

#### Signal 3: Neutral palette tint (secondary confirmation)

Mercury uses **blue-tinted grays** (`#2D3A48`, `#9DA9B6`). Globant uses **pure grays** (`#3B3B3B`, `#A9A9A9`). Check text, borders, and secondary elements

#### Decision flow

1. Check primary action color → Blue or Green?
2. If unclear (e.g., no visible buttons/links), check surface/elevation backgrounds → Blue-tinted or pure gray?
3. If still ambiguous, check neutral grays → Blue-tinted or pure?
4. If all signals point the same way → use that theme. If signals conflict, **ask the user**

See [Themes and variants](references/themes-and-variants.md)

## Body and root container styles

Mercury's `base/base` bundle applies the following styles to `body` — **never duplicate them**:

```css
body {
  font-family: var(--font-family-body); /* Inter typeface */
  font-size: var(--font-size-body-m); /* 14px */
  line-height: round(1em * var(--line-height-relaxed), 1px); /* ~1.4 */
  font-weight: var(--font-style-regular); /* 300 */
  display: grid;
  grid-template-rows: 1fr;
  min-block-size: 100dvh;
  margin: 0;
  background-color: var(--color-accent-surface-surface);
  color: var(--color-text-neutral-default);
}
```

Because `body` uses `display: grid` + `min-block-size: 100dvh`, children automatically stretch to fill the viewport. If your framework inserts a wrapper element (e.g. `#root`, `#app`), **do not** re-declare `min-height: 100vh` or `min-block-size` — apply `display: contents` instead so it becomes transparent to the body grid:

```css
/* Correct — wrapper is invisible to grid */
#root {
  display: contents;
}
```

```css
/* WRONG — duplicates what body already provides */
#root {
  min-height: 100vh;
  background-color: var(--color-accent-surface-elevation-0);
  color: var(--color-text-neutral-default);
  font-family: var(--font-family-body);
}
```

## Border radius tokens

Mercury provides semantic `--border-radius-*` tokens defined globally in `base/base` — **no bundle import required**. Always use them instead of hardcoded `px` values. Map the Figma `border-radius` value to the closest token:

| Token                 | Value | Typical use                               |
| --------------------- | ----- | ----------------------------------------- |
| `--border-radius-xxs` | 1px   | Minimal rounding, subtle accents          |
| `--border-radius-xs`  | 2px   | Tight rounding, compact elements          |
| `--border-radius-s`   | 4px   | Form inputs, badges, chips, small cards   |
| `--border-radius-m`   | 8px   | Cards, dialogs, most components (default) |
| `--border-radius-l`   | 12px  | Large containers, prominent panels        |
| `--border-radius-xl`  | 30px  | Pill-shaped buttons, tags                 |

```css
/* Correct */
.card {
  border-radius: var(--border-radius-m);
} /* 8px from Figma → --border-radius-m */
.badge {
  border-radius: var(--border-radius-s);
} /* 4px from Figma → --border-radius-s */

/* WRONG */
.card {
  border-radius: 8px;
}
.badge {
  border-radius: 4px;
}
```

## Focus ring pattern

Mercury does not have a `--border-radius-focus` token — focus rings use `outline`, not `border`, so border-radius does not apply to them

Two global tokens cover the entire focus ring:

| Token                            | Value            | Role                                                          |
| -------------------------------- | ---------------- | ------------------------------------------------------------- |
| `--border-width-focus`           | 2px              | Outline thickness                                             |
| `--color-border-primary-focused` | theme/mode-aware | Outline color (auto-switches light ↔ dark, Mercury ↔ Globant) |

**Standard pattern** — use `:focus-visible` for interactive elements (buttons, links, custom controls), `:focus` for native form inputs:

```css
/* Custom interactive element */
.my-control:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: calc(var(--border-width-focus) * -1);
}

/* Native form input */
.my-input:focus {
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: calc(var(--border-width-focus) * -1);
}
```

**Why `outline-offset: calc(var(--border-width-focus) * -1)`?**
A negative offset equal to the outline thickness pulls the ring inward so it sits inside the element's border box. This prevents it from being clipped by ancestors with `overflow: hidden`, scrollable containers, screen edges, or any other clipping context — a common failure mode with positive or zero offsets

**Never write custom hover/focus/disabled styles on Mercury components** — their bundles already handle all states via `:focus-visible` with these same tokens. Only apply this pattern to custom components you build yourself

## Installation

`npm i @genexus/chameleon-controls-library @genexus/mercury`

Framework guides: [Installation index](references/installation/README.md) — React (Vite), Angular, Next.js (Turbopack), Stencil

After installing, always verify that the installed versions are mutually compatible. See [Compatibility table](references/installation/compatibility.md) — it covers Mercury ↔ Chameleon, Mercury ↔ `vite-plugin-mercury`, and Mercury ↔ Mercury CLI. Always prefer the latest versions of all packages

## References

- **[Mercury Icons](references/icons/README.md)** — Complete icon catalog (17 categories, 500+ icons), `getIconPath`/`getIconPathExpanded` usage, colorType reference
- **[Design foundations](references/design-foundations/)** — Typography, color, spacing, icon sizing/color tokens, Figma token mapping, design patterns
- [Component → bundles table](references/component-bundles-table.md) — which bundles per component
- [Bundles index](references/bundles-index.md) — all bundle docs and CSS
- [Themes and variants](references/themes-and-variants.md) — mercury vs globant, dark/light
- [API reference](references/api/README.md) — JS modules
- [Installation by framework](references/installation/README.md) — setup guides
