/** Auto-generated type declaration. Do not edit manually. */

import type { LayoutSplitterDirection } from "./LayoutSplitterDirection";
import type { LayoutSplitterItemModel } from "./LayoutSplitterItemModel";
import type { LayoutSplitterLeafModel } from "./LayoutSplitterLeafModel";

export type LayoutSplitterGroupModel = LayoutSplitterLeafModel & {
  direction: LayoutSplitterDirection;
  items: LayoutSplitterItemModel[];
};
