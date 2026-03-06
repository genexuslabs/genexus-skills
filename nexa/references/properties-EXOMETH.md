# EXOMETH Properties

## (root)

- `IntName` (Text) — Internal Name
- `ExoItemDesc` (Text) — Description
- `ExoItemType` (Custom) — Type
- `ExoItemLength` (Integer) — Length. Default: `8` [hidden]
- `ExoItemDecimals` (Integer) — Decimals [hidden]
- `ExoItemSigned` (Boolean) — Signed [hidden]
- `ExoItemIsCollection` (Boolean) — Collection [hidden]
- `ExoItemBasedOn` (Custom) — Based on
- `ExoTypeRef` (Integer) — ExternalObjectType [hidden]
- `DataTypeString` (Text) — DataTypeString [hidden]
- `ExoItemExtTypeBeanJAVA` (Text) — External Type [hidden]
- `ExoMethodProtocol` (Combo) — Protocol. Default: `idSoap11`. Values: SOAP 1.1, SOAP 1.2 [hidden]
- `ExoMethodStyle` (Combo) — Style. Default: `idDocument`. Values: Document, RPC [hidden]
- `ExoMethodInputUse` (Combo) — Use. Default: `idLiteral`. Values: Literal, Encoded [hidden]
- `ExoMethodParametersStyle` (Combo) — Parameters Style. Indicates the structure of the method's SOAP message. A bare message does not contain any additional wrapper elements or namespaces, and contains only the SOAP envelope and body. A wrapped message contains additional wrapper elements that are used to define the structure and format of the data. Default: `idWrapped`. Values: Wrapped, Bare [hidden]
- `ExoMethodMtom` (Boolean) — EnableMTOM. Default: `false` [hidden]
- `ExoMethodAddress` (Text) — Address [hidden]
- `ExoMethodPortTypeName` (Text) — PortTypeName [hidden]
- `ExoMethodPortTypeNamespace` (Text) — PortTypeNamespace [hidden]
- `ExoMethodAction` (Text) — Action [hidden]
- `ExoName` (Text) — XML Name
- `ExoMethodRequestNamespace` (Text) — Request Namespace [hidden]
- `ExoMethodResponseElementName` (Text) — Response XML Name [hidden]
- `ExoMethodResponseNamespace` (Text) — Response Namespace [hidden]
- `ExoMethodExternalName` (Text) — External Name [hidden]
- `ExoMethodIsFactory` (Boolean) — Is Factory [hidden]
- `ExoMethodIsStatic` (Boolean) — Is Static [hidden]
- `ExoExternalMember` (Combo) — External Member Type. Default: `idExoExternalMemberDefault`. Values: Default, Static, Instance [hidden]

## .NET Framework Information

- `ExoNameCSHARP` (Text) — .Net External Name [hidden]
- `ExoItemExtTypeCSHARP` (Text) — .Net External Type [hidden]
## .NET Information

- `ExoNameNETCORE` (Text) — .Net Core External Name [hidden]
- `ExoItemExtTypeNETCORE` (Text) — .Net Core External Type [hidden]
## Java Information

- `ExoNameJAVA` (Text) — Java External Name [hidden]
- `ExoItemExtTypeJAVA` (Text) — Java External Type [hidden]
- `ExoMethodThrows` (Combo) — Java Method Throws Exceptions. Default: `NO`. Values: No, Yes [hidden]
## Ruby Information

- `ExoNameRuby` (Text) — Ruby External Name [hidden]
- `ExoItemExtTypeRuby` (Text) — Ruby External Type [hidden]
## iOS Information

- `ExoNameIOS` (Text) — iOS External Name [hidden]
- `ExoItemExtTypeIOS` (Text) — iOS External Type [hidden]
## Android Information

- `ExoNameANDROID` (Text) — Android External Name [hidden]
- `ExoItemExtTypeANDROID` (Text) — Android External Type [hidden]
## Javascript Information

- `ExoNameJS` (Text) — Javascript External Name [hidden]
## Javascript Module Information

- `ExoExtNameJSModule` (Text) — Javascript External Name. Method name [hidden]
- `ExoMemberJsModulePath` (Text) — Javascript Module Path. The module to import from. This is often a relative or absolute path name to the .js file containing the module. [hidden]
- `ExoAsyncJSModule` (Boolean) — Should Await For Completion. Set to true if the function implementation returns a promise that require awaiting for completion. [hidden]
## XML Return Element Info

- `ExoMethodReturnParmName` (Text) — XML Return Element Name [hidden]
- `ExoMethodReturnParmNamespace` (Text) — XML Return Element Namespace [hidden]
- `ExoItemExtType` (Text) — Soap Type [hidden]
- `ExoItemWRAPPEDCOLLECTION` (Combo) — Collection Serialization. Default: `idXmlCollectionWrapped`. Values: Wrapped, Sequence [hidden]
- `ExoItemCollectionItemName` (Text) — Collection Item Name [hidden]
