# Performance best practices

## Virtualization

For long lists or grids, use virtualization to render only visible items:

- **ch-virtual-scroller** — Virtual scrolling for large lists
- **ch-tabular-grid-virtual-scroller** — Virtual scrolling for grid rows
- **ch-tabular-grid-infinite-scroll** — Infinite scroll for grids

## Heavy components

Some components load large dependencies. Lazy-load when possible:

- **ch-code-editor** — Monaco editor; requires Web Workers copy task. Load only when the user opens a code editor
- **ch-math-viewer** — KaTeX; load only when math content is present
- **ch-chat** — Consider lazy-loading if the chat is not immediately visible

## React: chameleon-generate-react

When using Chameleon in React, run `chameleon-generate-react` before dev and build:

```bash
npx chameleon-generate-react ./src/chameleon-components
```

Add to `package.json`:

```json
"build.chameleon": "chameleon-generate-react <output dir>",
"dev": "npm run build.chameleon && ...",
"build": "npm run build.chameleon && ..."
```

Execution takes less than 300ms

## Reduce re-renders

In React/Angular, avoid passing new object/array references on every render:

- Use `useCallback` for event handlers passed to Chameleon components
- Use `useMemo` for model arrays when the data hasn't changed
- Memoize parent components when Chameleon is used in frequently re-rendered trees
