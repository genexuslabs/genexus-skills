---
name: object-image
description: Container for image variants representing a single logical asset
---

Represents one logical image with interchangeable variants automatically applied by given context

---

# DEFINITION
An `Image` object (or `IMG`) defines a container for several bitmaps

---

# SYNTAX
~~~
Image <name>
{
	<entries>

	#Properties
		<properties>
	#End
}
~~~

Where:
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<entries>`: Image entry definition list; see [ENTRY](#entry) section
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-image.md)

---

# ENTRY
Defines one physical image variant inside the logical image container

Syntax:
~~~
"<name>"
[
	<properties>
]
~~~

Where:
- `<name>`: Image entry name matching the physical file name
- `<properties>`: Image entry properties block
	* Use `<prop-name> = '<prop-value>'` syntax for each property
	* See [Image Entry Properties](./properties-object-image-entry.md)

---

# OUTPUT
Use [global-output](./global-output.md)
- Location: `#images/`

Place physical image files under `/<name>` folder:
~~~
<name>.image.main.gx
<name>.image.properties.toml // only for separeted artifact
<name>/
	<name>@1x.png
	<name>@2x.png
	<name>@3x.png
	<name>.svg
~~~

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Each image entry must have a unique property combination
- Each image entry name must be filename only; no path
- Only use supported formats per platform:
	* All: `.png`, `.jpeg`, `.bmp`, `.gif`
	* Web only: `.svg`
	* Other are not supported
- Always define variants required by context
	* By density; otherwise closest is scaled
	* By language; otherwise base language is used
	* By style; otherwise base style is used
- Never define density or style variants for `.svg` format
	* Resolution-independent (no density variants)
	* Render-time styling (via `fill`/`stroke` attributes)

---

# EXAMPLES

## Example 1
Single bitmap with metadata
~~~
Image LogoApp
{
	"LogoApp.png"
	[
		Description = 'Primary application logo (1x)'
		Density = '100% (mdpi Android, 1x iOS, 1x Web)'
		RenderingMode = 'Original'
	]
}
~~~

Required files:
~~~
LogoApp.image.main.gx
LogoApp/
	LogoApp.png
~~~

## Example 2
Multi-density and language-specific variants
~~~
Image WelcomeBanner
{
	"WelcomeBanner-en@1x.png"
	[
		Description = 'English banner for mdpi / 1x'
		Language = 'English'
		Density = '100% (mdpi Android, 1x iOS, 1x Web)'
	]

	"WelcomeBanner-en@2x.png"
	[
		Description = 'English banner for xhdpi / 2x'
		Language = 'English'
		Density = '200% (xhdpi Android, 2x iOS, 2x Web)'
	]

	"WelcomeBanner-es@1x.png"
	[
		Description = 'Spanish banner for mdpi / 1x'
		Language = 'Spanish'
		Density = '100% (mdpi Android, 1x iOS, 1x Web)'
	]

	"WelcomeBanner-es@2x.png"
	[
		Description = 'Spanish banner for xhdpi / 2x'
		Language = 'Spanish'
		Density = '200% (xhdpi Android, 2x iOS, 2x Web)'
	]

	#Properties
		Description = "Localized welcome banner"
	#End
}
~~~

Required files:
~~~
English.language.main.gx
Spanish.language.main.gx
WelcomeBanner.image.main.gx
WelcomeBanner/
	WelcomeBanner_en@1x.png
	WelcomeBanner_en@2x.png
	WelcomeBanner_es@1x.png
	WelcomeBanner_es@2x.png
~~~

## Example 3
Directional icon with RTL variant
~~~
Image NextArrow
{
	"Next Arrow.svg"
	[
		Description = 'Next arrow icon'
		RenderingMode = 'Template'
	]

	"Next Arrow (RTL).svg"
	[
		Description = 'Next arrow icon (for RTL)'
		RenderingMode = 'Template'
		FlipsForRightToLeft = 'True'
	]

	#Properties
		Description = "Next arrow icon"
	#End
}
~~~

Required files:
~~~
NextArrow.image.main.gx
NextArrow/
	NextArrow.svg
	NextArrow_RTL.svg
~~~
