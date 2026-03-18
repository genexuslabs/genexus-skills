/** Auto-generated type declaration. Do not edit manually. */

import type { GxDataTransferInfo } from "./GxDataTransferInfo";
import type { TreeViewDropType } from "./TreeViewDropType";

export type TreeViewDataTransferInfo = {
  newContainer: GxDataTransferInfo;
  draggedItems: GxDataTransferInfo[];
  draggingSelectedItems: boolean;
  dropInTheSameTree: boolean;
  dropType: TreeViewDropType;
};
