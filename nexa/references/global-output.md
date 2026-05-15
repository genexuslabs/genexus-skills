---
name: global-output
description: Shared output contract for path resolution and artifact naming
---

Shared output contract for `references/object-*.md` and `references/model-*.md` files

---

# DIRECTORIES
Container directories define the `Knowledge Base` tree

Meaning:
- For `src/` → `Root Module` directory
- For `ref/` → `Pacakge` directory
- For `<name>/` → `Module` directory
- For `@<name>/` → `Folder` directory
- For `#<name>/` → category directory

---

# ROOT DIRECTORY
Store all exported artifacts under `src/`, representing special `Root Module` object

Rules:
- The `Root Module` follows the same artifact rules as any other `Module` object

---

# REFERENCES DIRECTORY
Exposes readonly dependencies under `ref/`, containing `Module` object references as a package

Rules:
- All `Module` references follow the same artifact rules as any other `Module` object
- All objects can be referenced by any object under `src/` as any regular object
- Must be treated as read-only directory; never update, regenerate, or extend contained objects
- Must only consider object fully-qualified names and signatures; ignore implementation details

---

# CATEGORY DIRECTORIES
Classifies object artifacts inside the allowed container path

Known root-level categories:
- `#preferences/`: Model configuration (KB, Versions, Environments)
- `#attributes/`: Attribute artifacts
- `#tables/`: Physical Table and related Index artifacts
- `#subtypes/`: SubTypeGroup objects artifacts aliasing Attribute groups
- `#categories/`: DeploymentUnit artifacts
- `#localization/`: Language artifacts
- `#themes/`: DesignSystem artifacts
- `#wiki/`: Document objects artifacts for KB documentation

Known module-level categories:
- `#domains/`: Domain objects artifacts
- `#images/`: Image objects artifacts
- `#files/`: File objects artifacts

Rules:
- Must exist only under a `Module` object; `Root Module` included
- Must never exist under a `Folder` object
- Must bind each name with a single object under a category directory

---

# PATH RESOLUTION
Resolve final directory in this order:
- Start at `src/` directory
- Append every parent `Module` as `<name>/` directory
- Follow one of:
	* Append every parent `Folder` as `@<name>/` directory
	* Append category directory only if object file requires one
- Create the target artifacts in the resulting directory

Pattern:
`src/[<module-1>/…][@<folder-1>/…]` for uncategorized
`src/[<module-1>/…]#<category>/` for categorized

Rules:
* Resolve category directories to the nearest allowed `Module` path
* Resolve containing `Module` before appending any category directory
* Apply rooted or containment restrictions from target references

---

# ARTIFACT SET
Each definition exports one set of canonical artifacts

Default artifacts:
- [Main artifact](#main-artifact)
- [Properties artifact](#properties-artifact)
- [Documentation artifact](#documentation-artifact)
- [Layout artifact](#layout-artifact)

## MAIN ARTIFACT
Maps full definition to `GX` file; except sections defined in other artifacts

Pattern:
- `<name>.gx`: For object or model definitions

Rules:
- Never encode the object type in the file name
- Infer object type from file content header

# LOCAL ARTIFACT
Defines local override file for model definitions; typically included in `.gitignore` file

Pattern:
- `<name>.local.*.gx`: For model definition only

Rules:
- Must include properties with `Scope` set to `.local` from `properties-*.md` files
- May include other properties for overriding or extending the main file definition

## PROPERTIES ARTIFACT
Maps `#Properties` section to `TOML` file

Pattern:
- `module.toml`: For `Module` objects
- `<name>.props.toml`: For any other object

Rules:
- Support only one of these modes; must never mix them
	* Properties inline in the `.gx` main artifact
	* Properties in a separated `.props.toml` artifact
- Forbid switching modes; preserve the existing mode
- Forbid duplicate properties definition inside main file if separated

## DOCUMENTATION ARTIFACT
Maps `#Documentation` section to `MD` file

Pattern:
- `README.md`: For `Module` objects
- `<name>.doc.md`: For any other object

Rules:
- Keep documentation outside the main artifact
- Forbid duplicate documentation definition inside `.gx` main file

## LAYOUT ARTIFACT
Maps `#Layout` section to `XML` file

Pattern:
- `<name>.report.xml`: For `Procedure` objects with report
- `<name>.web.xml`: For `WebPanel`, `WebComponent`, `MasterPage`, and `Stencil` objects
- `<name>.panel.xml`: For `Panel`, `MasterPanel`, and `Stencil` objects

Rules:
- Target definition defines which layout family supports
- Forbid duplicate layout definition inside `.gx` main file

---

# EXAMPLES

## Example 1
Definition for `Root Module` module
- `src/module.toml`
- `src/README.md`

## Example 2
Definition for `Commerce` module
- `src/Commerce/`
- `src/Commerce/module.toml`
- `src/Commerce/README.md`

## Example 3
Definition for `Customer` object in `Root Module` module
- `src/Customer.gx`
- `src/Customer.doc.md`

## Example 4
Definition for `MonthlySales` object inside `Reports` folder in `Sales` module
- `src/Sales/@Reports/MonthlySales.gx`
- `src/Sales/@Reports/MonthlySales.doc.md`

## Example 5
Definition for `CustomerStatus` domain in category group in `Sales` module
- `src/Sales/#domains/CustomerStatus.gx`
- `src/Sales/#domains/CustomerStatus.doc.md`

## Example 6
Definition for `BookingPanel` panel with variants in `Client` module
- `src/Client/BookingPanel.gx`
- `src/Client/BookingPanel.doc.md`
- `src/Client/BookingPanel.panel.xml`
- `src/Client/BookingPanel.panel.phone.xml`
- `src/Client/BookingPanel.panel.phone.landscape.xml`

## Example 7
Definition for `InvoiceReport` procedure with report layout in `Reports` module
- `src/Reports/InvoiceReport.gx`
- `src/Reports/InvoiceReport.doc.md`
- `src/Reports/InvoiceReport.report.xml`

## Example 8
Definition for `OrderQuery` object with separated properties in `Orders` module
- `src/Orders/OrderQuery.gx`
- `src/Orders/OrderQuery.doc.md`
- `src/Orders/OrderQuery.props.toml`

## Example 9
Definition for rooted-category KB model files with `NETSQLServer` environment in version
- `src/#preferences/MyKB.kb.gx`
- `src/#preferences/NETSQLServer.env.gx`
- `src/#preferences/NETSQLServer.local.env.gx`

---

# CONSTRAINTS
- Output path resolution governs artifact selection
- Never override object syntax or completeness rules
- Allow only stricter reference definition-specific rules
- Keep one canonical artifact set per target
- Keep path resolution deterministic and rule-compliant
- Never create extra files for other object sections
