/** Auto-generated type declaration. Do not edit manually. */

import type { ImageRender } from "./ImageRender";

export type ActionListItemAdditionalBase = {
  id?: string;
  caption?: string;
  imgSrc?: string;

  /**
   * Specifies how the image will be rendered. Defaults to `"background"`.
   */
  imgType?: ImageRender;
  part?: string;
};
