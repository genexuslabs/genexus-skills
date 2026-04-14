# Design Tokens Extraction Guide

## When to Use

Use this guide when extracting design tokens from UI images to create the global `:root` CSS custom properties. When no images are provided, use the default tokens below

## Default tokens (no images)

When no UI images are provided, use the values shown in each section below as-is. They form a neutral, clean, professional theme. Use Material Icons (outlined) as the default icon library

## Process (with images)

Analyze the **first image** (typically the home/main screen) and extract:

### 1. Color Palette

Backgrounds, text colors, accents, borders, states:

```css
--color-bg-primary: #FFFFFF;
--color-bg-secondary: #F5F5F5;
--color-text-primary: #1A1A1A;
--color-text-secondary: #666666;
--color-accent: #1976D2;
--color-border: #E0E0E0;
```

### 2. Typography

Font families, size scale, weights, line heights:

```css
--font-family-primary: 'Inter', sans-serif;
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-md: 1.25rem;
--font-size-lg: 1.5rem;
--font-size-xl: 2rem;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 3. Spacing Scale

Base unit and consistent scale:

```css
--spacing-2xs: 4px;
--spacing-xs: 8px;
--spacing-sm: 12px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

### 4. Visual Properties

Border radius, shadows, transitions:

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 50%;
--radius-pill: 9999px;
--shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
```

### 5. Icons

Identify the icon library from the screenshots by analyzing icon shapes and style (e.g., Material Icons, Font Awesome, Lucide). List all distinct icons observed

Check whether icons appear in **both outlined and filled (solid) variants** — e.g., the same icon shown as an outline in one state and solid-filled in another. If both variants are present, both font families must be imported

```
Library: [identified from screenshots]
Variants needed: [outlined, filled, or both]
Icons (outlined): [list observed icons]
Icons (filled):   [list observed icons]
```

Import **all** required variants in the global stylesheet, using the correct CDN URL for the identified library

### 6. Layout

Content width, header height, grid gaps:

```css
--content-max-width: 1200px;
--header-height: 64px;
```

### 7. Component-Level Patterns

Identify recurring UI elements and document their token composition. These are not new tokens — they describe how existing tokens combine for common components:

```css
/* Buttons */
--btn-padding: var(--spacing-xs) var(--spacing-md);
--btn-radius: var(--radius-pill);       /* or --radius-md */
--btn-font-weight: var(--font-weight-semibold);

/* Cards */
--card-padding: var(--spacing-md);
--card-radius: var(--radius-md);
--card-shadow: var(--shadow-sm);

/* Form inputs */
--input-padding: var(--spacing-xs) var(--spacing-sm);
--input-radius: var(--radius-sm);
--input-border: 1px solid var(--color-border);
```

Look for: button variants (primary, secondary, ghost), card styles, input fields, badges, tags, and any other element that appears on multiple pages. These patterns are used as **style reference** during the image-to-component procedure for consistency

## Rules

- **With images**: derive from actual image analysis — don't use generic defaults
- **Without images**: use the example values in each section as default tokens
- **Use semantic names** — `--color-accent`, not `--blue`
- **Cover all visible values** — scan every section for unique colors, sizes, spacing
- **Cross-check with subsequent images** — if later images reveal new tokens, add them to the global set
