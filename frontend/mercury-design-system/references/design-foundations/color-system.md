# Color System

Mercury's color system is designed for accessibility, scalability, and automatic dark/light mode support

## Design Principles

- **Accessible:** WCAG-compliant contrast ratios
- **Flexible:** Adapts to Mercury and Globant theme variants
- **Automatic:** Dark/light mode handled by tokens — no manual switching

## Color Categories

Mercury organizes colors into 4 functional categories:

| Category | Description | Token prefix |
|----------|-------------|-------------|
| **Primary** | Brand colors, CTAs, interactive elements | `*-primary-*` |
| **Neutral** | Standard text, borders, surfaces, icons | `*-neutral-*` |
| **Feedback** | Error (red), success (green), warning (yellow) | `*-error-*`, `*-success-*`, `*-warning-*` |
| **Surface** | Background layers and elevation | `accent-surface-*` |

## Token Categories (by CSS property)

**Critical rule:** Always match the token category to the CSS property it applies to

| CSS property | Token category | Pattern | Example |
|-------------|----------------|---------|---------|
| `color` (text) | `text` | `--color-text-{sub}-{state}` | `--color-text-neutral-default` |
| `background`, `background-color` | `accent` | `--color-accent-{sub}-{state}` | `--color-accent-primary-default` |
| `border`, `border-color`, `outline` | `border` | `--color-border-{sub}-{state}` | `--color-border-neutral-default` |
| Icon `color` / `fill` | `icon` | `--color-icon-{sub}-{state}` | `--color-icon-neutral-default` |

**Never cross categories** — don't use `--color-text-*` for borders or `--color-border-*` for backgrounds

## Interaction States

Every token subcategory supports these states:

| State | Suffix | When to use |
|-------|--------|-------------|
| Default | `-default` | Base state, no interaction |
| Hover | `-hover` | Cursor over element (desktop only) |
| Pressed | `-pressed` | Active click / tap |
| Focused | `-focused` | Keyboard focus (borders only) |
| Disabled | `-disabled` | Element not interactive |
| On-default | `-on-default` | Content color ON the default state |
| On-hover | `-on-hover` | Content color ON the hover state |
| On-pressed | `-on-pressed` | Content color ON the pressed state |

Mercury handles interaction state styling automatically through its CSS classes. Do not write custom `:hover`, `:focus`, or `:disabled` styles

## Surfaces and Elevation

Mercury provides 3 elevation levels for layered UIs:

| Token | Purpose |
|-------|---------|
| `--color-accent-surface-surface` | Base surface (page background) |
| `--color-accent-surface-elevation-1` | Cards, panels |
| `--color-accent-surface-elevation-2` | Dropdowns, popovers |
| `--color-accent-surface-elevation-3` | Dialogs, modals |

Use the `utils/elevation` bundle for elevation CSS classes

## Semantic Color Usage

| Purpose | Token | When to use |
|---------|-------|-------------|
| **Primary text** | `--color-text-neutral-default` | All standard text |
| **Secondary text** | `--color-text-neutral-disabled` | Less important, muted text |
| **Action text** | `--color-text-primary-default` | Links, primary actions |
| **Text on colored bg** | `--color-text-neutral-on-text` | White/black text on accent backgrounds |
| **Primary CTA bg** | `--color-accent-primary-default` | Primary button background |
| **Standard border** | `--color-border-neutral-default` | Dividers, input borders |
| **Focus ring** | `--color-border-primary-focused` | Keyboard focus indicator |
| **Error text** | `--color-text-error-default` | Validation errors |
| **Error border** | `--color-border-error-default` | Invalid input borders |
| **Success border** | `--color-border-success-default` | Valid input borders |

## Primary vs Neutral Decision Guide

**Use Primary when:**
- It's a CTA or main action
- It needs maximum user attention
- It indicates the recommended/happy path

**Use Neutral when:**
- It's standard content
- No special emphasis needed
- It's part of base UI (borders, dividers, secondary text)

## Toast / Notification Colors

| Token | Purpose |
|-------|---------|
| `--color-accent-toast-error` | Error notification background |
| `--color-accent-toast-success` | Success notification background |
| `--color-accent-toast-warning` | Warning notification background |
| `--color-accent-toast-info` | Info notification background |

## Theme Variants: Mercury vs Globant

The two variants share the same token names but resolve to different color primitives:

| Aspect | Mercury (default) | Globant |
|--------|-------------------|---------|
| Primary color family | **Azure (blue)** — `#0072F8` | **Avocado (green)** — `#749519` |
| Dark mode primary | Azure — `#5BA7FF` | Olive — `#C3E01A` |
| Neutral palette | Blue-tinted grays (`#2D3A48`, `#9DA9B6`) | Pure grays (`#3B3B3B`, `#A9A9A9`) |
| Feedback colors | Identical across both variants | Identical across both variants |

**How to detect the variant from a design:** Look at the primary action color (buttons, links, focus rings). Blue → Mercury. Green → Globant. Also look at neutral colors — blue-tinted grays confirm Mercury, pure grays confirm Globant

For exact hex-to-token mapping for both variants, see [Figma token mapping](figma-token-mapping.md)

## Dark / Light Mode

Mercury tokens automatically adjust between modes. The same token name produces different hex values:

- Set `class="dark"` or `class="light"` on `<html>`
- No additional code needed — tokens handle the switch
- Test both modes to verify contrast and readability
