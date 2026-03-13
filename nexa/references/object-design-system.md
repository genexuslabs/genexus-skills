---
name: object-design-system
description: UI design system with styles, themes, and components
---

Defines design system for consistent UI styling across application

---

# DEFINITION
A `DesignSystem` object defines UI design system with styles, themes, and components

---

# SYNTAX
~~~
Tokens <name>[(<arguments>)]
{
	<tokens>
}
Styles <name>
{
	<styles>
}
Properties <name>
{
	<properties>
}
Documentation <name>
{
	<documentation>
}
~~~

Where:
- `<name>`: Object name (alphanumeric or `_`, must start with a letter)
- `<tokens>`: Object tokens (see [TOKENS](#tokens))
- `<styles>`: Object styles (see [STYLES](#styles))
- `<arguments>`: Optional token arguments; syntax `<arg>:[<default>]|<value-1>|<value-2>|…`
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-design-system.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

Note:
- Each `<name>` defines one DesignSystem object part; different names define multiple objects
- Both `<tokens>` and `<styles>` support `//` and `/* */` comments

---

# TOKENS
Defines reusable design variables (similar to CSS custom properties) grouped by category and optionally scoped by argument value

Definition syntax:
~~~
@<arg-name> = <arg-value>
{
	#<token-group>
	{
		<token-name>: <token-value>;
		… // other tokens
	}

	… // other argument-specific groups
}

… // other general groups
~~~

Reference syntax:
~~~
$<token-group>.<token-name>
~~~

Where:
- `<arg-name>`: Argument name declared in `Tokens <name>(…)`
- `<arg-value>`: One allowed argument value (or default value)
- `<token-group>`: Token category; any of:
	* `colors`: Colors for texts, backgrounds, and states
	* `spacing`: Margins, padding, and gaps for consistent layout
	* `fonts`: Font families used in typography
	* `fontSizes`: Text and element sizes
	* `borders`: Border width and style
	* `radius`: Corner rounding values
	* `shadows`: Shadow/elevation for depth
	* `times`: Durations for animations and transitions
	* `mediaQueries`: Responsive breakpoints
	* `zIndex`: Stacking order of elements
	* `opacity`: Transparency levels
- `<token-name>`: Token identifier (use kebab-case)
- `<token-value>`: Concrete value (color, size, family, duration, etc.)

Notes:
- Omit `@<arg-name> = <arg-value>` for global (always-on) tokens
- Declare default value using `[<default>]`; use it when no explicit argument value is provided
- Re-defining the same token in a conditional block overrides it only for that context

---

# STYLES
Defines style classes/selectors, font-face declarations, and inheritance/composition rules

Syntax:
~~~
@import <object-name>;
… // other includes

@font-face
{
	<prop-name>: <prop-value>;
	… // other font-face properties
};

… // other font-face blocks

#region <region-name>

	<style-name>
	{
		@include <class-name-1>[, <class-name-2>[, …]];
		<prop-name>: <prop-value>;
		… // other properties
	}

	… // other scoped selectors

#endregion

… // other regions or top-level selectors
~~~

Where:
- `<object-name>`: Existing `DesignSystem` object name to extend
- `<region-name>`: Optional logical grouping label for maintainability
- `<style-name>`: Style selector (prefer BEM naming for classes)
- `<class-name-i>`: Parent style names for composition
- `<prop-name>`/`<prop-value>`: Appearance properties and values

Notes:
- Token references use `$<token-group>.<token-name>` syntax
- All referenced objects must use fully-qualified name
- Use `gx-image(<image-object-name>)` for `Image` object references
- Use `gx-file(<file-object-name>)` for `File` object references to font files
- Map style classes from `Panel` object layout controls
- Set panel `Style` property to activate the target `DesignSystem` object
- Use `@font-face` with these properties:
	* Required: `src`, `font-family`
	* Optional: `font-weight`, `font-style`, `font-display`
- Web accepts full CSS selector/function capabilities; mobile has a restricted subset

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `designsystem`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Define tokens before style classes
- Keep include order deterministic; local classes override included classes

---

# CONVENTIONS
- Define visual direction before tokens: style, mood, and accessibility target
- Define styling contract in `DesignSystem` object; keep screen structure in `Panel` object
- Reference tokens from style classes; avoid hardcoded repeated values
- Define component variants and states: `Default`, `Hover`, `Active`, `Focused`, `Disabled`
- Define reusable semantic classes for panel controls
- Keep color tokens consistent across style groups
- Define typography tokens: family, size, weight
- Base component styles on shared tokens
- Define breakpoints for target form factors
- Define theme variants only when required
- Use generic style names in `DesignSystem` object
- Keep one spacing scale across all components (`4/8/12/16/24/32…`)
- Define consistent focus ring styles for keyboard and accessibility
- Use contrast-safe token pairs for text/background and action states
- Prefer semantic surfaces and elevation layers over ad-hoc container styles

---

# CONTRACT
A `DesignSystem` object must style semantic classes declared in [Panel](./object-panel.md) object

Recommended mandatory semantic classes:
- Page shell: `.page`, `.page-header`, `.page-content`, `.page-footer`
- Surfaces: `.surface`, `.surface-elevated`, `.surface-muted`
- Typography: `.text-title`, `.text-subtitle`, `.text-body`, `.text-caption`
- Actions: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-danger`
- Forms/feedback: `.field`, `.field-label`, `.field-help`, `.field-error`, `.state-loading`, `.state-empty`, `.state-error`, `.state-success`

Guidance:
- Map all semantic classes to shared tokens first, then add variant overrides
- Keep action buttons visually distinct by role, not by arbitrary color choices
- Reserve motion for meaningful transitions (state changes, panel entry, feedback)

---

# EXAMPLES

## Example 1
Simple Design System
~~~
Tokens MyDesignSystem(color-scheme:[light]|dark)
{
	#colors // applies globally
	{
		brand-primary: #1c6ef2;
		brand-primary-strong: #0d4fba;
		state-success: #0f8a5f;
		state-error: #c23030;
	}

	@color-scheme = light // applies only on light-mode
	{
		#colors
		{
			page-bg: #eef3f9;
			surface-1: #ffffff;
			surface-2: #f6f8fb;
			text-primary: #1b2430;
			text-secondary: #526173;
			border-default: #d9e1ea;
		}
	}

	@color-scheme = dark // applies only on dark-mode
	{
		#colors
		{
			page-bg: #10151d;
			surface-1: #16202c;
			surface-2: #1c2836;
			text-primary: #f4f7fb;
			text-secondary: #b8c3d3;
			border-default: #2b3c50;
		}
	}

	#spacing
	{
		xxs: 4px;
		xs: 8px;
		sm: 12px;
		md: 16px;
		lg: 24px;
		xl: 32px;
	}

	#fontSizes
	{
		title: 24px;
		subtitle: 18px;
		body: 14px;
		caption: 12px;
	}

	#radius
	{
		sm: 6px;
		md: 10px;
		lg: 16px;
	}

	#shadows
	{
		low: 0 2px 8px rgba(18, 32, 56, 0.08);
		medium: 0 8px 24px rgba(18, 32, 56, 0.14);
	}

	#times
	{
		fast: 120ms;
		normal: 220ms;
	}
}

Styles MyDesignSystem
{
	@import MyModule.MyBaseDesignSystem;

	@font-face
	{
		src: gx-file(MyModule.MyFontFile_ttf); // file object name in the Knowledge Base
		font-family: MyFont-Bold;
	}

	#region Buttons

		.btn-primary
		{
			font-family: MyFont-Bold;
			font-size: $fontSizes.body;
			text-color: #ffffff;
			background-color: $colors.brand-primary;
			border-color: $colors.brand-primary;
			border-width: 1px;
			border-radius: $radius.md;
			padding: $spacing.sm $spacing.lg;
			transition: 
				background-color $times.fast ease, 
				box-shadow $times.normal ease;
		}

		.btn-primary:hover
		{
			background-color: $colors.brand-primary-strong;
		}

		.btn-primary:focus-visible
		{
			box-shadow: 0 0 0 3px rgba(28, 110, 242, 0.32);
		}

		.btn-secondary
		{
			@include btn-primary;
			text-color: $colors.brand-primary;
			background-color: transparent;
			border-color: $colors.border-default;
		}

	#endregion

	#region LayoutAndTypography

		.page
		{
			background-color: $colors.page-bg;
			padding: $spacing.lg;
		}

		.surface
		{
			background-color: $colors.surface-1;
			border-color: $colors.border-default;
			border-width: 1px;
			border-radius: $radius.lg;
			box-shadow: $shadows.low;
			padding: $spacing.md;
		}

		.surface-muted
		{
			background-color: $colors.surface-2;
			border-radius: $radius.md;
			padding: $spacing.md;
		}

		.text-title
		{
			font-size: $fontSizes.title;
			text-color: $colors.text-primary;
		}

		.text-body
		{
			font-size: $fontSizes.body;
			text-color: $colors.text-secondary;
		}

	#endregion
}

Properties MyDesignSystem
{
	"Description" = "Design system defined for MyApplication"
}
~~~
