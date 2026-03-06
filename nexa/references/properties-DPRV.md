# DPRV Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `idDynTrnTRN` (Custom) — DynTrn Transaction. Defines the dynamic transaction that defines this data provider [hidden]
- `idIsDynTrnDP` (Boolean) — Is Dynamic Transaction DataProvider. Default: `false` [hidden]
- `idISWEBSERVICE` (Boolean) — Expose as Web Service. Default: `false`
- `DPRV_WSPROTOCOL` (Combo) — Web Service Protocol. Default: `SOAP`. Values: SOAP Protocol, REST Protocol [hidden]
- `GENERATE_OPEN_API` (Combo) — Generate OpenAPI interface. Generate OpenAPI documentation (default.yaml) for procedures, business components and dataproviders exposed as REST web services.. Default: `Yes`. Values: Yes, No, Use Environment property value [hidden]
- `GENERATE_ODATA_API` (Combo) — Generate OData interface. Generate OData interface & metadata for  business components and dataproviders exposed as web services.. Default: `No`. Values: Yes, No, Use Environment property value [hidden]
- `idDPRV_ExposeUsingNativeSoapSupport` (Combo) — Use Native Soap. Default: `UMPV`. Values: Yes, No, Use Environment property value [hidden]
- `DPRV_SOAPAction` (Text) — SOAP Action. Determines the SOAP action of the web service method. [hidden]
- `idDRPV_SOAP_NAMESPACE` (Text) — Exposed namespace [hidden]
- `Theme` (Custom) — Theme [hidden]
- `IsMain` (Boolean) — Main program. To specify that the object is main. That is: it can be executed as standalone application.. Default: `false`
- `CALL_PROTOCOL` (Combo) — Call protocol. Define how the object is invoked, and its output.. Default: `INTERNAL`. Values: Internal, HTTP, Command Line, SOAP, Enterprise Java Bean
- `Signatures` (Text) — Signatures [hidden]
- `DEKLARIT_METADATA` (Text) — DeklaritMetadata [hidden]
- `OBJECT_METADATA` (Text) — ObjectMetadata [hidden]
- `DKL_COMMAND_TIMEOUT` (Integer) — Command Timeout. Default: `30`
- `DKL_READ_UNCOMMITED_DP` (Combo) — Use Read Uncommited. Use Read Uncommited for SELECT statements. Default: `No`. Values: Yes, No, Use Environment property value
- `DKL_IMAGE` (Text) — Medium Image [hidden]
- `DKL_SMALL_IMAGE` (Text) — Small Image [hidden]
- `DKL_BIG_IMAGE` (Text) — Big Image [hidden]

## Output

- `idINFER_SDT` (Combo) — Infer Structure. Default: `idINFER_STRUCTURE_NO`. Values: Yes, if SDT is dynamic, No
- `OutputSDT` (Custom) — Output. Type
- `OutputCollection` (Boolean) — Collection. Default: `false`
- `OutputCollectionName` (Text) — Collection Name [hidden]
## Network

- `idConnectivitySupport` (Combo) — Connectivity Support. Define if this object works even without network connectivity

		Values:

			Online  -> The object will execute on an online environment communicating with the server via REST services (default for  Main objects)
			Offline -> The object is executed completely offline with no automatic comunication to the server
			Inherit -> This value is only available for non-Main objects. The value of the property will be inherited from the caller object in runtime.. Default: `idOnline`. Values: Online, Offline, Inherit
## Observability

- `OBSERVABILITY_GEN_SPAN` (Combo) — Generate Observability span. Generate OpenTelemetry span.. Default: `NO`. Values: Yes, No
## Integrated Security

- `IntegratedSecurityLevel` (Combo) — Integrated Security Level. Values: None, Authentication, Authorization
- `IntegratedSecurityPermissionPrefix` (Text) — Permission Prefix
- `IntegratedSecurityObjClientID` (Text) — Security Client ID. This property identifies an SD application in GAM. The Client Id can be used by more than one SD application, note that to reuse the Client Id implies that just one application will exist in GAM. [hidden]
- `IntegratedSecurityObjClientSecret` (Text) — Security Client Secret. The Client Secret is a key used, in conjuntion with Client Id, to identify and to authorize an application when an user is authenticated. [hidden]
- `IntegratedSecurityObjClientEncriptionKey` (Text) — Security Client Encription Key [hidden]
## Privacy

- `ObjAlreadyPrivate` (Boolean) — Was private object. Default: `false` [hidden]
- `ObjIsPrivate` (Boolean) — Private object. Default: `false` [hidden]
- `ObjCopyright` (Text) — Copyright [hidden]
- `ObjBuyer` (Text) — Buyer [hidden]
- `ObjPurpose` (Text) — Purpose [hidden]
## Warning messages

- `SPC_WARNINGS_DISABLED` (Text) — Disabled warnings. Type a space separated list of warning message codes you want to be disabled.
## Miscellaneous

- `OBJ_IS_INTERFACE` (Boolean) — OBJ_IS_INTERFACE. Default: `false` [hidden]
- `GenerateObject` (Boolean) — GenerateObject. Allows to enable or disable the object specification and generation.. Default: `true`
## Caching

- `DKL_CACHE_PRIORITY` (Combo Int) — Cache Priority. Default: `2`. Values: Low, Normal, High, Not Removable
- `DKL_CACHE_FREQUENCY` (Combo Int) — Data Change Frequency. Default: `1`. Values: Pretty Often, Time To Time, Hardly Ever, Almost Never
## Authorization

- `DKL_PERMISSION_BASE_ID` (Integer) — Parmission Base Id. Default: `2001`
- `DKL_ROLES` (Text) — Security. Security Roles [hidden]
