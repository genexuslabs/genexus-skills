# Work With Pattern — UX Rules

**Version:** 0.2 | **Framework:** `ux-rule-levels-v02.md` | **Base pattern:** `ww-pattern.md`

Each rule is annotated with its abstraction level:
**L1** = universal structure · **L2** = platform convention · **L3** = product-specific

---

## 1. Overall Layout

The WW pattern is a master-detail screen. The master section (toolbar + grid)
and the detail panel coexist on one screen without page navigation.

| # | L | Rule | Dimension |
|---|---|---|---|
| 1.1 | L1 | The master list and the detail panel are shown on the same screen. The list is the entry point; the detail is subordinate and only visible when a record is selected. | Structure |
| 1.2 | L1 | The page background is the lowest elevation layer, always visible as the canvas behind the sections. | Design System |
| 1.3 | L1 | The layout container applies medium-large inner padding on all sides. Sections are separated by a medium gap and never touch the viewport edge or each other. | Design System |
| 1.4 | L2 | Each entity has exactly one WW instance represented as a tab. The tab set is the global entry point to all entities. | Structure |

### Audit

- [ ] 1.1 — Master list and detail panel coexist on one screen (no page navigation)
- [ ] 1.2 — Page background is the lowest elevation layer (body/root background)
- [ ] 1.3 — Layout container has inner padding; sections separated by a gap, never touching viewport edges
- [ ] 1.4 — Each entity has exactly one tab; `ch-tab-render` is the entry point

---

## 2. Master Section

The toolbar and grid form a single visual unit — an elevated card.

### 2a. Container

| # | L | Rule | Dimension |
|---|---|---|---|
| 2a.1 | L1 | The toolbar and master list together form a single elevated section (card): raised surface, large rounded corners, drop shadow, overflow clipped to boundary. | Design System |

### 2b. Toolbar

The toolbar contains only **global actions** — actions that do not require a row selection. Row-level actions (Edit, Delete) are inline on each row (see 2d).

| # | L | Rule | Dimension |
|---|---|---|---|
| 2b.1 | L1 | Global actions are grouped in a toolbar at the top of the master card, separated from the grid by a bottom border. | Structure |
| 2b.2 | L1 | The toolbar only contains actions that apply globally (e.g., Create) or custom developer-defined actions. No selection-dependent actions (Edit, Delete) belong here. | Structure |
| 2b.3 | L1 | Create is the leftmost action, followed by any custom actions. | Structure |
| 2b.4 | L2 | Create uses a primary button style. Custom actions use secondary or tertiary styles as appropriate. | Design System |

### 2c. Grid

| # | L | Rule | Dimension |
|---|---|---|---|
| 2c.1 | L1 | The grid has no outer border. The visual boundary is provided by the master card. | Design System |
| 2c.2 | L1 | The column header row uses a visibly higher-elevation background than the data area, separated by a thick solid border. Headers have explicit vertical padding, clearly taller than data rows. | Design System |
| 2c.3 | L1 | Each data cell has medium vertical padding and medium-large horizontal padding for comfortable readability. | Design System |
| 2c.4 | L1 | Adjacent data rows are separated by a subtle 1px bottom border to aid scanability. | Design System |
| 2c.5 | L1 | Grid rows do **not** have a row-level click handler. The row itself is not clickable; only the description field link and inline row actions are interactive. | UX Flow |
| 2c.6 | L1 | Numeric values in columns are end-aligned to facilitate visual comparison. | Design System |
| 2c.7 | L2 | The grid operates in single-selection mode. The selected row is highlighted with a distinct background. Selection is triggered by clicking the **description field link** in the row (see 2c.8), not by clicking anywhere on the row. | UX Flow / Design System |
| 2c.8 | L1 | Each entity has a **description field** — the single field that identifies the entity across the entire UX. In the grid, the description field cell renders as an `fk-link` button. Clicking it selects the record and opens the detail surface. All other cells in the row are inert (no pointer, no click handler). See `ww-spec-definition.md` § `ui.descriptionField` for the full list of where this field is used and the inference rules when not explicitly set. | Structure / UX Flow |

### 2d. Inline Row Actions

Edit and Delete are row-level actions rendered as always-visible icon buttons in each row's last cell, removing the need to first select a row and then act from a toolbar.

| # | L | Rule | Dimension |
|---|---|---|---|
| 2d.1 | L1 | Edit and Delete actions appear as always-visible icon buttons in the last cell of each row. A dedicated actions column (no header text, fixed width) hosts the cell. | Structure / UX Flow |
| 2d.2 | L1 | Edit uses a neutral/secondary icon style. Delete uses a danger icon style (visible on hover/focus). | Design System |
| 2d.3 | L1 | Clicking Edit selects the row and switches the detail surface to `editing` state with that row's data pre-populated (same as rule 5.2). Clicking Delete opens the Delete confirmation dialog for that row (same as rule 7.1). The entity is passed directly via closure. | UX Flow |
| 2d.4 | L1 | The actions column has a fixed width and does not shift other column content. | Structure |

### Audit

- [ ] 2a.1 — Toolbar + grid wrapped in a single `.layout-card` (rounded corners, shadow, overflow clipped)
- [ ] 2b.1 — Toolbar separated from grid by a bottom border
- [ ] 2b.2 — Toolbar contains only global actions (Create); no Edit/Delete
- [ ] 2b.3 — Create is leftmost action
- [ ] 2b.4 — Create uses `button-primary` class
- [ ] 2c.1 — Grid has no outer border
- [ ] 2c.2 — Column headers styled with higher-elevation background, thick bottom border, and taller padding than data rows — requires `::part(bar)` on `ch-tabular-grid-column` (class: `grid-column`)
- [ ] 2c.3 — Data cells have medium vertical/horizontal padding (`.grid-cell` class)
- [ ] 2c.4 — Adjacent rows separated by 1px bottom border
- [ ] 2c.5 — No row-level click handler on `ch-tabular-grid-row`
- [ ] 2c.6 — Numeric columns use `.grid-cell-end` (end-aligned)
- [ ] 2c.7 — Grid uses `row-selection-mode="single"` and `row-selected-class`
- [ ] 2c.8 — Description field cell renders as `fk-link` button; all other cells are inert
- [ ] 2d.1 — Edit/Delete icon buttons in last cell of each row; actions column has no header text, fixed width, `resizable="false"`
- [ ] 2d.2 — Edit: neutral style; Delete: danger on hover (`.row-action-delete`)
- [ ] 2d.3 — Edit selects row + enters editing state; Delete opens delete dialog
- [ ] 2d.4 — Actions column fixed width (`100px`), does not shift content

---

## 3. Detail Surface (Unified View/Edit)

The detail surface is a single panel that supports three states: **viewing**, **editing**, and **creating**. There are no separate Create or Edit dialogs — all interaction happens on this surface. The surface works in all three view modes (bottom, side, dialog).

### 3a. States

| State | Entry point | Behavior |
|-------|------------|----------|
| `viewing` | Clicking the description field link in a grid row | Read-only display. Fields show label + value. FK fields are navigation links. An "Edit" button in the surface header enables editing. |
| `editing` | Clicking "Edit" in the surface header | Same surface, same fields — but values become inputs. FK links become combo-boxes. Save/Cancel buttons replace the Edit button. |
| `creating` | Clicking "New [Entity]" in the toolbar | Surface appears with blank inputs (no row selected). Save/Cancel buttons are shown. The surface header says "New [Entity]". |

### 3b. Structure

| # | L | Rule | Dimension |
|---|---|---|---|
| 3.1 | L1 | The detail surface is a separate elevated card with the same visual treatment as the master card. It is hidden entirely when no row is selected and no creation is in progress. | Structure / Design System |
| 3.2 | L1 | In `viewing` state, fields are displayed in a two-column layout: label on the left in muted/secondary text style, value on the right in the default text style. | Design System |
| 3.3 | L1 | In `editing` and `creating` states, the same two-column layout is used but the value column contains inputs (ch-edit, ch-combo-box-render) instead of read-only text. | Design System |
| 3.4 | L1 | Values that navigate to another entity (viewing state) are visually distinguished via action color and underline. The underline is removed on hover. | Design System |
| 3.5 | L2 | FK fields render as navigation links in `viewing` state and as combo-boxes in `editing`/`creating` states. | Structure / UX Flow |

### 3c. Surface Header & Actions

| # | L | Rule | Dimension |
|---|---|---|---|
| 3.6 | L1 | The surface header displays the record's **description field** value (viewing/editing) or "New [Entity]" (creating). | Structure |
| 3.7 | L1 | In `viewing` state, an "Edit" button (tertiary style, pencil icon ✎) is placed at the inline-end of the header. | Structure / Design System |
| 3.8 | L1 | In `editing`/`creating` states, Save (primary) and Cancel (secondary) buttons replace the Edit button in the header. | Structure / Design System |
| 3.9 | L1 | Cancel reverts to `viewing` state (if editing) or hides the surface (if creating). Unsaved changes are discarded. | UX Flow |
| 3.10 | L1 | Save commits the changes. For editing, the surface returns to `viewing` state with the updated record selected. For creation, the new record appears in the grid, the surface returns to hidden state with no selection (rule 8.1). | UX Flow |

### 3d. View Mode Integration

| # | L | Rule | Dimension |
|---|---|---|---|
| 3.11 | L1 | The unified surface works identically in all three view modes (bottom, side, dialog). The state (viewing/editing/creating) is independent of the view mode. | Structure |
| 3.12 | L1 | In dialog mode the footer is always visible. In `viewing` state it shows an Edit button (✎); in `editing`/`creating` it shows Save/Cancel. The detail surface header (`.detail-header`) is hidden in dialog mode — the dialog's own `caption` and footer replace it. | Structure |
| 3.13 | L1 | Switching view modes preserves the current state. If editing in bottom mode and switching to dialog, the dialog opens in editing state. | UX Flow |

### Audit

- [ ] 3.1 — Detail is a separate `.layout-card`, hidden when no selection and not creating
- [ ] 3.2 — Viewing: two-column grid layout (label muted/secondary + value default)
- [ ] 3.3 — Editing/creating: same layout, values replaced by `ch-edit` / `ch-combo-box-render`
- [ ] 3.4 — FK values in viewing state styled as `fk-link` (action color, underline, no underline on hover)
- [ ] 3.5 — FK fields: navigation links in viewing, combo-boxes in editing/creating
- [ ] 3.6 — Header shows description field value (viewing/editing) or "New [Entity]" (creating)
- [ ] 3.7 — Viewing: Edit button (✎, tertiary) at inline-end of header
- [ ] 3.8 — Editing/creating: Save (primary) + Cancel (secondary) replace Edit button
- [ ] 3.9 — Cancel: reverts to viewing (editing) or hides surface (creating)
- [ ] 3.10 — Save: after edit → viewing with updated record; after create → hidden, no selection
- [ ] 3.11 — Surface works identically in all three view modes
- [ ] 3.12 — Dialog mode: `.detail-header` hidden; dialog caption + footer replace it; footer always visible with state-appropriate buttons
- [ ] 3.13 — Switching view modes preserves current state

---

## 4. Children Section

Shown inside the detail panel when the selected entity has a one-to-many
relationship with another entity that has its own WW instance.

| # | L | Rule | Dimension |
|---|---|---|---|
| 4.1 | L1 | The children section appears at the bottom of the detail panel, separated from the fields above by a horizontal divider. | Structure |
| 4.2 | L1 | The section title uses a small, muted, uppercase label style. | Design System |
| 4.3 | L1 | When the collection is empty, a muted empty-state message replaces the table. | UX Flow |
| 4.4 | L2 | The child entity's **description field** in each row is rendered as an FK-style navigation link (same visual treatment as 2c.8 / 3.4: action color, underline, no underline on hover). Clicking it navigates to the target entity's tab with that record selected. The rest of the row is not clickable. | UX Flow |

### Audit

- [ ] 4.1 — Children section at bottom of detail, separated by `<hr>` divider, only in viewing state
- [ ] 4.2 — Section title: small, muted, uppercase (`.related-label`)
- [ ] 4.3 — Empty state: muted message when no children
- [ ] 4.4 — Child description field renders as `fk-link`; clicking navigates to target tab with record selected

---

## 5. Create & Edit (via Unified Detail Surface)

Create and Edit are states of the unified detail surface (section 3), not separate dialogs.

| # | L | Rule | Dimension |
|---|---|---|---|
| 5.1 | L1 | Creating is triggered by the "New [Entity]" toolbar button. It opens the detail surface in `creating` state with blank fields, regardless of current selection. | UX Flow |
| 5.2 | L1 | Editing is triggered by the inline row Edit button (2d) or the Edit button in the surface header (3.7). It opens the detail surface in `editing` state with the record's values pre-populated. | UX Flow |
| 5.3 | L1 | In both states, fields use a two-column layout matching the viewing layout: label on the left, input on the right. Inputs stretch to fill the value column. | Design System |
| 5.4 | L1 | Pairs of related short fields may be grouped in a single horizontal row. Each field occupies equal width. | Design System |
| 5.5 | L2 | FK fields are rendered as combo-boxes populated with the target entity's records. Placeholder text is "Select [Entity]...". | Structure / UX Flow |

### Audit

- [ ] 5.1 — Create opens surface in creating state with blank fields
- [ ] 5.2 — Edit opens surface in editing state with pre-populated values
- [ ] 5.3 — Two-column layout matching viewing layout; inputs stretch to fill
- [ ] 5.5 — FK fields as `ch-combo-box-render` with `placeholder="Select [Entity]..."`

---

## 6. *(Reserved — removed in v0.2)*

---

## 7. Delete Confirmation Dialog

| # | L | Rule | Dimension |
|---|---|---|---|
| 7.1 | L1 | The dialog caption follows the pattern "Delete [Entity Name]". | Structure |
| 7.2 | L1 | The body names the specific record being deleted (description field value, in emphasis style) and states the action cannot be undone. | Structure / UX Flow |
| 7.3 | L1 | The footer contains two actions: Cancel (secondary) and Delete (danger). | Structure / Design System |

### Audit

- [ ] 7.1 — Dialog caption: "Delete [Entity]"
- [ ] 7.2 — Body names the record (description field in `<strong>`) + "cannot be undone"
- [ ] 7.3 — Footer: Cancel (`button-secondary`) + Delete (`button-danger`)

---

## 8. Post-Operation Behavior

| # | L | Rule | Dimension |
|---|---|---|---|
| 8.1 | L1 | After Create: the master list refreshes; the surface returns to hidden state (no selection); the new record is not automatically selected. | UX Flow |
| 8.2 | L1 | After Edit: the master list refreshes; the surface returns to `viewing` state with the edited record selected and updated values visible. | UX Flow |
| 8.3 | L1 | After Delete: the master list refreshes; selection is cleared; the detail surface is hidden. | UX Flow |

### Audit

- [ ] 8.1 — After Create: list refreshes, surface hidden, no selection
- [ ] 8.2 — After Edit: list refreshes, viewing state, edited record re-selected
- [ ] 8.3 — After Delete: list refreshes, selection cleared, surface hidden

---

## 9. FK Navigation

| # | L | Rule | Dimension |
|---|---|---|---|
| 9.1 | L2 | Navigating via an FK link switches the active tab to the target entity. The referenced record is selected in its grid and its detail panel is visible. | UX Flow |

### Audit

- [ ] 9.1 — FK link calls `NavigationService.navigateTo()` / `useNavigation().navigateTo()`; target tab activates with record selected

---

## 10. Embedded Item Collections

A one-to-many list of sub-items that belong exclusively to a parent entity and
have no standalone WW instance (e.g., invoice lines, order products). Items are
created and deleted as part of the parent, never independently.

| # | L | Rule | Dimension |
|---|---|---|---|
| 10.1 | L1 | The items section appears in both the detail panel and the Create/Edit dialog, separated from surrounding content by a divider. | Structure |
| 10.2 | L1 | When the collection is empty, a muted empty-state message is shown in place of the table. | UX Flow |
| 10.3 | L1 | The add-item row presents a reference selector, a quantity field, and an add button as a single horizontal inline unit directly below the table. | Structure |
| 10.4 | L1 | Each item row has an inline remove action. The control signals destructive intent on hover/focus. | UX Flow |
| 10.5 | L1 | A total row is visually distinguished from data rows: emphasis weight, no bottom separator. | Design System |

### Audit

- [ ] 10.1 — Items section in detail + create/edit, separated by divider
- [ ] 10.2 — Empty state: muted message
- [ ] 10.3 — Add-item row: reference selector + inputs + add button, inline below table
- [ ] 10.4 — Each item row has inline remove action (destructive on hover)
- [ ] 10.5 — Total row: emphasis weight, no bottom separator

---

## 11. Detail View Modes

The detail panel supports three presentation modes. All three are always
generated. The `ww-config.yaml` may override the enabled modes and the
default. View modes are a **global** setting — they apply to all entities.

### 11a. Mode Definitions

| Mode | Id | Behavior |
|------|----|----------|
| Top-Bottom | `bottom` | Detail card renders below the master card in a vertical stack. Default mode. The page scrolls to reveal the detail when content exceeds the viewport. |
| Side by Side | `side` | Master and detail sit in a horizontal flex row. The master card takes remaining space (`flex: 1`); the detail card has a fixed inline-size (~380 px) and independently scrolls when its content overflows. |
| Dialog | `dialog` | The detail is not inline. Clicking the description field link opens a `ch-dialog` whose caption is the record's description field value. The master grid remains fully visible behind the overlay. Closing the dialog does not clear the selection. |

### 11b. View Switcher

| # | L | Rule | Dimension |
|---|---|---|---|
| 11b.1 | L1 | A view-switcher control is placed in the **app heading bar**, visually aligned at the inline-end of the tab strip row. The switcher is **not** inside any entity's toolbar — it is a global control at the app level. | Structure |
| 11b.2 | L1 | The switcher contains one button per enabled mode, using compact tertiary button styling. The active mode button is visually distinguished (e.g., active background + full opacity vs. reduced opacity for inactive). | Design System |
| 11b.3 | L1 | Each button has a descriptive `title` attribute for accessibility. Recommended labels: `↕` Top-Bottom, `↔` Side by Side, `⊞` Dialog. | Structure / Accessibility |
| 11b.4 | L2 | Switching modes preserves the current selection. In dialog mode, the detail dialog opens automatically when the description field link is clicked and can be dismissed independently. | UX Flow |
| 11b.5 | L2 | The view mode is **global** — shared across all entity tabs. Changing the mode applies to every entity. In React, `detailView` lives in `NavigationContext`; in Angular, it lives in `NavigationService`. | Structure |

### 11c. Layout CSS

| # | L | Rule | Dimension |
|---|---|---|---|
| 11c.1 | L1 | The page container switches between vertical (bottom) and horizontal (side) layout via a class toggle. No extra wrapper elements are needed. | Structure |
| 11c.2 | L1 | In side mode, the master card fills remaining space and the detail panel has a fixed inline-size (~380 px) with independent scroll when content overflows. | Design System |
| 11c.3 | L1 | In dialog mode, the detail content is rendered inside a `ch-dialog` with `show-header`, `show-footer`, and `closable`. The dialog caption is the record's **description field** value (viewing/editing) or "New [Entity]" (creating). The footer is always visible: in `viewing` state it shows an Edit button (✎); in `editing`/`creating` it shows Save/Cancel. Children sections are included inside the dialog body. | Structure |

### 11d. WW-Config Override

View modes are configured globally in `ww-config.yaml`, not per-entity. See `ww-config-definition.md` for the full schema, all fields, and default values.

### Audit

- [ ] 11b.1 — View switcher in app heading bar (not in entity toolbar), aligned at inline-end of tab strip
- [ ] 11b.2 — One button per enabled mode; active mode visually distinguished (opacity + background)
- [ ] 11b.3 — Each button has a `title` attribute (↕ Top-Bottom, ↔ Side by Side, ⊞ Dialog)
- [ ] 11b.4 — Switching modes preserves current selection
- [ ] 11b.5 — View mode is global — shared via `NavigationService` / `NavigationContext`
- [ ] 11c.1 — Layout switches via class toggle on `.layout-page` (`.layout-side`)
- [ ] 11c.2 — Side mode: master `flex: 1`, detail `inline-size: 380px`, independent scroll
- [ ] 11c.3 — Dialog mode: `ch-dialog` with `show`, `show-header`, `show-footer`, `closable`; caption = description field or "New [Entity]"; footer always visible with state-appropriate buttons

---

## 12. Layout Defaults

Reference values used across UX rules and implementation patterns.

| Constant | Default | Used in |
|---|---|---|
| ID column size | `60px` | Master grid first column |
| Actions column size | `100px` | Master grid last column (inline Edit/Delete) |
| Grid block-size | `420px` | `.tabular-grid` host height |
| Side panel inline-size | `380px` | Detail panel in side-by-side mode (rule 11c.2) |

These are sensible defaults — adjust per project if the data or viewport requires it.

### Audit

- [ ] 12 — ID column `60px`, actions column `100px`, grid height `420px`, side panel `380px`

---

## Gaps — capabilities not yet implemented

| Capability | Status |
|---|---|
| Search, filtering, and sorting in the list | Not implemented |
| Referential integrity validation on Delete | Not implemented |
| FK combo-box with text filter | Partial (no search) |

These gaps may be implemented in future iterations. Do not generate them unless the user explicitly requests it.
