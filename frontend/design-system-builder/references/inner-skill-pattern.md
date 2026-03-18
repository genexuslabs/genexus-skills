# Inner Skill Pattern

Every DS built with this builder MUST include a vibe-code skill inside `docs/` that enables AI agents and developers to use the DS. This follows the reference pattern defined below

## File Structure

```
docs/
├── SKILL.md                            # Entry point
├── references/
│   ├── component-bundles-table.md      # Component → bundle mapping
│   ├── bundles-index.md                # Master index of all bundles
│   ├── themes-and-variants.md          # Theme documentation
│   ├── design-foundations/             # Design foundation docs
│   │   ├── color-system.md            # Color categories, states, elevation
│   │   ├── typography-system.md       # Roles, classes, line-heights
│   │   ├── spacing-system.md          # Grid, tokens, border-radius
│   │   ├── icons-system.md            # Sizes, classes, icon colors, resolver setup
│   │   ├── design-patterns.md         # Buttons, forms, typography hierarchy
│   │   └── figma-token-mapping.md     # Figma → token translation guide
│   ├── installation/
│   │   └── README.md                   # Framework-specific setup
│   └── bundles/
│       ├── base/
│       │   ├── base.md
│       │   └── base.css → ../../base/base.css (symlink or copy)
│       ├── chameleon/
│       │   ├── scrollbar.md
│       │   └── scrollbar.css → ../../chameleon/scrollbar.css
│       ├── components/
│       │   ├── button.md
│       │   ├── button.css → ../../components/button.css
│       │   ├── dialog.md
│       │   ├── dialog.css → ../../components/dialog.css
│       │   └── ...
│       ├── scope/
│       │   ├── theme-{brand}.md
│       │   └── theme-{brand}.css → ../../scope/theme-{brand}.css
│       └── utils/
│           ├── spacing.md
│           ├── spacing.css → ../../utils/spacing.css
│           └── ...
```

## SKILL.md Template

The inner SKILL.md follows this exact structure:

```markdown
---
name: {ds-name}-vibe-code
description: "Styles UIs with the {DS Name} Design System using ch-theme, getBundles, and {DS Name} CSS classes. Use when building interfaces with {DS Name}, or when adding {DS Name} styling on top of Chameleon components."
---

# {DS Name} vibe-code

Apply {DS Name} Design System styling to UIs built with Chameleon. This skill covers only {DS Name}-specific usage: `ch-theme`, `getBundles`, and which CSS bundles/classes to use. Use the Chameleon skill (when available) to build the component tree; then use this skill to add {DS Name} styling.

## Workflow

1. **Build the UI with Chameleon**
   Use the Chameleon skill or Chameleon patterns to implement the component tree.

2. **Add {DS Name} styling**
   - Import `getBundles` from `@{ds-name}/design-system/bundles.js`.
   - Call `getBundles(bundleNames, basePath)` with the bundles required by the components you use (see [Component → bundles table](references/component-bundles-table.md)).
   - Wrap the root of the view with `<ch-theme [model]="bundles">`.
   - Apply {DS Name} CSS classes to elements as documented in the bundle docs (see [Bundles index](references/bundles-index.md)).

## ch-theme and getBundles

- **getBundles(bundleNames, basePath)**
  Returns the theme model for those CSS bundles. `bundleNames` is an array of bundle names (e.g. `["components/button", "components/edit", "utils/form"]`). `basePath` is the public path where {DS Name} CSS files are served.

- **ch-theme**
  Chameleon component that injects the CSS from the model. Place it at the root of the tree that uses {DS Name} styles.

## Which bundles to request

Use the **Component → {DS Name} CSS bundles** table to see which bundles apply to each Chameleon component or native element you use.

Table: [Component → bundles table](references/component-bundles-table.md)

## Bundle and class details

- For the list of bundles and links to each bundle's docs: [Bundles index](references/bundles-index.md).
- Open the relevant bundle `.md` when you need exact class names and which elements they apply to.

## Dark / light mode

{DS Name} supports dark and light themes. Set the class on `<html>`:
- Light: `class="theme-{brand}-light"`
- Dark: `class="theme-{brand}-dark"`

## Theme variants

{List of available brands and how to switch between them}

## Design Foundations

{DS Name} defines a complete design language. See the foundation docs for detailed guidance:

- [Color system](references/design-foundations/color-system.md) — Color categories, interaction states, elevation
- [Typography system](references/design-foundations/typography-system.md) — Roles, class naming, line-heights
- [Spacing system](references/design-foundations/spacing-system.md) — Grid base, padding/gap tokens, border-radius
- [Icons system](references/design-foundations/icons-system.md) — Icon sizes, classes, icon colors, resolver setup, icon keys
- [Design patterns](references/design-foundations/design-patterns.md) — Buttons, forms, typography hierarchy
- [Figma token mapping](references/design-foundations/figma-token-mapping.md) — How to translate Figma designs to tokens

## Body and Root Container

{DS Name}'s `base/base` styles `body` with default font-family, font-size, line-height, font-weight, display, min-block-size, margin, background-color, and color. **Never duplicate these.** If a framework wrapper exists (`#root`, `#app`), use `display: contents` instead of re-declaring styles.

## Do's and Don'ts

**MUST DO:**
- Load ALL required bundles via `getBundles` before using their classes
- Apply {DS Name} CSS classes on every styled element
- Use design tokens — never raw hex/px
- Match token category to CSS property (text tokens for `color`, accent tokens for `background-color`, etc.)
- Use form utility classes for every form
- Use button classes for all buttons/links
- Use spacing tokens — never `em` or `rem` for spacing
- Use `--border-radius-*` tokens — never hardcode border-radius
- Use typography classes — never set font-size/line-height manually
- Set theme class on `<html>` for dark/light mode

**MUST NOT DO:**
- Never wrap children inside `<ch-theme>` — it's always a sibling
- Never write custom CSS for states that {DS Name} already handles (hover, focus, disabled)
- Never substitute native elements when Chameleon components exist
- Never cross token categories (text tokens for borders, accent tokens for text, etc.)
- Never skip loading bundles
- Never use primitive tokens in application code — always use semantic tokens
- Never write CSS fallback values on tokens (`var(--token, fallback)`)
- Never use more than one primary button per page/view

## Theme Detection Guide

{How to identify which brand variant a design uses — describe the primary color, neutral palette tint, and surface colors that distinguish each brand}

## Design context

{Any Figma links, design decisions, or important context the user provided during DS creation}

## References

- [Component → bundles table](references/component-bundles-table.md)
- [Bundles index](references/bundles-index.md)
- [Themes and variants](references/themes-and-variants.md)
- [Design foundations](references/design-foundations/)
- [Installation by framework](references/installation/README.md)
```

## component-bundles-table.md Template

```markdown
# Component → {DS Name} CSS Bundles

| Component | {DS Name} CSS bundles |
|---|---|
| `ch-accordion-render` | `components/accordion` |
| `ch-edit` | `components/edit`, `utils/form` |
| `ch-dialog` | `components/dialog` |
| `button` (native) | `components/button` |
| *Layout utilities* | `utils/spacing`, `utils/layout` |
| *Typography* | `utils/typography` |
| *Elevation (cards)* | `utils/elevation` |

> Bundle docs are in `references/bundles/{category}/{name}.md`.
```

## bundles-index.md Template

```markdown
# Bundles Index

## Base
- [base.md](bundles/base/base.md) | [base.css](bundles/base/base.css)

## Scope
- [theme-{brand}.md](bundles/scope/theme-{brand}.md) | [theme-{brand}.css](bundles/scope/theme-{brand}.css)

## Chameleon
- [scrollbar.md](bundles/chameleon/scrollbar.md) | [scrollbar.css](bundles/chameleon/scrollbar.css)

## Components
- [button.md](bundles/components/button.md) | [button.css](bundles/components/button.css)
- *(add as components are built)*

## Utilities
- [spacing.md](bundles/utils/spacing.md) | [spacing.css](bundles/utils/spacing.css)
- *(add as utilities are built)*
```

## Individual Bundle Doc Template

Each component/utility bundle needs a `.md` following this pattern:

```markdown
# {Component Name}

Bundle name: `"{category}/{name}"`

Implementation: [{name}.css](./{name}.css)

## Classes

### `{class-name}`

Applies to the components: `ch-{component}`, `button` (native)

{Description of what this class does, when to use it, visual effect.}

### `{class-name-variant}`

Applies to the components: `ch-{component}`

{Description of variant.}
```

## Installation README.md Template

```markdown
# Installation

## Install

\`\`\`bash
npm install @{ds-name}/design-system @genexus/chameleon-controls-library
\`\`\`

## Framework Setup

### React (Vite)

{Setup instructions}

### Angular

{Setup instructions}

### Vanilla / Lit / Kasstor

{Setup instructions}

## After Installation

- See [Component → bundles table](../component-bundles-table.md) for which bundles to use.
- See [Bundles index](../bundles-index.md) for class details.
```

## Icons System Documentation

The inner skill's `icons-system.md` must document more than just size tokens and color tokens. It should also cover:

1. **Icon resolver setup** — How the DS registers its `getImagePathCallback` via `registryProperty` during installation, and the fallback behavior for custom icons
2. **Available icon keys** — A table of all icon keys the DS provides (the short strings consumers pass to `startImgSrc`, `ch-image src`, etc.)
3. **Rendering mode guidance** — When to use `type="mask"` (monochrome, themeable) vs `type="background"` (multicolor)
4. **Icons in component models** — How to use `startImgSrc`/`endImgSrc` + `startImgType`/`endImgType` with the DS's icon keys

## When to Update the Inner Skill

Update the inner skill documentation every time:

- A new component CSS is added to `components/`
- A new utility CSS is added to `utils/`
- A new theme/brand is added to `scope/`
- Token names change
- A Kasstor custom component is added
- The user provides new design context or Figma links
