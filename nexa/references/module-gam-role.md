---
name: module-gam-role
description: GAMRole external object for role-permission management
---

Defines role-permission assignments for authorization design through `GAMRole` object

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-error.md](./module-gam-error.md)

---

# METHODS

## AddPermission
Adds a permission to the role

Syntax: `<success> = GAMRole.AddPermission(<permission>, <errors>)`

Where:
- `<permission>`: Instance of `GAMPermission` to assign
- `<errors>`: Collection of `GAMError` output
- `<success>`: Permission assignment status success

## UpdatePermission
Updates an existing role-permission relation

Syntax: `<success> = GAMRole.UpdatePermission(<permission>, <errors>)`

Where:
- `<permission>`: Instance of `GAMPermission` with updated data
- `<errors>`: Collection of `GAMError` output
- `<success>`: Relation update status success

## DeletePermission
Deletes a permission relation using permission object data

Syntax: `<success> = GAMRole.DeletePermission(<permission>, <errors>)`

Where:
- `<permission>`: Instance of `GAMPermission` to remove
- `<errors>`: Collection of `GAMError` output
- `<success>`: Relation deletion status success

## DeletePermissionById
Deletes a permission relation by permission Id

Syntax: `<success> = GAMRole.DeletePermissionById(<permission>, <errors>)`

Where:
- `<permission>`: Permission Id
- `<errors>`: Collection of `GAMError` output
- `<success>`: Relation deletion status success

---

# EXAMPLE
Assign and update `Sales.Order.View` permission for role `SalesManager`
~~~
&Role.AddPermission(&SalesOrderViewPermission, &Errors)
&Role.UpdatePermission(&SalesOrderViewPermission, &Errors)
~~~
