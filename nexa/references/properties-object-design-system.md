---
name: properties-object-design-system
description: Configurable design system properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Folder
- Description: Folder where the object is organized in the KB
- Type: `string`

## Base CSS
- Description: A CSS library to include as a base style
- Type: `enum{None,Bootstrap v3,Bootstrap v3 RTL}`
- Options:
	* `None`: Use this value when it matches the target behavior
	* `Bootstrap v3`: Use this value when it matches the target behavior
	* `Bootstrap v3 RTL`: Use this value when it matches the target behavior
- Default: `None`

## Default Template Layout
- Description: Specifies a template used to generate default Transactions and WorkWith web layouts
- Type: `enum{FlatTemplate,UnanimoTemplate,CarmineTemplate,FioriTemplate}`
- Options:
	* `FlatTemplate`: Use this value when it matches the target behavior
	* `UnanimoTemplate`: Use this value when it matches the target behavior
	* `CarmineTemplate`: Use this value when it matches the target behavior
	* `FioriTemplate`: Use this value when it matches the target behavior
- Default: `UnanimoTemplate`
