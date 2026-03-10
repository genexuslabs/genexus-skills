---
name: module-gam-entity-property
description: Extensible GAM entity property descriptor for users, roles, and related security entities
---

Defines extensible property metadata used by GAM entities

Related:
- [module-gam-user.md](./module-gam-user.md)
- [module-gam-role.md](./module-gam-role.md)

---

# PROPERTIES

## Id
Entity property identifier

Syntax: `<id> = GAMEntityProperty.Id`

## Name
Entity property name

Syntax: `<name> = GAMEntityProperty.Name`

## Value
Entity property value

Syntax: `<value> = GAMEntityProperty.Value`

## IsMultiValued
Indicates whether the property supports multiple values

Syntax: `<multi-valued> = GAMEntityProperty.IsMultiValued`

---

# CONSTRAINTS
- Property identifiers must align with repository extensibility metadata
- Multi-valued properties require item-level read/write handling

---

# EXAMPLE
Update custom user property and persist user profile changes
~~~
&User = new()
&User.GUID = &UserGuid
&User.Load()

&CustomProperty = &User.GetAttribute(!"CostCenter", &Errors)
&CustomProperty.Value = &CostCenterCode
&IsAttributeOK = &User.SetAttribute(&CustomProperty, &Errors)
If &IsAttributeOK
	Commit
Else
	msg(!"Unable to update custom user property")
EndIf
~~~
