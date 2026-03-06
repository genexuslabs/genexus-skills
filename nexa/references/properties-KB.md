# KB Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element
- `HelpKeyword` (Integer) — HelpKeyword [hidden]
- `DKL_CUSTOM_PROPERTIES` (Text) — DKL_CUSTOM_PROPERTIES [hidden]
- `DKL_OBJ_CUSTOM_PROPERTIES` (Text) — DKL_OBJ_CUSTOM_PROPERTIES [hidden]
- `DKL_ROLES` (Text) — Security. Security Roles [hidden]
- `DKL_BUILTIN_PROPERTIES` (Text) — DKL_BUILTIN_PROPERTIES [hidden]
- `DKL_USE_TRN_REORG` (Boolean) — DKL_USE_TRN_REORG. Default: `true`
- `DKL_CHECK_INTEGRITY` (Combo) — Check referential integrity for External Tables. Default: `0`. Values: False, True, Use Environment property value
- `DKL_PRESERVE_CASING` (Boolean) — DKL_PRESERVE_CASING. Default: `true` [hidden]
- `DKL_ACTIONS` (Text) — DKL_ACTIONS [hidden]
- `MAX_NUMERIC_LEN` (Integer) — Maximum numeric length. Default: `18`
- `STD_FUNC_SAVING` (Combo) — Standard Functions. Default: `Yes`. Values: Allows only standard functions on saving, Allows non-standard functions on saving
- `AttWidthScale` (Combo) — Automatic width scale factor. Default: `1`. Values: Use Environment property value, 1x, 2x
- `IMAGE_PATH` (Text) — Base image path. Base path for image files
- `VAR_WITH_UNDERSCORE` (Combo) — Variables. Variable name compatibility with 7.5. Default: `No`. Values: Allow underscore at begining of variable name, Do not allow underscore at begining of variable name, Y, N, T, F, True, False, 1, 0 [hidden]
- `TranslateToLanguageId` (Custom) — KbLanguage. Knowledge Base Language
- `IDELanguage` (Custom) — IdeLanguage [hidden]
- `GxWikiServerList` (Custom) — GxWikiServerList [hidden]
- `ConversionNumber` (Text) — ConversionNumber [hidden]
- `KBStartupSettings` (Text) — KB Startup Settings [hidden]

## User Interface

- `AUTORESIZE_SIZE` (Combo) — Autoresize form controls. Method used to determine the size of a control when the Auto Resize property is set to Yes. Default: `CURRENT_TRANSLATION`. Values: Based on message code, Based on current translation, Based on longest available translation
- `WebMaximunEditLength` (Integer) — Web maximum edit length. Maximum length in characters for controls of type edit, if it has more the control will show an horizontal scroll. Default: `80`
- `WebMaximumSingleLineEditLength` (Integer) — Web maximum single line edit length. Maximum length in characters for controls of type edit, if it has more it is converted in a multi-line edit. Default: `159`
- `WebMaximumMultiLineEditLines` (Integer) — Web maximum multi line edit lines. Maximum number of lines for multi line controls of type edit. Default: `10`
- `WinMaximunEditLength` (Integer) — Win maximum edit length. Maximum length in characters for controls of type edit, if it has more the control will show an horizontal scroll. Default: `60`
- `WinMaximumSingleLineEditLength` (Integer) — Win maximum single line edit length. Maximum length in characters for controls of type edit, if it has more it is converted in a multi-line edit. Default: `119`
- `WinMaximumMultiLineEditLines` (Integer) — Win maximum multi line edit lines. Maximum number of lines for multi line controls of type edit. Default: `5`
- `ReportMaximunEditLength` (Integer) — Report maximum edit length. Maximum length in characters for controls of type edit, if it has more the control will show an horizontal scroll. Default: `255`
- `ReportMaximumMultiLineEditLines` (Integer) — Report maximum multi line edit lines. Maximum number of lines for multi line controls of type edit. Default: `1`
- `GxFormat` (Combo Int) — DefaultHtmlFormatTextBlocksOnly. Values: Text, HTML, Raw HTML, Text with meaningful spaces
## Team Development

- `VersionRelated` (Boolean) — Is Version Related. Default: `false` [hidden]
- `HostedKB` (Boolean) — Is Hosted KB. Default: `false` [hidden]
- `FromBCP` (Boolean) — Created From BCP. Default: `false` [hidden]
- `ServerURI` (Text) — GeneXus Server URL. GeneXus Server URL for Commit/Update [hidden]
- `RemoteKB` (Text) — Remote KB. Repository KB [hidden]
- `LinkedKB` (Boolean) — Is Linked KB. Default: `false` [hidden]
- `RemoteVersion` (Text) — Remote Version. Obsolete. Kept for backward compatibility [hidden]
- `RemoteVersionId` (Integer) — Remote Version Id. Obsolete. Kept for backward compatibility. Default: `-1` [hidden]
- `RemoteKBGuid` (Custom) — Remote KB Guid [hidden]
- `DisconnectFromServer` (Custom) — Disconnect From Server [hidden]
## Compatibility

- `IsolationLevelCompatibilityFlag` (Combo) — Isolation Level behavior. 'Isolation Level' property is now defined at the Data Store instead of at the Generator. Defines how the Data Store property value is calculated to preserve the Knowledge Base behaviour.. Default: `ReadCommittedValue`. Values: Read Committed, Inherit from Generator
