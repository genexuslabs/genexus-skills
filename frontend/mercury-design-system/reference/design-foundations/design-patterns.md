# Design Patterns

Mercury design patterns for building consistent, accessible UIs. Use these patterns when vibe coding without a Figma design, or to validate Figma implementations

## Buttons

Mercury provides 5 button variants plus modifiers. Use the `components/button` bundle

### Button Hierarchy

| Variant | Class | Purpose | Visual weight |
|---------|-------|---------|--------------|
| Primary | `button-primary` | Main action (submit, save, confirm) | Highest — solid fill |
| Secondary | `button-secondary` | Complementary action (cancel, back) | Medium — bordered |
| Tertiary | `button-tertiary` | Low-priority action (more info, skip) | Lowest — text only |
| Destructive | `button-primary-destructive` | Dangerous action (delete, remove) | High — error color fill |
| Success | `button-primary-success` | Positive action (approve) | High — success color fill |

### Button Rules

- **Only one primary button per page/view.** Multiple primary buttons confuse the user about what the main action is
- Use `button-icon-and-text` modifier when combining icon + text
- Use `button-icon-only` modifier for icon-only buttons (must have accessible name)
- Use link classes (`link-primary`, `link-secondary`, `link-tertiary`) for navigation actions (requires `utils/link` bundle)
- Never write custom button CSS — Mercury handles all states (hover, pressed, focused, disabled)

### Button States

All states are handled automatically by Mercury CSS:

| State | Description | Application |
|-------|-------------|-------------|
| Enabled | Default, ready for interaction | Buttons, form fields, toggles |
| Disabled | Not available, no interaction | Greyed out, no pointer events |
| Hover | Cursor positioned over (desktop) | Subtle highlight change |
| Active (Pressed) | Being clicked / tapped | Immediate visual feedback |
| Selected | Persistent selected state | Tabs, filters, paginator |
| Focus | Keyboard focus received | Focus ring via `--color-border-primary-focused` |

## Forms

Mercury provides comprehensive form utilities via the `utils/form` bundle. **Always use these for form layouts.**

### Form Structure

```html
<!-- Vertical form -->
<div class="field-group">
  <div class="field field-block">
    <label class="label" for="name">Name</label>
    <ch-edit class="input" id="name" type="text"></ch-edit>
  </div>

  <div class="field field-block">
    <label class="label" for="email">Email</label>
    <ch-edit class="input" id="email" type="email"></ch-edit>
  </div>

  <div class="field-group-inline">
    <button class="button-primary" type="submit">Save</button>
    <button class="button-tertiary" type="button">Cancel</button>
  </div>
</div>
```

### Form Layout Classes

| Class | Purpose |
|-------|---------|
| `field-group` | Vertical group of fields with consistent spacing |
| `field-group-inline` | Horizontal group (e.g., button row) |
| `field-group-justified-end` | Horizontal group aligned right |
| `field-group-justified-start` | Horizontal group aligned left |
| `field` | Base wrapper for label + control |
| `field-block` | Label above, control below (vertical) |
| `field-inline` | Label left, control right (horizontal) |
| `label` | Form label styling |
| `label--disabled` | Dimmed label for disabled fields |

### Form Validation

```html
<!-- Error state -->
<div class="field field-block">
  <label class="label" for="email">Email</label>
  <ch-edit class="input" id="email" type="email"></ch-edit>
  <span class="caption-regular-m" style="color: var(--color-text-error-default)">
    Invalid email address
  </span>
</div>
```

- Error text: `--color-text-error-default`
- Error border: `--color-border-error-default` (apply on the component)
- Success border: `--color-border-success-default`
- Focus ring: `--color-border-primary-focused` with `--color-accent-primary-lighter` glow

### Form Rules

- Always use visible `<label>` with `for`/`id` linking (not just `accessible-name`)
- Always use `ch-edit` with `input` class — never native `<input>`
- Always use `ch-checkbox` with `checkbox` class — never native checkbox
- Always use `ch-combo-box-render` with `combo-box` class — never native `<select>`
- Use `caption-regular-m` or `caption-semi-bold-l` for labels

## Typography Hierarchy

When building a page from scratch, follow this hierarchy:

```
heading-1          → Page title (1 per page)
  heading-2        → Section headings
    heading-3      → Subsection headings
      heading-4+   → Content headings
  subtitle-*-m     → Section introductions
  body-regular-m   → Main content
  body-semi-bold-m → Emphasized content
  caption-*-m      → Labels, metadata, timestamps
```

### Typography Rules

- Only one `heading-1` per page
- Maintain heading order (don't skip from h2 to h5)
- Use `body-regular-m` (14px) as the default text style
- Use `caption-semi-bold-l` for form labels
- Use `caption-regular-m` for metadata and timestamps

## Accordions

Two variants available via the `components/accordion` bundle:

| Variant | Class | When to use |
|---------|-------|-------------|
| Filled | `accordion-filled` | Highlight important sections, differentiate from background |
| Outlined | `accordion-outlined` | Subtle, less intrusive, blends with content |

**When to use accordions:**
- Organize extensive content into collapsible sections
- Progressive disclosure of information
- FAQ pages or advanced settings

**When NOT to use accordions:**
- When all information must be visible at once
- For critical content that should always be accessible
- When users need to compare multiple sections simultaneously

## Spacing

Mercury uses a **4pt grid** system. All spacing values must be multiples of 4

**Prefer semantic spacing tokens** over raw px values. Mercury provides two token families:

- **`--spacing-padding-*`** — For padding, margin, or any spatial property (despite the name, usable for margins and `calc()` too)
- **`--spacing-gap-*`** — For flex/grid `gap` or spacing between siblings

| px | Padding token | Gap token | Common use |
|----|--------------|-----------|-----------|
| 0 | `--spacing-padding-none` | `--spacing-gap-none` | No spacing |
| 2 | `--spacing-padding-xxs` | `--spacing-gap-xxs` | Minimal |
| 4 | `--spacing-padding-xs` | `--spacing-gap-xs` | Tight: icon-to-text gap |
| 6 | `--spacing-padding-s` | `--spacing-gap-s` | Small |
| 8 | `--spacing-padding-m` | `--spacing-gap-m` | Compact: between related items |
| 12 | `--spacing-padding-l` | `--spacing-gap-l` | Standard: form field internal padding |
| 16 | `--spacing-padding-xl` | `--spacing-gap-xl` | Default: section padding, field gaps |
| 24 | `--spacing-padding-xxl` | `--spacing-gap-xxl` | Spacious: section separation |
| 32 | `--spacing-padding-xxxl` | `--spacing-gap-xxxl` | Large: major section breaks |

For values not in the token scale (e.g. 20px, 40px), use `calc()` with tokens or fall back to px from the 4pt grid

**Never use `em` or `rem` units.** Always use Mercury spacing tokens/classes or `px` values from this scale. See [Spacing system](spacing-system.md) for full details

The `spacing-body-*` utility classes (bundle: `utils/spacing`) are **restricted to specific contexts** — they require a parent container that defines spacing custom properties (e.g., inside Mercury dialogs, tabs, accordions, or IDE/shell plugins). Do not use them for general-purpose spacing. See [Spacing system](spacing-system.md) for details

### Spacing Principles

- **Hierarchy:** More space = greater conceptual separation
- **Rhythm:** Consistent 4pt grid creates harmonious flow
- **Proximity:** Close elements are perceived as related

## Layout

Mercury uses a responsive grid system. Key rules:

- Use `ch-flexible-layout-render` for complex layouts
- Use `ch-layout-splitter` for resizable panels
- Use `ch-sidebar` for collapsible side navigation
- Use the `utils/layout` bundle for layout utilities

## Icons

Mercury uses **Material Symbols** as its icon system

- Base size: 12px, but follow the 4pt grid (12, 16, 20, 24px recommended)
- Touch areas: Minimum 24px, ideally 44px for mobile
- Color: Use `--color-icon-*` tokens, never hardcode
- Bundle: `components/icon`
