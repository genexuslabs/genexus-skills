# Vite plugin options (MercuryOptions)

Options for `vite-plugin-mercury`. Used to configure asset paths, cache-busting, CSS inlining/preloading, and design system overrides

## MercuryOptions

### assetsPaths

Type: `MercuryOptionsAssets`

Customize where Mercury assets (CSS, fonts, icons) are located in the distribution build. In dev mode these files are proxied to the real source

**MercuryOptionsAssets:**

| Field       | Type   | Default          | Description                                      |
|------------|--------|------------------|--------------------------------------------------|
| `cssPath`  | string | `"/assets/css/"` | Path for CSS files in the distribution build    |
| `fontsPath`| string | `"/assets/fonts/"` | Path for font files                           |
| `iconsPath`| string | `"/assets/icons/"` | Path for icon files                           |

### avoidHash

Type: `{ [bundleName]: boolean }`

Control which files are **not** hashed. Use with care: disabling hashing can cause cache issues when changing Mercury versions. By default, all CSS bundle files are hashed

Keys are bundle names (e.g. `"base/base"`, `"components/button"`). See [Bundles index](../bundles-index.md) for the full list

### cssInline

Type: `{ [bundleName]: boolean }`

Which CSS files are inserted at the end of `<head>` as a `<style>` tag. Can improve initial load performance (e.g. inlining `base/base`). Does **not** allow inlining `base/icons` (too large)

**Default:** `base/base` and `resets/box-sizing` are inlined

### cssPreload

Type: `{ [bundleName]: boolean | MercuryOptionsAssetPreload }`

Which CSS files are preloaded as `<link>` tags. When `true`, uses `{ position: "head", fetchPriority: "auto" }`

**Default:** `base/icons` is preloaded at `body-end` with `fetchPriority: "low"`

**MercuryOptionsAssetPreload:**

| Field           | Type   | Default   | Description                                                                 |
|----------------|--------|-----------|-----------------------------------------------------------------------------|
| `position`     | string | `"head"`  | `"head"` \| `"body-start"` \| `"body-end"` — where the `<link>` is placed  |
| `fetchPriority`| string | `"auto"`  | `"auto"` \| `"high"` \| `"low"` — browser fetch priority hint               |

### overrides

Type: `{ css?: MercuryCssDefinition; tokens?: MercuryTokensDefinition }`

Customize Mercury’s design system via CSS bundle and design token overrides

**overrides.css (MercuryCssDefinition):**
Keys are bundle names (see [Bundles index](../bundles-index.md)). Each value is:

```ts
{
  type: "replace";
  content: string | ((options: { originalCssBundle: string }) => string);
}
```

- `content` as string: replaces the original bundle content
- `content` as function: receives `{ originalCssBundle }` and returns the replacement string

**overrides.tokens (MercuryTokensDefinition):**
Object mapping token names to values. Used to override design tokens (primitives and semantics)

### theme

Type: `"mercury" | "globant"`
Default: `"mercury"`

The theme variant. See [Themes and variants](../themes-and-variants.md)
