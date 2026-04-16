/** Auto-generated type declaration. Do not edit manually. */

import type { ActionMenuItemTypeActionable } from "./ActionMenuItemTypeActionable";
import type { ActionMenuModel } from "./ActionMenuModel";
import type { ChPopoverAlign } from "./ChPopoverAlign";
import type { ImageRender } from "./ImageRender";
import type { ItemLink } from "./ItemLink";

export type ActionMenuItemActionableModel = {
  id?: string;
  caption: string;
  disabled?: boolean;
  endImgSrc?: string;
  endImgType?: Exclude<ImageRender, "img">;

  // TODO: Test using different expanded values on the initial load
  expanded?: boolean;

  items?: ActionMenuModel;
  itemsBlockAlign?: ChPopoverAlign;
  itemsInlineAlign?: ChPopoverAlign;
  link?: ItemLink;
  parts?: string;

  /**
   * Specifies an alternative position to try when the popover overflows the
   * window.
   *
   * By default, this property takes to value of the `ch-action-menu-render`,
   * which by default is `"none"`
   */
  positionTry?: "flip-block" | "flip-inline" | "none";

  shortcut?: string;
  startImgSrc?: string;
  startImgType?: Exclude<ImageRender, "img">;
  type?: ActionMenuItemTypeActionable;
};
