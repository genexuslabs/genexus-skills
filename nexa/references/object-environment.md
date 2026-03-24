---
name: object-environment
description: Deployment target configuration defining generator, data store, and runtime settings
---

Deployment target configuration defining generator, data store, and runtime settings

---

# DEFINITION
An `Environment` object defines a deployment target within a Version, specifying the generator platform (.NET or Java), data store (SQL Server, PostgreSQL, etc.), UI type, and runtime configuration. Each environment has a main definition file and a companion local file for machine-specific settings

---

# SYNTAX

## Main file
~~~
Environment <name>
{
	#Properties
		<properties>
	#End

	#Backend
		Generator = <generator>
		[DataStores]
			Default
				DBMS = <dbms>
	#End
}
~~~

## Local file (`.local.gx`)
~~~
Environment <name>
{
	#Backend.Local
		DataStores

		{

			Default

			[

				DatabaseName = '<database>',
				ServerName = '<server>',
				UserId = '<user>',
				UserPassword = '<password>'

		    ]
		}
	#End
}
~~~

Where:
- `<name>`: Environment name
- `<properties>`: Environment-level properties in TOML syntax (see [properties](./properties-environment.md))
- `<generator>`: Target generator; values: `.NET`, `Java`
- `<dbms>`: Database management system; values: `SQL Server`, `PostgreSQL`, `MySQL`, `Oracle`, `SQLite`, `Informix`, `DB2 UDB`, `Dameng`
- `<local-properties>`: Machine-specific properties (connection strings, IDE settings)
- `<database>`: Local database name
- `<server>`: Database server hostname or address
- `<user>`: Database user identifier
- `<password>`: Database password (local only, gitignored)
- Property names in `#Backend.Local` use PascalCase without quotes (`DatabaseName`, `ServerName`, `UserId`, `UserPassword`)
- Property values use single quotes
- Properties separated by commas except the last one
- `DataStores` block uses `{ }` braces, `Default` data store properties use `[ ]` brackets
- After writing or modifying the `.local.gx` file, always run `import_text_to_kb` with `names: ["environment:*"]` to import the changes into the KB

---

# OUTPUT
File paths:
- Main: `src.ns/Preferences/<name>.environment.main.gx`
- Local: `src.ns/Preferences/<name>.environment.local.gx`

These objects live in the `Preferences` directory, not in the regular object tree. Do not use [global-output](./global-output.md) naming — use the fixed paths above.

The `.local.gx` file contains machine-specific settings (database credentials, server names) and is typically gitignored.

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- A default environment is created automatically when a KB is created
- Multiple environments can exist within a single Version
- The main file defines shared configuration; the local file defines machine-specific settings
- Never store database credentials or server names in the main file; use the local file
- The `#Backend` region defines the generator and data store configuration
- The `#Backend.Local` region (in `.local.gx`) defines local connection details
- Properties are defined in TOML syntax within the `#Properties` region
- After writing or modifying the `.local.gx` file (e.g., setting database connection data), always run `import_text_to_kb` with `names: ["environment:*"]` to import the environment changes into the KB

---

# EXAMPLES

## Example 1
.NET environment with SQL Server
~~~
Environment NETDev
{
	#Properties
		StartupObject = "MainPanel"
		ReorganizationGenerator = "Default"
		PreserveTableCasing = true
		BusinessComponent = false
		CommitOnExit = "Yes"
		UseDockerContainers = "No"
	#End

	#Backend
		Generator = .NET
		[DataStores]
			Default
				DBMS = SQL Server
	#End
}
~~~

Saved as:
~~~
src.ns/Preferences/NETDev.environment.main.gx
~~~

## Example 2
Local file for a .NET environment with SQL Server connection
~~~
Environment NETDev
{
	#Backend.Local
		DataStores

		{

			Default

			[

				DatabaseName = 'MyAppDB',
				ServerName = 'localhost',
				UserId = '',
				UserPassword = ''

		    ]
		}
	#End
}
~~~

After writing this file, run `import_text_to_kb` with `names: ["environment:*"]` to apply the changes to the KB.

Saved as:
~~~
src.ns/Preferences/NETDev.environment.local.gx
~~~

## Example 3
Java environment with PostgreSQL
~~~
Environment JavaProd
{
	#Properties
		StartupObject = "MainPanel"
		PreserveTableCasing = true
		CommitOnExit = "Yes"
	#End

	#Backend
		Generator = Java
		[DataStores]
			Default
				DBMS = PostgreSQL
	#End
}
~~~

Saved as:
~~~
src.ns/Preferences/JavaProd.environment.main.gx
~~~
