# TRN Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `ObjId` (Integer) — ObjId [hidden]
- `Folder` (Custom) — Folder
- `ObjIsStyle` (Boolean) — IsStyle. Default: `false` [hidden]
- `idISBUSINESSCOMPONENT` (Boolean) — Business Component. A Business Component is the logic part of any Transaction, it means structure plus business rules but not user interface.
    Values:
		  True  ->  transaction can be used as a Business Component variable from any GeneXus object.
		  False -> The transaction cannot be used as a Business Component variable. This is the default value.
- `sessiontype` (Combo) — Session Type. Default: `RW`. Values: Read Only, Read Write, None
- `IsMain` (Boolean) — Main program. To specify that the object is main. That is: it can be executed as standalone application.. Default: `false`
- `Signatures` (Text) — Signatures [hidden]
- `PublicMethods` (Text) — Public Methods [hidden]
- `SdtTypes` (Text) — SDT Types [hidden]
- `HelpKeyword` (Integer) — HelpKeyword [hidden]
- `DEKLARIT_METADATA` (Text) — DeklaritMetadata [hidden]
- `OBJECT_METADATA` (Text) — ObjectMetadata [hidden]
- `DKL_DEPENDENCIES_PROPS` (Text) — DklDependenciesProps [hidden]
- `DKL_LAYOUT` (Text) — DeklaritLayout [hidden]
- `DEKLARIT_TYPE` (Integer) — DeklaritType. Default: `-1` [hidden]
- `WORKFLOW_METADATA` (Text) — WorkflowMetadata [hidden]
- `USER_METADATA` (Text) — UserMetadata [hidden]
- `DKL_CUSTOM_PROPERTIES` (Text) — DKL_CUSTOM_PROPERTIES [hidden]
- `DKL_BUILTIN_PROPERTIES` (Text) — DKL_BUILTIN_PROPERTIES [hidden]
- `DKL_VERSION` (Integer) — DKL_VERSION. Default: `2100` [hidden]
- `DKL_OPTIMISTIC_LOCKTYPE` (Combo Int) — Concurrency Mode. Default: `1`. Values: Check updated tables only, Check all accessed tables
- `DKL_COMMAND_TIMEOUT` (Integer) — Command Timeout. Default: `30`
- `DKL_REF_BY_CANDIDATE` (Boolean) — Reference By Candidate Key. Default: `false`
- `DKL_READ_UNCOMMITED_BC` (Combo) — Use Read Uncommited. Use Read Uncommited for SELECT statements. Default: `Yes`. Values: Yes, No, Use Environment property value
- `DKL_IMAGE` (Text) — Medium Image [hidden]
- `DKL_SMALL_IMAGE` (Text) — Small Image [hidden]
- `DKL_BIG_IMAGE` (Text) — Big Image [hidden]
- `DKL_ACTIONS` (Text) — DKL_ACTIONS [hidden]

## Integrated Security

- `IntegratedSecurityLevel` (Combo) — Integrated Security Level. Values: None, Authentication, Authorization
- `IntegratedSecurityPermissionPrefix` (Text) — Permission Prefix
- `IntegratedSecurityObjClientID` (Text) — Security Client ID. This property identifies an SD application in GAM. The Client Id can be used by more than one SD application, note that to reuse the Client Id implies that just one application will exist in GAM. [hidden]
- `IntegratedSecurityObjClientSecret` (Text) — Security Client Secret. The Client Secret is a key used, in conjuntion with Client Id, to identify and to authorize an application when an user is authenticated. [hidden]
- `IntegratedSecurityObjClientEncriptionKey` (Text) — Security Client Encription Key [hidden]
## Network

- `idConnectivitySupport` (Combo) — Connectivity Support. Define if this object works even without network connectivity

		Values:

			Online  -> The object will execute on an online environment communicating with the server via REST services (default for  Main objects)
			Offline -> The object is executed completely offline with no automatic comunication to the server
			Inherit -> This value is only available for non-Main objects. The value of the property will be inherited from the caller object in runtime.. Default: `idOnline`. Values: Online, Offline, Inherit
## Business Component

- `CALL_PROTOCOL` (Combo) — Call protocol. Define how the object is invoked, and its output.. Default: `INTERNAL`. Values: Internal, HTTP, Command Line, SOAP, Enterprise Java Bean
- `ExternalName` (Text) — Exposed name
- `ExternalNamespace` (Text) — Exposed namespace

### Interoperability

- `idISBCWEBSERVICE` (Boolean) — Expose as Web Service. Default: `false`
- `WEBSERVICE_PROTOCOL` (Combo) — Web Service Protocol. Default: `SOAP`. Values: SOAP Protocol, REST Protocol [hidden]
- `ExposeUsingNativeSoapSupport` (Combo) — Use Native Soap. Default: `UMPV`. Values: Yes, No, Use Environment property value [hidden]
- `GENERATE_OPEN_API` (Combo) — Generate OpenAPI interface. Generate OpenAPI documentation (default.yaml) for procedures, business components and dataproviders exposed as REST web services.. Default: `Yes`. Values: Yes, No, Use Environment property value [hidden]
- `GENERATE_ODATA_API` (Combo) — Generate OData interface. Generate OData interface & metadata for  business components and dataproviders exposed as web services.. Default: `No`. Values: Yes, No, Use Environment property value [hidden]

#### External Usage

- `WS_View` (Boolean) — Display. Default: `true`
- `WS_Insert` (Boolean) — Insert. Default: `true`
- `WS_Update` (Boolean) — Update. Default: `true`
- `WS_Delete` (Boolean) — Delete. Default: `true`
#### Java specific

- `idISBCEJB` (Boolean) — Expose as Enterprise Java Bean. Default: `false` [hidden]

##### EJB specific

- `idTRN_Type` (Combo) — Transaction Type. Default: `idTRN_Type_CONTAINER`. Values: Container, Object [hidden]
- `idTRN_Attribute` (Combo) — Transaction Attribute. Default: `idTRN_Attribute_REQUIRED`. Values: Required, Requires New, Supports, Mandatory, Not Supported, Never [hidden]

###### Session Bean specific

- `idJNDI_Name` (Text) — JNDI Name [hidden]
###### Message Bean specific

- `idDEST_Type` (Combo) — Destination Type. Default: `idDEST_Type_QUEUE`. Values: Queue, Topic [hidden]
- `idCON_FACTORY_JNDI_Name` (Text) — Connection Factory JNDI Name [hidden]
- `idDEST_JNDI_Name` (Text) — Destination JNDI Name [hidden]
## Main object properties

- `AppTitle` (Text) — Application title [hidden]
- `GenerateCSS` (Boolean) — Generate minimal CSS. Generate CSS stripping Theme Classes that are not used. Default: `false` [hidden]
- `AppIcon` (Text) — Application icon [hidden]
- `AppLocation` (Text) — Location [hidden]
- `AppGenerator` (Custom) — Generator [hidden]
## Observability

- `OBSERVABILITY_GEN_SPAN` (Combo) — Generate Observability span. Generate OpenTelemetry span.. Default: `NO`. Values: Yes, No
## Web Transaction

- `Theme` (Custom) — Theme
- `idFormLayout` (Combo) — Form Layout. Specifies the form template used to generate default form.. Values: FlatTemplate, UnanimoTemplate, CarmineTemplate, FioriTemplate
- `WEB_COMP` (Combo) — Type. Web Panel Type. Default: `No`. Values: Component, Web Page, Master Page
- `URLAccess` (Combo) — URL access. Object can be accessed through the URL. Default: `No`. Values: Yes, No [hidden]
- `MasterPage` (Custom) — Master Page. The Master Page containing this object
- `SHOWMASTERPAGE_POPUP` (Boolean) — Show Master Page when Pop-up
- `OnSessionTimeout` (Combo) — On session timeout. Action to perform on session timeout. Default: `Ignore`. Values: Ignore, Warn

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
## Data

- `idIsDynTrn` (Boolean) — Is Dynamic Transaction. Data Provider. Default: `false`
- `idDynTrnDP` (Custom) — DynTrn Data Provider. Defines the data provider used for this dynamic transaction [hidden]
- `idDynTrnExecTime` (Combo) — Used to. Choose between Populate data and Retrieve data. Default: `idDynTrnExecTime_CREATION`. Values: Populate data, Retrieve data [hidden]
- `idDynTrnUpdatePolicy` (Combo) — Update Policy. Choose between Updatable and Read Only. Default: `idDynTrnUpdatePolicy_UPDATABLE`. Values: Updatable, Read Only
## Data warehousing

- `IsDwhTrn` (Boolean) — DW transaction. Default: `false`
- `DwhTrnType` (Combo) — DW transaction type. Default: `DIMENSION`. Values: Measure, Dimension, Does not apply [hidden]
## Privacy

- `ObjAlreadyPrivate` (Boolean) — Was private object. Default: `false` [hidden]
- `ObjIsPrivate` (Boolean) — Private object. Default: `false` [hidden]
- `ObjCopyright` (Text) — Copyright [hidden]
- `ObjBuyer` (Text) — Buyer [hidden]
- `ObjPurpose` (Text) — Purpose [hidden]
## Caching

- `DKL_CACHE_PRIORITY` (Combo Int) — Cache Priority. Default: `2`. Values: Low, Normal, High, Not Removable
- `DKL_CACHE_FREQUENCY` (Combo Int) — Data Change Frequency. Default: `1`. Values: Pretty Often, Time To Time, Hardly Ever, Almost Never
## Authorization

- `DKL_PERMISSION_BASE_ID` (Integer) — Parmission Base Id. Default: `2001`
- `DKL_ROLES` (Text) — Security. Security Roles [hidden]
## Transaction integrity

- `TRNEND` (Combo) — Commit on exit. Default: `Yes`. Values: Yes, No
## User interface

- `CFMTRN` (Combo) — Confirm Transactions. Default: `No`. Values: No, Yes
- `TRNCFM` (Combo) — Confirmation. In transactions, it indicates whether or not the user's confirmation will be requested when passing from one level to another.
		  In procedures, it indicates whether or not the user's confirmation will be requested when the process starts executing.. Default: `None`. Values: Use Environment property value, Always prompt, Never prompt, Do not prompt on first level
- `CONFIRM` (Combo) — Compatibility confirmation. Set confirmation option. Default: `Yes`. Values: Yes, No, Use Environment property value [hidden]
- `FIELD_TO_FIELD` (Combo) — Client side validation. Default: `Yes`. Values: Yes, No, Use Environment property value

### Web interface

- `WebUX` (Combo) — Web User Experience. Web user experience. Values: Smooth, Previous versions compatible
- `WebFormDefaults` (Combo Int) — WebFormDefaults. Indicates if GeneXus must use a responsive web design to generate default forms or the 'old' way.. Default: `0`. Values: Responsive Web Design, Previous versions compatible

#### Datepicker

- `idUSE_WEB_DATEPICKER` (Combo) — Enable Datepicker. Enable datepicker calendar generation. Default: `Yes`. Values: Yes, No, Use Environment property value
- `WNUM_DATEPICKER` (Combo) — Show week numbers. Show calendar week numbers. Default: `No`. Values: Yes, No, Use Environment property value
- `FIRST_WD_DATEPICKER` (Combo) — First day of week. Select first day of week for calendar. Default: `Sunday`. Values: Sunday, Monday, Use Environment property value
### Key configuration

#### Key assignment

- `ASSIGNED_FNC_KEYS` (Combo) — Assign Function Keys to Standard Events. Default: `No`. Values: Yes, No, Use Environment property value
- `KEY_HELP` (Combo) — Help key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_CHECK` (Combo) — Check key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_EXIT` (Combo) — Exit key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_PROMPT` (Combo) — Prompt key. Default: `4`. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_REFRESH` (Combo) — Refresh key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_INSERT` (Combo) — Insert key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_PREVIOUS` (Combo) — Previous record key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_NEXT` (Combo) — Next record key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_RETRIEVE` (Combo) — Retrieve key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_MENU` (Combo) — Menu key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_UPDATE` (Combo) — Update key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_CANCEL` (Combo) — Cancel key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_DELETE` (Combo) — Delete key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_DISPLAY` (Combo) — Display key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_SELECT` (Combo) — Select key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_FIRST` (Combo) — First record key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_LAST` (Combo) — Last record key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_ENTER` (Combo) — Enter key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
- `KEY_MOREKEYS` (Combo) — More keys key. Values: None, Disabled, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13 (Shift-F1), F14 (Shift-F2), F15 (Shift-F3), F16 (Shift-F4), F17 (Shift-F5), F18 (Shift-F6), F19 (Shift-F7), F20 (Shift-F8), F21 (Shift-F9), F22 (Shift-F10), F23 (Shift-F11), F24 (Shift-F12), Use Environment property value [hidden]
### Windows interface

- `MENUBAR` (Custom) — Menubar
- `BORSTY` (Combo) — Border style. Default: `2`. Values: Sizable, None, Fixed Single, Fixed Dialog
- `MAXBUT` (Combo) — Maximize button. Default: `YES`. Values: Yes, No
- `MINBUT` (Combo) — Minimize button. Default: `YES`. Values: Yes, No
- `S_TASK` (Combo) — Show in taskBar (SDI). Default: `YES`. Values: Yes, No
- `ICON` (Text) — Form icon
- `CTRBOX` (Combo) — Control box. Default: `YES`. Values: Yes, No
- `MODAL` (Combo) — Modal dialog. Default: `PARM`. Values: Yes if parameters specified, Yes, No
- `SHOW_FRM` (Combo) — Show form. Default: `BEFORE`. Values: Use Environment property value, Before Start Event, After Start Event
- `AUTOSCROLL_FORM` (Combo) — Scrollable form. Default: `No`. Values: Use Environment property value, No, Auto
- `ADD_BUTTON` (Custom) — Add button bitmap
- `UPD_BUTTON` (Custom) — Update button bitmap
- `CNF_BUTTON` (Custom) — Confirm button bitmap
- `DLT_BUTTON` (Custom) — Delete button bitmap
- `AUTOCENTER` (Combo) — Autocenter objects in (0,0). Default: `No`. Values: Use Environment property value, No, Yes
### Character interface

- `WNDPOP` (Combo) — Generate as a Popup window. Default: `NO`. Values: No, Yes, automatic border, Yes, user defined border

#### Automatic border

- `WBCOLOR` (Combo) — Color. Default: `none`. Values: Default to color rule, White, Red, Green, Yellow, Blue, Cyan, Magenta
- `WBATTR` (Combo) — Display attribute. Default: `none`. Values: Default to color rule, Reverse Image, High, Blinking, No Display
- `WBCHAR` (Text) — Characters
## Warning messages

- `SPC_WARNINGS_DISABLED` (Text) — Disabled warnings. Type a space separated list of warning message codes you want to be disabled.
## Compatibility

- `STD_FUNC_OBJECT` (Combo) — Standard Functions. Standard functions checking. Default: `UMPV`. Values: Use Environment property value, Only standard functions, Allow non-standard functions
- `INITIALIZE_NEW` (Combo) — Initialize not referenced attributes. Default: `Yes`. Values: Yes, No, Use Environment property value
- `NULLVALUE_AS_NULL` (Combo) — Generate null for nullvalue(). Default: `idNULLVALUE_AS_NULL_No`. Values: No, Yes, Use Environment property value
## iSeries specific

- `TRNCMT` (Combo) — Commitment. Default: `YES`. Values: Enabled, Disabled [hidden]
- `GENERATE_ILE` (Combo) — Generate ILE RPG for iSeries. Default: `No`. Values: Use Environment property value, No, Yes [hidden]

### User interface

- `BEEPONERROR` (Combo) — Beep on errors. Default: `No`. Values: Use Environment property value, No, Yes [hidden]
- `BEEPONMSG` (Combo) — Beep on messages. Default: `No`. Values: Use Environment property value, No, Yes [hidden]
- `AUTOENTER` (Combo) — Automatic enter. Default: `No`. Values: Use Environment property value, No, Yes [hidden]
## Client/Server specific

### Optimization

#### Hints

- `Hint_firstrows` (Combo) — Fast first rows. Default: `Yes`. Values: Yes, No, Use Environment property value [hidden]
#### Oracle specific

- `CS_ORA_FORUPD` (Combo) — Generate FOR UPDATE clause. Default: `Yes`. Values: Use Environment property value, Yes, No [hidden]
## Multi tier generation

- `MTIER_OPT` (Combo) — Optimize for multi tier execution. In 3 tiers application by default all the rules of the transactions are executed at the server. But the transaction may have certain rule that generates some type of user interface (for example that it calls a work panel or a screen report).  In this case it can't be executed at the server and this property allows to execute it at the client.
				  Yes: All the rules of the transaction are triggered at the server
				  No: All is triggered at the client, including the code that access the database. Default: `Yes`. Values: Yes, No
## Full text search options

- `SEARCHABLE` (Combo) — Searchable. Values: True, False, Use Environment property value
- `SEARCH_VIEWER` (Custom) — Search viewer
- `LUCENE_INDEX_DIRECTORY` (Text) — Index directory. Default: `LuceneIndex` [hidden]
## Miscellaneous

- `OBJ_IS_INTERFACE` (Boolean) — OBJ_IS_INTERFACE. Default: `false` [hidden]
- `GenerateObject` (Boolean) — GenerateObject. Allows to enable or disable the object specification and generation.. Default: `true`
