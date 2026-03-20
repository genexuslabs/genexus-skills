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
	#Properties
		<local-properties>
	#End

	#Backend.Local
		[DataStores]
			Default
				"Database Name" = "<database>"
				"Server Name" = "<server>"
				"User Id" = "<user>"
				Password = "<password>"
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

---

# EXAMPLES

## Example 1
.NET environment with SQL Server
~~~
Environment NETDev
{
	#Properties
		"Startup Object" = "MainPanel"
		"Reorganization Generator" = "Default"
		"Preserve Table Casing" = true
		"Business Component" = false
		"Commit on exit" = "Yes"
		"Use Docker containers" = "No"
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
	#Properties
		"Genexus IDE Connection String" = "Server=localhost;Database=MyAppDB;Trusted_Connection=True"
	#End

	#Backend.Local
		[DataStores]
			Default
				"Database Name" = "MyAppDB"
				"Server Name" = "localhost"
				"User Id" = ""
				Password = ""
	#End
}
~~~

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
		"Startup Object" = "MainPanel"
		"Preserve Table Casing" = true
		"Commit on exit" = "Yes"
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
