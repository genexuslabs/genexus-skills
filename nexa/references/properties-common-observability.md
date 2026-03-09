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
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `No`
