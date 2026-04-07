# Installation for Stencil

- [1. Preparation](#1-preparation)
- [2. Copy the assets to the dev server and prod builds](#2-copy-the-assets-to-the-dev-server-and-prod-builds)
- [3. Setup](#3-setup)

## 1. Preparation

> [!IMPORTANT]
> This guide assumes you are using Mercury >= `0.36.0`, which is the minimum version for using the `@genexus/mercury-cli` package

### 1.1. Decide the assets paths

First of all, you must decide the paths where the CSS bundles, font assets, and icon set will be contained in the `dist` folder of your final application. Keep them noted down

We will refer to those paths with the following names:

| Reference                      | Meaning                                                                                | Example          |
| ------------------------------ | -------------------------------------------------------------------------------------- | ---------------- |
| `{{ CSS bundles final path }}` | Path in the final application (`dist` folder) where the CSS bundles will be consumed.  | `/assets/css/`   |
| `{{ Fonts final path }}`       | Path in the final application (`dist` folder) where the custom fonts will be consumed. | `/assets/fonts/` |
| `{{ Icons final path }}`       | Path in the final application (`dist` folder) where the icons will be consumed.        | `/assets/icons/` |

> NOTE For Stencil, these paths may need to start with `./` instead of `/` depending on your config

### 1.2. Build Mercury before starting dev server or prod builds

1. If you haven't already, install Mercury and Chameleon: `npm i @genexus/chameleon-controls-library @genexus/mercury`

2. Install the `@genexus/mercury-cli` devDependency:

   ```bash
   npm i --save-dev @genexus/mercury-cli
   ```

3. Update your `package.json` scripts so Mercury is built before dev/build:

   ```json
   "scripts": {
     "dev": "npm run build.mercury && ...",
     "build": "npm run build.mercury && ...",
     "start": "npm run build.mercury && ...",
     "build.mercury": "mercury --i={{ Icons final path }} --f={{ Fonts final path }}"
     // your other scripts...
   }
   ```

4. Run the build script to execute `build.mercury`

If `build.mercury` succeeds, you will find under your project root:

```plaintext
📁 node_modules
└── 📁 .genexus
    └── 📁 mercury
        ├── 📁 assets
        │   ├── 📁 css
        │   │   ├── 📁 base
        │   │   ├── 📁 chameleon
        │   │   ├── 📁 components
        │   │   ├── 📁 resets
        │   │   ├── 📁 utils
        │   │   └── 📄 all-<hash>.css
        │   ├── 📁 fonts
        │   └── 📁 icons
        └── 📄 bundle-to-hash-mappings.ts
```

## 2. Copy the assets to the dev server and prod builds

Update your `stencil.config.ts` so that Mercury assets are copied into your output:

```ts
// stencil.config.ts
import type { Config } from "@stencil/core";
import type { CopyTask } from "@stencil/core/internal";

const copyTasks = [
  {
    src: "../node_modules/.genexus/mercury/assets/css",
    dest: "{{ CSS bundles final path }}" // May need to start with "./" instead of "/"
  },
  {
    src: "../node_modules/.genexus/mercury/assets/fonts",
    dest: "{{ Fonts final path }}"
  },
  {
    src: "../node_modules/.genexus/mercury/assets/icons",
    dest: "{{ Icons final path }}"
  }
] as const satisfies CopyTask[];

export const config: Config = {
  namespace: "your-name-space",
  outputTargets: [
    {
      type: "dist",
      copy: copyTasks
    },
    {
      type: "www",
      serviceWorker: null,
      copy: copyTasks
    }
  ]
};
```

## 3. Setup

### 3.1. Import declarations

Include the required imports at the application's entry point (e.g. `src/index.ts`) to configure and bootstrap Mercury with Chameleon. You must call `setBundleMapping(bundleToHashMappings)` and load the base and icons CSS bundles before any Mercury or Chameleon usage

`src/index.ts`

```ts
import { defineCustomElements } from "@genexus/chameleon-controls-library/loader";
import { registryProperty } from "@genexus/chameleon-controls-library/dist/collection";

import { getImagePathCallbackDefinitions } from "@genexus/mercury/assets-manager.js";
import { registerMercury } from "@genexus/mercury/register-mercury.js";
import { setBundleMapping } from "@genexus/mercury/bundles.js";

import { bundleToHashMappings } from "../node_modules/.genexus/mercury/bundle-to-hash-mappings.js";

// Establishes the mapping between bundle names and their generated hashes.
// For example, it maps the `components/button` bundle name to `button-e261832acea09e81.css`
setBundleMapping(bundleToHashMappings);

registerMercury();
registryProperty("getImagePathCallback", getImagePathCallbackDefinitions);
defineCustomElements(window);

// Load base and icons CSS bundles
const linkBaseBundle = document.createElement("link");
linkBaseBundle.rel = "stylesheet";
linkBaseBundle.href = `{{ CSS bundles final path }}${bundleToHashMappings["base/base"]}.css`;
document.head.appendChild(linkBaseBundle);

const linkIconsBundle = document.createElement("link");
linkIconsBundle.rel = "stylesheet";
linkIconsBundle.href = `{{ CSS bundles final path }}${bundleToHashMappings["base/icons"]}.css`;
document.head.appendChild(linkIconsBundle);
```

> [!IMPORTANT] `setBundleMapping` and `bundleToHashMappings` must be included before using any Mercury or Chameleon utilities

### 3.2. Set the dark/light mode

Add the `light` or `dark` class on the `<html>` tag in your `index.html`. This toggles the color scheme for all components and icons

**Dark** — `index.html`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr" class="dark">
  <head></head>
  <body></body>
</html>
```

**Light** — `index.html`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr" class="light">
  <head></head>
  <body></body>
</html>
```

### 3.3. Creating your components

Chameleon provides the `ch-theme` component to apply CSS bundles. In your Stencil components, use `getBundles` with the bundle names and your CSS path, then pass the result to `<ch-theme model={bundles}>`

Example Stencil component:

```tsx
import { Component, Host } from "@stencil/core";

// If you have moduleResolution: "bundler" in tsconfig (StencilJS >= 4.38.3):
// import { getBundles } from "@genexus/mercury/bundles.js";

// Otherwise use:
import { getBundles } from "@genexus/mercury/dist/bundles.js";

const bundles = getBundles(["components/button"], "{{ CSS bundles final path }}");

@Component({
  shadow: true,
  styleUrl: "custom-dialog.scss",
  tag: "custom-dialog"
})
export class CustomDialog {
  render() {
    return (
      <Host>
        <ch-theme model={bundles}></ch-theme>
        <button class="button-primary" type="button">
          Caption
        </button>
      </Host>
    );
  }
}
```

**Code explained:** `getBundles` returns the theme model for the requested bundles (here only `components/button`). Pass it to `ch-theme` so the CSS is applied. Use the **Component → bundles table** in this skill to choose which bundles to request for each component; use the **Bundles index** for class names like `button-primary`

---

## Next steps

Use the **Component → Mercury CSS bundles table** and **Bundles index** in this skill to choose the right bundles and CSS classes for each Chameleon component you use
