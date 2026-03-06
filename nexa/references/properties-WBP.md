# WBP Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `ObjId` (Integer) — ObjId [hidden]
- `Folder` (Custom) — Folder
- `ObjIsStyle` (Boolean) — IsStyle. Default: `false` [hidden]
- `Theme` (Custom) — Theme
- `idFormLayout` (Combo) — Form Layout. Specifies the form template used to generate default form.. Values: FlatTemplate, UnanimoTemplate, CarmineTemplate, FioriTemplate [hidden]
- `WEB_COMP` (Combo) — Type. Web Panel Type. Default: `No`. Values: Component, Web Page, Master Page
- `URLAccess` (Combo) — URL access. Object can be accessed through the URL. Default: `No`. Values: Yes, No [hidden]
- `MasterPage` (Custom) — Master Page. The Master Page containing this object
- `SHOWMASTERPAGE_POPUP` (Boolean) — Show Master Page when Pop-up
- `sessiontype` (Combo) — Session Type. Default: `RW`. Values: Read Only, Read Write, None
- `IsMain` (Boolean) — Main program. To specify that the object is main. That is: it can be executed as standalone application.. Default: `false`
- `Signatures` (Text) — Signatures [hidden]
- `PublicMethods` (Text) — Public Methods [hidden]
- `IsPrompt` (Boolean) — IsPrompt. Default: `false` [hidden]
- `IsUserPrompt` (Boolean) — Is User Prompt. Prompt was modified by user, it will not be generated automatically if associated table changes. Default: `false` [hidden]
- `PMPTAssocTable` (Custom) — Associated table [hidden]
- `HelpKeyword` (Integer) — HelpKeyword [hidden]
- `DEKLARIT_METADATA` (Text) — DeklaritMetadata [hidden]
- `OBJECT_METADATA` (Text) — ObjectMetadata [hidden]
- `DKL_DEPENDENCIES_PROPS` (Text) — DklDependenciesProps [hidden]
- `DEKLARIT_TYPE` (Integer) — DeklaritType. Default: `-1` [hidden]
- `WORKFLOW_METADATA` (Text) — WorkflowMetadata [hidden]
- `USER_METADATA` (Text) — UserMetadata [hidden]
- `DKL_CUSTOM_PROPERTIES` (Text) — DKL_CUSTOM_PROPERTIES [hidden]
- `DKL_BUILTIN_PROPERTIES` (Text) — DKL_BUILTIN_PROPERTIES [hidden]
- `OnSessionTimeout` (Combo) — On session timeout. Action to perform on session timeout. Default: `Ignore`. Values: Ignore, Warn
- `WEB_AUTO_FOCUS` (Combo) — Focus control. Default: `Yes`. Values: Use Environment property value, First input att/var on the page, First input att/var on the page only if not embedded, Browser dependent
- `CACHE_EXPIRES` (Text) — Cache expiration lapse
- `AUTO_REFRESH` (Combo) — Automatic refresh. Automatically refresh grids when their dependencies are changed. Values: Yes, No
- `COMPRESS_HTML` (Combo) — Auto compress http traffic. Default: `Yes`. Values: Yes, No, Use Environment property value

## Integrated Security

- `IntegratedSecurityLevel` (Combo) — Integrated Security Level. Values: None, Authentication, Authorization
- `IntegratedSecurityPermissionPrefix` (Text) — Permission Prefix
- `IntegratedSecurityObjClientID` (Text) — Security Client ID. This property identifies an SD application in GAM. The Client Id can be used by more than one SD application, note that to reuse the Client Id implies that just one application will exist in GAM. [hidden]
- `IntegratedSecurityObjClientSecret` (Text) — Security Client Secret. The Client Secret is a key used, in conjuntion with Client Id, to identify and to authorize an application when an user is authenticated. [hidden]
- `IntegratedSecurityObjClientEncriptionKey` (Text) — Security Client Encription Key [hidden]
## Main object properties

- `WebApplication` (Combo) — Web Application. Indicates the kind of web application to generate. Default: `idDefault`. Values: Default, Progressive [hidden]
- `GenerateCSS` (Boolean) — Generate minimal CSS. Generate CSS stripping Theme Classes that are not used. Default: `false` [hidden]
- `AppLocation` (Text) — Location [hidden]
- `AppGenerator` (Custom) — Generator [hidden]
## Web Application

- `idWebApplicationName` (Text) — Web Application Name. Provides a human-readable name for the site when displayed to the user. For example, among a list of other applications or as a label for an icon. [hidden]
- `idWebApplicationShortName` (Text) — Web Application Short Name. Provides a short human-readable name for the application. This is intended for when there is insufficient space to display the full name of the web application, like device homescreens. [hidden]
- `idWebApplicationDescription` (Text) — Web Application Description. Provides a general description of what the pinned website does. [hidden]
- `idPrimaryTextDirection` (Combo) — Primary Text Direction. Specifies the primary text direction for the name, short_name, and description members. Together with the lang member, it helps the correct display of right-to-left languages.. Default: `idAuto`. Values: LeftToRight, RightToLeft, Auto [hidden]
- `idDisplay` (Combo) — Display. Defines the developers' preferred display mode for the website.. Default: `idStandalone`. Values: Standalone, Fullscreen, Minimal, Browser [hidden]
- `idBackgroundColor` (Custom) — Background Color. Defines the expected background color for the website. This value repeats what is already available in the theme, but can be used by browsers to draw the background color of a shortcut when the manifest is available before the stylesheet has loaded. This creates a smooth transition between launching the web application and loading the site's content. [hidden]
- `idThemeColor` (Custom) — Theme Color. Defines the default theme color for an application. This sometimes affects how the OS displays the site (e.g., on Android's task switcher, the theme color surrounds the site). [hidden]
- `idPreferRelatedApplications` (Boolean) — Prefer Related Applications. Specifies a boolean value that hints for the user agent to indicate to the user that the specified native applications from the iOS Alternative and Android Alternative apps property are recommended over the website. This should only be used if the related native apps really do offer something that the website can't.. Default: `false` [hidden]
- `WebApplicationIcon` (Custom) — Web Application Icon [hidden]
- `idAndroidAlternativeApp` (Text) — Android Alternative App. Url for the Android application alternative, it could be a Google Play url or a custom url where the Android application is hosted [hidden]
- `idAndroidAlternativeAppId` (Text) — Android Alternative App Identifier. Identifier for the Android application alternative. [hidden]
- `idiOSdAlternativeApp` (Text) — iOS Alternative App. Url to iTunes for the iOS application alternative [hidden]
- `OfflineObject` (Custom) — Offline Object. The object to be displayed when the web application is offline [hidden]
## Privacy

- `ObjAlreadyPrivate` (Boolean) — Was private object. Default: `false` [hidden]
- `ObjIsPrivate` (Boolean) — Private object. Default: `false` [hidden]
- `ObjCopyright` (Text) — Copyright [hidden]
- `ObjBuyer` (Text) — Buyer [hidden]
- `ObjPurpose` (Text) — Purpose [hidden]
## Authorization

- `DKL_PERMISSION_BASE_ID` (Integer) — Parmission Base Id. Default: `2001`
- `DKL_ROLES` (Text) — Security. Security Roles [hidden]
## Warning messages

- `SPC_WARNINGS_DISABLED` (Text) — Disabled warnings. Type a space separated list of warning message codes you want to be disabled.
## Compatibility

- `STD_FUNC_OBJECT` (Combo) — Standard Functions. Standard functions checking. Default: `UMPV`. Values: Use Environment property value, Only standard functions, Allow non-standard functions
## Web interface

- `WebUX` (Combo) — Web User Experience. Web user experience. Values: Smooth, Previous versions compatible

### Datepicker

- `idUSE_WEB_DATEPICKER` (Combo) — Enable Datepicker. Enable datepicker calendar generation. Default: `Yes`. Values: Yes, No, Use Environment property value
- `WNUM_DATEPICKER` (Combo) — Show week numbers. Show calendar week numbers. Default: `No`. Values: Yes, No, Use Environment property value
- `FIRST_WD_DATEPICKER` (Combo) — First day of week. Select first day of week for calendar. Default: `Sunday`. Values: Sunday, Monday, Use Environment property value
## Web information

### Security

- `USE_ENCRYPTION` (Combo) — Encrypt URL parameters. To either allow or deny the encryption of the parameters sent to an URL, and to establish levels of security when the encryption of the parameters is used between Web Objects.
		Values:
			No			-> Indicates that the parameters in the Web objects URL will not be encrypted.This is the default value.
			Session Key	-> Indicates that the parameters in the URL will be encrypted using a different key for each session.The encryption is made using local cookies.This value offers a higher level of security, but it does not allow shared URLs.This means that user X cannot send a URL with parameters to user Y because, in this case, the URL will not work, since the corresponding cookie is required for decryption.
			Site Key	-> Parameters in the Web objects URL are encrypted, but the encryption key will be the same for the whole site.In this case, cookies are not used.This implies a lower level of security, but makes links transfers easier.. Default: `NO`. Values: Use Environment property value, No, Session key, Site key
- `HTTP_PROTOCOL` (Combo) — Protocol specification. The protocol used for services and absolute urls.
		Values:

			Secure (HTTPS) -> Forces the generation of HTTPS as protocol. HTTP indicates that the protocol to use will be Secure Hypertext Transfer Protocol.
			Unsecure(HTTP) -> Forces the generation of HTTP as protocol.HTTP indicates that the protocol to use will be Hypertext Transfer Protocol.
			Do not Specify -> No protocol is specified, the actual protocol is used.. Default: `Unsecure`. Values: Use Environment property value, Unsecure (HTTP:), Secure (HTTPS:), Do not specify
- `WEB_SECURITY_LEVEL` (Combo) — Web Security Level. Default: `High`. Values: Use Environment property value, High, Medium
## Key configuration

### Key assignment

- `ASSIGNED_FNC_KEYS` (Combo) — Assign Function Keys to Standard Events. Default: `No`. Values: Yes, No, Use Environment property value
- `KEY_HELP` (Combo) — Help key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_REFRESH` (Combo) — Refresh key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_CANCEL` (Combo) — Cancel key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_ENTER` (Combo) — Enter key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
## Refresh timeout

- `REFRESH_TOUT` (Text) — Lapse
- `REFRESH_TOUT_TRIG` (Combo) — Triggers. Default: `ALL`. Values: Always, Only when the object has the focus
## Client/Server specific

- `DBMS_JOINS` (Combo) — Join management. Default: `Yes`. Values: Use Environment property value, Join tables on the server, Join tables on the client
- `JOIN_TYPE` (Combo) — Join type. Default: `Default`. Values: Use Environment property value, Use default for server, Natural join, Outer join

### Optimization

#### Hints

- `Hint_firstrows` (Combo) — Fast first rows. Default: `Yes`. Values: Yes, No, Use Environment property value
## Miscellaneous

- `OBJ_IS_INTERFACE` (Boolean) — OBJ_IS_INTERFACE. Default: `false` [hidden]
- `GenerateObject` (Boolean) — GenerateObject. Allows to enable or disable the object specification and generation.. Default: `true`
