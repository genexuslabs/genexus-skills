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

	#Product
		<product>
	#End
}
~~~

Where:
- `<name>`: Knowledge Base name using alphanumeric or underscore, starting with letter
- `<product>`: Knowledge Base product information; see [PRODUCT](#product) section
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

	#Product
		ProductName = "GeneXus"
		ProductVersion = "19.2.0.175" /* Created wtih GeneXus Next */
		FriendlyVersion = "19.2.175"
	#End
}
~~~

Saved as:
~~~
MyApp/src.ns/Preferences/MyApp.knowledgebase.main.gx
~~~
