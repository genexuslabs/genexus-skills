/** Auto-generated type declaration. Do not edit manually. */

import type { ActionListItemAdditionalBase } from "./ActionListItemAdditionalBase";
import type { ActionListItemAdditionalItemActionType } from "./ActionListItemAdditionalItemActionType";

export type ActionListItemAdditionalAction = ActionListItemAdditionalBase & {
  id: string;
  accessibleName: string;
  action: ActionListItemAdditionalItemActionType;
};
