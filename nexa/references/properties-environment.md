---
name: properties-environment
description: Configurable environment properties for deployment target configuration
---

Use this file to select editable properties, defaults, and valid options for an Environment deployment target

---

# GENERAL

## Reorganization Generator
- Description: Generator used to execute database reorganizations
- Type: `string`

## TargetPath
- Description: Base path where generated model resources are written
- Type: `string`

## Startup Object
- Description: Default object executed when application starts
- Type: `string`

## Preserve Table Casing
- Description: Preserves declared table letter casing in generated schema
- Type: `boolean`
- Default: `True`

## Business Component
- Description: Default Business Component behavior at environment level
- Type: `boolean`
- Default: `False`

## Populate Data
- Description: Allows controlling whether data population should be run as part of the build process
- Type: `boolean`
- Default: `True`

## Synchronize with External Wiki
- Description: Synchronizes documentation with configured external wiki
- Type: `boolean`
- Default: `True`

## DateTime storage timezone
- Description: Timezone for datetime database storage
- Type: `string`
- Default: `0000`

---

# TRANSACTION INTEGRITY

## Commit on exit
- Description: Commits transaction when object execution ends
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `Yes`

---

# WEB INFORMATION

## Encrypt URL parameters
- Description: Allow or deny URL parameter encryption level
- Type: `string`

## Protocol specification
- Description: The protocol used for services and absolute URLs
- Type: `string`

## SameSite cookie attribute
- Description: Set cookie scope for first-party and cross-site requests
- Type: `string`

## Web Security Level
- Description: Security strictness for web runtime behavior
- Type: `enum{Use Environment property value,High,Medium}`
- Options:
	* `Use Environment property value`: Uses the setting defined at environment level
	* `High`: Uses the high level for this setting
	* `Medium`: Uses the medium level for this setting
- Default: `High`

---

# HTTP ERRORS HANDLERS

## Http Error Handlers
- Description: Enables custom handlers for HTTP error responses
- Type: `string`
- Default: `Disabled`

## Http Error Handlers Values
- Description: Maps HTTP status codes to handler objects
- Type: `string`

---

# DOCKER

## Use Docker containers
- Description: Prototype using Docker containers
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `No`

---

# LOCATION CONFIGURATION

## Google API Key
- Description: API key for Google Location services
- Type: `string`

---

# USER INTERFACE

## Genexus IDE Connection String
- Description: Connection string used by IDE-level data access tools
- Type: `string`

## Default Master Page
- Description: The Default Master Page
- Type: `string`

## Prompts Master Page
- Description: Master page used for initialize generated prompts
- Type: `string`

## Report Attribute Font
- Description: Default font for report attribute controls
- Type: `string`
- Default: `Microsoft Sans Serif,8`

## Report Text Block Font
- Description: Default font for report text block controls
- Type: `string`
- Default: `Microsoft Sans Serif,8`

---

# DEFAULTS

## User-Agent header
- Description: Default User-Agent header sent in outgoing HTTP requests
- Type: `string`

---

# COMPATIBILITY

## Parameters Style
- Description: Defines whether generated URLs use named parameters or positional parameters
- Type: `enum{Named,Positional}`
- Options:
	* `Named`: Uses named parameter passing
	* `Positional`: Uses positional parameter passing
- Default: `Named`

---

# BACKEND

## Generator
- Description: Target code generation platform
- Type: `enum{.NET,Java}`
- Options:
	* `.NET`: Generates C# code targeting .NET platform
	* `Java`: Generates Java code targeting JVM platform

## DBMS
- Description: Database management system for the default data store
- Type: `enum{SQL Server,PostgreSQL,MySQL,Oracle,SQLite,Informix,DB2 UDB,Dameng}`
- Options:
	* `SQL Server`: Microsoft SQL Server
	* `PostgreSQL`: PostgreSQL database
	* `MySQL`: MySQL database
	* `Oracle`: Oracle database
	* `SQLite`: SQLite embedded database
	* `Informix`: IBM Informix
	* `DB2 UDB`: IBM DB2 Universal Database
	* `Dameng`: Dameng database

---

# BACKEND LOCAL
These properties are stored in the `.local.gx` companion file and are machine-specific (typically gitignored)

## Database Name
- Description: Local database name for the default data store
- Type: `string`

## Server Name
- Description: Database server hostname or address
- Type: `string`

## User Id
- Description: Database user identifier
- Type: `string`

## Password
- Description: Database password
- Type: `string`
