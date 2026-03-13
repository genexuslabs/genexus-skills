/** Auto-generated type declaration. Do not edit manually. */

import type { LayoutSplitterDragBarConfig } from "./LayoutSplitterDragBarConfig";
import type { LayoutSplitterSize } from "./LayoutSplitterSize";
import type { LayoutSplitterSticky } from "./LayoutSplitterSticky";

export type LayoutSplitterLeafModel = {
  id: string;
  dragBar?: LayoutSplitterDragBarConfig;
  fixedOffsetSize?: number;
  size: LayoutSplitterSize;
  minSize?: `${number}px`;
  sticky?: LayoutSplitterSticky;
};
