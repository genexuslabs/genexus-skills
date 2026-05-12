---
name: sap-workflow
description: Detailed MCP tool invocation sequence for SAP BAPI discovery and metadata retrieval
---

Step-by-step MCP tool call sequence for each phase of the SAP skill workflow.

---

# PHASE 1 — MCP AVAILABILITY CHECK

Tool: `mcp__sap-inspector__sap_ping`
- No parameters required
- Success: returns version and environment info
- Failure (tool not found / connection refused): **stop all processing**
  - Tell the user: "The SAP Inspector MCP server is not available. Register it with `claude mcp add sap-inspector <path-to-exe>` and restart the session."
  - Do not attempt any further SAP tool calls

---

# PHASE 2 — RFC CONNECTION CHECK

Tool: `mcp__sap-inspector__sap_connection_status`
- No parameters required
- Success (RFC connected): proceed to discovery

On failure or unconfigured state:
1. Inform the user that no SAP RFC connection is configured
2. Request the following credentials:
   - `host` — SAP application server hostname or IP
   - `systemNumber` — SAP system number (two-digit, e.g., `00`)
   - `client` — SAP client (three-digit, e.g., `100`)
   - `systemId` — SAP System ID (three-letter , e.g., `IDE`)
   - `user` — SAP username
   - `password` — SAP password
   - `language` — Logon language (e.g., `EN`)
3. Call `mcp__sap-inspector__sap_configure_connection` with those values
4. Call `mcp__sap-inspector__sap_connection_status` again to confirm
5. If still failing: **stop** and report the error message verbatim to the user

---

# PHASE 3A — RFC FUNCTION SEARCH (by name)

Tool: `mcp__sap-inspector__sap_search_functions`
- Parameter: `pattern` — supports wildcards (e.g., `BAPI_SALESORDER_*`, `*CUSTOMER*`)
- Returns: list of matching RFC function names with descriptions
- If a single match: proceed directly with it
- If multiple matches: present the list and ask the user to confirm the target function name(s)
- If no matches: suggest broadening the wildcard pattern or switching to BOR navigation (Phase 3B)

---

# PHASE 3B — BOR TREE NAVIGATION (by business object)

Step 1 — Get top-level BOR modules:
Tool: `mcp__sap-inspector__sap_get_bor_tree`
- Parameter: `maxLevel = 1`
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
- **`AbapName` is the actual RFC function name** — use it as the input to `sap_get_function_metadata`
- Present available methods to the user; ask which to use if more than one is relevant

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

Primary tool (always use first): `mcp__sap-inspector__sap_get_function_metadata`
- Parameter: `functionName` — exact RFC function name (from search or BOR `AbapName`)
- Returns: complete parameter specification:
  - Parameter name
  - Direction: `IMPORTING`, `EXPORTING`, `CHANGING`, `TABLES`
  - ABAP type name
  - Length and decimals
  - Mandatory flag
  - Description
  - Sub-fields for structure parameters (recursively)
- Call once per target RFC function

Supplementary tool (only when structure sub-fields are absent from primary response):
`mcp__sap-inspector__sap_get_object_metadata`
- Parameter: `objectName` — the ABAP DDIC structure or table type name
- Returns: all fields with their types, lengths, and descriptions
- Use this to fill in structure fields that `sap_get_function_metadata` did not return inline

Do NOT use `mcp__sap-inspector__sap_get_bor_method_parameters` as metadata source:
- It is less reliable than `sap_get_function_metadata`
- Use only as last-resort cross-reference, never as the authoritative source

---

# PHASES 5–8 — TYPE MAPPING, GENERATION, SAMPLE PROCEDURE

No additional MCP tool calls are required in Phases 5–8. All logic is specified in SKILL.md and the dedicated reference files:

| Phase | Activity | Reference |
|---|---|---|
| 5 | ABAP→GeneXus type mapping and execution plan | `references/sap-abap-type-mapping.md` |
| 6 | SDT file generation | `references/sap-sdt-generation.md` |
| 7 | ExternalObject file generation | `references/sap-eo-generation.md` |
| 8 | Sample Procedure generation (optional) | nexa Procedure syntax + standard variables |

Consult those files directly when executing the corresponding phase.

---

# PHASE 9 — VALIDATION AND IMPORT

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
