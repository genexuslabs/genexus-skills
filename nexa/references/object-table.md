---
name: object-table
description: Physical table object owned by a Transaction with explicit index references
---

Defines physical structure linked to a `Transaction` and related indexes

---

# DEFINITION
A `Table` object (or `TBL`) defines physical persistence structure

Each `Table` depends on an owner [Transaction](./object-transaction.md) defining each attribute plus index definitions

---

# SYNTAX
~~~
Table <name>
{
	<attributes>

	#Indexes
		<indexes>
	#End

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
- `<attributes>`: Attribute name list, one per line; automatically derived (do not edit)
- `<indexes>`: Index definition list; see [INDEX](#index) section
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-table.md)
- `<documentation>`: Optional object documentation; see [markdown](./common-markdown.md)

Notes:
- Attribute markers: `*` primary key, `!` description, `?` nullable

---

# INDEX
Enables efficient data access, uniqueness, and referential integrity

Syntax:
~~~
<name>
[
	Type = '<type>',
	Source = '<source>',
	<properties>
]
{
	<attributes>
}
~~~

Where:
- `<name>`: Index name using alphanumeric or underscore, starting with:
	- `I` for automatic indexes (`<source> = Automatic`); forbid generate
	- `U` for user (custom) indexes (`<source> = User`)
- `<type>`: Defines index behavior; values:
	- `Duplicate` (default): Can have duplicated values
	- `Unique`: Cannot have duplicated values
- `<source>`: Defines index source; values:
	- `Automatic` (default): Automatically created; e.g. PK attributes
	- `User`: User custom index
- `<properties>`: Optional properties in TOML syntax; see [properties](./properties-object-index.md)
- `<attributes>`: Ordered index attribute composition; write one attribute per line

Rules:
- Only create user indexes (`U` prefixed) if justified
- Never create or update automatic indexes (`I` prefixed)
- Never duplicate attributes in the same index
- Use only attributes from owner table structure

Notes:
- Attributes order in composition defines key precedence
- Attributes defined as `Unique` represent CK constraints
- Attributes in `( )` indicate descending order; e.g. `(ProductRate)`

---

# OUTPUT
Use [global-output](./global-output.md) with:
- Location: `#tables/`
- Boundary: `<name>` matches the owner `Transaction` or `Transaction + Level` name

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Never create `Table` objects
- Never modify `<attributes>` list; auto-derived from owner `Transaction` object
- Only update `<indexes>` list with user index definitions
- Never duplicate names in `<indexes>` list
- Avoid redundant indexes; reduce maintenance cost
- Ensure `Unique` user index for 1:1 relationships over FK attributes

---

# EXAMPLES

## Example 1
Single-level transaction
~~~
Transaction Country
{
	CountryId* [ DataType = 'Numeric(4.0)' ]
	CountryName! [ DataType = 'VarChar(40)' ]

	#Rules
	#End

	#Events
	#End

	#Variables
	#End
}
~~~

Derived table with auto index reference
~~~
Table Country
{
	CountryId*
	CountryName

	#Indexes
		ICountry
		[
			Type = "Unique",
			Source = "Automatic"
		]
		{
			CountryId
		}
	#End
}
~~~

## Example 2
Two-level transaction
~~~
Transaction Company
{
	CompanyId* [ DataType = 'Numeric(6.0)' ]
	CompanyName! [ DataType = 'VarChar(80)' ]

	Branch
	{
		BranchId* [ DataType = 'Numeric(4.0)' ]
		BranchAddress [ DataType = 'VarChar(120)' ]
		BranchPhone [ DataType = 'VarChar(30)' ]
	}

	#Rules
	#End

	#Events
	#End

	#Variables
	#End
}
~~~

Derived outer table
~~~
Table Company
{
	CompanyId*
	CompanyName

	#Indexes
		ICompany
		[
			Type = "Unique",
			Source = "Automatic"
		]
		{
			CompanyId
		}
	#End
}
~~~

Derived inner table
~~~
Table CompanyBranch
{
	CompanyId*
	BranchId*
	BranchAddress
	BranchPhone

	#Indexes
		ICompanyBranch
		[
			Type = "Unique",
			Source = "Automatic"
		]
		{
			CompanyId
			BranchId
		}
		ICompanyBranchByAddress
		[
			Type = "Duplicate",
			Source = "Automatic"
		]
		{
			BranchAddress
		}
	#End
}
~~~

## Example 3
Transaction with unique FK for 1:1 relationship
~~~
Transaction Customer
{
	CustomerId* [ DataType = 'Numeric(8.0)' ]
	CustomerName! [ DataType = 'VarChar(80)' ]
	ProfileId [ DataType = 'Attribute:ProfileId' ]
	ProfileAvatar [ DataType = 'Attribute:ProfileAvatar' ]

	#Rules
	#End

	#Events
	#End

	#Variables
	#End
}
~~~

Derived table
~~~
Table Customer
{
	CustomerId*
	CustomerName
	ProfileId

	#Indexes
		ICustomer
		[
			Type = "Unique",
			Source = "Automatic"
		]
		{
			CustomerId
		}
		UCustomerByProfile
		[
			Type = "Unique",
			Source = "User"
		]
		{
			ProfileId
		}
	#End
}
~~~
