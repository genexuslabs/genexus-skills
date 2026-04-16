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
- `<attributes>`: Attribute list, one attribute per line
- `<indexes>`: Index names referenced by the table, one per line
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-table.md)
- `<documentation>`: Optional object documentation; check [common-markdown](./common-markdown.md)

Notes:
- Attribute markers: `*` primary key, `!` description, `?` nullable
- Section `#Indexes` lists referenced `Index` object names
- Use extra user indexes only for frequent filtering or ordering
- Avoid redundant indexes due to insert/update/delete maintenance cost

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `table`

Scoped filename for single-file mode:
- `<name>.table.main.gx`

Scoped filename for multi-file mode:
- `<name>.table.main.gx`
- `<name>.table.properties.toml`
- `<name>.table.documentation.md`

Where:
- `<name>` matches the owner `Transaction` or `Transaction + Level` name

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Use PascalCase singular noun for table name
- Include at least one PK attribute with `*`
- Place PK attributes first
- Never duplicate attribute names
- Define PK index in `#Indexes`
- Define FK indexes when table has FK attributes
- Reference only existing `Index` object names
- Keep 1:1 mapping between `#Indexes` entries and owner-table `Index` definitions
- Never duplicate names in `#Indexes` region
- For 1:1 over FK, enforce uniqueness with related index configuration
- Use `I` prefix for PK index names in `#Indexes`
- Use `U` prefix for non-PK user/custom index names in `#Indexes`

---

# EXAMPLES

## Example 1
Single-level transaction and derived table
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
Two-level transaction and derived tables
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

~~~
Table Company
{
	CompanyId*
	CompanyName

	#Indexes
		ICompany
	#End
}

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
Table with FK
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
