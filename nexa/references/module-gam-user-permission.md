---
name: module-gam-user-permission
description: Effective permission structure resolved for a GAM user
---

Defines permission assignment data returned by GAM user permission queries

Related:
- [module-gam-user.md](./module-gam-user.md)
- [module-gam-permission.md](./module-gam-permission.md)

---

# PROPERTIES

## Id
Permission identifier

Syntax: `<id> = GAMUserPermission.Id`

## Name
Permission name or key

Syntax: `<name> = GAMUserPermission.Name`

## Description
Permission description

Syntax: `<description> = GAMUserPermission.Description`

## AccessType
Permission access type

Syntax: `<access-type> = GAMUserPermission.AccessType`

---

# CONSTRAINTS
- Effective permissions can include inherited role permissions
- Evaluate permission list before dynamic feature exposure

---

# EXAMPLE
Resolve user permissions and enable feature flag based on permission key
~~~
&UserPermissions = GAMRepository.GetUserPermissions(&UserGuid, &Errors)
For &UserPermission in &UserPermissions
	If &UserPermission.Name = !"Sales.Order.Approve"
		&CanApproveOrder = True
		Exit
	EndIf
EndFor
~~~
