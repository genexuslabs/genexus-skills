# ATT Properties

## (root)

- `AttName` (Text) — Name
- `AttDesc` (Text) — Description
- `HORIZONTAL_DESCRIPTION` (Text) — Title
- `VERTICAL_DESCRIPTION` (Text) — Column title
- `ContextualTitle` (Text) — ContextualTitle
- `ExternalName` (Text) — Exposed name [hidden]
- `ExternalNamespace` (Text) — Exposed namespace [hidden]
- `idATTFORMULA` (Custom) — Formula
- `idATTISFORMULA` (Boolean) — AttIsFormula. Attribute is formula. Default: `false` [hidden]
- `idIsSDControl` (Boolean) — IsSmartDeviceControl. Default: `false` [hidden]
- `AttriNum` (Integer) — Id. Default: `0` [hidden]
- `AttriClass` (Integer) — AttriClass. Default: `2` [hidden]
- `AttModelId` (Integer) — AttModelId. Default: `0` [hidden]
- `AttType` (Integer) — AttType [hidden]
- `IsEnumerated` (Boolean) — BasedOnEnumerated [hidden]
- `RowCount` (Integer) — RowCount [hidden]
- `ColCount` (Integer) — ColCount [hidden]
- `HelpKeyword` (Integer) — HelpKeyword [hidden]
- `IS_DESIGN` (Boolean) — Design. Default: `true` [hidden]
- `OBJ_TYPE` (Combo) — Object type. Default: `id_OTYPE_ATT`. Values: Attribute, Variable, Domain, SDTItem [hidden]
- `ALLOWNULL` (Boolean) — AllowNull. Default: `false`
- `EmptyAsNull` (Combo) — EmptyAsNull. Values: No Nulls, Empty as Null, Blank as Null, Compatible
- `id_ATT_EXTERNAL_STORAGE` (Boolean) — Use External Storage Provider. The Generator is set up to use an external storage provider, so blobs, images, audio and videos are stored there by default. Set this property to 'False' to store this attribute locally instead.. Default: `true` [hidden]
- `ATT_TIMESTAMP` (Text) — ATT_TIMESTAMP [hidden]
- `AttBaseClass` (Custom) — AttBaseClass [hidden]
- `ATTThemeClass` (Custom) — Class
- `idHELPSOURCE` (Custom) — Help. Help Source [hidden]
- `DEKLARIT_METADATA` (Text) — DeklaritMetadata [hidden]
- `OBJECT_METADATA` (Text) — ObjectMetadata [hidden]
- `DKL_RIGHT_TRIM` (Boolean) — Right Trim. Default: `false` [hidden]
- `DKL_ISROWGUID` (Boolean) — Is Row Guid. Unique identifier. Default: `false` [hidden]
- `DKL_ENABLE_ATT_AUTH` (Boolean) — Enable Authorization. Default: `false`
- `DKL_MIME_TYPE` (Text) — Mime Type [hidden]
- `DKL_ENCRYPTION` (Combo Int) — Encryption. Default: `0`. Values: None, Hashed, Encrypted [hidden]
- `DKL_CASING` (Combo Int) — Casing. Default: `0`. Values: Default, Lower Case, Upper Case, Proper Case, Sentence Case [hidden]
- `DKL_ISPASSWORD` (Boolean) — Is Password. Default: `false`

## EditFlags

- `AttEditNameProtected` (Boolean) — AttEditNameProtected [hidden]
- `IsStandardVariable` (Boolean) — IsStandardVariable. Is standard variable [hidden]
- `idIsAutoDefinedVariable` (Boolean) — IsAutoDefinedVariable. Is autodefined variable. Default: `false` [hidden]
- `AttEditDisableArrays` (Boolean) — AttEditDisableArrays [hidden]
- `AttEditNewVariable` (Boolean) — AttEditNewVariable [hidden]
- `AttEditDontAssign` (Boolean) — AttEditDontAssign [hidden]
## Type Definition

- `AttSupertypeName` (Text) — Supertype. Name of supertype
- `AttDomain` (Custom) — Domain [hidden]
- `AttEnumeratedDomain` (Boolean) — Enumerated domain. Default: `false` [hidden]
- `VarBasedOn` (Custom) — Based on attribute [hidden]
- `idBasedOn` (Custom) — Based on
- `ATTCUSTOMTYPE` (Custom) — Data Type
- `AttDatatype` (Dyn Combo) — Internal Data Type. Data type. Default: `NUMERIC` [hidden]
- `OBJ_DATATYPE` (Combo) — Internal Data Type (String). Default: `DT_NUMERIC`. Values: Numeric, Character, VarChar, Long Varchar, Date, DateTime, Object, BLOB, Bitmap, GUID, Video, Audio, Geography, Geopoint, Geoline, Geopolygon, Embedding [hidden]
- `AttLength` (Integer) — Length. Default: `4`
- `AttDecimal` (Integer) — Decimals. Default: `0`
- `AttMaxLen` (Integer) — Maximum length [hidden]
- `AttAvgLen` (Integer) — Average length [hidden]
- `AttSigned` (Boolean) — Signed. Default: `false`
- `idDATEPRECISION` (Combo) — Precision. Date Time Precision. Default: `idDATEPRECISION_SECONDS`. Values: Seconds, Milliseconds [hidden]
- `EMBEDDING_MODEL` (Text) — Embedding Model. Specifies the name or identifier of the model used to generate embeddings, such as 'openai/text-embedding-3-small'. Default: `openai/text-embedding-3-small` [hidden]
- `EMBEDDING_DIMENSIONS` (Integer) — Embedding Dimensions. Defines the number of dimensions used in the embedding vector, determining the size and detail of the generated embeddings.. Default: `512` [hidden]
- `idATTEXT` (Text) — FileType. File type. Default: `Unknown` [hidden]
- `AttFileTypeAtt` (Custom) — FileTypeAttribute. File type attribute [hidden]
- `AttFileNameAtt` (Custom) — FileNameAttribute. File name attribute [hidden]
- `TypeImageName` (Text) — ImageName. Image Name [hidden]
- `TypeImageType` (Text) — ImageType. Image Type [hidden]
- `TypeImageURI` (Text) — ImageURI. Image URI [hidden]
- `TypeImageWidth` (Integer) — ImageWidth. Image Width [hidden]
- `TypeImageHeight` (Integer) — ImageHeight. Image Height [hidden]
- `TypeFileSize` (Integer) — FileSize. File Size [hidden]
- `TypeVideoName` (Text) — VideoName. Video Name [hidden]
- `TypeVideoType` (Text) — VideoType. Video Type [hidden]
- `TypeVideoURI` (Text) — VideoURI. Video URI [hidden]
- `TypeAudioName` (Text) — AudioName. Audio Name [hidden]
- `TypeAudioType` (Text) — AudioType. Audio Type [hidden]
- `TypeAudioURI` (Text) — AudioURI. Audio URI [hidden]
- `TypeFileName` (Text) — FileName. File Name [hidden]
- `TypeFileURI` (Text) — FileURI. File URI [hidden]
- `IDEnumDefinedValues` (Custom) — EnumValues [hidden]
- `EnumCompatibility` (Boolean) — Gx90Compatibility. Default: `false` [hidden]
- `ControlTypeCompatibility` (Boolean) — Gx90CompatibilityControlType. Default: `false` [hidden]
- `AttCollection` (Boolean) — Collection. Default: `false` [hidden]
- `AUTOGENERATE_GUID` (Boolean) — Autogenerate Guid. Set Autogenerate for Guid. Default: `true` [hidden]
- `AUTONUMBER` (Boolean) — Autonumber. Set automatic numbering on/off
- `AUTONUMBER_START` (Integer) — Autonumber start. Set autonumbering starting value
- `AUTONUMBER_STEP` (Integer) — Autonumber step. Set autonumbering step value
- `AUTONUMBER_FORREPLICATION` (Boolean) — Autonumber for replication. Enable/disable replication of autonumbering. Default: `true`
- `AttSubtype` (Integer) — AttSubtype. Default: `0` [hidden]
- `HAS_DOMAIN` (Boolean) — Has domain. Default: `false` [hidden]
- `IS_SUBTYPE` (Boolean) — IS_SUBTYPE. Default: `false` [hidden]
- `AttNumDim` (Combo) — Dimensions. Values: Scalar, Vector, Matrix [hidden]
- `AttRows` (Integer) — Rows. Default: `3`
- `AttCols` (Integer) — Columns. Default: `3` [hidden]
- `DataTypeString` (Text) — DataTypeString [hidden]
- `ATT_INITIAL_VALUE` (Custom) — Initial value
- `DB_NLS_SUPPORT` (Combo) — Enable national language support. National language support. Values: No, Yes [hidden]
## Validation

- `AttValueRange` (Text) — Value range
- `AttRegEx` (Text) — Regular Expression [hidden]
- `AttValidationFailedMsg` (Text) — Validation Failed Message
## Picture

- `idNUMNUMBERS` (Combo) — Left fill. Default: `idNUMNUMBERS_BLANK`. Values: Blank, Zero, Blank when Zero
- `idTHOUSANDSEP` (Boolean) — Thousand separator. Default: `false`
- `idNUMPREFIX` (Text) — Prefix
- `idCHARCASE` (Combo) — Case. Default: `idCHARCASE_NONE`. Values: None, Upper [hidden]
- `idDATEFORMAT` (Combo) — Date format. Default: `idDATEFORMAT_SHORT`. Values: None, Year with two digits  (99/99/99), Year with four digits (99/99/9999) [hidden]
- `idHOURFORMAT` (Combo) — Hour format. Default: `idHOURFORMAT_HOURMIN`. Values: Only hour (hh), Hour and minutes (hh:mm), Hour, minutes and seconds (hh:mm:ss), Hour, minutes, seconds and milliseconds (hh:mm:ss.fff) [hidden]
- `ATT_PICTURE` (Text) — Picture
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
- `FilterOperator` (Combo Int) — FilterOperator. How the suggestions relate to the edit contents. Default: `0`. Values: Begins with, Contains [hidden]
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
- `NotifyContextChange` (Boolean) — NotifyContextChange
- `MaximumUploadSize` (Combo) — MaximumUploadSize. Size of the image transfered to the server. Default: `large`. Values: Actual Size, Large, Medium, Small [hidden]
- `EnableZoom` (Boolean) — EnableZoom. Default: `false` [hidden]
- `MaxZoom` (Integer) — Max Zoom. Default: `100` [hidden]
- `MaxZoomRel` (Combo) — MaxZoomRelativeTo. Default: `Image`. Values: Image, Control [hidden]
- `ZoomOutsideControl` (Boolean) — Zoom Outside Control. Enables the image to expand outside the bounds of the control. Default: `false` [hidden]
- `EnableCopy` (Boolean) — Enable Copy To Clipboard. Default: `false` [hidden]

### Virtual Keyboard

- `idEnterKeyCaption` (Combo) — EnterKeyCaption. Caption of the enter key.. Default: `Default`. Values: Default, Go, Search, Send, Join [hidden]
- `idEnterEvent` (Custom) — EnterEvent. Action to make when user press enter key.. Default: `<Platform Default>` [hidden]
- `idDisplaysKeyboardOnFocus` (Boolean) — DisplaysKeyboardOnFocus. Allows displaying or hiding the virtual keyboard when the field is focused.. Default: `true` [hidden]
## Behavior

- `Autocomplete` (Boolean) — InputHistory. Default: `false`
- `IsPassword` (Boolean) — IsPassword
- `idEnableShowPasswordHint` (Boolean) — EnableShowPassword. Enable to show a hint to show/hide the password mask. Default: `false` [hidden]
## Appearance

- `AttWidthScale` (Combo) — Automatic width scale factor. Default: `1`. Values: Use Environment property value, 1x, 2x [hidden]
- `PROP_BLOB_DISPLAY` (Combo Int) — Display. Defines how control is displayed on screen. Default: `0`. Values: Inline, Link [hidden]
- `PROP_BLOB_CONTENTTYPE` (Text) — ContentType. Content type [hidden]
- `AutoResize` (Boolean) — AutoResize
- `GxWidth` (Text) — Width. Calculated width of the element
- `GxHeight` (Text) — Height. Calculated height of the element
- `Fill` (Boolean) — Fill. Default: `true`
- `BackColor` (Color) — BackColor
- `ForeColor` (Color) — ForeColor
- `Font` (Custom) — Font
- `HorizontalAlignment` (Combo) — HorizontalAlignment. Default: `left`. Values: Left, Center, Right
- `GxFormat` (Combo Int) — Format. Values: Text, HTML, Raw HTML, Text with meaningful spaces
- `TooltipText` (Text) — TooltipText
- `invitemsg` (Text) — InviteMessage. Text to invite the user to interact with the object
## Offline Behavior

- `PROP_ATT_DOWNLOAD_OFFLINE` (Boolean) — Download content in Offline applications. Default: `false` [hidden]
## Interface Information

- `idVarServiceExtName` (Text) — External Name. External name used when the variable is a service parameter
- `idVarServiceRequired` (Boolean) — Required. Value is Required when the variable is a service parameter. Default: `false`
