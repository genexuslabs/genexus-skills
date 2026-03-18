/** Auto-generated type declaration. Do not edit manually. */

import type { FlexibleLayoutItemModel } from "./FlexibleLayoutItemModel";
import type { LayoutSplitterGroupModel } from "./LayoutSplitterGroupModel";
import type { ViewAccessibleRole } from "./ViewAccessibleRole";

export type FlexibleLayoutGroupModel = Omit<
  LayoutSplitterGroupModel,
  "items"
> & {
  accessibleRole?: ViewAccessibleRole;
  items: FlexibleLayoutItemModel[];
};
