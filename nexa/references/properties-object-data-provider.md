---
name: properties-object-data-provider
description: Configurable data provider properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Expose as Web Service
- Description: Publishes the object as a web service endpoint
- Type: `boolean`
- Default: `False`

## Main program
- Description: To specify that the object is main. That is: it can be executed as standalone application
- Type: `boolean`
- Default: `False`

## Call protocol
- Description: Define how the object is invoked, and its output
- Type: `enum{Internal,HTTP,Command Line,SOAP,Enterprise Java Bean}`
- Options:
	* `Internal`: Executes internally within the application runtime
	* `HTTP`: Exposes or invokes behavior over HTTP
	* `Command Line`: Enables command-line invocation
	* `SOAP`: Exposes or invokes behavior as SOAP service
	* `Enterprise Java Bean`: Uses Enterprise Java Bean integration mode
- Default: `Internal`


---

# OUTPUT

## Infer Structure
- Description: Infers output SDT from assignment structure
- Type: `enum{Yes,if SDT is dynamic,No}`
- Options:
	* `Yes`: Enables this behavior
	* `if SDT is dynamic`: Applies only when the SDT is dynamic
	* `No`: Disables this behavior
- Default: `No`

## Output
- Description: Type
- Type: `string`

## Collection
- Description: Indicates whether output is a collection
- Type: `boolean`
- Default: `False`


---

# NETWORK
Use [common network properties](./properties-common-network.md)

---

# OBSERVABILITY
Use [common observability properties](./properties-common-observability.md)

---

# INTEGRATED SECURITY
Use [common integrated security properties](./properties-common-integrated-security.md)

---

# WARNING MESSAGES
Use [common warning messages properties](./properties-common-warning-messages.md)
