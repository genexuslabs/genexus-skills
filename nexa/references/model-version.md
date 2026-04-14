---
name: model-version
description: Design model metadata within the Knowledge Base defining version-level settings like styles
---

Generates or inteprets a `Version` definition file

---

# DEFINITION
A `Version` model captures version-level properties and includes a collection of [Environment](./model-environment.md) contained in the [Knowledge Base](./model-knowledge-base.md) definition

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
- `<properties>`: Version-level properties in TOML syntax; see [properties](./properties-version.md)
- `<environments>`: Breakline separated list of [Environment](./model-environment.md) names

Important:
- All `Version` definitions are implicitly referenced by the [Knowledge Base](./model-knowledge-base.md) definition

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `version`

IMPORTANT: 
- Must use `single-file` mode only
- Must save the file in `<output-directory>/src.ns/Preferences` directory

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Default `Version` is created automatically when a `KnowledgeBase` is created
- Define at least one `Environment` for each `Version` definition file
- Never create or delete `Version` objects manually; only modify properties

---

# EXAMPLES

## Example 1
Version with default style setting and integrated security enabled
~~~
Version MyAppVersion
{
	#Properties
		DefaultStyle = "MyAppDesignSystem"
		EnableIntegratedSecurity" = true
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
MyApp/src.ns/Preferences/MyAppVersion.version.main.gx
~~~
