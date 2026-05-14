ExternalObject GXEnterpriseSessionManager
{
	#GenericTypes
	#End

	#ExternalProperties
	UserName
	[
		Description = 'User Name',
		Type = 'Character',
		NetFrameworkExternalName = 'UserName',
		JavaExternalName = 'UserName',
		JavaExternalType = 'UserName',
		JavaExternalSetMethod = 'setUserName',
		JavaExternalGetMethod = 'getUserName'
	]
	Password
	[
 		Description = 'Password',
		Type = 'Character',
		NetFrameworkExternalName = 'Password',
		JavaExternalName = 'Password',
		JavaExternalType = 'Password',
		JavaExternalSetMethod = 'setPassword',
		JavaExternalGetMethod = 'getPassword'
	]
	InstanceNumber
	[
		Description = 'System Instance Number',
		Type = 'Character',
		NetFrameworkExternalName = 'InstanceNumber',
		JavaExternalName = 'InstanceNumber',
		JavaExternalType = 'InstanceNumber',
		JavaExternalSetMethod = 'setInstanceNumber',
		JavaExternalGetMethod = 'getInstanceNumber'
	]
	AppServer
	[
		Description = 'Application Server Host',
		Type = 'Character',
		NetFrameworkExternalName = 'AppServer',
		JavaExternalName = 'AppServer',
		JavaExternalType = 'AppServer',
		JavaExternalSetMethod = 'setAppServer',
		JavaExternalGetMethod = 'getAppServer'
	]
	RouterString
	[
		Description = 'Router String',
		Type = 'Character',
		NetFrameworkExternalName = 'RouterString',
		JavaExternalName = 'RouterString',
		JavaExternalType = 'RouterString',
		JavaExternalSetMethod = 'setRouterString',
		JavaExternalGetMethod = 'getRouterString'
	]
	ClientNumber
	[
		Description = 'Client Number',
		Type = 'Character',
		NetFrameworkExternalName = 'ClientNumber',
		JavaExternalName = 'ClientNumber',
		JavaExternalType = 'ClientNumber',
		JavaExternalSetMethod = 'setClientNumber',
		JavaExternalGetMethod = 'getClientNumber'
	]
	SystemId
	[
		Description = 'System Id',
		Type = 'Character',
		NetFrameworkExternalName = 'SystemId',
		JavaExternalName = 'SystemId',
		JavaExternalType = 'SystemId',
		JavaExternalSetMethod = 'setSystemId',
		JavaExternalGetMethod = 'getSystemId'
	]
	SessionName
	[
		Description = 'Session Name',
		Type = 'Character',
		NetFrameworkExternalName = 'SessionName',
		JavaExternalName = 'SessionName',
		JavaExternalType = 'SessionName',
		JavaExternalSetMethod = 'setSessionName',
		JavaExternalGetMethod = 'getSessionName'
	]
	GatewayHost
	[
		Description = 'SAP Gateway Server Host',
		Type = 'Character',
		NetFrameworkExternalName = 'GatewayHost',
		JavaExternalName = 'GatewayHost',
		JavaExternalType = 'GatewayHost',
		JavaExternalSetMethod = 'setGatewayHost',
		JavaExternalGetMethod = 'getGatewayHost'
	]
	GatewaySrv
	[
		Description = 'SAP Gateway Service',
		Type = 'Character',
		NetFrameworkExternalName = 'GatewaySrv',
		JavaExternalName = 'GatewaySrv',
		JavaExternalType = 'GatewaySrv',
		JavaExternalSetMethod = 'setGatewaySrv',
		JavaExternalGetMethod = 'getGatewaySrv'
	]
	ProgramID
	[
		Description = 'Document Handler Server Program ID',
		Type = 'Character',
		NetFrameworkExternalName = 'ProgramID',
		JavaExternalName = 'ProgramID',
		JavaExternalType = 'ProgramID',
		JavaExternalSetMethod = 'setProgramID',
		JavaExternalGetMethod = 'getProgramID'
	]
	ServerName
	[
		Description = 'Document Handler Server Name',
		Type = 'Character',
		NetFrameworkExternalName = 'ServerName',
		JavaExternalName = 'ServerName',
		JavaExternalType = 'ServerName',
		JavaExternalSetMethod = 'setServerName',
		JavaExternalGetMethod = 'getServerName'
	]
	RegistrationCount
	[
		Description = 'Registration Count',
		Type = 'Character',
		NetFrameworkExternalName = 'RegistrationCount',
		JavaExternalName = 'RegistrationCount',
		JavaExternalType = 'RegistrationCount',
		JavaExternalSetMethod = 'setRegistrationCount',
		JavaExternalGetMethod = 'getRegistrationCount'
	]
	SAPGUI
	[
		Description = 'Use SAP GUI',
		Type = 'Character',
		NetFrameworkExternalName = 'SAPGUI',
		JavaExternalName = 'SAPGUI',
		JavaExternalType = 'SAPGUI',
		JavaExternalSetMethod = 'setSAPGUI',
		JavaExternalGetMethod = 'getSAPGUI'
	]
	Language
	[
		Description = 'Language',
		Type = 'Character',
		NetFrameworkExternalName = 'Language',
		JavaExternalName = 'Language',
		JavaExternalType = 'Language',
		JavaExternalSetMethod = 'setLanguage',
		JavaExternalGetMethod = 'getLanguage'
	]
	ErrorCode
	[
		Description = 'Error Code',
		Type = 'Numeric',
		NetFrameworkExternalName = 'ErrorCode',
		JavaExternalName = 'ErrorCode',
		JavaExternalType = 'ErrorCode',
		JavaExternalSetMethod = 'setErrorCode',
		JavaExternalGetMethod = 'getErrorCode'
	]
	ErrorMessage
	[
		Description = 'Error Message Text',
		Type = 'Character',
		NetFrameworkExternalName = 'ErrorMessage',
		JavaExternalName = 'ErrorMessage',
		JavaExternalType = 'ErrorMessage',
		JavaExternalSetMethod = 'setErrorMessage',
		JavaExternalGetMethod = 'getErrorMessage'
	]
	#End

	#ExternalMethods
	Connect
	[
		Description = 'Connect',
		XmlName = 'Connect',
		IsStatic = 'False',
		NetFrameworkExternalName = 'Connect',
		JavaExternalName = 'Connect'
	]
	ConnectSession
	[
		Description = 'ConnectSession',
		XmlName = 'ConnectSession',
		IsStatic = 'False',
		NetFrameworkExternalName = 'ConnectSession',
		JavaExternalName = 'ConnectSession'
	]
	{
		Parameters
		{
		Session
		[
			AccessType = 'In',
			Description = 'Session',
			Type = 'Character'
		]
		Scope
		[
			AccessType = 'In',
			Description = 'Scope',
			Type = 'Character'
		]
		}
	}

	Save
	[
		Description = 'Save',
		XmlName = 'Save',
		IsStatic = 'False',
		NetFrameworkExternalName = 'Save',
		JavaExternalName = 'Save'
	]

	Load
	[
		Description = 'Load',
		XmlName = 'Load',
		IsStatic = 'False',
		NetFrameworkExternalName = 'Load',
		JavaExternalName = 'Load'
	]

	TransactionBegin
	[
		Description = 'TransactionBegin',
		XmlName = 'TransactionBegin',
		IsStatic = 'False',
		NetFrameworkExternalName = 'TransactionBegin',
		JavaExternalName = 'TransactionBegin'
	]

	TransactionCommit
	[
		Description = 'TransactionCommit',
		XmlName = 'TransactionCommit',
		IsStatic = 'False',
		NetFrameworkExternalName = 'TransactionCommit',
		JavaExternalName = 'TransactionCommit'
	]

	DocumentSenderStart
	[
		Description = 'DocumentSenderStart',
		XmlName = 'DocumentSenderStart',
		IsStatic = 'False',
		NetFrameworkExternalName = 'DocumentSenderStart',
		JavaExternalName = 'DocumentSenderStart'
	]

	DocumentReceiverStart
	[
		Description = 'DocumentReceiverStart',
		XmlName = 'DocumentReceiverStart',
		IsStatic = 'False',
		NetFrameworkExternalName = 'DocumentReceiverStart',
		JavaExternalName = 'DocumentReceiverStart'
	]

	DocumentSenderStop
	[
		Description = 'DocumentSenderStop',
		XmlName = 'DocumentSenderStop',
		IsStatic = 'False',
		NetFrameworkExternalName = 'DocumentSenderStop',
		JavaExternalName = 'DocumentSenderStop'
	]

	DocumentReceiverStop
	[
		Description = 'DocumentReceiverStop',
		XmlName = 'DocumentReceiverStop',
		IsStatic = 'False',
		NetFrameworkExternalName = 'DocumentReceiverStop',
		JavaExternalName = 'DocumentReceiverStop'
	]
	#End

	#ExternalEvents
	#End

	#Properties
		Name = 'GXEnterpriseSessionManager'
		Description = 'GX Enterprise Session Manager'
		Type = 'Native Object'
		NetFrameworkExternalName = 'GeneXus.SAP.GXECSessionManager'
		NetFrameworkAssemblyName = 'GxEnterpriseConnect.dll'
		NetFrameworkConstructorParameters = 'context'
		NetAssemblyName = ''
		NetPackageId = 'GeneXus.EnterpriseLib.SAP'
		JavaExternalName = 'SessionManager'
		ExternalPackageName = 'com.genexus.sap'
		JavaConstructorParameters = 'context'
	#End

}
