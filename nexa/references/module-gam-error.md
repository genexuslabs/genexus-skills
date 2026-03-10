---
name: module-gam-error
description: GAMError external object for error payload fields
---

Defines standard error fields returned by GAM objects used for auth through `GAMError` object

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-repository.md](./module-gam-repository.md)

---

# PROPERTIES

## Code
Error code identifier

Syntax: `<code> = GAMError.Code`

Where:
- `<code>`: Error code identifier

## Message
Human-readable error message

Syntax: `<message> = GAMError.Message`

Where:
- `<message>`: Human-readable error message

---

# METHODS

No methods are defined for `GAMError` in this reference

---

# EXAMPLE
Capture first error after a failed security operation
~~~
If &Errors.Count > 0
	&ErrorCode = &Errors.Item(1).Code
	&ErrorMessage = &Errors.Item(1).Message
EndIf
~~~
