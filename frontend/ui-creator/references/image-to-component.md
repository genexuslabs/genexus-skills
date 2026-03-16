# Image to Component

## Inputs

1. **Image path** (required) — UI screenshot to replicate
2. **Platform** (required) — `angular` or `react`
3. **Project path** (required) — root of the web project
4. **Component path** (required) — where to write output files
5. **Dev server URL** (required) — full URL to the page, e.g. `http://localhost:4200/home`
6. **Component context** (optional) — data bindings and helpers available in the template (signal names, variable names, helper methods, types)
7. **Layout exclusions** (optional) — shared layout elements already rendered by the app shell (e.g. "header and footer are in the shared layout — generate only the `<main>` content")
8. **Style reference** (optional) — component-level CSS patterns discovered from a previously generated reference page (e.g. button styles, card layouts, form elements). When provided, use these patterns to ensure visual consistency across pages

## Prerequisites

- Dev server **must be running** at the provided URL before invoking this skill
- Global styles (design tokens as CSS custom properties) must already exist in the project
- `playwright` and `tsx` must be available (installed in workspace root or globally)

## Workflow

**IMPORTANT**: Always use **forward slashes** (`/`) in all bash command paths

### Phase 1: Analyze & Generate

**View** the target UI image once with your vision capabilities. From this single analysis, generate all outputs below

#### Step 1: Create Semantic Specification

Create `semantic-spec.json` in the component directory:

```json
{
	"layout": {
		"sections": [
			{
				"id": "unique-section-id",
				"semanticType": "header|nav|main|article|aside|footer",
				"elements": [
					{
						"id": "unique-element-id",
						"type": "button|input|image|text|heading|list|…",
						"content": "Exact visible text",
						"requiredFeatures": ["primary", "clickable", "aria-label:description"],
						"visualStyle": {
							"bg": "--color-text-primary",
							"text": "--color-bg-primary",
							"border": "--color-border"
						}
					}
				]
			}
		]
	}
}
```

**Zone scanning** — identify all visible zones (must cover 100% of the content area):
- Header (if not excluded by layout exclusions)
- Sidebar / App Rail (if present)
- Main Content sections
- Footer (if not excluded by layout exclusions)

**Critical rules:**
- **Strict Fidelity**: Only include elements actually visible in the image
	- Do NOT add "standard" elements (search bars, social icons) if not present
	- Do NOT turn a simple section into a full app
- **Exact Counts**: If a grid shows 4 columns, spec must have 4 columns (not 3, not 6)
- **Repeated elements**: For grids/lists with many identical items (e.g. 42 product cards), spec ONE representative item and note the repeat pattern: `"repeats": "~42 items, 6-column grid"`. Do NOT enumerate every item — it wastes tokens without adding information. In the template, use the platform's loop construct over the data binding. Mock data should contain 6–8 representative items — enough to validate the grid layout
- **Visual style mapping**: For elements with prominent visual styling (buttons, badges, banners, highlighted sections), include `visualStyle` mapping observed colors to the closest design token variable names. This anchors color decisions in the spec so CSS generation uses the correct tokens. Omit `visualStyle` for plain text elements where defaults apply
- **Unique elements**: List every distinct element individually (no shortcuts)
- **Layout exclusions**: If the caller specified layout exclusions (e.g. "header and footer are shared"), still note them in the spec but mark them `"excluded": true`. Generate component files for the non-excluded content only
- **Pure JSON**: No markdown, no comments

#### Step 2: Generate Component Files

Based on the platform, generate only the **view/template and styles** files:

| Platform | Files generated |
|---|---|
| Angular | `<name>.component.html` + `<name>.component.scss` |
| React | JSX return block in `<Name>.tsx` + `<Name>.module.css` |

**If component context was provided**, use the specified data bindings in the template:
- Angular: `@for (item of items(); track item.id)`, `{{ title() }}`, `@if (loading())`
- React: `{items.map(item => (…))}`, `{title}`, `{loading && …}`

**If no component context**, generate static markup matching the image exactly

**CSS rules:**
- USE design tokens from the project's global styles: `color: var(--color-text-primary);`
- FORBIDDEN: hardcoded values like `color: #333333;` or `padding: 16px;`
- Exception: values not covered by existing tokens (use a CSS comment noting the raw value)
- **If style reference was provided**, apply those patterns for matching UI elements (buttons, cards, forms, etc.) instead of re-interpreting them from the image. This ensures consistency across pages

### Phase 2: Evaluate & Correct

#### Step A: Capture Screenshot

```bash
npx tsx <skillDirectory>/scripts/capture-screenshot.ts <devServerUrl> <outputPath>
```

Example:
```bash
npx tsx <skillDirectory>/scripts/capture-screenshot.ts http://localhost:4200/home ./src/app/components/home/screenshot.png
```

#### Step B: Compare and Fix

1. **View** both the original UI image and the captured screenshot
2. **Compare** for differences in:
	- **Layout**: Alignment, spacing, sizing, column counts
	- **Styling**: Color accuracy, font weights, border styles, shadows
	- **Content**: Missing elements, incorrect text, broken images
	- **Semantics**: Wrong tags, missing ARIA attributes
3. If differences found, **fix** the template and/or styles directly, then repeat Step A
4. If no significant differences, the component is complete
5. **Maximum 3 iterations** of the capture-compare-fix cycle. After 3 iterations, accept the result and move on

## Common Pitfalls

- **Incomplete zone coverage**: Content area must account for all visible sections
- **Adding imaginary elements**: Only include what's visible in the image
- **Wrong column counts**: Count grid columns carefully from the image
- **Hardcoded CSS values**: Always use existing design token variables
- **Ignoring layout exclusions**: Don't regenerate shared header/footer if the caller excluded them

## Tips

- **Consistent naming**: Use semantic class names matching the design system
- **Zone scanning**: Map the full layout structure before coding details
- **Single pass**: Analyze the image thoroughly once — avoid re-reading it multiple times
- **Respect the project**: Read existing global styles to discover available tokens before generating CSS
