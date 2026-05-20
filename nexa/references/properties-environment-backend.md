---
name: properties-environment-backend
description: Configurable backend generator properties
---

Use this file to select editable properties, defaults, and valid options for an backend `Generator` from `Environment` deployment target

---

# GENERAL

## Generate developer menu
Enable the developer menu for generated apps
- Type: `boolean`

## Generate OpenAPI interface
Generate OpenAPI interfaces for services
- Type: `boolean`

## OpenAPI version
Set the OpenAPI version to generate
- Type: `enum{3.0,2.0,APIGateway 2.0}`
- Options:
	* `3.0`: Generate OpenAPI 3.0
	* `2.0`: Generate OpenAPI 2.0
	* `APIGateway 2.0`: Generate an OpenAPI 2.0 variant required by AWS API Gateway

## Use decimal arithmetic
Use decimal arithmetic in generated code
- Type: `boolean`

---

# LOGGING

## Log Level
Set the generator log verbosity
- Type: `enum{0. Off,1. Fatal,2. Error,3. Warn,4. Info,5. Debug,6. All}`
- Options:
	* `0. Off`: Turns off logging (default)
	* `1. Fatal`: Very severe errors that typically abort the application
	* `2. Error`: Error events that might allow the application to continue
	* `3. Warn`: Potentially harmful situations or warnings
	* `4. Info`: Informational messages about progress
	* `5. Debug`: Fine-grained informational events for debugging
	* `6. All`: Enables all logging levels

## User Log Level
Set the user log verbosity; same values as [Log Level](#log-level)

## Log output
Select the log output provider
- Type: `enum{File,Console,Azure Application Insights}`
- Options:
	* `File`: Write logs to files
	* `Console`: Write logs to console output
	* `Azure Application Insights`: Send logs to Application Insights (.NET)

## Log file
Set the log file name
- Type: `string`

## PDF Reports Library
Select the PDF reporting library
- Type: `enum{iText (Legacy),iText 8,PDFBox,PDFPig}`
- Options:
	* `iText (Legacy)`: Use legacy iText
	* `iText 8`: Use iText 8
	* `PDFBox`: Use Apache PDFBox (Java)
	* `PDFPig`: Use PDFPig (.NET)

---

# HTTPCLIENT POOL

## Maximum pool size per host
Set the max HttpClient pool size per host
- Type: `integer`

---

# DATA ACCESS INFORMATION

## Reorganize server table
Enable server table reorganization when requested by Impact Analysis
- Type: `boolean`

## Join management
Set how joins are executed
- Type: `enum{Join tables on the server,Join tables on the client,Use Environment property value}`
- Options:
	* `Join tables on the server`: Execute joins on the database server
	* `Join tables on the client`: Execute joins on the client/server side
	* `Use Environment property value`: Inherit from the Environment setting

## Join type
Select the join type strategy
- Type: `enum{Use default for server,Natural Join,Outer Join}`
- Options:
	* `Use default for server`
	* `Natural Join`: Use natural (inner) join semantics
	* `Outer Join`: Use outer (left) join semantics

## Transactional integrity
Generate transaction/procedure logic with transactional integrity
- Type: `boolean`

## Initialize not referenced attributes
Initialize attributes not referenced in the load
- Type: `boolean`

## Generate null for nullvalue
Generate NULL instead of the nullvalue for null attributes
- Type: `boolean`

## RPC declarations prefix
Set the prefix for RPC declarations
- Type: `string`

## Use client login as userid
Use client login as user id for auditing
- Type: `boolean`

## Maximum cached cursors
Set the max number of cached cursors
- Type: `integer`

---

# OPTIMIZATION

## Copy table groups
Control table group copy behavior
- Type: `enum{If no unique index,Always,Never,Use Environment property value}`
- Options:
	* `If no unique index`: Copy only when no unique index exists
	* `Always`: Always apply copy table optimization
	* `Never`: Never apply copy table optimization
	* `Use Environment property value`: Inherit from the Environment setting

---

# HINTS

## Fast first rows
Optimize for fast first rows
- Type: `enum{Yes,No}`

---

# EVENT HANDLING

## Before commit
Set the procedure to run before commit
- Type: `string`

## After commit
Set the procedure to run after commit
- Type: `string`

## Before rollback
Set the procedure to run before rollback
- Type: `string`

## After rollback
Set the procedure to run after rollback
- Type: `string`

## Before connect
Set the procedure to run before connect
- Type: `string`

## After connect
Set the procedure to run after connect
- Type: `string`

---

# SPECIFICATION

## Expand dynamic calls
Expand dynamic calls during generation
- Type: `boolean`

## Generate prompt programs
Generate prompt programs
- Type: `boolean`

---

# TYPE CHECKING

## Check type errors
Enable type checking
- Type: `boolean`

## Standard Functions
Set behavior for non-standard functions
- Type: `enum{Error on non-standard functions,Allow non-standard functions,Only standard functions,Use Environment property value}`
- Options:
	* `Error on non-standard functions`: Fail on non-standard functions
	* `Allow non-standard functions`: Allow non-standard functions
	* `Only standard functions`: Allow only standard functions
	* `Use Environment property value`: Inherit from the Environment setting

---

# WARNING MESSAGES

## Disabled warnings
Disable selected warnings
- Type: `boolean`

## Warnings treated as errors
Treat warnings as errors
- Type: `boolean`

---

# BUILD PROCESS

## Standard classes update
Set how standard classes are updated
- Type: `enum{Defined by Generator,Custom}`

## Standard classes specification
Set the standard classes specification
- Type: `string`

---

# ADVANCED

## MSBuild options
Set additional MSBuild options (.NET)
- Type: `string`

## Reorganization Option
Set reorganization execution flags
- Type: `string`
- Flags:
	* `-nogui`: Run without UI
	* `-force`: Force reorganization execution
	* `-noverifydatabaseschema`: Skip schema verification
	* `-recordcount`: Include record count checks
	* `-ignoreresume`: Ignore previous resume state
	* `-donotexecute`: Generate but do not execute

## Create Database Option
Set database creation execution flags
- Type: `string`
- Flags:
	* `-nogui`: Run without UI
	* `-force`: Force database creation
	* `-noverifydatabaseschema`: Skip schema verification
	* `-recordcount`: Include record count checks
	* `-ignoreresume`: Ignore previous resume state
	* `-donotexecute`: Generate but do not execute

---

# EXECUTION

## Execution Options
Configure prototyping in cloud and server URL
- Type: `string`

## Web Server to be Used
Select the target web server for deployment
- Type: `boolean`

## Deploy to cloud
Enable cloud deployment
- Type: `boolean`

## Web Server
Select the target web server
- Type: `string`

## Web Root
Set the web root URL
- Type: `string`
- Scope: `.local`

---

# FULL TEXT SEARCH OPTIONS

## Searchable
Enable full text search
- Type: `enum{Yes,No}`

---

# JAVA SPECIFIC

## Compiler Options
Set additional `javac` parameters
- Type: `string`

## JDK Directory (JAVA HOME)
Set the installed JDK path
- Type: `string`

## Interpreter Options
Set additional JVM interpreter parameters
- Type: `string`

## Gradle Options
Set additional Gradle parameters
- Type: `string`

## Use Default Browser
Use the default browser for execution
- Type: `boolean`

---

# .NET SPECIFIC

## SQL Server Data Store
Select the SQL Server Data Store used by the session state provider
- Type: `string`

## .NET Application name
Set the .NET application name/namespace
- Type: `string`

## Generate strong name
Generate a strong name for assemblies
- Type: `boolean`

---

# STORAGE CONFIGURATION

## Storage Provider
Select the storage provider
- Type: `AUTO: enum{Local,Amazon S3,Amazon S3 V1 (Legacy),Microsoft Azure,Google Cloud Storage,IBM Cloud Object Storage}`

---

# NOTIFICATION CONFIGURATION

## Notifications Provider
Select the notifications provider
- Type: `enum{None,OneSignal,JPush}`
- Options:
	* `None`: Disable notifications
	* `OneSignal`: Use OneSignal notifications
	* `JPush`: Use JPush notifications

---

# SESSION CONFIGURATION

## Session Timeout
Set the session timeout (minutes)
- Type: `integer`

## Session State Provider
Select the session state provider
- Type: `enum{In Process,Redis,Database}` -->`
- Options:
	* `In Process`: Store sessions in process
	* `Redis`: Store sessions in Redis
	* `Database`: Store sessions in SQL database

---

# CACHE CONFIGURATION

## Database access cache
Enable database access cache
- Type: `enum{Yes,No}`

## Cache Provider
Select the cache provider
- Type: `enum{In Process,Memcached,Redis}`

---

# ENTERPRISE AI CONFIGURATION

## AI Provider Address
Set the AI provider address
- Type: `string`

## AI Provider API Key
Set the AI provider API key
- Type: `string`
- Scope: `.local`

## AI Provider Project Id
Set the AI provider project id
- Type: `string`

## AI Provider Project Name
Set the AI provider project name
- Type: `string`

## Default Agents AI Model
Set the default Agents AI model; see [Supported Chat Models](https://docs.globant.ai/en/wiki?200,Supported+Chat+Models)
- Type: `string`
- Default: `openai/gpt-4.1`

---

# WEB NOTIFICATION CONFIGURATION

## Web Notifications Provider
Select the web notifications provider
- Type: `enum{None,InProcess}`
- Options:
	* `None`: Use none
	* `InProcess`: Use in-process web notifications

## Received Handler
Set the received handler
- Type: `string`

## Open Handler
Set the open handler
- Type: `string`

## Close Handler
Set the close handler
- Type: `string`

## Error Handler
Set the error handler
- Type: `string`

---

# OBSERVABILITY

## Observability Provider
Select the observability provider
- Type: `enum{None,OpenTelemetry,AWS Distro for OpenTelemetry,Azure Monitor Application Insights}`
- Options:
	* `None`: Disable observability
	* `OpenTelemetry`: Use OpenTelemetry SDK
	* `AWS Distro for OpenTelemetry`: Use ADOT provider
	* `Azure Monitor Application Insights`: Use Azure Monitor provider
