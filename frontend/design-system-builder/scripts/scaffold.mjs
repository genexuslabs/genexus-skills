#!/usr/bin/env node

/**
 * Design System Scaffolding Script
 *
 * Creates the complete directory structure for a Chameleon-based DS
 * following the ITCSS-inspired layer architecture.
 *
 * Usage:
 *   node scaffold.mjs --name <ds-name> --dir <target-dir> --brands <brand1,brand2>
 *
 * Example:
 *   node scaffold.mjs --name acme-ds --dir ./output --brands acme,partner
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    name: { type: "string", short: "n" },
    dir: { type: "string", short: "d" },
    brands: { type: "string", short: "b" },
    help: { type: "boolean", short: "h" },
  },
});

if (values.help || !values.name || !values.dir) {
  console.log(`
Usage: node scaffold.mjs --name <ds-name> --dir <target-dir> [--brands <brand1,brand2>]

Options:
  --name, -n    Design system name (required)
  --dir, -d     Target directory (required)
  --brands, -b  Comma-separated brand names (default: DS name)
  --help, -h    Show this help
`);
  process.exit(values.help ? 0 : 1);
}

const dsName = values.name;
const targetDir = resolve(values.dir);
const brands = values.brands
  ? values.brands.split(",").map((b) => b.trim())
  : [dsName];

const dsRoot = join(targetDir, dsName);

// ── Directory creation ──────────────────────────────────────────────

const directories = [
  "tokens",
  "resets",
  "base",
  "scope",
  "chameleon",
  "components",
  "utils",
  "docs",
  "docs/references",
  "docs/references/installation",
  "docs/references/bundles",
  "docs/references/bundles/base",
  "docs/references/bundles/scope",
  "docs/references/bundles/chameleon",
  "docs/references/bundles/components",
  "docs/references/bundles/utils",
  "docs/references/bundles/resets",
  "docs/references/design-foundations",
];

// ── File templates ──────────────────────────────────────────────────

function primitiveTokens() {
  return JSON.stringify(
    {
      $description: `Tier 1 primitive tokens for ${dsName}`,
      color: {
        blue: {
          50: { $type: "color", $value: "#eff6ff", $description: "Blue 50" },
          100: { $type: "color", $value: "#dbeafe", $description: "Blue 100" },
          200: { $type: "color", $value: "#bfdbfe", $description: "Blue 200" },
          300: { $type: "color", $value: "#93c5fd", $description: "Blue 300" },
          400: { $type: "color", $value: "#60a5fa", $description: "Blue 400" },
          500: { $type: "color", $value: "#3b82f6", $description: "Blue 500" },
          600: { $type: "color", $value: "#2563eb", $description: "Blue 600" },
          700: { $type: "color", $value: "#1d4ed8", $description: "Blue 700" },
          800: { $type: "color", $value: "#1e40af", $description: "Blue 800" },
          900: { $type: "color", $value: "#1e3a8a", $description: "Blue 900" },
        },
        gray: {
          50: { $type: "color", $value: "#f9fafb", $description: "Gray 50" },
          100: { $type: "color", $value: "#f3f4f6", $description: "Gray 100" },
          200: { $type: "color", $value: "#e5e7eb", $description: "Gray 200" },
          300: { $type: "color", $value: "#d1d5db", $description: "Gray 300" },
          400: { $type: "color", $value: "#9ca3af", $description: "Gray 400" },
          500: { $type: "color", $value: "#6b7280", $description: "Gray 500" },
          600: { $type: "color", $value: "#4b5563", $description: "Gray 600" },
          700: { $type: "color", $value: "#374151", $description: "Gray 700" },
          800: { $type: "color", $value: "#1f2937", $description: "Gray 800" },
          900: { $type: "color", $value: "#111827", $description: "Gray 900" },
        },
        red: {
          50: { $type: "color", $value: "#fef2f2", $description: "Red 50" },
          100: { $type: "color", $value: "#fee2e2", $description: "Red 100" },
          300: { $type: "color", $value: "#fca5a5", $description: "Red 300" },
          500: { $type: "color", $value: "#ef4444", $description: "Red 500" },
          600: { $type: "color", $value: "#dc2626", $description: "Red 600" },
          700: { $type: "color", $value: "#b91c1c", $description: "Red 700" },
          900: { $type: "color", $value: "#7f1d1d", $description: "Red 900" },
        },
        green: {
          50: { $type: "color", $value: "#f0fdf4", $description: "Green 50" },
          100: { $type: "color", $value: "#dcfce7", $description: "Green 100" },
          300: { $type: "color", $value: "#86efac", $description: "Green 300" },
          500: { $type: "color", $value: "#22c55e", $description: "Green 500" },
          600: { $type: "color", $value: "#16a34a", $description: "Green 600" },
          700: { $type: "color", $value: "#15803d", $description: "Green 700" },
          900: { $type: "color", $value: "#14532d", $description: "Green 900" },
        },
        yellow: {
          50: { $type: "color", $value: "#fefce8", $description: "Yellow 50" },
          100: { $type: "color", $value: "#fef9c3", $description: "Yellow 100" },
          300: { $type: "color", $value: "#fde047", $description: "Yellow 300" },
          500: { $type: "color", $value: "#eab308", $description: "Yellow 500" },
          600: { $type: "color", $value: "#ca8a04", $description: "Yellow 600" },
          700: { $type: "color", $value: "#a16207", $description: "Yellow 700" },
          900: { $type: "color", $value: "#713f12", $description: "Yellow 900" },
        },
        white: { $type: "color", $value: "#ffffff", $description: "White" },
        black: { $type: "color", $value: "#000000", $description: "Black" },
      },
      icon: {
        size: {
          xs: { $type: "dimension", $value: "12px", $description: "Icon extra small" },
          s: { $type: "dimension", $value: "14px", $description: "Icon small" },
          m: { $type: "dimension", $value: "16px", $description: "Icon medium" },
          l: { $type: "dimension", $value: "20px", $description: "Icon large" },
          xl: { $type: "dimension", $value: "24px", $description: "Icon extra large" },
          xxl: { $type: "dimension", $value: "32px", $description: "Icon extra extra large" },
        },
      },
      space: {
        0: { $type: "dimension", $value: "0px", $description: "No spacing" },
        1: { $type: "dimension", $value: "4px", $description: "4px spacing" },
        2: { $type: "dimension", $value: "8px", $description: "8px spacing" },
        3: { $type: "dimension", $value: "12px", $description: "12px spacing" },
        4: { $type: "dimension", $value: "16px", $description: "16px spacing" },
        6: { $type: "dimension", $value: "24px", $description: "24px spacing" },
        8: { $type: "dimension", $value: "32px", $description: "32px spacing" },
        12: {
          $type: "dimension",
          $value: "48px",
          $description: "48px spacing",
        },
        16: {
          $type: "dimension",
          $value: "64px",
          $description: "64px spacing",
        },
      },
      font: {
        size: {
          xs: {
            $type: "dimension",
            $value: "0.75rem",
            $description: "Extra small text",
          },
          sm: {
            $type: "dimension",
            $value: "0.875rem",
            $description: "Small text",
          },
          base: {
            $type: "dimension",
            $value: "1rem",
            $description: "Base text",
          },
          lg: {
            $type: "dimension",
            $value: "1.125rem",
            $description: "Large text",
          },
          xl: {
            $type: "dimension",
            $value: "1.25rem",
            $description: "Extra large text",
          },
          "2xl": {
            $type: "dimension",
            $value: "1.5rem",
            $description: "2X large text",
          },
          "3xl": {
            $type: "dimension",
            $value: "1.875rem",
            $description: "3X large text",
          },
        },
        weight: {
          regular: {
            $type: "fontWeight",
            $value: 400,
            $description: "Regular weight",
          },
          medium: {
            $type: "fontWeight",
            $value: 500,
            $description: "Medium weight",
          },
          semibold: {
            $type: "fontWeight",
            $value: 600,
            $description: "Semibold weight",
          },
          bold: {
            $type: "fontWeight",
            $value: 700,
            $description: "Bold weight",
          },
        },
      },
      border: {
        radius: {
          none: {
            $type: "dimension",
            $value: "0px",
            $description: "No radius",
          },
          sm: {
            $type: "dimension",
            $value: "4px",
            $description: "Small radius",
          },
          md: {
            $type: "dimension",
            $value: "8px",
            $description: "Medium radius",
          },
          lg: {
            $type: "dimension",
            $value: "12px",
            $description: "Large radius",
          },
          full: {
            $type: "dimension",
            $value: "9999px",
            $description: "Full radius (pill)",
          },
        },
        width: {
          thin: {
            $type: "dimension",
            $value: "1px",
            $description: "Thin border",
          },
          medium: {
            $type: "dimension",
            $value: "2px",
            $description: "Medium border",
          },
          focus: {
            $type: "dimension",
            $value: "2px",
            $description: "Focus ring width",
          },
        },
      },
    },
    null,
    2
  );
}

function semanticTokens() {
  return JSON.stringify(
    {
      $description: `Tier 2 semantic tokens for ${dsName}`,
      color: {
        text: {
          "neutral-default": { $type: "color", $value: "{color.gray.900}", $description: "Default body text" },
          "neutral-hover": { $type: "color", $value: "{color.gray.800}", $description: "Text on hover" },
          "neutral-disabled": { $type: "color", $value: "{color.gray.400}", $description: "Disabled text" },
          "neutral-on-text": { $type: "color", $value: "{color.white}", $description: "Text on colored backgrounds" },
          "primary-default": { $type: "color", $value: "{color.blue.500}", $description: "Primary action text / links" },
          "error-default": { $type: "color", $value: "{color.red.700}", $description: "Error message text" },
          "success-default": { $type: "color", $value: "{color.green.700}", $description: "Success message text" },
          "warning-default": { $type: "color", $value: "{color.yellow.700}", $description: "Warning message text" },
        },
        accent: {
          "primary-default": { $type: "color", $value: "{color.blue.500}", $description: "Primary CTA background" },
          "primary-hover": { $type: "color", $value: "{color.blue.600}", $description: "Primary hover background" },
          "primary-pressed": { $type: "color", $value: "{color.blue.700}", $description: "Primary pressed background" },
          "neutral-default": { $type: "color", $value: "{color.gray.400}", $description: "Neutral accent" },
          "neutral-disabled": { $type: "color", $value: "{color.gray.200}", $description: "Disabled background" },
          "error-default": { $type: "color", $value: "{color.red.500}", $description: "Error background" },
          "success-default": { $type: "color", $value: "{color.green.500}", $description: "Success background" },
          "warning-default": { $type: "color", $value: "{color.yellow.500}", $description: "Warning background" },
          "surface-surface": { $type: "color", $value: "{color.white}", $description: "Base page surface" },
          "surface-elevation-1": { $type: "color", $value: "{color.white}", $description: "Cards, panels" },
          "surface-elevation-2": { $type: "color", $value: "{color.white}", $description: "Dropdowns, popovers" },
          "surface-elevation-3": { $type: "color", $value: "{color.white}", $description: "Dialogs, modals" },
        },
        border: {
          "neutral-default": { $type: "color", $value: "{color.gray.300}", $description: "Standard borders" },
          "neutral-hover": { $type: "color", $value: "{color.gray.900}", $description: "Border on hover" },
          "neutral-disabled": { $type: "color", $value: "{color.gray.300}", $description: "Disabled borders" },
          "primary-default": { $type: "color", $value: "{color.blue.500}", $description: "Primary accent border" },
          "primary-focused": { $type: "color", $value: "{color.blue.700}", $description: "Focus ring" },
          "error-default": { $type: "color", $value: "{color.red.500}", $description: "Error border" },
          "success-default": { $type: "color", $value: "{color.green.500}", $description: "Success border" },
        },
        icon: {
          "neutral-default": { $type: "color", $value: "{color.gray.900}", $description: "Standard icon color" },
          "neutral-disabled": { $type: "color", $value: "{color.gray.400}", $description: "Disabled icon" },
          "primary-default": { $type: "color", $value: "{color.blue.500}", $description: "Primary accent icon" },
          "error-default": { $type: "color", $value: "{color.red.700}", $description: "Error icon" },
          "success-default": { $type: "color", $value: "{color.green.700}", $description: "Success icon" },
          "warning-default": { $type: "color", $value: "{color.yellow.700}", $description: "Warning icon" },
        },
      },
      spacing: {
        padding: {
          none: { $type: "dimension", $value: "0px", $description: "No padding" },
          xxs: { $type: "dimension", $value: "2px", $description: "Extra extra small padding" },
          xs: { $type: "dimension", $value: "{space.1}", $description: "Extra small padding" },
          s: { $type: "dimension", $value: "6px", $description: "Small padding" },
          m: { $type: "dimension", $value: "{space.2}", $description: "Medium padding" },
          l: { $type: "dimension", $value: "{space.3}", $description: "Large padding" },
          xl: { $type: "dimension", $value: "{space.4}", $description: "Extra large padding" },
          xxl: { $type: "dimension", $value: "{space.6}", $description: "Extra extra large padding" },
          xxxl: { $type: "dimension", $value: "{space.8}", $description: "Extra extra extra large padding" },
        },
        gap: {
          none: { $type: "dimension", $value: "0px", $description: "No gap" },
          xxs: { $type: "dimension", $value: "2px", $description: "Extra extra small gap" },
          xs: { $type: "dimension", $value: "{space.1}", $description: "Extra small gap" },
          s: { $type: "dimension", $value: "6px", $description: "Small gap" },
          m: { $type: "dimension", $value: "{space.2}", $description: "Medium gap" },
          l: { $type: "dimension", $value: "{space.3}", $description: "Large gap" },
          xl: { $type: "dimension", $value: "{space.4}", $description: "Extra large gap" },
          xxl: { $type: "dimension", $value: "{space.6}", $description: "Extra extra large gap" },
          xxxl: { $type: "dimension", $value: "{space.8}", $description: "Extra extra extra large gap" },
        },
      },
      icon: {
        xs: { $type: "dimension", $value: "{icon.size.xs}", $description: "Icon extra small (12px)" },
        s: { $type: "dimension", $value: "{icon.size.s}", $description: "Icon small (14px)" },
        m: { $type: "dimension", $value: "{icon.size.m}", $description: "Icon medium (16px)" },
        l: { $type: "dimension", $value: "{icon.size.l}", $description: "Icon large (20px)" },
        xl: { $type: "dimension", $value: "{icon.size.xl}", $description: "Icon extra large (24px)" },
        xxl: { $type: "dimension", $value: "{icon.size.xxl}", $description: "Icon extra extra large (32px)" },
      },
      control: {
        "block-size": {
          $type: "dimension",
          $value: "{space.8}",
          $description: "Default control height (32px min for touch targets)",
        },
        "border-radius": {
          $type: "dimension",
          $value: "{border.radius.md}",
          $description: "Default control border radius",
        },
        "border-width": {
          $type: "dimension",
          $value: "{border.width.thin}",
          $description: "Default control border width",
        },
      },
    },
    null,
    2
  );
}

function componentTokens() {
  return JSON.stringify(
    {
      $description: `Tier 3 component tokens for ${dsName}`,
      button: {
        primary: {
          bg: { $type: "color", $value: "{color.accent.primary-default}", $description: "Button primary background" },
          "bg-hover": { $type: "color", $value: "{color.accent.primary-hover}", $description: "Button primary hover" },
          "bg-pressed": { $type: "color", $value: "{color.accent.primary-pressed}", $description: "Button primary pressed" },
          text: { $type: "color", $value: "{color.text.neutral-on-text}", $description: "Button primary text" },
        },
        secondary: {
          bg: { $type: "color", $value: "transparent", $description: "Button secondary background (bordered)" },
          border: { $type: "color", $value: "{color.border.neutral-default}", $description: "Button secondary border" },
          text: { $type: "color", $value: "{color.text.neutral-default}", $description: "Button secondary text" },
        },
        tertiary: {
          bg: { $type: "color", $value: "transparent", $description: "Button tertiary background (text only)" },
          text: { $type: "color", $value: "{color.text.primary-default}", $description: "Button tertiary text" },
        },
        destructive: {
          bg: { $type: "color", $value: "{color.accent.error-default}", $description: "Button destructive background" },
          text: { $type: "color", $value: "{color.text.neutral-on-text}", $description: "Button destructive text" },
        },
        success: {
          bg: { $type: "color", $value: "{color.accent.success-default}", $description: "Button success background" },
          text: { $type: "color", $value: "{color.text.neutral-on-text}", $description: "Button success text" },
        },
      },
    },
    null,
    2
  );
}

function boxSizingReset() {
  return `*,
*::before,
*::after {
  box-sizing: border-box;
}
`;
}

function baseCss() {
  // Base CSS is now generated by generate-base.mjs from a token JSON input.
  // This placeholder provides a minimal fallback for scaffolding only.
  // After scaffolding, run:
  //   node <skill-path>/scripts/generate-base.mjs --input <tokens.json> --output <ds-root>/base/base.css
  return `/*
 * Base Layer — Placeholder
 *
 * This file should be generated using generate-base.mjs with your token JSON.
 * Run: node <skill-path>/scripts/generate-base.mjs --input <tokens.json> --output base.css
 *
 * The script produces:
 *   1. @font-face declarations
 *   2. :root — Primitive tokens
 *   3. :root, :root.light — Semantic tokens (light theme)
 *   4. :root.dark — Semantic tokens (dark theme)
 *   5. body — CSS resets
 *   6. @media (prefers-reduced-motion) — Zero durations
 */

:root {
  /* ── Placeholder primitives — replace via generate-base.mjs ── */
  --font-family-primary: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;

  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-normal: 1.5;

  --duration-fast: 150ms;
  --duration-normal: 200ms;
}

body {
  display: grid;
  grid-template-rows: 1fr;
  min-block-size: 100dvh;
  font-family: var(--font-family-primary);
  font-size: 14px;
  line-height: var(--line-height-normal);
  margin: 0;
}
`;
}

function themeCss(brand) {
  return `.theme-${brand}-light {
  /* ── Text Tokens ── */
  --color-text-neutral-default: var(--color-gray-900);
  --color-text-neutral-hover: var(--color-gray-800);
  --color-text-neutral-disabled: var(--color-gray-400);
  --color-text-neutral-on-text: var(--color-white);
  --color-text-primary-default: var(--color-blue-500);
  --color-text-error-default: var(--color-red-700);
  --color-text-success-default: var(--color-green-700);
  --color-text-warning-default: var(--color-yellow-700);

  /* ── Accent Tokens (backgrounds/fills) ── */
  --color-accent-primary-default: var(--color-blue-500);
  --color-accent-primary-hover: var(--color-blue-600);
  --color-accent-primary-pressed: var(--color-blue-700);
  --color-accent-neutral-default: var(--color-gray-400);
  --color-accent-neutral-disabled: var(--color-gray-200);
  --color-accent-error-default: var(--color-red-500);
  --color-accent-success-default: var(--color-green-500);
  --color-accent-warning-default: var(--color-yellow-500);
  --color-accent-surface-surface: var(--color-white);
  --color-accent-surface-elevation-1: var(--color-white);
  --color-accent-surface-elevation-2: var(--color-white);
  --color-accent-surface-elevation-3: var(--color-white);

  /* ── Border Tokens ── */
  --color-border-neutral-default: var(--color-gray-300);
  --color-border-neutral-hover: var(--color-gray-900);
  --color-border-neutral-disabled: var(--color-gray-300);
  --color-border-primary-default: var(--color-blue-500);
  --color-border-primary-focused: var(--color-blue-700);
  --color-border-error-default: var(--color-red-500);
  --color-border-success-default: var(--color-green-500);

  /* ── Icon Tokens ── */
  --color-icon-neutral-default: var(--color-gray-900);
  --color-icon-neutral-disabled: var(--color-gray-400);
  --color-icon-primary-default: var(--color-blue-500);
  --color-icon-error-default: var(--color-red-700);
  --color-icon-success-default: var(--color-green-700);
  --color-icon-warning-default: var(--color-yellow-700);

  /* ── Controls ── */
  --control-block-size: var(--space-8);
  --control-border-radius: var(--border-radius-md);
  --control-border-width: var(--border-width-thin);
}

.theme-${brand}-dark {
  /* ── Text Tokens ── */
  --color-text-neutral-default: var(--color-gray-50);
  --color-text-neutral-hover: var(--color-gray-100);
  --color-text-neutral-disabled: var(--color-gray-600);
  --color-text-neutral-on-text: var(--color-gray-900);
  --color-text-primary-default: var(--color-blue-300);
  --color-text-error-default: var(--color-red-300);
  --color-text-success-default: var(--color-green-300);
  --color-text-warning-default: var(--color-yellow-300);

  /* ── Accent Tokens (backgrounds/fills) ── */
  --color-accent-primary-default: var(--color-blue-400);
  --color-accent-primary-hover: var(--color-blue-300);
  --color-accent-primary-pressed: var(--color-blue-200);
  --color-accent-neutral-default: var(--color-gray-500);
  --color-accent-neutral-disabled: var(--color-gray-700);
  --color-accent-error-default: var(--color-red-600);
  --color-accent-success-default: var(--color-green-600);
  --color-accent-warning-default: var(--color-yellow-600);
  --color-accent-surface-surface: var(--color-gray-900);
  --color-accent-surface-elevation-1: var(--color-gray-800);
  --color-accent-surface-elevation-2: var(--color-gray-700);
  --color-accent-surface-elevation-3: var(--color-gray-600);

  /* ── Border Tokens ── */
  --color-border-neutral-default: var(--color-gray-600);
  --color-border-neutral-hover: var(--color-gray-50);
  --color-border-neutral-disabled: var(--color-gray-700);
  --color-border-primary-default: var(--color-blue-400);
  --color-border-primary-focused: var(--color-blue-300);
  --color-border-error-default: var(--color-red-600);
  --color-border-success-default: var(--color-green-600);

  /* ── Icon Tokens ── */
  --color-icon-neutral-default: var(--color-gray-50);
  --color-icon-neutral-disabled: var(--color-gray-600);
  --color-icon-primary-default: var(--color-blue-300);
  --color-icon-error-default: var(--color-red-300);
  --color-icon-success-default: var(--color-green-300);
  --color-icon-warning-default: var(--color-yellow-300);

  /* ── Controls ── */
  --control-block-size: var(--space-8);
  --control-border-radius: var(--border-radius-md);
  --control-border-width: var(--border-width-thin);
}
`;
}

function scrollbarCss() {
  return `/* Chameleon scrollbar overrides */
::-webkit-scrollbar {
  inline-size: 8px;
  block-size: 8px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-border-default);
  border-radius: var(--border-radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-secondary);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-default) transparent;
}
`;
}

function packageJson() {
  return JSON.stringify(
    {
      name: `@${dsName}/design-system`,
      version: "0.1.0",
      description: `${dsName} Design System — Enterprise-quality CSS Design System based on Chameleon`,
      license: "UNLICENSED",
      type: "module",
      files: [
        "tokens/",
        "resets/",
        "base/",
        "scope/",
        "chameleon/",
        "components/",
        "utils/",
        "docs/",
      ],
      keywords: ["design-system", "css", "chameleon", "tokens"],
    },
    null,
    2
  );
}

function changelog() {
  const date = new Date().toISOString().split("T")[0];
  return `# Changelog

All notable changes to this design system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - ${date}

### Added
- Initial scaffold with 3-tier DTCG token architecture
- Base layer with primitive CSS custom properties
${brands.map((b) => `- Theme: ${b} (light + dark)`).join("\n")}
- Resets: box-sizing
- Chameleon scrollbar overrides
`;
}

function skillMd() {
  const titleName = dsName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return `---
name: ${dsName}-vibe-code
description: "Styles UIs with the ${titleName} Design System using ch-theme, getBundles, and ${titleName} CSS classes. Use when building interfaces with ${titleName}, when the user asks for ${titleName} Design System styling, or when adding ${titleName} styling on top of Chameleon components."
---

# ${titleName} vibe-code

Apply ${titleName} Design System styling to UIs built with Chameleon. This skill covers only ${titleName}-specific usage: \`ch-theme\`, \`getBundles\`, and which CSS bundles/classes to use. Use the Chameleon skill (when available) to build the component tree; then use this skill to add ${titleName} styling.

## Workflow

1. **Build the UI with Chameleon**
   Use the Chameleon skill or Chameleon patterns to implement the component tree for the requested framework (React, Angular, Stencil, Lit, etc.).

2. **Add ${titleName} styling**
   - Import \`getBundles\` from \`@${dsName}/design-system/bundles.js\`.
   - Call \`getBundles(bundleNames, basePath)\` with the bundles required by the components you use (see [Component → bundles table](references/component-bundles-table.md)).
   - Wrap the root of the view with \`<ch-theme [model]="bundles">\` (or the framework equivalent: \`model={bundles}\`, \`[model]="bundles"\`, etc.).
   - Apply ${titleName} CSS classes to elements as documented in the bundle docs (see [Bundles index](references/bundles-index.md)).

## ch-theme and getBundles

- **getBundles(bundleNames, basePath)**
  Returns the theme model for those CSS bundles. \`bundleNames\` is an array of bundle names (e.g. \`["components/button", "components/edit", "utils/form"]\`). \`basePath\` is the public path where ${titleName} CSS files are served (e.g. \`/assets/css/\`).

- **ch-theme**
  Chameleon component that injects the CSS from the model. Place it at the root of the tree that uses ${titleName} styles. Example:

  \`\`\`ts
  import { getBundles } from "@${dsName}/design-system/bundles.js";

  const bundles = getBundles(
    ["components/button", "components/edit", "utils/form"],
    "/assets/css/"
  );
  \`\`\`

  Template (concept): \`<ch-theme [model]="bundles"></ch-theme> … rest of UI …\`

## Which bundles to request

- Use the **Component → ${titleName} CSS bundles** table to see which bundles apply to each Chameleon component or native element you use.
- Request every bundle that appears in the table for the components in your view.

Table: [Component → bundles table](references/component-bundles-table.md)

## Bundle and class details

- For the list of bundles and links to each bundle's markdown (classes and "Applies to"): [Bundles index](references/bundles-index.md).
- Open the relevant bundle \`.md\` when you need exact class names and which elements they apply to.
- The CSS of each bundle is in the same folder as its \`.md\`; see [Bundles index](references/bundles-index.md) for concrete rules.

## Dark / light mode

${titleName} supports dark and light themes. Set the class on \`<html>\`:
- Light: \`class="theme-{brand}-light"\`
- Dark: \`class="theme-{brand}-dark"\`

Available brands: ${brands.map((b) => `\`${b}\``).join(", ")}

## Theme variants

${titleName} implements ${brands.length} brand variant${brands.length > 1 ? "s" : ""}:

${brands.map((b) => `- **${b}** — \`scope/theme-${b}.css\` defines CSS variables for this brand (light + dark)`).join("\n")}

See [Themes and variants](references/themes-and-variants.md) for details.

## Design context

*(Add Figma links, design decisions, or important context here as the DS evolves)*

## Design Foundations

${titleName} defines a complete design language:

- [Color system](references/design-foundations/color-system.md) — Color categories, states, elevation
- [Typography system](references/design-foundations/typography-system.md) — Roles, classes, line-heights
- [Spacing system](references/design-foundations/spacing-system.md) — Grid, tokens, border-radius
- [Icons system](references/design-foundations/icons-system.md) — Sizes, classes, icon colors
- [Design patterns](references/design-foundations/design-patterns.md) — Buttons, forms, hierarchy
- [Figma token mapping](references/design-foundations/figma-token-mapping.md) — Figma → token translation

## Do's and Don'ts

**MUST DO:**
- Load ALL required bundles via \`getBundles\`
- Apply CSS classes on every styled element
- Use tokens — never raw hex/px
- Match token category to CSS property (text tokens for \`color\`, accent for \`background-color\`, etc.)
- Use form utilities for every form
- Use button classes for all buttons/links
- Use spacing tokens — never \`em\`/\`rem\` for spacing
- Use typography classes — never set font-size/line-height manually

**MUST NOT DO:**
- Never wrap children inside \`<ch-theme>\` — always a sibling
- Never write custom CSS for states the DS handles (hover, focus, disabled)
- Never cross token categories
- Never use primitive tokens in code — use semantic tokens
- Never use more than one primary button per page/view

## References (one level)

- [Component → ${titleName} CSS bundles table](references/component-bundles-table.md) — which bundles to pass to \`getBundles\` per component.
- [Bundles index](references/bundles-index.md) — links to each bundle's doc and CSS (same folder). Each bundle folder contains the \`.md\` (classes and usage) and the \`.css\` (implementation).
- [Design foundations](references/design-foundations/) — Color, typography, spacing, icons, patterns, Figma mapping.
- [Themes and variants](references/themes-and-variants.md) — available brands and how to switch.
- [Installation by framework](references/installation/README.md) — React, Angular, Vanilla/Lit.

## Installation

Install Chameleon and ${titleName}:

\`\`\`bash
npm install @${dsName}/design-system @genexus/chameleon-controls-library
\`\`\`

Then follow the guide for your framework: [Installation index](references/installation/README.md)
`;
}

function componentBundlesTable() {
  const titleName = dsName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return `# Component → ${titleName} CSS Bundles

| Component | ${titleName} CSS bundles |
|---|---|
| \`button\` / \`a\` | \`components/button\` |
| \`ch-image\` (icon) | \`components/icon\` |
| \`ch-edit\` | \`utils/form\` |
| \`ch-checkbox\` | \`utils/form\` |
| \`ch-combo-box-render\` | \`utils/form\` |
| *Layout utilities* | \`utils/spacing\`, \`utils/layout\` |
| *Typography* | \`utils/typography\` |
| *Elevation (cards)* | \`utils/elevation\` |
| *Forms* | \`utils/form\` |

> Bundle docs are in \`references/bundles/{category}/{name}.md\`.
`;
}

function bundlesIndex() {
  return `# Bundles Index

## Base
- [base.md](bundles/base/base.md) | [base.css](bundles/base/base.css)

## Resets
- [box-sizing.md](bundles/resets/box-sizing.md) | [box-sizing.css](bundles/resets/box-sizing.css)

## Scope
${brands.map((b) => `- [theme-${b}.md](bundles/scope/theme-${b}.md) | [theme-${b}.css](bundles/scope/theme-${b}.css)`).join("\n")}

## Chameleon
- [scrollbar.md](bundles/chameleon/scrollbar.md) | [scrollbar.css](bundles/chameleon/scrollbar.css)

## Components
- [button.md](bundles/components/button.md) | [button.css](bundles/components/button.css)
- [icon.md](bundles/components/icon.md) | [icon.css](bundles/components/icon.css)

## Utilities
- [typography.md](bundles/utils/typography.md) | [typography.css](bundles/utils/typography.css)
- [form.md](bundles/utils/form.md) | [form.css](bundles/utils/form.css)
- [elevation.md](bundles/utils/elevation.md) | [elevation.css](bundles/utils/elevation.css)
`;
}

function themesAndVariants() {
  return `# Themes and Variants

## Available Brands

${brands
  .map(
    (b) => `### ${b}
- Light: \`.theme-${b}-light\`
- Dark: \`.theme-${b}-dark\``
  )
  .join("\n\n")}

## Usage

Apply the theme class to the root element or any container:

\`\`\`html
<html class="theme-${brands[0]}-light">
  <!-- Your app -->
</html>
\`\`\`

## Dark Mode Switching

Toggle between \`.theme-{brand}-light\` and \`.theme-{brand}-dark\` on the root element.

Auto-detect fallback:

\`\`\`css
@media (prefers-color-scheme: dark) {
  :root {
    /* Apply dark semantic tokens */
  }
}
\`\`\`
`;
}

function installationReadme() {
  const titleName = dsName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return `# Installation

## Install

\`\`\`bash
npm install @${dsName}/design-system @genexus/chameleon-controls-library
\`\`\`

## Framework Setup

### React (Vite)

1. Add ${titleName} CSS files to your \`public/\` directory (or configure your bundler to serve them).
2. Import and configure \`ch-theme\`:

\`\`\`tsx
import { defineCustomElements } from "@genexus/chameleon-controls-library/loader";
import { getBundles } from "@${dsName}/design-system/bundles.js";

defineCustomElements(window);

function App() {
  const bundles = getBundles(
    ["components/button", "utils/form"],
    "/ds/"
  );

  return (
    <ch-theme model={bundles}>
      <button className="button-primary">Click</button>
    </ch-theme>
  );
}
\`\`\`

3. Set theme class on \`<html>\`: \`class="theme-${brands[0]}-light"\`

### Angular

1. Install dependencies and add ${titleName} CSS assets to \`angular.json\`.
2. Use \`ch-theme\` with property binding:

\`\`\`ts
import { getBundles } from "@${dsName}/design-system/bundles.js";

@Component({
  template: \\\`
    <ch-theme [model]="bundles">
      <button class="button-primary">Click</button>
    </ch-theme>
  \\\`
})
export class AppComponent {
  bundles = getBundles(["components/button", "utils/form"], "/ds/");
}
\`\`\`

### Vanilla / Lit / Kasstor

\`\`\`html
<script type="module">
  import { defineCustomElements } from "@genexus/chameleon-controls-library/loader";
  import { getBundles } from "@${dsName}/design-system/bundles.js";

  defineCustomElements(window);

  const theme = document.querySelector("ch-theme");
  theme.model = getBundles(["components/button", "utils/form"], "/ds/");
</script>

<html class="theme-${brands[0]}-light">
  <ch-theme>
    <button class="button-primary">Click</button>
  </ch-theme>
</html>
\`\`\`

## After Installation

- See [Component → bundles table](../component-bundles-table.md) for which bundles to use per component.
- See [Bundles index](../bundles-index.md) for class details per bundle.
- See [Themes and variants](../themes-and-variants.md) for brand/theme configuration.
`;
}

function baseBundleMd() {
  return `# Base

Bundle name: \`"base/base"\`

Implementation: [base.css](./base.css)

## Description

Contains Tier 1 primitive tokens as CSS custom properties on \`:root\`, \`@font-face\` declarations, and body defaults. This is a Tier 1 critical bundle — should be inlined in \`<head>\` for first-paint optimization.

## CSS Custom Properties

All primitive tokens are defined here:
- \`--color-{name}-{shade}\` — Color primitives
- \`--space-{n}\` — Spacing scale
- \`--font-size-{name}\` — Font size scale
- \`--font-weight-{name}\` — Font weights
- \`--border-radius-{name}\` — Border radius scale
- \`--border-width-{name}\` — Border width scale
- \`--font-family-primary\` — Primary font stack
- \`--font-family-mono\` — Monospace font stack
- \`--line-height-{name}\` — Line height scale
- \`--timing-{name}\` — Animation timing

## Reduced Motion

Includes \`@media (prefers-reduced-motion: reduce)\` that sets all timing tokens to \`0ms\`.
`;
}

function resetBundleMd() {
  return `# Box Sizing Reset

Bundle name: \`"resets/box-sizing"\`

Implementation: [box-sizing.css](./box-sizing.css)

## Description

Universal box-sizing reset. Applies \`box-sizing: border-box\` to all elements. This is a Tier 1 critical bundle — should be inlined in \`<head>\`.
`;
}

function scrollbarBundleMd() {
  return `# Scrollbar

Bundle name: \`"chameleon/scrollbar"\`

Implementation: [scrollbar.css](./scrollbar.css)

## Description

Custom scrollbar styling for Chameleon web components. Applies to all scrollable elements.

## Classes

No explicit classes — styles are applied via pseudo-elements (\`::-webkit-scrollbar\`) and the \`scrollbar-width\`/\`scrollbar-color\` properties for Firefox.

## Tokens consumed

- \`--color-border-default\` — Scrollbar thumb color
- \`--color-text-secondary\` — Scrollbar thumb hover color
- \`--border-radius-full\` — Scrollbar thumb border radius
`;
}

function scopeBundleMd(brand) {
  return `# Theme: ${brand}

Bundle name: \`"scope/theme-${brand}"\`

Implementation: [theme-${brand}.css](./theme-${brand}.css)

## Description

Tier 2 semantic tokens for the **${brand}** brand. Defines CSS variables for both light and dark modes.

## Classes

### \`.theme-${brand}-light\`

Applies to: \`<html>\` or any container element

Light mode semantic tokens for the ${brand} brand. Maps semantic token names to primitive values for light backgrounds.

### \`.theme-${brand}-dark\`

Applies to: \`<html>\` or any container element

Dark mode semantic tokens for the ${brand} brand. Maps semantic token names to primitive values for dark backgrounds.

## Semantic tokens defined

- \`--color-text-*\` — Text colors by category (neutral, primary, error, success, warning) with states
- \`--color-accent-*\` — Background/fill colors by category with states + surface elevation tokens
- \`--color-border-*\` — Border colors by category with states
- \`--color-icon-*\` — Icon colors by category with states
- \`--control-*\` — Control dimensions (block-size, border-radius, border-width)
`;
}

// ── New CSS generators ──────────────────────────────────────────────

function buttonCss() {
  return `/* =======================================================
   components/button — 5 variants + modifiers
   ======================================================= */

/* 1. STRUCTURE */
:where(button, a).button-primary,
:where(button, a).button-secondary,
:where(button, a).button-tertiary,
:where(button, a).button-primary-destructive,
:where(button, a).button-primary-success {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-block: var(--spacing-padding-m);
  padding-inline: var(--spacing-padding-xl);
  block-size: var(--control-block-size);
  border: var(--control-border-width) solid transparent;
  border-radius: var(--control-border-radius);
  cursor: pointer;
  text-decoration: none;
  touch-action: manipulation;
}

/* 3. TYPOGRAPHY */
:where(button, a).button-primary,
:where(button, a).button-secondary,
:where(button, a).button-tertiary,
:where(button, a).button-primary-destructive,
:where(button, a).button-primary-success {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-compact);
}

/* 2. DECORATION — Primary */
.button-primary {
  background-color: var(--color-accent-primary-default);
  color: var(--color-text-neutral-on-text);
}

/* 4. STATES — Primary */
.button-primary:hover { background-color: var(--color-accent-primary-hover); }
.button-primary:active { background-color: var(--color-accent-primary-pressed); }
.button-primary:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: 2px;
}
.button-primary:disabled { opacity: 0.4; pointer-events: none; }

/* 2. DECORATION — Secondary */
.button-secondary {
  background-color: transparent;
  border-color: var(--color-border-neutral-default);
  color: var(--color-text-neutral-default);
}

/* 4. STATES — Secondary */
.button-secondary:hover { border-color: var(--color-border-neutral-hover); }
.button-secondary:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: 2px;
}
.button-secondary:disabled { opacity: 0.4; pointer-events: none; }

/* 2. DECORATION — Tertiary */
.button-tertiary {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-text-primary-default);
}

/* 4. STATES — Tertiary */
.button-tertiary:hover { background-color: var(--color-accent-neutral-disabled); }
.button-tertiary:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: 2px;
}
.button-tertiary:disabled { opacity: 0.4; pointer-events: none; }

/* 2. DECORATION — Destructive */
.button-primary-destructive {
  background-color: var(--color-accent-error-default);
  color: var(--color-text-neutral-on-text);
}

/* 4. STATES — Destructive */
.button-primary-destructive:hover { opacity: 0.9; }
.button-primary-destructive:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-error-default);
  outline-offset: 2px;
}
.button-primary-destructive:disabled { opacity: 0.4; pointer-events: none; }

/* 2. DECORATION — Success */
.button-primary-success {
  background-color: var(--color-accent-success-default);
  color: var(--color-text-neutral-on-text);
}

/* 4. STATES — Success */
.button-primary-success:hover { opacity: 0.9; }
.button-primary-success:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-success-default);
  outline-offset: 2px;
}
.button-primary-success:disabled { opacity: 0.4; pointer-events: none; }

/* 5. VARIANTS — Modifiers */
.button-icon-only {
  padding: calc((var(--control-block-size) - 2 * var(--control-border-width) - var(--icon-m)) / 2);
  inline-size: var(--control-block-size);
}

.button-icon-and-text {
  gap: var(--spacing-gap-xs);
}
`;
}

function formCss() {
  return `/* =======================================================
   utils/form — Form layout utilities
   ======================================================= */

.field-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-gap-xl);
}

.field-group-inline {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-gap-m);
}

.field-group-justified-end {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-gap-m);
}

.field-group-justified-start {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-gap-m);
}

.field {
  display: flex;
}

.field-block {
  flex-direction: column;
  gap: var(--spacing-gap-xs);
}

.field-inline {
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-gap-m);
}

.label {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-neutral-default);
}

.label-disabled {
  color: var(--color-text-neutral-disabled);
}

.input {
  block-size: var(--control-block-size);
  border: var(--control-border-width) solid var(--color-border-neutral-default);
  border-radius: var(--control-border-radius);
  padding-inline: var(--spacing-padding-l);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  color: var(--color-text-neutral-default);
  background-color: var(--color-accent-surface-surface);
}

.input:focus-visible {
  outline: var(--border-width-focus) solid var(--color-border-primary-focused);
  outline-offset: -1px;
}

.input:disabled {
  opacity: 0.4;
  pointer-events: none;
}
`;
}

function typographyCss() {
  return `/* =======================================================
   utils/typography — Typography utility classes
   ======================================================= */

/* ── Headings ── */
.heading-1 { font-family: var(--font-family-primary); font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); line-height: var(--line-height-compact); }
.heading-2 { font-family: var(--font-family-primary); font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); line-height: var(--line-height-compact); }
.heading-3 { font-family: var(--font-family-primary); font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); line-height: var(--line-height-compact); }
.heading-4 { font-family: var(--font-family-primary); font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); line-height: var(--line-height-compact); }
.heading-5 { font-family: var(--font-family-primary); font-size: var(--font-size-base); font-weight: var(--font-weight-bold); line-height: var(--line-height-compact); }
.heading-6 { font-family: var(--font-family-primary); font-size: var(--font-size-sm); font-weight: var(--font-weight-bold); line-height: var(--line-height-compact); }

/* ── Subtitles ── */
.subtitle-regular-xl { font-family: var(--font-family-primary); font-size: var(--font-size-xl); font-weight: var(--font-weight-regular); line-height: var(--line-height-normal); }
.subtitle-semi-bold-xl { font-family: var(--font-family-primary); font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); line-height: var(--line-height-normal); }
.subtitle-regular-l { font-family: var(--font-family-primary); font-size: var(--font-size-lg); font-weight: var(--font-weight-regular); line-height: var(--line-height-normal); }
.subtitle-semi-bold-l { font-family: var(--font-family-primary); font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); line-height: var(--line-height-normal); }
.subtitle-regular-m { font-family: var(--font-family-primary); font-size: var(--font-size-base); font-weight: var(--font-weight-regular); line-height: var(--line-height-normal); }
.subtitle-semi-bold-m { font-family: var(--font-family-primary); font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); line-height: var(--line-height-normal); }
.subtitle-regular-s { font-family: var(--font-family-primary); font-size: var(--font-size-sm); font-weight: var(--font-weight-regular); line-height: var(--line-height-compact); }
.subtitle-semi-bold-s { font-family: var(--font-family-primary); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); line-height: var(--line-height-compact); }
.subtitle-regular-xs { font-family: var(--font-family-primary); font-size: var(--font-size-xs); font-weight: var(--font-weight-regular); line-height: var(--line-height-compact); }
.subtitle-semi-bold-xs { font-family: var(--font-family-primary); font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); line-height: var(--line-height-compact); }

/* ── Body ── */
.body-regular-xl { font-family: var(--font-family-primary); font-size: var(--font-size-lg); font-weight: var(--font-weight-regular); line-height: var(--line-height-relaxed); }
.body-semi-bold-xl { font-family: var(--font-family-primary); font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); line-height: var(--line-height-relaxed); }
.body-italic-xl { font-family: var(--font-family-primary); font-size: var(--font-size-lg); font-weight: var(--font-weight-regular); font-style: italic; line-height: var(--line-height-relaxed); }
.body-regular-l { font-family: var(--font-family-primary); font-size: var(--font-size-base); font-weight: var(--font-weight-regular); line-height: var(--line-height-relaxed); }
.body-semi-bold-l { font-family: var(--font-family-primary); font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); line-height: var(--line-height-relaxed); }
.body-italic-l { font-family: var(--font-family-primary); font-size: var(--font-size-base); font-weight: var(--font-weight-regular); font-style: italic; line-height: var(--line-height-relaxed); }
.body-regular-m { font-family: var(--font-family-primary); font-size: var(--font-size-sm); font-weight: var(--font-weight-regular); line-height: var(--line-height-relaxed); }
.body-semi-bold-m { font-family: var(--font-family-primary); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); line-height: var(--line-height-relaxed); }
.body-italic-m { font-family: var(--font-family-primary); font-size: var(--font-size-sm); font-weight: var(--font-weight-regular); font-style: italic; line-height: var(--line-height-relaxed); }
.body-regular-s { font-family: var(--font-family-primary); font-size: var(--font-size-xs); font-weight: var(--font-weight-regular); line-height: var(--line-height-relaxed); }
.body-semi-bold-s { font-family: var(--font-family-primary); font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); line-height: var(--line-height-relaxed); }
.body-italic-s { font-family: var(--font-family-primary); font-size: var(--font-size-xs); font-weight: var(--font-weight-regular); font-style: italic; line-height: var(--line-height-relaxed); }

/* ── Captions ── */
.caption-regular-l { font-family: var(--font-family-primary); font-size: 11px; font-weight: var(--font-weight-regular); line-height: var(--line-height-relaxed); }
.caption-semi-bold-l { font-family: var(--font-family-primary); font-size: 11px; font-weight: var(--font-weight-semibold); line-height: var(--line-height-relaxed); }
.caption-regular-m { font-family: var(--font-family-primary); font-size: 10px; font-weight: var(--font-weight-regular); line-height: var(--line-height-relaxed); }
.caption-semi-bold-m { font-family: var(--font-family-primary); font-size: 10px; font-weight: var(--font-weight-semibold); line-height: var(--line-height-relaxed); }
.caption-regular-s { font-family: var(--font-family-primary); font-size: 8px; font-weight: var(--font-weight-regular); line-height: var(--line-height-relaxed); }
.caption-semi-bold-s { font-family: var(--font-family-primary); font-size: 8px; font-weight: var(--font-weight-semibold); line-height: var(--line-height-relaxed); }

/* ── HTML Reset ── */
:where(h1, h2, h3, h4, h5, h6, p) {
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
}
`;
}

function elevationCss() {
  return `/* =======================================================
   utils/elevation — Elevation utility classes
   ======================================================= */

.elevation-1 {
  background-color: var(--color-accent-surface-elevation-1);
}

.elevation-2 {
  background-color: var(--color-accent-surface-elevation-2);
}

.elevation-3 {
  background-color: var(--color-accent-surface-elevation-3);
}
`;
}

function iconCss() {
  return `/* =======================================================
   components/icon — Icon size classes
   ======================================================= */

/* icon-{size} — for ch-image components */
.icon-xs { --ch-image-size: var(--icon-xs); }
.icon-s { --ch-image-size: var(--icon-s); }
.icon-m { --ch-image-size: var(--icon-m); }
.icon-l { --ch-image-size: var(--icon-l); }
.icon-xl { --ch-image-size: var(--icon-xl); }
.icon-xxl { --ch-image-size: var(--icon-xxl); }

/* icon-size-{size} — for standalone icon elements */
.icon-size-xs { inline-size: var(--icon-xs); block-size: var(--icon-xs); background: var(--icon-path) no-repeat center / contain; }
.icon-size-s { inline-size: var(--icon-s); block-size: var(--icon-s); background: var(--icon-path) no-repeat center / contain; }
.icon-size-m { inline-size: var(--icon-m); block-size: var(--icon-m); background: var(--icon-path) no-repeat center / contain; }
.icon-size-l { inline-size: var(--icon-l); block-size: var(--icon-l); background: var(--icon-path) no-repeat center / contain; }
.icon-size-xl { inline-size: var(--icon-xl); block-size: var(--icon-xl); background: var(--icon-path) no-repeat center / contain; }
.icon-size-xxl { inline-size: var(--icon-xxl); block-size: var(--icon-xxl); background: var(--icon-path) no-repeat center / contain; }

/* icon-and-text — inline icon + text layout */
.icon-and-text {
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  gap: var(--spacing-gap-m);
}
`;
}

function buttonBundleMd() {
  return `# Button

Bundle name: \`"components/button"\`

Implementation: [button.css](./button.css)

## Classes

### \`button-primary\`

Applies to: \`button\`, \`a\`

Primary action button — solid fill, highest visual weight. **Only one primary button per page/view.**

### \`button-secondary\`

Applies to: \`button\`, \`a\`

Complementary action — bordered, medium visual weight.

### \`button-tertiary\`

Applies to: \`button\`, \`a\`

Low-priority action — text only, lowest visual weight.

### \`button-primary-destructive\`

Applies to: \`button\`, \`a\`

Dangerous action (delete, remove) — error color fill.

### \`button-primary-success\`

Applies to: \`button\`, \`a\`

Positive action (approve) — success color fill.

### \`button-icon-only\`

Modifier. Squares the button for icon-only use. Must have accessible name.

### \`button-icon-and-text\`

Modifier. Adds gap between icon and text inside the button.

## States

All states handled automatically: hover, active, focus-visible, disabled.
`;
}

function formBundleMd() {
  return `# Form

Bundle name: \`"utils/form"\`

Implementation: [form.css](./form.css)

## Classes

### \`field-group\`

Vertical group of fields with consistent spacing.

### \`field-group-inline\`

Horizontal group (e.g., button row).

### \`field-group-justified-end\` / \`field-group-justified-start\`

Horizontal group aligned right / left.

### \`field\`

Base wrapper for label + control.

### \`field-block\`

Label above, control below (vertical layout).

### \`field-inline\`

Label left, control right (horizontal layout).

### \`label\`

Form label styling.

### \`label-disabled\`

Dimmed label for disabled fields.

### \`input\`

Applies to: \`ch-edit\`

Standard input styling with border, radius, and focus ring.
`;
}

function typographyBundleMd() {
  return `# Typography

Bundle name: \`"utils/typography"\`

Implementation: [typography.css](./typography.css)

## Classes

### Headings

\`heading-1\` through \`heading-6\` — Bold, tight line-height. Only one \`heading-1\` per page.

### Subtitles

\`subtitle-{weight}-{size}\` — weight: regular, semi-bold. Size: xs, s, m, l, xl.

### Body

\`body-{weight}-{size}\` — weight: regular, semi-bold, italic. Size: xs, s, m, l, xl. \`body-regular-m\` is the standard body text.

### Captions

\`caption-{weight}-{size}\` — weight: regular, semi-bold. Size: s, m, l.

## HTML Reset

Resets h1-h6 and p elements (margin, padding, font, color all unset).
`;
}

function elevationBundleMd() {
  return `# Elevation

Bundle name: \`"utils/elevation"\`

Implementation: [elevation.css](./elevation.css)

## Classes

### \`elevation-1\`

Cards, panels — first elevation level above surface.

### \`elevation-2\`

Dropdowns, popovers — second elevation level.

### \`elevation-3\`

Dialogs, modals — highest elevation level.
`;
}

function iconBundleMd() {
  return `# Icon

Bundle name: \`"components/icon"\`

Implementation: [icon.css](./icon.css)

## Classes

### \`icon-{size}\`

Applies to: \`ch-image\`

Sets \`--ch-image-size\`. Sizes: xs (12px), s (14px), m (16px), l (20px), xl (24px), xxl (32px).

### \`icon-size-{size}\`

Applies to: any element

Sets explicit dimensions and renders icon via \`--icon-path\` background.

### \`icon-and-text\`

Inline grid layout for icon + text side by side with gap.
`;
}

function designFoundationTemplate(name, dsTitle) {
  const templates = {
    "color-system": `# ${dsTitle} Color System

## Color Categories

| Category | Description | Token infix |
|----------|-------------|-------------|
| **Primary** | Brand colors, CTAs, interactive elements | \`*-primary-*\` |
| **Neutral** | Standard text, borders, surfaces, icons | \`*-neutral-*\` |
| **Feedback** | Error, success, warning | \`*-error-*\`, \`*-success-*\`, \`*-warning-*\` |
| **Surface** | Background layers and elevation | \`accent-surface-*\` |

## Token Categories by CSS Property

| CSS property | Token category | Pattern |
|-------------|----------------|---------|
| \`color\` (text) | \`text\` | \`--color-text-{sub}-{state}\` |
| \`background-color\` | \`accent\` | \`--color-accent-{sub}-{state}\` |
| \`border-color\` | \`border\` | \`--color-border-{sub}-{state}\` |
| Icon \`color\`/\`fill\` | \`icon\` | \`--color-icon-{sub}-{state}\` |

**Never cross categories** — text tokens for \`color\`, accent tokens for \`background-color\`, border tokens for \`border-color\`, icon tokens for icon fills.

## Interaction States

default, hover, pressed, focused (borders only), disabled, on-default, on-hover, on-pressed.

## Surfaces and Elevation

| Token | Purpose |
|-------|---------|
| \`--color-accent-surface-surface\` | Page background |
| \`--color-accent-surface-elevation-1\` | Cards, panels |
| \`--color-accent-surface-elevation-2\` | Dropdowns, popovers |
| \`--color-accent-surface-elevation-3\` | Dialogs, modals |

## Dark / Light Mode

Set \`class="theme-{brand}-light"\` or \`class="theme-{brand}-dark"\` on \`<html>\`. All tokens switch automatically.
`,
    "typography-system": `# ${dsTitle} Typography System

## Roles

| Role | Font family | Example |
|------|-------------|---------|
| Heading | \`--font-family-primary\` | Page titles, section headings |
| Subtitle | \`--font-family-primary\` | Section intros, group labels |
| Body | \`--font-family-primary\` | Paragraphs, form values |
| Caption | \`--font-family-primary\` | Labels, metadata, timestamps |

## Class Pattern

\`{role}-{weight}-{size}\` — e.g., \`heading-1\`, \`body-regular-m\`, \`caption-semi-bold-l\`

## Headings

\`heading-1\` (largest) through \`heading-6\` (smallest). Only one \`heading-1\` per page.

## Body

\`body-regular-m\` is the standard body text.

## Typography Rules

- Only one heading-1 per page
- Maintain heading order (don't skip levels)
- Never set font-size or line-height manually when a class applies
`,
    "spacing-system": `# ${dsTitle} Spacing System

## Grid Base

4-point grid — all values are multiples of 4.

## Spacing Tokens

### Padding (\`--spacing-padding-*\`)

| Token | Value |
|-------|-------|
| \`--spacing-padding-xxs\` | 2px |
| \`--spacing-padding-xs\` | 4px |
| \`--spacing-padding-s\` | 6px |
| \`--spacing-padding-m\` | 8px |
| \`--spacing-padding-l\` | 12px |
| \`--spacing-padding-xl\` | 16px |
| \`--spacing-padding-xxl\` | 24px |
| \`--spacing-padding-xxxl\` | 32px |

### Gap (\`--spacing-gap-*\`)

Same scale as padding tokens. Use for flex/grid \`gap\`.

## Border Radius

\`--border-radius-sm\` (4px), \`--border-radius-md\` (8px), \`--border-radius-lg\` (12px), \`--border-radius-full\` (pill).

## Rules

- Never use \`em\` or \`rem\` for spacing — use tokens or px from the 4pt grid
- Padding tokens can be used for margin and calc() too
`,
    "icons-system": `# ${dsTitle} Icons System

## Icon Size Tokens

| Token | Value |
|-------|-------|
| \`--icon-xs\` | 12px |
| \`--icon-s\` | 14px |
| \`--icon-m\` | 16px |
| \`--icon-l\` | 20px |
| \`--icon-xl\` | 24px |
| \`--icon-xxl\` | 32px |

## Classes (bundle: \`components/icon\`)

- \`icon-{size}\` for \`ch-image\` components
- \`icon-size-{size}\` for standalone elements
- \`icon-and-text\` for icon + text layouts

## Icon Colors

Use \`--color-icon-*\` tokens — never \`--color-text-*\` for icons.

## Touch Areas

Minimum 24px × 24px, recommended 44px × 44px for mobile.
`,
    "design-patterns": `# ${dsTitle} Design Patterns

## Buttons (bundle: \`components/button\`)

| Variant | Class | Purpose |
|---------|-------|---------|
| Primary | \`button-primary\` | Main action — only one per page |
| Secondary | \`button-secondary\` | Complementary action |
| Tertiary | \`button-tertiary\` | Low-priority action |
| Destructive | \`button-primary-destructive\` | Dangerous action |
| Success | \`button-primary-success\` | Positive action |

Modifiers: \`button-icon-only\`, \`button-icon-and-text\`

## Forms (bundle: \`utils/form\`)

Structure: \`field-group\` → \`field\` + \`field-block\` → \`label\` + \`ch-edit.input\`

## Typography Hierarchy

\`heading-1\` → \`heading-2/3\` → \`subtitle-*\` → \`body-regular-m\` → \`caption-*\`
`,
    "figma-token-mapping": `# ${dsTitle} Figma Token Mapping

## Color Translation

1. Identify CSS property → token category (text, accent, border, icon)
2. Determine subcategory (primary, neutral, error, success, warning, surface)
3. Match state (default, hover, pressed, focused, disabled)
4. Find closest token

## Typography

Map Figma font sizes to typography classes. Check font-weight mapping for your typeface.

## Spacing

Map raw px to closest \`--spacing-padding-*\` or \`--spacing-gap-*\` token.

## Rules

- Always use semantic tokens, never primitive tokens in code
- Never trust Figma font-weight literally — verify the DS mapping
`,
  };
  return templates[name] || `# ${dsTitle} ${name}\n\n*(Customize this document)*\n`;
}

// ── Main ────────────────────────────────────────────────────────────

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (await exists(dsRoot)) {
    console.error(`Error: Directory already exists: ${dsRoot}`);
    console.error("Use a different name or remove the existing directory.");
    process.exit(1);
  }

  console.log(`Scaffolding Design System: ${dsName}`);
  console.log(`Target: ${dsRoot}`);
  console.log(`Brands: ${brands.join(", ")}`);
  console.log("");

  // Create directories
  for (const dir of directories) {
    const dirPath = join(dsRoot, dir);
    await mkdir(dirPath, { recursive: true });
    console.log(`  mkdir ${dir}/`);
  }

  const titleName = dsName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Write files
  const files = [
    // Tokens
    ["tokens/primitive.json", primitiveTokens()],
    ["tokens/semantic.json", semanticTokens()],
    ["tokens/component.json", componentTokens()],

    // Resets
    ["resets/box-sizing.css", boxSizingReset()],

    // Base
    ["base/base.css", baseCss()],

    // Scope (one per brand)
    ...brands.map((b) => [`scope/theme-${b}.css`, themeCss(b)]),

    // Chameleon
    ["chameleon/scrollbar.css", scrollbarCss()],

    // Root files
    ["package.json", packageJson()],
    ["CHANGELOG.md", changelog()],

    // Docs — Inner vibe-code skill
    ["docs/SKILL.md", skillMd()],
    ["docs/references/component-bundles-table.md", componentBundlesTable()],
    ["docs/references/bundles-index.md", bundlesIndex()],
    ["docs/references/themes-and-variants.md", themesAndVariants()],
    ["docs/references/installation/README.md", installationReadme()],

    // New CSS files — components and utilities
    ["components/button.css", buttonCss()],
    ["components/icon.css", iconCss()],
    ["utils/typography.css", typographyCss()],
    ["utils/form.css", formCss()],
    ["utils/elevation.css", elevationCss()],

    // Bundle docs — co-located .md for each CSS bundle
    ["docs/references/bundles/base/base.md", baseBundleMd()],
    ["docs/references/bundles/resets/box-sizing.md", resetBundleMd()],
    ["docs/references/bundles/chameleon/scrollbar.md", scrollbarBundleMd()],
    ["docs/references/bundles/components/button.md", buttonBundleMd()],
    ["docs/references/bundles/components/icon.md", iconBundleMd()],
    ["docs/references/bundles/utils/typography.md", typographyBundleMd()],
    ["docs/references/bundles/utils/form.md", formBundleMd()],
    ["docs/references/bundles/utils/elevation.md", elevationBundleMd()],
    ...brands.map((b) => [
      `docs/references/bundles/scope/theme-${b}.md`,
      scopeBundleMd(b),
    ]),

    // Design foundations templates for inner skill
    ...["color-system", "typography-system", "spacing-system", "icons-system", "design-patterns", "figma-token-mapping"].map(
      (name) => [`docs/references/design-foundations/${name}.md`, designFoundationTemplate(name, titleName)]
    ),
  ];

  for (const [filePath, content] of files) {
    const fullPath = join(dsRoot, filePath);
    await writeFile(fullPath, content, "utf-8");
    console.log(`  write ${filePath}`);
  }

  console.log("");
  console.log(`Done! Design System scaffolded at: ${dsRoot}`);
  console.log("");
  console.log("Next steps:");
  console.log("  1. Customize tokens in tokens/*.json");
  console.log("  2. Update base/base.css with your color palette");
  console.log("  3. Adjust scope/theme-*.css for each brand");
  console.log("  4. Add components in components/ (one .css + one .md each)");
  console.log("  5. Add utilities in utils/");
}

main().catch((err) => {
  console.error("Scaffold failed:", err.message);
  process.exit(1);
});
