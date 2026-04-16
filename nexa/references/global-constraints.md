---
name: global-constraints
description: Shared constraints applied by object reference files
---

Shared constraints for `references/object-*.md`

---

# CONSTRAINTS
- Produce code complying with SYNTAX section
- Emit all `SYNTAX` sections, even if empty
- Prefer semantically compatible reuse before creating new definitions
- Define `Description` metadata for all objects and their attributes, variables, members, and parameters, unless unsupported
- Define `DataType` for attributes, variables, members, and parameters using [common-data](./common-data.md)
- Executable objects with `#Variables` must include baseline from [common-standard-variables](./common-standard-variables.md) unless explicitly restricted
- Use positional arguments only for object calls, named arguments are forbidden
- Use semicolons only in rules, conditions, and orders
- Write one statement per line and use tabs for indentation when the object syntax is line-oriented
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
- Read/write properties via `.gx` files only; never use `get_kb_property` or `set_kb_property` tools
- Find model properties in `src.ns/Preferences/*` and object properties in `src/**`
- Execute `import_text_to_kb` after modifying any `.gx` file
