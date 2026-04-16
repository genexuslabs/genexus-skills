---
name: properties-environment-backend
description: Configurable backend generator properties
---

Use this file to select editable properties, defaults, and valid options for an backend `Generator` from `Environment` deployment target

---

# GENERAL

## Generate developer menu
- Description: Enable the developer menu for generated apps
- Type: `boolean`

## Generate OpenAPI interface
- Description: Generate OpenAPI interfaces for services
- Type: `boolean`

## OpenAPI version
- Description: Set the OpenAPI version to generate
- Type: `enum{3.0,2.0,APIGateway 2.0}`
- Options:
	* `3.0`: Generate OpenAPI 3.0
	* `2.0`: Generate OpenAPI 2.0
	* `APIGateway 2.0`: Generate an OpenAPI 2.0 variant required by AWS API Gateway

## Use decimal arithmetic
- Description: Use decimal arithmetic in generated code
- Type: `boolean`

---

# LOGGING

## Log Level
- Description: Set the generator log verbosity
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
- Description: Set the user log verbosity; same values as [Log Level](#log-level)

## Log output
- Description: Select the log output provider
- Type: `enum{File,Console,Azure Application Insights}`
- Options:
	* `File`: Write logs to files
	* `Console`: Write logs to console output
	* `Azure Application Insights`: Send logs to Application Insights (.NET)

## Log file
- Description: Set the log file name
- Type: `string`

## PDF Reports Library
- Description: Select the PDF reporting library
- Type: `enum{iText (Legacy),iText 8,PDFBox,PDFPig}`
- Options:
	* `iText (Legacy)`: Use legacy iText
	* `iText 8`: Use iText 8
	* `PDFBox`: Use Apache PDFBox (Java)
	* `PDFPig`: Use PDFPig (.NET)

---

# HTTPCLIENT POOL

## Maximum pool size per host
- Description: Set the max HttpClient pool size per host
- Type: `integer`

---

# DATA ACCESS INFORMATION

## Reorganize server table
- Description: Enable server table reorganization when requested by Impact Analysis
- Type: `boolean`

## Join management
- Description: Set how joins are executed
- Type: `enum{Join tables on the server,Join tables on the client,Use Environment property value}`
- Options:
	* `Join tables on the server`: Execute joins on the database server
	* `Join tables on the client`: Execute joins on the client/server side
	* `Use Environment property value`: Inherit from the Environment setting

## Join type
- Description: Select the join type strategy
- Type: `enum{Use default for server,Natural Join,Outer Join}`
- Options:
	* `Use default for server`
	* `Natural Join`: Use natural (inner) join semantics
	* `Outer Join`: Use outer (left) join semantics

## Transactional integrity
- Description: Generate transaction/procedure logic with transactional integrity
- Type: `boolean`

## Initialize not referenced attributes
- Description: Initialize attributes not referenced in the load
- Type: `boolean`

## Generate null for nullvalue
- Description: Generate NULL instead of the nullvalue for null attributes
- Type: `boolean`

## RPC declarations prefix
- Description: Set the prefix for RPC declarations
- Type: `string`

## Use client login as userid
- Description: Use client login as user id for auditing
- Type: `boolean`

## Maximum cached cursors
- Description: Set the max number of cached cursors
- Type: `integer`

---

# OPTIMIZATION

## Copy table groups
- Description: Control table group copy behavior
- Type: `enum{If no unique index,Always,Never,Use Environment property value}`
- Options:
	* `If no unique index`: Copy only when no unique index exists
	* `Always`: Always apply copy table optimization
	* `Never`: Never apply copy table optimization
	* `Use Environment property value`: Inherit from the Environment setting

---

# HINTS

## Fast first rows
- Description: Optimize for fast first rows
- Type: `enum{Yes,No}`

---

# EVENT HANDLING

## Before commit
- Description: Set the procedure to run before commit
- Type: `string`

## After commit
- Description: Set the procedure to run after commit
- Type: `string`

## Before rollback
- Description: Set the procedure to run before rollback
- Type: `string`

## After rollback
- Description: Set the procedure to run after rollback
- Type: `string`

## Before connect
- Description: Set the procedure to run before connect
- Type: `string`

## After connect
- Description: Set the procedure to run after connect
- Type: `string`

---

# SPECIFICATION

## Expand dynamic calls
- Description: Expand dynamic calls during generation
- Type: `boolean`

## Generate prompt programs
- Description: Generate prompt programs
- Type: `boolean`

---

# TYPE CHECKING

## Check type errors
- Description: Enable type checking
- Type: `boolean`

## Standard Functions
- Description: Set behavior for non-standard functions
- Type: `enum{Error on non-standard functions,Allow non-standard functions,Only standard functions,Use Environment property value}`
- Options:
	* `Error on non-standard functions`: Fail on non-standard functions
	* `Allow non-standard functions`: Allow non-standard functions
	* `Only standard functions`: Allow only standard functions
	* `Use Environment property value`: Inherit from the Environment setting

---

# WARNING MESSAGES

## Disabled warnings
- Description: Disable selected warnings
- Type: `boolean`

## Warnings treated as errors
- Description: Treat warnings as errors
- Type: `boolean`

---

# BUILD PROCESS

## Standard classes update
- Description: Set how standard classes are updated
- Type: `enum{Defined by Generator,Custom}`

## Standard classes specification
- Description: Set the standard classes specification
- Type: `string`

---

# ADVANCED

## MSBuild options
- Description: Set additional MSBuild options (.NET)
- Type: `string`

## Reorganization Option
- Description: Set reorganization execution flags
- Type: `string`
- Flags:
	* `-nogui`: Run without UI
	* `-force`: Force reorganization execution
	* `-noverifydatabaseschema`: Skip schema verification
	* `-recordcount`: Include record count checks
	* `-ignoreresume`: Ignore previous resume state
	* `-donotexecute`: Generate but do not execute

## Create Database Option
- Description: Set database creation execution flags
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
- Description: Configure prototyping in cloud and server URL
- Type: `string`

## Web Server to be Used
- Description: Select the target web server for deployment
- Type: `boolean`

## Deploy to cloud
- Description: Enable cloud deployment
- Type: `boolean`

## Web Server
- Description: Select the target web server
- Type: `string`

## Web Root
- Description: Set the web root URL
- Type: `string`
- Location: `.local.gx`

---

# FULL TEXT SEARCH OPTIONS

## Searchable
- Description: Enable full text search
- Type: `enum{Yes,No}`

---

# JAVA SPECIFIC

## Compiler Options
- Description: Set additional `javac` parameters
- Type: `string`

## JDK Directory (JAVA HOME)
- Description: Set the installed JDK path
- Type: `string`

## Interpreter Options
- Description: Set additional JVM interpreter parameters
- Type: `string`

## Gradle Options
- Description: Set additional Gradle parameters
- Type: `string`

## Use Default Browser
- Description: Use the default browser for execution
- Type: `boolean`

---

# .NET SPECIFIC

## SQL Server Data Store
- Description: Select the SQL Server Data Store used by the session state provider
- Type: `string`

## .NET Application name
- Description: Set the .NET application name/namespace
- Type: `string`

## Generate strong name
- Description: Generate a strong name for assemblies
- Type: `boolean`

---

# STORAGE CONFIGURATION

## Storage Provider
- Description: Select the storage provider
- Type: `AUTO: enum{Local,Amazon S3,Amazon S3 V1 (Legacy),Microsoft Azure,Google Cloud Storage,IBM Cloud Object Storage}`

---

# NOTIFICATION CONFIGURATION

## Notifications Provider
- Description: Select the notifications provider
- Type: `enum{None,OneSignal,JPush}`
- Options:
	* `None`: Disable notifications
	* `OneSignal`: Use OneSignal notifications
	* `JPush`: Use JPush notifications

---

# SESSION CONFIGURATION

## Session Timeout
- Description: Set the session timeout (minutes)
- Type: `integer`

## Session State Provider
- Description: Select the session state provider
- Type: `enum{In Process,Redis,Database}` -->`
- Options:
	* `In Process`: Store sessions in process
	* `Redis`: Store sessions in Redis
	* `Database`: Store sessions in SQL database

---

# CACHE CONFIGURATION

## Database access cache
- Description: Enable database access cache
- Type: `enum{Yes,No}`

## Cache Provider
- Description: Select the cache provider
- Type: `enum{In Process,Memcached,Redis}`

---

# ENTERPRISE AI CONFIGURATION

## AI Provider Address
- Description: Set the AI provider address
- Type: `string`

## AI Provider API Key
- Description: Set the AI provider API key
- Type: `string`
- Location: `.local.gx`

## AI Provider Project Id
- Description: Set the AI provider project id
- Type: `string`

## AI Provider Project Name
- Description: Set the AI provider project name
- Type: `string`

## Default Agents AI Model
- Description: Set the default Agents AI model
- Type: `string`

---

# WEB NOTIFICATION CONFIGURATION

## Web Notifications Provider
- Description: Select the web notifications provider
- Type: `enum{None,InProcess}`
- Options:
	* `None`: Use none
	* `InProcess`: Use in-process web notifications

## Received Handler
- Description: Set the received handler
- Type: `string`

## Open Handler
- Description: Set the open handler
- Type: `string`

## Close Handler
- Description: Set the close handler
- Type: `string`

## Error Handler
- Description: Set the error handler
- Type: `string`

---

# OBSERVABILITY

## Observability Provider
- Description: Select the observability provider
- Type: `enum{None,OpenTelemetry,AWS Distro for OpenTelemetry,Azure Monitor Application Insights}`
- Options:
	* `None`: Disable observability
	* `OpenTelemetry`: Use OpenTelemetry SDK
	* `AWS Distro for OpenTelemetry`: Use ADOT provider
	* `Azure Monitor Application Insights`: Use Azure Monitor provider
