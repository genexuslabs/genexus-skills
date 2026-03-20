---
name: object-version
description: Design model metadata within the KB defining version-level defaults like styles
---

Design model metadata within the KB defining version-level defaults like styles

---

# DEFINITION
A `Version` object represents a design model within the Knowledge Base. It defines version-level default settings such as styles and other design-time configuration

---

# SYNTAX
~~~
Version <name>
{
	#Properties
		<properties>
	#End
}
~~~

Where:
- `<name>`: Version name
- `<properties>`: Version-level properties in TOML syntax (see [properties](./properties-version.md))

---

# OUTPUT
File path: `src.ns/Preferences/<name>.version.main.gx`

This object lives in the `Preferences` directory, not in the regular object tree. Do not use [global-output](./global-output.md) naming — use the fixed path above.

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- A Version represents a design model containing objects, environments, and configuration
- The default version is created automatically when a KB is created
- Properties are defined in TOML syntax within the `#Properties` region
- Do not create or delete `Version` objects manually; only modify properties

---

# EXAMPLES

## Example 1
Version with default style setting
~~~
Version MyAppVersion
{
	#Properties
		"Default Style" = "GeneXusX"
	#End
}
~~~

Saved as:
~~~
src.ns/Preferences/MyAppVersion.version.main.gx
~~~
