---
name: properties-object-query
description: Configurable query properties
---

Use this file to select editable Query properties

---

# GENERAL

## Title
- Description: Label shown in generated UI and tooling
- Type: `string`

## Output Type
- Description: Type selector that controls generation behavior
- Type: `enum{Card,Chart,Pivot Table}`
- Options:
	* `Card`: Displays results in card layout
	* `Chart`: Displays results in chart layout
	* `Pivot Table`: Displays results in pivot table layout

## Cache expiration lapse
- Description: Cache validity duration before refresh
- Type: `string`
