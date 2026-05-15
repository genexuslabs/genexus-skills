---
name: model-knowledge-base
description: Knowledge Base metadata with global settings like language, numeric length, and image paths
---

Generates or interprets a `Knowledge Base` definition file

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

	#Version
		<version>
	#End

	#Environments
		<environments>
	#End
}
~~~

Where:
- `<name>`: Knowledge Base name using alphanumeric or underscore, starting with letter
- `<version>`: Knowledge Base version definition; see [VERSION](#version) section
- `<environments>`: Breakline separated list of [ENVIRONMENT](./model-environment.md) names; must have at least one reference
- `<properties>`: Knowledge Base properties in TOML syntax; see [properties](./properties-knowledge-base.md)

---

# VERSION
Defines KB snapshot for parallel evolution, comparison, and rollback

Syntax:
~~~
CurrentEnvironment = "<environment>"
<properties>
~~~

Where:
- `<environment>`: Current environment name; must be listed in `#Environments` section
- `<properties>`: Version-level properties in TOML syntax; see [properties](./properties-version.md)

---

# OUTPUT
Use [global-output](./global-output.md) with:
- Location: `#preferences/`
- Main: `<name>.kb.gx`
- Override: `<name>.local.kb.gx`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Exactly one `KnowledgeBase` object exists per Knowledge Base
- Never create or delete `KnowledgeBase` objects manually; only modify properties
- Define at least one `Version` entry
- Raise warning when local-only values are written to `<name>.kb.gx` instead of `<name>.local.kb.gx`

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

	#Version
		DefaultStyle = "MyAppDesignSystem"
		EnableIntegratedSecurity = true
		CurrentEnvironment = "NETSQLServer"
	#End

	#Environments
		NETSQLServer
		JavaPostgreSQL
	#End
}
~~~

Saved as:
~~~
MyApp/src/#preferences/MyApp.kb.gx
~~~
