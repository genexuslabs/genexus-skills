# Mercury API reference

Reference for the JavaScript modules exported by `@genexus/mercury`

| Module | Description |
|--------|-------------|
| [@genexus/mercury (main)](index.md) | Re-exports from bundles, assets-manager, register-mercury, and chat |
| [bundles.js](bundles.md) | `getBundles`, `setBundleMapping`, `getThemeBundles` — theme model for ch-theme |
| [assets-manager.js](assets-manager.md) | Icon/image path helpers and callbacks for Chameleon components |
| [register-mercury.js](register-mercury.md) | `registerMercury()` — one-time registration |
| [MERCURY_ASSETS.js](mercury-assets.md) | Registered icon assets object |
| [components/chat/render.js](chat-render.md) | Chat render functions (actions, content, codeBlock, file, etc.) |
| [components/chat/message-metadata](chat-message-metadata.md) | `MercuryChatMessageMetadata` type |

## Plugin and config

- [Vite plugin options](vite-plugin-options.md) — `MercuryOptions` for vite-plugin-mercury
- [mercury.config](mercury-config.md) — CLI configuration (`overrides` only)
