---
name: module-gam-agent-service-header
description: Agent service header payload returned by GAM for service-to-service security
---

Defines the service header payload resolved by `GAM.GetAgentServiceHeader()`

Related:
- [module-gam.md](./module-gam.md)
- [module-gam-repository.md](./module-gam-repository.md)

---

# PROPERTIES

## Name
Header name to be sent in outbound calls

Syntax: `<name> = GAMAgentServiceHeader.Name`

## Value
Header value resolved for the authenticated context

Syntax: `<value> = GAMAgentServiceHeader.Value`

---

# CONSTRAINTS
- Header value depends on current security context
- Use only in trusted service-to-service calls

---

# EXAMPLE
Read service header from `GAM` and inject it in an outbound REST call
~~~
&AgentServiceHeader = GAM.GetAgentServiceHeader()
If &AgentServiceHeader.Name.IsEmpty() or &AgentServiceHeader.Value.IsEmpty()
	msg(!"Agent header unavailable")
	Return
EndIf

&HttpClient.AddHeader(&AgentServiceHeader.Name, &AgentServiceHeader.Value)
&HttpClient.Execute(!"GET", &TargetServiceUrl)
~~~
