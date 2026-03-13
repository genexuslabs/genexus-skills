# Figma Token Mapping

How to translate Figma design values into Mercury design tokens and CSS classes

## Primitive vs Semantic Tokens

Mercury has two token layers:

- **Primitive tokens** — Raw color/size values: `--color-azure-600`, `--color-neutral-1400`, `--color-avocado-600`, `--size-16`, etc. These are internal to the design system and **must never be used in code**
- **Semantic tokens** — Purpose-driven tokens: `--color-accent-primary-default`, `--color-text-neutral-default`, `--icon-m`, `--spacing-padding-xl`, etc. These are the public API of the design system

**Always use semantic tokens.** If a Figma design or user input references a primitive token, translate it to its semantic equivalent:

| Primitive (don't use) | Semantic (use this) | How to find it |
|-----------------------|--------------------|--------------------|
| `--color-azure-600` | `--color-accent-primary-default` | Match the CSS property + purpose using the tables below |
| `--color-neutral-1400` | `--color-text-neutral-default` (Globant) | Look up which semantic token references this primitive in the variant's base.css |
| `--size-16` | `--icon-m` or `--spacing-padding-xl` | Depends on context — icon sizing vs spacing |

Primitive tokens change between theme variants (Mercury uses `azure-*`, Globant uses `avocado-*`) and may change between versions. Semantic tokens remain stable

## The Figma Font-Weight Bug

**Critical:** Figma displays font-weight values +100 higher than what Mercury implements. Always subtract 100:

| Figma shows | Mercury implements | CSS variable |
|-------------|-------------------|--------------|
| Regular (400) | Light (300) | `var(--font-style-regular)` |
| SemiBold (600) | Medium (500) | `var(--font-style-semi-bold)` |
| Bold (700) | SemiBold (600) | `var(--font-style-bold)` |

Never use raw `font-weight` values from Figma. Always use Mercury typography classes or CSS variables

## Reconstructing Tokens from Hex Values

When a Figma design uses raw hex colors instead of named tokens, determine the correct Mercury token by **CSS property + color value**:

### Step 1: Identify the CSS property

| If the color is used for… | Token category | Pattern |
|----------------------------|----------------|---------|
| Text / font color | `text` | `--color-text-{subcategory}-{state}` |
| Background / fill | `accent` | `--color-accent-{subcategory}-{state}` |
| Border / outline / stroke | `border` | `--color-border-{subcategory}-{state}` |
| Icon fill / stroke | `icon` | `--color-icon-{subcategory}-{state}` |

### Step 2: Determine the subcategory

| If the purpose is… | Subcategory |
|---------------------|-------------|
| Brand action, CTA, primary emphasis | `primary` |
| Standard content, neutral UI | `neutral` |
| Error state, destructive | `error` |
| Success state, confirmation | `success` |
| Warning state | `warning` |
| Surface / elevation | `surface` (accent only) |

### Step 3: Match the state

Default → `default`, Hover → `hover`, Pressed → `pressed`, Focus → `focused` (borders only), Disabled → `disabled`

### Step 4: Find the closest token by hex value

Use the tables below to match hex values to tokens. If there's no exact match, choose the semantically closest token

## Typography Mapping: Figma → Mercury Classes

| Figma variable | Size | Mercury class | Notes |
|---------------|------|---------------|-------|
| `--font-size/header/h1` | 40px | `heading-1` | Bold, tight line-height |
| `--font-size/header/h2` | 32px | `heading-2` | Bold, tight line-height |
| `--font-size/header/h3` | 28px | `heading-3` | Bold, tight line-height |
| `--font-size/header/h4` | 24px | `heading-4` | Bold, tight line-height |
| `--font-size/header/h5` | 20px | `heading-5` | Bold, tight line-height |
| `--font-size/header/h6` | 18px | `heading-6` | Bold, tight line-height |
| `--font-size/subtitle/xl` | 20px | `subtitle-regular-xl` or `subtitle-semi-bold-xl` | |
| `--font-size/subtitle/l` | 18px | `subtitle-regular-l` or `subtitle-semi-bold-l` | |
| `--font-size/subtitle/m` | 16px | `subtitle-regular-m` or `subtitle-semi-bold-m` | |
| `--font-size/subtitle/s` | 15px | `subtitle-regular-s` or `subtitle-semi-bold-s` | |
| `--font-size/subtitle/xs` | 14px | `subtitle-regular-xs` or `subtitle-semi-bold-xs` | |
| `--font-size/body/xl` | 18px | `body-regular-xl` / `body-semi-bold-xl` / `body-italic-xl` | |
| `--font-size/body/l` | 16px | `body-regular-l` / `body-semi-bold-l` / `body-italic-l` | |
| `--font-size/body/m` | 14px | `body-regular-m` / `body-semi-bold-m` / `body-italic-m` | **Most common** |
| `--font-size/body/s` | 12px | `body-regular-s` / `body-semi-bold-s` / `body-italic-s` | |
| `--font-size/body/xs` | 11px | `body-regular-xs` / `body-semi-bold-xs` / `body-italic-xs` | |
| `--font-size/caption/l` | 11px | `caption-regular-l` or `caption-semi-bold-l` | |
| `--font-size/caption/m` | 10px | `caption-regular-m` or `caption-semi-bold-m` | |
| `--font-size/caption/s` | 8px | `caption-regular-s` or `caption-semi-bold-s` | |

**Weight selection:** If Figma shows `Regular` → use `regular` variant. If Figma shows `Semi Bold` → use `semi-bold` variant. If Figma shows `Italic` → use `italic` variant (body only)

## Color Token Mapping: Hex → Mercury Token

**Important:** The two theme variants (Mercury and Globant) use different color primitives. Mercury uses blue-tinted neutrals and azure primary colors; Globant uses pure gray neutrals and avocado/olive primary colors. The tables below show hex values for **both variants** so you can identify the correct token regardless of which variant the Figma design uses

Feedback colors (error, success, warning) are **identical** across both variants

### Text Tokens

| Token | Mercury Light | Mercury Dark | Globant Light | Globant Dark | Usage |
|-------|--------------|-------------|---------------|-------------|-------|
| `--color-text-neutral-default` | `#2D3A48` | `#E1ECF9` | `#3B3B3B` | `#EDEDED` | **Primary text** |
| `--color-text-neutral-hover` | `#17273B` | `#F0F4FA` | `#262626` | `#FAFAFA` | Text on hover |
| `--color-text-neutral-disabled` | `#56677A` | `#56677A` | `#6B6B6B` | `#6B6B6B` | Disabled text |
| `--color-text-neutral-on-text` | `#FAFBFD` | `#11151C` | `#FCFCFC` | `#171717` | Text on colored bg |
| `--color-text-neutral-white` | `#FAFBFD` | `#FAFBFD` | `#FCFCFC` | `#FCFCFC` | Always white |
| `--color-text-neutral-black` | `#11151C` | `#11151C` | `#171717` | `#171717` | Always black |
| `--color-text-neutral-neutral` | `#9DA9B6` | `#9DA9B6` | `#A9A9A9` | `#A9A9A9` | Mid-gray |
| `--color-text-primary-default` | `#0072F8` | `#5BA7FF` | `#668316` | `#BFD732` | Primary accent text |
| `--color-text-error-default` | `#8A0505` | `#E35861` | `#8A0505` | `#E35861` | Error messages |
| `--color-text-success-default` | `#1C5E34` | `#3FA89B` | `#1C5E34` | `#3FA89B` | Success messages |

### Accent Tokens (backgrounds / fills)

| Token | Mercury Light | Mercury Dark | Globant Light | Globant Dark | Usage |
|-------|--------------|-------------|---------------|-------------|-------|
| `--color-accent-primary-default` | `#0072F8` | `#5BA7FF` | `#749519` | `#C3E01A` | **Primary CTA bg** |
| `--color-accent-primary-hover` | `#9CC8FC` | `#485665` | `#50641C` | `#647213` | Primary hover |
| `--color-accent-primary-pressed` | `#173D82` | `#437DC0` | `#515C15` | `#7C8E15` | Primary pressed |
| `--color-accent-primary-lighter` | `#9CC8FC` | `#CEE0FF` | `#D8DFA3` | `#E8ED9F` | Light primary surfaces |
| `--color-accent-neutral-default` | `#9DA9B6` | `#9DA9B6` | `#A9A9A9` | `#A9A9A9` | Neutral accent |
| `--color-accent-neutral-disabled` | `#D2DDEB` | `#333D47` | `#C2C2C2` | `#464646` | Disabled bg |
| `--color-accent-neutral-on-surface` | `#17273B` | `#FAFBFD` | `#262626` | `#FCFCFC` | Text on surface |
| `--color-accent-error-default` | `#F83A3A` | `#E35861` | `#F83A3A` | `#E35861` | Error bg |
| `--color-accent-success-default` | `#35B061` | `#3FA89B` | `#35B061` | `#3FA89B` | Success bg |

### Border Tokens

| Token | Mercury Light | Mercury Dark | Globant Light | Globant Dark | Usage |
|-------|--------------|-------------|---------------|-------------|-------|
| `--color-border-neutral-default` | `#9DA9B6` | `#56677A` | `#B3B3B3` | `#A9A9A9` | **Standard borders** |
| `--color-border-neutral-hover` | `#17273B` | `#E1ECF9` | `#262626` | `#EDEDED` | Border on hover |
| `--color-border-neutral-disabled` | `#9DA9B6` | `#828B96` | `#575757` | `#6B6B6B` | Disabled borders |
| `--color-border-primary-default` | `#0072F8` | `#5BA7FF` | `#668316` | `#D2E546` | Primary accent border |
| `--color-border-primary-focused` | `#002DA8` | `#FFFFFF` | `#333F13` | varies | **Focus ring** |
| `--color-border-error-default` | `#F83A3A` | `#E35861` | `#F83A3A` | `#E35861` | Error border |
| `--color-border-success-default` | `#35B061` | `#3FA89B` | `#35B061` | `#3FA89B` | Success border |

### Icon Tokens

| Token | Mercury Light | Mercury Dark | Globant Light | Globant Dark | Usage |
|-------|--------------|-------------|---------------|-------------|-------|
| `--color-icon-neutral-default` | `#2D3A48` | `#E1ECF9` | `#3B3B3B` | `#EDEDED` | **Standard icons** |
| `--color-icon-neutral-disabled` | `#56677A` | `#56677A` | `#6B6B6B` | `#6B6B6B` | Disabled icons |
| `--color-icon-primary-default` | `#0072F8` | `#5BA7FF` | `#668316` | `#BFD732` | Primary accent icons |
| `--color-icon-error-default` | `#8A0505` | `#E35861` | `#8A0505` | `#E35861` | Error icons |
| `--color-icon-success-default` | `#1C5E34` | `#3FA89B` | `#1C5E34` | `#3FA89B` | Success icons |

### How to identify the variant from hex values

When matching a Figma hex color to a token, first determine which variant you're working with:

- **Blue-tinted neutrals** (e.g. `#2D3A48`, `#9DA9B6`, `#17273B`) + **azure primary** (`#0072F8`) → **Mercury** variant
- **Pure gray neutrals** (e.g. `#3B3B3B`, `#A9A9A9`, `#262626`) + **green primary** (`#749519`) → **Globant** variant

Then match the hex value against the correct variant's column in the tables above

## When Figma Doesn't Use Tokens

If a Figma design uses raw values instead of design tokens:

1. **Font size** → Find the closest Mercury typography class by px value (see table above)
2. **Font weight** → Subtract 100, then pick `regular` or `semi-bold` variant
3. **Color on text** → Use `--color-text-*` tokens, match by hex in the table above
4. **Color on background** → Use `--color-accent-*` tokens
5. **Color on border** → Use `--color-border-*` tokens
6. **Color on icon** → Use `--color-icon-*` tokens
7. **Spacing values** → Map to the closest `--spacing-padding-*` or `--spacing-gap-*` token (see [Spacing system](spacing-system.md)). Use padding tokens for padding/margin/calc, gap tokens for flex/grid gap. For values without a token (e.g. 20px, 40px), use `calc()` with tokens or px from the 4pt grid
8. **Line-height** → Don't set manually; Mercury typography classes include correct line-heights
9. **Letter-spacing** → Don't set manually; Mercury handles this
