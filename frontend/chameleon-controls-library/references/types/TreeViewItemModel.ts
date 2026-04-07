/** Auto-generated type declaration. Do not edit manually. */

import type { ImageRender } from "./ImageRender";
import type { TreeViewModel } from "./TreeViewModel";

export type TreeViewItemModel = {
  id: string;
  caption: string;
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
  downloading?: boolean;
  dragDisabled?: boolean;
  dropDisabled?: boolean;
  editable?: boolean;
  expanded?: boolean;
  endImgSrc?: string;
  endImgType?: ImageRender;

  /**
   * Used by the tree view to decide which is the last item in the list when
   * filters are applied.
   */
  lastItemId?: string;

  lazy?: boolean;
  leaf?: boolean;

  indeterminate?: boolean;
  items?: TreeViewModel;
  metadata?: string;

  /**
   * Establish the order at which the item will be placed in its parent.
   * Multiple items can have the same `order` value.
   */
  order?: number;

  /**
   * Specifies a set of parts to use in every DOM element of the item.
   */
  parts?: string;

  /**
   * `false` to not render the item.
   */
  render?: boolean;
  selected?: boolean;
  startImgSrc?: string;
  startImgType?: ImageRender;
  toggleCheckboxes?: boolean;
};
