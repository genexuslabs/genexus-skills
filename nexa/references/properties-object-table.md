---
name: properties-object-table
description: Configurable table properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Cluster index
- Description: Index used as clustering index
- Type: `string`

## Storage area
- Description: Physical storage area used by the DBMS
- Type: `string`

## Indices storage area
- Description: Storage area used for indexes
- Type: `string`

## Text storage area
- Description: Storage area used for text segments
- Type: `string`

## Initial size
- Description: Initial storage allocation size
- Type: `integer`

## First extent size
- Description: Size of first extent allocation
- Type: `integer`

## Next extents percentage increase
- Description: Growth percentage for next extents
- Type: `integer`

## Minimum number of extents
- Description: Minimum extents kept for the object
- Type: `integer`

## Change frequency
- Description: Expected data volatility for caching heuristics
- Type: `enum{0. Pretty Often,1. Time to Time,2. Hardly Ever,3. Almost Never}`
- Options:
	* `0. Pretty Often`: Use this value when it matches the target behavior
	* `1. Time to Time`: Use this value when it matches the target behavior
	* `2. Hardly Ever`: Use this value when it matches the target behavior
	* `3. Almost Never`: Use this value when it matches the target behavior
- Default: `0. Pretty Often`


---

# SAP HANA PROPERTIES

## Table Storage Type
- Description: Storage strategy used by supported DB engines
- Type: `enum{Column Based,Row Based}`
- Options:
	* `Column Based`: Use this value when it matches the target behavior
	* `Row Based`: Use this value when it matches the target behavior
- Default: `Row Based`
