---
name: module-gam-permission
description: GAMPermission external object for permission lifecycle
---

Defines permission entities used by roles and authorization checks through `GAMPermission` object

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-error.md](./module-gam-error.md)

---

# PROPERTIES

## ApplicationId
Application scope Id for the permission

Syntax: `<id> = GAMPermission.ApplicationId`

Where:
- `<id>`: Application Id for the permission

## GUID
Global identifier of the permission

Syntax: `<guid> = GAMPermission.GUID`

Where:
- `<guid>`: Permission GUID (`GAMGUID`)

## Type
Permission category/type

Syntax: `<type> = GAMPermission.Type`

Where:
- `<type>`: Permission type value

---

# METHODS

## Load
Loads permission by key fields

Syntax: `GAMPermission.Load()`

## Save
Creates or updates permission

Syntax: `GAMPermission.Save()`

## Delete
Deletes permission

Syntax: `GAMPermission.Delete()`

## Success
Returns True if last operation succeeded

Syntax: `<success> = GAMPermission.Success()`

Where:
- `<success>`: Last operation success status

## Fail
Returns True if last operation failed

Syntax: `<failure> = GAMPermission.Fail()`

Where:
- `<failure>`: Last operation status failure

---

# EXAMPLE
Create permission `Sales.Order.View` in `SalesPortal` and validate operation result
~~~
&SalesOrderViewPermission.ApplicationId = &SalesPortalApplicationId
&SalesOrderViewPermission.Type = !"R"
&SalesOrderViewPermission.Save()
&IsOK = &SalesOrderViewPermission.Success()
~~~
