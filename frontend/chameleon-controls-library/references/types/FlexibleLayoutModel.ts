/** Auto-generated type declaration. Do not edit manually. */

import type { FlexibleLayoutItemModel } from "./FlexibleLayoutItemModel";
import type { LayoutSplitterModel } from "./LayoutSplitterModel";

/*
 * TODO: For some reason, this type does not work when is applied to an object,
 * and the "main" or "blockStart" keys are defined
 */
// export type FlexibleLayout = {
//   [key: string]: FlexibleLayoutAside | FlexibleLayoutFooter;
//   blockStart?: FlexibleLayoutHeader;
//   inlineStart?: FlexibleLayoutAside;
//   main?: FlexibleLayoutMain;
//   inlineEnd?: FlexibleLayoutAside;
//   blockEnd?: FlexibleLayoutFooter;
// };
export type FlexibleLayoutModel = Omit<LayoutSplitterModel, "items"> & {
  items: FlexibleLayoutItemModel[];
};
