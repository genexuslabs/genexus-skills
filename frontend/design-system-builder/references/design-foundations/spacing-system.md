# Spacing System

How to define a consistent spacing system for a design system

## The Grid Base

Use a **4-point (4pt) grid** as the spacing foundation. All spacing values must be multiples of 4. This creates visual harmony and predictable layouts

Alternative: An 8pt grid is also valid but offers less granularity for compact UIs. The 4pt grid is recommended as it provides both fine-grained control and compatibility with 8pt (every 8pt value is also a 4pt value)

## Spacing Scale

| px | Use case |
|----|----------|
| 0 | No spacing |
| 2 | Minimal gaps (fine adjustments) |
| 4 | Tight gaps: icon-to-text, inline elements |
| 6 | Small: between very closely related items |
| 8 | Compact: between closely related items |
| 12 | Standard internal: input padding, small gaps |
| 16 | Default: field gaps, section padding, card internal |
| 20 | Comfortable: generous card padding |
| 24 | Spacious: section separation, large padding |
| 32 | Large: major section breaks |
| 40 | Extra large: page-level margins |

The scale is not limited to these values — any multiple of 4 (or 2 for xxs) is valid

## Never Use em or rem Units

> **HARD RULE — not a recommendation.** The validate-tokens script and CSS linting
> will flag any `em` or `rem` usage as an error. Only exception: the user explicitly
> requests em/rem units

**Always use semantic tokens, utility classes, or px values from the grid scale — never `em` or `rem` units for spacing, sizing, font-size in components, border-radius, or any other property.**

- Token-based code adapts automatically when the DS updates its scale — hardcoded `em`/`rem` values do not
- `em` values compound unpredictably when elements are nested, breaking the grid
- `rem` is acceptable ONLY for font-size definitions in `base/base.css` root tokens, never in component/utility CSS

```css
/* WRONG — em/rem in component CSS */
.card { padding: 1rem; font-size: 0.875rem; gap: 0.5em; }

/* CORRECT — tokens or px from the 4pt grid */
.card {
  padding: var(--spacing-padding-xl);
  font-size: var(--font-size-body-m);
  gap: var(--spacing-gap-m);
}
```

## Never Use Numbered Spacing Tokens

> **HARD RULE**: Spacing tokens MUST have semantic names, never plain numbers. Numbered tokens like `--spacing-1: 4px`, `--spacing-2: 8px` add zero semantic meaning and are indistinguishable from raw values. They provide no benefit over writing `4px` directly

```css
/* ❌ WRONG — numbers are not semantic */
--spacing-0: 0px;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;

/* ✅ CORRECT — semantic size labels */
--spacing-padding-xs: 4px;
--spacing-padding-s: 6px;
--spacing-padding-m: 8px;
--spacing-gap-m: 8px;
--spacing-gap-l: 12px;
```

The ONLY exception is if the Figma token export explicitly defines numbered tokens — in that case, honor token fidelity

## Semantic Spacing Tokens

Define two token families:

### Padding Tokens (`--spacing-padding-*`)

Use for `padding`, `margin`, or any spatial property. Despite the name "padding", these tokens represent spacing values and can be used for margins, `calc()` expressions, or any sizing need

| Token | Value | Size label |
|-------|-------|------------|
| `--spacing-padding-none` | 0px | — |
| `--spacing-padding-xxs` | 2px | Extra extra small |
| `--spacing-padding-xs` | 4px | Extra small |
| `--spacing-padding-s` | 6px | Small |
| `--spacing-padding-m` | 8px | Medium |
| `--spacing-padding-l` | 12px | Large |
| `--spacing-padding-xl` | 16px | Extra large |
| `--spacing-padding-xxl` | 24px | Extra extra large |
| `--spacing-padding-xxxl` | 32px | Extra extra extra large |

### Gap Tokens (`--spacing-gap-*`)

Use for flex/grid `gap`, or any spacing between sibling elements

| Token | Value | Size label |
|-------|-------|------------|
| `--spacing-gap-none` | 0px | — |
| `--spacing-gap-xxs` | 2px | Extra extra small |
| `--spacing-gap-xs` | 4px | Extra small |
| `--spacing-gap-s` | 6px | Small |
| `--spacing-gap-m` | 8px | Medium |
| `--spacing-gap-l` | 12px | Large |
| `--spacing-gap-xl` | 16px | Extra large |
| `--spacing-gap-xxl` | 24px | Extra extra large |
| `--spacing-gap-xxxl` | 32px | Extra extra extra large |

### Usage Examples

```css
/* Padding on a card */
.card { padding: var(--spacing-padding-xl); } /* 16px */

/* Gap between form fields */
.form { display: flex; flex-direction: column; gap: var(--spacing-gap-xl); } /* 16px */

/* Margin using a padding token (valid) */
.section { margin-block-end: var(--spacing-padding-xxl); } /* 24px */

/* calc() for computed sizes */
.header { block-size: calc(var(--spacing-padding-xxxl) + var(--spacing-padding-xl)); } /* 48px */
```

### Reconstructing Tokens from Design Values

When a Figma design specifies a raw px spacing value, find the closest token:

| px from design | Closest padding token | Closest gap token |
|---------------|----------------------|-------------------|
| 2px | `--spacing-padding-xxs` | `--spacing-gap-xxs` |
| 4px | `--spacing-padding-xs` | `--spacing-gap-xs` |
| 6px | `--spacing-padding-s` | `--spacing-gap-s` |
| 8px | `--spacing-padding-m` | `--spacing-gap-m` |
| 12px | `--spacing-padding-l` | `--spacing-gap-l` |
| 16px | `--spacing-padding-xl` | `--spacing-gap-xl` |
| 24px | `--spacing-padding-xxl` | `--spacing-gap-xxl` |
| 32px | `--spacing-padding-xxxl` | `--spacing-gap-xxxl` |

If the design uses a value not in this table (e.g. 20px, 40px), use `calc()` with tokens or fall back to px from the grid

## Border Radius Tokens

Define a border-radius scale:

| Token | Typical value |
|-------|---------------|
| `--border-radius-xxs` | 1px |
| `--border-radius-xs` | 2px |
| `--border-radius-s` | 4px |
| `--border-radius-m` | 8px |
| `--border-radius-l` | 12px |
| `--border-radius-xl` | 30px (pill) |

Never hardcode `border-radius` in px — always use tokens

## Spacing Utility Classes

Bundle: `utils/spacing`

The `spacing-body-*` utility classes are for a specific use case: ensuring consistent padding across containers in shell environments, plugin panels, dialogs, and similar contexts where multiple views must share the same spacing values

### How they work

The `spacing-body-*` classes read custom properties that **must be set by a parent container**:
- `--spacing-body-block-start`
- `--spacing-body-block-end`
- `--spacing-body-inline-start`
- `--spacing-body-inline-end`

Without a parent defining these, the classes have no effect. DS components (accordion, dialog, form containers, layouts, tabs) should set these properties internally

| Class | Effect |
|-------|--------|
| `spacing-body` | Padding on all 4 sides |
| `spacing-body-block` | Padding top + bottom |
| `spacing-body-block-start` | Padding top only |
| `spacing-body-block-end` | Padding bottom only |
| `spacing-body-inline` | Padding left + right |
| `spacing-body-inline-start` | Padding left only (start in LTR) |
| `spacing-body-inline-end` | Padding right only (end in LTR) |

These classes use logical properties for RTL support

## Design Principles

### Hierarchy
More space indicates greater conceptual separation. Less space indicates stronger relationship

### Rhythm
Consistent use of the grid creates a harmonious and predictable visual flow

### Proximity
Elements that are close together are perceived as related. Use spacing to group or separate elements without needing visual dividers

## Common Patterns

| Pattern | Typical spacing |
|---------|----------------|
| Between form fields | 16px (`--spacing-gap-xl`) |
| Inside a card | 16-20px (`--spacing-padding-xl`) |
| Between sections | 24-32px (`--spacing-padding-xxl` / `--spacing-padding-xxxl`) |
| Page margins | 32-40px |
| Icon to text | 4-8px (`--spacing-gap-xs` / `--spacing-gap-m`) |
| Button internal padding | Handled by DS button classes |
