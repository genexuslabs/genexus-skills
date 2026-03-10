---
name: module-gam-security-policy
description: GAMSecurityPolicy external object for security policy lifecycle and settings
---

Defines session and password hardening parameters through `GAMSecurityPolicy` object

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-error.md](./module-gam-error.md)

---

# PROPERTIES

## AllowMultipleConcurrentWebSessions
Allows multiple simultaneous web sessions per user

Syntax: `<concurrency> = GAMSecurityPolicy.AllowMultipleConcurrentWebSessions`

Where:
- `<concurrency>`: Boolean policy value

## WebSessionTimeout
Web session timeout value

Syntax: `<webtimeout> = GAMSecurityPolicy.WebSessionTimeout`

Where:
- `<webtimeout>`: Web session timeout value

## OauthTokenExpire
OAuth token expiration value

Syntax: `<tokenexpiry> = GAMSecurityPolicy.OauthTokenExpire`

Where:
- `<tokenexpiry>`: OAuth token expiration value

## OauthTokenMaximumRenovations
Maximum OAuth token renewals

Syntax: `<renovationlimit> = GAMSecurityPolicy.OauthTokenMaximumRenovations`

Where:
- `<renovationlimit>`: Maximum token renewals

## MinimumTimeToChangePasswords
Minimum elapsed time between password changes

Syntax: `<changemin> = GAMSecurityPolicy.MinimumTimeToChangePasswords`

Where:
- `<changemin>`: Minimum time required before changing passwords again

## MaximumPasswordHistoryEntries
Maximum password history entries to prevent reuse

Syntax: `<historylimit> = GAMSecurityPolicy.MaximumPasswordHistoryEntries`

Where:
- `<historylimit>`: Number of stored password history entries

## MinimumNumericCharactersPassword
Required minimum numeric characters in password

Syntax: `<numericmin> = GAMSecurityPolicy.MinimumNumericCharactersPassword`

Where:
- `<numericmin>`: Minimum numeric characters required in password

## MinimumUpperCaseCharactersPassword
Required minimum uppercase characters in password

Syntax: `<uppermin> = GAMSecurityPolicy.MinimumUpperCaseCharactersPassword`

Where:
- `<uppermin>`: Minimum uppercase characters required in password

## MinimumSpecialCharactersPassword
Required minimum special characters in password

Syntax: `<specialmin> = GAMSecurityPolicy.MinimumSpecialCharactersPassword`

Where:
- `<specialmin>`: Minimum special characters required in password

---

# METHODS

## Load
Loads policy by key fields

Syntax: `GAMSecurityPolicy.Load()`

## Save
Persists policy changes

Syntax: `GAMSecurityPolicy.Save()`

## Delete
Deletes a custom policy (when allowed)

Syntax: `GAMSecurityPolicy.Delete()`

## Success
Returns True if last operation succeeded

Syntax: `<success> = GAMSecurityPolicy.Success()`

Where:
- `<success>`: Last operation success status

## Fail
Returns True if last operation failed

Syntax: `<failure> = GAMSecurityPolicy.Fail()`

Where:
- `<failure>`: Last operation status failure

---

# EXAMPLE
Harden `SalesPortal` security policy and persist changes
~~~
&SecurityPolicy.Load()
&SecurityPolicy.AllowMultipleConcurrentWebSessions = False
&SecurityPolicy.WebSessionTimeout = 30
&SecurityPolicy.MinimumNumericCharactersPassword = 2
&SecurityPolicy.MinimumUpperCaseCharactersPassword = 1
&SecurityPolicy.MinimumSpecialCharactersPassword = 1
&SecurityPolicy.Save()
&IsOK = &SecurityPolicy.Success()
~~~
