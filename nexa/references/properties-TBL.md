# TBL Properties

## (root)

- `ObjName` (Text) — Name
- `ObjDesc` (Text) — Description. Describe the content or purpose of the element

## (root)

- `ObjId` (Integer) — ObjId [hidden]
- `DKL_EXTERNAL` (Boolean) — Extrenal. Default: `false`
- `DKL_CHECK_INTEGRITY` (Combo) — Check referential integrity. Default: `0`. Values: False, True, Use Environment property value [hidden]
- `DKL_EXTERNAL_NAME` (Text) — Extrenal Name [hidden]
- `DKL_REF_BY_CANDIDATE` (Boolean) — Reference By Candidate Key. Default: `false`
- `HelpKeyword` (Integer) — HelpKeyword [hidden]
- `CLUSTERIDX` (Custom) — Cluster index
- `TBLSTOAREA` (Text) — Storage area
- `TBLIDXSTOAREA` (Text) — Indices storage area
- `TBLTXTSTOAREA` (Text) — Text storage area
- `TBLINISIZE` (Integer) — Initial size
- `TBLFEXTENT` (Integer) — First extent size
- `TBLNEXTENT` (Integer) — Next extents percentage increase
- `TBLMINEXTENT` (Integer) — Minimum number of extents
- `CACHE_LEVEL` (Combo) — Change frequency. Default: `0`. Values: 0. Pretty Often, 1. Time to Time, 2. Hardly Ever, 3. Almost Never
- `LogicallyDeletedAttribute` (Custom) — LogicallyDeletedAttribute. Logically Deleted Attribute [hidden]
- `LastModifiedDateTimeAttribute` (Custom) — LastModifiedDateTimeAttribute. Last Modified Date Time Attribute [hidden]
- `id_OBJ_TIMESTAMP` (Text) — OBJ_TIMESTAMP [hidden]
- `DEKLARIT_METADATA` (Text) — DeklaritMetadata [hidden]
- `OBJECT_METADATA` (Text) — ObjectMetadata [hidden]

## SAP Hana Properties

- `HANA_TBL_STORAGE` (Combo) — Table Storage Type. Default: `TYPE_ROW`. Values: Column Based, Row Based
