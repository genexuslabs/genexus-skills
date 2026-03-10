---
name: module-gam-application
description: GAMApplication external object for menus and permission resources
---

Defines menu resolution and navigation behavior in secured applications through `GAMApplication` object

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-error.md](./module-gam-error.md)
- [module-gam-permission.md](./module-gam-permission.md)

---

# PROPERTIES

## HomeObject
Default home object for navigation

Syntax: `<home> = GAMApplication.HomeObject`

Where:
- `<home>`: Default home object value

---

# METHODS

## GetMenus
Returns menus by filter

Syntax: `<menus> = GAMApplication.GetMenus(<filter>, <errors>)`

Where:
- `<filter>`: Menu filter criteria
- `<errors>`: Collection of `GAMError` output
- `<menus>`: Collection of `GAMApplicationMenu`

## GetMenu
Gets one menu by Id

Syntax: `<menu> = GAMApplication.GetMenu(<menu-id>, <errors>)`

Where:
- `<menu-id>`: Menu Id
- `<errors>`: Collection of `GAMError` output
- `<menu>`: Menu instance (`GAMApplicationMenu`)

## GetSubMenus
Gets child menus of a parent menu

Syntax: `<menu> = GAMApplication.GetSubMenus(<menu-id>, <errors>)`

Where:
- `<menu-id>`: Parent menu Id
- `<errors>`: Collection of `GAMError` output
- `<menu>`: Collection of `GAMApplicationMenu`

## AddMenu
Creates a menu

Syntax: `<success> = GAMApplication.AddMenu(<menu>, <errors>)`

Where:
- `<menu>`: Menu object payload
- `<errors>`: Collection of `GAMError` output
- `<success>`: Menu creation status success

## UpdateMenu
Updates a menu

Syntax: `<success> = GAMApplication.UpdateMenu(<menu>, <errors>)`

Where:
- `<menu>`: Menu object payload
- `<errors>`: Collection of `GAMError` output
- `<success>`: Menu update status success

## DeleteMenu
Deletes a menu

Syntax: `<success> = GAMApplication.DeleteMenu(<menu>, <errors>)`

Where:
- `<menu>`: Menu object payload to delete
- `<errors>`: Collection of `GAMError` output
- `<success>`: Menu deletion status success

## AddMenuOption
Adds an option to a menu

Syntax: `<success> = GAMApplication.AddMenuOption(<id>, <option>, <errors>)`

Where:
- `<id>`: Parent menu Id
- `<option>`: Menu option payload
- `<errors>`: Collection of `GAMError` output
- `<success>`: Menu option add status success

## UpdateMenuOption
Updates an option in a menu

Syntax: `<success> = GAMApplication.UpdateMenuOption(<id>, <option>, <errors>)`

Where:
- `<id>`: Parent menu Id
- `<option>`: Menu option payload
- `<errors>`: Collection of `GAMError` output
- `<success>`: Menu option update status success

## DeleteMenuOption
Deletes an option from a menu

Syntax: `<success> = GAMApplication.DeleteMenuOption(<id>, <option>, <errors>)`

Where:
- `<id>`: Parent menu Id
- `<option>`: Menu option payload to delete
- `<errors>`: Collection of `GAMError` output
- `<success>`: Menu option deletion status success

## GetMenuOptions
Returns options for a menu

Syntax: `<options> = GAMApplication.GetMenuOptions(<id>, <filter>, <errors>)`

Where:
- `<id>`: Menu Id
- `<filter>`: Option filter criteria
- `<errors>`: Collection of `GAMError` output
- `<options>`: Collection of `GAMApplicationMenuOption`

## GetMenuOption
Gets one menu option

Syntax: `<option> = GAMApplication.GetMenuOption(<id>, <id>, <errors>)`

Where:
- `<id>`: Menu Id
- `<id>`: Option Id
- `<errors>`: Collection of `GAMError` output
- `<option>`: Menu option instance (`GAMApplicationMenuOption`)

## GetPermissionResources
Returns resources available for permission assignment

Syntax: `<resources> = GAMApplication.GetPermissionResources(<filter>, <errors>)`

Where:
- `<filter>`: Permission/resource filter
- `<errors>`: Collection of `GAMError` output
- `<resources>`: Collection of permission resources (`GAMPermission`)

## GetUserMenu
Gets user menu resolved for current user permissions

Syntax: `<menu> = GAMApplication.GetUserMenu(<id>, <params>, <errors>)`

Where:
- `<id>`: Menu Id
- `<params>`: Extra resolver parameters
- `<errors>`: Collection of `GAMError` output
- `<menu>`: User-resolved menu (`GAMApplicationMenu`)

## GetUserMainMenu
Gets current user main menu

Syntax: `<menu> = GAMApplication.GetUserMainMenu(<params>, <errors>)`

Where:
- `<params>`: Extra resolver parameters
- `<errors>`: Collection of `GAMError` output
- `<menu>`: User main menu (`GAMApplicationMenu`)

## GetUserMenuByGUID
Gets user menu by menu GUID

Syntax: `<menu> = GAMApplication.GetUserMenuByGUID(<guid>, <params>, <errors>)`

Where:
- `<guid>`: Menu GUID
- `<params>`: Extra resolver parameters
- `<errors>`: Collection of `GAMError` output
- `<menu>`: User-resolved menu (`GAMApplicationMenu`)

## GoHome
Redirects execution to home object

Syntax: `GAMApplication.GoHome()`

Notes:
- `ApplicationGoHome` behavior resolves the home object configured for the authenticated application context

---

# EXAMPLE
Authorize `CreateOrder` option
~~~
&AdditionalParameters = new()
&UserMainMenu = GAMApplication.GetUserMainMenu(&AdditionalParameters, &Errors)
If &Errors.Count > 0
	msg(!"User menu resolution failed")
	Return
EndIf

&MainMenuId = &UserMainMenu.Id
&CreateOrderOptionId = !"CreateOrder"
&CreateOrderOption = GAMApplication.GetMenuOption(&MainMenuId, &CreateOrderOptionId, &Errors)
If &Errors.Count > 0 or &CreateOrderOption.IsEmpty()
	msg(format(!"Access denied: %1 option unavailable", &CreateOrderOptionId))
	GAMApplication.GoHome()
	Return
EndIf

msg(format(!"Access granted: %1 opened", &CreateOrderOptionId))
~~~
