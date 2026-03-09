---
name: object-url-rewrite
description: URL rewrite rules for user-friendly web routes
---

Defines a `URL Rewrite` object to map friendly URLs to web object invocations

---

# DEFINITION
A `URL Rewrite` object maps user-friendly URL patterns to target web object calls

It centralizes route definitions and parameter extraction for web navigation

---

# SYNTAX
~~~
URLRewrite <name>
{
	<rewrites>

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
- `<name>`: Object name using alphanumeric or underscore, starting with a letter
- `<rewrites>`: Rewrite rules `<source> => <target>`; mapping URL paths to GeneXus objects or invocations
- `<variables>`: Variable definitions used by route placeholders with mandatory `DataType`
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-url-rewrite.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `urlrewrite`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Define each rewrite rule with arrow (`=>`) and terminal semicolon (`;`)
- Keep route placeholders aligned with `#Variables` section declarations; e.g. `Id` → `{&Id}`
- Ensure each target object is web-callable and exists
- Never duplicate source patterns in the same `URLRewrite` object
- Never use `API` object as target of `URLRewrite` object
- Mapping restrictions:
	* Target objects must set `Encrypt URL parameters = No`
	* Environment must use `Parameters Style = Named`
	* Affected web objects should use `Web User Experience = Smooth`
- Treat `Link()` output as server-relative (`/path`) when any `URLRewrite` object exists
- Never overlap source patterns across `URLRewrite` objects
- Preserve unchanged rules and variables on updates

---

# EXAMPLES

## Example 1
Simple fixed routes
~~~
URLRewrite MainRoutes
{
	home => Home;
	about => About;

	#Variables
	#End
}
~~~

## Example 2
Parameterized route
~~~
URLRewrite CustomerRoutes
{
	customers/{&CustomerId} => ViewCustomer(&CustomerId);

	#Variables
		CustomerId [ DataType = 'Attribute:CustomerId' ]
	#End
}
~~~
