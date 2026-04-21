---
name: common-attribute-types
description: Classification of attributes by purpose and storage in Transaction objects
---

Attributes in Transactions are classified by their role in data modeling and storage

---

# DEFINITION
Each `Attribute` defines operational semantics within a `Transaction` object, including behavior, constraints, and relationships

---

# TYPES

## Primary Key (PK)
Uniquely identifies each record within a transaction level

Syntax: Attribute name suffixed with asterisk `*`

Keypoints:
- Must be first attribute(s) in level
- Cannot be null
- Enforces uniqueness; automatically raises errors on duplicates
- Can be simple (single attribute) or compound (multiple attributes)

Patterns:

Simple PK:
~~~
Transaction Product
{
	ProductId* [ DataType = 'Numeric(10.0)', Autonumber = 'True' ]
	ProductName! [ DataType = 'VarChar(64)' ]
}
~~~

Compound PK:
~~~
Transaction Enrollment
{
	StudentId* []
	CourseId* []
	EnrollmentDate [ DataType = 'Date' ]
}
~~~

Surrogate PK (when no natural key exists):
- Convention: `<name>Id`
- Type: `Numeric` with `'Autonumber' = 'True'`
- Example: `CustomerId*`, `OrderId*`, `InvoiceId*`

~~~
Transaction Customer
{
	CustomerId* [ DataType = 'Numeric(10.0)', Autonumber = 'True' ]
	…
}
~~~

Constraints:
- Compound keys should be avoided when possible; prefer surrogate keys
- Avoid FK as part of compound PK when possible

---

## Foreign Key (FK)
References the PK of another transaction, establishing relationships

Syntax: Attribute with empty brackets `[]` (infers type from referenced transaction)

Keypoints:
- Enables navigation between transactions
- Can be nullable (if relationship is optional)
- Automatically infers DataType from referenced transaction
- Enforces referential integrity (STRONG relationship)

Example:
~~~
Transaction City
{
	CityId* [ DataType = 'Numeric(10.0)' ]
	CityName! [ DataType = 'VarChar(64)' ]
	CountryId [] // FK to Country
	CountryName [] // Extended attribute from Country
}
~~~

Constraints:
- Must reference existing transaction PK
- Use `[]` to infer type; manual DataType definition is redundant and discouraged

---

## Candidate Key (CK)
Uniquely identifies records but is not the primary key

Keypoints:
- Enforced via Unique User Index in underlying table
- Can be used as alternative identifier
- Not marked with special syntax in structure; enforced via properties

Implementation: Define User Index with Unique property in Transaction properties

---

## Extended Attribute
Declared in transaction but physically stored in another related transaction

Keypoints:
- Values retrieved from referenced transaction via FK relationship
- Not stored locally (read-only in this transaction)
- Inferred automatically when FK relationship exists
- Denoted by empty brackets `[]` when based on FK

Example:
~~~
Transaction City
{
	CityId* [ DataType = 'Numeric(10.0)' ]
	CityName! [ DataType = 'VarChar(64)' ]
	CountryId [] // FK to Country
	CountryName [] // Extended attribute from Country
}
~~~

---

## Subtyped Attribute
Alias for existing attribute representing different role or context

Syntax: Attribute referencing a `SubType Group` object by name with empty braces `[]` (infers types from referenced transaction)

Keypoints:
- Same underlying attribute referenced multiple times
- Different semantic meaning per reference
- Useful for dual relationships (origin/destination) or hierarchical (parent/child)

Example (hierarchical):
~~~
Group EmployeeSubtype
{
	ManagerId : EmployeeId [ … ]
	ManagerName : EmployeeName [ … ]
}
~~~
~~~
Transaction Employee
{
	EmployeeId* [ DataType = 'Numeric(10.0)' ]
	EmployeeName! [ DataType = 'VarChar(64)' ]
	ManagerId [] // Same person, different role
	ManagerName []
}
~~~

Example (origin/destination):
~~~
Group CitySubtype
{
	OriginCityId : CityId [ … ]
	OriginCityName : CityName [ … ]
	DestinationCityId : CityId [ … ]
	DestinationCityName : CityName [ … ]
}
~~~
~~~
Transaction Flight
{
	FlightId* [ DataType = 'Numeric(10.0)' ]
	OriginCityId [] // FK to City reference as origin
	OriginCityName []
	DestinationCityId [] // FK to City reference as destination
	DestinationCityName []
}
~~~

---

## Formula Attribute
Virtual attribute whose value is calculated dynamically using expression

Keypoints:
- Not physically stored unless `Redundant = 'True'`
- Defined via `Formula` property
- Recalculated on access
- Can reference other attributes, variables, functions

Syntax:
~~~
<name>
[
	DataType = '<type>',
	Formula = '<expression>'
]
~~~

Example:
~~~
Transaction Invoice
{
	InvoiceId* [ DataType = 'Numeric(10.0)' ]
	InvoicePrice [ DataType = 'Numeric(10.2)' ]
	InvoiceTaxRate [ DataType = 'Numeric(3.2)' ]
	InvoiceTotalAmount
	[
		DataType = 'Numeric(10.2)',
		Formula = 'InvoicePrice * (1 + InvoiceTaxRate / 100)'
	]
}
~~~

Constraints:
- Expression must be valid and type-compatible
- Cannot be directly assigned (read-only)
- Never combine with `Assign` rule on same attribute

---

## Redundant Attribute
Formula or Extended attribute physically stored for performance

Keypoints:
- Either Formula or Extended with `Redundant = 'True'`
- Stored in table to avoid costly joins or recalculations
- Automatically updated when source changes

Example (redundant formula):
~~~
CustomerFullName
[
	DataType = 'VarChar(128)',
	Formula = 'Concat(CustomerFirstName, " ", CustomerLastName)',
	Redundant = 'True'
]
~~~

Example (redundant extended):
~~~
Transaction OrderItem
{
	OrderId* []
	ProductId* []
	ProductPrice [] // Extended from Product
	ProductPriceStored
	[
		DataType = 'Attribute:ProductPrice',
		Redundant = 'True' // Stored to preserve historical price
	]
}
~~~

Use cases:
- Performance optimization (avoid joins)
- Historical data preservation (e.g. prices at order time)

---

## Secondary Attribute
Neither PK nor FK; directly defined and stored in current transaction

Keypoints:
- Standard data attribute
- No special role in relationships
- Stored only in base table

Example:
~~~
Transaction Product
{
	ProductId* [ DataType = 'Numeric(10.0)' ]
	ProductName! [ DataType = 'VarChar(64)' ]
	ProductDescription [ DataType = 'LongVarChar(4K)' ] // Secondary
	ProductPrice [ DataType = 'Numeric(10.2)' ] // Secondary
}
~~~

---

## Description Attribute
Attribute denoted by exclamation mark `!` used for displaying records

Keypoints:
- One per transaction level
- Used in prompts, lists, references
- Should be human-readable identifier

Syntax: Attribute name suffixed with `!`

Example:
~~~
Transaction Customer
{
	CustomerId* [ DataType = 'Numeric(10.0)' ]
	CustomerName! [ DataType = 'VarChar(64)' ] // Description attribute
}
~~~

---

## Nullable Attribute
Attribute allowing null values

Syntax: Attribute name suffixed with `?`

Example:
~~~
Transaction User
{
	UserId* [ DataType = 'Numeric(10.0)' ]
	UserName! [ DataType = 'VarChar(64)' ]
	UserPhone? [ DataType = 'Phone, GeneXus' ] // Optional
}
~~~

---

# RELATIONSHIP TO TRANSACTION STRUCTURE
Attribute types determine normalization and table structure:
- PK: Defines table identity
- FK: Creates foreign key constraints and enables joins
- Extended: Participates in joins but not stored locally
- Secondary: Stored in base table
- Formula: Not stored unless Redundant
- Redundant: Stored despite being Formula/Extended
- Subtyped: Single physical column, multiple logical meanings

---

# CONSTRAINTS
- Every `Transaction` object must have at least one PK attribute
- PK cannot be nullable
- FK with empty brackets `[]` infers type automatically
- Extended attributes cannot be directly modified
- Formula attributes are read-only and computed in memory unless Redundant
- Subtyped attributes must reference valid attribute in related transaction
- Description attribute `!` should be one per level
- Nullable `?` cannot apply to PK
- Applicable to `Transaction` object definitions
- Considered from other objects for navigating over data
- Attribute properties are design-time only, cannot be set at runtime
