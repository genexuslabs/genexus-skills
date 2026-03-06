# EXO Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `ExoIsSap` (Boolean) — IsSap. Default: `false` [hidden]
- `ExoType` (Combo Int) — Type. Default: `0`. Values: Native Object, Stored Procedure, WSDL, Java Session Bean, SAP Connector Interface
- `ExoIsGeneric` (Boolean) — Is Generic [hidden]
- `ExoUseNativeSoap` (Combo) — Use Native Soap. Default: `UMPV`. Values: Yes, No, Use Environment property value [hidden]
- `ObjNamespace` (Text) — Namespace
- `ExoImporterVersion` (Text) — ImporterVersion
- `ExoSourceURI` (Text) — SourceURI
- `EXOSTOREPROCEDUREDataStore` (Custom) — Datastore [hidden]
- `ExoSessionBeanVersion` (Combo) — EJB Version. Default: `2`. Values: 2.x, 3.x [hidden]
- `ExoSessionBeanHomeInterface` (Text) — EJB Home Object [hidden]
- `ExoSessionBeanRemoteInterface` (Text) — EJB Object [hidden]
- `ExoSessionBeanJndiName` (Text) — EJB JNDI Name [hidden]
- `ExoSessionBeanJndiProperties` (Combo) — Specify JNDI context properties. Default: `No`. Values: No, Yes [hidden]
- `ExoSessionBeanJndiINITIAL_CONTEXT_FACTORY` (Text) — INITIAL_CONTEXT_FACTORY [hidden]
- `ExoSessionBeanJndiPROVIDER_URL` (Text) — PROVIDER_URL [hidden]
- `ExoSessionBeanJndiSECURITY_PRINCIPAL` (Text) — SECURITY_PRINCIPAL [hidden]
- `ExoSessionBeanJndiSECURITY_CREDENTIALS` (Text) — SECURITY_CREDENTIALS [hidden]

## Soap Information

- `ExoName` (Text) — XML Name [hidden]
## .NET Framework Information

- `ExoNameCSHARP` (Text) — .Net External Name
- `AssemblyName` (Text) — AssemblyName
- `ExoConstructorParametersCSHARP` (Text) — .Net Constructor Parameters
## .NET Information

- `ExoNameNETCORE` (Text) — .Net Core External Name
- `NetCoreAssemblyName` (Text) — NetCoreAssemblyName
- `NetCorePackageName` (Text) — NetCorePackageName. Sets the ID of the .NET Package associated with the External Object. This property can be used instead of or in addition to the .NET Assembly Name property. If both are specified, both will be considered.
- `NetCorePackageVersion` (Text) — NetCorePackageVersion. .NET Package Version determines the version of the .NET Package ID that implements the External Object. If it is not specified, the Generator Standard Classes Version is used.
- `ExoConstructorParametersNETCORE` (Text) — .Net Core Constructor Parameters. .NET Constructor Parameters 
## Java Information

- `ExoNameJAVA` (Text) — Java External Name
- `JavaArtifactId` (Text) — JavaArtifactId. Sets the ID of the Java Artifact associated with the External Object.
- `JavaArtifactVersion` (Text) — JavaArtifactVersion. Java Artifact Version determines the version of the Java Artifact ID that implements the External Object. If it is not specified, the Generator Standard Classes Version is used.
- `PackageName` (Text) — External Package Name
- `ExoConstructorParametersJAVA` (Text) — Java Constructor Parameters
## Ruby Information

- `ExoNameRuby` (Text) — Ruby External Name
- `RequireName` (Text) — Required file
- `ExoConstructorParametersRuby` (Text) — Ruby Constructor Parameters
## iOS Information

- `ExoNameIOS` (Text) — iOS External Name
- `iOSLibraryName` (Text) — Library Name
- `iOSHeaderFileName` (Text) — Header File Name
## Android Information

- `ExoNameANDROID` (Text) — Android External Name
- `AndroidPackageName` (Text) — External Package Name
## Javascript Information

- `ExoNameJS` (Text) — Javascript External Name
- `ExoReferencedFilesJS` (Text) — Javascript Referenced file
## Javascript Module Information

- `ExoJsModuleName` (Text) — Javascript Module Name. Name of the javascript export to be imported.
- `ExoJsModulePath` (Text) — Javascript Module Path. The module to import from. This is often a relative or absolute path name to the .js file containing the module.
- `ExoJsModuleReference` (Text) — Javascript Module Reference. Determines how this module will be installed into the project. It could be an npm package: 'mypackage@latest' with syntax packageName@version Name or a local path
