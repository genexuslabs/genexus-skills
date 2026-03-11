---
name: model-version
description: Definition file for Version setup in a Knowledge Base
---

Generates or inteprets a `Version` definition file

---

# DEFINITION
A `Version` model file captures version-level properties and the set of `Environment` contained in the Knowledge Base

---

# SYNTAX
~~~
Version <name>
{
	#Properties
		<properties>
	#End

	#Environments
		<environments>
	#End
}
~~~

Where:
- `<name>`: Version name using alphanumeric or underscore, starting with letter
- `<properties>`: Version properties in TOML syntax
- `<environments>`: List of [Environment](./model-environment.md) definition files (`*.environment.main.gx`), one per line

---

# PROPERTIES
Version properties available in GeneXus:
- `Enable Integrated Security`: Enables GAM integrated security for the version
- `Theme` or `Design System`: Default theme/design system for Web objects
- `Master Page`: Default master page for Web objects
- `Stop on Error`: Stops execution when the application encounters an error
- `Validation Message Position`: Default position for validation messages
- `Automatic Refresh`: Enables automatic refresh behavior for Web objects

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `version`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Define at least one `Environment` under the version
- Keep version property names aligned with GeneXus property labels

---

# REMARKS
- Versions group environment definitions and their generators, datastores, and deployment settings

---

# EXAMPLES

## Example 1
Version with two Environment files
~~~
Version PlantCareVersion
{
	#Properties
		"Enable Integrated Security" = true
		"Theme" = "PlantCareDS"
		"Master Page" = "MainMasterPage"
		"Stop on Error" = true
		"Validation Message Position" = "Bottom"
		"Automatic Refresh" = true
	#End

	#Environments
		NETSQLServer.environment.main.gx
		JavaPostgreSQL.environment.main.gx
	#End
}
~~~
