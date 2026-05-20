---
name: properties-object-query
description: Configurable query properties
---

Use this file to select editable Query properties

---

# GENERAL
Include [General](./properties-common.md) properties

## Title
Label shown in generated UI and tooling
- Type: `string`

## Output Type
Type selector that controls generation behavior
- Type: `enum{Card,Chart,Pivot Table}`
- Options:
	* `Card`: Displays results in card layout
	* `Chart`: Displays results in chart layout
	* `Pivot Table`: Displays results in pivot table layout

## Cache expiration lapse
Cache validity duration before refresh
- Type: `string`
