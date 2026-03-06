# API Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `IsMain` (Boolean) — Main program. To specify that the object is main. That is: it can be executed as standalone application.. Default: `false`
- `GENERATE_REST_API` (Boolean) — REST Protocol. Enable REST Protocol Suppport. Default: `true`
- `GENERATE_SOAP_API` (Boolean) — SOAP Protocol. Enables SOAP Protocol Support. Default: `false` [hidden]
- `INCLUDE_IN_MCP_SERVER` (Boolean) — Include in MCP Server. Enable inclusion of methods as tools in the MCP Server. Default: `false`
- `GENERATE_GRPC_API` (Boolean) — gRPC Protocol. Enables gRPC Protocol Support. Default: `false`
- `GRPC_NAMESPACE` (Text) — gRPC Package. Specifies a Package for the gRPC Service [hidden]
- `GENERATE_OPEN_API` (Combo) — Generate OpenAPI interface. Generate OpenAPI documentation (default.yaml) for procedures, business components and dataproviders exposed as REST web services.. Default: `Yes`. Values: Yes, No, Use Environment property value
- `OPEN_API_VERSION` (Combo) — OpenAPI version. Default: `idOPENAPI30`. Values: 2.0, 3.0, APIGateway (Deprecated)
- `GENERATE_OPENAI_PLUGIN_API` (Boolean) — Generate As OpenAI Plugin. Generates Metadata for Use as OpenAI Plugin. Default: `false`
- `OPENAI_API_HUMAN_DESC` (Text) — Description for Human. Plugin description [hidden]
- `OPENAI_API_MODEL_DESC` (Text) — Description for Model. Plugin Description for OpenAI Model [hidden]
- `SERVICES_BASE_PATH` (Text) — Services base path. Base path for webservices

## Miscellaneous

- `OBJ_IS_INTERFACE` (Boolean) — OBJ_IS_INTERFACE. Default: `false` [hidden]
- `GenerateObject` (Boolean) — GenerateObject. Allows to enable or disable the object specification and generation.. Default: `true`
## Integrated Security

- `IntegratedSecurityLevel` (Combo) — Integrated Security Level. Values: None, Authentication, Authorization
- `IntegratedSecurityPermissionPrefix` (Text) — Permission Prefix
- `IntegratedSecurityObjClientID` (Text) — Security Client ID. This property identifies an SD application in GAM. The Client Id can be used by more than one SD application, note that to reuse the Client Id implies that just one application will exist in GAM. [hidden]
- `IntegratedSecurityObjClientSecret` (Text) — Security Client Secret. The Client Secret is a key used, in conjuntion with Client Id, to identify and to authorize an application when an user is authenticated. [hidden]
- `IntegratedSecurityObjClientEncriptionKey` (Text) — Security Client Encription Key [hidden]
## Warning messages

- `SPC_WARNINGS_DISABLED` (Text) — Disabled warnings. Type a space separated list of warning message codes you want to be disabled.
