/** Auto-generated type declaration. Do not edit manually. */

import type { ChatMessageContent } from "./ChatMessageContent";

export type ChatMessageError = {
  id: string;
  role: "error";
  content: ChatMessageContent;

  /**
   * A field for adding any extra information that must be stored for the
   * message.
   *
   * The `metadata` field can be used for any purpose, for example, adding more
   * information to customize the render.
   */
  metadata?: any;

  /**
   * Parts for the cell, message content, `files-container` and
   * `sources-container`.
   *
   * It is not added to the parts of the files and sources.
   */
  parts?: string;
};
