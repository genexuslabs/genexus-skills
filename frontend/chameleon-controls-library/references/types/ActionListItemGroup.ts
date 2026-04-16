/** Auto-generated type declaration. Do not edit manually. */

import type { ActionListItemActionable } from "./ActionListItemActionable";
import type { ActionListItemTypeGroup } from "./ActionListItemTypeGroup";

// - - - - - - - - - - - - - - - - - - - -
//            List Item Heading
// - - - - - - - - - - - - - - - - - - - -
export type ActionListItemGroup = {
  id: string;
  caption: string;
  disabled?: boolean;
  expandable?: boolean;
  expanded?: boolean;

  items: ActionListItemActionable[];

  /**
   * Establish the order at which the item will be placed in its parent.
   * Multiple items can have the same `order` value.
   */
  order?: number;
  part?: string;
  selected?: boolean; // TODO: This property does not make much sense if expandable: false
  type: ActionListItemTypeGroup;
};
