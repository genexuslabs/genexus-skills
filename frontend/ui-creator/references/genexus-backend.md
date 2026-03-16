# GeneXus Backend Integration

Apply these rules when the backend is GeneXus. Detectable from OpenAPI spec: endpoint naming like `*_Level_Detail` / `*_Level_Detail_Grid_*`, or `gxid` parameters

## gxid parameter

Generate a unique integer (0–32767) per screen/component (not per service). The same `gxid` must be used for all endpoints related to the same screen throughout the session. Pass it from the component/controller/view to every service method call. The mock server should accept `gxid` as a query parameter but can ignore its value — this ensures service code is identical in mock and production

## GX_CLIENT_ID cookie

Generate a `GX_CLIENT_ID` cookie with a random GUID value on first load. Send it with every REST API call — it identifies the user session

## Image URL resolution

GeneXus serves images from the application root, not from the REST endpoint path. Use a separate `imageBaseUrl` (the API URL without the `/rest` segment) for resolving relative image paths. REST calls use `apiUrl` (with `/rest`); images use `imageBaseUrl` (without `/rest`)

## Endpoint call order

Endpoints named `*_Level_Detail` are master endpoints; `*_Level_Detail_Grid_*` are detail/grid endpoints. **Always call the master endpoint first** — it initializes the server-side session for that screen. Only call detail/grid endpoints after the master completes

## Accept header override

GeneXus servers may reject requests with `Accept: application/json` (returning empty responses). Override the `Accept` header in the dev proxy to use the browser's default value. Applies to platforms that proxy client-side requests (Angular, React)

## Platform implementation

Each platform file has a **GeneXus backend** section with platform-specific code for all of the above. See:
- [platform-angular.md](platform-angular.md) → `### GeneXus backend`
- [platform-react.md](platform-react.md) → `### GeneXus backend`
