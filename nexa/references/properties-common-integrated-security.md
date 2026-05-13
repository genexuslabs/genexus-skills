---
name: properties-common-integrated-security
description: Shared integrated security properties for object property definitions
---

Use this file as the common definition for integrated security property groups

---

# INTEGRATED SECURITY

## Integrated Security Level
Authentication and authorization requirement level
- Type: `enum{None,Authentication,Authorization}`
- Options:
	* `None`: No security checks are enforced for the object
	* `Authentication`: Requires a logged-in user, without permission checks
	* `Authorization`: Requires authentication and permission checks through GAM
- Default: Depends on the `EnableNationalLanguageSupport` property in `src/#preferences/*.kb.gx` version:
	* If `EnableNationalLanguageSupport = 'Yes'`: default is `Authentication`
	* If `EnableNationalLanguageSupport = 'No'` or not set: default is `None`

## Permission Prefix
Prefix used when generating permissions
- Type: `string`
