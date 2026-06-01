---
name: sap-workflow
description: Detailed MCP tool invocation sequence for SAP BAPI discovery and metadata retrieval
---

Step-by-step MCP tool call sequence for each phase of the SAP skill workflow

---

## MCP AVAILABILITY CHECK
Call Tool: `mcp__sap-inspector__sap_ping`
	- No parameters required
	- Success: returns version and environment info
	- Failure (tool not found / connection refused): **stop all processing**
		* Tell the user: "The SAP Inspector MCP server tool is not available. Register it and restart the session"
		* Do not attempt any further SAP tool calls
	- On success: proceed to Phase 2

---

## RFC CONNECTION CHECK  ⚠️ MANDATORY GATE — NEVER SKIP

> **This step is a hard prerequisite for every subsequent phase.**
> Do NOT proceed to discovery, metadata retrieval, or code generation until `sap_connection_status` returns a confirmed live connection.
> Skipping this check is a workflow violation regardless of prior session state or cached credentials.

Call Tool: `mcp__genexus__sap_connection_status`
- No parameters required
- **On success** (RFC connected): proceed to discovery (phase 3)
- **On failure or unconfigured state**: **STOP ALL PROCESSING IMMEDIATELY**
	* Notify the user: "The SAP RFC connection is not active. No metadata retrieval or code generation will proceed until the connection is confirmed."
	* Request the following credentials:
		- `host` — SAP application server hostname or IP
		- `systemNumber` — SAP system number (two-digit, e.g., `00`)
		- `client` — SAP client (three-digit, e.g., `100`)
		- `systemId` — SAP System ID (three-letter, e.g., `IDE`)
		- `user` — SAP username
		- `password` — SAP password
		- `language` — Logon language (e.g., `EN`)
	* Call Tool `mcp__genexus__sap_configure_connection` with those values
	* Call Tool `mcp__genexus__sap_connection_status` again to confirm
	* If still failing: **STOP** and report the error message verbatim — do not attempt any further SAP tool calls

---

## BAPI / RFC Discovery
> **Pre-condition:** `sap_connection_status` must have returned success in this session before reaching this phase. If not, return to RFC CONNECTION CHECK.

Choose one option path based on user input:

---

# Option A — RFC FUNCTION SEARCH (by name) - User supplies an exact BAPI or RFC name

Call Tool: `mcp__sap-inspector__sap_search_functions`
- Parameter: `pattern` — supports wildcards (e.g., `BAPI_SALESORDER_*`, `*CUSTOMER*`)
- Returns: list of matching RFC function names with descriptions
- If a single match: proceed directly with it
- If multiple matches: present the list and ask the user to confirm the target function name(s)
- If no matches: suggest broadening the wildcard pattern or switching to BOR navigation (Phase 3B)

---

# Option B — BOR TREE NAVIGATION (by business object) - User wants to browse by business domain (BOR)

Steps: 

— Get top-level BOR modules:
Call Tool: `mcp__sap-inspector__sap_get_bor_tree`
	* Parameter: `maxLevel = 1` (to list top-level BOR modules) 
	* Returns: list of top-level application area nodes (e.g., SD, MM, FI, HR, PP)
	* Present the list to the user and ask which area to explore

— Drill down to object type:
Call Tool: `mcp__sap-inspector__sap_get_bor_node_children`
	* Parameter: `nodeId` from the previous call
	* Returns: child nodes (sub-areas or object types)
	* Repeat this step iteratively until reaching the target BOR object type node

— Get object methods:
Call Tool: `mcp__sap-inspector__sap_get_bor_object_detail`
	* Parameter: `objectType` — the BOR object type identifier (e.g., `BUS2032`)
	* Returns: object metadata including list of methods, each with an `AbapName` field
	* Extract **`AbapName` this is the actual RFC function name** — use it as the input to `sap_get_function_metadata`
	* Present available methods to the user; ask which to use if more than one is relevant, the user can pick more than one

---

# Option C — FUNCTION GROUP SEARCH
Step 1 — Find function group (if name unknown):
Call Tool: `mcp__sap-inspector__sap_search_function_groups`
	- Parameter: `pattern` — wildcard supported

Step 2 — Search functions within group:
Call Tool: `mcp__sap-inspector__sap_search_rfc_functions`
	- Parameters: `pattern` (function name wildcard), `group` (function group name)

---

## METADATA RETRIEVAL
> **Pre-condition:** `sap_connection_status` must have returned success in this session. If not, return to RFC CONNECTION CHECK before calling any metadata tool.

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

## TYPE MAPPING
No additional MCP tool calls are required in Phases 5–8. All logic is specified in SKILL.md and the dedicated reference files:
Map all ABAP parameter types to GeneXus types using [sap-abap-type-mapping](references/sap-abap-type-mapping.md)

## GENERATION PLAN

Derive the list of object to generate
	* Generate one SDT per unique ABAP structure/table type: [sap-sdt-generation](references/sap-sdt-generation.md) 
	* Generate one ExternalObject for each BOR object, create one method for each BAPI function: [sap-eo-generation](references/sap-eo-generation.md)
	* Sample Procedure generation (optional) : [nexa:object-procedure](../nexa/references/object-procedure.md), [nexa:common-standard-variables](../nexa/references/common-standard-variables.md)

Consult those files directly when executing the corresponding phase

---

## APPROVAL OF PLAN

Present the generation plan to the user as two tables:

## APPROVAL OF PLAN

Present the generation plan to the user as structured lists or tables:

* SDT entries
	- Header: `SDT`, `ABAP Source Type`, `File`
	- Items: `<SdtName>`, `<AbapTypeName>`, `<SdtName>.gx` (GeneXus 19+) / `<SdtName>.sdt.main.gx` (older)

* External Object entries
	- Header: `ExternalObject`, `Method`, `File`
	- Items: `<EoName>SapEO`, `<BapiName>`, `<EoName>SapEO.gx` (GeneXus 19+) / `<EoName>SapEO.externalobject.main.gx` (older)

* Other objects
Any other object required to fullfill the task
	- Header `Object Type`, `ObjectName`, `File`
	- Items GeneXus object type, GeneXus Name, Actual file to be generated

Wait for user approval before generating any file ( next step )

---

## KB FORMAT DETECTION

Before writing any file, determine the GeneXus KB version to select the correct file naming format:

1. Locate the `.gxw` file in the KB root directory (e.g., `<kb-root>/<kb-name>.gxw`)
2. Read `<FriendlyVersion>` from the XML
3. If the major version number is **19 or higher** → use **new format**: `<ObjectName>.gx`
4. Otherwise → use **old format**: `<ObjectName>.<type>.main.gx`

| Format | Condition | SDT | ExternalObject | Procedure |
|---|---|---|---|---|
| New | GeneXus 19+ | `<Name>.gx` | `<Name>.gx` | `<Name>.gx` |
| Old | GeneXus < 19 | `<Name>.sdt.main.gx` | `<Name>.externalobject.main.gx` | `<Name>.procedure.main.gx` |

Apply the detected format consistently to every file generated in this phase.

---

## GENERATION
> **Pre-condition:** `sap_connection_status` must have returned success in this session. If not confirmed, stop and return to RFC CONNECTION CHECK — do not write any file.

**SDT Generation**
Load: [sap-sdt-generation](references/sap-sdt-generation.md), [nexa:global-output](../nexa/references/global-output.md) and  [nexa:object-structured-data-type](../nexa/references/object-structured-data-type.md)

For each ABAP structure/table type: generate `<AbapTypeName>.gx` (GeneXus 19+) or `<AbapTypeName>.sdt.main.gx` (older)
	- Set `IsSapParameter = true` in `#Properties`
	- Apply type mapping from [sap-abap-type-mapping](references/sap-abap-type-mapping.md)

**ExternalObject Generation**
Generate one external object for each BOR Type that contains a BAPI function, the BAPI functions are mapped to methods of the EO
The key attributes   of the BOR object are mapped to properties of the EO
Load [sap-eo-generation](references/sap-eo-generation.md), [nexa:object-external-object](../nexa/references/object-external-object.md) and [nexa:global-output](../nexa/references/global-output.md)


**Connection Manager Generation**

Generate the connection manager external object by copying the template in `./templates/gx-sap-connection.tpl`. Always generate this file; if the object already exists in the KB, the import tool in Phase 9 will update it without conflict. Include it in the Phase 9 import list.
- GeneXus 19+: file name `GXEnterpriseSessionManager.gx`
- GeneXus < 19: file name `GXEnterpriseSessionManager.externalobject.main.gx`

Generate the BOR ExternalObject — `<BorObjectName>SapEO.gx` (GeneXus 19+) / `<BorObjectName>SapEO.externalobject.main.gx` (older)
	- Set `IsSap = true` in `#Properties`
	- Set `Type = 'SAP Connector Interface'` in `#Properties`
	- Add one method per BAPI; reference SDTs generated earlier in this phase
	- Add the properties/key fields for the corresponding BOR object
	- Set 'IsStatic' value for the method according to the metadata


**Sample Procedure (optional)**
If the user requests a sample: load nexa Procedure syntax, standard-variables, and constraints, and `references/sap-filter-usage.md`

Generate the sample procedure — `<BapiName>Sample.gx` (GeneXus 19+) / `<BapiName>Sample.procedure.main.gx` (older)
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

## VALIDATION AND IMPORT

Step 1 — Validate all generated files:
Call Tool: `mcp__genexus__validate_kb_text_files`
	- Parameter: `names` — list of object names to validate
	- Parameter: `rootDirectory` — output directory path
	- Parameter: `stopOnError = true`
	- On error: read the reported message, fix the offending file, and re-validate before proceeding

Step 2 — Import validated files:
Call Tool: `mcp__genexus__import_text_to_kb`
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
