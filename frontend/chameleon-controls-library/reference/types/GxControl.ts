/** Auto-generated type declaration. Do not edit manually. */

import type { GxControlDataType } from "./GxControlDataType";
import type { GxControlPossibleValues } from "./GxControlPossibleValues";
import type { GxControlType } from "./GxControlType";

export interface GxControl {
  setProperties(): void;
  getHtml(): string;

  dataType: GxControlDataType;
  type: GxControlType;
  possibleValues: GxControlPossibleValues;
}
