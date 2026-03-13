---
name: object-query
description: Complex query definition for data retrieval from multiple sources
---

Defines complex queries for data retrieval with joins, filters, and aggregations

---

# DEFINITION
A `Query` object defines complex queries for data retrieval from multiple sources

---

# SYNTAX
~~~
Query <name>
{
	<expressions>

	#Parameters
		<parameters>
	#End

	#Filters
		<filters>
	#End

	#Orders
		<orders>
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
- `<expressions>`: Non-empty list combining attributes, operators, formulas, functions, methods, and clauses
- `<parameters>`: Input parameter list, possibly empty, including names and definitions
- `<filters>`: Boolean filter (comparisons, operators, formulas, functions, methods)
- `<orders>`: Sorting expression combining attributes and formulas
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-query.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

Notes:
- Attributes specified in the `<expressions>`, `<filters>`, and `<orders>` sections must be previously defined in Transaction objects
- The `<expressions>`, `<parameters>`, `<filters>`, and `<orders>` elements must be separated by line breaks
- The `<expressions>` elements must follow the EXPRESSIONS section specification
- The `<parameters>` elements must follow the PARAMETERS section specification
- The `<filters>` elements are implicitly combined with an `AND` operator
- The `<orders>` elements may optionally include the `[ Order = 'Descending' ]` definition for specifying the sorting criteria

---

# PARAMETERS
Every parameter must follow the `<param-name> [ <param-properties> ]` syntax, where:
- `<param-name>`: Parameter name without any prefix, but referenced with ampersand (&) prefix from other sections
- `<param-properties>`: Parameter properties list separated by comma; allowed properties:
    * `DataType` (mandatory): Parameter type following the DATA TYPE specification
    * `Description`: Parameter short description purpose
    * `IsCollection`: Indicates whether the parameter is a collection ('True') or a single value ('False')
    * `Value`: Parameter default value, consistent with the defined `DataType`, used when no input is provided

---

# EXPRESSIONS
Every expression must follow the `<element-name-alias> = <element-expression> [ <element-properties> ]` syntax, where:
- `<element-name-alias>`: An optional alias name for the computed element
- `<element-expression>`: An element expression, either defined by a single attribute, a function, or a formula
- `<element-properties>`: An element properties definition sequence separated by comma

Element property definition include these properties:
- `Name`: Sets the element name using alphanumeric characters, always starting with a letter
- `Description`: Sets a brief label description for the element
- `Type`: Sets element type as slide data ('Axis', default) or relevant data ('Datum')
- `Picture`: Sets the element display format mask
- `Visible`: Sets the element is visible ('Yes', default), initially hidden ('No') or blocked hidden ('Never')
- `ShowAllValues`: Sets whether returned values come from the entire database ('True') or only from joined tables ('False', default)
- `RaiseItemClickEvent`: Sets whether Query Viewer control associated with this Query object raises `ItemClick` event ('True') or not ('False')

Only when the `"Output Type"` object property is 'Pivot Table' and `Type` element property is 'Axis', these properties are also available:
-  `Axis`: Sets element disposition as 'Rows' (default), 'Columns', or 'Pages'
-  `Subtotals`: Sets whether subtotals are shown ('Yes', default), not shown ('No'), or hidden but available at runtime ('Hidden')
-  `ExpandCollapse`: Sets whether 'Expand all values' (default), 'Expand some values', or 'Collapse all values'
-  `CanDragToPages`: Sets whether the query element can be dragged ('True') or not ('False')

---

# CLAUSES
Use clauses only inside `<element-expression>` formulas

Allowed clauses:
- `BY`: Groups data before applying the formula
	* Syntax: `<formula> BY <attribute-1>, …, <attribute-N>`
	* Allowed formulas: `Average`, `Count`, `Min`, `Max`
	* Use when you need grouped aggregates by one or more attributes
- `DEFINED BY`: Counts records from another transaction context
	* Syntax: `<formula> DEFINED BY <attribute-1>, …, <attribute-N>`
	* Allowed formulas: `Count`
	* Use when count must be driven by specific defining attributes
- `WEIGHTED BY`: Computes weighted averages
	* Syntax: `<formula> WEIGHTED BY <attribute-1>, …, <attribute-N>`
	* Allowed formulas: `Average`
	* Use when each value must contribute with a weight
- `FOR EACH`: Splits a formula result by one attribute
	* Syntax: `<formula> FOR EACH <attribute>`
	* Allowed formulas: Any formula from the query expression
	* Use when one formula must return segmented values
- `WHERE`: Filters records used by a formula
	* Syntax: `<formula> WHERE <condition>`
	* Allowed formulas: Any formula from the query expression
	* Use when the filter applies only to that formula and not to global `#Filters`

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `query`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Define join path in `#Expressions` section for multi-table `Query` object
- Define filters only in `#Filters` section
- Define sort only in `#Orders` section
- Allowed aggregation formulas: `Count`, `Sum`, `Average`, `Min`, `Max`
- Allowed clause set: `BY`, `DEFINED BY`, `WEIGHTED BY`, `FOR EACH`, `WHERE`

---

# EXAMPLES

## Example 1
Get average `User` age grouped by gender
~~~
Query AvgUserAgeByGender
{
    Element1 = UserGender [ Description = 'Gender', ExpandCollapse = 'Expand some values', RaiseItemClickEvent = 'False' ]
    Element2 = Average(UserAge) [ Description = 'Age Average', Picture = 'Z9' ]

	#Parameters
	#End

    #Filters
        UserAge > 0
    #End

    #Orders
        UserGender
    #End

	#Properties
		"Title" = "Average user age by gender"
		"Output Type" = "Card"
	#End
}
~~~

## Example 2
Monthly `Sale` amount in a date range
~~~
Query MonthlySales
{
    Element1 = Month(SaleDate) [ Description = 'Month' ]
    Element2 = Sum(SaleAmount) [ Description = 'Total amount' ]

	#Parameters
		FromDate [ DataType = 'Date' ]
		ToDate [ DataType = 'Date' ]
	#End

    #Filters
        SaleDate >= &FromDate;
		SaleDate <= &ToDate;
    #End

    #Orders
        Month(SaleDate)
    #End

	#Properties
		"Title" = "Monthly sales in date range"
		"Output Type" = "Pivot Table"
	#End
}
~~~

## Example 3
Count `Customer` with sales using `DEFINED BY` clause
~~~
Query CustomersWithSales
{
    Element1 = Count(CustomerId) DEFINED BY SaleDate [ Description = 'Customers with sales' ]

	#Parameters
	#End

    #Filters
    #End

    #Orders
    #End

	#Properties
		"Title" = "Number of customers with sales"
		"Output Type" = "Chart"
	#End
}
~~~

## Example 4
Total `Covid` deaths by year split with `FOR EACH` clause
~~~
Query DeathsPerYearAndCountry
{
    Element1 = Year(CovidDate) [ Description = 'Year' ]
    Element2 = Sum(CovidDeathCount) FOR EACH CountryName [ Description = 'Countries' ]

	#Parameters
	#End

    #Filters
    #End

    #Orders
        Year(CovidDate) [ Order = 'Descending' ]
    #End

	#Properties
		"Title" = "Total deaths by year and country"
		"Output Type" = "Chart"
	#End
}
~~~
