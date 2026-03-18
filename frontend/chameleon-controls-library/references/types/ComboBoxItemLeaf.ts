/** Auto-generated type declaration. Do not edit manually. */

import type { ImageRender } from "./ImageRender";

export type ComboBoxItemLeaf = {
  caption?: string;
  disabled?: boolean;
  endImgSrc?: string;
  endImgType?: Exclude<ImageRender, "img">;
  startImgSrc?: string;
  startImgType?: Exclude<ImageRender, "img">;
  value: string;
};
