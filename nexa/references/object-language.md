---
name: object-language
description: Localized text container for one target application language
---

Defines localized resources for one target language in a multilingual Knowledge Base

---

# DEFINITION
A `Language` object stores translations for one target language

---

# SYNTAX
~~~
Language <name>
{
	<translations>

	#Properties
		<properties>
	#End

	#Documentation
		<documentation>
	#End
}
~~~

Where:
- `<name>`: Language object name using alphanumeric or underscore, starting with letter
- `<translations>`: Localized entries using key-value pairs; see [ENTRY](#entry) section
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-language.md)
- `<documentation>`: Optional object documentation; see [markdown](./common-markdown.md)

---

# ENTRY
Localized mapping from a stable literal to a language-specific translation

Syntax:
~~~
"<string-literal>" = "<localized-text>"
~~~

Where:
- `<string-literal>`: Stable literal shared across all languages
- `<localized-text>`: Translation for target language

Rules:
- Encode localized text using UTF-8; allow full Unicode character set
- Preserve placeholders and formatting tokens in translations
- Define only overrides and resolver missing entries through:
	* Fallback `Language` object named by `ParentLanguage` property if defined
	* Key name verbatim otherwise

---

# OUTPUT
Use [global-output](./global-output.md) with:
- Location: `#localization/`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Use [common-functions](./common-functions.md) for language runtime operation references
- For translation keys, choose one of the following:
	* Use `UPPER_SNAKE_CASE` as a best practice for consistency (recommended but not required)
	* Use natural-language keys using `Knowledge Base` language:
		1. Obtain `KbLanguage` property value from `.knowledgebase.main.gx` file
		2. Update `Language` objects entries with translated messages
- Keep `Language` objects under root `Localization` folder only (not under modules)
- Keep runtime language names aligned with existing `Language` object names
- Keep translation literals stable across all target languages
- Set locale properties explicitly for custom languages; including RTL when applicable
- Warn user before modifying translation keys with reserved prefixes; e.g. `GX*`, `GAM*`

---

# EXAMPLES

## Example 1
Language objects with constant literals
~~~
Language English
{
	"APP_TITLE" = "Customer Management"
	"APP_WELCOME" = "Welcome"
	"APP_SAVE_OK" = "Saved successfully"

	#Properties
		"Description" = "English localization"
		"ISO Language Code" = "English / American"
		"ISO Country Code" = "United States"
		"Date format" = "English"
	#End
}

Language Spanish
{
	"APP_TITLE" = "Gestion de clientes"
	"APP_WELCOME" = "Bienvenido"
	"APP_SAVE_OK" = "Guardado correcto"

	#Properties
		"Description" = "Spanish localization"
		"ISO Language Code" = "Spanish"
		"ISO Country Code" = "Spain"
		"Date format" = "Spanish"
		"Decimal separator" = "',' Comma"
	#End
}

Language Arabic
{
	"APP_TITLE" = "ادارة العملاء"
	"APP_WELCOME" = "مرحبا"
	"APP_SAVE_OK" = "تم الحفظ بنجاح"

	#Properties
		"Description" = "Arabic localization"
		"ISO Language Code" = "Arabic"
		"ISO Country Code" = "Saudi Arabia"
		"Codepage" = 1256
	#End
}
~~~

Applying current language:
~~~
SetLanguage(!'Spanish')
&CurrentLanguage = GetLanguage()
&TranslitMessage = format(!"%1 (in %2)", 'APP_WELCOME', &CurrentLanguage)
msg(&TranslitMessage, status) // prints "Bienvenido (in Spanish)"
~~~

## Example 2
Language objects with natural-language keys when `KbLanguage = "English"`
~~~
Language English
{
	"Customer Management" = ""
	"Welcome" = ""
	"Saved successfully" = ""

	#Properties
		"Description" = "English localization"
		"ISO Language Code" = "English / American"
		"ISO Country Code" = "United States"
		"Date format" = "English"
	#End
}

Language Spanish
{
	"Customer Management" = "Gestion de clientes"
	"Welcome" = "Bienvenido"
	"Saved successfully" = "Guardado correcto"

	#Properties
		"Description" = "Spanish localization"
		"ISO Language Code" = "Spanish"
		"ISO Country Code" = "Spain"
		"Date format" = "Spanish"
		"Decimal separator" = "',' Comma"
	#End
}

Language Arabic
{
	"Customer Management" = "ادارة العملاء"
	"Welcome" = "مرحبا"
	"Saved successfully" = "تم الحفظ بنجاح"

	#Properties
		"Description" = "Arabic localization"
		"ISO Language Code" = "Arabic"
		"ISO Country Code" = "Saudi Arabia"
		"Codepage" = 1256
	#End
}
~~~
