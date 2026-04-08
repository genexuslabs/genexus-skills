---
name: model-knowledge-base
description: Knowledge Base metadata with global settings like language, numeric length, and image paths
---

Generates or inteprets a `Knowledge Base` definition file

---

# DEFINITION
A `Knowledge Base` model defines the top-level metadata and global configuration, and includes a collection of `Version` references

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
- `<name>`: Knowledge Base name using alphanumeric or underscore, starting with letter
- `<properties>`: Knowledge Base properties in TOML syntax; see [properties](./properties-knowledge-base.md)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `knowledgebase`

IMPORTANT: 
- Must use `single-file` mode only
- Must save the file in `<output-directory>/src.ns/Preferences` directory

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Exactly one `KnowledgeBase` object exists per Knowledge Base
- Never create or delete `KnowledgeBase` objects manually; only modify properties
- Define at least one `Version` entry

---

# EXAMPLES

## Example 1
Knowledge Base with language. numeric length, and base path for images settings
~~~
KnowledgeBase MyApp
{
	#Properties
		KbLanguage = "English"
		MaximumNumericLength = 18
		BaseImagePath = "resources/images"
	#End
}
~~~

Saved as:
~~~
MyApp/src.ns/Preferences/MyApp.knowledgebase.main.gx
~~~
