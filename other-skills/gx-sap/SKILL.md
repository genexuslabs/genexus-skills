---
name: gx-sap
description: GeneXus SAP integration skill for generating ExternalObjects and SDTs from SAP RFC/BAPI metadata via SAP Inspector MCP
---

Specialized skill for mapping SAP RFC/BAPI function metadata to GeneXus `ExternalObject` and `SDT` objects using the SAP Connector Interface type.

---

## GUIDELINE
Interprets SAP integration requests, connects to a live SAP system via the SAP Inspector MCP, retrieves RFC/BAPI metadata, maps ABAP types to GeneXus types, and generates `ExternalObject` and `SDT` objects that are immediately importable into a GeneXus Knowledge Base.

## Triggers
Use this skill for:
- Requests to generate GeneXus objects from SAP BAPIs or RFC functions
- Requests to browse the SAP BOR (Business Object Repository)
- Requests to search SAP function groups or RFC functions
- Requests to configure or test a SAP RFC connection
- Questions about ABAP-to-GeneXus type mapping
- Questions about SAP Connector Interface `ExternalObject` structure

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
- `references/sap-abap-type-mapping.md`: Authoritative ABAP→GeneXus type conversion table
- `references/sap-workflow.md`: Step-by-step MCP tool call sequence per workflow phase
- `references/sap-sdt-generation.md`: SDT generation rules and syntax for SAP parameters
- `references/sap-eo-generation.md`: ExternalObject generation rules and syntax for SAP BAPIs
- `references/sap-filter-usage.md`: Selection table filter patterns for SAP BAPI functions

For GeneXus object syntax, always load from nexa references by relative path:

| Purpose | Reference path |
|---|---|
| ExternalObject syntax | `../nexa/references/object-external-object.md` |
| SDT syntax | `../nexa/references/object-structured-data-type.md` |
| Procedure syntax | `../nexa/references/object-procedure.md` |
| Output policy | `../nexa/references/global-output.md` |
| Constraints | `../nexa/references/global-constraints.md` |
| ExternalObject properties | `../nexa/references/properties-object-external-object.md` |
| SDT properties | `../nexa/references/properties-object-structured-data-type.md` |
| Data types | `../nexa/references/common-data-types.md` |
| Standard variables | `../nexa/references/common-standard-variables.md` |

Resource selection protocol per phase:
- Phase 1–2 (MCP check / connection): `references/sap-workflow.md` only
- Phase 3–4 (discovery / metadata): `references/sap-workflow.md` only
- Phase 5 (type mapping / planning): `references/sap-abap-type-mapping.md`
- Phase 6 (SDT generation): `references/sap-sdt-generation.md` + nexa SDT syntax + nexa SDT properties + nexa global-output
- Phase 7 (EO generation): `references/sap-eo-generation.md` + nexa EO syntax + nexa EO properties + nexa global-output
- Phase 8 (Procedure): `references/sap-filter-usage.md` + Procedure syntax + nexa standard-variables + nexa constraints
- Phase 9 (validation / import): `references/sap-workflow.md`

---

# OUTPUT
Save solution in the output directory specified by the user (default: current directory).

Follow nexa output policy: `../nexa/references/global-output.md`

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

## Phase 1 — MCP Availability Check
1. Call `mcp__sap-inspector__sap_ping`
   - On success: proceed to Phase 2
   - On failure: **stop**; inform the user that the SAP Inspector MCP server must be running and registered in Claude Code before this skill can be used; do not proceed further

## Phase 2 — Connection Check
2. Call `mcp__sap-inspector__sap_connection_status`
   - On success (RFC connected): proceed to Phase 3
   - On failure / not configured:
     1. Inform the user that no SAP RFC connection is configured
     2. Request credentials: host, system number, client, username, password, language
     3. Call `mcp__sap-inspector__sap_configure_connection` with those values
     4. Call `mcp__sap-inspector__sap_connection_status` again to confirm
     5. If still failing: **stop** and report the error message to the user

## Phase 3 — BAPI / RFC Discovery
Choose path based on user input:

**Path A — User supplies an exact BAPI or RFC name:**
- Call `mcp__sap-inspector__sap_search_functions` with the name (wildcards supported, e.g., `BAPI_CUSTOMER_*`)
- If multiple results: present them and ask the user to confirm the target

**Path B — User wants to browse by business domain (BOR):**
- Call `mcp__sap-inspector__sap_get_bor_tree` (maxLevel=1) to list top-level BOR modules
- Call `mcp__sap-inspector__sap_get_bor_node_children(nodeId)` iteratively until reaching the target object type
- Call `mcp__sap-inspector__sap_get_bor_object_detail(objectType)` to get methods
- Extract the `AbapName` value for each relevant method — this is the actual RFC function name

**Path C — User supplies a function group:**
- Call `mcp__sap-inspector__sap_search_function_groups` if the group name is unknown
- Call `mcp__sap-inspector__sap_search_rfc_functions` with pattern and group filter

## Phase 4 — Metadata Retrieval
3. For each target RFC function call `mcp__sap-inspector__sap_get_function_metadata(functionName)`
   - This is the **primary and authoritative metadata source**; never substitute another tool
   - Collect for each parameter: name, direction (IMPORTING/EXPORTING/CHANGING/TABLES), ABAP type, length, decimals, mandatory flag, description, and all sub-fields for structure types
   - If a structure parameter references a named DDIC type and sub-fields are absent: call `mcp__sap-inspector__sap_get_object_metadata(objectName)` to retrieve them

## Phase 5 — Execution Plan
4. Load `references/sap-abap-type-mapping.md` and map all ABAP parameter types to GeneXus types
5. Derive the list of objects to generate:
   - One SDT per unique ABAP structure/table type
   - One ExternalObject (with one method per BAPI)
   - Optional sample Procedure
6. Present the execution plan to the user as two tables:

| SDT | ABAP Source Type | File |
|---|---|---|
| `<SdtName>` | `<AbapTypeName>` | `<SdtName>.sdt.main.gx` |

| ExternalObject | Method | File |
|---|---|---|
| `<EoName>SapEO` | `<BapiName>` | `<EoName>SapEO.externalobject.main.gx` |

7. Wait for user approval before generating any file

## Phase 6 — SDT Generation
8. Load `references/sap-sdt-generation.md`, nexa SDT syntax, nexa SDT properties, and nexa global-output
9. For each ABAP structure/table type: generate `<AbapTypeName>.sdt.main.gx`
   - Set `IsSapParameter = true` in `#Properties`
   - Apply type mapping from `references/sap-abap-type-mapping.md`

## Phase 7 — ExternalObject Generation
10. Load `references/sap-eo-generation.md`, nexa EO syntax, nexa EO properties, and nexa global-output
11. Generate the connection manager external object `GxEnterpriseSessionManager.externalobject.main.gx` by copying the template in `./templates/gx-sap-connection.tpl`. Always generate this file; if the object already exists in the KB, the import tool in Phase 9 will update it without conflict. Include it in the Phase 9 import list.
12. Generate `<BorObjectName>SapEO.externalobject.main.gx`
    - Set `IsSap = true` in `#Properties`
    - Set `Type = 'SAP Connector Interface'` in `#Properties`
    - Add one method per BAPI; reference SDTs generated in Phase 6
    - Add the properties/key fields for the corresponding BOR object
    - Set 'IsStatic' value for the method according to the metadata

## Phase 8 — Sample Procedure (optional)
13. If the user requests a sample: load nexa Procedure syntax, standard-variables, and constraints, and `references/sap-filter-usage.md`
14. Generate `<BapiName>Sample.procedure.main.gx`
    - Declare variables of the generated SDT types
    - Declare Row variable(s) for individual filter row(s) if necessary
    - Call the ExternalObject method
    - Show BAPIRET2 return collection handling pattern

## Phase 9 — Validation and Import
15. Call `mcp__genexus__validate_kb_text_files` on all generated files
    - Fix any reported errors before importing
16. Call `mcp__genexus__import_text_to_kb` for all validated files
17. Report the outcome summary to the user

---

# OBJECTS KNOWLEDGE

## ExternalObject (EO)
- Purpose: Wraps a SAP BOR object or set of related RFC functions; each BAPI maps to one method
- Each EO also should include the SAP BOR object properties as properties of the EO
- SAP-specific: `IsSap = true` and `Type = 'SAP Connector Interface'` in `#Properties`
- Nexa syntax reference: `../nexa/references/object-external-object.md`
- SAP generation rules: `references/sap-eo-generation.md`

## Structured Data Type (SDT)
- Purpose: Represents one ABAP STRUCTURE or TABLE type as a GeneXus compound type
- SAP-specific: `IsSapParameter = true` in `#Properties`
- Nexa syntax reference: `../nexa/references/object-structured-data-type.md`
- SAP generation rules: `references/sap-sdt-generation.md`

## Procedure (optional)
- Purpose: Usage example demonstrating the EO method call and return message handling
- Refer to `references/sap-filter-usage.md` to use filters on BAPI functions if requested
- No SAP-specific properties; follows standard nexa `Procedure` rules
- Nexa syntax reference: `../nexa/references/object-procedure.md`

---

# PROPERTIES KNOWLEDGE
Two SAP-specific property values must always be set:

| Object | Property | Value |
|---|---|---|
| `ExternalObject` | `Type` | `SAP Connector Interface` |
| `SDT` | `IsSapParameter` | `true` |

Property definitions source of truth:
- ExternalObject properties: `../nexa/references/properties-object-external-object.md`
- SDT properties: `../nexa/references/properties-object-structured-data-type.md`

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
- [ ] `IsSap = true and Type = 'SAP Connector Interface'` is set on the `ExternalObject`
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
- Apply nexa global constraints: `../nexa/references/global-constraints.md`
- Follow nexa output policy: `../nexa/references/global-output.md`
- Never commit or push changes unless explicitly requested
- Strictly follow documentation; no assumptions or inventions
