# WW-Config Definition

Complete reference for the Work With Configuration YAML schema (`ww-config.yaml`). This file defines **global** settings that apply across all entities in a WW application.

---

## Table of Contents

1. [Schema Overview](#schema-overview)
2. [`viewModes`](#viewmodes)
3. [`defaultViewMode`](#defaultviewmode)
4. [`captions`](#captions)
5. [File Location](#file-location)
6. [Inference Rules (When No WW-Config Exists)](#inference-rules-when-no-ww-config-exists)
7. [Complete Example](#complete-example)

---

## Schema Overview

```yaml
viewModes: [bottom, side, dialog]   # optional
defaultViewMode: bottom             # optional
captions:                           # optional
  create: New                       # optional — toolbar button prefix
  edit: ✎                           # optional — detail header edit button & row action
  save: Save                        # optional — detail header save button & dialog footer
  cancel: Cancel                    # optional — detail header cancel button & dialog footer
  delete: Delete                    # optional — delete confirmation button
```

---

## `viewModes`

| | |
|---|---|
| **Type** | `string[]` |
| **Required** | No |
| **Possible values** | Subset of `['bottom', 'side', 'dialog']` |
| **Default** | `['bottom', 'side', 'dialog']` (all three) |
| **UX Rules** | 11a, 11b, 11c, 11d |

Controls which detail presentation modes are available **globally** across all entity tabs. See `ww-ux-rules.md` §11a for mode definitions and layout behavior.

The view switcher in the app heading bar only renders buttons for enabled modes. If only one mode is enabled, the switcher can be hidden.

**Implementation:**
- The `ViewSwitcher` component (React) or view switcher template (Angular) in `App` filters its buttons to only show enabled modes.
- Pass enabled modes via a shared constant or context value derived from `ww-config.yaml`.

---

## `defaultViewMode`

| | |
|---|---|
| **Type** | `string` |
| **Required** | No |
| **Possible values** | `'bottom'`, `'side'`, `'dialog'` |
| **Default** | `'bottom'` |
| **UX Rules** | 11a |

The view mode active on initial load. Must be one of the enabled `viewModes`.

**Implementation:**
- React: Initial value of `detailView` state in `NavigationContext`
- Angular: Initial value of `detailView` property in `NavigationService`

---

## `captions`

| | |
|---|---|
| **Type** | `object` |
| **Required** | No |
| **Default** | See individual fields below |

Customizes the text labels for the standard WW action buttons. All captions are **global** — they apply consistently across every entity in the application.

| Caption | Type | Default | Used in |
|---|---|---|---|
| `create` | `string` | `"New"` | Toolbar button (`"{create} {EntityName}"`), detail header (creating state), dialog caption (creating state) |
| `edit` | `string` | `"✎"` | Detail header button (viewing state), grid inline row action |
| `save` | `string` | `"Save"` | Detail header button (editing/creating state), dialog footer (editing/creating state) |
| `cancel` | `string` | `"Cancel"` | Detail header button (editing/creating state), dialog footer, delete confirmation dialog |
| `delete` | `string` | `"Delete"` | Delete confirmation dialog button (destructive style), delete dialog caption (`"{delete} {EntityName}"`) |

---

## File Location

The `ww-config.yaml` file lives alongside the per-entity WW-Spec YAML files:

```
ww-spec/
  ww-config.yaml        # global WW settings
  author.yaml            # per-entity WW-Spec
  book.yaml
  book-edition.yaml
```

When no `ww-spec/` directory exists, the builder uses defaults (see inference rules below).

---

## Inference Rules (When No WW-Config Exists)

| Field | Inference rule |
|---|---|
| `viewModes` | All three enabled: `['bottom', 'side', 'dialog']` |
| `defaultViewMode` | `'bottom'` |
| `captions.create` | `"New"` |
| `captions.edit` | `"✎"` |
| `captions.save` | `"Save"` |
| `captions.cancel` | `"Cancel"` |
| `captions.delete` | `"Delete"` |

---

## Complete Example

A config that restricts to two view modes with side-by-side as default, and customizes captions:

```yaml
viewModes: [side, dialog]
defaultViewMode: side
captions:
  create: Add
  edit: Edit
  save: Confirm
  cancel: Back
  delete: Remove
```

This config produces:
- Only Side by Side and Dialog buttons in the view switcher (Top-Bottom is excluded)
- Side by Side as the active mode on initial load
- Toolbar buttons read "Add Author", "Add Book", etc.
- Detail header shows "Edit" text button (instead of ✎), "Confirm" and "Back" buttons
- Delete confirmation dialog caption reads "Remove Author" with a "Remove" danger button
