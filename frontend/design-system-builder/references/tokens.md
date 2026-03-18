# Design Tokens (3-Tier DTCG)

## Token Tiers

```
Tier 3: Component Tokens  →  reference Tier 2 only
Tier 2: Semantic Tokens    →  reference Tier 1 only
Tier 1: Primitive Tokens   →  hold raw values
```

**Rule:** Component → Semantic → Primitive → Raw value. NEVER skip tiers

## W3C DTCG Format

Use the [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) JSON schema

### Tier 1 — Primitive (`tokens/primitive.json`)

```json
{
  "color": {
    "blue": {
      "500": {
        "$type": "color",
        "$value": "#3b82f6",
        "$description": "Blue 500 primitive"
      }
    },
    "gray": {
      "900": {
        "$type": "color",
        "$value": "#111827",
        "$description": "Gray 900 primitive"
      }
    }
  },
  "space": {
    "4": {
      "$type": "dimension",
      "$value": "16px",
      "$description": "Standard spacing unit"
    }
  }
}
```

### Tier 2 — Semantic (`tokens/semantic.json`)

```json
{
  "color": {
    "bg": {
      "primary": {
        "$type": "color",
        "$value": "{color.blue.500}",
        "$description": "Primary background — used for CTA surfaces"
      }
    },
    "text": {
      "default": {
        "$type": "color",
        "$value": "{color.gray.900}",
        "$description": "Default body text color"
      }
    }
  }
}
```

### Tier 3 — Component (`tokens/component.json`)

```json
{
  "button": {
    "primary": {
      "bg": {
        "$type": "color",
        "$value": "{color.bg.primary}",
        "$description": "Button primary background"
      }
    }
  }
}
```

## Naming Convention

Pattern: `{category}-{concept}-{property}-{variant}-{state}`

| Segment | Examples |
|---|---|
| category | `color-`, `spacing-`, `font-`, `control-`, `border-` |
| concept | `text-`, `bg-`, `border-`, `body-`, `size-` |
| property | `default`, `primary`, `radius` |
| variant | (optional) |
| state | `-hover`, `-focus`, `-active`, `-disabled` |

Rules:
- Use kebab-case
- Category comes first for grouping
- Name by role, NEVER by appearance: `color-bg-primary` OK / `color-bg-blue` BAD
- States are always the last suffix

## Mandatory Metadata Per Token

Every token MUST include:

| Field | Required | Description |
|---|---|---|
| `$type` | Yes | DTCG type: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `shadow`, `typography`, `border`, `transition`, `gradient` |
| `$value` | Yes | Raw value or alias reference |
| `$description` | Yes | Human-readable description |

## Token Categories by CSS Property

**Critical rule:** Organize color tokens into 4 categories that match the CSS property they apply to. Never cross categories

| CSS property | Token category | Pattern | Example |
|-------------|----------------|---------|---------|
| `color` (text) | `text` | `--color-text-{sub}-{state}` | `--color-text-neutral-default` |
| `background`, `background-color` | `accent` | `--color-accent-{sub}-{state}` | `--color-accent-primary-default` |
| `border`, `border-color`, `outline` | `border` | `--color-border-{sub}-{state}` | `--color-border-neutral-default` |
| Icon `color` / `fill` | `icon` | `--color-icon-{sub}-{state}` | `--color-icon-neutral-default` |

This separation ensures dark/light mode inversions work correctly and each CSS property can be independently themed

See [Color System](design-foundations/color-system.md) for the complete color architecture

## Interaction State Tokens

Every color subcategory (primary, neutral, error, success, warning) supports these states:

| State | Suffix | When to use |
|-------|--------|-------------|
| Default | `-default` | Base state, no interaction |
| Hover | `-hover` | Cursor over element |
| Pressed | `-pressed` | Active click / tap |
| Focused | `-focused` | Keyboard focus (typically borders only) |
| Disabled | `-disabled` | Element not interactive |
| On-default | `-on-default` | Content color ON the default-state surface |
| On-hover | `-on-hover` | Content color ON the hover-state surface |
| On-pressed | `-on-pressed` | Content color ON the pressed-state surface |

## Elevation / Surface Tokens

Define elevation levels for layered UIs:

| Token | Purpose |
|-------|---------|
| `--color-accent-surface-surface` | Base surface (page background) |
| `--color-accent-surface-elevation-1` | Cards, panels |
| `--color-accent-surface-elevation-2` | Dropdowns, popovers |
| `--color-accent-surface-elevation-3` | Dialogs, modals |

## Feedback Color Tokens

Define error, success, and warning tokens across all 4 categories:

```
--color-text-error-default       --color-text-success-default       --color-text-warning-default
--color-accent-error-default     --color-accent-success-default     --color-accent-warning-default
--color-border-error-default     --color-border-success-default     --color-border-warning-default
--color-icon-error-default       --color-icon-success-default       --color-icon-warning-default
```

## Icon Size Tokens

Define semantic icon size tokens (global, no bundle import required):

| Token | Typical value |
|-------|---------------|
| `--icon-xs` | 12px |
| `--icon-s` | 14px |
| `--icon-m` | 16px |
| `--icon-l` | 20px |
| `--icon-xl` | 24px |
| `--icon-xxl` | 32px |

See [Icons System](design-foundations/icons-system.md) for class families and usage

## Semantic Spacing Tokens

Define two spacing token families (global, no bundle import required):

- **`--spacing-padding-*`** — For padding, margin, or any spatial property (xxs=2px through xxxl=32px)
- **`--spacing-gap-*`** — For flex/grid gap (same scale)

See [Spacing System](design-foundations/spacing-system.md) for the complete scale and usage

## Figma Token Fidelity

> **HARD RULE**: The DS must not invent tokens beyond what is defined

### When a Figma Token Export Exists

If the user provides a Figma token export (JSON, CSV, or via Figma Variables API):

1. **Use exactly those tokens.** Every color, typography, border, and shadow token in the DS must trace back to the Figma export
2. **Never invent new color, typography, border-radius, or shadow tokens** that don't exist in the Figma export
3. **Spacing tokens may be added** if they follow the 4pt grid and fill a genuine gap in the scale (e.g., the Figma export doesn't define a 6px spacing but the DS needs it). Document the addition
4. **Component tokens (Tier 3)** may be created as aliases to Figma-defined semantic tokens — this is expected, not invention

**Checklist before adding any token:**
- [ ] Does this token exist in the Figma export? → Use it
- [ ] Is this a component alias to an existing semantic token? → Allowed (Tier 3)
- [ ] Is this a spacing token on the 4pt grid? → Allowed if justified
- [ ] None of the above? → **Do not add it.** Ask the user

### When No Figma Export Exists

Follow the naming conventions and token categories defined in this document and in the [Design Foundations](design-foundations/) references:

- **4 color categories** by CSS property: text, accent, border, icon
- **Interaction states**: default, hover, pressed, focused, disabled, on-default, on-hover, on-pressed
- **Elevation tokens**: surface, elevation-1 through elevation-3
- **Spacing**: `--spacing-padding-*` and `--spacing-gap-*` on the 4pt grid
- **Typography**: `{role}-{weight}-{size}` classes with 4 roles (heading, subtitle, body, caption)
- **Border radius**: `--border-radius-{xxs|xs|s|m|l|xl}`
- **Icon sizes**: `--icon-{xs|s|m|l|xl|xxl}`

Do not invent tokens that break these patterns (e.g., a `--color-bg-special-accent` that doesn't fit the 4-category system)

## Token Distribution Pipeline

```
tokens/*.json (DTCG format)
  │
  ├─→ Style Dictionary v4+ transforms
  │     ├─→ CSS Custom Properties  (base/base.css, scope/*.css)
  │     ├─→ SCSS Variables         (_tokens.scss)
  │     ├─→ JSON flat              (tokens-flat.json)
  │     ├─→ TypeScript constants   (tokens.ts)
  │     └─→ Documentation          (tokens.md)
  │
  └─→ Automated validation
        ├─→ WCAG contrast check (color pairs)
        ├─→ Naming convention lint
        └─→ Circular reference detection
```
