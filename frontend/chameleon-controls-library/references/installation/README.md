# Chameleon installation by framework

Install Chameleon first:

```bash
npm i @genexus/chameleon-controls-library --save
```

## React (with Vite)

1. Install Chameleon and generate React wrappers:

   ```bash
   npm i @genexus/chameleon-controls-library --save
   npx chameleon-generate-react ./src/chameleon-components
   ```

2. Add to `package.json` (run before dev/build):

   ```json
   "build.chameleon": "chameleon-generate-react ./src/chameleon-components",
   "dev": "npm run build.chameleon && ...",
   "build": "npm run build.chameleon && ..."
   ```

3. In your entry point (e.g. `main.tsx`):

   ```ts
   import { defineCustomElements } from "@genexus/chameleon-controls-library/loader";
   defineCustomElements(window);
   ```

4. Use the generated wrappers in your components (e.g. `ChAccordionRender`, `ChEdit`)

## Angular

1. Install Chameleon:

   ```bash
   npm i @genexus/chameleon-controls-library --save
   ```

2. In `src/main.ts` (or equivalent):

   ```ts
   import { defineCustomElements } from "@genexus/chameleon-controls-library/loader";
   defineCustomElements(window);
   ```

3. Add `CUSTOM_ELEMENTS_SCHEMA` to your NgModule if needed so Angular recognizes custom elements

## Stencil

1. Install Chameleon:

   ```bash
   npm i @genexus/chameleon-controls-library --save
   ```

2. In `src/index.ts`:

   ```ts
   import "@genexus/chameleon-controls-library";
   ```

3. Use Chameleon components in your templates/JSX

## Script tag (no bundler)

Add to your HTML:

```html
<script
  src="node_modules/@genexus/chameleon-controls-library/dist/chameleon/chameleon.esm.js"
  type="module"
></script>
```

Or from CDN:

```html
<script
  src="https://unpkg.com/@genexus/chameleon-controls-library@latest/dist/chameleon/chameleon.esm.js"
  type="module"
></script>
```
