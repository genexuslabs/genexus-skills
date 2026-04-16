---
name: properties-environment-frontend
description: Configurable frontend generator properties
---

Use this file to select editable properties, defaults, and valid options for an backend `Generator` from `Environment` deployment target

---

# USER INTERFACE

## Confirmation
- Description: Set confirmation behavior
- Type: `enum{Never prompt,Always prompt,Do not prompt on first level,Use Environment property value}`
- Options:
	* `Never prompt`: Do not show confirmation prompts
	* `Always prompt`: Always request confirmation
	* `Do not prompt on first level`: Skip confirmation on first level (Transactions only)
	* `Use Environment property value`: Inherit from the Environment setting

## Maximum workfile lines
- Description: Set the maximum number of workfile lines
- Type: `integer`

---

# WEB INTERFACE

## Enable Datepicker
- Description: Enable the datepicker widget
- Type: `boolean`

## Show week number
- Description: Show week number in datepicker
- Type: `boolean`

## First day of week
- Description: Set the first day of the week
- Type: `enum{Sunday,Monday}`

---

# WEB INFORMATION

## Focus control
- Description: Set focus control behavior
- Type: `enum{First input att/var on the page,First input att/var on the page only if not embedded,Browser dependent,Use Environment property value}` -->`
- Options:
	* `First input att/var on the page`: Focus the first input attribute/variable
	* `First input att/var on the page only if not embedded`: Focus only when not embedded
	* `Browser dependent`: Let the browser decide focus
	* `Use Environment property value`: Inherit from the Environment setting

## Temp media directory
- Description: Set the temporary media directory
- Type: `string`

## Static content base URL
- Description: Set the base URL for static content
- Type: `string`

## Internet Explorer compatibility
- Description: Set IE compatibility mode
- Type: `enum{IE7 Compatible,Do not specify}`

## Expose descriptive metadata
- Description: Expose descriptive metadata
- Type: `boolean`

## Javascript debug mode
- Description: Enable JavaScript debug mode
- Type: `boolean`

## Auto compress http traffic
- Description: Enable HTTP compression
- Type: `boolean`

## Help files base URL
- Description: Set the base URL for help files
- Type: `string`

---

# PRINTING

## Show printer dialog
- Description: Show the printer dialog before printing
- Type: `boolean`

## Customizable Layout
- Description: Enable customizable layouts
- Type: `boolean`

## Layout Metadata Dir
- Description: Set the layout metadata directory
- Type: `string`

---

# FORMAT

## Date format in CTOD
- Description: Set CTOD date format behavior
- Type: `enum{Language Dependent,mm/dd/yy,mm/dd/yyyy,dd/mm/yy,dd/mm/yyyy,yyyy/mm/dd,yy/mm/dd}`

## First year of 20th century
- Description: Set the first year of the 20th century for date parsing
- Type: `integer`

## Blank when empty
- Description: Return blank when empty
- Type: `string`

---

# COMMON

## Use decimal arithmetic
- Description: Use decimal arithmetic in generated code
- Type: `boolean`

## Transaction integrity
- Description: Generate transactional integrity in data access
- Type: `string`

## Initialize not referenced attributes
- Description: Initialize attributes not referenced in the load
- Type: `boolean`

---

# ANDROID SPECIFIC

## Android SDK Directory
- Description: Set the local path to the Android SDK
- Type: `string`
- Location: `.local.gx`

## JDK Directory
- Description: Set the local path to the JDK
- Type: `string`
- Location: `.local.gx`

## Copy APK To Cloud
- Description: Upload the generated APK when using Deploy to Cloud
- Type: `boolean`

## MultiDex Build in Android
- Description: Enable MultiDex build
- Type: `boolean`

## Gradle Options
- Description: Set additional Gradle flags for Android build
- Type: `string`

## Java package name
- Description: Set the Android application package identifier
- Type: `string`

## Classpath
- Description: Set extra classpath entries for Android build
- Type: `string`

## Base Classpath
- Description: Set base classpath entries generated from Modules
- Type: `string`

## Compiler Path
- Description: Set the path to `javac`
- Type: `string`
- Location: `.local.gx`

## Interpreter Path
- Description: Set the path to `java`
- Type: `string`
- Location: `.local.gx`

---

# APPLE SPECIFIC

## Execution Type
- Description: Select the iOS execution mode
- Type: `enum{Simulator (Mac),iOS Device (Mac),iTunes Sync (Local),Build IPA (Local),Build for Distribution (Local),Knowledge Base (Device)}`
- Options:
	* `Simulator (Mac)`: Run on iOS Simulator
	* `iOS Device (Mac)`: Run on a physical device connected to Mac
	* `iTunes Sync (Local)`: Build and sync .ipa via iTunes
	* `Build IPA (Local)`: Build .ipa locally
	* `Build for Distribution (Local)`: Build signed .zip for distribution
	* `Knowledge Base (Device)`: Run on device using KBN and Service URL

## Simulator
- Description: Select the simulator device type
- Type: `enum{iPhone Retina (3.5-inch),iPhone Retina (4-inch),iPhone Retina (4-inch 64-bits),iPhone Retina (4.7-inch 64-bits),iPhone Retina HD (5.5-inch 64-bits),iPad,iPad Retina,iPad Retina (64-bits)}`
- Options:
	* `iPhone Retina (3.5-inch)`: Use iPhone Retina (3.5-inch)
	* `iPhone Retina (4-inch)`: Use iPhone Retina (4-inch)
	* `iPhone Retina (4-inch 64-bits)`: Use iPhone Retina (4-inch 64-bits)
	* `iPhone Retina (4.7-inch 64-bits)`: Use iPhone Retina (4.7-inch 64-bits)
	* `iPhone Retina HD (5.5-inch 64-bits)`: Use iPhone Retina HD (5.5-inch 64-bits)
	* `iPad`: Use iPad
	* `iPad Retina`: Use iPad Retina
	* `iPad Retina (64-bits)`: Use iPad Retina (64-bits)

## Simulator SDK
- Description: Select the iOS SDK for simulator
- Type: `enum{8.0,Latest}`

## Mac Host
- Description: Set the Mac host name or IP for remote build
- Type: `string`
- Location: `.local.gx`

## Mac User
- Description: Set the Mac user for remote build
- Type: `boolean`
- Location: `.local.gx`

## Mac Password
- Description: Set the Mac user password for remote build
- Type: `string`
- Location: `.local.gx`

---

# ANGULAR SPECIFIC

## Run Target
- Description: Select where the Angular app runs
- Type: `enum{Default,Angular Dev Server,Local Web Server,GeneXusDeployToCloud,AWS S3}`
- Options:
	* `Default`: Run on Angular Dev Server (or DeployToCloud when backend deploys)
	* `Angular Dev Server`: Run on local Angular dev server
	* `Local Web Server`: Run from the backend web server URL
	* `GeneXusDeployToCloud`: Run from GeneXus DeployToCloud
	* `AWS S3`: Prepare for manual upload to AWS S3

## Build Mode
- Description: Select Angular build mode
- Type: `enum{Prototype,Development,Distribution}`
- Options:
	* `Prototype`: Import minimum dependencies for prototyping
	* `Development`: Include testing/debug packages
	* `Distribution`: Build for deployment (ng build --configuration production)
