---
name: common-agent-invocation
description: Invocation patterns for Agent objects using Call and Chat
---

Defines canonical invocation patterns for `Agent` object execution from procedural or event code

---

# CALL MODE
Synchronous request-response invocation

Syntax:
~~~
&Result = <agent-name>.Call([<arg-1>, …, <arg-N, ]<chat-history>, <call-result>)
~~~

Short syntax (equivalent, preferred when clear):
~~~
&Result = <agent-name>([<arg-1>, …, <arg-N>, ]<chat-history>, <call-result>)
~~~

Where:
- `<agent-name>`: Existing `Agent` object
- `<arg-i>`: Arguments aligned with agent `Parm` rule
- `<chat-history>`: Variable based on `ChatMessage, GeneXus.ArtificialIntelligence` collection
- `<call-result>`: Variable based on `CallResult, GeneXus.Common`
- `&Result`: Variable mapped to the `out:` parameter of the agent signature

---

# CHAT MODE
Conversational invocation with context history

Syntax:
~~~
&ChatResult = <agent-name>.Chat([<arg-1>, …, <arg-N>, ]<chat-history>, <call-result>)
~~~

Where:
- `&ChatResult`: Variable based on `ChatResult, GeneXus.ArtificialIntelligence`
- `<chat-history>`: Variable based on `ChatMessage, GeneXus.ArtificialIntelligence` collection
- `<call-result>`: Variable based on `CallResult, GeneXus.Common`

---

# ERROR HANDLING
- Prefer providing `&CallResult` and validate operation status before continuing
- On failure, iterate `GetMessages()` for diagnostics and stop current flow

Example:
~~~
&Answer = MyAgent.Call(&Question, &ChatMessage, &CallResult)
If &CallResult.Fail()
	For &Message in &CallResult.GetMessages()
		msg(Format(!"%2 (%1): %3", &Message.Id, &Message.Type, &Message.Description), status)
	EndFor
	Return
EndIf
~~~

---

# CONSTRAINTS
- Invocation arguments must match `Parm` signature order and direction
- Use positional arguments only
- Use `Chat` mode only when conversational history is required
