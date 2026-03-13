# React + Chameleon — Implementation Patterns

Reference for implementing the WW pattern with React functional components and Chameleon web components.

---

## Project setup

### Installation
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm i @genexus/chameleon-controls-library
```

> **Version requirement**: See `chameleon-details.md` § Version requirement for minimum version.

### main.tsx
```tsx
import { defineCustomElements } from '@genexus/chameleon-controls-library/loader';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

defineCustomElements(window);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### index.html — DS base styles via `<link>`
```html
<link rel="stylesheet" href="/ds/base/base.css">
<link rel="stylesheet" href="/ds/scope/dark.css">
```

### vite.config.ts — DS assets
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Tell React not to treat ch-* as unknown components
      jsxImportSource: undefined,
    }),
  ],
});
```

Copy (or symlink) the `design-system/` folder into `public/ds/` so Vite serves it as static assets.

### TypeScript — custom element types

Add a `custom-elements.d.ts` to suppress TS errors on `ch-*` JSX elements:

```ts
// src/custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: `ch-${string}`]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
  }
}
```

---

## Web component interop utilities

React (< 19) does not natively set properties or listen to custom events on web components. Use these two hooks in every WW component.

### useChProps — set complex properties via ref

```ts
import { useEffect, RefObject } from 'react';

export function useChProps(
  ref: RefObject<HTMLElement | null>,
  props: Record<string, unknown>
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    Object.entries(props).forEach(([k, v]) => {
      (el as any)[k] = v;
    });
  }, [ref, ...Object.values(props)]);
}
```

Use for any property that is an object or array (e.g. `model` on `ch-tab-render`, `ch-combo-box-render`).

### useChEvent — listen to custom events

```ts
import { useEffect, RefObject, useCallback } from 'react';

export function useChEvent(
  ref: RefObject<HTMLElement | null>,
  event: string,
  handler: (e: any) => void
): void {
  const stableHandler = useCallback(handler, [handler]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener(event, stableHandler);
    return () => el.removeEventListener(event, stableHandler);
  }, [ref, event, stableHandler]);
}
```

Usage:
```tsx
const tabRef = useRef<HTMLElement>(null);
useChProps(tabRef, { model: tabsModel });
useChEvent(tabRef, 'selectedItemChange', (e: CustomEvent) => {
  nav.setActiveTab(e.detail.newSelectedId);
});
```

> **React 19+**: Native custom element support is improved. Properties are set directly and event listeners can be passed as `onEventName` props. If targeting React 19+, the hooks above are optional but still recommended for consistency and explicit control.

---

## useDsLoader hook

Injects DS component CSS lazily into `<head>`. Call in each component.

```ts
import { useEffect, useRef } from 'react';

const loaded = new Set<string>();

export function useDsLoader(...paths: string[]): void {
  const pathsKey = paths.join(',');
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    paths.forEach(p => {
      if (loaded.has(p)) return;
      loaded.add(p);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/ds/${p}.css`;
      document.head.appendChild(link);
    });
  }, [pathsKey]);
}
```

Usage in component:
```tsx
function EntityComponent() {
  useDsLoader(
    'components/button', 'components/dialog', 'components/edit',
    'components/tabular-grid', 'components/combo-box',
    'utils/form'
  );
  // ...
}
```

Load `utils/layout` globally in `App`.

---

## App component

The App owns `ch-tab-render` inside an app shell wrapper. The view switcher is absolutely positioned at the top-right of the shell, aligned with the tab strip. Each entity component is placed in a named slot matching its tab id.

```tsx
// App.tsx
import { useRef } from 'react';
import { NavigationProvider, useNavigation } from './NavigationContext';
import { DataProvider } from './DataContext';
import { EntityA } from './components/EntityA/EntityA';
import { EntityB } from './components/EntityB/EntityB';
import { useChProps, useChEvent } from './hooks/useChInterop';
import { useDsLoader } from './hooks/useDsLoader';
import type { DetailViewMode } from './models';
import './App.css';

const tabsModel = [
  { id: 'entity-a', name: 'Entity A' },
  { id: 'entity-b', name: 'Entity B' },
];

function ViewSwitcher() {
  const { detailView, setDetailView } = useNavigation();

  const modes: { mode: DetailViewMode; label: string; title: string }[] = [
    { mode: 'bottom', label: '↕', title: 'Top-Bottom' },
    { mode: 'side', label: '↔', title: 'Side by Side' },
    { mode: 'dialog', label: '⊞', title: 'Dialog' },
  ];

  return (
    <div className="global-view-switcher">
      {modes.map((m) => (
        <button
          key={m.mode}
          className={`button-tertiary view-button ${detailView === m.mode ? 'view-button-active' : ''}`}
          type="button"
          title={m.title}
          onClick={() => setDetailView(m.mode)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

function AppContent() {
  const nav = useNavigation();
  const tabRef = useRef<HTMLElement>(null);

  useDsLoader('components/tab', 'components/button', 'utils/layout');
  useChProps(tabRef, { model: tabsModel, selectedId: nav.activeTab });
  useChEvent(tabRef, 'selectedItemChange', (e: CustomEvent) => {
    nav.setActiveTab(e.detail.newSelectedId);
  });

  return (
    <div className="app-shell">
      <ch-tab-render ref={tabRef} class="tab">
        <div slot="entity-a" style={{ height: '100%', overflow: 'auto' }}>
          <EntityA />
        </div>
        <div slot="entity-b" style={{ height: '100%', overflow: 'auto' }}>
          <EntityB />
        </div>
      </ch-tab-render>
      <ViewSwitcher />
    </div>
  );
}

export function App() {
  return (
    <NavigationProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </NavigationProvider>
  );
}
```

- Slot name must match the tab item `id` exactly.
- Entity components are wrapped in `<div slot="...">` elements — React functional components cannot be direct slot targets.
- Every file using `ch-*` elements needs the `custom-elements.d.ts` typings in scope.

### App.css

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

---

## NavigationContext

Always required — holds the **global detail view mode** shared across all entity tabs. Also needed when any `navigation` or `children` relationship exists for cross-tab navigation.

```tsx
// NavigationContext.tsx
import { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';
import type { DetailViewMode } from './models';

export interface NavRequest {
  tab: 'entity-a' | 'entity-b'; // all entity tab IDs
  id: number;
}

type NavListener = (req: NavRequest) => void;

interface NavContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigateTo: (tab: NavRequest['tab'], id: number) => void;
  subscribe: (listener: NavListener) => () => void;
  detailView: DetailViewMode;
  setDetailView: (mode: DetailViewMode) => void;
}

const NavigationContext = createContext<NavContextValue>(null!);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>('entity-a');
  const [detailView, setDetailView] = useState<DetailViewMode>('bottom');
  const listenersRef = useRef<Set<NavListener>>(new Set());

  const subscribe = useCallback((listener: NavListener) => {
    listenersRef.current.add(listener);
    return () => { listenersRef.current.delete(listener); };
  }, []);

  const navigateTo = useCallback((tab: NavRequest['tab'], id: number) => {
    setActiveTab(tab);
    // Notify after state update schedules
    setTimeout(() => {
      listenersRef.current.forEach(fn => fn({ tab, id }));
    }, 0);
  }, []);

  return (
    <NavigationContext.Provider value={{
      activeTab, setActiveTab, navigateTo, subscribe,
      detailView, setDetailView,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
```

Each entity component that is a navigation target:
```tsx
function EntityComponent() {
  const { subscribe } = useNavigation();
  const [selected, setSelected] = useState<EntityA | null>(null);
  const { entityAs } = useData();

  useEffect(() => {
    return subscribe((req) => {
      if (req.tab === 'entity-a') {
        setSelected(entityAs.find(x => x.id === req.id) ?? null);
      }
    });
  }, [entityAs, subscribe]);

  // ...
}
```

---

## DataContext

Shared data state via React Context. Mirrors the Angular DataService API.

```tsx
// DataContext.tsx
import { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';
import { EntityA, EntityB } from './models';

const INITIAL_ENTITY_AS: EntityA[] = [ /* 3-5 mock records */ ];
const INITIAL_ENTITY_BS: EntityB[] = [ /* 3-5 mock records */ ];

interface DataContextValue {
  entityAs: EntityA[];
  entityBs: EntityB[];
  getEntityAById(id: number): EntityA | undefined;
  getEntityADisplayName(id: number): string; // returns the description field value
  addEntityA(data: Omit<EntityA, 'id'>): void;
  updateEntityA(id: number, data: Omit<EntityA, 'id'>): void;
  deleteEntityA(id: number): void;
  getEntityBsByEntityA(entityAId: number): EntityB[];
  // ... same pattern for EntityB
}

const DataContext = createContext<DataContextValue>(null!);

export function DataProvider({ children }: { children: ReactNode }) {
  const [entityAs, setEntityAs] = useState(INITIAL_ENTITY_AS);
  const [entityBs, setEntityBs] = useState(INITIAL_ENTITY_BS);
  const nextId = useRef({ entityA: 4, entityB: 4 }); // after mock data IDs

  const getEntityAById = useCallback(
    (id: number) => entityAs.find(x => x.id === id),
    [entityAs]
  );
  const getEntityADisplayName = useCallback(
    (id: number) => entityAs.find(x => x.id === id)?.name ?? '—',
    [entityAs]
  );
  const addEntityA = useCallback((data: Omit<EntityA, 'id'>) => {
    setEntityAs(prev => [...prev, { id: nextId.current.entityA++, ...data }]);
  }, []);
  const updateEntityA = useCallback((id: number, data: Omit<EntityA, 'id'>) => {
    setEntityAs(prev => prev.map(x => x.id === id ? { id, ...data } : x));
  }, []);
  const deleteEntityA = useCallback((id: number) => {
    setEntityAs(prev => prev.filter(x => x.id !== id));
  }, []);
  const getEntityBsByEntityA = useCallback(
    (entityAId: number) => entityBs.filter(b => b.entityAId === entityAId),
    [entityBs]
  );

  return (
    <DataContext.Provider value={{
      entityAs, entityBs,
      getEntityAById, getEntityADisplayName, addEntityA, updateEntityA, deleteEntityA,
      getEntityBsByEntityA,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
```

---

## Chameleon wiring — React

React-specific binding code. For structural requirements and rationale, see `chameleon-details.md`.

**`ch-tabular-grid` — description field link + row highlight**

```tsx
{items.map(item => {
  const isSelected = selected?.id === item.id;
  const cellBg = isSelected ? 'var(--color-accent-item-active)' : undefined;
  return (
    <ch-tabular-grid-row key={item.id} row-id={item.id.toString()} class="grid-row">
      {/* Description field — clickable link */}
      <ch-tabular-grid-cell class="grid-cell" style={{ backgroundColor: cellBg }}>
        <button className="fk-link" type="button" onClick={() => selectItem(item)}>
          {item.name}
        </button>
      </ch-tabular-grid-cell>
      {/* Other fields — inert */}
      <ch-tabular-grid-cell class="grid-cell" style={{ backgroundColor: cellBg }}>
        {item.otherField}
      </ch-tabular-grid-cell>
    </ch-tabular-grid-row>
  );
})}
```

**Inline row actions (Edit / Delete)**

```tsx
<ch-tabular-grid-cell class="grid-cell grid-cell-actions" style={{ backgroundColor: cellBg }}>
  <button className="button-tertiary row-action-button" type="button" title="Edit"
    onClick={() => openEdit(item)}>✎</button>
  <button className="button-tertiary row-action-button row-action-delete" type="button" title="Delete"
    onClick={() => openDelete(item)}>✕</button>
</ch-tabular-grid-cell>
```

**`ch-combo-box-render` — property + event binding**

```tsx
const comboRef = useRef<HTMLElement>(null);
const comboModel = entityAs.map(a => ({ value: a.id.toString(), caption: a.name }));
useChProps(comboRef, { model: comboModel, value: formEntityAId > 0 ? formEntityAId.toString() : '' });
useChEvent(comboRef, 'change', (e: Event) => {
  setFormEntityAId(+(e.target as any).value || 0);
});

// In JSX:
<ch-combo-box-render ref={comboRef} class="combo-box" placeholder="Select..." />
```

**`ch-edit` — value and input event**

Since `value` is a string attribute, it can be set either as an HTML attribute or as a DOM property via `useChProps`. Both approaches work. Use `useChProps` for consistency with other Chameleon components that require property-based binding.

```tsx
const editRef = useRef<HTMLElement>(null);
useChProps(editRef, { value: formName, type: 'text' });
useChEvent(editRef, 'input', (e: CustomEvent) => {
  setFormName((e.target as any).value ?? '');
});

// In JSX:
<ch-edit ref={editRef} class="input" />
```

**`ch-dialog` — open/close state**

```tsx
const dialogRef = useRef<HTMLElement>(null);
useChEvent(dialogRef, 'dialogClosed', () => setShowDialog(false));

// In JSX:
{showDialog && (
  <ch-dialog ref={dialogRef} show show-header show-footer closable caption="New Entity">
    {/* body */}
    <div slot="footer">
      <button onClick={() => setShowDialog(false)}>Cancel</button>
      <button onClick={handleCreate}>Create</button>
    </div>
  </ch-dialog>
)}
```

---

## Detail view modes

Implements UX rules 11.x. Each entity reads `detailView` from the `useNavigation()` hook.

### Shared types — in `models.ts`

```ts
export type DetailViewMode = 'bottom' | 'side' | 'dialog';
export type DetailState = 'viewing' | 'editing' | 'creating';
```

### Component state

Each entity component reads the global `detailView` from context and owns its own `detailState` and `showDetailDialog`:

```tsx
const nav = useNavigation();
const { detailView } = nav;

const [detailState, setDetailState] = useState<DetailState>('viewing');
const [showDetailDialog, setShowDetailDialog] = useState(false);

// Delete confirmation state
const [deleteTarget, setDeleteTarget] = useState<Entity | null>(null);
const [showDeleteDialog, setShowDeleteDialog] = useState(false);

// Form fields (shared for editing and creating)
const [formName, setFormName] = useState('');
// ... all form fields
```

Note: `detailView` and `detailState` are captured as stale closures in callbacks. Use refs to read the latest values:

```tsx
const detailViewRef = useRef(detailView);
detailViewRef.current = detailView;
const detailStateRef = useRef(detailState);
detailStateRef.current = detailState;

// Sync showDetailDialog when the global detailView changes
useEffect(() => {
  if (detailView === 'dialog' && (selected || detailState === 'creating')) {
    setShowDetailDialog(true);
  } else if (detailView !== 'dialog') {
    setShowDetailDialog(false);
  }
}, [detailView]);

const selectItem = useCallback((item: Entity) => {
  if (detailStateRef.current === 'creating') return; // don't interrupt creation
  setSelected(item);
  setDetailState('viewing');
  if (detailViewRef.current === 'dialog') {
    setShowDetailDialog(true);
  }
}, []);

// --- Unified surface actions ---
const startEdit = () => {
  if (!selected) return;
  setFormName(selected.name);
  // ... populate all form fields from selected
  setDetailState('editing');
};

const startCreate = () => {
  setFormName('');
  // ... reset all form fields
  setSelected(null);
  setDetailState('creating');
  if (detailViewRef.current === 'dialog') {
    setShowDetailDialog(true);
  }
};

const cancelEdit = () => {
  if (detailStateRef.current === 'creating') {
    setDetailState('viewing');
    setShowDetailDialog(false);
  } else {
    setDetailState('viewing');
  }
};

const confirmSave = () => {
  if (detailStateRef.current === 'creating') {
    data.addEntity({ name: formName /* ... */ });
    setDetailState('viewing');
    setSelected(null);
    setShowDetailDialog(false);
  } else if (detailStateRef.current === 'editing' && selected) {
    data.updateEntity(selected.id, { name: formName /* ... */ });
    setDetailState('viewing');
    // selected will be refreshed from data
  }
};

// --- Inline row action bridges ---
const openEdit = useCallback((item: Entity) => {
  setSelected(item);
  // Populate form fields directly from item (not from selected — state hasn't updated yet)
  setFormName(item.name);
  // ... populate all form fields from item
  setDetailState('editing');
  if (detailViewRef.current === 'dialog') {
    setShowDetailDialog(true);
  }
}, []);

const openDelete = useCallback((item: Entity) => {
  setDeleteTarget(item);
  setShowDeleteDialog(true);
}, []);

const confirmDelete = () => {
  if (!deleteTarget) return;
  data.deleteEntity(deleteTarget.id);
  if (selected?.id === deleteTarget.id) {
    setSelected(null);
    setDetailState('viewing');
    setShowDetailDialog(false);
  }
  setDeleteTarget(null);
  setShowDeleteDialog(false);
};
```

### Toolbar — no view switcher

The entity toolbar only contains global actions (New Entity, custom actions). The view switcher lives in `App.tsx`, not here.

```tsx
<div className="toolbar">
  <button className="button-primary" onClick={startCreate}>New Entity</button>
</div>
```

### Unified detail surface template

The detail surface uses conditional rendering to toggle between read-only values and form inputs based on `detailState`:

When the detail content is shared (e.g., via a `renderDetailContent()` helper), the header must be hidden in dialog mode — the `ch-dialog` already provides the caption and footer actions.

```tsx
{/* Surface header — hidden in dialog mode (dialog provides caption + footer) */}
{detailView !== 'dialog' && (
  <div className="detail-header">
    <span className="detail-title">
      {detailState === 'creating' ? 'New Entity' : selected.descriptionField}
    </span>
    <div className="detail-actions">
      {detailState === 'viewing' ? (
        <button className="button-tertiary" type="button" onClick={startEdit}>✎</button>
      ) : (
        <>
          <button className="button-secondary" type="button" onClick={cancelEdit}>Cancel</button>
          <button className="button-primary" type="button" onClick={confirmSave}>Save</button>
        </>
      )}
    </div>
  </div>
)}

{/* Fields */}
<div className="detail-fields">
  <div className="detail-row">
    <span className="detail-label">Name</span>
    {detailState === 'viewing' ? (
      <span className="detail-value">{selected.name}</span>
    ) : (
      <ch-edit ref={nameRef} class="input" />
      // wire via useChProps/useChEvent
    )}
  </div>
  {/* FK field example */}
  <div className="detail-row">
    <span className="detail-label">Author</span>
    {detailState === 'viewing' ? (
      <span className="detail-value">
        <button className="fk-link" type="button"
          onClick={() => nav.navigateTo('authors', selected.authorId)}>
          {data.getAuthorDisplayName(selected.authorId)}
        </button>
      </span>
    ) : (
      <ch-combo-box-render ref={authorComboRef} class="combo-box" placeholder="Select Author..." />
      // wire model + value via useChProps, change event via useChEvent
    )}
  </div>
</div>
```

### Layout wrapper — class toggle

```tsx
<div className={`layout-page ${detailView === 'side' ? 'layout-side' : ''}`}>
  {/* master card */}
  <div className="layout-card master-card">...</div>

  {/* detail: bottom / side */}
  {(selected || detailState === 'creating') && detailView !== 'dialog' && (
    <div className="layout-card detail-panel">
      {/* unified surface content */}
    </div>
  )}
</div>

{/* detail: dialog mode */}
{(selected || detailState === 'creating') && detailView === 'dialog' && showDetailDialog && (
  <ch-dialog ref={detailDialogRef} class="dialog" show show-header show-footer closable
    caption={detailState === 'creating' ? 'New Entity' : selected!.descriptionField}
    close-button-accessible-name="Close">
    {/* same unified surface content */}
    <div slot="footer">
      {detailState === 'viewing' ? (
        <button className="button-tertiary" onClick={startEdit}>✎ Edit</button>
      ) : (
        <>
          <button className="button-secondary" onClick={cancelEdit}>Cancel</button>
          <button className="button-primary" onClick={confirmSave}>Save</button>
        </>
      )}
    </div>
  </ch-dialog>
)}
```

For the detail dialog, wire the `dialogClosed` event:

```tsx
const detailDialogRef = useRef<HTMLElement>(null);
useChEvent(detailDialogRef, 'dialogClosed', () => setShowDetailDialog(false));
```

### Delete confirmation dialog

```tsx
const deleteDialogRef = useRef<HTMLElement>(null);
useChEvent(deleteDialogRef, 'dialogClosed', () => {
  setShowDeleteDialog(false);
  setDeleteTarget(null);
});

// In JSX:
{showDeleteDialog && deleteTarget && (
  <ch-dialog ref={deleteDialogRef} show show-header show-footer closable
    caption="Delete Entity"
    close-button-accessible-name="Close">
    <p>Are you sure you want to delete <strong>{deleteTarget.descriptionField}</strong>? This action cannot be undone.</p>
    <div slot="footer">
      <button className="button-secondary" type="button"
        onClick={() => { setShowDeleteDialog(false); setDeleteTarget(null); }}>Cancel</button>
      <button className="button-danger" type="button"
        onClick={confirmDelete}>Delete</button>
    </div>
  </ch-dialog>
)}
```

### Required CSS (per entity component)

View-switcher styles live in `App.css`, not in entity CSS. Entity components use these styles:

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

```tsx
{selected && detailState === 'viewing' && (
  <>
    <hr className="related-divider" />
    <div className="related-section">
      <p className="related-label">EDITIONS</p>
      {childEditions.length > 0 ? (
        <table className="related-table">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Year</th>
              <th>Format</th>
            </tr>
          </thead>
          <tbody>
            {childEditions.map(edition => (
              <tr key={edition.id}>
                <td>
                  <button className="fk-link" type="button"
                    onClick={() => nav.navigateTo('book-editions', edition.id)}>
                    {edition.isbn}
                  </button>
                </td>
                <td>{edition.year}</td>
                <td>{edition.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="caption-m no-items">No editions found for this book.</p>
      )}
    </div>
  </>
)}
```

Refresh children when selection changes:
```tsx
const childEditions = useMemo(
  () => selected ? data.getEditionsByBook(selected.id) : [],
  [selected, data]
);
```

### WW-Config-driven mode filtering

When `ww-config.yaml` limits `viewModes`, the `ViewSwitcher` in `App.tsx` conditionally renders only the enabled mode buttons. Pass enabled modes via a shared constant derived from the config:

```tsx
// In ViewSwitcher (App.tsx)
const enabledModes: DetailViewMode[] = ['bottom', 'side', 'dialog']; // from ww-config.yaml or default

// In JSX — conditionally render buttons
{modes.filter(m => enabledModes.includes(m.mode)).map((m) => (
  <button ...>{m.label}</button>
))}
```

---

## Embedded item collection pattern

Same UX as Angular — inline add/remove in the detail surface (editing/creating states). Adapted for React state. **Adapt all field names, columns, and computed values to the domain.**

### State

```tsx
const [formItems, setFormItems] = useState<ItemType[]>([]);
const [newItemRefId, setNewItemRefId] = useState(0);
// ... other add-item fields as needed by the domain

const addItem = () => {
  if (!newItemRefId) return;
  setFormItems(prev => [...prev, {
    refId: newItemRefId,
    /* ...domain-specific fields */
  }]);
  setNewItemRefId(0);
};

const removeItem = (index: number) => {
  setFormItems(prev => prev.filter((_, i) => i !== index));
};

// In startCreate: setFormItems([]);
// In startEdit:   setFormItems(selected.items.map(i => ({ ...i })));
// In confirmSave: pass { ...form, items: formItems }
```

### Embedded items — inline add/remove section

Table columns and add-item row inputs depend on the domain:

```tsx
<div className="items-form-section">
  <p className="label">Items</p>

  {formItems.length > 0 ? (
    <table className="items-table">
      <thead>
        <tr>
          <th>{/* domain column headers */}</th>
          <th className="col-action"></th>
        </tr>
      </thead>
      <tbody>
        {formItems.map((item, i) => (
          <tr key={i}>
            <td>{/* domain fields */}</td>
            <td className="col-action">
              <button className="button-remove" type="button" onClick={() => removeItem(i)}>✕</button>
            </td>
          </tr>
        ))}
      </tbody>
      {/* Optional: total/summary row if the domain requires it */}
    </table>
  ) : (
    <p className="caption-m no-items">No items added.</p>
  )}

  {/* Add item row: reference selector + domain-specific inputs + add button */}
  <div className="add-item-row">
    {/* ch-combo-box-render via ref — see combo-box pattern above */}
    {/* domain-specific inputs (e.g., quantity, notes) */}
    <button className="button-secondary" type="button" onClick={addItem}>Add</button>
  </div>
</div>
```
