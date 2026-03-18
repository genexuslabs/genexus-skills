# @genexus/mercury/MERCURY_ASSETS.js

Readonly object containing Mercury’s registered icon assets. Structure:

```ts
MERCURY_ASSETS: {
  config: { defaultColorType: string };
  icons: {
    [category: string]: {
      [iconName: string]: {
        [colorType?: string]: {
          [state: string]: { name: string };
        };
      };
    };
  };
}
```

Used with `registerAssets("Mercury", "mer", MERCURY_ASSETS)` to register icons for `getIconPath`, `getAsset`, and Chameleon component callbacks. Categories and icon names are generated from the SVG source; see the package for the full structure
