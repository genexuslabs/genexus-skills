# Spacing System

Mercury's spacing system is based on a **4-point (4pt) grid**. This modular foundation ensures consistent, scalable, and visually balanced interfaces

## The 4pt Grid

All spacing values must be multiples of 4. This creates visual harmony and predictable layouts

## Spacing Scale

| px | Use case |
|----|----------|
| 0 | No spacing |
| 4 | Tight gaps: icon-to-text, inline elements |
| 8 | Compact: between closely related items |
| 12 | Standard internal: input padding, small gaps |
| 16 | Default: field gaps, section padding, card internal |
| 20 | Comfortable: generous card padding |
| 24 | Spacious: section separation, large padding |
| 32 | Large: major section breaks |
| 40 | Extra large: page-level margins |

The scale is not limited to these values — any multiple of 4 is valid

## Never Use em or rem Units

**Always use Mercury's semantic tokens and utility classes for spacing — never `em` or `rem` units.**

Mercury provides spacing tokens and classes that are the source of truth for the design system. Using raw `em`/`rem` values bypasses the token system and creates fragile code:

- If Mercury updates its spacing scale, token-based code adapts automatically — hardcoded `em`/`rem` values do not
- If a user customizes token values for their product, `em`/`rem` values become misaligned with the rest of the UI
- `em` values compound unpredictably when elements are nested, breaking the 4pt grid

Use spacing tokens, `spacing-body-*` utility classes, or Mercury's CSS custom properties for spacing. When a specific token or utility doesn't exist for the exact value, use `px` values from the 4pt grid scale above — these are explicit, predictable, and easy to audit against the design system

## Spacing Tokens

Mercury provides semantic spacing tokens defined in `base/base`. **Always prefer these tokens over raw px values** — they adapt automatically when the design system scale changes or when users customize values

### Padding Tokens (`--spacing-padding-*`)

Use for `padding`, `margin`, or any spatial property. Despite the name "padding", these tokens represent spacing values and can be used for margins, `calc()` expressions for heights/widths, or any sizing need

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

/* Margin using a padding token (valid — they're just spacing values) */
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

If the design uses a value not in this table (e.g. 20px, 40px), use `calc()` with tokens or fall back to px from the 4pt grid

### Border Radius Tokens

Mercury also provides border-radius tokens:

| Token | Value |
|-------|-------|
| `--border-radius-xxs` | 1px |
| `--border-radius-xs` | 2px |
| `--border-radius-s` | 4px |
| `--border-radius-m` | 8px |
| `--border-radius-l` | 12px |
| `--border-radius-xl` | 30px |

## Spacing Utility Classes (restricted use)

Bundle: `utils/spacing`

**These classes are NOT the primary way to apply spacing.** Use `--spacing-padding-*` and `--spacing-gap-*` tokens instead for most spacing needs. The `spacing-body-*` classes are designed for a specific use case: ensuring consistent padding across containers in IDE shells, plugin panels, dialogs, and similar environments where multiple views must share the same spacing values

### How they work

The `spacing-body-*` classes read custom properties that **must be set by a parent container**:
- `--spacing-body-block-start`
- `--spacing-body-block-end`
- `--spacing-body-inline-start`
- `--spacing-body-inline-end`

Without a parent defining these custom properties, the classes have no effect. Certain Mercury components (accordion, dialog, form containers, layouts, tabs) set these properties internally, so the classes work within those contexts

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

### When to use spacing-body vs tokens

| Scenario | Use |
|----------|-----|
| General padding/margin/gap on any element | `--spacing-padding-*` / `--spacing-gap-*` tokens |
| Custom `calc()` for sizes | `--spacing-padding-*` tokens |
| Consistent padding inside Mercury containers (dialogs, tabs, accordions) that define the spacing vars | `spacing-body-*` classes |
| IDE/shell plugin where all panels must share spacing | `spacing-body-*` classes |

## Design Principles

### Hierarchy
More space indicates greater conceptual separation. Less space indicates stronger relationship

### Rhythm
Consistent use of the 4pt grid creates a harmonious and predictable visual flow

### Proximity
Elements that are close together are perceived as related. Use spacing to group or separate elements without needing visual dividers

## Application

- **Margin and padding:** Apply the spacing scale to both `margin` and `padding` properties
- **Gap:** Use in flex/grid `gap` properties
- **Component internals:** Mercury component bundles already include correct internal spacing — don't override

## Common Patterns

| Pattern | Spacing |
|---------|---------|
| Between form fields | 16px |
| Inside a card | 16-20px |
| Between sections | 24-32px |
| Page margins | 32-40px |
| Icon to text | 4-8px |
| Button internal padding | Handled by Mercury button classes |
