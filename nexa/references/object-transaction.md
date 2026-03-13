---
name: object-transaction
description: Core entity representing real-world objects, automatically normalized to third normal form
---

Defines database entities with attributes, relationships, business rules, and automatic normalization

---

# DEFINITION
A `Transaction` object (or `TRN`) represents real-world entities mapping to database tables

GeneXus automatically normalizes to third normal form (3NF)

Each `Transaction` maps to one or more [Table](./object-table.md) objects by level structure, and each mapped `Table` defines associated [Index](./object-index.md) objects for filtering and ordering

---

# SYNTAX
~~~
Transaction <name>
{
	<attributes>

	#Rules
		<rules>
	#End

	#Events
		<events>
	#End

	#Variables
		<variables>
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
- `<name>`: Transaction name using alphanumeric or underscore, starting with letter
- `<attributes>`: Entity attributes (mandatory `DataType`; see [ATTRIBUTE/VARIABLE](#attributevariable))
- `<rules>`: Business rules governing Transaction behavior (see [RULES](#rules))
- `<events>`: Transaction lifecycle event handlers (see [EVENTS](#events))
- `<variables>`: Variables (mandatory `DataType`; see [ATTRIBUTE/VARIABLE](#attributevariable))
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-transaction.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `transaction`

Related artifacts:
- `Table` artifacts must use `<name>` equal to the `Transaction` name
- `Index` artifacts must use each index identifier (`<index-name>`) declared for owner tables
- Single-file:
	* `Table`: `<name>.table.main.gx`
	* `Index`: `<index-name>.index.main.gx` (one index object per file)
- Multi-file:
	* `Table`: `<name>.table.main.gx`, `<name>.table.properties.toml`, `<name>.table.documentation.md`
	* `Index`: `<index-name>.index.main.gx`, `<index-name>.index.properties.toml`

---

# ATTRIBUTE/VARIABLE
See [common-data](./common-data.md)

---

# RELATIONSHIPS

## STRONG Relationship
Separate transactions reference each other via Foreign Key (FK)

Modeling rules:
- Use when related entities have independent lifecycle and require separate `Transaction`
- Model 1:N with FK on the N-side `Transaction` using `[]` for inferred FK and extended attributes
- Model 1:1 as 1:N plus a user `Index` defined as `Unique` on the FK key at N-side table

Example:
~~~
Transaction Country
{
	CountryId* [ DataType = 'Numeric(10.0)' ]
	CountryName! [ DataType = 'VarChar(64)' ]
}

Transaction City
{
	CityId* [ DataType = 'Numeric(10.0)' ]
	CountryId* []
	CountryName []
	CityName! [ DataType = 'VarChar(64)' ]
}
~~~

## WEAK Relationship
Sublevel (subordinate entity) inside transaction

Modeling rules:
- Use when subordinate entity lifecycle depends on parent `Transaction`
- Model 1:N by defining subordinate `level` inside parent `Transaction` body
- Keep subordinate structure coupled to parent key context

Example:
~~~
Transaction Invoice
{
	InvoiceId* [ DataType = 'Numeric(10.0)' ]
	InvoiceDate [ DataType = 'Date' ]

	InvoiceItem
	{
		InvoiceItemId* [ DataType = 'Numeric(10.0)' ]
		ProductId []
		ProductName []
		Quantity [ DataType = 'Numeric(5.0)' ]
		Price [ DataType = 'Numeric(10.2)' ]
	}
}
~~~

---

# ATTRIBUTE TYPES
See [common-attribute-types](./common-attribute-types.md)

---

# BUSINESS COMPONENT
See [common-business-component](./common-business-component.md)

---

# DYNAMIC TRANSACTION
A dynamic transaction allows changing transaction behavior at runtime based on metadata and context when the `Dynamic Transaction` property is enabled

Use when:
- Structure or behavior cannot be fully fixed at design time
- Runtime metadata drives attribute participation, validation, or flow

Constraints:
- Keep persistence semantics explicit
- Keep rules and events deterministic

---

# CONVENTIONS

## Naming
- Transaction name: PascalCase singular noun
- Attribute name: PascalCase, descriptive
- Sublevel name: PascalCase singular noun
- FK attribute: `<ReferencedTransaction>Id`
- Surrogate PK: `<TransactionName>Id`

## Structure
- Primary key attributes first
- Foreign key attributes before extended
- Description attribute after PK
- Regular attributes in logical order
- Sublevels at end

---

# RULES
see [common-rules](./common-rules.md)

---

# EVENTS
See [common-events](./common-events.md)

Allowed event names:
- `Start`
- `After Trn`
- `Exit`
- `'<custom-name>'`

Example:
~~~
Event After Trn
	If &Mode == TrnMode.Insert
		msg(format(!"[INFO] Inserted: %1", CustomerId), status)
	EndIf
EndEvent
~~~

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Check Transaction existence before updating
- Every attribute must have `DataType` property or empty brackets `[]`
- Every attribute must be prefixed by Transaction or sublevel name
- Primary key required (at least one attribute with `*`)
- Only one description attribute (`!`) allowed
- Surrogate PK when no natural identifier exists
- Surrogate PK uses pattern `<name>Id` with `'Autonumber': 'True'`
- Description attribute for user-friendly record display
- Extended attributes infer properties from referenced transaction
- FK attributes declared with empty brackets `[]`
- Never duplicate attribute names within transaction including sublevels
- Never include properties for FK, Extended, or Subtyped attributes
- Rules use syntax: `<rule> [IF <condition>] [ON <trigger>];`
- Events use syntax: `Event <name> [<qualifier>]`
- Qualifiers: `[WEB]`, `[WIN]`, `[TEXT]`, `[BC]`
- Determine STRONG vs WEAK relationship based on entity independence:
	* STRONG: separate transactions with FK references
	* WEAK: sublevel within transaction
- Include [common-standard-variables](./common-standard-variables.md) according to transaction context
- Business Component property enables programmatic access
- Never place events, rules, triggers outside syntax scope
- Never define attribute properties with `.` notation as they are design-time only
- Only define `Table`/`Index` objects when requested or model-required

---

# EXAMPLES

## Example 1
Simple Transaction
~~~
Transaction Product
{
	ProductId* [ DataType = 'Numeric(10.0)', Autonumber = 'True' ]
	ProductName! [ DataType = 'VarChar(128)' ]
	ProductPrice [ DataType = 'Numeric(10.2)' ]
	ProductStock [ DataType = 'Numeric(5.0)' ]

	#Rules
		Error(!"Price must be positive") IF ProductPrice <= 0;
		Default(ProductStock, 0);
	#End

	#Events
	#End

	#Variables
	#End

	#Properties
		"Business Component" = true
	#End
}
~~~

## Example 2
Transaction with Sublevel
~~~
Transaction Order
{
	OrderId* [ DataType = 'Numeric(10.0)', Autonumber = 'True' ]
	CustomerId []
	CustomerName []
	OrderDate [ DataType = 'Date' ]

	OrderLine
	{
		OrderLineId* [ DataType = 'Numeric(10.0)', Autonumber = 'True' ]
		ProductId []
		ProductName []
		Quantity [ DataType = 'Numeric(5.0)' ]
		UnitPrice [ DataType = 'Numeric(10.2)' ]
		LineTotal [ DataType = 'Numeric(10.2)' ]
	}

	#Rules
		Default(OrderDate, Today());
		LineTotal = Quantity * UnitPrice;
	#End

	#Events
	#End

	#Variables
	#End

	#Properties
		"Business Component" = true
	#End
}
~~~

## Example 3
Compound Primary Key
~~~
Transaction StudentCourse
{
	StudentId* []
	StudentName []
	CourseId* []
	CourseName []
	EnrollmentDate [ DataType = 'Date' ]
	Grade [ DataType = 'Numeric(3.2)' ]

	#Rules
		Default(EnrollmentDate, Today());
	#End

	#Events
	#End

	#Variables
	#End
}
~~~
