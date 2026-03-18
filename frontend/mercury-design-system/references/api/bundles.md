# @genexus/mercury/bundles.js

Theme model utilities for loading Mercury CSS bundles into `ch-theme`

## getBundles

```ts
getBundles(
  bundles: MercuryBundleFull[] | MercuryBundleOptimized[],
  optionsOrBasePath?: string | {
    basePath?: string;
    bundleNamePrefix?: string;
    bundleMappings?: MercuryBundleMapping;
  }
): ThemeModel
```

Returns the given bundles in `ThemeModel` format for `ch-theme`. Pass an array of bundle names (e.g. `["components/button", "utils/form"]`) and the base path where Mercury CSS is served (e.g. `"/assets/css/"`)

**Options (second argument):**

- `basePath` — Public path for CSS files
- `bundleNamePrefix` — Optional prefix for bundle URLs
- `bundleMappings` — Map bundle names to hashed filenames (required when using `mercury` CLI)

## setBundleMapping

```ts
setBundleMapping(mappings: MercuryBundleMapping): void
```

Sets the mapping between bundle names and their hashed filenames. Required when bundles are built with the mercury CLI so `getBundles` loads the correct hashed files

## getThemeBundles

```ts
getThemeBundles(
  basePath: string,
  bundleNamePrefix?: string
): ThemeModel
```

Returns all bundles (except base and icons) in `ThemeModel` format. Useful for loading the full theme in `index.html` with a single `ch-theme`

## Types

- **MercuryBundleFull** — Component, scope, util bundles (no base, no resets)
- **MercuryBundleOptimized** — Same as above plus form components
- **MercuryBundleMapping** — `{ [bundleName]: bundleNameWithHash | bundleName }`
- **ThemeModel** — Chameleon `ThemeModel` (array of `{ name, url, attachStyleSheet? }`)

Bundle names: see [Bundles index](../bundles-index.md) and [types.ts](https://github.com/Genexus/design-systems/blob/main/packages/mercury/src/types.ts)
