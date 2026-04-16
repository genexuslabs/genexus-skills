---
name: design-system-builder
description: "Builds and evolves enterprise-quality CSS Design Systems based on Chameleon web components. Use when the user wants to create, scaffold, or evolve a DS, add components/tokens/themes. Triggers on: 'design system', 'DS', 'design tokens', 'theme system', 'build a DS', 'scaffold DS', 'create design system'."
metadata:
  version: "0.3.0"
  dependencies: "skill:chameleon-controls-library@~0.3.0"
---

# Design System Builder

Build and evolve enterprise-quality CSS Design Systems on top of Chameleon web components

## Scope & Relationship

- **Chameleon** provides the functional layer: web components (`ch-edit`, `ch-dialog`, `ch-accordion-render`, etc.) with structure, behavior, and interactivity
- **The Design System (DS)** provides the visual layer: design tokens, CSS, documentation, and processes that define how every component looks for a given brand
- The DS **does not** implement components. It skins Chameleon components through CSS classes, CSS custom properties, `::part()` selectors, and slotted-content styling

Component-specific styling information — shadow parts, CSS custom properties, and shadow DOM layout — is maintained by the **chameleon-controls-library** skill. This skill provides the DS-level patterns for applying those styling APIs within a design system context

```
┌──────────────────────────────────────────────────────┐
│                   Application                        │
├──────────────────────────────────────────────────────┤
│       Design System (CSS + Tokens + Docs)            │
├──────────────────────────────────────────────────────┤
│          Chameleon (Web Components)                   │
├──────────────────────────────────────────────────────┤
│              Browser Platform                         │
└──────────────────────────────────────────────────────┘
```

## Workflow

> **CRITICAL — Chameleon skill required:** Before writing any component CSS example or documentation, you **MUST** invoke the **chameleon-controls-library** skill (via the `Skill` tool). The DS handles styling only (CSS bundles, classes, tokens) — component APIs (properties, events, slots, model shapes) are documented exclusively in the Chameleon skill. Skipping it leads to wrong prop names, missing events, and broken component wiring

Follow these steps **in order**. Never skip steps. Ask the user when in doubt

### Phase 1 — Gather Requirements

Before building anything, ask the user:

1. **DS name** — What should the design system be called? (e.g., "acme-ds")
2. **Target directory** — Where should the DS be created? If the user doesn't specify, ask explicitly: "In which directory should I create the design system?"
3. **Brands** — How many brands? What are their names? (minimum 1)
4. **Components needed** — Which components does the DS need? Use the Component Selection Guide below
5. **Color palette** — What are the primary, secondary, and neutral colors? Any feedback colors (error/success/warning)?
6. **Typography** — What font families? (primary, secondary/monospace)
7. **Spacing grid** — 4pt grid (default) or 8pt grid?
8. **Icon library** — Material Symbols (default), custom SVG, or other?
9. **Dark mode** — Does the DS need dark mode support?
10. **Accessibility level** — WCAG AA (default) or AAA?

If the user says **"basta"** (or equivalent like "that's enough", "just build it", "go ahead"), stop asking questions and proceed with reasonable defaults for anything not yet discussed

**Defaults when not specified:**

- Brands: 1 brand matching the DS name
- Dark mode: yes (light + dark)
- Accessibility: WCAG 2.1/2.2 Level AA
- Components: button, edit, dialog, accordion, checkbox, switch, tabs
- Colors: neutral gray palette with blue primary
- Typography: system font stack

### Phase 2 — Present Plan

Before writing any files, present the user with a summary:

- DS name and target directory
- List of brands and themes (light/dark per brand)
- Components to be built
- Token strategy (3-tier DTCG)
- Estimated file count

Wait for user approval before proceeding

### Phase 3 — Scaffold

Use the scaffold script to create the initial DS structure:

```bash
node <path-to-skill>/scripts/scaffold.mjs --name <ds-name> --dir <target-dir> --brands <brand1,brand2>
```

If the script is not available or fails, create the structure manually following the [Directory Structure Reference](references/directory-structure.md)

### Phase 4 — Build Incrementally

Build the DS layer by layer, **always in this order** (ITCSS):

1. **Tokens** — Define the 3-tier token architecture. See [Tokens Reference](references/tokens.md)
2. **Design Foundations** — Define the color system (4 token categories by CSS property, interaction states, elevation), typography system (4 roles, class naming), spacing system (grid base, padding/gap tokens), and icons system (size tokens, classes, icon implementation patterns, and global icon resolver registration). Follow the [Design Foundations](references/design-foundations/) references
3. **Resets** — box-sizing reset (usually already scaffolded)
4. **Base** — Generate `base.css` using the `generate-base.mjs` script. See below for the two workflows (with/without Figma input)
5. **Scope** — Tier 2 semantic tokens per brand/theme. See [Theming Reference](references/theming.md)
6. **Chameleon overrides** — scrollbar styling and web component-level overrides
7. **Utilities** — spacing, typography, elevation, layout, form, link. See [Performance Reference](references/performance.md) for loading strategy
8. **Components** — One CSS + one MD per component. See [Component CSS Reference](references/component-css.md)

After each layer, update the architecture diagram (generate a `architecture.md` Mermaid diagram in the DS root)

#### Base Layer — `generate-base.mjs`

The `base.css` file is generated by a script, not written by hand. This ensures token fidelity and prevents prefix/naming errors

```bash
node <path-to-skill>/scripts/generate-base.mjs --input <tokens.json> --output <ds-root>/base/base.css
```

**Path A — User provides Figma input:**

1. Read Figma frames via MCP (`get_variable_defs` and/or `get_design_context`)
2. Build a normalized token JSON from the extracted Figma data (see `generate-base.mjs` for the input schema)
3. Save as `<ds-root>/tokens/<ds-name>-base-input.json`
4. Run `generate-base.mjs` to produce `base.css`
5. Review output, complement with any missing semantic tokens (spacing, border-radius) if needed

**Path B — No Figma input:**

1. Ask the user for: color palette, font families, spacing grid preference, border-radius scale
2. Build the normalized token JSON from answers + sensible defaults
3. Save and run `generate-base.mjs`

The script enforces: no DS-name prefix, no em/rem, semantic spacing names, standard body resets

### Phase 4b — Audit

After building CSS and/or documentation, audit all output against these rules before proceeding:

1. **`::part()` validity** — Every `::part()` selector must reference a part that exists in the component's `styling.md` file (consult the **chameleon-controls-library** skill). No invented parts
2. **No `::part()` combinators** — After `::part()`, no sibling (`~`), child (`>`), or descendant (` `) combinators are allowed. `::part()` is terminal for combinators per the CSS spec. Each `::part()` must stand alone
3. **`::part()` pseudo-element limitations** — Only `::before`, `::after`, and `::placeholder` can follow `::part()`. Pseudo-elements like `::selection` and `::first-line` CANNOT be chained after `::part()`. Standard pseudo-classes (`:hover`, `:focus-visible`, `:disabled`) are always allowed
4. **`:disabled` over `[disabled]`** — Use the `:disabled` pseudo-class instead of the `[disabled]` attribute selector. Keep `[aria-disabled="true"]` as-is
5. **Chameleon API correctness** — All component examples in `.md` docs and showcase `.lit.ts` files must use verified Chameleon properties, events, and slots. Invoke the **chameleon-controls-library** skill to verify before writing examples. Common mistakes: `label` vs `caption` vs `accessibleName`, slot names, model shapes
6. **No DS-name prefix** — No class or token uses the DS brand name as prefix
7. **No component tag names in selectors** — CSS selectors never contain `ch-*` tag names

If any violation is found, fix it immediately before moving to the next phase

### Phase 5 — Documentation

For each component built, create co-located `.md` documentation. See [Documentation Reference](references/documentation.md)

### Phase 6 — Generate the DS Vibe-Code Skill

Every DS built with this skill MUST include an inner skill at `docs/` that enables AI agents (and developers) to **use** the DS for vibe coding. This skill follows the reference pattern defined in [Inner Skill Pattern](references/inner-skill-pattern.md) and must be generated/updated every time the DS evolves

The inner skill lives at `{ds-root}/docs/` and includes:

```
docs/
├── SKILL.md                            # Entry point — how to use this DS
├── references/
│   ├── component-bundles-table.md      # Component → bundle mapping table
│   ├── bundles-index.md                # Index of all bundles with links
│   ├── themes-and-variants.md          # Theme documentation
│   ├── design-foundations/             # Design language documentation
│   │   ├── color-system.md            # Color categories, states, elevation
│   │   ├── typography-system.md       # Roles, classes, line-heights
│   │   ├── spacing-system.md          # Grid, tokens, border-radius
│   │   ├── icons-system.md            # Sizes, classes, icon colors, resolver setup
│   │   ├── design-patterns.md         # Buttons, forms, typography hierarchy
│   │   └── figma-token-mapping.md     # Figma → token translation
│   ├── installation/
│   │   └── README.md                   # Framework-specific setup guides
│   └── bundles/
│       ├── components/
│       │   ├── button.md + button.css  # Co-located docs + implementation
│       │   ├── dialog.md + dialog.css
│       │   └── …
│       ├── utils/
│       ├── base/
│       ├── scope/
│       └── chameleon/
```

**Inner SKILL.md must include:**

1. **DS name, description, and architecture** — scope, relationship with Chameleon
2. **Workflow** — "Build with Chameleon → Style with this DS"
3. **`ch-theme` and `getBundles` usage** — how to load CSS bundles on-demand
4. **Which bundles to request** — link to component-bundles-table
5. **Bundle and class details** — link to bundles-index
6. **Dark/light mode** — how to switch themes
7. **Theme variants** — available brands and how to choose
8. **Installation** — per-framework setup (React, Angular, Vanilla/Lit)
9. **References** — links to all reference docs
10. **Figma integration notes** — if the user provided Figma links or design context, document them here
11. **Design decisions** — any important context the user shared during the DS creation process
12. **Icon system** — document the DS's icon resolver (`getImagePathCallback` registration), available icon keys, and how consumers reference icons in `ch-image` and component item models

See [Usage & Consumption Reference](references/usage-and-consumption.md) for the detailed `ch-theme`/`getBundles` patterns to document in the inner skill

**Rules for the inner skill:**

- Follow the reference inner skill pattern exactly (same SKILL.md structure, same reference organization)
- Every component CSS file in `components/` MUST have a corresponding `.md` in `docs/references/bundles/components/` documenting its classes, "Applies to", tokens consumed, and states
- The `component-bundles-table.md` must list every component and its required bundles
- The `bundles-index.md` must link to every bundle's `.md` and `.css`
- Update the inner skill every time a component, utility, or theme is added/modified

### Phase 6b — Showcase App

Generate a navigable showcase app so the DS can be browsed visually:

1. Run the scaffold-showcase script:

```bash
node <path-to-skill>/scripts/scaffold-showcase.mjs --ds-dir <ds-root> --ds-name <ds-name> --components <comp1,comp2>
```

2. The showcase is a Kasstor + Chameleon app styled with the DS itself via `ch-theme`/`getBundles`. It is the **first consumer** of the DS

3. **Temporary styles workflow**: Components not yet styled in the DS get temporary styles in `showcase/src/styles/showcase-overrides.scss`. Each block is marked with `TEMP: {component}` comments. When the DS adds the component's CSS file, the corresponding temporary block MUST be removed from the showcase

See [Showcase App Reference](references/showcase-app.md) for full details on structure, Kasstor patterns, and the temporary styles workflow

### Phase 7 — Validate

Check each component against the 10 acceptance criteria. See [Quality Gates Reference](references/quality-gates.md)

## Component Selection Guide

When the user requests a component, determine if it exists in Chameleon:

| Category         | Chameleon Components                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Forms**        | `ch-edit`, `ch-checkbox`, `ch-switch`, `ch-slider`, `ch-radio-group-render`, `ch-combo-box-render`, `ch-color-picker`, `ch-color-field` |
| **Layout**       | `ch-layout-splitter`, `ch-flexible-layout-render`, `ch-sidebar`, `ch-virtual-scroller`                                                  |
| **Data Display** | `ch-tabular-grid-render`, `ch-tree-view-render`, `ch-smart-grid`, `ch-paginator-render`                                                 |
| **Navigation**   | `ch-tab-render`, `ch-navigation-list-render`, `ch-action-list-render`, `ch-segmented-control-render`                                    |
| **Actions**      | `ch-action-group-render`, `ch-action-menu-render`                                                                                       |
| **Overlays**     | `ch-dialog`, `ch-popover`, `ch-tooltip`                                                                                                 |
| **Feedback**     | `ch-notifications`, `ch-next-progress-bar`, `ch-progress`, `ch-status`                                                                  |
| **Content**      | `ch-accordion-render`, `ch-markdown-viewer`, `ch-image`, `ch-code`, `ch-textblock`                                                      |
| **Media**        | `ch-barcode-scanner`, `ch-qr`, `ch-live-kit-room`                                                                                       |
| **Other**        | `ch-shortcuts`, `ch-intersection-observer`, `ch-rating`, `ch-chat`                                                                      |

**If the component exists in Chameleon:** Create only the CSS styling (classes, tokens, `::part()` selectors) — never reimplement functionality

**If the component does NOT exist in Chameleon:** Inform the user and offer to implement it using Kasstor — a Lit-based library that builds cross-framework web components compatible with any stack (React, Angular, Vue, vanilla). Kasstor components integrate seamlessly with Chameleon and follow the same web component standards. Use the Kasstor skill (when available) for implementation guidance

## Evolving an Existing DS

When the user points to an existing DS directory:

1. Read the current state (scan directories, check token population, list components)
2. Present a summary of what exists
3. Ask what the user wants to add or change
4. Follow the same incremental build process (Phase 4+)

## Key Rules

- **Tokens first** — Every visual value goes through a token. Never hardcode colors, spacing, or fonts
- **Theme-unaware components** — Components never contain theme logic (no `.dark &` inside component CSS)
- **Pure CSS** — Zero runtime JS for styling
- **Selective loading** — Load only what the DOM needs (3-tier CSS loading strategy)
- **Accessibility by default** — WCAG compliant, never opt-in
- **Docs = Product** — Documentation has the same quality bar as code
- **Quality gates** — Automated, blocking, no exceptions
- **Logical properties** — Use `padding-block`, `inline-size`, etc. for RTL support
- **No `!important`** — Ever
- **Flat selectors** — No BEM. Pattern: `{component}-{variant}`
- **No em/rem** — Never use `em` or `rem` units. All sizing uses design tokens or px from the 4pt grid. Only exception: user explicitly requests em/rem. See [Spacing System](references/design-foundations/spacing-system.md)
- **Valid parts only** — NEVER write a `::part()` selector without first checking the component's `styling.md` (consult the **chameleon-controls-library** skill). Invalid parts silently fail and produce dead CSS
- **Token fidelity** — When a Figma token export exists, never invent tokens beyond what Figma defines. Only spacing tokens may be added if they follow the 4pt grid. When no Figma export exists, follow the naming conventions in the [Design Foundations](references/design-foundations/) references. See [Token Fidelity](references/tokens.md#figma-token-fidelity)
- **CSS optimization** — No redundant selectors, group shared properties with comma-separated selectors, no duplicate declarations. See [CSS Optimization](references/css-optimization.md)
- **No internet font search** — Never search the internet for font files under any circumstance. Free fonts: the user provides the files or they are downloaded from a known source (e.g., Google Fonts API) during scaffolding. Paid fonts: the user MUST provide the files. Fonts should be stored locally in the DS `fonts/` directory, partitioned by unicode-range subsets for optimal loading
- **No DS-name prefix on classes or tokens** — Classes use flat names like `button-primary`, `accordion-filled`. Tokens use semantic names like `--color-accent-primary-default`, `--spacing-padding-xl`. NEVER prefix with the DS name (e.g., ~~`nova-btn-primary`~~, ~~`--nova-green-300`~~). Primitive tokens in `base.css` may use a neutral color-scale naming (e.g., `--green-300`, `--neutral-950`) but never the DS brand name
- **Classes on the component, not wrapper divs** — Always apply CSS classes directly on the Chameleon host element: `<ch-edit class="input">`, NOT `<div class="input"><ch-edit></ch-edit></div>`. CSS selectors target the class on the host, and `::part()` selectors descend from that class. No wrapper-then-descendant selectors
- **No component tag names in CSS selectors** — NEVER write `.class ch-component::part(…)`. Always `.class::part(…)`. The class IS on the component host. CSS bundle files must NEVER contain Chameleon tag names in selectors
- **No abbreviated class names** — Write `button-icon-only`, not `btn-icon`. Full words for readability and discoverability
- **No assumed `data-*` attributes** — Don't assume elements use `data-*` attributes or `[data-icon]` selectors unless the user establishes this convention
- **Semantic spacing tokens only** — Use named tokens like `--spacing-padding-xs`, `--spacing-padding-s`, `--spacing-gap-m`. NEVER use numbered tokens like `--spacing-1`, `--spacing-2` unless they come directly from Figma or the user defines them. Numbers add no semantic meaning
- **No `::part()` combinators** — After `::part()`, you CANNOT use sibling (`~`), child (`>`), or descendant (` `) combinators to reach another part or element. Each `::part()` selector is terminal per the CSS spec. Example of INVALID CSS: `.checkbox::part(input):focus-visible ~ .checkbox::part(option)` — this silently fails. Instead, target the part directly: `.checkbox::part(option):focus-visible`
- **`:disabled` pseudo-class over `[disabled]`** — Always use `:disabled` instead of `[disabled]` attribute selector for disabled state styling. The pseudo-class is more robust and follows CSS best practices. Keep `[aria-disabled="true"]` as a companion selector for elements that don't support the `:disabled` pseudo-class
- **`::part()` pseudo-class and pseudo-element limitations** — Only standard pseudo-classes (`:hover`, `:active`, `:focus-visible`, `:disabled`, `:focus`, `:focus-within`) and pseudo-elements (`::before`, `::after`, `::placeholder`) can follow `::part()`. Pseudo-elements like `::selection` and `::first-line` CANNOT be chained after `::part()`. For state styling, use compound part selectors instead: `.class::part(input disabled)`
- **Chameleon handles its own resets** — Chameleon components apply internal CSS resets for `<button>` and `<a>` elements in their shadow DOM. NEVER write `cursor: pointer`, `border: none`, `appearance: none`, or `text-decoration: none` on `::part()` selectors that target these internal elements — it's redundant dead CSS
- **Part names ≠ HTML attributes** — A part named `disabled` does NOT mean the component has a `[disabled]` HTML attribute selector. Always prefer compound part selectors for state styling: `.class::part(header disabled)`, NOT `.class[disabled]::part(header)`. Consult the **chameleon-controls-library** skill's per-component `styling.md` files to understand which parts exist and how state parts combine with structural parts

## References

Consult these reference files for detailed guidance on each topic:

| Topic                                               | Reference                                                                                                |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Directory structure & layers                        | [references/directory-structure.md](references/directory-structure.md)                                   |
| Design tokens (3-tier DTCG)                         | [references/tokens.md](references/tokens.md)                                                             |
| Component CSS patterns                              | [references/component-css.md](references/component-css.md)                                               |
| Theming (multi-brand, dark/light)                   | [references/theming.md](references/theming.md)                                                           |
| Accessibility (WCAG AA)                             | [references/accessibility.md](references/accessibility.md)                                               |
| Performance & loading strategy                      | [references/performance.md](references/performance.md)                                                   |
| Documentation standards                             | [references/documentation.md](references/documentation.md)                                               |
| Quality gates & testing                             | [references/quality-gates.md](references/quality-gates.md)                                               |
| Usage & consumption (ch-theme, getBundles, classes) | [references/usage-and-consumption.md](references/usage-and-consumption.md)                               |
| Inner skill pattern                                 | [references/inner-skill-pattern.md](references/inner-skill-pattern.md)                                   |
| Color system                                        | [references/design-foundations/color-system.md](references/design-foundations/color-system.md)           |
| Typography system                                   | [references/design-foundations/typography-system.md](references/design-foundations/typography-system.md) |
| Spacing system                                      | [references/design-foundations/spacing-system.md](references/design-foundations/spacing-system.md)       |
| Icons system                                        | [references/design-foundations/icons-system.md](references/design-foundations/icons-system.md)           |
| Design patterns (buttons, forms, etc.)              | [references/design-foundations/design-patterns.md](references/design-foundations/design-patterns.md)     |
| Figma token mapping                                 | [references/design-foundations/figma-mapping.md](references/design-foundations/figma-mapping.md)         |
| Chameleon component styling                         | Consult the **chameleon-controls-library** skill's per-component `styling.md` files                      |
| CSS optimization                                    | [references/css-optimization.md](references/css-optimization.md)                                         |
| Showcase app                                        | [references/showcase-app.md](references/showcase-app.md)                                                 |
