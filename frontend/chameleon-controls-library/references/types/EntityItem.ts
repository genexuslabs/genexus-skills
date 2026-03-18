/** Auto-generated type declaration. Do not edit manually. */

import type { EntityItem } from "./EntityItem";
import type { EntityItemType } from "./EntityItemType";

export type EntityItem = {
  Name: string;
  Description?: string;
  Type: EntityItemType;
  DataType: string;
  Level?: EntityItem[];
};
