---
name: properties-version
description: Configurable version properties
---

Use this file to select editable Version properties and metadata

---

# GENERAL

## Significant attribute name length
- Description: Significant attributes & domains name length
- Type: `integer`
- Default: `30`

## Significant table name length
- Description: Significant table/index/data-View name length
- Type: `integer`
- Default: `30`

## Significant object name length
- Description: Significant Trn/Wkp/Wbp/Rpt/Prc/Mnu/Mbar & Styles name length
- Type: `integer`
- Default: `128`

## Multi Tenant
- Description: Enable Multi Tenant support
- Type: `boolean`
- Default: `False`

## Translation type
- Description: Type of translation
- Type: `enum{Static,Run-time,No translation}`
- Options:
	* `Static`: Static
	* `Run-time`: Run-time
	* `No translation`: No translation
- Default: `No translation`

## Preserve Table Casing
- Type: `boolean`
- Default: `True`

## Generate prompt programs
- Description: Controls whether prompt objects are generated automatically or not
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Yes
	* `No`: No
- Default: `Yes`

## Root module visibility
- Description: Object visibility value of Root module
- Type: `enum{Public,Knowledge Base,Internal,Private}`
- Options:
	* `Public`: Public
	* `Knowledge Base`: Knowledge Base
	* `Internal`: Internal
	* `Private`: Private
- Default: `Knowledge Base`

## LIKE escape character
- Type: `string`

## Enable Integrated Security
- Description: Enables GAM integrated security for the version
- Type: `boolean`
- Default: `False`


---

# INTEGRATED SECURITY

## Integrated Security Level
- Type: `enum{None,Authentication,Authorization}`
- Options:
	* `None`: None
	* `Authentication`: Authentication
	* `Authorization`: Authorization
- Default: `None`

## Application ID
- Description: Integrated security application ID
- Type: `string`

## GAM Backend Style Override
- Description: Defines the Knowledge Base style object used to customize GAM backend style
- Type: `string`

## Login Object for Web
- Type: `string`

## Not Authorized Object for Web
- Type: `string`

## Login Object for SD
- Type: `string`

## Not Authorized Object for SD
- Type: `string`

## Change Password Object for SD
- Type: `string`


---

# EXTERNAL USAGE

## Display
- Type: `boolean`
- Default: `True`

## Insert
- Type: `boolean`
- Default: `True`

## Update
- Type: `boolean`
- Default: `True`

## Delete
- Type: `boolean`
- Default: `True`


---

# USER INTERFACE

## Default Style
- Type: `string`

## Default Form Layout
- Description: Specifies the form template used to generate default form
- Type: `enum{Flat Template,Unanimo Template,Carmine Template,Fiori Template}`
- Options:
	* `Flat Template`: Flat Template
	* `Unanimo Template`: Unanimo Template
	* `Carmine Template`: Carmine Template
	* `Fiori Template`: Fiori Template

## HTML Document Type
- Type: `enum{Do not specify,HTML 4.01 Transitional,HTML 4.01 Strict,XHTML 1.0 Transitional,HTML 5}`
- Options:
	* `Do not specify`: Do not specify
	* `HTML 4.01 Transitional`: HTML 4.01 Transitional
	* `HTML 4.01 Strict`: HTML 4.01 Strict
	* `XHTML 1.0 Transitional`: XHTML 1.0 Transitional
	* `HTML 5`: HTML 5
- Default: `HTML 5`

## Genexus IDE Connection String
- Type: `string`

## Web User Experience
- Type: `enum{Smooth,Previous versions compatible}`
- Options:
	* `Smooth`: Smooth
	* `Previous versions compatible`: Previous versions compatible
- Default: `Smooth`

## DefaultWebFormEditor
- Description: The web form editor to be used for new objects by default
- Type: `enum{Abstract Layout,HTML}`
- Options:
	* `Abstract Layout`: Abstract Layout
	* `HTML`: HTML
- Default: `Abstract Layout`

## WebFormDefaults
- Description: Indicates if GeneXus must use a responsive web design to generate default forms or the 'old' way
- Type: `enum{Responsive Web Design,Previous versions compatible}`
- Options:
	* `Responsive Web Design`: Responsive Web Design
	* `Previous versions compatible`: Previous versions compatible
- Default: `Responsive Web Design`

## Default Master Page
- Description: The Default Master Page
- Type: `string`

## Prompts Master Page
- Description: Master page used for initialize generated prompts
- Type: `string`

## Datepicker image
- Description: Image for datepicker
- Type: `string`

## Delete grid row UI
- Description: Delete grid row method from UI
- Type: `enum{Alternating images,Context menu - Delete}`
- Options:
	* `Alternating images`: Alternating images
	* `Context menu - Delete`: Context menu - Delete

## Delete row image
- Description: Image for deleting a grid row
- Type: `string`

## Undelete row image
- Description: Image for undeleting a grid row
- Type: `string`

## Prompt image
- Description: Image for prompt
- Type: `string`

## Delete column position in grids
- Type: `enum{Leftmost column,Rightmost column}`
- Options:
	* `Leftmost column`: Leftmost column
	* `Rightmost column`: Rightmost column

## Delete column position in free-style grids
- Type: `enum{Bottom right,Bottom left,Top right,Top left}`
- Options:
	* `Bottom right`: Bottom right
	* `Bottom left`: Bottom left
	* `Top right`: Top right
	* `Top left`: Top left

## Delete column tooltip text
- Type: `string`

## Delete column title
- Type: `string`

## Stop on error
- Description: Prevent user from proceeding when validation fails
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Yes
	* `No`: No
- Default: `No`

## Validation message position
- Description: Position of validation error and warning messages
- Type: `enum{Top,Right,Bottom,Left}`
- Options:
	* `Top`: Top
	* `Right`: Right
	* `Bottom`: Bottom
	* `Left`: Left
- Default: `Right`

## Validation message overlap adjacent controls
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Yes
	* `No`: No
- Default: `Yes`

## Validation message display
- Type: `enum{All at once,One at a time}`
- Options:
	* `All at once`: All at once
	* `One at a time`: One at a time
- Default: `One at a time`

## Form Classes
- Type: `string`

## Add button bitmap
- Type: `string`

## Update button bitmap
- Type: `string`

## Confirm button bitmap
- Type: `string`

## Delete button bitmap
- Type: `string`

## Attribute Font
- Type: `string`
- Default: `Courier New,9`

## Text Block Font
- Type: `string`
- Default: `Microsoft Sans Serif,8,style=Bold`

## Button Font
- Type: `string`
- Default: `Microsoft Sans Serif,8`

## Use Default Settings
- Type: `boolean`
- Default: `True`

## Button Prompt
- Type: `boolean`

## Colored Prompt
- Type: `boolean`

## Prompt Color
- Type: `string`
- Default: `Black`

## Report Attribute Font
- Type: `string`
- Default: `Microsoft Sans Serif,8`

## Report Text Block Font
- Type: `string`
- Default: `Microsoft Sans Serif,8`


---

# DEFAULTS

## Report output
- Type: `enum{Ask User,Only To Screen,Only To Printer,Only To File}`
- Options:
	* `Ask User`: Ask User
	* `Only To Screen`: Only To Screen
	* `Only To Printer`: Only To Printer
	* `Only To File`: Only To File
- Default: `Only To File`

## Exposed namespace
- Type: `string`

## URL access
- Description: Object can be accessed through the URL
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Yes
	* `No`: No
- Default: `No`

## Enable national language support
- Description: National language support
- Type: `enum{No,Yes}`
- Options:
	* `No`: No
	* `Yes`: Yes
- Default: `No`

## On session timeout
- Description: Action to perform on session timeout
- Type: `enum{Ignore,Warn}`
- Options:
	* `Ignore`: Ignore
	* `Warn`: Warn
- Default: `Ignore`

## XML Null Serialization
- Type: `enum{Empty Tag,No Tag,Nil Tag}`
- Options:
	* `Empty Tag`: Empty Tag
	* `No Tag`: No Tag
	* `Nil Tag`: Nil Tag
- Default: `Empty Tag`

## XML Date Serialization
- Type: `enum{Date & Time,Date & Time with Timezone,Date & Time with Timezone and Milliseconds}`
- Options:
	* `Date & Time`: Date & Time
	* `Date & Time with Timezone`: Date & Time with Timezone
	* `Date & Time with Timezone and Milliseconds`: Date & Time with Timezone and Milliseconds
- Default: `Date & Time`

## Automatic refresh
- Description: Automatically refresh grids when their dependencies are changed
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Yes
	* `No`: No
- Default: `Yes`

## Static content cache expiration (hours)
- Description: Static content expiration for content such as images, javascript and css (value in hours). JAVA: Compatible only with Servlet 2.4 or higher
- Type: `integer`
- Default: `36`

## User-Agent header
- Description: Specifies the default User-Agent HTTP request header that will be sent automatically in all outgoing HTTP requests performed by the application (via HttpClient, file downloads, or image retrievals). If left empty, no default User-Agent header will be sent. In the case of HttpClient, a User-Agent can still be set programmatically. Example: AppName/1.4.2 (.NET; Linux x64) - indicates the application name and version, optionally including the OS and architecture
- Type: `string`


---

# IMAGES

## LargeImageUploadSize
- Description: Size in KBytes or Resolution (<Width> x <Height>) for Large value on Maximum Upload Size property
- Type: `string`
- Default: `1024x1024`

## MediumImageUploadSize
- Description: Size in KBytes or Resolution (<Width> x <Height>) for Medium value on Maximum Upload Size property
- Type: `string`
- Default: `640x640`

## SmallImageUploadSize
- Description: Size in KBytes or Resolution (<Width> x <Height>) for Small value on Maximum Upload Size property
- Type: `string`
- Default: `320x320`


---

# TEAM DEVELOPMENT

## Remote Version
- Description: Repository Version
- Type: `string`


---

# COMPATIBILITY

## Time Only Compatibility
- Description: True to activate time only bug for Smart Devices and rest calls (Android and .net)
- Type: `boolean`
- Default: `True`

## Nulls Behavior
- Type: `enum{Current Version,Version 8.0 and prior (Deprecated)}`
- Options:
	* `Current Version`: Current Version
	* `Version 8.0 and prior (Deprecated)`: Version 8.0 and prior (Deprecated)
- Default: `Current Version`

## Empty as null behavior
- Type: `enum{Current Version,Version 8.0 and prior (Deprecated),Blank as Null}`
- Options:
	* `Current Version`: Current Version
	* `Version 8.0 and prior (Deprecated)`: Version 8.0 and prior (Deprecated)
	* `Blank as Null`: Blank as Null
- Default: `Current Version`

## Show Master Page when Pop-up
- Type: `boolean`
- Default: `False`

## Column Title Default
- Type: `enum{From Description,From Parent}`
- Options:
	* `From Description`: From Description
	* `From Parent`: From Parent
- Default: `From Parent`

---

# SPECIAL

## CurrentEnvironment
- Description: Specifies the current environment from a predefined list
- Type: `string`
- Location: `.local.gx`