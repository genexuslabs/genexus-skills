/** Auto-generated type declaration. Do not edit manually. */

import type { ActionListItemAdditionalInformation } from "./ActionListItemAdditionalInformation";
import type { ActionListItemTypeActionable } from "./ActionListItemTypeActionable";

// - - - - - - - - - - - - - - - - - - - -
//          List Item Actionable
// - - - - - - - - - - - - - - - - - - - -
export type ActionListItemActionable = {
  id: string;

  additionalInformation?: ActionListItemAdditionalInformation;
  caption: string;
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
  editable?: boolean;
  fixed?: boolean;

  metadata?: string;

  /**
   * Establish the order at which the item will be placed in its parent.
   * Multiple items can have the same `order` value.
   */
  order?: number;
  part?: string;

  selected?: boolean;

  // TODO: Add support to avoid setting this property
  type: ActionListItemTypeActionable;
};
