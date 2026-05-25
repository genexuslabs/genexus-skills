---
name: global-constraints
description: Shared constraints applied by object reference files
---

Shared constraints for `references/object-*.md`

---

# CONSTRAINTS
- Produce code complying with `SYNTAX` section:
	* Write body block `{…}` with one-tab indented content
	* Write section blocks `#<name>…#End` with extra-tab indented content
		- Allow sections in any order
		- Yield all sections, even if empty
		- Prune explicitly excluded sections
	* Write properties blocks `[…]` inline or multiline with extra-tab indented content
	* Indent code with tabs; never with whitespaces
	* Follow formatting conventions from provided examples
- Prefer semantically compatible reuse before creating new definitions
- Define `Description` property on all supported objects, attributes, variables, members, and parameters
- Follow [Data Type Priority](./common-data.md#data-type-priority) for defining `DataType` value
- Ensure [Standard Variables](./common-standard-variables.md) baseline unless explicitly restricted
- Use positional arguments only for object calls, named arguments are forbidden
- Use semicolons only in rules, conditions, and orders
- Write one statement per line and use tabs for indentation when the object syntax is line-oriented
- Forbid non-syntactic chars in generated artifacts: emojis, control chars, unicode escapes
- Forbid cryptic abbreviations; `CstTrx` (✘) → `CustomerTransaction` (✓)
- Forbid transaction-qualified attribute names; `User.UserId` (✘) → `UserId` (✓)
- Forbid verbatim string literals; `"""Hello"""` (✘) → `!"Hello"` (✓)
- Forbid escaped quote delimiters in literals; `\"message\"` (✘) → `"message"` (✓)
- Forbid escape characters in literals; `!"\t•X\n"` (✘) → `chr(9) + !"•X" + Newline()` (✓)
- Forbid apostrophes in literals; `"User's name"` (✘) → `"Name of the user"` (✓)(✓)
- Forbid `!` prefix in translatable literals; `!"APP_SAVE"` (✘) → `"APP_SAVE"` (✓)
- Allow `!` prefix only in non-translatable literals; `"www.example.com"` (✘) → `!"www.example.com"` (✓)
- Allow enum domain dot (`.`) notation only; `!"COSMETICS"` (✘) → `ProductCategoryType.Cosmetics`
- Define all properties in `.gx` files using PascalCase without quotes; `"Maximum numeric length"` (✘) → `MaximumNumericLength` (✓)
- Forbid UI-related object changes when `Backend Only` is enabled in `*.kb.gx` file
- Read/write properties via `.gx` files only; never use tools for that purpose
- Sync changes after any `.gx` file modification
