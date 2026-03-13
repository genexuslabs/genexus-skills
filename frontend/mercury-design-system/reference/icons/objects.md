# Objects

Core GeneXus object type icons — transactions, procedures, reports, webpanels, workflows, and more

**Type:** Multicolor

## Usage

```ts
import { getIconPath } from "@genexus/mercury/assets-manager.js";

// Single icon
getIconPath({ category: "objects", name: "transaction" });

// Collapsed + expanded pair (for ch-tree-view-render)
import { getIconPathExpanded } from "@genexus/mercury/assets-manager.js";

getIconPathExpanded(
  { category: "objects", name: "module" },
  { category: "objects", name: "module-open" }
);
```

## Icons (72)

| Name |
|------|
| api |
| assistant |
| attribute |
| bg-color |
| business-process-diagram |
| calendars |
| category |
| conversational-flows |
| customization |
| dashboard |
| data-provider |
| data-selector |
| data-view |
| datastore |
| datastore-category |
| dataview-index |
| deployment-unit |
| design |
| diagram |
| document |
| document-workflow |
| domain |
| dso |
| environment-no-select |
| environment-select |
| external-object |
| file |
| folder |
| folder-open |
| generator |
| generator-category |
| image |
| knowledge-base |
| language |
| main-object |
| master-panel |
| masterpage |
| menu |
| menubar |
| mini-app |
| module |
| module-open |
| notification-templates |
| object |
| offline-database |
| orphant-document |
| panel-for-sd |
| patterns |
| procedure |
| query |
| references |
| report |
| roles |
| stencil |
| structured-data-type |
| subtype-group |
| super-app |
| table |
| theme |
| theme-for-sd |
| theme-web |
| to-be-defined |
| transaction |
| url-rewrite |
| version |
| version-frozen |
| web-component |
| webpanel |
| work-panel |
| workflow |
