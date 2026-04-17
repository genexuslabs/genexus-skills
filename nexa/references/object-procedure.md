---
name: object-procedure
description: Executable code for business logic and data manipulation
---

Defines executable code for business logic and data manipulation

---

# DEFINITION

A `Procedure` object (or `PRC`) contains executable code for business logic, data manipulation, and service implementation

---

# SYNTAX
~~~
Procedure <name>
{
	<code>

	#Rules
		<rules>
	#End

	#Conditions
		<conditions>
	#End

	#Variables
		<variables>
	#End

	#Layout
		<layout>
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
- `<code>`: Procedural code (For Each, New, Sub, calls, etc.)
- `<rules>`: Business rules (parm, error, default, etc.)
- `<conditions>`: Conditional rules with when clauses
- `<variables>`: Variable definitions with `DataType`
- `<layout>`: Optional report layout definition in GXML when using `Print`, `Header`, or `Footer`
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-procedure.md)
- `<documentation>`: Optional object documentation; check [common-markdown](./common-markdown.md)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `procedure`

---

# ATTRIBUTE PARAMETERS
Pass PK/FK attributes directly in `parm` (without `&`) as `in:` for implicit navigation context
- Attribute becomes instantiated with the received value
- Every [For Each](./common-commands-foreach.md) automatically filters by that attribute, no explicit `Where` needed
- Never define attributes as `out:` or `inout:` parameter

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Use `Parm` rule to define parameters with `in:`, `out:`, `inout:` accessors
- Use `For Each` exclusively for data filtering, never for navigating or linking tables (SQL JOIN are invalid)
- Choose CRUD strategy by Transaction definition:
	* Use [BC](./common-business-component.md) only if transaction has BC enabled
	* Use [FE](./common-commands-foreach.md) otherwise
- Include [common-standard-variables](./common-standard-variables.md) according to procedure context
- For subroutine-level DB/runtime error handling, include procedure error variables from [common-standard-variables](./common-standard-variables.md)
- When `Output_File` rule is used, require `Print` command usage and set `Main Program = True` with `Call Protocol = HTTP`
- Include `/* signature */` comment for each `Sub` definition
- Subroutine invocation via `Do` command has no parameters (global variables)

---

# WEB SERVICE EXPOSURE
Choose one exposure mode:
- Reference this object from [API](./object-api.md) by default
- Configure this object as a `Web Service` only when explicitly requested:
	* Enable `Expose as Web Service` property
	* Define `Web Service Protocol` property with the protocol requested

---

# EMBEDDED NATIVE CODE
Apply native code during target-specific code generation
- Supported directives: `JAVA`, `CSHARP`; one per line
- Use `[!&Var!]` syntax for embedding GeneXus variables

Important:
- Use only when strictly required for exceptional generator-specific logic
- Primitive type mapping:
	* `Boolean`:
		* Java → `boolean`
		* .NET → `bool`
	* `Character`/`VarChar`/`LongVarChar`: 
		* Java → `String`
		* .NET → `string`
	* `Numeric(X,Y)`:
		- `Y > 0`:
			* Java → `BigDecimal` if `UseDecimalArithmetic=Yes`, else `double`
			* .NET → `decimal`
		- `X <= 2`:
			* Java → `byte`
			* .NET → `short`
		- `X <= 4`:
			* Java → `short`
			* .NET → `short`
		- `X <= 9`:
			* Java → `int`
			* .NET → `int`
		- `X <= 19`:
			* Java → `long`
			* .NET → `long`

---

# COMMAND LINE EXECUTION
Allows direct command-line execution after build (specification, generation, and compilation) using the target environment runtime

Requires:
- `MainProgram = true`
- `CallProtocol = "Command Line"`

Working directory resolution:
1. Read `src.ns/Preferences/<ver-name>.version.main.gx` file
2. Get `CurrentEnvironment` property value as `<env-name>`
3. Read `src.ns/Preferences/<env-name>.environment.main.gx` file
4. Get the `TargetPath` property value as `<target-path>`
5. Navigate to `<kb-root>/<target-path>/web` as working directory

## JAVA Environment
```
java -cp "build/classes/java/main;build/resources/main;lib/*;build/dependency/*" com.<package>.<prc-name>
```

Where:
- `<package>`: Java package derived as follows:
	1. Read the `gradle.properties` file
	2. Get the `JAVA_PACKAGE_NAME_FOLDER` value
	3. Replace `\\` with `.` from `JAVA_PACKAGE_NAME_FOLDER` value
- `<prc-name>`: Procedure name in lowercase

Notes:
- On Unix/Linux use `:` instead of `;` as classpath separator

## .NET Environment
```
dotnet ./bin/a<prc-name>.dll
# or:
./bin/a<prc-name>.exe
```

Where:
- `<prc-name>`: Procedure name in lowercase

Notes:
- GeneXus prefixes the assembly with `a`; e.g. `LoadTestData` → `aloadtestdata.dll`

---

# REPORT LAYOUT
Declarative XML-based report layout schema used in `#Layout` section

## Rules
- Hierarchy: `layout` root → `printBlock` bands → report controls
- One `printBlock` per printed section; `name` matches `Print` command
- Numeric values: no unit suffix
- Colors values: hex or `Transparent` only, no alpha; e.g. `#FF0000`
- Escape XML special characters; e.g. `&` (✘) → `&amp;` (✓)
- Indent using tabs (`\t`); whitespaces forbidden
- Indent attributes one tab deeper than the element
- Expand element tags as multiline when more than two attributes
- Place element name alone on opening line
- Place one attribute per line

## Elements
Layout elements with allowed attributes in XML definition

### layout
Root report container

- `type` (required)
    * Description: Identifies layout type
    * Type: `enum{"Report"}`

- `paperSize`
    * Description: Physical paper size
    * Type: `enum{"Custom","Letter","Legal","Executive","A3","A4","A5"}`
    * Default: `"Custom"`

- `paperOrientation`
    * Description: Page orientation
    * Type: `enum{"Portrait","Landscape"}`
    * Default: `"Portrait"`

- `width`, `height`
    * Description: Paper dimensions; only if `paperSize="Custom"`
    * Type: `int`

- `rightMargin`
    * Description: Right margin size
    * Type: `int`

- `attributeFont`, `textBlockFont`
    * Description: Default font for data‑bound / text controls
    * Type: `string`, format `"<family>, <size>"`; e.g. `"Arial, 10"`

### printBlock
Band printed by `Print <name>` command in source

- `name` (required)
    * Description: Unique block name
    * Type: `string`

- `height`
    * Description: Fixed band height; auto if omitted
    * Type: `int`

### label / attribute
Static or dynamic (by Attribute value) text control

- `name` (required)
    * Description: Unique control name within block
    * Type: `string`

- `text` (required for `reportLabel` element)
    * Description: Static text to display
    * Type: `string`

- `attribute` (required for `reportAttribute` element)
    * Description: Attribute object name to bind
    * Type: `string`

- `x`, `y`, `width`, `height`
    * Description: Position and size
    * Type: `int`

- `font`
    * Description: Overrides block‑level font
    * Type: `string` format `"<family>, <size>"`

- `foreColor`, `backColor`, `borderColor`
    * Description: Text, background, and border colors
    * Type: `string`, format `"#RRGGBB"` (no alpha allowed); e.g. `"#FF0000"`

- `borderWidth`
    * Description: Border thickness
    * Type: `int`

- `borders`
    * Description: Which sides render border
    * Type: `enum{"None","Top","Bottom","Left","Right","All"}`
    * Default: `"None"`

- `alignment`
    * Description: Content alignment within bounds
    * Type: `enum{"TopLeft","TopCenter","TopRight","MiddleLeft","MiddleCenter","MiddleRight","BottomLeft","BottomCenter","BottomRight","TopJustify","MiddleJustify","BottomJustify"}`
    * Default: `"TopLeft"`

- `format`
    * Description: Text interpretation (`Text` or `HTML`)
    * Type: `enum{"Text","HTML"}`
    * Default: `"Text"`

- `wordWrap`
    * Description: Wrap text when exceeding width
    * Type: `enum{"False","True"}`
    * Default: `"False"`

### image
Image control

- `name` (required)
    * Description: Unique control name within block
    * Type: `string`

- `image` (required)
    * Description: Image object name to render
    * Type: `string`

- `x`, `y`, `width`, `height`
    * Description: Same as in `reportLabel`
    * Type: `int`

### line
Line control

- `name` (required)
    * Description: Unique control name within block
    * Type: `string`

- `x`, `y`, `width`
    * Description: Position and length
    * Type: `int`

- `lineWidth`
    * Description: Line thickness
    * Type: `int`

- `lineDirection`
    * Description: Horizontal or vertical
    * Type: `enum{"Horizontal","Vertical"}`

- `foreColor`
    * Description: Line color
    * Type: `string`, format `"#RRGGBB"` (no alpha allowed); e.g. `"#00FF00"`

- `borderStyle`
    * Description: Dash style
    * Type: `enum{"Solid","Dotted","Dashed","LongDashed","LongDotDashed"}`
	* Default: `"Solid"`

### rectangle
Rectangle control

- `name` (required)
    * Description: Unique control name within block
    * Type: `string`

- `x`, `y`, `width`, `height`
    * Description: Position and dimensions
    * Type: `int`

- `borderWidth`
    * Description: Border thickness (all sides)
    * Type: `int`

- `backColor`, `borderColor`
    * Description: Fill and border colors
    * Type: `string`, format `"#RRGGBB"` (no alpha allowed); e.g. `"#0000FF"`

- `borderStyle(Top|Bottom|Left|Right)`
    * Description: Per‑side border dash style
    * Type: `enum{"Solid","None","Dotted","Dashed","LongDashed","LongDotDashed"}`
	* Default: `"Solid"`

- `borderRadius(TopLeft|TopRight|BottomLeft|BottomRight)`
    * Description: Per‑corner rounding radius
    * Type: `int`

---

# EXAMPLES

## Example 1
Simple Query with For Each exposed as REST
~~~
Procedure ListCustomers
{
	For Each Customer
		Where CustomerActive // boolean attribute
		&Customers.Add(&CustomerId, CustomerName, CustomerEmail)
	EndFor

	#Rules
		parm(out: &Customers);
	#End

	#Conditions
	#End

	#Variables
		Customers [ DataType = 'CustomerInfo', Collection = 'True' ]
	#End

	#Properties
		ExposeAsWebService = true
		WebServiceProtocol = "REST Protocol"
	#End
}
~~~

## Example 2
Create with New Command
~~~
Procedure AddProduct
{
	New
		ProductName = &Name
		ProductDescription = &Description
	EndNew

	#Rules
		parm(in: &Name, in: &Description);
	#End

	#Conditions
	#End

	#Variables
		Name [ DataType = 'Attribute:ProductName' ]
		Description [ DataType = 'Attribute:ProductDescription' ]
	#End
}
~~~

## Example 3
Create with Business Component
~~~
Procedure AddProduct
{
	&Product = new()
	&Product.ProductName = &Name
	&Product.ProductDescription = &Description
	&Product.Save()

	#Rules
		parm(in: &Name, in: &Description);
	#End

	#Conditions
	#End

	#Variables
		Name [ DataType = 'Attribute:ProductName' ]
		Description [ DataType = 'Attribute:ProductDescription' ]
		Product [ DataType = 'Product' ]
	#End
}
~~~

## Example 4
Read with For Each
~~~
Procedure GetProduct
{
	For Each
		Where ProductId = &Id
		&Name = ProductName
		&Description = ProductDescription
	EndFor

	#Rules
		parm(in: &Id, out: &Name, out: &Description);
	#End

	#Conditions
	#End

	#Variables
		Id [ DataType = 'Attribute:ProductId' ]
		Name [ DataType = 'Attribute:ProductName' ]
		Description [ DataType = 'Attribute:ProductDescription' ]
	#End
}
~~~

## Example 5
Read with Business Component
~~~
Procedure GetProduct
{
	&Product.Load(&Id)
	&Name = &Product.ProductName
	&Description = &Product.ProductDescription

	#Rules
		parm(in: &Id, out: &Name, out: &Description);
	#End

	#Conditions
	#End

	#Variables
		Id [ DataType = 'Attribute:ProductId' ]
		Name [ DataType = 'Attribute:ProductName' ]
		Description [ DataType = 'Attribute:ProductDescription' ]
		Product [ DataType = 'Product' ]
	#End
}
~~~

## Example 6
Update with For Each
~~~
Procedure UpdateProduct
{
	For Each
		Where ProductId = &Id
		ProductName = &Name
		ProductDescription = &Description
	EndFor
	Commit

	#Rules
		parm(in: &Id, in: &Name, in: &Description);
	#End

	#Conditions
	#End

	#Variables
		Id [ DataType = 'Attribute:ProductId' ]
		Name [ DataType = 'Attribute:ProductName' ]
		Description [ DataType = 'Attribute:ProductDescription' ]
	#End
}
~~~

## Example 7
Update with Business Component
~~~
Procedure UpdateProduct
{
	&Product.Load(&Id)
	&Product.ProductName = &Name
	&Product.ProductDescription = &Description
	&Product.Save()

	#Rules
		parm(in: &Id, in: &Name, in: &Description);
	#End

	#Conditions
	#End

	#Variables
		Id [ DataType = 'Attribute:ProductId' ]
		Name [ DataType = 'Attribute:ProductName' ]
		Description [ DataType = 'Attribute:ProductDescription' ]
		Product [ DataType = 'Product' ]
	#End
}
~~~

## Example 8
Delete with For Each
~~~
Procedure DeleteProduct
{
	For Each
		Where ProductId = &Id
		Delete
	EndFor

	#Rules
		parm(in: &Id);
	#End

	#Conditions
	#End

	#Variables
		Id [ DataType = 'Attribute:ProductId' ]
	#End
}
~~~

## Example 9
Delete with Business Component
~~~
Procedure DeleteProduct
{
	&Product.Load(&Id)
	&Product.Delete()

	#Rules
		parm(in: &Id);
	#End

	#Conditions
	#End

	#Variables
		Id [ DataType = 'Attribute:ProductId' ]
		Product [ DataType = 'Product' ]
	#End
}
~~~

## Example 10
Sub and Do Commands
~~~
Procedure CalculateTotal
{
	For Each Invoice.InvoiceLine
		Where InvoiceId = &InvoiceId
		&Total = &Total + InvoiceLinePrice
	EndFor

	Do 'ApplyTax'

	Sub 'ApplyTax' /* in: &Total, out: &Total */
		&Total = &Total * 1.22
	EndSub

	#Rules
		parm(in: &InvoiceId, out: &Total);
	#End

	#Conditions
	#End

	#Variables
		InvoiceId [ DataType = 'Numeric(10.0)' ]
		Total [ DataType = 'Numeric(10.2)' ]
	#End
}
~~~

## Example 11
Nested For Each (Control Break)

~~~
Procedure ListCustomersByCountry
{
	For Each Customer
		Order CountryName
		msg(Format(!"Country: %1", CountryName), status)
		For Each Customer
			Order CustomerName
			msg(Format(!"- Customer: %1", CustomerName), status)
		EndFor
	EndFor

	#Rules
	#End

	#Conditions
	#End

	#Variables
	#End
}
~~~

## Example 12
For Each with Sublevel
~~~
Procedure UpdateProductDescription
{
	For Each Product
		Where ProductId = &ProductId
		For each Product.ProductVariations
			&VariationSummary += newline() + "Name: " + ProductVariationName + " Color: " + ProductVariationColor
		EndFor
		ProductDescription = &VariationSummary
	EndFor
	Commit

	#Rules
		parm(in: &ProductId);
	#End

	#Conditions
	#End

	#Variables
		ProductId [ DataType = 'Attribute:ProductId' ]
		VariationSummary [ DataType = 'LongVarChar(4K)' ]
	#End
}
~~~

## Example 13
Parm with Attribute Parameter (Implicit Base Table Determination)
~~~
Procedure GetCustomerDiscount
{
	For Each
		&Discount = CustomerDiscount
	EndFor

	#Rules
		parm(in: CustomerId, out: &Discount);
	#End

	#Conditions
	#End

	#Variables
		Discount [ DataType = 'Attribute:CustomerDiscount' ]
	#End
}
~~~

Notes:
- Input parameter (`CustomerId`) is an attribute (without `&` prefix), not a variable
- Implicit filter applied, no `Where CustomerId = …` needed

## Example 14
Procedure with Report Layout
~~~
Procedure CustomerSalesReport
{
	Print Header

	For Each Invoice
		Where InvoiceDate >= &FromDate
		Where InvoiceDate <= &ToDate
		Print ReportLine
	EndFor

	Print Footer

	#Rules
		parm(in: &FromDate, in: &ToDate);
		Output_File('CustomerSalesReport.pdf', 'PDF');
	#End

	#Conditions
	#End

	#Variables
		FromDate [ DataType = 'Date' ]
		ToDate [ DataType = 'Date' ]
	#End

	#Layout
		<layout type="Report">
			<printBlock name="Header" height="60">
				<label
					name="Title"
					text="Customer Sales Report"
					x="20"
					y="20"/>
			</printBlock>
			<printBlock name="ReportLine">
				<attribute
					name="InvoiceId"
					attribute="InvoiceId"
					x="20"
					y="4"/>
				<attribute
					name="InvoiceDate"
					attribute="InvoiceDate"
					x="180"
					y="4"/>
				<attribute
					name="InvoiceAmount"
					attribute="InvoiceAmount"
					x="520"
					y="4"
					alignment="MiddleRight"/>
			</printBlock>
			<printBlock name="Footer" height="40">
				<label
					name="FooterText"
					text="Generated with GeneXus Procedure Layout"
					x="20"
					y="10"/>
			</printBlock>
		</layout>
	#End
}
~~~

## Example 15
Command-line procedure capturing git version
~~~
Procedure GetGitVersion
{
	&OutputFile = new()
	&OutputFile.Source = Format(!"./tmp_%1.out", Guid.NewGuid())

	&Command = Format(!"git --version > %1 2>&1", &OutputFile.Source)

	msg(!"[INFO] Getting git version", status)
	&ExitCode = Shell(&Command)

	&OutputText = iif(&ExitCode = 0, &OutputFile.ReadAllText(!"UTF-8").Trim(), !"Not installed")
	msg(Format(!"[INFO] ExitCode=%1 Version=%2", &ExitCode, &OutputText), status)

	&OutputFile.Delete()

	#Rules
		parm(out: &OutputText);
	#End

	#Conditions
	#End

	#Variables
		Command [ DataType = 'VarChar(512)' ]
		ExitCode [ DataType = 'Numeric(4.0)' ]
		OutputText [ DataType = 'LongVarChar(4K)' ]
		OutputFile [ DataType = 'File' ]
	#End

	#Properties
		MainProgram = true
		CallProtocol = "Command Line"
	#End
}
~~~

## Example 16
Procedure with embedded native code
~~~
Procedure GetCurrentProcessId
{
	JAVA	[!&ProcessId!] = (int) ProcessHandle.current().pid();

	CSHARP	#if NETCOREAPP
	CSHARP	[!&ProcessId!] = System.Environment.ProcessId;
	CSHARP	#else
	CSHARP	[!&ProcessId!] = System.Diagnostics.Process.GetCurrentProcess().Id;
	CSHARP	#endif

	#Rules
		parm(out: &ProcessId);
	#End

	#Variables
		ProcessId [ DataType = 'Numeric(10.0)' ]
	#End
}
~~~
