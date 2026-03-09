---
name: properties-object-procedure
description: Configurable procedure properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Folder
- Description: Folder where the object is organized in the KB
- Type: `string`

## Session Type
- Description: Execution session mode for database access
- Type: `enum{Read Only,Read Write,None}`
- Options:
	* `Read Only`: Use this value when it matches the target behavior
	* `Read Write`: Use this value when it matches the target behavior
	* `None`: Use this value when it matches the target behavior
- Default: `Read Write`

## Main program
- Description: To specify that the object is main. That is: it can be executed as standalone application
- Type: `boolean`
- Default: `False`

## Call protocol
- Description: Define how the object is invoked, and its output
- Type: `enum{Internal,HTTP,Command Line,SOAP,Enterprise Java Bean}`
- Options:
	* `Internal`: Use this value when it matches the target behavior
	* `HTTP`: Use this value when it matches the target behavior
	* `Command Line`: Use this value when it matches the target behavior
	* `SOAP`: Use this value when it matches the target behavior
	* `Enterprise Java Bean`: Use this value when it matches the target behavior
- Default: `Internal`

## Execute in new LUW
- Description: Run procedure in a new LUW; controls transaction boundary behavior for called
- Type: `boolean`
- Default: `False`


---

# WEB INFORMATION
Use [common web information properties](./properties-common-web-information.md)

---

# INTEROPERABILITY

## Expose as Web Service
- Description: Publishes the object as a web service endpoint
- Type: `boolean`
- Default: `False`


---

# INTEGRATED SECURITY
Use [common integrated security properties](./properties-common-integrated-security.md)

---

# NETWORK
Use [common network properties](./properties-common-network.md)

---

# OBSERVABILITY
Use [common observability properties](./properties-common-observability.md)

---

# REPORTING OPTIONS

## Report output
- Description: Output channel used for report generation
- Type: `enum{Ask User,Only To Screen,Only To Printer,Only To File}`
- Options:
	* `Ask User`: Use this value when it matches the target behavior
	* `Only To Screen`: Use this value when it matches the target behavior
	* `Only To Printer`: Use this value when it matches the target behavior
	* `Only To File`: Use this value when it matches the target behavior

## Customizable Layout
- Description: Allows layout customization at runtime
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `No`

## Confirmation
- Description: Request user confirmation when moving between transaction actions from
- Type: `string`

## Allow user to cancel processing
- Description: Allows user cancellation during execution
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`

## Footer on last page
- Description: Prints footer in last page output
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`

## Autocenter objects in (0,0)
- Description: Centers report controls around origin
- Type: `enum{Use Environment property value,No,Yes}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
- Default: `No`


---

# TRANSACTION INTEGRITY

## Commit on exit
- Description: Commits transaction when object execution ends
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`


---

# WARNING MESSAGES
Use [common warning messages properties](./properties-common-warning-messages.md)

---

# COMPATIBILITY

## Standard Functions
- Description: Standard functions checking
- Type: `enum{Use Environment property value,Only standard functions,Allow non-standard functions}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `Only standard functions`: Use this value when it matches the target behavior
	* `Allow non-standard functions`: Use this value when it matches the target behavior
- Default: `Use Environment property value`

## Initialize not referenced attributes
- Description: Initializes attributes not referenced in code
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `Yes`

## Generate null for nullvalue()
- Description: Generates database null when Nullvalue() is used
- Type: `enum{No,Yes,Use Environment property value}`
- Options:
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `No`


---

# ISERIES SPECIFIC

## Commitment
- Description: Transaction handling mode for LUW boundaries
- Type: `enum{Enabled,Disabled}`
- Options:
	* `Enabled`: Use this value when it matches the target behavior
	* `Disabled`: Use this value when it matches the target behavior
- Default: `Enabled`

## Print using DDSs
- Description: Uses DDS for report print generation
- Type: `enum{Use Environment property value,No,Yes}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
- Default: `No`

## Generate ILE RPG for iSeries
- Description: Generates ILE RPG artifacts for iSeries
- Type: `enum{Use Environment property value,No,Yes}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
- Default: `No`

## Beep on messages
- Description: Plays sound for runtime messages
- Type: `enum{Use Environment property value,No,Yes}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
- Default: `No`


---

# CLIENT/SERVER SPECIFIC

## Join management
- Description: Join execution strategy for navigations
- Type: `enum{Use Environment property value,Join tables on the server,Join tables on the client}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `Join tables on the server`: Use this value when it matches the target behavior
	* `Join tables on the client`: Use this value when it matches the target behavior
- Default: `Join tables on the server`

## Join type
- Description: Join algorithm preference for query generation
- Type: `enum{Use Environment property value,Use default for server,Natural join,Outer join}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `Use default for server`: Use this value when it matches the target behavior
	* `Natural join`: Use this value when it matches the target behavior
	* `Outer join`: Use this value when it matches the target behavior
- Default: `Use default for server`

## Copy table groups
- Description: Copies grouped table definitions in generation
- Type: `enum{If no unique index,Always,Never,Use Environment property value}`
- Options:
	* `If no unique index`: Use this value when it matches the target behavior
	* `Always`: Use this value when it matches the target behavior
	* `Never`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `If no unique index`

## Generate FOR UPDATE clause
- Description: Adds FOR UPDATE in generated SQL
- Type: `enum{Use Environment property value,Yes,No}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`
