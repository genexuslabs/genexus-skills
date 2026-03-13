# Window Tools

Development environment tool icons for workspace management, debugging, and configuration

**Type:** Monochrome

## Color types

| colorType        | States                           |
| ---------------- | -------------------------------- |
| `black`          | enabled                          |
| `error`          | enabled, hover, active, disabled |
| `interactive`    | enabled, hover, active, disabled |
| `on-interactive` | enabled, hover, active, disabled |
| `on-primary`     | enabled, hover, active, disabled |
| `on-status`      | enabled, hover, active, disabled |
| `on-suggestion`  | enabled, hover, active, disabled |
| `on-surface`     | enabled                          |
| `primary`        | enabled, hover, active, disabled |
| `selected`       | enabled                          |
| `success`        | enabled, hover, active, disabled |
| `warning`        | enabled, hover, active, disabled |
| `white`          | enabled                          |

## Usage

```ts
import { getIconPath } from "@genexus/mercury/assets-manager.js";

getIconPath({ category: "window-tools", name: "kb-explorer", colorType: "on-surface" });
```

## Icons (31)

| Name                     |
| ------------------------ |
| alphabetical-order       |
| backend                  |
| breakpoints              |
| category-groups          |
| datastores               |
| debugx                   |
| error-list               |
| filter                   |
| filter-conditions        |
| frontend                 |
| genexus-cloud            |
| history                  |
| indexer-monitor          |
| kb-explorer              |
| last-changes-view        |
| logout                   |
| output                   |
| performance-test-objects |
| preferences              |
| properties               |
| references               |
| responsive-sizes         |
| rol                      |
| roles                    |
| services                 |
| teamdev                  |
| toolbox                  |
| watch                    |
| work-with-attributes     |
| workflow                 |
| workflow-settings        |
