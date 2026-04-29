---
name: object-data-view
description: External source mapping definition for access through GeneXus internal model
---

Defines external source mapping for GeneXus navigation with internal Knowledge Base names

---

# DEFINITION
A `Data View` object maps an external table to internal attributes for GeneXus navigation

Source model:
- Physical source is an external table
- Internal association uses `Associated table` property pointing to a transaction-backed internal table

---

# SYNTAX
~~~
DataView <name>
{
	<attributes>

	#Platforms
		<platforms>
	#End

	#Indexes
		<indexes>
	#End

	#Properties
		<properties>
	#End

	#Documentation
		<documentation>
	#End
}
~~~

Where:
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<attributes>`: Internal attribute mapping list; see [ATTRIBUTES](#attributes) section
- `<platforms>`: Platform-specific external table mapping list; see [PLATFORM](#platform) section
- `<indexes>`: External index mapping list; see [INDEX](#index) section
- `<properties>`: Optional object properties in TOML syntax
- `<documentation>`: Optional object documentation; check [common-markdown](./common-markdown.md)

---

# ATTRIBUTES
Defines the external structure exposed with internal Knowledge Base attribute names

Syntax:
~~~
<name> [ ExternalName = '<external-field>' ]
~~~

Where:
- `<name>`: Attribute name used in the Knowledge Base
- `<external-field>`: Physical field name in the external source; omit when it matches `<name>`

Notes:
- Composition may be empty when `AssociatedTable` is defined
- Empty composition implies dynamic association with the associated table structure and indexes

---

# PLATFORM
Defines one target platform entry for the external table

Syntax:
~~~
<name> [ Name = '<table>' , <properties> ]
~~~

Where:
- `<name>`: Target platform entry; e.g. `SQLServer`, `MySQL`, `PostgreSQL`
- `<table>`: Physical external table name for selected platform
- `<properties>`: Additional platform properties

---

# INDEX
Maps one internal index to one external index plus platform-specific metadata

Syntax:
~~~
<name>
[
	Type = '<type>',
	ExternalName = '<index>',
	<properties>
]
{
	Composition
	{
		<attributes>
	}
	
	Platforms
	{
		<definition>
	}
}
~~~

Where:
- `<name>`: Internal index name
- `<type>`: Index uniqueness type; values:
	* `Duplicate` (default): Can have duplicated values
	* `NoDuplicate`: No PK but unique
	* `Unique`: Cannot have duplicated values
- `<index>`: Physical index name in the external source
- `<properties>`: Optional index properties in TOML syntax
- `<attributes>`: Ordered index attribute composition; write one attribute per line
- `<definition>`: Platform-specific index definition list; see [INDEX PLATFORM](#index-platform) section

Rules:
- Only create user indexes (`U` prefixed) if justified
- Never create or update automatic indexes (`I` prefixed)
- Never duplicate attributes in the same index
- Use only attributes from owner data view structure

Notes:
- Attributes order in composition defines key precedence
- Attributes defined as `Unique` represent CK constraints
- Attributes in `( )` indicate descending order; e.g. `(CustomerName)`

---

# INDEX PLATFORM
Defines one target platform entry for an index

Syntax:
~~~
<name> [ <properties> ]
~~~

Where:
- `<name>`: Target platform entry for index; listed in `<platforms>`
- `<properties>`: Target platform index properties

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `dataview`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Apply [object-table](./object-table.md) as `Associated table` concept
- Define one `Data View` per external table
- Keep one `Data View` per `Associated table` when required
- Keep `Composition` aligned with `Associated table` attributes when defined
- Only use attributes already defined in the `Data View` composition when defining index composition
- Keep external names in metadata and internal names in source

---

# EXAMPLES

## Example 1
Data View definition for external customer table
~~~
DataView CustomerExternal
{
	CustomerId [ ExternalName = 'id' ]
	CustomerName [ ExternalName = 'name' ]
	CustomerStatus [ ExternalName = 'status' ]

	#Indexes
		ICustomerExternal [ ExternalName = 'PK_CUSTOMER' ]
		{
			Composition
			{
				CustomerId
			}

			Platforms
			{
				SQLServer [ SchemaName = 'dbo' ]
			}
		}
	#End

	#Platforms
		SQLServer [ Name = 'Customer', SchemaName = 'dbo' ]
	#End

	#Properties
		DataStore = "DataStore1"
		AssociatedTable = "CustomerExternal"
	#End
}
~~~

Associated table
~~~
Table CustomerExternal // base table of CustomerExternal transaction
{
	CustomerId*
	CustomerName
	CustomerStatus

	#Indexes
		ICustomerExternal
		[
			Type = "NoDuplicate",
			Source = "Automatic"
		]
		{
			CustomerId
		}
	#End
}
~~~

Navigation over associated table
~~~
For Each CustomerExternal
	Where CustomerStatus = !'A'
	Order CustomerName
	&Name = CustomerName
EndFor
~~~

Navigation without associated table
~~~
XFor Each CustomerExternal Index ICustomerExternal
	Where CustomerStatus = !'A'
	&Name = CustomerName
XEndFor
~~~

Single-record navigation without associated table
~~~
XFor First CustomerExternal Index ICustomerExternal
	Where CustomerId = &CustomerId
	&Name = CustomerName
When none
	&Name = Format(!"Undefined CustomerId=%1", &CustomerId)
XEndFor
~~~
