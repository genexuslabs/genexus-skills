/** Auto-generated type declaration. Do not edit manually. */

import type { FlexibleLayoutWidgetRender } from "./FlexibleLayoutWidgetRender";
import type { ImageRender } from "./ImageRender";

export type FlexibleLayoutWidget = {
  /**
   * If `true` a div will be rendered as a parent wrapper for the widget render.
   * Only use `false` in StencilJS contexts where the `slot={widgetId}` and
   * `key={widgetId}` must be added.
   */
  addWrapper?: boolean;

  /**
   * If `true` when a widget is closed its render state and DOM nodes won't be
   * destroyed. Defaults to `false`.
   */
  conserveRenderState?: boolean;
  id: string;

  accessibleName?: string;

  /**
   * Specify if the tab button is disabled.
   * If disabled, it will not fire any user interaction related event
   * (for example, click event).
   */
  disabled?: boolean;

  // TODO: Check in the drag and drop algorithm if the name property can be
  // optional. To model tabs with only icons this property must be optional
  name?: string;

  startImgSrc?: string;

  /**
   * Specifies how the image will be rendered. Defaults to `"background"`.
   */
  startImgType?: ImageRender;
  wasRendered?: boolean;
} & FlexibleLayoutWidgetRender;
