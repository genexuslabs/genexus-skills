---
name: object-domain
description: Global data type definition ensuring consistency across attributes and variables
---

Reusable type definition based on built-in types or existing domains with constraints and validations

---

# DEFINITION
A `Domain` object is a reusable element based on built-in type or existing domain, representing specific concept (Price, Name, Id) with optional constraints (format, validation, default values)

---

# SYNTAX
~~~
Domain <name>
{
	#Properties
		<properties>
	#End

	#Documentation
		<documentation>
	#End
}
~~~

Where:
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-domain.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

---

# PROPERTIES
- `Data Type`: Mandatory base type: built-in type or existing domain
- `Length`: For string/numeric types
- `Decimals`: For numeric types
- `Signed`: For numeric types (allows negative values)
- `EnumValues`: For enumeration domains; see [common-enum-domain](./common-enum-domain.md) for syntax details
- `Regular Expression`: POSIX BRE or ERE pattern for validation
- `Picture`: Display formatting pattern; see [common-data-picture](./common-data-picture.md) for syntax details
- `Default`: Default value

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `domain`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Body block must be empty `{ }`; only properties are available
- Resolve `Data Type` property using [common-data-types](./common-data-types.md)
- Define `EnumValues` property for enum `Domain` object
- Use POSIX BRE or ERE syntax for `Regular Expression` property values
- Define `Domain` object only under modules; folders are forbidden
- Extend `Domain` object only from another domain; self-reference is forbidden
- Reuse built-in [Semantic Domain objects](./common-semantic-types.md); no custom duplicates

---

# EXAMPLES

## Example 1
Simple Domain
~~~
Domain ProductPrice
{
	#Properties
		"Data Type" = "Numeric(10.2)"
		"Signed" = false
	#End
}
~~~

## Example 2
String Domain with Validation
~~~
Domain ProductCode
{
	#Properties
		"Data Type" = "VarChar(32)"
		"Regular Expression" = "^[A-Z0-9_-]{3,32}$"
	#End
}
~~~

## Example 3
Enumeration Domain
~~~
Domain OrderStatus
{
	#Properties
		"EnumValues" = "Pending, Order is pending, Pending; Confirmed, Order confirmed, Confirmed; Shipped, Order shipped, Shipped; Delivered, Order delivered, Delivered; Cancelled, Order cancelled, Cancelled"
	#End
}
~~~

## Example 4
Extending Domain
~~~
Domain PositiveInteger
{
	#Properties
		"Data Type" = "Numeric(10.0)"
		"Signed" = false
	#End
}

Domain ProductQuantity
{
	#Properties
		"Data Type" = "PositiveInteger"
	#End
}
~~~

## Example 5
Domain with Picture
~~~
Domain NationalId
{
	#Properties
		"Data Type" = "Numeric(11.0)"
		"Picture" = "99.999.999-9"
	#End
}
~~~
