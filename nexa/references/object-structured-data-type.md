---
name: object-structured-data-type
description: Structured Data Type grouping members and collections into compound structures
---

Defines compound data types grouping members, sub-items, and collections for data transfer and manipulation

---

# DEFINITION
A `Structured Data Type` object (or `SDT`) is a compound type that groups members of other types and collections

---

# SYNTAX
~~~
SDT <name>
{
	<item-name>
	[
		Collection = '<collection>'
	]
	{
		<member> | <sub-item>
	}

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
- `<item-name>`: Item name (typically same as `<name>`)
- `<member>`: Member definition with `DataType` property
- `<sub-item>`: Nested substructure following `<item-name>` syntax
- `<collection>`: True if item is collection, False otherwise (omit brackets if False)
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-structured-data-type.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

---

# MEMBERS
Syntax:
~~~
<member-name>
[
	Description = '<description>',
	DataType = '<type>',
	Collection = '<collection>',
	<complement>
]
~~~

Where:
- `<member-name>`: Member name using alphanumeric or underscore, starting with letter
- `<description>`: Purpose of member (optional but recommended)
- `<type>`: Mandatory data type with priority:
	1. Attribute reference: `Attribute:<attribute-name>`
	2. Domain reference: `<domain-name>[, <module>]`
	3. Structured reference: `<sdt-name>[, <module>]`
	4. Built-in type: `Numeric`, `Character`, `VarChar`, `Date`, etc
- `<collection>`: True if collection, False otherwise
- `<complement>`: Other relevant properties (same as `Attribute` available properties)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `sdt`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Check SDT existence before updating
- Write one member per line, use tabs for indentation
- Every member must have `DataType` property
- Item name typically matches SDT name
- Collection property only when `True` (omit if False)
- Member names start with letter, alphanumeric or underscore
- Nested sub-items follow same syntax as item
- DataType priority: Attribute > Domain > SDT > Built-in
- Never duplicate member names within SDT including sub-items
- SDT can be used as variable type in Procedure or Transaction
- SDT supports serialization

---

# EXAMPLES

## Example 1
Simple SDT
~~~
SDT CustomerData
{
	CustomerData
	{
		CustomerId [ DataType = 'Numeric(10.0)' ]
		CustomerName [ DataType = 'VarChar(128)' ]
		CustomerEmail [ DataType = 'Email' ]
		CustomerPhone [ DataType = 'Phone' ]
	}
}
~~~

## Example 2
SDT with Collection
~~~
SDT OrderInfo
{
	OrderInfo
	{
		OrderId [ DataType = 'Numeric(10.0)' ]
		OrderDate [ DataType = 'Date' ]
		CustomerId [ DataType = 'Numeric(10.0)' ]
		CustomerName [ DataType = 'VarChar(128)' ]

		OrderItems
		[
			Collection = 'True'
		]
		{
			ProductId [ DataType = 'Numeric(10.0)' ]
			ProductName [ DataType = 'VarChar(128)' ]
			Quantity [ DataType = 'Numeric(5.0)' ]
			UnitPrice [ DataType = 'Numeric(10.2)' ]
			LineTotal [ DataType = 'Numeric(10.2)' ]
		}

		OrderTotal [ DataType = 'Numeric(10.2)' ]
	}
}
~~~

## Example 3
SDT with Attribute References
~~~
SDT ProductInfo
{
	ProductInfo
	{
		ProductId [ DataType = 'Attribute:ProductId' ]
		ProductName [ DataType = 'Attribute:ProductName' ]
		ProductPrice [ DataType = 'Attribute:ProductPrice' ]
		CategoryId [ DataType = 'Attribute:CategoryId' ]
		CategoryName [ DataType = 'Attribute:CategoryName' ]
	}
}
~~~

## Example 4
SDT with Nested Sub-items
~~~
SDT InvoiceData
{
	InvoiceData
	{
		InvoiceId [ DataType = 'Numeric(10.0)' ]
		InvoiceDate [ DataType = 'Date' ]

		Customer
		{
			CustomerId [ DataType = 'Numeric(10.0)' ]
			CustomerName [ DataType = 'VarChar(128)' ]
			CustomerEmail [ DataType = 'Email' ]
		}

		Items
		[
			Collection = 'True'
		]
		{
			ItemId [ DataType = 'Numeric(10.0)' ]
			Description [ DataType = 'VarChar(256)' ]
			Quantity [ DataType = 'Numeric(5.0)' ]
			Price [ DataType = 'Numeric(10.2)' ]
		}

		TotalAmount [ DataType = 'Numeric(10.2)' ]
	}
}
~~~

## Example 5
Usage in Procedure
~~~
Procedure ProcessOrder
{
	&OrderData = new()
	&OrderData.OrderId = 12345
	&OrderData.OrderDate = Today()
	&OrderData.CustomerName = !"John Doe"

	&Item = new()
	&Item.ProductId = 1
	&Item.ProductName = !"Widget"
	&Item.Quantity = 5
	&Item.UnitPrice = 9.99
	&Item.LineTotal = 49.95

	&OrderData.OrderItems.Add(&Item)

	&JsonString = &OrderData.ToJson()

	#Variables
		OrderData [ DataType = 'OrderInfo' ]
		Item [ DataType = 'OrderInfo.OrderItems' ]
		JsonString [ DataType = 'VarChar(2K)' ]
	#End
}
~~~
