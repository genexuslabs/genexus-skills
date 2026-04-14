---
name: model-environment
description: Environment metadata withing a version defining generator, data store, and runtime settings
---

Generates or inteprets a `Environment` definition file

---

# DEFINITION
An `Environment` model file captures the generator, data store, and deployment configuration for a [Version](./model-version.md) definition

---

# SYNTAX
~~~
Environment <name>
{
	#Properties
		<properties>
	#End

	#Backend
		<backend>
	#End

	#Frontend
		<front-end>
	#End

	#DeploymentUnits
		<deployment-units>
	#End
}
~~~

Where:
- `<name>`: Environment name using alphanumeric or underscore, starting with letter
- `<properties>`: Environment properties in TOML syntax; see [properties](./properties-environment.md)
- `<backend>`: Backend configuration; see [Backend Syntax](#backend-syntax)
- `<frontend>`: Frontend configuration; see [Frontend Syntax](#frontend-syntax)
- `<deployment-units>`: Deployment Unit list separated by breaklines

## Backend Syntax
~~~
Generators
{
	<generator-name-1>
	[
		<generator-properties-1>
	]
	…
}
DataStores
{
	<datastore-name-1>
	[
		<datastore-properties-1>
	]
	…
}
~~~

Where:
- `<generator-name-i>`: Generator name
- `<generator-properties-i>`: Generator configuration properties; see [Backend Properties](./properties-environment-backend.md)
- `<datastore-name-i>`: Data store name
- `<datastore-properties-i>`: Data store configuration properties; see [Backend Properties](./properties-environment-datastore.md)

Data store list behavior:
- The first `DataStore` in the list is the default and is used when running
- The default `DataStore` cannot be deleted
- Any `DataStore` referenced by `Data View` objects cannot be deleted
- Additional `DataStore` can be added for external databases

## Frontend Syntax
~~~
<generator-name-1>
[
	<generator-conf-1>
]
…
~~~

Where:
- `<generator-name-i>`: Generator name; values: `Android`, `Apple`, `Angular`, or `Web` (classic HTML/CSS/JS)
- `<generator-properties-i>`: Generator configuration properties; see [Frontend Properties](./properties-environment-frontend.md)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `environment`

IMPORTANT: 
- Must save the file in `<output-directory>/src.ns/Preferences` directory
- Must include a `.local.gx` sibling file for extending/overriding `.main.gx` definition
	* Always include properties with sensitive values; e.g. password, conenction info, etc
	* Typically included in the `.gitignore` file

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- A default environment is created automatically when a KB is created
- Multiple environments can exist within a single Version
- Keep `DataStore` names unique inside the environment
- Keep deployment unit names aligned with `DeploymentUnit` objects
- The main file defines shared configuration; the local file defines machine-specific settings
- Never store database credentials or server names in the main file; use the local file
- After writing or modifying the `.local.gx` file, always run `import_text_to_kb` with `names: ["environment:*"]` to import the environment changes into the KB

---

# EXAMPLES

## Example 1
Environment with .NET backend and SQL Server data store
~~~
Environment NETSQLServer
{
	#Properties
		Language = ".NET"
		DataSource = "SQL Server"
		StartupObject = "MainPanel"
		ReorganizationGenerator = "Default"
		PreserveTableCasing = true
		BusinessComponent = false
		CommitOnExit = "Yes"
		UseDockerContainers = "No"
	#End

	#Backend
		Generators
		{
			Default
			[
				.NETApplicationNamespace = "MyApp"
				WebServer = "Kestrel HTTP Server"
			]
		}
		DataStores
		{
			Default
			[
				DatabaseSchema = "MYAPP"
			]
		}
	#End

	#Frontend
		Android
		[
			GradleOptions = "-Xmx2048m"
			JavaPackageName = "com.example.netsqlserver"
		]

		Apple
		[
			ExecutionType = "Simulator (Mac)"
			Simulator = "iPhone Retina (4.7-inch 64-bits)"
		]
	#End
}
~~~

Saved as:
~~~
src.ns/Preferences/NETSQLServer.environment.main.gx
~~~

## Example 2
Local file for a .NET environment with SQL Server connection
~~~
Environment NETSQLServer
{
	#Backend
		DataStores
		{
			Default
			[
				DatabaseName = "MyAppDB",
				ServerName = "my-server-name.local",
				UserId = "myUserName",
				UserPassword = "myPa$$W0rd"
			]
		}
	#End

	#Frontend
		Apple
		[
			MacHost = "mac-builder.local"
			MacUser = "builder"
		]
	#End
}
~~~

Or, alternatively, with Trusted Connection (Windows Authentication)
~~~
Environment NETSQLServer
{
	#Backend
		DataStores
		{
			Default
			[
				DatabaseName = 'MyAppDB',
				ServerName = "my-server-name.local",
				UseTrustedConnection = 'Yes',
				UserId = '',
				UserPassword = ''
		    ]
		}
	#End
}
~~~

Saved as:
~~~
src.ns/Preferences/NETSQLServer.environment.local.gx
~~~

## Example 3
Environment with Java backend and PostgreSQL data store
~~~
Environment JavaPostgreSQL
{
	#Properties
		Language = "Java"
		DataSource = "PostgreSQL"
		StartupObject = "MainPanel"
		PreserveTableCasing = true
		CommitOnExit = "Yes"
	#End

	#Backend
		Generators
		{
			Default
			[
				CompilerOptions = "-J-Xmx2048m"
				ReorganizationOption = "-nogui"
				CreateDatabaseOption = "-nogui"
			]
		}
		DataStores
		{
			Default
			[
				PostgreSQLVersion = "8.1 or 8.2"
			]
		}
	#End
}
~~~

Saved as:
~~~
src.ns/Preferences/JavaPostgreSQL.environment.main.gx
~~~
