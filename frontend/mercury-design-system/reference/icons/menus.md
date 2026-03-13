# Menus

Menu organization icons for presenting user options — build, save, edit, and other common operations

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

getIconPath({ category: "menus", name: "save", colorType: "on-surface" });
```

## Icons (18)

| Name                   |
| ---------------------- |
| build                  |
| build-all              |
| cancel-build           |
| copy                   |
| create-database-tables |
| cut                    |
| delete                 |
| find                   |
| new-object             |
| open-object            |
| paste                  |
| properties             |
| redo                   |
| run                    |
| save                   |
| save-all               |
| undo                   |
| undo-close-object      |
