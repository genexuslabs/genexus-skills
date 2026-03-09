---
name: properties-object-panel
description: Configurable panel properties for web and native targets
---

Use this file to select editable Panel properties and apply target-specific settings

---

# GENERAL

## Folder
- Description: Folder where the object is organized in the KB
- Type: `string`

## Main program
- Description: Marks object as executable entry point
- Type: `boolean`
- Default: `False`

## Session Type
- Description: Execution session mode for database access
- Type: `enum{Read Only,Read Write,None}`
- Options:
	* `Read Only`: Use this value when it matches the target behavior
	* `Read Write`: Use this value when it matches the target behavior
	* `None`: Use this value when it matches the target behavior
- Default: `Read Write`

---

# WEB PANEL

## Theme
- Description: Applies to web generators only
- Type: `string`

## Type
- Description: Defines web panel mode
- Type: `enum{Component,Web Page,Master Page}`
- Options:
	* `Component`: Use this value when it matches the target behavior
	* `Web Page`: Use this value when it matches the target behavior
	* `Master Page`: Use this value when it matches the target behavior
- Default: `Web Page`

## Master Page
- Description: Master page applied to web rendering
- Type: `string`

## Show Master Page when Pop-up
- Description: Show master page in popup rendering
- Type: `boolean`

## On session timeout
- Description: Action executed when session expires
- Type: `enum{Ignore,Warn}`
- Options:
	* `Ignore`: Use this value when it matches the target behavior
	* `Warn`: Use this value when it matches the target behavior
- Default: `Ignore`

## Focus control
- Description: Initial focus behavior for rendered controls
- Type: `enum{Use Environment property value,First input att/var on the page,First input att/var on the page only if not embedded,Browser dependent}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `First input att/var on the page`: Use this value when it matches the target behavior
	* `First input att/var on the page only if not embedded`: Use this value when it matches the target behavior
	* `Browser dependent`: Use this value when it matches the target behavior
- Default: `First input att/var on the page`

## Cache expiration lapse
- Description: Cache validity duration before refresh
- Type: `string`

## Automatic refresh
- Description: Automatically refresh grids on dependency changes
- Type: `enum{Yes,No}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior

## Auto compress http traffic
- Description: Compresses HTTP responses to reduce payload size
- Type: `enum{Yes,No,Use Environment property value}`
- Options:
	* `Yes`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Use Environment property value`: Use this value when it matches the target behavior
- Default: `Yes`

## Web User Experience
- Description: Applies to web generators only
- Type: `enum{Smooth,Previous versions compatible}`
- Options:
	* `Smooth`: Use this value when it matches the target behavior
	* `Previous versions compatible`: Use this value when it matches the target behavior

## Encrypt URL parameters
- Description: URL value used by integration or metadata
- Type: `enum{Use Environment property value,No,Session key,Site key}`
- Options:
	* `Use Environment property value`: Use this value when it matches the target behavior
	* `No`: Use this value when it matches the target behavior
	* `Session key`: Use this value when it matches the target behavior
	* `Site key`: Use this value when it matches the target behavior
- Default: `No`

---

# NATIVE PANEL

## Integrated Security Level
- Description: Applies to native generators using offline synchronization
- Type: `enum{None,Authentication,Authorization}`
- Options:
	* `None`: Use this value when it matches the target behavior
	* `Authentication`: Use this value when it matches the target behavior
	* `Authorization`: Use this value when it matches the target behavior

## Permission Prefix
- Description: Prefix used when generating permissions
- Type: `string`

## Security Client ID
- Description: GAM client identifier used for authentication
- Type: `string`

## Security Client Secret
- Description: GAM client secret used for authentication
- Type: `string`

## Encrypt Offline Database
- Description: Encrypts local offline database content
- Type: `boolean`
- Default: `False`

## Data Receive Criteria
- Description: Trigger strategy for receive synchronization
- Type: `enum{On Application Launch,After Elapsed Time,Manual,Never}`
- Options:
	* `On Application Launch`: Use this value when it matches the target behavior
	* `After Elapsed Time`: Use this value when it matches the target behavior
	* `Manual`: Use this value when it matches the target behavior
	* `Never`: Use this value when it matches the target behavior
- Default: `On Application Launch`

## Minimum Time Between Receives
- Description: Minimum interval between receive synchronizations in seconds
- Type: `integer`
- Default: `600`

## Data Receive Granularity
- Description: Defines sync granularity by row or by table
- Type: `enum{By Row,By Table}`
- Options:
	* `By Row`: Use this value when it matches the target behavior
	* `By Table`: Use this value when it matches the target behavior
- Default: `By Row`

## Minimum Time Between Table Purges
- Description: Minimum interval between server sync-table purges in seconds
- Type: `integer`
- Default: `3600`

## Receive Timeout
- Description: Maximum wait time before operation timeout
- Type: `integer`
- Default: `0`

## Send Changes
- Description: Trigger strategy for send synchronization
- Type: `enum{When connected,Manual,Never}`
- Options:
	* `When connected`: Use this value when it matches the target behavior
	* `Manual`: Use this value when it matches the target behavior
	* `Never`: Use this value when it matches the target behavior
- Default: `When connected`

## Minimum Time Between Sends
- Description: Minimum interval between send synchronizations in seconds
- Type: `integer`
- Default: `0`

## Send Timeout
- Description: Maximum wait time before operation timeout
- Type: `integer`
- Default: `0`
