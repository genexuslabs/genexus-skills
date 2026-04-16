---
name: object-agent
description: AI-powered content generation and inference based on natural language prompts
---

Generates content or infers information using natural language instructions and context

---

# DEFINITION
An `Agent` object (or assistant) is capable of generating content or inferring information based on multiple inputs (features) and extra context

---

# SYNTAX
~~~
Agent <name>
{
	<prompt>

	#Rules
		<rules>
	#End

	#Variables
		<variables>
	#End

	#Properties
		<properties>
	#End

	#Documentation
		<documentation>
	#End
}
~~~

Where:
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<prompt>`: Natural language instructions for agent with:
	* Variable interpolation: `{{&<variable-name>}}`
	* Context placeholder: `$context` when `Context` rule defined
	* Document references: `{{Document:<document-name>}}`
	* File references: `{{File:<file-name>}}`
- `<rules>`: Business logic rules (parm, context, use)
- `<variables>`: Variable definitions with mandatory `DataType`
- `<properties>`: Optional object properties in TOML syntax
- `<documentation>`: Optional object documentation; check [common-markdown](./common-markdown.md)

---

# PROMPT TEXT
Simple tasks use short instruction:
`<action-verb> <task-description> using (<variables>|<context>), specifying <constraints>, optionally leveraging <tools> to produce <output>`

Complex tasks use structured sections:
- `ROLE`: Agent's role or perspective
- `TASK`: What agent must do with input
- `STEPS`: Ordered actions for multi-step tasks
- `GUIDE`: Limits, formats, guidelines to follow
- `OUTPUT`: Sample outputs illustrating expected result

---

# RULES
See [common-rules](./common-rules.md)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `agent`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Variable interpolation uses `{{&varname}}` syntax
- Context rule requires `$context` placeholder in text
- Use rule requires tool instructions in text
- Never use reserved keywords for Agent names

---

# EXAMPLES

## Example 1
Simple Agent
~~~
Agent AlternativeDescriptionAgent
{
	Create an alternative product description based on {{&ProductDescription}}, making it more attractive and persuasive for online shoppers

	#Rules
		parm(in: &ProductDescription, out: &AlternativeDescription);

	#End

	#Variables
		ProductDescription [ DataType = 'Attribute:ProductDescription' ]
		AlternativeDescription [ DataType = 'LongVarChar(1K)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
	#End
}
~~~

## Example 2
Agent with Context
~~~
Agent AnswerQuestionAgent
{
	TASK:
	Answer the user question {{&UserQuestion}} based on the information provided in $context

	GUIDE:
	Ensure the answer is clear, concise, and directly addresses the question
	If the context does not contain enough information, state that explicitly

	#Rules
		parm(in: &UserQuestion, out: &Answer);
		Context(GetCoursesDP());

	#End

	#Variables
		UserQuestion [ DataType = 'VarChar(256)' ]
		Answer [ DataType = 'LongVarChar(2K)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]
	#End
}
~~~

## Example 3
Agent with Tools
~~~
Agent TravelPlanAgent
{
	ROLE:
	You are a travel planning expert specializing in cultural and adventure experiences

	TASK:
	Create a personalized travel plan based on {{&UserQuestion}}
	Use "ExternalAgent:com.globant.geai.cultural_explorer" to discover cultural attractions
	Use "ExternalTool:com.globant.geai.travel_api_connector" to fetch real-time availability

	GUIDE:
	Ensure the user question specifies a destination; otherwise, request additional context to create a travel plan

	#Rules
		parm(in: &UserQuestion, out: &TravelPlan);
		Use(ExternalAgent:com.globant.geai.cultural_explorer, ExternalTool:com.globant.geai.travel_api_connector);

	#End

	#Variables
		UserQuestion [ DataType = 'VarChar(128)' ]
		TravelPlan [ DataType = 'LongVarChar(1K)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]

	#End
}
~~~

## Example 4
Agent with Document and File References
~~~
Agent AccountingReportAgent
{
	Follow the instructions given by:
	{{Document:AccountingPolicies}}

	Use relevant data from:
	{{File:MonthlyTransactions_csv}}

	#Rules
		parm(out: &AnalysisReport);

	#End

	#Variables
		AnalysisReport [ DataType = 'LongVarChar(2M)' ]
		Pgmname [ DataType = 'Character(128)' ]
		Pgmdesc [ DataType = 'Character(256)' ]

	#End
}
~~~
