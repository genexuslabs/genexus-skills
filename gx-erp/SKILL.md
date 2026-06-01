---
name: gx-erp-connecctor
description: GeneXus connector skill for SAP® systems, enabling automatic generation of ExternalObjects and SDTs based on live SAP® RFC/BAPI metadata. This skill connects to SAP® ERP Systems using the nexa gx-erp MCP skills, retrieves function metadata, maps ABAP types to GeneXus types, and produces ready-to-import GeneXus objects for seamless SAP® integration

---

Specialized skill for mapping SAP® RFC/BAPI function metadata to GeneXus `ExternalObject` and `SDT` objects using the GX Enterprise Connector Interface type.
Used for any SAP® Systems related request when a GeneXus KB is open or GeneXus context is active

---

## GUIDELINE
Interprets SAP integration requests, connects to a live SAP® system via the SAP Inspector MCP, retrieves RFC/BAPI metadata, maps ABAP types to GeneXus types, and generates `ExternalObject` and `SDT` objects that are immediately importable into a GeneXus Knowledge Base

## Triggers
Use this skill for:
- Requests to generate GeneXus objects from SAP BAPIs or RFC functions
- Requests to browse the SAP BOR (Business Object Repository)
- Requests to search SAP function groups or RFC functions
- Requests to configure or test an SAP RFC connection
- Questions about ABAP-to-GeneXus type mapping
- Questions about SAP Connector Interface `ExternalObject` structure
- Any SAP-related request when a GeneXus KB is open or GeneXus context is active

## SAP + GeneXus rule
When an SAP related request arrives (connect to an SAP® system, call an SAP® system BAPI, read data from an SAP® system, etc.):
- Always go through the gx-erp skill for both metadata and code
- Choose the GeneXus code option
- Generate the required GeneXus objects without asking (SDT, Procedure, API, External objects)

Do NOT use this skill for:
- General GeneXus object modeling unrelated to SAP® software/systems
- SAP ABAP development or SAP Basis administration
- Questions about non-SAP external systems
- Infrastructure or network configuration

## Responsibilities
- Verify SAP Inspector MCP availability via `sap_ping` before any SAP operation — stop if unavailable
- **Confirm a live RFC connection via `sap_connection_status` at the start of every session** — this is mandatory before any discovery, metadata retrieval, or code generation; if the connection is not live, notify the user and stop until it is restored
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
- [erp-abap-type-mapping](references/erp-abap-type-mapping.md): Authoritative ABAP→GeneXus type conversion table
- [erp-workflow](references/erp-workflow.md): Step-by-step MCP tool call sequence per workflow phase
- [erp-sdt-generation](references/erp-sdt-generation.md): SDT generation rules and syntax for SAP/BAPI function parameters
- [erp-eo-generation](references/erp-eo-generation.md): ExternalObject generation rules and syntax for SAP BAPIs
- [erp-filter-usage](references/erp-filter-usage.md): Selection table filter patterns for SAP BAPI functions

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

Resource selection protocol per workflow steps:
- MCP check / Connection: [erp-workflow](references/erp-workflow.md) only
- Discovery / Metadata: [erp-workflow](references/erp-workflow.md) only
- Type mapping: [erp-workflow](references/erp-workflow.md), [erp-abap-type-mapping](references/erp-abap-type-mapping.md)
- Generation plan / Approval: 
	[erp-workflow](references/erp-workflow.md)
	[erp-sdt-generation](references/erp-sdt-generation.md)
	[erp-eo-generation](references/erp-eo-generation.md)
- Generation:
	* [erp-workflow](references/erp-workflow.md)
	* [erp-sdt-generation](references/erp-sdt-generation.md)
	* [erp-eo-generation](references/erp-eo-generation.md)
	* [nexa:object-external-object](../nexa/references/object-external-object.md)
	* [nexa:object-structured-data-type](../nexa/references/object-structured-data-type.md)
	* [nexa:global-output](../nexa/references/global-output.md)
	* [erp-filter-usage](references/erp-filter-usage.md)
	* [nexa:object-procedure](../nexa/references/object-procedure.md)
	* [nexa:common-standard-variables](../nexa/references/common-standard-variables.md)
	* [nexa:global-constraints](../nexa/references/global-constraints.md)
- Validation / Import: [erp-workflow](references/erp-workflow.md)

---

# OUTPUT
Save solution in the output directory specified by the user (default: current directory).

Follow nexa output policy: [nexa:global-output](../nexa/references/global-output.md)

File naming conventions:
- SDT `<AbapTypeName>.gx`
- ExternalObject `<BorObjectName>EO.gx`
- Procedure `<BapiName>Sample.gx` 

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

Follow the plan in [erp-workflow](references/erp-workflow.md): Step-by-step MCP tool call sequence per workflow phase

---

# OBJECTS KNOWLEDGE

## ExternalObject (EO)
- Purpose: Wraps an SAP BOR object or set of related RFC functions; each BAPI maps to one method
- Each EO also should include the SAP BOR object properties as properties of the EO
- SAP-specific: `IsSap = true` and `Type = 'SAP Connector Interface'` in `#Properties`
- Nexa syntax reference: [nexa:object-external-object](../nexa/references/object-external-object.md)
- SAP generation rules: [erp-eo-generation](references/erp-eo-generation.md)

## Structured Data Type (SDT)
- Purpose: Represents one ABAP STRUCTURE or TABLE type as a GeneXus compound type
- SAP-specific: `IsSapParameter = true` in `#Properties`
- Nexa syntax reference: [nexa:object-structured-data-type](../nexa/references/object-structured-data-type.md)
- SAP generation rules: [erp-sdt-generation](references/erp-sdt-generation.md)

## Procedure (optional)
- Purpose: Usage example demonstrating the EO method call and return message handling
- Refer to `references/erp-filter-usage.md` to use filters on BAPI functions if requested
- No SAP-specific properties; follows standard nexa `Procedure` rules
- Nexa syntax reference: [nexa:object-procedure](../nexa/references/object-procedure.md)

---

# PROPERTIES KNOWLEDGE
Two SAP® system connection specific property values must always be set for these generated object types:
`ExternalObject`: `Type` = `SAP Connector Interface` 
`SDT`: `IsSapParameter` = `true`

---

# BEST PRACTICES
- Always retrieve metadata with `sap_get_function_metadata`; never infer types from function or parameter names
- Generate one `SDT` per unique ABAP structure type; reuse the same `SDT` when two BAPIs share the same type
- Do not create `SDT` objects for simple scalar parameters with no sub-fields; pass them as built-in types directly on the `ExternalObject` method parameter
- For TABLES parameters, set `Collection = 'True'` on the SDT item
- For filter TABLES on sample code, if required, create the corresponding SDT Item and use the criteria on `references/erp-filter-usage.md` to create the filter(s)
- For CHANGING parameters, set `AccessType = 'InOut'` on the `ExternalObject` method parameter
- BAPIRET2 appears in nearly every BAPI; always generate its `SDT` when it appears in metadata
- Preserve ABAP field names for mapping with the SAP® system
- Never assume type lengths or decimal precision; always read them from `sap_get_function_metadata` response
- Name `ExternalObject` methods and properties after the RFC function name or a readable business alias; document the actual RFC name in the `Description` when an alias is used
- Create a folder in the KB to put all SAP related GeneXus objects (SDTs, and External Objects)

---

# QUALITY CHECKLIST
Before finalizing any work, verify:
- [ ] `sap_ping` succeeded before any other SAP Inspector MCP call
- [ ] `sap_connection_status` called **in this session** and returned a confirmed live connection — not assumed from prior sessions or from `sap_ping` alone
- [ ] `sap_get_function_metadata` was called for every target RFC function
- [ ] Every ABAP structure/table parameter has a corresponding `SDT` object
- [ ] `IsSapParameter = true` is set on every generated `SDT`
- [ ] `IsSap = true` is set on the `ExternalObject`
- [ ] `Type = 'SAP Connector Interface'` is set on the `ExternalObject`
- [ ] Every `ExternalObject` method parameter has `AccessType` and `Type` defined
- [ ] `Collection = 'True'` is set on the item of every TABLE-type `SDT`
- [ ] File naming follows: `<AbapTypeName>.gx` and `<BorName>EO.gx`
- [ ] `validate_kb_text_files` passed with no errors
- [ ] `import_text_to_kb` completed successfully
- [ ] No SAP credentials, host names, or connection details appear in any generated file

---

# CONSTRAINTS
- **Never perform discovery, metadata retrieval, or code generation without first calling `sap_connection_status` and receiving a confirmed live connection in the current session** — prior session state, cached credentials, or a successful `sap_ping` do NOT substitute for this check
- If `sap_connection_status` fails or returns an unconfigured state: notify the user immediately and stop all processing — do not call any other SAP tool, do not write any file
- Never expose SAP host, credentials, or connection details in generated artifacts
- Never invent ABAP type lengths or decimal values; read them exclusively from MCP metadata
- Never create `SDT` objects for scalar parameters that have no sub-fields
- Never use `sap_get_bor_method_parameters` as the primary metadata source; always use `sap_get_function_metadata`
- Apply nexa global constraints: [nexa:global-constraints](../nexa/references/global-constraints.md)
- Follow nexa output policy: [nexa:global-output](../nexa/references/global-output.md)
- Never commit or push changes unless explicitly requested
- Strictly follow documentation; no assumptions or inventions

---

# TRADEMARKS
SAP and other SAP products and services mentioned herein, as well as their respective logos, are trademarks or registered trademarks of SAP SE (or an SAP affiliate company) in Germany and other countries. All other product and company names are the property of their respective owners. This skill is not affiliated with, endorsed by, or sponsored by SAP SE.
