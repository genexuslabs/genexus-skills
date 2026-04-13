---
name: object-data-provider
description: Declarative hierarchical data output definition
---

Defines hierarchical structured data output declaratively

---

# DEFINITION
A `DataProvider` object (or `DP`) is a declarative construction used to define hierarchical structured data output, focusing strictly on defining the output data instead of how to retrieve or transform it

---

# SYNTAX
~~~
DataProvider <name>
{
	<group>
	{
		<assignments>

		<item>
		<clauses>
		{
			<elements>
		}
	}

	#Rules
		<rules>
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
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<group>`: Root structure of the DataProvider output; must correspond to an existing SDT or Business Component (BC), or a synthetic container group representing a collection whose items match an SDT or BC structure
- `<assignments>`: Sequence of statements assigning values to previously declared variables; shortcut operators like `+=` are not allowed
- `<item>`: Subgroup within the main group representing an SDT or BC element, or each item structure when the root is a collection
- `<clauses>`: Optional clauses that control data retrieval and structure; must appear immediately after the group name
- `<elements>`: Assignments to SDT members or BC properties; must belong to the corresponding structure
- `<rules>`: Business rules globally applied; includes parameter definitions and other logic
- `<variables>`: All variables used in the object; each must define the mandatory `DataType` property
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-data-provider.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

Notes:
- Groups must always be defined in terms of an existing SDT or BC structure
- Elements must always correspond to SDT members or BC properties
- Variables must always be declared in `#Variables`
- Define an item group multiple times if needed to serve different purposes
- Maintain strict hierarchical nesting; groups contain elements or other groups
- Recursive calls to the DataProvider are allowed when the SDT or BC is recursively defined
- Clauses, if defined, must always be written immediately after the Group name (not at the end)
- Multimedia elements are assigned using a same-type variable loaded with `FromUrl` before each item subgroup

Remark:
The structure has three main components: `Groups`, `Elements`, and `Variables`

---

# CLAUSES
Defines how data is retrieved and structured. Clauses are valid only within inner groups and must follow strict order:

Order:
`Output` → `From` → `Order` → `Unique` → `Using` → `Input` → `Where`

Syntax:
~~~
[<output>]
[From <transactions>]
[Order <criteria> [When <condition>]]
[Unique <attributes>]
[Using <dataselectors>]
[Input <iterator>]
[Where <conditions>]
~~~

Where:
- `<output>`: Only one allowed:
	* `[Default]`: Output group only if previous group with same name is absent
	* `[NoOutput]`: Exclude group, include only its subelements
	* `[OutputIfDetail]`: Output collection with header and detail lines
	* `[Count = N]` `[Skip = M]`: Limit results; either or both allowed
	* `[One]`: Return only first record
- `<transactions>`: One or more base Transactions or Transaction.Levels, comma-separated
- `<criteria>`: Sorting attributes; parentheses indicate descending; may include functions, procedures, methods, properties, or the keyword `none`
- `<attributes>`: Comma-separated attributes enforcing uniqueness
- `<dataselectors>`: Comma-separated Data Selector invocations, including required parameters when applicable
- `<iterator>`:
	* For-To: `<var> = <start> to <end> [step <leap>]`
	* For-In: `<var> in <collection>`
- `<condition>`: Boolean expression for filtering or conditional ordering

Constraints:
- `From` must be omitted if base table is implicitly defined
- `Order` may appear multiple times and is applied by order of appearance; omit if satisfied by `Using`
- `Input` may appear multiple times (nested or sequential)
- `Where` may appear multiple times (AND condition); omit if satisfied by `Using`
- Any deviation from clause order is a syntax error

---

# OPERATORS
See [common-operators](./common-operators.md)

Notes:
- Shortcut operators such as `+=`, `-=`, `*=`, `/=` are not allowed in `<assignments>`
- Expressions may include functions, formulas, and operators supported by GeneXus

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `dataprovider`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Groups must correspond to existing SDT or BC structures
- Elements must belong to SDT or BC members or levels
- Variables must be defined in `#Variables` section
- Include [common-standard-variables](./common-standard-variables.md) according to DataProvider context
- Clauses must appear immediately after group name
- Maintain strict hierarchical nesting
- Recursive calls allowed for recursive SDT or BC
- Only one `<output>` clause per group
- Clause order must be strictly respected

---

# WEB SERVICE EXPOSURE
Choose one exposure mode:
- Reference this object from [API](./object-api.md) by default
- Configure this object as a `Web Service` only when explicitly requested:
	* Enable `Expose as Web Service` property
	* Define `Web Service Protocol` property with the protocol requested

---

# EXAMPLES

## Example 1
Listing today's invoices ordered by the amount
~~~
DataProvider Invoices
{
	Invoices
	{
		Date = today()
		Invoice Order InvoiceAmount
		Where InvoiceDate = today()
		{
			Id = InvoiceId
			CustomerId = CustomerId
			CustomerName = CustomerName
			Amount = InvoiceAmount
			Product
			{
				Id = ProductId
				DetailQuantity = InvoiceDetailQuantity
				DetailAmount = InvoiceDetailAmount
			}
		}
	}

	#Rules
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
	#End
}
~~~

## Example 2
Define application constants
~~~
DataProvider LoadChartConstants
{
	ChartConstants
	{
		ChartServer = 'https://quickchart.io/chart'
		ChartParameters = '?chart=%1&width=%2&height=%3&format=%4'
	}

	#Rules
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
	#End

	#Properties
		InferStructure = "Yes, if SDT is dynamic"
	#End
}
~~~

## Example 3
Load the Tabs elements for a tabbed view
~~~
DataProvider LoadTabs
{
	Tabs
	{
		Tab
		{
			Code = 'General'
			WebComponent = link(WCustomerGeneral, &CustomerId)
		}
		Tab
		{
			Code = 'Invoices'
			WebComponent = link(WCustomerInvoices, &CustomerId)
		}
	}

	#Rules
		parm(in: &CustomerId);
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		CustomerId [ DataType = 'Numeric(8.0)' ]
	#End

	#Properties
		Output = "Tab" // an existing SDT element
		Collection = true
		CollectionName = "Tabs"
	#End
}
~~~

## Example 4
RSS feed with today's invoices
~~~
DataProvider LoadRSS
{
	RSS
	{
		Version = "2.0"
		Channel
		{
			Title = "Today's Invoices"
			Link = link(ViewTodayInvoices)
			Item where InvoiceDate = today()
			{
				Title = format('Invoice %1', InvoiceId)
				Link = link(ViewInvoice, InvoiceId)
				Description = format('Invoice %1 for customer %2, amount %3', InvoiceId, CustomerName, InvoiceAmount)
				Author = 'system'
				PubDate = today()
			}
		}
	}

	#Rules
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
	#End

	#Properties
		Output = "RSS" // an existing SDT element
	#End
}
~~~

## Example 5
List the employees with their details exposed as REST
~~~
DataProvider Employees
{
	EmployeesItem
	{
		Id = EmployeeId
		Name = EmployeeName
		Address = EmployeeAddress
	}

	#Rules
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
	#End

	#Properties
		InferStructure = "Yes, if SDT is dynamic"
		ExposeAsWebService = true
		WebServiceProtocol = "REST Protocol"
	#End
}
~~~

## Example 6
Filter active partners by type ('CLIENT' or 'PROSPECT') with the `Using` clause to apply either `DSActiveClients` or `DSActiveProspects` based on an input filter
~~~
DataProvider ListActivePartners
{
	PartnerCollectionItem Using DSActiveClients()
	Where &FilterBy = 'CLIENT'
	{
		PartnerId = ClienteId
		PartnerName = ClienteName
	}

	PartnerCollectionItem Using DSActiveProspects()
	Where &FilterBy = ‘PROSPECT’
	{
		PartnerId = ProspectId
		PartnerName = ProspectName
	}

	#Rules
		parm(in: &FilterBy);
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		FilterBy [ DataType = 'VarChar(64)' ]
	#End

	#Properties
		Output = "PartnerCollection" // an existing SDT defined as a collection with items defined as 'PartnerCollectionItem'
	#End
}
~~~

## Example 7
Populate a Country transaction with predefined values
~~~
DataProvider PopulateCountry
{
	CountryCollection
	{
		&CountryFlag.FromUrl("https://flagcdn.com/w320/ar.png")
		Country
		{
			Countryd = 1
			CountryName = "Argentina"
			CountryFlag = &CountryFlag
		}

		&CountryFlag.FromUrl("https://flagcdn.com/w320/br.png")
		Country
		{
			CountryId = 2
			CountryName = "Brazil"
			CountryFlag = &CountryFlag
		}

		&CountryFlag.FromUrl("https://flagcdn.com/w320/cl.png")
		Country
		{
			CountryId = 3
			CountryName = "Chile"
			CountryFlag = &CountryFlag
		}
	}

	#Rules
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		CountryFlag [ DataType = 'Attribute:CountryFlag' ]
	#End
}
~~~

## Example 8
Populating collection another structure
~~~
DataProvider GetSimilarCountries
{
	CountryCollection
	{
		// Use the ListPopulatedCountries procedure to retrieve the top 10 countries most populated in real time
		&CountryCollection = ListPopulatedCountries(10);

		Country
		Input &Country in &CountryCollection
		{
			CountryId = &Country.Id
			CountryName = &Country.Name
		}
	}

	#Rules
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Country [ DataType = 'CountryData' ]
		CountryCollection
		[
			DataType = 'CountryData',
			Collection = 'True'
		]
	#End

	#Properties
		Output = "CountryData" // an existing SDT element
		Collection = true
		CollectionName = "CountryCollection"
	#End
}
~~~

## Example 9
Load hierarchical Employee-based structure recursively
~~~
DataProvider LoadSubEmployees
{
	SubEmployees
	{
		Employee
		Where ManagerId = &BossId
		{
			Id = EmployeeId
			Name = EmployeeName
			Subordinates = LoadSubEmployees(EmployeeId)
		}
	}

	#Rules
		parm(in: &BossId);
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		BossId [ DataType = 'Attribute:EmployeeId' ]
	#End

	#Properties
		Output = "SubEmployees" // an existing SDT element
	#End
}
~~~
