# SYNC Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `Signatures` (Text) — Signatures [hidden]

## Integrated Security

- `IntegratedSecurityLevel` (Combo) — Integrated Security Level. Values: None, Authentication, Authorization
- `IntegratedSecurityPermissionPrefix` (Text) — Permission Prefix
- `IntegratedSecurityObjClientID` (Text) — Security Client ID. This property identifies an SD application in GAM. The Client Id can be used by more than one SD application, note that to reuse the Client Id implies that just one application will exist in GAM.
- `IntegratedSecurityObjClientSecret` (Text) — Security Client Secret. The Client Secret is a key used, in conjuntion with Client Id, to identify and to authorize an application when an user is authenticated.
- `IntegratedSecurityObjClientEncriptionKey` (Text) — Security Client Encription Key [hidden]
## Encryption

- `idEncryptOfflineDatabase` (Boolean) — Encrypt Offline Database. Indicates whether the database created locally on the devices will be encrypted (True) or not (False). Default: `false`
## Receive

- `idDataSyncCriteria` (Combo) — Data Receive Criteria. Defines the criteria for synchronizing from the server to the local database. Default: `OnAppLaunch`. Values: On Application Launch, After Elapsed Time, Manual, Never
- `idMinTimeBetweenSync` (Integer) — Minimum Time Between Receives. Specifies the time (in seconds) to wait between database receives. Default: `600`
- `idDataSyncGranularity` (Combo) — Data Receive Granularity. Defines the granularity level for synchronizing from the server to the local database. Default: `idByRow`. Values: By Row, By Table
- `idMinTimeBetweenCleans` (Integer) — Minimum Time Between Table Purges. Specifies the time (in seconds) to wait between the purge of synchronization tables in the server. Default: `3600`
- `idSyncTimeoutReceive` (Integer) — Receive Timeout. Specifies the time (in seconds) to wait for the server to respond on a Receive operation. Default: `0`
## Send

- `LocalChangesProcessing` (Combo) — Send Changes. Defines when to send the updates to the server. Default: `WhenConnected`. Values: When connected, Manual, Never
- `MinTimeBetweenSends` (Integer) — Minimum Time Between Sends. Specifies the time (in seconds) to wait between updates sended to the server. Default: `0`
- `idSyncTimeoutSend` (Integer) — Send Timeout. Specifies the time (in seconds) to wait for the server to respond on a Send operation. Default: `0`
