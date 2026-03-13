# Spacing

Bundle name: `"utils/spacing"`

Implementation: [spacing.css](./spacing.css)

**Restricted use:** These classes are NOT for general-purpose spacing. They read custom properties (`--spacing-body-block-start`, `--spacing-body-block-end`, `--spacing-body-inline-start`, `--spacing-body-inline-end`) that must be defined by a parent container. Without a parent setting these values, the classes have no effect. Certain Mercury components (accordion, dialog, form containers, layouts, tabs) define these properties internally. Use `--spacing-padding-*` and `--spacing-gap-*` tokens for general spacing needs

## Classes

### `spacing-body`

Applies to the components: Elements inside Mercury containers that define spacing custom properties (accordion, dialog, tabs, layouts)

Applies consistent body padding on all four sides (block-start, block-end, inline-start, inline-end). Requires a parent that sets `--spacing-body-*` custom properties. Used inside content areas of components like accordions, tabs, dialogs, and IDE/shell plugins

### `spacing-body-block`

Applies to the components: Any container element (e.g., `div`)

Applies body padding on both block sides (top and bottom) only

### `spacing-body-block-end`

Applies to the components: Any container element (e.g., `div`)

Applies body padding on the block-end side (bottom) only

### `spacing-body-block-start`

Applies to the components: Any container element (e.g., `div`)

Applies body padding on the block-start side (top) only

### `spacing-body-inline`

Applies to the components: Any container element (e.g., `div`)

Applies body padding on both inline sides (left and right) only

### `spacing-body-inline-end`

Applies to the components: Any container element (e.g., `div`)

Applies body padding on the inline-end side (right in LTR) only

### `spacing-body-inline-start`

Applies to the components: Any container element (e.g., `div`)

Applies body padding on the inline-start side (left in LTR) only
