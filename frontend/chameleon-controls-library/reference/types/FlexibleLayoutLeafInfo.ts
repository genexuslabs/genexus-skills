/** Auto-generated type declaration. Do not edit manually. */

import type { FlexibleLayoutLeafConfigurationSingleContent } from "./FlexibleLayoutLeafConfigurationSingleContent";
import type { FlexibleLayoutLeafConfigurationTabbed } from "./FlexibleLayoutLeafConfigurationTabbed";

export type FlexibleLayoutLeafInfo<T extends FlexibleLayoutLeafType> = {
  /**
   * Same as the leaf id (item.id).
   */
  id: string;
} & (T extends "tabbed"
  ? Required<FlexibleLayoutLeafConfigurationTabbed>
  : FlexibleLayoutLeafConfigurationSingleContent);
