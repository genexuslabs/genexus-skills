/** Auto-generated type declaration. Do not edit manually. */

import type { FlexibleLayoutGroupModel } from "./FlexibleLayoutGroupModel";
import type { FlexibleLayoutLeafInfo } from "./FlexibleLayoutLeafInfo";
import type { FlexibleLayoutLeafModel } from "./FlexibleLayoutLeafModel";

// - - - - - - - - - - - - - - - - - - - -
//          Model used internally
// - - - - - - - - - - - - - - - - - - - -
export type FlexibleLayoutItemExtended<
  T extends FlexibleLayoutGroupModel | FlexibleLayoutLeafModel,
  R extends FlexibleLayoutLeafType
> = T extends FlexibleLayoutLeafModel
  ? {
      item: FlexibleLayoutLeafModel;
      parentItem: FlexibleLayoutGroupModel;
      leafInfo: FlexibleLayoutLeafInfo<R>;
    }
  : {
      item: FlexibleLayoutGroupModel;
      parentItem: FlexibleLayoutGroupModel;
    };
