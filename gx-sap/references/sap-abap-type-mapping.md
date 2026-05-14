---
name: sap-abap-type-mapping
description: Authoritative ABAP-to-GeneXus type conversion table for SAP parameter mapping
---

Use this file as the single source of truth for converting ABAP field types to GeneXus data types.
Always consult this file before assigning a `DataType` to any `SDT` member or `ExternalObject` parameter

---

# MAPPING TABLE
Mapping from ABAP Type/ ABAP Alias to GeneXus Types

- `CHAR(n)` / `C` → `Character(n)` if `n <= 8`, `VarChar(n)` if `9 <= n <= 256`, otherwise `VarChar(256)`; fixed-length string
- `NUMC(n)` / `N` → `Character(n)`;  NUMC are characters, never map to `Numeric`
- `INT4` / `I` → `Numeric(4.0)`; 32-bit integer
- `INT2` → `Numeric(4.0)`; 16-bit integer
- `INT1` → `Numeric(3.0)`; 8-bit integer
- `INT8` → `Numeric(18.0)`; 64-bit integer
- `FLTP` / `F` → `Numeric(14.7)`; IEEE 754 double-precision float, always use `(14.7)` regardless of metadata length
- `DEC(n,m)` / `P` → `Numeric(n.m)`; packed decimal, use exact metadata precision
- `CURR(n,m)` → `Numeric(n.m)`; currency amount, use exact metadata precision
- `QUAN(n,m)` → `Numeric(n.m)`; quantity, use exact metadata precision
- `DATS` / `D` → `Date`; stored as YYYYMMDD but not `Character(8)` based
- `TIMS` / `T` → `Character(6)`; stored as HHMMSS but not `DateTime` based
- `STRING` → `LongVarChar(4K)`; variable-length string
- `XSTRING` → `LongVarChar(4K)`; hex-encoded binary
- `RAWSTRING` → `LongVarChar(4K)`; variable-length raw bytes
- `RAW(n)` / `X(n)` → `VarChar(n*2)`; double byte length
- `LRAW(n)` → `VarChar(n*2)`; same rule as `RAW`
- `LANG` → `Character(1)`; SAP language key
- `CLNT` → `Character(3)`; SAP client number
- `UNIT` → `Character(3)`; unit of measure
- `CUKY` → `Character(5)`; currency key
- `PREC` → `Numeric(4.0)`; decimal precision indicator
- `ACCP` → `Character(6)`; accounting period, format `YYYYPP`
- Structure type → dedicated `SDT` reference
- Table type → collection of `SDT`; set `Collection = 'True'`

---

# RESOLUTION RULES
1. Read `type`, `length`, and `decimals` from `sap_get_function_metadata` for every field before mapping
2. Apply the table above using the **exact** length and decimal values from the metadata
3. For `CHAR(n)`:
	- n ≤ 8 → `Character(n)`
	- 9 ≤ n ≤ 256 → `VarChar(n)`
	- n > 256 → `VarChar(256)` unless the field is clearly long-form content, then `LongVarChar(4K)`
4. For `DEC` / `CURR` / `QUAN`: always use `Numeric(n.m)` with exact values; never default to `Numeric(10.2)`
5. For `FLTP`: always `Numeric(14.7)` regardless of reported metadata length
6. For `NUMC`: always `Character(n)`; never map to `Numeric` even though digits are involved
7. For `DATS`: always `Date`; never `Character(8)`
8. For `TIMS`: always `Character(6)`; never `DateTime`
9. For Structure type: the parameter is a nested compound type — create a separate `SDT` and reference it by name
10. For Table type: the parameter is a collection — create a separate `SDT` for the row definition and set `Collection = 'True'` on its item
11. When ABAP type is absent, unknown, or not listed: use `VarChar(256)` as a safe fallback and explicitly state the assumption in the execution plan

---

# COMMON SAP STANDARD TYPES
Frequently encountered types across BAPIs — canonical GeneXus definitions are in [sap-sdt-generation](sap-sdt-generation.md)

---

# CONSTRAINTS
- Never assume ABAP field lengths; always read from `sap_get_function_metadata` response
- Never map `NUMC` to `Numeric`; numeric characters must remain as `Character`
- Never use `Date` for `TIMS`; use `Character(6)`
- Never use `Character(8)` for `DATS`; use `Date`
- Never default `DEC`/`CURR`/`QUAN` to `Numeric(10.2)`; always use exact precision from metadata
- Do not create `SDT` objects for scalar top-level parameters with no sub-fields
