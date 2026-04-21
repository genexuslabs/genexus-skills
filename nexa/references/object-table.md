---
name: object-table
description: Physical table object owned by a Transaction with explicit index references
---

Defines physical structure linked to a `Transaction` and related `Index` objects

---

# DEFINITION
A `Table` object (or `TBL`) defines physical persistence structure

Each `Table` depends on an owner [Transaction](./object-transaction.md) defining each attribute plus [Index](./object-index.md) references

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
- `<attributes>`: Attribute name list, one per line; automatilly derived (do not edit)
- `<indexes>`: Index names list, one per line
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-table.md)
- `<documentation>`: Optional object documentation; check [common-markdown](./common-markdown.md)

Notes:
- Attribute markers: `*` primary key, `!` description, `?` nullable

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `table`

Note: `<name>` matches the owner `Transaction` or `Transaction + Level` name

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Never create `Table` objects
- Never modify `<attribute>` list; auto-derived from ownner `Transaction` object
- Only update `<indexes>` list with existing user `Index` object names
- Never duplicate names in `<indexes>` list
- Avoid redundant indexes; reduce mantainance cost
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
		UCompanyBranchByAddress
	#End
}
~~~

## Example 3
Transaction with FK
~~~
Transaction Customer
{
	CustomerId* [ DataType = 'Numeric(8.0)' ]
	CustomerName! [ DataType = 'VarChar(80)' ]
	CountryId [ DataType = 'Attribute:CountryId' ]
	CountryName [ DataType = 'Attribute:CountryName' ]

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
	CountryId

	#Indexes
		ICustomer
		UCustomerByCountry
	#End
}
~~~
