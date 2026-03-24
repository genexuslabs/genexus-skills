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
- Property names in `.gx` files must use PascalCase without spaces or quotes; when a property is documented with spaces (e.g., `"Maximum numeric length"`), convert it by removing spaces and capitalizing each word: `"Maximum numeric length"` (✘) → `MaximumNumericLength` (✓), `"Business Component"` (✘) → `BusinessComponent` (✓)
- When asked to read or modify a property value, always use the corresponding `.gx` file directly instead of MCP tools like `get_kb_property` or `set_kb_property`; KB/Environment/Version properties are in `src.ns/Preferences/`, while object properties (transactions, procedures, panels, etc.) are in the object's own `.gx` file within `src/`; after modifying, run `import_text_to_kb` to apply the change to the KB
