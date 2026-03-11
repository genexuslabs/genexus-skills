---
name: model-environment
description: Definition file for Environment setup in a Knowledge Base
---

Generates or inteprets a `Environment` definition file

---

# DEFINITION
An `Environment` model file captures the generator, data store, and deployment configuration for a Version

---

# SYNTAX
~~~
Environment <name>
{
	#Properties
		<properties>
	#End

	#BackEnd
		<backend>
	#End

	#FrontEnd
		<frontend>
	#End

	#DataStores
		<data-stores>
	#End

	#DeployUnits
		<deployment-units>
	#End

	#Services
		<services>
	#End
}
~~~

Where:
- `<name>`: Environment name using alphanumeric or underscore, starting with letter
- `<properties>`: Environment properties in TOML syntax
- `<backend>`: Generator definitions for back-end code
- `<frontend>`: Front-end generator blocks using this syntax:
	~~~
	<name>
	[
		<properties>
	]
	~~~
	Being `<name>` one of: `Web`, `Android`, `Apple`, or `Angular`
- `<data-stores>`: Data store definitions for databases and services
- `<deployment-units>`: Deployment Unit references
- `<services>`: Service definitions for the environment

---

# NODES
Environment regions:
- `BackEnd`: Generators used to build the application back end
- `FrontEnd`: Generators used to build the application front end (multiple generators allowed)
- `DataStores`: Databases and service data stores used by the environment
- `DeployUnits`: Deployment Unit references defined in the KB Version file
- `Services`: Service settings for the environment

---

# PROPERTIES
Environment Properties
- `User Interface`: Set the user interface platform for the environment
	* `Web`: Generate web applications
	* `Windows`: Generate Windows applications
- `Language`: Set the backend generation language
	* `.NET`: Generate .NET (C#) application
	* `Java`: Generate Java application
- `DBMS`: Set the default DBMS for the main Data Store
- `Startup Object`: Set the startup object used by `Run` (F5)
- `Environment Name`: Set the display name for this environment
- `Commit on Exit`: Commit the logical unit of work when execution ends
- `Encrypt URL Parameters`: Encrypt URL parameters when required
	* `No`: Do not encrypt URL parameters
	* `Session Key`: Encrypt with a session key; do not allow URL sharing
	* `Site Key`: Encrypt with a site key; allow URL sharing
- `Protocol Specification`: Force the default protocol for generated apps/services
	* `HTTP`: Force HTTP
	* `HTTPS`: Force HTTPS
	* `(empty)`: Do not force a protocol
- `Target Path`: Set the output folder for generated programs
- `Blob Local Storage Path`: Set the local path to store temporary files downloaded from BLOBs
- `Temporary Media Directory`: Set the local path to store temporary files uploaded to BLOBs

---

# BACKEND GENERATOR PROPERTIES
General
- `Generate developer menu`: Enable the developer menu for generated apps
- `Generate OpenAPI interface`: Generate OpenAPI interfaces for services
- `OpenAPI version`: Set the OpenAPI version to generate
	* `3.0`: Generate OpenAPI 3.0
	* `2.0`: Generate OpenAPI 2.0
	* `APIGateway 2.0`: Generate an OpenAPI 2.0 variant required by AWS API Gateway
- `Use decimal arithmetic`: Use decimal arithmetic in generated code

Logging
- `Log Level`: Set the generator log verbosity
	* `0. Off`
	* `1. Fatal`
	* `2. Error`
	* `3. Warn`
	* `4. Info`
	* `5. Debug`
	* `6. All`
- `User Log Level`: Set the user log verbosity (same values as `Log Level`)
- `Log output`: Select the log output provider
	* `File`: Write logs to files
	* `Console`: Write logs to console output
	* `Azure Application Insights`: Send logs to Application Insights (.NET)
- `Log file`: Set the log file name
- `PDF Reports Library`: Select the PDF reporting library
	* `iText (Legacy)`: Use legacy iText
	* `iText 8`: Use iText 8
	* `PDFBox`: Use Apache PDFBox (Java)
	* `PDFPig`: Use PDFPig (.NET)

HttpClient pool
- `Maximum pool size per host`: Set the max HttpClient pool size per host

Data Access Information
- `Reorganize server table`: Enable server table reorganization when requested by Impact Analysis
- `Join management`: Set how joins are executed
	* `Join tables on the server`: Execute joins on the database server
	* `Join tables on the client`: Execute joins on the client/server side
	* `Use Environment property value`: Inherit from the Environment setting
- `Join type`: Select the join type strategy
	* `Use default for server`: Use the default server join type
	* `Natural Join`: Use natural (inner) join semantics
	* `Outer Join`: Use outer (left) join semantics
- `Transactional integrity`: Generate transaction/procedure logic with transactional integrity
- `Initialize not referenced attributes`: Initialize attributes not referenced in the load
- `Generate null for nullvalue`: Generate NULL instead of the nullvalue for null attributes
- `RPC declarations prefix`: Set the prefix for RPC declarations
- `Use client login as userid`: Use client login as user id for auditing
- `Maximum cached cursors`: Set the max number of cached cursors

Optimization
- `Copy table groups`: Control table group copy behavior
	* `If no unique index`: Copy only when no unique index exists
	* `Always`: Always apply copy table optimization
	* `Never`: Never apply copy table optimization
	* `Use Environment property value`: Inherit from the Environment setting

Hints
- `Fast first rows`: Optimize for fast first rows
	* `Yes`
	* `No`

Event Handling
- `Before commit`: Set the procedure to run before commit
- `After commit`: Set the procedure to run after commit
- `Before rollback`: Set the procedure to run before rollback
- `After rollback`: Set the procedure to run after rollback
- `Before connect`: Set the procedure to run before connect
- `After connect`: Set the procedure to run after connect

Specification
- `Expand dynamic calls`: Expand dynamic calls during generation
- `Generate prompt programs`: Generate prompt programs

Type checking
- `Check type errors`: Enable type checking
- `Standard Functions`: Set behavior for non-standard functions
	* `Error on non-standard functions`: Fail on non-standard functions
	* `Allow non-standard functions`: Allow non-standard functions
	* `Only standard functions`: Allow only standard functions
	* `Use Environment property value`: Inherit from the Environment setting

Warning messages
- `Disabled warnings`: Disable selected warnings
- `Warnings treated as errors`: Treat warnings as errors

Build Process
- `Standard classes update`: Set how standard classes are updated
	* `Defined by Generator`
	* `Custom`
- `Standard classes specification`: Set the standard classes specification

Advanced
- `MSBuild options`: Set additional MSBuild options (.NET)
- `Reorganization Option`: Set reorganization execution flags
	* `-nogui`: Run without UI
	* `-force`: Force reorganization execution
	* `-noverifydatabaseschema`: Skip schema verification
	* `-recordcount`: Include record count checks
	* `-ignoreresume`: Ignore previous resume state
	* `-donotexecute`: Generate but do not execute
- `Create Database Option`: Set database creation execution flags
	* `-nogui`: Run without UI
	* `-force`: Force database creation
	* `-noverifydatabaseschema`: Skip schema verification
	* `-recordcount`: Include record count checks
	* `-ignoreresume`: Ignore previous resume state
	* `-donotexecute`: Generate but do not execute

Execution
- `Execution Options`: Configure prototyping in cloud and server URL
- `Web Server to be Used`: Select the target web server for deployment
- `Deploy to cloud`: Enable cloud deployment
- `Web Server`: Select the target web server
- `Web Root`: Set the web root URL

Full text search options
- `Searchable`: Enable full text search
	* `Yes`
	* `No`

Java-specific:
- `Compiler Options`: Set additional `javac` parameters
- `JDK Directory (JAVA HOME)`: Set the installed JDK path
- `Interpreter Options`: Set additional JVM interpreter parameters
- `Gradle Options`: Set additional Gradle parameters
- `Use Default Browser`: Use the default browser for execution

.NET-specific:
- `SQL Server Data Store`: Select the SQL Server Data Store used by the session state provider
- `.NET Application name`: Set the .NET application name/namespace
- `Generate strong name`: Generate a strong name for assemblies

Storage configuration
- `Storage Provider`: Select the storage provider
	* `Local`: Use local storage
	* `Amazon S3`: Use Amazon S3 compatible storage
	* `Amazon S3 V1 (Legacy)`: Use legacy Amazon S3 V1 SDK
	* `Microsoft Azure`: Use Azure Storage
	* `Google Cloud Storage`: Use Google Cloud Storage
	* `IBM Cloud Object Storage`: Use IBM Cloud Object Storage

Notifications configuration
- `Notifications Provider`: Select the notifications provider
	* `None`: Disable notifications
	* `OneSignal`: Use OneSignal notifications
	* `JPush`: Use JPush notifications

Session configuration
- `Session Timeout`: Set the session timeout (minutes)
- `Session State Provider`: Select the session state provider
	* `In Process`: Store sessions in process
	* `Redis`: Store sessions in Redis
	* `Database`: Store sessions in SQL database

Observability configuration
- `Observability Provider`: Select the observability provider
	* `None`: Disable observability
	* `OpenTelemetry`: Use OpenTelemetry SDK
	* `AWS Distro for OpenTelemetry`: Use ADOT provider
	* `Azure Monitor Application Insights`: Use Azure Monitor provider

Cache configuration
- `Database access cache`: Enable database access cache
	* `Yes`
	* `No`
- `Cache Provider`: Select the cache provider
	* `In Process`: Use in-process cache
	* `Memcached`: Use Memcached cache
	* `Redis`: Use Redis cache

Enterprise AI configuration
- `AI Provider Address`: Set the AI provider address
- `AI Provider API Key`: Set the AI provider API key
- `AI Provider Project Id`: Set the AI provider project id
- `AI Provider Project Name`: Set the AI provider project name
- `Default Agents AI Model`: Set the default Agents AI model

Web Notifications configuration
- `Web Notifications Provider`: Select the web notifications provider
	* `InProcess`: Use in-process web notifications
- `Received Handler`: Set the received handler
- `Open Handler`: Set the open handler
- `Close Handler`: Set the close handler
- `Error Handler`: Set the error handler

---

# FRONTEND GENERATOR PROPERTIES
User interface
- `Confirmation`: Set confirmation behavior
	* `Never prompt`: Do not show confirmation prompts
	* `Always prompt`: Always request confirmation
	* `Do not prompt on first level`: Skip confirmation on first level (Transactions only)
	* `Use Environment property value`: Inherit from the Environment setting
- `Maximum workfile lines`: Set the maximum number of workfile lines

Web interface
- `Enable Datepicker`: Enable the datepicker widget
- `Show week number`: Show week number in datepicker
- `First day of week`: Set the first day of the week
	* `Sunday`
	* `Monday`

Printing
- `Show printer dialog`: Show the printer dialog before printing
- `Customizable Layout`: Enable customizable layouts
- `Layout Metadata Dir`: Set the layout metadata directory

Format
- `Date format in CTOD`: Set CTOD date format behavior
	* `Language Dependent`
	* `mm/dd/yy`
	* `mm/dd/yyyy`
	* `dd/mm/yy`
	* `dd/mm/yyyy`
	* `yyyy/mm/dd`
	* `yy/mm/dd`
- `First year of 20th century`: Set the first year of the 20th century for date parsing
- `Blank when empty`: Return blank when empty

Web information
- `Focus control`: Set focus control behavior
	* `First input att/var on the page`: Focus the first input attribute/variable
	* `First input att/var on the page only if not embedded`: Focus only when not embedded
	* `Browser dependent`: Let the browser decide focus
	* `Use Environment property value`: Inherit from the Environment setting
- `Temp media directory`: Set the temporary media directory
- `Static content base URL`: Set the base URL for static content
- `Internet Explorer compatibility`: Set IE compatibility mode
	* `IE7 Compatible`
- `Expose descriptive metadata`: Expose descriptive metadata
- `Javascript debug mode`: Enable JavaScript debug mode
- `Auto compress http traffic`: Enable HTTP compression
- `Help files base URL`: Set the base URL for help files

Android-specific
- `Android SDK Directory`: Set the local path to the Android SDK
- `JDK Directory`: Set the local path to the JDK
- `Copy APK To Cloud`: Upload the generated APK when using Deploy to Cloud
	* `True`
	* `False`
- `MultiDex Build in Android`: Enable MultiDex build
	* `True`
	* `False`
- `Gradle Options`: Set additional Gradle flags for Android build
- `Java package name`: Set the Android application package identifier
- `Use decimal arithmetic`: Use decimal arithmetic in generated code
- `Transaction integrity`: Generate transactional integrity in data access
- `Initialize not referenced attributes`: Initialize attributes not referenced in the load
- `Classpath`: Set extra classpath entries for Android build
- `Base Classpath`: Set base classpath entries generated from Modules
- `Compiler Path`: Set the path to `javac`
- `Interpreter Path`: Set the path to `java`

Apple-specific
- `Execution Type`: Select the iOS execution mode
	* `Simulator (Mac)`: Run on iOS Simulator
	* `iOS Device (Mac)`: Run on a physical device connected to Mac
	* `iTunes Sync (Local)`: Build and sync .ipa via iTunes
	* `Build IPA (Local)`: Build .ipa locally
	* `Build for Distribution (Local)`: Build signed .zip for distribution
	* `Knowledge Base (Device)`: Run on device using KBN and Service URL
- `Simulator`: Select the simulator device type
	* `iPhone Retina (3.5-inch)`
	* `iPhone Retina (4-inch)`
	* `iPhone Retina (4-inch 64-bits)`
	* `iPhone Retina (4.7-inch 64-bits)`
	* `iPhone Retina HD (5.5-inch 64-bits)`
	* `iPad`
	* `iPad Retina`
	* `iPad Retina (64-bits)`
- `Simulator SDK`: Select the iOS SDK for simulator
	* `8.0`
	* `Latest`
- `Mac Host`: Set the Mac host name or IP for remote build
- `Mac User`: Set the Mac user for remote build
- `Mac Password`: Set the Mac user password for remote build
- `Use decimal arithmetic`: Use decimal arithmetic in generated code
- `Transaction integrity`: Generate transactional integrity in data access
- `Initialize not referenced attributes`: Initialize attributes not referenced in the load

Angular-specific
- `Run Target`: Select where the Angular app runs
	* `Default`: Run on Angular Dev Server (or DeployToCloud when backend deploys)
	* `Angular Dev Server`: Run on local Angular dev server
	* `Local Web Server`: Run from the backend web server URL
	* `GeneXusDeployToCloud`: Run from GeneXus DeployToCloud
	* `AWS S3`: Prepare for manual upload to AWS S3
- `Build Mode`: Select Angular build mode
	* `Prototype`: Import minimum dependencies for prototyping
	* `Development`: Include testing/debug packages
	* `Distribution`: Build for deployment (ng build --configuration production)

---

# DATA STORE PROPERTIES
Common
- `Access technology to set`: Select the access technology for this Data Store
	* `ADO.NET`: Use the ADO.NET provider
	* `JDBC`: Use the JDBC driver
	* `ODBC`: Use ODBC connectivity
	* `Embedded SQL`: Use embedded SQL
	* `iSeries Native`: Use iSeries native access
	* `Ruby`: Use legacy Ruby access
- `Server Name`: Set the database server host
- `Database Name`: Set the database name (or library for iSeries)
- `User Id`: Set the database user
- `User Password`: Set the database password
- `JDBC Driver`: Set the JDBC driver or custom JDBC URL
- `Use Custom JDBC URL`: Enable a custom JDBC URL
- `Additional connection string attributes`: Add extra connection string attributes
- `Connect to server`: Select connection mode to server
	* `At first request`: Connect on first request
	* `At application startup`: Connect on application startup
- `Show connection dialog`: Show the connection dialog
	* `Never`: Never show the dialog
- `Read Replica`: Enable read replica usage

SQL Server-specific
- `Access technology to set`: Select the SQL Server access technology
- `List of external stored procedures`: Register external stored procedures
- `Connect using`: Select the ODBC connection method
- `Driver name`: Set the ODBC driver name
- `Use Custom JDBC URL`: Use a custom JDBC URL
- `Server TCP/IP port`: Set the SQL Server port
- `Connect to server`: Select connection mode to server
- `Show Connection Dialog in WinForms`: Prompt for connection in WinForms
- `Use trusted connection`: Enable Windows authentication
- `Use datasource for web-based applications`: Use a datasource in web apps
- `Server connection pooling`: Configure connection pooling
- `Unlimited size`: Allow unlimited pool size
- `Size`: Set max pool size
- `Create all pool connections at startup`: Pre-create pool connections
- `Recycle pool connections`: Enable pool recycling
- `Recycle type`: Select recycling strategy
	* `By creation time`: Recycle by creation time
	* `By idle time`: Recycle by idle time
- `Recycle time (minutes)`: Set recycle interval
- `Database schema`: Set default schema
- `Primary key definition`: Select primary key definition strategy
- `Declare referential integrity`: Generate referential integrity
- `Default tables storage area`: Set default table storage
- `Default indices storage area`: Set default index storage
- `Default temporary storage area`: Set default temp storage
- `Generate COMMENT ON statements`: Generate COMMENT ON statements
- `SQL server version`: Set the SQL Server version for SQL generation
- `Isolation level`: Set the isolation level
	* `Read Committed`
	* `Read Uncommitted`
	* `Repeatable Read`
	* `Serializable`
- `Lock time-out (seconds)`: Set lock timeout
- `Lock retry count`: Set lock retry count

Server connection pooling
- `Enable connection pooling`: Enable connection pooling
- `Unlimited size`: Allow unlimited pool size
- `Recycle pool connections`: Enable pool recycling
- `Recycle type`: Select recycling strategy
	* `By creation time`: Recycle by creation time
	* `By idle time`: Recycle by idle time
- `Recycle time (minutes)`: Set recycle interval

Creation/Reorganization information
- `Database schema`: Set the default schema
- `Primary key definition`: Select primary key definition strategy
- `Declare referential integrity`: Generate referential integrity
- `Generate COMMENT ON statements`: Generate COMMENT ON statements

PostgreSQL-specific
- `JDBC driver`: Select the PostgreSQL JDBC driver
	* `PostgreSQL JDBC Driver (Type 4)`
- `Use custom JDBC URL`: Enable a custom JDBC URL
- `Database name`: Set the database name
- `Server name`: Set the server host
- `Server TCP/IP port`: Set the server port
- `Connect to server`: Select connection mode to server
	* `At first request`: Connect on first request
	* `At application startup`: Connect on application startup
- `Show connection dialog`: Show the connection dialog
	* `Never`: Never show the dialog
- `User id`: Set the database user
- `User password`: Set the database password
- `Use datasource for web-based applications`: Use a datasource in web apps
- `Read Replica`: Enable read replica usage

PostgreSQL-specific
- `PostgreSQL version`: Set the PostgreSQL version for SQL generation
- `PostgreSQL Extensions`: Set enabled extensions
- `Lock time-out (seconds)`: Set lock timeout
- `Lock retry count`: Set lock retry count

iSeries Native-specific
- `Access technology to set`: Select iSeries native access
- `Data library name`: Set the data library name
- `Programs library name`: Set the programs library name
- `Create save file`: Configure save file creation
- `Name of journal`: Set the journal name
- `Order attributes in file`: Set attribute order in file
- `OS for iSeries version`: Set the iSeries OS version for SQL generation
- `Lock time-out (seconds)`: Set lock timeout

Data store list behavior
- The first `DataStore` in the list is the default and is used when running
- The default `DataStore` cannot be deleted
- Any `DataStore` referenced by `Data View` objects cannot be deleted
- Additional `DataStore` can be added for external databases

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `environment`

---

# CONSTRAINTS
- Define at least one generator under `BackEnd` and `FrontEnd`
- Keep data store names unique inside the environment
- Keep deployment unit names aligned with `DeploymentUnit` objects

---

# REMARKS
- Back-end host generator include: .NET, .NET Framework, and Java
- Front-end host generator include: Android, Apple, Angular, ad classic HTML/CSS/JS
- All `Deployment Unit` references are created at the `Version` level and selected per environment

---

# EXAMPLES

## Example 1
Environment with .NET backend and SQL Server data store
~~~
Environment NETSQLServer
{
	#Properties
		"Platform" = "Web"
		"Language" = ".NET"
		"DataStore" = "SQL Server"
		"Target Path" = "NETSQLServer"
		"Startup Object" = "MainPanel"
		"Environment Name" = "NET SQL Server"
		"Commit on Exit" = true
		"Encrypt URL Parameters" = "Session Key"
		"Protocol Specification" = "HTTPS"
	#End

	#BackEnd
		"Log Level" = "4. Info"
		"Transactional Integrity" = true
	#End

	#DataStores
		"Server Name" = "MSSQLSRV01"
		"Database Name" = "PlantCareSample"
		"User Id"="sa"
		"User Passwrod"="p@ssW0rd"
		"SQL Sever Verison"="2012 or higher"
	#End

	#FrontEnd
		Web
		[
			"Temp media directory" = "PrivateTempStorage"
			"Static content base URL" = "/static"
		]

		Android
		[
			"Android SDK Directory" = "C:\\Android\\sdk"
			"JDK Directory" = "C:\\Java\\jdk"
			"Gradle Options" = "-Xmx1024m"
			"Java package name" = "com.example.netsqlserver"
		]

		Apple
		[
			"Mac Host" = "mac-builder.local"
			"Mac User" = "builder"
			"Execution Type" = "Simulator (Mac)"
			"Simulator" = "iPhone Retina (4.7-inch 64-bits)"
		]

		Angular
		[
			"Run Target" = "Angular Dev Server"
			"Build Mode" = "Development"
			"Static content base URL" = "/static"
		]
	#End
}
~~~

## Example 2
Environment with Java backend and PostgreSQL data store
~~~
Environment JavaPostgreSQL
{
	#Properties
		"Platform" = "Web"
		"Language" = "Java"
		"DataSource" = "PostgreSQL"
		"Target Path" = "JavaPostgreSQL"
		"Startup Object" = "MainPanel"
		"Environment Name" = "Java PostgreSQL"
		"Commit on Exit" = true
		"Encrypt URL Parameters" = "Session Key"
		"Protocol Specification" = "HTTPS"
	#End

	#BackEnd
		"Log Level" = "5. Debug"
		"Reorganization Option" = "-nogui"
		"Create Database Option" = "-nogui"
	#End

	#DataStores
		"Server Name" = "PGSERVER01"
		"Database Name" = "PlantCareSample"
		"User Id" = "postgres"
		"User Password" = "p@ssW0rd"
		"Recycle Type"="By idle time"
		"PosgreSQL Version"="8.3 or higher"
	#End
}
~~~
