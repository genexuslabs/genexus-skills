/** Auto-generated type declaration. Do not edit manually. */

import type { NotificationMessage } from "./NotificationMessage";

export type NotificationMessageWithDelay = NotificationMessage & {
  /**
   * Determine the animation delay that the new notifications will have when
   * rendered for the first time.
   */
  delayToAnimate: number;
};
