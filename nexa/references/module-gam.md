---
name: module-gam-core
description: Core GAM external object for repository connection context
---

Defines repository connection context management for auth through `GAM` object

Related:
- [module-gam-repository.md](./module-gam-repository.md)
- [module-gam-session.md](./module-gam-session.md)
- [module-gam-connection-info.md](./module-gam-connection-info.md)
- [module-gam-agent-service-header.md](./module-gam-agent-service-header.md)
- [module-gam-session-log.md](./module-gam-session-log.md)

---

# METHODS

## SetConnection
Sets the active GAM repository connection

Syntax: `<success> = GAM.SetConnection(<name>, <errors>)`

Where:
- `<name>`: GAM Repository Connection name
- `<errors>`: Collection of `GAMError`
- `<success>`: Connection status status

## GetConnections
Returns all available GAM repository connections

Syntax: `<connections> = GAM.GetConnections()`

Where:
- `<connections>`: Collection of `GAMConnectionInfo` SDT

## GetAgentServiceHeader
Returns header information for secured service-to-service calls

Syntax: `<header> = GAM.GetAgentServiceHeader()`

Where:
- `<header>`: Header payload (`GAMAgentServiceHeader`)

## UpdateExpiredSessionLog
Updates session logs according to expiration rules

Syntax: `<success> = GAM.UpdateExpiredSessionLog(<filter>, <errors>)`

Where:
- `<filter>`: Session cleanup filter (`GAMProcessSessionLogFilter`)
- `<errors>`: Collection of `GAMError`
- `<success>`: Expired log update status success

---

# CONNECTION FILE
A single key in `connection.gam` maps to GAM repository connection metadata

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<Connection>
  <key>2a5bddef-4057-4025-a34c-68f10913fa00</key>
</Connection>
~~~

Each row in `SysConnectionConfig` represents one repository connection entry:
- `SysConnCfgKey`: GUID matching the key in `connection.gam`
- `SysConnCfgRep`: repository name
- `SysConnCfgName`: connection name, value passed to `SetConnection`
- `SysConnCfgUser`: connection username
- `SysConnCfgPwd`: connection password (encrypted)
- `SysConnCfgJson`: remaining connection properties in JSON format

In multi-tenant scenarios:
- A single key can resolve multiple available repository connections
- Execute `GAM.GetConnections()` and `GAM.SetConnection()` before calling other GAM objects

## Environment variable
Set `GX_GAMConnectionKey` to the connection key value as an alternative to the file

Runtime resolution order:
1. Cache
2. `GX_GAMConnectionKey` environment variable
3. `connection.gam` file

---

# EXAMPLE
Resolve tenant connection and activate it before calling other GAM objects
~~~
&ConnectionInfos = GAM.GetConnections()
For &ConnectionInfo in &ConnectionInfos
	If &ConnectionInfo.Name = &CompanyId
		&IsConnectionOK = GAM.SetConnection(&ConnectionInfo.Name, &Errors)
		Exit
	EndIf
EndFor
~~~

---

# CONSTRAINTS
- Only for `GAM` methods
- Call `SetConnection` when the environment requires selecting a repository connection
- Process `GAMError` collection after calls that output `<errors>`
- In multi-tenant scenarios, omitting `SetConnection` when the connection set has more than one entry causes runtime error
- Prefer `GX_GAMConnectionKey` over `connection.gam` in containerized deployments
