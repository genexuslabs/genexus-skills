---
name: properties-object-url-rewrite
description: Configurable url rewrite properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Encrypt URL parameters
- Description: Keep target web objects with URL parameter encryption disabled
- Type: `enum{Use Environment property value,No,Session key,Site key}`
- Options:
	* `Use Environment property value`: Inherit encryption behavior from environment
	* `No`: Disable URL parameter encryption for rewrite compatibility
	* `Session key`: Encrypt URL parameters with session-scoped key
	* `Site key`: Encrypt URL parameters with site-scoped key
- Dependants: `Parameters Style`, `Web User Experience`

## Parameters Style
- Description: Use named parameters in environment routing configuration
- Type: `enum{Use Environment property value,Named,Positional}`
- Options:
	* `Use Environment property value`: Inherit parameter style from environment
	* `Named`: Use named parameters required by URL rewrite mappings
	* `Positional`: Use ordered parameters without explicit names
- Dependants: `Encrypt URL parameters`

## Web User Experience
- Description: Prefer smooth navigation mode on affected web objects
- Type: `enum{Smooth,Previous versions compatible}`
- Options:
	* `Smooth`: Use modern navigation behavior compatible with URL rewrite
	* `Previous versions compatible`: Keep legacy navigation compatibility mode
- Dependants: `Encrypt URL parameters`
