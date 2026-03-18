/** Auto-generated type declaration. Do not edit manually. */

import type { ImageRender } from "./ImageRender";

export type SegmentedControlItemModel = {
  accessibleName?: string;
  caption?: string;
  class?: string;
  disabled?: boolean;
  endImgSrc?: string;
  endImgType?: Exclude<ImageRender, "img">;
  id: string;
  startImgSrc?: string;
  startImgType?: Exclude<ImageRender, "img">;
};
