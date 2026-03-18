/** Auto-generated type declaration. Do not edit manually. */

import type { FlexibleLayoutLeafType } from "./FlexibleLayoutLeafType";
import type { FlexibleLayoutWidget } from "./FlexibleLayoutWidget";
import type { FlexibleLayoutWidgetRender } from "./FlexibleLayoutWidgetRender";

export type FlexibleLayoutLeafConfigurationSingleContent = {
  type: Extract<FlexibleLayoutLeafType, "single-content">;
  widget: FlexibleLayoutWidget;
} & FlexibleLayoutWidgetRender;
