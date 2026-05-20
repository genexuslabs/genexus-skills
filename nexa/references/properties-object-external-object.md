---
name: properties-object-external-object
description: Configurable external object properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL
Include [General](./properties-common.md) properties

## Type
Integration kind used to consume the external implementation
- Type: `enum{Native Object,Stored Procedure,WSDL,Java Session Bean,SAP Connector Interface}`
- Options:
	* `Native Object`: Uses native object integration
	* `Stored Procedure`: Uses database stored procedure integration
	* `WSDL`: Uses WSDL-based service definition
	* `Java Session Bean`: Uses Java Session Bean integration mode
	* `SAP Connector Interface`: Uses SAP Connector Interface integration
- Default: `Native Object`

## Namespace
Namespace used when generating external references
- Type: `string`

## ImporterVersion
Importer version used to track the source metadata format
- Type: `string`

## SourceURI
Source URI used to import external object metadata
- Type: `string`

---

# DOTNET FRAMEWORK INFORMATION

## .Net External Name
.NET runtime type name used to bind the external implementation
- Type: `string`

## AssemblyName
.NET assembly name that contains the external implementation
- Type: `string`

## .Net Constructor Parameters
Constructor arguments used in .NET runtime binding
- Type: `string`

---

# DOTNET INFORMATION

## .Net Core External Name
.NET runtime type name used to bind the external implementation
- Type: `string`

## NetCoreAssemblyName
.NET assembly name that contains the external implementation
- Type: `string`

## NetCorePackageName
NuGet package name used to resolve the dependency
- Type: `string`

## NetCorePackageVersion
NuGet package version used to resolve the dependency
- Type: `string`

## .Net Core Constructor Parameters
Constructor arguments used in .NET Core runtime binding
- Type: `string`

---

# JAVA INFORMATION

## Java External Name
Java class name used to bind the external implementation
- Type: `string`

## JavaArtifactId
Artifact id used to resolve Java dependency
- Type: `string`

## JavaArtifactVersion
Maven artifact version used to resolve the dependency
- Type: `string`

## External Package Name
Java package that contains the external class
- Type: `string`

## Java Constructor Parameters
Constructor arguments used in Java runtime binding
- Type: `string`

---

# RUBY INFORMATION

## Ruby External Name
Ruby class or module name used to bind the external implementation
- Type: `string`

## Required file
Runtime file required by Ruby integration
- Type: `string`

## Ruby Constructor Parameters
Constructor arguments used in Ruby runtime binding
- Type: `string`

---

# IOS INFORMATION

## iOS External Name
iOS class name used to bind the external implementation
- Type: `string`

## Library Name
iOS library name that contains the external implementation
- Type: `string`

## Header File Name
iOS header file that declares the external implementation
- Type: `string`

---

# ANDROID INFORMATION

## Android External Name
Android class name used to bind the external implementation
- Type: `string`

## External Package Name
Android package that contains the external class
- Type: `string`

---

# JAVASCRIPT INFORMATION

## Javascript External Name
JavaScript symbol name used to bind the external implementation
- Type: `string`

## Javascript Referenced file
JavaScript file loaded for external object runtime
- Type: `string`

---

# JAVASCRIPT MODULE INFORMATION

## Javascript Module Name
JavaScript module name used to import the dependency
- Type: `string`

## Javascript Module Path
Path used to resolve the JavaScript module location
- Type: `string`

## Javascript Module Reference
Reference used to install or resolve module dependency
- Type: `string`

---

# EXTERNAL OBJECT METHOD PROPERTIES

## Internal Name
Internal identifier used in generated code
- Type: `string`

## Type
GeneXus data type used by the external method member
- Type: `string`

## Based on
Base attribute or domain used for definition
- Type: `string`

## XML Name
XML element name used in serialization
- Type: `string`

---

# EXTERNAL OBJECT PROPERTY PROPERTIES

## Property Type
Access mode for external object property
- Type: `enum{Read/Write,Read,Write,Member}`
- Options:
	* `Read/Write`: Allows both read and write access
	* `Read`: Allows read access only
	* `Write`: Allows write access only
	* `Member`: Exposes the item as a member
- Default: `Read/Write`

## Collection Item Name
Element name used inside collections
- Type: `string`

## ControlType
UI control used to edit or display the value
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
