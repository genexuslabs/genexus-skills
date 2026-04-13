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
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-procedure.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

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

Guideline:
1. Define the layout hierarchy as `layout` → `printBlock` → report controls
2. Use one `printBlock` per printed section and keep block names aligned with `Print` commands in code
3. All numeric values must not include unit
4. All color values must use hex representation, no alpha channel allowed; e.g. `#FF0000`

Nodes:
- `layout`: Root report container
	* Required: `type` (with `Report` value)
	* Optional:
		+ `paperSize`: `Custom` (default), `Letter`, `Legal`, `Executive`, `A3`, `A4`, `A5`
		+ `paperOrientation`: `Portrait` (default), `Landscape`
		+ `rightMargin`
		+ `width`, `height`: Only when `paperSize="Custom"`
		+ `attributeFont`, `textBlockFont`: Format `<font-family-name>, <font-size>`
- `printBlock`: Report band/section printed by `Print <block-name>`
	* Required: `name`
	* Optional:
		+ `height`
- `reportLabel`: Static text control
	* Required: `name`, `text`
	* Optional:
		+ `x`, `y`
		+ `width`, `height`, `borderWidth`
		+ `backColor`, `foreColor`, `borderColor`
		+ `borders`: `None` (default), `Top`, `Bottom`, `Left`, `Right`, `All`
		+ `alignment`: `TopLeft` (deafult), `TopCenter`, `TopRight`, `MiddleLeft`, `MiddleCenter`, `MiddleRight`, `BottomLeft`, `BottomCenter`, `BottomRight`, `TopJustify`, `MiddleJustify`, `BottomJustify`
		+ `font`: Syntax `<font-family>, <font-size>`
		+ `format`: `Text` (deault), `HTML` (enables HTML tags)
		+ `wordWrap`: `False` (default), `True`
- `reportAttribute`: Data-bound control
	* Required: `name`, `attribute` (Attribute object name)
	* Optional:
		+ Same as `reportLabel`
- `reportImage`: Image control
	* Required: `name`, `image` (Image object name)
	* Optional:
		+ `x`, `y`
		+ `width`, `height`
- `reportLine`: Line control
	* Required: `name`
	* Optional:
		+ `x`, `y`
		+ `width`, `lineWidth`
		+ `lineDirection`: `Horizontal`, `Vertical`
		+ `foreColor`
		+ `borderStyle`
- `reportRectangle`: Rectangle control
	* Required: `name`
	* Optional:
		+ `x`, `y`
		+ `width`, `height`, `borderWidth`
		+ `backColor`, `borderColor`
		+ `borderStyle(Top|Bottom|Left|Right)`
		+ `borderRadius(TopLeft|TopRight|BottomLeft|BottomRight)`

Note:
- Escape XML special characters in text-like values; e.g. use `&amp;` and not `&`

Minimal example:
~~~xml
<layout name="SalesReport" paperSize="A4">
	<printBlock name="Header" height="60">
		<reportLabel name="Title" text="Sales Report" x="20" y="20" width="240" height="16"/>
		<reportImage name="Logo" image="CompanyLogo" x="650" y="10" width="100" height="40"/>
	</printBlock>
	<printBlock name="Detail">
		<reportLine name="Separator" x="0" y="20" width="780" lineWidth="1"/>
		<reportAttribute name="InvoiceId" attribute="InvoiceId" x="20" y="4" width="120" height="14"/>
		<reportAttribute name="Amount" attribute="InvoiceAmount" x="600" y="4" width="120" height="14" alignment="MiddleRight"/>
	</printBlock>
</layout>
~~~

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
		<layout>
			<printBlock name="Header" height="60">
				<reportLabel name="Title" text="Customer Sales Report" x="20" y="20"/>
			</printBlock>
			<printBlock name="ReportLine">
				<reportAttribute name="InvoiceId" attribute="InvoiceId" x="20" y="4"/>
				<reportAttribute name="InvoiceDate" attribute="InvoiceDate" x="180" y="4"/>
				<reportAttribute name="InvoiceAmount" attribute="InvoiceAmount" x="520" y="4" alignment="MiddleRight"/>
			</printBlock>
			<printBlock name="Footer" height="40">
				<reportLabel name="FooterText" text="Generated with GeneXus Procedure Layout" x="20" y="10"/>
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
