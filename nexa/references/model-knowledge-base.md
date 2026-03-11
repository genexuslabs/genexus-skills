---
name: model-knowledge-base
description: Definition file for Knowledge Base setup
---

Generates or inteprets a `Knowledge Base` definition file

---

# DEFINITION
A `Knowledge Base` model file captures the KB identity, creation settings, and `Version` set

---

# SYNTAX
~~~
KnowledgeBase <name>
{
	#Properties
		<properties>
	#End

	#Versions
		<versions>
	#End
}
~~~

Where:
- `<name>`: Knowledge Base name using alphanumeric or underscore, starting with letter
- `<properties>`: Knowledge Base properties in TOML syntax
- `<versions>`: List of [Version](./model-version.md) definition files (`*.version.main.gx`), one per line

---

# PROPERTIES
Creation-time properties exposed in KB basic and advanced options:
- `Location`: KB folder path
- `Programming Language`: Default language for generated code
- `Language`: Language for labels, buttons, messages, and UI text
- `Database Server Name`: Server name where KB database is stored
- `Database Name`: KB database name
- `Interleaving`: Collation/interleaving setting for the KB database
- `Database Authentication`: Use Windows user or specific user credentials

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `knowledgebase`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Keep `KnowledgeBase` name consistent with the file name prefix
- Define at least one `Version` entry
- Use TOML string values for properties that are textual identifiers

---

# REMARKS
- When creating a KB, basic options configure name, location, programming language, and UI language
- Advanced options allow changing database server name, database name, interleaving, and credentials

---

# EXAMPLES

## Example 1
Single KB with one Version file
~~~
KnowledgeBase PlantCareSample
{
	#Properties
		"Location" = "C:\\GeneXus\\KBs\\PlantCareSample"
		"Programming Language" = "C#"
		"Language" = "English"
		"Database Server Name" = "SQLSERVER01"
		"Database Name" = "PlantCareSample"
		"Interleaving" = "Latin1_General_CI_AS"
		"Database Authentication" = "Windows"
	#End

	#Versions
		PlantCareSample.version.main.gx
	#End
}
~~~
