# Chameleon Implementation Details for WW

Non-obvious structural requirements and gotchas discovered during WW production builds. Framework-agnostic — covers component slot contracts, CSS requirements, and property constraints. For framework-specific wiring, see `angular-patterns.md` (Angular) or `react-patterns.md` (React).

---

## Version requirement

Always use `@genexus/chameleon-controls-library@^6.31.2` or higher. v3.x has a completely different component API — `ch-dialog` renders slot content outside the modal overlay (always visible), `ch-tab-render` hides panels differently, and part names differ. Using v3 will break the WW layout.

---

## `ch-tabular-grid` — mandatory slot structure

`ch-tabular-grid` **does not accept columns or rows as direct children**. Both must be wrapped in dedicated container elements. Omitting either wrapper causes the grid to render completely empty — no error is thrown.

### Required DOM structure

```html
<ch-tabular-grid row-selection-mode="single">

  <!-- Columns MUST be inside ch-tabular-grid-columnset -->
  <ch-tabular-grid-columnset>
    <ch-tabular-grid-column column-name="ID"    size="60px" sortable="false" settingable="false"></ch-tabular-grid-column>
    <ch-tabular-grid-column column-name="Name"  sortable="false" settingable="false"></ch-tabular-grid-column>
    <ch-tabular-grid-column column-name="Email" sortable="false" settingable="false"></ch-tabular-grid-column>
  </ch-tabular-grid-columnset>

  <!-- Rows MUST be inside ch-tabular-grid-rowset -->
  <ch-tabular-grid-rowset>
    <ch-tabular-grid-row row-id="1">
      <ch-tabular-grid-cell>1</ch-tabular-grid-cell>
      <ch-tabular-grid-cell>Alice</ch-tabular-grid-cell>
      <ch-tabular-grid-cell>alice@example.com</ch-tabular-grid-cell>
    </ch-tabular-grid-row>
  </ch-tabular-grid-rowset>

</ch-tabular-grid>
```

### Rules

| Rule | Detail |
|------|--------|
| Columns wrapper | Always `<ch-tabular-grid-columnset>` — never direct children of the grid |
| Rows wrapper | Always `<ch-tabular-grid-rowset>` — never direct children of the grid |
| `row-id` attribute | Must be a **string** — numeric values silently fail (e.g. `row-id="1"`, not `row-id=1`) |
| Grid height | `ch-tabular-grid` does **not** auto-size from row content. It requires an explicit `block-size` on the host element or it renders with 0 height |
| Disable sort & settings | Set `sortable="false"` and `settingable="false"` on **each `ch-tabular-grid-column`** — there is NO grid-level property for this. Both default to `true`. |

### What NOT to do

```html
<!-- ❌ WRONG — columns and rows directly in the grid, nothing renders -->
<ch-tabular-grid>
  <ch-tabular-grid-column column-name="Name"></ch-tabular-grid-column>
  <ch-tabular-grid-row row-id="1">...</ch-tabular-grid-row>
</ch-tabular-grid>

<!-- ✅ CORRECT — always use columnset + rowset wrappers -->
<ch-tabular-grid>
  <ch-tabular-grid-columnset>
    <ch-tabular-grid-column column-name="Name"></ch-tabular-grid-column>
  </ch-tabular-grid-columnset>
  <ch-tabular-grid-rowset>
    <ch-tabular-grid-row row-id="1">...</ch-tabular-grid-row>
  </ch-tabular-grid-rowset>
</ch-tabular-grid>
```

### Required CSS — grid height

The grid host needs an explicit `block-size`:

```css
/* Grid host — must have explicit height */
.tabular-grid {
  block-size: 420px;
}
```

### Header strip styling — use `ch-tabular-grid-columnset`

To style the full header strip (background color, bottom border), apply CSS to the `ch-tabular-grid-columnset` element — it is a light DOM element and accepts regular CSS classes. **Do NOT use `::part(header)` on the grid host** — that part does not control the column header row and causes the header to overlap the first data row.

Individual column header cells are styled via `::part(bar)` on `ch-tabular-grid-column` (for padding, typography, etc.), but the **shared background and border** belong on the columnset.

```css
/* ✅ CORRECT — background on the columnset element */
.grid-columnset {
  background-color: var(--color-accent-surface-elevation-2);
  border-block-end: var(--border-width-medium) solid var(--color-border-neutral-subtle);
}

/* ❌ WRONG — causes overlap with first row */
.tabular-grid::part(header) {
  background-color: var(--color-accent-surface-elevation-2);
}
```

```html
<ch-tabular-grid class="tabular-grid">
  <ch-tabular-grid-columnset class="grid-columnset">
    <ch-tabular-grid-column class="grid-column" column-name="Name" ...></ch-tabular-grid-column>
  </ch-tabular-grid-columnset>
  ...
</ch-tabular-grid>
```

### Row selected state — use `rowSelectedClass`

Use the grid's `rowSelectedClass` property to apply a CSS class to selected rows. The grid automatically adds/removes this class on `ch-tabular-grid-row` elements based on selection state.

```html
<ch-tabular-grid row-selection-mode="single" row-selected-class="row-selected">
  ...
</ch-tabular-grid>
```

Define the visual highlight in your DS or component CSS using the class:

```css
.row-selected > .grid-cell {
  background-color: var(--color-accent-item-active);
}
```

Similarly, `rowHighlightedClass` applies on hover and `rowFocusedClass` on keyboard focus.

---

## Inline row actions — direct buttons per row

For row-level actions (Edit, Delete), place buttons directly inside each row's last cell.

### Structure

Add an actions column and a cell with buttons in each row:

```html
<ch-tabular-grid row-selection-mode="single">
  <ch-tabular-grid-columnset>
    <ch-tabular-grid-column column-name="Name" sortable="false" settingable="false"></ch-tabular-grid-column>
    <!-- actions column — no header text -->
    <ch-tabular-grid-column column-name="" size="100px" sortable="false" settingable="false" resizable="false"></ch-tabular-grid-column>
  </ch-tabular-grid-columnset>
  <ch-tabular-grid-rowset>
    <ch-tabular-grid-row row-id="1">
      <ch-tabular-grid-cell class="grid-cell">Alice</ch-tabular-grid-cell>
      <ch-tabular-grid-cell class="grid-cell grid-cell-actions">
        <button class="button-tertiary row-action-button" type="button" title="Edit">✎</button>
        <button class="button-tertiary row-action-button row-action-delete" type="button" title="Delete">✕</button>
      </ch-tabular-grid-cell>
    </ch-tabular-grid-row>
  </ch-tabular-grid-rowset>
</ch-tabular-grid>
```

### Required CSS

```css
.grid-cell-actions { padding: 0; }
.row-action-button { background: none; border: none; cursor: pointer; color: var(--color-text-neutral-secondary); }
.row-action-button:hover { color: var(--color-text-neutral-default); }
.row-action-delete:hover { color: var(--color-text-error-default); }
```

See `angular-patterns.md` and `react-patterns.md` for framework-specific wiring.

---

## `ch-tab-render` — height chain

`ch-tab-render` does not propagate height to slotted content automatically. The full CSS chain must be explicit for tab panels and their content to fill available space:

```css
/* 1. Tab host fills its container */
.tab {
  display: flex;
  flex-direction: column;
  block-size: 100dvh;     /* or flex: 1 inside a flex parent */
  overflow: hidden;
}

/* 2. Panel container takes remaining space after the tab-list bar */
.tab::part(tab-panel-container) {
  flex: 1;
  min-block-size: 0;
  overflow: hidden;
}

/* 3. Individual panel fills its container */
.tab::part(tab-panel) {
  block-size: 100%;
  overflow: auto;
}
```

Slotted content components must also declare their own height:

```css
:host {
  display: block;
  block-size: 100%;
  overflow: auto;
}
```

---

## `ch-dialog` — slots, visibility, and state management

| Content | How to provide |
|---------|----------------|
| Title | `caption="..."` attribute — only rendered when `show-header` / `[showHeader]="true"` |
| Body | Default slot — no `slot` attribute needed |
| Footer buttons | `slot="footer"` — only rendered when `show-footer` / `[showFooter]="true"` |
| **Visibility** | **`show` attribute is REQUIRED** — without it the dialog mounts but stays invisible. Always add `show` even with conditional rendering. |

### Open/close best practices

- **Conditional rendering is preferred** — mount the dialog only when needed, unmount on close. This avoids stale state in form fields.
- **`show` attribute is still required** even with conditional rendering.
- **`dialogClosed` event** fires when the user closes via X button or Escape. Always handle it to set the mounting flag to `false`.

```html
<!-- Mount only when needed, always include show -->
<!-- if (showDialog) -->
<ch-dialog
  show-header
  show-footer
  closable
  show
  caption="Dialog Title"
  close-button-accessible-name="Close"
  (dialogClosed)="onDialogClosed()"
>
  <!-- body (default slot) -->

  <div slot="footer">
    <!-- footer buttons -->
  </div>
</ch-dialog>
```

---

## `ch-tabular-grid-column` — column header

Set the column header via the `column-name="Label"` attribute. **Text content inside the element goes to a settings slot** and is not displayed as the visible header. This is a common mistake — the header text must always be set via the attribute, not as inner text.

```html
<!-- ❌ WRONG — inner text is NOT the column header -->
<ch-tabular-grid-column>Name</ch-tabular-grid-column>

<!-- ✅ CORRECT — use the attribute -->
<ch-tabular-grid-column column-name="Name" sortable="false" settingable="false"></ch-tabular-grid-column>
```

---

## `ch-edit` — value and input event

`ch-edit` uses string values. Set `value` as a string; read changes via the `input` event on `(e.target as any).value`.

- For numeric fields, set `type="number"` and convert: `value={myNum.toString()}`, read back with `+(e.target as any).value`.

---

## `ch-combo-box-render` — model shape and styling

The `model` property expects `{ value: string; caption: string }[]`.

**`value` must always be a string.** Numeric IDs must be converted to strings when building the model, and converted back to numbers when reading the selected value.

```js
// Building the model
const model = authors.map(a => ({
  value:   a.id.toString(),   // ← always string
  caption: a.name
}));
```

When no item is selected, set `value` to `''` (empty string), not `null` or `undefined`.

### Host styling — no `display: block`

Do **not** set `display: block` on the combo-box host. It breaks the component's internal height calculation. The host element manages its own display mode.

### Dropdown styling

The combo-box has **no `container`, `input`, or `list` parts**. Style the input box on the host element directly. The dropdown popover part is `window`. Items use the `item` part.

---

## CSS `::part()` names

For verified `::part()` names, CSS custom properties, shadow DOM layout, styling recipes, and anti-patterns, consult each component's `styling.md` in the chameleon-controls-library skill's per-component reference directory.

