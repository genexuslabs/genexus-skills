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
	* `Read Only`: Use this value when it matches the target behavior
	* `Read Write`: Use this value when it matches the target behavior
	* `None`: Use this value when it matches the target behavior
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
	* `Internal`: Use this value when it matches the target behavior
	* `HTTP`: Use this value when it matches the target behavior
	* `Command Line`: Use this value when it matches the target behavior
	* `SOAP`: Use this value when it matches the target behavior
	* `Enterprise Java Bean`: Use this value when it matches the target behavior
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
- Description: Theme applied to generated UI
- Type: `string`

## Form Layout
- Description: Select template used to generate default form
- Type: `enum{FlatTemplate,UnanimoTemplate,CarmineTemplate,FioriTemplate}`
- Options:
	* `FlatTemplate`: Use this value when it matches the target behavior
	* `UnanimoTemplate`: Use this value when it matches the target behavior
	* `CarmineTemplate`: Use this value when it matches the target behavior
	* `FioriTemplate`: Use this value when it matches the target behavior

## Type
- Description: Web Panel Type
- Type: `enum{Component,Web Page,Master Page}`
- Options:
	* `Component`: Use this value when it matches the target behavior
	* `Web Page`: Use this value when it matches the target behavior
	* `Master Page`: Use this value when it matches the target behavior
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
	* `Ignore`: Use this value when it matches the target behavior
	* `Warn`: Use this value when it matches the target behavior
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
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `High`: Use this value when it matches the target behavior
	* `Medium`: Use this value when it matches the target behavior
- Default: `High`


---

# DATA

## Update Policy
- Description: Choose between Updatable and Read Only
- Type: `enum{Updatable,Read Only}`
- Options:
	* `Updatable`: Use this value when it matches the target behavior
	* `Read Only`: Use this value when it matches the target behavior
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
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`


---

# USER INTERFACE

## Confirm Transactions
- Description: Asks confirmation before transaction commit
- Type: `enum{No,Yes}`
- Options:
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
- Default: `No`

## Confirmation
- Description: Request user confirmation when moving between transaction actions from
- Type: `string`

## Client side validation
- Description: Runs validation in client before submit
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `Yes`

## Web User Experience
- Description: Web user experience
- Type: `enum{Smooth,Previous versions compatible}`
- Options:
	* `Smooth`: Use this value when it matches the target behavior
	* `Previous versions compatible`: Use this value when it matches the target behavior

## WebFormDefaults
- Description: Choose responsive or legacy generation for default web forms
- Type: `enum{Responsive Web Design,Previous versions compatible}`
- Options:
	* `Responsive Web Design`: Use this value when it matches the target behavior
	* `Previous versions compatible`: Use this value when it matches the target behavior
- Default: `Responsive Web Design`

## Enable Datepicker
- Description: Enables calendar picker for date and datetime controls
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `Yes`

## Show week numbers
- Description: Show calendar week numbers
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `No`

## First day of week
- Description: Select first day of week for calendar
- Type: `enum{Sunday,Monday,Use Environment property value}`
- Options:
	* `Sunday`: Use this value when it matches the target behavior
	* `Monday`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `Sunday`

## Assign Function Keys to Standard Events
- Description: Maps function keys to standard events
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `No`

## Menubar
- Description: Menu bar style applied in Win interface
- Type: `string`

## Border style
- Description: Window border style in Win interface
- Type: `enum{Sizable,None,Fixed Single,Fixed Dialog}`
- Options:
	* `Sizable`: Use this value when it matches the target behavior
	* `None`: Use this value when it matches the target behavior
	* `Fixed Single`: Use this value when it matches the target behavior
	* `Fixed Dialog`: Use this value when it matches the target behavior
- Default: `Fixed Single`

## Maximize button
- Description: Shows maximize button in Win interface
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`

## Minimize button
- Description: Shows minimize button in Win interface
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`

## Show in taskBar (SDI)
- Description: Shows form in Windows taskbar in SDI mode
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`

## Form icon
- Description: Icon used in form window
- Type: `string`

## Control box
- Description: Enables standard form control box
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes`

## Modal dialog
- Description: Opens form as modal dialog
- Type: `enum{Yes if parameters specified,Yes,No}`
- Options:
	* `Yes if parameters specified`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
- Default: `Yes if parameters specified`

## Show form
- Description: Initial visibility state of the form
- Type: `enum{Use Environment property value,Before Start Event,After Start Event}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `Before Start Event`: Use this value when it matches the target behavior
	* `After Start Event`: Use this value when it matches the target behavior
- Default: `Before Start Event`

## Scrollable form
- Description: Enables scroll bars in form container
- Type: `enum{Use Environment property value,No,Auto}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Auto`: Use this value when it matches the target behavior
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
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
- Default: `No`

## Generate as a Popup window
- Description: Generates object as popup window
- Type: `enum{No,Yes,automatic border,Yes,user defined border}`
- Options:
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
	* `automatic border`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
	* `user defined border`: Use this value when it matches the target behavior
- Default: `No`

## Color
- Description: Color used by associated control or section
- Type: `enum{Default to color rule,White,Red,Green,Yellow,Blue,Cyan,Magenta}`
- Options:
	* `Default to color rule`: Use this value when it matches the target behavior
	* `White`: Use this value when it matches the target behavior
	* `Red`: Use this value when it matches the target behavior
	* `Green`: Use this value when it matches the target behavior
	* `Yellow`: Use this value when it matches the target behavior
	* `Blue`: Use this value when it matches the target behavior
	* `Cyan`: Use this value when it matches the target behavior
	* `Magenta`: Use this value when it matches the target behavior
- Default: `Default to color rule`

## Display attribute
- Description: Attribute used as display value in UI
- Type: `enum{Default to color rule,Reverse Image,High,Blinking,No Display}`
- Options:
	* `Default to color rule`: Use this value when it matches the target behavior
	* `Reverse Image`: Use this value when it matches the target behavior
	* `High`: Use this value when it matches the target behavior
	* `Blinking`: Use this value when it matches the target behavior
	* `No Display`: Use this value when it matches the target behavior
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
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `Only standard functions`: Use this value when it matches the target behavior
	* `Allow non-standard functions`: Use this value when it matches the target behavior
- Default: `Use Environment property value`

## Initialize not referenced attributes
- Description: Initializes attributes not referenced in code
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `Yes`

## Generate null for nullvalue()
- Description: Generates database null when Nullvalue() is used
- Type: `enum{No,Yes,Use Environment property value}`
- Options:
	* `No`: Use this value when it matches the target behavior
	* `Yes`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
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
	* `True`: Use this value when it matches the target behavior
	* `False`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior

## Search viewer
- Description: Viewer used for search interaction
- Type: `string`
