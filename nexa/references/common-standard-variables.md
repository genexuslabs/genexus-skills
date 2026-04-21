---
name: common-standard-variables
description: Standard variable definitions by object context
---

Use this file as the single source for baseline and object-specific standard variables

---

# STANDARD VARIABLES
Standard variables are only applicable when the object `SYNTAX` section defines a `#Variables` section

Required for all objects:
- `Pgmname [ DataType = 'Character(128)' ]`: Active program name (object Name property)
- `Pgmdesc [ DataType = 'Character(256)' ]`: Active program description (object Description property)

Optional but desired runtime variables:
- `Today [ DataType = 'Date' ]`: Current system date (localized according to application language)
- `Time [ DataType = 'Character(8)' ]`: Time value captured at program start

Optional runtime variable for `Transaction` object handling:
- `Mode [ DataType = 'Character(3)' ]`: Transaction execution mode (built-in enumerated `TrnMode` domain):
	* `TrnMode.Insert` ('INS')
	* `TrnMode.Update` ('UPD')
	* `TrnMode.Delete` ('DLT')
	* `TrnMode.Display` ('DSP')

Optional runtime variables for `API` object handling:
- `RestMethod [ DataType = 'HttpMethod, GeneXus' ]`: HTTP method used in REST invocation; empty if not REST
- `RestCode [ DataType = 'Numeric(3.0)' ]`: HTTP status code to return in REST response
- `RestServiceName [ DataType = 'Character(128)' ]`: Name of the REST service currently executing

Optional runtime variables for `Procedure` object handling:
- `Msg [ DataType = 'Character(70)' ]`: Standard output message variable
- `Output [ DataType = 'Character(3)' ]`: Output device/type control
- `Page [ DataType = 'Numeric(6.0)' ]`: Current output page number (report procedures)
- `Line [ DataType = 'Numeric(6.0)' ]`: Current print line number (report procedures)

Optional subroutine variables when `Error_Handler` rule is applied:
- `Err [ DataType = 'Numeric(3.0)' ]`: Internal GeneXus error code
- `ErrMsg [ DataType = 'Character(255)' ]`: Internal error message
- `GxDBErr [ DataType = 'Numeric(5.0)' ]`: Native DBMS error code
- `GxDBTxt [ DataType = 'Character(255)' ]`: Native DBMS error message
- `GxDbSqlState [ DataType = 'Character(5)' ]`: Native SQL state code
- `GxOper [ DataType = 'Character(30)' ]`: Current DB operation (values: 'Declare', 'Fetch', 'Insert', 'Update', or 'Delete')
- `GxErrTbl [ DataType = 'Character(30)' ]`: Table involved in the error or 'N/A'
- `GxErrOpt [ DataType = 'Numeric(1.0)' ]`: Post-error action (values: 0=Continue,1=Retry,2=Cancel,3=Default)

---

# CONSTRAINTS
- Only include optional variables when they must be explicitly used
- Only include `Error_Handler` variables when the `Error_Handler` rule is defined
- Only include REST-related variables for `API` object definitions
- Only include PROCEDURE-specific variables for `Procedure` object definitions
- Only include variables that belong strictly to the current object execution context