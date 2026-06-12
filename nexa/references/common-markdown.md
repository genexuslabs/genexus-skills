---
name: common-markdown
description: Markdown syntax specification for GeneXus Documentation parts in objects
---

Standard Markdown rules with GeneXus-specific extensions for object references and code highlighting

---

# STANDARD MARKDOWN
All standard Markdown features are supported following conventional Markdown syntax rules

---

# OBJECT REFERENCES
Link other objects in the Knowledge Base using GeneXus-specific syntax

Syntax:
~~~
[[<object-type>.<object-name>|<custom-name>]]
~~~

Where:
- `<object-type>`: Object type (e.g. `Document`, `Transaction`, `Procedure`, or any other GeneXus object type)
- `<object-name>`: Object name that must be previously defined in the Knowledge Base
- `<custom-name>`: Optional custom name for the link; if omitted, also exclude the pipe character (`|`)

Examples:
~~~markdown
[[Transaction.Customer]]
[[Procedure.CalculateTotal|total calculation]]
[[Document.UserGuide|guide]]
~~~

---

# CODE BLOCKS
Code blocks with syntax highlighting for GeneXus objects

Syntax:
~~~
```<object-type>
<code-block>
```
~~~

Where:
- `<object-type>`: Object type for syntax highlighting; values: `procedure`, `dso`
- `<code-block>`: Code block example to be highlighted using the GeneXus syntax rules

Examples:
~~~
```genexus.procedure
For Each Customer
	Where CustomerId = &CustomerId
	&CustomerName = CustomerName
EndFor
```
~~~

---

# CONSTRAINTS
- Object names must be previously defined in the Knowledge Base
- Custom name in object references is optional; exclude pipe character (`|`) if omitted
- Custom code block object types are limited to `procedure` and `dso` (for DesignSystem)
- Standard Markdown rules apply for all other formatting, including code blocks