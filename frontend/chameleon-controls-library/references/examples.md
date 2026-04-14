# Chameleon Examples

Real-world component composition patterns. Use these as templates when building similar UIs

## App shell with sidebar navigation and tabs

A common enterprise layout: collapsible sidebar with hierarchical navigation, and tabbed content area

```html
<ch-sidebar accessibleName="Main navigation">
  <ch-navigation-list-render
    model={navigationModel}
    accessibleName="Navigation"
  ></ch-navigation-list-render>
</ch-sidebar>

<main>
  <ch-tab-render model={tabModel}></ch-tab-render>
  <!-- Tab content rendered here based on selection -->
</main>
```

Key points:
- `ch-sidebar` wraps the navigation — it handles collapse/expand behavior
- `ch-navigation-list-render` supports hierarchical items (nested children in the model)
- `ch-tab-render` manages tabbed content. The `model` defines tab labels and IDs
- Use `accessible-name` on both sidebar and navigation for screen readers

## Form with labels and accessible controls

Always prefer HTML `<label>` elements linked via `for`/`id` over the `accessible-name` property. Labels are visible and provide a better UX

```html
<form>
  <div>
    <label for="name-input">Full name</label>
    <ch-edit id="name-input" type="text"></ch-edit>
  </div>

  <div>
    <label for="country-combo">Country</label>
    <ch-combo-box-render
      id="country-combo"
      model={countryModel}
    ></ch-combo-box-render>
  </div>

  <div>
    <label for="plan-radio">Plan</label>
    <ch-radio-group-render
      id="plan-radio"
      model={planModel}
      aria-label="Select plan"
    ></ch-radio-group-render>
  </div>

  <div>
    <ch-checkbox caption="I agree to the terms"></ch-checkbox>
  </div>

  <button type="submit">Submit</button>
</form>
```

Key points:
- Link `<label for="X">` with component `id="X"` for every form control
- `ch-checkbox` has a built-in `caption` prop — no separate label needed
- `ch-radio-group-render` uses `aria-label` (not `accessible-name`) for group labeling
- Buttons are native `<button>`, never a `ch-*` component

## Chat interface with code and markdown

```html
<ch-chat
  items={chatMessages}
  accessibleName="AI Assistant"
></ch-chat>
```

Key points:
- `ch-chat` **renders a send button by default** — don't add a separate one
- It internally uses `ch-code` and `ch-markdown-viewer` for message rendering — no need to manually compose them

For standalone code display outside chat:
```html
<ch-code language="typescript" value={codeString}></ch-code>
<ch-markdown-viewer value={markdownString}></ch-markdown-viewer>
```

## IDE-style layout with resizable panels

```html
<ch-flexible-layout-render
  model={layoutModel}
></ch-flexible-layout-render>
```

For simpler two-panel splits without full IDE behavior:
```html
<ch-layout-splitter>
  <div slot="start">Left panel</div>
  <div slot="end">Right panel</div>
</ch-layout-splitter>
```

Key points:
- `ch-flexible-layout-render` for complex multi-pane dockable layouts (IDE, dashboards)
- `ch-layout-splitter` for simple resizable two-panel splits
- Don't use either for layouts without user-resizable dividers — use CSS Grid/Flexbox instead

## Data grid with virtual scrolling

```html
<ch-tabular-grid row-selection-mode="single">
  <ch-tabular-grid-columnset>
    <ch-tabular-grid-column column-name="Name"></ch-tabular-grid-column>
    <ch-tabular-grid-column column-name="Email"></ch-tabular-grid-column>
  </ch-tabular-grid-columnset>
  <ch-tabular-grid-rowset>
    <ch-tabular-grid-row>
      <ch-tabular-grid-cell>John Smith</ch-tabular-grid-cell>
      <ch-tabular-grid-cell>js@company.com</ch-tabular-grid-cell>
    </ch-tabular-grid-row>
  </ch-tabular-grid-rowset>
</ch-tabular-grid>

  <ch-tabular-grid-virtual-scroller></ch-tabular-grid-virtual-scroller>
</ch-tabular-grid>
```

For card-based virtual scrolling (not tabular):
```html
<ch-virtual-scroller
  items={items}
  renderItem={renderCard}
></ch-virtual-scroller>
```

Key points:
- `ch-tabular-grid` + `ch-tabular-grid-virtual-scroller` for large tabular data
- `ch-virtual-scroller` for card grids, lists, or any non-tabular virtualized content
- `ch-smart-grid` for simpler grids without full tabular-grid features

## ch-theme placement

`ch-theme` always has the `hidden` attribute. Never place children inside it — use it as a sibling element before the UI tree

```html
<!-- Correct: ch-theme as sibling -->
<ch-theme model={themeModel}></ch-theme>
<div class="app">
  <!-- Your UI here -->
</div>

<!-- WRONG: children inside ch-theme will be hidden -->
<ch-theme model={themeModel}>
  <div class="app">...</div>
</ch-theme>
```
