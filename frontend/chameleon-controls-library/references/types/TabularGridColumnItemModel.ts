/** Auto-generated type declaration. Do not edit manually. */

import type { TabularGridColumnFreeze } from "./TabularGridColumnFreeze";
import type { TabularGridColumnSortDirection } from "./TabularGridColumnSortDirection";

export type TabularGridColumnItemModel = {
  id: string;
  caption: string;

  parts?: string;
  accessibleName?: string;
  captionHidden?: boolean;
  freeze?: TabularGridColumnFreeze;
  hidden?: boolean;

  /**
   * Determines if the column can be hidden by the user.
   *
   * By default, this property takes to value of the ch-tabular-grid-render.
   */
  hideable?: boolean;

  order?: number;

  /**
   * Determines if the column can be resized by the user.
   *
   * By default, this property takes to value of the ch-tabular-grid-render.
   */
  resizable?: boolean;

  size?: string;

  /**
   * Determines if the column can be sorted by the user.
   *
   * By default, this property takes to value of the ch-tabular-grid-render.
   */
  sortable?: boolean;

  sortDirection?: TabularGridColumnSortDirection;
  tooltip?: string;
};
