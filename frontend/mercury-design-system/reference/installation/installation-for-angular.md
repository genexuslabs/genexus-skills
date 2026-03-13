# Installation for Angular

- [1. Preparation](#1-preparation)
- [2. Copy the assets to the dev server and prod builds](#2-copy-the-assets-to-the-dev-server-and-prod-builds)
- [3. Setup](#3-setup)

---

## 1. Preparation

> [!IMPORTANT]
> This guide assumes you are using Mercury >= `0.36.0`, which is the minimum version for using the `@genexus/mercury-cli` package

### 1.1. Decide the assets paths

First of all, you must decide the paths where the CSS bundles, font assets, and icon set will be contained in the `dist` folder of your final application. Keep them noted down, as we will refer to them in the next steps

We will refer to those paths with the following names:

| Reference                      | Meaning                                                                                | Example          |
| ------------------------------ | -------------------------------------------------------------------------------------- | ---------------- |
| `{{ CSS bundles final path }}` | Path in the final application (`dist` folder) where the CSS bundles will be consumed.  | `/assets/css/`   |
| `{{ Fonts final path }}`       | Path in the final application (`dist` folder) where the custom fonts will be consumed. | `/assets/fonts/` |
| `{{ Icons final path }}`       | Path in the final application (`dist` folder) where the icons will be consumed.        | `/assets/icons/` |

### 1.2. Build Mercury before starting dev server or prod builds

1. If you haven't already, install Mercury and Chameleon: `npm i @genexus/chameleon-controls-library @genexus/mercury`

2. Install the `@genexus/mercury-cli` devDependency that automates the Mercury setup process

   ```bash
   npm i --save-dev @genexus/mercury-cli
   ```

3. Update your `package.json` with the following scripts (this ensures styles and assets are correctly built before running or building the app):

   ```json
   "scripts": {
     "dev": "npm run build.mercury && ...",
     "build": "npm run build.mercury && ...",
     "start": "npm run build.mercury && ...",
     "build.mercury": "mercury --i={{ Icons final path }} --f={{ Fonts final path }}"
     // your other scripts...
   }
   ```

4. Run the `build` script to execute `build.mercury`

> [NOTE] The `mercury` command builds the Mercury assets for the design system. See the mercury-cli package documentation for full CLI flags

If `build.mercury` successfully generates the assets, you will find the following folders under your project root:

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

Update your `angular.json` as follows:

```json
{
  "projects": {
    "<app name>": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "node_modules/.genexus/mercury/assets/css",
                "output": "{{ CSS bundles final path }}"
              },
              {
                "glob": "**/*",
                "input": "node_modules/.genexus/mercury/assets/fonts",
                "output": "{{ Fonts final path }}"
              },
              {
                "glob": "**/*",
                "input": "node_modules/.genexus/mercury/assets/icons",
                "output": "{{ Icons final path }}"
              }
              // ... your other assets
            ]
          }
        }
      }
    }
  }
}
```

To confirm that the assets have been copied successfully, build your project. Then, inspect the `/dist` folder — you should see a structure similar to the following:

```plaintext
📁 dist
└── 📁 your-project-name
    └── 📁 browser
        └── 📁 assets
            ├── 📁 css
            ├── 📁 fonts
            └── 📁 icons
```

## 3. Setup

### 3.1. Import declarations

Include the required imports at the application's entry point to properly configure and bootstrap Mercury with Chameleon

> NOTE In the following code, Angular bootstrap is commented so we can focus on Mercury and Chameleon

`src/main.ts`

```ts
// import { bootstrapApplication } from "@angular/platform-browser";
// import { appConfig } from "./app/app.config";
// import { App } from "./app/app";

import { defineCustomElements } from "@genexus/chameleon-controls-library/loader";
import { registryProperty } from "@genexus/chameleon-controls-library/dist/collection";

import { getImagePathCallbackDefinitions } from "@genexus/mercury/assets-manager.js";
import { registerMercury } from "@genexus/mercury/register-mercury.js";
import { setBundleMapping } from "@genexus/mercury/bundles.js";

import { bundleToHashMappings } from "../node_modules/.genexus/mercury/bundle-to-hash-mappings.js";

// Establishes the mapping between bundle names and their generated hashes.
// For example, it maps the `components/button` bundle name to `button-e261832acea09e81.css`
setBundleMapping(bundleToHashMappings);

// It registers a mapping between the icons metadata and its path.
registerMercury();

// Register the default value for the getImagePathCallback property in all Chameleon
// components. This implementation allows us to remove the need for binding the
// getImagePathCallback property in all Chameleon controls that must render icons.
registryProperty("getImagePathCallback", getImagePathCallbackDefinitions);

// Setup the auto-loader for Chameleon components
defineCustomElements(window);

// bootstrapApplication(App, appConfig).catch(err => console.error(err));
```

> [!IMPORTANT] `setBundleMapping` and `bundleToHashMappings` must be included before using any Mercury or Chameleon utilities

### 3.2. Include a CSS loader service

This service dynamically loads two essential CSS bundles: `base-<hash>.css` and `icons-<hash>.css`. These contain the core CSS tokens (variables) used across all components, as well as icon styles

`src/app/services/css-loader.service.ts`

```ts
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { bundleToHashMappings } from "../../../node_modules/.genexus/mercury/bundle-to-hash-mappings.js";

@Injectable({ providedIn: "root" })
export class CssLoaderService {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const linkBaseBundle = document.createElement("link");
    linkBaseBundle.rel = "stylesheet";
    linkBaseBundle.href = `{{ CSS bundles final path }}${bundleToHashMappings["base/base"]}.css`;
    document.head.appendChild(linkBaseBundle);

    const linkIconsBundle = document.createElement("link");
    linkIconsBundle.rel = "stylesheet";
    linkIconsBundle.href = `{{ CSS bundles final path }}${bundleToHashMappings["base/icons"]}.css`;
    document.head.appendChild(linkIconsBundle);
  }
}
```

### 3.3. Set the dark/light mode

Mercury supports both dark and light modes. Add the `light` or `dark` class on the `<html>` tag in `index.html`

**Dark theme** — `index.html`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr" class="dark">
  <head></head>
  <body></body>
</html>
```

**Light theme** — `index.html`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr" class="light">
  <head></head>
  <body></body>
</html>
```

### 3.4. Creating your components

Example: a simple component that uses Mercury bundles and `ch-theme`

`src/app/custom-dialog/custom-dialog.component.ts` (example component)

```ts
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";

import { getBundles } from "@genexus/mercury/bundles.js";
import { getIconPath } from "@genexus/mercury/assets-manager.js";

@Component({
  selector: "custom-dialog",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<ch-theme [model]="bundles"></ch-theme>
    <button class="button-primary button-icon-and-text" type="button">
      <ch-image class="icon-md" [src]="ICON" [type]="'mask'" />
      Caption
    </button>`
})
export class CustomDialogComponent {
  bundles = getBundles(
    ["components/button", "components/icon"],
    "{{ CSS bundles final path }}"
  );
  ICON = getIconPath({
    category: "system",
    name: "add-circle",
    colorType: "primary"
  });
}
```

**Code explained:** The component uses `getBundles` to get the button and icon bundles, and `getIconPath` for the icon source. `ch-theme` applies the CSS bundles. Use the **Component → bundles table** in this skill to choose which bundles to request per component; use the **Bundles index** for class names

`src/app/app.ts`

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CssLoaderService } from "./services/css-loader.service";
import { CustomDialogComponent } from "./custom-dialog/custom-dialog.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, CustomDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./app.html",
  styleUrl: "./app.css"
})
export class App {
  constructor() {
    inject(CssLoaderService);
  }
  protected readonly title = signal("angular-mercury");
}
```

Expected structure:

```plaintext
📁 src
└── 📁 app
    ├── 📁 custom-dialog
    │   └── 📄 custom-dialog.component.ts
    ├── 📁 services
    │   └── 📄 css-loader.service.ts
    ├── 📄 app.ts
    └── 📄 app.html
```

`app.html`

```html
<custom-dialog></custom-dialog>
```

---

## Next steps

Use the **Component → Mercury CSS bundles table** and **Bundles index** in this skill to choose the right bundles and CSS classes for each Chameleon component you use
