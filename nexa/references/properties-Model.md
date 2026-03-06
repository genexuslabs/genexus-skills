# MODEL Properties

## (root)

- `ModelType` (Custom) — ModelType [hidden]
- `ATTNAME_LEN` (Integer) — Significant attribute name length. Significant attributes & domains name length. Default: `30` [hidden]
- `TBLNAME_LEN` (Integer) — Significant table name length. Significant table/index/data-View name length. Default: `30` [hidden]
- `OBJNAME_LEN` (Integer) — Significant object name length. Significant Trn/Wkp/Wbp/Rpt/Prc/Mnu/Mbar & Styles name length. Default: `128` [hidden]
- `UserInterface` (Custom) — User Interface. Default: `1` [hidden]
- `Language` (Text) — Culture. Default: `eng` [hidden]
- `Version` (Text) — Version. Default: `Version 1.0` [hidden]
- `HasLegacyGenerator` (Boolean) — HasLegacyGenerator [hidden]
- `GeneratedLanguage` (Custom) — Language [hidden]
- `ReorgEnvironment` (Custom) — Reorganization Generator
- `idReorgUserInterface` (Custom) — Reorganization User Interface [hidden]
- `idReorgGeneratedLanguage` (Custom) — Reorganization Language [hidden]
- `DefaultEnvironment` (Custom) — Default Generator [hidden]
- `idMULTITENANT` (Boolean) — Multi Tenant. Enable Multi Tenant support. Default: `false` [hidden]
- `DataSource` (Custom) — DataSource [hidden]
- `TargetPath` (Text) — TargetPath
- `Generator` (Custom) — Generator. Default: `12` [hidden]
- `TranslationType` (Combo) — Translation type. Type of translation.. Default: `None`. Values: Static, Run-time, No translation [hidden]
- `idTRANSLATE_TO_LANGUAGE` (Custom) — Translate to language. Translate all literals to the specified language. [hidden]
- `TranslationsExceptions` (Text) — Translation exceptions. List of regular expressions that are excluded from translation. Default: `@a[0-9A-F]{6}#0.*javascript.*#0[ \t\-_=x\*]+#0[^\p{L}]*#1&lt;.*&gt;#1` [hidden]
- `StartupObject` (Custom) — Startup Object
- `PRESERVE_TABLE_CASING` (Boolean) — Preserve Table Casing. Default: `true`
- `AutomaticPrompts` (Combo) — Generate prompt programs. Controls whether prompt objects are generated automatically or not.. Default: `Yes`. Values: Yes, No [hidden]
- `RootModuleObjectVisibility` (Combo) — Root module visibility. Object visibility value of Root module. Default: `idKnowledgeBase`. Values: Public, Knowledge Base, Internal, Private [hidden]
- `idISBCWEBSERVICE` (Boolean) — idISBCWEBSERVICE [hidden]
- `idISBUSINESSCOMPONENT` (Boolean) — Business Component. Default: `false`
- `idPOPULATEDATA` (Boolean) — Populate Data. Allows controlling whether data population should be run as part of the build process.. Default: `true`
- `SynchronizeWiki` (Boolean) — Synchronize with External Wiki. Default: `true`
- `ProtectedVersion` (Boolean) — ProtectedVersion. Default: `false` [hidden]
- `StorageTimeZone` (Custom) — DateTime storage timezone. Timezone for datetime database storage. Default: `0000`
- `ReadOnly` (Boolean) — ReadOnly. Default: `false` [hidden]
- `InvalidState` (Boolean) — InvalidState. Default: `false` [hidden]
- `LikeEscapeCharacter` (Custom) — LIKE escape character [hidden]
- `EnableWorkflowRuntime` (Boolean) — EnableWorkflowRuntime. Enable Workflow Runtime surrogate. Default: `false` [hidden]
- `EnableIntegratedSecurity` (Boolean) — Enable Integrated Security. Default: `false` [hidden]
- `idCALL_PROTOCOL` (Combo) — idCALL_PROTOCOL [hidden]
- `idTRN_Type` (Combo) — idTRN_Type [hidden]
- `idISPROMPT` (Boolean) — idISPROMPT [hidden]

## Integrated Security

- `IntegratedSecurityLevel` (Combo) — Integrated Security Level. Default: `SecurityNone`. Values: None, Authentication, Authorization [hidden]
- `idLibraryInfo` (Text) — LibraryInfo [hidden]
- `IntegratedSecurityRepositoryId` (Text) — Repository ID. Integrated security repository ID. [hidden]
- `IntegratedSecurityApplicationId` (Text) — Application ID. Integrated security application ID. [hidden]
- `IntegratedSecurityAdministratorUserName` (Text) — Administrator User Name. Integrated security administrator user name. [hidden]
- `IntegratedSecurityAdministratorUserPassword` (Text) — Administrator User Password. Integrated security administrator user password. [hidden]
- `IntegratedSecurityConnectionUserName` (Text) — Connection User Name. Integrated security connection user name. [hidden]
- `IntegratedSecurityConnectionUserPassword` (Text) — Connection User Password. Integrated security connection user password. [hidden]
- `GamBackendStyleOverride` (Custom) — GAM Backend Style Override. Defines the Knowledge Base style object used to customize GAM backend style [hidden]

### Web specific

- `IntegratedSecurityLoginWeb` (Custom) — Login Object for Web [hidden]
- `IntegratedSecurityNotAuthorizedWeb` (Custom) — Not Authorized Object for Web [hidden]
### SmartDevices specific

- `IntegratedSecurityLoginSD` (Custom) — Login Object for SD [hidden]
- `IntegratedSecurityNotAuthorizedSD` (Custom) — Not Authorized Object for SD [hidden]
- `IntegratedSecurityChangePasswordObjectSD` (Custom) — Change Password Object for SD [hidden]
- `IntegratedSecurityCompleteUserDataObjectSD` (Custom) — Complete User Data Object for SD [hidden]
## External Usage

- `WS_View` (Boolean) — Display. Default: `true` [hidden]
- `WS_Insert` (Boolean) — Insert. Default: `true` [hidden]
- `WS_Update` (Boolean) — Update. Default: `true` [hidden]
- `WS_Delete` (Boolean) — Delete. Default: `true` [hidden]
## Transaction integrity

- `TRNEND` (Combo) — Commit on exit. Default: `Yes`. Values: Yes, No
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
- `SAMESITE_COOKIE` (Combo) — SameSite cookie attribute. Allows you to declare the scope of cookies controlling if they should be restricted to a first-party or same-site context. For example, requests for https://example.com/sekrit-image will attach same-site cookies if and only if initiated from a context whose 'site for cookies' is example.com.
			Values:

			Do not specify -> SameSite cookie attribute is not specified. Availability of cookies depends on browser/version. 
			None -> Cookies are sent with same-site and cross-site requests. It requires a secure context/HTTPS.
			Lax -> Cookies are sent with same-site requests, and with cross-site top-level navigations.
			Strict -> Cookies are sent along with same site requests.. Default: `Lax`. Values: Do not specify, None, Lax, Strict
- `WEB_SECURITY_LEVEL` (Combo) — Web Security Level. Default: `High`. Values: Use Environment property value, High, Medium
## HTTP Errors Handlers

- `HttpErrorHandlersEnable` (Text) — Http Error Handlers. Enable a customized response based on Http error handlers. Default: `Disabled`
- `HttpErrorHandlersValues` (Text) — Http Error Handlers Values. Enable HTTP Error Handlers
## Docker

- `UseDockerContainer` (Combo) — Use Docker containers. Prototype using Docker containers. Default: `No`. Values: Yes, No
## Location configuration

- `GoogleApiKey` (Text) — Google API Key. API key for Google Location services
## User interface

### Web interface

- `Theme` (Custom) — Default Theme [hidden]
- `idDefaultFormLayout` (Combo) — Default Form Layout. Specifies the form template used to generate default form.. Values: Flat Template, Unanimo Template, Carmine Template, Fiori Template [hidden]
- `DocumentType` (Combo) — HTML Document Type. Default: `HTML5`. Values: Do not specify, HTML 4.01 Transitional, HTML 4.01 Strict, XHTML 1.0 Transitional, HTML 5 [hidden]
- `IDE_ConnectionString` (Text) — Genexus IDE Connection String
- `WebUX` (Combo) — Web User Experience. Web user experience. Default: `SMOOTH`. Values: Smooth, Previous versions compatible [hidden]
- `DefaultWebFormEditor` (Combo Int) — DefaultWebFormEditor. The web form editor to be used for new objects by default.. Default: `0`. Values: Abstract Layout, HTML [hidden]
- `WebFormDefaults` (Combo Int) — WebFormDefaults. Indicates if GeneXus must use a responsive web design to generate default forms or the 'old' way.. Default: `0`. Values: Responsive Web Design, Previous versions compatible [hidden]
- `idMASTER_PAGE` (Custom) — Default Master Page. The Default Master Page
- `idPROMPT_MASTER_PAGE` (Custom) — Prompts Master Page. Master page used for initialize generated prompts
- `DATEPICKER_IMAGE` (Custom) — Datepicker image. Image for datepicker [hidden]
- `DELETE_ROW_METHOD` (Combo) — Delete grid row UI. Delete grid row method from UI. Values: Alternating images, Context menu - Delete [hidden]
- `DELETE_ROW_IMAGE` (Custom) — Delete row image. Image for deleting a grid row [hidden]
- `UNDELETE_ROW_IMAGE` (Custom) — Undelete row image. Image for undeleting a grid row [hidden]
- `PROMPT_IMAGE` (Custom) — Prompt image. Image for prompt [hidden]
- `DELETE_COLUMN_POSITION` (Combo) — Delete column position in grids. Values: Leftmost column, Rightmost column [hidden]
- `DELETE_COLUMN_POSITION_FREE` (Combo) — Delete column position in free-style grids. Values: Bottom right, Bottom left, Top right, Top left [hidden]
- `DELETE_COLUMN_TOOLTIP` (Text) — Delete column tooltip text [hidden]
- `DELETE_COLUMN_TITLE` (Text) — Delete column title [hidden]

#### Client side validation behaviour

- `STOP_ON_ERROR` (Combo) — Stop on error. Prevent user from proceeding when validation fails. Default: `No`. Values: Yes, No [hidden]
- `VALIDATION_MESSAGE_POSITION` (Combo) — Validation message position. Position of validation error and warning messages. Default: `right`. Values: Top, Right, Bottom, Left [hidden]
- `VALIDATION_MESSAGE_OVERLAP` (Combo) — Validation message overlap adjacent controls. Default: `Yes`. Values: Yes, No [hidden]
- `VALIDATION_MESSAGE_DISPLAY` (Combo) — Validation message display. Default: `one`. Values: All at once, One at a time [hidden]
### Windows interface

- `idFormClassList` (Custom) — Form Classes [hidden]

#### Transaction configuration

- `ADD_BUTTON` (Custom) — Add button bitmap [hidden]
- `UPD_BUTTON` (Custom) — Update button bitmap [hidden]
- `CNF_BUTTON` (Custom) — Confirm button bitmap [hidden]
- `DLT_BUTTON` (Custom) — Delete button bitmap [hidden]
#### Default Fonts

- `PROP_ATT_FONT` (Custom) — Attribute Font. Default: `Courier New,9` [hidden]
- `PROP_TEXT_FONT` (Custom) — Text Block Font. Default: `Microsoft Sans Serif,8,style=Bold` [hidden]
- `PROP_BTN_FONT` (Custom) — Button Font. Default: `Microsoft Sans Serif,8` [hidden]
#### Prompts

- `PromptDefaults` (Boolean) — Use Default Settings. Default: `true` [hidden]
- `ButtonpPrompt` (Boolean) — Button Prompt [hidden]
- `ColorPrompt` (Boolean) — Colored Prompt [hidden]
- `PromptColor` (Custom) — Prompt Color. Default: `Black` [hidden]
### Report Default Fonts

- `PROP_RPT_ATT_FONT` (Custom) — Report Attribute Font. Default: `Microsoft Sans Serif,8`
- `PROP_RPT_TEXT_FONT` (Custom) — Report Text Block Font. Default: `Microsoft Sans Serif,8`
## Defaults

- `DefaultReportOutput` (Combo) — Report output. Default: `FIL`. Values: Ask User, Only To Screen, Only To Printer, Only To File [hidden]
- `ExternalNamespace` (Text) — Exposed namespace [hidden]
- `URLAccess` (Combo) — URL access. Object can be accessed through the URL. Default: `No`. Values: Yes, No [hidden]
- `DefaultNLS_SUPPORT` (Combo) — Enable national language support. National language support. Default: `No`. Values: No, Yes [hidden]
- `AjaxRequestsSecurity` (Combo) — Ajax requests security. Security level on ajax requests. Default: `High`. Values: High, Medium, Low [hidden]
- `OnSessionTimeout` (Combo) — On session timeout. Action to perform on session timeout. Default: `Ignore`. Values: Ignore, Warn [hidden]
- `idXmlInclude` (Combo) — XML Null Serialization. Default: `idXmlIncludeAlways`. Values: Empty Tag, No Tag, Nil Tag [hidden]
- `idXmlDateSerialization` (Combo) — XML Date Serialization. Default: `idXmlDateDefaultFormat`. Values: Date & Time, Date & Time with Timezone, Date & Time with Timezone and Milliseconds [hidden]
- `AUTO_REFRESH` (Combo) — Automatic refresh. Automatically refresh grids when their dependencies are changed. Default: `VARS_CHANGE`. Values: Yes, No [hidden]
- `CACHE_CONTENT_EXPIRATION` (Integer) — Static content cache expiration (hours). Static content expiration for content such as images, javascript and css (value in hours). JAVA: Compatible only with Servlet 2.4 or higher. Default: `36` [hidden]
- `USER_AGENT_HEADER` (Text) — User-Agent header. Specifies the default User-Agent HTTP request header that will be sent automatically in all outgoing HTTP requests performed by the application (via HttpClient, file downloads, or image retrievals).
		If left empty, no default User-Agent header will be sent. In the case of HttpClient, a User-Agent can still be set programmatically. 
		Example: AppName/1.4.2 (.NET; Linux x64) - indicates the application name and version, optionally including the OS and architecture. [hidden]
## Images

- `LargeImageUploadSize` (Text) — LargeImageUploadSize. Size in KBytes or Resolution (<Width> x <Height>) for Large value on Maximum Upload Size property. Default: `1024x1024` [hidden]
- `MediumImageUploadSize` (Text) — MediumImageUploadSize. Size in KBytes or Resolution (<Width> x <Height>) for Medium value on Maximum Upload Size property. Default: `640x640` [hidden]
- `SmallImageUploadSize` (Text) — SmallImageUploadSize. Size in KBytes or Resolution (<Width> x <Height>) for Small value on Maximum Upload Size property. Default: `320x320` [hidden]
## Team Development

- `RemoteVersionId` (Integer) — Remote Version ID. Default: `-1` [hidden]
- `LinkedVersion` (Boolean) — Is Linked Version. Default: `false` [hidden]
- `RemoteVersion` (Text) — Remote Version. Repository Version [hidden]
- `FixedObjectsVersionDates` (Boolean) — Are Objects Version Dates Fixed. Default: `false` [hidden]
- `DisconnectFromServer` (Custom) — Disconnect This Version [hidden]
## Compatibility

- `idTIME_IN_UTC_BUG` (Boolean) — Time Only Compatibility. True to activate time only bug for Smart Devices and rest calls (Android and .net). Default: `true` [hidden]
## Test

- `idGenCodeCoverageInfo` (Combo) — Generate Code Coverage information. Indicates whether to generate GeneXus source-level runtime code coverage information. Default: `No`. Values: No, Yes [hidden]
- `idGenMockeableObject` (Combo) — Generate Mockable Objects. Indicates whether to generate GeneXus source-level code to allow mock testing on objects.. Default: `No`. Values: No, Yes [hidden]
## Compatibility

- `idNULLS_BEHAVIOR` (Combo) — Nulls Behavior. Default: `idNB_Current`. Values: Current Version, Version 8.0 and prior (Deprecated) [hidden]
- `idEMPTY_BEHAVIOR` (Combo) — Empty as null behavior. Default: `idNB_Current`. Values: Current Version, Version 8.0 and prior (Deprecated), Blank as Null [hidden]

### Web Compatibility

- `SHOWMASTERPAGE_POPUP` (Boolean) — Show Master Page when Pop-up. Default: `false` [hidden]
- `COLUMN_TITLE_DEFAULT_FROM` (Combo) — Column Title Default. Default: `CT_FromParent`. Values: From Description, From Parent [hidden]
- `PARAMETERS_STYLE` (Combo) — Parameters Style. Defines that the generated application will be using the standard URL query component style (identifying each parameter by its name) or another supported style.. Default: `NamedParameters`. Values: Named, Positional
