# Installation for React (with Vite)

- [1. Preparation](#1-preparation)
- [2. Use the `vite-plugin-mercury` extension](#2-use-the-vite-plugin-mercury-extension)
- [3. Setup](#3-setup)

## 1. Preparation

> [!IMPORTANT]
> This guide assumes you are using Mercury >= `0.36.0`, which is the minimum version for using the `vite-plugin-mercury` plugin

### 1.1. Decide the assets paths

First of all, you must decide the paths where the CSS bundles, font assets, and icon set will be contained in the `dist` folder of your final application. Keep them noted down, as we will refer to them in the next steps

We will refer to those paths with the following names:

| Reference                      | Meaning                                                                                | Example          |
| ------------------------------ | -------------------------------------------------------------------------------------- | ---------------- |
| `{{ CSS bundles final path }}` | Path in the final application (`dist` folder) where the CSS bundles will be consumed.  | `/assets/css/`   |
| `{{ Fonts final path }}`       | Path in the final application (`dist` folder) where the custom fonts will be consumed. | `/assets/fonts/` |
| `{{ Icons final path }}`       | Path in the final application (`dist` folder) where the icons will be consumed.        | `/assets/icons/` |

### 1.2. Install the dependencies

1. If you haven't already, install Mercury and Chameleon: `npm i @genexus/chameleon-controls-library @genexus/mercury`

2. Install the `vite-plugin-mercury` devDependency that automates the Mercury setup process

   ```bash
   npm i --save-dev @genexus/vite-plugin-mercury
   ```

## 2. Use the `vite-plugin-mercury` extension

In the `vite.config.ts` file add the following:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mercury } from "@genexus/vite-plugin-mercury"; // <-- import mercury plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    mercury({
      // Optional
      assetsPaths: {
        // Path where the CSS files of Mercury are located in the distribution build.
        cssPath: "{{ CSS bundles final path }}", // Defaults to "/assets/css/"

        // Path where the font files of Mercury are located in the distribution build.
        fontsPath: "{{ Fonts final path }}", // Defaults to "/assets/fonts/"

        // Path where the icon files of Mercury are located in the distribution build.
        iconsPath: "{{ Icons final path }}" // Defaults to "/assets/icons/"
      }

      // More options...
    })
  ]
});
```

## 3. Setup

### 3.1. Import declarations and include base styles

Include the required imports at the application's entry point to properly configure and bootstrap Mercury with Chameleon. To stay organized, use a separate file named `setupMercury.ts`, and then include it in the entry point

`src/setupMercury.ts`

```ts
import { defineCustomElements } from "@genexus/chameleon-controls-library/loader";
import { registryProperty } from "@genexus/chameleon-controls-library/dist/collection";

import { getImagePathCallbackDefinitions } from "@genexus/mercury/assets-manager.js";
import { registerMercury } from "@genexus/mercury/register-mercury.js";

// It registers a mapping between the icons metadata and its path.
registerMercury();

// Register the default value for the getImagePathCallback property in all Chameleon
// components. This implementation allows us to remove the need for binding the
// getImagePathCallback property in all Chameleon controls that must render icons.
registryProperty("getImagePathCallback", getImagePathCallbackDefinitions);

// Setup the auto-loader for Chameleon components
defineCustomElements(window);
```

`main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./setupMercury"; // <-- include setup before App
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 3.2 Create React Web Component wrappers

React wrappers enable smooth integration of Web Components into React by adapting their properties and events to React's props and event system

Starting with Chameleon version `6.4.0`, there is a CLI to create React Web Component wrappers. To create the wrappers, run:

```bash
npx chameleon-generate-react <output dir (optional)>
```

If no output flag is passed, the wrappers will be generated under `/src`:

```bash
./src/chameleon-components
```

> [!TIP]
> We recommend adding this command to your package.json file before running the dev server and production builds, as it takes less than 300ms to execute

For example:

```json
  "scripts": {
    "dev": "npm run build.chameleon && ...",
    "build": "npm run build.chameleon && ...",
    // your other scripts...
    "build.chameleon": "chameleon-generate-react <output dir (optional)>"
  }
```

> [INFO] If you are in a monorepo environment, you may need to run the script with `npx chameleon-generate-react`, `yarn chameleon-generate-react`, etc.

### 3.3. Set the dark/light mode

Mercury supports both dark and light modes. Add the `light` or `dark` class on the `<html>` tag. This toggles the color scheme for all components and icons

**Dark theme setup** — `index.html`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr" class="dark">
  <head></head>
  <body></body>
</html>
```

**Light theme setup** — `index.html`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr" class="light">
  <head></head>
  <body></body>
</html>
```

### 3.4. Creating your components

Example: a simple component that uses Mercury CSS bundles and `ch-theme`

`src/components/custom-dialog/CustomDialog.tsx` (example component)

```tsx
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

**Code explained:** The component imports `getBundles` to get the button and icon bundles `["components/button", "components/icon"]`, and `getIconPath` for the icon source. `ChTheme` (Chameleon's theme component) applies the CSS bundles. Use the **Component → bundles table** in this skill to choose which bundles to pass for each component; use the **Bundles index** for class names (e.g. `button-primary`, `button-icon-and-text`)

`src/App.tsx`

```tsx
import "./App.css";

import { CustomDialog } from "./components/custom-dialog/CustomDialog";

function App() {
  return (
    <>
      <CustomDialog></CustomDialog>
    </>
  );
}

export default App;
```

Expected structure:

```plaintext
📁 src
├── 📁 chameleon-components
├── 📁 components
│   └── 📁 custom-dialog
│       └── 📄 CustomDialog.tsx
├── 📄 App.tsx
└── 📄 main.tsx
```

---

## Next steps

Use the **Component → Mercury CSS bundles table** and **Bundles index** in this skill to choose the right bundles and CSS classes for each Chameleon component you use
