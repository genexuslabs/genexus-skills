# EXOPROP Properties

## (root)

- `ExoPropAccessType` (Combo) — Property Type. Default: `idGetSet`. Values: Read/Write, Read, Write, Member
- `ExoTypeRef` (Integer) — ExternalObjectType [hidden]
- `IntName` (Text) — Internal Name
- `ExoItemDesc` (Text) — Description
- `ExoItemType` (Custom) — Type
- `ExoItemLength` (Integer) — Length. Default: `8` [hidden]
- `ExoItemDecimals` (Integer) — Decimals [hidden]
- `ExoItemSigned` (Boolean) — Signed [hidden]
- `ExoItemIsCollection` (Boolean) — Collection [hidden]
- `ExoItemCollectionItemName` (Text) — Collection Item Name
- `ExoItemBasedOn` (Custom) — Based on
- `ExoMethodIsFactory` (Boolean) — Is Factory [hidden]
- `ExoMethodIsStatic` (Boolean) — Is Static [hidden]
- `ExoExternalMember` (Combo) — External Member Type. Default: `idExoExternalMemberDefault`. Values: Default, Static, Instance [hidden]
- `DataTypeString` (Text) — DataTypeString [hidden]
- `UserMode` (Integer) — UserMode. Default: `1` [hidden]
- `IsEnumerated` (Boolean) — BasedOnEnumerated [hidden]
- `IDEnumDefinedValues` (Custom) — EnumValues [hidden]

## Control Info

- `ControlType` (Combo Int) — ControlType. Default: `2`. Values: Combo Box, Radio Button, Edit, Check Box, Dynamic Combo Box, List Box, Dynamic List Box, Image
- `IsUserControl` (Boolean) — IsUserControl [hidden]
- `IsUserControlWithFixedValues` (Boolean) — IsUserControlWithFixedValue [hidden]
- `IsUserControlWithDynamicValues` (Boolean) — IsUserControlWithDynamicValue [hidden]
- `IsUserControlWithCustomValues` (Boolean) — IsUserControlWithCustomValues [hidden]
- `InputType` (Combo Int) — InputType. Enter and show data as values or as descriptions. Default: `0`. Values: Values, Descriptions [hidden]
- `DataSourceFrom` (Combo) — Data Source From. Indicates where the data used to fill the control is loaded from.. Default: `Values`. Values: Values, Attributes, Data Provider [hidden]
- `DataSourceFromEdit` (Combo) — Data Source From Edit. Indicates where the data used to fill the control is loaded from.. Default: `Attributes`. Values: Attributes, Data Provider [hidden]
- `DataProvider` (Custom) — Data Provider. Data Provider object used to load data for the control. [hidden]
- `DataProviderEdit` (Custom) — Data Provider Edit. Data Provider object used to load data for the control. [hidden]
- `DataProviderParameters` (Custom) — Parameters. Allows specifying the list of parameters used to invoked the Data Provider. [hidden]
- `DataProviderParametersEdit` (Custom) — Parameters Edit. Allows specifying the list of parameters used to invoked the Data Provider. [hidden]
- `ControlValues` (Custom) — Values [hidden]
- `ControlItemValues` (Custom) — ItemValues. Load Values from this attribute [hidden]
- `DPItemValuesFieldSpecifier` (Text) — ItemValues Data Provider. Load Values from dataprovider using this field specifier [hidden]
- `DPItemValuesFieldSpecifierEdit` (Text) — ItemValues Data Provider Edit. Load Values from dataprovider using this field specifier [hidden]
- `DPItemDescriptionFieldSpecifier` (Text) — ItemDescriptions Data Provider. Load Descriptions from dataprovider using this field specifier [hidden]
- `DPItemDescriptionFieldSpecifierEdit` (Text) — ItemDescriptions Data Provider Edit. Load Descriptions from dataprovider using this field specifier [hidden]
- `ControlItemDescription` (Custom) — ItemDescriptions. Load Descriptions from this attribute [hidden]
- `EditAutocomplete` (Combo Int) — Suggest. Offer suggestions while editing. Default: `0`. Values: No, OnRequest, Incremental [hidden]
- `GetDescriptionByKeyProcedure` (Custom) — GetDescriptionByKey Procedure. Procedure that returns the description of a given value [hidden]
- `GetDescriptionByKeyProcedureParameters` (Custom) — GetDescriptionByKey Procedure Parameters. Additional parameters to be added before the description and value parameters [hidden]
- `MaxItems` (Integer) — SuggestMaxItems. Maximum number of items in the suggestion list. Default: `5` [hidden]
- `ControlSortDescription` (Boolean) — SortDescriptions. Default: `true` [hidden]
- `CaseSensitive` (Boolean) — CaseSensitive. Whether to consider case when filtering suggestions. Default: `false` [hidden]
- `ControlDirection` (Combo Int) — RadioDirection. Default: `1`. Values: Horizontal, Vertical [hidden]
- `ControlTitle` (Text) — ControlTitle [hidden]
- `ControlCheckValue` (Text) — CheckedValue [hidden]
- `ControlUnCheckValue` (Text) — UncheckedValue [hidden]
- `ControlWhere` (Custom) — Conditions. Filter conditions [hidden]
- `ControlRestrictedBy` (Custom) — InstantiatedAttributes. Additional restrictions by instantiated attributes list [hidden]
- `count` (Integer) — Count [hidden]
- `AddEmptyItem` (Boolean) — EmptyItem. Adds an item for 'none/all' selection. Default: `false` [hidden]
- `EmptyItemText` (Text) — EmptyItemText. Text associated with the empty item. Default: `GX_EmptyItemText` [hidden]
- `AutoCorrection` (Boolean) — Auto correction. Default: `true` [hidden]
- `AutoCapitalization` (Combo) — Auto capitalization. Default: `FirstWord`. Values: None, First word, First letter of each word [hidden]

### Virtual Keyboard

- `idEnterKeyCaption` (Combo) — EnterKeyCaption. Caption of the enter key.. Default: `Default`. Values: Default, Go, Search, Send, Join [hidden]
- `idEnterEvent` (Custom) — EnterEvent. Action to make when user press enter key.. Default: `<Platform Default>` [hidden]
- `idDisplaysKeyboardOnFocus` (Boolean) — DisplaysKeyboardOnFocus. Allows displaying or hiding the virtual keyboard when the field is focused.. Default: `true` [hidden]
## XML Information

- `ExoName` (Text) — XML Name [hidden]
- `ExoNamespace` (Text) — XML Namespace [hidden]
- `ExoItemExtType` (Text) — Soap Type [hidden]
- `ExoItemWRAPPEDCOLLECTION` (Combo) — Collection Serialization. Default: `idXmlCollectionWrapped`. Values: Wrapped, Sequence [hidden]
## .NET Framework Information

- `ExoNameCSHARP` (Text) — .Net External Name [hidden]
- `ExoItemExtTypeCSHARP` (Text) — .Net External Type [hidden]
## .NET Information

- `ExoNameNETCORE` (Text) — .Net Core External Name [hidden]
- `ExoItemExtTypeNETCORE` (Text) — .Net Core External Type [hidden]
## Java Information

- `ExoNameJAVA` (Text) — Java External Name [hidden]
- `ExoItemExtTypeJAVA` (Text) — Java External Type [hidden]
- `ExternalSetMethodJAVA` (Text) — Java External Set Method [hidden]
- `ExternalGetMethodJAVA` (Text) — Java External Get Method [hidden]
## Ruby Information

- `ExoNameRuby` (Text) — Ruby External Name [hidden]
- `ExoItemExtTypeRuby` (Text) — Ruby External Type [hidden]
## iOS Information

- `ExoNameIOS` (Text) — iOS External Name [hidden]
- `ExoItemExtTypeIOS` (Text) — iOS External Type [hidden]
## Android Information

- `ExoNameANDROID` (Text) — Android External Name [hidden]
- `ExoItemExtTypeANDROID` (Text) — Android External Type [hidden]
- `ExternalSetMethodANDROID` (Text) — Android External Set Method [hidden]
- `ExternalGetMethodANDROID` (Text) — Android External Get Method [hidden]
## Javascript Information

- `ExoNameJS` (Text) — Javascript External Name [hidden]
## Javascript Module Information

- `ExoExtNameJSModule` (Text) — Javascript External Name. Method name [hidden]
