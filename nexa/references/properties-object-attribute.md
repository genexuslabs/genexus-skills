---
name: properties-object-attribute
description: Configurable attribute properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL
Include [General](./properties-common.md) properties

## Title
Label shown in generated UI and tooling
- Type: `string`

## ColumnTitle
Column header shown in tabular UI
- Type: `string`

## ContextualTitle
Context-aware label shown in UI
- Type: `string`

## Formula
Expression used to calculate the value
- Type: `string`

## AllowNull
Allows null values in persistence and runtime
- Type: `boolean`
- Default: `False`

## EmptyAsNull
How empty input is converted to null values
- Type: `enum{No Nulls,Empty as Null,Blank as Null,Compatible}`
- Options:
	* `No Nulls`: Empty input is stored as a concrete empty value, never as null
	* `Empty as Null`: Empty input is converted to null
	* `Blank as Null`: Blank-only input is converted to null
	* `Compatible`: Preserves compatibility behavior defined by GeneXus for legacy objects

## Class
Theme class applied to rendering
- Type: `string`


---

# TYPE DEFINITION

## SuperType
Name of supertype
- Type: `string`

## BasedOn
Base attribute or domain used for definition
- Type: `string`

## DataType
Logical type used for storage and validation
- Type: `string`

## Length
Maximum length for character or numeric values
- Type: `integer`
- Default: `4`

## Decimals
Decimal precision for numeric values
- Type: `integer`
- Default: `0`

## Signed
Allows negative numeric values
- Type: `boolean`
- Default: `False`

## Autonumber
Enables automatic sequential value generation
- Type: `boolean`

## AutonumberStart
Initial value used by autonumber sequence
- Type: `integer`

## AutonumberStep
Increment used by autonumber sequence
- Type: `integer`

## AutonumbeForReplication
Replicates autonumber values across environments
- Type: `boolean`
- Default: `True`

## Rows
Number of rows used by matrix or multiline controls
- Type: `integer`
- Default: `3`

## InitialValue
Value assigned when no explicit value is provided
- Type: `string`


---

# VALIDATION

## ValueRange
Allowed value interval for validation
- Type: `string`

## ValidationFailedMessage
Message shown when validation fails
- Type: `string`


---

# PICTURE

## LeftFill
Padding strategy applied to numeric formatting
- Type: `enum{Blank,Zero,Blank when Zero}`
- Options:
	* `Blank`: Pads unused leading positions with blanks
	* `Zero`: Pads unused leading positions with zeros
	* `Blank when Zero`: Uses blanks when the numeric value is zero
- Default: `Blank`

## ThousandSeparator
Displays group separator in numeric formatting
- Type: `boolean`
- Default: `False`

## Prefix
Static prefix added in formatted output
- Type: `string`

## Picture
Format mask used for display and parsing
- Type: `string`


---

# CONTROL INFO

## ControlType
UI control used to edit or display the value
- Type: `enum{Combo Box,Radio Button,Edit,Check Box,Dynamic Combo Box,List Box,Dynamic List Box,Image}`
- Options:
	* `Combo Box`: Renders a drop-down selector with fixed values
	* `Radio Button`: Renders mutually exclusive options as radio buttons
	* `Edit`: Renders a standard editable input field
	* `Check Box`: Renders a boolean value as a checkbox
	* `Dynamic Combo Box`: Renders a drop-down selector loaded dynamically
	* `List Box`: Renders a visible list selector with fixed values
	* `Dynamic List Box`: Renders a visible list selector loaded dynamically
	* `Image`: Renders the value as an image
- Default: `Edit`

## NotifyContextChange
Raises context-change notification for control updates
- Type: `boolean`


---

# BEHAVIOR

## InputHistory
Enables device input history suggestions
- Type: `boolean`
- Default: `False`

## IsPassword
Masks text input as password
- Type: `boolean`


---

# APPEARANCE

## AutoResize
Adjusts control size automatically to content
- Type: `boolean`

## Width
Calculated width of the element
- Type: `string`

## Height
Calculated height of the element
- Type: `string`

## Fill
Expands control to fill available layout space
- Type: `boolean`
- Default: `True`

## BackColor
Background color applied to the control
- Type: `string`

## ForeColor
Foreground/text color applied to the control
- Type: `string`

## Font
Font family and style used for rendering
- Type: `string`

## HorizontalAlignment
Horizontal alignment used for displayed text
- Type: `enum{Left,Center,Right}`
- Options:
	* `Left`: Aligns displayed content to the left
	* `Center`: Centers displayed content horizontally
	* `Right`: Aligns displayed content to the right
- Default: `Left`

## Format
Text rendering format mode in UI
- Type: `enum{Text,HTML,Raw HTML,Text with meaningful spaces}`
- Options:
	* `Text`: Renders content as plain text
	* `HTML`: Renders content as HTML with GeneXus formatting handling
	* `Raw HTML`: Outputs HTML without processing or escaping
	* `Text with meaningful spaces`: Renders plain text preserving spaces and line breaks

## TooltipText
Help text shown on hover or focus
- Type: `string`

## InviteMessage
Text to invite the user to interact with the object
- Type: `string`


---

# INTERFACE INFORMATION

## ExternalName
External name used when the variable is a service parameter
- Type: `string`

## Required
Value is Required when the variable is a service parameter
- Type: `boolean`
- Default: `False`
