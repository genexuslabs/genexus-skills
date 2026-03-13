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
	* `None`: Disables additional behavior for this setting
	* `Bootstrap v3`: Uses the Bootstrap v3 design system
	* `Bootstrap v3 RTL`: Uses the Bootstrap v3 RTL design system
- Default: `None`

## Default Template Layout
- Description: Specifies a template used to generate default Transactions and WorkWith web layouts
- Type: `enum{FlatTemplate,UnanimoTemplate,CarmineTemplate,FioriTemplate}`
- Options:
	* `FlatTemplate`: Uses the FlatTemplate form layout
	* `UnanimoTemplate`: Uses the UnanimoTemplate form layout
	* `CarmineTemplate`: Uses the CarmineTemplate form layout
	* `FioriTemplate`: Uses the FioriTemplate form layout
- Default: `UnanimoTemplate`
