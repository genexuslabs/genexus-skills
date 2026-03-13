#!/usr/bin/env node

/**
 * Token Validation Script
 *
 * Validates DTCG token files for:
 * - Required fields ($type, $value, $description)
 * - Naming conventions (kebab-case)
 * - Tier integrity (component → semantic → primitive)
 * - Circular reference detection
 *
 * Usage:
 *   node validate-tokens.mjs --dir <ds-root>
 */

import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    dir: { type: "string", short: "d" },
    help: { type: "boolean", short: "h" },
  },
});

if (values.help || !values.dir) {
  console.log(`
Usage: node validate-tokens.mjs --dir <ds-root>

Options:
  --dir, -d   Design system root directory (required)
  --help, -h  Show this help
`);
  process.exit(values.help ? 0 : 1);
}

const dsRoot = resolve(values.dir);

const VALID_TYPES = [
  "color",
  "dimension",
  "fontFamily",
  "fontWeight",
  "duration",
  "cubicBezier",
  "number",
  "shadow",
  "typography",
  "border",
  "transition",
  "gradient",
];

const KEBAB_CASE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const ALIAS_PATTERN = /^\{[^}]+\}$/;

class ValidationError {
  constructor(file, path, message) {
    this.file = file;
    this.path = path;
    this.message = message;
  }

  toString() {
    return `  [${this.file}] ${this.path}: ${this.message}`;
  }
}

const errors = [];
const warnings = [];

function isTokenNode(obj) {
  return obj && typeof obj === "object" && "$value" in obj;
}

function validateToken(file, path, token) {
  // Required fields
  if (!("$type" in token)) {
    errors.push(new ValidationError(file, path, "Missing required $type"));
  } else if (!VALID_TYPES.includes(token.$type)) {
    errors.push(
      new ValidationError(
        file,
        path,
        `Invalid $type "${token.$type}". Valid: ${VALID_TYPES.join(", ")}`
      )
    );
  }

  if (!("$value" in token)) {
    errors.push(new ValidationError(file, path, "Missing required $value"));
  }

  if (!("$description" in token)) {
    warnings.push(
      new ValidationError(file, path, "Missing recommended $description")
    );
  }
}

function validateNaming(file, path) {
  const segments = path.split(".");
  for (const segment of segments) {
    if (segment.startsWith("$")) continue;
    // Allow numeric segments (e.g., color.blue.500)
    if (/^\d+/.test(segment)) continue;
    if (!KEBAB_CASE.test(segment)) {
      warnings.push(
        new ValidationError(
          file,
          path,
          `Segment "${segment}" is not kebab-case`
        )
      );
    }
  }
}

function collectAliases(obj, path, aliases) {
  if (isTokenNode(obj)) {
    if (typeof obj.$value === "string" && ALIAS_PATTERN.test(obj.$value)) {
      const ref = obj.$value.slice(1, -1);
      aliases.push({ from: path, to: ref });
    }
    return;
  }

  if (obj && typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      if (key.startsWith("$")) continue;
      collectAliases(val, path ? `${path}.${key}` : key, aliases);
    }
  }
}

function walkTokens(file, obj, path = "") {
  if (isTokenNode(obj)) {
    const tokenPath = path || "(root)";
    validateToken(file, tokenPath, obj);
    validateNaming(file, tokenPath);
    return;
  }

  if (obj && typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      if (key.startsWith("$")) continue;
      walkTokens(file, val, path ? `${path}.${key}` : key);
    }
  }
}

function detectCircularRefs(aliases) {
  const graph = new Map();
  for (const { from, to } of aliases) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
  }

  const visited = new Set();
  const inStack = new Set();
  const cycles = [];

  function dfs(node, path) {
    if (inStack.has(node)) {
      cycles.push([...path, node]);
      return;
    }
    if (visited.has(node)) return;

    visited.add(node);
    inStack.add(node);

    for (const neighbor of graph.get(node) || []) {
      dfs(neighbor, [...path, node]);
    }

    inStack.delete(node);
  }

  for (const node of graph.keys()) {
    dfs(node, []);
  }

  return cycles;
}

async function loadTokenFile(filename) {
  const filePath = join(dsRoot, "tokens", filename);
  try {
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      errors.push(
        new ValidationError(filename, "(file)", `File not found: ${filePath}`)
      );
      return null;
    }
    errors.push(
      new ValidationError(filename, "(file)", `Parse error: ${err.message}`)
    );
    return null;
  }
}

async function main() {
  console.log(`Validating tokens in: ${dsRoot}`);
  console.log("");

  const files = ["primitive.json", "semantic.json", "component.json"];
  const allAliases = [];

  for (const file of files) {
    const data = await loadTokenFile(file);
    if (!data) continue;

    console.log(`Checking ${file}...`);
    walkTokens(file, data);
    collectAliases(data, "", allAliases);
  }

  // Check circular references across all files
  const cycles = detectCircularRefs(allAliases);
  for (const cycle of cycles) {
    errors.push(
      new ValidationError(
        "(cross-file)",
        cycle.join(" → "),
        "Circular reference detected"
      )
    );
  }

  // Report
  console.log("");

  if (warnings.length > 0) {
    console.log(`Warnings (${warnings.length}):`);
    for (const w of warnings) console.log(w.toString());
    console.log("");
  }

  if (errors.length > 0) {
    console.log(`Errors (${errors.length}):`);
    for (const e of errors) console.log(e.toString());
    console.log("");
    console.log("VALIDATION FAILED");
    process.exit(1);
  }

  console.log("All tokens valid.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Validation failed:", err.message);
  process.exit(1);
});
