---
name: common-commands
description: Available commands for implementing logic in GeneXus objects
---

Defines available commands for implementing logic in `Procedure` object and `Panel` object

---

# CORE COMMANDS
Reusable commands across objects that support imperative code

## Assign
Assigns value to variable or attribute

Syntax:
~~~
<element> = <expression>
~~~

Where:
- `<element>`: A variable (with `&` prefix) or an attribute (without `&` prefix)
- `<expression>`: Any kind of expression matching the `<element>` data type, including operations or other object invocations

Example:
~~~
&Total = &Price * &Quantity
&Total = CalculateTotal(&Price, &Quantity)
CustomerName = &InputName
~~~

## If-Else
Conditional execution based on boolean expression

Syntax:
~~~
If <condition>
	<block-true>
[Else
	<block-false>]
EndIf
~~~

Where:
- `<condition>`: Boolean expression, using parenthesis only for disambiguation
- `<block-true>`: Code block when the condition is true
- `<block-false>`: Code block when the condition is false

Constraints:
- Nested `If` commands are allowed
- Each `If` command must end with its own `EndIf`
- Never use `ElseIf` (invalid/unsupported); use nested `If` instead

Example:
~~~
If &Age >= 18
	msg(!"Adult", status)
Else
	If &Age >= 13
		msg(!"Teenager", status)
	Else
		msg(!"Child", status)
	EndIf
EndIf
~~~

## Do Case
Selects one of many code blocks to execute

Syntax:
~~~
Do Case
	Case <condition-1>
		<block-1>
	…
	Case <condition-N>
		<block-N>
	[Otherwise
		<block-d>]
EndCase
~~~

Where:
- `<condition-i>`: The i-th clause boolean condition
- `<block-i>`: Code block when i-th condition is true
- `<block-d>`: Code block for the default clause

Constraint:
- Unlike traditional languages, each block does not require explicit break

Example:
~~~
Do Case
	Case &Status = OrderStatusType.Pending
		msg(!"Order pending", status)
	Case &Status = OrderStatusType.Approved
		msg(!"Order approved", status)
	Otherwise
		msg(!"Unknown status", status)
EndCase
~~~

## Do While
Repeats statements while condition is true

Syntax:
~~~
Do While <condition>
	<block>
EndDo
~~~

Where:
- `<condition>`: Boolean condition
- `<block>`: Repetitive code block while the condition is true

Constraints:
- Vector iteration must use `Rows` function
- Matrix iteration must use both `Rows` and `Cols` function

Example:
~~~
Do While &Counter < 10
	&Counter = &Counter + 1
	&Total = &Total + &Counter
EndDo
~~~

Example:
~~~
&i = 1
Do While &i <= Rows(&MyMatrix())
	&j = 1
	Do While &j <= Cols(&MyMatrix())
		&MyCell = &MyMatrix(&i, &j)
		msg(format(!"Matrix[%1, %2] is %3", &i, &j, &MyCell), status)
		&j += 1
	EndDo
	&i += 1
EndDo
~~~

## For Each
See [common-commands-foreach](./common-commands-foreach.md)

## For In
Iterates over elements in a collection

Syntax:
~~~
For <variable> in <expression>
	<code>
EndFor
~~~

Where:
- `<variable>`: Iteration variable
- `<expression>`: A collection expression over the type defined by `<variable>`
- `<code>`: Repetitive code block for each cycle

Example:
~~~
For &Product in &ProductList
	&Total = &Total + &Product.Price
EndFor
~~~

## For To Step
Iterates over numeric range with step increment

Syntax:
~~~
For <variable> = <start> to <end> [step <step>]
	<code>
EndFor
~~~

Where:
- `<variable>`: Iteration variable having the same type as `<start>` and `<end>` expressions
- `<start>`: Expression where the iteration starts
- `<end>`: Expression where the iteration ends
- `<step>`: Leap value to iterate; default is 1
- `<code>`: Repetitive code block for each cycle

Example:
~~~
For &i = 1 To 10 Step 2
	&Sum = &Sum + &i
EndFor
~~~

## Call
Invokes another object with parameters

Syntax:

Static call (preferred when object name is well-known):
~~~
<object-name>([<arg-1>, …, <arg-N>])
~~~

Dynamic call (reflection-like):
~~~
Call(<object-expr>[, <arg-1>, …, <arg-N>])
~~~

Where:
- `<object-expr>`: String-based expression with the target object name
- `<object-name>`: Target existing object name
- `<arg-i>`: The i-th argument of the called object, can be a constant, attribute, or variable

Constraints:
- Use positional arguments only
- Named arguments are forbidden

Example:
~~~
CalculateDiscount(&ProductId, &CustomerId, &DiscountAmount)
Call(&ProcedureName, &Param1, &Param2)
~~~

Note:
- See [common-agent-invocation](./common-agent-invocation.md) for `Agent` object invocation

## Exit
Exits current iteration in loop

Syntax:
~~~
Exit
~~~

Example:
~~~
For &i = 1 To 100
	If &i = 50
		Exit
	EndIf
EndFor
~~~

## Return
Exits current object execution

Syntax:
~~~
Return
~~~

Constraint:
- Never associate values in `Return`; all out parameters are returned automatically

Example:
~~~
If &i < 0
	msg(!"Negative index", status)
	Return
EndIf
msg(!"Positive index", status)
~~~

---

# PROCEDURE COMMANDS
Commands specific to `Procedure` object

## Sub
Defines reusable local subroutine

Syntax:
~~~
Sub '<subroutine>' /* <signature> */
	<code>
EndSub
~~~

Where:
- `<subroutine>`: Name of the subroutine with no parameter definition
- `<signature>`: Comment describing logical variable usage as `in`, `inout`, or `out`
- `<code>`: Code block executed when subroutine is triggered; only variables are allowed

Example:
~~~
Sub 'CalculateTotal' /* in: &Price, in: &Quantity, out: &Total */
	&Total = &Price * &Quantity
EndSub
~~~

## Do
Calls a local subroutine

Syntax:
~~~
Do '<subroutine>'
~~~

Where:
- `<subroutine>`: Name of the subroutine to call; it must be previously defined by `Sub`

Constraints:
- Each `Do` must reference local subroutines only
- `Do` calls must not include arguments; use global variables to share data
- Never use inside a `For Each` code block; place target code directly

Example:
~~~
&Price = ProductPrice
&Quantity = 3
Do 'CalculateTotal'
msg(Format(!"Total price: %1", &Total), status)
~~~

## New
Inserts a new database record within transaction

Syntax:
~~~
New
	[Defined by <attribute-1>, …, <attribute-N>]
	[Blocking <number>]
	<code-main>
[When duplicate
	<code-dupl>]
EndNew
~~~

Where:
- `<attribute-i>`: Attributes participating in the clause, determining the base table
- `<number>`: Number of records in each block in batch operation
- `<code-main>`: Main code block when no duplication issue exists
- `<code-dupl>`: Code block when duplicate primary key is detected

Constraints:
- Use `New` command with caution; ignores transaction business rules
- All `New` commands automatically commit changes; no `Commit` command required
- Use `When duplicate` clause only to define duplicate-key handling

Example:
~~~
New
	ProductId = &ProductId
	ProductName = &ProductName
	ProductCategory = &ProductCategory
When duplicate
	msg(Format(!"A product with id %1 already exists", &ProductId))
EndNew
~~~

## Commit
Confirms database changes within transaction

Syntax:
~~~
Commit
~~~

Example:
~~~
For Each Product
	Where ProductCategory = &OldCategory
	ProductCategory = &NewCategory
EndFor
Commit
~~~

Constraints:
- Use `Commit` command to confirm changes in the current `LUW` (Logical Unit of Work)
- Use single `Commit` command per batch of changes to minimize database roundtrips
- Use explicit `Commit` command when `Commit on exit` property has `No` value

## Delete
Removes current record from database

Syntax:
~~~
Delete
~~~

Constraints:
- Use `Delete` command only inside `For Each` command
- Use `Delete` command on child levels before parent to ensure integrity

Example:
~~~
For Each Product
	Where ProductId = &ProductId
	Delete
EndFor
~~~

## Rollback
Reverts database changes within transaction

Syntax:
~~~
Rollback
~~~

Constraints:
- Use `Rollback` command to cancel database updates in the current `LUW` (Logical Unit of Work)
- Use `Rollback` command only inside `For Each` command

Example:
~~~
&HasError = False
For Each Product
	ProductPrice = ProductPrice * 1.10
	If ProductPrice < 0
		&HasError = True
		Rollback // cancels the entire LUW (all-or-nothing)
		Exit
	EndIf
EndFor

If &HasError = False
	Commit
EndIf
~~~

## Print
Writes full print block to report output

Syntax:
~~~
Print <printblock-name>
~~~

Example:
~~~
Print InvoiceHeader
Print InvoiceLine
~~~

## Header
Defines report header block

Syntax:
~~~
Header <header-name>
	<layout-elements>
EndHeader
~~~

## Footer
Defines report footer block

Syntax:
~~~
Footer <footer-name>
	<layout-elements>
EndFooter
~~~

---

# DATA VIEW COMMANDS
Commands for navigation over `Data View` objects without associated table

Shared constraints:
- Use internal attribute names only
- Use these commands when `Associated table` is not defined

## XFor Each
Iterates matching records from a `Data View` index

Syntax:
~~~
XFor Each <dataview>
    [Index <index>]
    [Where <condition>]
    <code-main>
[When none
    <code-none>]
XEndFor
~~~

Where:
- `<dataview>`: Existing `Data View` object name
- `<index>`: Index defined in the `Data View` object `Indexes` node
- `<condition>`: Optional filter expression using internal attribute names
- `<code-main>`: Repetitive code block per matching row
- `<code-none>`: Optional code block executed when no record is found

Constraints:
- Define `Index` when deterministic index selection is required

Example:
~~~
XFor Each CustomerExternal
    Index ICustomerExternal
    Where CustomerStatus = !'A'
    &CustomerName = CustomerName
XEndFor
~~~

## XFor First
Reads first matching record from a `Data View` index

Syntax:
~~~
XFor First <dataview>
    [Index <index>]
    [Where <condition>]
    <code-main>
[When none
    <code-none>]
XEndFor
~~~

Where:
- `<dataview>`: Existing `Data View` object name
- `<index>`: Index defined in the `Data View` object `Indexes` node
- `<condition>`: Optional filter expression using internal attribute names
- `<code-main>`: Code block executed when one record is found
- `<code-none>`: Optional code block executed when no record is found

Constraints:
- Use `XFor First` for single-row read by key or selective filter
- Define `Index` when deterministic index selection is required

Example:
~~~
XFor First CustomerExternal 
    Index ICustomerExternal
    Where CustomerId = &CustomerId
    &CustomerName = CustomerName
When none
    msg("Customer not found", status)
XEndFor
~~~

---

# CONSTRAINTS
- Commands must be used within their allowed scope
- Statement blocks must be properly closed with matching end keyword
- Conditional expressions must return boolean values
- Variables must be prefixed with `&` when referenced
