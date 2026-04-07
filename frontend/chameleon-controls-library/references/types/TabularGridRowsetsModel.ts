/** Auto-generated type declaration. Do not edit manually. */

import type { TabularGridRowsetItemSimpleModel } from "./TabularGridRowsetItemSimpleModel";
import type { TabularGridRowsetsGroupModel } from "./TabularGridRowsetsGroupModel";

export type TabularGridRowsetsModel =
  | TabularGridRowsetItemSimpleModel
  | [TabularGridRowsetItemSimpleModel, ...TabularGridRowsetsGroupModel]
  | TabularGridRowsetsGroupModel;
