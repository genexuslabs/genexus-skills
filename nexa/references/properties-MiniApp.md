# MiniApp Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `MiniAppIdentifier` (Text) — Mini App Identifier. String that identifies the app for the provising server, it must use the reverse DNS format, i.e com.example.myminiapp [hidden]
- `MiniAppMain` (Custom) — Main Object. Main object of the Mini app, it must be one of the mobile objects (Panel, Menu, Work With)
- `SuperAppApiMock` (Custom) — Super App API Mock. Mock SuperApp object that expose the same API as the real SuperApp
- `SuperAppApiExternalObject` (Custom) — Super App API External Object. Mock External Object used for SuperApp that are not made in GeneXus

