#!/usr/bin/env node

/**
 * Showcase App Scaffolding Script
 *
 * Creates a Kasstor + Chameleon showcase app for browsing a Design System's
 * components, tokens, and design guidelines.
 *
 * Usage:
 *   node scaffold-showcase.mjs --ds-dir <path-to-ds> --ds-name <ds-name> --components <comp1,comp2>
 *
 * Example:
 *   node scaffold-showcase.mjs --ds-dir ./acme-ds --ds-name acme-ds --components button,dialog,accordion
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    "ds-dir": { type: "string" },
    "ds-name": { type: "string" },
    components: { type: "string" },
    help: { type: "boolean", short: "h" },
  },
});

if (values.help || !values["ds-dir"] || !values["ds-name"]) {
  console.log(`
Usage: node scaffold-showcase.mjs --ds-dir <path> --ds-name <name> --components <comp1,comp2>

Options:
  --ds-dir       Path to the Design System root directory (required)
  --ds-name      Design System name (required)
  --components   Comma-separated component names to include (default: button)
  --help, -h     Show this help
`);
  process.exit(values.help ? 0 : 1);
}

const dsDir = resolve(values["ds-dir"]);
const dsName = values["ds-name"];
const components = values.components
  ? values.components.split(",").map((c) => c.trim())
  : ["button"];

const showcaseRoot = join(dsDir, "showcase");

// ── Directory creation ──────────────────────────────────────────────

const directories = [
  "src",
  "src/pages",
  "src/pages/foundations",
  "src/pages/components",
  "src/pages/guidelines",
  "src/styles",
  "src/utils",
];

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

// ── File templates ──────────────────────────────────────────────────

function packageJson() {
  return JSON.stringify(
    {
      name: `${dsName}-showcase`,
      private: true,
      version: "0.0.1",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
      dependencies: {
        "@genexus/kasstor-core": "latest",
        "@genexus/chameleon-controls-library": "latest",
        lit: "^3.0.0",
      },
      devDependencies: {
        "@genexus/vite-plugin-kasstor": "latest",
        vite: "^6.0.0",
        typescript: "^5.5.0",
        sass: "^1.80.0",
      },
    },
    null,
    2
  );
}

function viteConfig() {
  return `import { defineConfig } from "vite";
import { kasstor } from "@genexus/vite-plugin-kasstor";

export default defineConfig({
  plugins: [kasstor()]
});
`;
}

function tsConfig() {
  return JSON.stringify(
    {
      compilerOptions: {
        target: "ES2021",
        module: "ESNext",
        moduleResolution: "bundler",
        experimentalDecorators: true,
        useDefineForClassFields: false,
        lib: ["ES2021", "DOM", "DOM.Iterable"],
        strict: true,
        skipLibCheck: true,
      },
      include: ["src"],
    },
    null,
    2
  );
}

function viteEnvDts() {
  return `/// <reference types="vite/client" />

declare module "*.scss?inline" {
  const content: string;
  export default content;
}
`;
}

function indexHtml() {
  return `<!DOCTYPE html>
<html class="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${dsName} — Showcase</title>
  <!-- Tier 1: Critical CSS (inline resets + base in production) -->
  <link rel="stylesheet" href="../resets/box-sizing.css" />
  <link rel="stylesheet" href="../base/base.css" />
</head>
<body>
  <ch-theme model=""></ch-theme>
  <showcase-app></showcase-app>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;
}

function mainTs() {
  const imports = [
    `import "./app.lit";`,
    `import "./pages/overview.lit";`,
    `import "./pages/foundations/colors.lit";`,
    `import "./pages/foundations/typography.lit";`,
    `import "./pages/foundations/spacing.lit";`,
    `import "./pages/foundations/icons.lit";`,
    ...components.map((c) => `import "./pages/components/${c}.lit";`),
    `import "./pages/guidelines/accessibility.lit";`,
    `import "./pages/guidelines/patterns.lit";`,
  ];
  return imports.join("\n") + "\n";
}

function appComponent() {
  return `import { Component, KasstorElement } from "@genexus/kasstor-core";
import { html } from "lit";
import { state } from "lit/decorators.js";
import styles from "./styles/app.scss?inline";

@Component({
  tag: "showcase-app",
  styles: styles
})
export class ShowcaseApp extends KasstorElement {
  @state() private currentPage = "overview";

  private navigationModel = [
    {
      id: "overview",
      caption: "Overview",
      leaf: true
    },
    {
      id: "foundations",
      caption: "Foundations",
      items: [
        { id: "colors", caption: "Colors", leaf: true },
        { id: "typography", caption: "Typography", leaf: true },
        { id: "spacing", caption: "Spacing", leaf: true },
        { id: "icons", caption: "Icons", leaf: true }
      ]
    },
    {
      id: "components",
      caption: "Components",
      items: [
${components.map((c) => `        { id: "${c}", caption: "${c.charAt(0).toUpperCase() + c.slice(1)}", leaf: true }`).join(",\n")}
      ]
    },
    {
      id: "guidelines",
      caption: "Guidelines",
      items: [
        { id: "accessibility", caption: "Accessibility", leaf: true },
        { id: "patterns", caption: "Patterns", leaf: true }
      ]
    }
  ];

  render() {
    return html\`
      <div class="showcase-layout">
        <nav class="showcase-nav">
          <h1 class="heading-4">${dsName}</h1>
          <ch-navigation-list-render
            .model=\${this.navigationModel}
          ></ch-navigation-list-render>
        </nav>
        <main class="showcase-main">
          <slot></slot>
        </main>
      </div>
    \`;
  }
}
`;
}

function appScss() {
  return `:host {
  display: block;
  min-block-size: 100dvh;
}

.showcase-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-block-size: 100dvh;
}

.showcase-nav {
  padding: var(--spacing-padding-xl);
  border-inline-end: 1px solid var(--color-border-neutral-default);
  background-color: var(--color-accent-surface-elevation-1);
}

.showcase-main {
  padding: var(--spacing-padding-xxl);
  overflow-y: auto;
}
`;
}

function overviewPage() {
  return `import { Component, KasstorElement } from "@genexus/kasstor-core";
import { html } from "lit";

@Component({
  tag: "showcase-overview"
})
export class OverviewPage extends KasstorElement {
  render() {
    return html\`
      <h1 class="heading-1">${dsName}</h1>
      <p class="body-regular-m">
        Design System showcase. Browse components, tokens, and design guidelines.
      </p>
    \`;
  }
}
`;
}

function foundationPage(name, title) {
  return `import { Component, KasstorElement } from "@genexus/kasstor-core";
import { html } from "lit";

@Component({
  tag: "showcase-${name}"
})
export class ${title}Page extends KasstorElement {
  render() {
    return html\`
      <h2 class="heading-2">${title}</h2>
      <p class="body-regular-m">TODO: Add ${name} samples and documentation.</p>
    \`;
  }
}
`;
}

function componentPage(name) {
  const className =
    name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return `import { Component, KasstorElement } from "@genexus/kasstor-core";
import { html } from "lit";

@Component({
  tag: "showcase-${name}"
})
export class ${className}Page extends KasstorElement {
  render() {
    return html\`
      <h2 class="heading-2">${className}</h2>
      <p class="body-regular-m">Component demo for ${name}.</p>

      <section>
        <h3 class="heading-3">Variants</h3>
        <!-- TODO: Add ${name} component variants -->
      </section>

      <section>
        <h3 class="heading-3">States</h3>
        <!-- TODO: Add ${name} component states -->
      </section>
    \`;
  }
}
`;
}

function guidelinePage(name, title) {
  return `import { Component, KasstorElement } from "@genexus/kasstor-core";
import { html } from "lit";

@Component({
  tag: "showcase-${name}"
})
export class ${title}Page extends KasstorElement {
  render() {
    return html\`
      <h2 class="heading-2">${title}</h2>
      <p class="body-regular-m">TODO: Add ${name} guidelines.</p>
    \`;
  }
}
`;
}

function showcaseOverridesScss() {
  const blocks = components.map(
    (c) => `// =========================================================
// TEMP: ${c} — Remove when DS adds components/${c}.css
// =========================================================

// TODO: Add temporary styles for ${c} here

// =========================================================
// END TEMP: ${c}
// =========================================================`
  );

  return `// Showcase Overrides — Temporary Styles
//
// This file contains temporary styles for Chameleon components
// that are used in the showcase but NOT YET styled in the DS.
//
// RULES:
// 1. Each block must be wrapped in TEMP/END TEMP markers
// 2. Use only DS tokens — never hardcode values
// 3. When the DS adds components/{name}.css, DELETE the block here
// 4. Follow the same ::part() rules as real DS component CSS
// 5. Only use valid parts from the component's styling.md (chameleon-controls-library skill)

${blocks.join("\n\n")}
`;
}

function bundlesTs() {
  return `/**
 * getBundles wrapper configured for ${dsName}.
 *
 * Usage:
 *   import { getBundles } from "./utils/bundles";
 *   const model = getBundles(["components/button", "utils/typography"]);
 */
export function getBundles(
  bundleNames: string[],
  basePath = "/${dsName}/"
): Array<{ name: string; url: string }> {
  return bundleNames.map(name => ({
    name,
    url: \`\${basePath}\${name}.css\`
  }));
}
`;
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  // Check DS directory exists
  try {
    await access(dsDir);
  } catch {
    console.error(`Error: DS directory not found: ${dsDir}`);
    process.exit(1);
  }

  console.log(`Scaffolding showcase for "${dsName}" at ${showcaseRoot}`);
  console.log(`Components: ${components.join(", ")}`);

  // Create directories
  for (const dir of directories) {
    await ensureDir(join(showcaseRoot, dir));
  }

  // Write config files
  const files = [
    ["package.json", packageJson()],
    ["vite.config.ts", viteConfig()],
    ["tsconfig.json", tsConfig()],
    ["src/vite-env.d.ts", viteEnvDts()],
    ["index.html", indexHtml()],
    ["src/main.ts", mainTs()],
    ["src/app.lit.ts", appComponent()],
    ["src/styles/app.scss", appScss()],
    ["src/styles/showcase-overrides.scss", showcaseOverridesScss()],
    ["src/utils/bundles.ts", bundlesTs()],
    ["src/pages/overview.lit.ts", overviewPage()],
    // Foundation pages
    ["src/pages/foundations/colors.lit.ts", foundationPage("colors", "Colors")],
    [
      "src/pages/foundations/typography.lit.ts",
      foundationPage("typography", "Typography"),
    ],
    [
      "src/pages/foundations/spacing.lit.ts",
      foundationPage("spacing", "Spacing"),
    ],
    ["src/pages/foundations/icons.lit.ts", foundationPage("icons", "Icons")],
    // Guideline pages
    [
      "src/pages/guidelines/accessibility.lit.ts",
      guidelinePage("accessibility", "Accessibility"),
    ],
    [
      "src/pages/guidelines/patterns.lit.ts",
      guidelinePage("patterns", "Design Patterns"),
    ],
  ];

  // Component pages
  for (const comp of components) {
    files.push([
      `src/pages/components/${comp}.lit.ts`,
      componentPage(comp),
    ]);
  }

  for (const [path, content] of files) {
    const fullPath = join(showcaseRoot, path);
    await writeFile(fullPath, content, "utf8");
    console.log(`  Created: ${path}`);
  }

  console.log(`\nShowcase scaffolded successfully!`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${showcaseRoot}`);
  console.log(`  npm install`);
  console.log(`  npm run dev`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
