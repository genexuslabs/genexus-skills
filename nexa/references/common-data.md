---
name: common-data
description: Data elements for manipulating stored and in-memory data
---

Data elements including `Attributes` (stored), `Variables` (in-memory), and `Members` (within SDTs)

---

# SYNTAX
~~~
<name>
[
	Description = '<description>',
	DataType = '<type>',
	Collection = '<boolean>',  // only for collection variables
	<properties>
]
~~~

Where:
- `<name>`: Alphanumeric or underscore, starting with letter
- `<description>`: Purpose of element (optional but recommended)
- `<type>`: Mandatory data type definition (see [DATA TYPE PRIORITY](#data-type-priority))
- `<properties>`: Other properties (see [properties](./properties-object-attribute.md))

---

# DATA TYPE PRIORITY
Priority order for consistency:
1. `Attribute reference`: When sharing meaning with Transaction attribute
	* Syntax: `Attribute:<attribute-name>`
	* Example: `InputCountryName [ DataType = 'Attribute:CountryName' ]`
2. `Domain reference`: When matching existing Domain purpose
	* Syntax: `<domain-name>[, <module>]`
	* Example: `CustomerPhone [ DataType = 'Phone, GeneXus' ]`
	* Selection rule:
		1) Use [common-semantic-types](./common-semantic-types.md) first
		2) Use custom domains only when no semantic built-in matches
3. `Structured reference`: When matching known substructure (SDT)
	* Syntax: `<sdt-name>[, <module>]`
	* Example: `Product [ DataType = 'ProductData' ]`
3. `BusinessComponent reference`: When matching known transaction (TRN) defined as Business Component
	* Syntax: `<trn-name>[, <module>]`
	* Example: `Customer [ DataType = 'Customer, Entities' ]`
5. `Built-in type`: When none above use [common-data-types](./common-data-types.md)
	* Syntax: `<type-definition>`
	* Example: `Amount [ DataType = 'Numeric(4.0)' ]`

---

# CONSTRAINTS
- All properties in square brackets `[ … ]` as comma-separated list
- Use ampersand (`&`) only for variable references:
	* Variables: defined without `&`, referenced with `&`; e.g. `CustomerName [ … ]` (def), `&Customer.IsEmpty()` (ref)
	* Attributes: always defined and referenced without `&`
- Priority order: `Attribute` → `Domain` → `SDT` → `Business Component` → built-in type
- One line for single property, multiple lines for several properties
- All property values in single quotes
- Names use concise meaningful words, exclude function words: `CustomerBirthDate` not `CustomerDateOfBirth`
- Time elements must have `DataType = 'DateTime'` and `DateFormat = 'None'`; e.g. `FlightDelayTime [ DataType = 'DateTime', DateFormat = 'None' ]`
- Value ranges use `ValueRange` property:
	* Use `:` for intervals: `1:5` (1 to 5), `1:` (1+), `:5` (≤5)
	* Use ` ` for entries: `1 3 5` (only 1,3,5), `"Yes" "No"` (only Yes,No)
	* Combined: `:1 3:5 7:` (≤1, 3-5, 7+)
- Domain as `DataType` must match suffix and requirements: `ClientEmail [ DataType = 'Email, GeneXus' ]`
- Domain as `DataType` must not redefine domain properties: if `Id` domain has `Autonumber = 'True'`, don't redefine
- Domain usage omits "Root Module" part

---

# EXAMPLES

## Example 1
Time element
~~~
MatchTime
[
	DataType = 'DateTime',
	DateFormat = 'None',
	Description = 'Match time'
]
~~~

## Example 2
Custom domain
~~~
UserId
[
	DataType = 'Id',
	Description = 'User identifier'
]
~~~

## Example 3
Built-in domain
~~~
UserPhone
[
	DataType = 'Phone, GeneXus',
	Description = 'User phone number'
]
~~~

## Example 4
Attribute reference
~~~
OutCustomerName
[
	DataType = 'Attribute:CustomerName',
	Description = 'Output customer name'
]
~~~

## Example 5
SDT collection
~~~
Products
[
	DataType = 'ProductInfo', // being ProductInfo an existing SDT object
	Collection = 'True',
	Description = 'Product list'
]
~~~

## Example 6
Vector definition
~~~
SearchIndexes
[
	// Based on `Numeric` type with 8 digits and 0 decimals elements in a Vector of 11 cells
	DataType = 'Numeric(8.0)',
	Dimensions = 'Vector',
	Rows = '11',
	Description = 'Array of indexes'
]
~~~

## Example 7
Matrix definition
~~~
ConfusionMatrix
[
	// Based on `Numeric` type elements with 5 digits and 3 decimals in a Matrix with 2x2 cells
	DataType = 'Numeric(5.3)',
	Dimensions = 'Matrix',
	Rows = '2',
	Columns = '2',
	Description = 'Confusion matrix storing TP, TN, FP, and FN values'
]
~~~
