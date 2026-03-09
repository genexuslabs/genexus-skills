---
name: properties-object-structured-data-type
description: Configurable structured data type properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Exposed name
- Description: Name exposed to external interfaces
- Type: `string`

## Exposed namespace
- Description: Namespace exposed to external interfaces
- Type: `string`

## Json Input Format
- Description: Input JSON wrapping strategy for services
- Type: `enum{Wrapped,Unwrapped}`
- Options:
	* `Wrapped`: Includes wrapper/root element in serialized output
	* `Unwrapped`: Omits wrapper/root element in serialized output
- Default: `Wrapped`

## IsSapParameter
- Description: Mark object as SAP parameter
- Type: `boolean`
- Default: `False`

## Dynamic structure
- Description: Allows dynamic member structure at runtime
- Type: `boolean`
- Default: `False`

---

# SDT ITEM GENERAL

## Title
- Description: Label shown in generated UI and tooling
- Type: `string`

## Column title
- Description: Column header shown in tabular UI
- Type: `string`

## ContextualTitle
- Description: Context-aware label shown in UI
- Type: `string`

## Formula
- Description: Expression used to calculate the value
- Type: `string`

## AllowNull
- Description: Allow null value
- Type: `boolean`
- Default: `False`

## EmptyAsNull
- Description: Define empty to null behavior
- Type: `enum{No Nulls,Empty as Null,Blank as Null,Compatible}`
- Options:
	* `No Nulls`: Keeps empty values as non-null values
	* `Empty as Null`: Converts empty input values to null
	* `Blank as Null`: Converts blank-only input values to null
	* `Compatible`: Uses legacy-compatible null handling behavior

## Class
- Description: Theme class applied to rendering
- Type: `string`

---

# SDT ITEM TYPE

## Supertype
- Description: Type selector that controls generation behavior
- Type: `string`

## Based on
- Description: Base attribute or domain used for definition
- Type: `string`

## Data Type
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

## Autonumber start
- Description: Initial value used by autonumber sequence
- Type: `integer`

## Autonumber step
- Description: Increment used by autonumber sequence
- Type: `integer`

## Autonumber for replication
- Description: Replicates autonumber values across environments
- Type: `boolean`
- Default: `True`

## Rows
- Description: Number of rows used by matrix or multiline controls
- Type: `integer`
- Default: `3`

## Initial value
- Description: Value assigned when no explicit value is provided
- Type: `string`

---

# SDT ITEM VALIDATION

## Value range
- Description: Allowed value interval for validation
- Type: `string`

## Validation Failed Message
- Description: Message shown when validation fails
- Type: `string`

---

# SDT ITEM PICTURE

## Left fill
- Description: Padding strategy applied to numeric formatting
- Type: `enum{Blank,Zero,Blank when Zero}`
- Options:
	* `Blank`: Pads unused leading positions with blanks
	* `Zero`: Pads unused leading positions with zeros
	* `Blank when Zero`: Uses blanks when the numeric value is zero
- Default: `Blank`

## Thousand separator
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

# SDT ITEM CONTROL

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

# SDT ITEM BEHAVIOR

## InputHistory
- Description: Enables device input history suggestions
- Type: `boolean`
- Default: `False`

## IsPassword
- Description: Masks text input as password
- Type: `boolean`

---

# SDT ITEM APPEARANCE

## AutoResize
- Description: Adjusts control size automatically to content
- Type: `boolean`

## Width
- Description: Width assigned to rendered control
- Type: `string`

## Height
- Description: Height assigned to rendered control
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
	* `Left`: Aligns content to the left
	* `Center`: Centers content horizontally
	* `Right`: Aligns content to the right
- Default: `Left`

## Format
- Description: Text rendering format mode in UI
- Type: `enum{Text,HTML,Raw HTML,Text with meaningful spaces}`
- Options:
	* `Text`: Renders content as plain text
	* `HTML`: Renders content as HTML with formatting support
	* `Raw HTML`: Outputs HTML without escaping or additional processing
	* `Text with meaningful spaces`: Preserves spaces and line breaks in rendered text

## TooltipText
- Description: Help text shown on hover or focus
- Type: `string`

## InviteMessage
- Description: Prompt text shown before user input
- Type: `string`

---

# SDT ITEM INTERFACE

## External Name
- Description: External parameter name used when the SDT item is exposed in services
- Type: `string`

## Required
- Description: Marks the service parameter as mandatory
- Type: `boolean`
- Default: `False`
