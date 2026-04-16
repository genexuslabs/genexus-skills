/** Auto-generated type declaration. Do not edit manually. */

import type { FlexibleLayoutLeafType } from "./FlexibleLayoutLeafType";
import type { FlexibleLayoutWidget } from "./FlexibleLayoutWidget";
import type { TabListPosition } from "./TabListPosition";

export type FlexibleLayoutLeafConfigurationTabbed = {
  /**
   * `true` to display a close button in the tab buttons.
   *
   * By default, this property takes to value of the ch-flexible-layout-render.
   */
  closeButton?: boolean;

  /**
   * Specify if all tab buttons are disabled.
   * If disabled, tab buttons will not fire any user interaction related event
   * (for example, click event).
   */
  disabled?: boolean;

  /**
   * When the control is sortable, the items can be dragged outside of the
   * tab-list. This property lets you specify if this behavior is disabled.
   *
   * By default, this property takes to value of the ch-flexible-layout-render.
   */
  dragOutside?: boolean;

  selectedWidgetId?: string;
  showCaptions?: boolean;

  /**
   * `true` to enable sorting the tab buttons by dragging them in the tab-list.
   * If sortable !== true, the tab buttons can not be dragged out either.
   *
   * By default, this property takes to value of the ch-flexible-layout-render.
   */
  sortable?: boolean;

  /** `true` to not render the tab captions of the view. */
  tabButtonHidden?: boolean;

  /**
   * Specifies the position of the tab list in the tabbed view.
   * If not specified, defaults to `"block-start"`.
   */
  tabListPosition?: TabListPosition;

  type: Extract<FlexibleLayoutLeafType, "tabbed">;
  widgets: FlexibleLayoutWidget[];
};
