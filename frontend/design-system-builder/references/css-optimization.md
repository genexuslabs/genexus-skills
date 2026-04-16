# CSS Optimization Rules

> **Goal**: Generate the smallest possible CSS without minification. Every byte matters
> in component budgets (≤10 KB minified / ≤5 KB gzipped per component)

## Core Rules

### 1. No Redundant Selectors

The same selector MUST NOT appear twice in a file. If you need to add properties to a selector that already exists, merge them into the existing rule block

```css
/* WRONG — same selector appears twice */
.button-primary {
  display: inline-flex;
  align-items: center;
}
.button-primary {
  background-color: var(--color-accent-primary-default);
}

/* CORRECT — single selector block */
.button-primary {
  display: inline-flex;
  align-items: center;
  background-color: var(--color-accent-primary-default);
}
```

**Exception**: The 5-section structure in component CSS files allows the same selector to appear in different sections (STRUCTURE, DECORATION, TYPOGRAPHY, STATES, VARIANTS) for readability. However, within each section, selectors must not repeat. When optimizing for size, sections can be collapsed if the file exceeds budget

### 2. Group Shared Properties

When multiple selectors share identical property-value pairs, combine them with comma-separated selectors

```css
/* WRONG — duplicated declarations */
.button-primary {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-m);
  font-weight: var(--font-style-semi-bold);
  line-height: var(--line-height-tight);
}
.button-secondary {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-m);
  font-weight: var(--font-style-semi-bold);
  line-height: var(--line-height-tight);
}
.button-tertiary {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-m);
  font-weight: var(--font-style-semi-bold);
  line-height: var(--line-height-tight);
}

/* CORRECT — grouped selectors */
.button-primary,
.button-secondary,
.button-tertiary {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-m);
  font-weight: var(--font-style-semi-bold);
  line-height: var(--line-height-tight);
}
```

### 3. No Duplicate Declarations

Within a single rule block, no property should appear more than once

```css
/* WRONG */
.card {
  padding: var(--spacing-padding-xl);
  background-color: var(--color-accent-surface-elevation-1);
  padding: var(--spacing-padding-xxl); /* duplicate */
}

/* CORRECT */
.card {
  padding: var(--spacing-padding-xxl);
  background-color: var(--color-accent-surface-elevation-1);
}
```

### 4. Use `:where()` for Shared Base Styles

Use `:where()` to zero-specificity base selectors, allowing variant overrides without specificity wars

```css
/* Base styles at zero specificity */
:where(.button-primary, .button-secondary, .button-tertiary) {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-gap-xs);
  border: var(--border-width-thin) solid transparent;
  border-radius: var(--border-radius-s);
  cursor: pointer;
}

/* Variant overrides at normal specificity */
.button-primary {
  background-color: var(--color-accent-primary-default);
  color: var(--color-text-neutral-on-text);
}
```

### 5. Shorthand Properties

Use shorthand properties when setting multiple related values

```css
/* WRONG — verbose */
.card {
  padding-block-start: var(--spacing-padding-xl);
  padding-block-end: var(--spacing-padding-xl);
  padding-inline-start: var(--spacing-padding-xxl);
  padding-inline-end: var(--spacing-padding-xxl);
}

/* CORRECT — shorthand */
.card {
  padding-block: var(--spacing-padding-xl);
  padding-inline: var(--spacing-padding-xxl);
}
```

### 6. Avoid Unnecessary Resets

Do not reset properties to their browser defaults when they already inherit the correct value from the DS base layer

```css
/* WRONG — unnecessary resets (base/base.css already handles these) */
.card {
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
}

/* CORRECT — only set what changes */
.card {
  padding: var(--spacing-padding-xl);
  border-radius: var(--border-radius-m);
}
```

### 7. Minimize Token References

If a token is used multiple times in the same component, consider creating a component-level CSS custom property to reduce repetition

```css
/* Instead of repeating the same token 5 times... */
.dialog {
  --_padding: var(--spacing-padding-xl);
  --_radius: var(--border-radius-m);
}

.dialog::part(header) { padding: var(--_padding); }
.dialog::part(content) { padding: var(--_padding); }
.dialog::part(footer) { padding: var(--_padding); }
.dialog::part(dialog) { border-radius: var(--_radius); }
```

## Optimization Checklist

Before finalizing any component CSS, verify:

- [ ] No selector appears more than once per section
- [ ] Shared property-value sets are grouped into comma-separated selectors
- [ ] No duplicate property declarations in any rule block
- [ ] Shorthand properties used where applicable
- [ ] No unnecessary browser-default resets
- [ ] `:where()` used for base styles shared across variants
- [ ] Component-level custom properties used to reduce token repetition (when 3+ usages)
- [ ] Total file size is within budget (≤10 KB minified / ≤5 KB gzipped)

## Units Rule

> **HARD RULE**: Never use `em` or `rem` units for any property — spacing, sizing, border-radius, font-size in components. Use design tokens or px values from the 4pt grid. **Only exception**: the user explicitly requests em/rem

```css
/* WRONG */
.card { padding: 1rem; margin-bottom: 1.5em; font-size: 0.875rem; }

/* CORRECT */
.card {
  padding: var(--spacing-padding-xl);
  margin-block-end: var(--spacing-padding-xxl);
  font-size: var(--font-size-body-m);
}
```
