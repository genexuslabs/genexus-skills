# Component CSS Patterns

## Five-Section Internal Structure

Every component CSS file MUST follow this structure:

```css
/* =======================================================
   1. STRUCTURE — Layout and box model
   ======================================================= */
.button-primary {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
}

/* =======================================================
   2. DECORATION — Color, borders, backgrounds
   ======================================================= */
.button-primary {
  background-color: var(--color-accent-primary-default);
  border-color: var(--color-accent-primary-default);
  color: var(--color-text-neutral-on-text);
  border-radius: var(--control-border-radius);
}

/* =======================================================
   3. TYPOGRAPHY — Fonts grouped
   ======================================================= */
.button-primary {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body);
  line-height: round(1em * var(--line-height-compact), 1px);
}

/* =======================================================
   4. STATES — Pseudo-classes after base styles
   ======================================================= */
.button-primary:hover {
  background-color: var(--color-accent-primary-hover);
  border-color: var(--color-accent-primary-hover);
}

.button-primary:active {
  background-color: var(--color-accent-primary-pressed);
}

.button-primary:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: calc(var(--size-2) * -1);
}

.button-primary:disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* =======================================================
   5. VARIANTS — Additional classes
   ======================================================= */
.button-icon-only {
  padding: calc(
    (var(--control-block-size) - 2 * var(--control-border-width) - var(--icon-m)) / 2
  );
}

.button-icon-and-text {
  gap: var(--space-2);
}
```

## Class Naming (Flat, No BEM)

| Pattern | Example |
|---|---|
| `{component}-{variant}` | `button-primary`, `button-secondary`, `accordion-filled` |
| `{component}-{variant}-{sub}` | `button-primary-destructive` |
| `{component}-{modifier}` | `button-icon-only`, `button-icon-and-text` |
| `{utility}-{value}` | `spacing-body`, `elevation-1` |
| `{type}-{style}-{size}` | `body-regular-m`, `heading-3` |

Compose via multiple classes:

```html
<button class="button-primary button-icon-and-text">
  <span class="body-regular-m">Action</span>
</button>
```

## Styling APIs for Chameleon Web Components

For Chameleon component styling APIs (`::part()`, CSS custom properties, state parts pattern, `exportparts`), consult the **chameleon-controls-library** skill — specifically each component's `styling.md` and the `css-shadow-parts-guide.md` reference

**CRITICAL: Classes go directly on the Chameleon component host**, never on a wrapper `<div>`. The `::part()` selector descends from the class on the host element

## Anti-Patterns (NEVER do these)

These patterns are **strictly forbidden** and MUST be caught during code review:

### 1. Wrapper div pattern
```html
<!-- ❌ WRONG — class on parent, not on the component -->
<div class="input"><ch-edit></ch-edit></div>

<!-- ✅ CORRECT — class on the component host -->
<ch-edit class="input"></ch-edit>
```

### 2. Component tag name in CSS selector
```css
/* ❌ WRONG — uses ch-* tag name in selector */
.input ch-edit::part(clear-button) { color: red; }
.accordion-filled ch-accordion-render::part(header) { ... }

/* ✅ CORRECT — class IS on the component, selector goes directly */
.input::part(clear-button) { color: var(--color-icon-neutral-default); }
.accordion-filled::part(header) { ... }
```

### 3. DS-name prefix on classes or tokens
```css
/* ❌ WRONG — prefixed with DS name */
.nova-btn-primary { ... }
--nova-green-300: #8aebbd;

/* ✅ CORRECT — flat semantic names */
.button-primary { ... }
--green-300: #8aebbd;
--color-accent-primary-default: var(--green-300);
```

### 4. Invalid `::part()` pseudo-element chain
Only certain pseudo-elements can follow `::part()`: `::before`, `::after`, and `::placeholder` are allowed. Pseudo-elements like `::selection` and `::first-line` CANNOT be chained after `::part()` — they silently fail. Standard pseudo-classes (`:hover`, `:focus-visible`, `:active`, `:disabled`, `:focus`, `:focus-within`) are always allowed

### 5. Invented parts
Never write a `::part()` selector for a part that doesn't exist. Verify all parts in the component's `styling.md` (consult the **chameleon-controls-library** skill)

### 6. HTML attribute confused with part state
Use compound part selectors (e.g., `::part(header disabled)`) instead of host attribute selectors (e.g., `[disabled]::part(header)`). Consult the **chameleon-controls-library** skill's per-component `styling.md` for state parts

### 7. Redundant Chameleon resets
Chameleon components apply internal resets for `<button>` and `<a>`. Never write `cursor: pointer`, `border: none`, `appearance: none`, or `text-decoration: none` on `::part()` selectors targeting these elements. Consult the **chameleon-controls-library** skill's `css-shadow-parts-guide.md` for what components handle internally

### 8. Numbered spacing tokens without semantics
```css
/* ❌ WRONG — numbers add no semantic meaning */
--spacing-0: 0px;
--spacing-1: 4px;
--spacing-2: 8px;

/* ✅ CORRECT — semantic names */
--spacing-padding-xs: 4px;
--spacing-padding-s: 6px;
--spacing-padding-m: 8px;
--spacing-gap-s: 4px;
--spacing-gap-m: 8px;
```

### 9. Abbreviated class names
```css
/* ❌ WRONG — abbreviations reduce discoverability */
.btn-primary { ... }
.btn-icon { ... }
.acc-filled { ... }

/* ✅ CORRECT — full words */
.button-primary { ... }
.button-icon-only { ... }
.accordion-filled { ... }
```

## Local CSS Custom Properties With Fallback Chaining

Use this pattern when a component must adapt to its elevation context:

```css
.dialog {
  --dialog-bg: var(--elevation-background-color, var(--color-accent-surface-elevation-1));
  background-color: var(--dialog-bg);
}
```

## Mandatory Rules

- Use ONLY CSS custom properties (tokens). NEVER hardcode color, spacing, or font values (exception: `0`, `transparent`, `100%`)
- NEVER use `!important`
- **NEVER use `em` or `rem` units** for any property (spacing, sizing, font-size, border-radius). Use tokens or px from the 4pt grid. Only exception: user explicitly requests em/rem. See [Spacing System](design-foundations/spacing-system.md#never-use-em-or-rem-units)
- **Valid `::part()` selectors only** — Before writing ANY `::part()` selector, verify the part name exists in the component's `styling.md` (consult the **chameleon-controls-library** skill). Invalid parts silently fail and produce dead CSS
- **Valid `--ch-*` custom properties only** — Before using any `--ch-*` CSS custom property, verify it exists in the component's `styling.md` (consult the **chameleon-controls-library** skill). Never guess or invent variable names — invalid custom properties silently produce dead CSS with no error
- **Group shared properties** — When multiple selectors share identical property-value pairs, combine them with comma-separated selectors. No redundant selectors, no duplicate declarations. See [CSS Optimization](css-optimization.md)
- Use `:where()` for zero-specificity wrappers when needed: `:where(button, a) { ... }`
- Use **logical properties** everywhere: `padding-block`, `padding-inline`, `inline-size`, `block-size`, `inline-start`. RTL support for free
- Animate ONLY compositor-friendly properties: `transform`, `opacity`. Never animate `width`, `height`, `top`, `left`
- Use `round(1em * var(--line-height), 1px)` for pixel-perfect line-height rounding
- Add `touch-action: manipulation` on all interactive elements
- Cover ALL states: default, `:hover`, `:active`, `:focus-visible`, `:disabled`, error, loading
- Max SCSS nesting: 3 levels. Output must be flat selectors
- NEVER use `@extend`. Use mixins for compile-time variant generation
- Target size: ≤10 KB minified / ≤5 KB gzipped per component

## Never Cross Token Categories

Match the token category to the CSS property:

| CSS property | Use tokens from | Never use |
|-------------|----------------|-----------|
| `color` (text) | `--color-text-*` | `--color-accent-*`, `--color-border-*`, `--color-icon-*` |
| `background-color` | `--color-accent-*` | `--color-text-*`, `--color-border-*` |
| `border-color`, `outline` | `--color-border-*` | `--color-text-*`, `--color-accent-*` |
| Icon `color` / `fill` | `--color-icon-*` | `--color-text-*` |

This ensures dark/light mode inversions work correctly — text and backgrounds need opposite adjustments

## Interaction States Auto-Handled

DS component CSS must cover ALL interaction states (default, hover, pressed, focused, disabled). Consuming applications should NOT write custom `:hover`, `:focus`, or `:disabled` color styles — the DS handles them

If a consumer needs a state not covered, the DS component CSS should be extended rather than overridden in application code

## Body and Root Container Styling

The `base/base.css` bundle styles `body` with the DS defaults (font-family, font-size, line-height, font-weight, display, min-block-size, margin, background-color, color). **Never duplicate these in components or application code.**

If a framework wrapper exists (`#root`, `#app`, `#__next`), use `display: contents` instead of re-declaring font-family, color, or background:

```css
#root {
  display: contents;
}
```

Never set `min-height: 100vh` on the root wrapper — `base/base.css` already handles this on `body`
