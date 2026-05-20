---
name: object-business-process
description: BPMN workflow definition using Business Process Model and Notation 2.0 standard
---

Defines business process flows using BPMN 2.0 standard with tasks, gateways, events, and connectors

---

# DEFINITION
A `Business Process Diagram` object (or `BPD`) represents business process flow using BPMN 2.0 standard (Business Process Model Notation)

When creating system-interaction tasks, request definition of:
- Most suitable objects: Transaction, WebPanel, Procedure, Agent
- Required parameters with data types and accessors
- Fully qualified object names

---

# SYNTAX
~~~json
{
	"name": "<name>",
	"elements": [
		{
			"id": "<element-id>",
			"name": "<element-name>",
			"x": "<element-x>",
			"y": "<element-y>",
			"type": "<element-type>",
			"taskType": "<element-task-type>",
			"gatewayType": "<element-gateway-type>",
			"eventTrigger": "<element-event-trigger>",
			"connectorInfo": {
				"condition": {
					"conditionType": "<element-connector-condition-type>",
					"conditionRule": "<element-connector-condition-rule>",
					"text": "<element-connector-condition-text>"
				},
				"from": "<element-connector-from>",
				"to": "<element-connector-to>",
				"fromPort": "<element-connector-from-port>",
				"toPort": "<element-connector-to-port>",
				"points": [
					{
						"x": "<element-connector-point-x>",
						"y": "<element-connector-point-y>"
					}
				]
			},
			"intermediateEvents": [
				<element-intermediate-event>
			],
			"objects": [
				{
					"type": "<element-object-type>",
					"fullQualifiedName": "<element-object-name>",
					"relevantData": [
						{
							"accessor": "<element-object-relevant-accessor>",
							"parameter": {
								"name": "<element-object-relevant-param-name>",
								"type": "<element-object-relevant-param-type>",
								"length": <element-object-relevant-param-length>,
								"decimals": <element-object-relevant-param-decimals>,
								"signed": <element-object-relevant-param-signed>,
								"isCollection": <element-object-relevant-param-collection>
							},
							"value": "<element-object-relevant-value>"
						}
					]
				}
			]
		}
	]
}
~~~

Where:
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<element-id>`: Numeric element identifier
- `<element-name>`: Descriptive element name (not used for connectors)
- `<element-x>`, `<element-y>`: Coordinates of shape top-left corner (ignored for connectors)
- `<element-type>`: Element type values:
	* `StartEvent`: Entry point
	* `EndEvent`: Exit point
	* `Task`: Unit of work (user, script, agent)
	* `Gateway`: Conditional flow control
	* `Connector`: Flow between elements
	* `IntermediateEvent`: Mid-flow trigger
- `<element-task-type>`: Task type (if type is `Task`):
	* `None` (default): Automatic task
	* `User`: Executed by person
	* `Script`: Executed by batch process
	* `Agent`: Executed by AI Agent
	* `Conversational`: AI Agent in chat interaction
- `<element-gateway-type>`: Gateway type (if type is `Gateway`):
	* `Exclusive` (default): One path only
	* `Inclusive`: One or more paths
	* `Parallel`: All paths executed
	* `Event`: Triggered by events
- `<element-event-trigger>`: Trigger type (if type is `IntermediateEvent`):
	* `None` (default)
	* `Timer`: Time delay
	* `Cancel`: Sub-process canceled
	* `Message`: Send/receive message
	* `Error`: Exception occurrence
	* `Signal`: Broadcast/catch signal
	* `Compensate`: Compensation for previous activity
	* `Conditional`: Condition evaluates true
	* `Link`: Virtual connector across process
- `<element-connector-condition-type>`: Condition type:
	* `Rule`: Based on rule
	* `Default` (default): Fallback path
- `<element-connector-condition-rule>`: Rule name (if type is `Rule`)
- `<element-connector-condition-text>`: Condition description
- `<element-connector-from>`, `<element-connector-to>`: Source and target element identifiers
- `<element-connector-from-port>`, `<element-connector-to-port>`: Port values: `top`, `bottom` (default), `left`, `right`
- `<element-connector-point-x>`, `<element-connector-point-y>`: Connector line point coordinates (for non-straight lines)
- `<element-intermediate-event>`: Intermediate event (same structure as elements)
- `<element-object-type>`: Object type by task type:
	* `User`: WebPanel, SDPanel, Transaction
	* `Script`: Procedure
	* `Agent`: Agent
- `<element-object-name>` Fully qualified object name using dot notation; e.g. `Root Module.BL.GetAmount`, `Root Module.UI.ViewInvoice`
- `<element-object-relevant-accessor>`: Data direction:
	* `in`: Input, read-only
	* `out`: Output, write-only
	* `inout` (default): Passed by reference
- `<element-object-relevant-param-name>`: Parameter name as defined in object
- `<element-object-relevant-param-type>`: Parameter type (UPPER CASE): `CHARACTER`, `NUMERIC`, `DATE`, `BOOLEAN`
- `<element-object-relevant-param-length>`: Length places (CHARACTER or NUMERIC)
- `<element-object-relevant-param-decimals>`: Decimal places (NUMERIC only)
- `<element-object-relevant-param-signed>`: Signed flag (NUMERIC only): `true` or `false`
- `<element-object-relevant-param-collection>`: Collection flag: `true` or `false`
- `<element-object-relevant-value>`: Parameter value: constant, enum domain reference, variable, or transaction attribute

---

# BPMN MODELING GUIDELINES

## Objects in Tasks
Tasks reference objects (WebPanels, Procedures, Transactions, Agents)

Relevant data must include:
- Accessor: `in`, `out`, `inout`
- Parameter name
- Compatible type (UPPER CASE)
- Value without ampersand

Notes:
- Required parameters in objects are defined in `Parm` rule
- Relevant data must be reused across tasks

Examples:
~~~
Task with WebPanel: parm(out: &Article)
Relevant data: name "Article", accessor "out"

Task with Procedure: parm(in: &UserId, out: &UserDetails)
Relevant data: "UserId" (in), "UserDetails" (out)

Task with Transaction: parm(inout: &Order)
Relevant data: "Order" (inout)

Task chain: "Write Article" (out: Article) → "Review Article" (in: Article)
~~~

## Element Distribution
Element coordinates `<x,y>` represent top-left corner

Element sizes:
- `StartEvent`: 36x36
- `EndEvent`: 36x36
- `Gateway`: 40x40
- `Task`: 187x67
- `IntermediateEvent`: 36x36

Space elements to avoid overlaps

## Connector Rules
Port cannot be reused as both from and to simultaneously

Example port coordinates for element at `<50,50>` with size `<200,80>`:
- `top`: `<150,50>`
- `bottom`: `<150,130>`
- `left`: `<50,90>`
- `right`: `<250,90>`

### Path Routing Priorities
1. Straight line: direct path, no points (when no intersections)
2. L-shaped: one bend, one intermediate point
3. U-shaped: two bends, two intermediate points

Avoid more than two bends

### Points Attribute
Used only when connector is not straight

First point matches `fromPort`, last point matches `toPort`

Example for source `<100,100>` size `80x50`, target `<200,200>` size `80x50`:
Points: `<180,125>`, `<240,125>`, `<240,200>`

### Gateways and Connector Placement
Multiple connectors from gateway use same `fromPort`, separated visually with points attribute; multiple incoming connectors can use same `toPort`

Avoid reusing `toPort` as `fromPort` in another connector

## Conditionals in Connectors

### Rule-type Conditions
Use `'conditionType': 'Rule'` with `'conditionRule'` set

Syntax: `<prefix><name> <operator> <value>`

Ampersand prefix for relevant data, no prefix for transaction attributes

Grouping: `( )`
Operators: `=`, `>`, `<`, `>=`, `<=`, `!=`
Logical: `AND`, `OR`, `NOT`

Examples:
~~~
&Status = 'Approved'
(&Total > 1000) AND (&IsVIP = true)
NOT (&InStock = false)
((&Total > 500) AND (&Region = 'North')) OR (&IsPreferred = true)
Reservation.ReservationId = 1234
~~~

### Type Compatibility
NUMERIC: numbers without quotes
~~~
&OrderTotal > 1000
~~~

CHARACTER: quoted strings
~~~
&Status = 'Open'
&Status = "Open"
~~~

BOOLEAN: true or false (case-insensitive)
~~~
&IsVIP = true
&IsVIP = TRUE
~~~

### Default Conditionals
Use `'conditionType': 'Default'` for fallback paths

Gateways should have at least two outgoing connectors, one may be default

### Text in Conditionals

Use `text` attribute for documentation only

Examples:
~~~
If the request is urgent
If the customer is VIP
~~~

---

# OUTPUT
Use [global-output](./global-output.md)

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Entry in JSON can be omitted when value is default
- `<element-object-relevant-param-type>` must be UPPER CASE
- `<element-object-relevant-param-name>` and `<element-object-relevant-accessor>` must not have ampersand
- Only create/update `BusinessProcessDiagram` objects unless other object types explicitly requested
- Check target module exists before creating object
- Verify all referenced objects exist (WebPanel, Procedure, Agent, Transaction)
- Ensure solution is complete, correct, consistent
- Updates modify only requested items

---

# EXAMPLES

## Example 1
Process: Approve Leave Request
- The process starts when an employee submits a leave request
- The request is reviewed by a manager
- If the manager approves, the HR department is notified to process the leave
- If the manager rejects, the employee is notified of the rejection
- The process ends after either notification

Preexisting objects:
- WebPanel: `LeaveRequestForm(out: &LeaveRequest)`
- Agent: `EvaluateLeaveRequest(in: &LeaveRequest, out: &ApprovalStatus)`
- WebPanel: `NotifyEmployee(in: &ApprovalStatus)`

~~~json
{
	"name": "ApproveLeaveRequestProcess",
	"elements": [
		{ "id": "1", "type": "StartEvent", "name": "Start", "x": 100, "y": 100 },
		{ "id": "2", "type": "Task", "name": "Submit Leave Request", "x": 100, "y": 250, "taskType": "User", "objects": [
			{ "type": "WebPanel", "fullQualifiedName": "LeaveRequestForm", "relevantData": [
				{ "accessor": "out", "parameter": { "name": "LeaveRequest", "type": "CHARACTER" }, "value": "LeaveRequest" }
			]}
		]},
		{ "id": "3", "type": "Task", "name": "Evaluate Leave Request", "x": 100, "y": 400, "taskType": "Agent", "objects": [
			{ "type": "Agent", "fullQualifiedName": "EvaluateLeaveRequest", "relevantData": [
				{ "accessor": "in", "parameter": { "name": "LeaveRequest", "type": "CHARACTER" }, "value": "LeaveRequest" },
				{ "accessor": "out", "parameter": { "name": "ApprovalStatus", "type": "CHARACTER" }, "value": "ApprovalStatus" }
			]}
		]},
		{ "id": "4", "type": "Gateway", "name": "Approved?", "x": 100, "y": 550, "gatewayType": "Exclusive" },
		{ "id": "5", "type": "Task", "name": "Notify Employee", "x": -100, "y": 550, "taskType": "Script", "objects": [
				{ "type": "Procedure", "fullQualifiedName": "NotifyEmployee", "relevantData": [
				{ "accessor": "in", "parameter": { "name": "ApprovalStatus", "type": "CHARACTER" }, "value": "ApprovalStatus" }
			]}
		]},
		{ "id": "6", "type": "EndEvent", "name": "End", "x": 300, "y": 700 },
		{ "id": "7", "type": "EndEvent", "name": "End", "x": -100, "y": 700 },
		{ "type": "Connector", "connectorInfo": { "from": "1", "to": "2", "fromPort": "bottom", "toPort": "top" } },
		{ "type": "Connector", "connectorInfo": { "from": "2", "to": "3", "fromPort": "bottom", "toPort": "top" } },
		{ "type": "Connector", "connectorInfo": { "from": "3", "to": "4", "fromPort": "bottom", "toPort": "top" } },
		{ "type": "Connector", "connectorInfo": { "from": "4", "to": "6", "fromPort": "right", "toPort": "top",
			"condition": { "conditionType": "Rule", "conditionRule": "&ApprovalStatus = 'Approved'", "text": "If approved" },
			"points": [ { "x": 120, "y": 570 }, { "x": 300, "y": 570 }, { "x": 300, "y": 682 } ] }
		},
		{ "type": "Connector", "connectorInfo": { "from": "4", "to": "5", "fromPort": "left", "toPort": "right",
			"condition": { "conditionType": "Default", "text": "If rejected" },
			"points": [ { "x": 80, "y": 570 }, { "x": -100, "y": 570 } ] }
		},
		{ "type": "Connector", "connectorInfo": { "from": "5", "to": "7", "fromPort": "bottom", "toPort": "top" } }
	]
}
~~~
