---
name: object-index
description: Ordered attribute list for table query optimization
---

Defines index structure referenced by a `Table` object

---

# DEFINITION
An `Index` object (or `IDX`) defines an ordered list of attributes

Each `Index` is associated with one owner [Table](./object-table.md) and is referenced from the table `#Indexes` section

---

# SYNTAX
~~~
Index <prefix><name>
{
	<attributes>

	#Index
		"Type" = "<type>"
		"Source" = "<source>"
	#End

	#Properties
		<properties>
	#End
}
~~~

Where:
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<prefix>`: Object purpose prefix
	* Use `I` when defining for PK index names
	* Use `U` when defining for non-PK user or custom index names
- `<attributes>`: Ordered attribute list, one attribute per line
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-index.md))
- `<type>`: Defines index behavior; values:
	* `Duplicate` (default): Can have duplicated values
	* `NoDuplicate`: No PK but unique, exclusive for `DataView` objects
	* `Unique`: Cannot have duplicated values
- `<source>`: Defines index source; values:
	* `Automatic` (default): Automatically created; e.g. PK attributes
	* `User`: User custom index

Notes:
- Attribute order defines key precedence
- Attributes in `( )` indicate descending; e.g. `(ProductRate)`
- Attributes defined as `Unique` represent CK constraints
- User/custom indexes (with `U` prefix) must define `User` source

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `index`

Scoped filename for single-file mode:
- `<name>.index.main.gx`

Scoped filename for multi-file mode:
- `<name>.index.main.gx`
- `<name>.index.properties.toml`

Where:
- `<name>` matches the owner `Table` name (without purpose prefix)

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Never duplicate attributes in the same index
- Use only attributes from owner table structure

---

# DECISION RULES
- Define one index for the table PK order
- Add non-PK indexes only for frequent filter/join/order patterns
- Order attributes by expected left-prefix usage
- Use `Unique` for FK indexes that enforce 1:1 semantics
- Never define `#Index` section when souce/type have default values
- Never create indexes without a concrete navigation case

---

# EXAMPLES

## Example 1
Indexes for lookup and ordering patterns
~~~
Transaction Attraction
{
	AttractionId* [ DataType = 'Numeric(10.0)', Autonumber = 'True' ]
	AttractionName! [ DataType = 'VarChar(80)' ]
	AttractionPhoto [ DataType = 'Image' ]
	CategoryId [ DataType = 'Numeric(4.0)' ]
	CountryId [ DataType = 'Numeric(4.0)' ]

	#Rules
	#End

	#Events
	#End

	#Variables
	#End
}
~~~

~~~
Table Attraction
{
	AttractionId*
	AttractionName
	AttractionPhoto
	CategoryId
	CountryId

	#Indexes
		IAttraction
		UAttractionByCategory
		UAttractionByCountry
	#End
}
~~~

~~~
Index IAttraction
{
	AttractionId
}
~~~

~~~
Index UAttractionByCategory
{
	CategoryId

	#Index
		"Source" = "User"
	#End
}
~~~

~~~
Index UAttractionByCountry
{
	CountryId

	#Index
		"Source" = "User"
	#End
}
~~~

## Example 2
Unique index over FK
~~~
Table CustomerProfile
{
	CustomerProfileId*
	CustomerProfileBio
	CustomerId

	#Indexes
		ICustomerProfile
		UCustomerProfileByCustomer
	#End
}
~~~

~~~
Index ICustomerProfile
{
	CustomerProfileId
}
~~~

~~~
Index UCustomerProfileByCustomer
{
	CustomerId

	#Index
		"Source" = "User"
		"Type" = "Unique"
	#End
}
~~~
