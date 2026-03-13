/** Auto-generated type declaration. Do not edit manually. */

import type { TreeViewItemImageMultiState } from "./TreeViewItemImageMultiState";
import type { TreeViewItemModel } from "./TreeViewItemModel";

export type TreeViewImagePathCallback = (
  item: TreeViewItemModel,
  iconDirection: "start" | "end"
) => string | TreeViewItemImageMultiState | undefined;
