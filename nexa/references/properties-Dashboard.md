# DASHBOARD Properties

## Integrated Security

- `IntegratedSecurityLevel` (Combo) — Integrated Security Level. Establishes whether the object will have security enforced.
		Values:
		Authentication-> Security will be enforced. Object security checks will be done automatically when retrieving data or metadata from the server, and only Authentication will be checked. This is the default value at Version level.
		Authorization-> Security will be enforced. Object security checks will be done automatically when retrieving data or metadata from the server. Authentication and Authorization will be automatically checked. Permissions will be generated in the GAM Database.
		None-> Security will not be enforced.. Values: None, Authentication, Authorization
- `IntegratedSecurityPermissionPrefix` (Text) — Permission Prefix. Generates permissions automatically for the Application where the object belongs.
