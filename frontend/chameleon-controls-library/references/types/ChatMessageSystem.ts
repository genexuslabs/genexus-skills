/** Auto-generated type declaration. Do not edit manually. */

import type { ChatMessageContent } from "./ChatMessageContent";

export type ChatMessageSystem = {
  id: string;
  role: "system";

  /**
   * A field for adding any extra information that must be stored for the
   * message.
   *
   * The `metadata` field can be used for any purpose.
   */
  metadata?: any;

  content: ChatMessageContent;

  /**
   * Parts for the cell, message content, `files-container` and
   * `sources-container`.
   *
   * It is not added to the parts of the files and sources.
   */
  parts?: string;
};
