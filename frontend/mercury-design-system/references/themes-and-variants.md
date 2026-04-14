# Themes: mercury and globant

Mercury implements two **theme variants** that change the color palette: **mercury** (default) and **globant**

## Identifying the variant from a design

Use multiple signals — primary colors, surface/elevation colors, and neutral tints:

### Primary action color

| Variant | Mode | Primary hex | Visual |
|---------|------|-------------|--------|
| **Mercury** | Light | `#0072f8` (azure-600) | Blue buttons, blue links, blue focus rings |
| **Mercury** | Dark | `#5ba7ff` (primary-600) | Blue buttons, blue links, blue focus rings |
| **Globant** | Light | `#749519` (avocado-600) | Green buttons, green links, green focus rings |
| **Globant** | Dark | `#c3e01a` (olive-600) | Yellow-green buttons, green links, green focus rings |

### Surface and elevation colors

Mercury surfaces have a **blue tint** (lilac-based); Globant surfaces are **pure neutral grays**

**Light mode:**

| Token | Mercury | Globant |
|-------|---------|---------|
| `surface` | `#f9fafa` (blue-tinted) | `#fcfcfc` (pure gray) |
| `elevation-1` | `#edf0f8` (blue-tinted) | `#ededed` (pure gray) |
| `elevation-2` | `#e2e7f4` (blue-tinted) | `#fafafa` (pure gray) |
| `elevation-3` | `#d5daeb` (blue-tinted) | `#e8e8e8` (pure gray) |

**Dark mode:**

| Token | Mercury | Globant |
|-------|---------|---------|
| `surface` | `#11151c` (blue-tinted) | `#171717` (pure dark) |
| `elevation-1` | `#181f2a` (blue-tinted) | `#212121` (pure dark) |
| `elevation-2` | `#242d3c` (blue-tinted) | `#303030` (pure dark) |
| `elevation-3` | `#2d3a48` (blue-tinted) | `#3b3b3b` (pure dark) |

When receiving a Figma design or screenshot, check in order: (1) primary action color, (2) surface/elevation backgrounds, (3) neutral gray tint. Blue-tinted → Mercury. Pure gray → Globant

## Base bundles

There are two base style bundles:

- **[base/base.css](bundles/base/base.css)** — Default theme (mercury). Contains tokens, typography, spacing, and core styles
- **[base/base-globant.css](bundles/base/base-globant.css)** — Globant theme. Same structure but with a different color palette

When building with the Globant variant, the build process replaces the content of the `base` bundle with `base-globant.css`. The bundle name requested by the app (`base/base`) stays the same; only the served content changes

## Scope bundles

The scope bundles define CSS variables (tokens) for each theme:

- **[scope/theme-mercury.css](bundles/scope/theme-mercury.css)** — Classes `.theme-mercury`, `.theme-mercury-light`, `.theme-mercury-dark`
- **[scope/theme-globant.css](bundles/scope/theme-globant.css)** — Classes `.theme-globant`, `.theme-globant-light`, `.theme-globant-dark`

These apply the semantic color tokens for each theme and light/dark mode. **Only needed when an app combines multiple themes** (e.g., mercury and globant in the same page). For single-theme apps, the base bundle already applies the correct theme — don't include scope bundles

## How to choose the theme

### Vite plugin

Use the `theme` option in `vite-plugin-mercury`:

```ts
// vite.config.ts
import { mercury } from "@genexus/vite-plugin-mercury";

export default {
  plugins: [
    mercury({
      theme: "mercury", // default
      // or
      theme: "globant",
    }),
  ],
};
```

### CLI / mercury

When running the `mercury` CLI, the Globant variant is enabled via the `--globant` flag (or equivalent build argument). The `mercury.config` file only supports `overrides`; theme selection is done at build time through CLI arguments. See [Vite plugin and mercury.config options](api/vite-plugin-options.md) for configuration details
