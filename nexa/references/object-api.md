---
name: object-api
description: API endpoints delegating to implementation objects
---

Defines API services delegating implementation to callable objects, with REST as default priority

---

# DEFINITION
An `API` object (or `API`) consists of entry points defining services delegating implementation to callable objects

Protocol guidance:
- Prefer `REST` as default protocol
	* Applies to public/external integrations and standard HTTP clients
	* Set `Call Protocol = HTTP`
	* Set `gRPC Protocol = False`
- Choose `gRPC` only when explicitly requested
	* Applies to internal service-to-service contracts with strict typing
	* Set `gRPC Protocol = True`
	* Set `Generate OpenAPI interface = No`
- Keep one service definition mode:
	* Prefer `API` object exposure layer with reference to implementation objects
	* Define `Web Service` exposure in target object only when explicitly requested


---

# SYNTAX
~~~
API <name>
{
	<name>
	{
		[<annotation-1-1>]
		…
		[<annotation-1-M>]
		<service-1>(<parameter-list-1>)
			=> <implementation-1>(<argument-list-1>);

		…

		[<annotation-N-1>]
		…
		[<annotation-N-K>]
		<service-N>(<parameter-list-N>)
			=> <implementation-N>(<argument-list-N>);
	}

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
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<annotation-i-j>`: j-th annotation for i-th service (RestMethod, RestPath, Header, Description, SecurityLevel, SecurityPermission)
- `<service-i>`: i-th service exposed name with parameters
- `<parameter-list-i>`: Comma-separated variable parameters with operator (`in`, `out`, `inout`); optional parameters in brackets
- `<implementation-i>`: Implementation object (Procedure, DataProvider, or other callable object)
- `<argument-list-i>`: Comma-separated variables or constants for implementation call
- `<events>`: Event handlers (Before, After, service-specific)
- `<variables>`: Variable definitions with mandatory `DataType`
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-api.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))


---

# ANNOTATIONS

## RestMethod
Defines REST method

Syntax: `[RestMethod(<method>)]`

Where:
- `<method>`: HTTP verb (`GET`, `POST`, `PUT`, `DELETE`)
- Default: `GET` if omitted

Example:
~~~
[RestMethod(POST)]
~~~

## RestPath
Defines custom REST path

Syntax: `[RestPath(<path>)]`

Where:
- `<path>`: Custom REST path with variable interpolation using `{&varname}`
- Default: service name if omitted

Example:
~~~
[RestPath('/customers/{&CustomerId}')]
~~~

## Header
Service parameter received from an HTTP header

Syntax: `[Header(<name>, <value>)]`

Where:
- `<name>`: Header name (constant string)
- `<value>`: Variable receiving header value

Example:
~~~
[Header('Logged-User', &UserId)]
~~~

## Description
Short, simple, and concise service description

Syntax: `[Description(<description>)]`

Where:
- `<description>`: Short service description
- Strongly recommended; mandatory when `Included in MCP Server` property enabled

## SecurityLevel
Level required for executing the service

Syntax: `[SecurityLevel(<level>)]`

Where:
- `<level>`: Access requirement
	* `None`: No authentication (default)
	* `Authentication`: User must be authenticated
	* `Authorize`: User must be authenticated and authorized

Example:
~~~
[SecurityLevel(Authentication)]
~~~

## SecurityPermission
Permission required for executing the service

Syntax: `[SecurityPermission(<permission>)]`

Where:
- `<permission>`: Permission name or role required

Example:
~~~
[SecurityPermission("Read_Permission")]
~~~

---

# EVENTS
See [common-events](./common-events.md)

Allowed event names:
- `Before`
- `<service>.Before`
- `<service>.After`
- `After`

Execution sequence:
1. `Before`
2. `<service>.Before`
3. Service implementation call
4. `<service>.After`
5. `After`

Notes:
- Service `in` parameters can be initialized in `Before`
- Service `out` parameters can be initialized in `After`
- API event code must not use direct DB access commands (`For each`, `New`, `Delete`, `Commit`, `Rollback`)

Example:
~~~
Event Before
	msg(format(!"[INFO] Receive: %1", &RestMethod), status)
EndEvent
~~~

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `api`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Include [common-standard-variables](./common-standard-variables.md) according to API context
- Implementation calls match object `Parm` rule signature
- Annotations written before service declaration
- Service parameters can omit `in` params (initialized in Before event)
- Service can define `out` params not in implementation (initialized in After event)
- Event code must be orchestration only; never include direct DB access commands
- Keep API execution under HTTP semantics by setting `Call Protocol = HTTP` when exposing REST behavior
- Keep either `API` object references or object-level `Web Service` definition, never both

---

# EXAMPLES

## Example 1
Simple API
~~~
API CustomerAPI
{
	CustomerAPI
	{
		[Description("List all customers")]
		ListCustomers(out: &CustomerList)
			=> GetAllCustomers(&CustomerList);

		[Description("Get information on a particular customer")]
		GetCustomer(in: &CustomerId, out: &CustomerInfo)
			=> GetCustomer(&CustomerId, &CustomerInfo);
	}

	#Events
	#End

	#Variables
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		RestMethod [ DataType = 'HttpMethod, GeneXus' ]
		RestCode [ DataType = 'Numeric(3.0)' ]
		CustomerList
		[
			DataType = 'CustomerInfo',
			Collection = 'True'
		]
		CustomerInfo [ DataType = 'CustomerInfo' ]
		CustomerId [ DataType = 'Numeric(8.0)' ]
	#End

	#Properties
		MainProgram = true
	#End
}
~~~

## Example 2
CRUD API with Custom Paths
~~~
API CustomerAPI
{
	CustomerAPI
	{
		[Description("List all Customers")]
		[RestPath("/customers")]
		ListCustomers(out: &CustomerList)
			=> GetAllCustomers(&CustomerList);

		[Description("Get information on a particular Customer")]
		[RestMethod(GET)]
		[RestPath("/customers/{&CustomerId}")]
		GetCustomer(in: &CustomerId, out: &CustomerInfo)
			=> GetCustomer(&CustomerId, &CustomerInfo);

		[Description("Add a new customer")]
		[RestMethod(POST)]
		[RestPath("/customers")]
		AddCustomer(in: &CustomerInfo, out: &CustomerId)
			=> CreateCustomer(&CustomerInfo, &CustomerId);

		[Description("Update an existing customer")]
		[RestMethod(PUT)]
		[RestPath("/customers/{&CustomerId}")]
		UpdateCustomer(in: &CustomerId, in: &CustomerInfo)
			=> UpdateCustomer(&CustomerId, &CustomerInfo);

		[Description("Delete a customer")]
		[RestMethod(DELETE)]
		[RestPath("/customer/{&CustomerId}")]
		DeleteCustomer(in: &CustomerId)
			=> DeleteCustomer(&CustomerId);
	}

	#Events
	#End

	#Variables
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		RestMethod [ DataType = 'HttpMethod, GeneXus' ]
		RestCode [ DataType = 'Numeric(3.0)' ]
		CustomerList
		[
			DataType = 'CustomerInfo',
			Collection = 'True'
		]
		CustomerInfo [ DataType = 'CustomerInfo' ]
		CustomerId [ DataType = 'Numeric(8.0)' ]
	#End
}
~~~

## Example 3
API with Header and Events
~~~
API BookAPI
{
	BookAPI
	{
		[Description("Get all books written by a given Author")]
		[RestPath("author/{&AuthorId}/books")]
		[Header('Logged-User', &UserId)]
		SearchBooksByAuthor(in: &UserId, in: &AuthorId, out: &BookList)
			=> GetBooksByAuthor(&AuthorId, &BookList);
	}

	#Events
		Event SearchBooksByAuthor.Before
			If NOT IsRegisteredUser(&UserId)
				&RestCode = 403
				Return
			EndIf
		EndEvent
	#End

	#Variables
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		RestMethod [ DataType = 'HttpMethod, GeneXus' ]
		RestCode [ DataType = 'Numeric(3.0)' ]
		BookList
		[
			DataType = 'Book',
			Collection = 'True'
		]
		AuthorId [ DataType = 'Attribute:AuthorId' ]
		UserId [ DataType = 'Attribute:UserId' ]
	#End
}
~~~

---

# RUNTIME URL
Describes how to construct the runtime invocation URL for an `API` object service

## URL pattern
~~~
<server>:<port>/<APIObjectName><RestPath>
~~~

Where:
- `<server>:<port>`: Server host and port where the application is deployed (e.g. `http://localhost:8080`)
- `<APIObjectName>`: Name from the `API` object declaration (first line: `API <name>`)
- `<RestPath>`: Value from the `[RestPath(...)]` annotation of the target service; path variables `{&varname}` are replaced with actual values

## How to resolve
1. Read the `API` object definition
2. Extract `<APIObjectName>` from the first line (`API <name>`)
3. Locate the target service and read its `[RestMethod(<method>)]` annotation for the HTTP verb
4. Read its `[RestPath(<path>)]` annotation for the path segment
5. Compose the URL as `<server>:<port>/<APIObjectName><RestPath>`

## Example
Given:
~~~
API CustomerAPI
{
	CustomerAPI
	{
		[RestMethod(GET)]
		[RestPath("/customers/{&CustomerId}")]
		GetCustomer(in: &CustomerId, out: &CustomerInfo)
			=> GetCustomer(&CustomerId, &CustomerInfo);
	}
	...
}
~~~

The runtime URL for getting customer with Id 5:
~~~
GET http://localhost:8080/CustomerAPI/customers/5
~~~
