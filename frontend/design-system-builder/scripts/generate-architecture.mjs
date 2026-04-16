#!/usr/bin/env node

/**
 * Architecture Diagram Generator
 *
 * Scans a DS directory and generates a Mermaid architecture diagram
 * showing layers, components, tokens, and brands.
 *
 * Usage:
 *   node generate-architecture.mjs --dir <ds-root>
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, resolve, basename } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    dir: { type: "string", short: "d" },
    help: { type: "boolean", short: "h" },
  },
});

if (values.help || !values.dir) {
  console.log(`
Usage: node generate-architecture.mjs --dir <ds-root>

Options:
  --dir, -d   Design system root directory (required)
  --help, -h  Show this help
`);
  process.exit(values.help ? 0 : 1);
}

const dsRoot = resolve(values.dir);

async function safeReaddir(dir) {
  try {
    return await readdir(dir);
  } catch {
    return [];
  }
}

async function getFileCount(dir) {
  const files = await safeReaddir(dir);
  return files.filter((f) => !f.startsWith(".")).length;
}

async function getCssFiles(dir) {
  const files = await safeReaddir(dir);
  return files.filter((f) => f.endsWith(".css")).map((f) => f.replace(".css", ""));
}

async function isTokenPopulated(filePath) {
  try {
    const content = await readFile(filePath, "utf-8");
    const json = JSON.parse(content);
    const keys = Object.keys(json).filter((k) => !k.startsWith("$"));
    return keys.length > 0;
  } catch {
    return false;
  }
}

async function main() {
  // Gather state
  const components = await getCssFiles(join(dsRoot, "components"));
  const utilities = await getCssFiles(join(dsRoot, "utils"));
  const scopeFiles = await safeReaddir(join(dsRoot, "scope"));
  const brands = scopeFiles
    .filter((f) => f.startsWith("theme-") && f.endsWith(".css"))
    .map((f) => f.replace("theme-", "").replace(".css", ""));

  const primitivePopulated = await isTokenPopulated(
    join(dsRoot, "tokens/primitive.json")
  );
  const semanticPopulated = await isTokenPopulated(
    join(dsRoot, "tokens/semantic.json")
  );
  const componentPopulated = await isTokenPopulated(
    join(dsRoot, "tokens/component.json")
  );

  const layerCounts = {
    resets: await getFileCount(join(dsRoot, "resets")),
    base: await getFileCount(join(dsRoot, "base")),
    scope: await getFileCount(join(dsRoot, "scope")),
    chameleon: await getFileCount(join(dsRoot, "chameleon")),
    utils: await getFileCount(join(dsRoot, "utils")),
    components: await getFileCount(join(dsRoot, "components")),
  };

  // Generate Mermaid
  const check = (v) => (v ? "Populated" : "Empty");
  const componentList =
    components.length > 0
      ? components.slice(0, 15).join(", ") +
        (components.length > 15 ? `, +${components.length - 15} more` : "")
      : "*(none yet)*";
  const utilityList =
    utilities.length > 0 ? utilities.join(", ") : "*(none yet)*";
  const brandList = brands.length > 0 ? brands.join(", ") : "*(none yet)*";

  const dsName = basename(dsRoot);
  const timestamp = new Date().toISOString();

  const diagram = `# ${dsName} — Architecture Diagram

> Auto-generated on ${timestamp}

## Layer Architecture

\`\`\`mermaid
graph TB
    APP[Application]
    subgraph DS["${dsName} Design System"]
        COMP[Components<br/>${components.length} files]
        UTILS[Utilities<br/>${utilities.length} files]
        CHAM[Chameleon Overrides<br/>${layerCounts.chameleon} files]
        SCOPE[Scope / Themes<br/>${brands.length} brands]
        BASE[Base<br/>${layerCounts.base} files]
        RESETS[Resets<br/>${layerCounts.resets} files]
    end
    subgraph TOKENS["Token Architecture"]
        T3[Tier 3: Component<br/>${check(componentPopulated)}]
        T2[Tier 2: Semantic<br/>${check(semanticPopulated)}]
        T1[Tier 1: Primitive<br/>${check(primitivePopulated)}]
    end
    PLATFORM[Chameleon Web Components + Browser]

    APP --> DS
    DS --> TOKENS
    DS --> PLATFORM

    COMP --> T3
    T3 --> T2
    T2 --> T1

    SCOPE --> T2
    BASE --> T1
\`\`\`

## Status

### Layers

| Layer | Files |
|---|---|
| Resets | ${layerCounts.resets} |
| Base | ${layerCounts.base} |
| Scope | ${layerCounts.scope} |
| Chameleon | ${layerCounts.chameleon} |
| Utilities | ${layerCounts.utils} |
| Components | ${layerCounts.components} |

### Token Tiers

| Tier | File | Status |
|---|---|---|
| Tier 1 (Primitive) | tokens/primitive.json | ${primitivePopulated ? "Populated" : "Empty"} |
| Tier 2 (Semantic) | tokens/semantic.json | ${semanticPopulated ? "Populated" : "Empty"} |
| Tier 3 (Component) | tokens/component.json | ${componentPopulated ? "Populated" : "Empty"} |

### Brands

${brandList}

### Components

${componentList}

### Utilities

${utilityList}
`;

  const outputPath = join(dsRoot, "architecture.md");
  await writeFile(outputPath, diagram, "utf-8");
  console.log(`Architecture diagram written to: ${outputPath}`);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
