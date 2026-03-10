---
name: module-gam-repository
description: GAMRepository external object for authentication, session, and repository queries
---

Defines authentication, permission checks, user queries, and session-log operations through `GAMRepository` object

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-error.md](./module-gam-error.md)
- [module-gam-session-log.md](./module-gam-session-log.md)
- [module-gam-user-role.md](./module-gam-user-role.md)
- [module-gam-user-permission.md](./module-gam-user-permission.md)

---

# PROPERTIES

## CacheTimeout
Cache duration in seconds for repository-level data

Syntax: `<timeout> = GAMRepository.CacheTimeout`

Where:
- `<timeout>`: Cache timeout in seconds

## UserSessionCacheTimeout
Cache duration in seconds for user session data

Syntax: `<timeout> = GAMRepository.UserSessionCacheTimeout`

Where:
- `<timeout>`: User session cache timeout in seconds

## GAMUnblockUserTimeout
Minutes to wait before automatic unblock after login retries

Syntax: `<minutes> = GAMRepository.GAMUnblockUserTimeout`

Where:
- `<minutes>`: Automatic unblock timeout in minutes

## EnableReusingActiveUserTokens
Allows reuse of active tokens for the same user context

Syntax: `<reuse-tokens> = GAMRepository.EnableReusingActiveUserTokens`

Where:
- `<reuse-tokens>`: Token reuse status

## ConnectionChallengeExpire
Challenge expiration timeout used in connection security handshake

Syntax: `<minutes> = GAMRepository.ConnectionChallengeExpire`

Where:
- `<minutes>`: Challenge expiration timeout in minutes

## EnableBiometrics
Enables biometric authentication support where configured

Syntax: `<enabled> = GAMRepository.EnableBiometrics`

Where:
- `<enabled>`: Biometrics availability status

---

# METHODS

## Login
Authenticates a user and opens a GAM session

Syntax: `<success> = GAMRepository.Login(<username>, <password>, <params>, <errors>)`

Where:
- `<username>`: User identifier (`GAMUserIdentificationType`)
- `<password>`: User password (`GAMDescriptionMedium`)
- `<params>`: Login options and authentication type selector (`GAMLoginAdditionalParameters`)
- `<errors>`: Output collection with login errors (`GAMError` collection)
- `<success>`: Login status success

Notes:
- For non-local authentication, set `<params>.AuthenticationTypeName`
- This syntax applies to web (`GAMRepository`); Smart Devices use `GeneXus.SD.Actions.Login` or `GeneXus.SD.Actions.LoginExternal`

## LoginGoogle
Starts login flow with Google identity provider

Syntax: `GAMRepository.LoginGoogle()`

## LoginTwitter
Starts login flow with Twitter identity provider

Syntax: `GAMRepository.LoginTwitter()`

## LoginGAMRemote
Authenticates against a remote GAM repository

Syntax: `GAMRepository.LoginGAMRemote()`

## CheckPermission
Checks if current session has the given permission

Syntax: `<authorized> = GAMRepository.CheckPermission(<permission>)`

Where:
- `<permission>`: Permission key/name to evaluate
- `<authorized>`: Permission grant success status

## GetUsersOrderBy
Gets users using filter and sort criteria

Syntax: `<users> = GAMRepository.GetUsersOrderBy(<filter>, <order>, <errors>)`

Where:
- `<filter>`: Filter object/criteria for user query
- `<order>`: Sort expression or order descriptor
- `<errors>`: Collection of `GAMError` output
- `<users>`: Collection of `GAMUser`

## GetApplicationByGUID
Gets one application by GUID

Syntax: `<application> = GAMRepository.GetApplicationByGUID(<app-guid>, <errors>)`

Where:
- `<app-guid>`: Target application GUID
- `<errors>`: Collection of `GAMError` output
- `<application>`: Application instance (`GAMApplication`)

## GetSessionLogs
Gets session logs by filter criteria

Syntax: `<logs> = GAMRepository.GetSessionLogs(<filter>, <errors>)`

Where:
- `<filter>`: Session filter (`GAMSessionLogFilter`)
- `<errors>`: Output collection (`GAMError` collection)
- `<logs>`: Collection of `GAMSessionLog`

## GetSessionLog
Gets a single session log by token or key filter

Syntax: `<logs> = GAMRepository.GetSessionLogs(<filter>, <errors>)`

Where:
- `<filter>`: Session filter (`GAMSessionLogFilter`)
- `<errors>`: Output collection (`GAMError` collection)
- `<logs>`: Collection with matching `GAMSessionLog`

## GetSessionLogsOrderBy
Gets session logs with filter and order

Syntax: `<logs> = GAMRepository.GetSessionLogsOrderBy(<filter>, <order>, <errors>)`

Where:
- `<filter>`: Session filter (`GAMSessionLogFilter`)
- `<order>`: Sort order (`GAMSessionLogListOrder`)
- `<errors>`: Output collection (`GAMError` collection)
- `<logs>`: Collection of `GAMSessionLog`

## GetSessionLogsCount
Returns total session logs for a filter

Syntax: `<count> = GAMRepository.GetSessionLogsCount(<filter>)`

Where:
- `<filter>`: Count filter (`GAMSessionLogsfilter`)
- `<count>`: Total number of session logs (`Numeric`)

## GetAliveSessionCount
Returns amount of active sessions

Syntax: `<count> = GAMRepository.GetAliveSessionCount(<errors>)`

Where:
- `<errors>`: Output collection (`GAMError` collection)
- `<count>`: Active session count (`Numeric`)

Notes:
- Requires GAM Manager Repository connection

## KillSession
Invalidates a session

Syntax: `<success> = GAMSessionLog.KillSession(<token>, <errors>)`

Where:
- `<token>`: Session identifier (`GAMtoken`)
- `<errors>`: Output collection (`GAMError` collection)
- `<success>`: Session invalidation status success

Notes:
- Session invalidation is published on `GAMSessionLog`

## UpdateExpiredSessionLog
Updates status of expired session logs

Syntax: `<success> = GAM.UpdateExpiredSessionLog(<filter>, <errors>)`

Where:
- `<filter>`: Cleanup filter (`GAMProcessSessionLogFilter`)
- `<errors>`: Output collection (`GAMError` collection)
- `<success>`: Expired log update status success

Notes:
- This method is published on [GAM](./module-gam.md)

## GetUserRoles
Returns effective roles for a user

Syntax: `<roles> = GAMRepository.GetUserRoles(<user-guid>, <errors>)`

Where:
- `<user-guid>`: Target user GUID
- `<errors>`: Output collection (`GAMError` collection)
- `<roles>`: Collection of `GAMUserRole`

## GetUserPermissions
Returns effective permissions for a user

Syntax: `<permissions> = GAMRepository.GetUserPermissions(<user-guid>, <errors>)`

Where:
- `<user-guid>`: Target user GUID
- `<errors>`: Output collection (`GAMError` collection)
- `<permissions>`: Collection of `GAMUserPermission`

## ClearCache
Clears repository cache

Syntax: `GAMRepository.ClearCache()`

---

# EXAMPLE
Login user `jdoe`, validate permission `Sales.Order.View`, and load users list
~~~
&LoginUserName = !"jdoe"
&LoginUserPassword = !"P@ssw0rd!"
&LoginAdditionalParameters.AuthenticationTypeName = !"local"
&LoginOK = GAMRepository.Login(&LoginUserName, &LoginUserPassword, &LoginAdditionalParameters, &Errors)
If NOT &LoginOK
	msg(!"Login failed")
	Return
EndIf

&HasPermission = GAMRepository.CheckPermission(!"Sales.Order.View")
If NOT &HasPermission
	msg(!"Access denied: Sales.Order.View")
	Return
EndIf

&Users = GAMRepository.GetUsersOrderBy(&UserFilter, !"Name", &Errors)
~~~
