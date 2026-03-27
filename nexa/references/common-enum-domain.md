---
name: common-enum-domain
desc: Enumerated Domain definition and usage
---

Defines a finite and fixed set of named constants over a single primitive data type

---

# CONFIGURATION
Set `EnumValues` property

Syntax: `<entry>(; <entry>)*`

Where
- `<entry>`: Enum entry; each one following `<name>, <description>, <value>` syntax
- `<name>`: Unique constant used in code
- `<description>`: User-facing value
- `<value>`: Literal of a single primitive type

Example:
~~~
DataType = "Numeric(1.0)"
EnumValues = 'Success, Process success, 1; Failure, Process failed, 2; Started, Process started, 3; Aborted, Process aborted, 4'
~~~

---

# METHODS

## Convert
Converts a raw value into the corresponding enumeration constant

Syntax: `<domain>.Convert(<value>)`

Example:
~~~
&Status = StatusDomain.Convert(2) // sets &Status with StatusDomain.Failure value
~~~

## Elements
Returns a collection containing all domain values

Syntax: `<domain>.Elements()`

Example:
~~~
For &Element in StatusDomain.Elements()
	msg(&Element, status) // prints 1, 2, 3, 4
EndFor
~~~

## EnumerationDescription
Returns the description associated with a domain value

Syntax: `<data>.EnumerationDescription(<value>)`

Example:
~~~
&Description = StatusDomain.EnumerationDescription(StatusDomain.Aborted)
msg(&Description, status) // prints 'Process aborted'
~~~

---

# CONSTRAINTS
- Enum domains must be referenced using dot (`.`) notation using the `<name>`, never use underlying `<value>`; e.g. `FlightStatus.Delayed`
- Each entry must comply with `<name>, <description>, <value>` syntax
- Each `<name>` and `<value>` must be unique
- All `<value>` entries must share the same primitive type
- `DataType` property is mandatory and must be defined before `EnumValues`
