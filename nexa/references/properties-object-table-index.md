---
name: properties-object-table-index
description: Configurable table index properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL
Include [General](./properties-common.md) properties

## Storage area
Physical storage area used by the DBMS
- Type: `string`

## Initial size
Initial storage allocation size
- Type: `integer`

## First extent size
Size of first extent allocation
- Type: `integer`

## Next extents percentage increase
Growth percentage for next extents
- Type: `integer`

## Minimum number of extents
Minimum extents kept for the object
- Type: `integer`
