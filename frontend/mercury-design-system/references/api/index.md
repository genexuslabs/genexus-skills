# @genexus/mercury (main entry)

The main export re-exports from:

- `./assets-manager.js`
- `./bundles.js`
- `./register-mercury.js`
- `./components/chat/render.lit.js`
- Types from `./types.js` and `./components/chat/types`

Use the main entry when you need multiple Mercury APIs. For tree-shaking, import from the specific subpaths (e.g. `@genexus/mercury/bundles.js`)
