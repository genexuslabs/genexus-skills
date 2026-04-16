---
name: properties-object-attribute
description: Configurable attribute properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL
Include [General](./properties-common.md) properties

## Title
- Description: Label shown in generated UI and tooling
- Type: `string`

## ColumnTitle
- Description: Column header shown in tabular UI
- Type: `string`

## ContextualTitle
- Description: Context-aware label shown in UI
- Type: `string`

## Formula
- Description: Expression used to calculate the value
- Type: `string`

## AllowNull
- Description: Allows null values in persistence and runtime
- Type: `boolean`
- Default: `False`

## EmptyAsNull
- Description: How empty input is converted to null values
- Type: `enum{No Nulls,Empty as Null,Blank as Null,Compatible}`
- Options:
	* `No Nulls`: Empty input is stored as a concrete empty value, never as null
	* `Empty as Null`: Empty input is converted to null
	* `Blank as Null`: Blank-only input is converted to null
	* `Compatible`: Preserves compatibility behavior defined by GeneXus for legacy objects

## Class
- Description: Theme class applied to rendering
- Type: `string`


---

# TYPE DEFINITION

## SuperType
- Description: Name of supertype
- Type: `string`

## BasedOn
- Description: Base attribute or domain used for definition
- Type: `string`

## DataType
- Description: Logical type used for storage and validation
- Type: `string`

## Length
- Description: Maximum length for character or numeric values
- Type: `integer`
- Default: `4`

## Decimals
- Description: Decimal precision for numeric values
- Type: `integer`
- Default: `0`

## Signed
- Description: Allows negative numeric values
- Type: `boolean`
- Default: `False`

## Autonumber
- Description: Enables automatic sequential value generation
- Type: `boolean`

## AutonumberStart
- Description: Initial value used by autonumber sequence
- Type: `integer`

## AutonumberStep
- Description: Increment used by autonumber sequence
- Type: `integer`

## AutonumbeForReplication
- Description: Replicates autonumber values across environments
- Type: `boolean`
- Default: `True`

## Rows
- Description: Number of rows used by matrix or multiline controls
- Type: `integer`
- Default: `3`

## InitialValue
- Description: Value assigned when no explicit value is provided
- Type: `string`


---

# VALIDATION

## ValueRange
- Description: Allowed value interval for validation
- Type: `string`

## ValidationFailedMessage
- Description: Message shown when validation fails
- Type: `string`


---

# PICTURE

## LeftFill
- Description: Padding strategy applied to numeric formatting
- Type: `enum{Blank,Zero,Blank when Zero}`
- Options:
	* `Blank`: Pads unused leading positions with blanks
	* `Zero`: Pads unused leading positions with zeros
	* `Blank when Zero`: Uses blanks when the numeric value is zero
- Default: `Blank`

## ThousandSeparator
- Description: Displays group separator in numeric formatting
- Type: `boolean`
- Default: `False`

## Prefix
- Description: Static prefix added in formatted output
- Type: `string`

## Picture
- Description: Format mask used for display and parsing
- Type: `string`


---

# CONTROL INFO

## ControlType
- Description: UI control used to edit or display the value
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
- Description: Raises context-change notification for control updates
- Type: `boolean`


---

# BEHAVIOR

## InputHistory
- Description: Enables device input history suggestions
- Type: `boolean`
- Default: `False`

## IsPassword
- Description: Masks text input as password
- Type: `boolean`


---

# APPEARANCE

## AutoResize
- Description: Adjusts control size automatically to content
- Type: `boolean`

## Width
- Description: Calculated width of the element
- Type: `string`

## Height
- Description: Calculated height of the element
- Type: `string`

## Fill
- Description: Expands control to fill available layout space
- Type: `boolean`
- Default: `True`

## BackColor
- Description: Background color applied to the control
- Type: `string`

## ForeColor
- Description: Foreground/text color applied to the control
- Type: `string`

## Font
- Description: Font family and style used for rendering
- Type: `string`

## HorizontalAlignment
- Description: Horizontal alignment used for displayed text
- Type: `enum{Left,Center,Right}`
- Options:
	* `Left`: Aligns displayed content to the left
	* `Center`: Centers displayed content horizontally
	* `Right`: Aligns displayed content to the right
- Default: `Left`

## Format
- Description: Text rendering format mode in UI
- Type: `enum{Text,HTML,Raw HTML,Text with meaningful spaces}`
- Options:
	* `Text`: Renders content as plain text
	* `HTML`: Renders content as HTML with GeneXus formatting handling
	* `Raw HTML`: Outputs HTML without processing or escaping
	* `Text with meaningful spaces`: Renders plain text preserving spaces and line breaks

## TooltipText
- Description: Help text shown on hover or focus
- Type: `string`

## InviteMessage
- Description: Text to invite the user to interact with the object
- Type: `string`


---

# INTERFACE INFORMATION

## ExternalName
- Description: External name used when the variable is a service parameter
- Type: `string`

## Required
- Description: Value is Required when the variable is a service parameter
- Type: `boolean`
- Default: `False`
