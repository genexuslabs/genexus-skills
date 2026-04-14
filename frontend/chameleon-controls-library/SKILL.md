---
name: chameleon-controls-library
description: "Builds UIs with Chameleon web components (ch-*). Use when the user mentions Chameleon, ch- components, or needs enterprise UI patterns like grids, trees, chat, sidebars, accordions, combos, tabs, dialogs, or forms. Also use for: implementing a UI from Figma or images, vibe coding a UI, migrating an existing UI to Chameleon, or auditing Chameleon usage in an application."
metadata:
  version: "0.3.0"
---

# Chameleon Controls Library

Build UIs with Chameleon web components. This skill covers component selection, structure, wiring, usage, and styling of individual components. For Design System-level patterns (tokens, class naming, theme architecture), use the **design-system-builder** skill

## Workflow

The workflow is a sequence of phases. Depending on the task, you can enter at any phase, skip phases that don't apply, and jump back to earlier phases to fix issues. Phases A and B always run in parallel at the start

```
┌─────────────────────────────────────────────────────────────┐
│                     [Entry Point]                           │
│                          │                                  │
│            ┌─────────────┼─────────────┐                    │
│            ▼                           ▼                    │
│    A: Gain Context              B: Installation             │
│            └─────────────┬─────────────┘                    │
│                          ▼                                  │
│               C: Understand the UI                          │
│           ┌──────┬───────┬───────┬──────┐                   │
│          C1     C2      C3      C4     C5                   │
│        Figma  Image   Text  Migration  Audit─────┐          │
│           └──────┴───────┴───────┘               │          │
│                          │                       │          │
│                          ▼                       │          │
│              D: Component Selection              │          │
│                          │                       │          │
│                          ▼                       │          │
│           E: Understand Component APIs           │          │
│                          │                       │          │
│                          ▼                       │          │
│              F: Styling Strategy                 │          │
│                          │                       │          │
│                          ▼                       │          │
│            G: Code Implementation                │          │
│                          │                       │          │
│                          ▼                       │          │
│                  H: Audit ◄──────────────────────┘          │
│                    │   ▲                                    │
│                    │   │ fix issues                         │
│                    │   └──────┘                             │
│                    ▼                                        │
│                  [Done]                                     │
└─────────────────────────────────────────────────────────────┘
```

---

### Phase A — Gain Context (parallel with B)

Detect before writing any code:

1. **Framework** — What framework is the project using? (e.g., Angular, React, Stencil, vanilla JS/TS, Lit/Kasstor, etc.)
2. **Existing code** — What components, structure, and patterns are already in place?
3. **Design System** — Is there a DS built on Chameleon? Check for `ch-theme`, `getBundles`, DS CSS files

This is observational — no reference files needed

---

### Phase B — Installation Check (parallel with A)

**Read** [Installation guide](references/installation/README.md). Verify Chameleon is installed and configured for the detected framework. If not installed, follow the guide

Do not proceed to Phase C until installation is confirmed

---

### Phase C — Understand the UI

Choose the sub-entry that matches the task. All sub-entries converge on the same output: a semantic understanding of each UI element — what it is, how it's used, how keyboard users reach it, and how elements interact

#### C1: From Figma

Analyze Figma frames. Identify visual elements and their semantic roles (navigation, data entry, data display, action triggers, feedback, etc.)

#### C2: From an image

Analyze the visual. Map each visible element to its semantic purpose. Identify layout structure, component boundaries, and interactive elements

#### C3: From text, audio, or description

Parse the user's description. Identify the UI elements described, their relationships, and the interactions expected

#### C4: Migration from existing UI

Analyze the current implementation. Map existing HTML elements and third-party components to Chameleon equivalents. Identify what can be replaced 1:1 and what requires restructuring

#### C5: Audit only

Skip directly to [Phase H](#phase-h--audit)

---

### Phase D — Component Selection

**Read** [Components index](references/components-index.md). For every UI element identified in Phase C, look up the matching component:

1. Read its "When to use" and "When NOT to use" columns
2. **Never pick a component from memory** — always verify against the index
3. If a native HTML element (`<select>`, `<input>`, etc.) is chosen instead of a Chameleon component, **state the explicit reason** before proceeding

**When a component does not exist in Chameleon:**

- Chameleon does not wrap `<button>` or `<a>` — use native HTML elements for buttons and links. When a Design System is active, apply its CSS classes
- For more complex missing components, compose from existing Chameleon components and/or build a custom component using the **kasstor** skill (if available) for cross-framework web components

**Icons and images:**

- **Read** [Icons & Images guide](references/icons-and-images.md) to choose the right technique: semantic (`<img>` with `alt`) vs decorative (CSS, `ch-image`), `mask-image` for themeable icons, `startImgSrc`/`endImgSrc` for component item models
- For global icon resolution, **Read** [Registry](references/registry.md) to register `getImagePathCallback` once instead of per-instance

---

### Phase E — Understand Component APIs

For each selected component, **Read** its documentation in order:

1. `references/components/{component}/README.md` — Properties, events, methods, slots, dependencies
2. `references/components/{component}/usage.md` — Usage examples, patterns, do's and don'ts

For TypeScript types used in properties and events, consult the [Types index](references/types-index.md)

---

### Phase F — Styling Strategy

Follow this decision tree to determine how to style each component:

```
Has a Design System built on Chameleon?
├─ YES → Check the DS component guide for this component
│        ├─ Guide exists → Use it (DS handles classes, tokens, ::part())
│        └─ Guide missing → Is design-system-builder skill available?
│             ├─ YES → Use it to create the component's DS styles
│             └─ NO  → Read the component's styling.md (see below)
│
└─ NO → Is design-system-builder skill available?
      ├─ YES → Use it to scaffold a Design System
      └─ NO  → Read the component's styling.md (see below)
```

**When using component styling directly:**

- **Read** `references/components/{component}/styling.md` — Shadow parts, CSS custom properties, shadow DOM layout, styling recipes, anti-patterns
- **Read** [CSS Shadow Parts Guide](references/css-shadow-parts-guide.md) — General `::part()` rules, state parts pattern, `exportparts`, limitations
- To understand the shadow DOM layout diagrams, consult [Layout Syntax](references/layout-syntax.md)

---

### Phase G — Code Implementation

Build the UI with Chameleon components (`ch-*`), applying the properties, events, styles, icons, and patterns determined in prior phases

- Use `<button>` and `<a>` for buttons and links — Chameleon does not wrap these
- Follow the **frontend-best-practices** skill if active

---

### Phase H — Audit

Verify the implementation against this checklist. This phase is also the direct entry point from C5 (audit-only mode)

1. **Tags exist** — Every `ch-*` tag used exists in the library (cross-reference [Components index](references/components-index.md))
2. **No invented APIs** — All properties, events, and methods used are documented in the component's `README.md`. No guessed or assumed API names
3. **Valid slots** — All slot names used are valid according to the component docs and the context of use
4. **Valid styles** — All `::part()` selectors reference parts that exist in the component's `styling.md`. All CSS custom properties used are documented. If a DS is active, verify classes match the DS documentation
5. **Best practices** — The implementation follows [Accessibility](references/best-practices/accessibility.md), [Performance](references/best-practices/performance.md), and [SEO](references/best-practices/seo.md) guidelines. The **frontend-best-practices** skill was consulted for general code quality
6. **No anti-patterns** — The implementation does not violate any "When NOT to use", "Do not use when", or anti-patterns listed in the component's `usage.md` and `styling.md`
7. **Fix and re-audit** — If any check fails, fix the issue (returning to phases D-G as needed) and re-audit until all checks pass

---

## Component catalog

Chameleon provides **58 components** across 11 categories. It intentionally does not wrap every HTML element — buttons (`<button>`) and links (`<a>`) use native HTML with Design System CSS classes

For the complete catalog with descriptions, use cases, and anti-patterns for every component, consult the [Components index](references/components-index.md)

**Categories at a glance:**

| Category           | Count | Key components                                                                                                                                                                                        |
| ------------------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout             | 4     | `ch-theme`, `ch-flexible-layout-render`, `ch-layout-splitter`, `ch-sidebar`                                                                                                                           |
| Forms              | 9     | `ch-edit`, `ch-checkbox`, `ch-combo-box-render`, `ch-radio-group-render`, `ch-slider`, `ch-switch`, `ch-color-picker`, `ch-color-field`, `ch-rating`                                                  |
| Data Display       | 8     | `ch-accordion-render`, `ch-action-list-render`, `ch-action-menu-render`, `ch-tree-view-render`, `ch-tab-render`, `ch-segmented-control-render`, `ch-navigation-list-render`, `ch-action-group-render` |
| Overlays           | 3     | `ch-dialog`, `ch-tooltip`, `ch-popover`                                                                                                                                                               |
| Content            | 5     | `ch-markdown-viewer`, `ch-code`, `ch-math-viewer`, `ch-image`, `ch-textblock`                                                                                                                         |
| Grid / Tabular     | 18    | `ch-tabular-grid` + 14 subcomponents, `ch-smart-grid`, `ch-virtual-scroller`, `ch-tabular-grid-render`                                                                                                |
| Editors            | 2     | `ch-code-editor`, `ch-code-diff-editor`                                                                                                                                                               |
| Feedback & Loading | 2     | `ch-progress`, `ch-status`                                                                                                                                                                            |
| Chat & Real-time   | 2     | `ch-chat`, `ch-live-kit-room`                                                                                                                                                                         |
| Pagination         | 1     | `ch-paginator-render`                                                                                                                                                                                 |
| Utilities          | 4     | `ch-qr`, `ch-barcode-scanner`, `ch-intersection-observer`, `ch-shortcuts`                                                                                                                             |

## Best practices

- **Accessibility:** Prefer visible `<label>` elements linked via `for`/`id` over the `accessible-name` property — labels are visible and provide better UX. Chameleon form components support `ElementInternals`, so a `<label for="X">` with a matching `id="X"` on the component works natively. Use `accessible-name` only when a visible label is not possible (e.g., icon-only controls). Use `close-button-accessible-name` on dialogs. See [Accessibility](references/best-practices/accessibility.md)
- **Performance:** Use virtualization for long lists (`ch-virtual-scroller`, `ch-tabular-grid-virtual-scroller`). Lazy-load heavy components (`ch-code-editor`, `ch-code-diff-editor`, `ch-math-viewer`, `ch-chat`). See [Performance](references/best-practices/performance.md)
- **SEO:** Keep critical content in static HTML. Use semantic elements. See [SEO](references/best-practices/seo.md)

## Critical rules

- **Never pick components from memory** — always consult [Components index](references/components-index.md)
- **Native HTML over Chameleon requires a stated reason** — if `<select>`, `<input>`, or another native element is chosen instead of a Chameleon component, explain why before proceeding
- **`ch-theme` is always hidden** — never place children inside it. Use it as a sibling element
- **Use `<button>` and `<a>` for buttons and links** — Chameleon intentionally does not wrap these elements
- **Read component docs before writing code** — never assume API shapes. Properties, events, slots, and parts must be verified

## Installation

Framework-specific setup:

- [Installation index](references/installation/README.md) — React (Vite), Angular, Stencil, script tag

## References

| Topic                    | Reference                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| Components catalog       | [references/components-index.md](references/components-index.md)                         |
| Icons & Images           | [references/icons-and-images.md](references/icons-and-images.md)                         |
| Registry Property System | [references/registry.md](references/registry.md)                                         |
| Types index              | [references/types-index.md](references/types-index.md)                                   |
| CSS Shadow Parts Guide   | [references/css-shadow-parts-guide.md](references/css-shadow-parts-guide.md)             |
| Shadow DOM Layout Syntax | [references/layout-syntax.md](references/layout-syntax.md)                               |
| Accessibility            | [references/best-practices/accessibility.md](references/best-practices/accessibility.md) |
| Performance              | [references/best-practices/performance.md](references/best-practices/performance.md)     |
| SEO                      | [references/best-practices/seo.md](references/best-practices/seo.md)                     |
| Examples                 | [references/examples.md](references/examples.md)                                         |
| Installation             | [references/installation/README.md](references/installation/README.md)                   |
