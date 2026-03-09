---
name: properties-common-integrated-security
description: Shared integrated security properties for object property definitions
---

Use this file as the common definition for integrated security property groups

---

# INTEGRATED SECURITY

## Integrated Security Level
- Description: Authentication and authorization requirement level
- Type: `enum{None,Authentication,Authorization}`
- Options:
	* `None`: No security checks are enforced for the object
	* `Authentication`: Requires a logged-in user, without permission checks
	* `Authorization`: Requires authentication and permission checks through GAM
- Default: `None`

## Permission Prefix
- Description: Prefix used when generating permissions
- Type: `string`
