---
name: properties-object-api
description: Configurable api properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Main program
- Description: To specify that the object is main. That is: it can be executed as standalone application
- Type: `boolean`
- Default: `False`

## REST Protocol
- Description: Enables REST endpoint generation for the object
- Type: `boolean`
- Default: `True`

## Include in MCP Server
- Description: Publishes methods as MCP tools when enabled
- Type: `boolean`
- Default: `False`

## gRPC Protocol
- Description: Enables gRPC Protocol Support
- Type: `boolean`
- Default: `False`

## Generate OpenAPI interface
- Description: Generate OpenAPI documentation \(default.yaml\) for exposed services and components
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Generates the OpenAPI contract file for the service
	* `No`: Does not generate the OpenAPI contract file
	* `Use Environment property value`: Uses the model or environment-level OpenAPI setting
- Default: `Yes`

## Generate As OpenAI Plugin
- Description: Generates Metadata for Use as OpenAI Plugin
- Type: `boolean`
- Default: `False`

## Services base path
- Description: Base path for web services
- Type: `string`


---

# MISCELLANEOUS

## GenerateObject
- Description: Enable or disable object specification and generation
- Type: `boolean`
- Default: `True`


---

# INTEGRATED SECURITY
Use [common integrated security properties](./properties-common-integrated-security.md)

---

# WARNING MESSAGES
Use [common warning messages properties](./properties-common-warning-messages.md)
