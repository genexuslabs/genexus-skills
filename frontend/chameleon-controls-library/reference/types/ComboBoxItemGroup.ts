/** Auto-generated type declaration. Do not edit manually. */

import type { ComboBoxItemLeaf } from "./ComboBoxItemLeaf";

export type ComboBoxItemGroup = ComboBoxItemLeaf & {
  expandable?: boolean;
  expanded?: boolean;
  items: ComboBoxItemLeaf[];
};
