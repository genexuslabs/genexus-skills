---
name: properties-object-common
description: Shared properties across all objects
---

Use this file to define properties that apply to every object type

---

# GENERAL

## Description
- Description: Describes the content or purpose of the element
- Type: `string`
- Hint: Optional but recommended

## Object Visibility
- Description: Defines object visibility, access scope, and distribution; inherited from containing `Module` object unless explicitly overridden
- Type: `enum{Public,Private,Internal,KnowledgeBase}`
- Options:
	* `Public`: Visible and accessible outside the module
	* `Private`: Visible only within the defining object
	* `Internal`: Visible within the module but not exposed externally
	* `KnowledgeBase`: Visible across the knowledge base
