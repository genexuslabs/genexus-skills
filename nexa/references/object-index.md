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
	* Use `I` when defining for automatic indexes
	* Use `U` when defining for user (custom) indexes; require `<source> = User`
- `<attributes>`: Ordered attribute list, one attribute per line
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-index.md)
- `<type>`: Defines index behavior; values:
	* `Duplicate` (default): Can have duplicated values
	* `NoDuplicate`: No PK but unique, exclusive for `DataView` objects
	* `Unique`: Cannot have duplicated values
- `<source>`: Defines index source; values:
	* `Automatic` (default): Automatically created; e.g. PK attributes
	* `User`: User custom index

Notes:
- Indexes are meant for frequent filtering, fast ordering, or ensure uniqueness
- Attribute order defines key precedence
- Attributes in `( )` indicate descending; e.g. `(ProductRate)`
- Attributes defined as `Unique` represent CK constraints

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `index`

Note: `<name>` matches the owner `Table` name (without purpose prefix)

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Only create user `Index` objects (if justified)
- Never create or update automatic `Index` objects
- Never duplicate attributes in the same index
- Use only attributes from owner table structure

---

# EXAMPLES

## Example 1
User indexes for lookup and ordering patterns
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
Index UAttractionByCategory
{
	CategoryId

	#Index
		Source = "User"
	#End
}
~~~

~~~
Index UAttractionByCountry
{
	CountryId

	#Index
		Source = "User"
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
Index UCustomerProfileByCustomer
{
	CustomerId

	#Index
		Source = "User"
		Type = "Unique"
	#End
}
~~~
