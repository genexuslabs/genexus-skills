---
name: properties-object-subtype-group
description: Configurable subtype group properties
---

Use this file to select editable SubType Group properties

---

# GENERAL

## Description
- Description: Functional description used as metadata
- Type: `string`

## Visibility
- Description: Visibility scope used to expose subtype group members
- Type: `enum{Public,Private,Knowledge Base,Internal}`
- Options:
	* `Public`: Makes the object publicly visible
	* `Private`: Restricts visibility to private scope
	* `Knowledge Base`: Sets visibility at Knowledge Base scope
	* `Internal`: Executes internally within the application runtime
