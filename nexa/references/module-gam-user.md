---
name: module-gam-user
description: GAMUser external object for user identity, profile, roles, and extended attributes
---

Defines user identity, profile, roles, and dynamic/extended attributes through `GAMUser` object

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-error.md](./module-gam-error.md)
- [module-gam-user-role.md](./module-gam-user-role.md)
- [module-gam-user-permission.md](./module-gam-user-permission.md)
- [module-gam-entity-property.md](./module-gam-entity-property.md)

---

# PROPERTIES

## DefaultRoleId
Main role Id for the user

Syntax: `<role> = GAMUser.DefaultRoleId`

Where:
- `<role>`: Main role Id (`GAMKeyNumLong`)

## ExternalId
External identifier for mapping application users and GAM users

Syntax: `<external> = GAMUser.ExternalId`

Where:
- `<external>`: External identifier value used for user mapping

## Attributes
Dynamic attributes collection assigned to the user

Syntax: `<attributes> = GAMUser.Attributes`

Where:
- `<attributes>`: Collection of `GAMUserAttribute`

---

# METHODS

## Load
Loads a user using key fields already set in the instance

Syntax: `GAMUser.Load()`

## Save
Persists property changes in the user instance

Syntax: `GAMUser.Save()`

## Delete
Deletes the current user instance

Syntax: `GAMUser.Delete()`

## Fail
Last operation status failure

Syntax: `<success> = GAMUser.Fail()`

Where:
- `<success>`: Last operation status failure

## Success
Last operation success status

Syntax: `<success> = GAMUser.Success()`

Where:
- `<success>`: Last operation status success

## GetErrors
Returns the errors from the last operation

Syntax: `<errors> = GAMUser.GetErrors()`

Where:
- `<errors>`: Collection of `GAMError`

## GetId
Returns current logged user GUID (static method)

Syntax: `<guid> = GAMUser.GetId()`

Where:
- `<guid>`: Current logged user GUID (`GAMGUID`)

## GetName
Returns current logged user nick/name (static method)

Syntax: `<name> = GAMUser.GetName()`

Where:
- `<name>`: Current logged user nick/name (`GAMUserIdentification`)

## GetExternalId
Returns current logged user external identifier (static method)

Syntax: `<external> = GAMUser.GetExternalId()`

Where:
- `<external>`: Current logged user external identifier

## GetLogin
Returns login string for user instance (`Namespace\AuthenticationType\UserName`)

Syntax: `<login> = GAMUser.GetLogin()`

Where:
- `<login>`: User login string (`GAMUserLogin`)

## SetMainRoleById
Sets main role by role Id

Syntax: `<success> = GAMUser.SetMainRoleById(<role>, <errors>)`

Where:
- `<role>`: Target role Id
- `<errors>`: Collection of `GAMError` output
- `<success>`: Main role assignment status success

## GetRoles
Returns effective role list for current user instance

Syntax: `<roles> = GAMUser.GetRoles(<errors>)`

Where:
- `<errors>`: Collection of `GAMError` output
- `<roles>`: Collection of `GAMUserRole`

## GetPermissions
Returns effective permission list for current user instance

Syntax: `<permissions> = GAMUser.GetPermissions(<errors>)`

Where:
- `<errors>`: Collection of `GAMError` output
- `<permissions>`: Collection of `GAMUserPermission`

## GetAttribute
Gets one user dynamic attribute

Syntax: `<attribute> = GAMUser.GetAttribute(<attribute-id>, <errors>)`

Where:
- `<attribute-id>`: User attribute identifier
- `<errors>`: Collection of `GAMError` output
- `<attribute>`: `GAMUserAttribute` resolved by `<attributekey>`

## SetAttribute
Adds or updates one user dynamic attribute

Syntax: `<success> = GAMUser.SetAttribute(<attribute>, <errors>)`

Where:
- `<attribute>`: Attribute payload (`GAMUserAttribute`)
- `<errors>`: Collection of `GAMError` output
- `<success>`: Attribute upsert status success

## DeleteAttribute
Deletes one user dynamic attribute

Syntax: `<success> = GAMUser.DeleteAttribute(<attribute>, <errors>)`

Where:
- `<attribute>`: Attribute payload (`GAMUserAttribute`)
- `<errors>`: Collection of `GAMError` output
- `<success>`: Attribute deletion status success

## GetMultiValuedAttribute
Gets one item value from a multivalued user attribute

Syntax: `<value> = GAMUser.GetMultiValuedAttribute(<attribute-id>, <multivalue-id>, <errors>)`

Where:
- `<attribute-id>`: Attribute identifier (`GAMPropertyId`)
- `<multivalue-id>`: Multivalue item identifier (`GAMPropertyId`)
- `<errors>`: Collection of `GAMError` output
- `<value>`: Multivalue item value (`GAMPropertyValue`)

## SetMultiValuedAttribute
Adds or updates one item value of a multivalued user attribute

Syntax: `<success> = GAMUser.SetMultiValuedAttribute(<attribute-id>, <multivalue-id>, <value>, <errors>)`

Where:
- `<attribute-id>`: Attribute identifier (`GAMPropertyId`)
- `<multivalue-id>`: Multivalue item identifier (`GAMPropertyId`)
- `<value>`: Attribute value (`GAMPropertyValue`)
- `<errors>`: Collection of `GAMError` output
- `<success>`: Multivalue item upsert status success

Notes:
- After `Save()` or successful update methods, execute `Commit`
- For `Save()`, `Delete()`, and `Load()`, evaluate status using `Success()`/`Fail()`

---

# EXAMPLE
Resolve current user, set main role, and maintain dynamic attribute `Department`
~~~
&CurrentUserGuid = GAMUser.GetId()

&User = new()
&User.GUID = &CurrentUserGuid
&User.Load()
If not &User.Success()
	For &Error in &User.GetErrors()
		msg(Format(!"%1 (GAM%2)", &Error.Message, &Error.Code))
	EndFor
	Return
EndIf

&IsRoleOK = &User.SetMainRoleById(&SalesManagerRoleId, &Errors)
If not &IsRoleOK
	Return
EndIf

&DepartmentAttribute = new()
&DepartmentAttribute.Id = !"Department"
&DepartmentAttribute.Value = !"Sales"
&IsAttributeOK = &User.SetAttribute(&DepartmentAttribute, &Errors)
If &IsAttributeOK
	Commit
EndIf
~~~
