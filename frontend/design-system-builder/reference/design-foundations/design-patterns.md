# Design Patterns

Reusable UI patterns for building consistent, accessible interfaces with the design system. Use these patterns when building without a Figma design, or to validate Figma implementations

## Buttons

Define 5 button variants plus modifiers. Bundle: `components/button`

### Button Hierarchy

| Variant | Class | Purpose | Visual weight |
|---------|-------|---------|--------------|
| Primary | `button-primary` | Main action (submit, save, confirm) | Highest — solid fill |
| Secondary | `button-secondary` | Complementary action (cancel, back) | Medium — bordered |
| Tertiary | `button-tertiary` | Low-priority action (more info, skip) | Lowest — text only |
| Destructive | `button-primary-destructive` | Dangerous action (delete, remove) | High — error color fill |
| Success | `button-primary-success` | Positive action (approve) | High — success color fill |

### Button Modifiers

| Modifier | Class | Usage |
|----------|-------|-------|
| Icon + text | `button-icon-and-text` | Button with both icon and label |
| Icon only | `button-icon-only` | Icon button (must have accessible name) |

### Button Rules

- **Only one primary button per page/view.** Multiple primary buttons confuse the user about the main action
- Never write custom button CSS — the DS handles all states (hover, pressed, focused, disabled)
- Use link classes (`link-primary`, `link-secondary`, `link-tertiary`) for navigation actions (requires `utils/link` bundle)

### Button States

All states are handled automatically by the DS CSS:

| State | Description | Application |
|-------|-------------|-------------|
| Enabled | Default, ready for interaction | Buttons, form fields, toggles |
| Disabled | Not available, no interaction | Greyed out, no pointer events |
| Hover | Cursor positioned over (desktop) | Subtle highlight change |
| Active (Pressed) | Being clicked / tapped | Immediate visual feedback |
| Selected | Persistent selected state | Tabs, filters, paginator |
| Focus | Keyboard focus received | Focus ring via `--color-border-primary-focused` |

## Forms

Provide comprehensive form utilities via the `utils/form` bundle. **Always use these for form layouts.**

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
| `label-disabled` | Dimmed label for disabled fields |

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
- Focus ring: `--color-border-primary-focused`

### Form Rules

- Always use visible `<label>` with `for`/`id` linking (not just `accessible-name`)
- Always use Chameleon form components (`ch-edit`, `ch-checkbox`, `ch-combo-box-render`) — never native `<input>`, `<select>`, `<checkbox>`
- Apply the DS input class on Chameleon form components (e.g., `ch-edit` with `input` class)
- Use caption classes for form labels (e.g., `caption-semi-bold-l` or `caption-regular-m`)

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
- Use the standard body class as the default text style
- Use caption classes for form labels and metadata

## Accordions

Two standard variants via the `components/accordion` bundle:

| Variant | Class | When to use |
|---------|-------|-------------|
| Filled | `accordion-filled` | Highlight important sections, differentiate from background |
| Outlined | `accordion-outlined` | Subtle, less intrusive, blends with content |

## Links

Styled via the `utils/link` bundle:

| Class | Purpose |
|-------|---------|
| `link-primary` | Primary navigation links |
| `link-secondary` | Secondary links |
| `link-tertiary` | Subtle, low-emphasis links |

## Spacing in Patterns

Use semantic spacing tokens for all pattern spacing:

| Pattern | Recommended spacing |
|---------|-------------------|
| Between form fields | `--spacing-gap-xl` (16px) |
| Inside a card | `--spacing-padding-xl` (16px) |
| Between sections | `--spacing-padding-xxl` (24px) |
| Page margins | `--spacing-padding-xxxl` (32px) |
| Icon to text | `--spacing-gap-xs` to `--spacing-gap-m` (4-8px) |
| Button internal padding | Handled by DS button classes |

## Icons in Patterns

- Use `button-icon-only` class for icon-only buttons (with accessible name)
- Use `button-icon-and-text` class when combining icon + text in a button
- Use `icon-and-text` class for non-button icon + text layouts
- Use `--color-icon-*` tokens for icon colors
