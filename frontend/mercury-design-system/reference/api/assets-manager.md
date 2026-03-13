# @genexus/mercury/assets-manager.js

Icon and image path helpers and callbacks for Chameleon components. For the complete icon catalog and usage guide, see **[Mercury Icons](../icons/README.md)**

## registerAssets

```ts
registerAssets(vendorName: string, vendorAlias: string, assets: Assets): void
```

Registers a vendor’s assets. After registration, `getAsset` can retrieve them. Example: `registerAssets("Mercury", "mer", MERCURY_ASSETS)`

## getAsset

```ts
getAsset(vendorAliasOrName: string, assetMetadata: AssetsMetadata): AssetsColorType | undefined
```

Returns the asset for the given vendor and metadata, or `undefined` if not found

## getIconPath

```ts
getIconPath(iconMetadata: AssetsMetadata, vendorAlias?: string): string
```

Builds the icon path string from metadata. Default vendor alias is `"mer"`. Always use this to reference Mercury icons in Chameleon components

**Multicolor icons** (colors baked into the SVG) — no `colorType` needed:

```ts
getIconPath({ category: "objects", name: "api" });
```

**Monochrome icons** — `colorType` is required:

```ts
getIconPath({ category: "system", name: "settings", colorType: "on-surface" });
```

Use the result as `src` for `ch-image` or as `startImgSrc`/`endImgSrc` in component item models

## getIconPathExpanded

```ts
getIconPathExpanded(
  iconMetadata: AssetsMetadata,
  iconMetadataExpanded: AssetsMetadata,
  vendorAlias?: string
): string
```

Builds a combined `"collapsedPath:expandedPath"` string for components that support collapse/expand icon states. **Currently only supported by `ch-tree-view-render`.**

```ts
// Multicolor
getIconPathExpanded(
  { category: "objects", name: "module" },
  { category: "objects", name: "module-open" }
);

// Monochrome
getIconPathExpanded(
  { category: "system", name: "group", colorType: "on-surface" },
  { category: "system", name: "group-off", colorType: "on-surface" }
);
```

> `getIconPath` also works with `ch-tree-view-render` when you don't need different icons for collapsed/expanded states

## getImagePathCallback

```ts
getImagePathCallback(iconPath: string): GxImageMultiState | undefined
```

Returns a multi-state image callback for the given icon path

## Component callbacks

- **getActionMenuImagePathCallback** — `ActionMenuImagePathCallback`
- **getActionListImagePathCallback** — `(additionalItem) => GxImageMultiState | undefined`
- **getNavigationListImagePathCallback** — `(itemModel: NavigationListItemModel) => GxImageMultiState | undefined`
- **getTreeViewImagePathCallback** — `TreeViewImagePathCallback`
- **getComboBoxImagePathCallback** — `ComboBoxImagePathCallback`

## getImagePathCallbackDefinitions

Object with all `getImagePathCallback` definitions for Chameleon. Use with `registryProperty("getImagePathCallback", getImagePathCallbackDefinitions)`

When Mercury's resolver receives an icon path that doesn't match any internal Mercury mapping, it falls back to `{ base: <the raw path> }`. This means custom icons outside Mercury's set still work in Chameleon components — just pass the full path as `src` or `startImgSrc`

## Types

- **AssetsMetadata** — `{ category: string; name: string; colorType?: string }`
- **Assets** — `{ icons: { [category]: { [iconName]: AssetsColorType } } }`
- **AssetsColorType** — `{ [state]: { name: string } }` (e.g. `enabled`, `hover`, `active`, `disabled`)
