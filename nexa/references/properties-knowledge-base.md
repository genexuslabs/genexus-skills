---
name: properties-knowledge-base
description: Configurable knowledge base properties
---

Use this file to select editable Knowledge Base properties and metadata

---

# KNOWLEDGE BASE OBJECT

## Maximum numeric length
- Description: Global default max length for numeric types
- Type: `integer`
- Default: `18`

## Standard Functions
- Description: Restricts usage to standard compatible functions
- Type: `enum{Allows only standard functions on saving,Allows non-standard functions on saving}`
- Options:
	* `Allows only standard functions on saving`: Validates and saves only standard GeneXus functions
	* `Allows non-standard functions on saving`: Allows saving expressions with non-standard functions
- Default: `Allows only standard functions on saving`

## Automatic width scale factor
- Description: Scale factor for automatic width calculation
- Type: `enum{Use Environment property value,1x,2x}`
- Options:
	* `Use Environment property value`: Uses the automatic width scale defined at environment level
	* `1x`: Uses base width factor for automatic control sizing
	* `2x`: Uses double width factor for automatic control sizing
- Default: `1x`

## Base image path
- Description: Base path for image files
- Type: `string`

## KbLanguage
- Description: Knowledge Base language
- Type: `string`

---

# KNOWLEDGE BASE OBJECT USER INTERFACE

## Autoresize form controls
- Description: Strategy used to determine control size when Auto Resize is enabled
- Type: `enum{Based on message code,Based on current translation,Based on longest available translation}`
- Options:
	* `Based on message code`: Calculates control size from the message code text
	* `Based on current translation`: Calculates control size from the active language translation
	* `Based on longest available translation`: Calculates control size from the longest translation found
- Default: `Based on current translation`

## Web maximum edit length
- Description: Maximum edit control length before horizontal scrolling in web UI
- Type: `integer`
- Default: `80`

## Web maximum single line edit length
- Description: Maximum web single-line edit length before switching to multiline
- Type: `integer`
- Default: `159`

## Web maximum multi line edit lines
- Description: Maximum number of lines for web multiline edit controls
- Type: `integer`
- Default: `10`

## Win maximum edit length
- Description: Maximum edit control length before horizontal scrolling in Win UI
- Type: `integer`
- Default: `60`

## Win maximum single line edit length
- Description: Maximum Win single-line edit length before switching to multiline
- Type: `integer`
- Default: `119`

## Win maximum multi line edit lines
- Description: Maximum number of lines for Win multiline edit controls
- Type: `integer`
- Default: `5`

## Report maximum edit length
- Description: Maximum edit control length for report output
- Type: `integer`
- Default: `255`

## Report maximum multi line edit lines
- Description: Maximum number of lines for report multiline controls
- Type: `integer`
- Default: `1`

## DefaultHtmlFormatTextBlocksOnly
- Description: Default text-block format mode for HTML output
- Type: `enum{Text,HTML,Raw HTML,Text with meaningful spaces}`
- Options:
	* `Text`: Renders text blocks as plain text
	* `HTML`: Renders text blocks as HTML with GeneXus formatting handling
	* `Raw HTML`: Outputs text blocks as raw HTML without processing
	* `Text with meaningful spaces`: Renders text blocks preserving spaces and line breaks
---

# KNOWLEDGE BASE OBJECT COMPATIBILITY

## Isolation Level behavior
- Description: Defines isolation level behavior when inherited from Data Store or Generator
- Type: `enum{Read Committed,Inherit from Generator}`
- Options:
	* `Read Committed`: Uses `Read Committed` isolation when inherited behavior is resolved
	* `Inherit from Generator`: Keeps isolation behavior defined by the target generator
- Default: `Read Committed`

---

# KNOWLEDGE BASE INFO

## Last Open GX Version ID
- Description: Last GeneXus major version identifier used to open the knowledge base
- Type: `integer`

## Last Open GX Version Name
- Description: Last GeneXus version label used to open the knowledge base
- Type: `string`

## Last Open GX Build
- Description: Last GeneXus build number used to open the knowledge base
- Type: `string`

## GX Build KB Created
- Description: GeneXus build number used when the knowledge base was created
- Type: `string`
