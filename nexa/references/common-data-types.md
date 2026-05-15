---
name: common-data-types
description: Built-in data type definitions for attributes, domains, variables, and structured data members
---

Defines format and rules for all data elements in GeneXus applications

---

# NUMERIC TYPES

## Numeric
Numerical values with specified digit count and decimal places

Syntax: `Numeric([-]<length>.<decimal>)`

Constraints:
- Define decimal part always, even `0` for integers: `Numeric(4.0)` (not `Numeric(4)`)
- Prefix with `-` for negative values: `Numeric(-4.0)`
- Length counts all positions: integer digits + decimal point + decimal digits + sign if negative

Examples:
- `Numeric(10.2)`: Up to 10 digits, 7 integer + 1 point + 2 decimal (e.g. 1234567.89)
- `Numeric(4.0)`: Up to 4 digits, 4 integer + 0 decimal (e.g. 9999)
- `Numeric(-6.2)`: Up to 6 digits, 3 integer + 1 point + 2 decimal + 1 sign (e.g. -999.99)

---

## Character
Fixed-size strings for codes, abbreviations, or short labels

Syntax: `Character(<length>)`

Constraints:
- Only when `length <= 8`
- Fixed representation: truncates longer values, pads shorter with spaces
- May require `Trim()` for comparisons

Methods:
- `<str>.IsMatch(<regex>)`: Returns `True` if matches `<regex>` pattern, `False` otherwise
- `<str>.ReplaceRegEx(<regex>, <expr>)`: Replaces all `<regex>` matches with `<expr>` text
- `<str>.Matches(<regex>)`: Returns collection of `RegExMatch` type matching `<regex>`
- `<str>.SplitRegEx(<regex>)`: Splits string by `<regex>`, returns collection of parts
- `RegExMatch` details: see [common-extended-type-regexmatch](./common-extended-type-regexmatch.md)

Examples (with `&Code` defined as `Character(5)`):
~~~
&Code = "ABC"      // Stored as "ABC  " (padded)
&Code = "ABCDEFGH" // Stored as "ABCDEFGH" (truncated to 8 max, but this exceeds 5, so error)
~~~

---

## VarChar
Variable-size strings rendered as input elements

Syntax: `VarChar(<length>)`

Constraints:
- Only when `8 < length <= 2048`
- Prefer power of two: `VarChar(64)`, `VarChar(128)`, `VarChar(256)`, etc
- Size suffixes:
	* `K` (kilobyte) = 1024
	* `M` (megabyte) = 1048576
	* Example: `VarChar(2K)` = `VarChar(2048)`

Methods: Same as `Character`

Examples:
- `VarChar(64)`: Up to 64 characters
- `VarChar(2K)`: Up to 2048 characters
- `VarChar(256)`: Up to 256 characters

---

## LongVarChar
Variable long-size strings rendered as textarea elements

Syntax: `LongVarChar(<length>)`

Constraints:
- Only when `length > 2048`
- Prefer power of two: `LongVarChar(4096)`, `LongVarChar(8192)`, etc
- Size suffixes:
	* `K` = 1024
	* `M` = 1048576
	* Example: `LongVarChar(2M)` = `LongVarChar(2097152)`

Methods: Same as `Character`

Examples:
- `LongVarChar(4K)`: Up to 4096 characters
- `LongVarChar(1M)`: Up to 1048576 characters

---

# DATE TYPES

## Date
Calendar date without time

Constraints:
- Constant syntax: `#YYYY-MM-DD#`
	* Example: `#1991-10-12#` (October 12th, 1991)
- Date difference computed with `TDiff(<dt1>, <dt2>)` function

Methods:
- `<date>.Year()`: Returns year (Numeric)
- `<date>.Month()`: Returns month (Numeric 1-12)
- `<date>.Day()`: Returns day (Numeric 1-31)

Examples:
~~~
&BirthDate = #1991-10-12#

&Age = Year(&Today) - Year(&BirthDate) // approx age (year-based)
&Age = Year(TDiff(&Today, &BirthDate)) // exact age (date-based)
~~~

---

## DateTime
Timestamp with date and time; can represent time-only by setting `DateFormat = 'None'`

Constraints:
- Constant syntax: `#YYYY-MM-DD HH[:MM[:SS]][a|p]#`
	* Example: `#1991-10-12 11:30a#` (11:30 AM on October 12th, 1991)
	* Example: `#2024-01-15 14:45:30#` (2:45:30 PM on January 15th, 2024)
- Use `[a|p]` only with 12-hour format; never with 24-hour format
- DateTime difference computed with `TDiff(<dt1>, <dt2>)` function
- Time-only representation requires `DateFormat = 'None'` property

Time-only pattern:
~~~
FlightDepartureTime
[
	DataType = 'DateTime',
	DateFormat = 'None'
]
~~~

Methods:
- `<datetime>.Year()`, `.Month()`, `.Day()`: Date components
- `<datetime>.Hour()`: Hour (0-23)
- `<datetime>.Minute()`: Minute (0-59)
- `<datetime>.Second()`: Second (0-59)

Examples:
~~~
&Now = #2024-02-12 15:30:00p#
&Hour = Hour(&Now)  // 15
~~~

---

# MULTIMEDIA TYPES

## Audio
Audio file (mp3, wav, ogg, etc.)

Properties:
- `<audio>.AudioName`: Gets audio filename
- `<audio>.AudioType`: Gets file extension type (e.g. 'mp3', 'wav')
- `<audio>.AudioURI`: Sets or gets audio URI

Methods:
- `<audio>.FromUrl(<uri>)`: Loads audio from specified URI
- `<audio>.SetEmpty()`: Clears blob (sets to empty)
- `<audio>.IsEmpty()`: Returns `True` if empty (no blob), `False` if references stored audio

Examples:
~~~
&PodcastAudio.FromUrl("https://example.com/podcast.mp3")
If NOT &PodcastAudio.IsEmpty()
	&Type = &PodcastAudio.AudioType  // "mp3"
EndIf
~~~

---

## Image
Image file (png, jpg, gif, etc.)

Properties:
- `<image>.ImageName`: Gets image filename
- `<image>.ImageType`: Gets file extension type (e.g. 'png', 'jpg')
- `<image>.ImageURI`: Sets or gets image URI

Methods:
- `<image>.FromUrl(<uri>)`: Loads image from specified URI
- `<image>.SetEmpty()`: Clears blob
- `<image>.IsEmpty()`: Returns `True` if empty, `False` if references stored image

Notes:
- Reference Image objects with `Image:<object-name>` syntax:
 	* `&MyImage = Image:MyImageObject.Link()`

Examples:
~~~
&ProductImage.FromUrl("https://example.com/product.jpg")
If NOT &ProductImage.IsEmpty()
	&Extension = &ProductImage.ImageType  // "jpg"
EndIf

// Reference static Image object
&LogoImage = Image:CompanyLogo.Link()
~~~

---

## Video
Video file (mp4, avi, mov, etc.)

Properties:
- `<video>.VideoName`: Gets video filename
- `<video>.VideoType`: Gets file extension type (e.g. 'mp4', 'avi')
- `<video>.VideoURI`: Sets or gets video URI

Methods:
- `<video>.FromUrl(<uri>)`: Loads video from specified URI
- `<video>.SetEmpty()`: Clears blob
- `<video>.IsEmpty()`: Returns `True` if empty, `False` if references stored video

Examples:
~~~
&TutorialVideo.FromUrl("https://example.com/tutorial.mp4")
If NOT &TutorialVideo.IsEmpty()
	&Format = &TutorialVideo.VideoType  // "mp4"
EndIf
~~~

---

# OTHER TYPES

## Boolean
Represents `True` or `False` values

Methods:
- `<bool>.FromString(<str>)`: Loads from string representation
- `<bool>.ToString()`: Returns `'True'` or `'False'` string
- `<bool>.IsEmpty()`: Checks if null or empty

Examples:
~~~
&IsActive = IsActive()
If &IsActive
	msg("Active", status)
EndIf
~~~

## Guid
Globally unique identifier: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

Static Methods:
- `Guid.NewGuid()`: Returns new unique GUID
- `Guid.Empty()`: Returns empty GUID (all zeros)
- `Guid.FromString(<value>)`: Parses GUID from string

Examples:
~~~
&SessionGuid = Guid.NewGuid()
If &SessionGuid = Guid.Empty()
	msg("No session", status)
EndIf
~~~

## Embedding
Words or phrases as numerical vectors for semantic search

Availability:
- ProductVersion:`>=19`

Methods:
- `<embedding>.GenerateEmbedding(<text>[, <messages>])`: Converts `<text>` to vector (embedding), optionally fills `<messages>` variable (type: `Messages, GeneXus.Common` SDT)
- `<embedding>.Distance(<embedding-2>)`: Returns numerical value 0 (identical) to 1 (completely different) indicating semantic distance
- `<embedding>.FromString(<text>)`: Loads embedding from transformation of `<text>`
- `<embedding>.ToString()`: Returns serialized string representation

Remarks:
- `FromString` and `ToString` are NOT symmetric (not reversible)
- `Distance` returns cosine distance; derive similarity as `1 - Distance` if needed
- Requires AI/ML backend configuration

Examples:
~~~
&QueryEmbedding.GenerateEmbedding("machine learning", &Messages)
&DocEmbedding.GenerateEmbedding("artificial intelligence")

&Distance = &QueryEmbedding.Distance(&DocEmbedding) // lower distance = higher similarity
~~~

---

# CONSTRAINTS
- Each URI can be:
	* Link URL (`http://`, `https://`)
	* Relative path (`./file`, `../file`)
	* Absolute path (`/full/path`)
	* Local path using `file://` protocol
- Only listed data types are available
- DataType is mandatory for all attributes, variables, and members (except when inferred via FK `[]`)
