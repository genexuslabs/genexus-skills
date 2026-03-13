---
name: properties-object-domain
description: Configurable domain properties
---

Use this file to select editable Domain properties

---

# GENERAL

## Data Type
- Description: Logical type used for storage and validation
- Type: `string`

## Length
- Description: Maximum length for character or numeric values
- Type: `integer`

## Decimals
- Description: Decimal precision for numeric values
- Type: `integer`

## Signed
- Description: Allow negative numeric values
- Type: `boolean`

## Default
- Description: Default value used when no input value is provided
- Type: `string`

---

# VALIDATION

## Regular Expression
- Description: Validation pattern applied to accepted values
- Type: `string`

## Picture
- Description: Format mask used for display and parsing
- Type: `string`

## EnumValues
- Description: Allowed literals and labels for enumeration domains
- Type: `string`
