---
name: common-rules
description: Declarative business logic rules applied globally in GeneXus objects
---

Declarative rules governing object behavior, executed automatically during data lifecycle

---

# SYNTAX
~~~
<rule-name>(<arguments>) [<execution>];
~~~

Where:
- `<rule-name>`: Predefined rule keyword
- `<arguments>`: Rule-specific parameters
- `<execution>`: Optional execution modifiers:
	* `IF <condition>`: Condition expression; must evaluate `True` for rule execution
	* `ON <trigger>`: Execution point in the lifecycle (see [TRIGGERS](#triggers))

Notes:
- Rules are evaluated declaratively, meaning their position in the code does not necessarily define the execution order
- Rules can reference both attributes and variables, with variables always prefixed by an ampersand (`&`); e.g. `&i` or `&CustomerName`
- Rules must end with semicolon (`;`) and be separated by a blank line to improve readability and ensure consistent formatting
- Each execution modifier availability is defined by each rule syntax
- Each `<condition>` can reference attributes, variables, object calls, and operators

---

# CORE RULES

## Parm
Defines object signature with parameters

Syntax: `Parm(<parm-1>, … , <parm-N>)`

Where:
- `<parm-i>`: Parameter declaration

Each parameter can be prefixed as:
- `in:`: Input parameter (read-only)
- `out:`: Output parameter (write-only)
- `inout:`: Input/output parameter (default if omitted)

Example:
~~~
Parm(in: &CustomerId, out: &CustomerPhone);
Parm(inout: &ElementsCount);
~~~

Notes:
- Empty `Parm` rule is forbidden; must only be used when objects requires parameters
- If the last parameter is `out:`, the object can be invoked as `&ParmN = Object(&Parm1, &Parm2)`

---

# TRANSACTION RULES

## Assign
Assigns calculated `<expression>` to `<attribute>`

Syntax: `<attribute> = <expression> [IF <condition>] [ON <trigger>]`

Where:
- `<attribute>`: Target attribute to assign the expression
- `<expression>`: The value or expression to assign

Example:
~~~
TotalPrice = ProductPrice * Quantity;
FinalPrice = TotalPrice - DiscountAmount IF DiscountPercentage > 0;
~~~

## Default
Assigns default value for a target element

Syntax: `Default(<attribute>, <expression>) [IF <condition>]`

Where:
- `<attribute>`: Target attribute to receive the default value
- `<expression>`: The value or expression to assign as default

Example:
~~~
Default(InvoiceDate, &Today);
Default(InvoiceStatus, InvoiceStatusType.Pending);
~~~

## Error
Displays error message

Syntax: `Error(<message>[, <exception>]) [IF <condition>] [ON <trigger>]`

Where:
- `<message>`: Message text defined by a literal, variable, or function returning a string
- `<exception>`: Optional error identifier when using a Transaction as a Business Component

Example:
~~~
Error('Invalid email format') IF NOT CustomerEmail.IsMatch(!'^[\w\-]+@[\w\-]+\\w+$');
Error('Price must be positive', !'APP_PRICE_ERROR') IF ProductPrice <= 0;
~~~

## Msg
Displays informational message

Syntax: `Msg(<message>) [IF <condition>] [ON <trigger>]`

Where:
- `<message>`: Message text defined by a literal, variable, or function returning a string

Example:
~~~
Msg('Discount applied') IF DiscountPercentage > 0;
~~~

## NoAccept
Disables the edition of target element

Syntax: `NoAccept(<attribute>) [IF <condition>] [ON <trigger]`

Where:
- `<attribute>`: Target attribute to make read-only

Example:
~~~
NoAccept(CustomerPassword) IF &IsGuest;
~~~

## Serial
Assigns unique sequential value to `<attribute>` using `<pivot>` with `<step>` increment

Syntax: `Serial(<attribute>, <pivot>, <step>)`

Where:
- `<attribute>`: Target attribute to be incremented
- `<pivot>`: Base attribute storing the last assigned value in the sequence
- `<step>`: Increment value for numbering (usually 1)

Example:
~~~
Serial(InvoiceItemId, InvoiceLastLine, 1);
~~~

## Add
Adds value

Syntax: `Add(<attribute>, <value>) [IF <condition>]`

Where:
- `<attribute>`: Target attribute to add value
- `<value>`: Value to be added

Example:
~~~
Add(TotalAmount, ItemAmount);
~~~

## Subtract
Subtracts value

Syntax: `Subtract(<attribute>, <value>) [IF <condition>]`

Where:
- `<attribute>`: Target attribute to subtract value
- `<value>`: Value to be subtracted

Example:
~~~
Subtract(StockQuantity, OrderQuantity);
~~~

---

# PROCEDURE RULES
Specific rules for `Procedure` objects

## Error_Handler
Declares a subroutine to handle runtime errors in `Procedure` object execution

Syntax: `Error_Handler('<subroutine-name>')`

Where:
- `<subroutine-name>`: Name of a local `Sub` routine without parameters

Notes:
- Use in procedures that require controlled DB/runtime error handling
- Define a matching `Sub '<subroutine-name>'` in procedure code block
- The `&GxErrOpt` is ignored when `Return` is used inside the handler subroutine
- See [common-standard-variables](./common-standard-variables.md) for error handling variables

## Output_File
Redirects procedure output to a target file

Syntax: `Output_File(<path-expression>[, <format>])`

Where:
- `<path-expression>`: File path or expression resolving to output target
- `<format>`: Optional output format, one of `GXR` (default), `RTF`, `XML`, `PDF`, `TXT`

Notes:
- Applies to `Procedure` object contexts where report/file output is required
- Use only when the procedure uses `Print` command
- Use with `Main Program = True` and `Call Protocol = HTTP`
- Validate path and permissions before writing

---

# AGENT RULES
Specific rules for `Agent` objects

## Context
Declare context data sources specified by PRC or DP object references that return data

Syntax: `Context(<call-1>, … , <call-N>)`

Where:
- `<call-i>`: Procedure or DataProvider object returning data
- `$context` placeholder must be included in `<text>` if `Context` rule used

Example:
~~~
Context(GetCourses());
Context(GetDiseases(), GetMedicalHistory(&PatientId));
~~~

## Use
Declares external tools or components that the agent can use to produce the output, where each `<tool>` can be:
- Any existing `Agent` object
- Any existing `Procedure` object acting as a tool
- Any external agent defined with `ExternalAgent:` prefix
- Any external tool defined with `ExternalTool:` prefix

Syntax: `Use(<tool-1>, … , <tool-N>)`

Where:
- `<tool-i>`: Can be any of
	* existing `Agent` object name
	* existing `Procedure` object name acting as tool
	* external agent name with `ExternalAgent:` prefix
	* external tool name with `ExternalTool:` prefix

Examples:
~~~
Use(ExternalTool:com.globant.geai.web_scrapper_httpx)
Use(AlternativeDescriptionAgent, MarketSpecialistAgent)
Use(ExternalAgent:com.globant.geai.web_scrapper_httpx, AlternativeDescriptionAgent)
~~~

---

# TRIGGERS
Execution points in data lifecycle (`Transaction` objects only):
- `BeforeValidate`: Before validation process starts
- `BeforeInsert`: Before insert operation
- `BeforeUpdate`: Before update operation
- `BeforeDelete`: Before delete operation
- `BeforeComplete`: Just before LUW completion
- `AfterValidate`: After user confirmation, before CRUD operations
- `AfterInsert`: Immediately after insert
- `AfterUpdate`: Immediately after update
- `AfterDelete`: Immediately after delete
- `AfterComplete`: After LUW finishes and commits
- `AfterLevel [level <attribute>]`: After completing data entry for specific level

Example:
~~~
UserRegistrationDate = &Today ON BeforeInsert;
Msg(Format('Customer stored: %1', CustomerId)) ON AfterComplete;
~~~

---

# QUALIFIERS
Context restrictions for rule execution:
- `[WEB]`: Runs only in Web (HTML) interface
- `[WIN]`: Runs only in Windows GUI
- `[TEXT]`: Runs only in text-based/command-line interface
- `[BC]`: Runs only as Business Component (no UI)

Notes:
- Inline for single rules
- Curly brackets for grouping multiple rules
- Prefer grouping when multiple rules share context

Example (inline):
~~~
[BC] Default(InvoiceDate, &today);
~~~

Example (grouped):
~~~
[BC]
{
	Error("Invalid invoice identifier") IF InvoiceIdIsEmpty();
	Default(InvoiceDate, &today);
}
~~~
