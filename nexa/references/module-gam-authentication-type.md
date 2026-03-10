---
name: module-gam-authentication-type
description: Authentication type metadata used by GAM login and external identity flows
---

Defines authentication type settings applied to GAM login flows

Related:
- [module-gam-repository.md](./module-gam-repository.md)
- [module-gam-user.md](./module-gam-user.md)

---

# PROPERTIES

## Name
Authentication type name used in login parameters

Syntax: `<name> = GAMAuthenticationType.Name`

## Description
Human-readable authentication type description

Syntax: `<description> = GAMAuthenticationType.Description`

## IsExternal
Indicates if provider is external to local GAM repository credentials

Syntax: `<external> = GAMAuthenticationType.IsExternal`

---

# CONSTRAINTS
- Set `AuthenticationTypeName` in login parameters when using external providers
- Authentication type resolution must match repository configuration

---

# EXAMPLE
Set authentication type dynamically before repository login
~~~
&LoginAdditionalParameters = new()
&LoginAdditionalParameters.AuthenticationTypeName = &SelectedAuthenticationType.Name

&IsLoginOK = GAMRepository.Login(&UserName, &UserPassword, &LoginAdditionalParameters, &Errors)
If not &IsLoginOK
	msg(!"Authentication failed for selected provider")
EndIf
~~~
