---
name: properties-common-observability
description: Shared observability properties for object property definitions
---

Use this file as the common definition for observability property groups

---

# OBSERVABILITY

## Generate Observability span
- Description: Enables generation of OpenTelemetry spans for runtime tracing
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `No`
