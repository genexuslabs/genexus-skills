---
name: sap-filter-usage
description: How to build SAP BAPI selection table filters in GeneXus Procedure code
---

Apply these rules when generating sample `Procedure` code that calls SAP BAPIs with filter parameters
---

# FILTER CONCEPTS
Most SAP BAPIs accept selection tables with four standard fields:

Field  Description/Possible values:
- `SIGN` → `I` = Include, `E` = Exclude
- `OPTION` → Comparison operator (see below)
- `LOW` → Start value (or single value for non-range operators)
- `HIGH` → End value (used only with `BT`)

Typical parameter name patterns: `*_SELECTION`, `*_RANGE`, `SELECTIONS`
---

# OPTION VALUES

`OPTION` values meaning:
- `EQ` → Equals
- `NE` → Not equal
- `BT` → Between (`LOW` to `HIGH`)
- `GE` → Greater or equal
- `LE` → Less or equal
- `CP` → Pattern match (`*` = any chars, `+` = one char)
---

# USAGE PATTERNS

## Single value (include)
```genexus
&MATNRSELECTIONItem.SIGN = "I"
&MATNRSELECTIONItem.OPTION = "EQ"
&MATNRSELECTIONItem.LOW = "1000"
&MATNRSELECTION.Add(&MATNRSELECTIONItem)

MaterialEO.GetList(&PLANTSELECTION, &MATNRSELECTION, &MAXROWS, &MATNRLIST, &RETURN)

```
## Range filter (between)

```genexus
&Item.SIGN = "I"
&Item.OPTION = "BT"
&Item.LOW = "1000"
&Item.HIGH = "2000"
&MATNRSELECTION.Add(&Item)
```

## Multiple rows (OR logic)

```genexus
&Item1.SIGN = "I"
&Item1.OPTION = "EQ"
&Item1.LOW = "A100"
&MANUFACTURERPARTNUMB.Add(&Item1)

&Item2.SIGN = "I"
&Item2.OPTION = "EQ"
&Item2.LOW = "B200"
&MANUFACTURERPARTNUMB.Add(&Item2)
```

## Exclude filter

```genexus
&Item.SIGN = "E"
&Item.OPTION = "EQ"
&Item.LOW = "9999"
&MATNRSELECTION.Add(&Item)
```
## Pattern match

```genexus
&Item.SIGN = "I"
&Item.OPTION = "CP"
&Item.LOW = "MAT*"
&MATNRSELECTION.Add(&Item)
```
---
# BEST PRACTICES

- Prefer `EQ` for exact matches; use `BT` for bounded ranges
- Avoid leading wildcards (`*ABC`) — they force full table scans in SAP
- Limit result sizes with parameters like `MAXROWS`
- Reuse SAP standard selection structures; do not invent custom filter types
- Validate required filter fields before calling the BAPI method
