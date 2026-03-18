# Color System

How to define a complete, accessible color system for a design system

## Design Principles

- **Accessible:** WCAG-compliant contrast ratios by default
- **Flexible:** Adapts to multiple brands via token aliasing
- **Automatic:** Dark/light mode handled by tokens — no manual switching in components

## Functional Color Categories

Organize colors into 4 functional categories:

| Category | Description | Token infix | Examples |
|----------|-------------|-------------|---------|
| **Primary** | Brand colors, CTAs, interactive elements | `*-primary-*` | Main button bg, link color, focus ring |
| **Neutral** | Standard text, borders, surfaces, icons | `*-neutral-*` | Body text, dividers, input borders |
| **Feedback** | Error (red), success (green), warning (yellow) | `*-error-*`, `*-success-*`, `*-warning-*` | Validation messages, status indicators |
| **Surface** | Background layers and elevation | `accent-surface-*` | Page bg, cards, dropdowns, dialogs |

## Token Categories (by CSS Property)

**Critical rule:** Always match the token category to the CSS property it applies to. Never cross categories

| CSS property | Token category | Pattern | Example |
|-------------|----------------|---------|---------|
| `color` (text) | `text` | `--color-text-{sub}-{state}` | `--color-text-neutral-default` |
| `background`, `background-color` | `accent` | `--color-accent-{sub}-{state}` | `--color-accent-primary-default` |
| `border`, `border-color`, `outline` | `border` | `--color-border-{sub}-{state}` | `--color-border-neutral-default` |
| Icon `color` / `fill` | `icon` | `--color-icon-{sub}-{state}` | `--color-icon-neutral-default` |

**Never cross categories:**
- Don't use `--color-text-*` for borders or backgrounds
- Don't use `--color-border-*` for text or backgrounds
- Don't use `--color-accent-*` for text color
- Don't use `--color-text-*` for icon fills — use `--color-icon-*`

This separation ensures that each CSS property can be independently themed and that dark/light mode inversions work correctly (text and backgrounds need opposite adjustments)

## Interaction States

Every token subcategory supports these states:

| State | Suffix | When to use |
|-------|--------|-------------|
| Default | `-default` | Base state, no interaction |
| Hover | `-hover` | Cursor over element (desktop only) |
| Pressed | `-pressed` | Active click / tap |
| Focused | `-focused` | Keyboard focus (typically borders/outlines only) |
| Disabled | `-disabled` | Element not interactive |
| On-default | `-on-default` | Content color ON the default-state surface |
| On-hover | `-on-hover` | Content color ON the hover-state surface |
| On-pressed | `-on-pressed` | Content color ON the pressed-state surface |

The DS CSS handles interaction state styling automatically through its classes. Consuming apps should not write custom `:hover`, `:focus`, or `:disabled` color styles

## Surfaces and Elevation

Define elevation levels for layered UIs:

| Token | Purpose |
|-------|---------|
| `--color-accent-surface-surface` | Base surface (page background) |
| `--color-accent-surface-elevation-1` | Cards, panels |
| `--color-accent-surface-elevation-2` | Dropdowns, popovers |
| `--color-accent-surface-elevation-3` | Dialogs, modals |

Higher elevation = closer to the user. In light mode, higher elevation is typically lighter or has subtle shadows. In dark mode, higher elevation is typically lighter (lifted surfaces)

Use a `utils/elevation` bundle for elevation CSS classes

## Semantic Color Usage Template

Define semantic usage for each token so consumers know which token to reach for:

| Purpose | Token | When to use |
|---------|-------|-------------|
| **Primary text** | `--color-text-neutral-default` | All standard text |
| **Secondary text** | `--color-text-neutral-disabled` | Less important, muted text |
| **Action text** | `--color-text-primary-default` | Links, primary actions |
| **Text on colored bg** | `--color-text-neutral-on-text` | White/black text on accent backgrounds |
| **Primary CTA bg** | `--color-accent-primary-default` | Primary button background |
| **Standard border** | `--color-border-neutral-default` | Dividers, input borders |
| **Focus ring** | `--color-border-primary-focused` | Keyboard focus indicator |
| **Error text** | `--color-text-error-default` | Validation error messages |
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

Define notification-specific tokens:

| Token | Purpose |
|-------|---------|
| `--color-accent-toast-error` | Error notification background |
| `--color-accent-toast-success` | Success notification background |
| `--color-accent-toast-warning` | Warning notification background |
| `--color-accent-toast-info` | Info notification background |

## Dark / Light Mode Token Inversion

The same token name produces different values per mode. Guidelines for defining inversions:

- **Text:** In dark mode, default text should be light (high contrast against dark surfaces)
- **Surfaces:** In dark mode, base surface is dark; elevated surfaces are progressively lighter
- **Primary accent:** May need to shift hue slightly for contrast (e.g., lighter blue in dark mode)
- **Feedback colors:** Error/success/warning may need lighter or more saturated variants in dark mode for readability
- **Disabled states:** Should remain visually muted in both modes (often the same mid-tone value)

Set the mode via CSS class on `<html>` (e.g., `class="dark"` or `class="light"`). Components never contain theme logic — all switching happens at the scope/theme layer

## Defining Your Color Palette

When creating a new DS, collect:

1. **Primary color family** — Brand hue with 8-10 shades (50 lightest → 900 darkest)
2. **Neutral color family** — Gray palette with 8-10 shades (may be tinted with brand hue)
3. **Feedback colors** — Red (error), green (success), yellow/amber (warning) with 3-5 shades each
4. **Surface colors** — Background values for each elevation level per mode (light + dark)

Map these primitives to semantic tokens across all 4 categories (text, accent, border, icon) and all relevant states. This mapping lives in `scope/theme-{brand}.css` for multi-brand DSs or in `base/base.css` for single-brand DSs
