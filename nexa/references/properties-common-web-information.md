---
name: properties-common-web-information
description: Shared web-information properties for object property definitions
---

Use this file as the common definition for web-information property groups

---

# WEB INFORMATION

## Encrypt URL parameters
- Description: Configures URL parameter encryption for web invocation and routing
- Type: `enum{Use Environment property value,No,Session key,Site key}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Session key`: Use this value when it matches the target behavior
	* `Site key`: Use this value when it matches the target behavior
- Default: `No`

## Protocol specification
- Description: Selects HTTP or HTTPS policy for services and absolute URLs
- Type: `enum{Use Environment property value,Unsecure (HTTP:),Secure (HTTPS:),Do not specify}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `Unsecure (HTTP:)`: Use this value when it matches the target behavior
	* `Secure (HTTPS:)`: Use this value when it matches the target behavior
	* `Do not specify`: Use this value when it matches the target behavior
