/** Auto-generated type declaration. Do not edit manually. */

import type { CssContainProperty } from "./CssContainProperty";
import type { CssOverflowProperty } from "./CssOverflowProperty";

export type FlexibleLayoutWidgetRender = {
  /**
   * `true` to display a close button in the tab button.
   *
   * By default, this property takes the value of the tab parent. If the
   * `closeButton` property is not defined in the tab parent, it takes the value
   * of the ch-flexible-layout-render.
   */
  closeButton?: boolean;

  /**
   * Same as the contain CSS property. This property indicates that an widget
   * and its contents are, as much as possible, independent from the rest of
   * the document tree. Containment enables isolating a subsection of the DOM,
   * providing performance benefits by limiting calculations of layout, style,
   * paint, size, or any combination to a DOM subtree rather than the entire
   * page.
   * Containment can also be used to scope CSS counters and quotes.
   *
   * By default, this property takes to value of the
   * ch-flexible-layout-render's `contain` property.
   */
  contain?: CssContainProperty;

  /**
   * Same as the overflow CSS property. This property sets the desired behavior
   * when content does not fit in the widget's padding box (overflows) in the
   * horizontal and/or vertical direction.
   *
   * By default, this property takes to value of the
   * ch-flexible-layout-render's `overflow` property.
   */
  overflow?:
    | CssOverflowProperty
    | `${CssOverflowProperty} ${CssOverflowProperty}`;

  /**
   * Specifies the render of the widget. If not specified, the id of the widget
   * will be used as the `renderId`.
   */
  renderId?: string;

  /**
   * Specifies whether the widget is rendered outside of the
   * ch-flexible-layout-render by projecting a slot.
   *
   * By default, this property takes to value of the
   * ch-flexible-layout-render's `slottedWidgets` property.
   */
  slot?: boolean;
};
