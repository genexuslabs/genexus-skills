---
name: object-deployment-unit
description: Deployment unit definition grouping objects to be deployed together
---

Defines a `Deployment Unit` object (`DeploymentUnitCategory`) as a deployable group of objects

---

# DEFINITION
A `Deployment Unit` object (or `DPU`) defines a set of objects to be deployed together

Typically, applications split deployment units by layers such as front office, backend, and services

---

# SYNTAX
~~~
DeploymentUnitCategory <name>
{
	<objects>

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
- `<objects>`: List of object names to deploy together, one per line
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-deployment-unit.md)
- `<documentation>`: Optional object documentation; check [common-markdown](./common-markdown.md)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `deploymentunitcategory`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Include only deployable references supported by GeneXus Deployment Unit object scope (main objects, file objects, and business process diagram objects)
- Declare one referenced object per line
- Qualify object names by module when applicable
- Never duplicate object references inside the same deployment unit
- For updates, preserve unchanged object entries and modify only requested items

---

# REMARKS
- Deploying a `Deployment Unit` object packages the objects defined in it and their dependencies according to GeneXus deployment behavior

---

# EXAMPLES

## Example 1
Simple Deployment Unit for backend services
~~~
DeploymentUnitCategory BackendServices
{
	MyCompany.Salaries.CalculateSalaries
	MyCompany.Employees.CalculateChristmasBonuses
}
~~~

## Example 2
Simple Deployment Unit for front-end
~~~
DeploymentUnitCategory Frontend
{
	MainPanel
}
~~~
