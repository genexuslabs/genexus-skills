---
name: properties-environment-datastore
description: Configurable data store properties
---

Use this file to select editable properties, defaults, and valid options for an backend `DataStore` from `Environment` deployment target

---

# COMMON

## Access technology to set
- Description: Select the access technology for this Data Store
- Type: `enum{ADO.NET,JDBC,ODBC,Embedded SQL,iSeries Native,Ruby}`
- Options:
	* `ADO.NET`: Used by the .NET generator defined in the Environment
	* `JDBC`: Used by the Java generator defined in the Environment
	* `ODBC`: Used by the Visual FoxPro generator defined in the Environment
	* `Embedded SQL`: Embedded SQL access
	* `iSeries Native`: Used by RPG and Cobol generators defined in the Environment
	* `Ruby`: Used by the Ruby generator defined in the Environment (until GeneXus X Evolution 3)

## List of external stored procedures
- Description: Register external stored procedures
- Type: `string`

## Database Name
- Description: Set the database name (or library for iSeries)
- Type: `string`
- Location: `.local.gx`

## Server Name
- Description: Set the database server host
- Type: `string`
- Location: `.local.gx`

## Server TCP/IP port
- Description: Set the server port
- Type: `integer`

## Connect to server
- Description: Select connection mode to server
- Type: `enum{At first request,At application startup}`
- Options:
	* `At first request`: Connect after the first request to the server
	* `At application startup`: Connect during initialization before the main object is displayed

## Show connection dialog
- Description: Show the connection dialog
- Type: <!-- AUTO: enum{Never} -->
- Options:
	* `Never`: Never show the dialog

## User Id
- Description: Set the database user
- Type: `string`
- Location: `.local.gx`

## User Password
- Description: Set the database password
- Type: `string`
- Location: `.local.gx`

## Additional connection string attributes
- Description: Add extra connection string attributes
- Type: `string`

## Use datasource for web-based applications
- Description: Use a datasource in web apps
- Type: `enum{True,False}`
- Options:
	* `True`: Use an application server JDBC Datasource
	* `False`: Use the standard JDBC connection

## Read Replica
- Description: Enable read replica usage
- Type: `boolean`

## Enable connection pooling
- Description: Enable connection pooling
- Type: `enum{True,False}`
- Options:
	* `True`: Enable GeneXus built-in connection pooling
	* `False`: Disable GeneXus built-in connection pooling

## Unlimited size
- Description: Allow unlimited pool size
- Type: `boolean`

## Recycle pool connections
- Description: Enable pool recycling
- Type: `boolean`

## Recycle type
- Description: Select recycling strategy
- Type: `enum{By creation time,By idle time}`
- Options:
	* `By creation time`: Recycle by creation time
	* `By idle time`: Recycle by idle time

## Recycle time (minutes)
- Description: Set recycle interval
- Type: `integer`

## Database schema
- Description: Set the default schema
- Type: `string`

## Primary key definition
- Description: Select primary key definition strategy
- Type: `enum{Primary Key,Index,Constraint}`
- Options:
	* `Primary Key`: Declare primary key using the PRIMARY KEY clause
	* `Index`: Declare primary key using a unique index
	* `Constraint`: Declare primary key using a CONSTRAINT clause

## Declare referential integrity
- Description: Generate referential integrity
- Type: `enum{Yes,No,Remove}`
- Options:
	* `Yes`: Declare all integrity references during creation/reorganization
	* `No`: Do not declare referential integrity
	* `Remove`: Remove integrity references for reorganized tables

## Default tables storage area
- Description: Set default table storage
- Type: `string`

## Default indices storage area
- Description: Set default index storage
- Type: `string`

## Default temporary storage area
- Description: Set default temp storage
- Type: `string`

## Generate COMMENT ON statements
- Description: Generate COMMENT ON statements
- Type: `boolean`

## Isolation level
- Description: Set the isolation level
- Type: `enum{Read Committed,Read Uncommitted,Repeatable Read,Serializable}`
- Options:
	* `Read Committed`: Use Read Committed
	* `Read Uncommitted`: Use Read Uncommitted
	* `Repeatable Read`: Use Repeatable Read
	* `Serializable`: Use Serializable

## Lock time-out (seconds)
- Description: Set lock timeout
- Type: `integer`

## Lock retry count
- Description: Set lock retry count
- Type: `integer`

---

# MYSQL SPECIFIC

## MySQL Version
- Description: Set the MySQL version for SQL generation
- Type: `enum{4.x to 5.0.2,5.0.3 to 5.7.6, 5.7.7 to 5.7.23, 8.x, 9.x or higher}`
- Default: `9.x or higher`

---

# SQL SERVER SPECIFIC

## Connect using
- Description: Select the ODBC connection method
- Type: `string`

## Driver name
- Description: Set the ODBC driver name
- Type: `string`

## Server connection pooling
- Description: Configure connection pooling
- Type: `string`

## Size
- Description: Set max pool size
- Type: `integer`

## Create all pool connections at startup
- Description: Pre-create pool connections
- Type: `boolean`

## Show Connection Dialog in WinForms
- Description: Prompt for connection in WinForms
- Type: `boolean`

## Use trusted connection
- Description: Enable Windows authentication instead of using user/password
- Type: `boolean`
- Location: `.local.gx`
- Constraint: Only applicable for `.NET` environments with `SQL Server` data store

## SQL server version
- Description: Set the SQL Server version for SQL generation
- Type: `enum{2012 or higher,2005 to 2008 R2}`

---

# POSTGRESQL SPECIFIC

## JDBC driver
- Description: Select the PostgreSQL JDBC driver
- Type: `enum{PostgreSQL JDBC Driver (Type 4),Custom Driver}`

## Use custom JDBC URL
- Description: Enable a custom JDBC URL
- Type: `boolean`
- Location: `.local.gx`

## Use custom JDBC URL
- Description: Custom JDBC URL
- Type: `string`
- Location: `.local.gx`

## Show connection dialog in WinForms
- Description: Prompt for connection in WinForms
- Type: `boolean`

## PostgreSQL version
- Description: Set the PostgreSQL version for SQL generation
- Type: `enum{7.x,8.0,8.1 or 8.2,8.3 or higher}`

## PostgreSQL Extensions
- Description: Set enabled extensions
- Type: `string`

---

# ORACLE SPECIFIC

## Generate FOR UPDATE clause
- Description: Generate FOR UPDATE clause in SQL statements
- Type: `boolean`

## Declare Varchar as Varchar2
- Description: Use VARCHAR2 data type for VARCHAR
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Declare Varchar attributes as Varchar2
	* `No`: Declare Varchar attributes as Varchar

## Oracle version
- Description: Set the Oracle version for SQL generation
- Type: `enum{12c or higher,8.1.5 to 8.x.x,9 to 11g}`

---

# ISERIES SPECIFIC

## Initial catalog
- Description: Set the initial catalog
- Type: `string`

## Data library name
- Description: Set the data library name
- Type: `string`
- Location: `.local.gx`

## Programs library name
- Description: Set the programs library name
- Type: `string`
- Location: `.local.gx`

## Create save file
- Description: Configure save file creation
- Type: `string`

## Name of journal
- Description: Set the journal name
- Type: `string`

## Order attributes in file
- Description: Set attribute order in file
- Type: `string`

## Library list
- Description: Set the library list
- Type: `string`

## OS for iSeries version
- Description: Set the iSeries OS version for SQL generation
- Type: `string`

## Date data type definition
- Description: Set the date data type definition
- Type: `string`

---

# INFORMIX SPECIFIC

## Database type
- Description: Set the Informix database type
- Type: `string`

## Lock mode
- Description: Set the lock mode
- Type: `enum{Do not specify lock level,Use page level locking,Use row level locking}`
- Options:
	* `Do not specify lock level`: Do not generate a lock level clause
	* `Use page level locking`: Generate Lock Mode Page clause
	* `Use row level locking`: Generate Lock Mode Row clause

## Informix Version
- Description: Set the Informix version for SQL generation
- Type: `string`
