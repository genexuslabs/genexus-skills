---
name: global-output
description: Shared output policy and file naming rules for object reference files
---

Shared output policy for `references/object-*.md`

---

# OUTPUT MODES
Use mode names `single-file` and `multi-file`:
- `single-file`: One artifact with the full object in GeneXus syntax and sections: `.main.gx`
- `multi-file`: One artifact per syntax region: `.main.gx` plus zero or more region artifacts

---

# FORMAT MATRIX
Canonical name templates:
- For `single-file` mode use `<name>.<type>.main.gx` only
- For `multi-file` mode use `<name>.<type>.<region>.<extension>` where:
	* Define `<region>` per object region in the definition; excluding GeneXus-specific sections
	* Chose `<extension>` per region native syntax; default `.gx` for GeneXus syntax
	* Keep `.main.gx` always written without split regions

Common region artifacts (when present):
- `<name>.<type>.layout.xml` for object layout definition in GXML
- `<name>.<type>.properties.toml` for object properties in TOML
- `<name>.<type>.documentation.md` for object documentation in Markdown

---

# SAVE POLICY
When saving a target object, resolve mode in this order
1. Detect existing artifacts for target object using [FORMAT MATRIX](#format-matrix) templates
2. If artifacts exist:
	* Infer current mode from existing files
	* Preserve that mode by default
3. If user explicitly requests a different mode:
	* Switch to requested mode
	* Restructure artifacts to that mode before final save
4. If no artifact exists for the target object:
	* Use explicitly requested mode, if provided
	* Otherwise default to `single-file`

Mode inference rules:
- For `single-file`, only `.main.gx` exists and region artifacts are absent
- For `multi-file`, both `.main.gx` and at least one region artifact exist

---

# RESTRUCTURE
Rules for file-system restructuring:
1. `single-file` → `multi-file`
	* Extract native artifact parts only when sections exist or are requested
	* Keep only GeneXus-specific content in `<name>.<type>.main.gx` after successful split
2. `multi-file` → `single-file`
	* Consolidate all available parts into `<name>.<type>.main.gx` using target object `SYNTAX` section
	* Remove obsolete split artifacts after successful consolidation

---

# EXAMPLES

## Single-file object
`Customer.transaction.main.gx`:
```
Transaction MyEntity
{
	MyEntityId [ DataType = "Numeric(4.0)", Autonumber="True" ]
	MyEntityName [ DataType = "VarChar(64)" ]

	#Rules
		noaccept(MyEntityId);
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Mode [ DataType = 'Character(3)' ]
	#End

	#Properties
		"Business Component" = true
	#End

	#Documentation
		# Definition
		Documentation for MyEntity transaction

		## Attributes
		- MyEntityId: Record identifier
		- MyEntityName: Record name
	#End
}
```

## Multi-file object
`Customer.transaction.main.gx`:
```
Transaction MyEntity
{
	MyEntityId [ DataType = "Numeric(4.0)", Autonumber="True" ]
	MyEntityName [ DataType = "VarChar(64)" ]

	#Rules
		noaccept(MyEntityId);
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Mode [ DataType = 'Character(3)' ]
	#End
}
```

`Customer.transaction.properties.toml`:
```
"Business Component" = true
```

`Customer.transaction.documentation.md`:
```
# Definition
Documentation for MyEntity transaction

## Attributes
- MyEntityId: Record identifier
- MyEntityName: Record name
```

---

# CONSTRAINTS
- Output policy governs artifact selection and naming only
- Output policy never overrides section completeness rules from object `SYNTAX` section
- Object-specific reference files may define exceptions to this policy
- Enforce canonical naming only from [FORMAT MATRIX](#format-matrix) section
- Generate `multi-file` artifacts only when requested or required
- Keep one mode per target object after save; never keep both `single-file` and `multi-file` artifacts
