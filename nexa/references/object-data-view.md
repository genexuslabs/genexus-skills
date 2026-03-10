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
	#Composition
		<internal-attribute-1> [ ExternalName = '<external-field-1>' ]
		…
	#End

	#Indexes
		<index-name-1> [ ExternalName = '<external-index-1>' ]
		…
	#End

	#Platforms
		<platform-name-1> { Name = '<external-table-name-1>' }
		…
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
- `<internal-attribute-i>`: Attribute name used in the Knowledge Base
- `<external-field-i>`: Physical field name in the external source
- `<index-name-j>`: Internal index name
- `<external-index-j>`: Physical index name in the external source
- `<platform-name-i>`: Target platform entry (for example `SQLServer`, `MySQL`, `PostgreSQL`)
- `<external-table-name-i>`: Physical external table name for selected platform
- `<properties>`: Optional object properties in TOML syntax
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `dataview`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Apply [object-transaction](./object-transaction.md) as `Associated table` concept
- Apply [object-index](./object-index.md) for index definition rules under `Indexes`
- Define one `Data View` per external table
- Keep one `Data View` per `Associated table` when required
- Keep `Composition` aligned with `Associated table` attributes when defined
- Keep external names in metadata and internal names in source

---

# EXAMPLES

## Example 1
Data View definition for external customer table
~~~
DataView CustomerExternal
{
	#Composition
		CustomerId [ ExternalName = 'id' ]
		CustomerName [ ExternalName = 'name' ]
		CustomerStatus [ ExternalName = 'status' ]
	#End

	#Indexes
		ICustomerExternal [ ExternalName = 'PK_CUSTOMER' ]
	#End

	#Platforms
		PostgreSQL { Name = 'public.customer' }
	#End

	#Properties
		"Data Store" = "DataStore1"
		"Associated table" = "CustomerExternalTrn"
	#End
}
~~~

Associated transaction
~~~
Transaction CustomerExternalTrn
{
	CustomerId* [ DataType = 'Numeric(10.0)' ]
	CustomerName! [ DataType = 'VarChar(80)' ]
	CustomerStatus [ DataType = 'Char(1)' ]
}
~~~

Navigation over associated table
~~~
For Each CustomerExternalTrn
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
