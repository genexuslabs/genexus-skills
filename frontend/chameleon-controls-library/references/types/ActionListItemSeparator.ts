/** Auto-generated type declaration. Do not edit manually. */

import type { ActionListItemTypeSeparator } from "./ActionListItemTypeSeparator";

// - - - - - - - - - - - - - - - - - - - -
//           List Item Separator
// - - - - - - - - - - - - - - - - - - - -
export type ActionListItemSeparator = {
  id?: string;

  /**
   * Establish the order at which the item will be placed in its parent.
   * Multiple items can have the same `order` value.
   */
  order?: number;
  part?: string;
  type: ActionListItemTypeSeparator;
};
