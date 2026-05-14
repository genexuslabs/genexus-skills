---
name: sap-workflow
description: Detailed MCP tool invocation sequence for SAP BAPI discovery and metadata retrieval
---

Step-by-step MCP tool call sequence for each phase of the SAP skill workflow

---

## PHASE 1 — MCP AVAILABILITY CHECK
Tool: `mcp__sap-inspector__sap_ping`
	- No parameters required
	- Success: returns version and environment info
	- Failure (tool not found / connection refused): **stop all processing**
		* Tell the user: "The SAP Inspector MCP server tool is not available. Register it and restart the session"
		* Do not attempt any further SAP tool calls
	- On success: proceed to Phase 2

---

## PHASE 2 — RFC CONNECTION CHECK
Tool: `mcp__sap-inspector__sap_connection_status`
- No parameters required
- Success (RFC connected): proceed to discovery (phase 3)

On failure or unconfigured state:
1. Inform the user that no SAP RFC connection is configured
2. Request the following credentials:
	- `host` — SAP application server hostname or IP
	- `systemNumber` — SAP system number (two-digit, e.g., `00`)
	- `client` — SAP client (three-digit, e.g., `100`)
	- `systemId` — SAP System ID (three-letter, e.g., `IDE`)
	- `user` — SAP username
	- `password` — SAP password
	- `language` — Logon language (e.g., `EN`)
3. Call `mcp__sap-inspector__sap_configure_connection` with those values
4. Call `mcp__sap-inspector__sap_connection_status` again to confirm
5. If still failing: **stop** and report the error message verbatim to the user

---

## Phase 3 — BAPI / RFC Discovery
Choose path based on user input:

---

# PHASE 3A — RFC FUNCTION SEARCH (by name) - User supplies an exact BAPI or RFC name

Tool: `mcp__sap-inspector__sap_search_functions`
	- Parameter: `pattern` — supports wildcards (e.g., `BAPI_SALESORDER_*`, `*CUSTOMER*`)
	- Returns: list of matching RFC function names with descriptions
	- If a single match: proceed directly with it
	- If multiple matches: present the list and ask the user to confirm the target function name(s)
	- If no matches: suggest broadening the wildcard pattern or switching to BOR navigation (Phase 3B)

---

# PHASE 3B — BOR TREE NAVIGATION (by business object) - User wants to browse by business domain (BOR)

Step 1 — Get top-level BOR modules:
Tool: `mcp__sap-inspector__sap_get_bor_tree`
	- Parameter: `maxLevel = 1` (to list top-level BOR modules) 
	- Returns: list of top-level application area nodes (e.g., SD, MM, FI, HR, PP)
	- Present the list to the user and ask which area to explore

Step 2 — Drill down to object type:
Tool: `mcp__sap-inspector__sap_get_bor_node_children`
	- Parameter: `nodeId` from the previous call
	- Returns: child nodes (sub-areas or object types)
	- Repeat iteratively until reaching the target BOR object type node

Step 3 — Get object methods:
Tool: `mcp__sap-inspector__sap_get_bor_object_detail`
	- Parameter: `objectType` — the BOR object type identifier (e.g., `BUS2032`)
	- Returns: object metadata including list of methods, each with an `AbapName` field
	- Extract **`AbapName` this is the actual RFC function name** — use it as the input to `sap_get_function_metadata`
	- Present available methods to the user; ask which to use if more than one is relevant, the user can pick more than one

---

# PHASE 3C — FUNCTION GROUP SEARCH
Step 1 — Find function group (if name unknown):
Tool: `mcp__sap-inspector__sap_search_function_groups`
	- Parameter: `pattern` — wildcard supported

Step 2 — Search functions within group:
Tool: `mcp__sap-inspector__sap_search_rfc_functions`
	- Parameters: `pattern` (function name wildcard), `group` (function group name)

---

# PHASE 4 — METADATA RETRIEVAL
Primary tool (always use first): `mcp__sap-inspector__sap_get_function_metadata(functionName)`
	- Parameter: `functionName` — exact RFC function name (from search or BOR `AbapName`)
	- Returns: complete parameter specification:
		* Parameter name
		* Direction: `IMPORTING`, `EXPORTING`, `CHANGING`, `TABLES`
		* ABAP type name
		* Length and decimals	
		* Mandatory flag
		* Description
		* Sub-fields for structure parameters (recursively)
Call once per target RFC function

Supplementary tool (only when structure sub-fields are absent from primary response): `mcp__sap-inspector__sap_get_object_metadata`
	- Parameter: `objectName` — the ABAP DDIC structure or table type name
	- Returns: all fields with their types, lengths, and descriptions
	- Use this to fill in structure fields that `sap_get_function_metadata` did not return inline

Do NOT use `mcp__sap-inspector__sap_get_bor_method_parameters` as metadata source: It is less reliable than `sap_get_function_metadata`
Use only as last-resort cross-reference, never as the authoritative source

---

## PHASE 5 TYPE MAPPING
No additional MCP tool calls are required in Phases 5–8. All logic is specified in SKILL.md and the dedicated reference files:
Map all ABAP parameter types to GeneXus types using [sap-abap-type-mapping](references/sap-abap-type-mapping.md)

## PHASE 6 GENERATION PLAN

Derive the list of object to generate
	* Generate one SDT per unique ABAP structure/table type: [sap-sdt-generation](references/sap-sdt-generation.md) 
	* Generate one ExternalObject for each BOR object, create one method for each BAPI function: [sap-eo-generation](references/sap-eo-generation.md)
	* Sample Procedure generation (optional) : [nexa:object-procedure](../nexa/references/object-procedure.md), [nexa:common-standard-variables](../nexa/references/common-standard-variables.md)

Consult those files directly when executing the corresponding phase

---

## PHASE 7. APPROVAL OF PLAN

Present the generation plan to the user as two tables:

| SDT | ABAP Source Type | File |
|---|---|---|
| `<SdtName>` | `<AbapTypeName>` | `<SdtName>.sdt.main.gx` |

| ExternalObject | Method | File |
|---|---|---|
| `<EoName>SapEO` | `<BapiName>` | `<EoName>SapEO.externalobject.main.gx` |

Wait for user approval before generating any file (Phase 8)

---

## Phase 8 GENERATION

**SDT Generation**
Load: [sap-sdt-generation](references/sap-sdt-generation.md), [nexa:global-output](../nexa/references/global-output.md) and  [nexa:object-structured-data-type](../nexa/references/object-structured-data-type.md)

For each ABAP structure/table type: generate `<AbapTypeName>.sdt.main.gx`
	- Set `IsSapParameter = true` in `#Properties`
	- Apply type mapping from [sap-abap-type-mapping](references/sap-abap-type-mapping.md)

**ExternalObject Generation**
Generate one external object for each BOR Type that contains a BAPI function, the BAPI functions are mapped to methods of the EO
The key attributes   of the BOR object are mapped to properties of the EO
Load [sap-eo-generation](references/sap-eo-generation.md), [nexa:object-external-object](../nexa/references/object-external-object.md) and [nexa:global-output](../nexa/references/global-output.md)


**Connection Manager Generation**

Generate the connection manager external object `GxEnterpriseSessionManager.externalobject.main.gx` by copying the template in `./templates/gx-sap-connection.tpl`. Always generate this file; if the object already exists in the KB, the import tool in Phase 9 will update it without conflict. Include it in the Phase 9 import list.

Generate `<BorObjectName>SapEO.externalobject.main.gx`
	- Set `IsSap = true` in `#Properties`
	- Set `Type = 'SAP Connector Interface'` in `#Properties`
	- Add one method per BAPI; reference SDTs generated earlier in this phase
	- Add the properties/key fields for the corresponding BOR object
	- Set 'IsStatic' value for the method according to the metadata


**Sample Procedure (optional)**
If the user requests a sample: load nexa Procedure syntax, standard-variables, and constraints, and `references/sap-filter-usage.md`

Generate `<BapiName>Sample.procedure.main.gx`
	- Declare variables of the generated SDT types
	- Declare Row variable(s) for individual filter row(s) if necessary
	- Call the ExternalObject method
	- Show BAPIRET2 return collection handling pattern

Check that all necessary objects are generated:

	- All SDTs for each structure or ABAP table
	- EO containing methods for BAPI functions and properties for BOR type key values and attributes
	- Connection manager object
	- Sample procedure if generated

---

## PHASE 9 — VALIDATION AND IMPORT

Step 1 — Validate all generated files:
Tool: `mcp__genexus__validate_kb_text_files`
	- Parameter: `names` — list of object names to validate
	- Parameter: `rootDirectory` — output directory path
	- Parameter: `stopOnError = true`
	- On error: read the reported message, fix the offending file, and re-validate before proceeding

Step 2 — Import validated files:
Tool: `mcp__genexus__import_text_to_kb`
	- Parameter: `names` — list of object names (same list as validation)
	- Parameter: `rootDirectory` — same output directory
	- Parameter: `stopOnError = true`
	- Verify the import response confirms success
	- Report the final import result to the user

---

# CONSTRAINTS
- Always call `sap_ping` before any other SAP Inspector tool
- Always call `sap_connection_status` before any metadata retrieval
- Never pass SAP passwords to generated GeneXus files
- Use `sap_get_function_metadata` as the single authoritative metadata source for all ABAP parameters
- Never skip the validation step before importing
