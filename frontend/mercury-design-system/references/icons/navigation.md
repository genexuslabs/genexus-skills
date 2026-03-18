# Navigation

Navigation flow icons including arrows, chevrons, and directional indicators

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

getIconPath({ category: "navigation", name: "chevron-right", colorType: "on-surface" });
```

## Icons (16)

| Name               |
| ------------------ |
| arrow-down         |
| arrow-down-skyblue |
| arrow-left         |
| arrow-right        |
| arrow-up           |
| bullet             |
| chevron-down       |
| chevron-left       |
| chevron-right      |
| chevron-up         |
| drag               |
| gx-arrow-right     |
| level-down         |
| level-up           |
| pill-filled        |
| pill-outlined      |
