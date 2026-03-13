# DS CSS Templates for WW Components

Ready-to-use Design System component CSS for the standard WW pattern. Each template maps semantic tokens to a Chameleon component's styling API. Use these as the starting point when scaffolding or extending a DS for a WW build.

All `::part()` names and CSS custom properties below are verified against the chameleon-controls-library skill's per-component `styling.md`. If you need parts not listed here, look them up there.

---

## `ch-tab-render`

```css
.tab::part(tab-list) {
  background-color: var(--color-accent-surface-elevation-1);
  border-block-end: var(--border-width-thin) solid var(--color-border-neutral-subtle);
  padding-inline: var(--spacing-padding-l);
  block-size: var(--tab-strip-height);
}

.tab::part(tab) {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-neutral-secondary);
  padding-inline: var(--spacing-padding-xl);
  padding-block: var(--spacing-padding-m);
  border-block-end: 2px solid transparent;
}

.tab::part(tab):hover {
  color: var(--color-text-neutral-default);
}

.tab::part(tab selected) {
  color: var(--color-text-primary-default);
  border-block-end-color: var(--color-border-primary-default);
  font-weight: var(--font-weight-semibold);
}
```

---

## `ch-dialog`

The backdrop overlay is styled via `::part(dialog)::backdrop`. There is no `mask` or `window` part.

```css
.dialog::part(dialog) {
  background-color: var(--color-accent-surface-elevation-1);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  border: var(--border-width-thin) solid var(--color-border-neutral-default);
  color: var(--color-text-neutral-default);
}

.dialog::part(dialog)::backdrop {
  background-color: rgb(0 0 0 / 0.5);
}

.dialog::part(header) {
  padding-block: var(--spacing-padding-l);
  padding-inline: var(--spacing-padding-3xl);
  border-block-end: var(--border-width-thin) solid var(--color-border-neutral-subtle);
}

.dialog::part(caption) {
  font-size: var(--font-size-subheading);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-neutral-default);
}

.dialog::part(content) {
  padding-block: var(--spacing-padding-xl);
  padding-inline: var(--spacing-padding-3xl);
}

.dialog::part(footer) {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-gap-m);
  padding-block: var(--spacing-padding-l);
  padding-inline: var(--spacing-padding-3xl);
  border-block-start: var(--border-width-thin) solid var(--color-border-neutral-subtle);
}
```

---

## `ch-edit`

No `container` or `input` parts exist. The input box is styled on the **host element** directly.

```css
.input {
  border: var(--control-border-width) solid var(--color-border-neutral-default);
  border-radius: var(--control-border-radius);
  background-color: var(--color-accent-surface-surface);
  block-size: var(--control-block-size);
  padding-inline: var(--spacing-padding-l);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  color: var(--color-text-neutral-default);
  transition: border-color var(--duration-fast);
}

.input:hover {
  border-color: var(--color-border-neutral-hover);
}

.input:focus-within {
  border-color: var(--color-border-primary-default);
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: -1px;
}

.input:disabled,
.input[aria-disabled="true"] {
  opacity: 0.4;
  pointer-events: none;
}
```

---

## `ch-combo-box-render`

No `container`, `input`, or `list` parts exist. The input box is styled on the **host element** directly. The dropdown popover is `window`.

```css
.combo-box {
  border: var(--control-border-width) solid var(--color-border-neutral-default);
  border-radius: var(--control-border-radius);
  background-color: var(--color-accent-surface-surface);
  block-size: var(--control-block-size);
  padding-inline: var(--spacing-padding-l);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  color: var(--color-text-neutral-default);
  --ch-combo-box-separation-y: 4px;
  --ch-combo-box__picker-color: var(--color-icon-neutral-default);
  --ch-combo-box__placeholder-color: var(--color-text-neutral-secondary);
}

.combo-box:hover {
  border-color: var(--color-border-neutral-hover);
}

.combo-box:focus-within {
  border-color: var(--color-border-primary-default);
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: -1px;
}

/* Dropdown popover */
.combo-box::part(window) {
  background-color: var(--color-accent-surface-elevation-1);
  border: var(--border-width-thin) solid var(--color-border-neutral-default);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding-block: var(--spacing-padding-xs);
}

/* Dropdown items */
.combo-box::part(item) {
  padding: var(--spacing-padding-s) var(--spacing-padding-m);
  cursor: pointer;
}

.combo-box::part(item):hover {
  background-color: var(--color-accent-item-hover);
}

.combo-box::part(item selected) {
  background-color: var(--color-accent-item-active);
  font-weight: var(--font-weight-semibold);
}
```

---

## `ch-tabular-grid`

Uses light DOM children — style via CSS classes. The header strip background goes on `ch-tabular-grid-columnset` (not `::part(header)`).

```css
/* Header strip — on the columnset element */
.grid-columnset {
  background-color: var(--color-accent-surface-elevation-2);
  border-block-end: var(--border-width-medium) solid var(--color-border-neutral-subtle);
}

/* Individual column header cells */
.grid-column::part(bar) {
  padding-block: var(--spacing-padding-l);
  padding-inline: var(--spacing-padding-xl);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-neutral-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```
