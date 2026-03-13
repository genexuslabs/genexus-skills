# Typography System

Mercury uses the **Inter** typeface for all text. Typography is organized into 4 roles with a consistent class naming pattern

## Class Naming Pattern

`[role]-[weight]-[size]`

- **Role:** `heading`, `subtitle`, `body`, `caption`
- **Weight:** `regular`, `semi-bold`, `italic` (italic only for body)
- **Size:** `xs`, `s`, `m`, `l`, `xl` (headings use `1`..`6`)

## Font Families

| Role | CSS variable | Used by |
|------|-------------|---------|
| Header family | `var(--font-family-header)` | `heading-*`, `subtitle-*` |
| Body family | `var(--font-family-body)` | `body-*`, `caption-*` |

## Font Weights

| CSS variable | Figma shows | Mercury renders | Numeric |
|-------------|-------------|-----------------|---------|
| `var(--font-style-regular)` | Regular (400) | Light (300) | 300 |
| `var(--font-style-semi-bold)` | SemiBold (600) | Medium (500) | 500 |
| `var(--font-style-bold)` | Bold (700) | SemiBold (600) | 600 |

**Critical:** Figma displays font-weight +100 higher than production. Never copy Figma's font-weight literally

## Line Heights

| Token | Value | Used by |
|-------|-------|---------|
| `var(--line-height-tight)` | ~1.2 | `heading-*`, `subtitle-xs`, `subtitle-s` |
| `var(--line-height-regular)` | ~1.3 | `subtitle-m`, `subtitle-l`, `subtitle-xl` |
| `var(--line-height-relaxed)` | ~1.4 | `body-*`, `caption-*` |

## Headings

Always bold (`var(--font-style-bold)`), tight line-height. Use `--font-family-header`

| Class | Size | Figma variable | Usage |
|-------|------|---------------|-------|
| `heading-1` | 40px (`--font-size-header-h1`) | `--font-size/header/h1` | Main page title (use only 1x per page) |
| `heading-2` | 32px (`--font-size-header-h2`) | `--font-size/header/h2` | Main section headings |
| `heading-3` | 28px (`--font-size-header-h3`) | `--font-size/header/h3` | Important subsections |
| `heading-4` | 24px (`--font-size-header-h4`) | `--font-size/header/h4` | Content headings |
| `heading-5` | 20px (`--font-size-header-h5`) | `--font-size/header/h5` | Minor headings |
| `heading-6` | 18px (`--font-size-header-h6`) | `--font-size/header/h6` | Minimal headings |

## Subtitles

Use `--font-family-header`. Available in `regular` and `semi-bold` weights

| Class | Size | Figma variable | Line-height |
|-------|------|---------------|-------------|
| `subtitle-regular-xl` / `subtitle-semi-bold-xl` | 20px (`--font-size-subtitle-xl`) | `--font-size/subtitle/xl` | regular |
| `subtitle-regular-l` / `subtitle-semi-bold-l` | 18px (`--font-size-subtitle-l`) | `--font-size/subtitle/l` | regular |
| `subtitle-regular-m` / `subtitle-semi-bold-m` | 16px (`--font-size-subtitle-m`) | `--font-size/subtitle/m` | regular |
| `subtitle-regular-s` / `subtitle-semi-bold-s` | 15px (`--font-size-subtitle-s`) | `--font-size/subtitle/s` | tight |
| `subtitle-regular-xs` / `subtitle-semi-bold-xs` | 14px (`--font-size-subtitle-xs`) | `--font-size/subtitle/xs` | tight |

**When to use subtitles:** Section introductions, support text before content, group/category labels

## Body

Use `--font-family-body`. Available in `regular`, `semi-bold`, and `italic` weights

| Class | Size | Figma variable | Usage |
|-------|------|---------------|-------|
| `body-regular-xl` / `-semi-bold-xl` / `-italic-xl` | 18px (`--font-size-body-xl`) | `--font-size/body/xl` | Large body, leads |
| `body-regular-l` / `-semi-bold-l` / `-italic-l` | 16px (`--font-size-body-l`) | `--font-size/body/l` | Medium-large body |
| `body-regular-m` / `-semi-bold-m` / `-italic-m` | 14px (`--font-size-body-m`) | `--font-size/body/m` | **Standard body (most common)** |
| `body-regular-s` / `-semi-bold-s` / `-italic-s` | 12px (`--font-size-body-s`) | `--font-size/body/s` | Small body, tables |
| `body-regular-xs` / `-semi-bold-xs` / `-italic-xs` | 11px (`--font-size-body-xs`) | `--font-size/body/xs` | Minimal body |

All body classes use `--line-height-relaxed`

**When to use body:** Main reading content, form values, table data, descriptions

## Captions

Use `--font-family-body`. Available in `regular` and `semi-bold` weights

| Class | Size | Figma variable | Usage |
|-------|------|---------------|-------|
| `caption-regular-l` / `caption-semi-bold-l` | 11px (`--font-size-caption-l`) | `--font-size/caption/l` | Large captions |
| `caption-regular-m` / `caption-semi-bold-m` | 10px (`--font-size-caption-m`) | `--font-size/caption/m` | Standard captions |
| `caption-regular-s` / `caption-semi-bold-s` | 8px (`--font-size-caption-s`) | `--font-size/caption/s` | Small captions |
| `caption-regular-xs` / `caption-semi-bold-xs` | — (`--font-size-caption-xs`) | — | Extra small captions |

All caption classes use `--line-height-relaxed`

**When to use captions:** Form labels, timestamps, metadata, badges, secondary information

## Semantic Usage Guide

| Context | Recommended class |
|---------|------------------|
| Page title | `heading-1` (only 1 per page) |
| Section heading | `heading-2` or `heading-3` |
| Card title | `heading-4` or `heading-5` |
| Section intro | `subtitle-regular-m` or `subtitle-semi-bold-m` |
| Main content | `body-regular-m` |
| Emphasis in content | `body-semi-bold-m` |
| Quotes / references | `body-italic-m` |
| Form labels | `caption-semi-bold-l` |
| Timestamps / metadata | `caption-regular-m` |
| Tags / badges | `caption-regular-s` or `caption-semi-bold-s` |

## Caption vs Body Small

- **Caption** → Labels, timestamps, metadata, badges, secondary info
- **Body S/XS** → Compact readable content, dense table data, footnotes with paragraphs

## Subtitle vs Body Large

- **Subtitle** → Section introductions, group labels, support text
- **Body L/XL** → Article leads, highlighted content, important quotes

## HTML Reset

Mercury resets `h1`..`h6` and `p` elements (font, margin, padding, color all unset). Always apply typography classes explicitly
