# Component → Mercury CSS bundles

This table lists which Mercury CSS bundles apply to each Chameleon component or native element. Use it to know which bundles to pass to `getBundles()` when using a given component

**36 components/elements mapped to 28 component bundles + 6 utility bundles.**

| Component | Mercury CSS bundles |
| --------- | ------------------- |
| `a` | "components/button", "utils/link" |
| `button` | "components/button" |
| `ch-accordion-render` | "components/accordion" |
| `ch-action-list-render` | "components/list-box" |
| `ch-action-menu-render` | "components/dropdown" |
| `ch-chat` | "components/chat" |
| `ch-checkbox` | "components/checkbox" |
| `ch-code` | "components/code" |
| `ch-code-editor` | "components/code" |
| `ch-code-diff-editor` | "components/code" |
| `ch-combo-box-render` | "components/combo-box" (default) or "components/pills" (pill variant) |
| `ch-dialog` | "components/dialog", "utils/layout" |
| `ch-dropdown` | "components/dropdown" |
| `ch-edit` | "components/edit" |
| `ch-flexible-layout-render` | "components/flexible-layout" |
| `ch-image` | "components/icon" |
| `ch-layout-splitter` | "components/layout-splitter" |
| `ch-markdown-viewer` | "components/markdown-viewer" (already includes code block styles — no need to add "components/code" separately) |
| `ch-navigation-list-render` | "components/navigation-list" |
| `ch-paginator-render` | "components/paginator" |
| `ch-property-grid` | "components/tabular-grid" |
| `ch-radio-group-render` | "components/radio-group" |
| `ch-segmented-control-render` | "components/segmented-control" |
| `ch-sidebar` | "components/sidebar" |
| `ch-slider` | "components/slider" |
| `ch-switch` | "components/switch" |
| `ch-tab-render` | "components/tab" |
| `ch-tabular-grid` | "components/tabular-grid" |
| `ch-tabular-grid-cell` | "components/tabular-grid" |
| `ch-tabular-grid-column` | "components/tabular-grid" |
| `ch-tabular-grid-column-set` | "components/tabular-grid" |
| `ch-tabular-grid-row` | "components/tabular-grid" |
| `ch-tabular-grid-rowset` | "components/tabular-grid" |
| `ch-tooltip` | "components/tooltip" |
| `ch-tree-view-render` | "components/tree-view" |
| `div` | "components/button", "components/icon", "components/pills", "components/widget", "components/ticket-list", "utils/elevation", "utils/form", "utils/layout", "utils/spacing", "utils/typography" |
| `label` | "utils/form" |

**Notes:**
- `ch-combo-box-render`: Use `"components/combo-box"` for the standard dropdown combo-box. Use `"components/pills"` instead when styling the combo-box as a pill selector. They are two distinct visual variants — don't include both unless you have both styles in the same view
- `ch-action-menu-render`: The `"components/dropdown"` bundle is specifically for action menus. Don't use it for regular buttons
- `a` and `button`: Only need `"components/button"`. Add `"components/chat"` only when buttons are inside `ch-chat`, or `"components/dropdown"` only when inside `ch-action-menu-render`. For styled links (`a`), also use `"utils/link"` (provides `link-primary`, `link-secondary`, `link-tertiary`)
- `div` bundles: Most `div` bundles are contextual — only include the ones relevant to what's inside the div (e.g., `"utils/typography"` for text content, `"components/widget"` for flexible-layout widgets, `"components/ticket-list"` for ticket list items)

## Component → CSS class quick reference

The Mercury CSS class on a component does **not** always match the bundle name. This table gives the primary class for each component — check the bundle `.md` for the full list of classes (variants, error states, etc.)

| Component | Bundle | Primary CSS class(es) |
| --------- | ------ | -------------------- |
| `button` | components/button | `button-primary`, `button-secondary`, `button-tertiary` |
| `a` | components/button, utils/link | `button-*` (button-styled) or `link-primary`, `link-secondary`, `link-tertiary` (text links) |
| `ch-accordion-render` | components/accordion | `accordion-filled`, `accordion-outlined` |
| `ch-chat` | components/chat | `chat` |
| `ch-checkbox` | components/checkbox | `checkbox` |
| `ch-code` | components/code | _(no class needed — styles apply automatically)_ |
| `ch-combo-box-render` | components/combo-box | `combo-box` |
| `ch-dialog` | components/dialog | `dialog` |
| `ch-edit` | components/edit | `input` (not "edit") |
| `ch-image` | components/icon | `icon-xs`, `icon-s`, `icon-m`, `icon-l`, `icon-xl`, `icon-xxl` |
| `ch-markdown-viewer` | components/markdown-viewer | _(no class needed — styles apply automatically)_ |
| `ch-navigation-list-render` | components/navigation-list | `navigation-list` |
| `ch-radio-group-render` | components/radio-group | `radio-group` |
| `ch-segmented-control-render` | components/segmented-control | `segmented-control` |
| `ch-sidebar` | components/sidebar | `sidebar` |
| `ch-slider` | components/slider | `slider` |
| `ch-switch` | components/switch | `switch-large`, `switch-small` |
| `ch-tab-render` | components/tab | `tab` |
| `ch-tabular-grid` | components/tabular-grid | `tabular-grid` |
| `ch-tooltip` | components/tooltip | `tooltip` |
| `ch-tree-view-render` | components/tree-view | `tree-view` |
| `label` | utils/form | `label` |
| `div` (form container) | utils/form | `field`, `field-block`, `field-inline`, `field-group`, `field-group-inline` |

## Form layout classes (utils/form bundle)

Mercury provides a structured form layout system through the `utils/form` bundle:

| Class | Purpose |
| ----- | ------- |
| `label` | Styles `<label>` elements |
| `field` | Base container for a single form field (wraps label + control) |
| `field-block` | Vertical layout — label on top, control below |
| `field-inline` | Horizontal layout — label on left, control on right |
| `field-group` | Groups multiple `field` containers vertically with consistent spacing |
| `field-group-inline` | Groups multiple `field` containers horizontally |
| `field-group-justified-start` | Inline group aligned to start |
| `field-group-justified-end` | Inline group aligned to end |

**Form pattern:**
```html
<form class="field-group">
  <div class="field field-block">
    <label class="label" for="name">Name</label>
    <ch-edit class="input" id="name" type="text"></ch-edit>
  </div>
  <div class="field field-block">
    <label class="label" for="country">Country</label>
    <ch-combo-box-render class="combo-box" id="country" model={model}></ch-combo-box-render>
  </div>
  <button class="button-primary" type="submit">Save</button>
</form>
```

The detailed documentation and CSS for each bundle are in `references/bundles/<category>/` — the `.md` and `.css` files live in the same folder (e.g. `bundles/components/button.md` and `bundles/components/button.css`)
