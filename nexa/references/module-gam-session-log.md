---
name: module-gam-session-log
description: GAMSessionLog external object for audit and runtime session tracking
---

Defines session audit and lifecycle data through `GAMSessionLog` object

Related:
- [module-gam-repository.md](./module-gam-repository.md)
- [module-gam-session.md](./module-gam-session.md)
- [module-gam-error.md](./module-gam-error.md)

---

# PROPERTIES

## Token
Session token identifier

Syntax: `<token> = GAMSessionLog.Token`

## User
User associated to the session log

Syntax: `<user> = GAMSessionLog.User`

## LoginDate
Session login date-time

Syntax: `<login-date> = GAMSessionLog.LoginDate`

## LogoutDate
Session logout date-time

Syntax: `<logout-date> = GAMSessionLog.LogoutDate`

## IsAlive
Indicates if session is active

Syntax: `<alive> = GAMSessionLog.IsAlive`

## LoginRetries
Number of failed login attempts for the session

Syntax: `<retries> = GAMSessionLog.LoginRetries`

## LoginRetryCount
Configured login retry threshold for lock policies

Syntax: `<retry-limit> = GAMSessionLog.LoginRetryCount`

## FullLog
Indicates whether extended session audit is enabled

Syntax: `<full-log> = GAMSessionLog.FullLog`

---

# METHODS

## KillSession
Invalidates one active session by token

Syntax: `<success> = GAMSessionLog.KillSession(<token>, <errors>)`

Where:
- `<token>`: Session token identifier
- `<errors>`: Collection of `GAMError` output
- `<success>`: Session invalidation status success

---

# CONSTRAINTS
- Session log retrieval is performed through `GAMRepository` methods
- `KillSession` requires permissions to manage repository sessions
- `FullLog` impacts audit verbosity and storage volume

---

# EXAMPLE
Review active sessions for an account and close one compromised token
~~~
&SessionLogs = GAMRepository.GetSessionLogsOrderBy(&SessionLogFilter, GAMSessionLogListOrder.Date_Desc, &Errors)
For &SessionLog in &SessionLogs
	If &SessionLog.User.Name = &TargetUserName and &SessionLog.IsAlive
		&StatusText = format(!"Active session token: %1", &SessionLog.Token)
		msg(&StatusText)
	EndIf
EndFor

&IsKilled = GAMSessionLog.KillSession(&CompromisedToken, &Errors)
If not &IsKilled
	msg(!"Unable to close compromised session")
EndIf
~~~
