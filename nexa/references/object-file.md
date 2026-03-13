---
name: object-file
description: Stores external resources within Knowledge Base
---

Stores external resources (JSON, XML, TXT, etc.) within Knowledge Base

---

# DEFINITION
A `File` object stores external resources within the Knowledge Base for information exchange or deployment packaging

---

# SYNTAX
~~~
File <name>
{
	<content>

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
- `<content>`: File object content in UTF-8 encoding (plain, JSON, XML, INI, etc)
- `<properties>`: Optional object properties in TOML syntax (see [properties](./properties-object-file.md))
- `<documentation>`: Optional object documentation (check [common-markdown](./common-markdown.md))

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `file`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Name must include file extension in lowercase
- Text files only (.txt, .json, .xml, .ini, .bat, .sh, .cs, .java, etc.)
- Binary files (.mp3, .wav, .ttf, .otf, .dll, .exe, etc.) read-only, never output binary content
- Avoid leading or trailing tabs/whitespace unless required by format
- Use UTF-8 encoding
- Files cannot be specified under folders, only modules

---

# EXAMPLES

## Example 1
API Key File
~~~
File ApiKeyFile.txt
{
	sk-51a8bX7nPqv9ZbS4rTmJ2LgDkEfYx1zQ9wVrR0tTnF1A7Fhj

	#Properties
		"Description" = "Service API Key"
	#End
}
~~~

## Example 2
JSON Configuration File
~~~
File AppSettingsFile.json
{
	{
		"apiKey": "sk-51a8bX7nPqv9ZbS4rTmJ2LgDkEfYx1zQ9wVrR0tTnF1A7Fhj",
		"baseUrl": "https://api.example.com/v1/",
		"timeout": 30,
		"retries": 3,
		"logging": {
			"enabled": true,
			"level": "info"
		}
	}

	#Properties
		"Description" = "Appliction settings file"
	#End
}
~~~

## Example 3
XML Configuration File
~~~
File AppSettingsFile.xml
{
	<?xml version="1.0" encoding="UTF-8"?>
	<Settings description="Configuration file">
		<ApiKey>sk-51a8bX7nPqv9ZbS4rTmJ2LgDkEfYx1zQ9wVrR0tTnF1A7Fhj</ApiKey>
		<BaseUrl>https://api.example.com/v1/</BaseUrl>
		<Timeout>30</Timeout>
		<Retries>3</Retries>
		<Logging>
			<Enabled>true</Enabled>
			<Level>info</Level>
		</Logging>
	</Settings>

	#Properties
		"Description" = "Application settings file"
	#End
}
~~~

## Example 4
INI Configuration File
~~~
File AppConfig.ini
{
	[Database]
	Server=localhost
	Port=5432
	Database=mydb
	Username=admin

	[Logging]
	Level=INFO
	FilePath=./logs/app.log

	#Properties
		"Description" = "Application configuration file"
	#End
}
~~~
