# PRC Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `ObjId` (Integer) — ObjId [hidden]
- `ObjIsStyle` (Boolean) — IsStyle. Default: `false` [hidden]
- `Folder` (Custom) — Folder
- `sessiontype` (Combo) — Session Type. Default: `RW`. Values: Read Only, Read Write, None
- `IsMain` (Boolean) — Main program. To specify that the object is main. That is: it can be executed as standalone application.. Default: `false`
- `Signatures` (Text) — Signatures [hidden]
- `PublicMethods` (Text) — Public Methods [hidden]
- `CALL_PROTOCOL` (Combo) — Call protocol. Define how the object is invoked, and its output.. Default: `INTERNAL`. Values: Internal, HTTP, Command Line, SOAP, Enterprise Java Bean
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
- `DKL_REF_BY_CANDIDATE` (Boolean) — Reference By Candidate Key. Default: `false`
- `DKL_VERSION` (Integer) — DKL_VERSION. Default: `2100` [hidden]
- `DKL_DATASET_TOUSE` (Text) — DKL_DATASET_TOUSE
- `DKL_READ_UNCOMMITED_DP` (Combo) — Read Uncommited For DataProvider. Use Read Uncommited for SELECT statements. Default: `No`. Values: Yes, No, Use Environment property value
- `DKL_ACTIONS` (Text) — DKL_ACTIONS [hidden]
- `Theme` (Custom) — Theme [hidden]
- `EXECUTE_IN_NEW_UTL` (Boolean) — Execute in new LUW. Indicates whether the procedure will be run in a new LUW (Logic Unit of Work) or not. As a result, the called procedure and everything called by it will be executed in an LUW that is independent from the caller object's LUW. Also, when a Commit or Rollback of this LUW is performed, there will be no Commit or Rollback of the caller object's LUW. Default: `false`

## Web information

- `COMPRESS_HTML` (Combo) — Auto compress http traffic. Default: `Yes`. Values: Yes, No, Use Environment property value [hidden]
- `HTTP_STREAMING_SUPPORT` (Combo) — Buffer Response.  Allows to avoid buffering the response so that the client can act on partial responses as quick as possible.

			Platform Default: The response is buffered or not depending on the target platform
			Disabled: The program avoids buffering and flushes every string to the response. Default: `Off`. Values: Platform Default, Disabled [hidden]

### Security

- `USE_ENCRYPTION` (Combo) — Encrypt URL parameters. To either allow or deny the encryption of the parameters sent to an URL, and to establish levels of security when the encryption of the parameters is used between Web Objects.
		Values:
			No			-> Indicates that the parameters in the Web objects URL will not be encrypted.This is the default value.
			Session Key	-> Indicates that the parameters in the URL will be encrypted using a different key for each session.The encryption is made using local cookies.This value offers a higher level of security, but it does not allow shared URLs.This means that user X cannot send a URL with parameters to user Y because, in this case, the URL will not work, since the corresponding cookie is required for decryption.
			Site Key	-> Parameters in the Web objects URL are encrypted, but the encryption key will be the same for the whole site.In this case, cookies are not used.This implies a lower level of security, but makes links transfers easier.. Default: `NO`. Values: Use Environment property value, No, Session key, Site key [hidden]
- `HTTP_PROTOCOL` (Combo) — Protocol specification. The protocol used for services and absolute urls.
		Values:

			Secure (HTTPS) -> Forces the generation of HTTPS as protocol. HTTP indicates that the protocol to use will be Secure Hypertext Transfer Protocol.
			Unsecure(HTTP) -> Forces the generation of HTTP as protocol.HTTP indicates that the protocol to use will be Hypertext Transfer Protocol.
			Do not Specify -> No protocol is specified, the actual protocol is used.. Default: `Unsecure`. Values: Use Environment property value, Unsecure (HTTP:), Secure (HTTPS:), Do not specify [hidden]
- `WEB_SECURITY_LEVEL` (Combo) — Web Security Level. Default: `High`. Values: Use Environment property value, High, Medium [hidden]
## Main object properties

- `AppTitle` (Text) — Application title [hidden]
- `AppIcon` (Text) — Application icon [hidden]
- `AppLocation` (Text) — Location [hidden]
- `AppGenerator` (Custom) — Generator [hidden]
## Interoperability

- `SOAP_NAMESPACE` (Text) — Exposed namespace [hidden]
- `IS_CS_SCRIPT` (Combo) — Expose as Client Side Script. Default: `No`. Values: Yes, No [hidden]
- `idENABLEMTOM` (Boolean) — EnableMTOM. Enable Mtom allows to send the blobs data as an attachment instead of sent it inline as part of the SOAP message body.. Default: `false` [hidden]
- `idMTOMTHRESHOLD` (Integer) — MTOM Threshold. You can set the Mtom threshold to specify when the xs:binary64 data is sent inline or as an attachment. By default, the Mtom threshold is 0 bytes, that means all xs:binary64 data is sent as an attachment.  If a message is greater than or equal the value of this property, it will be sent the xs:binary64 data as an attachment. Otherwise, the content will be sent inline, as part of the SOAP message body.. Default: `0` [hidden]
- `idISPRCWEBSERVICE` (Boolean) — Expose as Web Service. Default: `false`

### Web Service Protocol

- `SOAP` (Boolean) — SOAP Protocol. Default: `true` [hidden]
- `ExposeUsingNativeSoapSupport` (Combo) — Use Native Soap. Default: `UMPV`. Values: Yes, No, Use Environment property value [hidden]
- `SOAPAction` (Text) — SOAP Action. Determines the SOAP action of the web service method. [hidden]
- `REST` (Boolean) — REST Protocol. Default: `true` [hidden]
- `GENERATE_OPEN_API` (Combo) — Generate OpenAPI interface. Generate OpenAPI documentation (default.yaml) for procedures, business components and dataproviders exposed as REST web services.. Default: `Yes`. Values: Yes, No, Use Environment property value [hidden]
### Java specific

- `idISBCEJB` (Boolean) — Expose as Enterprise Java Bean. Default: `false` [hidden]

#### EJB specific

- `idTRN_Type` (Combo) — Transaction Type. Default: `idTRN_Type_CONTAINER`. Values: Container, Object [hidden]
- `idTRN_Attribute` (Combo) — Transaction Attribute. Default: `idTRN_Attribute_REQUIRED`. Values: Required, Requires New, Supports, Mandatory, Not Supported, Never [hidden]

##### Session Bean specific

- `idJNDI_Name` (Text) — JNDI Name [hidden]
##### Message Bean specific

- `idDEST_Type` (Combo) — Destination Type. Default: `idDEST_Type_QUEUE`. Values: Queue, Topic [hidden]
- `idCON_FACTORY_JNDI_Name` (Text) — Connection Factory JNDI Name [hidden]
- `idDEST_JNDI_Name` (Text) — Destination JNDI Name [hidden]
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
## Privacy

- `ObjAlreadyPrivate` (Boolean) — Was private object. Default: `false` [hidden]
- `ObjIsPrivate` (Boolean) — Private object. Default: `false` [hidden]
- `ObjCopyright` (Text) — Copyright [hidden]
- `ObjBuyer` (Text) — Buyer [hidden]
- `ObjPurpose` (Text) — Purpose [hidden]
## Authorization

- `DKL_PERMISSION_BASE_ID` (Integer) — Parmission Base Id. Default: `2001`
- `DKL_ROLES` (Text) — Security. Security Roles [hidden]
## Observability

- `OBSERVABILITY_GEN_SPAN` (Combo) — Generate Observability span. Generate OpenTelemetry span.. Default: `NO`. Values: Yes, No
## Reporting Options

- `OUTPUT` (Combo) — Report output. Values: Ask User, Only To Screen, Only To Printer, Only To File
- `OUTPUT_DEV_LOC` (Combo) — Output device location. Default: `SERVER`. Values: Server, Client [hidden]
- `PRINT_CUST_LAYOUT` (Combo) — Customizable Layout. Default: `No`. Values: Yes, No, Use Environment property value
- `TRNCFM` (Combo) — Confirmation. In transactions, it indicates whether or not the user's confirmation will be requested when passing from one level to another.
		  In procedures, it indicates whether or not the user's confirmation will be requested when the process starts executing.. Default: `None`. Values: Use Environment property value, Always prompt, Never prompt, Do not prompt on first level
- `CONFIRM` (Combo) — Compatibility confirmation. Set confirmation option. Default: `Yes`. Values: Yes, No, Use Environment property value [hidden]
- `CANCEL` (Combo) — Allow user to cancel processing. Default: `YES`. Values: Yes, No
- `LSTPFOOT` (Combo) — Footer on last page. Default: `YES`. Values: Yes, No
- `AUTOCENTER` (Combo) — Autocenter objects in (0,0). Default: `No`. Values: Use Environment property value, No, Yes
- `SOAP_CANCELERROR` (Combo) — Cancel caller execution on error. Default: `YES`. Values: Yes, No [hidden]
## Transaction integrity

- `TRNEND` (Combo) — Commit on exit. Default: `Yes`. Values: Yes, No
## Warning messages

- `SPC_WARNINGS_DISABLED` (Text) — Disabled warnings. Type a space separated list of warning message codes you want to be disabled.
## Compatibility

- `STD_FUNC_OBJECT` (Combo) — Standard Functions. Standard functions checking. Default: `UMPV`. Values: Use Environment property value, Only standard functions, Allow non-standard functions
- `INITIALIZE_NEW` (Combo) — Initialize not referenced attributes. Default: `Yes`. Values: Yes, No, Use Environment property value
- `NULLVALUE_AS_NULL` (Combo) — Generate null for nullvalue(). Default: `idNULLVALUE_AS_NULL_No`. Values: No, Yes, Use Environment property value
## iSeries specific

- `TRNCMT` (Combo) — Commitment. Default: `YES`. Values: Enabled, Disabled
- `PRT_DDS` (Combo) — Print using DDSs. Default: `No`. Values: Use Environment property value, No, Yes
- `GENERATE_ILE` (Combo) — Generate ILE RPG for iSeries. Default: `No`. Values: Use Environment property value, No, Yes

### User interface

- `BEEPONMSG` (Combo) — Beep on messages. Default: `No`. Values: Use Environment property value, No, Yes
## Client/Server specific

- `DBMS_JOINS` (Combo) — Join management. Default: `Yes`. Values: Use Environment property value, Join tables on the server, Join tables on the client
- `JOIN_TYPE` (Combo) — Join type. Default: `Default`. Values: Use Environment property value, Use default for server, Natural join, Outer join

### Optimization

- `Optimize_copy` (Combo) — Copy table groups. Default: `IfNoUniqueIndex`. Values: If no unique index, Always, Never, Use Environment property value

#### Oracle

- `CS_ORA_FORUPD` (Combo) — Generate FOR UPDATE clause. Default: `Yes`. Values: Use Environment property value, Yes, No
## Miscellaneous

- `OBJ_IS_INTERFACE` (Boolean) — OBJ_IS_INTERFACE. Default: `false` [hidden]
- `GenerateObject` (Boolean) — GenerateObject. Allows to enable or disable the object specification and generation.. Default: `true`
