---
name: object-panel
description: Screen definition for Android, Apple, Angular, or Web environments
---

Defines user interface screens for multiple platforms with layout, events, and data binding

---

# DEFINITION
A `Panel` object defines a screen for Android, Apple, Angular, or Web environments

Types: `Panel` (or `SDPanel`), `WebPanel`, `MasterPanel`, `MasterPage`, `WebComponent`, `Stencil`

---

# SYNTAX
~~~
<type> <name>
{
	#Events
		<events>
	#End

	#Rules
		<rules>
	#End

	#Conditions
		<conditions>
	#End

	#Variables
		<variables>
	#End

	#Layout
		<layout>
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
- `<type>`: Object type: `SDPanel` (default), `WebPanel`, `WebComponent`, `MasterPage`, `MasterPanel`, `Stencil`
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<events>`: Event handlers triggered by user actions
- `<rules>`: Business rules (parm, etc.)
- `<conditions>`: Boolean filters (comparisons, operators, functions, formulas); multiple lines imply `AND`
- `<variables>`: Variable definitions with `DataType`
- `<layout>`: GXML layout definition (XML-based) for structure and control composition
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-panel.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))


---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value:
- For `Panel` object → `panel`
- For `WebPanel` object → `webpanel`
- For `Stencil` object → `stencil`
- For `WebComponent` object → `webcomponent`
- For `MasterPanel` object → `masterpanel`
- For `MasterPage` object → `masterpage`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Include [common-standard-variables](./common-standard-variables.md) according to panel context
- Place code only inside `Panel` object sections
- Allow only `#Layout`, `#Variables`, `#Properties`, `#Documentation` in `Stencil` object
- Events use qualifiers when needed: `[WEB]`, `[WIN]`, `[TEXT]`

---

# CONVENTIONS
- Define screen purpose, primary actions, and navigation path before `#Layout`
- Define UI states per screen: `Default`, `Loading`, `Empty`, `Error`, `Success`
- Define interaction trigger and feedback for each actionable control
- Define responsive adaptations for mobile, tablet, and desktop
- Define layout structure in `Panel` object; define visual styling in `DesignSystem` object
- Reference only pre-defined style classes from `DesignSystem` object
- Set `Style` property to target `DesignSystem` object when style contract applies
- Use semantic class names in layout; avoid visual names
- Build clear visual hierarchy in layout: `header`, `content`, `aside` (optional), `footer`
- Keep progressive disclosure: show primary action first, defer secondary actions
- Model perceived performance in layout: reserve space for skeleton/loading placeholders
- Define accessibility in controls: readable labels, descriptive button captions, keyboard-safe interactions

---

# CONTRACT
A `Panel` object must expose semantic hooks styled by a [DesignSystem](./object-design-system.md) object

Recommended semantic contract in `Panel` classes:
- Page: `page`, `page-header`, `page-content`, `page-footer`
- Surfaces: `surface`, `surface-elevated`, `surface-muted`
- Typography: `text-title`, `text-subtitle`, `text-body`, `text-caption`
- Actions: `btn-primary`, `btn-secondary`, `btn-readonly`, `btn-danger`
- Controls: `field`, `field-label`, `field-help`, `field-error`
- Feedback: `state-loading`, `state-empty`, `state-error`, `state-success`

Checklist:
- [ ] Keep one dominant CTA per section and group related controls in one surface
- [ ] Keep density consistent and distribute content responsively across mobile/tablet/desktop
- [ ] Reserve optional desktop areas instead of overloading a single column
- [ ] Avoid hardcoded colors or spacing; rely on `DesignSystem` classes and tokens
- [ ] Prefer `smart`, use `table` for legacy, and `canvas` for absolute/overlap only
- [ ] Define each child  in `canvas` with `width`, `height`, and one axis anchor
- [ ] Avoid mixing `canvas` heavy positioning with `smart` flow in one section
- [ ] Reserve `Refresh` event for recalculation/filtering
- [ ] Reserve `Load`/`Grid.Load` event for row-by-row population
- [ ] Bind every action requires with explicit event that shows user feedback after execution
- [ ] Verify `Style` property references the correct `DesignSystem` object and all classes exist
- [ ] Reuse repeated screens through `Stencil` with `controlNameForStencil` mappings
- [ ] Define `source` property for static images, and `attribute` property for bound data
- [ ] Validate all layout units only use `px`, `dip`, or `%`

---

# PATTERNS
Use these structure patterns to get modern and scalable screens:

Pattern `Hero + Action + Content`:
- Top row: contextual title and supporting copy
- Mid row: primary action block with strongest visual priority
- Bottom rows: data/content cards or grid lists

Pattern `Form + Live Feedback`:
- Left/main: grouped fields and helper text
- Right/bottom: preview, summary, or validation feedback
- Include dedicated rows/cells for `field-error` and `state-success`

Pattern `List + Detail` (responsive):
- Desktop: two-column split (list/details)
- Mobile: stacked flow with sticky key actions in footer row

Pattern `Bottom Navigation + Top Context`:
- Bottom area: persistent primary navigation (3-5 destinations)
- Top area: contextual title and screen-level actions
- Keep destination state stable when switching tabs

Pattern `List + Filters + Refresh`:
- Top area: quick filters and search entry
- Main area: scrollable results list with progressive loading
- Mobile-first refresh behavior: pull-to-refresh and explicit retry on failures

Pattern `Multi-step Flow`:
- Stepper/progress indicator visible across the flow
- One primary CTA fixed at bottom per step
- Validate incrementally and keep previous step data persisted

Pattern `Offline + Retry`:
- Dedicated empty/error surface for connectivity loss
- Show last synchronized data when available
- Provide explicit retry action and feedback after reconnection

---

# EVENTS
See [common-events](./common-events.md)

Allowed event names:
- `Start`
- `ClientStart` (non-web)
- `[<grid-name>.]Refresh`
- `[<grid-name>.]Load`
- `Enter` (web only)
- `Back` (non-web only)
- `'<custom-name>'` (for buttons)
- `<control-name>.<event-name>`

Common control event names:
- Web: `Click`, `DblClick`
- Native: `Tap`, `DoubleTap`, `LongTap`, `Swipe`, `SwipeTop`, `SwipeLeft`, `SwipeRight`, `SwipeBottom`

Execution order:
1. `Start`
2. `Refresh` and then each `<grid>.Refresh`
3. `Load` after `Refresh`, and `<grid>.Load` after each `<grid>.Refresh` (one execution per loaded row)
4. User interaction events: `Enter`, `Back`, `'<custom-name>'`, `<control-name>.<event-name>`

Note:
- `Load` can refer to event name or command name depending on context

Example:
~~~
Event 'Calculate'
	&Total = &Price * &Quantity
	msg(format(!"Total: %1", &Total), status)
EndEvent
~~~

---

# LAYOUT
Declarative XML-based screen layout schema used in `#Layout` section

Scope:
- Define hirarchical structure and control composition
- Define visual styling in `DesignSystem` object classes

Format:
- Indent using tabs (`\t`); whitespaces forbidden
- Indent attributes one tab deeper than the element
- Expand element tags as multiline when more than two attributes
- Place element name alone on opening line
- Place one attribute per line

Elements:
- `<smart>`: Modern div-based responsive layout
- `<table>`: Legacy table-based layout
- `<canvas>`: Absolute positioning with overlapping
- `<grid>`: Data grid with items
- `<input>`, `<label>`, `<button>`, `<image>`: UI controls
- `<stencil>`: Embedded reusable layout

Size units:
- `px` (Web), `dip` (native) for absolute
- `%` for relative
- Other units forbidden

Layout constraints:
- For `canvas`, each direct child must define:
	* Both `width` and `height`
	* At least one horizontal anchor (`left` or `right`)
	* At least one vertical anchor (`top` or `bottom`)
- For `smart` and `table`, `columnsStyle` and `rowsStyle` must not overflow or underflow container size
- For `stencil`, each mapped child must define `controlNameForStencil`
- For `image`, use `source` for static image objects and `attribute` for bound data

---

# EXAMPLES

## Example 1
Simple Panel with Grid
~~~
Panel CustomerList
{
	#Events
		Event Start
			&Customers.Clear()
		EndEvent

		Event Load
			For &Customer in ListCustomersDP()
				&Customers.Add(&Customer)
				load
			EndFor
		EndEvent

		Event GridCustomers.ItemClick
			ViewCustomer(&Customer.CustomerId)
		EndEvent

		Event 'NewCustomer'
			NewCustomer()
		EndEvent
	#End

	#Rules
	#End

	#Conditions
	#End

	#Variables
		Customers [ DataType = 'CustomerInfo', Collection = 'True' ]
		Customer [ DataType = 'CustomerInfo' ]
	#End

	#Layout
		<layout>
			<view>
				<smart
					name="MainTable"
					class="page"
					width="100%"
					height="100%"
					olumnsStyle="100%"
					rowsStyle="96dip;100%;72dip">
					<row>
						<cell
							class="page-header"
							hAlign="Left"
							vAlign="Middle">
							<label
								name="Title"
								caption="Customers"
								class="text-title"/>
						</cell>
					</row>
					<row>
						<cell class="page-content">
							<grid
								name="GridCustomers"
								class="surface"
								controlType="smart"
								autoGrow="True">
								<smart
									name="GridCustomerItem"
									width="100%"
									height="88dip"
									class="surface-muted">
									<row>
										<cell>
											<input
												attribute="&amp;Customer.CustomerName"
												readonly="True"
												class="text-body"/>
										</cell>
									</row>
								</smart>
							</grid>
						</cell>
					</row>
					<row>
						<cell
							class="page-footer"
							hAlign="Right"
							vAlign="Middle">
							<button
								name="BtnNew"
								caption="New Customer"
								event="'NewCustomer'"
								class="btn-primary" />
						</cell>
					</row>
				</smart>
			</view>
		</layout>
	#End

	#Properties
		"Caption" = "Products List"
		"Style" = "MyDesignSystem"
	#End
}
~~~

## Example 2
Panel with Events
~~~
Panel ProductDetail
{
	#Events
		Event Start
			&ProductId = &Parm.ProductId
		EndEvent

		Event Refresh
			For Each Product
				Where ProductId = &ProductId
				&ProductName = ProductName
				&ProductPrice = ProductPrice
				&ProductImage = ProductImage
			EndFor
		EndEvent

		Event 'BuyNow'
			AddToCart(&ProductId)
			msg(!"Added to cart", status)
		EndEvent
	#End

	#Rules
		parm(in: &Parm);
	#End

	#Conditions
	#End

	#Variables
		Parm [ DataType = 'ProductDetailParm' ]
		ProductId [ DataType = 'Numeric(10.0)' ]
		ProductName [ DataType = 'VarChar(128)' ]
		ProductPrice [ DataType = 'Numeric(10.2)' ]
		ProductImage [ DataType = 'Image' ]
	#End

	#Layout
		<layout>
			<view>
				<smart
					name="Container"
					width="100%"
					height="100%"
					columnsStyle="100%"
					rowsStyle="200dip;60dip;60dip;100%">
					<row>
						<cell hAlign="Center">
							<image
								attribute="&amp;ProductImage"
								width="100%"
								height="200dip"/>
						</cell>
					</row>
					<row>
						<cell>
							<input
								attribute="&amp;ProductName"
								readonly="True"
								class="text-title"/>
						</cell>
					</row>
					<row>
						<cell>
							<input
								attribute="&amp;ProductPrice"
								readonly="True"
								class="text-body"/>
						</cell>
					</row>
					<row>
						<cell hAlign="Center" vAlign="Middle">
							<button
								name="BtnBuy"
								caption="Buy Now"
								event="'BuyNow'"
								class="btn-primary"/>
						</cell>
					</row>
				</smart>
			</view>
		</layout>
	#End

	#Properties
		"Caption" = "Product Detail"
		"Style" = "MyDesignSystem"
	#End
}
~~~
