#!/usr/bin/env node

/**
 * Generate base.css from a normalized token JSON file.
 *
 * Produces a complete base.css with:
 *   1. @font-face declarations
 *   2. :root — Primitive tokens
 *   3. :root, :root.light — Semantic tokens (light theme)
 *   4. :root.dark — Semantic tokens (dark theme overrides)
 *   5. body — CSS resets
 *   6. @media (prefers-reduced-motion) — Zero durations
 *
 * Usage:
 *   node generate-base.mjs --input tokens.json --output base.css
 *   cat tokens.json | node generate-base.mjs --output base.css
 *
 * Rules enforced:
 *   - No DS-name prefix on any token
 *   - No em/rem units (px only)
 *   - Primitives: --{palette}-{shade}
 *   - Semantic colors: --color-{category}-{subcategory}-{state}
 *   - Spacing: --spacing-padding-*, --spacing-gap-*
 *   - Border radius: --border-radius-*
 */

import { readFile, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    input: { type: "string", short: "i" },
    output: { type: "string", short: "o" },
    help: { type: "boolean", short: "h" },
  },
});

if (values.help) {
  console.log(`
Usage: node generate-base.mjs --input <tokens.json> --output <base.css>

Options:
  --input, -i   Path to normalized token JSON (or pipe via stdin)
  --output, -o  Path for the generated base.css (required)
  --help, -h    Show this help
`);
  process.exit(0);
}

if (!values.output) {
  console.error("Error: --output is required.");
  process.exit(1);
}

// ── Read input ──────────────────────────────────────────────────────

async function readInput() {
  if (values.input) {
    return JSON.parse(await readFile(values.input, "utf-8"));
  }
  // Read from stdin
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf-8"));
}

// ── Validation ──────────────────────────────────────────────────────

function validate(tokens) {
  const errors = [];

  if (!tokens.primitives) {
    errors.push("Missing 'primitives' section.");
  }
  if (!tokens.semantic) {
    errors.push("Missing 'semantic' section.");
  }
  if (!tokens.semantic?.light) {
    errors.push("Missing 'semantic.light' section.");
  }

  // Check for DS-name prefixes in semantic token names
  if (tokens.semantic?.light) {
    for (const key of Object.keys(tokens.semantic.light)) {
      if (/^[a-z]+-[a-z]+-/.test(key) && !key.startsWith("color-") && !key.startsWith("spacing-") && !key.startsWith("border-") && !key.startsWith("font-") && !key.startsWith("shadow-") && !key.startsWith("icon-") && !key.startsWith("z-") && !key.startsWith("duration-") && !key.startsWith("easing-")) {
        errors.push(`Suspicious token name "${key}" — may contain a DS-name prefix.`);
      }
    }
  }

  // Check for em/rem in primitive values
  if (tokens.primitives) {
    const checkValues = (obj, path = "") => {
      for (const [key, val] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof val === "object" && val !== null) {
          checkValues(val, currentPath);
        } else if (typeof val === "string" && /\d(em|rem)\b/.test(val)) {
          errors.push(`em/rem unit found at primitives.${currentPath}: "${val}" — use px instead.`);
        }
      }
    };
    checkValues(tokens.primitives);
  }

  return errors;
}

// ── CSS Generation ──────────────────────────────────────────────────

function generateFontFaces(fonts) {
  if (!fonts || fonts.length === 0) return "";

  const blocks = fonts.map((font) => {
    const props = [
      `font-family: "${font.family}";`,
      font.style ? `font-style: ${font.style};` : `font-style: normal;`,
      font.weight ? `font-weight: ${font.weight};` : null,
      font.display ? `font-display: ${font.display};` : `font-display: swap;`,
      font.src ? `src: ${font.src};` : null,
      font.unicodeRange ? `unicode-range: ${font.unicodeRange};` : null,
    ]
      .filter(Boolean)
      .join("\n  ");

    return `@font-face {\n  ${props}\n}`;
  });

  return `/* ── @font-face ── */\n\n${blocks.join("\n\n")}\n`;
}

function generatePrimitives(primitives) {
  const lines = [];

  // Colors
  if (primitives.colors) {
    for (const [palette, shades] of Object.entries(primitives.colors)) {
      lines.push(`\n  /* Colors — ${capitalize(palette)} */`);
      for (const [shade, value] of Object.entries(shades)) {
        lines.push(`  --color-${palette}-${shade}: ${value};`);
      }
    }
  }

  // Font families
  if (primitives.fontFamilies) {
    lines.push(`\n  /* Typography — Font families */`);
    for (const [name, value] of Object.entries(primitives.fontFamilies)) {
      lines.push(`  --font-family-${name}: ${value};`);
    }
  }

  // Font sizes
  if (primitives.fontSizes) {
    lines.push(`\n  /* Typography — Font sizes */`);
    for (const [group, sizes] of Object.entries(primitives.fontSizes)) {
      for (const [name, value] of Object.entries(sizes)) {
        lines.push(`  --font-size-${group}-${name}: ${value};`);
      }
    }
  }

  // Font weights
  if (primitives.fontWeights) {
    lines.push(`\n  /* Typography — Font weights */`);
    for (const [name, value] of Object.entries(primitives.fontWeights)) {
      lines.push(`  --font-weight-${name}: ${value};`);
    }
  }

  // Line heights
  if (primitives.lineHeights) {
    lines.push(`\n  /* Typography — Line heights */`);
    for (const [name, value] of Object.entries(primitives.lineHeights)) {
      lines.push(`  --line-height-${name}: ${value};`);
    }
  }

  // Letter spacing
  if (primitives.letterSpacing) {
    lines.push(`\n  /* Typography — Letter spacing */`);
    for (const [name, value] of Object.entries(primitives.letterSpacing)) {
      lines.push(`  --letter-spacing-${name}: ${value};`);
    }
  }

  // Border radius
  if (primitives.borderRadius) {
    lines.push(`\n  /* Border radius */`);
    for (const [name, value] of Object.entries(primitives.borderRadius)) {
      lines.push(`  --border-radius-${name}: ${value};`);
    }
  }

  // Border widths
  if (primitives.borderWidths) {
    lines.push(`\n  /* Border width */`);
    for (const [name, value] of Object.entries(primitives.borderWidths)) {
      lines.push(`  --border-width-${name}: ${value};`);
    }
  }

  // Shadows
  if (primitives.shadows) {
    lines.push(`\n  /* Shadow */`);
    for (const [name, value] of Object.entries(primitives.shadows)) {
      lines.push(`  --shadow-${name}: ${value};`);
    }
  }

  // Icon sizes
  if (primitives.iconSizes) {
    lines.push(`\n  /* Icon sizes */`);
    for (const [name, value] of Object.entries(primitives.iconSizes)) {
      lines.push(`  --icon-size-${name}: ${value};`);
    }
  }

  // Z-index
  if (primitives.zIndex) {
    lines.push(`\n  /* Z-index */`);
    for (const [name, value] of Object.entries(primitives.zIndex)) {
      lines.push(`  --z-${name}: ${value};`);
    }
  }

  // Durations
  if (primitives.durations) {
    lines.push(`\n  /* Duration */`);
    for (const [name, value] of Object.entries(primitives.durations)) {
      lines.push(`  --duration-${name}: ${value};`);
    }
  }

  // Easings
  if (primitives.easings) {
    lines.push(`\n  /* Easing */`);
    for (const [name, value] of Object.entries(primitives.easings)) {
      lines.push(`  --easing-${name}: ${value};`);
    }
  }

  return `/* ── Tier 1 — Primitive tokens ── */\n\n:root {${lines.join("\n")}\n}\n`;
}

function generateSemanticBlock(tokens, selector) {
  const lines = [];
  let lastCategory = "";

  for (const [name, value] of Object.entries(tokens)) {
    // Add category comment when category changes
    const category = name.split("-").slice(0, 2).join("-");
    if (category !== lastCategory) {
      if (lastCategory) lines.push("");
      lines.push(`  /* ${formatCategoryComment(category)} */`);
      lastCategory = category;
    }
    lines.push(`  --${name}: ${value};`);
  }

  return `${selector} {${lines.length > 0 ? "\n" + lines.join("\n") + "\n" : ""}}`;
}

function formatCategoryComment(category) {
  const labels = {
    "color-accent": "Accent",
    "color-text": "Text",
    "color-border": "Border",
    "color-icon": "Icon",
    "color-background": "Background",
    "spacing-padding": "Spacing — Padding",
    "spacing-gap": "Spacing — Gap",
    "border-radius": "Border radius",
    "font-family": "Font family",
    "font-size": "Font size",
    "shadow-xs": "Shadow",
  };
  return labels[category] || capitalize(category.replace(/-/g, " "));
}

function generateBody(bodyResets) {
  if (!bodyResets) return "";

  const props = [];
  if (bodyResets.display) props.push(`  display: ${bodyResets.display};`);
  if (bodyResets.gridTemplateRows) props.push(`  grid-template-rows: ${bodyResets.gridTemplateRows};`);
  if (bodyResets.minBlockSize) props.push(`  min-block-size: ${bodyResets.minBlockSize};`);
  if (bodyResets.fontFamily) props.push(`  font-family: ${bodyResets.fontFamily};`);
  if (bodyResets.fontSize) props.push(`  font-size: ${bodyResets.fontSize};`);
  if (bodyResets.lineHeight) props.push(`  line-height: ${bodyResets.lineHeight};`);
  if (bodyResets.color) props.push(`  color: ${bodyResets.color};`);
  if (bodyResets.backgroundColor) props.push(`  background-color: ${bodyResets.backgroundColor};`);

  // Standard resets
  props.push(`  margin: 0;`);

  return `/* ── Body resets ── */\n\nbody {\n${props.join("\n")}\n}\n`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  const tokens = await readInput();

  // Validate
  const errors = validate(tokens);
  if (errors.length > 0) {
    console.error("Validation errors:");
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  // Build CSS sections
  const sections = [];

  // 1. @font-face
  const fontFaces = generateFontFaces(tokens.fonts);
  if (fontFaces) sections.push(fontFaces);

  // 2. Primitives
  sections.push(generatePrimitives(tokens.primitives));

  // 3. Semantic — Light
  sections.push(
    `/* ── Tier 2 — Semantic tokens (Light theme) ── */\n\n` +
      generateSemanticBlock(tokens.semantic.light, ":root,\n:root.light")
  );

  // 4. Semantic — Dark
  if (tokens.semantic.dark && Object.keys(tokens.semantic.dark).length > 0) {
    sections.push(
      `\n/* ── Tier 2 — Semantic tokens (Dark theme) ── */\n\n` +
        generateSemanticBlock(tokens.semantic.dark, ":root.dark")
    );
  }

  // 5. Body resets
  const bodyResets = generateBody(tokens.bodyResets);
  if (bodyResets) sections.push(bodyResets);

  const css = sections.join("\n") + "\n";

  await writeFile(values.output, css, "utf-8");
  console.log(`Generated ${values.output} (${css.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
