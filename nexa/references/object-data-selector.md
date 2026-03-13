---
name: object-data-selector
description: Reusable filter definition applied to data queries
---

Defines reusable filters for data queries with parameters and conditions

---

# DEFINITION
A `DataSelector` object defines reusable filter applied to data queries

---

# SYNTAX
~~~
DataSelector <name>
{
	#Parameters
		<parameters>
	#End

	#Conditions
		<conditions>
	#End

	#Orders
		<orders>
	#End

	#DefinedBy
		<attributes>
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
- `<parameters>`: Input parameters (name starts with `&`, mandatory `DataType`); omit if none
- `<conditions>`: Boolean filters (comparisons, operators, functions, formulas); multiple lines imply `AND`
- `<orders>`: Sorting attributes (comma-separated; compound allowed)
- `<attributes>`: Attributes defining the base table when not inferred
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-data-selector.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

Notes:
- Attributes in `<conditions>`, `<orders>`, `<attributes>` must exist in Transactions
- `<conditions>`, `<orders>`, `<attributes>` sections must end with `;` + line break
- `#Orders`: attributes in `( )` indicate descending (e.g. `(CustomerName)` = Z→A)
- `#DefinedBy` must be empty if the base table is unambiguous
- DataSelector objects can be invoked with `USING` in:
	* `For Each` commands; e.g. `For Each Customer Using SelectPremiumCustomers() … EndFor`
	* `DataProvider` objects; e.g. `Customer Using SelectPremiumCustomers() { … }`
	* Aggregates; e.g. `Average(CustomerAge, SelectPremiumCustomers(), 0)`

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `dataselector`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Reuse `DataSelector` object across caller objects
- Define `#Parameters` section only for dynamic filters
- Define one condition per `#Conditions` line; implicit `AND` for all lines

---

# EXAMPLES

## Example 1
Simple DataSelector
~~~
DataSelector FilterByMembership
{
	#Parameters
	#End

	#Conditions
		CustomerMembership >= CustomerMembershipType.Gold;
		Age(CustomerBirthDate) >= 18;
	#End

	#Orders
		CustomerName;
	#End

	#DefinedBy
	#End
}
~~~

## Example 2
Parameterized DataSelector
~~~
DataSelector FlightsDepartedRange
{
	#Parameters
		&StartDate [ DataType = 'DateTime' ]
		&EndDate [ DataType = 'DateTime' ]
	#End

	#Conditions
		FlightStatus = OperationStatus.Departed;
		FlightDate >= &StartDate;
		FlightDate <= &EndDate;
	#End

	#Orders
	#End

	#DefinedBy
	#End
}
~~~
