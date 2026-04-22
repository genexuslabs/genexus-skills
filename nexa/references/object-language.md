---
name: object-language
description: Localized text container for one target application language
---

Defines localized resources for one target language in a multilingual Knowledge Base

---

# DEFINITION
A `Language` object stores translations for one target language

Localization setup:
- `Translate to language` property defines target languages
- `Translation type` property defines mode as `Static` or `Run-time`

Language selection scope:
- Accepted values are existing `Language` object names in the Knowledge Base
- Available options include GeneXus predefined languages and user-defined languages

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
- `<translations>`: Localized entries using key-value pairs
	* `<entry-item>` syntax: `"<message-key>" = "<localized-text>"`
	* `<message-key>`: Stable translation key shared across all languages
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-language.md)
- `<documentation>`: Optional object documentation; check [common-markdown](./common-markdown.md)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `language`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Use [common-functions](./common-functions.md) for language runtime operation references
- Use `UPPER_SNAKE_CASE` for translation keys to keep consistency (but not required)
- Keep `Language` objects under root `Localization` folder only (not under modules)
- Keep runtime language names aligned with existing `Language` object names
- Keep translation keys stable across all target languages
- Set locale properties explicitly for custom languages; including RTL when applicable
- Forbidden message key prefixes: `GX`, `GAM`

---

# EXAMPLES

## Example 1
Language objects with minimal entries
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
