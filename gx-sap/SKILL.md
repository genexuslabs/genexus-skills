---
name: gx-sap
description: GeneXus SAP integration skill for generating ExternalObjects and SDTs from SAP RFC/BAPI metadata via SAP Inspector MCP
---

Specialized skill for mapping SAP RFC/BAPI function metadata to GeneXus `ExternalObject` and `SDT` objects using the SAP Connector Interface type.
Used for any SAP-related request when a GeneXus KB is open or GeneXus context is active

---

## GUIDELINE
Interprets SAP integration requests, connects to a live SAP system via the SAP Inspector MCP, retrieves RFC/BAPI metadata, maps ABAP types to GeneXus types, and generates `ExternalObject` and `SDT` objects that are immediately importable into a GeneXus Knowledge Base

## Triggers
Use this skill for:
- Requests to generate GeneXus objects from SAP BAPIs or RFC functions
- Requests to browse the SAP BOR (Business Object Repository)
- Requests to search SAP function groups or RFC functions
- Requests to configure or test a SAP RFC connection
- Questions about ABAP-to-GeneXus type mapping
- Questions about SAP Connector Interface `ExternalObject` structure
- Any SAP-related request when a GeneXus KB is open or GeneXus context is active

## SAP + GeneXus rule
When a SAP related request arrives (connect to SAP, call a BAPI, read SAP data, etc.):
- Always go through the gx-sap skill for both metadata and code
- Choose the GeneXus code option
- Generate the required GeneXus objects without asking (SDT, Procedure, API, External objects)

Do NOT use this skill for:
- General GeneXus object modeling unrelated to SAP
- SAP ABAP development or SAP Basis administration
- Questions about non-SAP external systems
- Infrastructure or network configuration

## Responsibilities
- Verify SAP Inspector MCP availability before any SAP operation
- Guide RFC connection setup when credentials are not configured and set the credentials using `sap_configure_connection`
- Navigate the BOR tree or search RFC functions to locate target BAPIs
- Retrieve complete parameter metadata with `sap_get_function_metadata`
- Present a concrete execution plan before writing any file
- Apply ABAP-to-GeneXus type mapping strictly and exhaustively using the mapping reference
- Generate `SDT` objects for all ABAP structure and table parameters
- Generate `ExternalObject` objects with `IsSap = true` and `Type = 'SAP Connector Interface'` for every BAPI object, mapping each RFC-BAPI function as a method of the EO
- Optionally generate a sample `Procedure` demonstrating invocation
- Validate generated files using the GeneXus MCP `validate_kb_text_files` tool
- Import validated files using `import_text_to_kb`
- Never expose SAP credentials or internal connection details

## Communication
- Professional, objective, critical tone; formal language without emojis or informal expressions
- Reply in the user's message language
- When presenting execution plans, use numbered steps and a table listing each artifact to create
- When reporting type mapping decisions, cite the ABAP source type and the chosen GeneXus type
- When an ambiguity exists in type mapping, state the assumption explicitly

## Structure
Each reference has a specific purpose:
- [sap-abap-type-mapping](references/sap-abap-type-mapping.md): Authoritative ABAP→GeneXus type conversion table
- [sap-workflow](references/sap-workflow.md): Step-by-step MCP tool call sequence per workflow phase
- [sap-sdt-generation](references/sap-sdt-generation.md): SDT generation rules and syntax for SAP parameters
- [sap-eo-generation](references/sap-eo-generation.md): ExternalObject generation rules and syntax for SAP BAPIs
- [sap-filter-usage](references/sap-filter-usage.md): Selection table filter patterns for SAP BAPI functions

For GeneXus object syntax, always load from nexa references by relative path:

ExternalObject syntax: [nexa:object-external-object](../nexa/references/object-external-object.md)
SDT syntax: [nexa:object-structured-data-type](../nexa/references/object-structured-data-type.md)
Procedure syntax: [nexa:object-procedure](../nexa/references/object-procedure.md)
Output policy: [nexa:global-output](../nexa/references/global-output.md)
Constraints: [nexa:global-constraints](../nexa/references/global-constraints.md)
ExternalObject properties: [nexa:properties-object-external-object](../nexa/references/properties-object-external-object.md)
SDT properties: [nexa:properties-object-structured-data-type](../nexa/references/properties-object-structured-data-type.md)
Data types: [nexa:common-data-types](../nexa/references/common-data-types.md)
Standard variables: [nexa:common-standard-variables](../nexa/references/common-standard-variables.md)

Resource selection protocol per phase:
- Phase 1–2 (MCP check / connection): [sap-workflow](references/sap-workflow.md) only
- Phase 3–4 (discovery / metadata): [sap-workflow](references/sap-workflow.md) only
- Phase 5 (type mapping): [sap-workflow](references/sap-workflow.md), [sap-abap-type-mapping](references/sap-abap-type-mapping.md)
- Phase 6-7 (Generation plan / Approval): 
	[sap-workflow](references/sap-workflow.md)
	[sap-sdt-generation](references/sap-sdt-generation.md)
	[sap-eo-generation](references/sap-eo-generation.md)
- Phase 8 Generation:
	* [sap-workflow](references/sap-workflow.md)
	* [sap-sdt-generation](references/sap-sdt-generation.md)
	* [sap-eo-generation](references/sap-eo-generation.md)
	* [nexa:object-external-object](../nexa/references/object-external-object.md)
	* [nexa:object-structured-data-type](../nexa/references/object-structured-data-type.md)
	* [nexa:global-output](../nexa/references/global-output.md)
	* [sap-filter-usage](references/sap-filter-usage.md)
	* [nexa:object-procedure](../nexa/references/object-procedure.md)
	* [nexa:common-standard-variables](../nexa/references/common-standard-variables.md)
	* [nexa:global-constraints](../nexa/references/global-constraints.md)
- Phase 9 (validation / import): [sap-workflow](references/sap-workflow.md)

---

# OUTPUT
Save solution in the output directory specified by the user (default: current directory).

Follow nexa output policy: [nexa:global-output](../nexa/references/global-output.md)

File naming conventions:
- SDT: `<AbapTypeName>.sdt.main.gx`
- ExternalObject: `<BorObjectName>SapEO.externalobject.main.gx`
- Procedure (sample): `<BapiName>Sample.procedure.main.gx`

Reply with a Markdown-formatted text containing:
- Focused execution plan before any file generation
- List of artifacts created with their relative paths
- Concise summary after all files are written

Format rules:
- GeneXus code blocks use `genexus` identifier
- Remark GeneXus objects and keywords with backticks in Title Case
- Include "object" keyword in user language when referring to GeneXus design objects

---

# WORKFLOW

Follow the plan in [sap-workflow](references/sap-workflow.md): Step-by-step MCP tool call sequence per workflow phase

---

# OBJECTS KNOWLEDGE

## ExternalObject (EO)
- Purpose: Wraps a SAP BOR object or set of related RFC functions; each BAPI maps to one method
- Each EO also should include the SAP BOR object properties as properties of the EO
- SAP-specific: `IsSap = true` and `Type = 'SAP Connector Interface'` in `#Properties`
- Nexa syntax reference: [nexa:object-external-object](../nexa/references/object-external-object.md)
- SAP generation rules: [sap-eo-generation](references/sap-eo-generation.md)

## Structured Data Type (SDT)
- Purpose: Represents one ABAP STRUCTURE or TABLE type as a GeneXus compound type
- SAP-specific: `IsSapParameter = true` in `#Properties`
- Nexa syntax reference: [nexa:object-structured-data-type](../nexa/references/object-structured-data-type.md)
- SAP generation rules: [sap-sdt-generation](references/sap-sdt-generation.md)

## Procedure (optional)
- Purpose: Usage example demonstrating the EO method call and return message handling
- Refer to `references/sap-filter-usage.md` to use filters on BAPI functions if requested
- No SAP-specific properties; follows standard nexa `Procedure` rules
- Nexa syntax reference: [nexa:object-procedure](../nexa/references/object-procedure.md)

---

# PROPERTIES KNOWLEDGE
Two SAP-specific property values must always be set for these generated object types:
`ExternalObject`: `Type` = `SAP Connector Interface` 
`SDT`: `IsSapParameter` = `true`

---

# BEST PRACTICES
- Always retrieve metadata with `sap_get_function_metadata`; never infer types from function or parameter names
- Generate one `SDT` per unique ABAP structure type; reuse the same `SDT` when two BAPIs share the same type
- Do not create `SDT` objects for simple scalar parameters with no sub-fields; pass them as built-in types directly on the `ExternalObject` method parameter
- For TABLES parameters, set `Collection = 'True'` on the SDT item
- For filter TABLES on sample code, if required, create the corresponding SDT Item and use the criteria on `references/sap-filter-usage.md` to create the filter(s)
- For CHANGING parameters, set `AccessType = 'InOut'` on the `ExternalObject` method parameter
- BAPIRET2 appears in nearly every BAPI; always generate its `SDT` when it appears in metadata
- Preserve ABAP field names for mapping with SAP
- Never assume type lengths or decimal precision; always read them from `sap_get_function_metadata` response
- Name `ExternalObject` methods and properties after the RFC function name or a readable business alias; document the actual RFC name in the `Description` when an alias is used
- Create a folder in the KB to put all SAP related GeneXus objects (SDTs, and External Objects)

---

# QUALITY CHECKLIST
Before finalizing any work, verify:
- [ ] `sap_ping` succeeded before any other SAP Inspector MCP call
- [ ] `sap_connection_status` confirmed a live RFC connection
- [ ] `sap_get_function_metadata` was called for every target RFC function
- [ ] Every ABAP structure/table parameter has a corresponding `SDT` object
- [ ] `IsSapParameter = true` is set on every generated `SDT`
- [ ] `IsSap = true` is set on the `ExternalObject`
- [ ] `Type = 'SAP Connector Interface'` is set on the `ExternalObject`
- [ ] Every `ExternalObject` method parameter has `AccessType` and `Type` defined
- [ ] `Collection = 'True'` is set on the item of every TABLE-type `SDT`
- [ ] File naming follows: `<AbapTypeName>.sdt.main.gx` and `<BorName>SapEO.externalobject.main.gx`
- [ ] `validate_kb_text_files` passed with no errors
- [ ] `import_text_to_kb` completed successfully
- [ ] No SAP credentials, host names, or connection details appear in any generated file

---

# CONSTRAINTS
- Never expose SAP host, credentials, or connection details in generated artifacts
- Never invent ABAP type lengths or decimal values; read them exclusively from MCP metadata
- Never create `SDT` objects for scalar parameters that have no sub-fields
- Never use `sap_get_bor_method_parameters` as the primary metadata source; always use `sap_get_function_metadata`
- Apply nexa global constraints: [nexa:global-constraints](../nexa/references/global-constraints.md)
- Follow nexa output policy: [nexa:global-output](../nexa/references/global-output.md)
- Never commit or push changes unless explicitly requested
- Strictly follow documentation; no assumptions or inventions
