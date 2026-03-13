---
name: properties-object-transaction
description: Configurable transaction properties
---

Use this file to select editable properties, defaults, and valid options for this target

---

# GENERAL

## Folder
- Description: Folder where the object is organized in the KB
- Type: `string`

## Business Component
- Description: Exposes transaction as Business Component API
- Type: `boolean`

## Session Type
- Description: Execution session mode for database access
- Type: `enum{Read Only,Read Write,None}`
- Options:
	* `Read Only`: Allows read operations only
	* `Read Write`: Allows both read and write operations
	* `None`: Disables additional behavior for this setting
- Default: `Read Write`

## Main program
- Description: To specify that the object is main. That is: it can be executed as standalone application
- Type: `boolean`
- Default: `False`


---

# INTEGRATED SECURITY
Use [common integrated security properties](./properties-common-integrated-security.md)

---

# NETWORK
Use [common network properties](./properties-common-network.md)

---

# BUSINESS COMPONENT

## Call protocol
- Description: Define how the object is invoked, and its output
- Type: `enum{Internal,HTTP,Command Line,SOAP,Enterprise Java Bean}`
- Options:
	* `Internal`: Executes internally within the application runtime
	* `HTTP`: Exposes or invokes behavior over HTTP
	* `Command Line`: Enables command-line invocation
	* `SOAP`: Exposes or invokes behavior as SOAP service
	* `Enterprise Java Bean`: Uses Enterprise Java Bean integration mode
- Default: `Internal`

## Exposed name
- Description: Name exposed to external interfaces
- Type: `string`

## Exposed namespace
- Description: Namespace exposed to external interfaces
- Type: `string`

## Expose as Web Service
- Description: Publishes the object as a web service endpoint
- Type: `boolean`
- Default: `False`

## Display
- Description: Allows read/display operation in exposed interface
- Type: `boolean`
- Default: `True`

## Insert
- Description: Allows insert operation in exposed interface
- Type: `boolean`
- Default: `True`

## Update
- Description: Allows update operation in exposed interface
- Type: `boolean`
- Default: `True`

## Delete
- Description: Allows delete operation in exposed interface
- Type: `boolean`
- Default: `True`


---

# OBSERVABILITY
Use [common observability properties](./properties-common-observability.md)

---

# WEB TRANSACTION

## Theme
- Description: Name of an existing Design System object applied to generated web UI
- Type: `string`

## Form Layout
- Description: Select template used to generate default form
- Type: `enum{FlatTemplate,UnanimoTemplate,CarmineTemplate,FioriTemplate}`
- Options:
	* `FlatTemplate`: Uses the FlatTemplate form layout
	* `UnanimoTemplate`: Uses the UnanimoTemplate form layout
	* `CarmineTemplate`: Uses the CarmineTemplate form layout
	* `FioriTemplate`: Uses the FioriTemplate form layout

## Type
- Description: Web Panel Type
- Type: `enum{Component,Web Page,Master Page}`
- Options:
	* `Component`: Generates the object as a reusable component
	* `Web Page`: Generates the object as a web page
	* `Master Page`: Generates the object as a master page template
- Default: `Web Page`

## Master Page
- Description: The Master Page containing this object
- Type: `string`

## Show Master Page when Pop-up
- Description: Renders master page when opened as popup
- Type: `boolean`

## On session timeout
- Description: Action to perform on session timeout
- Type: `enum{Ignore,Warn}`
- Options:
	* `Ignore`: Ignores this condition without notifying the user
	* `Warn`: Shows a warning for this condition
- Default: `Ignore`

## Encrypt URL parameters
- Description: Allow or deny URL parameter encryption level
- Type: `string`

## Protocol specification
- Description: The protocol used for services and absolute URLs
- Type: `string`

## Web Security Level
- Description: Security strictness for web runtime behavior
- Type: `enum{Use Environment property value,High,Medium}`
- Options:
	* `Use Environment property value`: Uses the setting defined at environment level
	* `High`: Uses the high level for this setting
	* `Medium`: Uses the medium level for this setting
- Default: `High`


---

# DATA

## Update Policy
- Description: Choose between Updatable and Read Only
- Type: `enum{Updatable,Read Only}`
- Options:
	* `Updatable`: Allows data updates
	* `Read Only`: Allows read operations only
- Default: `Updatable`


---

# DATA WAREHOUSING

## DW transaction
- Description: Enables Data Warehouse behavior for transaction
- Type: `boolean`
- Default: `False`


---

# TRANSACTION INTEGRITY

## Commit on exit
- Description: Commits transaction when object execution ends
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `Yes`


---

# USER INTERFACE

## Confirm Transactions
- Description: Asks confirmation before transaction commit
- Type: `enum{No,Yes}`
- Options:
	* `No`: Disables this behavior
	* `Yes`: Enables this behavior
- Default: `No`

## Confirmation
- Description: Request user confirmation when moving between transaction actions from
- Type: `string`

## Client side validation
- Description: Runs validation in client before submit
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
	* `Use Environment property value`: Uses the setting defined at environment level
- Default: `Yes`

## Web User Experience
- Description: Web user experience
- Type: `enum{Smooth,Previous versions compatible}`
- Options:
	* `Smooth`: Uses smooth web experience behavior
	* `Previous versions compatible`: Uses legacy-compatible rendering behavior

## WebFormDefaults
- Description: Choose responsive or legacy generation for default web forms
- Type: `enum{Responsive Web Design,Previous versions compatible}`
- Options:
	* `Responsive Web Design`: Uses responsive web design rendering mode
	* `Previous versions compatible`: Uses legacy-compatible rendering behavior
- Default: `Responsive Web Design`

## Enable Datepicker
- Description: Enables calendar picker for date and datetime controls
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
	* `Use Environment property value`: Uses the setting defined at environment level
- Default: `Yes`

## Show week numbers
- Description: Show calendar week numbers
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
	* `Use Environment property value`: Uses the setting defined at environment level
- Default: `No`

## First day of week
- Description: Select first day of week for calendar
- Type: `enum{Sunday,Monday,Use Environment property value}`
- Options:
	* `Sunday`: Sets Sunday as the first day of week
	* `Monday`: Sets Monday as the first day of week
	* `Use Environment property value`: Uses the setting defined at environment level
- Default: `Sunday`

## Assign Function Keys to Standard Events
- Description: Maps function keys to standard events
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
	* `Use Environment property value`: Uses the setting defined at environment level
- Default: `No`

## Menubar
- Description: Menu bar style applied in Win interface
- Type: `string`

## Border style
- Description: Window border style in Win interface
- Type: `enum{Sizable,None,Fixed Single,Fixed Dialog}`
- Options:
	* `Sizable`: Allows the window to be resized
	* `None`: Disables additional behavior for this setting
	* `Fixed Single`: Uses a fixed single-border window
	* `Fixed Dialog`: Uses a fixed dialog-style window
- Default: `Fixed Single`

## Maximize button
- Description: Shows maximize button in Win interface
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `Yes`

## Minimize button
- Description: Shows minimize button in Win interface
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `Yes`

## Show in taskBar (SDI)
- Description: Shows form in Windows taskbar in SDI mode
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `Yes`

## Form icon
- Description: Icon used in form window
- Type: `string`

## Control box
- Description: Enables standard form control box
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `Yes`

## Modal dialog
- Description: Opens form as modal dialog
- Type: `enum{Yes if parameters specified,Yes,No}`
- Options:
	* `Yes if parameters specified`: Enables this behavior only when parameters are present
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
- Default: `Yes if parameters specified`

## Show form
- Description: Initial visibility state of the form
- Type: `enum{Use Environment property value,Before Start Event,After Start Event}`
- Options:
	* `Use Environment property value`: Uses the setting defined at environment level
	* `Before Start Event`: Applies before the Start event executes
	* `After Start Event`: Applies after the Start event executes
- Default: `Before Start Event`

## Scrollable form
- Description: Enables scroll bars in form container
- Type: `enum{Use Environment property value,No,Auto}`
- Options:
	* `Use Environment property value`: Uses the setting defined at environment level
	* `No`: Disables this behavior
	* `Auto`: Lets GeneXus decide the best behavior automatically
- Default: `No`

## Add button bitmap
- Description: Bitmap used by add action
- Type: `string`

## Update button bitmap
- Description: Bitmap used by update action
- Type: `string`

## Confirm button bitmap
- Description: Bitmap used by confirm action
- Type: `string`

## Delete button bitmap
- Description: Bitmap used by delete action
- Type: `string`

## Autocenter objects in (0,0)
- Description: Centers report controls around origin
- Type: `enum{Use Environment property value,No,Yes}`
- Options:
	* `Use Environment property value`: Uses the setting defined at environment level
	* `No`: Disables this behavior
	* `Yes`: Enables this behavior
- Default: `No`

## Generate as a Popup window
- Description: Generates object as popup window
- Type: `enum{No,Yes,automatic border,Yes,user defined border}`
- Options:
	* `No`: Disables this behavior
	* `Yes`: Enables this behavior
	* `automatic border`: Uses an automatically selected border style
	* `Yes`: Enables this behavior
	* `user defined border`: Uses a border style defined by the user
- Default: `No`

## Color
- Description: Color used by associated control or section
- Type: `enum{Default to color rule,White,Red,Green,Yellow,Blue,Cyan,Magenta}`
- Options:
	* `Default to color rule`: Uses color behavior defined by color rules
	* `White`: Uses white color
	* `Red`: Uses red color
	* `Green`: Uses green color
	* `Yellow`: Uses yellow color
	* `Blue`: Uses blue color
	* `Cyan`: Uses cyan color
	* `Magenta`: Uses magenta color
- Default: `Default to color rule`

## Display attribute
- Description: Attribute used as display value in UI
- Type: `enum{Default to color rule,Reverse Image,High,Blinking,No Display}`
- Options:
	* `Default to color rule`: Uses color behavior defined by color rules
	* `Reverse Image`: Displays content using reverse video style
	* `High`: Uses the high level for this setting
	* `Blinking`: Displays content with blinking effect
	* `No Display`: Hides content from display output
- Default: `Default to color rule`

## Characters
- Description: Character count used by associated setting
- Type: `string`


---

# WARNING MESSAGES
Use [common warning messages properties](./properties-common-warning-messages.md)

---

# COMPATIBILITY

## Standard Functions
- Description: Standard functions checking
- Type: `enum{Use Environment property value,Only standard functions,Allow non-standard functions}`
- Options:
	* `Use Environment property value`: Uses the setting defined at environment level
	* `Only standard functions`: Allows only standard GeneXus functions
	* `Allow non-standard functions`: Allows non-standard functions in expressions
- Default: `Use Environment property value`

## Initialize not referenced attributes
- Description: Initializes attributes not referenced in code
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Enables this behavior
	* `No`: Disables this behavior
	* `Use Environment property value`: Uses the setting defined at environment level
- Default: `Yes`

## Generate null for nullvalue()
- Description: Generates database null when Nullvalue() is used
- Type: `enum{No,Yes,Use Environment property value}`
- Options:
	* `No`: Disables this behavior
	* `Yes`: Enables this behavior
	* `Use Environment property value`: Uses the setting defined at environment level
- Default: `No`


---

# MULTI TIER GENERATION

## Optimize for multi tier execution
- Description: Optimizes rule execution strategy for multi-tier deployments to reduce remote round trips
- Type: `string`


---

# FULL TEXT SEARCH OPTIONS

## Searchable
- Description: Enables search capabilities for the control
- Type: `enum{True,False,Use Environment property value}`
- Options:
	* `True`: Enables this behavior
	* `False`: Disables this behavior
	* `Use Environment property value`: Uses the setting defined at environment level

## Search viewer
- Description: Viewer used for search interaction
- Type: `string`
