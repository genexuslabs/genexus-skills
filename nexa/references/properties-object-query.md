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
	* `Card`: Use this value when it matches the target behavior
	* `Chart`: Use this value when it matches the target behavior
	* `Pivot Table`: Use this value when it matches the target behavior

## Cache expiration lapse
- Description: Cache validity duration before refresh
- Type: `string`
