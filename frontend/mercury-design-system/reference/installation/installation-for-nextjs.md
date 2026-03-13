# Installation for Next.js (with Turbopack)

- [1. Preparation](#1-preparation)
- [2. Copy the assets to the dev server and prod builds](#2-copy-the-assets-to-the-dev-server-and-prod-builds)
- [3. Setup](#3-setup)

## 1. Preparation

> [!IMPORTANT]
> This guide assumes you are using Mercury >= `0.36.0`, which is the minimum version for using the `@genexus/mercury-cli` package

### 1.1. Decide the assets paths

First of all, you must decide the paths where the CSS bundles, font assets, and icon set will be contained in the final application. Keep them noted down

We will refer to those paths with the following names:

| Reference                      | Meaning                                                                                | Example          |
| ------------------------------ | -------------------------------------------------------------------------------------- | ---------------- |
| `{{ CSS bundles final path }}` | Path in the final application where the CSS bundles will be consumed.  | `/assets/css/`   |
| `{{ Fonts final path }}`       | Path in the final application where the custom fonts will be consumed. | `/assets/fonts/` |
| `{{ Icons final path }}`       | Path in the final application where the icons will be consumed.        | `/assets/icons/` |

### 1.2. Build Mercury before starting dev server or prod builds

1. If you haven't already, install Mercury and Chameleon: `npm i @genexus/chameleon-controls-library @genexus/mercury`

2. Install the `@genexus/mercury-cli` devDependency:

   ```bash
   npm i --save-dev @genexus/mercury-cli
   ```

3. Update your `package.json` scripts so that styles and assets are built before running or building the app:

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

Copy the custom fonts, icons, and CSS bundles to the dev and prod builds. Turbopack does not support copying files during the build like Webpack. Use a tool such as `cpx` in your `package.json` scripts

Install cpx:

```bash
npm install --save-dev cpx
```

Then update your `package.json` so that `dev` and `build` run `copy-assets` right after `build.mercury`:

```json
"scripts": {
  "dev": "npm run build.mercury && npm run copy-assets && ...",
  "build": "npm run build.mercury && npm run copy-assets && ...",
  "start": "npm run build.mercury && npm run copy-assets && ...",
  "copy-assets": "npm run copy-icons && npm run copy-fonts && npm run copy-css-bundles",
  "copy-css-bundles": "cpx \"node_modules/.genexus/mercury/assets/css/**/*\" public/{{ CSS bundles final path }}",
  "copy-icons": "cpx \"node_modules/.genexus/mercury/assets/icons/**/*\" public/{{ Icons final path }}",
  "copy-fonts": "cpx \"node_modules/.genexus/mercury/assets/fonts/**/*\" public/{{ Fonts final path }}"
  // your other scripts...
}
```

After a build, check the `/public` folder. You should see something like:

```plaintext
📁 public
└── 📁 assets
    ├── 📁 css
    ├── 📁 fonts
    └── 📁 icons
```

> NOTE In Next.js, static files must be in `/public`. They are served at the root URL. Because Turbopack does not copy assets during the build, we use `cpx` to copy Mercury assets into `/public` before the app is served

---

## 3. Setup

### 3.1. Import declarations and include base styles

Create a `setupMercury.ts` file with the required imports and logic, then run it from a client component so it executes in the browser

`src/setupMercury.ts`

```ts
// setupMercury.ts
import { defineCustomElements } from "@genexus/chameleon-controls-library/loader";
import { registryProperty } from "@genexus/chameleon-controls-library/dist/collection";

import { getImagePathCallbackDefinitions } from "@genexus/mercury/assets-manager.js";
import { registerMercury } from "@genexus/mercury/register-mercury.js";
import { setBundleMapping } from "@genexus/mercury/bundles.js";

import { bundleToHashMappings } from "../node_modules/.genexus/mercury/bundle-to-hash-mappings.js";

export function setupMercury() {
  // Establishes the mapping between bundle names and their generated hashes.
  setBundleMapping(bundleToHashMappings);

  registerMercury();
  registryProperty("getImagePathCallback", getImagePathCallbackDefinitions);
  defineCustomElements(window);

  // Insert base and icons CSS bundles dynamically
  const head = document.head;

  const linkBase = document.createElement("link");
  linkBase.rel = "stylesheet";
  linkBase.href = `{{ CSS bundles final path }}${bundleToHashMappings["base/base"]}.css`;
  head.appendChild(linkBase);

  const linkIcons = document.createElement("link");
  linkIcons.rel = "stylesheet";
  linkIcons.href = `{{ CSS bundles final path }}${bundleToHashMappings["base/icons"]}.css`;
  head.appendChild(linkIcons);
}
```

`src/components/MercuryProvider.tsx`

```tsx
"use client";

import { useEffect } from "react";
import { setupMercury } from "../setupMercury";

export default function MercuryProvider({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setupMercury();
  }, []);

  return <>{children}</>;
}
```

`app/layout.tsx`

```tsx
import MercuryProvider from "../components/MercuryProvider";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MercuryProvider>{children}</MercuryProvider>
      </body>
    </html>
  );
}
```

> [!IMPORTANT] `setBundleMapping` and `bundleToHashMappings` must run before any Mercury or Chameleon usage. That is why `setupMercury` is run in a client component that wraps the app

### 3.2 Create React Web Component wrappers

Starting with Chameleon `6.4.0`, use the CLI to generate React wrappers for Web Components:

```bash
npx chameleon-generate-react <output dir (optional)>
```

If no output dir is passed, wrappers are generated under `./src/chameleon-components`

> [!TIP]
> Add this to your package.json scripts before dev/build (e.g. `"build.chameleon": "chameleon-generate-react"`). It runs in under ~300ms

Example scripts:

```json
  "scripts": {
    "dev": "npm run build.mercury && npm run copy-assets && npm run build.chameleon && ...",
    "build": "npm run build.mercury && npm run copy-assets && npm run build.chameleon && ...",
    "build.chameleon": "chameleon-generate-react <output dir (optional)>"
    // your other scripts...
  }
```

### 3.3. Set the dark/light mode

Add the `light` or `dark` class on the `<html>` element in your root layout

**Dark** — `src/app/layout.tsx`

```tsx
return (
  <html lang="en" className="dark">
    <body>
      <MercuryProvider>{children}</MercuryProvider>
    </body>
  </html>
);
```

**Light** — `src/app/layout.tsx`

```tsx
return (
  <html lang="en" className="light">
    <body>
      <MercuryProvider>{children}</MercuryProvider>
    </body>
  </html>
);
```

### 3.4. Creating your components

Example component using Mercury bundles and `ChTheme`:

`src/components/custom-dialog/CustomDialog.tsx`

```tsx
"use client";
import { getIconPath } from "@genexus/mercury/assets-manager.js";
import { getBundles } from "@genexus/mercury/bundles.js";
import { ChTheme, ChImage } from "../../chameleon-components";

const CSS_BUNDLES = getBundles(
  ["components/button", "components/icon"],
  "/assets/css/"
);

const ICON = getIconPath({
  category: "system",
  name: "add-circle",
  colorType: "primary"
});

export const CustomDialog = () => (
  <>
    <ChTheme model={CSS_BUNDLES}></ChTheme>
    <button className="button-primary button-icon-and-text" type="button">
      <ChImage className="icon-md" src={ICON} type="mask" />
      Caption
    </button>
  </>
);
```

**Code explained:** `getBundles` returns the theme model for the button and icon bundles. `ChTheme` applies those CSS bundles. `getIconPath` provides the icon source. Use the **Component → bundles table** in this skill to choose which bundles to request; use the **Bundles index** for class names

Expected structure:

```plaintext
📁 src
├── 📁 app
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 chameleon-components
├── 📁 components
│   ├── 📁 custom-dialog
│   │   └── 📄 CustomDialog.tsx
│   └── 📄 MercuryProvider.tsx
└── 📄 setupMercury.ts
```

`app/page.tsx`

```tsx
import { CustomDialog } from "@/components/custom-dialog/CustomDialog";
export default function Home() {
  return (
    <div>
      <CustomDialog></CustomDialog>
    </div>
  );
}
```

---

## Next steps

Use the **Component → Mercury CSS bundles table** and **Bundles index** in this skill to choose the right bundles and CSS classes for each Chameleon component you use
