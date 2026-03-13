# Accessibility (WCAG 2.1/2.2 Level AA)

## Requirements

| Criterion | Requirement | Implementation |
|---|---|---|
| 1.4.3 Contrast (minimum) | Normal text 4.5:1, large text 3:1 | Validate centrally via token pairs |
| 1.4.11 Non-text contrast | UI components 3:1 | Pre-validate token pairs |
| 2.4.7 Focus visible | Focus always visible on keyboard nav | `:focus-visible` universal pattern |
| 2.4.11 Focus appearance | Focus indicator ≥2px, contrast 3:1 | Token `--border-width-focus` |
| 2.5.8 Target size | Minimum 24x24 px (Level AA) | `--control-block-size` token |
| 2.3.3 Animation | Respect `prefers-reduced-motion` | Override timing tokens to 0ms |
| 1.4.4 Resize text | Functional at 200% zoom | `rem`-based tokens |
| 1.4.10 Reflow | Reflow at 400% / 320px | Flexible layouts + logical properties |
| 1.4.1 Use of color | Never rely on color alone | Require icons/text alongside color |

## Focus-Visible — Universal Pattern

Apply to EVERY interactive element:

```css
:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: calc(var(--size-2) * -1);
}
```

- Use `:focus-visible` (NOT `:focus`) — shows outline only on keyboard navigation
- Negative offset prevents layout shift

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --timing-fast: 0ms;
    --timing-super-fast: 0ms;
    --ch-accordion-expand-collapse-duration: 0ms;
  }
}
```

## Forced Colors (Windows High Contrast)

```css
@media (forced-colors: active) {
  .button-primary {
    border: 2px solid ButtonText;
  }
  :focus-visible {
    outline: 2px solid Highlight;
  }
}
```

## Touch Targets

Use `--control-block-size` to guarantee minimum 24x24 px targets:

```css
.button-icon-only {
  padding: calc(
    (var(--control-block-size) - 2 * var(--control-border-width) - var(--icon-m)) / 2
  );
}
```

Add `touch-action: manipulation` to all interactive elements

## Typography

- Use `rem` for all font sizes
- Use `round(1em * var(--line-height-relaxed), 1px)` for pixel rounding
- Use logical properties for RTL support
- Keep line length at 65-75 characters for readability

## Form Accessibility Pattern

```html
<div class="field field-block">
  <label class="label" for="email">Email</label>
  <ch-edit class="input" id="email" accessible-name="Email address"></ch-edit>
  <span class="error-message" id="email-error" aria-live="polite">
    Invalid email format
  </span>
</div>
```

## Dialog Accessibility

- `ch-dialog` handles focus trap natively via the `modal` prop
- `closable` prop enables Escape to close
- ALWAYS set `close-button-accessible-name`
- Return focus to the trigger element when dialog closes

## Navigation Accessibility

- Use HTML landmarks: `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`
- Provide skip links (hidden until focused)
- Chameleon handles `aria-expanded` (accordion/tree) and `aria-selected` (tabs) natively
