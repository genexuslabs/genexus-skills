# Gemini Tools

Specialized tool icons within the Gemini framework for extending application capabilities

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

getIconPath({ category: "gemini-tools", name: "edit-wand", colorType: "on-surface" });
```

## Icons (35)

| Name                 |
| -------------------- |
| add                  |
| add-circle           |
| card-view            |
| category-group       |
| category-ungroup     |
| close                |
| color-picker         |
| copy                 |
| copy-to-clipboard    |
| data-provider        |
| delete               |
| deleted              |
| download             |
| duplicate            |
| edit                 |
| edit-wand            |
| error                |
| file                 |
| flow-arrow           |
| folder               |
| list-view            |
| minus                |
| minus-circle         |
| more-info            |
| notice               |
| open-window          |
| read-only            |
| reset                |
| search               |
| settings             |
| share                |
| show-more-horizontal |
| show-more-vertical   |
| success              |
| warning              |
