# Layout

Bundle name: `"utils/layout"`

Implementation: [layout.css](./layout.css)

## Classes

### `dialog-footer`

Applies to the components: Footer container within `ch-dialog`

Base class for dialog footer sections. Provides padding and layout structure for action buttons. By default, content is aligned to the end (right). Included in the layout bundle for use in layout contexts

### `dialog-footer-center`

Applies to the components: Footer container within `ch-dialog`

Variant of dialog-footer that centers the footer content horizontally

### `dialog-footer-space-between`

Applies to the components: Footer container within `ch-dialog`

Variant of dialog-footer that distributes footer content with space-between alignment

### `dialog-footer-start`

Applies to the components: Footer container within `ch-dialog`

Variant of dialog-footer that aligns footer content to the start (left)

### `dialog-footer-with-border`

Applies to the components: Footer container within `ch-dialog`

Variant of dialog-footer that adds a top border to visually separate the footer from the dialog body content

### `dialog-header`

Applies to the components: Header container within `ch-dialog`

Styles the dialog header area within a layout context

### `dialog-header-with-border`

Applies to the components: Header container within `ch-dialog`

Variant of dialog-header that adds a bottom border to visually separate the header from the dialog body content

### `layout`

Applies to the components: Container elements (e.g., `div`)

Base class for creating responsive grid layouts. Must be combined with a column variant class (e.g., `layout--cols-2`) to define the number of columns

### `layout--cols-1`

Applies to the components: Container elements (e.g., `div`)

Creates a single-column grid layout. Used with the `layout` base class

### `layout--cols-1-2`

Applies to the components: Container elements (e.g., `div`)

Creates a two-column grid layout where the first column takes 1 fraction and the second takes 2 fractions of the available space. Used with the `layout` base class

### `layout--cols-2`

Applies to the components: Container elements (e.g., `div`)

Creates a two-column grid layout with equal width columns. Used with the `layout` base class

### `layout--cols-2-1`

Applies to the components: Container elements (e.g., `div`)

Creates a two-column grid layout where the first column takes 2 fractions and the second takes 1 fraction of the available space. Used with the `layout` base class

### `layout--cols-3`

Applies to the components: Container elements (e.g., `div`)

Creates a three-column grid layout with equal width columns. Used with the `layout` base class

### `layout--cols-4`

Applies to the components: Container elements (e.g., `div`)

Creates a four-column grid layout with equal width columns. Used with the `layout` base class

### `layout__panel`

Applies to the components: Container elements (e.g., `div`)

Styles individual panels within a layout grid. Each panel represents a column content area
