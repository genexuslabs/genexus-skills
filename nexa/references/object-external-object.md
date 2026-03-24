---
name: object-external-object
description: External code binding reusable as any other GeneXus object
---

Defines a wrapper over external resources so they can be used as GeneXus objects

---

# DEFINITION
An `External Object` (or `EO`) exposes functionality implemented outside the Knowledge Base through a platform-mapped contract

Design model:
- `#GenericTypes`: Generic placeholders used by members and signatures
- `#ExternalProperties`: Read or write members mapped to external runtime properties
- `#ExternalMethods`: Operations mapped to external runtime methods
- `#ExternalEvents`: Notifications raised by external runtime components

---

# SYNTAX
~~~
ExternalObject <name>
{
	#GenericTypes
		<type-name-1>
		[
			<type-spec-1>
		]

		…
	#End

	#ExternalProperties
		<prop-name-1>
		[
			<prop-spec-1>
		]

		…
	#End

	#ExternalMethods
		<method-name-1>
		[
			<method-spec-1>
		]
		{
			Parameters
			{
				<method-parm-name-1>
				[
					<method-parm-spec-1>
				]

				…
			}
		}

		…
	#End

	#ExternalEvents
		<event-name-1>
		[
			<event-spec-1>
		]
		{
			Parameters
			{
				<event-parm-name-1>
				[
					<event-parm-spec-1>
				]

				…
			}
		}

		…
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
- `<type-name-i>`: Generic type name
- `<type-spec-i>`: Generic type properties; see [GENERIC TYPES](#generic-types)
- `<prop-name-i>`: External property name
- `<prop-spec-i>`: External property properties; see [EXTERNAL PROPERTIES](#external-properties)
- `<method-name-i>`: External method name
- `<method-spec-i>`: External method properties; see [EXTERNAL METHODS](#external-methods)
	* `<method-parm-name-j>`: Method parameter name
	* `<method-parm-spec-j>`: Method parameter properties
- `<event-name-k>`: External event name
- `<event-spec-k>`: External event properties; see [EXTERNAL EVENTS](#external-events)
	* `<event-parm-name-l>`: Event parameter name
	* `<event-parm-spec-l>`: Event parameter properties
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-external-object.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

---

# OBJECT PROPERTIES
Common object-level properties used in `#Properties` section:
- `Type`: External object implementation type; values:
	* `Native Object`
	* `Stored Procedure`
	* `WSDL`
	* `Java Session Bean`
- `Description`: External object short purpose description; not mandatory but recommended
- `Namespace`: Class namespace for external type resolution
- `.NET Framework External Name`: External class/type used by .NET Framework generator
- `.NET External Name`: External class/type used by modern .NET generator
- `.NET Framework Assembly Name`: Assembly name used by .NET Framework generator
- `.NET Assembly Name`: Assembly name used by modern .NET generator
- `.NET Framework Constructor Parameters`: Constructor constants list for .NET Framework
- `.NET Constructor Parameters`: Constructor constants list for modern .NET
- `.NET Package ID`: Unique package identifier for the external object
- `Java External Name`: External class/type used by Java generator
- `Java Constructor Parameters`: Constructor constants list for Java
- `External Package Name`: Java package used for external type resolution

---

# REGION PROPERTIES
Use these shared properties whenever a member requires explicit native mapping:
- `NetFrameworkExternalName`: .NET Framework external member name
- `NetFrameworkExternalType`: .NET Framework external member type
- `NetExternalName`: Modern .NET external member name
- `NetExternalType`: Modern .NET external member type
- `JavaExternalName`: Java external member name
- `JavaExternalType`: Java external member type

## GENERIC TYPES
Region properties:
- `Description`: Type description
- `PropertyName`: Semantic metadata name for the generic placeholder
- `ValidTypes`: Comma-separated list of valid GeneXus data types
- `AllowCollection`: Whether the type allows collection values (`True`, `False`)
- `DefaultType`: Default type used when no explicit specialization is provided

Notes:
- Generic placeholders are reusable across `#External*` regions
- Keep generic names stable because member signatures depend on them

## EXTERNAL PROPERTIES
Region properties:
- `PropertyType`: Access mode (`Read`, `Write`, `ReadWrite`)
- `Description`: Functional meaning of the property
- `Type`: GeneXus-facing type
- `IsStatic`: Indicates whether the property is static (`True`, `False`)
- `ControlType`: UI control type associated with the property when applicable
- `JavaExternalGetMethod`: Optional explicit Java getter name
- `JavaExternalSetMethod`: Optional explicit Java setter name
- Include shared properties when required

Notes:
- Use external properties for lightweight state access
- Use external methods for operations with side effects or validation logic

## EXTERNAL METHODS
Region properties:
- `Description`: Functional meaning of the method
- `Type`: Return type in GeneXus-facing signature
- `BasedOn`: Indicates if return type is based on another data type
- `XMLName`: XML identifier for the method
- `IsStatic`: Indicates whether the method is static (`True`, `False`)
- `ExternalMemberType`: Member binding mode (`Default`, `Static`, `Instance`)
- `JavaMethodThrowsExceptions`: Indicates whether Java method throws exception (`Yes`, `No`)
- Include shared properties when required

Parameter properties:
- `AccessType`: Direction (`In`, `Out`, `InOut`)
- `Description`: Parameter description
- `Type`: Parameter type in GeneXus-facing signature
- `ExternalType`: Generic external parameter type mapping
- Include shared properties when required

Data type resolution:
- Reuse [data type priority](./common-data.md#data-type-priority)

## EXTERNAL EVENTS
Region properties:
- `Description`: Functional meaning of the event
- `IsStatic`: Indicates whether the event is static (`True`, `False`)
- Include shared properties when required

Event parameter properties:
- `Description`: Event parameter description
- `Type`: Parameter type in GeneXus-facing signature
- `ExternalType`: Generic external parameter type mapping
- Include shared properties when required

Notes:
- For `Type = 'Native Object'`, set events as static
- Keep event names stable because consumer source binds by event name

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `externalobject`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Keep one clear mapping per member for each target platform
- Every parameter must define `AccessType` and `Type`
- Every event parameter should define `Type`
- Define `Type` in a method only when return value exists
- Keep signatures synchronized with external contracts to avoid runtime binding errors
- Keep EO spec names in `PascalCase` and mapping properties exactly as defined in syntax
- Avoid platform-specific assumptions in GeneXus-facing names

---

# EXAMPLES

## Example 1
Telemetry external object
~~~
ExternalObject DeviceTelemetryEO
{
	#ExternalProperties
		Enabled
		[
			PropertyType = 'ReadWrite',
			Description = 'Indicates whether telemetry tracking is enabled.',
			Type = 'Boolean',
			NetFrameworkExternalName = 'Enabled',
			NetFrameworkExternalType = 'bool',
			JavaExternalName = 'enabled',
			JavaExternalType = 'boolean',
			JavaExternalGetMethod = 'isEnabled',
			JavaExternalSetMethod = 'setEnabled'
		]

		LastMetric
		[
			PropertyType = 'Read',
			Description = 'Returns the last tracked metric.',
			Type = 'VarChar(200)',
			NetFrameworkExternalName = 'LastMetric',
			NetFrameworkExternalType = 'string',
			JavaExternalName = 'lastMetric',
			JavaExternalType = 'String',
			JavaExternalGetMethod = 'getLastMetric'
		]
	#End

	#ExternalMethods
		Track
		[
			Description = 'Tracks a telemetry metric.',
			NetFrameworkExternalName = 'Track',
			NetFrameworkExternalType = 'void',
			JavaExternalName = 'track',
			JavaExternalType = 'void'
		]
		{
			Parameters
			{
				MetricName
				[
					AccessType = 'In',
					Type = 'VarChar(80)'
				]

				Value
				[
					AccessType = 'In',
					Type = 'Numeric(10.2)'
				]
			}
		}

		GetLastMetric
		[
			Description = 'Gets the last tracked metric value.',
			Type = 'VarChar(200)',
			NetFrameworkExternalName = 'GetLastMetric',
			NetFrameworkExternalType = 'string',
			JavaExternalName = 'getLastMetric',
			JavaExternalType = 'String'
		]
	#End

	#ExternalEvents
		MetricTracked
		[
			Description = 'Raised when a metric is tracked.',
			NetFrameworkExternalName = 'MetricTracked',
			JavaExternalName = 'metricTracked'
		]
		{
			Parameters
			{
				MetricName
				[
					Type = 'VarChar(80)'
				]

				Value
				[
					Type = 'Numeric(10.2)'
				]
			}
		}
	#End

	#Properties
		Name = "DeviceTelemetryEO"
		Description = "Telemetry bridge for tracking and querying device metrics"
		".NET Framework External Name" = "TelemetryBridge"
		".NET External Name" = "TelemetryBridge"
		JavaExternalName = "TelemetryBridge"
		ExternalPackageName = "com.contoso.telemetry"
	#End
}
~~~

Associated with this C# implementation:
```csharp
using System;

namespace Contoso.Telemetry
{
	public static class TelemetryBridge
	{
		public static bool Enabled { get; set; } = true;
		public static string LastMetric { get; private set; } = string.Empty;

		public static event Action<string, decimal>? MetricTracked;

		public static void Track(string metricName, decimal value)
		{
			if (!Enabled) return;
			LastMetric = $"{metricName}:{value}";
			MetricTracked?.Invoke(metricName, value);
		}

		public static string GetLastMetric()
		{
			return LastMetric;
		}
	}
}
```

Associated with this Java implementation:
```java
package com.contoso.telemetry;

public final class TelemetryBridge {
	public interface MetricTrackedHandler {
		void metricTracked(String metricName, java.math.BigDecimal value);
	}

	private static boolean enabled = true;
	private static String lastMetric = "";
	private static MetricTrackedHandler metricTrackedHandler;

	private TelemetryBridge() {
	}

	public static boolean isEnabled() {
		return enabled;
	}

	public static void setEnabled(boolean value) {
		enabled = value;
	}

	public static String getLastMetric() {
		return lastMetric;
	}

	public static void metricTracked(MetricTrackedHandler handler) {
		metricTrackedHandler = handler;
	}

	public static void track(String metricName, java.math.BigDecimal value) {
		if (!enabled) return;
		lastMetric = metricName + ":" + value;
		if (metricTrackedHandler != null) {
			metricTrackedHandler.metricTracked(metricName, value);
		}
	}
}
```

## Example 2
Consuming EO in `Procedure` object
~~~
Procedure TelemetrySample
{
	DeviceTelemetryEO.Enabled = True
	DeviceTelemetryEO.Track(!"SyncElapsed", 125.40)
	&LastMetric = DeviceTelemetryEO.GetLastMetric()
	msg(&LastMetric, status) // prints "SyncElapsed:125.40"

	#Variables
		LastMetric [ DataType = 'VarChar(200)' ]
	#End
}
~~~
