---
name: properties-object-external-object
description: Configurable external object properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Type
- Description: Type definition for the element
- Type: `enum{Native Object,Stored Procedure,WSDL,Java Session Bean,SAP Connector Interface}`
- Options:
	* `Native Object`: Uses native object integration
	* `Stored Procedure`: Uses database stored procedure integration
	* `WSDL`: Uses WSDL-based service definition
	* `Java Session Bean`: Uses Java Session Bean integration mode
	* `SAP Connector Interface`: Uses SAP Connector Interface integration
- Default: `Native Object`

## Namespace
- Description: Namespace used when generating external references
- Type: `string`

## ImporterVersion
- Description: Version metadata used by generation and deployment
- Type: `string`

## SourceURI
- Description: Source URI used to import external object metadata
- Type: `string`

---

# DOTNET FRAMEWORK INFORMATION

## .Net External Name
- Description: Name used by generation and external references
- Type: `string`

## AssemblyName
- Description: Name used by generation and external references
- Type: `string`

## .Net Constructor Parameters
- Description: Constructor arguments used in .NET runtime binding
- Type: `string`

---

# DOTNET INFORMATION

## .Net Core External Name
- Description: Name used by generation and external references
- Type: `string`

## NetCoreAssemblyName
- Description: Name used by generation and external references
- Type: `string`

## NetCorePackageName
- Description: Name used by generation and external references
- Type: `string`

## NetCorePackageVersion
- Description: Version metadata used by generation and deployment
- Type: `string`

## .Net Core Constructor Parameters
- Description: Constructor arguments used in .NET Core runtime binding
- Type: `string`

---

# JAVA INFORMATION

## Java External Name
- Description: Name used by generation and external references
- Type: `string`

## JavaArtifactId
- Description: Artifact id used to resolve Java dependency
- Type: `string`

## JavaArtifactVersion
- Description: Version metadata used by generation and deployment
- Type: `string`

## External Package Name
- Description: Name used by generation and external references
- Type: `string`

## Java Constructor Parameters
- Description: Constructor arguments used in Java runtime binding
- Type: `string`

---

# RUBY INFORMATION

## Ruby External Name
- Description: Name used by generation and external references
- Type: `string`

## Required file
- Description: Runtime file required by Ruby integration
- Type: `string`

## Ruby Constructor Parameters
- Description: Constructor arguments used in Ruby runtime binding
- Type: `string`

---

# IOS INFORMATION

## iOS External Name
- Description: Name used by generation and external references
- Type: `string`

## Library Name
- Description: Name used by generation and external references
- Type: `string`

## Header File Name
- Description: Name used by generation and external references
- Type: `string`

---

# ANDROID INFORMATION

## Android External Name
- Description: Name used by generation and external references
- Type: `string`

## External Package Name
- Description: Name used by generation and external references
- Type: `string`

---

# JAVASCRIPT INFORMATION

## Javascript External Name
- Description: Name used by generation and external references
- Type: `string`

## Javascript Referenced file
- Description: JavaScript file loaded for external object runtime
- Type: `string`

---

# JAVASCRIPT MODULE INFORMATION

## Javascript Module Name
- Description: Name used by generation and external references
- Type: `string`

## Javascript Module Path
- Description: Path used to locate related resources
- Type: `string`

## Javascript Module Reference
- Description: Reference used to install or resolve module dependency
- Type: `string`

---

# EXTERNAL OBJECT METHOD PROPERTIES

## Internal Name
- Description: Internal identifier used in generated code
- Type: `string`

## Type
- Description: Type definition for the element
- Type: `string`

## Based on
- Description: Base attribute or domain used for definition
- Type: `string`

## XML Name
- Description: XML element name used in serialization
- Type: `string`

---

# EXTERNAL OBJECT PROPERTY PROPERTIES

## Property Type
- Description: Access mode for external object property
- Type: `enum{Read/Write,Read,Write,Member}`
- Options:
	* `Read/Write`: Allows both read and write access
	* `Read`: Allows read access only
	* `Write`: Allows write access only
	* `Member`: Exposes the item as a member
- Default: `Read/Write`

## Collection Item Name
- Description: Element name used inside collections
- Type: `string`

## ControlType
- Description: UI control used to edit or display the value
- Type: `enum{Combo Box,Radio Button,Edit,Check Box,Dynamic Combo Box,List Box,Dynamic List Box,Image}`
- Options:
	* `Combo Box`: Renders a drop-down selector with fixed values
	* `Radio Button`: Renders mutually exclusive options as radio buttons
	* `Edit`: Renders a standard editable input field
	* `Check Box`: Renders a boolean value as a checkbox
	* `Dynamic Combo Box`: Renders a drop-down selector loaded dynamically
	* `List Box`: Renders a visible list selector with fixed values
	* `Dynamic List Box`: Renders a visible list selector loaded dynamically
	* `Image`: Renders the value as an image
- Default: `Edit`
