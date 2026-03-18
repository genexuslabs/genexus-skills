/** Auto-generated type declaration. Do not edit manually. */

import type { AccordionItemModelExpandedSize } from "./AccordionItemModelExpandedSize";
import type { ImageRender } from "./ImageRender";

export type AccordionItemModel = {
  id: string;
  accessibleName?: string;
  caption: string;
  disabled?: boolean;
  expanded?: boolean;

  /**
   * Determine the expanded size of the item. It support CSS units, including fr
   * units.
   */
  expandedSize?: AccordionItemModelExpandedSize;

  headerSlotId?: string;
  startImgSrc?: string;
  startImgType?: Exclude<ImageRender, "img">;
};
