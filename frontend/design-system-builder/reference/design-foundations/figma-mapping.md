# Figma Token Mapping

How to translate Figma design values into design system tokens and CSS classes

## Primitive vs Semantic Tokens

Design systems have two token layers:

- **Primitive tokens** — Raw color/size values: `--color-blue-600`, `--color-gray-900`, `--size-16`, etc. These are internal to the design system and **must never be used in application code**
- **Semantic tokens** — Purpose-driven tokens: `--color-accent-primary-default`, `--color-text-neutral-default`, `--icon-m`, `--spacing-padding-xl`, etc. These are the public API of the design system

**Always use semantic tokens.** If a Figma design or user input references a primitive token, translate it to its semantic equivalent

Primitive tokens change between theme variants and may change between versions. Semantic tokens remain stable

## The Figma Font-Weight Discrepancy

**Important:** Figma may display font-weight values differently than what the DS implements. This is common with custom typefaces

A typical pattern is Figma showing +100 higher than production:

| Figma shows | DS implements | CSS variable |
|-------------|---------------|--------------|
| Regular (400) | Light (300) | `var(--font-style-regular)` |
| SemiBold (600) | Medium (500) | `var(--font-style-semi-bold)` |
| Bold (700) | SemiBold (600) | `var(--font-style-bold)` |

**Document the exact mapping** for your typeface in the DS documentation. Never use raw `font-weight` values from Figma — always use the DS's typography classes or CSS variables

## Reconstructing Tokens from Raw Values

When a Figma design uses raw values instead of named tokens, follow this process:

### Color: 4-Step Translation

#### Step 1: Identify the CSS property

| If the color is used for… | Token category | Pattern |
|----------------------------|----------------|---------|
| Text / font color | `text` | `--color-text-{subcategory}-{state}` |
| Background / fill | `accent` | `--color-accent-{subcategory}-{state}` |
| Border / outline / stroke | `border` | `--color-border-{subcategory}-{state}` |
| Icon fill / stroke | `icon` | `--color-icon-{subcategory}-{state}` |

#### Step 2: Determine the subcategory

| If the purpose is… | Subcategory |
|---------------------|-------------|
| Brand action, CTA, primary emphasis | `primary` |
| Standard content, neutral UI | `neutral` |
| Error state, destructive | `error` |
| Success state, confirmation | `success` |
| Warning state | `warning` |
| Surface / elevation | `surface` (accent only) |

#### Step 3: Match the state

Default → `default`, Hover → `hover`, Pressed → `pressed`, Focus → `focused` (borders only), Disabled → `disabled`

#### Step 4: Find the closest token

Match the hex value against the DS token tables. If there's no exact match, choose the semantically closest token based on purpose and context, not just color similarity

### Typography Mapping

When Figma specifies raw font properties:

1. **Font size** → Find the closest DS typography class by px value
2. **Font weight** → Apply the font-weight mapping (subtract if needed), then pick the correct weight variant
3. **Line-height** → Don't set manually; DS typography classes include correct line-heights
4. **Letter-spacing** → Don't set manually; DS handles this

### Spacing Mapping

When Figma specifies raw px spacing:

1. Map to the closest `--spacing-padding-*` or `--spacing-gap-*` token
2. Use padding tokens for padding/margin/calc, gap tokens for flex/grid gap
3. For values without a direct token (e.g. 20px, 40px), use `calc()` with tokens or px from the grid

### Icon Size Mapping

When Figma specifies raw px icon sizes:

Map to the closest `--icon-{size}` token (xs=12, s=14, m=16, l=20, xl=24, xxl=32)

## Figma Export as Source of Truth

When a Figma token export (JSON or Variables API) is available, it becomes the **single source of truth** for the DS token set:

### Workflow

1. **Load** the Figma export JSON
2. **Map** each Figma token to the 3-tier DTCG structure (primitive → semantic → component)
3. **Validate** that every DS token traces back to a Figma-defined token (except spacing additions on the 4pt grid)
4. **Flag** any DS token not traceable to the Figma export as a potential error
5. **Typography**: Map all Figma text styles 1:1 to DS typography classes (see [Typography System — Figma Text Style Mapping](typography-system.md#figma-text-style-mapping))

### Token Mapping Priority

| Figma token type | DS mapping |
|-----------------|-----------|
| Color primitives | `tokens/primitive.json` → color values |
| Color semantic (text, fill, stroke) | `tokens/semantic.json` → 4 categories (text, accent, border, icon) |
| Spacing | `tokens/primitive.json` + `tokens/semantic.json` → spacing scale |
| Typography | `tokens/semantic.json` + `utils/typography.css` → typography classes |
| Border radius | `tokens/semantic.json` → `--border-radius-*` |
| Shadow / elevation | `tokens/semantic.json` → elevation tokens |

### When Figma Tokens Are Incomplete

If the Figma export covers only some categories (e.g., colors only, no spacing):
- Use Figma tokens for the available categories
- Fill gaps following the conventions defined in the DS design foundations
- Document which tokens come from Figma and which are DS-defined

## Identifying the Brand Variant from a Design

When working with a multi-brand DS, determine which variant a Figma design uses by:

1. **Primary action color** (strongest signal) — Look at button backgrounds, link colors, focus rings. Each brand has a distinctive primary hue
2. **Surface/elevation colors** — Each variant may tint surfaces differently (e.g., blue-tinted vs pure gray)
3. **Neutral palette tint** — Some brands tint their grays (blue-tinted, warm-tinted) while others use pure grays

Document these identifying characteristics in the DS's `themes-and-variants.md` so consumers can quickly match a design to its brand configuration

## When Figma Doesn't Use Tokens

If a Figma design uses raw values instead of design tokens:

1. **Font size** → Find closest typography class by px value
2. **Font weight** → Apply the weight mapping, then pick the correct variant
3. **Color on text** → Use `--color-text-*` tokens, match by hex
4. **Color on background** → Use `--color-accent-*` tokens
5. **Color on border** → Use `--color-border-*` tokens
6. **Color on icon** → Use `--color-icon-*` tokens
7. **Spacing values** → Map to closest `--spacing-padding-*` or `--spacing-gap-*` token
8. **Line-height** → Don't set manually; typography classes include correct line-heights
9. **Letter-spacing** → Don't set manually; DS handles this
10. **Border-radius** → Map to closest `--border-radius-*` token
