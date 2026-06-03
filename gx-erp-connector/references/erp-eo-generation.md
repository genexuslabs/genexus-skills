---
name: erp-eo-generation
description: Rules for generating GeneXus ExternalObject objects that map SAP® Business Object Repository (BOR) objects and BAPI® functions, including their ABAP® parameter types
---

Apply these rules in conjunction with the nexa ExternalObject syntax reference:
[nexa:object-external-object](../../nexa/references/object-external-object.md)

And the nexa output policy:
[nexa:global-output](../../nexa/references/global-output.md)

---

# WHEN TO CREATE AN EXTERNALOBJECT
Create one `ExternalObject` for:
- A SAP BOR object type (e.g., `BUS2032` Sales Order) — one `ExternalObject` per BOR object, with each relevant BAPI as one method
- A group of related RFC functions that form a logical interface — one `ExternalObject` per group
- A standalone BAPI with no BOR parent — one `ExternalObject` per BAPI containing a single method

---

# NAMING CONVENTION
`ExternalObject` name:
- BOR-based: derive a readable English name from the BOR object description + `ErpEO` suffix
  * Example: BOR object `BUS2032` (Sales Order) → `SalesOrderErpEO`
- Standalone BAPI: derive from function group or BAPI business purpose + `ErpEO` suffix
  * Example: `BAPI_CUSTOMER_GETDETAIL2` → `CustomerErpEO`

File name: `<Name>.gx`

---

# EXTERNALOBJECT STRUCTURE TEMPLATE
```genexus
ExternalObject <Name>
{
	#GenericTypes
	#End

	#ExternalProperties
	#End

	#ExternalMethods
	
	<MethodName>
	[
		Description = '<BAPI description; include actual RFC function name>'
		IsStatic = '<True|False>'
	]
	{
		Parameters
		{
			<Param1>
			[
				AccessType = '<In|Out|InOut>',
				Description = '<parameter description>',
				Type = '<GxType>'
			]
			<Param2>
			[
				AccessType = '<In|Out|InOut>',
				Description = '<parameter description>',
				Type = '<SdtName>'
			]
		}
	}
	#End

	#ExternalEvents
	#End

	#Properties
		IsSap = true
		Type = 'SAP Connector Interface'
		NetFrameworkExternalName = '<BAPI_GROUP>'
		NetPackageId = 'GeneXus.EnterpriseLib.SAP'
		JavaExternalName = '<BAPI_GROUP>'
		ExternalPackageName = 'com.genexus.sap'
	#End
}
```

All five sections (`#GenericTypes`, `#ExternalProperties`, `#ExternalMethods`, `#ExternalEvents`, `#Properties`) must be present even when empty
Replace `<BAPI_GROUP>` with the RFC function group name (e.g., `BAPI_SALESORDER` for sales order BAPIs)

---

# METHOD NAMING
- Prefer the RFC function name exactly when it is readable (e.g., `GetDetail`, `CreateFromData`)
- Use a PascalCase business alias when the RFC name is too technical or long
- When using an alias, always include the actual RFC function name in the method `Description`
- Set the RFC function name as the value of the method's `NetFrameworkExternalName` and `JavaExternalName` properties

Examples:
- `BAPI_CUSTOMER_GETDETAIL2` → method `GetDetail`, Description = `'Get customer detail (BAPI_CUSTOMER_GETDETAIL2)'`, `NetFrameworkExternalName` = `'BAPI_CUSTOMER_GETDETAIL2'`, `JavaExternalName` = `'BAPI_CUSTOMER_GETDETAIL2'`
- `BAPI_SALESORDER_CREATEFROMDAT2` → method `CreateFromData`, Description = `'Create sales order (BAPI_SALESORDER_CREATEFROMDAT2)'`, `NetFrameworkExternalName` = `'BAPI_SALESORDER_CREATEFROMDAT2'`, `JavaExternalName` = `'BAPI_SALESORDER_CREATEFROMDAT2'`

---

# PARAMETER ACCESS TYPE MAPPING
 <ABAP Direction> -> <ExternalObject `AccessType`>

`IMPORTING` → `In`
`EXPORTING` → `Out`
`CHANGING` → `InOut`
`TABLES` → `InOut`

> **Exception — BAPIRET2:** When a TABLES parameter of type `BAPIRET2` is used exclusively as a return collection (carries no input data), map it with `AccessType = 'Out'`. See the RETURN PARAMETER section below

---

# PARAMETER TYPE MAPPING
ABAP Parameter Kind → GeneXus `Type` Assignment

Scalar (no sub-fields, maps to built-in) → Built-in GeneXus type from [erp-abap-type-mapping](erp-abap-type-mapping.md)
ABAP structure type → `SDT` name generated in the SDT phase
ABAP table type → `SDT` name generated in the SDT phase (the `SDT` itself carries `Collection = 'True'`)

---

# PARAMETER COMPLETENESS
Every parameter returned by the SAP metadata (via `sap_get_function_metadata` or equivalent) **must** be included in the method — no parameter may be omitted, even if it appears optional, redundant, or unused by the immediate use case

Steps to verify completeness before writing the `ExternalObject`:
1. Enumerate all parameters from the metadata response (Import, Export, Changing, Tables directions)
2. Map each one to a GeneXus parameter using the rules in this document
3. Confirm the parameter count in the generated method matches the metadata exactly

If a parameter's type cannot be resolved (e.g., an unknown structure), generate the SDT for it as part of the same task rather than skipping the parameter

---

# RETURN PARAMETER (BAPIRET2)
Most BAPIs expose a RETURN parameter of type BAPIRET2 in the TABLES direction
Always map it with:
- `AccessType = 'Out'` — this is an explicit override of the TABLES → `InOut` rule; BAPIRET2 carries no input data and must be `Out`
- `Type = 'BAPIRET2'` (referencing the `BAPIRET2` SDT generated in the SDT phase)

---

# PROPERTIES SECTION
The `#Properties` section must always contain all of the following:

```
IsSap = true
Type = 'SAP Connector Interface'
NetFrameworkExternalName = '<BAPI_GROUP>'
NetPackageId = 'GeneXus.EnterpriseLib.SAP'
JavaExternalName = '<BAPI_GROUP>'
ExternalPackageName = 'com.genexus.sap'
```

Replace `<BAPI_GROUP>` with the RFC function group name (e.g., `BAPI_SALESORDER`)

The properties `NetFrameworkExternalName`, `NetPackageId`, `JavaExternalName`, and `ExternalPackageName` are required for runtime dispatch by the SAP Connector, they are not optional

---

# EXAMPLE — Customer Detail BAPI
```genexus
ExternalObject CustomerErpEO
{
	
	#GenericTypes
	#End

	#ExternalProperties
	#End

	#ExternalMethods
		GetDetail
		[
			Description = 'Get detailed customer data (BAPI_CUSTOMER_GETDETAIL2)'
			IsStatic = 'False'
		]
		{
			Parameters
			{
				Customerno
				[
					AccessType = 'In',
					Description = 'Customer number',
					Type = 'Character(10)'
				]
				CompanyCode
				[
					AccessType = 'In',
					Description = 'Company code',
					Type = 'Character(10)'
				]

				CustomerAddress
				[
					AccessType = 'Out',
					Description = 'Customer address',
					Type = 'BAPICUSTOMER_04'
				]

				CustomerDetail
				[
					AccessType = 'Out',
					Description = 'Customer general data',
					Type = 'BAPICUSTOMER_KNA1'
				]
				CustomerCompanyDetail
				[
					AccessType = 'Out',
					Description = 'Company code-specific data',
					Type = 'BAPICUSTOMER_05'
				]
				CustomerBankDetail
				[
					AccessType = 'Out',
					Description = 'Customer bank data',
					Type = 'BAPICUSTOMER_02'
				]

				Return
				[
					AccessType = 'Out',
					Description = 'Return code',
					Type = 'BAPIRET2'
				]
			}
		}
	#End

	#ExternalEvents
	#End

	#Properties
		IsSap = true
		Type = 'SAP Connector Interface'
		NetFrameworkExternalName = 'BAPI_CUSTOMER'
		NetPackageId = 'GeneXus.EnterpriseLib.SAP'
		JavaExternalName = 'BAPI_CUSTOMER'
		ExternalPackageName = 'com.genexus.sap'
	#End
}
```

---

# CONSTRAINTS
- `IsSap = true` and `Type = 'SAP Connector Interface'` must always be set in `#Properties`
- Every method parameter must have `AccessType` and `Type`
- All five `#` sections must be present even if empty
- Every method of the EO must have the value IsStatic set to 'True' or 'False'
- **Every parameter from the SAP metadata must be included — no omissions allowed regardless of perceived relevance**
- Never add `NetFrameworkAssemblyName`, `NetFrameworkConstructorParameters`, `NetAssemblyName`, or `JavaConstructorParameters` to SAP `ExternalObject` objects — those are reserved for `GXEnterpriseSessionManager`; the required external name and package ID properties are listed in the PROPERTIES SECTION above
- Apply nexa global constraints: [nexa:global-constraints](../../nexa/references/global-constraints.md)
- Apply nexa output policy: [nexa:global-output](../../nexa/references/global-output.md)
- Default output mode is `single-file`: one file per `ExternalObject` — named `<Name>.gx`
- Property bracket values `[…]` must use `'single-quoted'` strings; `!"…"` is forbidden in bracket annotations — it is valid only in executable source regions
