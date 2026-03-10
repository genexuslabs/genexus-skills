---
name: module-gam-session
description: GAMSession external object for current session inspection
---

Defines current-session state and role context for access decisions through `GAMSession` object

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-error.md](./module-gam-error.md)
- [module-gam-session-log.md](./module-gam-session-log.md)

---

# PROPERTIES

## IsAnonymous
Anonymous session status

Syntax: `<anonymous> = GAMSession.IsAnonymous`

Where:
- `<anonymous>`: Anonymous session status

---

# METHODS

## Get
Gets current session info

Syntax: `<session> = GAMSession.Get(<errors>)`

Where:
- `<errors>`: Collection of `GAMError` output
- `<session>`: Current session instance (`GAMSession`)

## GetRoles
Gets roles of current session/user

Syntax: `<roles> = GAMSession.GetRoles(<errors>)`

Where:
- `<errors>`: Collection of `GAMError` output
- `<roles>`: Collection of `GAMRole` for the current session/user

## IsValid
Checks if a session is valid

Syntax: `<valid> = GAMSession.IsValid(<session>, <errors>)`

Where:
- `<session>`: Session instance to validate
- `<errors>`: Collection of `GAMError` output
- `<valid>`: Session validity success status

---

# EXAMPLE
Authorize access to `SalesPortal` manager dashboard using current GAM session
~~~
&IsAnon = GAMSession.IsAnonymous
If &IsAnon
	msg(!"Anonymous session: login required")
	Return
EndIf

&Session = GAMSession.Get(&Errors)
If &Errors.Count > 0
	msg(!"Session read failed")
	Return
EndIf

&IsValid = GAMSession.IsValid(&Session, &Errors)
If NOT &IsValid
	msg(!"Invalid session")
	Return
EndIf

&SessionRoles = GAMSession.GetRoles(&Errors)
If &Errors.Count > 0
	msg(!"Role list failed")
	Return
EndIf

&HasSalesManagerRole = False
For &Role in &SessionRoles
	If &Role.Name = !"SalesManager"
		&HasSalesManagerRole = True
		Exit
	EndIf
EndFor

If NOT &HasSalesManagerRole
	msg(!"Access denied: SalesManager role required")
	Return
EndIf

msg(!"Access granted: opening dashboard")
~~~
