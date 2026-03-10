---
name: module-gam-user-role
description: Role membership structure resolved for a GAM user
---

Defines role assignment data returned by GAM user role queries

Related:
- [module-gam-user.md](./module-gam-user.md)
- [module-gam-role.md](./module-gam-role.md)

---

# PROPERTIES

## Id
Role identifier

Syntax: `<id> = GAMUserRole.Id`

## Name
Role name

Syntax: `<name> = GAMUserRole.Name`

## IsMain
Indicates whether role is the user's main role

Syntax: `<main> = GAMUserRole.IsMain`

---

# CONSTRAINTS
- Role membership depends on direct and inherited role assignments
- Main role is used by default in authorization checks that require role context

---

# EXAMPLE
List resolved roles for a user and identify the main role
~~~
&UserRoles = GAMRepository.GetUserRoles(&UserGuid, &Errors)
For &UserRole in &UserRoles
	&StatusText = format(!"Role: %1", &UserRole.Name)
	msg(&StatusText)
	If &UserRole.IsMain
		&MainRoleName = &UserRole.Name
	EndIf
EndFor
~~~
