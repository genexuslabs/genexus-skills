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
	* `Use Environment property value`: Uses the model or environment-level encryption setting
	* `No`: Sends URL parameters without encryption
	* `Session key`: Encrypts URL parameters with a session-scoped key
	* `Site key`: Encrypts URL parameters with a site-level key
- Default: `No`

## Protocol specification
- Description: Selects HTTP or HTTPS policy for services and absolute URLs
- Type: `enum{Use Environment property value,Unsecure (HTTP:),Secure (HTTPS:),Do not specify}`
- Options:
	* `Use Environment property value`: Uses the protocol defined at model or environment level
	* `Unsecure (HTTP:)`: Forces generated absolute URLs to use HTTP
	* `Secure (HTTPS:)`: Forces generated absolute URLs to use HTTPS
	* `Do not specify`: Does not force protocol in generated URLs
