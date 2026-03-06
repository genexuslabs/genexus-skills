# SuperApp Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `SuperAppIdentifier` (Text) — Super App Identifier. String that identifies the app for the provising server, it must use the reverse DNS format, i.e com.example.mysuperapp
- `SuperAppVersion` (Text) — Super App Version. Current version number of the Super app
- `SuperAppProvisioningUrl` (Text) — Provisioning Url. The URL where the Provision Server for this Super app is located
- `SuperAppCrtFile_Android` (Custom) — Android Public Key File. File containing the public key used to validate Mini apps' metadata on the Android Super App
- `SuperAppCrtFile_iOS` (Custom) — iOS Public Key File. File containing the public key used to validate Mini apps' metadata on the iOS Super App
- `SuperAppMain` (Custom) — Main Object. Main object of the Super app, it must be one of the mobile objects (Panel, Menu, Work With)
- `SuperAppShowDefaultContainerUI` (Boolean) — Show Mini app defaut container UI. Specifies if the Mini app will run inside a container control provided by the Super app. Default: `true` [hidden]
- `idConnectivitySupport` (Combo) — Connectivity Support. Define if this object works even without network connectivity

		Values:

			Online  -> The object will execute on an online environment communicating with the server via REST services (default for  Main objects)
			Offline -> The object is executed completely offline with no automatic comunication to the server
			Inherit -> This value is only available for non-Main objects. The value of the property will be inherited from the caller object in runtime.. Default: `idOnline`. Values: Online, Offline, Inherit [hidden]

## Mini Apps Cache

- `SuperAppMaximumMiniAppCount` (Integer) — Maximum Mini apps count. Specifies the maximum number of allowed Mini apps in the cache. When that amount is reached and a new one is installed, the Mini app with the longest time since it was last used is removed. A value of 0 means that there is no limit.
- `SuperAppKeepMiniAppFor` (Integer) — Number of days to keep. Specifies the number of days a Mini app is kept since it's last use, after that the Mini app is deleted from the cache. A value of 0 means that Mini apps aren't removed based on their usage.
## Single sign-on

- `SuperAppSSOCheckMiniAppScope` (Boolean) — Check Scope for Mini App. Indicates if the Super App needs to check for permission to share user information with the Mini App.
- `SuperAppSSOObjectCheckMiniAppScope` (Custom) — Check Scope Object for Mini App. Procedure to verify if the user is already authorized to share their information with the Mini App. [hidden]
- `SuperAppSSOUIScopeObject` (Custom) — UI Scope Object for Mini App. Super App panel to request user approval if they have not yet granted permission to share their information with the Mini App. [hidden]
- `SuperAppSSOUINotAuthorizedObject` (Custom) — Not Authorized Object for Mini App. Super App panel displayed when the user cannot access certain Mini App component or resource.
- `SuperAppSSOObjectGetMiniAppAccessToken` (Custom) — Get Access Token Object for Mini App. Procedure to obtain the access token for the Mini App.
