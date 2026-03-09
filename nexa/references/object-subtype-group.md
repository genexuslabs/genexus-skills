---
name: object-subtype-group
description: Object specialization through subtypes
---

Defines object specialization allowing type hierarchies and polymorphism

---

# DEFINITION
A `SubType Group` is a logical container of `SubType` items derived from the same or related supertypes

Purpose:
- Acts as a “virtual” transaction, defines structure and semantics but is not physically stored
- Each SubType is an alias of an existing Attribute or SubType, enabling reuse with a new name without duplicating data

Use cases:
- Model the same entity in different roles (e.g. Sender/Receiver, Departure/Arrival)
- Preserve semantic clarity without data duplication
- Support optimized relational model and interface generation

---

# SYNTAX
~~~
Group <name>
{
	<name-type-1> : <base-type-1>
	[
		<properties-1>
	]

	…

	<name-type-N>: <base-type-N>
	[
		<properties-N>
	]

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
- `<name-type-i>`: Subtype alias derived from `<base-type-i>` with contextual/role prefix
- `<base-type-i>`: Existing Attribute or SubType
- `<properties-i>`: Overridden supertype properties; omit if none
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-subtype-group.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `subtype`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Each subtype name must be unique
- Each subtype inherits from an existing attribute or other subtype

---

# EXAMPLES

## Example 1
Suppose `Technician` transaction defined as follows
~~~
Transaction Technician
{
	TechnicianId* [ DataType = 'Id' ]
	TechnicianName!
	[
		DataType = 'Name'
		Description = 'Technician first name'
	]
	TechnicianLastName
	[
		DataType = 'Name'
		Description = 'Technician last name'
	]
	TechnicianPhone [ DataType = 'Phone, GeneXus' ]
	CountryId [ DataType = 'Id' ]
	CountryName [ DataType = 'Name' ]
	CityId [ DataType = 'Id' ]
	CityName [ DataType = 'Name' ]

	#Rules
	#End

	#Events
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Mode [ DataType = 'Character(3)' ]
	#End
}
~~~

Role-specific references to the same `Technician` as primary or substitute in another Transaction require the following SubType Group
~~~
Group SubstituteTechnician
{
	SubstituteTechnicianId : TechnicianId
	[
		Description = 'Substitute technician identifier'
	]

	SubstituteTechnicianName : TechnicianName
	#Properties
		"Description" = "Represents the substitute technician role"
	#End
}
~~~

Now any transaction can reference both primary and substitute technician attributes without properties

## Example 2
Suppose `Airport` transaction defined as follows
~~~
Transaction Airport
{
	AirportId* [ DataType = 'Id' ]
	AirportName! [ DataType = 'Name' ]
	CountryId [ DataType = 'Id' ]
	CountryName [ DataType = 'Name' ]
	CityId [ DataType = 'Id' ]
	CityName [ DataType = 'Name' ]

	#Rules
	#End

	#Events
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Mode [ DataType = 'Character(3)' ]
	#End
}
~~~

Dual relationships to the same entity in a `Flight` transaction require the following SubType Groups
~~~
Group DepartureAirport
{
	DepartureAirportId : AirportId
	[
		Description = 'Identifier of the departure airport'
	]

	DepartureAirportName : AirportName
	[
		Description = 'Name of the departure airport'
	]

	#Properties
		"Description" = "Represents the airport from which the flight departs"
	#End
}
~~~

~~~
Group ArrivalAirport
{
	ArrivalAirportId : AirportId
	[
		Description = 'Identifier of the arrival airport'
	]

	ArrivalAirportName : AirportName
	[
		Description = 'Name of the arrival airport'
	]

	#Properties
		"Description" = "Represents the airport at which the flight arrives"
	#End
}
~~~

Now `Flight` references departure and arrival airport attributes without properties; SubType Groups define them implicitly

## Example 3
Suppose `Employee` transaction defined as follows
~~~
Transaction Employee
{
	EmployeeId* [ DataType = 'Id' ]
	EmployeeName! [ DataType = 'Name' ]
	ManagerId []
	ManagerName []

	#Rules
	#End

	#Events
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Mode [ DataType = 'Character(3)' ]
	#End
}
~~~

Hierarchical self-relationships from `Employee` require the following SubType Group:
~~~
Group ManagerEmployee
{
	ManagerId : EmployeeId
	[
		Description = "Manager's identifier"
	]

	ManagerName : EmployeeName
	[
		Description = "Manager's name"
	]
}
~~~

Now `Employee` can reference manager attributes without properties

## Example 4
Suppose the `Person` transaction and two specialized transactions, `Student` and `Employee`, defined as follows
~~~
Transaction Person
{
	PersonId* [ DataType = 'Id' ]
	PersonName! [ DataType = 'Name' ]

	#Rules
	#End

	#Events
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Mode [ DataType = 'Character(3)' ]
	#End
}
~~~

~~~
Transaction Student
{
	StudentId* []
	StudentName! []
	StudentUniversity [ DataType = 'Name' ]

	#Rules
	#End

	#Events
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Mode [ DataType = 'Character(3)' ]
	#End
}
~~~

~~~
Transaction Employee
{
	EmployeeId* []
	EmployeeName! []
	EmployeeHireDate [ DataType = 'Date' ]

	#Rules
	#End

	#Events
	#End

	#Variables
		Today
		Time [ DataType = 'Character(8)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
		Mode [ DataType = 'Character(3)' ]
	#End
}
~~~

Inheritance relationships (students and employees as persons) require the following SubType Groups
~~~
Group Student
{
	StudentId : PersonId
	[
		Description = "Student identifier"
	]

	StudentName : PersonName
	[
		Description = "Student full name"
	]

	#Properties
		"Description" = "Represents a student as a specialized type of person"
	#End
}
~~~

~~~
Group Employee
{
	EmployeeId : PersonId
	[
		Description = "Employee identifier"
	]

	EmployeeName : PersonName
	[
		Description = "Employee full name"
	]

	#Properties
		"Description" = "Represents an employee as a specialized type of person"
	#End
}
~~~
