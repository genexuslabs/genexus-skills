# Typography System

How to define a complete typography system for a design system

> **Note:** The size values in this guide are recommended ranges. Each DS defines exact values within these ranges based on its brand and design requirements (e.g., a DS might set `heading-1` at 40px within the suggested 36-40px range)

## Typography Roles

Organize typography into 4 roles:

| Role | Purpose | Font family | Example usage |
|------|---------|-------------|---------------|
| **Heading** | Page/section titles | Header family | Page title, section heading |
| **Subtitle** | Section introductions, support text | Header family | Category labels, group titles |
| **Body** | Main reading content | Body family | Paragraphs, form values, table data |
| **Caption** | Labels, metadata, secondary info | Body family | Form labels, timestamps, badges |

## Class Naming Convention

Pattern: `{role}-{weight}-{size}`

- **Role:** `heading`, `subtitle`, `body`, `caption`
- **Weight:** `regular`, `semi-bold`, `italic` (italic typically body-only)
- **Size:** `xs`, `s`, `m`, `l`, `xl` (headings use `1`..`6`)

Examples: `heading-1`, `subtitle-regular-m`, `body-semi-bold-l`, `caption-regular-s`

## Font Families

Define two font family tokens:

| Role | CSS variable | Used by |
|------|-------------|---------|
| Header family | `var(--font-family-header)` | `heading-*`, `subtitle-*` |
| Body family | `var(--font-family-body)` | `body-*`, `caption-*` |

These can be the same typeface or different typefaces depending on the brand

## Font Weight Scale

Define a weight scale with CSS variables:

| CSS variable | Typical value | Purpose |
|-------------|---------------|---------|
| `var(--font-style-regular)` | 300-400 | Standard body text |
| `var(--font-style-semi-bold)` | 500-600 | Emphasis, labels |
| `var(--font-style-bold)` | 600-700 | Headings, strong emphasis |

**Figma font-weight discrepancy:** Figma may display font-weights differently than production rendering. Document the exact mapping between Figma values and production values for each typeface. A common pattern is Figma showing +100 higher than production. Never copy Figma font-weight values literally — always use the DS's typography classes or CSS variables

## Line Height Tokens

Define 3 line-height tokens for different density needs:

| Token | Approximate ratio | Used by |
|-------|-------------------|---------|
| `var(--line-height-tight)` | ~1.2 | Headings, compact subtitles |
| `var(--line-height-regular)` | ~1.3 | Subtitles, medium content |
| `var(--line-height-relaxed)` | ~1.4 | Body text, captions (readability) |

## Headings

Always bold weight, tight line-height, header font family

| Class | Typical size | Usage |
|-------|-------------|-------|
| `heading-1` | 36-40px | Main page title (only 1 per page) |
| `heading-2` | 28-32px | Major section headings |
| `heading-3` | 24-28px | Subsection headings |
| `heading-4` | 20-24px | Content headings |
| `heading-5` | 18-20px | Minor headings |
| `heading-6` | 16-18px | Minimal headings |

Define font-size tokens for each: `--font-size-header-h1` through `--font-size-header-h6`

## Subtitles

Header font family. Available in `regular` and `semi-bold` weights

| Size | Typical px | Line-height | Usage |
|------|-----------|-------------|-------|
| `xl` | 18-20px | regular | Large section introductions |
| `l` | 16-18px | regular | Section introductions |
| `m` | 14-16px | regular | Group labels, support text |
| `s` | 13-15px | tight | Compact subtitles |
| `xs` | 12-14px | tight | Small subtitles |

## Body

Body font family. Available in `regular`, `semi-bold`, and `italic` weights

| Size | Typical px | Usage |
|------|-----------|-------|
| `xl` | 16-18px | Large body, leads |
| `l` | 14-16px | Medium-large body |
| `m` | 13-14px | **Standard body (most common — default reading text)** |
| `s` | 11-12px | Small body, dense tables |
| `xs` | 10-11px | Minimal body |

All body classes use relaxed line-height

## Captions

Body font family. Available in `regular` and `semi-bold` weights

| Size | Typical px | Usage |
|------|-----------|-------|
| `l` | 11px | Large captions, form labels |
| `m` | 10px | Standard captions, metadata |
| `s` | 8-9px | Small captions, badges |
| `xs` | 7-8px | Extra small captions |

All caption classes use relaxed line-height

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

The DS should reset `h1`..`h6` and `p` elements (unset font, margin, padding, color). Typography classes must always be applied explicitly — never rely on browser defaults

## Figma Text Style Mapping

When Figma text styles are available (from a Figma export or design context), typography classes MUST map 1:1 to those styles:

### Derivation Rules

1. **Convert Figma text style name to kebab-case** using the `{role}-{weight}-{size}` pattern
2. **Mapping examples:**

| Figma text style name | DS class |
|----------------------|----------|
| `Body/Regular/M` | `body-regular-m` |
| `Heading/H1` | `heading-1` |
| `Subtitle/SemiBold/L` | `subtitle-semi-bold-l` |
| `Caption/Regular/S` | `caption-regular-s` |

3. **If Figma has styles that don't match the 4-role system**, map to the closest role and document the decision. For example, "Label" in Figma → `caption-semi-bold-*` in the DS
4. **Every Figma text style must produce exactly one DS class.** No extra typography classes beyond what Figma defines
5. **No Figma text styles?** Use the standard scale defined in the sections above
6. **Font sizes and line-heights come from Figma.** Apply the font-weight discrepancy mapping (see [Figma Mapping](figma-mapping.md#the-figma-font-weight-discrepancy)) when translating weight values

## Typography Rules

- Only one `heading-1` per page
- Maintain heading order (don't skip from h2 to h5)
- Use the standard body class (typically `body-regular-m`) as the default text style
- Never set `font-size` or `line-height` manually when a typography class applies
- Typography utility classes go in the `utils/typography` bundle
