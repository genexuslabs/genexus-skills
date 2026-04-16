/** Auto-generated type declaration. Do not edit manually. */

import type { ChatFileUploadState } from "./ChatFileUploadState";

export type ChatMessageFile = {
  accessibleName?: string;
  alternativeText?: string;
  caption?: string;

  extension?: string;

  /**
   * A field for adding any extra information that must be stored for the
   * file.
   *
   * The `metadata` field can be used for any purpose, for example, adding more
   * information to customize the render.
   */
  metadata?: any;

  mimeType: ChMimeType;

  /**
   * Parts for the file.
   */
  parts?: string;

  /**
   * Specifies the uploading state of the files.
   *
   * By default is `"uploaded"`.
   */
  uploadState?: ChatFileUploadState;

  url: string;
};
