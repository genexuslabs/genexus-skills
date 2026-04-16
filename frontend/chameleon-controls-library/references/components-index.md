# Chameleon Components Index

**Total: 58 components** across 11 categories. This is the exhaustive catalog — if a component is not listed here, it does not exist in Chameleon

Each component has its own directory with up to three documentation files:
- **README.md** — Properties, events, slots, shadow parts, CSS custom properties, and dependencies
- **usage.md** — Usage examples, patterns, do's and don'ts
- **styling.md** — Shadow parts reference, CSS custom properties, shadow DOM layout, styling recipes, and anti-patterns

For TypeScript types used in component properties/events, see [Types index](types-index.md)

---

## Layout (4 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-theme** | Loads and injects CSS stylesheets at runtime. The bridge between Chameleon components and any Design System (via `getBundles`). **Always hidden** — never place children inside it; use as a sibling element. | Every app that uses a Design System with Chameleon. Lazy-loading CSS theme files at runtime (dark mode, brand themes). Preventing flash of unstyled content before themes are applied. | Never wrap UI children inside ch-theme (it has `hidden`). Styles can be included as a static stylesheet link at build time — no runtime loading needed. | [API](components/ch-theme/README.md) · [Usage](components/ch-theme/usage.md) · [Styling](components/ch-theme/styling.md) |
| **ch-flexible-layout-render** | IDE-style multi-pane dockable layout with draggable, resizable, reorderable widgets. Renders a tree of layout items. | Complex workspaces: code editors, admin dashboards, multi-panel tools where users rearrange panels. | Simple page layouts — use CSS Grid/Flexbox. Two-panel split — use `ch-layout-splitter` directly. | [API](components/ch-flexible-layout-render/README.md) · [Usage](components/ch-flexible-layout-render/usage.md) · [Styling](components/ch-flexible-layout-render/styling.md) |
| **ch-layout-splitter** | Resizable columns/rows with draggable dividers. Supports nested splits and constraints (min/max sizes). | Side-by-side panels with user-resizable dividers (e.g., editor + preview, main + sidebar). | Single-column or stacked layouts. Layouts without user-resizable dividers — use CSS Grid. | [API](components/ch-layout-splitter/README.md) · [Usage](components/ch-layout-splitter/usage.md) · [Styling](components/ch-layout-splitter/styling.md) |
| **ch-sidebar** | Collapsible side panel that toggles between expanded and collapsed states. | Primary/secondary navigation drawers, tool palettes, contextual panels that can be hidden to save space. | Temporary floating overlays (use `ch-dialog`/`ch-popover`). Content that must always be visible. | [API](components/ch-sidebar/README.md) · [Usage](components/ch-sidebar/usage.md) · [Styling](components/ch-sidebar/styling.md) |

## Forms (9 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-edit** | Rich text input wrapping native `<input>`/`<textarea>`. Supports multiline auto-grow, debounce, picture formatting, action buttons, and multiple types (text, password, search, number, email, etc.). | Any text input: forms, search bars, chat inputs, formatted fields. The default choice for text entry. Never use placeholder text as a substitute for a visible `<label>`. | Selecting from options (use `ch-combo-box-render`). Boolean toggles (use `ch-switch`). Bounded numeric range where approximate value is OK (use `ch-slider`). Values from a fixed list (use `ch-combo-box-render` or `ch-radio-group-render`). | [API](components/ch-edit/README.md) · [Usage](components/ch-edit/usage.md) · [Styling](components/ch-edit/styling.md) |
| **ch-checkbox** | Standard checkbox with indeterminate (tri-state) support. | Binary or tri-state selection in forms/settings/tree views. Multi-select from a list, filtering, batch operations (select-all rows), "agree to terms" patterns. | On/off toggle semantics (use `ch-switch`). Mutually exclusive choices (use `ch-radio-group-render`). Immediate effect without confirmation step (use `ch-switch`). List exceeds 7 items (use `ch-combo-box-render` with multiple selection). | [API](components/ch-checkbox/README.md) · [Usage](components/ch-checkbox/usage.md) · [Styling](components/ch-checkbox/styling.md) |
| **ch-combo-box-render** | Combo box with searchable dropdown popover. Supports single/multi-select, grouped options, suggest mode, and filtering. | Selecting from long lists (>7 options), autocomplete, tag pickers, any select/dropdown need. Searchable or filterable input with grouped options. | Binary yes/no (use `ch-checkbox`/`ch-switch`). 2–3 always-visible options (use `ch-radio-group-render`). Navigation links — never use a combo box to navigate between pages. | [API](components/ch-combo-box-render/README.md) · [Usage](components/ch-combo-box-render/usage.md) · [Styling](components/ch-combo-box-render/styling.md) |
| **ch-radio-group-render** | Mutually exclusive option group rendered as radio buttons. | 2–7 mutually exclusive choices where all must be visible at once. The choice is part of a form that requires a submit step. | More than 7–8 options (use `ch-combo-box-render`). Non-mutually-exclusive choices (use `ch-checkbox`). Compact inline toggling (use `ch-segmented-control-render`). Setting takes immediate effect (use `ch-switch`). A single radio in isolation — radios must always work as a group. | [API](components/ch-radio-group-render/README.md) · [Usage](components/ch-radio-group-render/usage.md) · [Styling](components/ch-radio-group-render/styling.md) |
| **ch-slider** | Numeric value selection within a defined range via draggable handle. | Volume controls, price range filters, any bounded numeric input where approximate value and visual feedback matter. | Exact numeric entry (use `ch-edit` type="number"). Extremely large ranges where precision matters (use `ch-edit`). Very small range with 2–3 discrete steps (use `ch-radio-group-render`). Qualitative increments like Small/Medium/Large (use `ch-radio-group-render`). | [API](components/ch-slider/README.md) · [Usage](components/ch-slider/usage.md) · [Styling](components/ch-slider/styling.md) |
| **ch-switch** | Toggle switch for immediate on/off actions. | Settings toggles (dark mode, notifications), feature flags, any boolean with instant, reversible effect. | Form fields submitted later (use `ch-checkbox`). Multi-state choices (use `ch-combo-box-render`/`ch-radio-group-render`/`ch-segmented-control-render`). Destructive or irreversible actions — always require explicit confirmation instead. | [API](components/ch-switch/README.md) · [Usage](components/ch-switch/usage.md) · [Styling](components/ch-switch/styling.md) |
| **ch-color-picker** | Full color picker with hue/saturation area, alpha slider, and format switching (hex, RGB, HSB). | Theme editors, design tools, any UI where users choose a precise color. | Selecting from predefined brand colors only (use `ch-combo-box-render` or buttons). | [API](components/ch-color-picker/README.md) · [Usage](components/ch-color-picker/usage.md) · [Styling](components/ch-color-picker/styling.md) |
| **ch-color-field** | 2D color selection area (saturation/brightness gradient). Typically used as part of a larger `ch-color-picker` system. | Building a full-featured color picker that requires 2D color selection. Fine-tuning saturation and brightness of a selected hue. | Simple color input field (use `<input type="color">`). Complete color picker experience (use `ch-color-picker`). Basic color selection without 2D gradient interaction. | [API](components/ch-color-field/README.md) · [Styling](components/ch-color-field/styling.md) |
| **ch-rating** | Star/icon-based rating control for numeric scoring input. | Product reviews, feedback forms, satisfaction surveys, any 1-to-N rating input. Displaying aggregated star ratings alongside user-generated content. | Binary like/dislike (use `ch-switch` or buttons). Simple/precise numeric input (use `ch-slider` or `ch-edit`). Display-only scores (remove interactive behaviors and provide alt text). Scale semantics unclear without a legend. | [API](components/ch-rating/README.md) · [Usage](components/ch-rating/usage.md) · [Styling](components/ch-rating/styling.md) |

## Data Display (8 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-accordion-render** | Expandable/collapsible content panels. Supports single or multiple open panels. | FAQ sections, settings groups, progressive disclosure where users consume sections independently. Space-constrained UIs where vertical scrolling is undesirable. | Users likely to read all sections (use plain headings with scrollable content). Interdependent content that must be compared side by side. Sequential step-by-step processes (use a stepper/wizard). Nesting accordions within accordions — disorienting anti-pattern. | [API](components/ch-accordion-render/README.md) · [Usage](components/ch-accordion-render/usage.md) · [Styling](components/ch-accordion-render/styling.md) |
| **ch-action-list-render** | Interactive list with selection, checkboxes, inline editing, drag reorder, pinning, and grouping. | Command palettes, reorderable lists, panel/item managers, selectable collections. | Static display lists. Navigation menus (use `ch-navigation-list-render`). Hierarchical data (use `ch-tree-view-render`). | [API](components/ch-action-list-render/README.md) · [Usage](components/ch-action-list-render/usage.md) · [Styling](components/ch-action-list-render/styling.md) |
| **ch-action-menu-render** | Dropdown menu with nested sub-menus, keyboard navigation, and popover positioning. | Context menus, toolbar overflow menus, "more actions" dropdowns, multi-level menus. | Flat selectable lists (use `ch-action-list-render`). Fewer than 3 actions. Form value selection (use `ch-combo-box-render`). | [API](components/ch-action-menu-render/README.md) · [Usage](components/ch-action-menu-render/usage.md) · [Styling](components/ch-action-menu-render/styling.md) |
| **ch-action-group-render** | Horizontal action bar that responsively collapses overflowing items into a "more" dropdown. | Responsive toolbars, command bars, action sets that must adapt to container width. | Static button groups that always fit. Actions where responsive collapse is unwanted. | [API](components/ch-action-group-render/README.md) · [Usage](components/ch-action-group-render/usage.md) · [Styling](components/ch-action-group-render/styling.md) |
| **ch-tree-view-render** | Hierarchical tree with expand/collapse, selection, checkboxes, drag-and-drop, and lazy loading. | File explorers, category hierarchies, org charts, any parent-child data structure with deep nesting. | Flat or single-level lists (use `ch-action-list-render`). Tabular data (use `ch-tabular-grid`). Primary navigation menu (use `ch-navigation-list-render` — carries proper navigation semantics). Nesting depth >10 levels — UX becomes untenable. | [API](components/ch-tree-view-render/README.md) · [Usage](components/ch-tree-view-render/usage.md) · [Styling](components/ch-tree-view-render/styling.md) |
| **ch-tab-render** | Tabbed interface with closable, draggable, overflow-scrollable tabs and direction support. | Multi-view switching: editor tabs, settings sections, content categories. Organizing related but independent content sections within the same context. | Mutually exclusive value selection (use `ch-segmented-control-render` — segmented controls change the view format of the same data; tabs switch to different content sections). Navigation between pages (use `ch-navigation-list-render`). Sequential linear process (use a stepper/wizard). More than 6 tabs (consider a sidebar or `ch-navigation-list-render`). | [API](components/ch-tab-render/README.md) · [Usage](components/ch-tab-render/usage.md) · [Styling](components/ch-tab-render/styling.md) |
| **ch-segmented-control-render** | Horizontal set of connected segment buttons for mutually exclusive choices. | View toggles (list/grid), filter switches (2-5 options), immediate visual mode selection. | More than 5 options (use `ch-combo-box-render`). Navigation (use tabs or links). Confuse with tabs — segmented controls select a value, tabs switch views. | [API](components/ch-segmented-control-render/README.md) · [Usage](components/ch-segmented-control-render/usage.md) · [Styling](components/ch-segmented-control-render/styling.md) |
| **ch-navigation-list-render** | Hierarchical navigation menu that auto-syncs with `ch-sidebar` and highlights the active link. | Primary/secondary app navigation, sidebar menu structures with expandable sections. Indicating the user's current location within the app. | Flat link lists (use plain HTML `<nav>`). Data trees with checkboxes/drag-and-drop/editing (use `ch-tree-view-render`). Action/command lists (use `ch-action-list-render`). Navigation depth regularly exceeds 2 levels — consider `ch-tree-view-render` or separate pages. | [API](components/ch-navigation-list-render/README.md) · [Usage](components/ch-navigation-list-render/usage.md) · [Styling](components/ch-navigation-list-render/styling.md) |

## Overlays (3 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-dialog** | Modal or non-modal dialog with focus trap, backdrop, resizable/draggable options, and close button. | Confirmation prompts, form wizards, short focused tasks that are infrequent (rename, delete confirmation). | Lightweight anchored overlays (use `ch-popover`). Simple hover hints (use `ch-tooltip`). Non-critical info (use inline notifications/banners). User did not initiate the action — never open a dialog automatically. Nesting dialogs within dialogs — always an anti-pattern. | [API](components/ch-dialog/README.md) · [Usage](components/ch-dialog/usage.md) · [Styling](components/ch-dialog/styling.md) |
| **ch-tooltip** | Lightweight overlay that appears on hover/focus to provide supplementary information. | Labelling icon-only buttons, keyboard shortcut reminders, short non-interactive contextual hints. | Interactive content — links, buttons (use `ch-popover`). Content longer than 1–2 sentences (use `ch-popover`). Critical information users must see without hovering. Disabled elements — they cannot receive focus, making the tooltip inaccessible. | [API](components/ch-tooltip/README.md) · [Usage](components/ch-tooltip/usage.md) · [Styling](components/ch-tooltip/styling.md) |
| **ch-popover** | Positioned floating container anchored to a trigger element. Supports click/hover triggers. | Dropdown panels, filter panels, rich contextual content with interactive elements, any floating container anchored to a trigger. | Full-screen overlays or confirmation prompts (use `ch-dialog`). Simple non-interactive hover hints (use `ch-tooltip`). Nesting popovers inside popovers — always an anti-pattern. | [API](components/ch-popover/README.md) · [Usage](components/ch-popover/usage.md) · [Styling](components/ch-popover/styling.md) |

## Content (5 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-markdown-viewer** | Renders GitHub Flavored Markdown (GFM) to HTML with syntax highlighting, math, and Mermaid diagrams. | Documentation pages, AI chat responses, user-authored content in Markdown, README displays. | Plain text without formatting. HTML content already rendered. Performance-critical pages with very large documents (consider SSR). | [API](components/ch-markdown-viewer/README.md) · [Usage](components/ch-markdown-viewer/usage.md) · [Styling](components/ch-markdown-viewer/styling.md) |
| **ch-code** | Read-only code block with syntax highlighting. Lightweight (no Monaco dependency). | Displaying code snippets, API examples, log outputs, any read-only formatted code. | Editable code (use `ch-code-editor`). Side-by-side diffs (use `ch-code-diff-editor`). Plain text without syntax structure. | [API](components/ch-code/README.md) · [Usage](components/ch-code/usage.md) · [Styling](components/ch-code/styling.md) |
| **ch-math-viewer** | Renders LaTeX math expressions using KaTeX. **Heavy component** — lazy-load it. | Math formulas in educational apps, scientific documentation, any LaTeX rendering. | Simple numbers or units (use plain text). Rare one-off formulas in mostly-text pages (consider a static image). | [API](components/ch-math-viewer/README.md) · [Usage](components/ch-math-viewer/usage.md) · [Styling](components/ch-math-viewer/styling.md) |
| **ch-image** | Multi-state image that automatically reflects its parent container's state (hover, focus, active, disabled). Always `aria-hidden`. | Icons inside buttons/menu items that need state-reactive visuals (e.g., hover highlights). Monochrome icons that inherit parent text color (`type="mask"`). | Standalone photos or illustrations (use native `<img>`). Decorative images (use CSS `background-image`). Meaningful content images that require alt text — this component is always `aria-hidden`. | [API](components/ch-image/README.md) · [Usage](components/ch-image/usage.md) · [Styling](components/ch-image/styling.md) |
| **ch-textblock** | Text/HTML display with multi-line ellipsis truncation (`-webkit-line-clamp`), auto-grow, and overflow detection. | Card descriptions with "show more", truncated previews, any text with clamped overflow detection. Semantic heading role (`h1`–`h6`) without using native heading elements. | Markdown content (use `ch-markdown-viewer`). Static text that never overflows. Rich interactive content. | [API](components/ch-textblock/README.md) · [Usage](components/ch-textblock/usage.md) · [Styling](components/ch-textblock/styling.md) |

## Grid / Tabular (18 components)

The grid system is built around `ch-tabular-grid` as the root, with specialized subcomponents for columns, settings, actions, and scrolling. Most subcomponents are used internally by the grid — you typically only interact with the top-level components

### Top-level grid components

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-tabular-grid** | Full-featured data grid with row/cell selection, column resizing, reordering, sorting, and tree-grid support. The main grid component. | Structured tabular data, spreadsheet-like views, data tables with sorting/filtering, hierarchical tree grids. | Simple lists (use `ch-action-list-render`). Card/tile layouts. Display-only tables with no interaction (use HTML `<table>`). | [API](components/ch-tabular-grid/README.md) · [Usage](components/ch-tabular-grid/usage.md) · [Styling](components/ch-tabular-grid/styling.md) |
| **ch-tabular-grid-render** | Declarative wrapper that renders `ch-tabular-grid` from a model definition. Simplifies grid setup. | When you have a grid model/definition and want declarative rendering instead of imperative setup. | When you need fine-grained imperative control over the grid. | [API](components/ch-tabular-grid-render/README.md) |
| **ch-smart-grid** | Accessible grid layout with infinite scrolling, virtual rendering, and dynamic content loading. Built on `ch-virtual-scroller`. | Card grids, feeds with infinite scroll, chat-like inverse loading, large dynamically-loaded collections. | Tabular row/column data (use `ch-tabular-grid`). Small static lists under ~100 items. | [API](components/ch-smart-grid/README.md) · [Usage](components/ch-smart-grid/usage.md) · [Styling](components/ch-smart-grid/styling.md) |
| **ch-virtual-scroller** | Virtual scrolling engine that renders only visible items plus a buffer. Used inside `ch-smart-grid`. | Large lists (hundreds/thousands of items) inside `ch-smart-grid`. Chat feeds with inverse loading. | Small lists (<100 items). Outside of `ch-smart-grid` — it's designed to work within it. | [API](components/ch-virtual-scroller/README.md) · [Usage](components/ch-virtual-scroller/usage.md) · [Styling](components/ch-virtual-scroller/styling.md) |

### Grid subcomponents (used within ch-tabular-grid)

These are structural parts of the grid. You place them inside `ch-tabular-grid` to configure its behavior

| Component | Purpose | Docs |
|-----------|---------|------|
| **ch-tabular-grid-virtual-scroller** | Enables virtual scrolling for large datasets in the grid. | [API](components/ch-tabular-grid-virtual-scroller/README.md) |
| **ch-tabular-grid-infinite-scroll** | Enables infinite/progressive loading in the grid. | [API](components/ch-tabular-grid-infinite-scroll/README.md) |
| **ch-tabular-grid-settings** | Grid settings panel (column visibility, order). | [API](components/ch-tabular-grid-settings/README.md) |
| **ch-tabular-grid-settings-columns** | Column configuration inside the settings panel. | [API](components/ch-tabular-grid-settings-columns/README.md) · [Styling](components/ch-tabular-grid-settings-columns/styling.md) |
| **ch-tabular-grid-columnset** | Groups columns together. | [API](components/ch-tabular-grid-columnset/README.md) |
| **ch-tabular-grid-column** | Defines a single grid column (header, type, width, sortable). | [API](components/ch-tabular-grid-column/README.md) · [Styling](components/ch-tabular-grid-column/styling.md) |
| **ch-tabular-grid-column-settings** | Per-column settings dialog. | [API](components/ch-tabular-grid-column-settings/README.md) |
| **ch-tabular-grid-column-resize** | Column resize drag handle. | [API](components/ch-tabular-grid-column-resize/README.md) |
| **ch-tabular-grid-column-display** | Column display/visibility logic. | [API](components/ch-tabular-grid-column-display/README.md) |
| **ch-tabular-grid-actionbar** | Toolbar/action bar above the grid. | [API](components/ch-tabular-grid-actionbar/README.md) |
| **ch-tabular-grid-action-settings** | Settings button in the grid's action bar. | [API](components/ch-tabular-grid-action-settings/README.md) |
| **ch-tabular-grid-action-refresh** | Refresh button in the grid's action bar. | [API](components/ch-tabular-grid-action-refresh/README.md) |
| **ch-tabular-grid-row-actions** | Per-row action buttons (edit, delete, etc.). | [API](components/ch-tabular-grid-row-actions/README.md) |
| **ch-tabular-grid-rowset-legend** | Caption/legend for a rowset group. | [API](components/ch-tabular-grid-rowset-legend/README.md) · [Styling](components/ch-tabular-grid-rowset-legend/styling.md) |
| **ch-tabular-grid-rowset-empty** | Empty state message when a rowset has no data. | [API](components/ch-tabular-grid-rowset-empty/README.md) |

## Editors (2 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-code-editor** | Full Monaco Editor with syntax highlighting, IntelliSense, themes, and multi-language support. **Heavy component** — lazy-load it. | In-app code authoring, JSON/YAML editors with validation, configuration editors, any editable code field. | Read-only code display (use `ch-code`). Side-by-side diffs (use `ch-code-diff-editor`). Simple text editing (use `ch-edit`). | [API](components/ch-code-editor/README.md) |
| **ch-code-diff-editor** | Monaco-powered side-by-side or inline diff viewer. **Heavy component** — lazy-load it. | Code review, version comparison, merge conflict resolution, any two-text diff visualization. | Single file editing (use `ch-code-editor`). Read-only single code block (use `ch-code`). | [API](components/ch-code-diff-editor/README.md) |

## Feedback & Loading (2 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-progress** | Progress bar with determinate (percentage) and indeterminate modes. Full ARIA `progressbar` compliance. | File uploads, long-running operations (>5s), downloads, any task with measurable progress. | Quick operations (<5s). Indeterminate loading without a bar (use `ch-status`). Step wizards. | [API](components/ch-progress/README.md) · [Usage](components/ch-progress/usage.md) · [Styling](components/ch-progress/styling.md) |
| **ch-status** | Lightweight loading indicator (spinner) with ARIA live-region announcements. | Button loading states, background operation indicators, indeterminate "working" feedback. | Measurable progress (use `ch-progress`). Step-by-step progress. | [API](components/ch-status/README.md) · [Usage](components/ch-status/usage.md) · [Styling](components/ch-status/styling.md) |

## Chat & Real-time (2 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-chat** | Complete conversational interface with message list, input area, send button, virtual scrolling, live-mode voice (via LiveKit), file/code/markdown rendering, and streaming support. **Renders a send button by default** — don't add your own. Internally uses `ch-code` and `ch-markdown-viewer` for message rendering. **Heavy component** — lazy-load it. | AI chatbots, customer support, any conversational UI with send/receive messages. | Simple message display without user input. Comment threads (use a list). Static FAQ (use `ch-accordion-render`). Don't add a separate send button — ch-chat already includes one. | [API](components/ch-chat/README.md) · [Usage](components/ch-chat/usage.md) · [Styling](components/ch-chat/styling.md) |
| **ch-live-kit-room** | LiveKit integration for real-time audio communication and participant management. | Voice-enabled chat (paired with `ch-chat`), real-time audio rooms, transcription support. | Video conferencing (use dedicated LiveKit UI framework). Text-only chat. | [API](components/ch-live-kit-room/README.md) · [Usage](components/ch-live-kit-room/usage.md) · [Styling](components/ch-live-kit-room/styling.md) |

## Pagination (1 component)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-paginator-render** | Page navigation with page numbers, prev/next, page-size selector, and total-items display. | Large datasets (generally >25 items) split across pages. Data tables, search results, SEO-friendly paginated navigation. | Infinite scroll patterns (use `ch-smart-grid` or `ch-tabular-grid-infinite-scroll`). Dataset small enough for a single page. Linear multi-step form flow (use a stepper). | [API](components/ch-paginator-render/README.md) · [Styling](components/ch-paginator-render/styling.md) |

## Utilities (4 components)

| Component | Description | When to use | When NOT to use | Docs |
|-----------|-------------|-------------|-----------------|------|
| **ch-qr** | Generates and displays QR codes from text/URLs. | Sharing URLs, mobile deep links, payment codes, any text-to-QR encoding. | Scanning QR codes (use `ch-barcode-scanner`). Non-QR barcodes. | [API](components/ch-qr/README.md) · [Usage](components/ch-qr/usage.md) · [Styling](components/ch-qr/styling.md) |
| **ch-barcode-scanner** | Camera-based barcode and QR code scanner using device camera. | Inventory scanning, QR-code login, mobile barcode reading. | Generating QR codes (use `ch-qr`). Desktop-only apps without camera access. | [API](components/ch-barcode-scanner/README.md) · [Usage](components/ch-barcode-scanner/usage.md) · [Styling](components/ch-barcode-scanner/styling.md) |
| **ch-intersection-observer** | Wraps the Intersection Observer API as a declarative web component. Fires events when children enter/leave the viewport. | Lazy-loading content on scroll, infinite scroll triggers, scroll-driven animations, visibility tracking. | Simple scroll listeners. Elements that are always in viewport. | [API](components/ch-intersection-observer/README.md) · [Usage](components/ch-intersection-observer/usage.md) · [Styling](components/ch-intersection-observer/styling.md) |
| **ch-shortcuts** | Loads and displays keyboard shortcut hint overlays (triggered by a key, default F10). Visualizes shortcuts — does not define them. | Power-user shortcut discovery, desktop-app-like shortcut overlays. | Defining/binding keyboard shortcuts (use native event listeners). Apps without keyboard shortcuts. | [API](components/ch-shortcuts/README.md) · [Usage](components/ch-shortcuts/usage.md) · [Styling](components/ch-shortcuts/styling.md) |

---

## Native HTML elements (no Chameleon component)

Chameleon intentionally does not provide components for these — use standard HTML. When using a Design System, apply its CSS classes (see your DS skill):

| Element | Usage | DS integration |
|---------|-------|----------------|
| `<button>` | All buttons (primary, secondary, icon, etc.) | Apply DS button classes |
| `<a>` | All hyperlinks and navigation links | Apply DS link classes |
| `<label>` | Form labels associated with inputs | Apply DS typography classes |
