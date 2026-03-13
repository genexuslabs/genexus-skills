# Angular + Chameleon — Implementation Patterns

Reference for implementing the WW pattern with Angular standalone components and Chameleon web components.

---

## Project setup

### Installation
```bash
npm i @genexus/chameleon-controls-library
```

> **Version requirement**: See `chameleon-details.md` § Version requirement for minimum version.

For custom DS: no additional packages. DS CSS is served as static assets.

### main.ts
```ts
import { defineCustomElements } from '@genexus/chameleon-controls-library/loader';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

defineCustomElements(window);
bootstrapApplication(App, appConfig);
```

### index.html — DS base styles via `<link>`
```html
<link rel="stylesheet" href="assets/ds/base/base.css">
<link rel="stylesheet" href="assets/ds/scope/dark.css">
```

### angular.json — polyfills + DS assets config

`zone.js` **must** be listed in the `polyfills` array. Without it Angular cannot detect changes and the screen renders blank — no error is thrown.

```json
{
  "polyfills": ["zone.js"],
  "assets": [
    {
      "glob": "**/*",
      "input": "design-system",
      "output": "assets/ds"
    }
  ]
}
```

---

## DsLoaderService

Injects DS component CSS lazily into `<head>`. Load in each component's `ngOnInit`.

```ts
@Injectable({ providedIn: 'root' })
export class DsLoaderService {
  private loaded = new Set<string>();
  load(...paths: string[]): void {
    paths.forEach(p => {
      if (this.loaded.has(p)) return;
      this.loaded.add(p);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `assets/ds/${p}.css`;
      document.head.appendChild(link);
    });
  }
}
```

Usage in component:
```ts
ngOnInit(): void {
  this.ds.load(
    'components/button', 'components/dialog', 'components/edit',
    'components/tabular-grid', 'components/combo-box',
    'utils/form'
  );
}
```

Load `utils/layout` globally in `App.ngOnInit` — it's used by all components.

---

## App component

The app component owns `ch-tab-render` inside an app shell wrapper. The view switcher is absolutely positioned at the top-right of the shell, aligned with the tab strip. Each entity component is placed as a named slot matching its tab id.

```html
<!-- app.html -->
<div class="app-shell">
  <ch-tab-render
    class="tab"
    [model]="tabsModel"
    [selectedId]="nav.activeTab"
    (selectedItemChange)="nav.activeTab = $event.detail.newSelectedId"
  >
    <app-entity-a slot="entity-a"></app-entity-a>
    <app-entity-b slot="entity-b"></app-entity-b>
  </ch-tab-render>
  <div class="global-view-switcher">
    <button class="button-tertiary view-button" [class.view-button-active]="nav.detailView === 'bottom'"
      type="button" title="Top-Bottom" (click)="nav.setDetailView('bottom')">↕</button>
    <button class="button-tertiary view-button" [class.view-button-active]="nav.detailView === 'side'"
      type="button" title="Side by Side" (click)="nav.setDetailView('side')">↔</button>
    <button class="button-tertiary view-button" [class.view-button-active]="nav.detailView === 'dialog'"
      type="button" title="Dialog" (click)="nav.setDetailView('dialog')">⊞</button>
  </div>
</div>
```

### app.css

```css
/* App shell: relative container so view switcher can overlay tab strip */
.app-shell {
  position: relative;
  display: flex;
  flex-direction: column;
  block-size: 100dvh;
  overflow: hidden;
}

.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-block-size: 0;
  overflow: hidden;
}

.tab::part(tab-panel-container) {
  flex: 1;
  min-block-size: 0;
  overflow: hidden;
}

.tab::part(tab-panel) {
  block-size: 100%;
  overflow: auto;
}

/* View switcher: positioned at the end of the tab strip row */
.global-view-switcher {
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  display: flex;
  gap: var(--spacing-gap-xs);
  align-items: center;
  padding-inline-end: var(--spacing-padding-l);
  padding-inline-start: var(--spacing-padding-m);
  block-size: var(--tab-strip-height, 40px);
}

.view-button {
  padding-inline: var(--spacing-padding-m);
  padding-block: var(--spacing-padding-xs);
  font-size: var(--font-size-subheading);
  line-height: 1;
  border-radius: var(--border-radius-s);
  opacity: 0.5;
}

.view-button-active {
  opacity: 1;
  background-color: var(--color-accent-item-active);
}
```

- Tab model: `[{ id: 'entity-a', name: 'Entity A' }, ...]`
- Slot name must match the tab item `id` exactly
- Every component that uses `ch-*` elements requires `schemas: [CUSTOM_ELEMENTS_SCHEMA]` in the decorator
- If no cross-entity navigation is needed, `nav.activeTab` can be a simple local string property on App

---

## NavigationService

Always required — holds the **global detail view mode** shared across all entity tabs. Also needed when any `navigation` or `children` relationship exists for cross-tab navigation.

```ts
import type { DetailViewMode } from './models';

export interface NavRequest {
  tab: 'entity-a' | 'entity-b'; // all entity tab IDs
  id: number;
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  activeTab = 'entity-a'; // first tab
  detailView: DetailViewMode = 'bottom';
  readonly request$ = new Subject<NavRequest>();

  navigateTo(tab: NavRequest['tab'], id: number): void {
    this.activeTab = tab;
    this.request$.next({ tab, id });
  }

  setDetailView(mode: DetailViewMode): void {
    this.detailView = mode;
  }
}
```

Each entity component that is a navigation target:
```ts
export class EntityComponent implements OnInit, OnDestroy {
  private navSub?: Subscription;

  ngOnInit(): void {
    // ... load data
    this.navSub = this.nav.request$.subscribe(req => {
      if (req.tab === 'entity-a') {
        this.selected = this.items.find(x => x.id === req.id) ?? null;
      }
    });
  }
  ngOnDestroy(): void { this.navSub?.unsubscribe(); }
}
```

---

## Chameleon wiring — Angular

Angular-specific binding code. For structural requirements and rationale, see `chameleon-details.md`.

**`ch-tabular-grid` — description field link + row highlight**

```html
@for (item of items; track item.id) {
  <ch-tabular-grid-row class="grid-row" [attr.row-id]="item.id.toString()">
    <!-- Description field — clickable link -->
    <ch-tabular-grid-cell class="grid-cell"
      [style.background-color]="selected?.id === item.id ? 'var(--color-accent-item-active)' : null">
      <button class="fk-link" type="button" (click)="select(item)">
        {{ item.name }}
      </button>
    </ch-tabular-grid-cell>
    <!-- Other fields — inert -->
    <ch-tabular-grid-cell class="grid-cell"
      [style.background-color]="selected?.id === item.id ? 'var(--color-accent-item-active)' : null">
      {{ item.otherField }}
    </ch-tabular-grid-cell>
  </ch-tabular-grid-row>
}
```

**Inline row actions (Edit / Delete)**

```html
<ch-tabular-grid-cell class="grid-cell grid-cell-actions"
  [style.background-color]="selected?.id === item.id ? 'var(--color-accent-item-active)' : null">
  <button class="button-tertiary row-action-button" type="button" title="Edit"
    (click)="openEdit(item)">✎</button>
  <button class="button-tertiary row-action-button row-action-delete" type="button" title="Delete"
    (click)="openDelete(item)">✕</button>
</ch-tabular-grid-cell>
```

**`ch-combo-box-render` — binding**

```html
<ch-combo-box-render class="combo-box"
  [model]="comboModel"
  [value]="formFkId > 0 ? formFkId.toString() : ''"
  placeholder="Select..."
  (change)="formFkId = +getVal($event)"></ch-combo-box-render>
```

**Helper — `getVal` for combo-box change events**

```ts
getVal(e: Event): string { return (e.target as any).value ?? ''; }
```

**Helper — FK navigation (one per FK target)**

```ts
navigateToAuthor(authorId: number): void {
  this.nav.navigateTo('authors', authorId);
}
```

**`ch-edit` — binding**

```html
<ch-edit class="input" [value]="formName"
  (input)="formName = $any($event.target).value"></ch-edit>

<!-- Numeric field -->
<ch-edit class="input" type="number" [value]="formQty.toString()"
  (input)="formQty = +$any($event.target).value"></ch-edit>
```

**`ch-dialog` — visibility**

Use `@if` for conditional rendering. Always include the `show` attribute (see `chameleon-details.md`):

```html
@if (showDetailDialog) {
  <ch-dialog show show-header show-footer closable
    [caption]="dialogCaption"
    close-button-accessible-name="Close"
    (dialogClosed)="showDetailDialog = false">
    <!-- body (default slot) -->
    <div slot="footer">
      <!-- footer buttons -->
    </div>
  </ch-dialog>
}
```

---

## DataService structure

```ts
@Injectable({ providedIn: 'root' })
export class DataService {
  private nextId = { entityA: N+1, entityB: M+1 };

  entityAs: EntityA[] = [ /* 3-5 mock records */ ];
  entityBs: EntityB[] = [ /* 3-5 mock records */ ];

  // Entity A
  getEntityAs(): EntityA[] { return this.entityAs; }
  getEntityAById(id: number): EntityA | undefined { return this.entityAs.find(x => x.id === id); }
  getEntityADisplayName(id: number): string { return this.entityAs.find(x => x.id === id)?.name ?? '—'; } // returns description field value
  addEntityA(data: Omit<EntityA, 'id'>): void { this.entityAs = [...this.entityAs, { id: this.nextId.entityA++, ...data }]; }
  updateEntityA(id: number, data: Omit<EntityA, 'id'>): void { this.entityAs = this.entityAs.map(x => x.id === id ? { id, ...data } : x); }
  deleteEntityA(id: number): void { this.entityAs = this.entityAs.filter(x => x.id !== id); }

  // Children queries (one per children relationship)
  getEntityBsByEntityA(entityAId: number): EntityB[] { return this.entityBs.filter(b => b.entityAId === entityAId); }
}
```

---

## Detail view modes

Implements UX rules 11.x. Each entity reads `nav.detailView` from the injected `NavigationService`.

### Shared types — in `models.ts`

```ts
export type DetailViewMode = 'bottom' | 'side' | 'dialog';
export type DetailState = 'viewing' | 'editing' | 'creating';
```

### Component state

Each entity component reads the global `detailView` from `NavigationService` and owns its own `detailState` and `showDetailDialog`:

```ts
detailState: DetailState = 'viewing';
showDetailDialog = false;

// Delete confirmation state
deleteTarget: Entity | null = null;
showDeleteDialog = false;

// Form fields (shared for editing and creating)
formName = '';
formEmail = '';
// ... all form fields

// In ngOnInit — sync showDetailDialog when global detailView changes.
// Use an effect() or manual check if using signals; otherwise track
// via a getter or ngDoCheck.
get detailView(): DetailViewMode { return this.nav.detailView; }

select(item: Entity): void {
  if (this.detailState === 'creating') return; // don't interrupt creation
  this.selected = item;
  this.detailState = 'viewing';
  // ... refresh children if applicable
  if (this.detailView === 'dialog') {
    this.showDetailDialog = true;
  }
}

// --- Unified surface actions ---
startEdit(): void {
  if (!this.selected) return;
  this.formName = this.selected.name;
  this.formEmail = this.selected.email;
  // ... populate all form fields from selected
  this.detailState = 'editing';
}

startCreate(): void {
  this.formName = '';
  this.formEmail = '';
  // ... reset all form fields
  this.detailState = 'creating';
  this.selected = null;
  if (this.detailView === 'dialog') {
    this.showDetailDialog = true;
  }
}

cancelEdit(): void {
  if (this.detailState === 'creating') {
    this.detailState = 'viewing';
    this.showDetailDialog = false;
  } else {
    this.detailState = 'viewing';
  }
}

confirmSave(): void {
  if (this.detailState === 'creating') {
    this.data.addEntity({ name: this.formName, email: this.formEmail /* ... */ });
    this.detailState = 'viewing';
    this.selected = null;
    this.showDetailDialog = false;
    this.refresh();
  } else if (this.detailState === 'editing' && this.selected) {
    this.data.updateEntity(this.selected.id, { name: this.formName, email: this.formEmail /* ... */ });
    this.detailState = 'viewing';
    this.refresh();
    this.selected = this.items.find(x => x.id === this.selected!.id) ?? null;
    // ... refresh children
  }
}

// --- Inline row action bridges ---
openEdit(item: Entity): void {
  this.selected = item;
  this.detailState = 'viewing'; // ensure clean state
  // ... refresh children if applicable
  this.startEdit();
  if (this.detailView === 'dialog') {
    this.showDetailDialog = true;
  }
}

openDelete(item: Entity): void {
  this.deleteTarget = item;
  this.showDeleteDialog = true;
}

confirmDelete(): void {
  if (!this.deleteTarget) return;
  this.data.deleteEntity(this.deleteTarget.id);
  this.refresh();
  if (this.selected?.id === this.deleteTarget.id) {
    this.selected = null;
    this.detailState = 'viewing';
    this.showDetailDialog = false;
  }
  this.deleteTarget = null;
  this.showDeleteDialog = false;
}
```

### Toolbar — no view switcher

The entity toolbar only contains global actions (New Entity, custom actions). The view switcher lives in `app.html`, not here.

```html
<div class="toolbar">
  <button class="button-primary" (click)="startCreate()">New Entity</button>
</div>
```

### Unified detail surface template — viewing/editing/creating

The detail surface uses `@if`/`@else` to toggle between read-only values and form inputs based on `detailState`:

When the detail content is shared via `ng-template`, the header must be hidden in dialog mode — the `ch-dialog` already provides the caption and footer actions.

```html
<!-- Surface header — hidden in dialog mode (dialog provides caption + footer) -->
@if (detailView !== 'dialog') {
  <div class="detail-header">
    <span class="detail-title">
      @if (detailState === 'creating') { New Entity }
      @else { {{ selected.descriptionField }} }
    </span>
    <div class="detail-actions">
      @if (detailState === 'viewing') {
        <button class="button-tertiary" type="button" (click)="startEdit()">✎</button>
      } @else {
        <button class="button-secondary" type="button" (click)="cancelEdit()">Cancel</button>
        <button class="button-primary" type="button" (click)="confirmSave()">Save</button>
      }
    </div>
  </div>
}

<!-- Fields -->
<div class="detail-fields">
  <div class="detail-row">
    <span class="detail-label">Name</span>
    @if (detailState === 'viewing') {
      <span class="detail-value">{{ selected.name }}</span>
    } @else {
      <ch-edit class="input" [value]="formName"
        (input)="formName = $any($event.target).value"></ch-edit>
    }
  </div>
  <!-- FK field example -->
  <div class="detail-row">
    <span class="detail-label">Author</span>
    @if (detailState === 'viewing') {
      <span class="detail-value">
        <button class="fk-link" type="button" (click)="navigateToAuthor(selected.authorId)">
          {{ data.getAuthorDisplayName(selected.authorId) }}
        </button>
      </span>
    } @else {
      <ch-combo-box-render class="combo-box"
        [model]="authorComboModel"
        [value]="formAuthorId > 0 ? formAuthorId.toString() : ''"
        placeholder="Select Author..."
        (change)="formAuthorId = +getVal($event)"></ch-combo-box-render>
    }
  </div>
</div>
```

### Layout wrapper — class toggle on `.layout-page`

```html
<div class="layout-page" [class.layout-side]="detailView === 'side'">
  <!-- master card -->
  <div class="layout-card master-card">...</div>

  <!-- detail: bottom / side -->
  @if ((selected || detailState === 'creating') && detailView !== 'dialog') {
    <div class="layout-card detail-panel">
      <!-- unified surface content -->
    </div>
  }
</div>

<!-- detail: dialog mode (outside the layout-page) -->
@if ((selected || detailState === 'creating') && detailView === 'dialog' && showDetailDialog) {
  <ch-dialog class="dialog" show show-header show-footer closable
    [caption]="detailState === 'creating' ? 'New Entity' : selected!.descriptionField"
    close-button-accessible-name="Close"
    (dialogClosed)="showDetailDialog = false">
    <!-- same unified surface content (fields + children) -->
    <div slot="footer">
      @if (detailState === 'viewing') {
        <button class="button-tertiary" (click)="startEdit()">✎ Edit</button>
      } @else {
        <button class="button-secondary" (click)="cancelEdit()">Cancel</button>
        <button class="button-primary" (click)="confirmSave()">Save</button>
      }
    </div>
  </ch-dialog>
}
```

### Delete confirmation dialog

```html
@if (showDeleteDialog && deleteTarget) {
  <ch-dialog show show-header show-footer closable
    [caption]="'Delete Entity'"
    close-button-accessible-name="Close"
    (dialogClosed)="showDeleteDialog = false; deleteTarget = null">
    <p>Are you sure you want to delete <strong>{{ deleteTarget.descriptionField }}</strong>? This action cannot be undone.</p>
    <div slot="footer">
      <button class="button-secondary" type="button" (click)="showDeleteDialog = false; deleteTarget = null">Cancel</button>
      <button class="button-danger" type="button" (click)="confirmDelete()">Delete</button>
    </div>
  </ch-dialog>
}
```

### Required CSS (per entity component)

View-switcher styles live in `app.css`, not in entity CSS. Entity components use these styles:

```css
/* Detail header */
.detail-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-gap-m);
  margin-block-end: var(--spacing-gap-l);
}

.detail-title {
  flex: 1;
  font-size: var(--font-size-subheading);
  font-weight: var(--font-weight-semibold);
}

.detail-actions {
  display: flex;
  gap: var(--spacing-gap-xs);
}

/* Side-by-side layout */
.layout-side { flex-direction: row; align-items: flex-start; }
.layout-side .master-card { flex: 1; min-inline-size: 0; }
.layout-side .detail-panel {
  inline-size: 380px;
  flex-shrink: 0;
  max-block-size: calc(100vh - 120px);
  overflow: auto;
}
```

### Children section template

Rendered inside the detail surface (below fields, separated by a divider) when the entity has a `children` relationship. Only visible in `viewing` state.

```html
@if (selected && detailState === 'viewing') {
  <hr class="related-divider">
  <div class="related-section">
    <p class="related-label">EDITIONS</p>
    @if (childEditions.length > 0) {
      <table class="related-table">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Year</th>
            <th>Format</th>
          </tr>
        </thead>
        <tbody>
          @for (edition of childEditions; track edition.id) {
            <tr>
              <td>
                <button class="fk-link" type="button" (click)="nav.navigateTo('book-editions', edition.id)">
                  {{ edition.isbn }}
                </button>
              </td>
              <td>{{ edition.year }}</td>
              <td>{{ edition.format }}</td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p class="caption-m no-items">No editions found for this book.</p>
    }
  </div>
}
```

Refresh children in `select()` and after `confirmSave()` for editing:
```ts
this.childEditions = this.data.getEditionsByBook(this.selected!.id);
```

### WW-Config-driven mode filtering

When `ww-config.yaml` limits `viewModes`, the view switcher in `app.html` conditionally renders only the enabled mode buttons. Define the enabled modes array in the App component:

```ts
// In App component — derive from ww-config.yaml or use defaults
enabledModes: DetailViewMode[] = ['bottom', 'side', 'dialog'];
```

```html
@if (enabledModes.includes('bottom')) {
  <button class="button-tertiary view-button" ...>↕</button>
}
```

---

## Embedded item collection pattern

Use when an entity owns a **one-to-many collection of sub-items that are not standalone entities** (they have no WW instance of their own). Examples: an invoice's line items, an order's products, a recipe's ingredients, a playlist's tracks.

This is distinct from a `children` relationship — the items have no independent existence, live inside the parent, and are created/destroyed with it.

**Adapt all field names, columns, and computed values to the domain.** The pattern below uses generic placeholders.

### TypeScript state

The pattern always includes: an items array, state for the "add item" inputs, an `addItem()` that appends into the array, and a `removeItem()` that splices.

```ts
// In the parent component — adapt field names to the domain
formItems: ItemType[] = [];
newItemRefId = 0;   // selected reference entity (via combo-box)
// ... other add-item fields as needed by the domain

addItem(): void {
  if (!this.newItemRefId) return;
  this.formItems = [...this.formItems, {
    refId: this.newItemRefId,
    /* ...domain-specific fields */
  }];
  this.newItemRefId = 0;
}

removeItem(index: number): void {
  this.formItems = this.formItems.filter((_, i) => i !== index);
}

// In startCreate(): reset formItems = [];
// In startEdit():   set formItems = selected.items.map(i => ({ ...i }));
// In confirmSave(): pass { ...form, items: formItems }
```

### Embedded items — inline add/remove section

Place inside the detail surface (or dialog body), after the main fields, separated by a border. Table columns and the add-item row inputs depend on the domain:

```html
<div class="items-form-section">
  <p class="label">Items</p>

  @if (formItems.length > 0) {
    <table class="items-table">
      <thead>
        <tr>
          <th><!-- domain column headers --></th>
          <th class="col-action"></th>
        </tr>
      </thead>
      <tbody>
        @for (item of formItems; track $index; let i = $index) {
          <tr>
            <td><!-- domain fields --></td>
            <td class="col-action">
              <button class="button-remove" type="button" (click)="removeItem(i)">✕</button>
            </td>
          </tr>
        }
      </tbody>
      <!-- Optional: total/summary row if the domain requires it -->
    </table>
  } @else {
    <p class="caption-m no-items">No items added.</p>
  }

  <!-- Add item row: reference selector + domain-specific inputs + add button -->
  <div class="add-item-row">
    <ch-combo-box-render class="combo-box"
      [model]="refComboModel"
      [value]="newItemRefId > 0 ? newItemRefId.toString() : ''"
      placeholder="Select..."
      (change)="newItemRefId = +getVal($event)"></ch-combo-box-render>
    <!-- domain-specific inputs (e.g., quantity, notes) -->
    <button class="button-secondary" type="button" (click)="addItem()">Add</button>
  </div>
</div>
```

