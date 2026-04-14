# Mercury Icons

Mercury ships a comprehensive set of built-in icons organized into 17 categories. Icons are installed automatically with the `@genexus/mercury` package — the Vite plugin (`@genexus/vite-plugin-mercury`) or the Mercury CLI (`@genexus/mercury-cli`) configures where icon assets end up in the final build. You never need to know or manage the output path

## How icons are resolved

During [installation](../installation/), Mercury calls:

```ts
import { registryProperty } from "@genexus/chameleon-controls-library/dist/collection";
import { getImagePathCallbackDefinitions } from "@genexus/mercury/assets-manager.js";
import { registerMercury } from "@genexus/mercury/register-mercury.js";

registerMercury();
registryProperty("getImagePathCallback", getImagePathCallbackDefinitions);
```

This registers Mercury's icon resolver globally via Chameleon's Registry Property System (documented in the **chameleon-controls-library** skill under `references/registry.md`). After this setup, every Chameleon component that supports `getImagePathCallback` (`ch-image`, `ch-tree-view-render`, `ch-combo-box-render`, `ch-accordion-render`, etc.) automatically resolves Mercury icon paths — no per-instance prop binding needed

When Mercury's resolver receives an icon path that doesn't match any internal Mercury mapping, it falls back to `{ base: <the raw path> }`, so custom icons outside Mercury's set still work in Chameleon components

> For the general approach to icons and images (semantic vs decorative, `mask-image`, `<img>`, CSS pseudo-elements), see the **chameleon-controls-library** skill — specifically `references/icons-and-images.md`

## Using Mercury icons

Always use `getIconPath` or `getIconPathExpanded` from `@genexus/mercury/assets-manager.js` to reference Mercury icons. These utilities build the correct path string that Mercury's registry resolver understands. See [assets-manager API](../api/assets-manager.md) for full signatures

### `getIconPath` — single icon

For **multicolor** icons (colors baked into the SVG):

```ts
import { getIconPath } from "@genexus/mercury/assets-manager.js";

getIconPath({ category: "objects", name: "api" });
```

For **monochrome** icons (color applied via CSS), you must specify a `colorType`:

```ts
getIconPath({ category: "system", name: "settings", colorType: "on-surface" });
```

Use the result as the `src` for `ch-image` or as `startImgSrc`/`endImgSrc` in component item models:

```ts
const items = [
  {
    caption: "Settings",
    startImgSrc: getIconPath({ category: "system", name: "settings", colorType: "on-surface" }),
    startImgType: "mask"
  }
];
```

### `getIconPathExpanded` — collapsed + expanded icon pair

Builds a combined `"collapsedPath:expandedPath"` string for components that support expand/collapse states. **Currently only supported by `ch-tree-view-render`.**

```ts
import { getIconPathExpanded } from "@genexus/mercury/assets-manager.js";

// Multicolor
getIconPathExpanded(
  { category: "objects", name: "module" },
  { category: "objects", name: "module-open" }
);

// Monochrome
getIconPathExpanded(
  { category: "system", name: "group", colorType: "on-surface" },
  { category: "system", name: "group-off", colorType: "on-surface" }
);
```

> `getIconPath` also works with `ch-tree-view-render` when you don't need different icons for collapsed/expanded states

## Important limitations

- Mercury does **not** currently support using its icons directly as `background-image`, `mask-image`, or `<img src>` URLs. Always go through `getIconPath`/`getIconPathExpanded` + Chameleon components
- If you need general-purpose icon/image techniques (CSS pseudo-elements, `mask-image` for custom icons outside Mercury), see the **chameleon-controls-library** skill — specifically `references/icons-and-images.md`

## Icon categories

Mercury organizes its icons into **17 categories**. Each category is either **multicolor** (colors baked into the SVG) or **monochrome** (colored via CSS, requires `colorType`)

### Monochrome categories (8)

| Category | Icons | Description |
|----------|-------|-------------|
| [system](system.md) | 148 | Comprehensive utility icons for common actions — add, delete, search, settings, notifications, etc. **The primary category for most applications.** |
| [navigation](navigation.md) | 16 | Arrows, chevrons, and directional indicators for navigation flow |
| [menus](menus.md) | 18 | Menu operations — build, save, edit, undo, redo |
| [gemini-tools](gemini-tools.md) | 35 | Tool icons within the Gemini framework |
| [bpm](bpm.md) | 61 | Business Process Management workflow elements, gateways, and events |
| [states](states.md) | 2 | State indicators (filled and outlined pills) |
| [window-tools](window-tools.md) | 31 | Development environment and workspace management tools |
| [internal](internal.md) | 1 | Reserved for Mercury internal use |

### Multicolor categories (9)

| Category | Icons | Description |
|----------|-------|-------------|
| [objects](objects.md) | 72 | Core GeneXus object types — transactions, procedures, webpanels, workflows, etc. |
| [controls](controls.md) | 43 | UI control icons — buttons, grids, input fields, dropdowns |
| [editing-structures](editing-structures.md) | 34 | Data structure icons — attributes, formulas, keys, indexes |
| [general](general.md) | 27 | Broad-purpose icons — platform references, databases, generators |
| [gx-test](gx-test.md) | 25 | Testing framework — unit tests, UI tests, test suites, results |
| [patterns](patterns.md) | 18 | Design pattern icons for standardized development solutions |
| [gx-server](gx-server.md) | 10 | Version control, commits, locks, repository management |
| [objects-parts](objects-parts.md) | 5 | Object components — conditions, events, rules, variables |
| [patterns-default-associated](patterns-default-associated.md) | 5 | Pattern association and synchronization states |

> ~95% of icons used in a typical Mercury application come from the **system** category
