---
name: module-gam-connection-info
description: Connection descriptor returned by GAM.GetConnections for repository selection
---

Defines repository connection metadata through `GAMConnectionInfo`

Related:
- [module-gam.md](./module-gam.md)

---

# PROPERTIES

## Name
Repository connection name used by `GAM.SetConnection()`

Syntax: `<name> = GAMConnectionInfo.Name`

## RepositoryName
Repository identifier for the connection

Syntax: `<repository> = GAMConnectionInfo.RepositoryName`

## UserName
Connection user name

Syntax: `<user> = GAMConnectionInfo.UserName`

---

# CONSTRAINTS
- Use `Name` as input for `GAM.SetConnection()`
- Evaluate all available connections in multi-repository deployments

---

# EXAMPLE
Select repository connection by tenant code before user login
~~~
&ConnectionInfos = GAM.GetConnections()
For &ConnectionInfo in &ConnectionInfos
	If &ConnectionInfo.Name = &TenantCode
		&IsConnectionOK = GAM.SetConnection(&ConnectionInfo.Name, &Errors)
		Exit
	EndIf
EndFor

If not &IsConnectionOK
	msg(!"Repository connection not found for tenant")
EndIf
~~~
