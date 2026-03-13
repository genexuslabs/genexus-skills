---
name: ww-builder
description: Builds a complete Work With (WW) pattern — master-detail CRUD — for one or more entities using Angular or React + Chameleon web components. Use this skill whenever the user asks to implement, build, generate, or scaffold a Work With, a master-detail interface, a CRUD, or an entity browser. Also triggers when the user provides entity definitions, a WW-Spec YAML, or wants a UI built from a data model. Composes with design-system-builder to scaffold a DS if none exists. Always use this skill when the task involves multiple entities with relationships and a CRUD-style interface.
metadata:
  version: "0.1.0"
  dependencies: "skill:chameleon-controls-library@~0.1.0, skill:design-system-builder@~0.1.0"
---

# WW Builder

Produces a complete Work With implementation: one master-detail CRUD instance per entity, all UX rules enforced, with FK navigation and cross-entity selection preservation.

Supports **Angular** (standalone components) and **React** (functional components + hooks).

The UX rules are in `references/ww-ux-rules.md` (bundled, framework-agnostic).
Framework-specific patterns:
- **Angular**: `references/angular-patterns.md`
- **React**: `references/react-patterns.md`

---

## Workflow

### Step 1 — Assess context

Determine before writing any code:

1. **Framework** — Is the project Angular or React? Check for `angular.json` / `package.json` dependencies. If ambiguous or greenfield, ask the user.
2. **Entities** — What entities are in scope? What fields does each have? Which fields are FKs?
3. **WW-Specs** — Is there a `ww-spec/` directory or YAML files for these entities? Load them if present.
4. **WW-Config** — Is there a `ww-spec/ww-config.yaml`? Load it for global settings (view modes, default view mode). If absent, use defaults.
5. **Design System** — Does `design-system/` exist with CSS files? Is it wired in `angular.json` (Angular) or served from `public/ds/` (React)?

If the user hasn't provided entity definitions, ask for them before proceeding.
If the framework cannot be determined, ask before proceeding.

---

### Step 2 — Design System

**If a DS exists**: verify it has the required components and utilities listed below. Add any missing ones via `/design-system-builder`.

**If no DS exists**: invoke `/design-system-builder` to scaffold a complete DS. Required scope:

| Category | Components needed |
|---|---|
| Components | `button`, `dialog`, `edit`, `combo-box`, `tabular-grid`, `tab` |
| Utilities | `layout`, `form` |
| Scope | `light`, `dark` |

**`::part()` validation gate** — Whether the DS is built via `/design-system-builder` or written inline during this step, every `::part()` selector in the generated component CSS **must** use verified part names from the chameleon-controls-library skill's per-component `styling.md`. Ready-to-use DS CSS templates for `ch-tab-render`, `ch-dialog`, `ch-edit`, and `ch-combo-box-render` are in `references/ds-css-templates.md`. Invalid `::part()` selectors fail silently (no error, no warning — just dead CSS), so never guess or write parts from memory.

Do not proceed to Step 3 until the DS is in place.

---

### Step 3 — Derive WW-Specs

For each entity, build a working WW-Spec even if no YAML file exists. This spec drives all implementation decisions.

**If a WW-Spec YAML exists** (see `references/ww-spec-definition.md` for schema):

```
workWith.views           -> which CRUD views to implement
ui.list.columns          -> N3 list columns (rule 3.X1)
ui.detail.sections       -> N3 detail fields (rule 3.X2 / 3.X3)
relationships[].kind     -> which N2 rules activate per field/collection
```

The `kind` field is the key discriminator — see `references/ww-spec-definition.md` § `kind` for the full mapping to UX rules and implementation details.

**If no WW-Spec exists**, infer from field definitions:
- **Description field**: If `ui.descriptionField` is set in the spec, use it. Otherwise, infer from the first non-FK string field (prefer `name` > `title` > first string column). See `references/ww-spec-definition.md` § `ui.descriptionField` for the full list of where this field is used.
- Fields ending in `Id` that map to another entity -> `navigation` (in detail) + `lookup` (in forms)
- One-to-many collections on a parent entity -> `children` on the parent; the child already has `navigation` via its FK
- Produce a brief written spec summary before coding so the user can validate your inference

**L3 rule schema** — the inferred or explicit spec produces per-entity rules in this form:

- **E.1** — The [Entity] list shows: [columns].
- **E.2** — The [Entity] detail surface shows (viewing): [fields]. FK fields are marked as `navigation`.
- **E.3** — The [Entity] detail surface shows (editing/creating): [fields]. FK fields are marked as `lookup`.
- **E.4** — The [Entity] detail includes a "[relationship]" children section with columns: [columns]. Empty state: "[message]".

---

### Step 4 — Plan

Before writing code, write a brief plan covering:
- Framework (Angular or React)
- Entity list and their WW instances (tab id, display name)
- For each entity: list columns, detail fields, form fields, relationships
- Services needed: DataService/DataContext (always), NavigationService/NavigationContext (always — holds the global `detailView` mode; also required for FK navigation and children relationships)
- Detail view modes: which modes are enabled and which is the default (all three enabled with `bottom` default unless overridden by `ww-config.yaml`)

Confirm with the user if any inference was non-obvious.

---

### Step 5 — Implement

Generate the application enforcing all rules from `references/ww-ux-rules.md`.

**Reading order** — before writing any component code, read these references in order:

1. `references/chameleon-details.md` — non-obvious Chameleon structural requirements and gotchas (framework-agnostic)
2. `references/ds-css-templates.md` — DS component CSS templates for WW components (tab, dialog, edit, combo-box, grid)
3. Framework patterns (choose one):
   - **Angular**: `references/angular-patterns.md`
   - **React**: `references/react-patterns.md`

The framework patterns file is the single implementation reference — it covers project setup, services, component templates, Chameleon wiring, view modes, and embedded collections. `chameleon-details.md` provides the rationale and constraints that the framework patterns build on.

If you need Chameleon component APIs beyond what `chameleon-details.md` covers (e.g., components not used in the standard WW pattern), invoke the **chameleon-controls-library** skill.

#### Applying N3 rules

N3 comes entirely from the WW-Spec (or inferred spec):
- List columns: `ui.list.columns` fields
- Detail fields: `ui.detail.sections` fields (FK fields rendered as fk-link buttons, rule 3.5)
- Form fields: same fields as detail but FK fields become combo-boxes (rule 5.5)
- Children section label and columns: from `children` relationship name and target entity fields

#### Services

See the framework patterns file for full implementation templates of both services (`DataService`/`DataContext` and `NavigationService`/`NavigationContext`). Step 4 determines which services are needed.

---

### Step 6 — Audit

After implementation, walk through every `### Audit` subsection in `references/ww-ux-rules.md` and verify each check against the generated output. **Do not declare done until every check passes.** If a check fails, fix the issue and re-audit that section.

---

## File structure

### Angular

```
src/
  main.ts                       defineCustomElements + bootstrapApplication
  index.html                    DS base/base.css + scope/dark.css via <link>
  app/
    app.ts                      ch-tab-render, NavigationService
    app.html
    app.css
    app.config.ts
    models.ts                   All entity interfaces
    data.service.ts             All mock data + CRUD + FK helpers
    navigation.service.ts       (if needed)
    ds-loader.service.ts        Lazy DS CSS injection
    <entity>/
      <entity>.component.ts
      <entity>.component.html   grid + detail + CRUD dialogs
      <entity>.component.css    fk-link, related-section, related-table, items-table
```

### React

```
src/
  main.tsx                      defineCustomElements + createRoot
  index.html                    DS base/base.css + scope/dark.css via <link>
  custom-elements.d.ts          JSX typings for ch-* elements
  App.tsx                       ch-tab-render, providers
  App.css
  models.ts                     All entity interfaces
  DataContext.tsx                All mock data + CRUD + FK helpers (Context + hook)
  NavigationContext.tsx          (if needed) Cross-tab navigation (Context + hook)
  hooks/
    useDsLoader.ts              Lazy DS CSS injection
    useChInterop.ts             useChProps + useChEvent utilities
  components/
    <Entity>/
      <Entity>.tsx              grid + detail + CRUD dialogs
      <Entity>.css              fk-link, related-section, related-table, items-table
```

---

## Key decisions

**DS CSS loading**: Component CSS is loaded lazily per component. See the framework patterns files for `DsLoaderService` (Angular) / `useDsLoader` (React).

**Detail view modes**: See UX rules 11.x and `references/ww-config-definition.md`.

**Unified detail surface**: See UX rules 3.x and 5.x. The delete confirmation remains a separate dialog (rule 7.x).

**Embedded item collections**: Sub-items that are not standalone entities (no WW instance). Distinct from `children` relationships. See the framework patterns files for the full template.

---

## References

- `references/ww-spec-definition.md` — **WW-Spec schema reference** — complete definition of every per-entity YAML field, its type, possible values, effect on implementation, and default behavior
- `references/ww-config-definition.md` — **WW-Config schema reference** — global WW settings (`viewModes`, `defaultViewMode`)
- `references/ww-ux-rules.md` — Full UX rule set (N1, N2, N3 + gaps) — framework-agnostic
- `references/angular-patterns.md` — Angular + Chameleon implementation patterns, DS setup, embedded collections
- `references/react-patterns.md` — React + Chameleon implementation patterns, hooks, contexts, embedded collections
- `references/chameleon-details.md` — **Read before writing templates** — single source of truth for non-obvious Chameleon requirements: grid slot structure, height chains, row highlight, inline row actions, column-name attribute, ch-edit events, dialog state management, combo-box model shape
- `references/ds-css-templates.md` — DS component CSS templates for WW components (tab, dialog, edit, combo-box, grid)
