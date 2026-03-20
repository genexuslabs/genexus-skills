---
name: object-knowledgebase
description: KB-level metadata object defining global settings like language, numeric length, and image paths
---

KB-level metadata object defining global settings like language, numeric length, and image paths

---

# DEFINITION
A `KnowledgeBase` object defines the top-level metadata and global configuration for the entire Knowledge Base, including language settings, numeric defaults, and image paths

---

# SYNTAX
~~~
KnowledgeBase <name>
{
	#Properties
		<properties>
	#End
}
~~~

Where:
- `<name>`: Knowledge Base name
- `<properties>`: KB-level properties in TOML syntax (see [properties](./properties-knowledge-base.md))

---

# OUTPUT
File path: `src.ns/Preferences/<name>.knowledgebase.main.gx`

This object lives in the `Preferences` directory, not in the regular object tree. Do not use [global-output](./global-output.md) naming — use the fixed path above.

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Exactly one `KnowledgeBase` object exists per Knowledge Base
- The `KnowledgeBase` object is automatically created when a KB is created
- Properties are defined in TOML syntax within the `#Properties` region
- Do not create or delete `KnowledgeBase` objects manually; only modify properties

---

# EXAMPLES

## Example 1
KnowledgeBase with language and numeric length settings
~~~
KnowledgeBase MyApp
{
	#Properties
		KbLanguage = "English"
		"Maximum numeric length" = 18
		"Base image path" = "resources/images"
	#End
}
~~~

Saved as:
~~~
src.ns/Preferences/MyApp.knowledgebase.main.gx
~~~
