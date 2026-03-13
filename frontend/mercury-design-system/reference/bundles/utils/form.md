# Form

Bundle name: `"utils/form"`

Implementation: [form.css](./form.css), [form--full.css](./form--full.css)

## Classes

### `field`

Applies to the components: Container elements (e.g., `div`)

Base class for form field containers. Used as a wrapper around a label and its associated control. Should be combined with `field-block` or `field-inline` for layout direction

### `field-block`

Applies to the components: Container elements (e.g., `div`)

Used together with `field`. Arranges the label and control in a vertical (block) layout, with the label on top and the control below

### `field-group`

Applies to the components: Container elements (e.g., `div`)

Groups multiple form fields together in a vertical (block) layout with consistent spacing between them

### `field-group-inline`

Applies to the components: Container elements (e.g., `div`)

Groups multiple form fields together in a horizontal (inline) layout with consistent spacing between them

### `field-group-justified-end`

Applies to the components: Container elements (e.g., `div`)

Groups form fields inline and aligns them to the end (right in LTR) of the container

### `field-group-justified-start`

Applies to the components: Container elements (e.g., `div`)

Groups form fields inline and aligns them to the start (left in LTR) of the container

### `field-inline`

Applies to the components: Container elements (e.g., `div`)

Used together with `field`. Arranges the label and control in a horizontal (inline) layout, with the label on the left and the control on the right

### `label`

Applies to the components: `label`

Styles form labels with consistent typography and spacing. Use the standard HTML `for` attribute to associate labels with their controls

### `label--disabled`

Applies to the components: `label`

Disabled state variant for form labels. Applies dimmed visual styling to indicate the associated control is disabled
