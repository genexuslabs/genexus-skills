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
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-transaction.md)
- `<documentation>`: Optional object documentation; check [common-markdown](./common-markdown.md)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `transaction`

Workflow:
- Create or update `Transaction` artifact
- Execute `import_text_to_kb` tool; on failure, stop
- Execute `export_kb_to_text` tool
- Inspect `<name>.table.main.gx` artifacts and read `#Index` section
- Extract `Index` names and validate their `*.index.main.gx` artifacts
- Create or update only user `Index` if requested or for 1:1 relationships (unique FK)
- Update `Table` artifacts `#Indexes` section only with missing user `Index` names

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

Example (1:N)
~~~
Transaction Country
{
	CountryId* [ DataType = 'Numeric(10.0)' ]
	CountryName! [ DataType = 'VarChar(64)' ]
}

Transaction User
{
	UserId* [ DataType = 'Numeric(10.0)' ]
	UserName! [ DataType = 'VarChar(64)' ]
	CountryId []
	CountryName []
}
~~~


Example (1:1)
~~~
Transaction Order
{
	OrderId* [ DataType = 'Numeric(10.0)' ]
	OrderDate [ DataType = 'Date' ]
}

Transaction Payment
{
	PaymentId* [ DataType = 'Numeric(10.0)' ]
	OrderId* []
	PaymentAmount [ DataType = 'Numeric(10.2)' ]
}

Index UPaymentByOrder
{
	OrderId

	#Index
		Source = "User"
		Type = "Unique"
	#End
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

# DATA PROVIDER ASSOCIATION
Enable `DataProvider = True` to associate a `DataProvider` child object

Modes:
- `Populate Transaction`
	* Purpose: Load seed/fixed data into physical tables
	* Use when: Entity must preload persistent data after build
	* Define `UsedTo = "Populate Data"`
	* Requires idempotent `DataProvider` using explicit PKs or stable matching key
	* Side effects: `BusinessComponent = True` (Transaction), `MainProgram = True` (DataProvider)
- `Dynamic Transaction`
	* Purpose: Retrieve data without creating physical tables
	* Use when: Entity acts as a retrieval contract
	* Define `UsedTo = "Retrieve Data"`
	* Requires explicit `Insert`/`Update`/`Delete` event coding

Structure:
~~~
<name>.transaction.main.gx
<name>/
	<name>_DataProvider.dataprovider.main.gx
~~~

Constraints:
- Keep `DataProvider` object structure aligned with `Transaction` structure
- Read [Data Provider](./object-data-provider.md) file for object definition

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
See [common-rules](./common-rules.md)

---

# EVENTS
See [common-events](./common-events.md)

Allowed event names:
- `Start`
- `After Trn`
- `Exit`
- `'<custom-name>'`
- `Insert`/`Update`/`Delete`
	* Dynamic transaction only
	* Optional `Messages` argument

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
- Only one description attribute (`!`) allowed for user-friendly record display 
- Only use surrogate PK with `<name>Id` name pattern when no natural identifier exists
- Only use `Autonumber = 'True'` on first-level PK attributes with `Numeric(X.0)` data type
- Only use `Serial` rule for autonumbering nested-level PK attributes
- Every extended attribute (including FK) must be declared with empty brackets `[]`; properties inferred from referenced transaction
- Never duplicate attribute names within transaction including sublevels
- Never include properties for FK, Extended, or Subtyped attributes
- Determine STRONG vs WEAK relationship based on entity independence:
	* STRONG: separate transactions with FK references
	* WEAK: sublevel within transaction
- Include [common-standard-variables](./common-standard-variables.md) according to transaction context
- Only enable `Business Component` property for programmatic access
- Never place events, rules, triggers outside syntax scope
- Never define attribute properties with `.` notation as they are design-time only
- Never combine `Formula` property and `Assign` rule over same attribute

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
		BusinessComponent = true
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
	OrderTotal
	[
		DataType = 'Numeric(10.2)',
		Formula = 'Sum(LineTotal)'
	]
	OrderLastLine [ DataType = 'Numeric(10.0)' ]

	OrderLine
	{
		OrderLineId* [ DataType = 'Numeric(10.0)' ]
		ProductId []
		ProductName []
		Quantity [ DataType = 'Numeric(5.0)' ]
		UnitPrice [ DataType = 'Numeric(10.2)' ]
		LineTotal
		[
			DataType = 'Numeric(10.2)',
			Formula = 'Quantity * UnitPrice'
		]
	}

	#Rules
		Default(OrderDate, Today());
		Serial(OrderLineId, OrderLastLine, 1);
	#End

	#Events
	#End

	#Variables
	#End

	#Properties
		BusinessComponent = true
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

## Example 4
Transaction with populate data
~~~
Transaction Country
{
	CountryId* [ DataType = 'Numeric(4.0)' ]
	CountryName! [ DataType = 'VarChar(40)' ]

	#Properties
		DataProvider = True
		UsedTo = "Populate Data"
	#End
}
~~~

DataProvider with seed data
~~~
DataProvider Country_DataProvider
{
	Country
	{
		CountryId = 1
		CountryName = !"Uruguay"
	}

	Country
	{
		CountryId = 2
		CountryName = !"Argentina"
	}
}
~~~

Saved as:
~~~
Country.transaction.main.gx
Country/
└─ Country_DataProvider.dataprovider.main.gx
~~~

## Example 5
Transaction with retrieve data (Dynamic Transaction) and updatable policy
~~~
Transaction Document
{
	DocumentType* [ DataType = 'DocType' ]
	DocumentId* [ DataType = 'Numeric(8.0)' ]
	DocumentDate [ DataType = 'Date' ]
	DocumentAmount [ DataType = 'Numeric(10.2)' ]

	#Properties
		DataProvider = True
		UsedTo = "Retrieve Data"
		UpdatePolicy = "Updatable"
	#End

	#Variables
		Invoice [ DataType = 'Invoice' ]
		Receipt [ DataType = 'Receipt' ]
		Messages [ DataType = 'Messages, GenXus.Common' ]
	#End

	#Events
		Event Insert(&Messages)
			Do Case
				Case DocumentType = DocType.Invoice
					&Invoice = new()
					&Invoice.InvoiceDate = DocumentDate
					&Invoice.InvoiceTotal = DocumentAmount
					&Invoice.Insert()
					&Messages = &Invoice.GetMessages()
				Case DocumentType = DocType.Receipt
					&Receipt = new()
					&Receipt.ReceiptDate = DocumentDate
					&Receipt.ReceiptTotal = DocumentAmount
					&Receipt.Insert()
					&Messages = &Receipt.GetMessages()
			EndCase
		EndEvent

		Event Update(&Messages)
			Do Case
				Case DocumentType = DocType.Invoice
					&Invoice.Load(DocumentId)
					&Invoice.InvoiceDate = DocumentDate
					&Invoice.InvoiceTotal = DocumentAmount
					&Invoice.Update()
					&Messages = &Invoice.GetMessages()
				Case DocumentType = DocType.Receipt
					&Receipt.Load(DocumentId)
					&Receipt.ReceiptDate = DocumentDate
					&Receipt.ReceiptTotal = DocumentAmount
					&Receipt.Update()
					&Messages = &Receipt.GetMessages()
			EndCase
		EndEvent

		Event Delete(&Messages)
			Do Case
				Case DocumentType = DocType.Invoice
					&Invoice.Load(DocumentId)
					&Invoice.Delete()
					&Messages = &Invoice.GetMessages()
				Case DocumentType = DocType.Receipt
					&Receipt.Load(DocumentId)
					&Receipt.Delete()
					&Messages = &Receipt.GetMessages()
			EndCase
		EndEvent
	#End
}
~~~

DataProvider with Invoice and Receipt tables retrieval
~~~
DataProvider Document_DataProvider
{
	Document from Invoice
	{
		DocumentType = 1
		DocumentId = InvoiceId
		DocumentDate = InvoiceDate
		DocumentAmount = InvoiceTotal
	}

	Document from Receipt
	{
		DocumentType = 2
		DocumentId = ReceiptId
		DocumentDate = ReceiptDate
		DocumentAmount = ReceiptTotal
	}
}
~~~

Saved as:
~~~
Document.transaction.main.gx
Document/
└─ Document_DataProvider.dataprovider.main.gx
~~~
