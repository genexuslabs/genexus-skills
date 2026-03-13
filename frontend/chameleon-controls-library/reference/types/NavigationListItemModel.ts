/** Auto-generated type declaration. Do not edit manually. */

import type { ImageRender } from "./ImageRender";
import type { ItemLink } from "./ItemLink";
import type { NavigationListModel } from "./NavigationListModel";

export type NavigationListItemModel = {
  id?: string;
  caption: string;
  disabled?: boolean;
  expanded?: boolean;
  metadata?: string;
  startImgSrc?: string;
  startImgType?: Exclude<ImageRender, "img">;
  link?: ItemLink;
  items?: NavigationListModel;
};
