---
name: common-functions
description: Performs operations returning values based on input arguments
---

Functions for calculations, date/time handling, string formatting, and system operations

---

# MATHEMATICAL FUNCTIONS

## Mod
Returns remainder of division

Syntax: `Mod(<dividend>, <divisor>)`
Method: N/A

Examples:
~~~
Mod(10, 3) // Returns 1
Mod(15, 4) // Returns 3
~~~

## Abs
Returns absolute value

Syntax: `Abs(<value>)`
Method: N/A

Examples:
~~~
Abs(-5) // Returns 5
Abs(10.5) // Returns 10.5
~~~

## Round
Rounds number to specified decimals

Syntax: `Round(<expression>, <decimals>)`
Method: `<expression>.Round(<decimals>)`

Examples:
~~~
Round(10.567, 2) // Returns 10.57
&Value.Round(2)
~~~

## RoundToEven
Rounds to nearest even value

Syntax: `RoundToEven(<expression>, <decimals>)`
Method: `<expression>.RoundToEven(<decimals>)`

Examples:
~~~
RoundToEven(2.5, 0) // Returns 2
&Value.RoundToEven(0)
~~~

## Int
Returns integer part of number

Syntax: `Int(<expression>)`
Method: `<expression>.Int()`

Examples:
~~~
Int(10.9) // Returns 10
&Value.Int()
~~~

## Trunc
Truncates number

Syntax: `Trunc(<expression>)`
Method: `<expression>.Truncate()`

Examples:
~~~
Trunc(10.9) // Returns 10
&Value.Truncate()
~~~

## Random
Returns random number between 0 and 1

Syntax: `Random()`
Method: N/A

Examples:
~~~
&RandomValue = Random()
&RandomInt = Int(Random() * 100)
~~~

## RSeed
Initializes randomizer with fixed seed

Syntax: `RSeed(<seed>)`
Method: N/A

Examples:
~~~
RSeed(42)
RSeed(100)
~~~

---

# TIME FUNCTIONS

## Today
Returns current date

Syntax: `Today()`
Method: N/A

Examples:
~~~
&CurrentDate = Today()
~~~

## Now
Returns current datetime

Syntax: `Now()`
Method: N/A

Examples:
~~~
&CurrentDateTime = Now()
~~~

## Year
Returns year component

Syntax: `Year(<expression>)`
Method: `<expression>.Year()`

Examples:
~~~
Year(#2025-07-11#) // Returns 2025
&Date.Year()
~~~

## Month
Returns month component

Syntax: `Month(<expression>)`
Method: `<expression>.Month()`

Examples:
~~~
Month(#2025-07-11#) // Returns 7
&Date.Month()
~~~

## Day
Returns day component

Syntax: `Day(<expression>)`
Method: `<expression>.Day()`

Examples:
~~~
Day(#2025-07-11#) // Returns 11
&Date.Day()
~~~

## Hour
Returns hour component

Syntax: `Hour(<expression>)`
Method: `<expression>.Hour()`

Examples:
~~~
Hour(#2025-07-11 14:35:00#) // Returns 14
&DateTime.Hour()
~~~

## Minute
Returns minute component

Syntax: `Minute(<expression>)`
Method: `<expression>.Minute()`

Examples:
~~~
Minute(#2025-07-11 14:35:00#) // Returns 35
&DateTime.Minute()
~~~

## Second
Returns second component

Syntax: `Second(<expression>)`
Method: `<expression>.Second()`

Examples:
~~~
Second(#2025-07-11 14:35:26#) // Returns 26
&DateTime.Second()
~~~

## Age
Returns age based on date

Syntax: `Age(<expression>[, <reference-expression>])`
Method: `<expression>.Age([<reference-expression>])`

Examples:
~~~
Age(#1990-05-15#) // Age from today
Age(#1990-05-15#, &RefDate) // Age from reference
&BirthDate.Age()
~~~

## YMDtoD
Creates date from components

Syntax: `YMDtoD(<year>, <month>, <day>)`
Method: `<expression>.Set(<year>, <month>, <day>)`

Examples:
~~~
YMDtoD(2025, 7, 11) // Returns #2025-07-11#
&Date.Set(2025, 7, 11)
~~~

## YMDHMStoT
Creates datetime from components

Syntax: `YMDHMStoT(<year>, <month>, <day>[, <hour>, <minute>, <second>])`
Method: `<expression>.Set(<year>, <month>, <day>[, <hour>[, <minute>[, <second>]]])`

Examples:
~~~
YMDHMStoT(2025, 7, 11, 14, 30, 26) // Returns #2025-07-11 14:30:26#
&DateTime.Set(2025, 7, 11, 14, 30)
~~~

## DoW
Returns day of week (1=Sunday … 7=Saturday)

Syntax: `DoW(<expression>)`
Method: `<expression>.DayOfWeek()`

Examples:
~~~
DoW(#2025-07-13#) // Returns 1 (Sunday)
&Date.DayOfWeek()
~~~

## EoM
Returns last day of month

Syntax: `EoM(<expression>)`
Method: `<expression>.EndOfMonth()`

Examples:
~~~
EoM(#2025-07-11#) // Returns #2025-07-31#
&Date.EndOfMonth()
~~~

## CMonth
Returns month name

Syntax: `CMonth(<expression>[, <language>])`
Method: `<expression>.MonthName([<language>])`

Examples:
~~~
CMonth(#2025-07-11#) // Returns "July"
CMonth(#2025-07-11#, !"Spanish") // Returns "Julio"
&Date.MonthName()
~~~

## AddDays
Adds days to date

Syntax: `AddDays(<expression>, <quantity>)`
Method: `<expression>.AddDays(<quantity>)`

Examples:
~~~
AddDays(#2025-07-10#, 5) // Returns #2025-07-15#
&Date.AddDays(5)
~~~

## AddMth
Adds months to date

Syntax: `AddMth(<expression>, <quantity>)`
Method: `<expression>.AddMonths(<quantity>)`

Examples:
~~~
AddMth(#2025-07-10#, 2) // Returns #2025-09-10#
&Date.AddMonths(2)
~~~

## AddYr
Adds years to date

Syntax: `AddYr(<expression>, <quantity>)`
Method: `<expression>.AddYears(<quantity>)`

Examples:
~~~
AddYr(#2025-07-10#, 1) // Returns #2026-07-10#
&Date.AddYears(1)
~~~

## TAdd
Adds seconds to datetime

Syntax: `TAdd(<expression>, <seconds>)`
Method: `<expression>.AddSeconds(<seconds>)`

Examples:
~~~
TAdd(#2025-07-11 12:00:00#, 32) // Returns #2025-07-11 12:00:32#
&DateTime.AddSeconds(32)
~~~

## TDiff
Returns difference in seconds between two datetimes

Syntax: `TDiff(<expression-1>, <expression-2>)`
Method: `<expression-1>.Difference(<expression-2>)`

Examples:
~~~
TDiff(#2025-07-12#, #2025-07-10#) // Returns 172800
&DateTime1.Difference(&DateTime2)
~~~

## CtoD
Converts string to date

Syntax: `CtoD(<expression>)`
Method: `<date>.FromString(<expression>)`

Examples:
~~~
CtoD(!"07/10/2025") // Returns #2025-07-10#
&Date.FromString(!"07/10/2025")
~~~

## CtoT
Converts string to datetime

Syntax: `CtoT(<expression>)`
Method: `<datetime>.FromString(<expression>)`

Examples:
~~~
CtoT(!"07/10/2025 13:45") // Returns #2025-07-10 13:45:00#
&DateTime.FromString(!"07/10/2025 13:45")
~~~

## DtoC
Converts date to string

Syntax: `DtoC(<expression>)`
Method: `<expression>.ToString()`

Examples:
~~~
DtoC(#2025-07-11#) // Returns "20250711"
&Date.ToString()
~~~

## TtoC
Converts datetime to string

Syntax: `TtoC(<expression>, <date-digits>, <time-digits>)`
Method: `<expression>.ToString()`

Examples:
~~~
TtoC(#2025-07-11 14:00:00#, 8, 5) // Returns "20250711 14:00"
&DateTime.ToString()
~~~

---

# STRING FUNCTIONS

## Len
Returns string length

Syntax: `Len(<expression>)`
Method: `<expression>.Length()`

Examples:
~~~
Len(!"Hello") // Returns 5
&Text.Length()
~~~

## Trim
Removes leading and trailing spaces

Syntax: `Trim(<expression>)`
Method: `<expression>.Trim()`

Examples:
~~~
Trim(!" Hello ") // Returns "Hello"
&Text.Trim()
~~~

## LTrim
Removes leading spaces

Syntax: `LTrim(<expression>)`
Method: `<expression>.TrimStart()`

Examples:
~~~
LTrim(!"  Hello") // Returns "Hello"
&Text.TrimStart()
~~~

## RTrim
Removes trailing spaces

Syntax: `RTrim(<expression>)`
Method: `<expression>.TrimEnd()`

Examples:
~~~
RTrim(!"Hello  ") // Returns "Hello"
&Text.TrimEnd()
~~~

## Upper
Converts to uppercase

Syntax: `Upper(<expression>)`
Method: `<expression>.ToUpper()`

Examples:
~~~
Upper(!"hello") // Returns "HELLO"
&Text.ToUpper()
~~~

## Lower
Converts to lowercase

Syntax: `Lower(<expression>)`
Method: `<expression>.ToLower()`

Examples:
~~~
Lower(!"HELLO") // Returns "hello"
&Text.ToLower()
~~~

## SubStr
Returns a substring from a given position

Syntax: `SubStr(<expression>, <start>, <length>)`
Method: `<expression>.Substring(<start>[, <length>])`

Examples:
~~~
SubStr(!"GeneXus", 2, 3) // Returns "ene"
&Text.Substring(2, 3)
~~~

## Str
Converts number to string

Syntax: `Str(<expression>[, <length>[, <decimals>]])`
Method: `<expression>.ToString()`

Examples:
~~~
Str(123) // Returns "123"
Str(123.45, 10, 2) // Returns "    123.45"
&Number.ToString()
~~~

## StrReplace
Replaces all occurrences of a substring

Syntax: `StrReplace(<expression>, <old>, <new>)`
Method: `<expression>.Replace(<old>, <new>)`

Examples:
~~~
StrReplace(!"Hello World", !"World", !"GX") // Returns "Hello GX"
&Text.Replace(!"World", !"GX")
~~~

## StrSearch
Finds position of a substring

Syntax: `StrSearch(<expression>, <substr>[, <start>])`
Method: `<expression>.IndexOf(<substr>[, <start>])`

Examples:
~~~
StrSearch(!"GeneXus", !"e") // Returns 2
StrSearch(!"GeneXus", !"e", 3) // Returns 4
&Text.IndexOf(!"e")
~~~

## StrSearchRev
Finds last occurrence of a substring

Syntax: `StrSearchRev(<expression>, <substr>[, <start>])`
Method: `<expression>.LastIndexOf(<substr>[, <start>])`

Examples:
~~~
StrSearchRev(!"GeneXus", !"e") // Returns 4
&Text.LastIndexOf(!"e")
~~~

## PadL
Pads string on the left to a given length

Syntax: `PadL(<expression>, <length>[, <fill-char>])`
Method: `<expression>.PadLeft(<length>[, <fill-char>])`

Examples:
~~~
PadL(!"Hi", 5) // Returns "   Hi"
PadL(!"Hi", 5, !"0") // Returns "000Hi"
&Text.PadLeft(5, !"0")
~~~

## PadR
Pads string on the right to a given length

Syntax: `PadR(<expression>, <length>[, <fill-char>])`
Method: `<expression>.PadRight(<length>[, <fill-char>])`

Examples:
~~~
PadR(!"Hi", 5) // Returns "Hi   "
PadR(!"Hi", 5, !"0") // Returns "Hi000"
&Text.PadRight(5, !"0")
~~~

## ToBase64
Encodes text as base64

Syntax: `ToBase64(<expression>)`
Method: N/A

Examples:
~~~
ToBase64(!"hello") // Returns "aGVsbG8="
~~~

## FromBase64
Decodes base64-encoded text

Syntax: `FromBase64(<expression>)`
Method: N/A

Examples:
~~~
FromBase64(!"aGVsbG8=") // Returns "hello"
~~~

## ToFormattedString
Returns formatted string based on data type

Syntax: `ToFormattedString(<expression>)`
Method: `<expression>.ToFormattedString()`

Examples:
~~~
ToFormattedString(!"20250711") // Returns "07/11/2025"
&Value.ToFormattedString()
~~~

## Val
Converts string to number

Syntax: `Val(<expression>)`
Method: `<expression>.ToNumeric()`

Examples:
~~~
Val(!"123") // Returns 123
&Text.ToNumeric()
~~~

## Concat
Concatenates strings with optional separator

Syntax: `Concat(<expression-1>, <expression-2>[, <separator>])`
Method: N/A

Examples:
~~~
Concat(!"Hello", !"World") // Returns "HelloWorld"
Concat(!"Hello", !"World", !" ") // Returns "Hello World"
~~~

## Format
Formats string with interpolated values

Syntax: `Format(<template>, <value-1>, …, <value-9>)`
Method: N/A

Examples:
~~~
Format(!"Hello %1", &Name)
Format(!"Total: %1, Tax: %2", &Total, &Tax)
Format(!"Result: %1 / %2", &Num, &Den)
~~~

Notes:
- Prefer `Format` over concatenation for cleaner code
- Never define `Format` without interpolated arguments

## Space
Returns string with specified spaces

Syntax: `Space(<count>)`
Method: N/A

Examples:
~~~
Space(5) // Returns "     "
~~~

## Chr
Returns character from ASCII code

Syntax: `Chr(<ascii-code>)`
Method: N/A

Examples:
~~~
Chr(65) // Returns "A"
Chr(10) // Returns newline
~~~

## Asc
Returns ASCII code from character

Syntax: `Asc(<expression>)`
Method: N/A

Examples:
~~~
Asc(!"A") // Returns 65
~~~

## NewLine
Returns the platform-specific line break sequence

Syntax: `NewLine()`
Method: N/A

Examples:
~~~
NewLine() // Returns \n (Windows: \r\n)
~~~

## UrlEncode
Encodes text as URL-safe string

Syntax: `UrlEncode(<expression>)`
Method: N/A

Examples:
~~~
UrlEncode(!"Hello World") // Returns "Hello%20World"
~~~

## UrlDecode
Decodes URL-encoded text

Syntax: `UrlDecode(<expression>)`
Method: N/A

Examples:
~~~
UrlDecode(!"Hello%20World") // Returns "Hello World"
~~~

## Encrypt64
Encrypts text and returns base64-encoded string

Syntax: `Encrypt64(<expression>, <key>)`
Method: N/A

Examples:
~~~
Encrypt64(!"hello", !"MyKey") // Returns "ZW5jb2RlZA=="
~~~

## Decrypt64
Decrypts base64-encoded text

Syntax: `Decrypt64(<expression>, <key>)`
Method: N/A

Examples:
~~~
Decrypt64(!"ZW5jb2RlZA==", !"MyKey") // Returns "hello"
~~~

---

## LOCALIZATION FUNCTIONS

## GetLanguage
Returns currently active language name

Syntax: `GetLanguage()`
Method: N/A

Examples:
~~~
&Lang = GetLanguage() // Returns "English"
~~~

## GetMessageText
Retrieves localized text by key

Syntax: `GetMessageText(<key>[, <language>])`
Method: N/A

Examples:
~~~
GetMessageText(!"APP_UNK_ERR") // Returns text in active language
GetMessageText(!"APP_UNK_ERR", !"Spanish") // Returns "Error desconocido"
~~~

---

# UTILITY FUNCTIONS

## Iif
Conditional inline expression

Syntax: `Iif(<condition>, <true-value>, <false-value>)`
Method: N/A

Examples:
~~~
&Status = Iif(&Age >= 18, !"Adult", !"Minor")
&Discount = Iif(&IsMember, 0.10, 0.05)
~~~

## Null
Checks if value is null or empty

Syntax: `Null(<expression>)`
Method: `<expression>.IsEmpty()`

Examples:
~~~
If Null(&Value)
If &Value.IsEmpty()
~~~

## Old
Returns attribute value before modification

Syntax: `Old(<attribute>)`
Method: `<attribute>.GetOldValue()`

Examples:
~~~
&OldPrice = Old(ProductPrice)
&OldPrice = ProductPrice.GetOldValue()
~~~

## Compare
Compares two values with operator

Syntax: `Compare(<value1>, <operator>, <value2>)`
Method: N/A

Examples:
~~~
Compare(&Age, !">=", 18)
Compare(&Name, !"=", !"John")
~~~

## Link
Generates link to object

Syntax: `Link(<object>[, <param-1>, …, <param-N>])`
Method: N/A

Examples:
~~~
&Url = Link(ProductDetail, &ProductId)
~~~

## Shell
Executes external program and returns exit code

Syntax: `Shell(<program>[, <modal>[, <redirectOutput>]])`
Method: N/A

Examples:
~~~
&Ret = Shell(!"notepad.exe")
&Ret = Shell(!"curl -s https://example.com/health", 1, 1)
~~~

## Sleep
Pauses execution

Syntax: `Sleep(<seconds>)`
Method: N/A

Examples:
~~~
Sleep(5) // Pause 5 seconds
~~~

## IsNull
Checks if database value is null

Syntax: `IsNull(<attribute>)`
Method: `<attribute>.IsNull()`

Examples:
~~~
If IsNull(CustomerName)
If CustomerName.IsNull()
~~~

## NullValue
Returns default null representation for attribute type

Syntax: `NullValue(<attribute>)`
Method: `<attribute>.SetNull()` or `<attribute>.SetEmpty()`

Examples:
~~~
NullValue(PurchaseDateTime) // Returns '0001-01-01T00:00:00'
PurchaseDateTime.SetNull()
~~~

---

# CONSTRAINTS
- Propose `Procedure` object creation only when no listed function can fulfill the request
- Prefer methods over functions when available
