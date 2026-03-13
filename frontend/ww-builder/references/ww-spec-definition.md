# WW-Spec Definition

Complete reference for the Work With Specification YAML schema. Each field documents its type, possible values, effect on implementation, and default behavior when absent.

---

## Table of Contents

1. [Schema Overview](#schema-overview)
2. [Root Fields](#root-fields)
   - [`entity`](#entity)
   - [`views`](#views)
3. [`ui` Block](#ui-block)
   - [`ui.descriptionField`](#uidescriptionfield)
   - [`ui.list`](#uilist)
     - [`ui.list.columns`](#uilistcolumns)
   - [`ui.detail`](#uidetail)
     - [`ui.detail.sections`](#uidetailsections)
  4. [`relationships` Array](#relationships-array)
   - [Relationship Object Fields](#relationship-object-fields)
     - [`field`](#field)
     - [`target`](#target)
     - [`targetField`](#targetfield)
     - [`name`](#name)
     - [`kind`](#kind)
   - [`kind: lookup`](#kind-lookup)
   - [`kind: navigation`](#kind-navigation)
   - [`kind: children`](#kind-children)
5. [`embeddedItems` Array](#embeddeditems-array)
6. [Common FK Field Patterns](#common-fk-field-patterns)
7. [Complete Example](#complete-example)

---

## Schema Overview

```yaml
entity: string                          # required
views: [list, detail, create, edit, delete]  # optional
ui:
  descriptionField: string              # optional
  list:
    columns: [field1, field2, ...]      # optional
  detail:
    sections:
      - fields: [field1, field2, ...]   # optional
relationships:
  - field: string                       # required for lookup/navigation
    target: string                      # required
    targetField: string                 # required for children
    name: string                        # optional (children display name)
    kind: lookup | navigation | children  # required
embeddedItems:                           # optional
  - name: string                         # required
    fields: [field1, field2, ...]        # required
    referenceField: string               # optional
    referenceTarget: string              # optional (required if referenceField set)
    columns: [field1, field2, ...]       # optional (defaults to fields)
    totalField: string                   # optional
```

---

## Root Fields

### `entity`

| | |
|---|---|
| **Type** | `string` |
| **Required** | Yes |
| **Example** | `BookEdition` |

The entity name. Drives all derived identifiers:

| Derived form | Rule | Example (`BookEdition`) |
|---|---|---|
| Tab id | Full name → kebab-case, pluralized | `book-editions` |
| Tab label | If PascalCase compound (e.g. `BookEdition`), use the last word pluralized (`Editions`). If the last word collides with another entity's tab label, use the full name pluralized (`BookEditions`). Single-word entities just pluralize (`Author` → `Authors`). |
| Component file | PascalCase (React) / kebab-case (Angular) | `BookEdition.tsx` / `book-edition.component.ts` |
| Service methods | camelCase prefixed | `addBookEdition`, `deleteBookEdition`, `getBookEditionDisplayName` |
| Dialog captions | Raw entity name | "New BookEdition", "Delete BookEdition" |

### `views`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | No |
| **Possible values** | `list`, `detail`, `create`, `edit`, `delete` |
| **Default** | All five views enabled |
| **Example** | `[list, detail, create, edit, delete]` |

Controls which CRUD operations are generated for the entity.

| Value | Implementation effect |
|---|---|
| `list` | Master grid is rendered |
| `detail` | Detail surface (viewing state) is rendered |
| `create` | "New [Entity]" toolbar button + creating state |
| `edit` | Edit button in surface header + inline row Edit button + editing state |
| `delete` | Inline row Delete button + delete confirmation dialog |

When a view is omitted, the corresponding UI elements and logic are not generated. For example, omitting `delete` removes the Delete button from inline row actions and the delete confirmation dialog entirely.

---

## `ui` Block

### `ui.descriptionField`

| | |
|---|---|
| **Type** | `string` (field name) |
| **Required** | No |
| **Example** | `title`, `name`, `isbn` |
| **UX Rules** | 2c.8, 3.6, 4.4, 7.2, 11c.3 |

The single field that identifies the entity across the UX. This is the most important semantic field in the spec.

**Where it appears:**

| Location | How it's used |
|---|---|
| Master grid | The description field column renders as an `fk-link` button. Clicking it selects the record and opens the detail surface. All other cells are inert. |
| Detail surface header | Displays `selected.descriptionField` in viewing/editing, or "New [Entity]" in creating. |
| Delete confirmation dialog | "Are you sure you want to delete **{descriptionField}**?" |
| Dialog mode caption | `ch-dialog` caption is the description field value. |
| FK helper (`getXDisplayName`) | Returns the description field value for a given ID. Used when other entities display this entity as an FK reference. |
| Children section (on parent) | The child entity's description field is rendered as a navigation link in the children table. |

**Inference when absent:**

1. First non-FK string field named `name`
2. First non-FK string field named `title`
3. First non-FK string field in the entity definition

### `ui.list`

Container for master grid configuration.

#### `ui.list.columns`

| | |
|---|---|
| **Type** | `string[]` (field names) |
| **Required** | No |
| **Example** | `[isbn, year, format]` |
| **UX Rules** | 2c.1–2c.8 |

Determines which columns appear in the master grid. The grid always adds:

- An **ID** column as the first column (size `60px`)
- An **actions column** as the last column (size `100px`, no header text) containing inline Edit/Delete buttons

**Column rendering rules:**

| Field type | Rendering | CSS class |
|---|---|---|
| Description field | `fk-link` button inside the cell | `fk-link` |
| String | Plain text | `grid-cell` |
| Number | Right-aligned text | `grid-cell grid-cell-end` |
| FK field | Resolved display value via `getXDisplayName()` | `grid-cell` |

**Inference when absent:** All entity fields except `id` are shown as columns.

### `ui.detail`

Container for detail surface configuration.

#### `ui.detail.sections`

| | |
|---|---|
| **Type** | `array` of `{ fields: string[] }` |
| **Required** | No |
| **Example** | `[{ fields: [isbn, year, bookId, publisherId, format] }]` |
| **UX Rules** | 3.1–3.5 |

Defines which fields appear in the detail surface and their order. Each section is a group of fields rendered as a vertical list of label-value rows.

**Field rendering by state and type:**

| Field type | Viewing state | Editing/Creating state |
|---|---|---|
| Regular field | Label + read-only value | Label + `ch-edit` input |
| Numeric field | Label + read-only value | Label + `ch-edit` with `type="number"` |
| FK field (`kind: navigation`) | Label + `fk-link` button (navigates to target entity) | Label + `ch-combo-box-render` (populated with target entity records) |
| Description field | Label + read-only value (same as regular) | Label + `ch-edit` input |

**Inference when absent:** Single section containing all entity fields except `id`.

---

## `relationships` Array

Each entry defines a relationship between the current entity and another entity. A single FK field typically produces two relationship entries: one `navigation` (for viewing) and one `lookup` (for editing).

### Relationship Object Fields

#### `field`

| | |
|---|---|
| **Type** | `string` (field name on the current entity) |
| **Required** | Yes for `lookup` and `navigation`; absent for `children` |
| **Example** | `authorId`, `bookId` |

The FK field on the current entity. This field stores the ID of the related record.

#### `target`

| | |
|---|---|
| **Type** | `string` (entity name) |
| **Required** | Yes (all kinds) |
| **Example** | `Author`, `Book`, `Publisher` |

The target entity that the relationship points to. Must match an `entity` value in another WW-Spec (or an entity definition in the request).

#### `targetField`

| | |
|---|---|
| **Type** | `string` (field name on the target entity) |
| **Required** | Yes for `children`; absent for `lookup`/`navigation` |
| **Example** | `authorId` (on Book, pointing back to Author) |

The FK field on the **child** entity that references the current (parent) entity. Used to query children: `getBooksByAuthor(authorId)`.

#### `name`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No (only meaningful for `children`) |
| **Example** | `Editions`, `Books`, `Employees` |
| **Default** | Plural of the target entity name |

Display name for the children section label in the detail panel.

#### `kind`

| | |
|---|---|
| **Type** | `string` (enum) |
| **Required** | Yes |
| **Possible values** | `lookup`, `navigation`, `children` |

The relationship kind. This is the key discriminator that drives all implementation decisions.

---

### `kind: lookup`

**UX Rules:** 3.5, 5.5

The FK field renders as a **combo-box** in editing/creating states.

| Property | Value |
|---|---|
| Combo-box model | Target entity records mapped to `{ value: id.toString(), caption: descriptionField }` |
| Combo-box value | Current FK ID as string (or `""` if unset) |
| Placeholder | `"Select [TargetEntity]..."` |
| Event | `change` → update FK ID from selected value |

See `angular-patterns.md` or `react-patterns.md` § Chameleon wiring for binding code.

### `kind: navigation`

**UX Rules:** 3.4, 9.1

The FK field renders as a **navigation link** (`fk-link` button) in viewing state. Clicking it switches the active tab to the target entity with the referenced record selected. The button text is resolved via `getTargetDisplayName(fkId)`.

Requires `NavigationService` (Angular) or `NavigationContext` (React). See the framework patterns file for binding code.

### `kind: children`

**UX Rules:** 4.1, 4.2, 4.3, 4.4

The parent entity's detail panel includes a **children section** showing a table of related records from the target entity.

| Element | Detail |
|---|---|
| Section position | Bottom of detail panel, after all fields, separated by a divider |
| Section title | `relationship.name` (or plural of target entity), small/muted/uppercase |
| Empty state | Muted message: "No [name] found for this [entity]." |
| Table columns | Key fields of the child entity (typically description field + 2-3 others) |
| Description field column | Rendered as `fk-link` button — navigates to the child entity's tab with that record selected |
| Other columns | Plain text (not clickable) |
| Query method | `getChildrenByParent(parentId)` — filters children by the `targetField` FK |

Requires `NavigationService` (Angular) or `NavigationContext` (React). See the framework patterns file for template code.

---

## `embeddedItems` Array

Sub-items that belong exclusively to a parent entity and have no standalone WW instance (e.g., invoice lines, order products). Items are created and deleted as part of the parent, never independently. See UX rules 10.x.

| | |
|---|---|
| **Type** | `array` of embedded item objects |
| **Required** | No |
| **UX Rules** | 10.1–10.5 |

### Embedded Item Object Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Display label for the items section (e.g., `"Lines"`, `"Products"`) |
| `fields` | `string[]` | Yes | Fields on each item (excluding the parent FK — that's implicit) |
| `referenceField` | `string` | No | FK field on the item that points to a reference entity (for the combo-box selector in the add-item row). If absent, the add-item row uses plain inputs only. |
| `referenceTarget` | `string` | No | Entity that `referenceField` points to. Required when `referenceField` is set. |
| `columns` | `string[]` | No | Columns to display in the items table. Defaults to all `fields`. |
| `totalField` | `string` | No | Field name to sum for a total row (e.g., `"subtotal"`). If absent, no total row is rendered. |

### Example

```yaml
entity: Invoice
embeddedItems:
  - name: Lines
    fields: [productId, quantity, unitPrice, subtotal]
    referenceField: productId
    referenceTarget: Product
    columns: [productId, quantity, unitPrice, subtotal]
    totalField: subtotal
```

### Inference when absent

No embedded items section is rendered. If a user describes sub-items that have no independent WW instance, infer an `embeddedItems` entry from the field definitions.

---

## Common FK Field Patterns

A single FK field (e.g., `authorId` on Book) typically generates **two** relationship entries:

```yaml
relationships:
  - field: authorId
    target: Author
    kind: navigation    # detail viewing → fk-link
  - field: authorId
    target: Author
    kind: lookup        # detail editing → combo-box
```

This dual-entry pattern ensures the field behaves correctly in both viewing (navigation link) and editing (combo-box) states.

---

## Complete Example

```yaml
entity: BookEdition
views: [list, detail, create, edit, delete]
ui:
  descriptionField: isbn
  list:
    columns: [isbn, year, format]
  detail:
    sections:
      - fields: [isbn, year, bookId, publisherId, format]
relationships:
  - field: bookId
    target: Book
    kind: navigation
  - field: bookId
    target: Book
    kind: lookup
  - field: publisherId
    target: Publisher
    kind: navigation
  - field: publisherId
    target: Publisher
    kind: lookup
```

This spec produces:

- A tab labeled "Editions" with id `book-editions`
- Grid columns: ID, ISBN (fk-link to open detail), Year, Format, Actions
- Detail surface showing ISBN, Year, Book (fk-link in viewing / combo-box in editing), Publisher (fk-link / combo-box), Format
- `getBookEditionDisplayName(id)` returns the `isbn` field value
- Delete confirmation: "Are you sure you want to delete **{isbn}**?"
