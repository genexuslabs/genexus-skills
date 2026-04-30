---
name: properties-object-data-view-platform
description: Configurable data view platform properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL
Include [General](./properties-common.md) properties

## Name
- Description: Physical external table name for selected platform
- Type: `string`

## Location
- Description: Source location: file path, directory, library, or database name
- Type: `string`
- Scope:
	* `ACCESS`
	* `AS400`
	* `DB2400`
	* `DBFCDX`
	* `DBFIDX`
	* `Informix`
	* `Oracle`
	* `SQLServer`
	* `SQLCE`
	* `POSTGRESQL`
	* `MySQL`
	* `SQLite`
	* `Service`
	* `HANA`
	* `Dameng`

## Record format
- Description: Physical file record format name
- Type: `string`
- Scope:
	* `AS400`

## Schema name
- Description: Schema or owner qualifying the external object name
- Type: `string`
- Scope:
	* `DB2Common`
	* `Informix`
	* `Oracle`
	* `SQLServer`
	* `SQLCE`
	* `POSTGRESQL`
	* `MySQL`
	* `HANA`
	* `Dameng`

## Use external name
- Description: Use external or internal table name
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use the external name
	* `No`: Use the internal name
- Default: `Yes`
- Scope:
	* `ACCESS`
	* `AS400`
	* `DB2Common`
	* `DB2400`
	* `DBFCDX`
	* `DBFIDX`
	* `Informix`
	* `Oracle`
	* `SQLServer`
	* `SQLCE`
	* `POSTGRESQL`
	* `MySQL`
	* `SQLite`
	* `Service`
	* `HANA`
	* `Dameng`

---

# ACCESS SPECIFIC
Specific properties for `Access` connector

## Data format
- Description: Source format
- Type: `enum{Access,ADO,Text,Foxpro 2.6}`
- Options:
	* `Access`: Access database file
	* `ADO`: ADO provider
	* `Text`: Delimited or fixed-length text files
	* `Foxpro 2.6`: FoxPro 2.6 tables
- Default: `Access`

## Character set
- Description: Character encoding used to read text files
- Type: `enum{OEM,ANSI}`
- Options:
	* `OEM`: OEM encoding
	* `ANSI`: ANSI encoding
- Default: `OEM`

## Date format
- Description: Date mask used to parse text-file date values; e.g. `mm-dd-yy`
- Type: `string`

## Column headings
- Description: Whether first row is treated as column names
- Type: `enum{Yes,No}`
- Options:
	* `No`: First row is data
	* `Yes`: First row is column names
- Default: `No`

## Field separation
- Description: Delimiter strategy used to split text-file fields
- Type: `enum{Fixed Length,CSV Delimited,Tab Delimited,Comma Delimited,Space Delimited,Semicolon Delimited}`
- Options:
	* `Fixed Length`: Fixed positions
	* `CSV Delimited`: CSV rules
	* `Tab Delimited`: Tab-separated values
	* `Comma Delimited`: Comma-separated values
	* `Space Delimited`: Space-separated values
	* `Semicolon Delimited`: Semicolon-separated values
- Default: `Fixed Length`

## Currency decimal symbol
- Description: Decimal separator used in currency values
- Type: `string`

## Currency thousand symbol
- Description: Thousands separator used in currency values
- Type: `string`

## Numeric decimal symbol
- Description: Decimal separator used in numeric values
- Type: `string`

## Provider
- Description: Provider name used for `ADO` access
- Type: `string`
