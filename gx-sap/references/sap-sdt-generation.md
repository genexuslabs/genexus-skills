---
name: sap-sdt-generation
description: Rules for generating GeneXus SDT objects from SAP ABAP structure and table parameters
---

Apply these rules in conjunction with the nexa SDT syntax reference:
`../nexa/references/object-structured-data-type.md`

And the ABAP type mapping reference:
`references/sap-abap-type-mapping.md`

And the nexa output policy:
`../nexa/references/global-output.md`
---

# WHEN TO CREATE AN SDT
Create one `SDT` for each of the following:
- An ABAP `STRUCTURE` type used as a parameter in any direction (IMPORTING, EXPORTING, CHANGING)
- An ABAP `TABLE` type used as a TABLES parameter (the `SDT` represents the row type)
- A named DDIC structure type referenced as a sub-field of another structure

Do NOT create `SDT` objects for:
- Top-level scalar parameters with no sub-fields (e.g., a single CHAR field as IMPORTING param)
- Parameters whose ABAP type maps directly to a single GeneXus built-in type
Reuse rule: if two BAPIs reference the same ABAP type name, generate the `SDT` once and reference it from both `ExternalObject` methods.
---

# NAMING CONVENTION
SDT name = ABAP structure/type name, preserved as-is (original SAP casing)
Conversion rules:
- Remove leading `Z_`, `Y_`, `/`, namespace prefixes
- Do NOT convert to PascalCase — keep the original uppercase name with underscores
Examples:
- `BAPIRET2` → `BAPIRET2`
- `BAPI_MATERIAL_RET2001` → `BAPI_MATERIAL_RET2001`
- `BAPIMATRAS` → `BAPIMATRAS`
- `ZSALESORDER_HEADER` → `SALESORDER_HEADER`

File name: `<SdtName>.sdt.main.gx`
---

# SDT STRUCTURE TEMPLATE
## For STRUCTURE parameters (single record)

```genexus
SDT <SdtName>
{
	<SdtName>
	{
		<Field1> [ Description = '<field description>', DataType = '<gx-type>', JsonName = '<JsonName>'  ]
		<Field2> [ Description = '<field description>', DataType = '<gx-type>', JsonName = '<JsonName>'  ]
		…
	}
	#Properties
		IsSapParameter = true
	#End
}
```
## For TABLE parameters (collection of records)
Set `Collection = 'True'` on the root item so callers use it directly as a collection variable:

```genexus
SDT <SdtName>
{
	<SdtName>
	[
		Collection = 'True'
	]
	{
		<Field1> [ Description = '<field description>', DataType = '<gx-type>', JsonName = '<JsonName>' ]
		<Field2> [ Description = '<field description>', DataType = '<gx-type>', JsonName = '<JsonName>' ]
		…
	}
	#Properties
		IsSapParameter = true
	#End
}
```

## For nested structure fields
When an ABAP structure field is itself a named structure type, create a separate `SDT` for that nested type and reference it by name in the parent `SDT`:

```genexus
<FieldName> [ Description = '<field description>', DataType = '<NestedSdtName>', JsonName = '<JsonName>' ]
```
---
# FIELD MAPPING STEPS
For each field returned by `sap_get_function_metadata` (or `sap_get_object_metadata`):

1. Read: field name, ABAP type, length, decimals, description
2. Keep field name as-is (original SAP name — uppercase with underscores, e.g. DESCR_LOW, SIGN)
3. Look up the GeneXus type using `references/sap-abap-type-mapping.md`
4. Set the property JsonName with the original SAP name, the same as the field name
5. Write one member line per field in the format:
	```
	<Name> [ Description = '<description>', DataType = '<gx-type>', JsonName = '<Name>']
	```
6. For nested structure type fields: create the nested `SDT` first, then reference it
---

# CANONICAL STANDARD SDTs
Use these ready-made definitions when the corresponding ABAP type appears in metadata. Do not call `sap_get_function_metadata` again for these — use the definitions directly.

## BAPIRET2
```genexus
SDT BAPIRET2
{
	BAPIRET2
	[
		Collection = 'True'
	]
	{
		TYPE	[ Description = 'Message type: S Success, I Info, W Warning, E Error, A Abort', DataType = 'Character(1)', JsonName = 'TYPE'  ]
		ID	[ Description = 'Message class', DataType = 'Character(20)', JsonName = 'ID'  ]
		NUMBER	[ Description = 'Message number', DataType = 'Character(3)', JsonName = 'NUMBER'  ]
		MESSAGE	[ Description = 'Message text', DataType = 'VarChar(220)', JsonName = 'MESSAGE'  ]
		LOG_NO	[ Description = 'Application log document number', DataType = 'Character(20)', JsonName = 'LOG_NO' ]
		LOG_MSG_NO	[ Description = 'Application log message serial number', DataType = 'Character(6)', JsonName = 'LOG_MSG_NO' ]
		MESSAGE_V1	[ Description = 'Message variable 1', DataType = 'Character(50)', JsonName = 'MESSAGE_V1' ]
		MESSAGE_V2	[ Description = 'Message variable 2', DataType = 'Character(50)', JsonName = 'MESSAGE_V2' ]
		MESSAGE_V3	[ Description = 'Message variable 3', DataType = 'Character(50)', JsonName = 'MESSAGE_V3' ]
		MESSAGE_V4	[ Description = 'Message variable 4', DataType = 'Character(50)', JsonName = 'MESSAGE_V4' ]
		PARAMETER	[ Description = 'Parameter name', DataType = 'Character(32)', JsonName = 'PARAMETER' ]
		ROW	[ Description = 'Row in parameter', DataType = 'Numeric(5.0)', JsonName = 'ROW' ]
		FIELD	[ Description = 'Field in parameter', DataType = 'Character(35)', JsonName = 'FIELD'  ]
		SYSTEM	[ Description = 'Logical system from which message originates', DataType = 'Character(10)', JsonName = 'SYSTEM'  ]
  	}
	#Properties
		IsSapParameter = true
	#End
}
```
## BAPIMONEY

```genexus
SDT BAPIMONEY
{
	BAPIMONEY
	{
		CURRENCY    [ Description = 'Currency key', DataType = 'Character(5)', JsonName = 'CURRENCY' ]
		AMT         [ Description = 'Amount', DataType = 'Numeric(23.4)', JsonName = 'AMT' ]
	}
	#Properties
		IsSapParameter = true
	#End
}
```
---
# CONSTRAINTS
- `IsSapParameter = true` must be set in `#Properties` on every generated `SDT`
- Member names must preserve the original SAP field name verbatim (uppercase with underscores)
- Every member must have `DataType` defined, and `JsonName` set with the original field name
- `Description` is recommended for every member; populate from ABAP field description when available
- `Collection = 'True'` is set on the root item only for TABLE-type `SDT` objects
- Apply nexa global constraints: `../nexa/references/global-constraints.md`
- Apply nexa output policy: `../nexa/references/global-output.md`
- Default output mode is `single-file`: one `<SdtName>.sdt.main.gx` per `SDT`
