---
name: module-gam-authentication-token
description: Token payload used by GAM session and OAuth-based authorization flows
---

Defines authentication token information used in secured API calls

Related:
- [module-gam-session.md](./module-gam-session.md)
- [module-gam-repository.md](./module-gam-repository.md)

---

# PROPERTIES

## AccessToken
Access token value for API authorization

Syntax: `<token> = GAMAuthenticationToken.AccessToken`

## Expiration
Token expiration date-time

Syntax: `<expiration> = GAMAuthenticationToken.Expiration`

## TokenType
Token type used by authorization header

Syntax: `<token-type> = GAMAuthenticationToken.TokenType`

---

# CONSTRAINTS
- Respect expiration before invoking protected services
- Propagate token securely in transport headers

---

# EXAMPLE
Validate token expiration before invoking an external protected API
~~~
If &AuthenticationToken.Expiration <= Now()
	msg(!"Authentication token expired")
	Return
EndIf

&AuthorizationHeader = format(!"%1 %2", &AuthenticationToken.TokenType, &AuthenticationToken.AccessToken)
&HttpClient.AddHeader(!"Authorization", &AuthorizationHeader)
&HttpClient.Execute(!"GET", &ProtectedApiUrl)
~~~
