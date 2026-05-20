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
		CurrentEnvironment = "<current>"
		<properties>
	#End

	#Product
		<product>
	#End

	#Version
		<version>
	#End

	#References
		<references>
	#End
}
~~~

Where:
- `<name>`: Knowledge Base name using alphanumeric or underscore, starting with letter
- `<current>`: Current environment name; scope: `.local`
- `<product>`: Knowledge Base product information; see [PRODUCT](#product) section
- `<version>`: Knowledge Base version properties in TOML syntax; see [properties](./properties-version.md)
- `<references>`: Breakline separated list of extenral `Module` references; see [REFERENCES](#references) section
- `<properties>`: Knowledge Base properties in TOML syntax; see [properties](./properties-knowledge-base.md)

---

# PRODUCT
Defines target GeneXus product for compatibility scope

Syntax:
~~~
ProductName = "<name>"
ProductVersion = "<version>"
FriendlyVersion = "<friendly>"
~~~

Where:
- `<name>`: Product name
- `<version>`: Internal product version identifier
	* Format: `<major>.<minor>.<patch>.<build>`
	* Reference:
		- `18.X.*`: GeneXus 18 Upgrade X
		- `19.X.*`: GeneXus Next Release X
	* Used for feature compatibility evaluation
- `<friendly>`: Human-readable product version

Rules:
- All properties in this sections are readonly and must remain unchanged
- Use only mapped reference names for product versions in user-facing communication

---

# REFERENCES
Defines external `Module` object dependencies (or packages) required by the Knowledge Base

Syntax:
~~~
<module> [ Version = '<number>', ServerUrl = '<server>' ]
~~~

Where:
- `<module>`: Referenced module/package name
- `<number>`: Mandatory target module/package version number
- `<server>`: Registry source URL for packaged modules only when required

Rules:
- All references must define the `Version` property
- Resolve references using available `.opc` registries
- Fallback to `ref/<module>/` when matching `.opc` is unavailable

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
- Resolve available environments from `src/#preferences/*.env.gx` file names
- Raise warning when local-only values are written to `.kb.gx` instead of `.local.kb.gx` file

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

	#Product
		ProductName = "GeneXus"
		ProductVersion = "19.2.0.175" /* Created wtih GeneXus Next */
		FriendlyVersion = "19.2.175"
	#End

	#Version
		DefaultStyle = "MyAppDesignSystem"
		EnableIntegratedSecurity = true
	#End

	#References
		GeneXus [ Version = '5.0.18' ]
		GeneXusUIControls [ Version = '3.0.5' ]
		GeneXusUnanimo [ Version = '2.0.189', ServerUrl = 'https://samples.genexusserver.com/beta/kbdashboard.aspx?Unanimo,' ]
	#End
}
~~~

Saved as:
~~~
MyApp/src/#preferences/MyApp.kb.gx
~~~

Local override:
~~~
KnowledgeBase MyApp
{
	#Properties
		CurrentEnvironment = "NETSQLServer"
	#End
}
~~~

Saved as:
~~~
MyApp/src/#preferences/MyApp.local.kb.gx
~~~

Existing environment files:
~~~
src/#preferences/NETSQLServer.env.gx
src/#preferences/JavaPostgreSQL.env.gx
~~~